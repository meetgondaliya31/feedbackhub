import { Router } from 'express';
import { 
  getForms, 
  getFormById, 
  createForm, 
  updateForm, 
  deleteForm, 
  duplicateForm, 
  updateFormStatus 
} from '../controllers/formController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Allow authenticated access for form management
router.use(protect);

router.get('/', getForms);
router.get('/:id', getFormById);
router.post('/', createForm);
router.put('/:id', updateForm);
router.delete('/:id', deleteForm);
router.post('/:id/duplicate', duplicateForm);
router.patch('/:id/status', updateFormStatus);

export default router;
