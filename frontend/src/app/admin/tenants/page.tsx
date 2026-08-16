'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Settings,
  Plus,
  Lock,
} from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';

export default function TenantAdminPage() {
  const [tenants, setTenants] = useState([
    { id: 't1', name: 'KL Deemed University', domain: 'kluniversity.in', students: 1450, status: 'ACTIVE' },
    { id: 't2', name: 'IIT Madras Cyber Lab', domain: 'iitm.ac.in', students: 890, status: 'ACTIVE' },
    { id: 't3', name: 'Stanford Engineering Escapes', domain: 'stanford.edu', students: 620, status: 'ACTIVE' },
  ]);

  const handleAddTenant = () => {
    soundEngine.playClick();
    alert('Enterprise Tenant Configuration Dialog Launched!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Top Header */}
        <div className="glass-panel p-8 rounded-3xl border-purple-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-xs font-mono text-purple-300">
              <Building2 className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>Enterprise Multi-Tenancy Admin Dashboard</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              INSTITUTIONAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400">TENANTS</span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl font-sans">
              Manage multi-tenant university domains, configure custom institutional logo branding, and set ABET Course Outcome weightings across global campuses.
            </p>
          </div>

          <button
            onClick={handleAddTenant}
            className="px-6 py-3.5 rounded-xl font-bold font-mono text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center space-x-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>PROVISION NEW TENANT</span>
          </button>
        </div>

        {/* Tenant Table Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tenants.map((t) => (
            <div key={t.id} className="glass-panel p-6 rounded-3xl border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {t.status}
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold">{t.students} STUDENTS</span>
              </div>

              <h3 className="text-lg font-bold text-white">{t.name}</h3>
              <p className="text-xs font-mono text-slate-400">Domain: {t.domain}</p>

              <div className="pt-3 border-t border-slate-800/80 font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                <span>Custom ABET Matrix: Mapped</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 mt-12 text-center text-xs font-mono text-slate-500">
        MissionX Enterprise Multi-Tenancy Engine • University Domain Isolation
      </footer>
    </div>
  );
}
