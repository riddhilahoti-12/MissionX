'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import SubjectCard from '@/components/SubjectCard';
import { BookOpen } from 'lucide-react';
import { SUBJECTS } from '@/data/questions';

export default function SubjectsPage() {
  const [progressData, setProgressData] = useState<Record<string, number>>({
    'data-structures': 80,
    'dbms': 60,
    'operating-systems': 40,
    'computer-networks': 20,
  });

  useEffect(() => {
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
      } catch (err) {
        // Fallback progress remains
      }
    };

    fetchProgress();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#060911]">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>CORE CURRICULUM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Choose a Subject
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Select any subject below to answer 5 focused multiple-choice questions, receive instant feedback, and track your mastery.
          </p>
        </div>

        {/* 4 Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {SUBJECTS.map((subject) => (
            <SubjectCard
              key={subject.slug}
              slug={subject.slug}
              name={subject.name}
              description={subject.description}
              questionCount={subject.questionCount}
              progress={progressData[subject.slug] ?? 0}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
