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
          badge: "bg-emerald-50 text-emerald-900 border-emerald-300",
          ring: "text-emerald-700",
          border: "border-emerald-300"
        };
      case "B":
        return {
          badge: "bg-teal-50 text-teal-900 border-teal-300",
          ring: "text-teal-700",
          border: "border-teal-300"
        };
      case "C":
        return {
          badge: "bg-amber-50 text-amber-900 border-amber-300",
          ring: "text-amber-700",
          border: "border-amber-300"
        };
      default:
        return {
          badge: "bg-rose-50 text-rose-900 border-rose-300",
          ring: "text-rose-700",
          border: "border-rose-300"
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
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Kartu Skor Utama */}
      <div 
        className={`relative overflow-hidden rounded-3xl bg-white border ${theme.border} p-6 sm:p-8 shadow-xs text-slate-900`}
      >
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-teal-800 uppercase tracking-wider mb-1 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-teal-700" />
              <span>Hasil Evaluasi Diagnostik</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
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
          <div className="sm:col-span-5 flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="text-slate-200"
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
                <span className="text-3xl font-extrabold tracking-tight font-heading text-slate-900">
                  {result.overallScore}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">/ 100 POIN</span>
              </div>
            </div>
            <span className="mt-2 text-xs font-bold text-slate-800">
              Skor Kesiapan Evaluasi
            </span>
          </div>

          {/* Deskripsi Status */}
          <div className="sm:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-semibold text-slate-800 border border-slate-200">
              <Zap className="w-3.5 h-3.5 text-teal-700" />
              <span>Status: {result.statusTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {result.statusDescription}
            </p>

            {/* Metrik Mentah Web jika ada */}
            {result.rawMetrics && result.rawMetrics.url && (
              <div className="pt-2 text-xs font-mono text-slate-600 space-y-1">
                <div className="text-teal-800 font-bold truncate">URL: {result.rawMetrics.url}</div>
                {result.rawMetrics.lcp && (
                  <div className="flex gap-3 text-slate-700">
                    <span>LCP: <strong className="text-slate-900">{result.rawMetrics.lcp}</strong></span>
                    <span>CLS: <strong className="text-slate-900">{result.rawMetrics.cls}</strong></span>
                    {result.rawMetrics.performanceScore !== undefined && (
                      <span>Perf: <strong className="text-teal-800">{result.rawMetrics.performanceScore}/100</strong></span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Breakdown Indikator */}
        {result.metricsBreakdown && result.metricsBreakdown.length > 0 && (
          <div className="space-y-2.5 pt-4 border-t border-slate-200">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block font-mono">
              Komponen Pengujian
            </span>
            <div className="space-y-2">
              {result.metricsBreakdown.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700 font-medium">{item.label}</span>
                    <span className="font-mono font-bold text-slate-900">
                      {item.score}/{item.maxScore}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        item.status === "good" 
                          ? "bg-emerald-600" 
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
        <div className="rounded-3xl bg-rose-50/70 border border-rose-200 p-6 sm:p-7">
          <div className="flex items-center gap-2.5 text-rose-800 font-heading font-bold text-base mb-3">
            <ShieldAlert className="w-5 h-5 shrink-0 text-rose-700" />
            <h3>Titik Lemah Kritis yang Terdeteksi</h3>
          </div>
          <div className="space-y-2.5">
            {result.fatalVulnerabilities.map((vuln, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-rose-200">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                  {vuln}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3 Rekomendasi Remediasi Cepat */}
      {result.remediationSteps.length > 0 && (
        <div className="rounded-3xl bg-teal-50/70 border border-teal-200 p-6 sm:p-7">
          <div className="flex items-center gap-2.5 text-teal-900 font-heading font-bold text-base mb-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-teal-700" />
            <h3>Rekomendasi Remediasi Cepat</h3>
          </div>
          <div className="space-y-2.5">
            {result.remediationSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-teal-200">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
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
          className="flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-xs transition-all active:scale-98"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Diskusikan Hasil Ini via WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-heading font-bold text-xs uppercase tracking-wider border border-slate-300 transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak PDF</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-heading font-bold text-xs uppercase tracking-wider border border-slate-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Uji Ulang</span>
        </button>
      </div>
    </div>
  );
};
