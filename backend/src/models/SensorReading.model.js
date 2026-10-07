const mongoose = require('mongoose');

const sensorReadingSchema = new mongoose.Schema(
  {
    sensorId: { type: String, default: 'temperature-sensor-primary' },
    name: { type: String, default: 'Laboratory Temperature Sensor' },
    value: { type: Number, required: true }, // e.g. 27.4
    unit: { type: String, default: '°C' },
    status: { type: String, default: 'NORMAL' },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SensorReading', sensorReadingSchema);
