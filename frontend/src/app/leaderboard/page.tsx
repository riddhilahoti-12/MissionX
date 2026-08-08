'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import {
  Trophy,
  Award,
  Flame,
  Clock,
  Shield,
  Search,
  Sparkles,
  Users,
  CheckCircle2,
  Crown,
  Zap,
  Star,
  Activity,
} from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  teamName: string;
  institution: string;
  members: string[];
  timeSpent: string;
  xp: number;
  coins: number;
  accuracy: number;
  badge: string;
}

const LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    rank: 1,
    teamName: 'Team Cyber Alchemists',
    institution: 'KL Deemed University',
    members: ['Agent Maverick', 'Agent Alex', 'Agent Riddhi'],
    timeSpent: '18m 42s',
    xp: 24500,
    coins: 1800,
    accuracy: 98,
    badge: '🏆 Grandmaster Champion',
  },
  {
    rank: 2,
    teamName: 'Team Quantum Rovers',
    institution: 'IIT Madras',
    members: ['Commander Rex', 'Dev Ops Maya'],
    timeSpent: '21m 15s',
    xp: 22100,
    coins: 1650,
    accuracy: 95,
    badge: '⚡ Speedrun Elite',
  },
  {
    rank: 3,
    teamName: 'Team Alpha Sentinel',
    institution: 'BITS Pilani',
    members: ['Cryptographer Zero', 'Tech Lead Sam'],
    timeSpent: '23m 04s',
    xp: 19800,
    coins: 1400,
    accuracy: 92,
    badge: '🛡️ Vault Defender',
  },
  {
    rank: 4,
    teamName: 'Team IoT Hackers',
    institution: 'NIT Trichy',
    members: ['ESP32 Wizard', 'MQTT Lead'],
    timeSpent: '25m 40s',
    xp: 17500,
    coins: 1200,
    accuracy: 90,
    badge: '📟 Hardware Pro',
  },
  {
    rank: 5,
    teamName: 'Team A* Pathfinders',
    institution: 'IIIT Hyderabad',
    members: ['Heuristic Pro', 'Grid Navigator'],
    timeSpent: '27m 12s',
    xp: 15900,
    coins: 1050,
    accuracy: 88,
    badge: '🤖 AI Specialist',
  },
];

const BADGES_SHOWCASE = [
  { id: 'astar_master', name: 'A* Pathfinding Master', desc: 'Cleared A* Search hazard grid with zero heuristic mistakes.', icon: '🤖', unlocked: true },
  { id: 'neural_calibrator', name: 'Neural Calibrator', desc: 'Calibrated hidden layer weights on first attempt.', icon: '🧠', unlocked: true },
  { id: 'sql_cracker', name: 'SQL Cipher Cracker', desc: 'Repaired multi-table SQL query in under 60 seconds.', icon: '💾', unlocked: true },
  { id: 'iot_specialist', name: 'IoT Circuit Specialist', desc: 'Verified 5+ physical ESP32 MQTT sensor keys.', icon: '📟', unlocked: true },
  { id: 'speedrunner', name: 'Speedrunner Elite', desc: 'Escaped Quantum Vault in under 20 minutes.', icon: '⚡', unlocked: true },
  { id: 'vlsm_master', name: 'VLSM Network Master', desc: 'Calculated 64-host subnet prefix with zero packet loss.', icon: '🌐', unlocked: true },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'GLOBAL' | 'WEEKLY' | 'INSTITUTIONAL'>('GLOBAL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeams = LEADERBOARD_DATA.filter(
    (t) =>
      t.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.institution.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Top Header Banner */}
        <div className="glass-panel p-8 rounded-3xl border-amber-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-xs font-mono text-amber-300">
              <Trophy className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Global Educational Leaderboards & Badges</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              HALL OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-cyan-400">CHAMPIONS</span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl font-sans">
              Compete against top engineering teams nationwide. Rank by escape time efficiency, XP points, decision accuracy, and unlock rare skill badges.
            </p>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center">
              <span className="block text-2xl font-black text-amber-400">#1</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Current Rank</span>
            </div>
          </div>
        </div>

        {/* Badges Showcase Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Unlockable Player Badges Showcase
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {BADGES_SHOWCASE.map((badge) => (
              <div
                key={badge.id}
                className="glass-panel p-4 rounded-2xl border-slate-800 hover:border-amber-400/40 text-center flex flex-col items-center justify-between space-y-2 transition-all"
              >
                <div className="text-3xl mb-1">{badge.icon}</div>
                <div>
                  <span className="block font-bold text-xs text-white">{badge.name}</span>
                  <span className="text-[10px] text-slate-400 leading-tight block mt-1">{badge.desc}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  UNLOCKED
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard Table & Filters */}
        <div className="glass-panel p-6 rounded-3xl border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Filter Tabs */}
            <div className="flex space-x-2">
              {['GLOBAL', 'WEEKLY', 'INSTITUTIONAL'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    activeTab === tab
                      ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {tab} LEAGUE
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 font-mono outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Team & Roster</th>
                  <th className="py-3 px-4">Institution</th>
                  <th className="py-3 px-4">Escape Time</th>
                  <th className="py-3 px-4">XP Points</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4 text-right">Badge Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {filteredTeams.map((team) => (
                  <tr key={team.rank} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-4 px-4 font-bold text-sm">
                      {team.rank === 1 ? (
                        <span className="flex items-center space-x-1 text-amber-400">
                          <Crown className="w-4 h-4" /> <span>#1</span>
                        </span>
                      ) : team.rank === 2 ? (
                        <span className="text-slate-300">#2</span>
                      ) : team.rank === 3 ? (
                        <span className="text-amber-600">#3</span>
                      ) : (
                        <span className="text-slate-500">#{team.rank}</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-white block text-sm">{team.teamName}</span>
                      <span className="text-[10px] text-slate-500">{team.members.join(', ')}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-400">{team.institution}</td>
                    <td className="py-4 px-4 font-bold text-cyan-400">{team.timeSpent}</td>
                    <td className="py-4 px-4 font-bold text-amber-400">+{team.xp} XP</td>
                    <td className="py-4 px-4 font-bold text-emerald-400">{team.accuracy}%</td>
                    <td className="py-4 px-4 text-right font-bold text-purple-300">{team.badge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 mt-12 text-center text-xs font-mono text-slate-500">
        MissionX Institutional Leaderboard & Badges Vault • Updated Real-Time
      </footer>
    </div>
  );
}
