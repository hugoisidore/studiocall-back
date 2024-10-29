import ApiError from '../errors/ApiError.js';

const legalController = {
    async getLegalPage(req, res, next) {
      try {
        return res.render('footerLegal'); 
      } catch (error) {
        console.error("Erreur lors du chargement de la page", error);
        return next(new ApiError(500, "Erreur lors du chargement de la page"));
      }
    },
  };
  
  export default legalController;