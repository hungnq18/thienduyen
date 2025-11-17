const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      default: 'general',
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    priceRange: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
      index: true,
    },
    coverImage: {
      type: String,
      default: '',
    },
    highlights: [
      {
        type: String,
        trim: true,
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
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

serviceSchema.index({ createdAt: -1 });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;


