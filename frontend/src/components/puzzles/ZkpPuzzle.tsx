'use client';

import React, { useState } from 'react';
import { ShieldCheck, EyeOff, CheckCircle2, ArrowRight, Lock, Key, Sparkles } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface ZkpPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function ZkpPuzzle({ onSolve, onClose }: ZkpPuzzleProps) {
  const [zkProof, setZkProof] = useState<string>('NULL_PROOF');
  const [isVerified, setIsVerified] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleGenerateProof = () => {
    soundEngine.playClick();
    setZkProof('0x9F82A4C01E9B (zk-SNARK VALID)');
    setIsVerified(true);
    setFeedbackMsg('✅ ZK-PROOF VERIFIED: Generated zk-SNARK proof validated knowledge of secret passcode without exposing plaintext secret string!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-cyan-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-cyan-400">
          <EyeOff className="w-5 h-5" />
          <h3 className="font-mono font-bold text-lg text-white">Zero-Knowledge Proofs (zk-SNARKs) Visualizer</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Prove to the vault verifier node that you possess the emergency master passcode without revealing any bits of the secret string itself.
      </p>

      {/* ZK Proof Generator Display */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Prover Secret Passcode:</span>
          <span className="text-purple-400 font-bold">•••••••••••• (HIDDEN)</span>
        </div>

        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 block">Generated zk-SNARK Proof Hash:</span>
          <span className={`text-xs font-bold block ${isVerified ? 'text-emerald-400' : 'text-slate-400'}`}>
            {zkProof}
          </span>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isVerified ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleGenerateProof}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
      >
        <span>GENERATE ZK-SNARK ZERO-KNOWLEDGE PROOF</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
