'use client';

import React, { useState } from 'react';
import { Lock, Unlock, Key, ArrowRight, ShieldCheck, Terminal, Cpu } from 'lucide-react';

interface CipherPuzzleProps {
  onSolve?: () => void;
  onClose?: () => void;
}

export default function CipherPuzzle({ onSolve, onClose }: CipherPuzzleProps) {
  // Target: Encrypted ciphertext "0x5A4F7F" requires applying XOR key "0x3F" to produce plaintext "0x657061" (UNLOCK)
  const [xorKeyHex, setXorKeyHex] = useState<string>('0x10');
  const [decryptedOutput, setDecryptedOutput] = useState<string>('0x4A5F6F (GARBLED)');
  const [isSolved, setIsSolved] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleApplyXor = () => {
    if (xorKeyHex.toUpperCase() === '0x3F' || xorKeyHex.toUpperCase() === '3F') {
      setDecryptedOutput('0x657061 ("UNLOCK_VAULT_KEY_7")');
      setIsSolved(true);
      setFeedbackMsg('✅ CIPHER DECODED: Bitwise XOR key 0x3F matched! Ransomware encryption payload disengaged!');
      if (onSolve) onSolve();
    } else {
      setDecryptedOutput('0x4F2A19 (INVALID DECRYPTION)');
      setFeedbackMsg(`❌ DECRYPTION FAILED: Key ${xorKeyHex} produced invalid plaintext checksum.`);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-red-500/40 max-w-xl w-full space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-red-400">
          <Key className="w-5 h-5" />
          <h3 className="font-mono font-bold text-lg text-white">Cyber Security XOR Cryptography Decoder</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        )}
      </div>

      <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
        Ransomware attackers encrypted the solenoid key payload with bitwise XOR key shift. Enter the matching 8-bit hex key to restore the plaintext checksum.
      </p>

      {/* Hex Key Selection Options */}
      <div className="space-y-4 font-mono text-xs">
        <div>
          <label className="block text-slate-400 uppercase mb-1">Select XOR Key Shift (Hexadecimal)</label>
          <div className="grid grid-cols-4 gap-2">
            {['0x10', '0x2A', '0x3F', '0x7B'].map((keyOption) => (
              <button
                key={keyOption}
                onClick={() => setXorKeyHex(keyOption)}
                className={`p-3 rounded-xl border font-bold text-center transition-all ${
                  xorKeyHex === keyOption
                    ? 'bg-red-500/20 border-red-400 text-red-300 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {keyOption}
              </button>
            ))}
          </div>
        </div>

        {/* Decrypted Stream Monitor */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Target Ciphertext: <strong className="text-red-400">0x5A4F7F</strong></span>
            <span>Selected Key: <strong className="text-amber-400">{xorKeyHex}</strong></span>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-cyan-300 font-bold flex justify-between items-center">
            <span>Decrypted Output: {decryptedOutput}</span>
            {isSolved && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
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
        onClick={handleApplyXor}
        className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-red-500 hover:bg-red-400 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all"
      >
        <span>EXECUTE XOR KEY SHIFT & DECODE</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
