import client from './webdavClient.js';
import { sequelize } from '../models/sequelizeClient.js';

async function getAllFiles(directory) {
    let allFiles = [];
    const contents = await client.getDirectoryContents(directory);

    for (const item of contents) {
        if (item.type === 'file') {
            allFiles.push(item); 
        } else if (item.type === 'collection') {
            const subFiles = await getAllFiles(item.filename);
            allFiles = allFiles.concat(subFiles);
        }
    }

    return allFiles;
}

async function seedMusicAndVoices() {
    try {
        // Musiques
        const [existingCategoriesResult] = await sequelize.query(`SELECT DISTINCT music_category FROM music`);
        const existingCategories = existingCategoriesResult.map(row => row.music_category);

        const musicCategories = await client.getDirectoryContents('/Musiquestest');
        const cloudMusicCategories = [];

        for (const categoryDir of musicCategories) {
            if (categoryDir.type === 'directory' || categoryDir.type === 'collection') {
                const categoryName = categoryDir.basename;
                cloudMusicCategories.push(categoryName);

                const musicFiles = await getAllFiles(categoryDir.filename);
                const processedFiles = [];

                for (const file of musicFiles) {
                    if (file.type === 'file') {
                        const [existingMusic] = await sequelize.query(`
                            SELECT * FROM music WHERE music_title = ?
                        `, { replacements: [file.basename] });

                        const filePath = `https://cloud.studiocall.fr/remote.php/dav/files/AISTUDIOCALL/Musiquestest/${categoryName}/${file.basename}`;
                        processedFiles.push(file.basename);

                        if (existingMusic.length === 0) {
                            await sequelize.query(`
                                INSERT INTO music (music_category, music_title, file_music, created_at, updated_at) 
                                VALUES (?, ?, ?, NOW(), NOW())
                            `, { replacements: [categoryName, file.basename, filePath] });
                        } else {
                            await sequelize.query(`
                                UPDATE music 
                                SET music_category = ?, file_music = ?, updated_at = NOW()
                                WHERE music_title = ?
                            `, { replacements: [categoryName, filePath, file.basename] });
                        }
                    }
                }

                const placeholders = processedFiles.map(() => '?').join(', ');
                await sequelize.query(`
                    DELETE FROM music 
                    WHERE music_category = ? AND music_title NOT IN (${placeholders})
                `, { replacements: [categoryName, ...processedFiles] });
            }
        }

        const categoriesToDelete = existingCategories.filter(cat => !cloudMusicCategories.includes(cat));
        if (categoriesToDelete.length > 0) {
            const placeholders = categoriesToDelete.map(() => '?').join(', ');
            await sequelize.query(`
                DELETE FROM music 
                WHERE music_category IN (${placeholders})
            `, { replacements: categoriesToDelete });
        }

        // Voix
        const [existingVoiceCategoriesResult] = await sequelize.query(`SELECT DISTINCT voice_category FROM voice`);
        const existingVoiceCategories = existingVoiceCategoriesResult.map(row => row.voice_category);

        const voiceCategories = await client.getDirectoryContents('/Voixtest');
        const cloudVoiceCategories = [];

        for (const voiceDir of voiceCategories) {
            if (voiceDir.type === 'directory' || voiceDir.type === 'collection') {
                const voiceCategory = voiceDir.basename;
                cloudVoiceCategories.push(voiceCategory);

                const voiceFiles = await getAllFiles(voiceDir.filename);
                const processedVoiceFiles = [];

                for (const voiceFile of voiceFiles) {
                    if (voiceFile.type === 'file') {
                        const [existingVoice] = await sequelize.query(`
                            SELECT * FROM voice WHERE voice_title = ?
                        `, { replacements: [voiceFile.basename] });

                        const filePath = `https://cloud.studiocall.fr/remote.php/dav/files/AISTUDIOCALL/Voixtest/${voiceCategory}/${voiceFile.basename}`;
                        processedVoiceFiles.push(voiceFile.basename);

                        if (existingVoice.length === 0) {
                            await sequelize.query(`
                                INSERT INTO voice (voice_category, voice_title, file_voice, created_at, updated_at) 
                                VALUES (?, ?, ?, NOW(), NOW())
                            `, { replacements: [voiceCategory, voiceFile.basename, filePath] });
                        } else {
                            await sequelize.query(`
                                UPDATE voice
                                SET voice_category = ?, file_voice = ?, updated_at = NOW()
                                WHERE voice_title = ?
                            `, { replacements: [voiceCategory, filePath, voiceFile.basename] });
                        }
                    }
                }

                const placeholders = processedVoiceFiles.map(() => '?').join(', ');
                await sequelize.query(`
                    DELETE FROM voice 
                    WHERE voice_category = ? AND voice_title NOT IN (${placeholders})
                `, { replacements: [voiceCategory, ...processedVoiceFiles] });
            }
        }

        const voiceCategoriesToDelete = existingVoiceCategories.filter(cat => !cloudVoiceCategories.includes(cat));
        if (voiceCategoriesToDelete.length > 0) {
            const placeholders = voiceCategoriesToDelete.map(() => '?').join(', ');
            await sequelize.query(`
                DELETE FROM voice
                WHERE voice_category IN (${placeholders})
            `, { replacements: voiceCategoriesToDelete });
        }

        console.log('Seeding terminé avec succès pour les musiques et les voix.');
    } catch (error) {
        console.error('Erreur lors du seeding :', error);
    }
}

// Exécute le script de seeding
seedMusicAndVoices();
