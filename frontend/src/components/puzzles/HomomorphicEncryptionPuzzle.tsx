'use client';

import React, { useState } from 'react';
import { Lock, ShieldCheck, CheckCircle2, ArrowRight, Key, Cpu } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface HomomorphicEncryptionPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function HomomorphicEncryptionPuzzle({ onSolve, onClose }: HomomorphicEncryptionPuzzleProps) {
  const [ciphertextResult, setCiphertextResult] = useState<string>('E(15) + E(27) = E(?)');
  const [isComputed, setIsComputed] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleComputeFhe = () => {
    soundEngine.playClick();
    setCiphertextResult('E(15 + 27) = E(42) [DEC: 42]');
    setIsComputed(true);
    setFeedbackMsg('✅ HOMOMORPHIC COMPUTATION COMPLETE: E(a) + E(b) = E(a + b) executed in cloud memory! Ciphertext decrypted to 42 without cloud data exposure!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-purple-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <Lock className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">Fully Homomorphic Encryption (FHE) Cloud Compute</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Ransomware attacker nodes are monitoring cloud memory. Execute homomorphic arithmetic addition directly over encrypted ciphertexts without decrypting data.
      </p>

      {/* Homomorphic Compute Display */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-center">
        <span className="block text-slate-400 uppercase text-[10px]">FHE Additive Homomorphism Property: E(a) + E(b) = E(a + b)</span>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 block">Cloud Memory Ciphertext Operation:</span>
          <span className={`text-xl font-bold block ${isComputed ? 'text-emerald-400' : 'text-purple-300'}`}>
            {ciphertextResult}
          </span>
        </div>

        {isComputed && (
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-cyan-300 font-bold space-y-1">
            <span>Zero-Trust Result: Secret vault PIN 42 verified in cloud without plaintext leaks!</span>
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isComputed ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-purple-500/20 border-purple-500/40 text-purple-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleComputeFhe}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
      >
        <span>EXECUTE FHE HOMOMORPHIC ADDITION OVER CIPHERTEXT</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
