import express from 'express';
const router = express.Router();

// Route basique pour tester GET /api/message
router.get('/', (req, res) => {
  res.send('Message route works!');
});

export default router;