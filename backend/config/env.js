/**
 * config/env.js - Centralised environment variable loader
 * All env vars are accessed through this file for consistency.
 */

require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/movstay',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_dev',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    NODE_ENV: process.env.NODE_ENV || 'development',

    // TODO: Add AI service API keys here (e.g., OpenAI, Gemini)
    // AI_SERVICE_API_KEY: process.env.AI_SERVICE_API_KEY,
};
