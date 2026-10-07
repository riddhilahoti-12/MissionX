'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import {
  Cpu,
  Thermometer,
  Activity,
  Wifi,
  Terminal,
  Play,
  Pause,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Copy,
  ExternalLink,
  Volume2,
  Sliders,
  Flame,
  Zap,
  Radio,
  Layers,
  ArrowRight
} from 'lucide-react';

interface SerialLog {
  id: number;
  time: string;
  level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR';
  tag: string;
  message: string;
}

export default function SimulatorPage() {
  // State for simulated environment
  const [temperature, setTemperature] = useState<number>(27.4);
  const [humidity, setHumidity] = useState<number>(54.0);
  const [isManualOverride, setIsManualOverride] = useState<boolean>(true);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'workbench' | 'code' | 'wokwi'>('workbench');
  const [packetCount, setPacketCount] = useState<number>(1);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Serial Monitor state
  const [serialLogs, setSerialLogs] = useState<SerialLog[]>([
    {
      id: 1,
      time: '00:00.001',
      level: 'INFO',
      tag: 'BOOT',
      message: 'ESP32 DevKit V1 Initialized (Dual Core Xtensa LX6 @ 240MHz)',
    },
    {
      id: 2,
      time: '00:00.340',
      level: 'SUCCESS',
      tag: 'WIFI',
      message: 'Connected to SSID "MissionX-Lab-IoT" -> IP: 192.168.1.108',
    },
    {
      id: 3,
      time: '00:00.720',
      level: 'SUCCESS',
      tag: 'MQTT',
      message: 'Broker connected: mqtt://localhost:1883 [Active Session]',
    },
    {
      id: 4,
      time: '00:01.050',
      level: 'INFO',
      tag: 'DHT22',
      message: 'Digital 1-Wire bus connected on GPIO 4 (Sample Interval: 3000ms)',
    },
  ]);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Status calculation
  const isAlarm = temperature > 32.0;
  const isWarning = temperature > 28.0 && !isAlarm;
  const status = isAlarm ? 'CRITICAL' : isWarning ? 'WARNING' : 'NORMAL';

  // Push telemetry override to backend API
  const pushTelemetryToBackend = async (tempVal: number, humVal: number) => {
    setIsTransmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      await fetch(`${apiUrl}/api/sensor/override`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          temperature: tempVal,
          humidity: humVal,
        }),
      });

      const now = new Date().toISOString().substring(14, 23);
      const newLog: SerialLog = {
        id: Date.now(),
        time: now,
        level: tempVal > 32 ? 'ERROR' : tempVal > 28 ? 'WARN' : 'SUCCESS',
        tag: 'TX',
        message: `HTTP POST /api/sensor/override -> { temp: ${tempVal.toFixed(1)}°C, hum: ${humVal.toFixed(1)}%, status: "${tempVal > 32 ? 'CRITICAL' : tempVal > 28 ? 'WARNING' : 'NORMAL'}" } [ACK 200 OK]`,
      };

      setSerialLogs((prev) => [...prev.slice(-30), newLog]);
      setPacketCount((c) => c + 1);
    } catch (err) {
      const now = new Date().toISOString().substring(14, 23);
      setSerialLogs((prev) => [
        ...prev.slice(-30),
        {
          id: Date.now(),
          time: now,
          level: 'WARN',
          tag: 'TX-SIM',
          message: `Local Telemetry Emulated -> Temp: ${tempVal.toFixed(1)}°C, Hum: ${humVal.toFixed(1)}%`,
        },
      ]);
    } finally {
      setTimeout(() => setIsTransmitting(false), 400);
    }
  };

  // Sync to backend whenever user modifies temperature/humidity in manual mode
  useEffect(() => {
    if (!isManualOverride) return;
    const timeout = setTimeout(() => {
      pushTelemetryToBackend(temperature, humidity);
    }, 400);
    return () => clearTimeout(timeout);
  }, [temperature, humidity, isManualOverride]);

  // Periodic heartbeat in Auto mode or background logger
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (!isManualOverride) {
        // Subtle drift in auto mode
        setTemperature((prev) => {
          const delta = (Math.random() - 0.48) * 0.4;
          const updated = Math.min(36.0, Math.max(22.0, parseFloat((prev + delta).toFixed(1))));
          return updated;
        });
      } else {
        // Routine sample packet in manual mode
        const now = new Date().toISOString().substring(14, 23);
        const log: SerialLog = {
          id: Date.now(),
          time: now,
          level: isAlarm ? 'ERROR' : isWarning ? 'WARN' : 'INFO',
          tag: 'DHT22',
          message: `Pin GPIO4 Read -> Temp: ${temperature.toFixed(1)}°C, Hum: ${humidity.toFixed(1)}% | Pin GPIO15 Alert: ${temperature > 28 ? 'HIGH' : 'LOW'}`,
        };
        setSerialLogs((prev) => [...prev.slice(-35), log]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, isManualOverride, temperature, humidity, isAlarm, isWarning]);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [serialLogs]);

  // Handle Preset selection
  const handlePreset = (temp: number, hum: number) => {
    setIsManualOverride(true);
    setTemperature(temp);
    setHumidity(hum);
  };

  const handleResetAuto = async () => {
    setIsManualOverride(false);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      await fetch(`${apiUrl}/api/sensor/mode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ manual: false }),
      });
      setSerialLogs((prev) => [
        ...prev,
        {
          id: Date.now(),
          time: new Date().toISOString().substring(14, 23),
          level: 'INFO',
          tag: 'MODE',
          message: 'Switched to Autonomous Hardware Telemetry mode (sensor random drift active)',
        },
      ]);
    } catch (e) {}
  };

  const clearLogs = () => {
    setSerialLogs([]);
  };

  const copyFirmware = () => {
    navigator.clipboard.writeText(CPP_FIRMWARE_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060911] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-6">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>VIRTUAL IOT HARDWARE LAB</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              ESP32 & DHT22 Hardware Simulator
              <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono">
                LIVE EMULATOR
              </span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Interactive physical circuit emulation connecting an ESP32 microcontroller with a digital DHT22 sensor to the MissionX platform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex items-center space-x-3">
            <Link
              href="/sensor"
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-xs font-mono text-slate-300 hover:text-cyan-300 flex items-center space-x-2 transition-all"
            >
              <Thermometer className="w-4 h-4 text-cyan-400" />
              <span>View Live Telemetry</span>
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 hover:border-cyan-400 text-xs font-mono text-cyan-300 flex items-center space-x-2 transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            >
              <span>Mission Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex space-x-2 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('workbench')}
            className={`flex items-center space-x-2 px-5 py-3 text-sm font-semibold transition-all border-b-2 ${
              activeTab === 'workbench'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Interactive Circuit Workbench</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center space-x-2 px-5 py-3 text-sm font-semibold transition-all border-b-2 ${
              activeTab === 'code'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>ESP32 C++ Firmware Sketch</span>
          </button>
          <button
            onClick={() => setActiveTab('wokwi')}
            className={`flex items-center space-x-2 px-5 py-3 text-sm font-semibold transition-all border-b-2 ${
              activeTab === 'wokwi'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            <span>Wokwi Cloud Simulation Guide</span>
          </button>
        </div>

        {/* TAB 1: WORKBENCH */}
        {activeTab === 'workbench' && (
          <div className="space-y-6">
            {/* Top Grid: Interactive Circuit Diagram + Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Virtual Circuit Board Canvas (7 Cols) */}
              <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-cyan-500/30 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                      VIRTUAL HARDWARE BREADBOARD & PINOUT
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs font-mono">
                    <span className="text-slate-400">Power: <span className="text-emerald-400 font-bold">3.3V DC</span></span>
                    <span className="text-slate-400">Bus: <span className="text-cyan-400 font-bold">GPIO 4</span></span>
                  </div>
                </div>

                {/* Circuit SVG / Graphic View */}
                <div className="my-6 p-6 rounded-xl bg-[#090e17] border border-slate-800 relative min-h-[340px] flex items-center justify-around flex-wrap gap-6">
                  {/* ESP32 Microcontroller Card */}
                  <div className="w-56 p-4 rounded-xl bg-slate-900 border-2 border-slate-700 shadow-xl relative text-center">
                    {/* Metal RF Shield */}
                    <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-slate-400 to-slate-600 rounded-lg border border-slate-300 flex flex-col items-center justify-center p-2 shadow-inner">
                      <div className="text-[9px] font-mono font-extrabold text-slate-900 leading-tight">ESP-WROOM-32</div>
                      <div className="text-[7px] font-mono text-slate-800">Wi-Fi + BLE</div>
                      <div className="w-8 h-8 rounded-full bg-slate-700/50 mt-1 flex items-center justify-center">
                        <Cpu className="w-4 h-4 text-cyan-200" />
                      </div>
                    </div>

                    <div className="text-xs font-mono font-bold text-white">ESP32 DevKit V1</div>
                    <div className="text-[10px] font-mono text-cyan-400">Tensilica Xtensa Dual-Core</div>

                    {/* Onboard LEDs */}
                    <div className="flex justify-center items-center gap-4 mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${isTransmitting ? 'bg-cyan-400 shadow-[0_0_8px_#00f0ff]' : 'bg-cyan-900'}`} />
                        <span className="text-slate-400">TX (GPIO2)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                        <span className="text-slate-400">PWR</span>
                      </div>
                    </div>

                    {/* Pinout labels */}
                    <div className="mt-3 grid grid-cols-2 text-[9px] font-mono text-left bg-slate-950 p-2 rounded border border-slate-800">
                      <div>
                        <span className="text-rose-400">● 3V3</span> <br />
                        <span className="text-slate-400">● GND</span> <br />
                        <span className="text-yellow-400 font-bold">● GPIO4 (DATA)</span>
                      </div>
                      <div className="text-right">
                        <span className="text-blue-400">GPIO2 (LED) ●</span> <br />
                        <span className="text-orange-400">GPIO15 (WARN) ●</span> <br />
                        <span className="text-purple-400">GPIO13 (BUZZ) ●</span>
                      </div>
                    </div>
                  </div>

                  {/* Wiring Connector Bridge (Visual jumper indicators) */}
                  <div className="hidden sm:flex flex-col items-center justify-center space-y-2 font-mono text-[10px]">
                    <div className="flex items-center gap-1 text-rose-400">
                      <span className="w-8 h-0.5 bg-rose-500 rounded" />
                      <span>3.3V Power</span>
                      <span className="w-8 h-0.5 bg-rose-500 rounded" />
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <span className="w-8 h-0.5 bg-slate-600 rounded" />
                      <span>GND Return</span>
                      <span className="w-8 h-0.5 bg-slate-600 rounded" />
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400 font-bold">
                      <span className="w-8 h-0.5 bg-yellow-400 rounded" />
                      <span>1-Wire DATA</span>
                      <span className="w-8 h-0.5 bg-yellow-400 rounded" />
                    </div>
                  </div>

                  {/* DHT22 Digital Sensor Card */}
                  <div className="w-52 p-4 rounded-xl bg-slate-900 border-2 border-slate-700 shadow-xl relative text-center">
                    {/* Simulated Sensor Grill */}
                    <div
                      className={`w-28 h-28 mx-auto mb-3 rounded-xl border flex flex-col items-center justify-center p-3 transition-all duration-500 ${
                        isAlarm
                          ? 'bg-rose-950/70 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)]'
                          : isWarning
                          ? 'bg-amber-950/60 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                          : 'bg-slate-800/80 border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                      }`}
                    >
                      {/* Vented Grid Pattern */}
                      <div className="grid grid-cols-4 gap-1 w-full mb-2">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="h-1 bg-slate-700/80 rounded-full" />
                        ))}
                      </div>
                      <Thermometer
                        className={`w-8 h-8 my-1 transition-colors ${
                          isAlarm ? 'text-rose-400 animate-bounce' : isWarning ? 'text-amber-400' : 'text-cyan-400'
                        }`}
                      />
                      <div className="text-[10px] font-mono font-bold text-white tracking-wider">DHT22 / AM2302</div>
                    </div>

                    <div className="text-xs font-mono font-bold text-white">Digital Sensor Module</div>
                    <div className="text-[10px] font-mono text-slate-400">±0.5°C Precision / 0.1% RH</div>

                    {/* Sensor Pins */}
                    <div className="mt-3 flex justify-around text-[9px] font-mono bg-slate-950 p-1.5 rounded border border-slate-800">
                      <span className="text-rose-400 font-bold">1:VCC</span>
                      <span className="text-yellow-400 font-bold">2:SDA</span>
                      <span className="text-slate-500">3:NC</span>
                      <span className="text-slate-400 font-bold">4:GND</span>
                    </div>
                  </div>
                </div>

                {/* Simulated OLED SSD1306 Display Screen */}
                <div className="p-4 rounded-xl bg-black border-2 border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                    <div>
                      <div className="text-xs text-cyan-400 font-bold">I2C OLED SSD1306 0.96&quot; DISPLAY FEED</div>
                      <div className="text-[10px] text-slate-500">Address: 0x3C | Refresh: 1000ms</div>
                    </div>
                  </div>

                  <div className="bg-[#030712] px-4 py-2 rounded-lg border border-cyan-500/40 text-cyan-300 text-xs tracking-wider shadow-inner">
                    <div className="text-[11px] text-cyan-400 font-bold">MISSION-X TELEMETRY v1.0</div>
                    <div className="text-sm font-bold text-white">
                      TEMP: {temperature.toFixed(1)}°C &nbsp;|&nbsp; HUM: {humidity.toFixed(1)}%
                    </div>
                    <div className="text-[10px] flex items-center justify-between text-slate-400">
                      <span>STATUS: {status}</span>
                      <span>PKT: #{packetCount}</span>
                    </div>
                  </div>

                  {/* Actuators: Warning LED & Alarm Buzzer */}
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-3.5 h-3.5 rounded-full transition-all ${
                          temperature > 28
                            ? 'bg-rose-500 shadow-[0_0_12px_#f43f5e] animate-pulse'
                            : 'bg-slate-800'
                        }`}
                      />
                      <span className="text-slate-400 text-[10px]">Alert LED (D15)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Volume2
                        className={`w-4 h-4 transition-all ${
                          isAlarm ? 'text-rose-400 animate-bounce' : 'text-slate-600'
                        }`}
                      />
                      <span className="text-slate-400 text-[10px]">Buzzer (D13)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hardware Control Panel (5 Cols) */}
              <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-cyan-500/30 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center space-x-2 text-cyan-400 font-mono text-sm font-bold">
                      <Sliders className="w-4 h-4" />
                      <span>PHYSICAL ENVIRONMENT DIALS</span>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        isManualOverride
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      }`}
                    >
                      {isManualOverride ? 'MANUAL INJECTION' : 'AUTONOMOUS SENSOR'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-2">
                    Adjust ambient temperature and humidity to simulate changing environmental conditions. Telemetry syncs with the live dashboard instantly.
                  </p>

                  {/* Temperature Slider */}
                  <div className="mt-5 space-y-2">
                    <div className="flex justify-between items-center text-sm font-mono">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Thermometer className="w-4 h-4 text-cyan-400" />
                        Ambient Temperature:
                      </span>
                      <span
                        className={`text-xl font-bold font-mono px-2 py-0.5 rounded ${
                          isAlarm
                            ? 'text-rose-400 bg-rose-500/10'
                            : isWarning
                            ? 'text-amber-400 bg-amber-500/10'
                            : 'text-cyan-400 bg-cyan-500/10'
                        }`}
                      >
                        {temperature.toFixed(1)} °C
                      </span>
                    </div>

                    <input
                      type="range"
                      min="15.0"
                      max="48.0"
                      step="0.5"
                      value={temperature}
                      onChange={(e) => {
                        setIsManualOverride(true);
                        setTemperature(parseFloat(e.target.value));
                      }}
                      className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />

                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>15.0°C (Cold)</span>
                      <span>25.0°C (Optimal)</span>
                      <span>35.0°C (Warm)</span>
                      <span>48.0°C (Extreme)</span>
                    </div>
                  </div>

                  {/* Humidity Slider */}
                  <div className="mt-5 space-y-2">
                    <div className="flex justify-between items-center text-sm font-mono">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Activity className="w-4 h-4 text-blue-400" />
                        Relative Humidity:
                      </span>
                      <span className="text-lg font-bold font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                        {humidity.toFixed(1)} % RH
                      </span>
                    </div>

                    <input
                      type="range"
                      min="10.0"
                      max="95.0"
                      step="1"
                      value={humidity}
                      onChange={(e) => {
                        setIsManualOverride(true);
                        setHumidity(parseFloat(e.target.value));
                      }}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
                    />

                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>10% (Dry)</span>
                      <span>50% (Comfort)</span>
                      <span>95% (Condensing)</span>
                    </div>
                  </div>

                  {/* Quick Stress Test Presets */}
                  <div className="mt-6 space-y-2">
                    <span className="text-xs font-mono text-slate-400 font-semibold block">
                      DEMO SCENARIO PRESETS:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handlePreset(22.4, 52.0)}
                        className="p-2.5 rounded-lg bg-slate-900 hover:bg-emerald-500/10 border border-slate-800 hover:border-emerald-500/40 text-left transition-all group"
                      >
                        <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Normal Room</span>
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">22.4°C • 52% (Safe)</div>
                      </button>

                      <button
                        onClick={() => handlePreset(28.8, 60.0)}
                        className="p-2.5 rounded-lg bg-slate-900 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/40 text-left transition-all group"
                      >
                        <div className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Warm Room</span>
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">28.8°C • Warning</div>
                      </button>

                      <button
                        onClick={() => handlePreset(34.2, 70.0)}
                        className="p-2.5 rounded-lg bg-slate-900 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/40 text-left transition-all group"
                      >
                        <div className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5" />
                          <span>Overheat Alarm</span>
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">34.2°C • Red LED ON</div>
                      </button>

                      <button
                        onClick={() => handlePreset(45.0, 85.0)}
                        className="p-2.5 rounded-lg bg-slate-900 hover:bg-rose-500/20 border border-rose-500/30 text-left transition-all group"
                      >
                        <div className="text-xs font-mono font-bold text-rose-300 flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5" />
                          <span>Critical Meltdown</span>
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">45.0°C • Buzzer BEEP</div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mode Controller & Action Buttons */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => pushTelemetryToBackend(temperature, humidity)}
                      disabled={isTransmitting}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] disabled:opacity-50"
                    >
                      <Radio className={`w-4 h-4 ${isTransmitting ? 'animate-spin' : ''}`} />
                      <span>{isTransmitting ? 'TRANSMITTING...' : 'DISPATCH PACKET'}</span>
                    </button>

                    <button
                      onClick={handleResetAuto}
                      className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs flex items-center justify-center space-x-1.5 transition-all"
                      title="Switch to autonomous sensor fluctuation"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Auto Drift</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Panel: Live 115200 Baud ESP32 Serial Monitor */}
            <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-bold text-white tracking-wider">
                    ESP32 SERIAL MONITOR (115200 BAUD)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    COM3 /dev/ttyUSB0
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-xs">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center space-x-1"
                  >
                    {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-amber-400" />}
                    <span>{isPaused ? 'Resume' : 'Pause'}</span>
                  </button>

                  <button
                    onClick={clearLogs}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200"
                  >
                    Clear Console
                  </button>
                </div>
              </div>

              {/* Console Output Window */}
              <div className="mt-3 p-4 rounded-xl bg-[#03060c] border border-slate-800 h-64 overflow-y-auto space-y-1.5 text-xs font-mono">
                {serialLogs.map((log) => {
                  const levelColor =
                    log.level === 'SUCCESS'
                      ? 'text-emerald-400'
                      : log.level === 'WARN'
                      ? 'text-amber-400'
                      : log.level === 'ERROR'
                      ? 'text-rose-400'
                      : 'text-cyan-400';

                  return (
                    <div key={log.id} className="flex items-start space-x-2 leading-relaxed hover:bg-slate-900/40 p-0.5 rounded">
                      <span className="text-slate-600 select-none">[{log.time}]</span>
                      <span className={`font-bold select-none px-1 rounded bg-slate-900 text-[10px] ${levelColor}`}>
                        {log.tag}
                      </span>
                      <span className={log.level === 'ERROR' ? 'text-rose-200' : 'text-slate-300'}>
                        {log.message}
                      </span>
                    </div>
                  );
                })}
                <div ref={terminalEndRef} />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FIRMWARE CODE */}
        {activeTab === 'code' && (
          <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 font-mono space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  ESP32 Arduino C++ Firmware (esp32_sensor_sim.ino)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Ready-to-compile Arduino sketch for ESP32 with DHT22 sensor, HTTP/MQTT telemetry client, and automated alert pins.
                </p>
              </div>

              <button
                onClick={copyFirmware}
                className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center space-x-2 transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedCode ? 'COPIED TO CLIPBOARD!' : 'COPY SKETCH CODE'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-[#03060c] border border-slate-800 text-xs text-slate-300 overflow-x-auto max-h-[550px] leading-relaxed">
              <code>{CPP_FIRMWARE_CODE}</code>
            </pre>
          </div>
        )}

        {/* TAB 3: WOKWI GUIDE */}
        {activeTab === 'wokwi' && (
          <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-cyan-400" />
                Run On Wokwi (Industry-Standard Online ESP32 Simulator)
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                If your professor or evaluator requests an external circuit simulator, you can run this exact circuit in Wokwi without installing any software or owning any hardware.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold">
                  1
                </div>
                <h4 className="text-sm font-bold text-white">Open Wokwi ESP32</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Go to <a href="https://wokwi.com/projects/new/esp32" target="_blank" rel="noreferrer" className="text-cyan-400 underline">wokwi.com/projects/new/esp32</a> in any browser.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold">
                  2
                </div>
                <h4 className="text-sm font-bold text-white">Paste Circuit Files</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Paste the sketch code into <code className="text-cyan-300">sketch.ino</code> and copy our preconfigured <code className="text-cyan-300">diagram.json</code> from the <code className="text-slate-300">/firmware</code> directory.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold">
                  3
                </div>
                <h4 className="text-sm font-bold text-white">Hit Play & Interact</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Click the green Play button. Click the virtual DHT22 sensor to drag the temperature slider and see the alert LEDs light up in real time!
                </p>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-white">Launch Wokwi ESP32 Workspace</h4>
                <p className="text-xs text-slate-400 mt-1">
                  All configuration files (<code className="text-cyan-300 font-mono">esp32_sensor_sim.ino</code>, <code className="text-cyan-300 font-mono">diagram.json</code>) are generated in <code className="text-slate-300 font-mono">firmware/esp32_sensor_sim/</code>.
                </p>
              </div>
              <a
                href="https://wokwi.com/projects/new/esp32"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center space-x-2 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              >
                <span>OPEN WOKWI IN NEW TAB</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const CPP_FIRMWARE_CODE = `/*
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
 *   - DHT22 VCC    -> 3.3V
 *   - DHT22 GND    -> GND
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <ArduinoJson.h>

const char* WIFI_SSID = "Wokwi-GUEST";
const char* WIFI_PASS = "";
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
  Serial.println("==================================================");

  pinMode(LED_STATUS_PIN, OUTPUT);
  pinMode(LED_ALERT_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);

  dht.begin();
  Serial.println("[DHT22] Sensor bus initialized on GPIO 4");

  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.printf("[WIFI] Connecting to SSID: %s", WIFI_SSID);
  
  while (WiFi.status() != WL_CONNECTED && millis() < 8000) {
    delay(500);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.printf("\\n[WIFI] Connected! IP: %s\\n", WiFi.localIP().toString().c_str());
  } else {
    Serial.println("\\n[WIFI] Offline mode (Simulated telemetry continuing locally)...");
  }
}

void loop() {
  unsigned long currentMillis = millis();

  if (currentMillis - lastTelemetryMillis >= TELEMETRY_INTERVAL_MS) {
    lastTelemetryMillis = currentMillis;

    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    if (isnan(temperature) || isnan(humidity)) {
      Serial.println("⚠️  [DHT22 ERROR] Failed to read from sensor bus!");
      return;
    }

    String status = "NORMAL";
    if (temperature > 32.0) {
      status = "CRITICAL";
      digitalWrite(LED_ALERT_PIN, HIGH);
      tone(BUZZER_PIN, 1000, 200);
    } else if (temperature > 28.0) {
      status = "WARNING";
      digitalWrite(LED_ALERT_PIN, HIGH);
      noTone(BUZZER_PIN);
    } else {
      digitalWrite(LED_ALERT_PIN, LOW);
      noTone(BUZZER_PIN);
    }

    Serial.printf("⏱️ [SAMPLE] Temp: %.1f °C | Humidity: %.1f %% | Status: %s\\n", 
                  temperature, humidity, status.c_str());

    // Dispatch JSON to MissionX Backend
    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.begin(SERVER_URL);
      http.addHeader("Content-Type", "application/json");

      StaticJsonDocument<200> doc;
      doc["sensorId"] = "esp32-dht22-node";
      doc["temperature"] = temperature;
      doc["humidity"] = humidity;
      doc["status"] = status;

      String payload;
      serializeJson(doc, payload);

      int httpCode = http.POST(payload);
      Serial.printf("📡 [TX] POST %s -> Response Code: %d\\n", SERVER_URL, httpCode);
      http.end();
    }
  }
}
`;
