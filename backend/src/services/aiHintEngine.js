/**
 * MissionX Context-Aware AI Hint Micro-Engine
 * Generates dynamic, tiered hints and calculates penalty clock deductions based on player state & domain.
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
      tier3: "Navigate grid avoiding coordinates (1,1), (2,1), and (2,2). Step along (0,0) -> (0,1) -> (0,2) -> (0,3) -> (1,3) -> (2,3) -> (3,3).",
    },
    stage3: {
      tier1: "Calibrate hidden weights W1 and W2 so their sum achieves exact unit balance (W1 + W2 = 1.0).",
      tier2: "If W1 is 0.40, adjust W2 to 0.60. If W1 is 0.50, adjust W2 to 0.50.",
      tier3: "Slide Weight W1 to 0.50 and Weight W2 to 0.50 to activate the neural firewall threshold.",
    },
    stage4: {
      tier1: "The emergency medical vault requires filtering status records for critical emergencies.",
      tier2: "Modify the query WHERE clause to match: status = 'CRITICAL'.",
      tier3: "Execute: SELECT * FROM patients WHERE status = 'CRITICAL'; to disengage the solenoid door.",
    },
  },
  AI: {
    stage1: {
      tier1: "Authenticate your agent credentials using the RFID keycard terminal to initialize telemetry.",
      tier2: "Swipe RFID card with tag ASTAR_7 or click the terminal to bypass authorization.",
      tier3: "Trigger RFID Keycard Tag 7 to unlock Stage 2.",
    },
    stage2: {
      tier1: "Trace the shortest hazard-free path from (0,0) to (3,3). Red blocks indicate collapsed debris.",
      tier2: "Avoid cells (1,1), (2,1), and (2,2). Move around the perimeter.",
      tier3: "Select nodes (0,0), (0,1), (0,2), (0,3), (1,3), (2,3), (3,3) and press Execute.",
    },
    stage3: {
      tier1: "Hidden layer neurons require normalized weights. The target sum of W1 and W2 is 1.0.",
      tier2: "Set W1 = 0.40 and W2 = 0.60, or W1 = 0.50 and W2 = 0.50.",
      tier3: "Set both sliders to sum to 1.00 (e.g. 0.50 and 0.50) and click Commit Weights.",
    },
    stage4: {
      tier1: "Inspect the database query. The vault lock triggers on critical patients, not locked records.",
      tier2: "Change 'LOCKED' to 'CRITICAL' in the SQL query text.",
      tier3: "Run: SELECT * FROM patients WHERE status = 'CRITICAL';",
    },
  },
  NETWORKS: {
    stage1: {
      tier1: "The transatlantic submarine line requires carrier frequency lock before routing table updates.",
      tier2: "Verify carrier telemetry by swiping the Network Admin RFID keycard.",
      tier3: "Click the Network Keycard Terminal or inject RFID Tag NET_CARRIER_9 to unlock.",
    },
    stage2: {
      tier1: "For Subnet A (60 hosts), find the minimum power of 2: 2^6 - 2 = 62 usable addresses. Prefix is /26.",
      tier2: "Subnet A uses mask 255.255.255.192. Subnet B (28 hosts) needs 2^5 - 2 = 30 usable addresses -> /27 (255.255.255.224).",
      tier3: "Set Subnet A to /26 (Gateway 192.168.10.1) and Subnet B to /27 (Gateway 192.168.10.65) and click Deploy Route Tables.",
    },
    stage3: {
      tier1: "The ransomware telemetry stream is obfuscated with XOR bitwise shifting against a 1-byte hex key.",
      tier2: "Apply the XOR key against the received payload to extract the plaintext authorization token.",
      tier3: "Slide the XOR key slider to match the checksum target and click Decrypt Telemetry.",
    },
    stage4: {
      tier1: "Disengage the emergency network packet router lock to re-route municipal fiber lines.",
      tier2: "Assign Gateway 192.168.10.1 as default route and execute packet flush.",
      tier3: "Commit routing table and unlock the solenoid network gateway.",
    },
  },
  DSA: {
    stage1: {
      tier1: "Quantum index memory nodes require administrative keycard verification before rebalancing.",
      tier2: "Swipe RFID memory keycard to release index pointer lock.",
      tier3: "Click the RFID terminal to unlock AVL tree memory balancing.",
    },
    stage2: {
      tier1: "Check the Balance Factor BF = height(left) - height(right). An inserted node in the right subtree of the right child creates a Right-Right (RR) imbalance.",
      tier2: "A Right-Right (RR) imbalance at root Node 20 requires a single Left Rotation. Node 30 becomes the new root.",
      tier3: "Select 'RR Rotation (Left Rotation)' on Node 20 to restore balance factor 0 across all nodes.",
    },
    stage3: {
      tier1: "Dynamic Programming Knapsack: Pack the maximum value telemetry packets within the 50MB bandwidth limit.",
      tier2: "Evaluate DP table recurrence: dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w - wt[i]]).",
      tier3: "Select the optimal payload items yielding maximum value under 50MB and submit.",
    },
    stage4: {
      tier1: "Release the quantum memory vault lock once all subtrees satisfy the AVL height balance property.",
      tier2: "Verify that all node balance factors reside in [-1, 0, 1].",
      tier3: "Disengage the solenoid index gate lock to complete escape.",
    },
  },
  DATABASES: {
    stage1: {
      tier1: "Hospital patient database access is restricted under lock. Authenticate database admin credentials.",
      tier2: "Authenticate credentials at the medical record keycard scanner.",
      tier3: "Click the RFID Keycard scanner to gain database access.",
    },
    stage2: {
      tier1: "Join `patients` with `vault_keys` on matching Primary Key and Foreign Key: patients.id = vault_keys.patient_id.",
      tier2: "Filter joined records using `WHERE patients.status = 'CRITICAL' AND vault_keys.is_compromised = 0`.",
      tier3: "Construct the INNER JOIN query connecting patients and vault_keys and click Execute Join.",
    },
    stage3: {
      tier1: "B-Tree index node capacity is exceeded (Order M = 4). When a leaf reaches 4 keys, split at median.",
      tier2: "Promote the median key to the parent node and split the remaining keys into left and right child leaves.",
      tier3: "Click Split Node at median key and promote to root to restore O(log_B N) search time.",
    },
    stage4: {
      tier1: "Execute transaction rollback to revert corrupted malware updates before unlocking ICU door.",
      tier2: "Ensure Atomicity: issue ROLLBACK; then SELECT uncorrupted patient access tokens.",
      tier3: "Type query targeting status = 'CRITICAL' to disengage the solenoid ICU vault door.",
    },
  },
  IOT: {
    stage1: {
      tier1: "ESP32 edge nodes are broadcasting on topic missionx/room/ROOM_101/sensor. Authenticate hardware key.",
      tier2: "Use RC522 RFID reader with keycard TAG_CARD_ASTAR_7 or click the terminal.",
      tier3: "Verify hardware RFID tag to establish MQTT publisher link.",
    },
    stage2: {
      tier1: "Zero-Knowledge Proof: Prove knowledge of the substation master passcode without revealing the plaintext secret.",
      tier2: "Generate zk-SNARK cryptographic witness (C = g^s * h^r mod p) matching the public challenge.",
      tier3: "Compute cryptographic commitment and submit zk-SNARK proof to disengage grid bypass lock.",
    },
    stage3: {
      tier1: "Raft Consensus cluster: Node 1 timed out without receiving heartbeat. Trigger leader election.",
      tier2: "Collect RequestVote votes from a majority quorum (3 out of 5 cluster nodes).",
      tier3: "Elect Node 2 as stable Raft cluster leader and replicate log entry to unlock Stage 4.",
    },
    stage4: {
      tier1: "Transmit high-voltage solenoid trip command via MQTT with QoS level 2 (Exactly Once).",
      tier2: "Publish payload `{\"actuator\": \"SOLENOID_RELAY_1\", \"command\": \"DISENGAGE\"}`.",
      tier3: "Disengage solenoid actuator to restore automated city power grid.",
    },
  },
};

/**
 * Generate a Context-Aware AI Hint
 */
