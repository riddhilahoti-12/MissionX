'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import {
  Cpu,
  Shield,
  Activity,
  Award,
  BookOpen,
  Search,
  Filter,
  Flame,
  Clock,
  Sparkles,
  ArrowRight,
  Terminal,
  Wifi,
  Database,
  Lock,
  Zap,
  Users,
  Trophy,
} from 'lucide-react';

interface MissionTemplate {
  id: string;
  title: string;
  category: 'AI' | 'DSA' | 'IoT' | 'NETWORKS' | 'DATABASES' | 'SECURITY';
  mode: 'Single Player' | 'Cooperative Team' | 'Team vs Team' | 'Tournament';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Hardcore AAA';
  xp: number;
  coins: number;
  timeLimitMins: number;
  description: string;
  storyBrief: string;
  outcomes: string[];
  environment: string;
}

const MISSIONS_DATA: MissionTemplate[] = [
  {
    id: 'astar_rescue',
    title: 'A* Earthquake Rescue Protocol',
    category: 'AI',
    mode: 'Cooperative Team',
    difficulty: 'Intermediate',
    xp: 1500,
    coins: 450,
    timeLimitMins: 40,
    description: 'Autonomous rescue robot must compute optimal path through collapsed debris using Manhattan heuristic.',
    storyBrief: 'A major earthquake disabled communications. Navigate rescue drones across grid hazards before battery drains.',
    outcomes: ['CO1: A* Search', 'CO2: Heuristics', 'CO3: State Space'],
    environment: 'Disaster Zone Cyber Bunker',
  },
  {
    id: 'neural_firewall',
    title: 'Neural Cyber Threat Classifier',
    category: 'AI',
    mode: 'Single Player',
    difficulty: 'Advanced',
    xp: 2200,
    coins: 700,
    timeLimitMins: 45,
    description: 'Tune deep learning hidden layer weights to isolate DDoS packets attacking city hospital records.',
    storyBrief: 'Ransomware actors are flooding municipal servers. Calibrate neural activation thresholds before lockout.',
    outcomes: ['CO1: Neural Networks', 'CO2: Weight Backprop', 'CO3: AI Security'],
    environment: 'Cyber Security Center',
  },
  {
    id: 'sql_hospital_recovery',
    title: 'Ransomware SQL Vault Decryption',
    category: 'DATABASES',
    mode: 'Single Player',
    difficulty: 'Intermediate',
    xp: 1200,
    coins: 350,
    timeLimitMins: 30,
    description: 'Construct multi-table SQL joins and transaction rollbacks to extract encrypted patient emergency logs.',
    storyBrief: 'Hospital database corrupted by malware. Rebuild relational constraints to unlock ICU access controls.',
    outcomes: ['CO1: SQL Joins', 'CO2: ACID Transactions', 'CO3: Normalization'],
    environment: 'Hospital Core Vault',
  },
  {
    id: 'iot_smart_city',
    title: 'Smart City MQTT Sabotage Repair',
    category: 'IoT',
    mode: 'Cooperative Team',
    difficulty: 'Advanced',
    xp: 1800,
    coins: 550,
    timeLimitMins: 50,
    description: 'Reconfigure ESP32 sensors, PIR motion grids, and solenoid actuators across an automated grid.',
    storyBrief: 'Cyber attackers severed MQTT telemetry. Reconnect sensor broker nodes before power grid collapse.',
    outcomes: ['CO1: ESP32 Firmware', 'CO2: MQTT Telemetry', 'CO3: Actuator Locks'],
    environment: 'Smart City Control Hub',
  },
  {
    id: 'network_packet_routing',
    title: 'Emergency Subnet Routing Restoration',
    category: 'NETWORKS',
    mode: 'Tournament',
    difficulty: 'Hardcore AAA',
    xp: 2500,
    coins: 800,
    timeLimitMins: 60,
    description: 'Calculate VLSM subnets and configure OSPF routing tables under active network jammer interference.',
    storyBrief: 'Black hat hackers jammed main fiber trunks. Re-route emergency packet streams across backup nodes.',
    outcomes: ['CO1: VLSM Subnetting', 'CO2: OSI Layer 3', 'CO3: Routing Protocols'],
    environment: 'Submarine Cable Station',
  },
  {
    id: 'avl_tree_balancer',
    title: 'Quantum Database AVL Balancing',
    category: 'DSA',
    mode: 'Single Player',
    difficulty: 'Intermediate',
    xp: 1400,
    coins: 400,
    timeLimitMins: 35,
    description: 'Perform LL, RR, LR, and RL rotations on memory indices to restore O(log N) search speed.',
    storyBrief: 'Unbalanced tree index caused key exchange latency spike. Balance memory nodes to prevent dropouts.',
    outcomes: ['CO1: Self-Balancing Trees', 'CO2: AVL Rotations', 'CO3: Time Complexity'],
    environment: 'Quantum Server Room',
  },
];

