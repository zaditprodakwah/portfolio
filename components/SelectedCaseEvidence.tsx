"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  BarChart3, 
  Building2, 
  Globe, 
  FileText, 
  Database, 
  ExternalLink,
  Layers,
  UserCheck
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PORTFOLIO_EVIDENCE, PortfolioCategory, PortfolioEvidenceItem } from "@/lib/portfolio-data";

export const SelectedCaseEvidence: React.FC = () => {
  const { language } = useLanguage();
  const isId = language === "id";
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("all");

  const categories = [
    { id: "all", label: isId ? "Semua Studi Kasus" : "All Proof of Work" },
    { id: "career", label: isId ? "Rekayasa Karir & Dosen" : "Career & Faculty Mobility" },
    { id: "metascience", label: isId ? "Metasains & Komputasi" : "Metascience & Compute" },
    { id: "business", label: isId ? "Strategi Bisnis & Pemasaran" : "Business Strategy & Growth" },
    { id: "web-systems", label: isId ? "Arsitektur Sistem & Web" : "Systems & Web Architecture" },
  ];

  const filteredItems = activeCategory === "all" 
    ? PORTFOLIO_EVIDENCE 
    : PORTFOLIO_EVIDENCE.filter(item => item.category === activeCategory);

  const getCategoryIcon = (category: PortfolioEvidenceItem["category"]) => {
    switch (category) {
      case "career":
        return <UserCheck className="w-3.5 h-3.5 text-amber-700" />;
      case "business":
        return <Building2 className="w-3.5 h-3.5 text-slate-700" />;
      case "metascience":
        return <Database className="w-3.5 h-3.5 text-blue-700" />;
      case "web-systems":
        return <Globe className="w-3.5 h-3.5 text-emerald-700" />;
      default:
        return <BarChart3 className="w-3.5 h-3.5 text-slate-700" />;
    }
  };

  return (
    <section 
      id="studi-kasus" 
      aria-label="Studi Kasus dan Bukti Empiris Terpilih"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14"
    >
      <div className="space-y-6 sm:space-y-8">
        
        {/* Header & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/90 pb-4">
          <div>
            <span className="font-mono text-[11px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">
              {isId ? "Rekam Jejak & Artefak Nyata" : "Empirical Proof & Artifacts"}
            </span>
            <h2 className="text-xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
              {isId ? "Studi Kasus, Dossier, & Solusi Terverifikasi" : "Case Studies, Dossiers, & Verifiable Solutions"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://zadevpenseo.github.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-slate-700 hover:text-slate-950 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
            >
              <span>{isId ? "Vault Blueprints" : "Systems Vault"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <Link 
              href="/solusi"
              className="inline-flex items-center gap-1 text-xs font-heading font-semibold text-slate-700 hover:text-slate-950 transition-colors"
            >
              <span>{isId ? "Lihat Arsip Lengkap" : "View Complete Archive"}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Filter Kategori Tab */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as PortfolioCategory)}
              className={`text-xs font-heading font-medium px-3.5 py-1.5 rounded-lg transition-all ${
                activeCategory === cat.id
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid Kartu Portofolio Berstandar Modern Web Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const isExternal = item.artifactUrl.startsWith("http");
            return (
              <article
                key={item.id}
                className="relative rounded-2xl p-5 bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors group"
              >
                <div className="space-y-3">
                  {/* Header Kartu */}
                  <header className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider truncate max-w-[200px]">
                      {item.domain}
                    </span>
                    <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                      {getCategoryIcon(item.category)}
                    </div>
                  </header>

                  {/* Judul dengan Stretched Link */}
                  <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 leading-snug">
                    {isExternal ? (
                      <a
                        href={item.artifactUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-emerald-800 transition-colors after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 rounded"
                      >
                        {item.title}
                      </a>
                    ) : (
                      <Link
                        href={item.artifactUrl}
                        className="hover:text-emerald-800 transition-colors after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 rounded"
                      >
                        {item.title}
                      </Link>
                    )}
                  </h3>

                  {/* Ringkasan */}
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {item.summary}
                  </p>

                  {/* Sorotan / Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono text-slate-600 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Kartu & Aksi Independen Ber-z-index */}
                <footer className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs relative z-10">
                  <span className="inline-block text-[11px] font-mono text-slate-500 font-medium">
                    {item.tag}
                  </span>

                  <span className="inline-flex items-center gap-1 font-heading font-semibold text-[11px] text-slate-800 group-hover:text-emerald-800 transition-colors">
                    <span>{item.artifactType}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </footer>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
