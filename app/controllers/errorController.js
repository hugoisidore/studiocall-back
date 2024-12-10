import ApiError from '../errors/ApiError.js';

const errorController = {
    async getErrorPage(req, res, next) {
      try {
        return res.render('error404'); 
      } catch (error) {
        console.error("Erreur lors du chargement de la page", error);
        return next(new ApiError(400, "Erreur lors du chargement de la page"));
      }
    },
  };
  
  export default errorController;
