'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import {
  Swords,
  Trophy,
  Zap,
  Flame,
  Clock,
  ShieldAlert,
  Users,
  CheckCircle2,
  Play,
  Skull,
  Radio,
  ArrowRight,
} from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';

export default function TournamentPage() {
  const [teamAlphaProgress, setTeamAlphaProgress] = useState(75);
  const [teamBetaProgress, setTeamBetaProgress] = useState(60);
  const [sabotagePoints, setSabotagePoints] = useState(250);
  const [sabotageLog, setSabotageLog] = useState<string[]>([
    'Match started: Team Alpha vs Team Beta in Mirrored Quantum Vaults.',
  ]);

  const handleDispatchSabotage = (trapName: string, cost: number) => {
    soundEngine.playClick();
    if (sabotagePoints >= cost) {
      setSabotagePoints((prev) => prev - cost);
      setTeamBetaProgress((prev) => Math.max(0, prev - 10));
      setSabotageLog((prev) => [
        `💥 SABOTAGE TRIGGERED: Dispatched "${trapName}" against Team Beta (-10% progress)!`,
        ...prev,
      ]);
      soundEngine.playAlarmSiren();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Top Header */}
        <div className="glass-panel p-8 rounded-3xl border-red-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-xs font-mono text-red-300">
              <Swords className="w-4 h-4 text-red-400 animate-pulse" />
              <span>Head-to-Head PvP & Tournament Arena</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              TOURNAMENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-cyan-400">PVP ARENA</span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl font-sans">
              Race against rival engineering teams in mirrored 3D escape rooms. Dispatch tactical sabotage traps, monitor live delta clocks, and claim the championship trophy.
            </p>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-center">
              <span className="block text-2xl font-black text-red-400">LIVE MATCH</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Mirrored Vaults</span>
            </div>
          </div>
        </div>

        {/* Live Head-to-Head Team Progress Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Team Alpha (Your Team) */}
          <div className="glass-panel p-6 rounded-3xl border-cyan-500/40 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold block">YOUR TEAM</span>
                <h2 className="text-xl font-bold text-white">Team Alpha (Cyber Alchemists)</h2>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400">
                75% COMPLETED
              </span>
            </div>

            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-cyan-400 rounded-full transition-all" style={{ width: `${teamAlphaProgress}%` }} />
            </div>

            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Current Stage: 3 / 4</span>
              <span className="text-emerald-400 font-bold">+02:15 AHEAD</span>
            </div>
          </div>

          {/* Team Beta (Rival Team) */}
          <div className="glass-panel p-6 rounded-3xl border-red-500/40 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-mono text-red-400 font-bold block">RIVAL CHALLENGER</span>
                <h2 className="text-xl font-bold text-white">Team Beta (Quantum Rovers)</h2>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-500/20 text-red-300 border border-red-400">
                {teamBetaProgress}% COMPLETED
              </span>
            </div>

            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-red-400 rounded-full transition-all" style={{ width: `${teamBetaProgress}%` }} />
            </div>

            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Current Stage: 2 / 4</span>
              <span className="text-red-400 font-bold">TRAILING</span>
            </div>
          </div>
        </div>

        {/* Sabotage Traps Dispatch Console & Match Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sabotage Controls (7 Columns) */}
          <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <Skull className="w-5 h-5 text-red-400" />
                Tactical Sabotage Traps Console
              </h3>
              <span className="text-xs font-mono text-amber-400 font-bold">
                Sabotage Energy: {sabotagePoints} PTS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              {[
                { name: 'Screen Glitch Trap', cost: 100, desc: 'Distort opponent 3D view for 10s' },
                { name: 'Laser Lock Trap', cost: 150, desc: 'Lock opponent solenoid door for 15s' },
                { name: 'Telemetry Jammer', cost: 200, desc: 'Mute opponent hint feeds for 20s' },
              ].map((trap) => (
                <button
                  key={trap.name}
                  disabled={sabotagePoints < trap.cost}
                  onClick={() => handleDispatchSabotage(trap.name, trap.cost)}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all ${
                    sabotagePoints >= trap.cost
                      ? 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-300'
                      : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <div>
                    <span className="block font-bold text-slate-200">{trap.name}</span>
                    <span className="text-[10px] text-slate-400 leading-tight block mt-1">{trap.desc}</span>
                  </div>
                  <span className="text-[11px] text-amber-400 font-bold">{trap.cost} PTS</span>
                </button>
              ))}
            </div>
          </div>

          {/* Match Feed Stream (5 Columns) */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border-slate-800 space-y-3 h-[240px] flex flex-col justify-between">
            <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider font-bold flex items-center justify-between">
              <span>Live Tournament Telemetry</span>
              <Radio className="w-4 h-4 text-red-400 animate-ping" />
            </h3>

            <div className="flex-1 bg-slate-950 rounded-2xl p-3 font-mono text-[11px] overflow-y-auto space-y-1.5 border border-slate-800">
              {sabotageLog.map((log, idx) => (
                <div key={idx} className="text-slate-300 border-b border-slate-900 pb-1">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 mt-12 text-center text-xs font-mono text-slate-500">
        MissionX Head-to-Head PvP & Tournament Arena • Real-Time Socket.io Sync
      </footer>
    </div>
  );
}
