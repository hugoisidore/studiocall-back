import express from 'express';
import legalController from '../../controllers/legalController.js';

const router = express.Router();

router.get('/informations', legalController.getLegalPage);

export default router;