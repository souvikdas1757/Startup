import express from 'express';
import { getBookmarks, createBookmark, deleteBookmark } from '../controllers/bookmarkController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateUser, getBookmarks);
router.post('/', authenticateUser, createBookmark);
router.delete('/:id', authenticateUser, deleteBookmark);

export default router;