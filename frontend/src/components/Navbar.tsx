'use client';

import React from 'react';
import { Cpu, Shield, Activity, Terminal, User, BarChart3 } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-cyan-500/20 px-6 py-3.5 mb-8 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">
              MISSION<span className="text-cyan-400">X</span>
            </span>
            <span className="block text-[9px] tracking-widest uppercase text-cyan-500/80 font-mono">
              AAA 3D Educational Engine
            </span>
          </div>
        </a>

        <nav className="flex items-center space-x-6">
          <a href="/dashboard" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-cyan-400" />
            Dashboard
          </a>
          <a href="/missions" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-purple-400" />
            Missions
          </a>
          <a href="/analytics" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-pink-400" />
            Analytics
          </a>
          <a href="/simulator" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-amber-400" />
            IoT Simulator
          </a>
          <div className="w-px h-5 bg-slate-800" />
          <a
            href="/analytics"
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg glass-panel hover:border-cyan-400/50 text-xs font-mono text-cyan-300 transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            <span>Agent Maverick</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
