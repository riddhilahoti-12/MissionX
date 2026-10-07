// Load environment variables immediately
require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const connectDB = require('./config/db');
const loggerMiddleware = require('./middleware/logger');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

// Route Handlers
const authRoutes = require('./routes/auth.routes');
const subjectRoutes = require('./routes/subject.routes');
const { router: questionRoutes } = require('./routes/question.routes');
const progressRoutes = require('./routes/progress.routes');
const sensorRoutes = require('./routes/sensor.routes');

// Initialize simulated sensor service
require('./services/sensorService');

const app = express();
const server = http.createServer(app);

// 1. Security Headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// 2. CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
};
app.use(cors(corsOptions));

// 3. Body Parsing
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// 4. Request Logging
app.use(loggerMiddleware);

// 5. Connect Database
connectDB();

// 6. System Health Check
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    system: 'MissionX Educational Sensor & Quiz Platform',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    services: {
      database: 'CONNECTED',
      sensorService: 'ACTIVE',
      quizEngine: 'ACTIVE',
    },
  });
});

// 7. Mount Core API Routes
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/quiz', progressRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/sensor', sensorRoutes);

// 8. 404 & Global Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 MissionX Educational Platform listening on HTTP://localhost:${PORT}`);
  console.log(`⚙️  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌡️  Single Simulated Sensor: ACTIVE (Ambient Temperature)`);
  console.log(`📚 Core Subjects: Data Structures, DBMS, OS, Networks`);
  console.log(`=======================================================`);
});

module.exports = { app, server };
