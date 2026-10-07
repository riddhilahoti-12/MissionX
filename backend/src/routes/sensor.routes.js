const express = require('express');
const router = express.Router();
const sensorService = require('../services/sensorService');

// @route GET /api/sensor/latest
router.get('/latest', (req, res) => {
  try {
    const reading = sensorService.getLatestReading();
    res.json({
      success: true,
      sensor: reading,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route GET /api/sensor/history
router.get('/history', (req, res) => {
  try {
    const history = sensorService.getHistory();
    res.json({
      success: true,
      count: history.length,
      readings: history,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route POST /api/sensor/override (Injected from Web Hardware Simulator / Wokwi)
router.post('/override', async (req, res) => {
  try {
    const { temperature, humidity, status } = req.body;
    const reading = await sensorService.overrideReading({ temperature, humidity, status });
    res.json({
      success: true,
      message: 'Hardware telemetry overridden successfully',
      sensor: reading,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route POST /api/sensor/reading (Standard IoT ingestion format used by ESP32 HTTP POST)
router.post('/reading', async (req, res) => {
  try {
    const { temperature, temp, humidity, hum, value } = req.body;
    const reading = await sensorService.overrideReading({
      temperature: temperature !== undefined ? temperature : (temp !== undefined ? temp : value),
      humidity: humidity !== undefined ? humidity : hum,
    });
    res.json({
      success: true,
      message: 'ESP32 telemetry packet ingested',
      sensor: reading,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route POST /api/sensor/mode (Toggle AUTO vs MANUAL)
router.post('/mode', (req, res) => {
  try {
    const { manual } = req.body;
    const result = sensorService.setMode(manual);
    res.json({
      success: true,
      ...result,
      sensor: sensorService.getLatestReading(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
