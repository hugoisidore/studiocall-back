import client from './webdavClient.js';  
import { sequelize } from '../models/sequelizeClient.js';  

// Fonction pour récupérer les fichiers du dossier WebDAV et les insérer dans la BDD
async function seedMusicAndVoices() {
  try {
    // Récupèrer les fichiers du dossier Musique et Voix sur WebDAV
    const musicFiles = await client.getDirectoryContents('/Musiquestest');
    const voiceFiles = await client.getDirectoryContents('/Voixtest');

    // Parcourir les fichiers de musique et les insère dans la table 'music'
    for (const file of musicFiles) {
      if (file.type === 'file') {
        // Vérifier si une musique avec le même titre existe déjà dans la BDD
        const [existingMusic] = await sequelize.query(`
          SELECT * FROM music WHERE music_title = ?
        `, {
          replacements: [file.basename]
        });

        // Si la musique n'existe pas, on l'insère
        if (existingMusic.length === 0) {
          const filePath = `https://cloud.studiocall.fr/remote.php/dav/files/AISTUDIOCALL/Musiquestest/${file.basename}`;

          // Insérer les informations du fichier dans la table `music`
          await sequelize.query(`
            INSERT INTO music (music_category, music_title, file_music, created_at, updated_at) 
            VALUES (?, ?, ?, NOW(), NOW())
          `, {
            replacements: ['Pop', file.basename, filePath]
          });

          console.log(`Musique ajoutée: ${file.basename}`);
        } else {
          console.log(`Musique déjà présente: ${file.basename}, skipping.`);
        }
      }
    }

    // Parcourir les fichiers de voix et les insère dans la table 'voice'
    for (const file of voiceFiles) {
      if (file.type === 'file') {
        // Vérifier si une voix avec le même titre existe déjà dans la BDD
        const [existingVoice] = await sequelize.query(`
          SELECT * FROM voice WHERE voice_title = ?
        `, {
          replacements: [file.basename]
        });

        // Si la voix n'existe pas, on l'insère
        if (existingVoice.length === 0) {
          const filePath = `https://cloud.studiocall.fr/remote.php/dav/files/AISTUDIOCALL/Voixtest/${file.basename}`;

          // Insérer les informations du fichier dans la table `voice`
          await sequelize.query(`
            INSERT INTO voice (voice_category, voice_title, file_voice, created_at, updated_at) 
            VALUES (?, ?, ?, NOW(), NOW())
          `, {
            replacements: ['Femmes', file.basename, filePath]
          });

          console.log(`Voix ajoutée: ${file.basename}`);
        } else {
          console.log(`Voix déjà présente: ${file.basename}, skipping.`);
        }
      }
    }

    console.log('Seeding terminé avec succès.');
  } catch (error) {
    console.error('Erreur lors du seeding :', error);
  }
}

// On exécute le script de seeding
seedMusicAndVoices();
