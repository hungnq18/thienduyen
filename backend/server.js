const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/chat.routes');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Log registered routes
console.log('📋 Registered routes:');
console.log('   POST /api/chat/message');
console.log('   GET  /api/health');

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'success', 
    message: 'ThienDuyen API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    status: 'error',
    message: `Route not found: ${req.method} ${req.path}`,
    availableRoutes: [
      'POST /api/chat/message',
      'GET /api/chat/test',
      'GET /api/health'
    ]
  });
});

// Start server
const PORT = process.env.PORT || 5000;

// Start server immediately (MongoDB connection is optional for chat API)
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
});

// Connect to MongoDB (optional - only needed for auth features)
const MONGODB_URI = process.env.MONGODB_URI || '';

if (MONGODB_URI && MONGODB_URI !== '') {
  // MongoDB connection options
  const mongooseOptions = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  // Add TLS options for MongoDB Atlas (cloud)
  if (MONGODB_URI.includes('mongodb+srv')) {
    mongooseOptions.tls = true;
    mongooseOptions.tlsAllowInvalidCertificates = false;
  }

  mongoose
    .connect(MONGODB_URI, mongooseOptions)
    .then(() => {
      console.log('✅ MongoDB connected successfully');
      console.log(`📍 Database: ${MONGODB_URI.includes('mongodb+srv') ? 'MongoDB Atlas (Cloud)' : 'MongoDB Local'}`);
    })
    .catch((err) => {
      console.warn('⚠️  MongoDB connection failed (chat API will still work):', err.message);
      console.log('\n💡 Note: Chat API does not require MongoDB. Auth features will be unavailable.');
      console.log('\n💡 To fix MongoDB connection:');
      if (MONGODB_URI.includes('mongodb+srv')) {
        console.log('   1. Check your MongoDB Atlas connection string');
        console.log('   2. Verify your username and password');
        console.log('   3. Check IP Whitelist in MongoDB Atlas (Network Access)');
        console.log('   4. Make sure your cluster is active');
      } else {
        console.log('   1. Make sure MongoDB is running locally');
        console.log('   2. Try: mongod (to start MongoDB)');
        console.log('   3. Or use MongoDB Compass');
      }
    });
} else {
  console.log('ℹ️  MongoDB connection skipped (using default URI). Chat API is available.');
}

module.exports = app;

