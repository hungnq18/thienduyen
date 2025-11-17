const mongoose = require('mongoose');

const analyticsEventSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    referrer: {
      type: String,
      default: '',
      trim: true,
    },
    source: {
      type: String,
      default: 'website',
      trim: true,
      index: true,
    },
    sessionId: {
      type: String,
      default: null,
      index: true,
    },
    userAgent: {
      type: String,
      default: '',
    },
    ipAddress: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
      trim: true,
    },
    device: {
      type: String,
      default: '',
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

analyticsEventSchema.index({ createdAt: -1 });
analyticsEventSchema.index({ path: 1, createdAt: -1 });

const AnalyticsEvent = mongoose.model('AnalyticsEvent', analyticsEventSchema);

module.exports = AnalyticsEvent;


