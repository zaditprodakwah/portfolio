"use client";

import React, { useState, useEffect } from "react";
import { ListOrdered, X, ChevronRight, Bookmark } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface ToCItem {
  id: string;
  num: string;
  title: { id: string; en: string };
}

const TOC_ITEMS: ToCItem[] = [
  { id: "hero", num: "01", title: { id: "Ringkasan & Profil", en: "Profile & Focus" } },
  { id: "audit-teaser", num: "02", title: { id: "Audit Kesiapan", en: "Readiness Audit" } },
  { id: "services", num: "03", title: { id: "Layanan Terfokus", en: "Core Services" } },
  { id: "packages", num: "04", title: { id: "Paket Kerjasama", en: "Modular Packages" } },
  { id: "studi-kasus", num: "05", title: { id: "Studi Kasus Riil", en: "Case Studies" } },
  { id: "consultation", num: "06", title: { id: "Diskusi & Konsultasi", en: "Consultation" } },
  { id: "resume", num: "07", title: { id: "CV & Kredensial Resmi", en: "Official Resume" } }
];

export const FloatingToCWidget: React.FC = () => {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const item of TOC_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleJump = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <aside
        aria-label="Navigasi Daftar Isi Halaman"
        className="fixed bottom-24 right-4 z-40 sm:bottom-8 sm:right-6"
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="floating-toc-popover"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-300/90 shadow-md text-slate-800 hover:text-teal-900 hover:border-teal-600 transition-all active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
          title={lang === "id" ? "Daftar Isi Halaman (ToC)" : "Table of Contents"}
        >
          <span className="w-6 h-6 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-800 group-hover:bg-teal-700 group-hover:text-white transition-colors shrink-0">
            {isOpen ? <X className="w-3.5 h-3.5" /> : <ListOrdered className="w-3.5 h-3.5" />}
          </span>
          <span className="text-xs font-heading font-bold tracking-tight hidden sm:inline">
            {lang === "id" ? "Daftar Isi" : "ToC"}
          </span>
        </button>

        {/* Popover Menu */}
        {isOpen && (
          <div
            id="floating-toc-popover"
            className="absolute bottom-12 right-0 w-64 sm:w-72 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl p-4 space-y-2.5 animate-in fade-in slide-in-from-bottom-3 duration-150 text-slate-900"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <Bookmark className="w-3.5 h-3.5 text-teal-700" />
                <span>{lang === "id" ? "Navigasi Halaman" : "Page Contents"}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="space-y-1 max-h-72 overflow-y-auto pr-1">
              {TOC_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleJump(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-xs transition-all ${
                      isActive
                        ? "bg-teal-50 text-teal-950 font-bold border border-teal-200"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[10px] text-teal-800/80 font-bold">
                        {item.num}
                      </span>
                      <span className="truncate">{item.title[lang]}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-teal-700" : "text-slate-400"}`} />
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </aside>
    </>
  );
};
