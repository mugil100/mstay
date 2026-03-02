/**
 * middleware/authMiddleware.js - JWT authentication middleware
 * Attaches verified user to req.user for downstream handlers.
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config/env');

/**
 * protect - Verifies JWT and attaches user to request
 * Usage: router.get('/protected', protect, handler)
 */
const protect = async (req, res, next) => {
    try {
        let token;

        // Extract Bearer token from Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized – no token provided' });
        }

        // Verify and decode token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach user to request (exclude password)
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(401).json({ message: 'User no longer exists' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized – invalid token' });
    }
};

module.exports = { protect };
