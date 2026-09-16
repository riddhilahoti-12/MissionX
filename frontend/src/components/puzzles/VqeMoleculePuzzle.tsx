'use client';

import React, { useState } from 'react';
import { Atom, Sparkles, CheckCircle2, ArrowRight, Zap, Activity } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface VqeMoleculePuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function VqeMoleculePuzzle({ onSolve, onClose }: VqeMoleculePuzzleProps) {
  const [energyState, setEnergyState] = useState<number>(-0.85);
  const [isOptimized, setIsOptimized] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleOptimizeVqe = () => {
    soundEngine.playClick();
    setEnergyState(-1.137);
    setIsOptimized(true);
    setFeedbackMsg('✅ VQE MOLECULAR OPTIMIZATION COMPLETE: Minimum ground state energy E_0 = -1.137 Hartree computed! H2 molecular bond geometry verified!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-purple-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <Atom className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">Variational Quantum Eigensolver (VQE)</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Ransomware altered molecular coolant parameters. Execute NISQ Variational Quantum Eigensolver (VQE) ansatz circuits U(&theta;)|&psi;_0&gt; to find minimum ground state energy E_0 = min_&theta; &lt;&psi;(&theta;)|H|&psi;(&theta;)&gt;.
      </p>

      {/* VQE Energy Display */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-center">
        <span className="block text-slate-400 uppercase text-[10px]">Rayleigh-Ritz Variational Principle: E_0 &le; &lt;&psi;(&theta;)|H|&psi;(&theta;)&gt;</span>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 block">Computed Ground State Energy (Hartree):</span>
          <span className={`text-2xl font-black block ${isOptimized ? 'text-emerald-400' : 'text-purple-300'}`}>
            {energyState} Ha {isOptimized ? '(MINIMUM CONVERGED)' : '(SUB-OPTIMAL)'}
          </span>
        </div>

        {isOptimized && (
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-cyan-300 font-bold space-y-1">
            <span>Optimized Ansatz Parameters: &theta;_1 = 0.421, &theta;_2 = 1.085 &bull; Solenoid Unlocked!</span>
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isOptimized ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-purple-500/20 border-purple-500/40 text-purple-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleOptimizeVqe}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
      >
        <span>OPTIMIZE VQE ANSATZ PARAMETERS & CONVERGE ENERGY</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
