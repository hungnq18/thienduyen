const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth.routes');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

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
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/thienduyen';

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
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('\n💡 Troubleshooting:');
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
    process.exit(1);
  });

module.exports = app;

