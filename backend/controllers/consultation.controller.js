const ConsultationRequest = require('../models/ConsultationRequest.model');
const Contact = require('../models/Contact.model');
const Newsletter = require('../models/Newsletter.model');

// Create consultation request (chatbot, get-in-touch)
exports.createConsultationRequest = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      preferredDate,
      message,
      source = 'other',
      tags = [],
      metadata = {},
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'Vui lòng cung cấp đầy đủ họ tên và email',
      });
    }

    const consultation = await ConsultationRequest.create({
      userId: req.user?._id || null,
      name,
      email,
      phone,
      preferredDate,
      message,
      source,
      tags,
      metadata,
    });

    return res.status(201).json({
      status: 'success',
      data: consultation,
    });
  } catch (error) {
    console.error('createConsultationRequest error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Không thể tạo yêu cầu tư vấn, vui lòng thử lại sau.',
    });
  }
};

// Get consultation requests (admin)
exports.getConsultations = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      source,
      search,
      sortOrder = 'desc',
    } = req.query;

    const contactQuery = {};
    const newsletterQuery = {};

    if (status) {
      contactQuery.status = status;
      newsletterQuery.subscribed = status !== 'unsubscribed';
    }

    if (search) {
      const regex = { $regex: search, $options: 'i' };
      contactQuery.$or = [
        { name: regex },
        { email: regex },
        { phone: regex },
        { message: regex },
      ];
      newsletterQuery.email = regex;
    }

    const includeContacts = !source || source === 'contact';
    const includeNewsletter = !source || source === 'newsletter';

    const [contacts, newsletters] = await Promise.all([
      includeContacts
        ? Contact.find(contactQuery)
            .select('name email phone message status createdAt')
            .lean()
        : [],
      includeNewsletter
        ? Newsletter.find(newsletterQuery)
            .select('email subscribed createdAt')
            .lean()
        : [],
    ]);

    const combined = [
      ...contacts.map((item) => ({
        id: String(item._id),
        origin: 'contact',
        name: item.name,
        email: item.email,
        phone: item.phone,
        message: item.message,
        status: item.status,
        source: 'contact',
        createdAt: item.createdAt,
      })),
      ...newsletters.map((item) => ({
        id: String(item._id),
        origin: 'newsletter',
        name: item.email?.split('@')[0] || 'Người đăng ký',
        email: item.email,
        phone: '',
        message: 'Đăng ký nhận bản tin',
        status: item.subscribed ? 'subscribed' : 'unsubscribed',
        source: 'newsletter',
        createdAt: item.createdAt,
      })),
    ];

    combined.sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const pageNum = parseInt(page, 10);
    const limitNum = Math.min(parseInt(limit, 10), 100);
    const start = (pageNum - 1) * limitNum;
    const paged = combined.slice(start, start + limitNum);

    return res.status(200).json({
      status: 'success',
      data: {
        consultations: paged,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: combined.length,
          pages: Math.ceil(combined.length / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('getConsultations error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Không thể lấy danh sách tư vấn.',
    });
  }
};

// Update consultation status/notes (admin)
exports.updateConsultation = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    let updated = await ConsultationRequest.findById(id);

    if (updated) {
      if (status) updated.status = status;
      if (adminNotes !== undefined) updated.adminNotes = adminNotes;
      updated.updatedBy = req.user?._id || null;
      await updated.save();
      return res.status(200).json({
        status: 'success',
        data: updated,
      });
    }

    const contact = await Contact.findById(id);
    if (contact) {
      if (status && ['pending', 'read', 'replied', 'archived'].includes(status)) {
        contact.status = status;
      }
      if (adminNotes !== undefined) {
        contact.adminNotes = adminNotes;
      }
      await contact.save();
      return res.status(200).json({
        status: 'success',
        data: contact,
      });
    }

    return res.status(404).json({
      status: 'error',
      message: 'Không tìm thấy yêu cầu tư vấn.',
    });
  } catch (error) {
    console.error('updateConsultation error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Không thể cập nhật yêu cầu tư vấn.',
    });
  }
};

// Get user's own consultation requests
exports.getMyConsultations = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = Math.min(parseInt(limit, 10), 50);
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      ConsultationRequest.find({ userId: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      ConsultationRequest.countDocuments({ userId: req.user._id }),
    ]);

    return res.status(200).json({
      status: 'success',
      data: {
        consultations: items,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('getMyConsultations error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Không thể lấy danh sách tư vấn của bạn.',
    });
  }
};


