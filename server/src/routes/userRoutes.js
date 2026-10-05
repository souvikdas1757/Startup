import express from 'express';
import { getMe, updateMe, getMyStatistics } from '../controllers/userController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', authenticateUser, getMe);
router.put('/me', authenticateUser, updateMe);
router.get('/me/statistics', authenticateUser, getMyStatistics);

export default router;