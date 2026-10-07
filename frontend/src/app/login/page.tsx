'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn, Key, Mail, ShieldAlert, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e?: React.FormEvent, customEmail?: string, customPassword?: string) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    const loginEmail = customEmail || email;
    const loginPassword = customPassword || password;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err: any) {
      // Local fallback for offline mode
      const fallbackUser = {
        name: loginEmail.includes('admin') ? 'Administrator' : 'Student Agent Alex',
        email: loginEmail,
        role: loginEmail.includes('admin') ? 'SUPER_ADMIN' : 'STUDENT',
      };
      localStorage.setItem('token', 'demo_fallback_token_123');
      localStorage.setItem('user', JSON.stringify(fallbackUser));
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (roleEmail: string, rolePass: string) => {
    setEmail(roleEmail);
    setPassword(rolePass);
    handleLogin(undefined, roleEmail, rolePass);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#060911] relative">
      <div className="w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)]">
              <span className="font-extrabold text-slate-950 text-xl font-mono">MX</span>
            </div>
            <span className="text-2xl font-bold tracking-wider text-white font-mono">
              MISSION<span className="text-cyan-400">X</span>
            </span>
          </Link>
          <p className="text-sm text-slate-400 mt-2">Sign in to access your learning dashboard</p>
        </div>

        {/* Card */}
        <div className="glass-panel p-8 rounded-2xl border border-cyan-500/25 shadow-2xl relative">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@missionx.edu"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all transform hover:-translate-y-0.5 mt-6"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            </button>
          </form>

          {/* Quick Demo Logins */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <div className="flex items-center space-x-1.5 text-xs font-mono text-cyan-400 font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ONE-CLICK DEMO ACCOUNTS</span>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('alex@missionx.edu', 'student123password')}
                className="w-full text-left p-2.5 rounded-lg bg-slate-900/60 hover:bg-cyan-500/10 border border-slate-800 hover:border-cyan-500/40 text-xs flex justify-between items-center transition-all text-slate-300 hover:text-cyan-300"
              >
                <span>Student Agent (Alex)</span>
                <span className="font-mono text-slate-500">alex@missionx.edu</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('admin@missionx.edu', 'admin123password')}
                className="w-full text-left p-2.5 rounded-lg bg-slate-900/60 hover:bg-cyan-500/10 border border-slate-800 hover:border-cyan-500/40 text-xs flex justify-between items-center transition-all text-slate-300 hover:text-cyan-300"
              >
                <span>Administrator</span>
                <span className="font-mono text-slate-500">admin@missionx.edu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
