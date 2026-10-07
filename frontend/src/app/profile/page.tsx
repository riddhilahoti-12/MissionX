'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProgressBar from '@/components/ProgressBar';
import { User, Shield, GraduationCap, LogOut, BookOpen, Award } from 'lucide-react';
import { SUBJECTS } from '@/data/questions';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: 'Student Agent Alex',
    email: 'alex@missionx.edu',
    role: 'STUDENT',
    institution: 'KL Deemed University',
  });

  const [progressData, setProgressData] = useState<Record<string, number>>({
    'data-structures': 80,
    'dbms': 60,
    'operating-systems': 40,
    'computer-networks': 20,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser((prev) => ({ ...prev, ...parsed }));
        } catch (e) {}
      }
    }

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
      } catch (e) {}
    };

    fetchProgress();
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    router.push('/login');
  };

  const totalPercentage = Math.round(
    Object.values(progressData).reduce((a, b) => a + b, 0) / SUBJECTS.length
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#060911]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        {/* Profile Header */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/20 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_25px_rgba(0,240,255,0.3)]">
              <User className="w-10 h-10 text-slate-950" />
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <h1 className="text-2xl font-extrabold text-white">{user.name}</h1>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {user.role}
                </span>
              </div>
              <p className="text-sm font-mono text-slate-400 mt-1">{user.email}</p>
              <p className="text-xs text-slate-500 mt-1 flex items-center justify-center sm:justify-start space-x-1">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <span>{user.institution}</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-400 border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Learning Mastery Breakdown */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/20 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Subject Mastery</h2>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-slate-400">Overall Completion</span>
              <div className="text-lg font-black font-mono text-cyan-400">{totalPercentage}%</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SUBJECTS.map((sub) => {
              const pct = progressData[sub.slug] ?? 0;
              return (
                <div key={sub.slug} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-white">{sub.name}</span>
                    <span className="font-mono text-cyan-400">{pct}%</span>
                  </div>
                  <ProgressBar value={pct} showPercentage={false} size="sm" />
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => router.push('/subjects')}
              className="px-5 py-2.5 rounded-xl font-bold text-sm flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Practice More Subjects</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
