import ApiError from '../errors/ApiError.js';
import { Product } from "../models/Product.js";

const sacemController = {
  async getSacemPage(req, res, next) {
    try {
      return res.render('sacemAndPrices'); 
    } catch (error) {
      console.error("Erreur lors du chargement de la page Sacem & Tarifs", error);
      return next(new ApiError(500, "Erreur lors du chargement de la page Sacem & Tarifs"));
    }
  },
  async getAllProduct(req, res, next) {
    try {
        const products = await Product.findAll();

        // Si aucun produit n'est trouvé
        if (products.length === 0) {
            return res.status(404).json({ message: 'Aucun produit trouvé.' });
        }

        console.log("Produits trouvés:", products);
        // Envoie les résultats au front-end
        res.render('productList', { products });
    } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        return next(new ApiError(500, "Erreur lors de la récupération des produits"));
    }
  }

};

  
  export default sacemController;
