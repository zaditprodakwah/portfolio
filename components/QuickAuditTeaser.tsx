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
      id="audit-teaser" aria-label="Alat Diagnostik Kesiapan Mandiri" 
      className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12"
    >
      <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xs text-slate-900">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Kiri: Value Proposition */}
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200/80">
              <Zap className="w-3.5 h-3.5 text-teal-700" />
              <span>SCORECARD & ASSESSMENT SYSTEM</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight leading-snug">
              Ketahui Skor Kesiapan Riset, Bisnis, atau Web Anda Sebelum Mengalami Penolakan
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              Manfaatkan alat evaluasi diagnostik 90 detik kami. Deteksi celah kelemahan naskah jurnal SINTA, proposal investasi, SOP operasional, atau kecepatan Core Web Vitals secara objektif dan gratis.
            </p>

            {/* Benefit Checkpoints */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 text-xs text-slate-700 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-700" />
                Skor 0–100 & Predikat Kesiapan
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-700" />
                Analisis Titik Lemah Kritis
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-700" />
                Roadmap Perbaikan Praktis
              </span>
            </div>
          </div>

          {/* Kanan: 4 Quick Cards & Action */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <div className="grid grid-cols-2 gap-2 text-left">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                  <GraduationCap className="w-4 h-4 text-teal-700" />
                  <span>Riset & SINTA</span>
                </div>
                <span className="text-[11px] text-slate-600 block line-clamp-1">
                  Uji Novelty & Metodologi
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                  <Briefcase className="w-4 h-4 text-teal-700" />
                  <span>Pitch Deck</span>
                </div>
                <span className="text-[11px] text-slate-600 block line-clamp-1">
                  Uji BEP & Unit Econ
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                  <ShieldCheck className="w-4 h-4 text-teal-700" />
                  <span>Dokumen SOP</span>
                </div>
                <span className="text-[11px] text-slate-600 block line-clamp-1">
                  Uji SPOF & Alur Kerja
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                  <Globe className="w-4 h-4 text-teal-700" />
                  <span>Web & Konversi</span>
                </div>
                <span className="text-[11px] text-slate-600 block line-clamp-1">
                  Audit URL Live Instan
                </span>
              </div>
            </div>

            <Link
              href="/audit"
              className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-xs transition-all active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Buka Alat Audit Diagnostik Gratis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
