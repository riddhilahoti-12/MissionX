const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress.model');
const { protect } = require('../middleware/auth');

// Default initial progress map
const DEFAULT_PROGRESS = {
  'data-structures': { percentage: 80, score: 4, correctAnswers: 4, totalQuestions: 5 },
  'dbms': { percentage: 60, score: 3, correctAnswers: 3, totalQuestions: 5 },
  'operating-systems': { percentage: 40, score: 2, correctAnswers: 2, totalQuestions: 5 },
  'computer-networks': { percentage: 20, score: 1, correctAnswers: 1, totalQuestions: 5 },
};

// @route GET /api/progress
router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user.id || 'demo_user_1';
    const records = await Progress.find({ userId });

    const progressMap = { ...DEFAULT_PROGRESS };
    records.forEach((record) => {
      progressMap[record.subjectId] = {
        percentage: record.percentage,
        score: record.score,
        correctAnswers: record.correctAnswers,
        totalQuestions: record.totalQuestions || 5,
        questionsAttempted: record.questionsAttempted || 5,
        updatedAt: record.updatedAt,
      };
    });

    res.json({
      success: true,
      userId,
      progress: progressMap,
    });
  } catch (error) {
    res.json({
      success: true,
      userId: req.user ? req.user.id : 'demo_user',
      progress: DEFAULT_PROGRESS,
    });
  }
});

// @route POST /api/progress/submit or POST /api/quiz/submit
router.post('/submit', protect, async (req, res) => {
  try {
    const userId = req.user.id || 'demo_user_1';
    const { subjectId, score, correctAnswers, totalQuestions = 5, questionsAttempted = 5 } = req.body;

    if (!subjectId) {
      return res.status(400).json({ success: false, message: 'subjectId is required' });
    }

    const calculatedPercentage = Math.round(((correctAnswers || score || 0) / totalQuestions) * 100);

    const updated = await Progress.findOneAndUpdate(
      { userId, subjectId },
      {
        score: score || correctAnswers || 0,
        correctAnswers: correctAnswers || score || 0,
        questionsAttempted: questionsAttempted || totalQuestions,
        totalQuestions,
        percentage: calculatedPercentage,
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: 'Quiz progress recorded successfully',
      record: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
