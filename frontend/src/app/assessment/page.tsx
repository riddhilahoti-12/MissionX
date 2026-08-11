'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Download,
  BarChart3,
  BrainCircuit,
  FileText,
  Sparkles,
  Users,
  ShieldCheck,
} from 'lucide-react';

const COURSE_OUTCOMES = [
  { co: 'CO1', title: 'Responsive Design & 3D Interactivity', metric: '94% Mastery', desc: 'Evaluates WebGL 3D Escape Room Canvas interaction and responsive UI ergonomics.' },
  { co: 'CO2', title: 'Async DOM & Real-Time Events', metric: '92% Mastery', desc: 'Evaluates real-time event updates and dynamic DOM state manipulation.' },
  { co: 'CO3', title: 'React State & Recharts Analytics', metric: '96% Mastery', desc: 'Evaluates React state hooks and 15-metric Recharts Skill Radar integration.' },
  { co: 'CO4', title: 'Express REST APIs & Security', metric: '90% Mastery', desc: 'Evaluates Express middleware, Dotenv, Helmet security headers, and CORS policies.' },
  { co: 'CO5', title: 'WebSockets & MQTT Telemetry', metric: '88% Mastery', desc: 'Evaluates ESP32 sensor telemetry auto-validation and Socket.io room synchronization.' },
  { co: 'CO6', title: 'Microservices & Modular Scale', metric: '91% Mastery', desc: 'Evaluates modular escape room architecture and configurable mission templates.' },
];

export default function AssessmentPage() {
  const handleGeneratePdf = () => {
    alert('Generating Official ABET 25SC2008E Institutional Skill Radar Report (PDF)...');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Top Header */}
        <div className="glass-panel p-8 rounded-3xl border-purple-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-xs font-mono text-purple-300">
              <FileText className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>ABET & CO Institutional Assessment Module</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              INSTITUTIONAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400">ASSESSMENT</span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl font-sans">
              Mapped directly to 25SC2008E Full Stack Web Development outcomes (CO1 - CO6). Grade student escape room performances using automated real-time analytics.
            </p>
          </div>

          <button
            onClick={handleGeneratePdf}
            className="px-6 py-3.5 rounded-xl font-bold font-mono text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center space-x-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>EXPORT PDF ASSESSMENT CERTIFICATE</span>
          </button>
        </div>

        {/* CO Outcome Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSE_OUTCOMES.map((co) => (
            <div
              key={co.co}
              className="glass-panel p-6 rounded-3xl border-slate-800 hover:border-purple-500/40 space-y-4 flex flex-col justify-between transition-all"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    {co.co} OUTCOME
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> {co.metric}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">{co.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{co.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 font-mono text-[11px] text-cyan-400 flex justify-between">
                <span>Assessment Status:</span>
                <span className="font-bold">VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 mt-12 text-center text-xs font-mono text-slate-500">
        MissionX Institutional ABET Assessment Suite • CO1 - CO6 Outcome Compliant
      </footer>
    </div>
  );
}
