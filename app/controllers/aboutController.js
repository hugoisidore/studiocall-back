import ApiError from '../errors/ApiError.js';

const aboutController = {
    async getAboutPage(req, res, next) {
      try {
        return res.render('about'); 
      } catch (error) {
        console.error("Erreur lors du chargement de la page à propos:", error);
        return next(new ApiError(500, "Erreur lors du chargement de la page à propos"));
      }
    },
  };
  
  export default aboutController;