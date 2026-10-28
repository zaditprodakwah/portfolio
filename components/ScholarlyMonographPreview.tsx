"use client";

import React from "react";
import { BookOpen, ExternalLink, CheckCircle2, Bookmark } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const ScholarlyMonographPreview: React.FC = () => {
  const { language } = useLanguage();
  const isId = language === "id";

  return (
    <section 
      id="karya" 
      aria-label="Karya Kesarjanaan Terverifikasi"
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10"
    >
      <div className="relative rounded-3xl p-1 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 border border-slate-300/80 shadow-xs">
        <div className="rounded-[22px] p-5 sm:p-8 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200">
              <Bookmark className="w-3 h-3 text-amber-700" />
              <span>{isId ? "MANUSKRIP BUKU REFERENSI RISET" : "SCHOLARLY REFERENCE MONOGRAPH"}</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-lg sm:text-2xl font-heading font-extrabold text-slate-900 tracking-tight leading-snug">
                Jangkar & Kompas Riset Ilmiah
              </h2>
              <p className="text-xs sm:text-sm font-sans font-medium text-slate-600">
                Navigasi Akselerasi dan Kendali Mutu dari Fondasi Klasik Menuju Ekosistem Kontemporer
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {isId
                ? "Cetak biru metodologi riset 18 bab karya Muhammad Khoiruzzadittaqwa. Menguraikan 6 tradisi keilmuan, hierarki pembuktian klaim ilmiah, presisi sitasi akademik, dan kepatuhan regulasi publikasi nasional."
                : "An 18-chapter research methodology blueprint by Muhammad Khoiruzzadittaqwa. Formulating 6 epistemic traditions, hierarchical claim structures, academic citation precision, and regulatory publishing compliance."}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] sm:text-xs text-slate-600 font-sans pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                18 Bab Metodologi Terstruktur
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Hierarki Logika Toulmin
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Standar Kepmendiktisaintek 39/2026
              </span>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0 pt-2 md:pt-0">
            <a
              href="https://ilmify.id/arsitektur-kesarjanaan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-heading font-semibold text-xs sm:text-sm shadow-xs transition-colors"
            >
              <BookOpen className="w-4 h-4 text-slate-300" />
              <span>{isId ? "Telaah Silabus Manuskrip" : "Review Manuscript Syllabus"}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
