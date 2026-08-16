'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import {
  Eye,
  Activity,
  Zap,
  Users,
  Clock,
  Radio,
  Lightbulb,
  Plus,
  Flame,
  Shield,
} from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';

export default function SpectatorPage() {
  const [activeTeams, setActiveTeams] = useState([
    { id: 't1', name: 'Team Alpha (Cyber Alchemists)', stage: 3, time: '22m 15s', frustration: 'NORMAL', hintsUsed: 1 },
    { id: 't2', name: 'Team Beta (Quantum Rovers)', stage: 2, time: '19m 40s', frustration: 'HIGH', hintsUsed: 3 },
    { id: 't3', name: 'Team Gamma (Data Ninjas)', stage: 4, time: '26m 10s', frustration: 'LOW', hintsUsed: 0 },
    { id: 't4', name: 'Team Delta (Binary Strikers)', stage: 1, time: '14m 00s', frustration: 'HIGH', hintsUsed: 4 },
  ]);

  const handleInjectHint = (teamName: string) => {
    soundEngine.playClick();
    alert(`Instructor Hint injected into ${teamName}'s mission player HUD!`);
  };

  const handleGrantTime = (teamName: string) => {
    soundEngine.playClick();
    alert(`Granted +5 Minutes time boost to ${teamName}!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Top Header */}
        <div className="glass-panel p-8 rounded-3xl border-cyan-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300">
              <Eye className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Real-Time Classroom Spectator & Telemetry HUD</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              CLASSROOM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">SPECTATOR</span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl font-sans">
              Monitor active student teams simultaneously, evaluate live frustration telemetry heatmaps, and intervene with instant instructor time boosts or AI hint overrides.
            </p>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-center">
              <span className="block text-2xl font-black text-cyan-400">4 TEAMS</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Active Classroom Session</span>
            </div>
          </div>
        </div>

        {/* Live Multi-Team Classroom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeTeams.map((team) => (
            <div
              key={team.id}
              className={`glass-panel p-6 rounded-3xl border transition-all space-y-4 ${
                team.frustration === 'HIGH' ? 'border-red-500/40' : 'border-slate-800'
              }`}
            >
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">{team.name}</h3>
                  <span className="text-xs font-mono text-slate-400">Stage {team.stage} / 4 • Time Elapsed: {team.time}</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                    team.frustration === 'HIGH'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}
                >
                  FRUSTRATION: {team.frustration}
                </span>
              </div>

              {/* Instructor Action Buttons */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <button
                  onClick={() => handleInjectHint(team.name)}
                  className="p-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-bold flex items-center justify-center space-x-2 transition-all"
                >
                  <Lightbulb className="w-4 h-4 text-cyan-400" />
                  <span>INJECT HINT</span>
                </button>

                <button
                  onClick={() => handleGrantTime(team.name)}
                  className="p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 font-bold flex items-center justify-center space-x-2 transition-all"
                >
                  <Plus className="w-4 h-4 text-purple-400" />
                  <span>GRANT +5 MINS</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 mt-12 text-center text-xs font-mono text-slate-500">
        MissionX Live Educator Spectator Console • Multi-Team WebSockets Sync
      </footer>
    </div>
  );
}
