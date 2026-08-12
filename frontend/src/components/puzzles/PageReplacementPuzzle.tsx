'use client';

import React, { useState } from 'react';
import { Cpu, RefreshCw, CheckCircle2, ArrowRight, HardDrive, Zap } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';

interface PageReplacementPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function PageReplacementPuzzle({ onSolve, onClose }: PageReplacementPuzzleProps) {
  const [algorithm, setAlgorithm] = useState<'LRU' | 'FIFO' | 'OPTIMAL'>('FIFO');
  const [pageFaults, setPageFaults] = useState<number>(10);
  const [isSolved, setIsSolved] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleExecuteAlgorithm = (selectedAlgo: 'LRU' | 'FIFO' | 'OPTIMAL') => {
    soundEngine.playClick();
    setAlgorithm(selectedAlgo);

    if (selectedAlgo === 'LRU' || selectedAlgo === 'OPTIMAL') {
      setPageFaults(7);
      setIsSolved(true);
      setFeedbackMsg(`✅ ALGORITHM OPTIMIZED: ${selectedAlgo} Page Replacement reduced page faults to 7! Memory thrashing resolved.`);
      soundEngine.playUnlockChime();
      if (onSolve) onSolve();
    } else {
      setPageFaults(10);
      setFeedbackMsg('❌ HIGH THRASHING: FIFO algorithm produced 10 page faults (Belady Anomaly). Select LRU to optimize memory.');
      soundEngine.playAlarmSiren();
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-indigo-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-indigo-400">
          <HardDrive className="w-5 h-5" />
          <h3 className="font-mono font-bold text-lg text-white">OS Virtual Memory Page Replacement Visualizer</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Ransomware thrashing is causing virtual memory page faults. Select the optimal Page Replacement algorithm to clear frame slots (3 Physical Frames).
      </p>

      {/* Page Reference Stream Display */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
        <span className="block text-slate-400 uppercase text-[10px]">Virtual Page Request Stream:</span>
        <div className="flex flex-wrap gap-1.5">
          {[1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5].map((pg, i) => (
            <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 text-indigo-300 border border-slate-800 font-bold">
              P{pg}
            </span>
          ))}
        </div>

        {/* Frame Table Preview */}
        <div className="pt-2 flex justify-between items-center text-xs">
          <span className="text-slate-400">Active Page Fault Count:</span>
          <span className={`font-bold font-mono text-base ${isSolved ? 'text-emerald-400' : 'text-red-400 animate-pulse'}`}>
            {pageFaults} FAULTS
          </span>
        </div>
      </div>

      {/* Algorithm Choices */}
      <div className="space-y-2 font-mono text-xs">
        <span className="block uppercase text-slate-400">Select Page Replacement Policy:</span>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'FIFO', label: 'FIFO (First In First Out)' },
            { id: 'LRU', label: 'LRU (Least Recently Used)' },
            { id: 'OPTIMAL', label: 'Optimal Policy' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleExecuteAlgorithm(item.id as any)}
              className={`p-3 rounded-xl border text-left transition-all ${
                algorithm === item.id
                  ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200 shadow-[0_0_10px_rgba(99,102,241,0.3)]'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="block font-bold text-slate-200">{item.id}</span>
              <span className="text-[10px] text-slate-400">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isSolved ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-red-500/20 border-red-500/40 text-red-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}
    </div>
  );
}
