const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User.model');
const Mission = require('./models/Mission.model');

const SEED_USERS = [
  {
    name: 'Super Admin Commander',
    email: 'admin@missionx.edu',
    password: 'admin123password',
    role: 'SUPER_ADMIN',
    avatar: 'admin_shield_gold',
    institution: 'KL Deemed University',
  },
  {
    name: 'Professor Maverick',
    email: 'gamemaster@missionx.edu',
    password: 'gm123password',
    role: 'GAME_MASTER',
    avatar: 'cyber_instructor_pro',
    institution: 'KL Deemed University',
  },
  {
    name: 'Student Agent Alex',
    email: 'alex@missionx.edu',
    password: 'student123password',
    role: 'STUDENT',
    avatar: 'agent_cyber_blue',
    institution: 'KL Deemed University',
    stats: {
      xp: 1250,
      coins: 450,
      missionsCompleted: 5,
      criticalThinkingScore: 82,
      analyticalScore: 88,
      decisionScore: 78,
      leadershipScore: 85,
      communicationScore: 80,
    },
  },
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/missionx_db';
    console.log(`[Seed] Connecting to MongoDB at ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    console.log('[Seed] Clearing existing demo users...');
    await User.deleteMany({ email: { $in: SEED_USERS.map((u) => u.email) } });

    console.log('[Seed] Seeding sample users...');
    for (const userData of SEED_USERS) {
      await User.create(userData);
      console.log(`  └─ Created ${userData.role}: ${userData.email}`);
    }

    console.log('✅ [Seed Completed Successfully]');
    process.exit(0);
  } catch (error) {
    console.error('❌ [Seed Error]:', error.message);
    process.exit(1);
  }
};

seedDatabase();
