'use client';

import React, { useState } from 'react';
import { Cpu, RotateCcw, CheckCircle2, ArrowRight, Activity, GitBranch } from 'lucide-react';

interface AvlTreePuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function AvlTreePuzzle({ onSolve, onClose }: AvlTreePuzzleProps) {
  // Initial unbalanced state: Root(50) -> Left(30) -> Left(10). LL Imbalance (BF = +2).
  const [rotationState, setRotationState] = useState<'UNBALANCED' | 'BALANCED'>('UNBALANCED');
  const [selectedRotation, setSelectedRotation] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleApplyRotation = (type: 'LL' | 'RR' | 'LR' | 'RL') => {
    setSelectedRotation(type);
    if (type === 'LL') {
      setRotationState('BALANCED');
      setFeedbackMsg('✅ LL ROTATION APPLIED: Tree re-balanced! Root is now Node 30 (Height=2, BF=0). O(log N) search speed restored!');
      if (onSolve) onSolve();
    } else {
      setFeedbackMsg(`❌ INVALID ROTATION: Applying ${type} rotation on Left-Left heavy imbalance does not restore AVL balance factor.`);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-purple-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <GitBranch className="w-5 h-5" />
          <h3 className="font-mono font-bold text-lg text-white">AVL Self-Balancing Tree Rotation Puzzle</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Quantum database index node 50 is heavily Left-Left skewed (Balance Factor = +2). Execute the correct AVL tree rotation to balance search complexity back to O(log N).
      </p>

      {/* Tree Node Visualizer */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-4 font-mono">
        {rotationState === 'UNBALANCED' ? (
          <div className="flex flex-col items-center space-y-3 animate-pulse">
            <div className="w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-400 text-red-300 font-bold flex items-center justify-center">
              50
            </div>
            <span className="text-[10px] text-red-400 font-bold">BF = +2 (CRITICAL)</span>
            <div className="w-0.5 h-6 bg-red-400/50" />
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-300 font-bold flex items-center justify-center">
              30
            </div>
            <div className="w-0.5 h-6 bg-amber-400/50" />
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-300 font-bold flex items-center justify-center">
              10
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 font-bold flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              30
            </div>
            <span className="text-[10px] text-emerald-400 font-bold">ROOT (BF = 0 BALANCED)</span>
            <div className="flex space-x-12">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold flex items-center justify-center">
                10
              </div>
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold flex items-center justify-center">
                50
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rotation Action Buttons */}
      <div className="space-y-2 font-mono text-xs">
        <span className="block uppercase text-slate-400">Select AVL Rotation Operation:</span>
        <div className="grid grid-cols-4 gap-2">
          {[
            { type: 'LL', label: 'LL (Left-Left Single)' },
            { type: 'RR', label: 'RR (Right-Right Single)' },
            { type: 'LR', label: 'LR (Left-Right Double)' },
            { type: 'RL', label: 'RL (Right-Left Double)' },
          ].map((op) => (
            <button
              key={op.type}
              onClick={() => handleApplyRotation(op.type as any)}
              className={`p-3 rounded-xl border font-bold text-center transition-all ${
                selectedRotation === op.type
                  ? 'bg-purple-500/30 border-purple-400 text-purple-200'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {op.type}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            rotationState === 'BALANCED'
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-red-500/20 border-red-500/40 text-red-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}
    </div>
  );
}
