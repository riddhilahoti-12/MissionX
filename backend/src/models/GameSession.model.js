const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema(
  {
    sessionCode: { type: String, required: true, unique: true },
    missionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mission', required: true },
    gameMasterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    teamName: { type: String, required: true },
    players: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String },
        roleInTeam: { type: String, default: 'AI Engineer' },
      },
    ],
    status: {
      type: String,
      enum: ['BRIEFING', 'RUNNING', 'PAUSED', 'COMPLETED', 'FAILED'],
      default: 'BRIEFING',
    },
    currentRoomIndex: { type: Number, default: 0 },
    currentChallengeIndex: { type: Number, default: 0 },
    timeRemainingSeconds: { type: Number, default: 3600 },
    hintsUsed: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    telemetryLogs: [
      {
        timestamp: { type: Date, default: Date.now },
        sensorId: { type: String },
        value: { type: String },
        status: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('GameSession', gameSessionSchema);
