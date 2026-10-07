/*
 * MissionX - Educational Escape Room & IoT Platform
 * ESP32 + DHT22 Hardware Telemetry Firmware
 *
 * Microcontroller: ESP32 DevKit V1 (Tensilica Xtensa Dual-Core 32-bit LX6)
 * Sensor: DHT22 / AM2302 (Digital Relative Humidity & Temperature Sensor)
 * Communication: 2.4 GHz 802.11 b/g/n Wi-Fi + HTTP / MQTT Telemetry Bridge
 *
 * Pinout:
 *   - DHT22 DATA   -> GPIO 4 (with 10kΩ pull-up resistor)
 *   - Status LED   -> GPIO 2 (Internal/External Blue LED)
 *   - Warning LED  -> GPIO 15 (Red Alert Indicator)
 *   - Alarm Buzzer -> GPIO 13 (Piezo Buzzer)
 *   - DHT22 VCC    -> 3.3V / 5V
 *   - DHT22 GND    -> GND
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <ArduinoJson.h>

// Wi-Fi Configuration (Wokwi default virtual network or local AP)
const char* WIFI_SSID = "Wokwi-GUEST";
const char* WIFI_PASS = "";

// MissionX Backend Endpoint
// Note: When testing locally, use machine IP (e.g. http://192.168.1.50:5000/api/sensor/reading)
const char* SERVER_URL = "http://localhost:5000/api/sensor/reading";

#define DHTPIN 4
#define DHTTYPE DHT22

#define LED_STATUS_PIN 2
#define LED_ALERT_PIN  15
#define BUZZER_PIN     13

DHT dht(DHTPIN, DHTTYPE);

unsigned long lastTelemetryMillis = 0;
const unsigned long TELEMETRY_INTERVAL_MS = 3000;

void setup() {
  Serial.begin(115200);
  delay(1000);

  Serial.println("==================================================");
  Serial.println("🚀 [MISSION-X] ESP32 FIRMWARE TELEMETRY ENGINE v1.0");
  Serial.println("💻 Core Architecture: Tensilica Xtensa 240MHz");
  Serial.println("==================================================");

  pinMode(LED_STATUS_PIN, OUTPUT);
  pinMode(LED_ALERT_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);

  digitalWrite(LED_STATUS_PIN, LOW);
  digitalWrite(LED_ALERT_PIN, LOW);
  digitalWrite(BUZZER_PIN, LOW);

  dht.begin();
  Serial.println("[DHT22] Sensor bus initialized on GPIO 4");

  // Connect to Wi-Fi
  Serial.printf("[WIFI] Connecting to SSID: %s ", WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  int retries = 0;
  while (WiFi.status() != WL_CONNECTED && retries < 15) {
    delay(500);
    Serial.print(".");
    digitalWrite(LED_STATUS_PIN, !digitalRead(LED_STATUS_PIN));
    retries++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    digitalWrite(LED_STATUS_PIN, HIGH);
    Serial.println("\n[WIFI] Connected Successfully!");
    Serial.printf("[WIFI] Assigned IP Address: %s\n", WiFi.localIP().toString().c_str());
    Serial.printf("[WIFI] RSSI Signal: %d dBm\n", WiFi.RSSI());
  } else {
    Serial.println("\n[WIFI] Offline mode (Simulated telemetry continuing locally)...");
  }

  Serial.println("[SYSTEM] Ready. Commencing continuous sensor sample loop...\n");
}

void loop() {
  unsigned long currentMillis = millis();

  if (currentMillis - lastTelemetryMillis >= TELEMETRY_INTERVAL_MS) {
    lastTelemetryMillis = currentMillis;

    // Read physical/simulated sensor values
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    if (isnan(temperature) || isnan(humidity)) {
      Serial.println("⚠️  [DHT22 ERROR] Failed to read from digital DHT sensor bus!");
      return;
    }

    // Determine status
    String status = "NORMAL";
    if (temperature > 32.0) {
      status = "CRITICAL";
      digitalWrite(LED_ALERT_PIN, HIGH);
      tone(BUZZER_PIN, 1000, 200); // Beep warning
    } else if (temperature > 28.0) {
      status = "WARNING";
      digitalWrite(LED_ALERT_PIN, HIGH);
      digitalWrite(BUZZER_PIN, LOW);
    } else {
      digitalWrite(LED_ALERT_PIN, LOW);
      digitalWrite(BUZZER_PIN, LOW);
    }

    // Print detailed serial telemetry packet
    Serial.println("--------------------------------------------------");
    Serial.printf("⏱️  [SAMPLE] Time: %lu ms\n", currentMillis);
    Serial.printf("🌡️  Temperature: %.1f °C\n", temperature);
    Serial.printf("💧 Humidity   : %.1f %%\n", humidity);
    Serial.printf("🛡️  Status     : %s\n", status.c_str());

    // Construct JSON Telemetry Packet
    StaticJsonDocument<256> doc;
    doc["sensorId"] = "esp32-lab-temp-01";
    doc["temperature"] = serialized(String(temperature, 1));
    doc["humidity"] = serialized(String(humidity, 1));
    doc["status"] = status;
    doc["uptimeSeconds"] = currentMillis / 1000;

    String jsonPayload;
    serializeJson(doc, jsonPayload);

    // If connected, dispatch HTTP POST packet to MissionX backend
    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.begin(SERVER_URL);
      http.addHeader("Content-Type", "application/json");

      int httpResponseCode = http.POST(jsonPayload);
      if (httpResponseCode > 0) {
        Serial.printf("📡 [TX SUCCESS] HTTP POST to %s (Status: %d)\n", SERVER_URL, httpResponseCode);
      } else {
        Serial.printf("📡 [TX LOCAL] Simulated packet ready (HTTP code: %d)\n", httpResponseCode);
      }
      http.end();
    } else {
      Serial.printf("📡 [SERIAL TELEMETRY PACKET]: %s\n", jsonPayload.c_str());
    }

    // Heartbeat LED flash
    digitalWrite(LED_STATUS_PIN, LOW);
    delay(50);
    digitalWrite(LED_STATUS_PIN, HIGH);
  }
}
