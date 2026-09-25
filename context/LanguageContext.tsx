"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "@/lib/cv-data";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "id",
  setLanguage: () => {},
  toggleLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode; defaultLang?: Language }> = ({
  children,
  defaultLang,
}) => {
  const [language, setLanguageState] = useState<Language>(defaultLang || "id");

  useEffect(() => {
    if (defaultLang) {
      setLanguageState(defaultLang);
      return;
    }

    try {
      const savedLang = localStorage.getItem("zadit_lang") as Language | null;
      if (savedLang === "id" || savedLang === "en") {
        setLanguageState(savedLang);
      } else if (typeof navigator !== "undefined") {
        // Deteksi preferensi bahasa sistem peramban
        const browserPref = navigator.language?.toLowerCase();
        if (browserPref && !browserPref.startsWith("id")) {
          setLanguageState("en");
        }
      }
    } catch {
      // Abaikan jika localStorage diblokir
    }
  }, [defaultLang]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("zadit_lang", lang);
    } catch {
      // Abaikan
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "id" ? "en" : "id");
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
