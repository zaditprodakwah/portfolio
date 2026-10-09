"use client";

import React from "react";
import caseStudiesData from "@/content/digital-services/case_studies_seed.json";
import { 
  FolderGit2, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Building2, 
  TrendingUp 
} from "lucide-react";

export const CaseStudies: React.FC = () => {
  return (
    <section 
      id="studi-kasus" 
      aria-label="Bank Bukti Studi Kasus Rekayasa Nyata"
      className="w-full max-w-6xl mx-auto px-4 py-12"
    >
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200/80">
          <FolderGit2 className="w-3.5 h-3.5 text-teal-700" />
          <span>BANK PEMBUKTIAN &amp; METRIK EMPIRIS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Studi Kasus: Dari Kendala Kritis Menuju Solusi Terukur
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Kami tidak meminta Anda percaya pada janji di atas kertas. Pelajari bagaimana rekayasa arsitektur edge memecahkan persoalan performa dan efisiensi modal kerja pada kasus nyata berikut.
        </p>
      </div>

      {/* Grid Studi Kasus */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {caseStudiesData.map((study) => (
          <div
            key={study.id}
            className="flex flex-col justify-between bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all"
          >
            <div className="space-y-5">
              {/* Industri Tag */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/80 flex items-center gap-1.5">
                  <Building2 className="w-3 h-3" />
                  {study.industry}
                </span>
              </div>

              {/* Judul & Tantangan */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {study.title}
                </h3>
                <div className="mt-3 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs text-amber-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Titik Masalah Utama:</span>
                  </div>
                  <p className="leading-relaxed text-slate-700">
                    {study.challenge}
                  </p>
                </div>
              </div>

              {/* Solusi Rekayasa */}
              <div className="space-y-1 text-xs text-slate-700">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-teal-700" />
                  <span>Intervensi Arsitektur:</span>
                </div>
                <p className="leading-relaxed text-slate-600">
                  {study.solution}
                </p>
              </div>

              {/* Matriks Metrik Sebelum vs Sesudah */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-[11px] font-bold font-mono text-slate-500 uppercase tracking-wider">
                  Perbandingan Metrik Empiris:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {/* Kolom Sebelum */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-[10px] font-bold text-rose-700 uppercase">Kondisi Awal</div>
                    {Object.entries(study.metricsBefore).map(([k, val], idx) => (
                      <div key={idx} className="text-[11px] text-slate-600 truncate" title={`${k}: ${val}`}>
                        {val}
                      </div>
                    ))}
                  </div>

                  {/* Kolom Sesudah */}
                  <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1">
                    <div className="text-[10px] font-bold text-emerald-800 uppercase">Pasca Rekayasa</div>
                    {Object.entries(study.metricsAfter).map(([k, val], idx) => (
                      <div key={idx} className="text-[11px] font-bold text-emerald-950 truncate" title={`${k}: ${val}`}>
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Kesimpulan Pokok (Key Takeaway) */}
            <div className="pt-5 mt-5 border-t border-slate-100">
              <div className="text-xs text-slate-700 italic leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                &ldquo;{study.keyTakeaway}&rdquo;
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
