import client from './webdavClient.js';  
import { sequelize } from '../models/sequelizeClient.js';  

// Fonction pour récupérer les fichiers d'un dossier WebDAV et les insérer dans la base de données
async function seedMusicAndVoices() {
  try {
    // Récupère les fichiers du dossier Musique sur WebDAV
    const musicFiles = await client.getDirectoryContents('/Musiquestest');
    const voiceFiles = await client.getDirectoryContents('/Voixtest');

    // Parcourt les fichiers de musique et les insère dans la table 'music'
    for (const file of musicFiles) {
      if (file.type === 'file') {
        // Construit le chemin complet du fichier pour l'URL d'accès
        const filePath = `https://cloud.studiocall.fr/remote.php/dav/files/AISTUDIOCALL/Musiquestest/${file.basename}`;

        // Insérer les informations du fichier dans la table `music`
        await sequelize.query(`
          INSERT INTO music (music_category, music_title, file_music, created_at, updated_at) 
          VALUES ('Pop', '${file.basename}', '${filePath}', NOW(), NOW())
        `);
      }
    }

    // Parcourt les fichiers de voix et les insère dans la table 'voice'
    for (const file of voiceFiles) {
      if (file.type === 'file') {
        // Construit le chemin complet du fichier pour l'URL d'accès
        const filePath = `https://cloud.studiocall.fr/remote.php/dav/files/AISTUDIOCALL/Voixtest/${file.basename}`;

        // Insérer les informations du fichier dans la table `voice`
        await sequelize.query(`
          INSERT INTO voice (voice_category, voice_title, file_voice, created_at, updated_at) 
          VALUES ('Femmes', '${file.basename}', '${filePath}', NOW(), NOW())
        `);
      }
    }

    console.log('Seeding terminé avec succès.');
  } catch (error) {
    console.error('Erreur lors du seeding :', error);
  }
}

// Exécuter le script de seeding
seedMusicAndVoices();
