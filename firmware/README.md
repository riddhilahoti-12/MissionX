# 🛠️ MissionX IoT Hardware Simulation Guide

This directory provides the complete virtual IoT hardware stack for the **MissionX Educational Platform**. If you do not have physical electronic components (breadboard, ESP32, DHT22 sensor, jumper wires), you can demonstrate the complete hardware architecture and live sensor telemetry either through:

1. **MissionX Built-in Interactive Web Hardware Workbench**: Accessible directly in the MissionX web platform at [`http://localhost:3000/simulator`](http://localhost:3000/simulator).
2. **Wokwi Online Hardware Simulator**: The academic and industry-standard browser-based electronic circuit simulator at [https://wokwi.com](https://wokwi.com).

---

## 📐 Circuit Schematic & Pinout Table

The simulated hardware consists of an **ESP32 DevKit V1** microcontroller connected to a **DHT22 (AM2302) digital temperature and humidity sensor**, status indicators, and an acoustic alert buzzer.

| Component | Pin / Interface | ESP32 Pin | Function |
| :--- | :--- | :--- | :--- |
| **DHT22 Sensor** | VCC | `3V3` (3.3V) | Power Supply |
| **DHT22 Sensor** | GND | `GND` | Ground Reference |
| **DHT22 Sensor** | DATA (SDA) | `GPIO 4` | Digital 1-Wire Telemetry Signal (10kΩ pull-up) |
| **Status LED** | Anode (+) | `GPIO 2` | Blue WiFi & Packet Transmit Activity Indicator |
| **Alert LED** | Anode (+) | `GPIO 15` | Red High-Temperature Warning Indicator (> 28°C) |
| **Piezo Buzzer** | Positive (+) | `GPIO 13` | Acoustic Over-Temperature Critical Alarm (> 32°C) |

---

## 🌐 Option A: Built-in MissionX Web Simulator (Recommended)

1. Open **[http://localhost:3000/simulator](http://localhost:3000/simulator)** in your browser.
2. You will see:
   - **Realistic Circuit Workbench**: Visualized ESP32 DevKit board, DHT22 sensor with pins, jumper wires, OLED status screen, and animated LEDs.
   - **Interactive Physical Dials**: Drag the temperature and humidity sliders or select presets (*Normal Lab 22°C*, *Elevated 28°C*, *Server Overheat 34°C*, *Critical Alarm 45°C*).
   - **Real-Time Synchronized Telemetry**: Overriding values here instantly propagates to the Express backend (`http://localhost:5000/api/sensor/latest`) and the live student dashboard (`http://localhost:3000/dashboard`).
   - **Live 115200 Baud Serial Monitor**: Emulates the Arduino IDE serial output with millisecond timestamps and telemetry JSON packets.
   - **Production C++ Firmware Code**: Full ESP32 sketch code ready for inspection.

---

## ⚡ Option B: Wokwi Online Simulator (Zero Installation)

1. Navigate to **[https://wokwi.com/projects/new/esp32](https://wokwi.com/projects/new/esp32)** in your browser.
2. In the code editor tab, paste the code from [`esp32_sensor_sim.ino`](./esp32_sensor_sim/esp32_sensor_sim.ino).
3. In the `diagram.json` tab, replace the contents with [`diagram.json`](./esp32_sensor_sim/diagram.json).
4. In the `Library Manager` tab, add:
   - `DHT sensor library`
   - `ArduinoJson`
5. Click **▶ Play / Start Simulation**:
   - The virtual ESP32 boots up.
   - Click on the virtual DHT22 sensor to drag its temperature slider up or down.
   - Watch the serial monitor log telemetry packets and watch the red alert LED / buzzer activate when temperature exceeds 28°C!

---

## 💬 What to Say to Your Professor / Evaluator

> *"For the IoT edge hardware layer of MissionX, we engineered an ESP32-based telemetry node that reads digital ambient temperature and humidity over a single-wire bus from a DHT22 sensor on GPIO 4. To demonstrate hardware-software co-design without requiring physical lab bench equipment on stage, we implemented full virtual simulation using the industry-standard Wokwi hardware emulation engine and our embedded MissionX Hardware Workbench. The virtual microcontroller runs real C++ Arduino firmware, serializes telemetry into JSON packets, and transmits real-time telemetry to our Express and MQTT backend, activating automated alarms when thresholds exceed 28°C."*
