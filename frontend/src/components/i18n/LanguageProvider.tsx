'use client';

import React, { createContext, useContext, useState } from 'react';

export type SupportedLanguage = 'en' | 'es' | 'hi' | 'de' | 'ja';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    platform_name: 'MISSIONX',
    title: 'Learn Engineering by Escaping Real-World Labs',
    dashboard: 'Dashboard',
    missions: 'Missions',
    leaderboard: 'Leaderboard',
  },
  es: {
    platform_name: 'MISSIONX',
    title: 'Aprenda ingeniería escapando de laboratorios reales',
    dashboard: 'Panel de control',
    missions: 'Misiones',
    leaderboard: 'Clasificación',
  },
  hi: {
    platform_name: 'मिशनX',
    title: 'वास्तविक मिशनों को हल करके इंजीनियरिंग सीखें',
    dashboard: 'डैशबोर्ड',
    missions: 'मिशन catalog',
    leaderboard: 'लीडरबोर्ड',
  },
  de: {
    platform_name: 'MISSIONX',
    title: 'Lernen Sie Ingenieurwesen durch virtuelle Escape Rooms',
    dashboard: 'Dashboard',
    missions: 'Missionen',
    leaderboard: 'Bestenliste',
  },
  ja: {
    platform_name: 'ミッションX',
    title: '実践的なエスケープルームで工学を学ぶ',
    dashboard: 'ダッシュボード',
    missions: 'ミッション',
    leaderboard: 'リーダーボード',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  const t = (key: string) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
