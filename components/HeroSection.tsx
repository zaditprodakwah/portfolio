"use client";

import { PersonalGreetingCapsule } from "./PersonalGreetingCapsule";
import { AudienceQualifier } from "./AudienceQualifier";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquareCode, Download, CheckCircle2, FileText, BarChart3, Search, Globe, ExternalLink } from 'lucide-react';
import { cvProfile } from '@/lib/cv-data';
import { useLanguage } from '@/lib/LanguageContext';

interface HeroSectionProps {
  onOpenChat: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenChat }) => {
  const { lang } = useLanguage();
  const stats = cvProfile.stats[lang];

  return (
    <section id="hero" className="pt-28 pb-16 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center">
      {/* Sapaan Personal Hangat & Status Ketersediaan */}
      <PersonalGreetingCapsule lang={lang} />

      {/* Interactive Audience & Problem Qualifier */}
      <AudienceQualifier lang={lang} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-7">
          {/* Status Badge with WCAG AAA Contrast */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-300">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-700 animate-pulse"></span>
            <span className="font-mono text-xs tracking-wider uppercase font-bold text-teal-900">
              {lang === 'id'
                ? 'Kesiapan: Terbuka untuk Konsultasi Proyek & Kemitraan'
                : 'Availability: Open for Project Consulting & Strategic Advisory'}
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <p className="font-mono text-xs text-slate-700 uppercase tracking-widest font-bold">
              Muhammad Khoiruzzadittaqwa ({cvProfile.nickname})
            </p>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-slate-900 leading-[1.18]">
              {lang === 'id' ? (
                <>
                  Membantu Bisnis, Lembaga, dan Riset <br className="hidden sm:inline" />
                  <span className="text-teal-800">Berkembang Lewat Strategi yang Terukur.</span>
                </>
              ) : (
                <>
                  Empowering Businesses, Institutions & Research <br className="hidden sm:inline" />
                  <span className="text-teal-800">with Measurable, Practical Strategies.</span>
                </>
              )}
            </h1>
          </div>

          {/* High-Contrast Body Copy */}
          <p className="text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed font-sans font-normal">
            {cvProfile.summaries[lang]}
          </p>

          {/* Action Buttons with Double CV Access */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#consultation"
              className="inline-flex items-center gap-2.5 bg-teal-700 hover:bg-teal-800 text-white font-heading font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl shadow-sm transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
            >
              <span>{lang === 'id' ? 'Mulai Konsultasi Kebutuhan' : 'Discuss Your Project'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <Link
              href="/cv"
              className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-teal-700 text-slate-800 hover:text-teal-800 font-heading font-bold uppercase tracking-wider text-xs px-5 py-3.5 rounded-xl shadow-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
            >
              <FileText className="w-4 h-4 text-teal-700" />
              <span>{lang === 'id' ? 'Lihat CV' : 'View CV'}</span>
            </Link>

            <a
              href="/cv.pdf"
              download="Muhammad_Khoiruzzadittaqwa_CV.pdf"
              className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-slate-500 text-slate-800 font-heading font-bold uppercase tracking-wider text-xs px-5 py-3.5 rounded-xl shadow-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>{lang === 'id' ? 'Unduh PDF' : 'Download PDF'}</span>
            </a>

            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-2 bg-slate-100 border border-slate-300 hover:bg-white hover:border-teal-700 text-slate-800 font-heading font-bold uppercase tracking-wider text-xs px-4 py-3.5 rounded-xl shadow-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
            >
              <MessageSquareCode className="w-4 h-4 text-teal-700" />
              <span>{lang === 'id' ? 'Tanya AI' : 'Ask AI'}</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-700 font-sans font-medium">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
              <span>{lang === 'id' ? 'Netral Terhadap Teknologi' : 'Tech-Agnostic Approach'}</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
              <span>{lang === 'id' ? 'Bahasa Bersahabat Non-Teknis' : 'Non-Technical Friendly'}</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
              <span>{lang === 'id' ? 'Privasi Data Aman' : 'Strict Data Privacy'}</span>
            </span>
          </div>
        </div>

        {/* Right Column: 4 Solution Pillars Quick Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                {lang === 'id' ? '4 Solusi Terintegrasi' : '4 Integrated Capabilities'}
              </span>
              <span className="font-mono text-xs text-teal-900 font-bold px-2.5 py-0.5 rounded-md bg-teal-50 border border-teal-300">
                VERIFIED
              </span>
            </div>

            <div className="space-y-3.5 text-xs font-sans">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-bold text-slate-900 text-sm">
                    {lang === 'id' ? 'Proposal Bisnis & Pitch Deck' : 'Business Proposals & Pitch Decks'}
                  </p>
                  <p className="text-slate-700 text-xs mt-0.5">
                    {lang === 'id' ? 'Studi kelayakan, proyeksi kas, dan slide kemitraan' : 'Feasibility, financial cash flows, investor decks'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-bold text-slate-900 text-sm">
                    {lang === 'id' ? 'SEO & Pertumbuhan Konten Konversi' : 'SEO & Conversion Content'}
                  </p>
                  <p className="text-slate-700 text-xs mt-0.5">
                    {lang === 'id' ? 'Pencarian berniat beli, on-page, dan artikel edukatif' : 'High-intent search, on-page, lead generation copy'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-bold text-slate-900 text-sm">
                    {lang === 'id' ? 'Riset Akademik & Olah Data Statistik' : 'Academic Research & Data Modeling'}
                  </p>
                  <p className="text-slate-700 text-xs mt-0.5">
                    {lang === 'id' ? 'Analisis kuantitatif SPSS/Python dan publikasi SINTA' : 'SPSS/Python quantitative analysis, SINTA journals'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-bold text-slate-900 text-sm">
                    {lang === 'id' ? 'Solusi Digital & Web Cepat' : 'High-Performance Web Solutions'}
                  </p>
                  <p className="text-slate-700 text-xs mt-0.5">
                    {lang === 'id' ? 'Situs cepat ramah ponsel (WordPress, custom, cloud)' : 'Mobile-speed web upgrades (WordPress, custom, edge)'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <a
                href={cvProfile.contact.sribuProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-teal-800 hover:text-teal-950 font-bold flex items-center justify-between"
              >
                <span>{lang === 'id' ? 'Lihat Reputasi & Ulasan Klien di Sribu' : 'View Verified Sribu Reviews'}</span>
                <span className="text-sm">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Counter Bar with WCAG AAA Contrast */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-slate-200">
        {stats.map((st, idx) => (
          <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
            <p className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">
              {st.value}
            </p>
            <p className="font-mono text-xs text-slate-700 uppercase tracking-wider mt-1.5 font-bold">
              {st.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
