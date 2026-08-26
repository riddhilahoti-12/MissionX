'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';
import { aiVoiceNarrator } from '@/components/audio/AiVoiceNarrator';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  modelName?: string;
  timestamp: string;
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

export default function AiTutorChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'gpt-4o' | 'gpt-4o-mini' | 'gemini-1.5-pro' | 'gemini-1.5-flash'>('gpt-4o');
  const [showSpecModal, setShowSpecModal] = useState(false);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello Agent! I am your AI Co-Pilot powered by OpenAI GPT-4o & Google Gemini 1.5 APIs. Ask me any doubt about algorithm complexity, network subnets, AI weights, or room puzzles!',
      modelName: 'OpenAI GPT-4o',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    soundEngine.playClick();
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isLoading) return;

    soundEngine.playClick();
    const userText = inputPrompt;
    setInputPrompt('');

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${backendUrl}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          model: selectedModel,
        }),
      });

      const data = await res.json();
      const aiReplyText = data.responseText || `[${MODEL_SPECS[selectedModel].name}]: Key parameters aligned! Continue inspecting the room sensors.`;

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReplyText,
        modelName: MODEL_SPECS[selectedModel].name,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      soundEngine.playUnlockChime();

      if (isVoiceEnabled) {
        aiVoiceNarrator.speak(aiReplyText);
      }
    } catch {
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `[${MODEL_SPECS[selectedModel].name} AI Tutor]: Focus on matching the target parameters in your current puzzle stage. Recall standard mathematical formulas!`,
        modelName: MODEL_SPECS[selectedModel].name,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const currentSpec = MODEL_SPECS[selectedModel];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center space-x-2 transition-all hover:scale-105"
      >
        <Bot className="w-6 h-6 animate-pulse text-slate-950" />
        <span className="font-mono font-black text-xs hidden sm:inline">AI TUTOR CHAT</span>
      </button>

      {/* Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-full sm:w-[420px] max-w-[calc(100vw-32px)] glass-panel rounded-3xl border-cyan-500/40 shadow-[0_0_40px_rgba(0,240,255,0.25)] flex flex-col h-[520px] overflow-hidden font-sans text-slate-100 backdrop-blur-xl">
          {/* Header */}
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center space-x-2.5">
              <Bot className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="font-mono font-bold text-sm text-white flex items-center gap-1.5">
                  AI TUTOR CO-PILOT
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <span className="text-[10px] font-mono text-slate-400 block">OpenAI & Google Gemini Powered</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
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
                title="View LLM Model Specifications"
              >
                <Info className="w-4 h-4" />
              </button>

              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Model Selector Bar */}
          <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
            <span className="text-[10px] text-slate-400">ACTIVE MODEL:</span>
            <div className="relative">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as any)}
                className="bg-slate-950 text-cyan-300 font-bold border border-slate-800 rounded-lg px-2.5 py-1 outline-none text-xs cursor-pointer"
              >
                <option value="gpt-4o">OpenAI GPT-4o</option>
                <option value="gpt-4o-mini">OpenAI GPT-4o-mini</option>
                <option value="gemini-1.5-pro">Google Gemini 1.5 Pro</option>
                <option value="gemini-1.5-flash">Google Gemini 1.5 Flash</option>
              </select>
            </div>
          </div>

          {/* Model Specification Popup */}
          {showSpecModal && (
            <div className="p-4 bg-slate-950 border-b border-slate-800 font-mono text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-cyan-400">{currentSpec.name} Specifications</span>
                <span className="text-[10px] text-slate-500">{currentSpec.provider}</span>
              </div>
              <div className="text-[11px] text-slate-300">Context Window: <strong className="text-amber-300">{currentSpec.contextWindow}</strong></div>
              <div className="text-[11px] text-slate-300">Target Latency: <strong className="text-emerald-400">{currentSpec.latency}</strong></div>
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
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 rounded-tr-none'
                      : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'
                  }`}
                >
                  {m.modelName && (
                    <span className="block text-[9px] text-purple-400 font-bold mb-1 uppercase">
                      {m.modelName}
                    </span>
                  )}
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-1">{m.timestamp}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs p-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>AI Tutor thinking...</span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask a doubt or seek puzzle help..."
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
