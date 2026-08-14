'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import {
  User,
  Shield,
  Award,
  Coins,
  Flame,
  Clock,
  Sparkles,
  CheckCircle2,
  FileText,
  ArrowRight,
  Zap,
} from 'lucide-react';

export default function ProfilePage() {
  const [selectedAvatar, setSelectedAvatar] = useState('agent_cyber_blue');

  const AVATARS = [
    { id: 'agent_cyber_blue', name: 'Agent Cyber Blue', icon: '👤' },
    { id: 'neon_valkyrie', name: 'Neon Valkyrie', icon: '🦸‍♀️' },
    { id: 'quantum_sentinel', name: 'Quantum Sentinel', icon: '🤖' },
    { id: 'instructor_pro', name: 'Instructor Pro', icon: '🎓' },
  ];

  const BADGES = [
    { name: 'A* Pathfinding Master', icon: '🤖', date: 'Aug 2026' },
    { name: 'Neural Calibrator', icon: '🧠', date: 'Aug 2026' },
    { name: 'SQL Cipher Cracker', icon: '💾', date: 'Aug 2026' },
    { name: 'IoT Circuit Specialist', icon: '📟', date: 'Aug 2026' },
    { name: 'Speedrunner Elite', icon: '⚡', date: 'Aug 2026' },
  ];

  const HISTORY = [
    { title: 'Rescue Robot Navigation (A* Search)', score: '100% Cleared', time: '18m 42s', xp: '+700 XP' },
    { title: 'Smart City Power Grid (IoT Telemetry)', score: '100% Cleared', time: '21m 15s', xp: '+600 XP' },
    { title: 'Ransomware SQL Vault Decryption', score: '100% Cleared', time: '15m 30s', xp: '+500 XP' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Profile Card Header */}
        <div className="glass-panel p-8 rounded-3xl border-cyan-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-20 h-20 rounded-2xl bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(0,240,255,0.4)]">
              👤
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl sm:text-3xl font-black text-white">Agent Maverick</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  LEVEL 8 CYBER ARCHITECT
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                KL Deemed University • Student ID: 25SC2008E_AGENT_01
              </p>
            </div>
          </div>

          <a
            href="/certificate/agent_maverick"
            className="px-6 py-3 rounded-xl font-bold font-mono text-xs bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center space-x-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all shrink-0"
          >
            <FileText className="w-4 h-4" />
            <span>VIEW OFFICIAL VERIFIED CERTIFICATE</span>
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="glass-panel p-5 rounded-2xl border-cyan-500/20">
            <span className="text-slate-400 uppercase block">Earned XP</span>
            <span className="text-2xl font-black text-cyan-400 mt-1 block">14,250 XP</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-purple-500/20">
            <span className="text-slate-400 uppercase block">Available Coins</span>
            <span className="text-2xl font-black text-purple-400 mt-1 block">1,450 Coins</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-amber-500/20">
            <span className="text-slate-400 uppercase block">Unlocked Badges</span>
            <span className="text-2xl font-black text-amber-400 mt-1 block">5 / 6 Badges</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-emerald-500/20">
            <span className="text-slate-400 uppercase block">Missions Cleared</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">12 Missions</span>
          </div>
        </div>

        {/* Avatars & Badges Showcase (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Avatar Selector (5 Columns) */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-400" />
              Cyber Avatar Selector
            </h2>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              {AVATARS.map((av) => (
                <button
                  key={av.id}
                  onClick={() => setSelectedAvatar(av.id)}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-2 transition-all ${
                    selectedAvatar === av.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-3xl">{av.icon}</span>
                  <span className="font-bold text-[11px] text-center">{av.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Badges Inventory (7 Columns) */}
          <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Unlocked Skill Badges Inventory
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              {BADGES.map((b, idx) => (
                <div key={idx} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-center space-y-1">
                  <span className="text-2xl block">{b.icon}</span>
                  <span className="block font-bold text-slate-200 text-[11px]">{b.name}</span>
                  <span className="text-[9px] text-slate-500 block">{b.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Completion History */}
        <div className="glass-panel p-6 rounded-3xl border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            Recent Mission Execution History
          </h2>

          <div className="space-y-2 font-mono text-xs">
            {HISTORY.map((h, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="font-bold text-slate-200 block text-sm">{h.title}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">{h.score}</span>
                </div>

                <div className="text-right space-y-1">
                  <span className="block text-slate-400">{h.time}</span>
                  <span className="block font-bold text-amber-400">{h.xp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 mt-12 text-center text-xs font-mono text-slate-500">
        MissionX Student Agent Profile & Skill Passport • Verified System ID
      </footer>
    </div>
  );
}
