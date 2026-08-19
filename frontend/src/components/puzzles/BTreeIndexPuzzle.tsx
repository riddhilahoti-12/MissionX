'use client';

import React, { useState } from 'react';
import { Database, GitBranch, CheckCircle2, ArrowRight, Layers, Cpu } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface BTreeIndexPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function BTreeIndexPuzzle({ onSolve, onClose }: BTreeIndexPuzzleProps) {
  const [keys, setKeys] = useState<number[]>([10, 20, 30, 45]);
  const [isBalanced, setIsBalanced] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleRebalanceBTree = () => {
    soundEngine.playClick();
    setIsBalanced(true);
    setFeedbackMsg('✅ B-TREE INDEX REBALANCED: Node key overflow triggered median promotion to parent root! Disk search lookup optimized to O(log_3 N)!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-amber-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-amber-400">
          <Database className="w-5 h-5" />
          <h3 className="font-mono font-bold text-lg text-white">Database B-Tree Index Node Balancing</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Ransomware deleted primary database indices. Insert new record keys into the B-Tree node, trigger child node splits, and maintain B-Tree balance properties.
      </p>

      {/* B-Tree Node Visualization */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs text-center">
        <span className="block text-slate-400 uppercase text-[10px]">B-Tree Root Node (Order B=3):</span>

        <div className="flex justify-center items-center space-x-2">
          {keys.map((k, i) => (
            <span
              key={i}
              className="px-3.5 py-2 rounded-xl bg-slate-900 text-amber-300 border border-slate-800 font-bold"
            >
              Key {k}
            </span>
          ))}
        </div>

        {isBalanced && (
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <span className="block text-[10px] text-slate-400 uppercase">Balanced Tree Structure:</span>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-cyan-300 font-bold space-y-1">
              <div>Root: [20]</div>
              <div className="text-xs text-purple-400">├── Left Child: [10]</div>
              <div className="text-xs text-emerald-400">└── Right Child: [30, 45]</div>
            </div>
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isBalanced ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleRebalanceBTree}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all"
      >
        <span>SPLIT OVERFLOW NODE & REBALANCE B-TREE</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
