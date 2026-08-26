'use client';

import React, { useState } from 'react';
import { Atom, ShieldCheck, CheckCircle2, ArrowRight, Zap, Radio } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface Ekert91EntanglementPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function Ekert91EntanglementPuzzle({ onSolve, onClose }: Ekert91EntanglementPuzzleProps) {
  const [chshScore, setChshScore] = useState<number>(1.85);
  const [isEntangled, setIsEntangled] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleVerifyEntanglement = () => {
    soundEngine.playClick();
    setChshScore(2.82);
    setIsEntangled(true);
    setFeedbackMsg('✅ EKERT91 QUANTUM ENTANGLEMENT VERIFIED: CHSH inequality score S = 2.82 (2√2) violates local realism! Eve eavesdropping eavesdropper ruled out!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-purple-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <Atom className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">Quantum Ekert91 EPR Entanglement Visualizer</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Ransomware attackers tampered with quantum communication channels. Measure EPR singlet qubit pairs (|00&gt; + |11&gt;) / &radic;2 and test CHSH inequality bounds.
      </p>

      {/* Quantum Entanglement Display */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-center">
        <span className="block text-slate-400 uppercase text-[10px]">CHSH Inequality Metric: Classical S &le; 2 vs Quantum S = 2&radic;2 &approx; 2.82</span>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 block">Measured CHSH Parameter S:</span>
          <span className={`text-2xl font-black block ${isEntangled ? 'text-emerald-400' : 'text-purple-300'}`}>
            S = {chshScore} {isEntangled ? '(QUANTUM VIOLATION - NO EAVESDROPPER)' : '(CLASSICAL LIMIT)'}
          </span>
        </div>

        {isEntangled && (
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-cyan-300 font-bold space-y-1">
            <span>EPR State: (|00&gt; + |11&gt;) / &radic;2 (Maximal Entanglement Certified)</span>
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isEntangled ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-purple-500/20 border-purple-500/40 text-purple-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleVerifyEntanglement}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
      >
        <span>MEASURE EPR QUBITS & VERIFY CHSH VIOLATION</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
