import express from 'express';
import { getNotes, getNoteById, createNote, updateNote, deleteNote } from '../controllers/noteController.js';
import { authenticateUser, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getNotes);
router.get('/:id', getNoteById);
router.post('/', authenticateUser, requireAdmin, createNote);
router.put('/:id', authenticateUser, requireAdmin, updateNote);
router.delete('/:id', authenticateUser, requireAdmin, deleteNote);

export default router;