'use client';

import React, { useState } from 'react';
import { Server, HardDrive, CheckCircle2, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface RaftSnapshotPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function RaftSnapshotPuzzle({ onSolve, onClose }: RaftSnapshotPuzzleProps) {
  const [logEntriesCount, setLogEntriesCount] = useState<number>(10420);
  const [isCompacted, setIsCompacted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleCompactLog = () => {
    soundEngine.playClick();
    setLogEntriesCount(1);
    setIsCompacted(true);
    setFeedbackMsg('✅ RAFT LOG COMPACTED: State machine snapshot written to disk! 10,419 committed log entries trimmed, freeing 85% cluster disk storage!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-purple-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <HardDrive className="w-5 h-5 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">Distributed Raft Log Compaction & Snapshotting</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Cluster storage capacity exhausted by uncompacted Raft logs. Execute state machine snapshotting to compact committed log entries and free disk space.
      </p>

      {/* Log Entries Status */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-center">
        <span className="block text-slate-400 uppercase text-[10px]">Raft Cluster Storage Utilization:</span>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-500 block">Committed Raft Log Entries:</span>
          <span className={`text-2xl font-black block ${isCompacted ? 'text-emerald-400' : 'text-amber-400'}`}>
            {logEntriesCount} Entries {isCompacted ? '(SNAPSHOT CREATED)' : '(OVERFLOW WARNING)'}
          </span>
        </div>

        {isCompacted && (
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-cyan-300 font-bold space-y-1">
            <span>Snapshot File: snapshot_term42_index10420.bin</span>
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isCompacted ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-purple-500/20 border-purple-500/40 text-purple-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleCompactLog}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
      >
        <span>CREATE STATE SNAPSHOT & COMPACT LOGS</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
