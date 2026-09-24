/**
 * MissionX Master Missions Catalog & Domain Knowledge Specification
 * Used for AI Tutor prompt generation, parameter validation, and safe fallbacks.
 */

const MISSIONS_CATALOG = {
  astar_rescue: {
    id: 'astar_rescue',
    missionTitle: 'A* Earthquake Rescue Protocol',
    domain: 'AI',
    difficulty: 'Intermediate',
    courseOutcomes: ['CO1: A* Search Pathfinding', 'CO2: Manhattan Distance Heuristic', 'CO3: State Space Exploration'],
    environment: 'Disaster Zone Cyber Bunker // Sub-Level 4',
    description: 'Autonomous rescue robot must compute optimal path through collapsed debris using Manhattan heuristic.',
    initialChallenge: {
      briefing: 'Autonomous emergency rescue drones are deadlocked in the collapsed debris zone of Sub-Level 4. Communications are failing and the solenoid security blast door is in lockdown.',
      diagnosticQuestion: 'The rescue drone is deployed at Start Node S(0, 0) and must navigate to Extraction Goal G(3, 3) across orthogonal grid steps (step cost g = 1). Two unexpanded adjacent candidates exist: Node A(0, 1) and Node B(1, 0).\n\n1. Using the Manhattan heuristic formula h(n) = |x - x_G| + |y - y_G|, what are the calculated heuristic h(n) and total evaluation function f(n) = g(n) + h(n) for Node A and Node B?\n2. Why must the heuristic function h(n) remain strictly admissible (h(n) <= h*(n)) to guarantee finding the true optimal shortest path?',
      hintKeywords: ['manhattan', 'admissibility', 'f(n)', 'g(n)', 'heuristic', 'open list'],
      conceptGuidance: 'Guide the student to apply f(n) = g(n) + h(n). Manhattan distance between (0,1) and (3,3) is |0-3| + |1-3| = 3 + 2 = 5. Total f(n) = 1 + 5 = 6. An admissible heuristic never overestimates the actual cost to reach the goal.',
    },
  },
  neural_firewall: {
    id: 'neural_firewall',
    missionTitle: 'Neural Cyber Threat Classifier',
    domain: 'AI',
    difficulty: 'Advanced',
    courseOutcomes: ['CO1: Neural Networks', 'CO2: Weight Backpropagation', 'CO3: AI Security Defense'],
    environment: 'Cyber Security Operations Center // Sector 9',
    description: 'Tune deep learning hidden layer weights to isolate DDoS packets attacking municipal hospital telemetry.',
    initialChallenge: {
      briefing: 'A high-frequency DDoS attack is flooding hospital patient vitals servers. The neural classification filter is misclassifying malicious payloads due to uncalibrated hidden layer weights.',
      diagnosticQuestion: 'In the threat classification neuron, input threat telemetry features are x_1 = 0.8 and x_2 = 0.6, with current hidden weights w_1 = 0.4 and w_2 = 0.6. The target activation requires a calibrated sum of weights w_1 + w_2 = 1.0.\n\n1. If the current binary cross-entropy loss gradient indicates dL/dw_1 = +0.25, in which direction must the gradient descent optimization step update w_1?\n2. How does the learning rate hyperparameter (eta) prevent weight oscillations during backpropagation?',
      hintKeywords: ['gradient', 'weights', 'backprop', 'learning rate', 'cross-entropy', 'activation'],
      conceptGuidance: 'Guide the student through gradient descent: w := w - eta * (dL/dw). Positive gradient means the weight must decrease. If w1 + w2 must equal 1.0, any increase in w1 requires a balancing adjustment in w2.',
    },
  },
  sql_hospital_recovery: {
    id: 'sql_hospital_recovery',
    missionTitle: 'Ransomware SQL Vault Decryption',
    domain: 'Databases',
    difficulty: 'Intermediate',
    courseOutcomes: ['CO1: SQL Multi-Table Joins', 'CO2: ACID Transaction Integrity', 'CO3: Schema Normalization'],
    environment: 'Hospital Emergency Data Vault // Core Server Cluster',
    description: 'Construct multi-table SQL joins and transaction rollbacks to extract encrypted patient emergency logs.',
    initialChallenge: {
      briefing: 'Ransomware has corrupted relational pointers in the hospital ICU database, locking access to life-critical telemetry tables.',
      diagnosticQuestion: 'Patient records reside in table `patients` (columns: `id`, `name`, `status`) and encrypted access keys reside in table `vault_keys` (columns: `id`, `patient_id`, `encryption_key`).\n\n1. How would you construct an `INNER JOIN` query to extract the patient names and encryption keys specifically where `patients.status = \'CRITICAL\'`?\n2. If a database transaction encounters a network disconnect halfway through updating patient status, which ACID property ensures that partially modified data is rolled back completely rather than left corrupted in storage?',
      hintKeywords: ['join', 'inner join', 'acid', 'atomicity', 'rollback', 'foreign key'],
      conceptGuidance: 'Guide the student: Use `INNER JOIN vault_keys ON patients.id = vault_keys.patient_id WHERE patients.status = \'CRITICAL\'`. Atomicity (the \'A\' in ACID) guarantees all-or-nothing transaction execution.',
    },
  },
  iot_smart_city: {
    id: 'iot_smart_city',
    missionTitle: 'Smart City MQTT Sabotage Repair',
    domain: 'IoT',
    difficulty: 'Advanced',
    courseOutcomes: ['CO1: ESP32 Firmware Protocol', 'CO2: MQTT Broker Telemetry & QoS', 'CO3: Actuator Lock Hardware'],
    environment: 'Smart City Automated Power Grid Control Hub',
    description: 'Reconfigure ESP32 sensors, PIR motion grids, and solenoid actuators across an automated grid.',
    initialChallenge: {
      briefing: 'Hostile telemetry injection has disrupted municipal MQTT channels, causing solenoid circuit breakers and emergency floodgates to lock up.',
      diagnosticQuestion: 'We need to re-establish secure telemetry between field ESP32 edge microcontrollers and our central MQTT broker.\n\n1. When publishing solenoid lock commands to `missionx/room/ROOM_101/actuator`, which MQTT Quality of Service (QoS) level (0, 1, or 2) is required to guarantee actuation commands are delivered exactly once without duplicated triggers?\n2. What is the difference between wildcard subscriptions using `+` (single-level) versus `#` (multi-level) when monitoring sensor feeds across multiple city sectors?',
      hintKeywords: ['mqtt', 'qos', 'broker', 'esp32', 'wildcard', 'solenoid'],
      conceptGuidance: 'Guide the student: QoS 0 is at most once (fire-and-forget), QoS 1 is at least once (may duplicate), and QoS 2 is exactly once (four-step handshake). Single-level wildcard `+` matches one hierarchy level; `#` matches all sub-levels.',
    },
  },
  network_packet_routing: {
    id: 'network_packet_routing',
    missionTitle: 'Emergency Subnet Routing Restoration',
    domain: 'Networks',
    difficulty: 'Hardcore AAA',
    courseOutcomes: ['CO1: VLSM Subnetting & CIDR', 'CO2: OSI Layer 3 Routing', 'CO3: OSPF & Routing Loops'],
    environment: 'Submarine Transatlantic Cable Terminal',
    description: 'Calculate VLSM subnets and configure OSPF routing tables under active network jammer interference.',
    initialChallenge: {
      briefing: 'Adversarial jamming on the transatlantic fiber line has fragmented routing tables. Emergency communications need dedicated, partitioned IP spaces immediately.',
      diagnosticQuestion: 'You are allocated the network block `192.168.10.0/24`. We must carve two non-overlapping subnets using Variable Length Subnet Masking (VLSM):\n- Subnet A: Emergency Drone Telemetry (needs 60 usable host IPs)\n- Subnet B: ICU Medical Uplink (needs 28 usable host IPs)\n\n1. What are the appropriate CIDR prefix lengths (/26, /27, /28) and custom subnet masks for Subnet A and Subnet B?\n2. What are the broadcast IP addresses and usable host ranges for each subnet?',
      hintKeywords: ['vlsm', 'cidr', 'subnet mask', 'usable hosts', 'broadcast', 'ospf'],
      conceptGuidance: 'Guide the student: For 60 hosts, 2^6 - 2 = 62 usable IPs -> /26 (mask 255.255.255.192, range .1-.62, broadcast .63). For 28 hosts, 2^5 - 2 = 30 usable IPs -> /27 (mask 255.255.255.224, starting at .64, range .65-.94, broadcast .95).',
    },
  },
  avl_tree_balancer: {
    id: 'avl_tree_balancer',
    missionTitle: 'Quantum Database AVL Balancing',
    domain: 'DSA',
    difficulty: 'Intermediate',
    courseOutcomes: ['CO1: Self-Balancing AVL Trees', 'CO2: Single & Double Rotations', 'CO3: O(log N) Time Complexity'],
    environment: 'Quantum Memory Server Room // Core Cluster B',
    description: 'Perform LL, RR, LR, and RL rotations on memory indices to restore O(log N) search speed.',
    initialChallenge: {
      briefing: 'Unbalanced memory index trees have degraded key lookups from O(log N) to O(N) linear time, causing quantum key exchange timeout errors.',
      diagnosticQuestion: 'Consider an AVL tree where Node 20 is the root. Node 30 is its right child, and a new transaction key with value 40 has just been inserted into the right subtree of Node 30.\n\n1. What is the Balance Factor (BF = height(left) - height(right)) of root Node 20 following this insertion?\n2. Which specific rotation (LL, RR, LR, or RL) must be performed to restore the AVL tree invariant, and what node becomes the new root of this subtree?',
      hintKeywords: ['avl', 'balance factor', 'rotation', 'rr', 'll', 'lr', 'rl', 'height'],
      conceptGuidance: 'Guide the student: Left height is 0, right height is 2, so Balance Factor = 0 - 2 = -2 (Right-Heavy). Since the insertion was in the Right subtree of the Right child (Right-Right condition), a single Left Rotation (RR rotation) at Node 20 is required. Node 30 becomes the new root with Node 20 as left child and Node 40 as right child.',
    },
  },
};

