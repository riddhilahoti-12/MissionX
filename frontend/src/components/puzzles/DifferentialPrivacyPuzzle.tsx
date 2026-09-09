'use client';

import React, { useState } from 'react';
import { Shield, EyeOff, CheckCircle2, ArrowRight, Zap, Database } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface DifferentialPrivacyPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function DifferentialPrivacyPuzzle({ onSolve, onClose }: DifferentialPrivacyPuzzleProps) {
  const [epsilon, setEpsilon] = useState<number>(0.5);
  const [isProtected, setIsProtected] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleInjectNoise = () => {
    soundEngine.playClick();
    setIsProtected(true);
    setFeedbackMsg('✅ DIFFERENTIAL PRIVACY GUARANTEED: Injected Lap(Δf / ε) noise with ε = 0.5! Re-identification attack defeated under (ε, δ)-differential privacy!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-purple-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <EyeOff className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">Differential Privacy (&epsilon;, &delta;) Laplace Noise</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Attackers are executing differential reconstruction attacks against patient database queries. Calibrate Laplace noise scale Lap(&Delta;f / &epsilon;) to protect individual records.
      </p>

      {/* Privacy Noise Slider */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs text-center">
        <span className="block text-slate-400 uppercase text-[10px]">Laplace Noise Distribution: Lap(b = &Delta;f / &epsilon;)</span>

        <div className="space-y-2 text-left">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-400">Privacy Budget (&epsilon;):</span>
            <span className="text-cyan-400">{epsilon} {epsilon <= 0.5 ? '(STRONG PRIVACY)' : '(WEAK PRIVACY)'}</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="2.0"
            step="0.1"
            value={epsilon}
            onChange={(e) => setEpsilon(parseFloat(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />
        </div>

        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
          <span className="text-[10px] text-slate-500 block">Query Result with Calibrated Noise:</span>
          <span className={`font-bold block text-sm ${isProtected ? 'text-emerald-400' : 'text-purple-300'}`}>
            {isProtected ? 'Mean Salary: $84,210 ± 12.4 (PRIVACY GUARANTEED)' : 'Mean Salary: $84,210 (UNPROTECTED RECONSTRUCTION RISK)'}
          </span>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isProtected ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-purple-500/20 border-purple-500/40 text-purple-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleInjectNoise}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
      >
        <span>INJECT LAPLACE NOISE & ENFORCE DIFFERENTIAL PRIVACY</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
