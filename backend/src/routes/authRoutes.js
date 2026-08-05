import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { registerValidation, loginValidation, validate } from '../middleware/validate.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Registration Endpoint
router.post('/register', registerValidation, validate, register);

// Login Endpoint
router.post('/login', loginValidation, validate, login);

// Current User Endpoint (JWT Protected)
router.get('/me', protect, getMe);

export default router;
