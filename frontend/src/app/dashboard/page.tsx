'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import SensorCard from '@/components/SensorCard';
import ProgressBar from '@/components/ProgressBar';
import { ArrowRight, BookOpen, GraduationCap, Sparkles, Cpu } from 'lucide-react';
import { SUBJECTS } from '@/data/questions';

export default function DashboardPage() {
  const [userName, setUserName] = useState('Student Agent');
  const [progressData, setProgressData] = useState<Record<string, number>>({
    'data-structures': 80,
    'dbms': 60,
    'operating-systems': 40,
    'computer-networks': 20,
  });

  useEffect(() => {
    // 1. Load user from storage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          const u = JSON.parse(stored);
          if (u.name) setUserName(u.name);
        } catch (e) {}
      }
    }

    // 2. Fetch progress from backend
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/progress`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (res.ok) {
          const data = await res.json();
          if (data.progress) {
            const mapped: Record<string, number> = {};
            Object.keys(data.progress).forEach((key) => {
              mapped[key] = data.progress[key].percentage ?? 0;
            });
            setProgressData((prev) => ({ ...prev, ...mapped }));
          }
        }
      } catch (e) {
        // Keep initial state if offline
      }
    };

    fetchProgress();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#060911]">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OVERVIEW DASHBOARD</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-cyan-400">{userName}</span>!
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Review your environmental sensor and track your core subject learning progress.
            </p>
          </div>

          <Link
            href="/subjects"
            className="self-start sm:self-auto px-5 py-2.5 rounded-xl font-bold text-sm flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all transform hover:-translate-y-0.5"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Core Layout: Sensor Card + Learning Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Single Sensor Card */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-400">
                Live Sensor Telemetry
              </h2>
              <Link href="/sensor" className="text-xs font-mono text-cyan-400 hover:text-cyan-300">
                View Full Sensor &rarr;
              </Link>
            </div>
            <SensorCard compact />

            {/* Hardware Simulator Banner */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 flex items-center justify-between shadow-[0_0_15px_rgba(0,240,255,0.08)]">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Cpu className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white">Virtual Hardware Lab</h4>
                  <p className="text-[11px] text-slate-400">ESP32 & DHT22 online breadboard</p>
                </div>
              </div>
              <Link
                href="/simulator"
                className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/40 transition-all"
              >
                Launch &rarr;
              </Link>
            </div>
          </div>

          {/* Your Learning Progress Panel */}
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-bold text-white">Your Learning</h2>
              </div>
              <span className="text-xs font-mono text-slate-400">4 Subjects</span>
            </div>

            <div className="space-y-4">
              {SUBJECTS.map((subject) => {
                const currentPct = progressData[subject.slug] ?? 0;
                return (
                  <div key={subject.slug} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm font-medium">
                      <Link
                        href={`/quiz/${subject.slug}`}
                        className="text-slate-200 hover:text-cyan-400 transition-colors flex items-center space-x-1.5"
                      >
                        <span>{subject.name}</span>
                      </Link>
                      <span className="font-mono text-xs font-semibold text-cyan-400">
                        {currentPct}%
                      </span>
                    </div>
                    <ProgressBar value={currentPct} showPercentage={false} size="sm" />
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-800">
              <Link
                href="/subjects"
                className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 hover:text-cyan-300 text-slate-300 border border-slate-700 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Select a Subject to Practice</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
