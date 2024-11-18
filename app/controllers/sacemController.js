import ApiError from '../errors/ApiError.js';
import { Product } from "../models/Product.js";
import { GuidedProduct } from '../models/GuidedProduct.js';


const sacemController = {
  async getSacemPage(req, res, next) {
    try {
      console.log("Fetching products...");
      const products = await Product.findAll();
      console.log("Products fetched:", products);

      
      console.log("Fetching guided products...");
      const guidedProducts = await GuidedProduct.findAll();
      console.log("Guided products fetched:", guidedProducts);

      if (products.length === 0 && guidedProducts.length === 0) {
        return res.status(404).json({ message: 'Aucun produit trouvé.' });
      }

      return res.render('sacemAndPrices', { products, guidedProducts });
    } catch (error) {
      console.error("Erreur lors du chargement de la page Sacem & Tarifs", error);
      return next(new ApiError(500, "Erreur lors du chargement de la page Sacem & Tarifs"));
    }
  },

  async getAllProducts(req, res, next) {
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
      console.error("Erreur lors de la récupération des produits", error);
      return next(new ApiError(500, "Erreur lors de la récupération des produits"));
    }
  },

  async getAllGuidedProducts(req, res, next) {
    try {
      const guidedProducts = await GuidedProduct.findAll();

      // Si aucun produit n'est trouvé
      if (guidedProducts.length === 0) {
        return res.status(404).json({ message: 'Aucun produit trouvé.' });
      }

      console.log("Produits guidés trouvés:", guidedProducts);
      // Envoie les résultats au front-end
      res.render('guidedProductList', { guidedProducts });
    } catch (error) {
      console.error("Erreur lors de la récupération des produits guidés", error);
      return next(new ApiError(500, "Erreur lors de la récupération des produits guidés"));
    }
  },

  async getProductById(req, res, next) {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);

        // Si aucun produit n'est trouvé
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }

        console.log("Produit trouvé:", product);
        // Envoie les résultats au front-end
        res.render('productList', { product });
    } catch (error) {
        console.error("Erreur lors de la récupération du produit:", error);
        return next(new ApiError(500, "Erreur lors de la récupération du produit"));
    }
  },
  async getGuidedProductById(req, res, next) {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);

        // Si aucun produit n'est trouvé
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }

        console.log("Produit trouvé:", product);
        // Envoie les résultats au front-end
        res.render('productList', { product });
    } catch (error) {
        console.error("Erreur lors de la récupération du produit:", error);
        return next(new ApiError(500, "Erreur lors de la récupération du produit"));
    }
  },

  async getStandaloneProductById(req, res, next) {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);

        // Si aucun produit n'est trouvé
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }

        console.log("Produit trouvé:", product);
        // Envoie les résultats au front-end
        res.render('productList', { product });
    } catch (error) {
        console.error("Erreur lors de la récupération du produit:", error);
        return next(new ApiError(500, "Erreur lors de la récupération du produit"));
    }
  }

};

export default sacemController;
