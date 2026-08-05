import { Router } from 'express';
import { getPublicForm, submitPublicFeedback } from '../controllers/publicFormController.js';

const router = Router();

// Public routes (no auth required for respondents)
router.get('/forms/:id', getPublicForm);
router.post('/forms/:id/submit', submitPublicFeedback);

export default router;
