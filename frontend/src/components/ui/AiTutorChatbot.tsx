'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  MessageSquare,
  Bot,
  Send,
  Sparkles,
  X,
  ChevronDown,
  Info,
  Volume2,
  VolumeX,
  Cpu,
  Zap,
  RotateCcw,
  Shield,
  Layers,
} from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';
import {
  MISSIONS_CATALOG,
  DEFAULT_MISSION_ID,
  getMissionById,
  MissionContext,
} from '@/data/missionsCatalog';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  modelName?: string;
  timestamp: string;
  missionId?: string;
}

const MODEL_SPECS: Record<string, { name: string; provider: string; contextWindow: string; capabilities: string[]; latency: string }> = {
  'gpt-4o': {
    name: 'OpenAI GPT-4o',
    provider: 'OpenAI',
    contextWindow: '128,000 Tokens',
    capabilities: ['Multimodal Vision', 'Math Reasoning', 'Code Execution', 'Real-Time Streaming'],
    latency: '120ms',
  },
  'gpt-4o-mini': {
    name: 'OpenAI GPT-4o-mini',
    provider: 'OpenAI',
    contextWindow: '128,000 Tokens',
    capabilities: ['Fast Sub-100ms Responses', 'Lightweight Nudge Guidance', 'Syntax Correction'],
    latency: '45ms',
  },
  'gemini-1.5-pro': {
    name: 'Google Gemini 1.5 Pro',
    provider: 'Google AI',
    contextWindow: '1,000,000+ Tokens',
    capabilities: ['1M+ Massive Context Window', 'Deep Code Analysis', 'Audio/Video Reasoning'],
    latency: '150ms',
  },
  'gemini-1.5-flash': {
    name: 'Google Gemini 1.5 Flash',
    provider: 'Google AI',
    contextWindow: '1,000,000 Tokens',
    capabilities: ['Zero-Latency Streaming', 'High Throughput', 'Instant Doubt Resolution'],
    latency: '60ms',
  },
};

interface AiTutorChatbotProps {
  initialMissionId?: string;
}

