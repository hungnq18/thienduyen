const nodemailer = require('nodemailer');
const Contact = require('../models/Contact.model');

const getEnvVar = (keys, defaultValue) => {
  const keyList = Array.isArray(keys) ? keys : [keys];
  for (const key of keyList) {
    const value = process.env[key];
    if (value !== undefined && value !== '') {
      return { key, value };
    }
  }
  return { key: keyList[0], value: defaultValue };
};

const resolveEmailConfig = () => {
  const smtpHost = getEnvVar(['SMTP_HOST', 'EMAIL_HOST']);
  const smtpPort = getEnvVar(['SMTP_PORT', 'EMAIL_PORT']);
  const smtpSecure = getEnvVar(['SMTP_SECURE', 'EMAIL_SECURE']);
  const smtpUser = getEnvVar(['EMAIL_USER', 'SMTP_USER']);
  const smtpPass = getEnvVar(['EMAIL_PASSWORD', 'SMTP_PASSWORD']);
  const emailService = getEnvVar(['EMAIL_SERVICE']);
  const adminEmail = getEnvVar(['ADMIN_EMAIL', 'EMAIL_ADMIN', 'SMTP_ADMIN_EMAIL']);
  const fromName = getEnvVar(['EMAIL_FROM_NAME', 'SMTP_FROM_NAME', 'MAIL_FROM_NAME'], 'ThienDuyen');

  return {
    smtpHost,
    smtpPort,
    smtpSecure,
    smtpUser,
    smtpPass,
    emailService,
    adminEmail,
    fromName,
  };
};

