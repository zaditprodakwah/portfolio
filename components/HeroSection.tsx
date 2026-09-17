"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  GraduationCap,
  Briefcase,
  FileCheck2,
} from "lucide-react";
import { cvProfile } from "@/lib/cv-data";
import { AudienceQualifier } from "./AudienceQualifier";

interface HeroSectionProps {
  onOpenChat: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenChat }) => {
    const stats = cvProfile.stats.id;

  // 4 Interactive Rotating Problem-Solution Pillars with Problem-Centric Hooks + SEO Spectrum
  const pillars = [
    {
      id: "academic",
      label: true ? "Riset, Skripsi & Olah Data" : "Research & Statistics",
      icon: GraduationCap,
      headline: true 
        ? "Mengurai kebuntuan olah data statistik (SPSS, SEM, Python), uji hipotesis, dan naskah riset agar siap sidang dan lolos telaah jurnal tanpa revisi berulang." 
        : "Overcoming quantitative data bottlenecks (SPSS, SEM, Python), hypothesis tests, and research papers for defense readiness and journal peer-review.",
      badge: true ? "Bimbingan Metodologi & Olah Data Statistik" : "Methodology & Statistical Modeling",
      link: "/layanan/olah-data-statistik-sinta"
    },
    {
      id: "business",
      label: true ? "Proposal Usaha & SOP" : "Proposals & SOP",
      icon: Briefcase,
      headline: true 
        ? "Menyusun proposal kemitraan investor, model keuangan BEP realistis, dan standardisasi SOP operasional agar bisnis mandiri tanpa hambatan birokrasi." 
        : "Drafting executive investor proposals, commercial feasibility models, and operational SOPs that eliminate owner bottlenecks.",
      badge: true ? "Unit Economics & Standardisasi Operasional" : "Unit Economics & Process Standardization",
      link: "/layanan/dokumen-administrasi-bisnis"
    },
    {
      id: "web",
      label: true ? "Website Bisnis & Konversi" : "Business Web & Conversion",
      icon: Globe,
      headline: true 
        ? "Membangun website profil usaha dan landing page yang terbuka instan di ponsel pelanggan, bebas downtime, dan langsung terhubung ke WhatsApp penjualan." 
        : "Engineering lightweight, instant-loading mobile business websites optimized for search intent and direct WhatsApp client acquisition.",
      badge: true ? "Cepat di Ponsel, Bebas Downtime & Ramah SEO" : "Mobile Speed, High Uptime & High-Intent SEO",
      link: "/layanan/solusi-web-performa"
    },
    {
      id: "career",
      label: true ? "CV Eksekutif & Karir" : "Executive CV & Career",
      icon: FileCheck2,
      headline: true 
        ? "Menata portofolio profesional dan resume berstandar ATS internasional untuk meyakinkan rekruter korporat, seleksi BUMN, maupun beasiswa luar negeri." 
        : "Architecting ATS-compliant executive resumes and verified career portfolios that clear initial screening and convince leadership.",
      badge: true ? "Standar Format ATS & Rekam Jejak Terverifikasi" : "ATS Compliance & Verified Credentials",
      link: "/cv"
    }
  ];

  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  // Auto-Cycling Smooth Slide-Fade (every 4s)
  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setActivePillarIndex((prev) => (prev + 1) % pillars.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoCycling, pillars.length]);

  const currentPillar = pillars[activePillarIndex];

  return (
    <section id="hero" className="pt-24 sm:pt-28 pb-10 sm:pb-16 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center w-full max-w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-2">
        {/* Left Column: Core Value Proposition & Problem-Solution Switcher */}
        <div className="lg:col-span-7 space-y-6">
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-300 max-w-full">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-700 animate-pulse"></span>
            <span className="font-mono text-xs tracking-wider uppercase font-bold text-teal-900">
              {true
                ? "Kesiapan: Terbuka untuk Konsultasi & Kemitraan"
                : "Availability: Open for Strategic Advisory"}
            </span>
          </div>

          {/* Master Semantic H1 */}
          <div className="space-y-3">
            {/* Non-redundant Executive Name Bar (Single authoritative photo lives on the right card) */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs sm:text-sm text-slate-800 uppercase tracking-widest font-extrabold">
                Muhammad Khoiruzzadittaqwa ({cvProfile.shortName} / {cvProfile.nickname})
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-[11px] font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                ★ 5.0 Sribulancer
              </span>
              <span className="text-[11px] font-mono text-slate-600 font-semibold">
                10+ Thn Rekam Jejak
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-slate-900 leading-[1.2] break-words">
              {true ? (
                <>
                  Solusi Praktis & Presisi untuk <br />
                  <span className="text-teal-800">Dokumen Bisnis, Riset Akademik, & Aset Digital.</span>
                </>
              ) : (
                <>
                  Calm Precision for <br className="hidden sm:inline" />
                  <span className="text-teal-800">Business Documents, Research & Digital Growth.</span>
                </>
              )}
            </h1>
          </div>

          {/* Dynamic Problem-Solution Hook Card */}
          <div 
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3 transition-all duration-300"
            onMouseEnter={() => setIsAutoCycling(false)}
            onMouseLeave={() => setIsAutoCycling(true)}
          >
            {/* 4 Pillar Tabs (Pills) */}
            <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-slate-100">
              <span className="text-[11px] font-mono text-slate-600 font-bold uppercase tracking-wider mr-1">
                {true ? "Fokus Masalah:" : "Problem Focus:"}
              </span>
              {pillars.map((p, idx) => {
                const isActive = activePillarIndex === idx;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setIsAutoCycling(false);
                      setActivePillarIndex(idx);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-lg font-heading font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-teal-800 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            {/* Pillar Content Panel */}
            <div className="space-y-2 min-h-[70px] flex flex-col justify-center">
              <div className="inline-flex items-center gap-1.5">
                <span className="font-mono text-[11px] font-bold text-teal-800 uppercase tracking-wide bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {currentPillar.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans font-normal">
                {currentPillar.headline}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#consultation"
                className="inline-flex items-center justify-center gap-2 bg-teal-800 hover:bg-teal-900 text-white px-5 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                <span>{true ? "Konsultasikan Kebutuhan" : "Discuss Your Project"}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/audit"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 hover:text-teal-800 px-4 py-3 rounded-xl text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-colors border border-slate-200 shadow-xs cursor-pointer"
              >
                <span>{true ? "Audit Kesiapan Proyek" : "Readiness Audit"}</span>
              </Link>

              <Link
                href="/cv"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 hover:text-teal-800 px-4 py-3 rounded-xl text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-colors border border-slate-200 shadow-xs cursor-pointer"
              >
                <span>{true ? "Pratinjau CV" : "View CV"}</span>
              </Link>

              <button
                type="button"
                onClick={onOpenChat}
                className="inline-flex items-center justify-center gap-2 bg-teal-50 hover:bg-teal-100 text-teal-900 px-4 py-3 rounded-xl text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-colors border border-teal-200 cursor-pointer"
                aria-label="Buka Asisten AI Interaktif"
              >
                <span>{true ? "Tanya AI" : "Ask AI"}</span>
              </button>
            </div>
            
            <p className="text-[11px] font-mono text-slate-600 font-medium">
              {true 
                ? "Respon dalam hitungan jam · Diskusi tanpa komitmen · Kerahasiaan data terjamin"
                : "Responses within hours · Zero obligation discussion · Strict data confidentiality"}
            </p>
          </div>

          {/* Trust points */}
          <div className="pt-1 flex flex-wrap items-center gap-4 sm:gap-5 text-xs text-slate-700 font-sans font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span>{true ? "Transparan & Tanpa Janji Bombastis" : "Rigorous Pragmatic Craft"}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span>{true ? "Kerahasiaan Data Riset & Bisnis" : "Strict NDA & Data Privacy"}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span>{true ? "Transaksi Resmi Sribu (Escrow)" : "Official Escrow Platform"}</span>
            </span>
          </div>
        </div>

        {/* Right Column: 4 Solution Pillars Quick Card (Visible on ALL viewports: Desktop & Mobile) */}
        <div className="w-full lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
            {/* Executive Identity Header with Single Authoritative Portrait Photo */}
            <div className="flex items-center gap-3.5 sm:gap-4 pb-3.5 sm:pb-4 border-b border-slate-200">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden ring-2 ring-teal-600/30 shrink-0 shadow-xs bg-slate-100">
                <Image
                  src="/foto-zadit.jpg"
                  alt="Muhammad Khoiruzzadittaqwa"
                  fill
                  sizes="(max-width: 640px) 56px, 64px"
                  className="object-cover"
                  priority
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-xs" title="Online & Siap Kolaborasi" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm sm:text-base font-heading font-bold text-slate-900 truncate">
                    Muhammad Khoiruzzadittaqwa
                  </h3>
                  <span className="font-mono text-[10px] text-teal-900 font-bold px-2 py-0.5 rounded bg-teal-50 border border-teal-300 shrink-0">
                    VERIFIED
                  </span>
                </div>
                <p className="text-xs text-slate-600 truncate mt-0.5 font-medium">
                  {true ? "Konsultan Pertumbuhan & Riset" : "Growth & Research Consultant"}
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-teal-800 font-semibold font-mono">
                  <span>★ 5.0 Rating Sribulancer</span>
                  <span>•</span>
                  <span>10+ Thn Rekam Jejak</span>
                </div>
              </div>
            </div>

            {/* 4 Core Specialization Pillars */}
            <div className="space-y-2.5 sm:space-y-3 text-xs font-sans">
              <div className="flex items-start gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/90">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-bold text-slate-900 text-xs sm:text-sm">
                    {true ? "Proposal Bisnis & SOP Operasional" : "Business Proposals & SOP"}
                  </p>
                  <p className="text-slate-600 text-[11px] sm:text-xs mt-0.5">
                    {true ? "Studi kelayakan, proyeksi BEP, dan pedoman kerja terstandar" : "Feasibility, financial cash flows, investor decks"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/90">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-bold text-slate-900 text-xs sm:text-sm">
                    {true ? "Riset Akademik & Olah Data Statistik" : "Academic Research & Data"}
                  </p>
                  <p className="text-slate-600 text-[11px] sm:text-xs mt-0.5">
                    {true ? "Bimbingan skripsi/tesis, uji hipotesis SPSS, dan jurnal SINTA" : "Quantitative analysis (SPSS, SEM) & journal publishing"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/90">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-bold text-slate-900 text-xs sm:text-sm">
                    {true ? "Website Bisnis & Konversi" : "Business Web & Conversion"}
                  </p>
                  <p className="text-slate-600 text-[11px] sm:text-xs mt-0.5">
                    {true ? "Situs cepat ramah ponsel, SEO on-page, dan integrasi WhatsApp" : "Fast mobile business sites, SEO, and WhatsApp integration"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/90">
                <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading font-bold text-slate-900 text-xs sm:text-sm">
                    {true ? "CV Eksekutif & Kredensial Karir" : "Executive CV & Career Assets"}
                  </p>
                  <p className="text-slate-600 text-[11px] sm:text-xs mt-0.5">
                    {true ? "Resume standar ATS, portofolio digital, dan verifikasi profil" : "ATS-compliant resumes and verified career portfolios"}
                  </p>
                </div>
              </div>
            </div>

            {/* Sribu Verified Reputation Anchor */}
            <div className="pt-2 border-t border-slate-200">
              <a
                href={cvProfile.contact.sribuProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-teal-800 hover:text-teal-950 font-bold flex items-center justify-between"
              >
                <span>{true ? "Lihat Reputasi & Ulasan Klien di Sribu" : "View Verified Sribu Reviews"}</span>
                <span className="text-sm font-heading font-bold">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Audience & Problem Qualifier */}
      <div className="mt-14 pt-10 border-t border-slate-200/80">
        <AudienceQualifier />
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
