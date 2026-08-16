'use client';

import React, { useState } from 'react';
import { Server, Radio, CheckCircle2, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface RaftConsensusPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function RaftConsensusPuzzle({ onSolve, onClose }: RaftConsensusPuzzleProps) {
  const [quorumCount, setQuorumCount] = useState<number>(2);
  const [isConsensusReached, setIsConsensusReached] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleTriggerQuorum = () => {
    soundEngine.playClick();
    setQuorumCount(5);
    setIsConsensusReached(true);
    setFeedbackMsg('✅ RAFT CONSENSUS REALLIGNED: 5/5 Cluster Nodes quorum majority achieved! Log term 42 committed across distributed network.');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-purple-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <Server className="w-5 h-5" />
          <h3 className="font-mono font-bold text-lg text-white">Distributed Systems Raft Consensus Protocol</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Ransomware network partitions separated follower nodes. Execute a Raft Leader election to achieve Quorum Majority (&gt;= 3/5 votes) and commit log entries.
      </p>

      {/* Cluster Nodes Visualizer */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs text-center">
        <span className="block text-slate-400 uppercase text-[10px]">5-Node Cluster Status:</span>

        <div className="grid grid-cols-5 gap-2">
          {['Node 1 (Leader)', 'Node 2', 'Node 3', 'Node 4', 'Node 5'].map((nodeName, i) => {
            const isSynced = i < quorumCount;
            return (
              <div
                key={i}
                className={`p-3 rounded-xl border flex flex-col items-center space-y-1 transition-all ${
                  isSynced
                    ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                    : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                <Server className="w-4 h-4" />
                <span className="text-[10px] font-bold">{nodeName}</span>
                <span className="text-[9px]">{isSynced ? 'SYNCED' : 'OFFLINE'}</span>
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
        onClick={handleTriggerQuorum}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
      >
        <span>TRIGGER RAFT LEADER QUORUM VOTE</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
