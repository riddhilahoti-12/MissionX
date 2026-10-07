const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    subjectId: { type: String, required: true, index: true }, // e.g. 'data-structures'
    question: { type: String, required: true },
    options: {
      type: [String],
      validate: [val => val.length === 4, 'Must provide exactly 4 options'],
      required: true,
    },
    correctAnswer: { type: Number, required: true, min: 0, max: 3 },
    explanation: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);
