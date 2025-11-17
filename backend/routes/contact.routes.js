const express = require('express');
const { body } = require('express-validator');
const {
  sendContactEmail,
  getContacts,
  getContactById,
  updateContactStatus,
  respondToContact,
  getMyContacts,
} = require('../controllers/contact.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Validation rules for contact form
// Note: name and email are optional as they can be taken from authenticated user
const contactValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Tên phải có từ 2 đến 100 ký tự'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Email không hợp lệ')
    .normalizeEmail(),
  body('phone')
    .optional()
    .trim()
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('Số điện thoại không hợp lệ'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Tin nhắn là bắt buộc')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Tin nhắn phải có từ 10 đến 2000 ký tự'),
];

// Routes - requires authentication
router.post('/send', protect, contactValidation, sendContactEmail);

// Get user's own contact submissions
router.get('/my-contacts', protect, getMyContacts);

// Admin routes - require admin role
router.get('/', protect, authorize('admin'), getContacts);
router.get('/:id', protect, authorize('admin'), getContactById);
router.patch('/:id/status', protect, authorize('admin'), updateContactStatus);
router.post('/:id/reply', protect, authorize('admin'), respondToContact);

module.exports = router;

