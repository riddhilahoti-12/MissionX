'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import {
  Shield,
  ShieldAlert,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Eye,
  Camera,
  Lock,
  Unlock,
  Radio,
  Zap,
  AlertTriangle,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  Terminal,
  Activity,
  CheckCircle2,
} from 'lucide-react';

interface LogItem {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  message: string;
}

export default function GameMasterDashboard() {
  // Active Room Selection
  const [selectedRoom, setSelectedRoom] = useState('ROOM_101');

  // Timer State
  const [secondsLeft, setSecondsLeft] = useState(2400); // 40 minutes default
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState(2); // Stage 2 of 4

  // CCTV Simulation State
  const [activeCam, setActiveCam] = useState<'cam1' | 'cam2' | 'cam3' | 'cam4'>('cam1');
  const [visionMode, setVisionMode] = useState<'normal' | 'thermal' | 'nightvision'>('normal');

  // Hardware Override States
  const [solenoidLocked, setSolenoidLocked] = useState(true);
  const [laserGridArmed, setLaserGridArmed] = useState(true);
  const [rfidBypassed, setRfidBypassed] = useState(false);
  const [alarmActive, setAlarmActive] = useState(false);
  const [lightingMode, setLightingMode] = useState<'cyan' | 'red' | 'strobe' | 'white'>('cyan');

  // Hint Dispatcher State
  const [customHint, setCustomHint] = useState('');
  const [hintsSentCount, setHintsSentCount] = useState(2);
  const [deductPenalty, setDeductPenalty] = useState(true);

  // Live Console Logs
  const [logs, setLogs] = useState<LogItem[]>([
    {
      id: '1',
      timestamp: new Date().toLocaleTimeString(),
      type: 'info',
      message: 'Game Master Console linked to ROOM_101 (Quantum AI Vault).',
    },
    {
      id: '2',
      timestamp: new Date().toLocaleTimeString(),
      type: 'success',
      message: 'Stage 1 Completed: RFID Keycard verified by Team Alpha.',
    },
    {
      id: '3',
      timestamp: new Date().toLocaleTimeString(),
      type: 'warning',
      message: 'Stage 2 In Progress: A* Search Pathfinding Puzzle initiated.',
    },
  ]);

  // Helper to add console logs
  const addLog = (type: LogItem['type'], message: string) => {
    const newLog: LogItem = {
      id: Math.random().toString(),
      timestamp: new Date().toLocaleTimeString(),
      type,
      message,
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  // Timer Interval Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      addLog('danger', 'CRITICAL: Mission Timer expired! Room Lockdown triggered.');
      setAlarmActive(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsLeft]);

  // Timer Controls
  const toggleTimer = () => {
    const nextState = !isTimerRunning;
    setIsTimerRunning(nextState);
    addLog('info', `Mission Timer ${nextState ? 'RESUMED' : 'PAUSED'} by Game Master.`);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setSecondsLeft(2400);
    addLog('warning', 'Mission Timer reset to 40:00.');
  };

  const addTime = (mins: number) => {
    setSecondsLeft((prev) => prev + mins * 60);
    addLog('success', `Added +${mins} minutes bonus time to Mission Clock.`);
  };

  const subtractTimePenalty = (mins: number) => {
    setSecondsLeft((prev) => Math.max(0, prev - mins * 60));
    addLog('danger', `Deducted -${mins} minutes penalty from Mission Clock!`);
  };

  // Hardware Overrides
  const toggleSolenoid = () => {
    const nextState = !solenoidLocked;
    setSolenoidLocked(nextState);
    addLog('warning', `Solenoid Door Lock ${nextState ? 'LOCKED (Sealed)' : 'OVERRIDDEN & UNLOCKED'}`);
  };

  const toggleLaserGrid = () => {
    const nextState = !laserGridArmed;
    setLaserGridArmed(nextState);
    addLog('info', `Laser Security Grid ${nextState ? 'ARMED' : 'DISARMED'}`);
  };

  const toggleRfidBypass = () => {
    const nextState = !rfidBypassed;
    setRfidBypassed(nextState);
    addLog('success', `RFID Reader Bypass ${nextState ? 'ACTIVATED' : 'DEACTIVATED'}`);
  };

  const toggleAlarm = () => {
    const nextState = !alarmActive;
    setAlarmActive(nextState);
    addLog(nextState ? 'danger' : 'info', `Security Siren ${nextState ? 'TRIGGERED & LOUD ALARM ACTIVE' : 'SILENCED'}`);
  };

  // Hint Dispatcher
  const handleSendHint = (hintText: string) => {
    if (!hintText.trim()) return;
    setHintsSentCount((prev) => prev + 1);
    if (deductPenalty) {
      subtractTimePenalty(2);
    }
    addLog('info', `HINT BROADCAST to Player HUD: "${hintText}"`);
    setCustomHint('');
  };

  // Format Time Helper
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isUrgent = secondsLeft < 300;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Dashboard Header Bar */}
        <div className="glass-panel p-6 rounded-2xl border-cyan-500/20 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-black tracking-wide text-white">GAME MASTER COMMAND CENTER</h1>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  LIVE CONSOLE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Real-time room monitoring, countdown sync, automated hint penalties, and sensor overrides.
              </p>
            </div>
          </div>

          {/* Room Selector & Master Emergency Toggle */}
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-end">
            <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-700/80 px-3 py-2 rounded-xl">
              <span className="text-xs font-mono text-slate-400 uppercase">Active Room:</span>
              <select
                value={selectedRoom}
                onChange={(e) => {
                  setSelectedRoom(e.target.value);
                  addLog('info', `Switched active monitor stream to ${e.target.value}`);
                }}
                className="bg-transparent text-cyan-400 font-mono font-bold text-sm outline-none cursor-pointer"
              >
                <option value="ROOM_101" className="bg-slate-900 text-slate-200">ROOM 101 - Quantum AI Lab</option>
                <option value="ROOM_102" className="bg-slate-900 text-slate-200">ROOM 102 - IoT Cyber Core</option>
                <option value="ROOM_103" className="bg-slate-900 text-slate-200">ROOM 103 - Neural Bunker</option>
              </select>
            </div>

            <button
              onClick={() => {
                setSolenoidLocked(true);
                setAlarmActive(!alarmActive);
                addLog('danger', 'EMERGENCY PROTOCOL TRIGGERED: Master Lockdown Initiated.');
              }}
              className="px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 flex items-center space-x-2 shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all"
            >
              <ShieldAlert className="w-4 h-4 animate-pulse text-red-400" />
              <span>EMERGENCY LOCKDOWN</span>
            </button>
          </div>
        </div>

        {/* Core Controls Section (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Timer, Stage Status, Hardware Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Mission Timer & Clock Controls Card */}
            <div className="glass-panel p-6 rounded-2xl border-cyan-500/20 relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Clock className="w-5 h-5" />
                  <h2 className="font-mono font-bold uppercase tracking-wider text-sm">Mission Clock & Penalty Engine</h2>
                </div>
                <span className="text-xs font-mono text-slate-400">Target Time: 40:00</span>
              </div>

              {/* Big Digital Clock */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-950/80 p-6 rounded-xl border border-slate-800">
                <div className="text-center sm:text-left">
                  <div
                    className={`font-mono text-5xl sm:text-6xl font-black tracking-widest ${
                      secondsLeft === 0
                        ? 'text-red-500 animate-pulse'
                        : isUrgent
                        ? 'text-red-400 animate-pulse'
                        : 'text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                    }`}
                  >
                    {formatTime(secondsLeft)}
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-2 flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${isTimerRunning ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                    <span>STATUS: {isTimerRunning ? 'TIMER RUNNING' : 'TIMER PAUSED'}</span>
                  </div>
                </div>

                {/* Clock Actions */}
                <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
                  <button
                    onClick={toggleTimer}
                    className={`px-4 py-2.5 rounded-xl font-bold font-mono text-xs flex items-center space-x-2 transition-all ${
                      isTimerRunning
                        ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isTimerRunning ? 'PAUSE' : 'START'}</span>
                  </button>

                  <button
                    onClick={resetTimer}
                    className="px-3 py-2.5 rounded-xl font-mono text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center space-x-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>RESET</span>
                  </button>
                </div>
              </div>

              {/* Time Boost & Penalty Quick Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <button
                  onClick={() => addTime(5)}
                  className="py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center justify-center space-x-1 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+5 MIN BOOST</span>
                </button>
                <button
                  onClick={() => addTime(2)}
                  className="py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center justify-center space-x-1 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+2 MIN BOOST</span>
                </button>
                <button
                  onClick={() => subtractTimePenalty(3)}
                  className="py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 font-mono text-xs flex items-center justify-center space-x-1 transition-all"
                >
                  <Minus className="w-3.5 h-3.5" />
                  <span>-3 MIN HINT PENALTY</span>
                </button>
                <button
                  onClick={() => subtractTimePenalty(5)}
                  className="py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 font-mono text-xs flex items-center justify-center space-x-1 transition-all"
                >
                  <Minus className="w-3.5 h-3.5" />
                  <span>-5 MIN PENALTY</span>
                </button>
              </div>

              {/* Mission Stage Stepper */}
              <div className="mt-6 pt-6 border-t border-slate-800">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono text-slate-400 uppercase">Current Mission Stage</span>
                  <span className="text-xs font-mono font-bold text-cyan-400">STAGE {currentStage} OF 4</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { num: 1, title: 'RFID Keycard' },
                    { num: 2, title: 'A* Pathfinding' },
                    { num: 3, title: 'Neural Weights' },
                    { num: 4, title: 'Vault Extraction' },
                  ].map((stage) => (
                    <button
                      key={stage.num}
                      onClick={() => {
                        setCurrentStage(stage.num);
                        addLog('info', `Game Master updated mission progress to Stage ${stage.num}: ${stage.title}`);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        currentStage === stage.num
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                          : stage.num < currentStage
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                        <span>STAGE {stage.num}</span>
                        {stage.num < currentStage ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        ) : currentStage === stage.num ? (
                          <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
                        ) : null}
                      </div>
                      <div className="text-xs font-semibold truncate mt-1">{stage.title}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hardware Actuator & Sensor Overrides */}
            <div className="glass-panel p-6 rounded-2xl border-purple-500/20 space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-purple-400">
                  <Zap className="w-5 h-5" />
                  <h2 className="font-mono font-bold uppercase tracking-wider text-sm">Hardware Actuator Overrides</h2>
                </div>
                <span className="text-[10px] font-mono bg-purple-500/10 border border-purple-500/30 text-purple-300 px-2 py-0.5 rounded-full">
                  MQTT ACTIVE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Solenoid Door Override */}
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-lg ${solenoidLocked ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {solenoidLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                    </div>
                    <div>
                      <span className="block text-xs font-mono font-bold text-slate-200">Solenoid Vault Door</span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {solenoidLocked ? 'LOCKED (Sealed)' : 'UNLOCKED (Open)'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={toggleSolenoid}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      solenoidLocked
                        ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                        : 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40'
                    }`}
                  >
                    {solenoidLocked ? 'UNLOCK' : 'LOCK'}
                  </button>
                </div>

                {/* Laser Security Grid */}
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-lg ${laserGridArmed ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-mono font-bold text-slate-200">Laser Grid System</span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {laserGridArmed ? 'ARMED (Tripped=0)' : 'DISARMED'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={toggleLaserGrid}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      laserGridArmed
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                        : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {laserGridArmed ? 'DISARM' : 'ARM GRID'}
                  </button>
                </div>

                {/* RFID Bypass */}
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-lg ${rfidBypassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                      <Radio className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-mono font-bold text-slate-200">RFID Antenna Bypass</span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {rfidBypassed ? 'BYPASSED' : 'NORMAL SCAN'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={toggleRfidBypass}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      rfidBypassed
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                        : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {rfidBypassed ? 'RESET' : 'BYPASS'}
                  </button>
                </div>

                {/* Alarm Siren */}
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-lg ${alarmActive ? 'bg-red-500/20 text-red-400 animate-bounce' : 'bg-slate-800 text-slate-400'}`}>
                      {alarmActive ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    </div>
                    <div>
                      <span className="block text-xs font-mono font-bold text-slate-200">Room Siren Alarm</span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {alarmActive ? 'ALARM SIREN ACTIVE' : 'SILENCED'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={toggleAlarm}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      alarmActive
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                        : 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40'
                    }`}
                  >
                    {alarmActive ? 'SILENCE' : 'SOUND SIREN'}
                  </button>
                </div>
              </div>

              {/* Ambient Room Lighting Control */}
              <div className="pt-4 border-t border-slate-800">
                <span className="block text-xs font-mono text-slate-400 uppercase mb-3">Ambient Lighting Theme Preset</span>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'cyan', label: 'Stealth Cyan', color: 'border-cyan-400 text-cyan-300 bg-cyan-950/40' },
                    { id: 'red', label: 'Threat Red', color: 'border-red-400 text-red-300 bg-red-950/40' },
                    { id: 'strobe', label: 'Strobe Flash', color: 'border-amber-400 text-amber-300 bg-amber-950/40' },
                    { id: 'white', label: 'Full White', color: 'border-slate-300 text-slate-200 bg-slate-800/40' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => {
                        setLightingMode(mode.id as any);
                        addLog('info', `Ambient lighting switched to profile: ${mode.label}`);
                      }}
                      className={`p-2 rounded-lg border text-xs font-mono font-bold transition-all text-center ${
                        lightingMode === mode.id ? `${mode.color} shadow-[0_0_10px_rgba(0,0,0,0.5)]` : 'border-slate-800 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: CCTV Feed, Hint Engine, Event Console */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Room CCTV Simulation Card */}
            <div className="glass-panel p-6 rounded-2xl border-slate-700/60 flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Camera className="w-5 h-5" />
                  <h2 className="font-mono font-bold uppercase tracking-wider text-sm">Room CCTV Telemetry Feed</h2>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* Simulated Camera Display Screen */}
              <div
                className={`relative w-full h-56 rounded-xl border border-cyan-500/30 overflow-hidden flex flex-col justify-between p-4 transition-all ${
                  visionMode === 'thermal'
                    ? 'bg-gradient-to-br from-purple-950 via-red-950 to-amber-950'
                    : visionMode === 'nightvision'
                    ? 'bg-gradient-to-b from-emerald-950 to-slate-950 text-emerald-400'
                    : 'bg-gradient-to-b from-slate-900 to-slate-950'
                }`}
              >
                {/* Scanline overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

                {/* Top Overlay Bar */}
                <div className="relative z-10 flex justify-between items-center text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700 text-cyan-300">
                    FEED: {activeCam.toUpperCase()} ({activeCam === 'cam1' ? 'Entry Vault' : activeCam === 'cam2' ? 'Laser Grid' : activeCam === 'cam3' ? 'AI Rack' : 'Exit Gate'})
                  </span>
                  <span className="px-2 py-0.5 rounded bg-red-950/80 border border-red-500/40 text-red-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" /> REC
                  </span>
                </div>

                {/* Center Visual Content */}
                <div className="relative z-10 text-center space-y-2">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-950/70 border border-slate-700 text-xs font-mono text-slate-300">
                    <Eye className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span>Mode: {visionMode.toUpperCase()} | FPS: 60 | Signal: 100%</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    [SIMULATED FEED: TEAM ALPHA IN ROOM 101]
                  </div>
                </div>

                {/* Bottom Overlay Controls */}
                <div className="relative z-10 flex justify-between items-center text-[10px] font-mono">
                  <div className="flex space-x-1">
                    {(['cam1', 'cam2', 'cam3', 'cam4'] as const).map((cam) => (
                      <button
                        key={cam}
                        onClick={() => setActiveCam(cam)}
                        className={`px-2 py-1 rounded border ${
                          activeCam === cam ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {cam.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <div className="flex space-x-1">
                    {(['normal', 'thermal', 'nightvision'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setVisionMode(mode)}
                        className={`px-2 py-1 rounded border capitalize ${
                          visionMode === mode ? 'bg-purple-500/30 border-purple-400 text-purple-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Automated Hint & Penalty Broadcast Engine */}
            <div className="glass-panel p-6 rounded-2xl border-amber-500/20 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-amber-400">
                  <Sparkles className="w-5 h-5" />
                  <h2 className="font-mono font-bold uppercase tracking-wider text-sm">Hint Broadcast Engine</h2>
                </div>
                <span className="text-xs font-mono text-slate-400">Hints Sent: {hintsSentCount}/5</span>
              </div>

              {/* Quick Domain Hint Chips */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Quick Preset Hints:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Check A* Manhattan distance formula on white board.',
                    'Scan RFID tag key near the server power module.',
                    'Neural weights must sum to 1.0 on hidden layer.',
                    'Query SQL injection: SELECT * FROM vault_keys;',
                  ].map((presetHint, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendHint(presetHint)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono transition-colors text-left truncate max-w-full"
                    >
                      + Send "{presetHint.slice(0, 35)}..."
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Hint Input Box */}
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type custom hint message for player HUD..."
                    value={customHint}
                    onChange={(e) => setCustomHint(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendHint(customHint);
                    }}
                    className="w-full bg-slate-900/90 border border-slate-700 focus:border-amber-400 rounded-xl px-4 py-2.5 text-slate-200 font-mono text-xs outline-none transition-colors pr-10"
                  />
                  <button
                    onClick={() => handleSendHint(customHint)}
                    className="absolute right-2 top-2 p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                <label className="flex items-center space-x-2 text-xs font-mono text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deductPenalty}
                    onChange={(e) => setDeductPenalty(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-amber-400"
                  />
                  <span>Automatically deduct -2 minutes hint penalty upon broadcast</span>
                </label>
              </div>
            </div>

            {/* Real-time Activity Log Terminal */}
            <div className="glass-panel p-6 rounded-2xl border-slate-700/50 flex flex-col space-y-3 h-[320px]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Terminal className="w-4 h-4" />
                  <h2 className="font-mono font-bold uppercase tracking-wider text-xs">Live Event Audit Stream</h2>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{logs.length} Events Logged</span>
              </div>

              <div className="flex-1 bg-slate-950 rounded-xl p-3 font-mono text-[11px] overflow-y-auto space-y-2 border border-slate-800/80">
                {logs.map((log) => (
                  <div key={log.id} className="flex space-x-2 items-start leading-relaxed border-b border-slate-900 pb-1.5">
                    <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                    <span
                      className={`break-words ${
                        log.type === 'danger'
                          ? 'text-red-400 font-bold'
                          : log.type === 'warning'
                          ? 'text-amber-300'
                          : log.type === 'success'
                          ? 'text-emerald-400'
                          : 'text-cyan-300'
                      }`}
                    >
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 mt-12 text-center text-xs font-mono text-slate-500">
        MissionX Game Master Command & Control Console • Real-Time Socket.io & MQTT Bridge Sync
      </footer>
    </div>
  );
}
