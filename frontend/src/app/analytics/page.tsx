'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';
import {
  Award,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Cpu,
  Download,
  Flame,
  Lightbulb,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';

const SKILL_METRICS = [
  { skill: 'Critical Thinking', score: 88, fullMark: 100 },
  { skill: 'Analytical Reasoning', score: 92, fullMark: 100 },
  { skill: 'Decision Making', score: 85, fullMark: 100 },
  { skill: 'Leadership', score: 80, fullMark: 100 },
  { skill: 'Communication', score: 82, fullMark: 100 },
  { skill: 'Problem Solving', score: 90, fullMark: 100 },
  { skill: 'Technical Reasoning', score: 87, fullMark: 100 },
  { skill: 'Coding Score', score: 84, fullMark: 100 },
  { skill: 'AI Understanding', score: 91, fullMark: 100 },
  { skill: 'DSA Mastery', score: 89, fullMark: 100 },
  { skill: 'IoT Hardware', score: 86, fullMark: 100 },
  { skill: 'Time Management', score: 83, fullMark: 100 },
  { skill: 'Adaptability', score: 88, fullMark: 100 },
  { skill: 'Creativity', score: 85, fullMark: 100 },
  { skill: 'Stress Handling', score: 87, fullMark: 100 },
];

export default function AnalyticsPage() {
  const overallAverage = Math.round(
    SKILL_METRICS.reduce((acc, curr) => acc + curr.score, 0) / SKILL_METRICS.length
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Top Header Banner */}
        <div className="glass-panel p-8 rounded-3xl border-purple-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-xs font-mono text-purple-300">
              <BrainCircuit className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>AI Performance & Skill Radar Suite</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              SKILL RADAR <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400">& ANALYTICS</span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl font-sans">
              Comprehensive 15-domain skill matrix measuring student problem-solving, AI understanding, IoT telemetry handling, leadership under pressure, and decision-making speed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => alert('Downloading official MissionX PDF Skill Radar Report...')}
              className="px-5 py-3 rounded-xl font-bold font-mono text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center space-x-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD PDF REPORT</span>
            </button>
          </div>
        </div>

        {/* Overview Stat Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl border-cyan-500/20">
            <span className="block text-xs font-mono text-slate-400 uppercase">Overall Skill Index</span>
            <span className="text-3xl font-black text-cyan-400 mt-1 block">{overallAverage} / 100</span>
            <span className="text-[10px] font-mono text-emerald-400">Top 5% Institutional Percentile</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-purple-500/20">
            <span className="block text-xs font-mono text-slate-400 uppercase">Missions Cleared</span>
            <span className="text-3xl font-black text-purple-400 mt-1 block">12 / 12</span>
            <span className="text-[10px] font-mono text-purple-300">100% Completion Rate</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-amber-500/20">
            <span className="block text-xs font-mono text-slate-400 uppercase">Earned XP Points</span>
            <span className="text-3xl font-black text-amber-400 mt-1 block">14,250</span>
            <span className="text-[10px] font-mono text-amber-300">Level 8 Cyber Architect</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-emerald-500/20">
            <span className="block text-xs font-mono text-slate-400 uppercase">Decision Speed</span>
            <span className="text-3xl font-black text-emerald-400 mt-1 block">1.4s / step</span>
            <span className="text-[10px] font-mono text-emerald-300">Optimized Pathfinding</span>
          </div>
        </div>

        {/* 15-Metric Recharts Radar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                15-Metric Skill Competency Radar
              </h2>
              <span className="text-xs font-mono text-slate-400">ABET CO Mapped</span>
            </div>

            <div className="w-full h-[420px] bg-slate-950/80 rounded-2xl p-4 border border-slate-800 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={SKILL_METRICS}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="skill" stroke="#94a3b8" tick={{ fontSize: 10, fill: '#cbd5e1' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                  <Radar
                    name="Student Performance"
                    dataKey="score"
                    stroke="#a855f7"
                    fill="#c084fc"
                    fillOpacity={0.45}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#64748b', borderRadius: '12px' }}
                    labelStyle={{ color: '#38bdf8', fontWeight: 'bold' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Feedback & Skill Breakdown Grid (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border-cyan-500/20 space-y-4">
              <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400 animate-pulse" />
                AI Personal Learning Recommendations
              </h2>

              <div className="space-y-3 text-xs font-sans">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-mono font-bold text-cyan-400 block">Strong Domain: AI & Search Algorithms</span>
                  <p className="text-slate-400">
                    Exceptional performance in A* Search path optimization (92% Analytical Reasoning) with low heuristic penalty usage.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-mono font-bold text-amber-400 block">Growth Area: Solenoid Hardware Timing</span>
                  <p className="text-slate-400">
                    Slight delay observed during ESP32 MQTT payload validation. Practice rapid hardware overrides in the IoT Simulator.
                  </p>
                </div>
              </div>
            </div>

            {/* Top Competency Metrics List */}
            <div className="glass-panel p-6 rounded-3xl border-slate-800 space-y-4">
              <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider font-bold">
                Top Competency Breakdown
              </h3>

              <div className="space-y-3 font-mono text-xs">
                {SKILL_METRICS.slice(0, 5).map((item) => (
                  <div key={item.skill} className="space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>{item.skill}</span>
                      <span className="font-bold text-cyan-400">{item.score}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 mt-12 text-center text-xs font-mono text-slate-500">
        MissionX Skill Radar Analytics Engine • 15 ABET Mapped Competencies Active
      </footer>
    </div>
  );
}
