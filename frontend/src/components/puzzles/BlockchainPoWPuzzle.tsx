'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, Lock, Key, RefreshCw, Cpu } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface BlockchainPoWPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function BlockchainPoWPuzzle({ onSolve, onClose }: BlockchainPoWPuzzleProps) {
  const [nonce, setNonce] = useState<number>(1000);
  const [hash, setHash] = useState<string>('0x7F2A...9B');
  const [isMined, setIsMined] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleMineBlock = () => {
    soundEngine.playClick();
    const targetNonce = 42890;
    setNonce(targetNonce);
    setHash('0x0000A9F42B8C');
    setIsMined(true);
    setFeedbackMsg('✅ BLOCK MINED & CONTRACT AUDITED: Nonce 42890 satisfies target hash prefix 0x0000! Solidity re-entrancy vulnerability patched!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-amber-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-amber-400">
          <Lock className="w-5 h-5" />
          <h3 className="font-mono font-bold text-lg text-white">Blockchain Proof-of-Work & Smart Contract Visualizer</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Ransomware attackers locked the vault smart contract. Calculate the SHA-256 target nonce to mine block #14029 and patch the re-entrancy vulnerability.
      </p>

      {/* Block Nonce & Hash Display */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Target Difficulty Prefix:</span>
          <span className="text-amber-400 font-bold">0x0000...</span>
        </div>

        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 block">Current Nonce Counter:</span>
          <span className="text-lg font-bold text-cyan-300 block">{nonce}</span>
        </div>

        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 block">Computed Block SHA-256 Hash:</span>
          <span className={`text-xs font-bold block ${isMined ? 'text-emerald-400' : 'text-slate-400'}`}>
            {hash}
          </span>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isMined ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleMineBlock}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all"
      >
        <span>MINE BLOCK NONCE & AUDIT CONTRACT</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
