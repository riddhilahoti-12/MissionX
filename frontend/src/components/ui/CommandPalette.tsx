'use client';

import React, { useState, useEffect } from 'react';
import { Search, Shield, Activity, Trophy, Sparkles, ShoppingBag, FileText, Swords, Eye, BarChart3, User, Building2, Award, HeartPulse } from 'lucide-react';
import { soundEngine } from '@/components/audio/SoundEffectsEngine';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundEngine.playClick();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const navItems = [
    { title: 'Dashboard', href: '/dashboard', icon: Shield },
    { title: 'Missions Catalog', href: '/missions', icon: Activity },
    { title: 'Leaderboards', href: '/leaderboard', icon: Trophy },
    { title: 'Creator Studio', href: '/creator', icon: Sparkles },
    { title: 'Rewards Store', href: '/store', icon: ShoppingBag },
    { title: 'ABET Assessment', href: '/assessment', icon: FileText },
    { title: 'Tournament Arena', href: '/tournament', icon: Swords },
    { title: 'Live Spectator Console', href: '/spectator', icon: Eye },
    { title: 'Competency Analytics', href: '/analytics', icon: BarChart3 },
    { title: 'Agent Profile', href: '/profile', icon: User },
    { title: 'Tenant Admin', href: '/admin/tenants', icon: Building2 },
    { title: 'Accreditation Exporter', href: '/admin/accreditation', icon: Award },
    { title: 'System Health Monitor', href: '/admin/health', icon: HeartPulse },
  ];

  const filteredItems = navItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 p-4">
      <div className="glass-panel p-6 rounded-3xl border-cyan-500/40 max-w-xl w-full space-y-4 text-slate-100 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            placeholder="Type a command or module name... (Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent outline-none font-mono text-sm text-white placeholder-slate-500"
            autoFocus
          />
        </div>

        <div className="max-h-64 overflow-y-auto space-y-1.5 font-mono text-xs">
          {filteredItems.map((item) => {
            const IconComp = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-cyan-500/20 border border-transparent hover:border-cyan-500/40 transition-all text-slate-300 hover:text-white"
              >
                <div className="flex items-center space-x-3">
                  <IconComp className="w-4 h-4 text-cyan-400" />
                  <span>{item.title}</span>
                </div>
                <span className="text-[10px] text-slate-500">{item.href}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
