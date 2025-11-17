const express = require('express');
const {
  getDashboardStats,
  getTrafficStats,
  getUsers,
  getServices,
  createService,
  updateService,
  deleteService,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/admin.controller');
const {
  getConsultations,
  updateConsultation,
} = require('../controllers/consultation.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/stats', getDashboardStats);
router.get('/traffic', getTrafficStats);
router.get('/users', getUsers);

// Consultations
router.get('/consultations', getConsultations);
router.patch('/consultations/:id', updateConsultation);

// Services
router.get('/services', getServices);
router.post('/services', createService);
router.patch('/services/:id', updateService);
router.delete('/services/:id', deleteService);

// Blogs
router.get('/blogs', getBlogs);
router.post('/blogs', createBlog);
router.patch('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);

module.exports = router;


