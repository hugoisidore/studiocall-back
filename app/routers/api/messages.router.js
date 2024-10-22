import express from 'express';
import messagesController from '../../controllers/messagesController.js';

const router = express.Router();

router.get('/create-standard', messagesController.getCreateStandardMessage);

router.get('/create-smartphone', messagesController.getCreateSmartphoneMessage);

export default router;