'use client';

import React, { useState } from 'react';
import { Cpu, Scissors, CheckCircle2, ArrowRight, ShieldCheck, GitBranch } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';

interface MinimaxPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function MinimaxPuzzle({ onSolve, onClose }: MinimaxPuzzleProps) {
  const [prunedBranches, setPrunedBranches] = useState<boolean>(false);
  const [isSolved, setIsSolved] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleApplyPruning = () => {
    soundEngine.playClick();
    setPrunedBranches(true);
    setIsSolved(true);
    setFeedbackMsg('✅ ALPHA-BETA PRUNING APPLIED: Alpha >= Beta condition met! Non-optimal branch pruned, defeating adversary AI bot in 3 turns!');
    soundEngine.playUnlockChime();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-purple-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <Scissors className="w-5 h-5" />
          <h3 className="font-mono font-bold text-lg text-white">Minimax & Alpha-Beta Pruning Visualizer</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Adversary AI bot is evaluating the game tree. Apply Alpha-Beta Pruning (α ≥ β) to cut unneeded search branches and disengage the adversary bot.
      </p>

      {/* Game Tree Diagram */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-4 font-mono text-xs">
        <div className="w-12 h-12 rounded-xl bg-purple-500/20 border-2 border-purple-400 text-purple-300 font-bold flex items-center justify-center">
          MAX: 3
        </div>
        <div className="flex space-x-16">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-[10px] text-slate-500">MIN (Subtree A)</span>
            <div className="flex space-x-2">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-bold">3</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-bold">5</span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <span className="text-[10px] text-slate-500">MIN (Subtree B)</span>
            <div className="flex space-x-2">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-bold">2</span>
              {prunedBranches ? (
                <span className="px-2.5 py-1 rounded bg-red-950/80 border border-red-500/40 text-red-400 line-through font-bold">
                  PRUNED
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 font-bold">9</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isSolved ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-purple-500/20 border-purple-500/40 text-purple-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleApplyPruning}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
      >
        <span>EXECUTE ALPHA-BETA PRUNING CUT</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
