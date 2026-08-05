import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import formRoutes from './routes/formRoutes.js';
import publicFormRoutes from './routes/publicFormRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import responseRoutes from './routes/responseRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware configuration
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'FeedbackHub API Server',
    timestamp: new Date().toISOString()
  });
});

// API Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/public', publicFormRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/responses', responseRoutes);

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err);
  res.status(500).json({
    success: false,
    message: 'An unexpected internal server error occurred'
  });
});

// Start Express HTTP Server
app.listen(PORT, () => {
  console.log(`🚀 FeedbackHub API Server running on port ${PORT}`);
});
