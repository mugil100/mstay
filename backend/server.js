require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
require('./utils/passportConfig');  // Load Google OAuth strategy

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(passport.initialize());  // Passport (no sessions — JWT only)

// Routes
const pgRoutes = require('./routes/pgRoutes');
const roomRoutes = require('./routes/roomRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/pg', pgRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Server Error:', err);
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        error: err
    });
});

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(`✅ MongoDB Connected to database: ${mongoose.connection.name} (Cloudinary Ready)`))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Start server (Only if not in Vercel environment)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
