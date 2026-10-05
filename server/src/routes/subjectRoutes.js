import express from 'express';
import { getSubjects, getSubjectById, createSubject, updateSubject, deleteSubject } from '../controllers/subjectController.js';
import { authenticateUser, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSubjects);
router.get('/:id', getSubjectById);
router.post('/', authenticateUser, requireAdmin, createSubject);
router.put('/:id', authenticateUser, requireAdmin, updateSubject);
router.delete('/:id', authenticateUser, requireAdmin, deleteSubject);

export default router;