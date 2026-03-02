/**
 * utils/generateToken.js - JWT token generation utility
 */

const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');

/**
 * generateToken - Creates a signed JWT for a user
 * @param {string} userId - MongoDB user _id
 * @returns {string} JWT token string
 */
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

module.exports = { generateToken };
