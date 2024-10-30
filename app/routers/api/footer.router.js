import express from 'express';
import footerController from '../../controllers/footerController.js';

const router = express.Router();

router.get('/notices', footerController.getLegalPage);
router.get('/policy', footerController.getRgpdPage);
router.get('/map', footerController.getPlanPage);
router.get('/us', footerController.getContactPage);

export default router;