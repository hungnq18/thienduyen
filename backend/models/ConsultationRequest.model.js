const mongoose = require('mongoose');

const consultationRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 30,
    },
    preferredDate: {
      type: Date,
      default: null,
    },
    source: {
      type: String,
      enum: ['chatbot', 'get-in-touch', 'landing', 'other'],
      default: 'other',
      index: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 4000,
    },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'completed', 'archived'],
      default: 'new',
      index: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: 50,
      },
    ],
    adminNotes: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

consultationRequestSchema.index({ createdAt: -1 });

const ConsultationRequest = mongoose.model('ConsultationRequest', consultationRequestSchema);

module.exports = ConsultationRequest;


