'use client';

import React, { useState } from 'react';
import { Database, Terminal, CheckCircle2, ArrowRight, Table, GitMerge } from 'lucide-react';

interface SqlJoinPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function SqlJoinPuzzle({ onSolve, onClose }: SqlJoinPuzzleProps) {
  const [joinType, setJoinType] = useState<'INNER JOIN' | 'LEFT JOIN' | 'CROSS JOIN'>('INNER JOIN');
  const [whereClause, setWhereClause] = useState<string>("p.status = 'CRITICAL'");
  const [isSolved, setIsSolved] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleExecuteQuery = () => {
    if (joinType === 'INNER JOIN' && whereClause.includes('CRITICAL')) {
      setIsSolved(true);
      setFeedbackMsg('✅ SQL QUERY EXECUTED: 42 emergency patient records joined with vault_keys table. Database lock released!');
      if (onSolve) onSolve();
    } else {
      setFeedbackMsg('❌ QUERY ERROR: Incorrect JOIN condition or missing status filter for ICU patients.');
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-amber-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-amber-400">
          <Database className="w-5 h-5" />
          <h3 className="font-mono font-bold text-lg text-white">Relational SQL Multi-Table Join Console</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Construct an SQL relational join connecting table <code className="text-amber-400">patients p</code> with <code className="text-cyan-400">vault_keys k</code> on matching <code className="text-purple-400">patient_id</code> to extract critical ICU access keys.
      </p>

      {/* SQL Builder Controls */}
      <div className="space-y-4 font-mono text-xs">
        <div>
          <label className="block text-slate-400 uppercase mb-1">Select Relational JOIN Type</label>
          <div className="grid grid-cols-3 gap-2">
            {(['INNER JOIN', 'LEFT JOIN', 'CROSS JOIN'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setJoinType(type)}
                className={`p-3 rounded-xl border font-bold text-center transition-all ${
                  joinType === type
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Live SQL Preview Box */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <span className="block text-[10px] text-slate-400 uppercase">Constructed Query Preview:</span>
          <pre className="p-3 bg-slate-900 rounded-xl text-amber-300 font-bold overflow-x-auto">
{`SELECT p.id, p.name, k.vault_key 
FROM patients p 
${joinType} vault_keys k ON p.patient_id = k.patient_id 
WHERE ${whereClause};`}
          </pre>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isSolved ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-red-500/20 border-red-500/40 text-red-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleExecuteQuery}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all"
      >
        <span>RUN SQL JOIN QUERY & EXTRACT KEYS</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
