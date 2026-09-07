"use client";

import React from "react";
import { 
  AlertTriangle, 
  CheckCircle2, 
  MessageCircle, 
  Printer, 
  RotateCcw, 
  ShieldAlert, 
  ExternalLink,
  Sparkles,
  Zap
} from "lucide-react";
import { DiagnosticResult } from "@/lib/diagnostic/engine";

interface ScorecardViewProps {
  result: DiagnosticResult;
  onReset: () => void;
}

export const ScorecardView: React.FC<ScorecardViewProps> = ({ result, onReset }) => {
  const getGradeTheme = (grade: string) => {
    switch (grade) {
      case "A":
        return {
          badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
          ring: "text-emerald-500",
          bgGlow: "from-emerald-500/10 to-teal-500/5",
          border: "border-emerald-500/30"
        };
      case "B":
        return {
          badge: "bg-teal-500/10 text-teal-400 border-teal-500/30",
          ring: "text-teal-500",
          bgGlow: "from-teal-500/10 to-cyan-500/5",
          border: "border-teal-500/30"
        };
      case "C":
        return {
          badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
          ring: "text-amber-500",
          bgGlow: "from-amber-500/10 to-orange-500/5",
          border: "border-amber-500/30"
        };
      default:
        return {
          badge: "bg-rose-500/10 text-rose-400 border-rose-500/30",
          ring: "text-rose-500",
          bgGlow: "from-rose-500/10 to-red-500/5",
          border: "border-rose-500/30"
        };
    }
  };

  const theme = getGradeTheme(result.grade);
  const waUrl = `https://wa.me/6282316363177?text=${encodeURIComponent(result.waPrefillText)}`;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Kartu Skor Utama */}
      <div 
        className={`relative overflow-hidden rounded-3xl bg-slate-900 border ${theme.border} p-6 sm:p-8 shadow-2xl text-white`}
      >
        <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${theme.bgGlow} rounded-full blur-3xl pointer-events-none`} />

        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Hasil Evaluasi Diagnostik</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              {result.pillarLabel}
            </h2>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${theme.badge}`}>
            Predikat: Kelas {result.grade}
          </span>
        </div>

        {/* Skor & Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center py-6">
          {/* Gauge Meter */}
          <div className="sm:col-span-5 flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="text-slate-800"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className={theme.ring}
                  strokeWidth="10"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * result.overallScore) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-extrabold tracking-tight font-heading">
                  {result.overallScore}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">/ 100 POIN</span>
              </div>
            </div>
            <span className="mt-2 text-xs font-bold text-slate-300">
              Skor Kesiapan Evaluasi
            </span>
          </div>

          {/* Deskripsi Status */}
          <div className="sm:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-800/80 text-xs font-semibold text-slate-200">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Status: {result.statusTitle}</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {result.statusDescription}
            </p>

            {/* Metrik Mentah Web jika ada */}
            {result.rawMetrics && result.rawMetrics.url && (
              <div className="pt-2 text-xs font-mono text-slate-400 space-y-1">
                <div className="text-teal-400 truncate">URL: {result.rawMetrics.url}</div>
                {result.rawMetrics.lcp && (
                  <div className="flex gap-3 text-slate-300">
                    <span>LCP: <strong className="text-white">{result.rawMetrics.lcp}</strong></span>
                    <span>CLS: <strong className="text-white">{result.rawMetrics.cls}</strong></span>
                    {result.rawMetrics.performanceScore !== undefined && (
                      <span>Perf: <strong className="text-teal-400">{result.rawMetrics.performanceScore}/100</strong></span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Breakdown Indikator */}
        {result.metricsBreakdown && result.metricsBreakdown.length > 0 && (
          <div className="space-y-2.5 pt-4 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Komponen Pengujian
            </span>
            <div className="space-y-2">
              {result.metricsBreakdown.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">{item.label}</span>
                    <span className="font-mono font-bold text-slate-200">
                      {item.score}/{item.maxScore}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        item.status === "good" 
                          ? "bg-emerald-500" 
                          : item.status === "warning" 
                          ? "bg-amber-500" 
                          : "bg-rose-500"
                      }`}
                      style={{ width: `${Math.min(100, Math.max(15, (item.score / item.maxScore) * 100))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Titik Lemah Kritis */}
      {result.fatalVulnerabilities.length > 0 && (
        <div className="rounded-3xl bg-rose-950/20 border border-rose-900/40 p-6 sm:p-7">
          <div className="flex items-center gap-2.5 text-rose-400 font-heading font-bold text-base mb-3">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <h3>Titik Lemah Kritis yang Terdeteksi</h3>
          </div>
          <div className="space-y-2.5">
            {result.fatalVulnerabilities.map((vuln, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-rose-900/30">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {vuln}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3 Rekomendasi Remediasi Cepat */}
      {result.remediationSteps.length > 0 && (
        <div className="rounded-3xl bg-emerald-950/20 border border-emerald-900/40 p-6 sm:p-7">
          <div className="flex items-center gap-2.5 text-emerald-400 font-heading font-bold text-base mb-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <h3>Rekomendasi Remediasi Cepat</h3>
          </div>
          <div className="space-y-2.5">
            {result.remediationSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-emerald-900/30">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons Hub */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2 print:hidden">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-heading font-bold text-sm sm:text-base shadow-lg shadow-emerald-900/30 transition-all active:scale-98"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Klaim Roadmap Perbaikan via WhatsApp</span>
          <ExternalLink className="w-4 h-4 opacity-80" />
        </a>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-medium text-sm transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Simpan PDF</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 font-medium text-sm transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Ulangi Asesmen</span>
        </button>
      </div>

      {/* Profil Konsultan Pendamping */}
      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold font-heading shrink-0">
          Z
        </div>
        <div className="text-xs text-slate-400">
          <strong className="text-slate-200 block font-heading">
            Ditinjau Berdasarkan Standar Eksekutif Zadit
          </strong>
          Konsultasi tindak lanjut langsung didampingi oleh Muhammad Khoiruzzadittaqwa (Rating 5.0 Sribulancer).
        </div>
      </div>
    </div>
  );
};
