const express = require('express');
const router = express.Router();
const { generateAIHint } = require('../services/aiHintEngine');
const { generateTutorChatResponse, MODEL_SPECIFICATIONS } = require('../services/aiChatbotService');

// @route POST /api/ai/generate-hint
// Generate context-aware AI hint with penalty time calculation
router.post('/generate-hint', (req, res) => {
  try {
    const { domain, stage, tier, failedAttempts, timeSpentSeconds } = req.body;

    const hintData = generateAIHint({
      domain,
      stage: Number(stage) || 1,
      tier: Number(tier) || 1,
      failedAttempts: Number(failedAttempts) || 0,
      timeSpentSeconds: Number(timeSpentSeconds) || 120,
    });

    res.json(hintData);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate AI hint',
      error: error.message,
    });
  }
});

// @route POST /api/ai/chat
// Live AI Tutor Chatbot for student doubts and assistance
router.post('/chat', async (req, res) => {
  try {
    const { prompt, model, domain, stage } = req.body;
    const chatData = await generateTutorChatResponse({ prompt, model, domain, stage });
    res.json(chatData);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to process AI tutor chat prompt',
      error: error.message,
    });
  }
});

// @route GET /api/ai/models
// Get available OpenAI and Gemini LLM model specifications
router.get('/models', (req, res) => {
  res.json({
    success: true,
    models: MODEL_SPECIFICATIONS,
  });
});

// @route POST /api/ai/story-briefing
// Generate dynamic mission narrative briefing
router.post('/story-briefing', (req, res) => {
  const { missionTitle, domain } = req.body;

  res.json({
    success: true,
    missionTitle: missionTitle || 'Emergency Rescue Protocol',
    domain: domain || 'ARTIFICIAL_INTELLIGENCE',
    voiceBriefingText: `Emergency Transmission. Critical failure detected in ${domain || 'Cyber Grid'}. Your response team has 40 minutes to disengage vault locks. Stand by for countdown.`,
    countdownSeconds: 5,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
