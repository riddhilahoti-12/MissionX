'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import EscapeRoomCanvas from '@/components/3d/EscapeRoomCanvas';
import {
  Shield,
  Clock,
  Zap,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Play,
  Terminal,
  Cpu,
  ArrowRight,
  RotateCcw,
  XCircle,
  Radio,
  Lock,
  Unlock,
  Volume2,
  Activity,
} from 'lucide-react';

interface MissionPlayProps {
  params: {
    missionId: string;
  };
}

export default function MissionPlayPage({ params }: MissionPlayProps) {
  // Cinematic Intro Countdown State
  const [countdown, setCountdown] = useState<number | null>(5);
  const [showBriefing, setShowBriefing] = useState(true);

  // Gameplay State
  const [stage, setStage] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(2400); // 40 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [solenoidLocked, setSolenoidLocked] = useState(true);

  // Active Interactive Puzzle Modal State
  const [activePuzzle, setActivePuzzle] = useState<'ASTAR' | 'NEURAL' | 'SQL' | 'RFID' | null>(null);

  // Interactive Puzzle States
  // A* Puzzle State
  const [astarPath, setAstarPath] = useState<number[]>([0]);
  const [astarSolved, setAstarSolved] = useState(false);

  // Neural Net State
  const [weight1, setWeight1] = useState(0.4);
  const [weight2, setWeight2] = useState(0.6);
  const [neuralSolved, setNeuralSolved] = useState(false);

  // SQL Query State
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM patients WHERE status = 'LOCKED';");
  const [sqlSolved, setSqlSolved] = useState(false);

  // Cinematic Countdown Timer Effect
  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowBriefing(false);
      setCountdown(null);
      setIsTimerRunning(true);
    }
  }, [countdown]);

  // Game Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsLeft]);

  // Object Raycast Click Handler
  const handleObjectClick = (objectName: string) => {
    if (objectName.includes('RFID')) {
      setActivePuzzle('RFID');
    } else if (objectName.includes('A* Search')) {
      setActivePuzzle('ASTAR');
    } else if (objectName.includes('Neural')) {
      setActivePuzzle('NEURAL');
    } else if (objectName.includes('SQL')) {
      setActivePuzzle('SQL');
    }
  };

  // Puzzle Solvers
  const handleSolveAstar = () => {
    setAstarSolved(true);
    setStage(Math.max(stage, 2));
    setActivePuzzle(null);
  };

  const handleSolveNeural = () => {
    if (Math.abs(weight1 + weight2 - 1.0) < 0.05) {
      setNeuralSolved(true);
      setStage(Math.max(stage, 3));
      setActivePuzzle(null);
    }
  };

  const handleSolveSql = () => {
    if (sqlQuery.includes("status = 'CRITICAL'") || sqlQuery.includes('status="CRITICAL"')) {
      setSqlSolved(true);
      setStage(4);
      setSolenoidLocked(false);
      setActivePuzzle(null);
    }
  };

  // Format Time Helper
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      <Navbar />

      {/* Cinematic Intro Briefing Overlay */}
      {showBriefing && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-2xl space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-red-500/20 border border-red-500/50 text-xs font-mono text-red-400">
              <Volume2 className="w-4 h-4 animate-bounce" />
              <span>EMERGENCY BROADCAST TRANSMISSION</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              A CYBER ATTACK HAS DISABLED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-cyan-400">
                CITY EMERGENCY COMMUNICATIONS
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-mono bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
              Hospitals cannot receive critical patient telemetry. Autonomous emergency drones are malfunctioning. Thousands of lives depend on your team.
              <br />
              <span className="text-cyan-400 font-bold block mt-2">
                MISSION: Restore A* Pathfinding, recalibrate Neural Threat Weights, and unlock the Solenoid Vault Door.
              </span>
            </p>

            {/* Big Countdown Timer */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 tracking-widest">MISSION INITIATION IN</span>
              <div className="text-7xl font-black font-mono text-cyan-400 animate-pulse shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                {countdown}
              </div>
            </div>

            <button
              onClick={() => {
                setShowBriefing(false);
                setCountdown(null);
                setIsTimerRunning(true);
              }}
              className="px-8 py-3.5 rounded-xl font-bold font-mono text-sm bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all transform hover:scale-105"
            >
              SKIP BRIEFING & ENTER 3D VAULT
            </button>
          </div>
        </div>
      )}

      {/* Main Mission Gameplay Interface */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top HUD Bar */}
        <div className="glass-panel p-4 rounded-2xl border-cyan-500/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-sm font-black text-white uppercase tracking-wider">
                MISSION: {params.missionId.toUpperCase()}
              </span>
              <span className="text-[11px] font-mono text-slate-400">Target: Quantum AI Command Vault</span>
            </div>
          </div>

          {/* Clock & Stage Indicators */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-xl">
              <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="font-mono text-xl font-black text-cyan-400 tracking-wider">
                {formatTime(secondsLeft)}
              </span>
            </div>

            <div className="flex items-center space-x-2 bg-purple-500/10 border border-purple-500/30 px-3 py-1.5 rounded-xl text-purple-300 font-mono text-xs">
              <Activity className="w-4 h-4 text-purple-400" />
              <span>STAGE {stage} OF 4</span>
            </div>
          </div>
        </div>

        {/* 3D Escape Room Canvas & HUD Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 3D WebGL Canvas Viewport (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <div className="relative w-full h-[520px]">
              <EscapeRoomCanvas onObjectClick={handleObjectClick} stage={stage} />
            </div>
          </div>

          {/* Side Mission Objectives & Sensor Feeds (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Stage Objectives Checklist */}
            <div className="glass-panel p-5 rounded-2xl border-cyan-500/20 space-y-4">
              <h3 className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-bold flex items-center justify-between">
                <span>Room Objectives</span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </h3>

              <div className="space-y-3 font-mono text-xs">
                {/* Obj 1 */}
                <div
                  onClick={() => setActivePuzzle('RFID')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    stage >= 1 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>1. Verify RFID Keycard</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">DONE</span>
                </div>

                {/* Obj 2 */}
                <div
                  onClick={() => setActivePuzzle('ASTAR')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    astarSolved ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-indigo-400" />
                    <span>2. A* Pathfinding Grid</span>
                  </div>
                  <span className="text-[10px] font-bold">{astarSolved ? 'SOLVED' : 'ACTIVE'}</span>
                </div>

                {/* Obj 3 */}
                <div
                  onClick={() => setActivePuzzle('NEURAL')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    neuralSolved ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span>3. Calibrate Neural Weights</span>
                  </div>
                  <span className="text-[10px] font-bold">{neuralSolved ? 'SOLVED' : 'LOCKED'}</span>
                </div>

                {/* Obj 4 */}
                <div
                  onClick={() => setActivePuzzle('SQL')}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    sqlSolved ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {solenoidLocked ? <Lock className="w-4 h-4 text-red-400" /> : <Unlock className="w-4 h-4 text-emerald-400" />}
                    <span>4. Unlock Solenoid Vault</span>
                  </div>
                  <span className="text-[10px] font-bold">{sqlSolved ? 'ESCAPED' : 'FINAL'}</span>
                </div>
              </div>
            </div>

            {/* Real-time MQTT Sensor Telemetry */}
            <div className="glass-panel p-5 rounded-2xl border-purple-500/20 space-y-3">
              <h3 className="text-xs font-mono uppercase text-purple-400 tracking-wider font-bold flex items-center justify-between">
                <span>Hardware Telemetry</span>
                <Radio className="w-4 h-4 text-purple-400 animate-ping" />
              </h3>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>ESP32 Sensor Array:</span>
                  <span className="text-emerald-400">CONNECTED</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Solenoid Vault Lock:</span>
                  <span className={solenoidLocked ? 'text-red-400' : 'text-emerald-400'}>
                    {solenoidLocked ? 'LOCKED' : 'UNLOCKED'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Laser Security Grid:</span>
                  <span className="text-amber-400">ARMED (0 Tripped)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Interactive Puzzle Modal Overlays */}
      {activePuzzle === 'ASTAR' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl border-indigo-500/40 max-w-lg w-full space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-400" />
                A* Search Pathfinding Visualizer Puzzle
              </h3>
              <button onClick={() => setActivePuzzle(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-slate-300 font-mono leading-relaxed">
              Find the optimal shortest path through the hazard grid avoiding obstacles. Select nodes from Start (0,0) to Goal (3,3).
            </p>

            {/* 4x4 Grid Visualizer */}
            <div className="grid grid-cols-4 gap-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              {Array.from({ length: 16 }).map((_, idx) => {
                const isSelected = astarPath.includes(idx);
                const isObstacle = idx === 5 || idx === 9 || idx === 10;
                return (
                  <button
                    key={idx}
                    disabled={isObstacle}
                    onClick={() => {
                      if (!isSelected) setAstarPath([...astarPath, idx]);
                    }}
                    className={`h-14 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center ${
                      idx === 0
                        ? 'bg-emerald-500 text-slate-950'
                        : idx === 15
                        ? 'bg-amber-500 text-slate-950'
                        : isObstacle
                        ? 'bg-red-950/80 text-red-500 border border-red-500/30 cursor-not-allowed'
                        : isSelected
                        ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {idx === 0 ? 'START' : idx === 15 ? 'GOAL' : isObstacle ? 'HAZARD' : `(${Math.floor(idx/4)},${idx%4})`}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleSolveAstar}
              className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-indigo-500 hover:bg-indigo-400 text-slate-950 transition-colors"
            >
              EXECUTE A* PATH & ADVANCE TO STAGE 2
            </button>
          </div>
        </div>
      )}

      {activePuzzle === 'NEURAL' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl border-cyan-500/40 max-w-lg w-full space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                Neural Network Hidden Layer Balancer
              </h3>
              <button onClick={() => setActivePuzzle(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-slate-300 font-mono leading-relaxed">
              Calibrate hidden neuron weights W1 and W2 such that their sum equals 1.0 (Current Sum: {(weight1 + weight2).toFixed(2)}).
            </p>

            <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Weight W1: {weight1.toFixed(2)}</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={weight1}
                  onChange={(e) => setWeight1(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Weight W2: {weight2.toFixed(2)}</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={weight2}
                  onChange={(e) => setWeight2(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>

            <button
              onClick={handleSolveNeural}
              className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
            >
              COMMIT WEIGHTS & ADVANCE TO STAGE 3
            </button>
          </div>
        </div>
      )}

      {activePuzzle === 'SQL' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl border-amber-500/40 max-w-lg w-full space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-amber-400" />
                SQL Medical Vault Decryption Query
              </h3>
              <button onClick={() => setActivePuzzle(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-slate-300 font-mono leading-relaxed">
              Repair the SQL query to target records where status is 'CRITICAL' to disengage the Solenoid Vault Lock.
            </p>

            <textarea
              rows={3}
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs font-mono text-amber-300 outline-none focus:border-amber-400"
            />

            <button
              onClick={handleSolveSql}
              className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
            >
              RUN QUERY & UNLOCK VAULT DOOR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
