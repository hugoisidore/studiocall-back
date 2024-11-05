import express from 'express';
import advisorController from '../../controllers/advisorController.js';    

const router = express.Router();

router.get('/call', advisorController.getAdvisorPage);

export default router;