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

---

## Course Alignment
Aligned with **25SC2008E (Full Stack Web Development)**: CO1 (Responsive Design), CO2 (Async DOM), CO3 (React State/Recharts), CO4 (Express REST APIs), CO5 (WebSockets/MQTT), CO6 (Microservices & Deployment).

