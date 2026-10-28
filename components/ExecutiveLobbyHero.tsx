"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, MessageSquare, Compass, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ExecutiveLobbyHeroProps {
  onOpenChat?: () => void;
}

export const ExecutiveLobbyHero: React.FC<ExecutiveLobbyHeroProps> = () => {
  const { language } = useLanguage();
  const isId = language === "id";

  return (
    <section 
      id="foyer" 
      aria-label="Lobi Eksekutif dan Pengenalan Diri"
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12"
    >
      <div className="flex flex-col items-start gap-4 sm:gap-6">
        
        {/* Profile Card & Availability Badge */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 shadow-xs shrink-0">
            <div className="relative w-full h-full rounded-full overflow-hidden border border-white">
              <Image
                src="/foto-zadit.jpg"
                alt="Muhammad Khoiruzzadittaqwa"
                fill
                priority
                fetchPriority="high"
                decoding="async"
                sizes="(max-width: 640px) 56px, 64px"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                Muhammad Khoiruzzadittaqwa
              </span>
              <span className="text-slate-400 text-xs hidden sm:inline">(Zadit)</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-sans font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>
                {isId ? "Tersedia untuk konsultasi & penugasan strategis" : "Available for advisory & strategic initiatives"}
              </span>
            </div>
          </div>
        </div>

        {/* Headline & Kicker (2-Line Iron Rule) */}
        <div className="space-y-2.5 sm:space-y-3 max-w-4xl">
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono font-bold tracking-wider text-slate-600 uppercase">
            <Compass className="w-3.5 h-3.5 text-slate-700" />
            <span>{isId ? "Catatan Praktik & Lobi Strategis" : "Executive Practice & Strategic Foyer"}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-950 tracking-tight leading-[1.18] sm:leading-[1.15]">
            {isId 
              ? "Menjembatani Riset Ilmiah, Data Reputasi, dan Sistem Informasi."
              : "Bridging Scholarly Research, Reputation Intelligence, and Information Systems."}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-sans max-w-3xl">
            {isId
              ? "Ruang kerja terpadu bagi akademisi, pimpinan institusi, dan pendiri usaha. Mengurai data rumit, membentengi reputasi dari krisis informasi, serta merancang dokumen tata kelola dan sistem digital yang berdaya tahan tinggi."
              : "An integrated practice for scholars, institutional leaders, and founders. Untangling complex data, safeguarding reputation against information crises, and engineering resilient governance documents and digital systems."}
          </p>
        </div>

        {/* Mobile-First Dual Thumb Action Buttons */}
        <div className="w-full sm:w-auto grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 sm:pt-2">
          <a
            href="#paviliun"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-heading font-semibold text-xs sm:text-sm shadow-xs transition-colors"
          >
            <ArrowDown className="w-4 h-4 text-slate-300" />
            <span>{isId ? "Telusuri Ruang Praktik" : "Explore Practice Chambers"}</span>
          </a>

          <a
            href="#dialog"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300/90 font-heading font-semibold text-xs sm:text-sm shadow-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-slate-600" />
            <span>{isId ? "Mulai Percakapan Langsung" : "Open Direct Dialogue"}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
