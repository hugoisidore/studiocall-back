import ApiError from '../errors/ApiError.js';

const advisorController = {
    async getAdvisorPage(req, res, next) {
      try {
        return res.render('advisorCall'); 
      } catch (error) {
        console.error("Erreur lors du chargement de la page", error);
        return next(new ApiError(500, "Erreur lors du chargement de la page"));
      }
    },
  };
  
  export default advisorController;