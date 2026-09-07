'use client';

import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { cvProfile } from '@/lib/cv-data';
import { useLanguage } from '@/lib/LanguageContext';

export const CaseStudiesSection: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section id="case-studies" className="py-20 px-6 max-w-6xl mx-auto border-t border-slate-200 space-y-12">
      <div className="space-y-3">
        <span className="font-mono text-xs text-teal-800 font-bold tracking-widest uppercase">
          {lang === 'id' ? 'Studi Kasus & Hasil Nyata' : 'Case Studies & Concrete Impact'}
        </span>
        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
          {lang === 'id'
            ? 'Bukti Eksekusi Riil Lintas Bidang'
            : 'Verified Client Results Across Real Disciplines'}
        </h2>
        <p className="text-slate-700 text-sm sm:text-base max-w-2xl leading-relaxed font-sans">
          {lang === 'id'
            ? 'Setiap proyek diselesaikan dengan orientasi pada kejelasan narasi, ketelitian data, dan ketercapaian target mitra.'
            : 'Every project is executed with disciplined communication, quantitative rigor, and client milestone delivery.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cvProfile.caseStudies.map((cs) => (
          <div
            key={cs.id}
            className="bg-white border border-slate-200 hover:border-teal-700 rounded-2xl p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-2">
                <span className="font-mono text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-md bg-teal-50 text-teal-900 border border-teal-300">
                  {cs.badge[lang]}
                </span>
                <span className="font-mono text-xs text-slate-800 font-bold">
                  {cs.clientType[lang]}
                </span>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xl text-slate-900 group-hover:text-teal-800 transition-colors leading-snug">
                  {cs.title[lang]}
                </h3>
                <p className="font-mono text-xs text-slate-700 mt-1.5 font-bold">
                  {cs.role[lang]}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {cs.description[lang]}
              </p>

              {/* Metrics Grid with WCAG AAA Contrast */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200">
                {cs.metrics[lang].map((m, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <p className="font-heading font-extrabold text-base sm:text-lg text-slate-900">
                      {m.value}
                    </p>
                    <p className="font-mono text-xs uppercase tracking-wider text-slate-800 mt-1 font-bold">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2.5">
              <p className="font-mono text-xs uppercase tracking-wider text-slate-900 font-bold">
                {lang === 'id' ? 'Catatan Eksekusi Kunci:' : 'Key Execution Takeaways:'}
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-800 font-sans">
                {cs.highlights[lang].map((h, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-sans">
        <p className="text-slate-800 font-medium text-center sm:text-left">
          {lang === 'id'
            ? 'Ingin mendiskusikan kebutuhan serupa untuk bisnis, instansi, atau riset Anda?'
            : 'Looking to achieve similar structured outcomes for your business, organization, or research?'}
        </p>
        <a
          href="#consultation"
          className="inline-flex items-center gap-2 text-teal-800 font-mono uppercase font-bold hover:text-teal-950 shrink-0"
        >
          <span>{lang === 'id' ? 'Mulai Konsultasi Singkat' : 'Start a Brief Discussion'}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
