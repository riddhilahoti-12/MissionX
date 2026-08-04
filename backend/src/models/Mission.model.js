const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  challengeId: { type: String, required: true },
  title: { type: String, required: true },
  topic: { type: String, required: true },
  description: { type: String, required: true },
  puzzleType: {
    type: String,
    enum: ['MCQ', 'CODE_DEBUG', 'IOT_TRIGGER', 'ALGORITHM_PUZZLE', 'SQL_QUERY'],
    required: true,
  },
  initialState: { type: String },
  targetState: { type: String },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true },
  hints: [{ type: String }],
  iotMapping: {
    sensorId: { type: String },
    sensorType: { type: String }, // RFID, PIR, ULTRASONIC, PRESSURE_MAT
    expectedValue: { type: String },
    actuatorTrigger: { type: String }, // SERVO_UNLOCK, BUZZER_ALARM, LED_GREEN
  },
});

const roomSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true },
  roomName: { type: String, required: true },
  description: { type: String },
  challenges: [challengeSchema],
});

const missionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    domain: {
      type: String,
      enum: ['ARTIFICIAL_INTELLIGENCE', 'IOT', 'DATA_STRUCTURES', 'PROGRAMMING', 'COMPUTER_NETWORKS', 'OPERATING_SYSTEMS', 'DATABASE'],
      required: true,
    },
    topic: { type: String, required: true },
    storyBriefing: { type: String, required: true },
    difficulty: { type: String, enum: ['EASY', 'MEDIUM', 'HARD', 'EXPERT'], default: 'MEDIUM' },
    maxTimeSeconds: { type: Number, default: 3600 },
    coinsReward: { type: Number, default: 250 },
    xpReward: { type: Number, default: 500 },
    rooms: [roomSchema],
    createdById: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Mission', missionSchema);