const DEFAULT_MISSION_ID = 'astar_rescue';

/**
 * Resolves mission context safely with fallbacks
 */
function resolveMissionContext(params = {}) {
  const {
    missionId,
    missionTitle,
    domain,
    difficulty,
    courseOutcomes,
    environment,
    description,
  } = params;

  // 1. Direct ID match
  let matchedCatalog = null;
  if (missionId && MISSIONS_CATALOG[missionId.toLowerCase().trim()]) {
    matchedCatalog = MISSIONS_CATALOG[missionId.toLowerCase().trim()];
  }

  // 2. Title lookup if ID did not match
  if (!matchedCatalog && missionTitle) {
    const normTitle = missionTitle.toLowerCase().trim();
    matchedCatalog = Object.values(MISSIONS_CATALOG).find(
      (m) =>
        m.missionTitle.toLowerCase().includes(normTitle) ||
        normTitle.includes(m.missionTitle.toLowerCase()) ||
        (m.id && normTitle.includes(m.id))
    );
  }

  // 3. Fallback to default catalog if nothing matched
  const base = matchedCatalog || MISSIONS_CATALOG[DEFAULT_MISSION_ID];

  // 4. Merge incoming explicit overrides with catalog values
  return {
    id: params.missionId || base.id,
    missionTitle: missionTitle || base.missionTitle,
    domain: domain || base.domain,
    difficulty: difficulty || base.difficulty,
    courseOutcomes:
      Array.isArray(courseOutcomes) && courseOutcomes.length > 0
        ? courseOutcomes
        : base.courseOutcomes,
    environment: environment || base.environment,
    description: description || base.description,
    initialChallenge: base.initialChallenge,
  };
}

module.exports = {
  MISSIONS_CATALOG,
  DEFAULT_MISSION_ID,
  resolveMissionContext,
};
