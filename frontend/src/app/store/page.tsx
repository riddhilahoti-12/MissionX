'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import {
  ShoppingBag,
  Coins,
  Sparkles,
  Zap,
  Clock,
  Shield,
  CheckCircle2,
  Lock,
  ArrowRight,
  Flame,
  Award,
  User,
} from 'lucide-react';

interface StoreItem {
  id: string;
  name: string;
  category: 'POWER_UP' | 'UTILITY' | 'AVATAR' | 'TITLE';
  priceCoins: number;
  desc: string;
  icon: string;
  purchased: boolean;
}

const INITIAL_STORE_ITEMS: StoreItem[] = [
  {
    id: 'time_freeze',
    name: 'Time Freeze Chrono Token',
    category: 'POWER_UP',
    priceCoins: 250,
    desc: 'Pauses the mission countdown timer for 3 minutes during critical puzzle solving.',
    icon: '⏳',
    purchased: false,
  },
  {
    id: 'sensor_bypass',
    name: 'Hardware Sensor Auto-Bypass',
    category: 'UTILITY',
    priceCoins: 400,
    desc: 'Bypasses 1 physical ESP32 RFID/PIR sensor validation check instantly.',
    icon: '📟',
    purchased: false,
  },
  {
    id: 'thermal_scanner',
    name: 'Cyber Thermal 3D Scanner',
    category: 'UTILITY',
    priceCoins: 300,
    desc: 'Highlights interactive 3D hardware objects with a glowing cyberpunk overlay.',
    icon: '👁️',
    purchased: false,
  },
  {
    id: 'avatar_valkyrie',
    name: 'Cyber Avatar: Neon Valkyrie',
    category: 'AVATAR',
    priceCoins: 500,
    desc: 'Unlockable glowing neon character avatar for multiplayer lobbies.',
    icon: '🦸‍♀️',
    purchased: false,
  },
  {
    id: 'title_architect',
    name: 'Holographic Title: Quantum Architect',
    category: 'TITLE',
    priceCoins: 600,
    desc: 'Display exclusive glowing holographic title badge on institutional leaderboards.',
    icon: '👑',
    purchased: false,
  },
];

export default function StorePage() {
  const [coinsBalance, setCoinsBalance] = useState<number>(1450);
  const [items, setItems] = useState<StoreItem[]>(INITIAL_STORE_ITEMS);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const handlePurchase = (item: StoreItem) => {
    if (coinsBalance >= item.priceCoins && !item.purchased) {
      setCoinsBalance((prev) => prev - item.priceCoins);
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, purchased: true } : i))
      );
    }
  };

  const filteredItems = items.filter(
    (item) => activeCategory === 'ALL' || item.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Top Header Banner */}
        <div className="glass-panel p-8 rounded-3xl border-cyan-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300">
              <ShoppingBag className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Gamification Marketplace & Power-ups Vault</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              REWARDS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">STORE</span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl font-sans">
              Redeem earned MissionX Coins and XP on gameplay power-ups, diagnostic 3D WebGL scanners, custom cyber avatars, and exclusive leaderboard titles.
            </p>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-center flex items-center space-x-3">
              <Coins className="w-8 h-8 text-cyan-400 animate-pulse" />
              <div className="text-left">
                <span className="block text-2xl font-black text-cyan-400">{coinsBalance}</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Available Coins</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex space-x-2">
          {['ALL', 'POWER_UP', 'UTILITY', 'AVATAR', 'TITLE'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Store Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-panel p-6 rounded-3xl border-slate-800 hover:border-cyan-500/40 flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-900 text-cyan-300 border border-slate-800">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">{item.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{item.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex justify-between items-center">
                <div className="flex items-center space-x-1.5 font-mono text-cyan-400 font-bold text-sm">
                  <Coins className="w-4 h-4" />
                  <span>{item.priceCoins} Coins</span>
                </div>

                <button
                  disabled={item.purchased || coinsBalance < item.priceCoins}
                  onClick={() => handlePurchase(item)}
                  className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
                    item.purchased
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : coinsBalance >= item.priceCoins
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                      : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                  }`}
                >
                  {item.purchased ? 'OWNED' : coinsBalance >= item.priceCoins ? 'PURCHASE' : 'NEED COINS'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 mt-12 text-center text-xs font-mono text-slate-500">
        MissionX Rewards Store & Item Inventory • Integrated Coin Engine
      </footer>
    </div>
  );
}
