'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import SensorCard from '@/components/SensorCard';
import { Thermometer, History, Shield, Info, Cpu, ArrowRight } from 'lucide-react';

interface ReadingRecord {
  temperature: number;
  value: number;
  status: string;
  timestamp: string;
}

export default function SensorPage() {
  const [history, setHistory] = useState<ReadingRecord[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/sensor/history`);
        if (res.ok) {
          const data = await res.json();
          if (data.readings) {
            setHistory(data.readings.slice(0, 8));
          }
        }
      } catch (err) {
        // Fallback local mock history
      }
    };

    fetchHistory();
    const interval = setInterval(fetchHistory, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#060911]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold mb-3">
            <Thermometer className="w-3.5 h-3.5" />
            <span>PRIMARY TELEMETRY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Live Temperature Sensor
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Continuous real-time telemetry from the laboratory ambient sensor, updated every 3 seconds.
          </p>

          {/* Simulator Callout */}
          <div className="mt-4">
            <Link
              href="/simulator"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>LAUNCH VIRTUAL ESP32 HARDWARE LAB</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Live Sensor Card */}
        <div className="max-w-md mx-auto w-full">
          <SensorCard compact={false} />
        </div>

        {/* Sensor Metadata & Recent Readings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Metadata Card */}
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 space-y-4">
            <div className="flex items-center space-x-2 text-cyan-400 text-sm font-mono font-semibold">
              <Info className="w-4 h-4" />
              <span>SENSOR SPECIFICATIONS</span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Model:</span>
                <span className="font-mono text-white">Virtual TempSensor-X1</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Measurement:</span>
                <span className="font-mono text-white">Ambient Temperature (°C)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Sampling Rate:</span>
                <span className="font-mono text-cyan-400">3000 ms (0.33 Hz)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Optimal Operating Band:</span>
                <span className="font-mono text-emerald-400">20.0 °C – 28.0 °C</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Hardware Fleet:</span>
                <span className="font-mono text-slate-300">Single Sensor Dedicated</span>
              </div>
            </div>
          </div>

          {/* Recent Telemetry Log */}
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 space-y-4">
            <div className="flex items-center space-x-2 text-cyan-400 text-sm font-mono font-semibold">
              <History className="w-4 h-4" />
              <span>RECENT TELEMETRY READINGS</span>
            </div>

            {history.length > 0 ? (
              <div className="space-y-2">
                {history.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs font-mono"
                  >
                    <span className="text-slate-400">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                    <span className="text-white font-bold">
                      {(item.temperature || item.value).toFixed(1)} °C
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        item.status === 'NORMAL'
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-mono py-4 text-center">
                Awaiting telemetry samples from simulated sensor...
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
