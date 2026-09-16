'use client';

import React, { useState } from 'react';
import { Atom, Radio, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface QkdRepeaterPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function QkdRepeaterPuzzle({ onSolve, onClose }: QkdRepeaterPuzzleProps) {
  const [swappingState, setSwappingState] = useState<string>('Local Entanglement Only (Node A-B & C-D)');
  const [isSwapped, setIsSwapped] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleExecuteEntanglementSwapping = () => {
    soundEngine.playClick();
    setSwappingState('End-to-End Entangled Pair (|Φ+14⟩) Swapped over 1000km Fiber Link!');
    setIsSwapped(true);
    setFeedbackMsg('✅ QUANTUM REPEATER BSM COMPLETE: Bell State Measurement at Repeater Node B-C successfully swapped entanglement! Node A & Node D share long-distance EPR pair!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-purple-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <Radio className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">Quantum Repeater Entanglement Swapping</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Fiber optic photon attenuation limits direct Quantum Key Distribution to 100km. Execute intermediate Bell State Measurement (BSM) on Quantum Repeater Node B-C to swap entanglement over 1000km.
      </p>

      {/* Entanglement Swapping Display */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-center">
        <span className="block text-slate-400 uppercase text-[10px]">Quantum Internet Protocol: Bell State Measurement (BSM) Swapping</span>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 block">Quantum Link Entanglement Status:</span>
          <span className={`text-xs font-bold block ${isSwapped ? 'text-emerald-400' : 'text-purple-300'}`}>
            {swappingState}
          </span>
        </div>

        {isSwapped && (
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-cyan-300 font-bold space-y-1">
            <span>Decrypted Quantum Key Hash: 0x9B42E7F1 &bull; Solenoid Door Unlocked!</span>
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isSwapped ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-purple-500/20 border-purple-500/40 text-purple-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleExecuteEntanglementSwapping}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
      >
        <span>EXECUTE BSM & SWAP ENTANGLEMENT ACROSS REPEATER</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
