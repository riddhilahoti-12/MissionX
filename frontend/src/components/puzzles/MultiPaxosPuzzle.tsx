'use client';

import React, { useState } from 'react';
import { Server, Layers, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface MultiPaxosPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function MultiPaxosPuzzle({ onSolve, onClose }: MultiPaxosPuzzleProps) {
  const [logInstances, setLogInstances] = useState<string[]>(['Slot 1: Committed']);
  const [isReplicated, setIsReplicated] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleExecuteMultiPaxos = () => {
    soundEngine.playClick();
    setLogInstances(['Slot 1: Committed', 'Slot 2: Committed (Bypassed Phase 1)', 'Slot 3: Committed (Bypassed Phase 1)']);
    setIsReplicated(true);
    setFeedbackMsg('✅ MULTI-PAXOS PIPELINE COMPLETE: Stable Leader Node 1 executed Phase 2 Accept/Commit directly! Achieved 10x throughput with 1-RTT log replication!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-cyan-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Layers className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">Distributed Multi-Paxos State Machine</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Basic Paxos incurs 2 RTT round-trips per consensus instance. Utilize a Stable Leader in Multi-Paxos to bypass Phase 1 (Prepare/Promise) for sequential log stream commits.
      </p>

      {/* Multi-Paxos Pipeline Display */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-center">
        <span className="block text-slate-400 uppercase text-[10px]">Multi-Paxos Optimization: Stable Leader &bull; 1-RTT Phase 2 Direct Accept</span>

        <div className="space-y-2">
          {logInstances.map((instance, i) => (
            <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="font-bold text-cyan-300">{instance}</span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">1-RTT STABLE</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isReplicated ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleExecuteMultiPaxos}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
      >
        <span>EXECUTE MULTI-PAXOS STABLE LEADER PIPELINE</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
