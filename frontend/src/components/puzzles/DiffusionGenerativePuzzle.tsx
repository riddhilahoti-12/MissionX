'use client';

import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, CheckCircle2, ArrowRight, Zap, Cpu } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface DiffusionGenerativePuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function DiffusionGenerativePuzzle({ onSolve, onClose }: DiffusionGenerativePuzzleProps) {
  const [denoiseStep, setDenoiseStep] = useState<number>(1000);
  const [isGenerated, setIsGenerated] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleDenoiseDiffusion = () => {
    soundEngine.playClick();
    setDenoiseStep(0);
    setIsGenerated(true);
    setFeedbackMsg('✅ DIFFUSION DENOISING COMPLETE: Reverse SDE dx = [f(x,t) - g(t)^2 ∇_x log p_t(x)]dt executed! High-fidelity emergency biometric schematic reconstructed from Gaussian noise!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-purple-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <Sparkles className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">Diffusion Model Generative Denoising (Score-Based SDE)</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Attacker corrupted the vault biometric blueprint with additive Gaussian noise. Execute reverse Score-Based Diffusion SDE steps t = 1000 &rarr; 0 to reconstruct clear master access schematics.
      </p>

      {/* Diffusion Progress Display */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-center">
        <span className="block text-slate-400 uppercase text-[10px]">Reverse-Time SDE Denoising Step: Timestep t = {denoiseStep}</span>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Gaussian Latent Noise (t=1000)</span>
            <span>Target Blueprint (t=0)</span>
          </div>

          <div className="w-full bg-slate-950 h-3 rounded-full border border-slate-800 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full transition-all duration-500"
              style={{ width: `${((1000 - denoiseStep) / 1000) * 100}%` }}
            />
          </div>
        </div>

        {isGenerated && (
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-cyan-300 font-bold space-y-1">
            <span>Reconstructed Biometric Hash: 0x8F9A42C7 (Score-Function Gradient Converged)</span>
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isGenerated ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-purple-500/20 border-purple-500/40 text-purple-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleDenoiseDiffusion}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
      >
        <span>EXECUTE REVERSE DIFFUSION SDE DENOISING</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
