"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  Globe, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Zap,
  CheckCircle2
} from "lucide-react";

export const QuickAuditTeaser: React.FC = () => {
  return (
    <section 
      aria-label="Alat Diagnostik Kesiapan Gratis" 
      className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 p-6 sm:p-10 shadow-xl text-white">
        {/* Glow decoration */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Kiri: Value Proposition */}
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-500/15 text-teal-400 border border-teal-500/30">
              <Zap className="w-3.5 h-3.5" />
              <span>SCORECARD & ASSESSMENT SYSTEM</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-extrabold font-heading text-white tracking-tight leading-snug">
              Ketahui Skor Kesiapan Riset, Bisnis, atau Web Anda Sebelum Mengalami Penolakan
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Manfaatkan alat evaluasi diagnostik 90 detik kami. Deteksi celah kelemahan naskah jurnal SINTA, proposal investasi, SOP operasional, atau kecepatan Core Web Vitals secara objektif dan gratis.
            </p>

            {/* Benefit Checkpoints */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 text-xs text-slate-300 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                Skor 0–100 & Predikat Kesiapan
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                Analisis Titik Lemah Kritis
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                Roadmap Perbaikan Praktis
              </span>
            </div>
          </div>

          {/* Kanan: 4 Quick Cards & Action */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <div className="grid grid-cols-2 gap-2 text-left">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200 mb-1">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>Riset SINTA</span>
                </div>
                <span className="text-[11px] text-slate-400 block line-clamp-1">
                  Uji Novelty & Sampel
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200 mb-1">
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <span>Pitch Deck</span>
                </div>
                <span className="text-[11px] text-slate-400 block line-clamp-1">
                  Uji BEP & Unit Econ
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Dokumen SOP</span>
                </div>
                <span className="text-[11px] text-slate-400 block line-clamp-1">
                  Uji SPOF & RACI
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200 mb-1">
                  <Globe className="w-4 h-4 text-teal-400" />
                  <span>Web CWV/SEO</span>
                </div>
                <span className="text-[11px] text-slate-400 block line-clamp-1">
                  Audit URL Live Instan
                </span>
              </div>
            </div>

            <Link
              href="/audit"
              className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-heading font-bold text-sm shadow-lg shadow-teal-500/20 transition-all active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Buka Alat Audit Diagnostik Gratis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
