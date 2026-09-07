"use client";

import Link from "next/link";

import React from 'react';
import { FileText, Search, BarChart3, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { cvProfile } from '@/lib/cv-data';
import { useLanguage } from '@/lib/LanguageContext';

const pillarIcons = [FileText, Search, BarChart3, Globe];

export const ServicesSection: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section id="services" className="py-20 px-6 max-w-6xl mx-auto border-t border-slate-200 space-y-24">
      {/* 4 Core Pillars */}
      <div className="space-y-12">
        <div className="space-y-3">
          <span className="font-mono text-xs text-teal-800 font-bold tracking-widest uppercase">
            {lang === 'id' ? '4 Pilar Solusi Terintegrasi' : '4 Integrated Solution Pillars'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            {lang === 'id'
              ? 'Layanan Strategis untuk Bisnis, Lembaga & Akademisi'
              : 'Strategic Capabilities for Business, Non-Profits & Academia'}
          </h2>
          <p className="text-slate-700 text-sm sm:text-base max-w-2xl leading-relaxed font-sans">
            {lang === 'id'
              ? 'Kami tidak memaksakan satu teknologi tunggal. Layanan berfokus menyelesaikan hambatan nyata Anda melalui pendekatan sistematis yang mudah dipahami pemangku kepentingan non-teknis.'
              : 'We do not impose a single tech stack. Solutions focus on resolving your concrete bottlenecks through structured methodologies accessible to non-technical stakeholders.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cvProfile.services.map((svc, idx) => {
            const Icon = pillarIcons[idx % pillarIcons.length];
            const anchorIds = ["layanan-dokumen", "layanan-seo", "layanan-riset", "layanan-web"];
            const pillarRoutes = [
              "/layanan/dokumen-administrasi-bisnis",
              "/layanan/seo-konten-konversi",
              "/layanan/olah-data-statistik-sinta",
              "/layanan/solusi-web-performa"
            ];
            const cardAnchor = anchorIds[idx] || svc.id;
            const targetRoute = pillarRoutes[idx] || "#services";

            return (
              <div
                key={svc.id}
                id={cardAnchor}
                className="bg-white border border-slate-200 hover:border-teal-600 rounded-2xl p-7 shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between space-y-6 scroll-mt-28"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-300 flex items-center justify-center text-teal-800">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-slate-700 uppercase font-bold">
                      {lang === 'id' ? `Pilar 0${idx + 1}` : `Pillar 0${idx + 1}`}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-xl text-slate-900">
                      {svc.title[lang]}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed font-sans mt-2">
                      {svc.shortDesc[lang]}
                    </p>
                  </div>

                  {/* Deliverables List with Accessible Contrast */}
                  <div className="space-y-2.5 pt-2">
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800">
                      {lang === 'id' ? 'Hasil Kerja Nyata (Deliverables):' : 'Key Deliverables:'}
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-800 font-sans">
                      {svc.deliverables[lang].map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700 font-sans">
                  <span>
                    <strong className="text-slate-900 font-bold">{lang === 'id' ? 'Relevan untuk: ' : 'Best for: '}</strong>
                    {svc.audience[lang]}
                  </span>
                  <Link
                    href={targetRoute}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 shrink-0"
                  >
                    <span>{lang === 'id' ? 'Pelajari Selengkapnya' : 'Learn More'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modular Service Packages */}
      <div id="packages" className="space-y-12 pt-6">
        <div className="space-y-3">
          <span className="font-mono text-xs text-teal-800 font-bold tracking-widest uppercase">
            {lang === 'id' ? 'Pilihan Kerjasama Modular' : 'Modular Engagement Packages'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            {lang === 'id'
              ? 'Model Kolaborasi yang Menyesuaikan Kebutuhan Anda'
              : 'Flexible Engagement Models to Match Your Timeline'}
          </h2>
          <p className="text-slate-700 text-sm sm:text-base max-w-2xl leading-relaxed font-sans">
            {lang === 'id'
              ? 'Mulai dari pemeriksaan singkat tanpa komitmen hingga pengerjaan tuntas dan pendampingan berkala.'
              : 'From a zero-commitment initial diagnosis to complete project delivery and ongoing advisory.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cvProfile.packages.map((pkg, idx) => (
            <div
              key={pkg.id}
              className={`bg-white border rounded-2xl p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6 ${
                idx === 1
                  ? 'border-teal-700 ring-2 ring-teal-700/20 relative'
                  : 'border-slate-200'
              }`}
            >
              {idx === 1 && (
                <span className="absolute -top-3.5 left-6 font-mono text-xs font-bold uppercase tracking-wider bg-teal-800 text-white px-3 py-1 rounded-full shadow-xs">
                  {lang === 'id' ? 'Paling Sering Dipilih' : 'Most Popular'}
                </span>
              )}

              <div className="space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <span className="font-mono text-xs text-slate-800 font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
                    {pkg.duration[lang]}
                  </span>
                  <span className="font-mono text-xs text-teal-800 font-bold">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl text-slate-900">
                    {pkg.name[lang]}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans mt-2">
                    {pkg.tagline[lang]}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-sans">
                  <strong className="text-slate-900 font-bold">{lang === 'id' ? 'Cocok untuk: ' : 'Ideal for: '}</strong>
                  {pkg.bestFor[lang]}
                </div>

                <div className="space-y-2.5 pt-2">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800">
                    {lang === 'id' ? 'Cakupan Layanan:' : 'What is Included:'}
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-800 font-sans">
                    {pkg.features[lang].map((ft, ftIdx) => (
                      <li key={ftIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                        <span>{ft}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <a
                  href="#consultation"
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-teal-700 hover:text-white text-slate-900 font-heading font-bold uppercase tracking-wider text-xs py-3.5 rounded-xl border border-slate-300 hover:border-teal-700 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                >
                  <span>{lang === 'id' ? 'Pilih Paket Ini' : 'Select Package'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech-Agnostic Tool Follows Goal with WCAG AAA Contrast */}
      <div className="space-y-8 pt-6">
        <div className="space-y-2">
          <span className="font-mono text-xs text-slate-700 font-bold tracking-widest uppercase">
            {lang === 'id' ? 'Filosofi Teknologi' : 'Technology Philosophy'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
            Tool Follows Goal: {lang === 'id' ? 'Teknologi Menyesuaikan Kebutuhan Klien' : 'Tools Adapt to Client Goals'}
          </h2>
          <p className="text-slate-700 text-xs sm:text-sm max-w-2xl leading-relaxed font-sans">
            {lang === 'id'
              ? 'Kami tidak mewajibkan perombakan sistem yang mahal. Kami siap mengoptimalkan platform yang sudah Anda miliki atau membangun solusi kustom yang paling efisien.'
              : 'We do not force expensive stack migrations. We adapt to your established systems or deploy lightweight, zero-maintenance custom solutions.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cvProfile.toolCategories.map((cat, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-3">
              <h4 className="font-heading font-bold text-base text-slate-900">
                {cat.category[lang]}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                {cat.description[lang]}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200">
                {cat.tools.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    className="font-mono text-xs px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-800 font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
