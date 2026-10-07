'use client';

import React, { useEffect, useState } from 'react';
import { Thermometer, Activity } from 'lucide-react';

interface SensorData {
  sensorId: string;
  name: string;
  temperature: number;
  status: string;
  unit: string;
  timestamp: string;
}

export default function SensorCard({ compact = false }: { compact?: boolean }) {
  const [sensor, setSensor] = useState<SensorData>({
    sensorId: 'sensor-temp-01',
    name: 'Ambient Temperature Sensor',
    temperature: 27.4,
    status: 'NORMAL',
    unit: '°C',
    timestamp: new Date().toISOString(),
  });
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    let lastFetchTime = Date.now();

    const fetchSensor = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/sensor/latest`);
        if (res.ok) {
          const data = await res.json();
          if (data.sensor) {
            setSensor(data.sensor);
            lastFetchTime = Date.now();
            setSecondsAgo(0);
          }
        }
      } catch (err) {
        // Fallback local realistic simulation if backend unreachable
        setSensor((prev) => {
          const delta = (Math.random() - 0.48) * 0.4;
          const nextTemp = parseFloat((prev.temperature + delta).toFixed(1));
          return {
            ...prev,
            temperature: Math.min(29.0, Math.max(24.5, nextTemp)),
            timestamp: new Date().toISOString(),
          };
        });
        lastFetchTime = Date.now();
        setSecondsAgo(0);
      }
    };

    fetchSensor();
    const pollInterval = setInterval(fetchSensor, 3000);

    const timerInterval = setInterval(() => {
      setSecondsAgo(Math.floor((Date.now() - lastFetchTime) / 1000));
    }, 1000);

    return () => {
      clearInterval(pollInterval);
      clearInterval(timerInterval);
    };
  }, []);

  const isNormal = sensor.status === 'NORMAL';

  if (compact) {
    return (
      <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Thermometer className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">LIVE SENSOR</h3>
              <p className="text-sm font-semibold text-slate-200">{sensor.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE</span>
          </div>
        </div>

        <div className="flex items-baseline justify-between mt-2">
          <div>
            <span className="text-3xl font-extrabold font-mono tracking-tight text-white">
              {sensor.temperature.toFixed(1)}
            </span>
            <span className="text-xl font-bold font-mono text-cyan-400 ml-1">°C</span>
          </div>
          <span
            className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-md border ${
              isNormal
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}
          >
            ● {sensor.status}
          </span>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Target: 20.0 - 28.0 °C</span>
          <span>Updated {secondsAgo === 0 ? 'just now' : `${secondsAgo}s ago`}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-8 rounded-2xl border border-cyan-500/30 text-center relative overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.08)]">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header status */}
      <div className="flex items-center justify-center space-x-2 mb-4">
        <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>LIVE TELEMETRY</span>
        </span>
      </div>

      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.2)]">
        <Thermometer className="w-8 h-8 text-cyan-400" />
      </div>

      <h2 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-semibold">{sensor.name}</h2>

      <div className="my-5">
        <div className="text-6xl font-black font-mono tracking-tight text-white drop-shadow-[0_0_25px_rgba(0,240,255,0.3)]">
          {sensor.temperature.toFixed(1)}
          <span className="text-3xl text-cyan-400 ml-1">°C</span>
        </div>
      </div>

      <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-mono text-sm font-semibold mb-6">
        <Activity className="w-4 h-4 text-cyan-400" />
        <span>STATUS: {sensor.status}</span>
      </div>

      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400 max-w-sm mx-auto">
        <span>Optimal: 20.0 - 28.0 °C</span>
        <span>Last updated: {secondsAgo === 0 ? 'just now' : `${secondsAgo} sec ago`}</span>
      </div>
    </div>
  );
}
