'use client';

import React, { useState } from 'react';
import { Wifi, ShieldAlert, CheckCircle2, ArrowRight, RefreshCw, Network } from 'lucide-react';

interface SubnetRoutingPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function SubnetRoutingPuzzle({ onSolve, onClose }: SubnetRoutingPuzzleProps) {
  // Target: Route 192.168.1.0/26 (Subnet mask 255.255.255.192, 64 hosts) to Gateway Router A
  const [selectedCidr, setSelectedCidr] = useState<string>('/24');
  const [targetIp, setTargetIp] = useState<string>('192.168.1.64');
  const [gatewaySelected, setGatewaySelected] = useState<string>('GATEWAY_A');
  const [isSolved, setIsSolved] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleTestRoute = () => {
    if (selectedCidr === '/26' && gatewaySelected === 'GATEWAY_A') {
      setIsSolved(true);
      setFeedbackMsg('✅ ROUTE VERIFIED: Subnet 192.168.1.0/26 successfully routed to Gateway Router A. Packet loss 0%!');
      if (onSolve) onSolve();
    } else {
      setFeedbackMsg('❌ ROUTING MISCONFIGURATION: Invalid CIDR subnet mask or gateway interface selected for 64 hosts.');
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-cyan-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Network className="w-5 h-5" />
          <h3 className="font-mono font-bold text-lg text-white">VLSM Subnetting & Packet Router Puzzle</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Emergency packet stream requires isolating 64 host addresses for Hospital District B. Calculate the correct VLSM CIDR prefix and assign the target Gateway Interface.
      </p>

      {/* Inputs Form */}
      <div className="space-y-4 font-mono text-xs">
        {/* CIDR Netmask Selector */}
        <div>
          <label className="block text-slate-400 uppercase mb-1">Target CIDR Prefix (Host Count: 64)</label>
          <div className="grid grid-cols-4 gap-2">
            {['/24 (256 hosts)', '/25 (128 hosts)', '/26 (64 hosts)', '/28 (16 hosts)'].map((opt) => {
              const prefix = opt.split(' ')[0];
              return (
                <button
                  key={prefix}
                  onClick={() => setSelectedCidr(prefix)}
                  className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                    selectedCidr === prefix
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gateway Selection */}
        <div>
          <label className="block text-slate-400 uppercase mb-1">Target Gateway Router Interface</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'GATEWAY_A', label: 'Gateway Router A (Subnet .0/26 Interface)' },
              { id: 'GATEWAY_B', label: 'Gateway Router B (Broadband Trunk .128)' },
            ].map((gw) => (
              <button
                key={gw.id}
                onClick={() => setGatewaySelected(gw.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  gatewaySelected === gw.id
                    ? 'bg-purple-500/20 border-purple-400 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <span className="block font-bold text-slate-200">{gw.id}</span>
                <span className="text-[10px] text-slate-400">{gw.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback Message Banner */}
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
        onClick={handleTestRoute}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
      >
        <span>TRANSMIT TEST PACKET BURST</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
