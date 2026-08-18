'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import {
  FileText,
  Download,
  CheckCircle2,
  Award,
  BarChart3,
  Building2,
  ShieldCheck,
} from 'lucide-react';

export default function AccreditationAdminPage() {
  const handleExportAbetPortfolio = () => {
    alert('Generating ABET Self-Study Year-End PDF Accreditation Portfolio...');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Top Header */}
        <div className="glass-panel p-8 rounded-3xl border-purple-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-xs font-mono text-purple-300">
              <Award className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>ABET Institutional Accreditation Exporter</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              ABET <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400">ACCREDITATION</span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl font-sans">
              Export year-end ABET Self-Study Accreditation PDF Portfolios containing student cohort achievement histograms, CO outcome evidence matrices, and ABET 1-7 criteria compliance.
            </p>
          </div>

          <button
            onClick={handleExportAbetPortfolio}
            className="px-6 py-3.5 rounded-xl font-bold font-mono text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center space-x-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>EXPORT ABET SELF-STUDY PDF PORTFOLIO</span>
          </button>
        </div>

        {/* Outcome Achievement Bars */}
        <div className="glass-panel p-6 rounded-3xl border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            Cohort Outcome Achievement Matrix (CO1 - CO6)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {[
              { co: 'CO1: 3D WebGL Interactivity', score: 94 },
              { co: 'CO2: Async DOM & Events', score: 92 },
              { co: 'CO3: React State & Analytics', score: 96 },
              { co: 'CO4: Express REST APIs & Security', score: 90 },
              { co: 'CO5: WebSockets & MQTT Telemetry', score: 88 },
              { co: 'CO6: Microservices & Scale', score: 91 },
            ].map((item) => (
              <div key={item.co} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-bold text-sm">{item.co}</span>
                  <span className="text-emerald-400 font-bold">{item.score}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" style={{ width: `${item.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 mt-12 text-center text-xs font-mono text-slate-500">
        MissionX Institutional ABET Accreditation Engine • ABET Criteria 1-7 Compliant
      </footer>
    </div>
  );
}
