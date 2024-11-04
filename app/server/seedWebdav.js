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
        // Récupérer toutes les catégories de musique actuellement dans la base de données
        const [existingCategoriesResult] = await sequelize.query(`SELECT DISTINCT music_category FROM music`);
        const existingCategories = existingCategoriesResult.map(row => row.music_category);

        // Récupérer les catégories actuelles du serveur cloud
        const categories = await client.getDirectoryContents('/Musiquestest');
        console.log('Contenu de /Musiquestest :', categories);

        // Liste des catégories trouvées dans le cloud
        const cloudCategories = [];

        for (const categoryDir of categories) {
            if (categoryDir.type === 'directory' || categoryDir.type === 'collection') {
                const categoryName = categoryDir.basename;
                cloudCategories.push(categoryName); // Ajouter à la liste des catégories du cloud
                console.log(`Exploration de la catégorie : ${categoryName}`);

                // Récupérer tous les fichiers dans le sous-dossier de la catégorie
                const musicFiles = await getAllFiles(categoryDir.filename);
                console.log(`Fichiers trouvés dans la catégorie ${categoryName}:`, musicFiles.length);

                const processedFiles = [];

                for (const file of musicFiles) {
                    if (file.type === 'file') {
                        console.log(`Traitement du fichier : ${file.basename}`);
                        
                        const [existingMusic] = await sequelize.query(`
                            SELECT * FROM music WHERE music_title = ?
                        `, {
                            replacements: [file.basename]
                        });

                        const filePath = `https://cloud.studiocall.fr/remote.php/dav/files/AISTUDIOCALL/Musiquestest/${categoryName}/${file.basename}`;
                        processedFiles.push(file.basename);

                        if (existingMusic.length === 0) {
                            await sequelize.query(`
                                INSERT INTO music (music_category, music_title, file_music, created_at, updated_at) 
                                VALUES (?, ?, ?, NOW(), NOW())
                            `, {
                                replacements: [categoryName, file.basename, filePath]
                            });
                            console.log(`Musique ajoutée: ${file.basename}, catégorie: ${categoryName}`);
                        } else {
                            // Mise à jour des informations si le fichier existe déjà
                            await sequelize.query(`
                                UPDATE music 
                                SET music_category = ?, file_music = ?, updated_at = NOW()
                                WHERE music_title = ?
                            `, {
                                replacements: [categoryName, filePath, file.basename]
                            });
                            console.log(`Musique mise à jour : ${file.basename}, catégorie: ${categoryName}`);
                        }
                    } else {
                        console.log(`Élément ignoré : ${file.basename} (pas un fichier)`); 
                    }
                }

                const placeholders = processedFiles.map(() => '?').join(', ');
                await sequelize.query(`
                    DELETE FROM music 
                    WHERE music_category = ? AND music_title NOT IN (${placeholders})
                `, {
                    replacements: [categoryName, ...processedFiles]
                });

                console.log(`Catégorie ${categoryName} mise à jour avec suppression des fichiers obsolètes.`);
            } else {
                console.log(`Élément ignoré : ${categoryDir.basename} (pas un dossier)`); 
            }
        }

        // Supprimer les catégories absentes du cloud mais présentes dans la BDD
        const categoriesToDelete = existingCategories.filter(cat => !cloudCategories.includes(cat));
        if (categoriesToDelete.length > 0) {
            const placeholders = categoriesToDelete.map(() => '?').join(', ');
            await sequelize.query(`
                DELETE FROM music 
                WHERE music_category IN (${placeholders})
            `, {
                replacements: categoriesToDelete
            });
            console.log(`Catégories supprimées de la BDD : ${categoriesToDelete.join(', ')}`);
        }

        console.log('Seeding terminé avec succès.');
    } catch (error) {
        console.error('Erreur lors du seeding :', error);
    }
}

// Exécute le script de seeding
seedMusicAndVoices();
