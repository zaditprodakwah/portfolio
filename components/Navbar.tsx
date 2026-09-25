"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  MessageSquareCode, 
  Download, 
  FileText, 
  Menu, 
  Compass, 
  ChevronDown, 
  FileCheck2, 
  TrendingUp, 
  BarChart3, 
  Layers, 
  BookOpen, 
  Sparkles,
  Globe,
  ExternalLink,
  Archive
} from "lucide-react";
import { cvProfile } from "@/lib/cv-data";
import { ReadingProgressBar } from "./ReadingProgressBar";
import { useLanguage } from "@/context/LanguageContext";

interface NavbarProps {
  onOpenChat: () => void;
  onOpenMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat, onOpenMenu }) => {
  const { language, toggleLanguage } = useLanguage();
  const isId = language === "id";
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsMegaOpen(true);
    }, 150); // 150ms hover intent
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsMegaOpen(false);
    }, 200);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMegaOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <ReadingProgressBar />
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 h-20 flex items-center transition-all shadow-xs">
        <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {onOpenMenu && (
              <button
                type="button"
                onClick={onOpenMenu}
                className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Buka Menu Navigasi"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <Link href="/" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 rounded-xl">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-heading font-extrabold text-lg group-hover:bg-teal-700 transition-colors shadow-sm">
                Z
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 tracking-tight truncate">
                  {cvProfile.nickname} <span className="hidden xs:inline">Growth</span>
                </span>
                <span className="font-mono text-[10px] sm:text-xs tracking-wider text-teal-800 uppercase font-bold truncate">
                  {isId ? "Portofolio" : "Solutions"}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation with Mega Menu */}
          <nav 
            className="hidden lg:flex items-center gap-6 text-xs font-mono tracking-wider uppercase text-slate-700 font-bold relative"
            aria-label="Navigasi Utama"
          >
            {/* Mega Menu Dropdown Trigger */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setIsMegaOpen(!isMegaOpen)}
                aria-expanded={isMegaOpen}
                aria-haspopup="true"
                className="flex items-center gap-1.5 py-2 px-1 hover:text-teal-700 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 rounded-lg"
              >
                <span>{isId ? "Eksplorasi Solusi" : "Explore Solutions"}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaOpen ? "rotate-180 text-teal-700" : "text-slate-400"}`} />
              </button>

              {/* Mega Menu Flyout Panel */}
              {isMegaOpen && (
                <div 
                  ref={megaMenuRef}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] bg-white border border-slate-200/90 rounded-2xl shadow-xl p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200 z-50 text-left normal-case"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Column 1: Layanan Inti */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-teal-800 font-mono text-xs uppercase tracking-wider font-bold">
                      <Sparkles className="w-4 h-4 text-teal-600" />
                      <span>{isId ? "Layanan Utama" : "Core Services"}</span>
                    </div>
                    <Link 
                      href="/layanan/dokumen-administrasi-bisnis" 
                      onClick={() => setIsMegaOpen(false)}
                      className="group p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <FileCheck2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-heading font-bold text-xs text-slate-900 group-hover:text-teal-700">
                            {isId ? "Dokumen Legal & SOP" : "Governance & SOP"}
                          </p>
                          <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                            {isId ? "Standardisasi SOP, legalitas, akta yayasan & perjanjian." : "Executive SOPs, contracts, and governance docs."}
                          </p>
                        </div>
                      </div>
                    </Link>

                    <Link 
                      href="/layanan/seo-konten-konversi" 
                      onClick={() => setIsMegaOpen(false)}
                      className="group p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <TrendingUp className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-heading font-bold text-xs text-slate-900 group-hover:text-teal-700">
                            {isId ? "SEO & Pertumbuhan Web" : "SEO & Web Growth"}
                          </p>
                          <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                            {isId ? "Programmatic SEO, AEO & web super cepat 0ms TTFB." : "High-speed Next.js platforms, pSEO & AEO."}
                          </p>
                        </div>
                      </div>
                    </Link>

                    <Link 
                      href="/layanan/olah-data-statistik-sinta" 
                      onClick={() => setIsMegaOpen(false)}
                      className="group p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <BarChart3 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-heading font-bold text-xs text-slate-900 group-hover:text-teal-700">
                            {isId ? "Riset & Olah Data SINTA" : "Research & SINTA"}
                          </p>
                          <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                            {isId ? "SPSS, SmartPLS 4, AMOS, format IMRaD & Mendeley." : "Statistical models, Mendeley, and IMRaD review."}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <Link 
                      href="/layanan/solusi-web-performa" 
                      onClick={() => setIsMegaOpen(false)}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-heading font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          Solusi Digital & Web Cepat
                        </p>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          Next.js 15, edge caching, dan rekayasa konversi.
                        </p>
                      </div>
                    </Link>
                  </div>

                  {/* Column 2: Solusi & Matriks pSEO */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-teal-800 font-mono text-xs uppercase tracking-wider font-bold">
                      <Compass className="w-4 h-4 text-teal-600" />
                      <span>{isId ? "Matriks & Solusi" : "Solutions & Matrix"}</span>
                    </div>

                    <Link 
                      href="/solusi" 
                      onClick={() => setIsMegaOpen(false)}
                      className="group p-2.5 rounded-xl hover:bg-teal-50/60 transition-colors border border-teal-100/60"
                    >
                      <div className="flex items-start gap-2.5">
                        <Layers className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-heading font-bold text-xs text-teal-900 group-hover:text-teal-700 flex items-center gap-1">
                            {isId ? "Direktori Solusi pSEO" : "pSEO Solution Matrix"}
                          </p>
                          <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                            {isId ? "Katalog studi komparasi & analisis alternatif kebutuhan." : "Multi-angle comparative analysis matrix."}
                          </p>
                        </div>
                      </div>
                    </Link>

                    <Link 
                      href="/#studi-kasus" 
                      onClick={() => setIsMegaOpen(false)}
                      className="group p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <p className="font-heading font-bold text-xs text-slate-900 group-hover:text-teal-700">
                        {isId ? "Studi Kasus Klien" : "Client Case Studies"}
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                        {isId ? "Studi kasus riil efisiensi operasional dan pertumbuhan." : "Verified track record and measurable client results."}
                      </p>
                    </Link>

                    <Link 
                      href="/portfolio" 
                      onClick={() => setIsMegaOpen(false)}
                      className="group p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <p className="font-heading font-bold text-xs text-slate-900 group-hover:text-teal-700">
                        {isId ? "Portfolio Interaktif" : "Interactive Portfolio"}
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                        {isId ? "Demo deliverable berjalan langsung di browser." : "Live demos and hands-on deliverables."}
                      </p>
                    </Link>

                    <Link 
                      href="/#consultation" 
                      onClick={() => setIsMegaOpen(false)}
                      className="group p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <p className="font-heading font-bold text-xs text-slate-900 group-hover:text-teal-700">
                        {isId ? "Kalkulator Estimasi" : "Consultation Builder"}
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                        {isId ? "Simulasikan kebutuhan spesifik dan rincian kerja." : "Estimate turnaround time and project milestones."}
                      </p>
                    </Link>
                  </div>

                  {/* Column 3: Kredensial & Kualifikasi */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-teal-800 font-mono text-xs uppercase tracking-wider font-bold">
                      <FileText className="w-4 h-4 text-teal-600" />
                      <span>{isId ? "Kredensial" : "Credentials"}</span>
                    </div>

                    <Link 
                      href="/cv" 
                      onClick={() => setIsMegaOpen(false)}
                      className="group p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <p className="font-heading font-bold text-xs text-slate-900 group-hover:text-teal-700 flex items-center justify-between">
                        <span>{isId ? "Curriculum Vitae" : "Executive CV"}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-teal-700" />
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                        {isId ? "Rekam jejak, sertifikasi, dan kompetensi terverifikasi." : "Full ATS-aligned career and engineering credentials."}
                      </p>
                    </Link>

                    <Link 
                      href="/wawasan" 
                      onClick={() => setIsMegaOpen(false)}
                      className="group p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <p className="font-heading font-bold text-xs text-slate-900 group-hover:text-teal-700">
                        {isId ? "Wawasan & Artikel" : "Insights & Articles"}
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                        {isId ? "Publikasi metodologi riset dan arsitektur sistem." : "Technical guides, methodologies, and benchmarks."}
                      </p>
                    </Link>

                    <a 
                      href="/cv.pdf"
                      download="Muhammad_Khoiruzzadittaqwa_CV.pdf"
                      className="p-2.5 rounded-xl bg-slate-900 text-white hover:bg-teal-800 transition-colors flex items-center justify-between mt-auto"
                    >
                      <span className="text-xs font-heading font-bold">{isId ? "Unduh CV Resmi" : "Download Official PDF"}</span>
                      <Download className="w-3.5 h-3.5 text-teal-300" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Quick Links */}
            <Link href="/audit" className="hover:text-teal-700 transition-colors text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 font-extrabold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isId ? "Audit Gratis" : "Free Audit"}</span>
            </Link>
            <Link href="/solusi" className="hover:text-teal-700 transition-colors text-teal-800 font-extrabold flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" />
              <span>{isId ? "Matriks" : "Matrix"}</span>
            </Link>
            <Link href="/portfolio" className="hover:text-teal-700 transition-colors text-teal-800 font-extrabold flex items-center gap-1">
              <Archive className="w-3.5 h-3.5" />
              <span>{isId ? "Portfolio" : "Portfolio"}</span>
            </Link>
            <Link href="/cv" className="hover:text-teal-700 transition-colors flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              <span>CV</span>
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher Toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-teal-600 bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-900 text-xs font-mono font-bold transition-all cursor-pointer shadow-2xs"
              title={isId ? "Ganti ke Bahasa Inggris" : "Switch to Indonesian"}
              aria-label="Toggle language between Indonesian and English"
            >
              <Globe className="w-3.5 h-3.5 text-teal-700" />
              <span>{language.toUpperCase()}</span>
            </button>

            <button
              onClick={onOpenChat}
              className="flex items-center gap-2 bg-teal-50 border border-teal-300 text-teal-800 hover:bg-teal-700 hover:text-white px-3 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 cursor-pointer"
              aria-label={isId ? "Buka tanya asisten AI" : "Open AI assistant chat"}
            >
              <MessageSquareCode className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isId ? "Tanya AI" : "Ask AI"}
              </span>
            </button>

            <a
              href="/cv.pdf"
              download="Muhammad_Khoiruzzadittaqwa_CV.pdf"
              className="hidden sm:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
              title={isId ? "Unduh Berkas PDF Resmi" : "Download Official PDF"}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isId ? "Unduh CV" : "Download CV"}</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
};
