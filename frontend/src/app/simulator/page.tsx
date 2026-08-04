'use client';

import React, { useState } from 'react';
import { Cpu, Radio, ShieldCheck, Zap, Lock, Unlock, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function SimulatorPage() {
  const [roomId, setRoomId] = useState('ROOM_101');
  const [sensorType, setSensorType] = useState('RFID');
  const [sensorValue, setSensorValue] = useState('TAG_CARD_ASTAR_7');
  const [logHistory, setLogHistory] = useState<Array<{ id: number; text: string; time: string; type: string }>>([
    { id: 1, text: 'Simulator Engine initialized on MQTT topic missionx/room/ROOM_101/sensor', time: new Date().toLocaleTimeString(), type: 'info' },
  ]);

  const [solenoidLocked, setSolenoidLocked] = useState(true);

  const handlePublishTelemetry = () => {
    const newLog = {
      id: Date.now(),
      text: `Published Sensor [${sensorType}] -> Value: "${sensorValue}" for Room [${roomId}]`,
      time: new Date().toLocaleTimeString(),
      type: 'success',
    };
    setLogHistory((prev) => [newLog, ...prev]);

    // Simulate lock trigger if correct RFID tag used
    if (sensorValue.includes('ASTAR_7') || sensorValue.includes('UNLOCK')) {
      setSolenoidLocked(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex justify-between items-center pb-6 border-b border-cyan-500/20 mb-8">
          <div className="flex items-center space-x-4">
            <a
              href="/"
              className="p-2 rounded-lg glass-panel hover:border-cyan-400 text-slate-300 hover:text-white transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
                Virtual IoT Hardware Simulator
              </h1>
              <p className="text-xs text-slate-400 font-mono">
                Simulate ESP32/Arduino sensor triggers & solenoid actuator controls in real time.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-ping" />
              MQTT Broker Connected
            </span>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border-cyan-500/20">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Sensor Signal Injector
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Target Room ID</label>
                  <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="w-full bg-slate-900/80 border border-slate-700 focus:border-cyan-400 rounded-lg px-4 py-2.5 text-slate-200 font-mono text-sm outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Sensor Hardware Type</label>
                    <select
                      value={sensorType}
                      onChange={(e) => setSensorType(e.target.value)}
                      className="w-full bg-slate-900/80 border border-slate-700 focus:border-cyan-400 rounded-lg px-4 py-2.5 text-slate-200 font-mono text-sm outline-none transition-colors"
                    >
                      <option value="RFID">RFID Reader (RC522)</option>
                      <option value="PIR">PIR Motion Detector</option>
                      <option value="ULTRASONIC">Ultrasonic Sensor (HC-SR04)</option>
                      <option value="PRESSURE_MAT">Pressure Sensor Mat</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Injected Sensor Value</label>
                    <input
                      type="text"
                      value={sensorValue}
                      onChange={(e) => setSensorValue(e.target.value)}
                      className="w-full bg-slate-900/80 border border-slate-700 focus:border-cyan-400 rounded-lg px-4 py-2.5 text-slate-200 font-mono text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  onClick={handlePublishTelemetry}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 font-bold text-slate-950 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all transform hover:-translate-y-0.5"
                >
                  Transmit Telemetry Packet via MQTT
                </button>
              </div>
            </div>

            {/* Actuator Status Simulator */}
            <div className="glass-panel p-6 rounded-2xl border-purple-500/20">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
                Physical Actuator State Monitor
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border flex items-center space-x-4 ${solenoidLocked ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                  {solenoidLocked ? <Lock className="w-8 h-8" /> : <Unlock className="w-8 h-8" />}
                  <div>
                    <span className="block text-xs font-mono uppercase opacity-80">Solenoid Door Lock</span>
                    <span className="font-bold text-sm">{solenoidLocked ? 'LOCKED (Door Sealed)' : 'UNLOCKED (Door Open)'}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border bg-amber-500/10 border-amber-500/30 text-amber-400 flex items-center space-x-4">
                  <AlertTriangle className="w-8 h-8" />
                  <div>
                    <span className="block text-xs font-mono uppercase opacity-80">Laser Security Grid</span>
                    <span className="font-bold text-sm">ACTIVE (0 Tripped)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Telemetry Log Terminal */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border-slate-700/50 flex flex-col h-[480px]">
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 mb-3 flex items-center justify-between">
              <span>Live Console Stream</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </h2>

            <div className="flex-1 bg-slate-950/90 rounded-xl p-4 font-mono text-xs overflow-y-auto space-y-2 border border-slate-800">
              {logHistory.map((log) => (
                <div key={log.id} className="flex space-x-2 text-slate-300">
                  <span className="text-slate-500">[{log.time}]</span>
                  <span className={log.type === 'success' ? 'text-emerald-400' : 'text-cyan-400'}>{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-6 mt-8 border-t border-slate-800/80 text-xs text-slate-500 font-mono text-center">
        MissionX Virtual Hardware Simulator Layer • MQTT & WebSockets Bridge Active
      </footer>
    </div>
  );
}
