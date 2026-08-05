import { Router } from 'express';
import { 
  getResponses, 
  exportResponsesCSV, 
  getResponseById, 
  deleteResponse 
} from '../controllers/responseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);

router.get('/export', exportResponsesCSV);
router.get('/', getResponses);
router.get('/:id', getResponseById);
router.delete('/:id', deleteResponse);

export default router;
