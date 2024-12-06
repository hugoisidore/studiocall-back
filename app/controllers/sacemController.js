import ApiError from '../errors/ApiError.js';
import { Product } from '../models/Product.js';
import { GuidedProduct } from '../models/GuidedProduct.js';

const sacemController = {
  
  // Charger la page Sacem & Tarifs
  async getSacemPage(req, res, next) {
    try {
      console.log("Chargement des produits...");
      const products = await Product.findAll(); // Récupère tous les produits
      console.log("Produits récupérés :", products);

      console.log("Chargement des produits guidés...");
      const guidedProducts = await GuidedProduct.findAll(); // Récupère tous les produits guidés
      console.log("Produits guidés récupérés :", guidedProducts);

      if (!products.length && !guidedProducts.length) {
        return res.status(404).json({ message: 'Aucun produit trouvé.' });
      }

      // Rend la vue sacem avec les données de products et guidedProducts
      return res.render('sacem', { products, guidedProducts });
    } catch (error) {
      console.error("Erreur lors du chargement de la page Sacem & Tarifs :", error);
      return next(new ApiError(500, "Erreur lors du chargement de la page Sacem & Tarifs"));
    }
  },

  // Récupérer tous les produits (products)
  async getAllProducts(req, res, next) {
    try {
      const products = await Product.findAll();
      if (!products.length) {
        return res.status(404).json({ message: 'Aucun produit trouvé.' });
      }
      res.render('productList', { products });
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
      return next(new ApiError(500, "Erreur lors de la récupération des produits"));
    }
  },

  // Récupérer tous les produits guidés (guided_products)
  async getAllGuidedProducts(req, res, next) {
    try {
      const guidedProducts = await GuidedProduct.findAll();
      if (!guidedProducts.length) {
        return res.status(404).json({ message: 'Aucun produit guidé trouvé.' });
      }
      res.render('guidedProductList', { guidedProducts });
    } catch (error) {
      console.error("Erreur lors de la récupération des produits guidés :", error);
      return next(new ApiError(500, "Erreur lors de la récupération des produits guidés"));
    }
  },

  // Récupérer un produit StudioCall par ID
  async getProductById(req, res, next) {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: 'Produit non trouvé.' });
      }
      res.render('productDetails', { product });
    } catch (error) {
      console.error("Erreur lors de la récupération du produit :", error);
      return next(new ApiError(500, "Erreur lors de la récupération du produit"));
    }
  },

  // Récupérer un produit StudiioCall guidé par son ID
  async getGuidedProductById(req, res, next) {
    try {
      const guidedProductId = req.params.id;
      const guidedProduct = await GuidedProduct.findByPk(guidedProductId);
      if (!guidedProduct) {
        return res.status(404).json({ message: 'Produit guidé non trouvé.' });
      }
      res.render('guidedProductDetails', { guidedProduct });
    } catch (error) {
      console.error("Erreur lors de la récupération du produit guidé :", error);
      return next(new ApiError(500, "Erreur lors de la récupération du produit guidé"));
    }
  },
};

export default sacemController;
