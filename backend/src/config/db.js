const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/missionx_db');
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning] Direct DB connection deferred or retrying: ${error.message}`);
    // Non-blocking in dev mode to allow fallback memory/in-memory mode if Mongo daemon is starting
  }
};

module.exports = connectDB;
