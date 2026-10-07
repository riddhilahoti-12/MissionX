const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User.model');
const Subject = require('./models/Subject.model');
const Question = require('./models/Question.model');
const Progress = require('./models/Progress.model');
const { FALLBACK_QUESTIONS } = require('./routes/question.routes');

const SEED_USERS = [
  {
    name: 'Super Admin Commander',
    email: 'admin@missionx.edu',
    password: 'admin123password',
    role: 'SUPER_ADMIN',
  },
  {
    name: 'Student Agent Alex',
    email: 'alex@missionx.edu',
    password: 'student123password',
    role: 'STUDENT',
  },
  {
    name: 'Student Agent Sarah',
    email: 'student@missionx.edu',
    password: 'student123password',
    role: 'STUDENT',
  },
];

const SEED_SUBJECTS = [
  {
    slug: 'data-structures',
    name: 'Data Structures',
    description: 'Arrays, Stacks, Queues, Trees, Heaps, and Graph algorithms.',
    icon: 'Network',
    questionCount: 5,
  },
  {
    slug: 'dbms',
    name: 'DBMS',
    description: 'Relational model, Normalization, SQL Joins, ACID, and Transactions.',
    icon: 'Database',
    questionCount: 5,
  },
  {
    slug: 'operating-systems',
    name: 'Operating Systems',
    description: 'Processes, CPU Scheduling, Deadlocks, Paging, and Memory Thrashing.',
    icon: 'Cpu',
    questionCount: 5,
  },
  {
    slug: 'computer-networks',
    name: 'Computer Networks',
    description: 'OSI 7-Layer Architecture, TCP/IP, Routing, DHCP, and Subnetting.',
    icon: 'Globe',
    questionCount: 5,
  },
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/missionx_db';
    console.log(`[Seed] Connecting to MongoDB at ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    console.log('[Seed] Clearing existing data...');
    await User.deleteMany({ email: { $in: SEED_USERS.map((u) => u.email) } });
    await Subject.deleteMany({});
    await Question.deleteMany({});

    console.log('[Seed] Seeding users...');
    let seededStudent = null;
    for (const userData of SEED_USERS) {
      const u = await User.create(userData);
      console.log(`  └─ Created ${u.role}: ${u.email}`);
      if (u.email === 'alex@missionx.edu') seededStudent = u;
    }

    console.log('[Seed] Seeding subjects...');
    for (const sub of SEED_SUBJECTS) {
      await Subject.create(sub);
      console.log(`  └─ Created Subject: ${sub.name}`);
    }

    console.log('[Seed] Seeding questions (5 per subject)...');
    let totalQuestions = 0;
    for (const [subjectId, questions] of Object.entries(FALLBACK_QUESTIONS)) {
      for (const q of questions) {
        await Question.create({
          subjectId: q.subjectId,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          difficulty: q.difficulty,
        });
        totalQuestions++;
      }
    }
    console.log(`  └─ Total Questions Seeded: ${totalQuestions}`);

    // Seed initial progress for Alex
    if (seededStudent) {
      await Progress.deleteMany({ userId: seededStudent._id.toString() });
      await Progress.create([
        { userId: seededStudent._id.toString(), subjectId: 'data-structures', score: 4, correctAnswers: 4, questionsAttempted: 5, totalQuestions: 5, percentage: 80 },
        { userId: seededStudent._id.toString(), subjectId: 'dbms', score: 3, correctAnswers: 3, questionsAttempted: 5, totalQuestions: 5, percentage: 60 },
        { userId: seededStudent._id.toString(), subjectId: 'operating-systems', score: 2, correctAnswers: 2, questionsAttempted: 5, totalQuestions: 5, percentage: 40 },
        { userId: seededStudent._id.toString(), subjectId: 'computer-networks', score: 1, correctAnswers: 1, questionsAttempted: 5, totalQuestions: 5, percentage: 20 },
      ]);
      console.log('  └─ Initialized student progress (80%, 60%, 40%, 20%)');
    }

    console.log('✅ [Seed Completed Successfully]');
    process.exit(0);
  } catch (error) {
    console.error('❌ [Seed Error]:', error.message);
    process.exit(1);
  }
};

seedDatabase();
