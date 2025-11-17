const express = require('express');
const { body, validationResult } = require('express-validator');
const {
  createConsultationRequest,
  getConsultations,
  updateConsultation,
  getMyConsultations,
} = require('../controllers/consultation.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

const validationRules = [
  body('name').trim().isLength({ min: 2 }).withMessage('Tên phải có ít nhất 2 ký tự'),
  body('email').isEmail().withMessage('Email không hợp lệ').normalizeEmail(),
  body('message').optional().isLength({ max: 4000 }).withMessage('Tin nhắn quá dài'),
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  return next();
};

router.post('/', validationRules, handleValidation, createConsultationRequest);
router.get('/mine', protect, getMyConsultations);

router.get('/', protect, authorize('admin'), getConsultations);
router.patch('/:id', protect, authorize('admin'), updateConsultation);

module.exports = router;


