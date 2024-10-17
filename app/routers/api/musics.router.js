import express from 'express';
import musicsController from '../../controllers/musicsController.js';

const router = express.Router();

router.get("/:category", musicsController.getMusicsByCategory);

export default router;