const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    icon: { type: String, default: 'book' },
    questionCount: { type: Number, default: 5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subject', subjectSchema);
