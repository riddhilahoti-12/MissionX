'use client';

import React, { useState } from 'react';
import { Cpu, ShieldAlert, CheckCircle2, ArrowRight, Zap, Eye } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface SpeculativeExecutionPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function SpeculativeExecutionPuzzle({ onSolve, onClose }: SpeculativeExecutionPuzzleProps) {
  const [robState, setRobState] = useState<string>('Branch Mispredicted & Speculative Micro-ops In Flight');
  const [isMitigated, setIsMitigated] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleMitigateSpectre = () => {
    soundEngine.playClick();
    setRobState('Speculative Reorder Buffer (ROB) Flushed & L1 Cache Line Isolated');
    setIsMitigated(true);
    setFeedbackMsg('✅ SPECTRE SIDE-CHANNEL MITIGATED: Speculative execution state flushed! Speculation barrier (LFENCE) inserted & L1 cache line timing leak disengaged!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-purple-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <Cpu className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">Speculative Execution & Branch Prediction</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Attackers exploited out-of-order execution branch prediction (Spectre V1/V2). Insert speculation barriers (LFENCE) and clear microarchitectural L1 cache line side-channel leaks.
      </p>

      {/* Speculative ROB Display */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-center">
        <span className="block text-slate-400 uppercase text-[10px]">CPU Microarchitecture State: Tomasulo Reservation Stations & ROB</span>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 block">Reorder Buffer (ROB) Status:</span>
          <span className={`text-xs font-bold block ${isMitigated ? 'text-emerald-400' : 'text-purple-300'}`}>
            {robState}
          </span>
        </div>

        {isMitigated && (
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-cyan-300 font-bold space-y-1">
            <span>Cache Flush-and-Reload Attack Defeated &bull; Solenoid Vault Unlocked!</span>
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isMitigated ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-purple-500/20 border-purple-500/40 text-purple-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleMitigateSpectre}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
      >
        <span>INSERT SPECULATION BARRIER (LFENCE) & FLUSH L1 CACHE</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
