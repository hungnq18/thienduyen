const express = require('express');
const { trackEvent } = require('../controllers/analytics.controller');

const router = express.Router();

router.post('/track', trackEvent);

module.exports = router;


