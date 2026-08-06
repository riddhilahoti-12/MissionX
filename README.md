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

---

## Course Alignment
Aligned with **25SC2008E (Full Stack Web Development)**: CO1 (Responsive Design), CO2 (Async DOM), CO3 (React State/Recharts), CO4 (Express REST APIs), CO5 (WebSockets/MQTT), CO6 (Microservices & Deployment).

