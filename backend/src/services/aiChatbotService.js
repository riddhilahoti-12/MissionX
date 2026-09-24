/**
 * MissionX Live AI Tutor Chatbot Micro-Engine
 * Supports OpenAI (GPT-4o / GPT-4o-mini) and Google Gemini (Gemini 1.5 Pro / Flash)
 * Dynamically constructs system prompts based on active mission metadata, domain, and Course Outcomes.
 */

const { resolveMissionContext, MISSIONS_CATALOG } = require('../config/missionsCatalog');

const MODEL_SPECIFICATIONS = {
  'gpt-4o': {
    name: 'OpenAI GPT-4o',
    provider: 'OpenAI',
    contextWindow: '128,000 Tokens',
    capabilities: ['Multimodal Vision', 'Advanced Math Reasoning', 'Code Execution', 'Real-Time Streaming'],
    latencyMs: 120,
    costPerToken: '$0.005 / 1k',
  },
  'gpt-4o-mini': {
    name: 'OpenAI GPT-4o-mini',
    provider: 'OpenAI',
    contextWindow: '128,000 Tokens',
    capabilities: ['Fast Sub-100ms Responses', 'Lightweight Nudge Guidance', 'Syntax Correction'],
    latencyMs: 45,
    costPerToken: '$0.00015 / 1k',
  },
  'gemini-1.5-pro': {
    name: 'Google Gemini 1.5 Pro',
    provider: 'Google AI',
    contextWindow: '1,000,000+ Tokens',
    capabilities: ['1M+ Massive Context Window', 'Deep Code Analysis', 'Multimodal Audio/Video', 'Complex System Architecture'],
    latencyMs: 150,
    costPerToken: '$0.0035 / 1k',
  },
  'gemini-1.5-flash': {
    name: 'Google Gemini 1.5 Flash',
    provider: 'Google AI',
    contextWindow: '1,000,000 Tokens',
    capabilities: ['Zero-Latency Streaming', 'High Throughput', 'Instant Doubt Resolution'],
    latencyMs: 60,
    costPerToken: '$0.000075 / 1k',
  },
};

/**
 * Builds the dynamic system prompt template strictly as required
 */
function buildSystemPrompt({ missionTitle, domain, difficulty, courseOutcomes, environment, description }) {
  const outcomesText = Array.isArray(courseOutcomes) ? courseOutcomes.join(', ') : (courseOutcomes || 'General Technical Competency');

  return `You are Agent Maverick, the tactical AI tutor in MissionX.
Active Mission: ${missionTitle}
Domain / Subject: ${domain}
Difficulty: ${difficulty}
Target Learning Outcomes: ${outcomesText}
Scenario & Environment: ${environment}
Briefing: ${description}

Instructions:
1. Generate a mission-specific initial challenge or diagnostic question strictly aligned with the subject and course outcomes listed above.
2. Never give static or generic coding questions. If the subject is Databases, ask about SQL joins and ACID properties; if IoT, focus on MQTT and ESP32; if Networks, focus on VLSM and OSPF; if DSA, focus on AVL tree rotations.
3. Guide the student step-by-step using Socratic hints without giving away the direct answer upfront.`;
}

/**
 * Calls OpenAI Chat Completions API
 */
async function callOpenAI({ systemPrompt, messages, model = 'gpt-4o', apiKey }) {
  const targetModel = model === 'gpt-4o-mini' ? 'gpt-4o-mini' : 'gpt-4o';
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: targetModel,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      temperature: 0.7,
      max_tokens: 650,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorData}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

/**
 * Calls Google Gemini Generate Content API
 */
