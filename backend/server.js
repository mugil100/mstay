/**
 * server.js - Entry point for MOV Stay backend
 * Starts the Express server and connects to MongoDB.
 */

const app = require('./app');
const connectDB = require('./config/db');
const { PORT } = require('./config/env');

// Connect to MongoDB
connectDB();

// Start Express server
app.listen(PORT, () => {
  console.log(`🚀 MOV Stay server running on port ${PORT}`);
});
