"use client";

import React, { useRef, useState, useEffect } from "react";
import { CheckCircle2, ArrowRight, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { cvProfile } from "@/lib/cv-data";
import { useLanguage } from "@/lib/LanguageContext";

export const CaseStudiesSection: React.FC = () => {
  const { lang } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const totalCases = cvProfile.caseStudies.length;

  const scrollToIndex = (idx: number) => {
    const clampedIdx = Math.max(0, Math.min(totalCases - 1, idx));
    setActiveIdx(clampedIdx);
    if (carouselRef.current) {
      const cards = carouselRef.current.children;
      if (cards[clampedIdx]) {
        const card = cards[clampedIdx] as HTMLElement;
        const containerLeft = carouselRef.current.getBoundingClientRect().left;
        const cardLeft = card.getBoundingClientRect().left;
        carouselRef.current.scrollBy({
          left: cardLeft - containerLeft - 16, // 16px offset for comfortable padding
          behavior: "smooth"
        });
      }
    }
  };

  const handlePrev = () => {
    scrollToIndex(activeIdx - 1);
  };

  const handleNext = () => {
    scrollToIndex(activeIdx + 1);
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const cardWidth = 320; // approximate card step width on mobile
      const newIdx = Math.round(scrollLeft / cardWidth);
      if (newIdx !== activeIdx && newIdx >= 0 && newIdx < totalCases) {
        setActiveIdx(newIdx);
      }
    }
  };

  return (
    <section
      id="studi-kasus"
      className="w-full max-w-6xl mx-auto min-w-0 py-10 sm:py-20 px-4 sm:px-6 border-t border-slate-200 space-y-8 sm:space-y-12 box-border"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full min-w-0">
        <div className="space-y-3 max-w-2xl">
          <span className="font-mono text-xs text-teal-800 font-bold tracking-widest uppercase">
            {lang === "id" ? "Studi Kasus & Hasil Nyata" : "Case Studies & Concrete Impact"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            {lang === "id"
              ? "Bukti Eksekusi Riil Lintas Bidang"
              : "Verified Client Results Across Real Disciplines"}
          </h2>
          <p className="text-slate-700 text-xs sm:text-base leading-relaxed font-sans">
            {lang === "id"
              ? "Setiap proyek diselesaikan dengan orientasi pada kejelasan narasi, ketelitian data, dan ketercapaian target mitra."
              : "Every project is executed with disciplined communication, quantitative rigor, and client milestone delivery."}
          </p>
        </div>

        {/* Mobile carousel navigation controls (Hidden on Desktop md:hidden) */}
        <div className="flex md:hidden items-center justify-between gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 w-full sm:w-auto">
          {/* Dot Indicators */}
          <div className="flex items-center gap-1.5">
            {cvProfile.caseStudies.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToIndex(idx)}
                className={`transition-all rounded-full h-2 ${
                  activeIdx === idx ? "w-6 bg-teal-700" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Lihat studi kasus ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-600 font-bold">
              {activeIdx + 1} / {totalCases}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIdx === 0}
                className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
                aria-label="Studi kasus sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeIdx === totalCases - 1}
                className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
                aria-label="Studi kasus berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Case Studies Container:
          - Mobile (< md): Horizontal snap carousel with dedicated card width & right spacer
          - Desktop (>= md): Clean 2x2 grid displaying all 4 cards simultaneously with zero scrolling required
      */}
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex md:grid md:grid-cols-2 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory gap-4 sm:gap-6 pb-4 md:pb-0 w-full min-w-0 max-w-full scrollbar-none pr-4 md:pr-0"
      >
        {cvProfile.caseStudies.map((cs) => (
          <div
            key={cs.id}
            className="w-[85vw] max-w-[340px] sm:max-w-[380px] md:w-full md:max-w-none snap-start bg-white border border-slate-200/90 hover:border-teal-700 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 sm:space-y-6 group shrink-0 md:shrink"
          >
            <div className="space-y-3.5">
              <div className="flex justify-between items-start gap-2">
                <span className="font-mono text-[11px] sm:text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-teal-50 text-teal-900 border border-teal-300">
                  {cs.badge[lang]}
                </span>
                <span className="font-mono text-xs text-slate-700 font-bold">
                  {cs.clientType[lang]}
                </span>
              </div>

              <div>
                <h3 className="font-heading font-bold text-base sm:text-xl text-slate-900 group-hover:text-teal-800 transition-colors leading-snug">
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
              <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2.5 border-t border-slate-200">
                {cs.metrics[lang].map((m, mIdx) => (
                  <div key={mIdx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
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

            <div className="pt-3.5 border-t border-slate-200 space-y-2">
              <p className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-slate-900 font-bold">
                {lang === "id" ? "Catatan Eksekusi Kunci:" : "Key Execution Takeaways:"}
              </p>
              <ul className="space-y-1.5 text-xs text-slate-800 font-sans">
                {cs.highlights[lang].map((h, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Discussion Bottom Banner: Compact, Responsive, 100% Contained */}
      <div className="w-full min-w-0 max-w-full box-border mt-8 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-sans mb-4 sm:mb-0">
        <div className="flex items-center gap-3 text-center sm:text-left min-w-0">
          <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-800 shrink-0 hidden sm:flex">
            <MessageSquare className="w-4 h-4" />
          </div>
          <p className="text-slate-800 font-medium leading-snug">
            {lang === "id"
              ? "Ingin mendiskusikan kebutuhan serupa untuk bisnis, instansi, atau riset Anda?"
              : "Looking to achieve similar structured outcomes for your business, organization, or research?"}
          </p>
        </div>
        <a
          href="#consultation"
          className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 text-teal-800 font-heading text-xs uppercase font-bold hover:text-teal-950 bg-teal-50 hover:bg-teal-100 px-4 py-2.5 rounded-xl border border-teal-200 transition-colors"
        >
          <span>{lang === "id" ? "Mulai Diskusi Kebutuhan" : "Start a Discussion"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
