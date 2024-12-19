import express from 'express';
import aboutController from '../../controllers/aboutController.js';    

const router = express.Router();

router.get('/us', aboutController.getAboutPage);

export default router;