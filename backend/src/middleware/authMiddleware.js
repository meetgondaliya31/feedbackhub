import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'feedbackhub_jwt_secret_key_2026_production_grade';

export const protect = async (req, res, next) => {
  try {
    let token;
    
    // Check Authorization header for Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Authentication token is missing.'
      });
    }

    // Verify token expiration and payload
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach decoded user info (id, email) to request
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Your session has expired. Please log in again.'
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid authorization token.'
    });
  }
};
