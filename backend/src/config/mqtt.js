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
      
      // Subscribe to all MissionX telemetry, rfid, and sensor channels
      mqttClient.subscribe('missionx/room/+/sensor', (err) => {
        if (!err) console.log('[MQTT] Subscribed to topic: missionx/room/+/sensor');
      });
      mqttClient.subscribe('missionx/room/+/rfid', (err) => {
        if (!err) console.log('[MQTT] Subscribed to topic: missionx/room/+/rfid');
      });
      mqttClient.subscribe('missionx/room/+/solenoid', (err) => {
        if (!err) console.log('[MQTT] Subscribed to topic: missionx/room/+/solenoid');
      });
    });

    mqttClient.on('message', (topic, message) => {
      try {
        const payload = JSON.parse(message.toString());
        console.log(`[MQTT Telemetry Received] Topic: ${topic}`, payload);

        const topicParts = topic.split('/');
        const roomId = topicParts[2] || 'ROOM_101';
        const channelType = topicParts[3] || 'sensor';

        if (io) {
          // Broadcast live sensor payload to WebSockets subscribers in session
          io.to(`session_${roomId}`).emit('sensor_telemetry', {
            roomId,
            channelType,
            sensorId: payload.sensorId || 'SENSOR_01',
            sensorType: payload.sensorType || 'GENERIC',
            value: payload.value || payload.tagId,
            timestamp: payload.timestamp || new Date().toISOString(),
          });

          // Auto-validation trigger for RFID & Actuators
          if (payload.value === 'TAG_CARD_ASTAR_7' || payload.value === 'ASTAR_PATH_COMPLETE' || payload.value === 'UNLOCK') {
            console.log(`✅ [MQTT Auto-Validation] Correct hardware key detected for ${roomId}. Disengaging solenoid!`);
            
            // Publish MQTT actuator command to physical ESP32
            publishActuatorCommand(roomId, 'SOLENOID_VAULT_DOOR', 'UNLOCKED');

            io.to(`session_${roomId}`).emit('stage_auto_validated', {
              roomId,
              unlockedStage: 2,
              message: 'Physical RFID Keycard Verified via ESP32 MQTT Telemetry!',
              timestamp: new Date().toISOString(),
            });
          }
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

// Function to publish actuator commands to physical ESP32 devices
const publishActuatorCommand = (roomId, actuatorId, commandState) => {
  if (!mqttClient || !mqttClient.connected) {
    console.warn(`[MQTT Warning] Cannot publish actuator command. Broker not connected.`);
    return false;
  }

  const topic = `missionx/room/${roomId}/actuator`;
  const message = JSON.stringify({
    actuatorId,
    commandState,
    issuedBy: 'MISSIONX_ENGINE',
    timestamp: new Date().toISOString(),
  });

  mqttClient.publish(topic, message, { qos: 1 }, (err) => {
    if (err) {
      console.error(`[MQTT Error] Failed to publish actuator command to ${topic}:`, err.message);
    } else {
      console.log(`📡 [MQTT Published] Sent Actuator Command to ${topic}:`, message);
    }
  });

  return true;
};

const getMQTTClient = () => mqttClient;

module.exports = { initMQTT, getMQTTClient, publishActuatorCommand };
