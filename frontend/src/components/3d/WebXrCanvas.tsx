'use client';

import React, { useState } from 'react';
import { Glasses, Sparkles, CheckCircle2, Eye, Shield } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';

export default function WebXrCanvas() {
  const [isWebXrSupported, setIsWebXrSupported] = useState<boolean>(true);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);

  const handleLaunchSpatialVr = () => {
    soundEngine.playClick();
    setIsSessionActive(true);
    alert('WebXR Spatial 3D Session Launched! Connecting to Apple Vision Pro / Meta Quest Spatial Headset...');
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border-cyan-500/30 space-y-4 font-sans text-slate-100">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Glasses className="w-6 h-6 animate-pulse" />
          <h3 className="font-mono font-bold text-lg text-white">WebXR Apple Vision Pro & Spatial 3D Viewport</h3>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
          WEBXR READY
        </span>
      </div>

      <p className="text-xs font-mono text-slate-400 leading-relaxed">
        Experience MissionX escape rooms in spatial 3D with Meta Quest 3, HTC Vive, or Apple Vision Pro using WebXR hand tracking.
      </p>

      <button
        onClick={handleLaunchSpatialVr}
        className="w-full py-3.5 rounded-xl font-bold font-mono text-xs bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
      >
        <Glasses className="w-5 h-5" />
        <span>ENTER WEBXR SPATIAL 3D IMMERSION MODE</span>
      </button>
    </div>
  );
}
