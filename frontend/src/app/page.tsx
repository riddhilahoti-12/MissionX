'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import SensorCard from '@/components/SensorCard';
import { BookOpen, Thermometer, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#060911]">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col justify-center">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>EDUCATIONAL SENSOR & QUIZ PLATFORM</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            Master Core CS with <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Real-Time Sensor Context
            </span>
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            A minimal, robust learning platform combining live environmental sensor telemetry
            with targeted quizzes across Data Structures, DBMS, Operating Systems, and Computer Networks.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center space-x-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all transform hover:-translate-y-0.5"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/subjects"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base flex items-center justify-center space-x-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all hover:border-cyan-500/50"
            >
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>Explore Subjects</span>
            </Link>
          </div>
        </div>

        {/* Live Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto w-full">
          <div>
            <SensorCard compact={false} />
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/20 space-y-5">
            <div className="flex items-center space-x-2 text-cyan-400 text-sm font-mono font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-5 h-5" />
              <span>Core Architecture</span>
            </div>

            <h3 className="text-2xl font-bold text-white">Streamlined for Learning</h3>

            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">One Sensor:</strong> Clean simulated temperature telemetry updating continuously every 3 seconds.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">4 Essential Subjects:</strong> Data Structures, DBMS, Operating Systems, and Computer Networks.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Instant Feedback:</strong> Full explanations on every question with automatic score tracking.
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/login"
                className="text-sm font-mono text-cyan-400 hover:text-cyan-300 inline-flex items-center space-x-1.5"
              >
                <span>Demo Student & Admin Logins Available</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800/80 py-6 text-center text-xs font-mono text-slate-500">
        MissionX &bull; Minimal Educational Platform &bull; KL Deemed University
      </footer>
    </div>
  );
}
