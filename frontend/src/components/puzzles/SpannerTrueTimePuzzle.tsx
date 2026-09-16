'use client';

import React, { useState } from 'react';
import { Clock, Globe, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface SpannerTrueTimePuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function SpannerTrueTimePuzzle({ onSolve, onClose }: SpannerTrueTimePuzzleProps) {
  const [commitState, setCommitState] = useState<string>('Uncommitted (Wait Window Active)');
  const [isCommitted, setIsCommitted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleExecuteTrueTimeCommit = () => {
    soundEngine.playClick();
    setCommitState('Committed at Timestamp t = 1,788,932,900 (External Consistency Guaranteed)');
    setIsCommitted(true);
    setFeedbackMsg('✅ SPANNER TRUETIME COMMIT COMPLETE: TrueTime API bounds [t.now - ε, t.now + ε] with Commit Wait rule enforced! Worldwide multi-datacenter serializability achieved!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-cyan-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Globe className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">Distributed Spanner TrueTime Atomic Clock</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Global database transactions across Tokyo, Frankfurt, and Oregon datacenters are experiencing clock drift. Utilize TrueTime API bounds TT.now() &plusmn; &epsilon; (GPS + Atomic Clocks) and Commit Wait to enforce external consistency.
      </p>

      {/* TrueTime Bounds Display */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-center">
        <span className="block text-slate-400 uppercase text-[10px]">TrueTime Uncertainty Bound: [t.earliest, t.latest] where &epsilon; = 1.2ms</span>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 block">Commit Wait Timestamp Status:</span>
          <span className={`text-sm font-bold block ${isCommitted ? 'text-emerald-400' : 'text-cyan-300'}`}>
            {commitState}
          </span>
        </div>

        {isCommitted && (
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-purple-300 font-bold space-y-1">
            <span>External Consistency Rule: Transaction T2 &gt; T1 guaranteed across global replicas!</span>
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isCommitted ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleExecuteTrueTimeCommit}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
      >
        <span>EXECUTE TRUETIME COMMIT WAIT & SYNCHRONIZE CLOCKS</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
