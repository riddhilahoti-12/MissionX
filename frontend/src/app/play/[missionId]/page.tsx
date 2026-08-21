'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import EscapeRoomCanvas from '@/components/3d/EscapeRoomCanvas';
import SubnetRoutingPuzzle from '@/components/puzzles/SubnetRoutingPuzzle';
import AvlTreePuzzle from '@/components/puzzles/AvlTreePuzzle';
import CipherPuzzle from '@/components/puzzles/CipherPuzzle';
import SqlJoinPuzzle from '@/components/puzzles/SqlJoinPuzzle';
import PageReplacementPuzzle from '@/components/puzzles/PageReplacementPuzzle';
import DpKnapsackPuzzle from '@/components/puzzles/DpKnapsackPuzzle';
import GraphTraversalPuzzle from '@/components/puzzles/GraphTraversalPuzzle';
import MinimaxPuzzle from '@/components/puzzles/MinimaxPuzzle';
import QuantumBb84Puzzle from '@/components/puzzles/QuantumBb84Puzzle';
import CnnFilterPuzzle from '@/components/puzzles/CnnFilterPuzzle';
import CompilerAstPuzzle from '@/components/puzzles/CompilerAstPuzzle';
import RaftConsensusPuzzle from '@/components/puzzles/RaftConsensusPuzzle';
import BlockchainPoWPuzzle from '@/components/puzzles/BlockchainPoWPuzzle';
import MapReducePuzzle from '@/components/puzzles/MapReducePuzzle';
import PaxosConsensusPuzzle from '@/components/puzzles/PaxosConsensusPuzzle';
import ZkpPuzzle from '@/components/puzzles/ZkpPuzzle';
import FederatedLearningPuzzle from '@/components/puzzles/FederatedLearningPuzzle';
import BTreeIndexPuzzle from '@/components/puzzles/BTreeIndexPuzzle';
import RaftSnapshotPuzzle from '@/components/puzzles/RaftSnapshotPuzzle';
import AutoencoderPuzzle from '@/components/puzzles/AutoencoderPuzzle';
import TransformerAttentionPuzzle from '@/components/puzzles/TransformerAttentionPuzzle';
import PbftConsensusPuzzle from '@/components/puzzles/PbftConsensusPuzzle';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';
import { io, Socket } from 'socket.io-client';
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
  Users,
  MessageSquare,
  Lightbulb,
  Send,
  HelpCircle,
} from 'lucide-react';

interface MissionPlayProps {
  params: {
    missionId: string;
  };
}

interface TeamPlayer {
  socketId: string;
  userName: string;
  userRole: string;
  inspectingObject: string | null;
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

  // WebSockets & Co-op Multiplayer State
  const [socket, setSocket] = useState<Socket | null>(null);
  const [teamPlayers, setTeamPlayers] = useState<TeamPlayer[]>([
    { socketId: 'self', userName: 'Agent Maverick (You)', userRole: 'Lead Architect', inspectingObject: null },
    { socketId: 'p2', userName: 'Agent Alex', userRole: 'Cryptographer', inspectingObject: 'A* Mainframe' },
  ]);
  const [teamPings, setTeamPings] = useState<Array<{ id: string; user: string; text: string; time: string }>>([
    { id: '1', user: 'Agent Alex', text: 'Initiating A* Search heuristic evaluation...', time: new Date().toLocaleTimeString() },
  ]);

  // AI Hint Drawer State
  const [showAiHintDrawer, setShowAiHintDrawer] = useState(false);
  const [selectedHintTier, setSelectedHintTier] = useState<1 | 2 | 3>(1);
  const [activeAiHint, setActiveAiHint] = useState<string | null>(null);
  const [isGeneratingHint, setIsGeneratingHint] = useState(false);

  // Active Interactive Puzzle Modal State
  const [activePuzzle, setActivePuzzle] = useState<'ASTAR' | 'NEURAL' | 'SQL' | 'RFID' | 'SUBNET' | 'TREE' | 'CIPHER' | 'SQLJOIN' | 'PAGEREPLACEMENT' | 'KNAPSACK' | 'GRAPH' | 'MINIMAX' | 'QUANTUM' | 'CNN' | 'AST' | 'RAFT' | 'POW' | 'MAPREDUCE' | 'PAXOS' | 'ZKP' | 'FEDERATED' | 'BTREE' | 'RAFTSNAPSHOT' | 'AUTOENCODER' | 'ATTENTION' | 'PBFT' | null>(null);

