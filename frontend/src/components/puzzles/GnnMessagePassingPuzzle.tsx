'use client';

import React, { useState } from 'react';
import { GitCommit, Sparkles, CheckCircle2, ArrowRight, Zap, Activity } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface GnnMessagePassingPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function GnnMessagePassingPuzzle({ onSolve, onClose }: GnnMessagePassingPuzzleProps) {
  const [layerDepth, setLayerDepth] = useState<number>(1);
  const [isAggregated, setIsAggregated] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleAggregateGnn = () => {
    soundEngine.playClick();
    setLayerDepth(3);
    setIsAggregated(true);
    setFeedbackMsg('✅ GNN NEIGHBORHOOD AGGREGATION COMPLETE: h_v^(k) = AGGREGATE({h_u^(k-1)}) executed across 3 GCN layers! Compromised Node 42 classified in cluster graph!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-purple-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <GitCommit className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">Graph Neural Network (GNN) Message Passing</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Attackers disguised compromised server nodes inside the datacenter topology graph. Aggregate 2-hop neighborhood feature vectors h_v^(k) = &sigma;(W &bull; COMBINE(h_v^(k-1), AGG({h_u}))) to classify fraud nodes.
      </p>

      {/* GNN Message Passing Display */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-center">
        <span className="block text-slate-400 uppercase text-[10px]">Graph Convolutional Network (GCN) Layer Depth: K = {layerDepth}</span>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 block">Target Node Embedding Vector (Node 42):</span>
          <span className={`text-sm font-bold block ${isAggregated ? 'text-emerald-400' : 'text-purple-300'}`}>
            {isAggregated ? 'h_42^(3) = [0.94, -0.12, 0.88] (COMPROMISED NODE ISOLATED)' : 'h_42^(1) = [0.12, 0.05, 0.10] (UNAGGREGATED)'}
          </span>
        </div>

        {isAggregated && (
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-cyan-300 font-bold space-y-1">
            <span>Softmax Node Classification: P(Malicious) = 98.4% &bull; Solenoid Unlocked!</span>
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isAggregated ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-purple-500/20 border-purple-500/40 text-purple-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleAggregateGnn}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
      >
        <span>EXECUTE NEIGHBORHOOD AGGREGATION & UPDATE NODE VECTORS</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
