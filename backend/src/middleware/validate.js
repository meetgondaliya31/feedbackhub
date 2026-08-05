import { body, validationResult } from 'express-validator';

// Express validator rules for registration
export const registerValidation = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
];

// Express validator rules for login
export const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Validation error formatting middleware
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array().map(err => ({ field: err.path, message: err.msg }))
    });
  }
  next();
};
