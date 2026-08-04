const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['SUPER_ADMIN', 'GAME_MASTER', 'STUDENT'],
      default: 'STUDENT',
    },
    avatar: { type: String, default: 'cyber_agent_1' },
    institution: { type: String, default: 'KL Deemed University' },
    stats: {
      xp: { type: Number, default: 0 },
      coins: { type: Number, default: 100 },
      missionsCompleted: { type: Number, default: 0 },
      criticalThinkingScore: { type: Number, default: 75 },
      analyticalScore: { type: Number, default: 80 },
      decisionScore: { type: Number, default: 70 },
      leadershipScore: { type: Number, default: 85 },
      communicationScore: { type: Number, default: 78 },
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
