const mqtt = require('mqtt');

let mqttClient = null;

const initMQTT = (io) => {
  const brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://broker.hivemq.com:1883';
  console.log(`[MQTT] Connecting to broker at ${brokerUrl}...`);

  try {
    mqttClient = mqtt.connect(brokerUrl, {
      clientId: `missionx_backend_${Math.random().toString(16).substring(2, 8)}`,
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 5000,
    });

    mqttClient.on('connect', () => {
      console.log('[MQTT] Connected to MQTT Broker successfully.');
      mqttClient.subscribe('missionx/room/+/sensor', (err) => {
        if (!err) {
          console.log('[MQTT] Subscribed to telemetry topic: missionx/room/+/sensor');
        }
      });
    });

    mqttClient.on('message', (topic, message) => {
      try {
        const payload = JSON.parse(message.toString());
        console.log(`[MQTT Telemetry] Topic: ${topic}`, payload);

        const topicParts = topic.split('/');
        const roomId = topicParts[2];

        if (io) {
          io.to(`session_${roomId}`).emit('sensor_telemetry', {
            roomId,
            sensorId: payload.sensorId,
            sensorType: payload.sensorType,
            value: payload.value,
            timestamp: payload.timestamp || new Date().toISOString(),
          });
        }
      } catch (err) {
        console.error('[MQTT Error] Failed to parse message payload:', err.message);
      }
    });

    mqttClient.on('error', (err) => {
      console.warn(`[MQTT Warning] Connection issue: ${err.message}`);
    });
  } catch (err) {
    console.warn(`[MQTT Warning] Could not initialize client: ${err.message}`);
  }

  return mqttClient;
};

const getMQTTClient = () => mqttClient;

module.exports = { initMQTT, getMQTTClient };
