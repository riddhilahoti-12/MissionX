export interface MissionStageConfig {
  stageNumber: number;
  title: string;
  puzzleKey: string; // 'RFID' | 'ASTAR' | 'NEURAL' | 'SQL' | 'SUBNET' | 'TREE' | 'CIPHER' | 'SQLJOIN' | 'KNAPSACK' | 'ZKP' | 'RAFT' | 'CNN' | 'BTREE'
  description: string;
}

export interface MissionContext {
  id: string;
  missionTitle: string;
  domain: 'AI' | 'DSA' | 'IoT' | 'Networks' | 'Databases' | 'Security' | string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Hardcore AAA';
  courseOutcomes: string[];
  environment: string;
  environmentTheme: 'CYBER_VAULT' | 'SUBMARINE' | 'HOSPITAL_ICU' | 'SMART_CITY';
  description: string;
  emergencyTitle: string;
  emergencySubtitle: string;
  emergencyBriefing: string;
  targetSystem: string;
  stages: MissionStageConfig[];
  consoleBindings: {
    rfid: { label: string; puzzleKey: string };
    mainframe: { label: string; puzzleKey: string };
    hologram: { label: string; puzzleKey: string };
    database: { label: string; puzzleKey: string };
  };
}

export const MISSIONS_CATALOG: Record<string, MissionContext> = {
  astar_rescue: {
    id: 'astar_rescue',
    missionTitle: 'A* Earthquake Rescue Protocol',
    domain: 'AI',
    difficulty: 'Intermediate',
    courseOutcomes: ['CO1: A* Search Pathfinding', 'CO2: Manhattan Distance Heuristic', 'CO3: State Space Exploration'],
    environment: 'Disaster Zone Cyber Bunker',
    environmentTheme: 'CYBER_VAULT',
    description: 'Autonomous rescue robot must compute optimal path through collapsed debris using Manhattan heuristic.',
    emergencyTitle: 'A CYBER ATTACK HAS DISABLED',
    emergencySubtitle: 'CITY EMERGENCY COMMUNICATIONS',
    emergencyBriefing: 'Hospitals cannot receive critical patient telemetry. Autonomous emergency drones are malfunctioning. Restore A* Pathfinding, recalibrate Neural Threat Weights, and unlock the Solenoid Vault Door.',
    targetSystem: 'Disaster Zone Autonomous Navigation Core',
    stages: [
      { stageNumber: 1, title: '1. Verify Drone RFID Keycard', puzzleKey: 'RFID', description: 'Authenticate field rescue unit RFID credentials.' },
      { stageNumber: 2, title: '2. A* Pathfinding Grid Visualizer', puzzleKey: 'ASTAR', description: 'Compute shortest path avoiding hazard grid blocks.' },
      { stageNumber: 3, title: '3. Calibrate Neural Threat Weights', puzzleKey: 'NEURAL', description: 'Tune hidden layer weights so W1 + W2 = 1.0.' },
      { stageNumber: 4, title: '4. Unlock Solenoid Vault Door', puzzleKey: 'SQL', description: 'Modify database query for status = "CRITICAL".' },
    ],
    consoleBindings: {
      rfid: { label: 'Rescue Drone Keycard Scanner', puzzleKey: 'RFID' },
      mainframe: { label: 'A* Search Navigation Mainframe', puzzleKey: 'ASTAR' },
      hologram: { label: 'Neural Threat Weight Hologram', puzzleKey: 'NEURAL' },
      database: { label: 'Solenoid Blast Door Query Terminal', puzzleKey: 'SQL' },
    },
  },
  network_packet_routing: {
    id: 'network_packet_routing',
    missionTitle: 'Emergency Subnet Routing Restoration',
    domain: 'Networks',
    difficulty: 'Hardcore AAA',
    courseOutcomes: ['CO1: VLSM Subnetting & CIDR', 'CO2: OSI Layer 3 Routing', 'CO3: OSPF & Routing Loops'],
    environment: 'Submarine Transatlantic Cable Terminal',
    environmentTheme: 'SUBMARINE',
    description: 'Calculate VLSM subnets and configure OSPF routing tables under active network jammer interference.',
    emergencyTitle: 'UNDERSEA CABLE TRUNKS COMPROMISED',
    emergencySubtitle: 'PACKET TRAFFIC ROUTING SEVERED',
    emergencyBriefing: 'Adversarial jamming on the transatlantic fiber line has fragmented routing tables. Re-calculate VLSM subnets for emergency drones and ICU uplinks, decode obfuscated XOR telemetry, and disengage the gateway lock.',
    targetSystem: 'Transatlantic Submarine Gateway Router',
    stages: [
      { stageNumber: 1, title: '1. Carrier Frequency RFID Lock', puzzleKey: 'RFID', description: 'Authenticate network engineer credentials.' },
      { stageNumber: 2, title: '2. VLSM Subnet & Packet Router', puzzleKey: 'SUBNET', description: 'Carve 192.168.10.0/24 into /26 and /27 subnets.' },
      { stageNumber: 3, title: '3. XOR Cryptography Decoder', puzzleKey: 'CIPHER', description: 'Decrypt obfuscated routing telemetry payload.' },
      { stageNumber: 4, title: '4. Unlock Solenoid Network Gateway', puzzleKey: 'SUBNET', description: 'Flush routing cache and release the gateway lock.' },
    ],
    consoleBindings: {
      rfid: { label: 'Carrier Frequency Keycard Scanner', puzzleKey: 'RFID' },
      mainframe: { label: 'VLSM Subnet Packet Router Console', puzzleKey: 'SUBNET' },
      hologram: { label: 'XOR Bitwise Cipher Hologram', puzzleKey: 'CIPHER' },
      database: { label: 'Solenoid Network Gateway Lock', puzzleKey: 'SUBNET' },
    },
  },
  avl_tree_balancer: {
    id: 'avl_tree_balancer',
    missionTitle: 'Quantum Database AVL Balancing',
    domain: 'DSA',
    difficulty: 'Intermediate',
    courseOutcomes: ['CO1: Self-Balancing AVL Trees', 'CO2: Single & Double Rotations', 'CO3: O(log N) Time Complexity'],
    environment: 'Quantum Memory Server Room',
    environmentTheme: 'CYBER_VAULT',
    description: 'Perform LL, RR, LR, and RL rotations on memory indices to restore O(log N) search speed.',
    emergencyTitle: 'QUANTUM MEMORY INDEX DEGRADED',
    emergencySubtitle: 'SEARCH LATENCY SPIKED TO O(N) LINEAR TIME',
    emergencyBriefing: 'Unbalanced tree index nodes have caused key exchange latency spikes. Perform AVL single and double rotations to restore balance factors into [-1, 0, 1] and solve the knapsack bandwidth allocation before memory dropouts.',
    targetSystem: 'Quantum Binary Search Index Engine',
    stages: [
      { stageNumber: 1, title: '1. Memory Carrier RFID Unlock', puzzleKey: 'RFID', description: 'Authenticate quantum memory engineer card.' },
      { stageNumber: 2, title: '2. Self-Balancing AVL Tree Rotations', puzzleKey: 'TREE', description: 'Perform LL, RR, LR, RL tree rotations.' },
      { stageNumber: 3, title: '3. DP Knapsack Bandwidth Table', puzzleKey: 'KNAPSACK', description: 'Fill DP memoization table under 50MB payload limit.' },
      { stageNumber: 4, title: '4. Release Solenoid Index Gate', puzzleKey: 'TREE', description: 'Restore O(log N) lookup speed to unlock vault.' },
    ],
    consoleBindings: {
      rfid: { label: 'Memory Bank Keycard Scanner', puzzleKey: 'RFID' },
      mainframe: { label: 'AVL Self-Balancing Tree Visualizer', puzzleKey: 'TREE' },
      hologram: { label: '0/1 Knapsack DP Matrix Hologram', puzzleKey: 'KNAPSACK' },
      database: { label: 'Solenoid Index Gate Actuator', puzzleKey: 'TREE' },
    },
  },
  sql_hospital_recovery: {
    id: 'sql_hospital_recovery',
    missionTitle: 'Ransomware SQL Vault Decryption',
    domain: 'Databases',
    difficulty: 'Intermediate',
    courseOutcomes: ['CO1: SQL Multi-Table Joins', 'CO2: ACID Transaction Integrity', 'CO3: Schema Normalization'],
    environment: 'Hospital Core Vault',
    environmentTheme: 'HOSPITAL_ICU',
    description: 'Construct multi-table SQL joins and transaction rollbacks to extract encrypted patient emergency logs.',
    emergencyTitle: 'HOSPITAL ICU DATABASE CORRUPTED',
    emergencySubtitle: 'RANSOMWARE HAS LOCKED PATIENT RECORDS',
    emergencyBriefing: 'Malware actors encrypted municipal hospital ICU records. Reconstruct multi-table SQL inner joins connecting patients and vault keys, split overfilled B-Tree index nodes, and repair transaction queries to unlock ICU access.',
    targetSystem: 'Municipal Hospital Relational Core',
    stages: [
      { stageNumber: 1, title: '1. Medical Admin RFID Card', puzzleKey: 'RFID', description: 'Authenticate chief medical officer keycard.' },
      { stageNumber: 2, title: '2. Multi-Table Relational SQL Join', puzzleKey: 'SQLJOIN', description: 'Join patients with vault_keys to extract keys.' },
      { stageNumber: 3, title: '3. Database B-Tree Index Balancer', puzzleKey: 'BTREE', description: 'Split overfilled index node at median key.' },
      { stageNumber: 4, title: '4. Unlock Solenoid ICU Vault Door', puzzleKey: 'SQL', description: 'Query status = "CRITICAL" to release door lock.' },
    ],
    consoleBindings: {
      rfid: { label: 'Hospital Admin RFID Scanner', puzzleKey: 'RFID' },
      mainframe: { label: 'Multi-Table SQL Join Console', puzzleKey: 'SQLJOIN' },
      hologram: { label: 'B-Tree Index Node Hologram', puzzleKey: 'BTREE' },
      database: { label: 'Solenoid ICU Vault Decryption Query', puzzleKey: 'SQL' },
    },
  },
  iot_smart_city: {
    id: 'iot_smart_city',
    missionTitle: 'Smart City MQTT Sabotage Repair',
    domain: 'IoT',
    difficulty: 'Advanced',
    courseOutcomes: ['CO1: ESP32 Firmware Protocol', 'CO2: MQTT Broker Telemetry & QoS', 'CO3: Actuator Lock Hardware'],
    environment: 'Smart City Control Hub',
    environmentTheme: 'SMART_CITY',
    description: 'Reconfigure ESP32 sensors, PIR motion grids, and solenoid actuators across an automated grid.',
    emergencyTitle: 'MUNICIPAL POWER GRID COMPROMISED',
    emergencySubtitle: 'MQTT TELEMETRY PIPELINES SEVERED',
    emergencyBriefing: 'Cyber attackers hijacked the municipal power grid broker. Re-establish Zero-Knowledge Proof master key exchange, trigger Raft consensus leader election across substation nodes, and transmit solenoid disengage signals.',
    targetSystem: 'Automated Power Grid Substation',
    stages: [
      { stageNumber: 1, title: '1. ESP32 Hardware RFID Key', puzzleKey: 'RFID', description: 'Authenticate electrical substation RFID tag.' },
      { stageNumber: 2, title: '2. Zero-Knowledge Proof (zk-SNARKs)', puzzleKey: 'ZKP', description: 'Verify master passcode without disclosing secret.' },
      { stageNumber: 3, title: '3. Raft Consensus Leader Protocol', puzzleKey: 'RAFT', description: 'Elect Raft cluster leader and sync heartbeats.' },
      { stageNumber: 4, title: '4. Unlock Solenoid Grid Actuator', puzzleKey: 'ZKP', description: 'Disengage high-voltage circuit breaker relay.' },
    ],
    consoleBindings: {
      rfid: { label: 'ESP32 Substation RFID Scanner', puzzleKey: 'RFID' },
      mainframe: { label: 'Zero-Knowledge Proof (ZKP) Mainframe', puzzleKey: 'ZKP' },
      hologram: { label: 'Raft Distributed Consensus Hologram', puzzleKey: 'RAFT' },
      database: { label: 'Solenoid High-Voltage Actuator Lock', puzzleKey: 'ZKP' },
    },
  },
  neural_firewall: {
    id: 'neural_firewall',
    missionTitle: 'Neural Cyber Threat Classifier',
    domain: 'AI',
    difficulty: 'Advanced',
    courseOutcomes: ['CO1: Neural Networks', 'CO2: Weight Backpropagation', 'CO3: AI Security Defense'],
    environment: 'Cyber Security Operations Center',
    environmentTheme: 'CYBER_VAULT',
    description: 'Tune deep learning hidden layer weights to isolate DDoS packets attacking municipal hospital telemetry.',
    emergencyTitle: 'DDOS PACKET STORM IN PROGRESS',
    emergencySubtitle: 'MUNICIPAL HOSPITALS UNDER ATTACK',
    emergencyBriefing: 'Ransomware actors are flooding city servers with malicious traffic. Calibrate neural hidden layer activation weights, apply 3x3 Sobel convolution filters to CCTV packet payloads, and disengage the firewall isolation lock.',
    targetSystem: 'Neural Cyber Threat Defense Hub',
    stages: [
      { stageNumber: 1, title: '1. Cyber Operations RFID Key', puzzleKey: 'RFID', description: 'Authenticate security operations keycard.' },
      { stageNumber: 2, title: '2. Neural Hidden Layer Balancer', puzzleKey: 'NEURAL', description: 'Tune neuron weights W1 + W2 = 1.0.' },
      { stageNumber: 3, title: '3. CNN Convolution Filter Grid', puzzleKey: 'CNN', description: 'Apply 3x3 Sobel kernel to isolate threats.' },
      { stageNumber: 4, title: '4. Unlock Solenoid Firewall Gate', puzzleKey: 'SQL', description: 'Isolate compromised nodes and release lock.' },
    ],
    consoleBindings: {
      rfid: { label: 'Cyber Operations Keycard Scanner', puzzleKey: 'RFID' },
      mainframe: { label: 'Neural Network Weight Balancer', puzzleKey: 'NEURAL' },
      hologram: { label: 'CNN Convolution Filter Hologram', puzzleKey: 'CNN' },
      database: { label: 'Solenoid Firewall Gate Query', puzzleKey: 'SQL' },
    },
  },
};

export const DEFAULT_MISSION_ID = 'astar_rescue';

export function getMissionById(id?: string | null): MissionContext {
  if (!id) return MISSIONS_CATALOG[DEFAULT_MISSION_ID];
  const normalized = id.toLowerCase().trim();
  if (MISSIONS_CATALOG[normalized]) {
    return MISSIONS_CATALOG[normalized];
  }
  const found = Object.values(MISSIONS_CATALOG).find(
    (m) =>
      m.id.toLowerCase() === normalized ||
      m.missionTitle.toLowerCase().includes(normalized) ||
      normalized.includes(m.id.toLowerCase())
  );
  return found || MISSIONS_CATALOG[DEFAULT_MISSION_ID];
}
