const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    subjectId: { type: String, required: true, index: true },
    score: { type: Number, default: 0 },
    questionsAttempted: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 5 },
    percentage: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Compound index so a user has one progress record per subject
progressSchema.index({ userId: 1, subjectId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
