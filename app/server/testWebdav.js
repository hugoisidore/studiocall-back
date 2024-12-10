import client from '../server/webdavClient.js';

async function listFiles() {
    try {
      const directoryItems = await client.getDirectoryContents('/');
      console.log('Fichiers sur le serveur WebDAV :', directoryItems);
    } catch (error) {
      console.error('Erreur lors de la connexion à WebDAV :', error);
    }
  }
  
  listFiles();