const AnalyticsEvent = require('../models/AnalyticsEvent.model');

exports.trackEvent = async (req, res) => {
  try {
    const {
      path,
      referrer = '',
      source = 'website',
      sessionId = null,
      metadata = {},
    } = req.body;

    if (!path) {
      return res.status(400).json({
        status: 'error',
        message: 'Path is required',
      });
    }

    await AnalyticsEvent.create({
      path,
      referrer,
      source,
      sessionId,
      metadata,
      userAgent: req.headers['user-agent'] || '',
      ipAddress:
        req.headers['x-forwarded-for'] ||
        req.connection?.remoteAddress ||
        '',
    });

    return res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.error('trackEvent error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Unable to track analytics event',
    });
  }
};