// Create transporter - configure with your email service
// Supports both service-based (Gmail, Outlook) and custom SMTP
const createTransporter = () => {
  const { smtpHost, smtpPort, smtpSecure, smtpUser, smtpPass, emailService } = resolveEmailConfig();

  if (smtpHost.value && smtpPort.value) {
    const brevoDetected = Boolean(
      (smtpHost.value && smtpHost.value.includes('brevo.com')) ||
      (smtpHost.value && smtpHost.value.includes('smtp-relay.sendinblue.com')) ||
      (smtpPass.value && smtpPass.value.startsWith('xsmtpsib-'))
    );

    console.log('📧 SMTP Configuration:');
    console.log(`   Host (${smtpHost.key}): ${smtpHost.value}`);
    console.log(`   Port (${smtpPort.key}): ${smtpPort.value}`);
    console.log(`   Secure (${smtpSecure.key}): ${smtpSecure.value}`);
    console.log(`   User (${smtpUser.key}): ${smtpUser.value}`);
    console.log(`   Password (${smtpPass.key}): ${smtpPass.value ? '***' + smtpPass.value.slice(-4) : 'NOT SET'}`);
    console.log(`   BrevoDetected: ${brevoDetected}`);

    return nodemailer.createTransport({
      host: smtpHost.value,
      port: parseInt(smtpPort.value, 10) || 587,
      secure: String(smtpSecure.value).toLowerCase() === 'true',
      auth: {
        user: smtpUser.value,
        pass: smtpPass.value,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production',
      },
      connectionTimeout: 20000, // 20 seconds
      greetingTimeout: 20000, // 20 seconds
      socketTimeout: 20000, // 20 seconds
      debug: process.env.NODE_ENV === 'development',
      logger: process.env.NODE_ENV === 'development',
    });
  }

  console.log('📧 Email Service Configuration:');
  console.log(`   Service (${emailService.key}): ${emailService.value || 'gmail'}`);
  console.log(`   User (${smtpUser.key}): ${smtpUser.value}`);
  console.log(`   Password (${smtpPass.key}): ${smtpPass.value ? '***' + smtpPass.value.slice(-4) : 'NOT SET'}`);

  return nodemailer.createTransport({
    service: emailService.value || 'gmail',
    auth: {
      user: smtpUser.value,
      pass: smtpPass.value,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === 'production',
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000, // 10 seconds
    socketTimeout: 10000, // 10 seconds
    debug: process.env.NODE_ENV === 'development',
    logger: process.env.NODE_ENV === 'development',
  });
};

// Retry helper with exponential backoff
const retryWithBackoff = async (fn, maxRetries = 3, initialDelay = 1000) => {
  let lastError;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      // Don't retry on authentication errors
      if (error.code === 'EAUTH') {
        throw error;
      }
      // Retry on timeout or connection errors
      if (error.code === 'ETIMEDOUT' || error.code === 'ETIMEOUT' || error.code === 'ECONNECTION') {
        if (attempt < maxRetries - 1) {
          const delay = initialDelay * Math.pow(2, attempt);
          console.log(`⚠️  Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }
      throw error;
    }
  }
  throw lastError;
};

// Send contact form email
const sendContactEmail = async (req, res) => {
  try {
    const user = req.user;
    const { name, email, phone, message } = req.body;
    const emailConfig = resolveEmailConfig();

    const finalEmail = email || user.email;
    const finalName = name || user.fullName || user.email;

    if (!finalName || !message) {
      return res.status(400).json({
        status: 'error',
        message: 'Vui lòng điền đầy đủ thông tin: Tên và Tin nhắn là bắt buộc',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(finalEmail)) {
      return res.status(400).json({
        status: 'error',
        message: 'Email không hợp lệ',
      });
    }

    if (!emailConfig.smtpUser.value || !emailConfig.smtpPass.value) {
      console.error('Email service not configured. Please set the SMTP credentials in .env');
      console.error(`   ${emailConfig.smtpUser.key}: ${emailConfig.smtpUser.value || 'NOT SET'}`);
      console.error(`   ${emailConfig.smtpPass.key}: ${emailConfig.smtpPass.value ? '***' + emailConfig.smtpPass.value.slice(-4) : 'NOT SET'}`);
      return res.status(500).json({
        status: 'error',
        message: 'Email service chưa được cấu hình. Vui lòng liên hệ quản trị viên.',
      });
    }

    const contactData = {
      userId: user._id,
      name: finalName,
      email: finalEmail,
      phone: phone || undefined,
      message: message,
      emailSent: false,
    };

    let savedContact;
    try {
      savedContact = await Contact.create(contactData);
    } catch (dbError) {
      console.error('Error saving contact to database:', dbError);
    }

    const transporter = createTransporter();

    const sanitize = (str) => {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const sanitizedName = sanitize(finalName);
    const sanitizedEmail = sanitize(finalEmail);
    const sanitizedPhone = phone ? sanitize(phone) : '';
    const sanitizedMessage = sanitize(message).replace(/\n/g, '<br>');

    const fromName = emailConfig.fromName.value || 'ThienDuyen';
    const fromEmail = emailConfig.smtpUser.value;

    const adminMailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: emailConfig.adminEmail.value || emailConfig.smtpUser.value,
      replyTo: sanitizedEmail,
      subject: `Liên hệ mới từ ${sanitizedName} - ThienDuyen`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #610912;">Thông tin liên hệ mới</h2>
          <div style="background-color: #f8fbf2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Tên:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
            ${sanitizedPhone ? `<p><strong>Số điện thoại:</strong> ${sanitizedPhone}</p>` : ''}
            <p><strong>Tin nhắn:</strong></p>
            <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px;">${sanitizedMessage}</p>
          </div>
          <p style="color: #666; font-size: 12px;">Thời gian: ${new Date().toLocaleString('vi-VN')}</p>
        </div>
      `,
    };

    const userMailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: sanitizedEmail,
      subject: 'Cảm ơn bạn đã liên hệ với ThienDuyen',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #610912;">Xin chào ${sanitizedName},</h2>
          <p>Cảm ơn bạn đã liên hệ với <strong>ThienDuyen</strong>!</p>
          <p>Chúng tôi đã nhận được thông tin của bạn và sẽ phản hồi trong thời gian sớm nhất.</p>
          <div style="background-color: #f8fbf2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Thông tin bạn đã gửi:</strong></p>
            <p><strong>Email:</strong> ${sanitizedEmail}</p>
            ${sanitizedPhone ? `<p><strong>Số điện thoại:</strong> ${sanitizedPhone}</p>` : ''}
            <p><strong>Tin nhắn:</strong></p>
            <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px;">${sanitizedMessage}</p>
          </div>
          <p>Trân trọng,<br><strong>Đội ngũ ThienDuyen</strong></p>
        </div>
      `,
    };

    try {
      // Verify connection first with retry
      await retryWithBackoff(async () => {
        await transporter.verify();
        console.log('✅ SMTP connection verified successfully');
      }, 2, 2000);
      
      // Send admin email with detailed response logging and retry
      const adminResponse = await retryWithBackoff(async () => {
        return await transporter.sendMail(adminMailOptions);
      }, 3, 1000);
      console.log('📨 Admin email SMTP response:', {
        messageId: adminResponse.messageId,
        response: adminResponse.response,
        accepted: adminResponse.accepted,
        rejected: adminResponse.rejected,
        pending: adminResponse.pending,
      });
      
      // Check if email was only queued (not necessarily delivered)
      if (adminResponse.response && adminResponse.response.includes('queued')) {
        console.warn('⚠️  WARNING: Email was QUEUED, not necessarily DELIVERED');
        console.warn('   Email may be rejected later by spam filters or domain verification');
        console.warn('   Check your email service dashboard (Brevo) for actual delivery status');
        console.warn('   Message ID:', adminResponse.messageId);
      }
      
      if (adminResponse.rejected && adminResponse.rejected.length > 0) {
        console.error('❌ Admin email was REJECTED:', adminResponse.rejected);
        throw new Error(`Email rejected: ${adminResponse.rejected.join(', ')}`);
      }
      
      console.log('✅ Admin email accepted by SMTP server (may still be queued)');
      
      // Send user confirmation email with detailed response logging and retry
      const userResponse = await retryWithBackoff(async () => {
        return await transporter.sendMail(userMailOptions);
      }, 3, 1000);
      console.log('📨 User email SMTP response:', {
        messageId: userResponse.messageId,
        response: userResponse.response,
        accepted: userResponse.accepted,
        rejected: userResponse.rejected,
        pending: userResponse.pending,
      });
      
      // Check if email was only queued
      if (userResponse.response && userResponse.response.includes('queued')) {
        console.warn('⚠️  WARNING: Email was QUEUED, not necessarily DELIVERED');
        console.warn('   Email may be rejected later by spam filters or domain verification');
        console.warn('   Check your email service dashboard (Brevo) for actual delivery status');
        console.warn('   Message ID:', userResponse.messageId);
        console.warn('');
        console.warn('   🔍 Common reasons emails don\'t arrive:');
        console.warn('   1. Domain not verified in Brevo');
        console.warn('   2. SPF/DKIM/DMARC records not configured');
        console.warn('   3. Email went to spam folder (check spam/promotions)');
        console.warn('   4. Recipient email provider blocked the email');
        console.warn('   5. Brevo account limits reached');
        console.warn('');
        console.warn('   💡 To check delivery status:');
        console.warn('   - Login to Brevo dashboard');
        console.warn('   - Go to Transactional > Logs');
        console.warn('   - Search by Message ID:', userResponse.messageId);
      }
      
      if (userResponse.rejected && userResponse.rejected.length > 0) {
        console.error('❌ User email was REJECTED:', userResponse.rejected);
        throw new Error(`Email rejected: ${userResponse.rejected.join(', ')}`);
      }
      
      console.log('✅ User confirmation email accepted by SMTP server (may still be queued)');

      // Update contact record to mark email as sent
      if (savedContact) {
        savedContact.emailSent = true;
        savedContact.emailSentAt = new Date();
        await savedContact.save();
      }
    } catch (emailError) {
      console.error('❌ Error sending email:', emailError);
      console.error('Error code:', emailError.code);
      console.error('Error response:', emailError.response);
      
      // Provide helpful error messages
      let errorMessage = 'Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau.';
      
      if (emailError.code === 'EAUTH') {
        errorMessage = `Lỗi xác thực email. Vui lòng kiểm tra lại cấu hình ${emailConfig.smtpUser.key} và ${emailConfig.smtpPass.key} trong .env`;
        console.error('❌ LỖI: Invalid login:', emailError.response || emailError.message);
        console.error('   Code:', emailError.code);
        console.error('   Response:', emailError.response || 'N/A');
        console.error(`   ${emailConfig.smtpHost.key}:`, emailConfig.smtpHost.value || 'NOT SET');
        console.error(`   ${emailConfig.smtpPort.key}:`, emailConfig.smtpPort.value || 'NOT SET');
        console.error(`   ${emailConfig.smtpSecure.key}:`, emailConfig.smtpSecure.value || 'NOT SET');
        console.error(`   ${emailConfig.smtpUser.key}:`, emailConfig.smtpUser.value || 'NOT SET');
        console.error(`   ${emailConfig.smtpPass.key}:`, emailConfig.smtpPass.value ? '***' + emailConfig.smtpPass.value.slice(-4) : 'NOT SET');
        console.error('   BrevoDetected:', Boolean(
          (emailConfig.smtpHost.value && emailConfig.smtpHost.value.includes('brevo.com')) ||
          (emailConfig.smtpHost.value && emailConfig.smtpHost.value.includes('smtp-relay.sendinblue.com')) ||
          (emailConfig.smtpPass.value && emailConfig.smtpPass.value.startsWith('xsmtpsib-'))
        ));
      } else if (emailError.code === 'ECONNECTION') {
        errorMessage = 'Không thể kết nối đến SMTP server. Vui lòng kiểm tra SMTP_HOST và SMTP_PORT';
        console.error('💡 Troubleshooting:');
        console.error('   1. Kiểm tra SMTP_HOST và SMTP_PORT đúng chưa');
        console.error('   2. Kiểm tra firewall/network không chặn port 587');
        console.error('   3. Thử port 465 với SMTP_SECURE=true');
      } else if (emailError.code === 'ETIMEDOUT' || emailError.code === 'ETIMEOUT') {
        errorMessage = 'Kết nối đến SMTP server bị timeout. Vui lòng thử lại sau hoặc kiểm tra kết nối mạng.';
        console.error('💡 Troubleshooting ETIMEDOUT:');
        console.error('   1. Kiểm tra kết nối mạng của server');
        console.error('   2. Kiểm tra SMTP server có đang hoạt động không');
        console.error('   3. Kiểm tra firewall có chặn kết nối không');
        console.error('   4. Thử tăng timeout hoặc kiểm tra DNS resolution');
        console.error(`   ${emailConfig.smtpHost.key}:`, emailConfig.smtpHost.value || 'NOT SET');
        console.error(`   ${emailConfig.smtpPort.key}:`, emailConfig.smtpPort.value || 'NOT SET');
      }
      
      // Contact is already saved, so we still return success
      // but log the email error
      if (savedContact) {
        savedContact.emailSent = false;
        await savedContact.save();
      }
      
      // Throw error with helpful message
      const enhancedError = new Error(errorMessage);
      enhancedError.code = emailError.code;
      enhancedError.originalError = emailError;
      throw enhancedError;
    }

    res.status(200).json({
      status: 'success',
      message: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.',
      contactId: savedContact?._id,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      status: 'error',
      message: 'Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Get all contact submissions (Admin only)
const getContacts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    // Build query
    const query = {};

    // Filter by status
    if (status && ['pending', 'read', 'replied', 'archived'].includes(status)) {
      query.status = status;
    }

    // Search by name, email, or message
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Sort
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Get contacts with user info
    const contacts = await Contact.find(query)
      .populate('userId', 'fullName email')
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Get total count
    const total = await Contact.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        contacts,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({
      status: 'error',
      message: 'Có lỗi xảy ra khi lấy danh sách liên hệ.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Get single contact by ID
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id).populate('userId', 'fullName email');

    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy liên hệ.',
      });
    }

    res.status(200).json({
      status: 'success',
      data: contact,
    });
  } catch (error) {
    console.error('Error getting contact:', error);
    res.status(500).json({
      status: 'error',
      message: 'Có lỗi xảy ra khi lấy thông tin liên hệ.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Update contact status
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy liên hệ.',
      });
    }

    // Update status if provided
    if (status && ['pending', 'read', 'replied', 'archived'].includes(status)) {
      contact.status = status;
    }

    // Update admin notes if provided
    if (adminNotes !== undefined) {
      contact.adminNotes = adminNotes;
    }

    await contact.save();

    res.status(200).json({
      status: 'success',
      message: 'Cập nhật trạng thái thành công.',
      data: contact,
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({
      status: 'error',
      message: 'Có lỗi xảy ra khi cập nhật liên hệ.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Get user's own contact submissions
const getMyContacts = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const contacts = await Contact.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await Contact.countDocuments({ userId });

    res.status(200).json({
      status: 'success',
      data: {
        contacts,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('Error getting user contacts:', error);
    res.status(500).json({
      status: 'error',
      message: 'Có lỗi xảy ra khi lấy danh sách liên hệ của bạn.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

module.exports = {
  sendContactEmail,
  getContacts,
  getContactById,
  updateContactStatus,
  getMyContacts,
};

