import express from 'express';
import { getDocumentation, getDocumentationBySlug, createDocumentation, updateDocumentation, deleteDocumentation } from '../controllers/documentationController.js';
import { authenticateUser, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getDocumentation);
router.get('/:slug', getDocumentationBySlug);
router.post('/', authenticateUser, requireAdmin, createDocumentation);
router.put('/:id', authenticateUser, requireAdmin, updateDocumentation);
router.delete('/:id', authenticateUser, requireAdmin, deleteDocumentation);

export default router;