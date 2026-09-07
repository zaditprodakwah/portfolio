"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ChevronDown, Sparkles, Clock, Layers, ShieldCheck } from "lucide-react";
import { cvProfile } from "@/lib/cv-data";

export const ServicesSection: React.FC = () => {
    // Single-Open Accordion state for mobile: default first service open
  const [openServiceId, setOpenServiceId] = useState<string | null>(cvProfile.services[0].id);
  // Mobile package tab index: 0 = 1-2 Hari, 1 = 1-3 Minggu (Most popular), 2 = Bulanan
  const [activePackageTab, setActivePackageTab] = useState<number>(1);

  useEffect(() => {
    const handleOpenAccordion = (e: Event) => {
      const customEvent = e as CustomEvent<{ serviceId: string; elementId: string }>;
      if (customEvent.detail && customEvent.detail.serviceId) {
        setOpenServiceId(customEvent.detail.serviceId);
      }
    };

    window.addEventListener("open-service-accordion", handleOpenAccordion);
    return () => window.removeEventListener("open-service-accordion", handleOpenAccordion);
  }, []);

  const toggleService = (id: string) => {
    setOpenServiceId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="py-10 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto space-y-12 sm:space-y-16">
      {/* 4 Core Specialized Services */}
      <div className="space-y-8 sm:space-y-12">
        <div className="space-y-3">
          <span className="font-mono text-xs text-teal-800 font-bold tracking-widest uppercase">
            {true ? "Layanan Terfokus" : "Core Practice Areas"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            {true
              ? "Layanan Terfokus yang Kami Kerjakan Secara Mandiri"
              : "Specialized Services Delivered with Direct Accountability"}
          </h2>
          <p className="text-slate-700 text-xs sm:text-base max-w-2xl leading-relaxed font-sans">
            {true
              ? "Setiap layanan dikerjakan secara langsung dengan pendekatan metodologis yang terstandar, transparan, dan dapat dipertanggungjawabkan tanpa pihak ketiga."
              : "Each capability is executed directly with established frameworks, full transparency, and verifiable deliverables without agency overhead."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {cvProfile.services.map((svc) => {
            const isOpen = openServiceId === svc.id;
            const targetRoute =
              svc.id === "business-docs"
                ? "/layanan/dokumen-administrasi-bisnis"
                : svc.id === "seo-growth"
                ? "/layanan/seo-konten-konversi"
                : svc.id === "academic-data"
                ? "/layanan/olah-data-statistik-sinta"
                : "/layanan/solusi-web-performa";

            const elementId =
              svc.id === "business-docs"
                ? "layanan-dokumen"
                : svc.id === "academic-data"
                ? "layanan-riset"
                : svc.id === "web-solutions"
                ? "layanan-web"
                : "layanan-seo";

            return (
              <div
                key={svc.id}
                id={elementId}
                className={`bg-white border rounded-2xl p-5 sm:p-7 shadow-xs transition-all duration-300 flex flex-col justify-between ${
                  isOpen ? "border-teal-600/80 ring-1 ring-teal-500/20 shadow-sm" : "border-slate-200/90 hover:border-slate-300"
                }`}
              >
                <div>
                  {/* Service Header / Accordion Trigger */}
                  <div
                    onClick={() => toggleService(svc.id)}
                    className="cursor-pointer md:cursor-default flex items-start justify-between gap-3 select-none"
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") toggleService(svc.id);
                    }}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-teal-800 font-bold uppercase tracking-wider">
                          {svc.deliverables.id[0] ? svc.deliverables.id[0].split(" ")[0] : "Layanan"}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 leading-snug">
                        {svc.title.id}
                      </h3>
                    </div>
                    <button
                      type="button"
                      aria-label="Toggle details"
                      className="md:hidden text-slate-500 hover:text-teal-700 p-1 transition-transform"
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          isOpen ? "transform rotate-180 text-teal-700" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Body Content: Collapsible on Mobile, Always Visible on Desktop */}
                  <div className={`mt-4 space-y-4 ${isOpen ? "block" : "hidden md:block"}`}>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                      {svc.shortDesc.id}
                    </p>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                      <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                        {true ? "Spesifikasi Output Kerja:" : "Concrete Deliverables:"}
                      </p>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-800 font-sans">
                        {svc.deliverables.id.map((item, itemIdx) => (
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
                    <strong className="text-slate-900 font-bold">{true ? "Relevan untuk: " : "Best for: "}</strong>
                    {svc.audience.id}
                  </span>
                  <Link
                    href={targetRoute}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 shrink-0"
                  >
                    <span>{true ? "Lihat Spesifikasi & Output" : "View Specifications"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modular Service Packages with Anchoring & Compact Tab Packaging on Mobile */}
      <div id="packages" className="space-y-6 sm:space-y-10 pt-4">
        <div className="space-y-3">
          <span className="font-mono text-xs text-teal-800 font-bold tracking-widest uppercase">
            {true ? "Pilihan Kerjasama Modular" : "Modular Engagement Packages"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            {true
              ? "Model Kolaborasi yang Menyesuaikan Kebutuhan Anda"
              : "Flexible Engagement Models to Match Your Timeline"}
          </h2>
          <p className="text-slate-700 text-xs sm:text-base max-w-2xl leading-relaxed font-sans">
            {true
              ? "Mulai dari pemeriksaan singkat tanpa komitmen hingga pengerjaan tuntas dan pendampingan berkala."
              : "From a zero-commitment initial diagnosis to complete project delivery and ongoing advisory."}
          </p>
        </div>

        {/* Mobile Segmented Tab Switcher (Visible on Mobile only) */}
        <div className="flex sm:hidden p-1 rounded-xl bg-slate-200/80 border border-slate-300/80 gap-1 text-xs font-heading font-bold">
          {cvProfile.packages.map((pkg, idx) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setActivePackageTab(idx)}
              className={`flex-1 py-2 px-1 text-center rounded-lg transition-all text-[11px] truncate ${
                activePackageTab === idx
                  ? "bg-white text-teal-900 shadow-xs border border-slate-200/60 font-extrabold"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              {idx === 0 ? "1-2 Hari" : idx === 1 ? "1-3 Minggu" : "Bulanan"}
            </button>
          ))}
        </div>

        {/* Packages Display: Single Active Card on Mobile, 3-Column Grid on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cvProfile.packages.map((pkg, idx) => {
            const isTabActive = activePackageTab === idx;
            return (
              <div
                key={pkg.id}
                className={`bg-white border rounded-2xl p-5 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-5 ${
                  idx === 1
                    ? "border-teal-700 ring-2 ring-teal-700/20 relative"
                    : "border-slate-200"
                } ${isTabActive ? "flex" : "hidden sm:flex"}`}
              >
                {idx === 1 && (
                  <span className="absolute -top-3.5 left-6 font-mono text-[11px] font-bold uppercase tracking-wider bg-teal-800 text-white px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-teal-300" />
                    {true ? "Paling Sering Dipilih" : "Most Popular"}
                  </span>
                )}

                <div className="space-y-3.5">
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-mono text-xs text-slate-800 font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-teal-700" />
                      {pkg.duration.id}
                    </span>
                    <span className="font-mono text-xs text-teal-800 font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900">
                      {pkg.name.id}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans mt-1.5">
                      {pkg.tagline.id}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-sans">
                    <strong className="text-slate-900 font-bold">{true ? "Cocok untuk: " : "Ideal for: "}</strong>
                    {pkg.bestFor.id}
                  </div>

                  <div className="space-y-2 pt-1">
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                      {true ? "Cakupan Layanan:" : "What is Included:"}
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-800 font-sans">
                      {pkg.features.id.map((ft, ftIdx) => (
                        <li key={ftIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                          <span>{ft}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <a
                    href="#consultation"
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-teal-700 hover:text-white text-slate-900 font-heading font-bold uppercase tracking-wider text-xs py-3 rounded-xl border border-slate-300 hover:border-teal-700 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                  >
                    <span>{true ? "Diskusikan Paket Ini" : "Select Package"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tech-Agnostic Tool Follows Goal with WCAG AAA Contrast */}
      <div className="space-y-6 pt-4">
        <div className="space-y-2">
          <span className="font-mono text-xs text-slate-700 font-bold tracking-widest uppercase">
            {true ? "Filosofi Kerja" : "Execution Philosophy"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
            Tool Follows Goal: {true ? "Metode Menyesuaikan Kebutuhan Nyata Klien" : "Tools Adapt to Client Goals"}
          </h2>
          <p className="text-slate-700 text-xs sm:text-sm max-w-2xl leading-relaxed font-sans">
            {true
              ? "Kami tidak mewajibkan perombakan sistem yang mahal. Kami siap mengoptimalkan alat atau platform yang sudah Anda miliki atau merancang solusi kustom yang paling efisien."
              : "We do not force expensive stack migrations. We adapt to your established systems or deploy lightweight, zero-maintenance custom solutions."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cvProfile.toolCategories.map((cat, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-3">
              <h3 className="font-heading font-bold text-base text-slate-900">
                {cat.category.id}
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                {cat.description.id}
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
