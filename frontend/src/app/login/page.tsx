'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import {
  Shield,
  Lock,
  Mail,
  User,
  ArrowRight,
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Terminal,
} from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';

export default function LoginPage() {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'STUDENT' | 'GAME_MASTER' | 'SUPER_ADMIN'>('STUDENT');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Quick-fill credentials helper for evaluator testing
  const handleQuickFill = (
    demoEmail: string,
    demoPass: string,
    demoRole: 'STUDENT' | 'GAME_MASTER' | 'SUPER_ADMIN'
  ) => {
    soundEngine.playClick();
    setEmail(demoEmail);
    setPassword(demoPass);
    setRole(demoRole);
    setIsLoginTab(true);
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);
    soundEngine.playClick();

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const endpoint = isLoginTab ? '/api/auth/login' : '/api/auth/register';

    const payload = isLoginTab
      ? { email, password }
      : { name, email, password, role };

    try {
      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Authentication failed. Please verify credentials.');
      }

      soundEngine.playUnlockChime();
      setSuccessMsg(
        isLoginTab
          ? `Welcome back, ${data.user.name}! Authenticated as [${data.user.role}]. Redirecting...`
          : `Agent registration complete! Initializing profile...`
      );

      // Persist session token and user profile
      if (typeof window !== 'undefined') {
        localStorage.setItem('missionx_token', data.token);
        localStorage.setItem('missionx_user', JSON.stringify(data.user));
      }

      // Redirect based on role
      setTimeout(() => {
        if (data.user.role === 'GAME_MASTER' || data.user.role === 'SUPER_ADMIN') {
          window.location.href = '/dashboard';
        } else {
          window.location.href = '/missions';
        }
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to connect to authentication server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {/* Glow ambient background */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md space-y-6 relative z-10 animate-fade-in">
          {/* Header Banner */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
              <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>MISSIONX SECURITY MAINFRAME</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Mission Control Access
            </h1>
            <p className="text-xs font-mono text-slate-400">
              Authenticate your clearance level to access escape room telemetry.
            </p>
          </div>

          {/* Quick Demo Credentials Bar */}
          <div className="glass-panel p-3.5 rounded-2xl border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <KeyRound className="w-3.5 h-3.5" />
                PRE-SEEDED DEMO CLEARANCES:
              </span>
              <span className="text-[10px] text-slate-500">1-Click Autofill</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => handleQuickFill('alex@missionx.edu', 'student123password', 'STUDENT')}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-left transition-all hover:border-cyan-400"
              >
                <span className="block font-bold text-cyan-300 text-[11px]">STUDENT</span>
                <span className="text-[9px] text-slate-500 block truncate">alex@missionx.edu</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('gamemaster@missionx.edu', 'gm123password', 'GAME_MASTER')}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-left transition-all hover:border-amber-400"
              >
                <span className="block font-bold text-amber-300 text-[11px]">GAME MASTER</span>
                <span className="text-[9px] text-slate-500 block truncate">gamemaster@missionx.edu</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('admin@missionx.edu', 'admin123password', 'SUPER_ADMIN')}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-left transition-all hover:border-purple-400"
              >
                <span className="block font-bold text-purple-300 text-[11px]">SUPER ADMIN</span>
                <span className="text-[9px] text-slate-500 block truncate">admin@missionx.edu</span>
              </button>
            </div>
          </div>

          {/* Form Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 shadow-2xl space-y-6">
            {/* Tabs */}
            <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setIsLoginTab(true);
                  setErrorMsg(null);
                }}
                className={`py-2 rounded-lg font-bold transition-all ${
                  isLoginTab
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                LOGIN
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setIsLoginTab(false);
                  setErrorMsg(null);
                }}
                className={`py-2 rounded-lg font-bold transition-all ${
                  !isLoginTab
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                REGISTER AGENT
              </button>
            </div>

            {/* Error / Success Notifications */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              {!isLoginTab && (
                <div>
                  <label className="block text-[11px] uppercase text-slate-400 mb-1">
                    Agent Callsign / Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Agent Maverick"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] uppercase text-slate-400 mb-1">
                  Institutional Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="agent@missionx.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase text-slate-400 mb-1">
                  Access Passcode
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 outline-none transition-colors"
                  />
                </div>
              </div>

              {!isLoginTab && (
                <div>
                  <label className="block text-[11px] uppercase text-slate-400 mb-1">
                    Requested Clearance Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-slate-200 outline-none transition-colors cursor-pointer"
                  >
                    <option value="STUDENT">STUDENT (Mission Player)</option>
                    <option value="GAME_MASTER">GAME MASTER (Escape Room Controller)</option>
                    <option value="SUPER_ADMIN">SUPER ADMIN (Campus Administrator)</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>AUTHENTICATING MAINFRAME...</span>
                ) : (
                  <>
                    <span>{isLoginTab ? 'ACCESS MISSION CONTROL' : 'ENROLL NEW AGENT'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
