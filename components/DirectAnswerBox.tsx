"use client";

import { Sparkles, CheckCircle2 } from "lucide-react";

interface DirectAnswerBoxProps {
  summary: string;
  takeaways: string[];
  title?: string;
  lang?: "id" | "en";
}

export function DirectAnswerBox({
  summary,
  takeaways,
  title = "Ringkasan Langsung & Poin Kunci Eksekutif",
  lang = "id",
}: DirectAnswerBoxProps) {
  return (
    <aside
      aria-label="Key Takeaways & Quick Answer"
      className="my-6 sm:my-8 rounded-2xl border-2 border-teal-600/30 bg-teal-50/40 p-5 sm:p-6 shadow-xs not-prose"
    >
      <div className="flex items-center gap-2.5 mb-3">
        <span className="w-8 h-8 rounded-lg bg-teal-600/10 text-teal-700 flex items-center justify-center shrink-0">
          <Sparkles className="w-4.5 h-4.5" />
        </span>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 block">
            {lang === "id" ? "Ringkasan Eksekutif (BLUF)" : "Executive Summary (BLUF)"}
          </span>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
            {title}
          </h2>
        </div>
      </div>

      <p className="text-xs sm:text-sm leading-relaxed text-slate-800 font-medium mb-4 pl-0.5">
        {summary}
      </p>

      <ul className="space-y-2.5 pt-3 border-t border-teal-200/60">
        {takeaways.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-slate-700">
            <CheckCircle2 className="w-4 h-4 mt-0.5 text-teal-600 shrink-0" />
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
