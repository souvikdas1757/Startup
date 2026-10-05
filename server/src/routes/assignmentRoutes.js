import express from 'express';
import { getAssignments, getAssignmentById, createAssignment, updateAssignment, deleteAssignment } from '../controllers/assignmentController.js';
import { authenticateUser, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAssignments);
router.get('/:id', getAssignmentById);
router.post('/', authenticateUser, requireAdmin, createAssignment);
router.put('/:id', authenticateUser, requireAdmin, updateAssignment);
router.delete('/:id', authenticateUser, requireAdmin, deleteAssignment);

export default router;