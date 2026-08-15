'use client';

import React, { useState } from 'react';
import { Eye, Layers, CheckCircle2, ArrowRight, Sparkles, Grid } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface CnnFilterPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function CnnFilterPuzzle({ onSolve, onClose }: CnnFilterPuzzleProps) {
  const [selectedKernel, setSelectedKernel] = useState<'SOBEL' | 'BLUR' | 'SHARPEN'>('SOBEL');
  const [featureMap, setFeatureMap] = useState<number[]>([12, 4, 8, 16]);
  const [isSolved, setIsSolved] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleApplyCnn = (kernel: 'SOBEL' | 'BLUR' | 'SHARPEN') => {
    soundEngine.playClick();
    setSelectedKernel(kernel);

    if (kernel === 'SOBEL') {
      setFeatureMap([24, 18, 32, 28]);
      setIsSolved(true);
      setFeedbackMsg('✅ CNN FEATURE MAP COMPUTED: 3x3 Sobel Edge Detection kernel extracted security camera boundary features!');
      soundEngine.playUnlockChime();
      aiVoiceNarrator.speakSuccess();
      if (onSolve) onSolve();
    } else {
      setFeatureMap([6, 5, 7, 6]);
      setFeedbackMsg(`⚠️ SUB-OPTIMAL FEATURE EXTRACTION: ${kernel} kernel blurred high-frequency edge gradients. Select Sobel Edge Detector.`);
      soundEngine.playAlarmSiren();
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-purple-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <Layers className="w-5 h-5" />
          <h3 className="font-mono font-bold text-lg text-white">CNN Convolution & Max-Pooling Visualizer</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Slide 3x3 convolution kernels over camera video frames and execute 2x2 Max-Pooling downsampling to isolate intruder features.
      </p>

      {/* Kernel Selection */}
      <div className="space-y-4 font-mono text-xs">
        <div>
          <label className="block text-slate-400 uppercase mb-1">Select 3x3 Convolution Kernel</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'SOBEL', label: 'Sobel Edge Detector' },
              { id: 'BLUR', label: 'Gaussian Blur Filter' },
              { id: 'SHARPEN', label: 'Sharpen Matrix' },
            ].map((k) => (
              <button
                key={k.id}
                onClick={() => handleApplyCnn(k.id as any)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedKernel === k.id
                    ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block font-bold text-slate-200">{k.id}</span>
                <span className="text-[9px] text-slate-400">{k.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2x2 Max-Pooling Feature Map Display */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <span className="block text-[10px] text-slate-400 uppercase">2x2 Max-Pooling Activation Map:</span>
          <div className="grid grid-cols-2 gap-2 text-center">
            {featureMap.map((val, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-bold text-purple-300 text-lg">
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isSolved ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-purple-500/20 border-purple-500/40 text-purple-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}
    </div>
  );
}
