"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, BarChart3, Building2, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const SelectedCaseEvidence: React.FC = () => {
  const { language } = useLanguage();
  const isId = language === "id";

  const cases = [
    {
      id: "university-reputation",
      icon: BarChart3,
      domain: isId ? "Intelijen Reputasi Pendidikan" : "Higher Education Intelligence",
      title: isId 
        ? "Audit Persepsi Publik & Navigasi Krisis Informasi Kampus" 
        : "Public Perception Audit & Campus Crisis Response Mapping",
      summary: isId
        ? "Analisis percakapan multi-kanal untuk mendeteksi sentimen publik, memilah kebisingan akun tiruan dari aspirasi nyata, serta menyusun peta respons pimpinan berdasar konsentrasi isu utama."
        : "Multi-channel digital discourse analysis to detect public sentiment, filter artificial astroturfing from authentic signals, and engineer executive crisis response playbooks.",
      tag: isId ? "Analitik Persepsi" : "Discourse Analytics"
    },
    {
      id: "institutional-governance",
      icon: Building2,
      domain: isId ? "Tata Kelola & Dokumen Bisnis" : "Governance & Operations",
      title: isId 
        ? "Standardisasi Tata Kelola Operasional & Studi Kelayakan" 
        : "Institutional Standard Operating Procedures & Feasibility Studies",
      summary: isId
        ? "Penyusunan dokumen prosedur operasional standar dan proyeksi ekonomi unit bisnis yang terstruktur, akuntabel, dan siap dipertanggungjawabkan di hadapan komite audit."
        : "Formulating operational standardizations and bankable financial projections designed for institutional accountability and third-party audit defense.",
      tag: isId ? "Tata Kelola" : "Governance"
    },
    {
      id: "digital-platform",
      icon: Globe,
      domain: isId ? "Sistem Informasi Digital" : "Digital Information Systems",
      title: isId 
        ? "Arsitektur Platform Informasi Cepat Tanpa Hambatan Akses" 
        : "Low-Latency Public Information Registry Architecture",
      summary: isId
        ? "Pembangunan portal web institusi yang memuat instan di ponsel jaringan terbatas, bebas dari kerentanan basis data monolitik, dan efisien dalam biaya pemeliharaan."
        : "Deploying high-speed institutional web registries engineered for instant mobile access across bandwidth-constrained networks with zero maintenance bloat.",
      tag: isId ? "Arsitektur Web" : "System Architecture"
    }
  ];

  return (
    <section 
      id="studi-kasus" 
      aria-label="Studi Kasus dan Bukti Empiris Terpilih"
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10"
    >
      <div className="space-y-4 sm:space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 pb-3">
          <div>
            <span className="font-mono text-[11px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">
              {isId ? "Rekam Jejak Terpilih" : "Empirical Proof of Work"}
            </span>
            <h2 className="text-xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
              {isId ? "Studi Kasus & Pembuktian Masalah Nyata" : "Selected Case Evidence & Problem Solving"}
            </h2>
          </div>
          <Link 
            href="/solusi"
            className="inline-flex items-center gap-1 text-xs font-heading font-semibold text-slate-700 hover:text-slate-950 transition-colors"
          >
            <span>{isId ? "Lihat Arsip Lengkap" : "View Complete Archive"}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {cases.map((cs) => {
            const Icon = cs.icon;
            return (
              <div
                key={cs.id}
                className="rounded-2xl p-4 sm:p-5 bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                      {cs.domain}
                    </span>
                    <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-700">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 leading-snug">
                    {cs.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {cs.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="inline-block text-[11px] font-mono text-slate-600 font-medium">
                    {cs.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
