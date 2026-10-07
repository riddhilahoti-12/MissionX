'use client';

import React from 'react';
import Link from 'next/link';
import { Trophy, RotateCcw, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface QuizResultProps {
  score: number;
  total: number;
  subjectName: string;
  onRetry: () => void;
}

export default function QuizResult({
  score,
  total,
  subjectName,
  onRetry,
}: QuizResultProps) {
  const accuracy = Math.round((score / total) * 100);
  const isPassed = accuracy >= 60;

  return (
    <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-500/30 max-w-xl mx-auto text-center shadow-[0_0_50px_rgba(0,240,255,0.15)] relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Trophy Icon */}
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.3)]">
        <Trophy className="w-10 h-10 text-cyan-400" />
      </div>

      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
        {subjectName}
      </span>

      <h1 className="text-3xl font-extrabold text-white mt-4 mb-2 font-mono">
        Quiz Complete!
      </h1>

      <p className="text-slate-400 text-sm mb-8">
        {isPassed
          ? 'Great job! Your progress has been updated in your profile.'
          : 'Keep practicing! Review the explanations and try again to improve your score.'}
      </p>

      {/* Score Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 font-mono mb-1">SCORE</div>
          <div className="text-3xl font-black font-mono text-white">
            {score} <span className="text-slate-500 text-xl font-normal">/ {total}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 font-mono mb-1">ACCURACY</div>
          <div className="text-3xl font-black font-mono text-cyan-400">
            {accuracy}%
          </div>
        </div>
      </div>

      {/* Progress status badge */}
      <div className="flex items-center justify-center space-x-2 text-xs font-mono text-emerald-400 mb-8">
        <CheckCircle2 className="w-4 h-4" />
        <span>Progress Saved to Cloud Profile</span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onRetry}
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all hover:border-cyan-500/50"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retry Quiz</span>
        </button>

        <Link
          href="/subjects"
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Subjects</span>
        </Link>
      </div>
    </div>
  );
}
