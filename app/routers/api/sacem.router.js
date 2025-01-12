import express from 'express';
import sacemController from '../../controllers/sacemController.js'; 

const router = express.Router();

router.get('/sacem-prices', sacemController.getSacemPage);
router.get('/products', sacemController.getAllProducts);

export default router;