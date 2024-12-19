import express from 'express';
import errorController from '../../controllers/errorController.js';

const router = express.Router();

router.get('*', errorController.getErrorPage);

export default router;