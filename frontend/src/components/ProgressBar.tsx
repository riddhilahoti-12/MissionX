'use client';

import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showPercentage?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ProgressBar({
  value,
  label,
  showPercentage = true,
  className = '',
  size = 'md',
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }[size];

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
          {label && <span>{label}</span>}
          {showPercentage && <span className="font-mono text-cyan-400 font-semibold">{clampedValue}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50 ${heightClass}`}>
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(0,240,255,0.4)]"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
