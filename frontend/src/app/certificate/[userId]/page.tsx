'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import {
  Award,
  CheckCircle2,
  Printer,
  ShieldCheck,
  QrCode,
  FileText,
  Sparkles,
  Cpu,
} from 'lucide-react';

interface CertificateProps {
  params: {
    userId: string;
  };
}

export default function CertificatePage({ params }: CertificateProps) {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8 space-y-6">
        {/* Action Top Bar */}
        <div className="flex justify-between items-center print:hidden">
          <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs">
            <Award className="w-5 h-5" />
            <span>Official Verified ABET Engineering Certificate</span>
          </div>

          <button
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-xl font-bold font-mono text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center space-x-2 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT / SAVE PDF CERTIFICATE</span>
          </button>
        </div>

        {/* Certificate Frame */}
        <div className="bg-slate-900/90 border-4 border-amber-500/50 p-8 sm:p-12 rounded-3xl space-y-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] relative overflow-hidden text-center">
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

          {/* Certificate Header */}
          <div className="space-y-4">
            <div className="flex justify-center items-center space-x-2 text-cyan-400">
              <Cpu className="w-8 h-8 animate-pulse" />
              <span className="text-2xl font-black tracking-wider">MISSION<span className="text-amber-400">X</span> PLATFORM</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-amber-400 tracking-tight font-serif uppercase">
              CERTIFICATE OF EXCELLENCE
            </h1>
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Full Stack Web Development & 3D Gamified Systems (25SC2008E)
            </p>
          </div>

          <div className="w-24 h-0.5 bg-amber-500/50 mx-auto" />

          {/* Student Recipient Info */}
          <div className="space-y-3 font-sans">
            <p className="text-sm text-slate-400 font-mono">This official certificate is proudly awarded to</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-wide font-mono text-cyan-300">
              AGENT MAVERICK
            </h2>
            <p className="text-xs text-slate-300 max-w-xl mx-auto font-mono leading-relaxed">
              for outstanding technical mastery in 3D Escape Room challenges, A* Algorithm Optimization, IoT ESP32 Telemetry, Relational SQL Join Repair, and AI Hint Engineering.
            </p>
          </div>

          {/* ABET CO Mastery Table */}
          <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 max-w-2xl mx-auto space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-slate-400 uppercase">ABET Course Outcome Matrix</span>
              <span className="text-emerald-400 font-bold">15-SKILL SCORE: 94/100</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-left text-[11px] text-slate-300">
              <div>● CO1: 3D WebGL Interactivity (94%)</div>
              <div>● CO2: Async DOM & Events (92%)</div>
              <div>● CO3: React State & Analytics (96%)</div>
              <div>● CO4: Express REST APIs (90%)</div>
              <div>● CO5: WebSockets & MQTT (88%)</div>
              <div>● CO6: Microservice Scale (91%)</div>
            </div>
          </div>

          {/* Verification & Signature Block */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-6 font-mono text-xs">
            <div className="flex items-center space-x-3 text-left">
              <QrCode className="w-12 h-12 text-slate-400" />
              <div className="text-[10px] text-slate-400 space-y-0.5">
                <span>System Verification Key: <strong className="text-amber-400">0x9F42A7</strong></span>
                <span className="block">Issued: August 2026</span>
                <span className="block text-emerald-400">Status: VERIFIED VALID</span>
              </div>
            </div>

            <div className="text-center sm:text-right space-y-1">
              <div className="font-serif italic text-lg text-amber-300">Prof. MissionX Lead Architect</div>
              <span className="block text-[10px] text-slate-400 uppercase">Department of Computer Science & Engineering</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 mt-12 text-center text-xs font-mono text-slate-500 print:hidden">
        MissionX Verified Certificate Generator • Institutional Security Hash 0x9F42A7
      </footer>
    </div>
  );
}
