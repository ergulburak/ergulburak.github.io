"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Lang, dict } from '@/lib/dict';

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof dict['en'];
}

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('site-lang') as Lang;
    if (stored === 'en' || stored === 'tr') {
      setLangState(stored);
    } else {
      const isTr = navigator.language.startsWith('tr');
      setLangState(isTr ? 'tr' : 'en');
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('site-lang', newLang);
  };

  // Render children normally. Use 'en' as default before hydration
  return (
    <LangContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      <div style={{ display: 'contents', visibility: mounted ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
}
