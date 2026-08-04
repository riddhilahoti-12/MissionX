const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');
const { initMQTT } = require('./config/mqtt');
const setupGameSockets = require('./sockets/gameSocket');

const authRoutes = require('./routes/auth.routes');
const missionRoutes = require('./routes/mission.routes');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Connect Primary MongoDB Database
connectDB();

// Connect MQTT Telemetry Bridge
initMQTT(io);

// Connect Real-Time Socket.io Engine
setupGameSockets(io);

// System Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'MissionX Real-Time API Engine',
    timestamp: new Date().toISOString(),
    services: {
      database: 'OK',
      mqttBroker: 'ACTIVE',
      webSockets: 'ACTIVE',
    },
  });
});

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/missions', missionRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 MissionX Server listening on HTTP://localhost:${PORT}`);
  console.log(`📡 Socket.io Engine: ACTIVE`);
  console.log(`📟 MQTT Telemetry Subscriber: LISTENING`);
  console.log(`=======================================================`);
});
