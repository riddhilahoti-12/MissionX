const SensorReading = require('../models/SensorReading.model');

// In-memory state for the simulated hardware temperature & humidity sensor
let currentTemperature = 27.4;
let currentHumidity = 52.0;
let isManualMode = false;
let lastUpdated = new Date();
let readingHistory = [];

const SENSOR_META = {
  sensorId: 'sensor-esp32-dht22',
  name: 'Laboratory Ambient Sensor (ESP32 + DHT22)',
  type: 'Temperature & Humidity',
  unit: '°C',
  optimalRange: '20.0 - 28.0 °C',
};

// Generate realistic fluctuating temperature when in auto mode
const generateReading = async () => {
  if (!isManualMode) {
    // Small random walk: -0.3 to +0.3
    const delta = (Math.random() - 0.48) * 0.6;
    currentTemperature = parseFloat((currentTemperature + delta).toFixed(1));

    // Bound within realistic laboratory bounds in auto mode
    if (currentTemperature < 24.0) currentTemperature = 24.5;
    if (currentTemperature > 29.5) currentTemperature = 28.8;

    // Slight humidity fluctuation
    const humDelta = (Math.random() - 0.5) * 0.8;
    currentHumidity = parseFloat(Math.min(90, Math.max(30, currentHumidity + humDelta)).toFixed(1));
  }

  lastUpdated = new Date();
  const status = currentTemperature > 32.0 ? 'CRITICAL' : currentTemperature > 28.0 ? 'WARNING' : 'NORMAL';

  const reading = {
    ...SENSOR_META,
    temperature: currentTemperature,
    value: currentTemperature,
    humidity: currentHumidity,
    status,
    isManualMode,
    timestamp: lastUpdated.toISOString(),
  };

  readingHistory.unshift(reading);
  if (readingHistory.length > 30) {
    readingHistory.pop();
  }

  // Persist asynchronously to DB if available
  try {
    await SensorReading.create({
      sensorId: SENSOR_META.sensorId,
      name: SENSOR_META.name,
      value: currentTemperature,
      unit: SENSOR_META.unit,
      status,
      timestamp: lastUpdated,
    });
  } catch (err) {
    // Non-blocking
  }

  return reading;
};

// Pre-fill initial reading
generateReading();

// Start periodic update loop every 3 seconds
setInterval(generateReading, 3000);

const getLatestReading = () => {
  const status = currentTemperature > 32.0 ? 'CRITICAL' : currentTemperature > 28.0 ? 'WARNING' : 'NORMAL';
  return {
    ...SENSOR_META,
    temperature: currentTemperature,
    value: currentTemperature,
    humidity: currentHumidity,
    status,
    isManualMode,
    timestamp: lastUpdated.toISOString(),
  };
};

const getHistory = () => {
  return readingHistory;
};

const overrideReading = async ({ temperature, humidity, status }) => {
  isManualMode = true;
  if (temperature !== undefined && !isNaN(Number(temperature))) {
    currentTemperature = parseFloat(Number(temperature).toFixed(1));
  }
  if (humidity !== undefined && !isNaN(Number(humidity))) {
    currentHumidity = parseFloat(Number(humidity).toFixed(1));
  }

  return await generateReading();
};

const setMode = (manual) => {
  isManualMode = Boolean(manual);
  return { isManualMode, status: isManualMode ? 'MANUAL_OVERRIDE' : 'AUTO_TELEMETRY' };
};

module.exports = {
  getLatestReading,
  getHistory,
  generateReading,
  overrideReading,
  setMode,
};
