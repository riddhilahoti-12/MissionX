'use client';

import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  initialSeconds: number;
  onExpire?: () => void;
}

export default function TimerCountdown({ initialSeconds, onExpire }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (onExpire) onExpire();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, onExpire]);

  const formatTime = (totalSecs: number) => {
    const minutes = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isUrgent = secondsLeft < 300; // Less than 5 mins

  return (
    <div
      className={`inline-flex items-center space-x-3 px-4 py-2 rounded-xl border font-mono font-bold text-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] ${
        isUrgent
          ? 'bg-red-500/10 border-red-500/50 text-red-400 animate-pulse'
          : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
      }`}
    >
      <Clock className={`w-5 h-5 ${isUrgent ? 'animate-bounce' : ''}`} />
      <span>{formatTime(secondsLeft)}</span>
    </div>
  );
}
