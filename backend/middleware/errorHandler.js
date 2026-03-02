/**
 * middleware/errorHandler.js - Global error handling middleware
 * Must be registered LAST in app.js (after all routes).
 */

const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.stack}`);

    const statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        // Stack trace only exposed in development
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

module.exports = { errorHandler };
