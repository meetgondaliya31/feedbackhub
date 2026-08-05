import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET || 'feedbackhub_jwt_secret_key_2026_production_grade';
const JWT_EXPIRES_IN = '7d';

/**
 * Generate JWT token for authenticated user
 */
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user account
 * @access  Public
 */
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    // Check for existing duplicate user
    const existingUser = await db.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'This email address is already registered. Please log in.'
      });
    }

    // Hash password with bcrypt (salt rounds: 10)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user record
    const newUser = await db.user.create({
      data: {
        fullName: fullName.trim(),
        email: normalizedEmail,
        passwordHash
      }
    });

    // Generate 7-day JWT Token
    const token = generateToken({ id: newUser.id, email: newUser.email });

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during registration. Please try again later.'
    });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and retrieve token
 * @access  Public
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    // Verify user existence
    const user = await db.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email address or password'
      });
    }

    // Compare bcrypt password hash
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email address or password'
      });
    }

    // Generate JWT Token
    const token = generateToken({ id: user.id, email: user.email });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login. Please try again later.'
    });
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Get currently authenticated user details
 * @access  Protected
 */
export const getMe = async (req, res) => {
  try {
    const user = await db.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User account not found'
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get Current User Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve user profile'
    });
  }
};
