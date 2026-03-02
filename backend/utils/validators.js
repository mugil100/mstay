/**
 * utils/validators.js - Input validation helpers
 * TODO: Replace with Joi or express-validator for production-grade validation
 */

/**
 * validateEmail - Basic email format check
 */
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

/**
 * validatePassword - Minimum length check
 */
const validatePassword = (password) => {
    return password && password.length >= 6;
};

module.exports = { validateEmail, validatePassword };
