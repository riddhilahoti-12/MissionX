/**
 * MissionX Machine Learning Adaptive AI Difficulty Scaling Engine
 * Dynamically adjusts puzzle complexity, distractor count, and hint penalties based on real-time team escape velocity.
 */

function calculateAdaptiveDifficulty(sessionMetrics) {
  const { secondsRemaining, stage, pastHintCount, accuracyPercent = 85 } = sessionMetrics;

  let difficultyTier = 'NORMAL';
  let timePenaltyMultiplier = 1.0;
  let distractorCount = 2;
  let hintCostInCoins = 50;

  // Fast Team (High Escape Velocity & High Accuracy) -> Elevate Challenge
  if (secondsRemaining > 1800 && accuracyPercent >= 90) {
    difficultyTier = 'HEROIC';
    timePenaltyMultiplier = 1.5;
    distractorCount = 4;
    hintCostInCoins = 75;
  }
  // Struggling Team (Low Time & High Hint Reliance) -> Offer Dynamic Assistance
  else if (secondsRemaining < 600 || pastHintCount >= 4) {
    difficultyTier = 'ASSISTED';
    timePenaltyMultiplier = 0.5;
    distractorCount = 1;
    hintCostInCoins = 25;
  }

  return {
    difficultyTier,
    timePenaltyMultiplier,
    distractorCount,
    hintCostInCoins,
    stageMultiplier: 1 + stage * 0.1,
  };
}

module.exports = {
  calculateAdaptiveDifficulty,
};
