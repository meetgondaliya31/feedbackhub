import { Router } from 'express';
import { 
  getAnalyticsOverview, 
  getAnalyticsTrends, 
  getAnalyticsRatings, 
  getAnalyticsForms 
} from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);

router.get('/overview', getAnalyticsOverview);
router.get('/trends', getAnalyticsTrends);
router.get('/ratings', getAnalyticsRatings);
router.get('/forms', getAnalyticsForms);

export default router;
