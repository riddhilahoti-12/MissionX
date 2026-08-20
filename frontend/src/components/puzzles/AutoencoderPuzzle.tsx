'use client';

import React, { useState } from 'react';
import { Eye, Cpu, CheckCircle2, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface AutoencoderPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function AutoencoderPuzzle({ onSolve, onClose }: AutoencoderPuzzleProps) {
  const [psnrDb, setPsnrDb] = useState<number>(14.2);
  const [isDenoised, setIsDenoised] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleTrainAutoencoder = () => {
    soundEngine.playClick();
    setPsnrDb(38.6);
    setIsDenoised(true);
    setFeedbackMsg('✅ SIGNAL DENOISED: Convolutional Autoencoder latent bottleneck (z) reconstructed clean sensor video frame! PSNR improved to 38.6 dB!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-cyan-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Layers className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">Convolutional Autoencoder Signal Denoising</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Ransomware injected Gaussian noise into security camera streams. Pass the noisy video matrix through an Encoder bottleneck and Decoder reconstruction layers.
      </p>

      {/* Autoencoder Bottleneck Diagram */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs text-center">
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-400">
            1. Corrupted Input
          </div>
          <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-400 text-cyan-300 font-bold">
            2. Latent Bottleneck (z)
          </div>
          <div className={`p-3 rounded-xl border font-bold ${isDenoised ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
            3. Clean Reconstruction
          </div>
        </div>

        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 block">Peak Signal-to-Noise Ratio (PSNR):</span>
          <span className={`text-xl font-bold block ${isDenoised ? 'text-emerald-400' : 'text-amber-400'}`}>
            {psnrDb} dB {isDenoised ? '(HIGH CLARITY)' : '(HIGH NOISE ARTIFACTS)'}
          </span>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isDenoised ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleTrainAutoencoder}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
      >
        <span>RECONSTRUCT SIGNAL VIA AUTOENCODER</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