async function callGemini({ systemPrompt, messages, model = 'gemini-1.5-flash', apiKey }) {
  const targetModel = model === 'gemini-1.5-pro' ? 'gemini-1.5-pro' : 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`;

  // Convert chat history to Gemini format
  const contents = messages.map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }));

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 650,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorData}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

/**
 * Local Dynamic Diagnostic Fallback Generator
 * Produces authentic, mission-grounded Socratic responses when external API keys are not supplied.
 */
function generateDynamicLocalResponse({ missionContext, prompt, isInitial, history = [] }) {
  const { missionTitle, domain, courseOutcomes, environment, initialChallenge } = missionContext;
  const primaryCO = courseOutcomes[0] || 'Core Mechanics';

  // 1. Initial Mission Diagnostic Question
  if (isInitial || !prompt || prompt.toLowerCase().includes('initial') || prompt.toLowerCase().includes('start')) {
    if (initialChallenge) {
      return `[COMMS ONLINE // AGENT MAVERICK REPORTING]
Target Mission: ${missionTitle} [Domain: ${domain.toUpperCase()}]
Environment: ${environment}

${initialChallenge.briefing}

DIAGNOSTIC CHALLENGE // TARGET: ${primaryCO}:
${initialChallenge.diagnosticQuestion}

I am standing by to inspect your calculations or SQL queries. Transmit your initial breakdown over this channel.`;
    }

    return `[COMMS ONLINE // AGENT MAVERICK REPORTING]
Target Mission: ${missionTitle} [Domain: ${domain.toUpperCase()}]
Environment: ${environment}

Tactical crisis active. Your objective is to achieve ${primaryCO}. What is your first hypothesis or step to isolate the system fault?`;
  }

  // 2. Socratic Guidance for User Prompts
  const lower = prompt.toLowerCase();

  // Check domain-specific concepts
  if (domain === 'AI') {
    if (lower.includes('manhattan') || lower.includes('heuristic') || lower.includes('astar') || lower.includes('a*') || lower.includes('distance')) {
      return `[Agent Maverick // AI Socratic Nudge]: Remember our heuristic formula: h(n) = |x_n - x_G| + |y_n - y_G|. If the extraction goal is at (3,3), calculate the grid delta from your current candidate coordinates. If h(n) never overestimates the true remaining distance, what does that guarantee about our priority queue expansion?`;
    }
    if (lower.includes('weight') || lower.includes('neural') || lower.includes('backprop') || lower.includes('gradient')) {
      return `[Agent Maverick // AI Socratic Nudge]: In backpropagation, the gradient dL/dw tells us the slope of the loss curve. If the gradient is positive, does moving in the positive direction increase or decrease error? How does our learning rate ensure we don't overshoot the minimum?`;
    }
  } else if (domain === 'Databases') {
    if (lower.includes('join') || lower.includes('inner') || lower.includes('table')) {
      return `[Agent Maverick // Database Socratic Nudge]: When joining 'patients' with 'vault_keys', what common key links them? Remember: INNER JOIN keeps only rows where both tables satisfy the ON condition. How would you filter those joined rows for status = 'CRITICAL'?`;
    }
    if (lower.includes('acid') || lower.includes('atomicity') || lower.includes('transaction') || lower.includes('rollback')) {
      return `[Agent Maverick // Database Socratic Nudge]: Exactly. If a power failure or network dropout occurs midway through a multi-table write, Atomicity demands all-or-nothing execution. Which database command explicitly triggers the recovery mechanism to revert intermediate changes?`;
    }
  } else if (domain === 'Networks') {
    if (lower.includes('subnet') || lower.includes('vlsm') || lower.includes('mask') || lower.includes('cidr') || lower.includes('hosts')) {
      return `[Agent Maverick // Networks Socratic Nudge]: Remember the formula for usable hosts: 2^H - 2 >= required hosts. For Subnet A requiring 60 hosts, what is the smallest integer H? Once you find H, your CIDR prefix is 32 - H. What custom subnet mask does that yield?`;
    }
    if (lower.includes('ospf') || lower.includes('loop') || lower.includes('routing')) {
      return `[Agent Maverick // Networks Socratic Nudge]: OSPF uses Dijkstra's Shortest Path First algorithm based on link cost (10^8 / bandwidth). How does each router maintaining an identical Link State Database (LSDB) prevent routing loops?`;
    }
  } else if (domain === 'IoT') {
    if (lower.includes('qos') || lower.includes('mqtt') || lower.includes('topic') || lower.includes('broker')) {
      return `[Agent Maverick // IoT Socratic Nudge]: For critical physical locks (like solenoids), message loss could leave a door locked, while duplicated commands might toggle a switch twice. Compare QoS 1 ('at least once') vs QoS 2 ('exactly once')—why is QoS 2's four-part handshake necessary for safety?`;
    }
    if (lower.includes('esp32') || lower.includes('sensor') || lower.includes('rfid')) {
      return `[Agent Maverick // IoT Socratic Nudge]: The ESP32 reads telemetry via SPI or I2C and serializes it into JSON before publishing. Which MQTT topic structure allows wildcard listeners to capture all sensors in Room 101 without hardcoding every pin?`;
    }
  } else if (domain === 'DSA') {
    if (lower.includes('rotation') || lower.includes('avl') || lower.includes('balance') || lower.includes('tree')) {
      return `[Agent Maverick // DSA Socratic Nudge]: An AVL node is unbalanced when its balance factor is < -1 or > 1. In our scenario, insertion was in the Right subtree of the Right child. That's a classic RR imbalance. What single rotation restores the balance, and which node moves up to the root?`;
    }
  }

  // 3. Fallback General Socratic Response
  if (lower.includes('hint') || lower.includes('help') || lower.includes('how')) {
    return `[Agent Maverick // Tactical Hint]: Analyze the Course Outcome target: ${primaryCO}. Break down the problem into input, transformation rule, and output verification. What specific parameter are you currently computing?`;
  }

  return `[Agent Maverick // Tactical Review]: Good analytical direction on ${missionTitle}. Let's verify your logic against our target outcome: ${primaryCO}. How does your proposed solution handle boundary conditions or error cases in ${environment}?`;
}

/**
 * Main AI Tutor Chat Engine
 */
async function generateTutorChatResponse({
  prompt,
  model = 'gpt-4o',
  missionId,
  missionTitle,
  domain,
  difficulty,
  courseOutcomes,
  environment,
  description,
  history = [],
  isInitial = false,
  stage = 1,
}) {
  const modelSpec = MODEL_SPECIFICATIONS[model] || MODEL_SPECIFICATIONS['gpt-4o'];
  const openaiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  // 1. Resolve full mission context with safe defaults and catalog validation
  const missionContext = resolveMissionContext({
    missionId,
    missionTitle,
    domain,
    difficulty,
    courseOutcomes,
    environment,
    description,
  });

  // 2. Build the dynamic system prompt
  const systemPrompt = buildSystemPrompt(missionContext);

  let responseText = '';
  let apiStatus = 'LOCAL_DYNAMIC_ENGINE_ACTIVE';

  // 3. Prepare message payload for LLM
  const formattedHistory = (history || []).map((msg) => ({
    role: msg.role === 'user' || msg.sender === 'user' ? 'user' : 'assistant',
    content: msg.content || msg.text || '',
  }));

  const userQuery = isInitial
    ? `Student has just entered the mission. Greet them briefly in-character as Maverick, describe the tactical situation in ${missionContext.environment}, and present the first concept-specific diagnostic challenge targeting ${missionContext.courseOutcomes[0] || 'the primary learning outcome'}.`
    : prompt || 'Analyze mission progress.';

  const conversationPayload = [
    ...formattedHistory,
    { role: 'user', content: userQuery },
  ];

  // 4. Dispatch to external LLM if credentials are configured
  if (model.startsWith('gpt') && openaiKey) {
    try {
      responseText = await callOpenAI({
        systemPrompt,
        messages: conversationPayload,
        model,
        apiKey: openaiKey,
      });
      apiStatus = 'OPENAI_API_LIVE';
    } catch (err) {
      console.warn(`[AI Tutor] OpenAI API failed, failing over to dynamic local engine:`, err.message);
      responseText = generateDynamicLocalResponse({ missionContext, prompt: userQuery, isInitial, history });
      apiStatus = 'OPENAI_FAILOVER_LOCAL_ENGINE';
    }
  } else if (model.startsWith('gemini') && geminiKey) {
    try {
      responseText = await callGemini({
        systemPrompt,
        messages: conversationPayload,
        model,
        apiKey: geminiKey,
      });
      apiStatus = 'GEMINI_API_LIVE';
    } catch (err) {
      console.warn(`[AI Tutor] Gemini API failed, failing over to dynamic local engine:`, err.message);
      responseText = generateDynamicLocalResponse({ missionContext, prompt: userQuery, isInitial, history });
      apiStatus = 'GEMINI_FAILOVER_LOCAL_ENGINE';
    }
  } else {
    // 5. Dynamic local engine response (mission and domain aware)
    responseText = generateDynamicLocalResponse({ missionContext, prompt: userQuery, isInitial, history });
  }

  return {
    success: true,
    prompt: userQuery,
    model,
    modelSpec,
    missionContext: {
      missionId: missionContext.id,
      missionTitle: missionContext.missionTitle,
      domain: missionContext.domain,
      difficulty: missionContext.difficulty,
      courseOutcomes: missionContext.courseOutcomes,
      environment: missionContext.environment,
      description: missionContext.description,
    },
    systemPrompt,
    responseText,
    apiStatus,
    timestamp: new Date().toISOString(),
  };
}

module.exports = {
  MODEL_SPECIFICATIONS,
  buildSystemPrompt,
  generateTutorChatResponse,
};
