const dayjs = require('dayjs');
const User = require('../models/User.model');
const Contact = require('../models/Contact.model');
const Newsletter = require('../models/Newsletter.model');
const ConsultationRequest = require('../models/ConsultationRequest.model');
const AnalyticsEvent = require('../models/AnalyticsEvent.model');
const Service = require('../models/Service.model');
const BlogPost = require('../models/BlogPost.model');

const generateSlug = (text = '') =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');

exports.getDashboardStats = async (req, res) => {
  try {
    const now = dayjs();
    const sevenDaysAgo = now.subtract(6, 'day').toDate();

    const [
      totalUsers,
      newUsersToday,
      totalContacts,
      pendingContacts,
      totalNewsletterEntries,
      newsletterSubscribers,
      dailyConsultations,
      dailyVisitors,
      recentConsultations,
      recentContacts,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: now.startOf('day').toDate() } }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'pending' }),
      Newsletter.countDocuments(),
      Newsletter.countDocuments({ subscribed: true }),
      ConsultationRequest.aggregate([
        { $match: { createdAt: { $gte: sevenDaysAgo } } },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      AnalyticsEvent.aggregate([
        { $match: { createdAt: { $gte: sevenDaysAgo } } },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      ConsultationRequest.find().sort({ createdAt: -1 }).limit(5),
      Contact.find().sort({ createdAt: -1 }).limit(5).select('name email status createdAt'),
    ]);

    const totalConsultations = totalContacts + totalNewsletterEntries;
    const pendingConsultations = pendingContacts;

    const fillMissingDays = (data) => {
      const result = [];
      for (let i = 6; i >= 0; i -= 1) {
        const date = now.subtract(i, 'day').format('YYYY-MM-DD');
        const found = data.find((item) => item._id === date);
        result.push({
          date,
          count: found ? found.count : 0,
        });
      }
      return result;
    };

    return res.status(200).json({
      status: 'success',
      data: {
        totals: {
          totalUsers,
          newUsersToday,
          totalContacts,
          pendingContacts,
          totalConsultations,
          pendingConsultations,
          newsletterSubscribers,
        },
        charts: {
          consultations: fillMissingDays(dailyConsultations),
          visitors: fillMissingDays(dailyVisitors),
        },
        recentConsultations,
        recentContacts,
      },
    });
  } catch (error) {
    console.error('getDashboardStats error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Không thể lấy thống kê dashboard.',
    });
  }
};

exports.getTrafficStats = async (req, res) => {
  try {
    const range = parseInt(req.query.range || '7', 10);
    const startDate = dayjs().subtract(range - 1, 'day').startOf('day').toDate();

    const [dailyViews, topPages, topReferrers] = await Promise.all([
      AnalyticsEvent.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      AnalyticsEvent.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: '$path',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      AnalyticsEvent.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate },
            referrer: { $ne: '' },
          },
        },
        {
          $group: {
            _id: '$referrer',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
    ]);

    return res.status(200).json({
      status: 'success',
      data: {
        dailyViews,
        topPages,
        topReferrers,
      },
    });
  } catch (error) {
    console.error('getTrafficStats error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Không thể lấy thống kê truy cập.',
    });
  }
};

// Users listing for admin
exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = Math.min(parseInt(limit, 10), 100);
    const skip = (pageNum - 1) * limitNum;
    const query = {};

    if (search) {
      query.$or = [
        { email: { $regex: search, $options: 'i' } },
        { fullName: { $regex: search, $options: 'i' } },
      ];
    }

    const [users, total] = await Promise.all([
      User.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .select('-password'),
      User.countDocuments(query),
    ]);

    return res.status(200).json({
      status: 'success',
      data: {
        users,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('getUsers error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Không thể lấy danh sách người dùng.',
    });
  }
};

// Services CRUD
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    return res.status(200).json({
      status: 'success',
      data: services,
    });
  } catch (error) {
    console.error('getServices error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Không thể lấy danh sách dịch vụ.',
    });
  }
};

exports.createService = async (req, res) => {
  try {
    const payload = req.body;
    const slug = payload.slug ? generateSlug(payload.slug) : generateSlug(payload.title);

    const service = await Service.create({
      ...payload,
      slug,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    });

    return res.status(201).json({
      status: 'success',
      data: service,
    });
  } catch (error) {
    console.error('createService error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Không thể tạo dịch vụ mới.',
    });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    if (payload.slug) {
      payload.slug = generateSlug(payload.slug);
    } else if (payload.title) {
      payload.slug = generateSlug(payload.title);
    }

    const service = await Service.findByIdAndUpdate(
      id,
      {
        ...payload,
        updatedBy: req.user._id,
      },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy dịch vụ.',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: service,
    });
  } catch (error) {
    console.error('updateService error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Không thể cập nhật dịch vụ.',
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy dịch vụ.',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Đã xoá dịch vụ.',
    });
  } catch (error) {
    console.error('deleteService error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Không thể xoá dịch vụ.',
    });
  }
};

// Blogs CRUD
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find().sort({ createdAt: -1 });
    return res.status(200).json({
      status: 'success',
      data: blogs,
    });
  } catch (error) {
    console.error('getBlogs error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Không thể lấy danh sách blog.',
    });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const payload = req.body;
    const slug = payload.slug ? generateSlug(payload.slug) : generateSlug(payload.title);

    const blog = await BlogPost.create({
      ...payload,
      slug,
      publishedAt: payload.status === 'published' ? payload.publishedAt || new Date() : null,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    });

    return res.status(201).json({
      status: 'success',
      data: blog,
    });
  } catch (error) {
    console.error('createBlog error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Không thể tạo bài viết mới.',
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    if (payload.slug) {
      payload.slug = generateSlug(payload.slug);
    } else if (payload.title) {
      payload.slug = generateSlug(payload.title);
    }

    if (payload.status === 'published' && !payload.publishedAt) {
      payload.publishedAt = new Date();
    }

    const blog = await BlogPost.findByIdAndUpdate(
      id,
      {
        ...payload,
        updatedBy: req.user._id,
      },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy bài viết.',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: blog,
    });
  } catch (error) {
    console.error('updateBlog error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Không thể cập nhật bài viết.',
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogPost.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy bài viết.',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Đã xoá bài viết.',
    });
  } catch (error) {
    console.error('deleteBlog error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Không thể xoá bài viết.',
    });
  }
};