  // Interactive Puzzle States
  const [astarPath, setAstarPath] = useState<number[]>([0]);
  const [astarSolved, setAstarSolved] = useState(false);
  const [weight1, setWeight1] = useState(0.4);
  const [weight2, setWeight2] = useState(0.6);
  const [neuralSolved, setNeuralSolved] = useState(false);
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM patients WHERE status = 'LOCKED';");
  const [sqlSolved, setSqlSolved] = useState(false);

  // WebSockets Connection Effect
  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const newSocket = io(backendUrl, { autoConnect: true });

    newSocket.on('connect', () => {
      console.log('[Frontend Socket] Connected to backend WebSockets server');
      newSocket.emit('join_session', {
        sessionCode: 'ROOM_101',
        userName: 'Agent Maverick',
        userRole: 'Lead Architect',
      });
    });

    newSocket.on('team_roster_updated', ({ players }: { players: TeamPlayer[] }) => {
      if (players && players.length > 0) setTeamPlayers(players);
    });

    newSocket.on('stage_auto_validated', ({ unlockedStage, message }: { unlockedStage: number; message: string }) => {
      setStage((prev) => Math.max(prev, unlockedStage));
      setSolenoidLocked(false);
      setTeamPings((prev) => [
        { id: Math.random().toString(), user: 'MQTT SENSOR ENGINE', text: message, time: new Date().toLocaleTimeString() },
        ...prev,
      ]);
    });

