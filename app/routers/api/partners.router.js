import express from 'express';
import partnersController from '../../controllers/partnersController.js';  

const router = express.Router();

router.get('/partners', partnersController.getPartnersPage);

export default router;