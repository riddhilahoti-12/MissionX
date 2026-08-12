'use client';

import React, { useState } from 'react';
import { Cpu, Zap, CheckCircle2, ArrowRight, Table, Layers } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';

interface DpKnapsackPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function DpKnapsackPuzzle({ onSolve, onClose }: DpKnapsackPuzzleProps) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const items = [
    { id: 1, name: 'Packet Alpha (10MB)', weight: 10, value: 60 },
    { id: 2, name: 'Packet Beta (20MB)', weight: 20, value: 100 },
    { id: 3, name: 'Packet Gamma (30MB)', weight: 30, value: 120 },
  ];

  const totalWeight = selectedItems.reduce((acc, id) => acc + (items.find((i) => i.id === id)?.weight || 0), 0);
  const totalValue = selectedItems.reduce((acc, id) => acc + (items.find((i) => i.id === id)?.value || 0), 0);

  const toggleItem = (id: number) => {
    soundEngine.playClick();
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleVerifyKnapsack = () => {
    soundEngine.playClick();
    if (totalWeight <= 50 && totalValue === 220) {
      setIsSolved(true);
      setFeedbackMsg('✅ DP MEMOIZATION OPTIMAL: dp[3][50] = 220! Maximum payload value packed within 50MB bandwidth constraint!');
      soundEngine.playUnlockChime();
      if (onSolve) onSolve();
    } else if (totalWeight > 50) {
      setFeedbackMsg(`❌ CAPACITY OVERFLOW: Total weight ${totalWeight}MB exceeds 50MB bandwidth limit!`);
      soundEngine.playAlarmSiren();
    } else {
      setFeedbackMsg(`❌ SUB-OPTIMAL PAYLOAD: Total value $${totalValue} is not the DP maximum ($220).`);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-emerald-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-emerald-400">
          <Layers className="w-5 h-5" />
          <h3 className="font-mono font-bold text-lg text-white">Dynamic Programming 0/1 Knapsack Visualizer</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Pack the optimal subset of telemetry packet items into emergency memory (Max Capacity W = 50MB) to maximize DP memoization value `dp[n][W]`.
      </p>

      {/* Item Selector List */}
      <div className="space-y-3 font-mono text-xs">
        <span className="block uppercase text-slate-400">Available Telemetry Items:</span>
        <div className="space-y-2">
          {items.map((item) => {
            const isSelected = selectedItems.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`w-full p-3 rounded-xl border flex justify-between items-center transition-all ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="font-bold text-slate-200">{item.name}</span>
                <span>Weight: {item.weight}MB | Value: ${item.value}</span>
              </button>
            );
          })}
        </div>

        {/* Tally Bar */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
          <div>
            <span className="block text-[10px] text-slate-400 uppercase">Weight Capacity:</span>
            <span className={`font-bold font-mono ${totalWeight > 50 ? 'text-red-400' : 'text-cyan-400'}`}>
              {totalWeight} / 50 MB
            </span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 uppercase">DP Value Tally:</span>
            <span className="font-bold font-mono text-emerald-400 text-base">${totalValue}</span>
          </div>
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
        onClick={handleVerifyKnapsack}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
      >
        <span>VERIFY DP MEMOIZATION MATRIX</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
