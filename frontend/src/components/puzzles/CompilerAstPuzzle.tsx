'use client';

import React, { useState } from 'react';
import { Terminal, Code, CheckCircle2, ArrowRight, GitBranch, Cpu } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface CompilerAstPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function CompilerAstPuzzle({ onSolve, onClose }: CompilerAstPuzzleProps) {
  const [tokens, setTokens] = useState<string[]>(['LET', 'X', '=', '10', '+', '20']);
  const [isAstBuilt, setIsAstBuilt] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleBuildAst = () => {
    soundEngine.playClick();
    setIsAstBuilt(true);
    setFeedbackMsg('✅ AST SYNTAX TREE PARSED: Abstract Syntax Tree root assignment node (x = 10 + 20) compiled into bytecode!');
    soundEngine.playUnlockChime();
    aiVoiceNarrator.speakSuccess();
    if (onSolve) onSolve();
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-cyan-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Code className="w-5 h-5" />
          <h3 className="font-mono font-bold text-lg text-white">Compiler Lexical Analyzer & AST Parser</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Tokenize raw string expression <code className="text-amber-400">let x = 10 + 20</code> into Lexical Tokens and construct the root Abstract Syntax Tree (AST).
      </p>

      {/* Lexical Tokens Display */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
        <span className="block text-slate-400 uppercase text-[10px]">Lexical Tokens Stream:</span>
        <div className="flex flex-wrap gap-2">
          {tokens.map((tok, i) => (
            <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-900 text-cyan-300 border border-slate-800 font-bold">
              {tok}
            </span>
          ))}
        </div>

        {/* Parsed AST Preview */}
        {isAstBuilt && (
          <div className="pt-3 border-t border-slate-800 space-y-2 text-center">
            <span className="block text-[10px] text-slate-400 uppercase">Constructed AST Hierarchy:</span>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-amber-300 font-bold space-y-1">
              <div>AssignmentNode (=)</div>
              <div className="text-xs text-purple-400">├── Identifier: x</div>
              <div className="text-xs text-emerald-400">└── BinaryOp (+): 10 + 20</div>
            </div>
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono font-bold ${
            isAstBuilt ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
          }`}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleBuildAst}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
      >
        <span>PARSE TOKENS & GENERATE AST</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
