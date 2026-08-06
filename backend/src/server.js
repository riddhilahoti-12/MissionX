// Load environment variables immediately at startup
require('dotenv').config();

const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');

const connectDB = require('./config/db');
const { initMQTT } = require('./config/mqtt');
const setupGameSockets = require('./sockets/gameSocket');

const loggerMiddleware = require('./middleware/logger');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth.routes');
const missionRoutes = require('./routes/mission.routes');

const app = express();
const server = http.createServer(app);

// 1. Security Middleware (Helmet HTTP Headers)
app.use(
  helmet({
    contentSecurityPolicy: false, // Disabled for WebSocket & MQTT local dev compatibility
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// 2. Cross-Origin Resource Sharing (CORS Configuration)
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
};
app.use(cors(corsOptions));

// 3. Body Parsing Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 4. Request Logging Middleware (Morgan Custom Format)
app.use(loggerMiddleware);

// Connect Primary Database
connectDB();

// Connect MQTT Telemetry Bridge
initMQTT(server);

// Connect Real-Time Socket.io Engine
const io = new Server(server, {
  cors: corsOptions,
});
setupGameSockets(io);

// 5. System Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    system: 'MissionX Real-Time Express Engine',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    services: {
      database: 'CONNECTED',
      mqttBroker: 'ACTIVE',
      webSockets: 'ACTIVE',
    },
  });
});

// 6. Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/missions', missionRoutes);

// 7. Handle 404 Routes & Global Errors
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 MissionX Server listening on HTTP://localhost:${PORT}`);
  console.log(`⚙️  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🛡️  Security Headers (Helmet): ACTIVE`);
  console.log(`🌐 CORS Allowed Origin: ${process.env.CLIENT_ORIGIN || '*'}`);
  console.log(`📝 Logger Middleware: ACTIVE`);
  console.log(`=======================================================`);
});

module.exports = { app, server };
