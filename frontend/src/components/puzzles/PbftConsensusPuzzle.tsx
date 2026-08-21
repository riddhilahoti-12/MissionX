'use client';

import React, { useState } from 'react';
import { ShieldCheck, Server, AlertTriangle, ArrowRight, CheckCircle2, Cpu } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface PbftConsensusPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function PbftConsensusPuzzle({ onSolve, onClose }: PbftConsensusPuzzleProps) {
  const [phase, setPhase] = useState<'PRE_PREPARE' | 'PREPARE' | 'COMMIT'>('PRE_PREPARE');
  const [isConsensusReached, setIsConsensusReached] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleExecutePbft = () => {
    soundEngine.playClick();
    setPhase('COMMIT');
    setIsConsensusReached(true);
    setFeedbackMsg('✅ PBFT BYZANTINE CONSENSUS ACHIEVED: 3/4 Honest Replicas committed proposal! Malicious Node 4 isolated (Tolerates f=1 Byzantine fault)!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-purple-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <Server className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">Practical Byzantine Fault Tolerance (PBFT)</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        A traitor node in the cluster is broadcasting corrupted state messages. Execute 3-phase PBFT (Pre-Prepare &bull; Prepare &bull; Commit) to achieve consensus despite Byzantine faults.
      </p>

      {/* PBFT Nodes Visualization */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs text-center">
        <span className="block text-slate-400 uppercase text-[10px]">4-Node PBFT Network Status (N = 3f + 1):</span>

        <div className="grid grid-cols-4 gap-2">
          {['Node 1 (Primary)', 'Node 2 (Honest)', 'Node 3 (Honest)', 'Node 4 (BYZANTINE TRAITOR)'].map((n, i) => {
            const isTraitor = i === 3;
            return (
              <div
                key={i}
                className={`p-2.5 rounded-xl border flex flex-col items-center space-y-1 ${
                  isTraitor
                    ? 'bg-red-500/20 border-red-500/40 text-red-300'
                    : isConsensusReached
                    ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <Server className="w-4 h-4" />
                <span className="text-[10px] font-bold">{n}</span>
                <span className="text-[9px]">{isTraitor ? 'ISOLATED' : isConsensusReached ? 'COMMITTED' : 'READY'}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isConsensusReached ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-purple-500/20 border-purple-500/40 text-purple-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleExecutePbft}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
      >
        <span>EXECUTE PBFT 3-PHASE BYZANTINE CONSENSUS</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
