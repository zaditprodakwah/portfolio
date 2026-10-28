"use client";

import React from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  BarChart2, 
  FileSpreadsheet, 
  Globe2, 
  ArrowUpRight 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const ExecutivePavilions: React.FC = () => {
  const { language } = useLanguage();
  const isId = language === "id";

  const pavilions = [
    {
      id: "academic",
      icon: GraduationCap,
      title: isId ? "Riset Ilmiah & Kesarjanaan" : "Scholarly Research & Modeling",
      summary: isId
        ? "Pendampingan uji instrumen empiris, verifikasi hipotesis kuantitatif, dan penataan naskah akademik berstandar integritas keilmuan."
        : "Methodological instrumentation, empirical hypothesis verification, and structured manuscript guidance adhering to scientific rigor.",
      route: "/layanan/olah-data-statistik-sinta",
      tag: isId ? "Metodologi & Data" : "Methodology & Data"
    },
    {
      id: "intelligence",
      icon: BarChart2,
      title: isId ? "Intelijen Percakapan & Reputasi" : "Reputation & Discourse Intelligence",
      summary: isId
        ? "Pemetaan opini publik digital, pemantauan anomali narasi, dan perumusan protokol mitigasi krisis sebelum isu membesar di media massa."
        : "Mapping digital public discourse, detecting narrative anomalies, and engineering measurable crisis response protocols.",
      route: "/layanan/seo-konten-konversi",
      tag: isId ? "Mitigasi & Opini" : "Crisis & Public Opinion"
    },
    {
      id: "governance",
      icon: FileSpreadsheet,
      title: isId ? "Tata Kelola & Dokumen Strategis" : "Governance & Strategic Documentation",
      summary: isId
        ? "Penyusunan studi kelayakan investasi, pemodelan ekonomi unit usaha, dan standardisasi prosedur operasional kelembagaan yang siap diaudit."
        : "Authoring feasibility studies, commercial unit economics models, and audit-ready institutional operational standardizations.",
      route: "/layanan/dokumen-administrasi-bisnis",
      tag: isId ? "Kelayakan & SOP" : "Feasibility & SOP"
    },
    {
      id: "systems",
      icon: Globe2,
      title: isId ? "Arsitektur Sistem & Portal Informasi" : "Resilient Digital Platforms",
      summary: isId
        ? "Pembangunan portal informasi dan aset web yang memuat seketika di jaringan seluler, andal tanpa henti sistem, dan hemat biaya operasional."
        : "Engineering instant-loading web platforms and public registries optimized for low-latency mobile access and zero runtime bloat.",
      route: "/layanan/solusi-web-performa",
      tag: isId ? "Keandalan & Akses" : "Speed & Uptime"
    }
  ];

  return (
    <section 
      id="paviliun" 
      aria-label="Empat Ruang Praktik Utama"
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
    >
      <div className="space-y-4 sm:space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 pb-3">
          <div>
            <span className="font-mono text-[11px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">
              {isId ? "Koridor Kepakaran" : "Core Practice Chambers"}
            </span>
            <h2 className="text-xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
              {isId ? "Empat Ranah Praktik Spesialisasi" : "Four Specialized Practice Chambers"}
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-sans">
            {isId ? "Pilih ranah untuk menelaah pendekatan teknis" : "Select a chamber to explore technical methodology"}
          </span>
        </div>

        {/* 4 Compact Ergonomic Cards (Grid 1-col on mobile, 2-col on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {pavilions.map((pav) => {
            const Icon = pav.icon;
            return (
              <Link
                key={pav.id}
                href={pav.route}
                className="group relative rounded-2xl p-1 bg-slate-100/70 border border-slate-200/90 shadow-2xs transition-all hover:border-slate-400 hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                <div className="rounded-xl p-4 sm:p-5 bg-white h-full flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {pav.tag}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-slate-950 transition-colors">
                      {pav.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {pav.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-heading font-semibold text-slate-900 group-hover:text-slate-700 pt-1">
                    <span>{isId ? "Pelajari Metodologi" : "Explore Methodology"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
