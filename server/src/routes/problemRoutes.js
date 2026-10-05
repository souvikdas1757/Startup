import express from 'express';
import { getProblems, getProblemById, createProblem, updateProblem, deleteProblem } from '../controllers/problemController.js';
import { authenticateUser, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProblems);
router.get('/:id', getProblemById);
router.post('/', authenticateUser, requireAdmin, createProblem);
router.put('/:id', authenticateUser, requireAdmin, updateProblem);
router.delete('/:id', authenticateUser, requireAdmin, deleteProblem);

export default router;