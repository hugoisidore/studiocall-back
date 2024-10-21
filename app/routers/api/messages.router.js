import express from 'express';
import messagesController from '../../controllers/messagesController.js';

const router = express.Router();

router.get('/create-standard', messagesController.getCreateStandardMessage);

router.get('/create-smartphone', messagesController.getCreateSmartphoneMessage);

// Route basique pour tester GET /api/message
router.get('/', (req, res) => {
  res.send('Message route works!');
});

export default router;