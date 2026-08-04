'use client';

import React from 'react';
import { Shield, Cpu, Activity, Trophy, Users, Terminal, Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between p-6 md:p-12 max-w-7xl mx-auto">
      {/* Top Navbar */}
      <header className="flex justify-between items-center py-4 border-b border-cyan-500/20 mb-12">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">
              MISSION<span className="text-cyan-400">X</span>
            </span>
            <span className="block text-[10px] tracking-widest uppercase text-cyan-500/80 font-mono">
              AI & IoT Experiential Platform
            </span>
          </div>
        </div>

        <nav className="flex items-center space-x-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-2" />
            System Operational
          </span>
          <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">
            Documentation
          </button>
          <a
            href="/login"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all transform hover:-translate-y-0.5"
          >
            Mission Control Login
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Transforming Education into Live Physical Missions</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Learn Engineering by <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">
              Escaping Real-World Labs
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            MissionX turns abstract CS & engineering concepts (A* Search, Neural Networks, IoT Mappings, SQL Joins) into physical escape room missions managed by live software dashboards and hardware sensors.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="/dashboard"
              className="px-6 py-3.5 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center space-x-2 shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all transform hover:scale-105"
            >
              <span>Enter Game Master Console</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/simulator"
              className="px-6 py-3.5 rounded-xl font-bold glass-panel text-slate-200 hover:text-cyan-400 hover:border-cyan-500/50 flex items-center space-x-2 transition-all"
            >
              <Terminal className="w-5 h-5 text-cyan-400" />
              <span>Launch Virtual IoT Simulator</span>
            </a>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-panel p-5 rounded-2xl glass-card-hover border-cyan-500/20">
            <Shield className="w-8 h-8 text-cyan-400 mb-3" />
            <h3 className="font-bold text-white text-base">Live Mission Control</h3>
            <p className="text-xs text-slate-400 mt-1">
              Real-time room monitoring, countdown sync, automated hint penalties, and emergency locks.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl glass-card-hover border-purple-500/20">
            <Activity className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="font-bold text-white text-base">IoT Hardware Bridge</h3>
            <p className="text-xs text-slate-400 mt-1">
              MQTT telemetry for RFID, PIR sensors, pressure mats, ultrasonic sensors, and solenoid triggers.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl glass-card-hover border-amber-500/20">
            <Trophy className="w-8 h-8 text-amber-400 mb-3" />
            <h3 className="font-bold text-white text-base">Gamification & Badges</h3>
            <p className="text-xs text-slate-400 mt-1">
              Level up XP, earn coins, unlock mystery achievements, and view live institutional leaderboards.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl glass-card-hover border-emerald-500/20">
            <Users className="w-8 h-8 text-emerald-400 mb-3" />
            <h3 className="font-bold text-white text-base">Skill Radar Analytics</h3>
            <p className="text-xs text-slate-400 mt-1">
              Automated PDF generation analyzing Critical Thinking, Decision Making, and Leadership scores.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 pt-6 mt-12 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-mono">
        <p>© 2026 MissionX Platform. Aligned with 25SC2008E Full Stack Engineering.</p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <span>CO1-CO6 Outcomes Mapped</span>
          <span>•</span>
          <span>MQTT / WebSockets Active</span>
        </div>
      </footer>
    </div>
  );
}
