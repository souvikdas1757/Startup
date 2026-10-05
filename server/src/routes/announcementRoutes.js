import express from 'express';
import { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../controllers/announcementController.js';
import { authenticateUser, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAnnouncements);
router.post('/', authenticateUser, requireAdmin, createAnnouncement);
router.put('/:id', authenticateUser, requireAdmin, updateAnnouncement);
router.delete('/:id', authenticateUser, requireAdmin, deleteAnnouncement);

export default router;