"use client";

import React from "react";
import Link from "next/link";
import { MessageSquareCode, Download, FileText, Menu, Compass } from "lucide-react";
import { cvProfile } from "@/lib/cv-data";
import { useLanguage } from "@/lib/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ReadingProgressBar } from "./ReadingProgressBar";

interface NavbarProps {
  onOpenChat: () => void;
  onOpenMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat, onOpenMenu }) => {
  const { lang } = useLanguage();

  return (
    <>
      <ReadingProgressBar />
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 h-20 flex items-center transition-all shadow-xs">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center">
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
                <span className="font-heading font-bold text-sm text-slate-900 tracking-tight">
                  {cvProfile.nickname} Growth
                </span>
                <span className="font-mono text-xs tracking-wider text-teal-800 uppercase font-bold">
                  {lang === "id" ? "Portofolio Solusi" : "Client Solutions Hub"}
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono tracking-wider uppercase text-slate-700 font-bold">
            <Link href="/layanan/dokumen-administrasi-bisnis" className="hover:text-teal-700 transition-colors">
              {lang === "id" ? "Dokumen & SOP" : "Governance & SOP"}
            </Link>
            <Link href="/layanan/seo-konten-konversi" className="hover:text-teal-700 transition-colors">
              {lang === "id" ? "SEO & Konversi" : "SEO & Growth"}
            </Link>
            <Link href="/layanan/olah-data-statistik-sinta" className="hover:text-teal-700 transition-colors">
              {lang === "id" ? "Riset SINTA" : "Research & SINTA"}
            </Link>
            <Link href="/solusi" className="hover:text-teal-700 transition-colors text-teal-800 font-extrabold flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" />
              <span>{lang === "id" ? "Matriks Solusi" : "Solutions"}</span>
            </Link>
            <Link href="/wawasan" className="hover:text-teal-700 transition-colors">
              {lang === "id" ? "Wawasan" : "Insights"}
            </Link>
            <Link href="/cv" className="text-teal-800 hover:text-teal-950 transition-colors flex items-center gap-1 font-bold">
              <FileText className="w-3.5 h-3.5" />
              <span>{lang === "id" ? "Lihat CV" : "View CV"}</span>
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />

            <button
              onClick={onOpenChat}
              className="flex items-center gap-2 bg-teal-50 border border-teal-300 text-teal-800 hover:bg-teal-700 hover:text-white px-3 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 cursor-pointer"
              aria-label={lang === "id" ? "Buka tanya asisten AI" : "Open AI assistant chat"}
            >
              <MessageSquareCode className="w-4 h-4" />
              <span className="hidden sm:inline">
                {lang === "id" ? "Tanya AI" : "Ask AI"}
              </span>
            </button>

            <a
              href="/cv.pdf"
              download="Muhammad_Khoiruzzadittaqwa_CV.pdf"
              className="hidden sm:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
              title={lang === "id" ? "Unduh Berkas PDF Resmi" : "Download Official PDF"}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === "id" ? "Unduh CV" : "Download CV"}</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
};
