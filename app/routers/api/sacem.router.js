import express from 'express';
import sacemController from '../../controllers/sacemController.js';    

const router = express.Router();

router.get('/prices', sacemController.getSacemPage);

export default router;