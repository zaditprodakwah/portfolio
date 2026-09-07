"use client";

import React, { useState } from "react";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { cvProfile } from "@/lib/cv-data";
import { useLanguage } from "@/lib/LanguageContext";

export const CaseStudiesSection: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section id="studi-kasus" className="py-10 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-slate-200 space-y-8 sm:space-y-12">
      <div className="space-y-3">
        <span className="font-mono text-xs text-teal-800 font-bold tracking-widest uppercase">
          {lang === "id" ? "Studi Kasus & Hasil Nyata" : "Case Studies & Concrete Impact"}
        </span>
        <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
          {lang === "id"
            ? "Bukti Eksekusi Riil Lintas Bidang"
            : "Verified Client Results Across Real Disciplines"}
        </h2>
        <p className="text-slate-700 text-xs sm:text-base max-w-2xl leading-relaxed font-sans">
          {lang === "id"
            ? "Setiap proyek diselesaikan dengan orientasi pada kejelasan narasi, ketelitian data, dan ketercapaian target mitra."
            : "Every project is executed with disciplined communication, quantitative rigor, and client milestone delivery."}
        </p>
      </div>

      {/* Responsive Horizontal Snap Carousel on Mobile, 2-Column Grid on Desktop */}
      <div className="flex md:grid md:grid-cols-2 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory gap-4 sm:gap-8 pb-4 md:pb-0 scrollbar-thin">
        {cvProfile.caseStudies.map((cs) => (
          <div
            key={cs.id}
            className="min-w-[85vw] sm:min-w-[420px] md:min-w-0 snap-center bg-white border border-slate-200/90 hover:border-teal-700 rounded-2xl p-5 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-5 sm:space-y-6 group shrink-0 md:shrink"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-2">
                <span className="font-mono text-[11px] sm:text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-teal-50 text-teal-900 border border-teal-300">
                  {cs.badge[lang]}
                </span>
                <span className="font-mono text-xs text-slate-700 font-bold">
                  {cs.clientType[lang]}
                </span>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 group-hover:text-teal-800 transition-colors leading-snug">
                  {cs.title[lang]}
                </h3>
                <p className="font-mono text-xs text-teal-800 mt-1 font-bold">
                  {cs.role[lang]}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {cs.description[lang]}
              </p>

              {/* Metrics Grid with WCAG AAA Contrast */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-3 border-t border-slate-200">
                {cs.metrics[lang].map((m, idx) => (
                  <div key={idx} className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200">
                    <p className="font-heading font-extrabold text-base sm:text-lg text-slate-900">
                      {m.value}
                    </p>
                    <p className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-slate-700 mt-0.5 font-bold">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2.5">
              <p className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-slate-900 font-bold">
                {lang === "id" ? "Catatan Eksekusi Kunci:" : "Key Execution Takeaways:"}
              </p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-800 font-sans">
                {cs.highlights[lang].map((h, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-sans">
        <p className="text-slate-800 font-medium text-center sm:text-left">
          {lang === "id"
            ? "Ingin mendiskusikan kebutuhan serupa untuk bisnis, instansi, atau riset Anda?"
            : "Looking to achieve similar structured outcomes for your business, organization, or research?"}
        </p>
        <a
          href="#consultation"
          className="inline-flex items-center gap-2 text-teal-800 font-mono uppercase font-bold hover:text-teal-950 shrink-0"
        >
          <span>{lang === "id" ? "Mulai Konsultasi Singkat" : "Start a Brief Discussion"}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
