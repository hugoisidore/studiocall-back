import ApiError from '../errors/ApiError.js';

const sacemController = {
    async getSacemPage(req, res, next) {
      try {
        return res.render('sacemAndPrices'); 
      } catch (error) {
        console.error("Erreur lors du chargement de la page Sacem & Tarifs", error);
        return next(new ApiError(500, "Erreur lors du chargement de la page Sacem & Tarifs"));
      }
    },
  };
  
  export default sacemController;
