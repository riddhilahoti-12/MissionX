'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import {
  Activity,
  Server,
  Zap,
  Radio,
  Database,
  CheckCircle2,
  Cpu,
  RefreshCw,
} from 'lucide-react';

export default function SystemHealthAdminPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Top Header */}
        <div className="glass-panel p-8 rounded-3xl border-cyan-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300">
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Real-Time Microservice Diagnostic Telemetry</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">HEALTH</span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl font-sans">
              Monitor WebSockets room latency (&lt;15ms), MQTT broker message throughput, MongoDB connection pool utilization, and Redis cache hit ratios.
            </p>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <span className="block text-2xl font-black text-emerald-400">100% HEALTH</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">All Microservices Operational</span>
            </div>
          </div>
        </div>

        {/* Telemetry Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
          <div className="glass-panel p-6 rounded-3xl border-cyan-500/30 space-y-2">
            <span className="text-slate-400 uppercase block">WebSockets Latency</span>
            <span className="text-3xl font-black text-cyan-400 block">12 ms</span>
            <span className="text-emerald-400 font-bold block text-[11px]">● OPTIMAL SPEED</span>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-purple-500/30 space-y-2">
            <span className="text-slate-400 uppercase block">MQTT Telemetry</span>
            <span className="text-3xl font-black text-purple-400 block">1,420 / sec</span>
            <span className="text-emerald-400 font-bold block text-[11px]">● BROKER CONNECTED</span>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-amber-500/30 space-y-2">
            <span className="text-slate-400 uppercase block">MongoDB Pool</span>
            <span className="text-3xl font-black text-amber-400 block">18 / 50</span>
            <span className="text-emerald-400 font-bold block text-[11px]">● HEALTHY POOL</span>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-emerald-500/30 space-y-2">
            <span className="text-slate-400 uppercase block">Redis Cache Hit Rate</span>
            <span className="text-3xl font-black text-emerald-400 block">98.4%</span>
            <span className="text-emerald-400 font-bold block text-[11px]">● HIGH CACHE EFFICIENCY</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 mt-12 text-center text-xs font-mono text-slate-500">
        MissionX Real-Time System Diagnostic Monitor • Socket.io & MQTT Heartbeat Active
      </footer>
    </div>
  );
}
