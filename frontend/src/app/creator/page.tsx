'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import {
  Sparkles,
  Plus,
  Trash2,
  Save,
  Radio,
  BookOpen,
  Code,
  Terminal,
  Cpu,
  Layers,
  CheckCircle2,
  ArrowRight,
  Flame,
} from 'lucide-react';

interface CustomStage {
  stageNumber: number;
  stageName: string;
  challengeTitle: string;
  puzzleType: 'MCQ' | 'IOT_TRIGGER' | 'CODE_SOLVER' | 'SUBNETTING' | 'TREE_BALANCER';
  mqttSensorId: string;
  expectedHardwareKey: string;
}

export default function CreatorStudioPage() {
  const [missionTitle, setMissionTitle] = useState('Quantum Encryption Vault Escape');
  const [domain, setDomain] = useState('ARTIFICIAL_INTELLIGENCE');
  const [difficulty, setDifficulty] = useState('ADVANCED');
  const [timeLimitMins, setTimeLimitMins] = useState(40);
  const [xpReward, setXpReward] = useState(1500);
  const [coinsReward, setCoinsReward] = useState(500);
  const [storyBriefing, setStoryBriefing] = useState(
    'A cyber attack compromised the main data core. Navigate state space hazards and disengage solenoid locks before thermal shutdown.'
  );

  const [stages, setStages] = useState<CustomStage[]>([
    {
      stageNumber: 1,
      stageName: 'Perception Lab',
      challengeTitle: 'State Space & Heuristic Evaluation',
      puzzleType: 'MCQ',
      mqttSensorId: 'RFID_READER_ROOM1',
      expectedHardwareKey: 'TAG_CARD_ASTAR_7',
    },
    {
      stageNumber: 2,
      stageName: 'Optimal Path Chamber',
      challengeTitle: 'A* Cost Function Tuning f(n)=g(n)+h(n)',
      puzzleType: 'IOT_TRIGGER',
      mqttSensorId: 'PRESSURE_MAT_ROOM2',
      expectedHardwareKey: 'WEIGHT_TRIGGERED_NODE_B',
    },
  ]);

  const [publishedJson, setPublishedJson] = useState<string | null>(null);

  const handleAddStage = () => {
    const nextStageNum = stages.length + 1;
    setStages([
      ...stages,
      {
        stageNumber: nextStageNum,
        stageName: `Chamber Stage ${nextStageNum}`,
        challengeTitle: `Challenge ${nextStageNum}`,
        puzzleType: 'CODE_SOLVER',
        mqttSensorId: `SENSOR_ROOM_${nextStageNum}`,
        expectedHardwareKey: 'KEY_VALUE',
      },
    ]);
  };

  const handleRemoveStage = (index: number) => {
    setStages(stages.filter((_, i) => i !== index));
  };

  const handlePublishMission = () => {
    const missionPayload = {
      title: missionTitle,
      domain,
      difficulty,
      maxTimeSeconds: timeLimitMins * 60,
      xpReward,
      coinsReward,
      storyBriefing,
      stages,
      createdAt: new Date().toISOString(),
    };
    setPublishedJson(JSON.stringify(missionPayload, null, 2));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="glass-panel p-8 rounded-3xl border-cyan-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>The Steam Workshop for Educational Escape Rooms</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              MISSION <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">CREATOR STUDIO</span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl font-sans">
              No-code mission configuration for educators and instructors. Design custom escape room templates, map ESP32 MQTT hardware sensors, and publish to the MissionX Storefront.
            </p>
          </div>

          <button
            onClick={handlePublishMission}
            className="px-6 py-3.5 rounded-xl font-bold font-mono text-xs bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center space-x-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all shrink-0"
          >
            <Save className="w-4 h-4" />
            <span>PUBLISH MISSION TO STORE</span>
          </button>
        </div>

        {/* Studio Editor Grid (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Mission Meta & Narrative (6 Columns) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border-slate-800 space-y-4">
              <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                1. Mission Metadata & Rewards
              </h2>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 uppercase mb-1">Mission Title</label>
                  <input
                    type="text"
                    value={missionTitle}
                    onChange={(e) => setMissionTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 uppercase mb-1">Domain Topic</label>
                    <select
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-cyan-400 outline-none cursor-pointer"
                    >
                      <option value="ARTIFICIAL_INTELLIGENCE">Artificial Intelligence</option>
                      <option value="DATA_STRUCTURES">Data Structures & Algorithms</option>
                      <option value="IOT">IoT & Embedded Systems</option>
                      <option value="NETWORKS">Computer Networks</option>
                      <option value="DATABASES">Databases & SQL</option>
                      <option value="CYBER_SECURITY">Cyber Security</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 uppercase mb-1">Difficulty Tier</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-purple-400 outline-none cursor-pointer"
                    >
                      <option value="BEGINNER">Beginner</option>
                      <option value="INTERMEDIATE">Intermediate</option>
                      <option value="ADVANCED">Advanced</option>
                      <option value="HARDCORE_AAA">Hardcore AAA</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 uppercase mb-1">Time Limit (Mins)</label>
                    <input
                      type="number"
                      value={timeLimitMins}
                      onChange={(e) => setTimeLimitMins(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 uppercase mb-1">XP Reward</label>
                    <input
                      type="number"
                      value={xpReward}
                      onChange={(e) => setXpReward(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 uppercase mb-1">Coins Reward</label>
                    <input
                      type="number"
                      value={coinsReward}
                      onChange={(e) => setCoinsReward(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-cyan-400 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase mb-1">Cinematic Narrative Briefing</label>
                  <textarea
                    rows={4}
                    value={storyBriefing}
                    onChange={(e) => setStoryBriefing(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Room Stage Designer (6 Columns) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border-purple-500/20 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-400" />
                  2. Room Stages & MQTT Hardware Mappings
                </h2>

                <button
                  onClick={handleAddStage}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 flex items-center gap-1 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD STAGE</span>
                </button>
              </div>

              <div className="space-y-4">
                {stages.map((stage, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center text-purple-400 font-bold border-b border-slate-900 pb-2">
                      <span>STAGE {stage.stageNumber}: {stage.stageName}</span>
                      {stages.length > 1 && (
                        <button onClick={() => handleRemoveStage(idx)} className="text-red-400 hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-500 uppercase mb-1">Challenge Title</label>
                        <input
                          type="text"
                          value={stage.challengeTitle}
                          onChange={(e) => {
                            const updated = [...stages];
                            updated[idx].challengeTitle = e.target.value;
                            setStages(updated);
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-500 uppercase mb-1">Puzzle Mechanics Type</label>
                        <select
                          value={stage.puzzleType}
                          onChange={(e) => {
                            const updated = [...stages];
                            updated[idx].puzzleType = e.target.value as any;
                            setStages(updated);
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-cyan-400 outline-none cursor-pointer"
                        >
                          <option value="MCQ">Multiple Choice Puzzle</option>
                          <option value="IOT_TRIGGER">ESP32 Sensor Trigger</option>
                          <option value="CODE_SOLVER">Live Code Solver</option>
                          <option value="SUBNETTING">VLSM Subnet Router</option>
                          <option value="TREE_BALANCER">AVL Tree Balancer</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-500 uppercase mb-1">MQTT Sensor ID</label>
                        <input
                          type="text"
                          value={stage.mqttSensorId}
                          onChange={(e) => {
                            const updated = [...stages];
                            updated[idx].mqttSensorId = e.target.value;
                            setStages(updated);
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-amber-300 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-500 uppercase mb-1">Expected Hardware Key</label>
                        <input
                          type="text"
                          value={stage.expectedHardwareKey}
                          onChange={(e) => {
                            const updated = [...stages];
                            updated[idx].expectedHardwareKey = e.target.value;
                            setStages(updated);
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-emerald-300 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Published JSON Preview */}
            {publishedJson && (
              <div className="glass-panel p-6 rounded-3xl border-emerald-500/30 space-y-3">
                <span className="block font-mono font-bold text-xs text-emerald-400 uppercase">
                  ✅ PUBLISHED MISSION JSON SCHEME:
                </span>
                <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-[10px] text-slate-300 max-h-60 overflow-y-auto">
                  {publishedJson}
                </pre>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 mt-12 text-center text-xs font-mono text-slate-500">
        MissionX Educator Creator Studio • Configurable Educational Escape Room Engine
      </footer>
    </div>
  );
}
