const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Import passport config
require('./config/passport');

// Import routes
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/chat.routes');
const contactRoutes = require('./routes/contact.routes');
const newsletterRoutes = require('./routes/newsletter.routes');

// Initialize express app
const app = express();

// Middleware
// CORS configuration - allow requests from frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || process.env.CORS_ORIGIN || '*',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Log registered routes
console.log('📋 Registered routes:');
console.log('   POST /api/auth/register');
console.log('   POST /api/auth/login');
console.log('   GET  /api/auth/me');
console.log('   GET  /api/auth/google');
console.log('   GET  /api/auth/google/callback');
console.log('   GET  /api/auth/facebook');
console.log('   GET  /api/auth/facebook/callback');
console.log('   POST /api/chat/message');
console.log('   POST /api/contact/send');
console.log('   GET  /api/contact/my-contacts');
console.log('   GET  /api/contact (admin)');
console.log('   GET  /api/contact/:id (admin)');
console.log('   PATCH /api/contact/:id/status (admin)');
console.log('   POST /api/newsletter/subscribe');
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
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET  /api/auth/me',
      'GET  /api/auth/google',
      'GET  /api/auth/google/callback',
      'GET  /api/auth/facebook',
      'GET  /api/auth/facebook/callback',
      'POST /api/chat/message',
      'POST /api/contact/send',
      'GET  /api/contact/my-contacts',
      'GET  /api/contact (admin)',
      'GET  /api/contact/:id (admin)',
      'PATCH /api/contact/:id/status (admin)',
      'POST /api/newsletter/subscribe',
      'GET /api/chat/test',
      'GET /api/health'
    ]
  });
});

// Start server
const PORT = process.env.PORT || 5000;

// Get base URL for logging
const getBaseUrl = () => {
  if (process.env.BACKEND_URL) {
    return process.env.BACKEND_URL;
  }
  if (process.env.NODE_ENV === 'production') {
    return process.env.PRODUCTION_BACKEND_URL || `https://your-backend-domain.com:${PORT}`;
  }
  return `http://localhost:${PORT}`;
};

// Start server immediately (MongoDB connection is optional for chat API)
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📍 API Base URL: ${getBaseUrl()}`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`📍 Frontend URL: ${process.env.FRONTEND_URL || 'Not configured'}`);
    console.log(`📍 Google Callback: ${process.env.GOOGLE_CALLBACK_URL || `${getBaseUrl()}/api/auth/google/callback`}`);
  }
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

