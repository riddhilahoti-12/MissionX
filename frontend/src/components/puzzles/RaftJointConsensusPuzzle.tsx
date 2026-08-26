'use client';

import React, { useState } from 'react';
import { Server, GitBranch, CheckCircle2, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface RaftJointConsensusPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function RaftJointConsensusPuzzle({ onSolve, onClose }: RaftJointConsensusPuzzleProps) {
  const [configState, setConfigState] = useState<'C_OLD' | 'C_JOINT' | 'C_NEW'>('C_OLD');
  const [isReconfigured, setIsReconfigured] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleTransitionJointConsensus = () => {
    soundEngine.playClick();
    setConfigState('C_NEW');
    setIsReconfigured(true);
    setFeedbackMsg('✅ RAFT RECONFIGURATION COMPLETE: Transitioned C_old,new -> C_new! Added Server 4 & Server 5 without cluster brain-split!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-cyan-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Server className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">Raft Joint Consensus Cluster Reconfiguration</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Expand the active Raft cluster from 3 nodes to 5 nodes. Execute two-phase Joint Consensus (C_old &rarr; C_old,new &rarr; C_new) to prevent dual-leader split-brain scenarios.
      </p>

      {/* Joint Consensus Diagram */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs text-center">
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-400">
            1. C_old (3 Nodes)
          </div>
          <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-400 text-purple-300 font-bold">
            2. C_old,new (Joint)
          </div>
          <div className={`p-3 rounded-xl border font-bold ${isReconfigured ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
            3. C_new (5 Nodes)
          </div>
        </div>

        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 block">Active Quorum Mode:</span>
          <span className={`text-sm font-bold block ${isReconfigured ? 'text-emerald-400' : 'text-cyan-300'}`}>
            {configState === 'C_NEW' ? 'C_new: 5-Server Active Cluster' : 'C_old: 3-Server Active Cluster'}
          </span>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isReconfigured ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleTransitionJointConsensus}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
      >
        <span>EXECUTE TWO-PHASE JOINT CONSENSUS RECONFIGURATION</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
