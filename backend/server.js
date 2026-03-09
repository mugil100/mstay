require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const pgRoutes = require('./routes/pgRoutes');
const roomRoutes = require('./routes/roomRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

app.use('/api/pg', pgRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/upload', uploadRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(`✅ MongoDB Connected to database: ${mongoose.connection.name}`))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
