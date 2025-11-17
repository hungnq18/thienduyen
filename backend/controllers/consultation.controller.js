const ConsultationRequest = require('../models/ConsultationRequest.model');

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
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (source) {
      query.source = source;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = Math.min(parseInt(limit, 10), 100);
    const skip = (pageNum - 1) * limitNum;

    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [items, total] = await Promise.all([
      ConsultationRequest.find(query).sort(sort).skip(skip).limit(limitNum),
      ConsultationRequest.countDocuments(query),
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

    const consultation = await ConsultationRequest.findById(id);

    if (!consultation) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy yêu cầu tư vấn.',
      });
    }

    if (status) {
      consultation.status = status;
    }

    if (adminNotes !== undefined) {
      consultation.adminNotes = adminNotes;
    }

    consultation.updatedBy = req.user?._id || null;
    await consultation.save();

    return res.status(200).json({
      status: 'success',
      data: consultation,
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


