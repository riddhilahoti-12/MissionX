'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatBadgeProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: 'cyan' | 'purple' | 'amber' | 'emerald' | 'red';
}

export default function StatBadge({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'cyan',
}: StatBadgeProps) {
  const colorStyles = {
    cyan: 'border-cyan-500/20 text-cyan-400 bg-cyan-500/10',
    purple: 'border-purple-500/20 text-purple-400 bg-purple-500/10',
    amber: 'border-amber-500/20 text-amber-400 bg-amber-500/10',
    emerald: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/10',
    red: 'border-red-500/20 text-red-400 bg-red-500/10',
  };

  return (
    <div className="glass-panel p-5 rounded-2xl glass-card-hover border flex items-center space-x-4">
      <div className={`p-3 rounded-xl border ${colorStyles[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <span className="block text-xs font-mono uppercase text-slate-400">{title}</span>
        <span className="text-2xl font-extrabold text-white tracking-tight">{value}</span>
        {subtitle && <span className="block text-[11px] text-slate-500 font-mono mt-0.5">{subtitle}</span>}
      </div>
    </div>
  );
}
