'use client';

import React, { useState } from 'react';
import { Atom, Key, CheckCircle2, ArrowRight, Zap, Cpu } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface ShorsAlgorithmPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function ShorsAlgorithmPuzzle({ onSolve, onClose }: ShorsAlgorithmPuzzleProps) {
  const [factors, setFactors] = useState<string>('N = 15 (p = ?, q = ?)');
  const [isFactored, setIsFactored] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleExecuteShors = () => {
    soundEngine.playClick();
    setFactors('N = 15 -> p = 3, q = 5 (Period r = 4)');
    setIsFactored(true);
    setFeedbackMsg('✅ SHOR\'S ALGORITHM COMPLETE: QFT period-finding isolated period r = 4! Factored semiprime N = 15 into prime factors p = 3 and q = 5!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-purple-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <Atom className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">Quantum Shor's Algorithm Prime Factorization</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Ransomware locked system files using RSA public key encryption. Execute Quantum Fourier Transform (QFT) period-finding f(x) = a^x mod N to break prime factors in O((log N)^3) polynomial time.
      </p>

      {/* Quantum Factorization Display */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-center">
        <span className="block text-slate-400 uppercase text-[10px]">Quantum Period Finding: f(x) = a^x mod N &bull; gcd(a^(r/2) &plusmn; 1, N)</span>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 block">Target RSA Semiprime Key N:</span>
          <span className={`text-xl font-bold block ${isFactored ? 'text-emerald-400' : 'text-purple-300'}`}>
            {factors}
          </span>
        </div>

        {isFactored && (
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-cyan-300 font-bold space-y-1">
            <span>Decrypted RSA Private Key: d = gcd(a^(r/2) - 1, 15) = 3 &bull; Solenoid Unlocked!</span>
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isFactored ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-purple-500/20 border-purple-500/40 text-purple-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleExecuteShors}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
      >
        <span>EXECUTE QFT PERIOD-FINDING & FACTOR SEMIPRIME N</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
