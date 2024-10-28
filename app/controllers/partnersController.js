import ApiError from '../errors/ApiError.js';

const partnersController = {
    async getPartnersPage(req, res, next) {
      try {
        return res.render('becomingPartner'); 
      } catch (error) {
        console.error("Erreur lors du chargement de la page partenaire:", error);
        return next(new ApiError(500, "Erreur lors du chargement de la page partenaire."));
      }
    },
  };
  
  export default partnersController;
