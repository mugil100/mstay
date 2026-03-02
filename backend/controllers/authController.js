/**
 * controllers/authController.js - Authentication controller
 * Handles user registration, login, profile fetch, and logout.
 */

const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');

/**
 * @desc   Register a new user (student / owner)
 * @route  POST /api/auth/register
 * @access Public
 */
const register = async (req, res) => {
    // TODO: Validate input with validator utility
    // TODO: Check if email already exists
    // TODO: Create new User document
    // TODO: Generate JWT and return with user data
    res.status(201).json({ message: 'register – not yet implemented' });
};

/**
 * @desc   Login existing user
 * @route  POST /api/auth/login
 * @access Public
 */
const login = async (req, res) => {
    // TODO: Find user by email (with password selected)
    // TODO: Validate password using user.comparePassword()
    // TODO: Generate JWT token
    // TODO: Return token + user profile
    res.status(200).json({ message: 'login – not yet implemented' });
};

/**
 * @desc   Get currently authenticated user profile
 * @route  GET /api/auth/me
 * @access Private
 */
const getMe = async (req, res) => {
    // TODO: Return req.user (populated by authMiddleware)
    res.status(200).json({ message: 'getMe – not yet implemented' });
};

/**
 * @desc   Logout user (client-side token removal; server-side blacklist optional)
 * @route  POST /api/auth/logout
 * @access Private
 * TODO: Implement token blacklist with Redis for server-side invalidation
 */
const logout = async (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { register, login, getMe, logout };
