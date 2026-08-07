/**
 * MissionX Context-Aware AI Hint Micro-Engine
 * Generates dynamic, tiered hints and calculates penalty clock deductions based on player state & performance.
 */

const DOMAIN_HINT_KNOWLEDGE = {
  ARTIFICIAL_INTELLIGENCE: {
    stage1: {
      tier1: "Recall that A* Search evaluates nodes using f(n) = g(n) + h(n). Look closely at the straight-line distance.",
      tier2: "Calculate Manhattan distance: |x1 - x2| + |y1 - y2|. For Node C(2,1) to Goal G(5,5), compute |2-5| + |1-5|.",
      tier3: "Manhattan distance is 3 + 4 = 7. Select option 'h(n) = 7' or swipe RFID Tag 7 to disengage the perception lock.",
    },
    stage2: {
      tier1: "A* always expands the node with the minimum total cost f(n). Compare the f(n) values of candidates.",
      tier2: "Node A has f(A) = 12 while Node B has f(B) = 9. Lower f(n) indicates closer proximity to Goal.",
      tier3: "Expand Node B because 9 < 12. Trigger Node B weight sensor to complete pathfinding.",
    },
  },
  IOT: {
    stage1: {
      tier1: "In PEAS specification, match the motion sensor type directly to high-voltage relay switches.",
      tier2: "PIR motion sensors output a digital HIGH signal when human presence is detected, which activates Relay 1.",
      tier3: "Select 'PIR -> Relay 1' to connect the ESP32 motion input to the emergency floodlight relay.",
    },
  },
  DATABASES: {
    stage1: {
      tier1: "Hospital patient records require filtering by status equal to 'CRITICAL' to disengage the vault lock.",
      tier2: "Use standard SQL syntax: SELECT * FROM patients WHERE status = 'CRITICAL';",
      tier3: "Type 'SELECT * FROM patients WHERE status = 'CRITICAL';' into the SQL query box and execute.",
    },
  },
};

/**
 * Generate a Context-Aware AI Hint
 * @param {Object} params
 * @param {string} params.domain - ARTIFICIAL_INTELLIGENCE | IOT | DATABASES | etc.
 * @param {number} params.stage - Current room stage (1, 2, 3, 4)
 * @param {number} params.tier - 1 (Subtle), 2 (Technical), 3 (Solution)
 * @param {number} params.failedAttempts - Number of incorrect attempts
 * @param {number} params.timeSpentSeconds - Time spent in current stage
 */
const generateAIHint = ({ domain = 'ARTIFICIAL_INTELLIGENCE', stage = 1, tier = 1, failedAttempts = 0, timeSpentSeconds = 120 }) => {
  const domainKey = domain.toUpperCase().replace(/\s+/g, '_');
  const stageKey = `stage${stage}`;
  const tierKey = `tier${tier}`;

  // Retrieve base hint from knowledge engine
  let hintText = DOMAIN_HINT_KNOWLEDGE[domainKey]?.[stageKey]?.[tierKey];

  if (!hintText) {
    // Fallback dynamic hint generation
    if (tier === 1) {
      hintText = `[AI Assistant Nudge] Inspect the primary console in Room Stage ${stage}. Focus on matching target parameters.`;
    } else if (tier === 2) {
      hintText = `[AI Technical Hint] Stage ${stage} requires validating input values against the target threshold. Check mathematical equations.`;
    } else {
      hintText = `[AI Solution Step] Execute the main override command on the 3D console to complete Stage ${stage}.`;
    }
  }

  // Calculate adaptive time penalty deduction
  let penaltyMinutes = tier === 1 ? 1 : tier === 2 ? 3 : 5;
  
  // If player has failed multiple times, give small mercy discount on penalty
  if (failedAttempts >= 3) {
    penaltyMinutes = Math.max(1, penaltyMinutes - 1);
  }

  return {
    success: true,
    domain,
    stage,
    tier,
    hintText,
    penaltyMinutes,
    aiRecommendation: timeSpentSeconds > 300 
      ? "AI Analysis: Player stalling detected (>5 mins in stage). Advise team discussion on formula parameters."
      : "AI Analysis: Normal progression speed. Nudge applied.",
    timestamp: new Date().toISOString(),
  };
};

module.exports = { generateAIHint };
