import { Router } from 'express';
import { 
  getOverview, 
  getRecentFeedback, 
  getChartsData, 
  getPopularForms 
} from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Protect all dashboard routes with JWT Middleware
router.use(protect);

// GET /api/dashboard/overview
router.get('/overview', getOverview);

// GET /api/dashboard/recent-feedback
router.get('/recent-feedback', getRecentFeedback);

// GET /api/dashboard/charts
router.get('/charts', getChartsData);

// GET /api/dashboard/popular-forms
router.get('/popular-forms', getPopularForms);

export default router;
