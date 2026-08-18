'use client';

import React, { useState } from 'react';
import { Server, Radio, CheckCircle2, ArrowRight, ShieldCheck, GitMerge, Cpu } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface PaxosConsensusPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function PaxosConsensusPuzzle({ onSolve, onClose }: PaxosConsensusPuzzleProps) {
  const [phase, setPhase] = useState<'PREPARE' | 'PROMISE' | 'ACCEPT' | 'ACCEPTED'>('PREPARE');
  const [isConsensusReached, setIsConsensusReached] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleExecutePaxos = () => {
    soundEngine.playClick();
    setPhase('ACCEPTED');
    setIsConsensusReached(true);
    setFeedbackMsg('✅ PAXOS CONSENSUS ACHIEVED: Proposer proposal #104 accepted by majority Acceptor quorum! Consensus state committed across 5 nodes.');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-purple-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <Server className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">Distributed Paxos Consensus Protocol</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Ransomware network latency caused Paxos proposal conflicts. Execute Proposer phase (Prepare &bull; Promise &bull; Accept &bull; Accepted) to achieve majority Acceptor consensus.
      </p>

      {/* Paxos Protocol Stages */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs text-center">
        <div className="grid grid-cols-4 gap-2">
          {['PREPARE', 'PROMISE', 'ACCEPT', 'ACCEPTED'].map((p, i) => (
            <div
              key={p}
              className={`p-2.5 rounded-xl border font-bold text-[11px] ${
                phase === p || (isConsensusReached && p === 'ACCEPTED')
                  ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              {i + 1}. {p}
            </div>
          ))}
        </div>

        {/* Acceptor Quorum Status */}
        {isConsensusReached && (
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-emerald-300 font-bold space-y-1">
            <span>Majority Acceptor Status:</span>
            <div className="text-xs text-cyan-300">4 / 5 Acceptor Nodes Promised & Accepted Proposal #104</div>
          </div>
        )}
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
        onClick={handleExecutePaxos}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
      >
        <span>EXECUTE PAXOS PROPOSER CONSENSUS</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
