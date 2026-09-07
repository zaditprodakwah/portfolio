"use client";

import React, { useState } from "react";
import { 
  Globe, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Search, 
  Loader2,
  AlertCircle
} from "lucide-react";
import { 
  DiagnosticPillar, 
  DiagnosticResult, 
  DIAGNOSTIC_PILLARS, 
  DIAGNOSTIC_QUESTIONS, 
  calculateQuestionnaireScore, 
  runLiveWebSpeedAudit 
} from "@/lib/diagnostic/engine";
import { ScorecardView } from "./ScorecardView";

export const DiagnosticHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"url" | "wizard">("url");
  const [selectedPillar, setSelectedPillar] = useState<DiagnosticPillar>("sinta");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const [urlInput, setUrlInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  // Pillar icon resolver
  const getPillarIcon = (id: DiagnosticPillar) => {
    switch (id) {
      case "web": return <Globe className="w-5 h-5 text-teal-400" />;
      case "sinta": return <GraduationCap className="w-5 h-5 text-indigo-400" />;
      case "bisnis": return <Briefcase className="w-5 h-5 text-amber-400" />;
      case "sop": return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
    }
  };

  // URL Checker Submit
  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      setErrorMsg("Mohon masukkan alamat URL atau domain yang ingin diuji.");
      return;
    }
    setErrorMsg("");
    setIsLoading(true);

    try {
      const auditRes = await runLiveWebSpeedAudit(urlInput.trim());
      setResult(auditRes);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Gagal melakukan pengecekan URL. Silakan periksa kembali format domain Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  // Quick URL chip
  const handleQuickUrl = (sample: string) => {
    setUrlInput(sample);
  };

  // Question Answer Handler
  const currentQuestions = DIAGNOSTIC_QUESTIONS[selectedPillar] || [];
  const currentQ = currentQuestions[currentQuestionIndex];

  const handleSelectOption = (optionId: string) => {
    const updated = { ...answers, [currentQ.id]: optionId };
    setAnswers(updated);

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Selesai seluruh pertanyaan -> kalkulasi skor
      const finalRes = calculateQuestionnaireScore(selectedPillar, updated);
      setResult(finalRes);
    }
  };

  const handleReset = () => {
    setResult(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setErrorMsg("");
  };

  const handleSwitchPillar = (p: DiagnosticPillar) => {
    setSelectedPillar(p);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
  };

  if (result) {
    return <ScorecardView result={result} onReset={handleReset} />;
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Mode Switcher Tabs */}
      <div className="flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
        <button
          type="button"
          onClick={() => { setActiveTab("url"); setResult(null); }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold font-heading flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "url"
              ? "bg-teal-500 text-slate-950 shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Audit URL Web Instan</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] bg-slate-950/30 text-slate-900 font-mono">
            LIVE CWV
          </span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab("wizard"); setResult(null); }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold font-heading flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "wizard"
              ? "bg-teal-500 text-slate-950 shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Kuesioner Diagnostik Mendalam</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] bg-slate-950/30 text-slate-900 font-mono">
            SINTA / BISNIS / SOP
          </span>
        </button>
      </div>

      {/* TAB 1: LIVE URL CHECKER */}
      {activeTab === "url" && (
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl text-white relative overflow-hidden">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Google PageSpeed v5 + Heuristic Scan</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2">
              Uji Kecepatan Mobile & Risiko SEO Website Anda
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Google memprioritaskan situs dengan LCP &lt; 2.5s di perangkat smartphone. Masukkan URL untuk mendeteksi celah kecepatan yang berpotensi menghilangkan 53% calon klien.
            </p>
          </div>

          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Contoh: bisnisanda.com atau https://domainanda.id"
                disabled={isLoading}
                className="w-full py-4 pl-4 pr-32 rounded-2xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all font-mono"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-2 bottom-2 px-5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold font-heading text-xs sm:text-sm flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menguji...</span>
                  </>
                ) : (
                  <>
                    <span>Uji Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 text-xs text-rose-400 p-3 rounded-xl bg-rose-950/30 border border-rose-900/40">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Quick Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
              <span className="font-mono text-[11px]">Coba Uji Cepat:</span>
              {["gworky.com", "sribu.com", "tokopedia.com"].map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => handleQuickUrl(sample)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] transition-colors cursor-pointer"
                >
                  {sample}
                </button>
              ))}
            </div>
          </form>

          {/* Loading Indicator Overlay */}
          {isLoading && (
            <div className="mt-6 p-4 rounded-2xl bg-teal-950/20 border border-teal-900/40 flex items-center gap-3 text-teal-300 animate-pulse">
              <Loader2 className="w-5 h-5 animate-spin shrink-0 text-teal-400" />
              <div className="text-xs">
                <strong>Sedang Menghubungi Google PageSpeed Engine...</strong>
                <p className="text-teal-400/80 text-[11px]">
                  Menganalisis Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), dan arsitektur SEO on-page.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DEEP QUESTIONNAIRE WIZARD */}
      {activeTab === "wizard" && (
        <div className="space-y-6">
          {/* Pillar Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {DIAGNOSTIC_PILLARS.map((pillar) => {
              const isSelected = selectedPillar === pillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => handleSwitchPillar(pillar.id)}
                  className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-slate-900 border-teal-500/80 shadow-lg ring-1 ring-teal-500/50"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    {getPillarIcon(pillar.id)}
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {pillar.badge}
                    </span>
                  </div>
                  <span className={`text-xs font-bold font-heading line-clamp-1 ${isSelected ? "text-white" : ""}`}>
                    {pillar.title.split("&")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Current Question Card */}
          {currentQ && (
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl text-white">
              {/* Stepper Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
                  Langkah {currentQuestionIndex + 1} dari {currentQuestions.length}
                </span>
                <div className="flex gap-1.5">
                  {currentQuestions.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentQuestionIndex
                          ? "w-6 bg-teal-400"
                          : idx < currentQuestionIndex
                          ? "w-2 bg-emerald-500"
                          : "w-2 bg-slate-800"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h3 className="text-lg sm:text-xl font-bold font-heading text-white mb-2 leading-snug">
                  {currentQ.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {currentQ.subtitle}
                </p>
              </div>

              {/* Options List */}
              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const isChecked = answers[currentQ.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 group ${
                        isChecked
                          ? "bg-teal-500/10 border-teal-500 text-white ring-1 ring-teal-500"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isChecked ? "border-teal-400 bg-teal-500 text-slate-950" : "border-slate-700 group-hover:border-slate-500"
                      }`}>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1">
                        <span className="text-xs sm:text-sm font-medium leading-relaxed block">
                          {opt.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Prev Button */}
              {currentQuestionIndex > 0 && (
                <div className="pt-6 mt-6 border-t border-slate-800 flex justify-start">
                  <button
                    type="button"
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Kembali ke pertanyaan sebelumnya</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
