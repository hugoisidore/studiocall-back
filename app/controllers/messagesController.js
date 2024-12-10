import { Music } from '../models/Music.js';
import { Voice } from '../models/Voice.js';
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

      // Récupération des catégories de voix
    const voiceCategories = await Voice.findAll({
      attributes: ['voice_category'],
      group: ['voice_category'],
    });

    // Si aucune catégorie de voix n'est trouvée
    if (voiceCategories.length === 0) {
      return res.status(404).json({ message: 'Aucune catégorie de voix trouvée.' });
    }

    // Récupération de toutes les voix
    const allVoices = await Voice.findAll({
      attributes: ['voice_category', 'voice_title', 'file_voice'],
    });

      // Envoie les résultats au front-end
      res.render('createStandard', { categories, musics, voiceCategories, allVoices }); 
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      return next(new ApiError(500, "Erreur lors de la récupération des données"));
    }
  },
  async getCreateSmartphoneMessage(req, res, next) {
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

      // Récupération des catégories de voix
    const voiceCategories = await Voice.findAll({
      attributes: ['voice_category'],
      group: ['voice_category'],
    });

    // Si aucune catégorie de voix n'est trouvée
    if (voiceCategories.length === 0) {
      return res.status(404).json({ message: 'Aucune catégorie de voix trouvée.' });
    }

    // Récupération de toutes les voix
    const allVoices = await Voice.findAll({
      attributes: ['voice_category', 'voice_title', 'file_voice'],
    });

      // Envoie les résultats au front-end
      res.render('createSmartphone', { categories, musics, voiceCategories, allVoices }); 
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      return next(new ApiError(500, "Erreur lors de la récupération des données"));
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
  },
};

export default messagesController;