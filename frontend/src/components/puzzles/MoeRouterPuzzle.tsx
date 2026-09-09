'use client';

import React, { useState } from 'react';
import { Cpu, GitFork, CheckCircle2, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface MoeRouterPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function MoeRouterPuzzle({ onSolve, onClose }: MoeRouterPuzzleProps) {
  const [activeExperts, setActiveExperts] = useState<string[]>(['Expert 1 (General)']);
  const [isRouted, setIsRouted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleRouteToken = () => {
    soundEngine.playClick();
    setActiveExperts(['Expert 3 (Math & Logic)', 'Expert 7 (Code Generation)']);
    setIsRouted(true);
    setFeedbackMsg('✅ MOE TOP-K ROUTING COMPLETE: G(x) = Softmax(Top2(x * W_g)) routed token to Expert 3 & Expert 7! Reduced active FLOP compute by 75%!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-cyan-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-cyan-400">
          <GitFork className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">LLM Mixture-of-Experts (MoE) Softmax Router</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        High inference latency detected in the LLM pipeline. Compute Top-K (K=2) Softmax gating routing weights G(x) = Softmax(Top2(x &bull; W_g)) to dispatch tokens to specialized Expert Neural Networks.
      </p>

      {/* MoE Experts Grid */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs text-center">
        <span className="block text-slate-400 uppercase text-[10px]">8-Expert Architecture (Top-2 Sparse Activation):</span>

        <div className="grid grid-cols-4 gap-2 text-[10px]">
          {['Expert 1 (General)', 'Expert 2 (Vision)', 'Expert 3 (Math/Logic)', 'Expert 4 (Language)', 'Expert 5 (Robotics)', 'Expert 6 (Biology)', 'Expert 7 (Code Gen)', 'Expert 8 (Audio)'].map((e, i) => {
            const isActive = activeExperts.some((ae) => ae.includes(e.split(' ')[1]));
            return (
              <div
                key={i}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center space-y-1 ${
                  isActive
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                    : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>{e}</span>
                <span className="text-[8px]">{isActive ? 'ACTIVATED' : 'IDLE'}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isRouted ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleRouteToken}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
      >
        <span>COMPUTE SOFTMAX GATING & DISPATCH TO TOP-2 EXPERTS</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
