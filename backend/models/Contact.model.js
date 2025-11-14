const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, // Index for faster queries
    },
    name: {
      type: String,
      required: [true, 'Tên là bắt buộc'],
      trim: true,
      maxlength: [100, 'Tên không được vượt quá 100 ký tự'],
    },
    email: {
      type: String,
      required: [true, 'Email là bắt buộc'],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email không hợp lệ',
      ],
      index: true, // Index for faster queries
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [20, 'Số điện thoại không được vượt quá 20 ký tự'],
    },
    message: {
      type: String,
      required: [true, 'Tin nhắn là bắt buộc'],
      trim: true,
      maxlength: [2000, 'Tin nhắn không được vượt quá 2000 ký tự'],
    },
    status: {
      type: String,
      enum: ['pending', 'read', 'replied', 'archived'],
      default: 'pending',
      index: true, // Index for filtering
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
    emailSentAt: {
      type: Date,
      default: null,
    },
    adminNotes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Ghi chú không được vượt quá 1000 ký tự'],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Index for common queries
contactSchema.index({ createdAt: -1 }); // Sort by newest first
contactSchema.index({ status: 1, createdAt: -1 }); // Filter by status and sort

// Method to mark as read
contactSchema.methods.markAsRead = async function () {
  this.status = 'read';
  await this.save();
};

// Method to mark as replied
contactSchema.methods.markAsReplied = async function () {
  this.status = 'replied';
  await this.save();
};

// Method to archive
contactSchema.methods.archive = async function () {
  this.status = 'archived';
  await this.save();
};

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;

