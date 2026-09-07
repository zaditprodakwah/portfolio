"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  MessageSquareCode, 
  Download, 
  CheckCircle2, 
  FileText, 
  BarChart3, 
  Search, 
  Globe, 
  ExternalLink,
  Sparkles,
  BookOpen,
  Layers,
  FileCheck2
} from "lucide-react";
import { cvProfile } from "@/lib/cv-data";
import { useLanguage } from "@/lib/LanguageContext";
import { AudienceQualifier } from "./AudienceQualifier";

interface HeroSectionProps {
  onOpenChat: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenChat }) => {
  const { lang } = useLanguage();
  const stats = cvProfile.stats[lang];

  // 4 Interactive Rotating Problem-Solution Pillars
  const pillars = [
    {
      id: "sinta",
      label: lang === "id" ? "Publikasi SINTA" : "SINTA Research",
      icon: BookOpen,
      color: "teal",
      headline: lang === "id" 
        ? "Merapikan naskah riset & sitasi Mendeley agar lolos desk review jurnal akreditasi tanpa cemas revisi berulang." 
        : "Reconstructing research manuscripts & Mendeley citations to pass journal desk reviews without repeated revisions.",
      badge: lang === "id" ? "Format IMRaD & Mendeley Siap Telaah" : "IMRaD Structure & Automated Citations",
      link: "/layanan/olah-data-statistik-sinta"
    },
    {
      id: "stats",
      label: lang === "id" ? "Olah Data Statistik" : "Statistical Modeling",
      icon: BarChart3,
      color: "violet",
      headline: lang === "id" 
        ? "Membedah uji hipotesis rumit (SPSS, SmartPLS 4, AMOS) menjadi laporan interpretasi siap sidang & publikasi." 
        : "Demystifying hypothesis testing (SPSS, SmartPLS 4, AMOS) into clear, defensible reporting standards.",
      badge: lang === "id" ? "Transparan, Bebas Pelanggaran Asumsi" : "Transparent & Robust Residual Tests",
      link: "/layanan/olah-data-statistik-sinta"
    },
    {
      id: "web",
      label: lang === "id" ? "Web Modern & SEO" : "Web & SEO Growth",
      icon: Globe,
      color: "blue",
      headline: lang === "id" 
        ? "Membangun sistem web performa tinggi yang responsif, cepat (0ms TTFB), dan teroptimasi mesin pencari." 
        : "Engineering lightning-fast Next.js web platforms with programmatic SEO and 0ms TTFB edge caching.",
      badge: lang === "id" ? "Next.js 15 & Cloudflare Pages Edge" : "Zero-Cost Cloudflare Edge Stack",
      link: "/layanan/seo-konten-konversi"
    },
    {
      id: "sop",
      label: lang === "id" ? "Dokumen & SOP" : "Governance & SOP",
      icon: FileCheck2,
      color: "amber",
      headline: lang === "id" 
        ? "Menyusun dokumen legal, tata kelola yayasan, dan proposal kemitraan bisnis dengan akurasi eksekutif." 
        : "Authoring executive SOPs, non-profit governance charters, and winning partnership proposals.",
      badge: lang === "id" ? "Akurasi Dokumen Eksekutif" : "Strict Institutional Compliance",
      link: "/layanan/dokumen-administrasi-bisnis"
    }
  ];

  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  // Auto-Cycling Smooth Slide-Fade (every 3.8s)
  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setActivePillarIndex((prev) => (prev + 1) % pillars.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isAutoCycling, pillars.length]);

  const currentPillar = pillars[activePillarIndex];
  const CurrentIcon = currentPillar.icon;

  return (
    <section id="hero" className="pt-24 sm:pt-28 pb-10 sm:pb-16 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center w-full max-w-full overflow-hidden">
      {/* Floating Non-Intrusive Greeting Capsule */}
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-2">
        <div className="lg:col-span-7 space-y-6">
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-300 max-w-full">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-700 animate-pulse"></span>
            <span className="font-mono text-xs tracking-wider uppercase font-bold text-teal-900">
              {lang === "id"
                ? "Kesiapan: Terbuka untuk Konsultasi & Kemitraan"
                : "Availability: Open for Strategic Advisory"}
            </span>
          </div>

          {/* Master Semantic H1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden ring-2 ring-teal-600/30 shrink-0 shadow-xs bg-slate-100">
                <Image
                  src="/foto-zadit.jpg"
                  alt="Muhammad Khoiruzzadittaqwa"
                  fill
                  sizes="(max-width: 640px) 48px, 56px"
                  className="object-cover"
                  priority
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-xs" title="Online & Siap Kolaborasi" />
              </div>
              <div>
                <p className="font-mono text-xs text-slate-700 uppercase tracking-widest font-bold">
                  Muhammad Khoiruzzadittaqwa ({cvProfile.nickname})
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                    ★ 5.0 Sribulancer
                  </span>
                  <span className="text-[11px] text-slate-600 font-medium">
                    10+ Thn Rekam Jejak
                  </span>
                </div>
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-slate-900 leading-[1.2] break-words">
              {lang === "id" ? (
                <>
                  Solusi Praktis & Presisi untuk <br />
                  <span className="text-teal-800">Dokumen, Riset SINTA, & Web SEO.</span>
                </>
              ) : (
                <>
                  Calm Precision for <br className="hidden sm:inline" />
                  <span className="text-teal-800">Executive Docs, SINTA Research & SEO.</span>
                </>
              )}
            </h1>
          </div>

          {/* Interactive Dynamic Headline Cycler (Pill Switcher + Slide Fade) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-teal-50/40 border border-teal-200/80 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mr-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                {lang === "id" ? "Fokus Masalah:" : "Problem Focus:"}
              </span>
              {pillars.map((p, idx) => {
                const isSelected = idx === activePillarIndex;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setActivePillarIndex(idx);
                      setIsAutoCycling(false); // Pause auto-cycle on user click
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-teal-700 text-white shadow-xs"
                        : "bg-white/80 text-slate-700 hover:bg-white hover:text-teal-800 border border-slate-200/70"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            {/* Rotating Dynamic Content with Slide-Fade */}
            <div className="pt-2 border-t border-slate-200/60 min-h-[70px] flex flex-col justify-center transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-teal-100/70 text-teal-900 border border-teal-200">
                  {currentPillar.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-sans font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-300 key={currentPillar.id}">
                {currentPillar.headline}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 pt-1">
            <a
              href="#consultation"
              className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-heading font-bold uppercase tracking-wider text-xs px-5 py-3 rounded-xl shadow-xs transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
            >
              <span>{lang === "id" ? "Mulai Konsultasi Kebutuhan" : "Discuss Your Project"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <Link
              href="/cv"
              className="inline-flex items-center gap-1.5 bg-white border border-slate-300 hover:border-teal-700 text-slate-800 hover:text-teal-800 font-heading font-bold uppercase tracking-wider text-xs px-4 py-3 rounded-xl shadow-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
            >
              <FileText className="w-3.5 h-3.5 text-teal-700" />
              <span>{lang === "id" ? "Lihat CV" : "View CV"}</span>
            </Link>

            <a
              href="/cv.pdf"
              download="Muhammad_Khoiruzzadittaqwa_CV.pdf"
              className="inline-flex items-center gap-1.5 bg-white border border-slate-300 hover:border-slate-500 text-slate-800 font-heading font-bold uppercase tracking-wider text-xs px-4 py-3 rounded-xl shadow-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>PDF</span>
            </a>

            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-300 hover:bg-white hover:border-teal-700 text-slate-800 font-heading font-bold uppercase tracking-wider text-xs px-3.5 py-3 rounded-xl shadow-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 cursor-pointer"
            >
              <MessageSquareCode className="w-3.5 h-3.5 text-teal-700" />
              <span>{lang === "id" ? "Tanya AI" : "Ask AI"}</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="pt-1 flex flex-wrap items-center gap-5 text-xs text-slate-700 font-sans font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span>{lang === "id" ? "Transparan & Bebas Slop AI" : "Rigorous Human Craft"}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span>{lang === "id" ? "Kerahasiaan Data Riset" : "Strict NDA & Privacy"}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span>{lang === "id" ? "Transaksi Resmi Sribu" : "Official Escrow"}</span>
            </span>
          </div>
        </div>

        {/* Right Column: 4 Solution Pillars Quick Card */}
        <div className="hidden lg:block lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            {/* Executive Identity Header with Photo */}
            <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-teal-600/30 shrink-0 shadow-xs bg-slate-100">
                <Image
                  src="/foto-zadit.jpg"
                  alt="Muhammad Khoiruzzadittaqwa"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-xs" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm font-heading font-bold text-slate-900 truncate">
                    Muhammad Khoiruzzadittaqwa
                  </h3>
                  <span className="font-mono text-[10px] text-teal-900 font-bold px-2 py-0.5 rounded bg-teal-50 border border-teal-300 shrink-0">
                    VERIFIED
                  </span>
                </div>
                <p className="text-xs text-slate-600 truncate mt-0.5">
                  {lang === "id" ? "Konsultan Pertumbuhan & Riset" : "Growth & Research Consultant"}
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-teal-800 font-medium">
                  <span>⭐ 5.0 Rating Sribulancer</span>
                  <span>•</span>
                  <span>10+ Thn Rekam Jejak</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-bold text-slate-900 text-sm">
                    {lang === "id" ? "Proposal Bisnis & SOP Legal" : "Business Proposals & SOP"}
                  </p>
                  <p className="text-slate-600 text-xs mt-0.5">
                    {lang === "id" ? "Studi kelayakan, proyeksi kas, dan slide kemitraan" : "Feasibility, financial cash flows, investor decks"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-bold text-slate-900 text-sm">
                    {lang === "id" ? "SEO & Pertumbuhan Konten Konversi" : "SEO & Conversion Content"}
                  </p>
                  <p className="text-slate-600 text-xs mt-0.5">
                    {lang === "id" ? "Pencarian berniat beli, on-page, dan artikel edukatif" : "High-intent search, on-page, lead generation copy"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-bold text-slate-900 text-sm">
                    {lang === "id" ? "Riset Akademik & Olah Data SINTA" : "Academic Research & Data Modeling"}
                  </p>
                  <p className="text-slate-600 text-xs mt-0.5">
                    {lang === "id" ? "Analisis SPSS/SmartPLS/AMOS dan publikasi SINTA" : "SPSS/SmartPLS/AMOS quantitative analysis & SINTA journals"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-bold text-slate-900 text-sm">
                    {lang === "id" ? "Solusi Digital & Web Cepat" : "High-Performance Web Solutions"}
                  </p>
                  <p className="text-slate-600 text-xs mt-0.5">
                    {lang === "id" ? "Situs cepat ramah ponsel (Next.js, cloudflare edge)" : "Mobile-speed web upgrades (Next.js, edge)"}
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
                <span>{lang === "id" ? "Lihat Reputasi & Ulasan Klien di Sribu" : "View Verified Sribu Reviews"}</span>
                <span className="text-sm">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Audience & Problem Qualifier */}
      <div className="mt-14 pt-10 border-t border-slate-200/80">
        <AudienceQualifier lang={lang} />
      </div>

      {/* Metrics Counter Bar with WCAG AAA Contrast */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-200">
        {stats.map((st, idx) => (
          <div key={idx} className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl shadow-xs">
            <p className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900">
              {st.value}
            </p>
            <p className="font-mono text-[11px] sm:text-xs text-slate-700 uppercase tracking-wider mt-1 font-bold">
              {st.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
