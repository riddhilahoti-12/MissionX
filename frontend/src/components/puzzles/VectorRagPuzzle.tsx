'use client';

import React, { useState } from 'react';
import { Database, Sparkles, CheckCircle2, ArrowRight, Grid, Zap } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface VectorRagPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function VectorRagPuzzle({ onSolve, onClose }: VectorRagPuzzleProps) {
  const [similarityScore, setSimilarityScore] = useState<number>(0.24);
  const [isRetrieved, setIsRetrieved] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleComputeVectorRag = () => {
    soundEngine.playClick();
    setSimilarityScore(0.96);
    setIsRetrieved(true);
    setFeedbackMsg('✅ RAG VECTOR SIMILARITY COMPUTED: Cosine similarity cos(θ) = 0.96 retrieved top K=1 emergency override context chunk!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-cyan-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Database className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">Vector Database RAG Cosine Similarity</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Retrieve emergency override credentials from a 1536-dimensional Vector Database. Compute embedding dot-product cosine similarity to augment LLM context.
      </p>

      {/* Vector Cosine Display */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-center">
        <span className="block text-slate-400 uppercase text-[10px]">Cosine Similarity: cos(&theta;) = (u &bull; v) / (||u|| ||v||)</span>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 block">Query & Chunk Embedding Cosine Similarity:</span>
          <span className={`text-2xl font-black block ${isRetrieved ? 'text-emerald-400' : 'text-cyan-300'}`}>
            {similarityScore} {isRetrieved ? '(MATCH FOUND - TOP K=1)' : '(LOW MATCH)'}
          </span>
        </div>

        {isRetrieved && (
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-purple-300 font-bold space-y-1">
            <span>RAG Context Chunk: "doc_override_master_key_v42.pdf" (Score: 0.96)</span>
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isRetrieved ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleComputeVectorRag}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
      >
        <span>COMPUTE RAG COSINE SIMILARITY & RETRIEVE CONTEXT</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
