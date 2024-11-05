import { Music } from '../models/Music.js';
import ApiError from '../errors/ApiError.js';

const messagesController = {
  async getCreateStandardMessage(req, res, next) {
    try {
      const categories = await Music.findAll({
        attributes: ['music_category'],
        group: ['music_category'],
      });

      // Si aucune catégorie n'est trouvée
      if (categories.length === 0) {
        return res.status(404).json({ message: 'Aucune catégorie trouvée.' });
      }

      // Récupérez toutes les musiques (vous pouvez aussi filtrer si besoin)
      const musics = await Music.findAll({
        attributes: ['music_category', 'music_title', 'file_music'],
      });

      console.log("Categories found:", categories);
      console.log("Musics found:", musics);

      // Envoie les résultats au front-end
      res.render('createStandard', { categories, musics }); // Passez également `musics`
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
      return next(new ApiError(500, "Erreur lors de la récupération des catégories"));
    }
  },
  async getCreateSmartphoneMessage(req, res, next) {
    try {
      res.render('createSmartphone', { 
        type: "smartphone", 
        title: "Create Smartphone Message", 
        data: {} // On peut ajouter ici des données à passer à la vue
      });
    } catch (error) {
      console.error("Erreur lors du rendu de la vue createSmartphone:", error);
      return next(new ApiError(500, "Erreur lors du rendu de la vue Create Smartphone Message"));
    }
  },

  async getExamplesMessage(req, res, next) {
    try {
      res.render('examplesMessages', { 
        type: "examples", 
        title: "Examples of Messages", 
        data: {} // On peut ajouter ici des données à passer à la vue
      });
    } catch (error) {
      console.error("Erreur lors du rendu de la vue examplesMessages:", error);
      return next(new ApiError(500, "Erreur lors du rendu de la vue Examples of Messages"));
    }
  }
};

export default messagesController;