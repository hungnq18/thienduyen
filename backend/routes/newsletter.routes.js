const express = require('express');
const router = express.Router();
const { subscribeNewsletter } = require('../controllers/newsletter.controller');

// Subscribe to newsletter (public route)
router.post('/subscribe', subscribeNewsletter);

module.exports = router;

