const nodemailer = require('nodemailer');
const Newsletter = require('../models/Newsletter.model');

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
  const smtpHost = getEnvVar(['SMTP_HOST', 'EMAIL_HOST'], 'smtp.gmail.com');
  const smtpPort = getEnvVar(['SMTP_PORT', 'EMAIL_PORT'], '587');
  const smtpSecure = getEnvVar(['SMTP_SECURE', 'EMAIL_SECURE'], 'false');
  const smtpUser = getEnvVar(['EMAIL_USER', 'SMTP_USER']);
  const smtpPass = getEnvVar(['EMAIL_APP_PASSWORD', 'SMTP_APP_PASSWORD', 'EMAIL_PASSWORD', 'SMTP_PASSWORD']);
  const emailService = getEnvVar(['EMAIL_SERVICE'], 'gmail');
  const fromName = getEnvVar(['EMAIL_FROM_NAME', 'SMTP_FROM_NAME', 'MAIL_FROM_NAME'], 'ThienDuyen');

  return {
    smtpHost,
    smtpPort,
    smtpSecure,
    smtpUser,
    smtpPass,
    emailService,
    fromName,
  };
};

// Create transporter
const createTransporter = () => {
  const { smtpHost, smtpPort, smtpSecure, smtpUser, smtpPass } = resolveEmailConfig();

  console.log('📧 Gmail SMTP configuration (newsletter):');
  console.log(`   Host (${smtpHost.key}): ${smtpHost.value}`);
  console.log(`   Port (${smtpPort.key}): ${smtpPort.value}`);
  console.log(`   Secure (${smtpSecure.key}): ${smtpSecure.value}`);
  console.log(`   User (${smtpUser.key}): ${smtpUser.value}`);
  console.log(`   App Password (${smtpPass.key}): ${smtpPass.value ? '***' + smtpPass.value.slice(-4) : 'NOT SET'}`);

  return nodemailer.createTransport({
    host: smtpHost.value || 'smtp.gmail.com',
    port: parseInt(smtpPort.value, 10) || 587,
    secure: String(smtpSecure.value).toLowerCase() === 'true',
    auth: {
      user: smtpUser.value,
      pass: smtpPass.value,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === 'production',
    },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000,
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
      if (error.code === 'EAUTH') {
        throw error;
      }
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

// Subscribe to newsletter
const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !email.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'Email là bắt buộc',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        status: 'error',
        message: 'Email không hợp lệ',
      });
    }

    const emailConfig = resolveEmailConfig();

    if (!emailConfig.smtpUser.value || !emailConfig.smtpPass.value) {
      console.error('Email service not configured. Please set the SMTP credentials in .env');
      return res.status(500).json({
        status: 'error',
        message: 'Email service chưa được cấu hình. Vui lòng liên hệ quản trị viên.',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already exists
    let newsletter = await Newsletter.findOne({ email: normalizedEmail });

    if (newsletter) {
      if (newsletter.subscribed) {
        return res.status(400).json({
          status: 'error',
          message: 'Email này đã được đăng ký nhận tin mới',
        });
      } else {
        // Resubscribe
        newsletter.subscribed = true;
        newsletter.subscribedAt = new Date();
        newsletter.unsubscribedAt = null;
        newsletter.emailSent = false;
        newsletter.emailSentAt = null;
      }
    } else {
      // Create new subscription
      newsletter = new Newsletter({
        email: normalizedEmail,
        subscribed: true,
        subscribedAt: new Date(),
      });
    }

    // Save to database
    try {
      await newsletter.save();
    } catch (dbError) {
      if (dbError.code === 11000) {
        return res.status(400).json({
          status: 'error',
          message: 'Email này đã được đăng ký nhận tin mới',
        });
      }
      console.error('Error saving newsletter subscription:', dbError);
      throw dbError;
    }

    // Send confirmation email
    const transporter = createTransporter();

    const fromName = emailConfig.fromName.value || 'ThienDuyen';
    const fromEmail = emailConfig.smtpUser.value;

    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: normalizedEmail,
      subject: 'Cảm ơn bạn đã đăng ký nhận tin mới từ ThienDuyen',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #610912;">Cảm ơn bạn đã đăng ký! 💛</h2>
          <p>Xin chào,</p>
          <p>Cảm ơn bạn đã đăng ký nhận tin mới từ <strong>ThienDuyen</strong>!</p>
          <p>Chúng tôi sẽ gửi cho bạn những thông tin mới nhất về:</p>
          <ul style="line-height: 1.8;">
            <li>✨ Các concept lễ cưới mới</li>
            <li>🌸 Các gói dịch vụ đặc biệt</li>
            <li>📅 Sự kiện và workshop</li>
            <li>💡 Mẹo và kinh nghiệm tổ chức lễ Hằng Thuận</li>
          </ul>
          <div style="background-color: #f8fbf2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #610912; font-weight: bold;">
              Chúng tôi rất vui được đồng hành cùng bạn trên hành trình tổ chức lễ cưới ý nghĩa!
            </p>
          </div>
          <p>Trân trọng,<br><strong>Đội ngũ ThienDuyen</strong></p>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Nếu bạn không muốn nhận email này nữa, vui lòng liên hệ với chúng tôi.
          </p>
        </div>
      `,
    };

    try {
      // Send email with retry
      await retryWithBackoff(async () => {
        await transporter.verify();
        console.log('✅ SMTP connection verified successfully');
      }, 2, 2000);

      const emailResponse = await retryWithBackoff(async () => {
        return await transporter.sendMail(mailOptions);
      }, 3, 1000);

      console.log('📨 Newsletter subscription email sent:', {
        messageId: emailResponse.messageId,
        to: normalizedEmail,
      });

      // Update newsletter record
      newsletter.emailSent = true;
      newsletter.emailSentAt = new Date();
      await newsletter.save();

      res.status(200).json({
        status: 'success',
        message: 'Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.',
      });
    } catch (emailError) {
      console.error('❌ Error sending newsletter email:', emailError);
      console.error('Error code:', emailError.code);
      console.error('Error response:', emailError.response);

      // Newsletter is already saved, so we still return success
      // but log the email error
      newsletter.emailSent = false;
      await newsletter.save();

      // Still return success since subscription is saved
      res.status(200).json({
        status: 'success',
        message: 'Đăng ký thành công! Email xác nhận sẽ được gửi trong thời gian sớm nhất.',
      });
    }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({
      status: 'error',
      message: 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

module.exports = {
  subscribeNewsletter,
};

