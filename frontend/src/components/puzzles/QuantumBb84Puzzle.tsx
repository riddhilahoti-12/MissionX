'use client';

import React, { useState } from 'react';
import { Atom, ShieldCheck, CheckCircle2, ArrowRight, Eye, RefreshCw } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface QuantumBb84PuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function QuantumBb84Puzzle({ onSolve, onClose }: QuantumBb84PuzzleProps) {
  const [bobBases, setBobBases] = useState<string[]>(['+', 'x', '+', 'x', '+']);
  const [isSolved, setIsSolved] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const aliceBases = ['+', 'x', '+', 'x', '+'];
  const aliceBits = [0, 1, 1, 0, 1];

  const handleToggleBasis = (idx: number) => {
    soundEngine.playClick();
    const updated = [...bobBases];
    updated[idx] = updated[idx] === '+' ? 'x' : '+';
    setBobBases(updated);
  };

  const handleVerifyQuantumKey = () => {
    soundEngine.playClick();
    const matchesAll = bobBases.every((b, i) => b === aliceBases[i]);

    if (matchesAll) {
      setIsSolved(true);
      setFeedbackMsg('✅ QUANTUM KEY ESTABLISHED: 100% photon basis alignment! Shared secret key [0, 1, 1, 0, 1] verified free of eavesdropping (Eve).');
      soundEngine.playUnlockChime();
      aiVoiceNarrator.speakSuccess();
      if (onSolve) onSolve();
    } else {
      setFeedbackMsg('⚠️ BASIS MISMATCH: Photon polarization mismatch detected. Align Bob basis to match Alice photon states.');
      soundEngine.playAlarmSiren();
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-cyan-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Atom className="w-5 h-5 animate-spin" />
          <h3 className="font-mono font-bold text-lg text-white">Quantum Cryptography (BB84 Protocol) Visualizer</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Align Bob photon filter measurement bases (+ Rectilinear / x Diagonal) with Alice polarized photon transmission states to eliminate quantum eavesdropping.
      </p>

      {/* Quantum Photon Transmission Stream */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
        <div className="flex justify-between items-center text-slate-400">
          <span>Alice Transmitted Photons:</span>
          <span className="text-cyan-300 font-bold">5 QUBITS</span>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center">
          {aliceBits.map((bit, idx) => (
            <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">Qubit {idx + 1}</span>
              <span className="text-sm font-bold text-cyan-400 block">{bit}</span>
              <span className="text-xs text-purple-400 font-bold block">({aliceBases[idx]})</span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-3">
          <span className="block text-slate-400 uppercase text-[10px] mb-2">Bob Filter Measurement Bases (Click to Toggle + / x):</span>
          <div className="grid grid-cols-5 gap-2 text-center">
            {bobBases.map((basis, idx) => (
              <button
                key={idx}
                onClick={() => handleToggleBasis(idx)}
                className={`p-3 rounded-xl border font-bold text-base transition-all ${
                  basis === aliceBases[idx]
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-200'
                }`}
              >
                {basis}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isSolved ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleVerifyQuantumKey}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
      >
        <span>VERIFY BB84 QUANTUM KEY DISTRIBUTION</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
