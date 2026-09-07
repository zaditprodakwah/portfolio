'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center bg-alabaster border border-brand-border rounded-xl p-1 text-xs font-mono">
      <button
        type="button"
        onClick={() => setLang('id')}
        className={`px-2.5 py-1 rounded-lg transition-all ${
          lang === 'id'
            ? 'bg-teal-accent text-white font-bold shadow-xs'
            : 'text-slate-600 hover:text-brand-slate'
        }`}
        aria-label="Ganti ke Bahasa Indonesia"
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`px-2.5 py-1 rounded-lg transition-all ${
          lang === 'en'
            ? 'bg-teal-accent text-white font-bold shadow-xs'
            : 'text-slate-600 hover:text-brand-slate'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
};
