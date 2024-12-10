import { Music } from "../models/Music.js";

// Fonction pour récupérer les musiques par catégorie
const musicsController = {
  async getMusicsByCategory(req, res) {
    const { category } = req.params;

    const musics = await Music.findAll({
      where: { music_category: category }
    });

    // Si aucune musique n'est trouvée
    if (musics.length === 0) {
      return res.status(404).json({ message: 'Aucune musique trouvée pour cette catégorie.' });
    }

    console.log("Musics found:", musics);

    // Envoie les résultats au front-end
    res.status(200).json(musics);
  }
};

export default musicsController;
