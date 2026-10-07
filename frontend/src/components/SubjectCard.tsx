'use client';

import React from 'react';
import Link from 'next/link';
import { Network, Database, Cpu, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';
import ProgressBar from './ProgressBar';

interface SubjectCardProps {
  slug: string;
  name: string;
  description: string;
  questionCount?: number;
  progress?: number;
}

export default function SubjectCard({
  slug,
  name,
  description,
  questionCount = 5,
  progress = 0,
}: SubjectCardProps) {
  const getIcon = () => {
    switch (slug) {
      case 'data-structures':
        return <Network className="w-6 h-6 text-cyan-400" />;
      case 'dbms':
        return <Database className="w-6 h-6 text-emerald-400" />;
      case 'operating-systems':
        return <Cpu className="w-6 h-6 text-amber-400" />;
      case 'computer-networks':
        return <Globe className="w-6 h-6 text-purple-400" />;
      default:
        return <Database className="w-6 h-6 text-cyan-400" />;
    }
  };

  const isCompleted = progress === 100;

  return (
    <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 glass-card-hover flex flex-col justify-between relative group">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 shadow-inner">
            {getIcon()}
          </div>
          {isCompleted ? (
            <span className="flex items-center space-x-1 text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mastered</span>
            </span>
          ) : (
            <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/50">
              {questionCount} Questions
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {name}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-2">
          {description}
        </p>
      </div>

      {/* Progress & Action */}
      <div className="pt-4 border-t border-slate-800/80 mt-auto">
        <div className="mb-4">
          <ProgressBar value={progress} label="Progress" size="sm" />
        </div>

        <Link
          href={`/quiz/${slug}`}
          className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>{progress > 0 ? 'Continue Quiz' : 'Start Quiz'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
