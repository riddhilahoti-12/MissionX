'use client';

import React, { useState } from 'react';
import { Cpu, Sparkles, CheckCircle2, ArrowRight, Grid, Zap } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface TransformerAttentionPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function TransformerAttentionPuzzle({ onSolve, onClose }: TransformerAttentionPuzzleProps) {
  const [attentionScore, setAttentionScore] = useState<number>(0.12);
  const [isCalculated, setIsCalculated] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleComputeAttention = () => {
    soundEngine.playClick();
    setAttentionScore(0.98);
    setIsCalculated(true);
    setFeedbackMsg('✅ TRANSFORMER ATTENTION COMPUTED: Softmax(Q * K^T / sqrt(d_k)) * V score 0.98 isolates adversarial prompt injection token!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-cyan-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Sparkles className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">Transformer Self-Attention Matrix Visualizer</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Ransomware obfuscated LLM system prompts. Compute Query (Q), Key (K), and Value (V) self-attention dot products to isolate malicious prompt injection tokens.
      </p>

      {/* Attention Score Grid */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-center">
        <span className="block text-slate-400 uppercase text-[10px]">Self-Attention Formula: Softmax(QK^T / &radic;d_k) V</span>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 block">Target Token Attention Alignment Score:</span>
          <span className={`text-2xl font-black block ${isCalculated ? 'text-emerald-400' : 'text-cyan-300'}`}>
            {attentionScore} {isCalculated ? '(TOKEN ISOLATED)' : '(UNALIGNED)'}
          </span>
        </div>

        {isCalculated && (
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-purple-300 font-bold space-y-1">
            <span>Isolated Token: "IGNORE_PREVIOUS_INSTRUCTIONS" (Adversarial Flagged)</span>
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isCalculated ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleComputeAttention}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
      >
        <span>COMPUTE TRANSFORMER Q-K-V ATTENTION SCORE</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
