'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from './cv-data';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'id',
  setLang: () => {},
  toggleLang: () => {}
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('id');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('zadit_portfolio_lang') as Language | null;
      if (saved && (saved === 'id' || saved === 'en')) {
        setLangState(saved);
      }
    } catch {
      // safe fallback in restricted browser environments
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('zadit_portfolio_lang', newLang);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === 'id' ? 'en' : 'id');
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
