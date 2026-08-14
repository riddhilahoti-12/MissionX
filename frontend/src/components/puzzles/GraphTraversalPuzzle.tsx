'use client';

import React, { useState } from 'react';
import { Network, RefreshCw, CheckCircle2, ArrowRight, GitCommit, Layers } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';

interface GraphTraversalPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function GraphTraversalPuzzle({ onSolve, onClose }: GraphTraversalPuzzleProps) {
  const [traversalType, setTraversalType] = useState<'BFS' | 'DFS'>('BFS');
  const [visitedNodes, setVisitedNodes] = useState<string[]>(['A']);
  const [isSolved, setIsSolved] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Graph Adjacency: A -> [B, C], B -> [D, E], C -> [F, G]
  const handleExecuteTraversal = (type: 'BFS' | 'DFS') => {
    soundEngine.playClick();
    setTraversalType(type);

    if (type === 'BFS') {
      const bfsSequence = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
      setVisitedNodes(bfsSequence);
      setIsSolved(true);
      setFeedbackMsg('✅ BFS TRAVERSAL COMPLETE: Queue-level order [A, B, C, D, E, F, G] discovered shortest router path!');
      soundEngine.playUnlockChime();
      if (onSolve) onSolve();
    } else {
      const dfsSequence = ['A', 'B', 'D', 'E', 'C', 'F', 'G'];
      setVisitedNodes(dfsSequence);
      setFeedbackMsg('⚠️ DFS TRAVERSAL EXECUTED: Depth-first stack order [A, B, D, E, C, F, G] visited deep branch first. Use BFS for shortest path guarantee.');
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-cyan-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Network className="w-5 h-5" />
          <h3 className="font-mono font-bold text-lg text-white">Graph Traversal (BFS / DFS) Shortest Path Visualizer</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Traverse network router nodes from Source Router A to Goal Router G. Select Breadth-First Search (Queue) to guarantee the shortest hop path.
      </p>

      {/* Graph Router Nodes Diagram */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-4 font-mono text-xs">
        <div className="w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 font-bold flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.4)]">
          A
        </div>
        <div className="flex space-x-12">
          <div className={`w-9 h-9 rounded-full border flex items-center justify-center font-bold ${visitedNodes.includes('B') ? 'bg-purple-500/20 border-purple-400 text-purple-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
            B
          </div>
          <div className={`w-9 h-9 rounded-full border flex items-center justify-center font-bold ${visitedNodes.includes('C') ? 'bg-purple-500/20 border-purple-400 text-purple-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
            C
          </div>
        </div>
        <div className="flex space-x-6">
          {['D', 'E', 'F', 'G'].map((node) => (
            <div
              key={node}
              className={`w-9 h-9 rounded-full border flex items-center justify-center font-bold ${
                node === 'G' && isSolved
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                  : visitedNodes.includes(node)
                  ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              {node}
            </div>
          ))}
        </div>

        {/* Visited Sequence Stream */}
        <div className="pt-2 text-slate-400">
          Visited Order: <strong className="text-cyan-300">{visitedNodes.join(' ➔ ')}</strong>
        </div>
      </div>

      {/* Traversal Algorithm Selector */}
      <div className="space-y-2 font-mono text-xs">
        <span className="block uppercase text-slate-400">Select Graph Traversal Strategy:</span>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'BFS', label: 'BFS (Breadth-First Search - Queue)' },
            { id: 'DFS', label: 'DFS (Depth-First Search - Stack)' },
          ].map((alg) => (
            <button
              key={alg.id}
              onClick={() => handleExecuteTraversal(alg.id as any)}
              className={`p-3 rounded-xl border text-left transition-all ${
                traversalType === alg.id
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="block font-bold text-slate-200">{alg.id}</span>
              <span className="text-[10px] text-slate-400">{alg.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isSolved ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}
    </div>
  );
}
