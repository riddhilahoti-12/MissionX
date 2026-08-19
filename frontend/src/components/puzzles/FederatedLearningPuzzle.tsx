'use client';

import React, { useState } from 'react';
import { Cpu, ShieldCheck, CheckCircle2, ArrowRight, GitMerge, Lock, Smartphone } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface FederatedLearningPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function FederatedLearningPuzzle({ onSolve, onClose }: FederatedLearningPuzzleProps) {
  const [deviceWeights, setDeviceWeights] = useState<number[]>([0.42, 0.48, 0.45, 0.44]);
  const [isAggregated, setIsAggregated] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleAggregateGradients = () => {
    soundEngine.playClick();
    setIsAggregated(true);
    setFeedbackMsg('✅ FEDERATED LEARNING SECURE AGGREGATION: Gradient weights from 4 edge devices aggregated into global neural model! Raw patient data remained local and private.');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-cyan-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Cpu className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">Federated Learning & Secure Aggregation</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Hospital edge nodes must train an AI model without sharing raw patient data. Execute Federated Secure Aggregation to update global weights safely.
      </p>

      {/* Edge Devices Grid */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs text-center">
        <span className="block text-slate-400 uppercase text-[10px]">4 Edge Device Gradient Collectors:</span>

        <div className="grid grid-cols-4 gap-2">
          {deviceWeights.map((w, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border flex flex-col items-center space-y-1 ${
                isAggregated
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="text-[10px] font-bold">Node #{i + 1}</span>
              <span className="text-[9px] text-amber-400">Δw: {w}</span>
            </div>
          ))}
        </div>

        {/* Global Aggregated Weight */}
        {isAggregated && (
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-emerald-300 font-bold space-y-1">
            <span>Aggregated Global Model Weight:</span>
            <div className="text-xs text-purple-300">Global W_avg = 0.4475 (Differential Privacy Preserved)</div>
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isAggregated ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleAggregateGradients}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
      >
        <span>EXECUTE SECURE GRADIENT AGGREGATION</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
