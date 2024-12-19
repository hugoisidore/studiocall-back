import ApiError from '../errors/ApiError.js';

const footerController = {
    async getLegalPage(req, res, next) {
      try {
        return res.render('footerLegal'); 
      } catch (error) {
        console.error("Erreur lors du chargement de la page mentions légales", error);
        return next(new ApiError(500, "Erreur lors du chargement de la page mentions légales"));
      }
    },
    async getRgpdPage(req, res, next) {
      try {
        return res.render('footerRgpd'); 
      } catch (error) {
        console.error("Erreur lors du chargement de la page RGPD", error);
        return next(new ApiError(500, "Erreur lors du chargement de la page RGPD"));
      }
    },
    async getPlanPage(req, res, next) {
      try {
        return res.render('footerPlan'); 
      } catch (error) {
        console.error("Erreur lors du chargement de la page Plan du site", error);
        return next(new ApiError(500, "Erreur lors du chargement de la page Plan du site"));
      }
    },
    async getContactPage(req, res, next) {
      try {
        return res.render('footerContact'); 
      } catch (error) {
        console.error("Erreur lors du chargement de la page contact", error);
        return next(new ApiError(500, "Erreur lors du chargement de la contact"));
      }
    },
  };
  
  export default footerController;