'use client';

import React, { useState } from 'react';
import { Layers, Server, CheckCircle2, ArrowRight, GitMerge, Cpu } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface MapReducePuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function MapReducePuzzle({ onSolve, onClose }: MapReducePuzzleProps) {
  const [stage, setStage] = useState<'MAP' | 'SHUFFLE' | 'REDUCE'>('MAP');
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleExecutePipeline = () => {
    soundEngine.playClick();
    setStage('REDUCE');
    setIsCompleted(true);
    setFeedbackMsg('✅ MAPREDUCE PIPELINE EXECUTED: 1TB log telemetry mapped across 4 worker nodes and reduced into anomaly key counts!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-emerald-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-emerald-400">
          <Layers className="w-5 h-5" />
          <h3 className="font-mono font-bold text-lg text-white">Distributed MapReduce Parallel Processing</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Process 1TB of ransomware intrusion logs. Distribute Map worker functions, Shuffle key-value pairs, and Reduce sum totals across 4 cluster nodes.
      </p>

      {/* MapReduce Stages Diagram */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs text-center">
        <div className="grid grid-cols-3 gap-2">
          <div className={`p-3 rounded-xl border font-bold ${stage === 'MAP' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
            1. MAP (4 Workers)
          </div>
          <div className={`p-3 rounded-xl border font-bold ${stage === 'SHUFFLE' ? 'bg-purple-500/20 border-purple-400 text-purple-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
            2. SHUFFLE / SORT
          </div>
          <div className={`p-3 rounded-xl border font-bold ${isCompleted ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
            3. REDUCE (Sum)
          </div>
        </div>

        {/* Worker Output Tally */}
        {isCompleted && (
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-emerald-300 font-bold space-y-1">
            <span>Reduced Key Totals:</span>
            <div className="text-xs text-cyan-300">"ANOMALY_IP_10.0.4.2": 1,420 occurrences</div>
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isCompleted ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleExecutePipeline}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
      >
        <span>EXECUTE MAPREDUCE CLUSTER PIPELINE</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