    newSocket.on('team_ping_received', ({ userName, message, timestamp }: { userName: string; message: string; timestamp: string }) => {
      setTeamPings((prev) => [{ id: Math.random().toString(), user: userName, text: message, time: timestamp }, ...prev]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

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
    if (socket) {
      socket.emit('inspect_object', { sessionCode: 'ROOM_101', objectName, userName: 'Agent Maverick' });
    }

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

  // AI Hint Micro-Engine Request Handler
  const handleRequestAiHint = async (tier: 1 | 2 | 3) => {
    setIsGeneratingHint(true);
    setSelectedHintTier(tier);

    try {
      const response = await fetch('http://localhost:5000/api/ai/generate-hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: 'ARTIFICIAL_INTELLIGENCE',
          stage,
          tier,
          failedAttempts: 1,
          timeSpentSeconds: 240,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setActiveAiHint(data.hintText);
        setSecondsLeft((prev) => Math.max(0, prev - data.penaltyMinutes * 60));
      } else {
        setActiveAiHint('[AI Assistant] Focus on verifying node distances against target parameters.');
      }
    } catch (err) {
      // Offline / fallback hint
      const fallback = tier === 1 
        ? '[AI Subtle Clue] Recall f(n) = g(n) + h(n). Calculate straight line distance.'
        : tier === 2 
        ? '[AI Technical Hint] Manhattan distance is |2-5| + |1-5| = 7. Select option 7.'
        : '[AI Solution Step] Swipe RFID Card Tag 7 or click A* Option h(n)=7 to disengage lock.';
      setActiveAiHint(fallback);
    } finally {
      setIsGeneratingHint(false);
    }
  };

  // Puzzle Solvers
  const handleSolveAstar = () => {
    setAstarSolved(true);
    setStage(Math.max(stage, 2));
    setActivePuzzle(null);
    if (socket) {
      socket.emit('stage_cleared', { sessionCode: 'ROOM_101', stageNumber: 1, clearedBy: 'Agent Maverick' });
    }
  };

  const handleSolveNeural = () => {
    if (Math.abs(weight1 + weight2 - 1.0) < 0.05) {
      setNeuralSolved(true);
      setStage(Math.max(stage, 3));
      setActivePuzzle(null);
      if (socket) {
        socket.emit('stage_cleared', { sessionCode: 'ROOM_101', stageNumber: 2, clearedBy: 'Agent Maverick' });
      }
    }
  };

  const handleSolveSql = () => {
    if (sqlQuery.includes("status = 'CRITICAL'") || sqlQuery.includes('status="CRITICAL"')) {
      setSqlSolved(true);
      setStage(4);
      setSolenoidLocked(false);
      setActivePuzzle(null);
      if (socket) {
        socket.emit('stage_cleared', { sessionCode: 'ROOM_101', stageNumber: 3, clearedBy: 'Agent Maverick' });
      }
    }
  };

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

          {/* Clock, Stage, and AI Hint Request Button */}
          <div className="flex items-center space-x-4">
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

            <button
              onClick={() => setShowAiHintDrawer(!showAiHintDrawer)}
              className="px-3.5 py-2 rounded-xl font-mono text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center space-x-1.5 transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            >
              <Lightbulb className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>AI HINT ENGINE</span>
            </button>
          </div>
        </div>

        {/* 3D Escape Room Canvas & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 3D WebGL Canvas Viewport (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <div className="relative w-full h-[520px]">
              <EscapeRoomCanvas onObjectClick={handleObjectClick} stage={stage} />
            </div>
          </div>

          {/* Side Mission Objectives, Co-op Team Roster & Pings (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Live Co-op Team Roster */}
            <div className="glass-panel p-5 rounded-2xl border-cyan-500/20 space-y-3">
              <h3 className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-bold flex items-center justify-between">
                <span>Co-op Team Roster</span>
                <Users className="w-4 h-4 text-cyan-400" />
              </h3>

              <div className="space-y-2 font-mono text-xs">
                {teamPlayers.map((player) => (
                  <div key={player.socketId} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <div>
                        <span className="block font-bold text-slate-200">{player.userName}</span>
                        <span className="text-[10px] text-slate-500">{player.userRole}</span>
                      </div>
                    </div>
                    {player.inspectingObject && (
                      <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                        {player.inspectingObject}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Stage Objectives Checklist */}
            <div className="glass-panel p-5 rounded-2xl border-purple-500/20 space-y-3">
              <h3 className="text-xs font-mono uppercase text-purple-400 tracking-wider font-bold flex items-center justify-between">
                <span>Room Objectives</span>
                <Sparkles className="w-4 h-4 text-purple-400" />
              </h3>

              <div className="space-y-2 font-mono text-xs">
                <div
                  onClick={() => setActivePuzzle('RFID')}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    stage >= 1 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>1. Verify RFID Keycard</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">DONE</span>
                </div>

                <div
                  onClick={() => setActivePuzzle('ASTAR')}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    astarSolved ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-indigo-400" />
                    <span>2. A* Pathfinding Grid</span>
                  </div>
                  <span className="text-[10px] font-bold">{astarSolved ? 'SOLVED' : 'ACTIVE'}</span>
                </div>

                <div
                  onClick={() => setActivePuzzle('NEURAL')}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    neuralSolved ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span>3. Calibrate Neural Weights</span>
                  </div>
                  <span className="text-[10px] font-bold">{neuralSolved ? 'SOLVED' : 'LOCKED'}</span>
                </div>

                <div
                  onClick={() => setActivePuzzle('SQL')}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
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

            {/* Live Team Chat Pings Stream */}
            <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-3 h-[200px] flex flex-col justify-between">
              <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider font-bold flex items-center justify-between">
                <span>Team Tactical Log</span>
                <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              </h3>

              <div className="flex-1 bg-slate-950 rounded-xl p-2.5 font-mono text-[11px] overflow-y-auto space-y-1.5 border border-slate-800">
                {teamPings.map((ping) => (
                  <div key={ping.id} className="text-slate-300 border-b border-slate-900 pb-1">
                    <span className="text-cyan-400 font-bold">[{ping.user}]: </span>
                    <span className="text-slate-400">{ping.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Context-Aware Hint Drawer */}
      {showAiHintDrawer && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-950/95 border-l border-amber-500/30 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-xl">
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2 text-amber-400">
                <Lightbulb className="w-5 h-5 animate-pulse" />
                <h3 className="font-mono font-bold text-base text-white">AI HINT MICRO-ENGINE</h3>
              </div>
              <button onClick={() => setShowAiHintDrawer(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs font-mono text-slate-400 leading-relaxed">
              Request dynamic, context-aware AI hints tailored to Stage {stage}. Selecting higher tiers incurs clock time deductions.
            </p>

            {/* Hint Tier Selector */}
            <div className="space-y-3 font-mono text-xs">
              {[
                { tier: 1, label: 'Tier 1: Subtle Conceptual Clue', penalty: '-1 min clock penalty' },
                { tier: 2, label: 'Tier 2: Technical Formula Nudge', penalty: '-3 min clock penalty' },
                { tier: 3, label: 'Tier 3: Direct Solution Step', penalty: '-5 min clock penalty' },
              ].map((item) => (
                <button
                  key={item.tier}
                  onClick={() => handleRequestAiHint(item.tier as 1 | 2 | 3)}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    selectedHintTier === item.tier
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="block font-bold text-slate-200">{item.label}</span>
                  <span className="text-[10px] text-amber-400">{item.penalty}</span>
                </button>
              ))}
            </div>

            {/* AI Generated Hint Box */}
            {activeAiHint && (
              <div className="bg-slate-900 p-4 rounded-2xl border border-amber-500/40 text-xs font-mono text-amber-300 space-y-2">
                <span className="text-[10px] uppercase font-bold text-amber-400 block">GENERATED AI HINT OUTPUT:</span>
                <p className="leading-relaxed">{activeAiHint}</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowAiHintDrawer(false)}
            className="w-full py-3 rounded-xl font-bold font-mono text-xs bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            RETURN TO 3D VAULT
          </button>
        </div>
      )}

      {/* Interactive Puzzle Modals (A*, Neural, SQL) */}
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

      {/* Subnetting & Packet Routing Puzzle Modal */}
      {activePuzzle === 'SUBNET' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <SubnetRoutingPuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(Math.max(stage, 3));
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* AVL Tree Rotation Puzzle Modal */}
      {activePuzzle === 'TREE' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <AvlTreePuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(4);
              setSolenoidLocked(false);
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* Cyber Security XOR Cryptography Cipher Decoder Modal */}
      {activePuzzle === 'CIPHER' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <CipherPuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(Math.max(stage, 3));
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* Multi-Table Relational SQL Join Modal */}
      {activePuzzle === 'SQLJOIN' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <SqlJoinPuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(4);
              setSolenoidLocked(false);
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* OS Page Replacement Visualizer Modal */}
      {activePuzzle === 'PAGEREPLACEMENT' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <PageReplacementPuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(Math.max(stage, 3));
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* Dynamic Programming Knapsack Modal */}
      {activePuzzle === 'KNAPSACK' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <DpKnapsackPuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(4);
              setSolenoidLocked(false);
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* Graph Traversal (BFS / DFS) Modal */}
      {activePuzzle === 'GRAPH' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <GraphTraversalPuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(Math.max(stage, 3));
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* Minimax & Alpha-Beta Pruning Modal */}
      {activePuzzle === 'MINIMAX' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <MinimaxPuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(4);
              setSolenoidLocked(false);
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* Quantum BB84 Key Distribution Modal */}
      {activePuzzle === 'QUANTUM' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <QuantumBb84Puzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(Math.max(stage, 3));
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* CNN Convolution Filter Modal */}
      {activePuzzle === 'CNN' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <CnnFilterPuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(4);
              setSolenoidLocked(false);
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* Compiler Lexical Analyzer & AST Parser Modal */}
      {activePuzzle === 'AST' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <CompilerAstPuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(Math.max(stage, 3));
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* Distributed Systems Raft Consensus Protocol Modal */}
      {activePuzzle === 'RAFT' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <RaftConsensusPuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(4);
              setSolenoidLocked(false);
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* Blockchain Proof-of-Work Modal */}
      {activePuzzle === 'POW' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <BlockchainPoWPuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(Math.max(stage, 3));
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* Distributed MapReduce Pipeline Modal */}
      {activePuzzle === 'MAPREDUCE' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <MapReducePuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(4);
              setSolenoidLocked(false);
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* Distributed Paxos Consensus Protocol Modal */}
      {activePuzzle === 'PAXOS' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <PaxosConsensusPuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(Math.max(stage, 3));
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* Zero-Knowledge Proofs (zk-SNARKs) Modal */}
      {activePuzzle === 'ZKP' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <ZkpPuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(4);
              setSolenoidLocked(false);
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* Federated Learning & Secure Aggregation Modal */}
      {activePuzzle === 'FEDERATED' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <FederatedLearningPuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(Math.max(stage, 3));
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* Database B-Tree Index Node Balancing Modal */}
      {activePuzzle === 'BTREE' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <BTreeIndexPuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(4);
              setSolenoidLocked(false);
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* Distributed Raft Log Compaction & Snapshotting Modal */}
      {activePuzzle === 'RAFTSNAPSHOT' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <RaftSnapshotPuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(Math.max(stage, 3));
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* Convolutional Autoencoder Signal Denoising Modal */}
      {activePuzzle === 'AUTOENCODER' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <AutoencoderPuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(4);
              setSolenoidLocked(false);
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* Transformer Self-Attention Matrix Modal */}
      {activePuzzle === 'ATTENTION' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <TransformerAttentionPuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(Math.max(stage, 3));
              setActivePuzzle(null);
            }}
          />
        </div>
      )}

      {/* Practical Byzantine Fault Tolerance (PBFT) Modal */}
      {activePuzzle === 'PBFT' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <PbftConsensusPuzzle
            onClose={() => setActivePuzzle(null)}
            onSolve={() => {
              setStage(4);
              setSolenoidLocked(false);
              setActivePuzzle(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
