import client from './webdavClient.js';  
import { sequelize } from '../models/sequelizeClient.js';  

// Fonction pour récupérer tous les fichiers d'un dossier, y compris ceux des sous-dossiers
async function getAllFiles(directory) {
    let allFiles = [];
    const contents = await client.getDirectoryContents(directory);

    for (const item of contents) {
        if (item.type === 'file') {
            allFiles.push(item); 
        } else if (item.type === 'collection') { 
            // On appelle récursivement cette fonction pour les sous-dossiers
            const subFiles = await getAllFiles(item.filename);
            allFiles = allFiles.concat(subFiles); 
        }
    }

    return allFiles; 
}

// Fonction pour récupérer les fichiers du dossier WebDAV et les insérer dans la BDD
async function seedMusicAndVoices() {
    try {
        // Récupérer le contenu du dossier Musiquestest
        const categories = await client.getDirectoryContents('/Musiquestest');
        
        console.log('Contenu de /Musiquestest :', categories); 

        for (const categoryDir of categories) {
            // S'assurer que nous traitons les éléments de type 'directory' (ou collection)
            if (categoryDir.type === 'directory' || categoryDir.type === 'collection') { 
                const categoryName = categoryDir.basename; 
                console.log(`Exploration de la catégorie : ${categoryName}`);

                // Récupérer tous les fichiers dans le sous-dossier de la catégorie
                const musicFiles = await getAllFiles(categoryDir.filename); 
                console.log(`Fichiers trouvés dans la catégorie ${categoryName}:`, musicFiles.length);

                // Parcourir les fichiers de musique et les insérer dans la table 'music'
                for (const file of musicFiles) {
                    if (file.type === 'file') {
                        console.log(`Traitement du fichier : ${file.basename}`); 

                        // Vérifier si une musique avec le même titre existe déjà dans la BDD
                        const [existingMusic] = await sequelize.query(`
                            SELECT * FROM music WHERE music_title = ?
                        `, {
                            replacements: [file.basename]
                        });

                        // Si la musique n'existe pas, on l'insère
                        if (existingMusic.length === 0) {
                            const filePath = `https://cloud.studiocall.fr/remote.php/dav/files/AISTUDIOCALL/Musiquestest/${categoryName}/${file.basename}`;

                            // Insérer les informations du fichier dans la table `music`
                            await sequelize.query(`
                                INSERT INTO music (music_category, music_title, file_music, created_at, updated_at) 
                                VALUES (?, ?, ?, NOW(), NOW())
                            `, {
                                replacements: [categoryName, file.basename, filePath]
                            });

                            console.log(`Musique ajoutée: ${file.basename}, catégorie: ${categoryName}`);
                        } else {
                            console.log(`Musique déjà présente: ${file.basename}, skipping.`);
                        }
                    } else {
                        console.log(`Élément ignoré : ${file.basename} (pas un fichier)`); 
                    }
                }
            } else {
                console.log(`Élément ignoré : ${categoryDir.basename} (pas un dossier)`); 
            }
        }

        console.log('Seeding terminé avec succès.');
    } catch (error) {
        console.error('Erreur lors du seeding :', error);
    }
}

// On exécute le script de seeding
seedMusicAndVoices();