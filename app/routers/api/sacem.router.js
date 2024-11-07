import express from 'express';
import sacemController from '../../controllers/sacemController.js'; 

const router = express.Router();

router.get('/sacem-prices', sacemController.getSacemPage);

router.get('/products', sacemController.getAllProducts);
router.get('/standalone-products', sacemController.getAllStandaloneProducts);
router.get('/guided-products', sacemController.getAllGuidedProducts);

router.get('/products/:id', sacemController.getProductById);
router.get('/products/:id/standalone', sacemController.getStandaloneProductById);
router.get('/products/:id/guided', sacemController.getGuidedProductById);

export default router;