const generateAIHint = ({ domain = 'AI', stage = 1, tier = 1, failedAttempts = 0, timeSpentSeconds = 120 }) => {
  let domainKey = domain.toUpperCase().replace(/\s+/g, '_');
  if (domainKey === 'DATA_STRUCTURES' || domainKey === 'DSA') domainKey = 'DSA';
  if (domainKey === 'COMPUTER_NETWORKS' || domainKey === 'NETWORK') domainKey = 'NETWORKS';
  if (domainKey === 'DATABASE' || domainKey === 'SQL') domainKey = 'DATABASES';
  if (domainKey === 'INTERNET_OF_THINGS') domainKey = 'IOT';
  if (domainKey === 'ARTIFICIAL_INTELLIGENCE') domainKey = 'AI';

  const stageKey = `stage${stage}`;
  const tierKey = `tier${tier}`;

  // Retrieve base hint from knowledge engine
  let hintText = DOMAIN_HINT_KNOWLEDGE[domainKey]?.[stageKey]?.[tierKey];

  if (!hintText) {
    if (tier === 1) {
      hintText = `[AI Socratic Nudge] In ${domain} Stage ${stage}: Inspect the primary console and examine the governing algorithmic relation.`;
    } else if (tier === 2) {
      hintText = `[AI Technical Hint] Stage ${stage} requires validating input parameters against target constraints. Check your mathematical formulation.`;
    } else {
      hintText = `[AI Solution Step] Execute the console override targeting the specified objective parameters to complete Stage ${stage}.`;
    }
  }

  // Calculate adaptive time penalty deduction
  let penaltyMinutes = tier === 1 ? 1 : tier === 2 ? 3 : 5;
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
      ? `AI Analysis: Player stalling detected in ${domain} stage ${stage}. Review the primary course outcome.`
      : "AI Analysis: Tactical progression steady.",
    timestamp: new Date().toISOString(),
  };
};

module.exports = { generateAIHint };
