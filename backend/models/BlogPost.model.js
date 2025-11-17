const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema(
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
    excerpt: {
      type: String,
      required: true,
      maxlength: 600,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
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
    author: {
      type: String,
      default: 'Admin',
    },
    publishedAt: {
      type: Date,
      default: null,
      index: true,
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

blogPostSchema.index({ createdAt: -1 });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;


