const express = require('express');
const router = express.Router();
const Mission = require('../models/Mission.model');

// Pre-packaged educational mission library
const DEFAULT_MISSIONS = [
  {
    _id: '65f1a2b3c4d5e6f7a8b9c0d1',
    title: 'Rescue Robot Navigation',
    domain: 'ARTIFICIAL_INTELLIGENCE',
    topic: 'A* Search Algorithm',
    storyBriefing: 'A seismic anomaly has trapped 40 civilians inside Sector 7. Your autonomous rescue rover must compute the optimal heuristic path (h(n) + g(n)) to reach the safe zone before structural collapse.',
    difficulty: 'HARD',
    maxTimeSeconds: 2700,
    coinsReward: 350,
    xpReward: 700,
    rooms: [
      {
        roomNumber: 1,
        roomName: 'Perception Lab',
        challenges: [
          {
            challengeId: 'AI_ASTAR_1',
            title: 'State Space Scramble',
            topic: 'State Space & Heuristic Evaluation',
            description: 'Determine the correct heuristic value h(n) for Node C given straight-line Manhattan distance to Goal G(5,5). Current position C(2,1).',
            puzzleType: 'MCQ',
            options: ['h(n) = 3', 'h(n) = 7', 'h(n) = 5', 'h(n) = 9'],
            correctAnswer: 'h(n) = 7',
            hints: ['Manhattan Distance formula: |x1 - x2| + |y1 - y2|', '|2 - 5| + |1 - 5| = 3 + 4 = 7'],
            iotMapping: {
              sensorId: 'RFID_READER_ROOM1',
              sensorType: 'RFID',
              expectedValue: 'TAG_CARD_ASTAR_7',
              actuatorTrigger: 'SERVO_UNLOCK_ROOM1',
            },
          },
        ],
      },
      {
        roomNumber: 2,
        roomName: 'Optimal Path Chamber',
        challenges: [
          {
            challengeId: 'AI_ASTAR_2',
            title: 'Cost Function Tuning',
            topic: 'f(n) = g(n) + h(n)',
            description: 'Select the optimal next node when Node A has f(A)=12 and Node B has f(B)=9.',
            puzzleType: 'MCQ',
            options: ['Node A', 'Node B', 'Both are equal', 'Expand neither'],
            correctAnswer: 'Node B',
            hints: ['A* always expands the node with the minimum f(n) value.'],
            iotMapping: {
              sensorId: 'PRESSURE_MAT_ROOM2',
              sensorType: 'PRESSURE_MAT',
              expectedValue: 'WEIGHT_TRIGGERED_NODE_B',
              actuatorTrigger: 'LED_GREEN_DOOR2',
            },
          },
        ],
      },
    ],
  },
  {
    _id: '65f1a2b3c4d5e6f7a8b9c0d2',
    title: 'Smart City Power Grid Restoration',
    domain: 'IOT',
    topic: 'Sensor-Actuator Automation & PEAS',
    storyBriefing: 'A cyber threat has shut down the urban energy grid. Wire the sensor-actuator relay mapping correctly to prevent a cascading blackout across the metro hospital district.',
    difficulty: 'MEDIUM',
    maxTimeSeconds: 2400,
    coinsReward: 300,
    xpReward: 600,
    rooms: [
      {
        roomNumber: 1,
        roomName: 'Substation Control Room',
        challenges: [
          {
            challengeId: 'IOT_CITY_1',
            title: 'PEAS Specification',
            topic: 'Environment & Actuator Matching',
            description: 'Match the PIR Motion Sensor and Relays to restore sub-station security lights.',
            puzzleType: 'IOT_TRIGGER',
            options: ['PIR -> Relay 1', 'LDR -> Buzzer', 'PIR -> Relay 2', 'DHT11 -> Servo'],
            correctAnswer: 'PIR -> Relay 1',
            hints: ['PIR detects motion. When triggered, it signals Relay 1 to power high-voltage floodlights.'],
            iotMapping: {
              sensorId: 'PIR_SENSOR_01',
              sensorType: 'PIR',
              expectedValue: 'MOTION_DETECTED',
              actuatorTrigger: 'RELAY_1_ON',
            },
          },
        ],
      },
    ],
  },
];

// @route GET /api/missions
router.get('/', async (req, res) => {
  try {
    const missions = await Mission.find();
    if (missions.length === 0) {
      return res.json({ success: true, count: DEFAULT_MISSIONS.length, missions: DEFAULT_MISSIONS });
    }
    res.json({ success: true, count: missions.length, missions });
  } catch (error) {
    res.json({ success: true, count: DEFAULT_MISSIONS.length, missions: DEFAULT_MISSIONS });
  }
});

// @route GET /api/missions/:id
router.get('/:id', async (req, res) => {
  const mission = DEFAULT_MISSIONS.find((m) => m._id === req.params.id) || DEFAULT_MISSIONS[0];
  res.json({ success: true, mission });
});

module.exports = router;
