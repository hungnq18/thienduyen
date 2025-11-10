const express = require('express');
const router = express.Router();

// Try to load controller with error handling
let chatController;
try {
  chatController = require('../controllers/chat.controller');
} catch (error) {
  console.error('❌ Error loading chat controller:', error);
  chatController = {
    sendMessage: (req, res) => {
      res.status(500).json({
        status: 'error',
        message: 'Chat controller not loaded properly',
      });
    },
  };
}

// POST /api/chat/message - Send message to ChatGPT
router.post('/message', (req, res, next) => {
  console.log('📨 Received chat message request:', req.body);
  chatController.sendMessage(req, res).catch(next);
});

// Test route
router.get('/test', (req, res) => {
  res.json({
    status: 'success',
    message: 'Chat route is working!',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;