export default function AiTutorChatbot({ initialMissionId }: AiTutorChatbotProps) {
  const pathname = usePathname();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Determine active mission based on pathname (e.g. /play/astar_rescue), props, or storage
  const [activeMissionId, setActiveMissionId] = useState<string>(() => {
    if (initialMissionId) return initialMissionId;
    return DEFAULT_MISSION_ID;
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'gpt-4o' | 'gpt-4o-mini' | 'gemini-1.5-pro' | 'gemini-1.5-flash'>('gpt-4o');
  const [showSpecModal, setShowSpecModal] = useState(false);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Scoped chat history: dictionary of message lists keyed by missionId
  const [chatHistories, setChatHistories] = useState<Record<string, Message[]>>({});

  const activeMission: MissionContext = getMissionById(activeMissionId);

  // Detect route changes (e.g., entering /play/astar_rescue or /play/network_packet_routing)
  useEffect(() => {
    if (pathname && pathname.startsWith('/play/')) {
      const routeMissionId = pathname.split('/')[2];
      if (routeMissionId) {
        setActiveMissionId(routeMissionId);
      }
    }
  }, [pathname]);

  // Listen to custom cross-component mission selection events
  useEffect(() => {
    const handleMissionChange = (e: any) => {
      if (e.detail) {
        setActiveMissionId(e.detail);
      }
    };
    window.addEventListener('missionx:mission-changed', handleMissionChange);
    return () => window.removeEventListener('missionx:mission-changed', handleMissionChange);
  }, []);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatHistories, activeMissionId, isOpen]);

  // Function to initialize/fetch the initial mission diagnostic from the backend
  const fetchInitialDiagnostic = useCallback(
    async (mission: MissionContext) => {
      setIsLoading(true);
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${backendUrl}/api/ai/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: selectedModel,
            missionId: mission.id,
            missionTitle: mission.missionTitle,
            domain: mission.domain,
            difficulty: mission.difficulty,
            courseOutcomes: mission.courseOutcomes,
            environment: mission.environment,
            description: mission.description,
            isInitial: true,
          }),
        });

        const data = await res.json();
        const initialText =
          data.responseText ||
          `[Agent Maverick reporting]: Active Mission: ${mission.missionTitle}. Target Domain: ${mission.domain}. How can I assist your team?`;

        const initialMsg: Message = {
          id: `init-${mission.id}-${Date.now()}`,
          sender: 'ai',
          text: initialText,
          modelName: MODEL_SPECS[selectedModel].name,
          timestamp: new Date().toLocaleTimeString(),
          missionId: mission.id,
        };

        setChatHistories((prev) => ({
          ...prev,
          [mission.id]: [initialMsg],
        }));

        if (isVoiceEnabled) {
          aiVoiceNarrator.speak(initialText);
        }
      } catch (err) {
        // Fallback initial greeting
        const fallbackMsg: Message = {
          id: `fallback-${mission.id}`,
          sender: 'ai',
          text: `[Agent Maverick // COMMS ACTIVE]\nMission: ${mission.missionTitle} [Domain: ${mission.domain}]\nTarget Outcome: ${mission.courseOutcomes[0] || 'Core Mechanics'}\n\nState your technical hypothesis or query to verify your calculation.`,
          modelName: MODEL_SPECS[selectedModel].name,
          timestamp: new Date().toLocaleTimeString(),
          missionId: mission.id,
        };
        setChatHistories((prev) => ({
          ...prev,
          [mission.id]: [fallbackMsg],
        }));
      } finally {
        setIsLoading(false);
      }
    },
    [selectedModel, isVoiceEnabled]
  );

  // When active mission changes or chat opens, check if scoped history exists; if not, initialize it
  useEffect(() => {
    if (isOpen && (!chatHistories[activeMissionId] || chatHistories[activeMissionId].length === 0)) {
      fetchInitialDiagnostic(activeMission);
    }
  }, [isOpen, activeMissionId, chatHistories, activeMission, fetchInitialDiagnostic]);

  const toggleChat = () => {
    soundEngine.playClick();
    setIsOpen(!isOpen);
  };

  // Reset conversation for active mission
  const handleResetMissionChat = () => {
    soundEngine.playClick();
    setChatHistories((prev) => ({
      ...prev,
      [activeMissionId]: [],
    }));
    fetchInitialDiagnostic(activeMission);
  };

  // Switch active mission manually in chatbot
  const handleSwitchMission = (newMissionId: string) => {
    soundEngine.playClick();
    setActiveMissionId(newMissionId);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('missionx_active_mission', newMissionId);
      window.dispatchEvent(new CustomEvent('missionx:mission-changed', { detail: newMissionId }));
    }
  };

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isLoading) return;

    soundEngine.playClick();
    const userText = inputPrompt;
    setInputPrompt('');

    const currentHistory = chatHistories[activeMissionId] || [];

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString(),
      missionId: activeMissionId,
    };

    const updatedHistory = [...currentHistory, userMsg];
    setChatHistories((prev) => ({
      ...prev,
      [activeMissionId]: updatedHistory,
    }));
    setIsLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${backendUrl}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          model: selectedModel,
          missionId: activeMission.id,
          missionTitle: activeMission.missionTitle,
          domain: activeMission.domain,
          difficulty: activeMission.difficulty,
          courseOutcomes: activeMission.courseOutcomes,
          environment: activeMission.environment,
          description: activeMission.description,
          history: currentHistory.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text,
          })),
          isInitial: false,
        }),
      });

      const data = await res.json();
      const aiReplyText =
        data.responseText ||
        `[${MODEL_SPECS[selectedModel].name}]: Verified. Review your parameters in ${activeMission.environment}.`;

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReplyText,
        modelName: MODEL_SPECS[selectedModel].name,
        timestamp: new Date().toLocaleTimeString(),
        missionId: activeMissionId,
      };

      setChatHistories((prev) => ({
        ...prev,
        [activeMissionId]: [...(prev[activeMissionId] || []), aiMsg],
      }));
      soundEngine.playUnlockChime();

      if (isVoiceEnabled) {
        aiVoiceNarrator.speak(aiReplyText);
      }
    } catch {
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `[Agent Maverick // Socratic Fallback]: Target: ${activeMission.courseOutcomes[0]}. Break down the inputs and examine the core mathematical relation for ${activeMission.domain}.`,
        modelName: MODEL_SPECS[selectedModel].name,
        timestamp: new Date().toLocaleTimeString(),
        missionId: activeMissionId,
      };
      setChatHistories((prev) => ({
        ...prev,
        [activeMissionId]: [...(prev[activeMissionId] || []), fallbackMsg],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const currentSpec = MODEL_SPECS[selectedModel];
  const activeMessages = chatHistories[activeMissionId] || [];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center space-x-2 transition-all hover:scale-105"
      >
        <Bot className="w-6 h-6 animate-pulse text-slate-950" />
        <div className="flex flex-col text-left font-mono">
          <span className="font-black text-xs hidden sm:inline leading-none">AI TUTOR CHAT</span>
          <span className="text-[9px] text-slate-900 hidden sm:inline uppercase font-bold tracking-tight">
            [{activeMission.domain}] {activeMission.id}
          </span>
        </div>
      </button>

      {/* Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-full sm:w-[460px] max-w-[calc(100vw-32px)] glass-panel rounded-3xl border-cyan-500/40 shadow-[0_0_40px_rgba(0,240,255,0.25)] flex flex-col h-[560px] overflow-hidden font-sans text-slate-100 backdrop-blur-xl">
          {/* Header */}
          <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center space-x-2.5">
              <Bot className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="font-mono font-bold text-sm text-white flex items-center gap-1.5">
                  AGENT MAVERICK // AI TUTOR
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <span className="text-[10px] font-mono text-cyan-300 block font-semibold">
                  Adaptive Escape Room Co-Pilot
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleResetMissionChat}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-amber-400 border border-slate-800 text-xs transition-colors"
                title="Reset Chat & Re-trigger Initial Diagnostic"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                className={`p-1.5 rounded-lg border text-xs transition-colors ${
                  isVoiceEnabled ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}
                title="Toggle AI Voice Synthesis"
              >
                {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setShowSpecModal(!showSpecModal)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 text-xs"
                title="View LLM Specifications"
              >
                <Info className="w-4 h-4" />
              </button>

              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dynamic Mission Selector & Context Badge */}
          <div className="px-4 py-2 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center space-x-1.5 overflow-hidden">
              <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                {activeMission.domain}
              </span>
              <span className="text-[10px] text-slate-300 font-bold truncate max-w-[170px]" title={activeMission.missionTitle}>
                {activeMission.missionTitle}
              </span>
            </div>

            {/* Mission Switcher Dropdown */}
            <div className="relative">
              <select
                value={activeMissionId}
                onChange={(e) => handleSwitchMission(e.target.value)}
                className="bg-slate-950 text-amber-300 font-bold border border-slate-800 rounded-lg px-2 py-1 outline-none text-[10px] cursor-pointer"
                title="Switch Mission Subject"
              >
                {Object.values(MISSIONS_CATALOG).map((m) => (
                  <option key={m.id} value={m.id}>
                    [{m.domain}] {m.missionTitle}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Model Selector Bar */}
          <div className="px-4 py-1.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between font-mono text-[11px]">
            <span className="text-[10px] text-slate-400">MODEL CO-PILOT:</span>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as any)}
              className="bg-slate-900 text-cyan-300 border border-slate-800 rounded px-2 py-0.5 outline-none text-[10px] cursor-pointer"
            >
              <option value="gpt-4o">OpenAI GPT-4o</option>
              <option value="gpt-4o-mini">OpenAI GPT-4o-mini</option>
              <option value="gemini-1.5-pro">Google Gemini 1.5 Pro</option>
              <option value="gemini-1.5-flash">Google Gemini 1.5 Flash</option>
            </select>
          </div>

          {/* Model Specification Popup */}
          {showSpecModal && (
            <div className="p-4 bg-slate-950 border-b border-slate-800 font-mono text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-cyan-400">{currentSpec.name} Specifications</span>
                <span className="text-[10px] text-slate-500">{currentSpec.provider}</span>
              </div>
              <div className="text-[11px] text-slate-300">
                Context Window: <strong className="text-amber-300">{currentSpec.contextWindow}</strong>
              </div>
              <div className="text-[11px] text-slate-300">
                Target Latency: <strong className="text-emerald-400">{currentSpec.latency}</strong>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {currentSpec.capabilities.map((cap, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px] text-purple-300">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs">
            {activeMessages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[88%] leading-relaxed whitespace-pre-wrap ${
                    m.sender === 'user'
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 rounded-tr-none'
                      : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none shadow-md'
                  }`}
                >
                  {m.modelName && m.sender === 'ai' && (
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-1 mb-1.5">
                      <span className="text-[9px] text-purple-400 font-bold uppercase tracking-wider">
                        {m.modelName}
                      </span>
                      <span className="text-[8px] text-cyan-400 bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-500/20">
                        {activeMission.domain}
                      </span>
                    </div>
                  )}
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-1">{m.timestamp}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs p-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Agent Maverick is formulating Socratic analysis...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              placeholder={`Ask Maverick about ${activeMission.domain} & ${activeMission.courseOutcomes[0] || 'puzzle'}...`}
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none font-mono focus:border-cyan-500/50"
            />
            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
