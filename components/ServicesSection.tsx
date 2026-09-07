"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { cvProfile } from "@/lib/cv-data";
import { useLanguage } from "@/lib/LanguageContext";

export const ServicesSection: React.FC = () => {
  const { lang } = useLanguage();
  // Single-Open Accordion state for mobile: default first service open
  const [openServiceId, setOpenServiceId] = useState<string | null>(cvProfile.services[0].id);

  const toggleService = (id: string) => {
    setOpenServiceId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="py-10 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto space-y-12 sm:space-y-16">
      {/* 4 Core Specialized Services */}
      <div className="space-y-8 sm:space-y-12">
        <div className="space-y-3">
          <span className="font-mono text-xs text-teal-800 font-bold tracking-widest uppercase">
            {lang === "id" ? "Layanan Terfokus" : "Core Practice Areas"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            {lang === "id"
              ? "Layanan Terfokus yang Kami Kerjakan Secara Mandiri"
              : "Specialized Services Delivered with Direct Accountability"}
          </h2>
          <p className="text-slate-700 text-xs sm:text-base max-w-2xl leading-relaxed font-sans">
            {lang === "id"
              ? "Setiap layanan dikerjakan secara langsung dengan pendekatan metodologis yang terstandar, transparan, dan dapat dipertanggungjawabkan tanpa pihak ketiga."
              : "Each capability is executed directly with established frameworks, full transparency, and verifiable deliverables without agency overhead."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {cvProfile.services.map((svc) => {
            const isOpen = openServiceId === svc.id;
            const targetRoute =
              svc.id === "admin-docs"
                ? "/layanan/dokumen-administrasi-bisnis"
                : svc.id === "conversion-seo"
                ? "/layanan/seo-konten-konversi"
                : svc.id === "academic-stats"
                ? "/layanan/olah-data-statistik-sinta"
                : "/layanan/solusi-web-performa";

            return (
              <div
                key={svc.id} id={svc.id === "admin-docs" ? "layanan-dokumen" : svc.id === "academic-stats" ? "layanan-riset" : svc.id === "web-performance" ? "layanan-web" : "layanan-seo"}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs hover:border-teal-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Service Header / Accordion Trigger */}
                  <div
                    onClick={() => toggleService(svc.id)}
                    className="cursor-pointer md:cursor-default flex items-start justify-between gap-3 select-none"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleService(svc.id);
                      }
                    }}
                    aria-expanded={isOpen}
                  >
                    <div>
                      <h3 className="font-heading font-bold text-lg sm:text-2xl text-slate-900 tracking-tight">
                        {svc.title[lang]}
                      </h3>
                    </div>

                    {/* Mobile Accordion Chevron */}
                    <div className="md:hidden shrink-0 mt-1 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 transition-transform duration-200">
                      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180 text-teal-700" : ""}`} />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans mt-3">
                    {svc.shortDesc[lang]}
                  </p>

                  {/* Collapsible Content on Mobile, Always Visible on Desktop */}
                  <div className={`mt-5 space-y-5 md:block ${isOpen ? "block animate-in fade-in duration-200" : "hidden"}`}>
                    <div className="space-y-2.5">
                      <p className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-800">
                        {lang === "id" ? "Hasil Kerja Nyata (Deliverables):" : "Key Deliverables:"}
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
                </div>

                <div className="pt-4 mt-5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700 font-sans">
                  <span>
                    <strong className="text-slate-900 font-bold">{lang === "id" ? "Relevan untuk: " : "Best for: "}</strong>
                    {svc.audience[lang]}
                  </span>
                  <Link
                    href={targetRoute}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 shrink-0"
                  >
                    <span>{lang === "id" ? "Pelajari Selengkapnya" : "Learn More"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modular Service Packages with Anchoring & Center-Stage Effect */}
      <div id="packages" className="space-y-8 sm:space-y-12 pt-4">
        <div className="space-y-3">
          <span className="font-mono text-xs text-teal-800 font-bold tracking-widest uppercase">
            {lang === "id" ? "Pilihan Kerjasama Modular" : "Modular Engagement Packages"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            {lang === "id"
              ? "Model Kolaborasi yang Menyesuaikan Kebutuhan Anda"
              : "Flexible Engagement Models to Match Your Timeline"}
          </h2>
          <p className="text-slate-700 text-xs sm:text-base max-w-2xl leading-relaxed font-sans">
            {lang === "id"
              ? "Mulai dari pemeriksaan singkat tanpa komitmen hingga pengerjaan tuntas dan pendampingan berkala."
              : "From a zero-commitment initial diagnosis to complete project delivery and ongoing advisory."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cvProfile.packages.map((pkg, idx) => (
            <div
              key={pkg.id}
              className={`bg-white border rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6 ${
                idx === 1
                  ? "border-teal-700 ring-2 ring-teal-700/20 relative"
                  : "border-slate-200"
              }`}
            >
              {idx === 1 && (
                <span className="absolute -top-3.5 left-6 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-teal-800 text-white px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-teal-300" />
                  {lang === "id" ? "Paling Sering Dipilih" : "Most Popular"}
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
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900">
                    {pkg.name[lang]}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans mt-2">
                    {pkg.tagline[lang]}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-sans">
                  <strong className="text-slate-900 font-bold">{lang === "id" ? "Cocok untuk: " : "Ideal for: "}</strong>
                  {pkg.bestFor[lang]}
                </div>

                <div className="space-y-2.5 pt-2">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800">
                    {lang === "id" ? "Cakupan Layanan:" : "What is Included:"}
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
                  <span>{lang === "id" ? "Pilih Paket Ini" : "Select Package"}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech-Agnostic Tool Follows Goal with WCAG AAA Contrast */}
      <div className="space-y-6 pt-4">
        <div className="space-y-2">
          <span className="font-mono text-xs text-slate-700 font-bold tracking-widest uppercase">
            {lang === "id" ? "Filosofi Teknologi" : "Technology Philosophy"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
            Tool Follows Goal: {lang === "id" ? "Teknologi Menyesuaikan Kebutuhan Klien" : "Tools Adapt to Client Goals"}
          </h2>
          <p className="text-slate-700 text-xs sm:text-sm max-w-2xl leading-relaxed font-sans">
            {lang === "id"
              ? "Kami tidak mewajibkan perombakan sistem yang mahal. Kami siap mengoptimalkan platform yang sudah Anda miliki atau membangun solusi kustom yang paling efisien."
              : "We do not force expensive stack migrations. We adapt to your established systems or deploy lightweight, zero-maintenance custom solutions."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cvProfile.toolCategories.map((cat, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-3">
              <h3 className="font-heading font-bold text-base text-slate-900">
                {cat.category[lang]}
              </h3>
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
