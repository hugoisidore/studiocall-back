import ApiError from '../errors/ApiError.js';

const homeController = {
    async getHomePage(req, res, next) {
      try {
        return res.render('home'); 
      } catch (error) {
        console.error("Erreur lors du chargement de la page d'accueil:", error);
        return next(new ApiError(500, "Erreur lors du chargement de la page d'accueil"));
      }
    },
  };
  
  export default homeController;
