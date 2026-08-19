# MissionX – AI & IoT Enabled Educational Escape Room Platform   

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stack](https://img.shields.io/badge/Stack-Next.js%20%7C%20Node.js%20%7C%20Express%20%7C%20Socket.io%20%7C%20MQTT-blue)](https://github.com/)

**MissionX** is a SaaS-based physical escape room management & experiential learning platform. It transforms traditional engineering education into immersive, hardware-integrated mission challenges controlled via a real-time **Mission Control Web Dashboard**.

---

## Key Features

- **Mission Control Dashboard**: Modern cyberpunk/glassmorphism UI for Game Masters to control live escape room hardware, timers, locks, and alarms.
- **IoT Hardware Integration**: Real-time MQTT telemetries for RFID tags, QR scanners, Laser grids, PIR sensors, Ultrasonic sensors, Solenoid door locks, and Servos.
- **Virtual IoT Simulator**: Embedded web simulator allowing physical-grade testing without requiring physical ESP32/Arduino hardware.
- **Multi-Domain Mission Library**: 7+ domains including Artificial Intelligence (A* Search, PEAS, N-Queens, Neural Networks), Data Structures & Algorithms, Computer Networks, Operating Systems, IoT, and SQL/Databases.
- **AI Micro-Engine**: AI Story Briefing Generator, Context-Aware Hint Engine, and AI Performance Summarizer.
- **Gamification & Analytics**: Coins, XP, Badges, Real-time Leaderboards, and Downloadable PDF Skill Radar Reports (Critical Thinking, Analytical, Decision Making, Leadership).

---

## System Architecture

```
                                  +-----------------------+
                                  |    Student / GM /     |
                                  | Super Admin Frontends |
                                  +-----------+-----------+
                                              |
                                      HTTP / WebSockets
                                              v
+-----------------------+         +-----------+-----------+         +-----------------------+
|  Physical ESP32 IoT   |--MQTT-->|   Express / Socket.io |<--REST--|   MongoDB / Redis /   |
|   Sensors & Locks     |         |     Backend Engine    |         |   TimescaleDB Layer   |
+-----------------------+         +-----------------------+         +-----------------------+
```

---

## Directory Structure

```
missionx/
├── frontend/        # Next.js 14 / React / Tailwind CSS / Framer Motion
├── backend/         # Express.js / Node.js / Socket.io / Mongoose / MQTT
├── simulator/       # Web-based Virtual IoT Sensor & Actuator Simulator
├── firmware/        # ESP32 C++ firmware templates & MQTT client setup
└── README.md        # Project documentation
```

---

## Getting Started

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x
- MongoDB Instance (Local or Atlas)
- Mosquitto / HiveMQ MQTT Broker

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/missionx.git
   cd missionx
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

## 📈 Project Progress

- **Day 1:** Initial project setup, directory architecture, MongoDB schemas, and baseline seed data.
- **Day 2:** 
  - **Game Master Control Dashboard (`/dashboard`)**: Interactive command center featuring live multi-room selector, digital countdown clock with timer penalty engine, hardware actuator overrides (Solenoid door locks, Laser security grid, RFID antenna bypass, Sirens), ambient room lighting presets, simulated CCTV camera feed with thermal & night-vision modes, and live audit event stream.
  - **Express.js Backend Boilerplate**: Configured Dotenv environment loading, Helmet security HTTP headers, CORS cross-origin resource sharing, custom Morgan HTTP request logging middleware, API health check endpoint (`/api/health`), and centralized error handling with 404 route handling.
  - **3D WebGL Escape Room Canvas (`EscapeRoomCanvas.tsx`)**: Built with Three.js rendering server racks, RFID keycard scanners, holographic neural net displays, solenoid vault doors, floating particle dust, dynamic cyberpunk neon lighting, and raycasted 3D object click inspection.
  - **Cinematic Story Briefing & 3D Mission Engine (`/play/[missionId]`)**: Emergency Broadcast intro with 5-second countdown, embedded 3D room canvas, and interactive CS puzzles (A* Search Pathfinding grid visualizer, Neural Network weight balancer, SQL Vault query repair console).
  - **Multi-Domain Mission Hub (`/missions`)**: Storefront catalog covering AI, DSA, IoT, Networks, Databases, and Cyber Security with game mode filters.
  - **15-Metric Skill Radar & Performance Analytics (`/analytics`)**: Recharts Radar Chart tracking 15 ABET-mapped skill competencies with AI personal learning recommendations and PDF report exports.
- **Day 3:** 
  - **IoT ESP32 MQTT Telemetry & Auto-Validation Engine (`mqtt.js`)**: Bi-directional MQTT subscriber & publisher channels (`missionx/room/+/sensor`, `rfid`, `solenoid`) with automatic hardware key validation and actuator command publishing (`publishActuatorCommand`).
  - **Context-Aware AI Hint Micro-Engine (`aiHintEngine.js` & `/api/ai/generate-hint`)**: Adaptive AI hint generator outputting Tier 1 (Subtle Clue), Tier 2 (Technical Formula), and Tier 3 (Direct Solution Step) hints with dynamic time penalty clock deductions and under time pressuer.
  - **Multiplayer WebSockets Co-op Room Sync Engine (`gameSocket.js`)**: Real-time team roster synchronization (`team_roster_updated`), 3D object inspection target broadcasts (`teammate_inspecting`), stage advancement synchronization (`team_stage_advanced`), and tactical team chat pings (`team_ping_received`).
- **Day 4:**
  - **Computer Networks VLSM Subnetting & Packet Router Puzzle (`SubnetRoutingPuzzle.tsx`)**: Interactive CIDR netmask calculator (/24, /25, /26, /28) and Gateway router assigner for emergency packet stream restoration.
  - **Self-Balancing AVL & BST Tree Rotation Visualizer (`AvlTreePuzzle.tsx`)**: Interactive tree balance factor visualizer supporting LL, RR, LR, RL single/double rotations to restore O(log N) search speed.
  - **Global & Institutional Leaderboards & Badges Vault (`/leaderboard`)**: National team rankings by escape time, XP, coins, and accuracy %, featuring an unlockable player badge showcase (*A\* Pathfinding Master, Neural Calibrator, SQL Cipher Cracker, IoT Circuit Specialist, Speedrunner Elite*).
  - **Educator Mission Creator Studio (`/creator`)**: *"The Steam Workshop for Escape Rooms"* allowing instructors to configure custom missions, room stages, challenge mechanics, and MQTT hardware sensor mappings without writing code.
- **Day 5:**
  - **Cyber Security XOR Cryptography Cipher Decoder (`CipherPuzzle.tsx`)**: Bitwise XOR key shifting and hex checksum verification to decode ransomware telemetry payloads.
  - **Multi-Table Relational SQL Join Console (`SqlJoinPuzzle.tsx`)**: Interactive SQL builder connecting `patients` and `vault_keys` via `INNER JOIN` and transaction rollbacks.
  - **Gamification Rewards Store & Inventory Vault (`/store`)**: In-game marketplace to spend earned Coins and XP on Power-ups (*Time Freeze Chrono Tokens, Hardware Sensor Auto-Bypass, Cyber Thermal 3D Scanners, Neon Valkyrie Avatars, Holographic Titles*).
  - **Institutional Assessment & PDF Report Suite (`/assessment`)**: Automated ABET CO1-CO6 Outcome Matrix mapping student escape room performance metrics with downloadable PDF Skill Radar Certificates.
- **Day 6:**
  - **OS Virtual Memory Page Replacement Visualizer (`PageReplacementPuzzle.tsx`)**: Simulate LRU (Least Recently Used), FIFO, and Optimal page fault replacement algorithms to clear virtual memory thrashing.
  - **Dynamic Programming 0/1 Knapsack & Memoization Matrix Visualizer (`DpKnapsackPuzzle.tsx`)**: Interactive DP table solver filling subproblem memoization grid `dp[n][W]` to pack maximum payload value under 50MB bandwidth limit.
  - **Web Audio API Sci-Fi Sound Synthesizer Engine (`SoundEffectsEngine.ts`)**: Procedural audio frequency generator producing UI click tones, solenoid vault unlock chimes, alarm sirens, and countdown ticks without external assets.
  - **Multi-Environment 3D Escape Room Canvas Switcher (`EscapeRoomCanvas.tsx`)**: 3D scene switcher allowing live environment toggling across Cyber Vault, Submarine Station, Hospital ICU, and Smart City Hub.
- **Day 7:**
  - **Graph Traversal Shortest Path Visualizer (`GraphTraversalPuzzle.tsx`)**: Interactive Breadth-First Search (BFS queue) and Depth-First Search (DFS stack) router traversal visualizer to discover shortest network hop path.
  - **Game Theory Minimax & Alpha-Beta Pruning Visualizer (`MinimaxPuzzle.tsx`)**: Game tree node evaluator executing $\alpha \ge \beta$ branch cuts to defeat adversary AI bots in 3 turns.
  - **Tournament PvP & Matchmaking Engine (`/tournament`)**: Head-to-Head real-time race arena with live team progress comparison bars, delta clocks, sabotage trap dispatches (*Screen Glitch, Laser Lock, Telemetry Jammer*), and live telemetry log stream.
- **Day 8:**
  - **User Profile Hub & Skill Passport (`/profile`)**: Student Agent passport featuring level progression, avatar customization selector, unlocked badges showcase (*A\* Pathfinding Master, Neural Calibrator, SQL Cipher Cracker, Speedrunner Elite*), and mission history timeline.
  - **Official Verified Skill Radar Certificate Generator (`/certificate/[userId]`)**: Printable and downloadable institutional certificate featuring QR code verification, system hash `0x9F42A7`, ABET CO1-CO6 Outcome Matrix, and 15-skill radar score.
- **Day 9:**
  - **Quantum Cryptography BB84 Protocol Visualizer (`QuantumBb84Puzzle.tsx`)**: Interactive photon polarization filter aligner (+ Rectilinear / x Diagonal) for shared secret key distribution and Eve eavesdropping detection.
  - **CNN Convolution & Max-Pooling Visualizer (`CnnFilterPuzzle.tsx`)**: Deep learning visualizer applying 3x3 Sobel Edge Detection kernels and 2x2 Max-Pooling feature extraction grids over security camera feeds.
  - **AI Game Master Voice Synthesizer (`AiVoiceNarrator.ts`)**: Procedural browser speech synthesis engine rendering dynamic voice briefings, emergency alerts, and challenge completion announcements.
  - **Machine Learning AI Difficulty Scaling Engine (`aiDifficultyEngine.js`)**: Dynamic backend difficulty scaler adjusting time penalties, distractor counts, and hint costs based on real-time team escape velocity.
- **Day 10:**
  - **Docker Containerization & Multi-Stage Deployment Suite (`docker-compose.yml`)**: Multi-stage Docker setup orchestrating Next.js Frontend, Express Backend, MongoDB, and Mosquitto MQTT Broker.
  - **Automated E2E System Verification Diagnostic Script (`verify_system.js`)**: Automated diagnostic script verifying REST API endpoints, AI microservices, MQTT channels, and build integrity.
- **Day 11:**
  - **Compiler Lexical Analyzer & AST Parser Visualizer (`CompilerAstPuzzle.tsx`)**: Interactive compiler visualizer tokenizing raw code strings into Lexical Tokens (`IDENTIFIER`, `OPERATOR`, `LITERAL`) and parsing root Abstract Syntax Trees (AST).
  - **Distributed Systems Raft Consensus Protocol Visualizer (`RaftConsensusPuzzle.tsx`)**: Distributed systems cluster simulator executing Leader Election, Heartbeat Sync, and Quorum Majority commit logging across 5 cluster nodes.
  - **Live Educator Spectator & Heatmap Console (`/spectator`)**: Classroom multi-team grid monitoring real-time team frustration levels, hint usage counts, and instant instructor time/hint intervention triggers.
- **Day 12:**
  - **Enterprise Multi-Tenancy & Institutional Admin Console (`/admin/tenants`)**: Multi-tenant domain manager isolating university campuses, custom institutional logos, and custom ABET CO outcome weighting.
  - **GitHub Actions CI/CD Pipeline (`ci-cd.yml`)**: Automated CI/CD workflow testing TypeScript compilation, E2E system health diagnostics, and Docker build image verification.
- **Day 13:**
  - **Blockchain Proof-of-Work & Smart Contract Visualizer (`BlockchainPoWPuzzle.tsx`)**: SHA-256 target nonce mining simulator (`0x0000...`) and Solidity smart contract re-entrancy vulnerability auditor.
  - **Distributed MapReduce Parallel Processing Visualizer (`MapReducePuzzle.tsx`)**: Big data pipeline visualizer executing Map, Shuffle/Sort, and Reduce operations across 4 distributed cluster worker nodes.
- **Day 14 (Grand Finale):**
  - **WebXR Apple Vision Pro & Meta Quest Spatial 3D Engine (`WebXrCanvas.tsx`)**: Spatial WebXR 3D viewport supporting VR/AR headsets with hand-tracking spatial raycasts.
  - **Global i18n Multi-Language Localization Engine (`LanguageProvider.tsx`)**: Live multi-language context supporting English, Spanish, Hindi, German, and Japanese.
- **Day 15:**
  - **Distributed Paxos Consensus Protocol Visualizer (`PaxosConsensusPuzzle.tsx`)**: Proposer, Acceptor, and Learner phase simulator (`Prepare`, `Promise`, `Accept`, `Accepted`) achieving majority quorum consensus across 5 cluster nodes.
  - **Zero-Knowledge Proofs zk-SNARKs Visualizer (`ZkpPuzzle.tsx`)**: Cryptography proof generator verifying knowledge of secret passcode without disclosing plaintext secret strings.
  - **AI Automated Student Code Reviewer Engine (`aiCodeReviewer.js`)**: Automated LLM Code Reviewer evaluating student solution code for $O(N \log N)$ complexity, security flaws, and refactoring tips.
- **Day 16 (Ultimate Platform Completion):**
  - **Automated ABET Accreditation Portfolio Exporter (`/admin/accreditation`)**: Institutional accreditation dashboard generating university ABET Self-Study Year-End PDF Portfolios with CO achievement histograms.
  - **Live System Diagnostic Monitor & Health Dashboard (`/admin/health`)**: Microservice health monitor tracking WebSockets latency (&lt;15ms), MQTT throughput, MongoDB connection pools, and Redis cache hit rates.
- **Day 17:**
  - **Federated Learning Privacy-Preserving AI Visualizer (`FederatedLearningPuzzle.tsx`)**: Decentralized ML gradient collector training local models and executing Secure Aggregation without raw data centralization.
  - **Database B-Tree Index Node Balancing Visualizer (`BTreeIndexPuzzle.tsx`)**: Database indexing visualizer executing node key splits and median root promotions to optimize $O(\log_B N)$ disk I/O search speed.
- **Day 18 (Omni-Channel Release):**
  - **Keyboard Command Palette Navigation Hub (`CommandPalette.tsx`)**: Global `Ctrl+K` / `Cmd+K` keyboard shortcut popup enabling instant search and jump navigation across all 18 platform modules.
  - **Progressive Web App Mobile Companion Engine (`manifest.json`)**: PWA Web Manifest enabling standalone mobile installation, haptic feedback alerts, and offline app caching.

---

## Course Alignment
Aligned with **25SC2008E (Full Stack Web Development)**: CO1 (Responsive Design), CO2 (Async DOM), CO3 (React State/Recharts), CO4 (Express REST APIs), CO5 (WebSockets/MQTT), CO6 (Microservices & Deployment).