export default function MissionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedMode, setSelectedMode] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredMissions = MISSIONS_DATA.filter((m) => {
    const matchesCategory = selectedCategory === 'ALL' || m.category === selectedCategory;
    const matchesMode = selectedMode === 'ALL' || m.mode === selectedMode;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesMode && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Top Header Banner */}
        <div className="glass-panel p-8 rounded-3xl border-cyan-500/30 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>The Steam of Educational Escape Rooms</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              MISSION <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">HUB & STORE</span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl font-sans">
              Choose curriculum-aligned escape room missions. Solve real-world AI, IoT, DSA, Cyber Security, and Database challenges under live room countdown pressure.
            </p>
          </div>

          <div className="flex items-center space-x-4 z-10 shrink-0">
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-center">
              <span className="block text-2xl font-black text-cyan-400">6+</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Domains</span>
            </div>
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-center">
              <span className="block text-2xl font-black text-purple-400">100%</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Interactive</span>
            </div>
          </div>
        </div>

        {/* Filters & Search Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {['ALL', 'AI', 'DSA', 'IoT', 'NETWORKS', 'DATABASES', 'SECURITY'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Mode Selector */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search missions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 font-mono outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-cyan-400 font-mono outline-none cursor-pointer"
            >
              <option value="ALL">All Modes</option>
              <option value="Single Player">Single Player</option>
              <option value="Cooperative Team">Cooperative Team</option>
              <option value="Tournament">Tournament</option>
            </select>
          </div>
        </div>

        {/* Mission Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMissions.map((mission) => (
            <div
              key={mission.id}
              className="glass-panel p-6 rounded-2xl border-slate-800 hover:border-cyan-500/40 glass-card-hover flex flex-col justify-between space-y-5 transition-all group"
            >
              <div className="space-y-3">
                {/* Card Top Header */}
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    {mission.category}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border ${
                      mission.difficulty === 'Hardcore AAA'
                        ? 'bg-red-500/10 text-red-400 border-red-500/30'
                        : mission.difficulty === 'Advanced'
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    {mission.difficulty}
                  </span>
                </div>

                {/* Mission Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {mission.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed font-sans">{mission.description}</p>

                {/* Environment Badge */}
                <div className="text-[11px] font-mono text-slate-500 flex items-center space-x-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Env: {mission.environment}</span>
                </div>

                {/* ABET CO Outcomes */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {mission.outcomes.map((co, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-900 text-[9px] font-mono text-slate-400 border border-slate-800">
                      {co}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Info & Launch Button */}
              <div className="pt-4 border-t border-slate-800/80 space-y-4">
                <div className="flex justify-between items-center text-xs font-mono">
                  <div className="flex items-center space-x-3 text-slate-300">
                    <span className="flex items-center space-x-1 text-amber-400">
                      <Flame className="w-3.5 h-3.5" />
                      <span>+{mission.xp} XP</span>
                    </span>
                    <span className="flex items-center space-x-1 text-cyan-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{mission.timeLimitMins}m</span>
                    </span>
                  </div>

                  <span className="text-slate-400">{mission.mode}</span>
                </div>

                <a
                  href={`/play/${mission.id}`}
                  className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all transform hover:-translate-y-0.5"
                >
                  <span>LAUNCH MISSION BRIEFING</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 mt-12 text-center text-xs font-mono text-slate-500">
        MissionX Universal Educational Mission Library • CO1-CO6 Mapped
      </footer>
    </div>
  );
}
