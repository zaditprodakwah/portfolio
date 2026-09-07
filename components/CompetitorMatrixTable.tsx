"use client";

import { Check, X, AlertTriangle } from "lucide-react";

interface MatrixRow {
  dimension: string;
  ourSolution: string;
  legacyAgency: string;
  cheapFreelance: string;
}

interface CompetitorMatrixTableProps {
  rows: MatrixRow[];
  title?: string;
  lang?: "id" | "en";
}

export function CompetitorMatrixTable({
  rows,
  title = "Matriks Evaluasi: Memilih Pendekatan yang Tepat untuk Kebutuhan Anda",
  lang = "id",
}: CompetitorMatrixTableProps) {
  return (
    <section className="my-10 not-prose">
      <div className="mb-5 text-center sm:text-left">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 inline-block mb-2">
          {lang === "id" ? "Perbandingan Solusi" : "Decision Framework"}
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
          {title}
        </h3>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
        <table className="w-full text-left border-collapse min-w-[620px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-xs text-slate-600 font-bold uppercase tracking-wider">
              <th className="py-3.5 px-4 w-1/4">Dimensi Evaluasi</th>
              <th className="py-3.5 px-4 w-1/3 bg-teal-50/70 text-teal-900 border-x border-teal-200/60">
                Pendekatan Rekayasa Zadit
              </th>
              <th className="py-3.5 px-4 w-1/5 text-slate-700">Agensi Konvensional</th>
              <th className="py-3.5 px-4 w-1/5 text-slate-700">Jasa Murahan / Template</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-4 font-bold text-slate-900 align-top">
                  {row.dimension}
                </td>
                <td className="py-4 px-4 bg-teal-50/30 border-x border-teal-200/60 text-slate-800 leading-relaxed font-medium align-top">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{row.ourSolution}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-slate-600 leading-relaxed align-top">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{row.legacyAgency}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-slate-500 leading-relaxed align-top">
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{row.cheapFreelance}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
