import React from "react";
import { ExternalLink, CheckCircle2, ArrowUpRight } from "lucide-react";
import { ProofLink } from "@/lib/commercial-packages";

interface CaseStudyProofCardProps {
  title: string;
  tagline: string;
  sla: string;
  priceFormatted: string;
  period?: string;
  bestFor: string;
  deliverables: string[];
  proofLinks: ProofLink[];
  highlight?: boolean;
}

export const CaseStudyProofCard: React.FC<CaseStudyProofCardProps> = ({
  title,
  tagline,
  sla,
  priceFormatted,
  period,
  bestFor,
  deliverables,
  proofLinks,
  highlight = false,
}) => {
  return (
    <div
      className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all relative ${
        highlight
          ? "bg-[#1C1322] border-2 border-[#8F652E] shadow-xl text-white"
          : "bg-white border border-slate-200 hover:border-teal-600/40 shadow-xs hover:shadow-md text-slate-900"
      }`}
    >
      {highlight && (
        <div className="absolute -top-3.5 left-6 bg-[#8F652E] text-white text-[10px] font-mono font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
          Paling Direkomendasikan
        </div>
      )}

      <div className="space-y-4">
        {/* Header Block */}
        <div className="space-y-1.5 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                highlight
                  ? "bg-[#231627] text-[#C5A880] border border-[#8F652E]/30"
                  : "bg-teal-50 text-teal-800 border border-teal-200/60"
              }`}
            >
              SLA: {sla}
            </span>
          </div>
          <h3
            className={`text-lg sm:text-xl font-heading font-extrabold leading-snug ${
              highlight ? "text-white" : "text-slate-900"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              highlight ? "text-zinc-300" : "text-slate-600"
            }`}
          >
            {tagline}
          </p>
        </div>

        {/* Pricing Block */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-1">
            <span
              className={`text-2xl sm:text-3xl font-heading font-extrabold tracking-tight ${
                highlight ? "text-[#C5A880]" : "text-slate-900"
              }`}
            >
              {priceFormatted}
            </span>
            {period && (
              <span
                className={`text-xs font-mono ${
                  highlight ? "text-zinc-400" : "text-slate-500"
                }`}
              >
                {period}
              </span>
            )}
          </div>
          <p
            className={`text-xs italic ${
              highlight ? "text-[#C5A880]/90" : "text-teal-800"
            }`}
          >
            Cocok untuk: {bestFor}
          </p>
        </div>

        {/* Deliverables List */}
        <div className="space-y-2 pt-2">
          <p
            className={`text-xs font-mono uppercase tracking-wider font-bold ${
              highlight ? "text-zinc-400" : "text-slate-500"
            }`}
          >
            Apa yang Anda Dapatkan:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm">
            {deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-snug">
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    highlight ? "text-emerald-400" : "text-teal-700"
                  }`}
                />
                <span className={highlight ? "text-zinc-200" : "text-slate-700"}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Proof of Competence & Verification Link (zadevpenseo.github.io) */}
      <div className="pt-6 mt-6 border-t border-slate-100 space-y-2">
        <p
          className={`text-[11px] font-mono uppercase tracking-wider font-bold ${
            highlight ? "text-[#C5A880]" : "text-teal-900"
          }`}
        >
          Bukti Teknis & Arsitektur Terverifikasi:
        </p>
        <div className="space-y-1.5">
          {proofLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-between w-full p-2 rounded-lg text-xs font-mono font-medium transition-colors ${
                highlight
                  ? "bg-[#231627] text-zinc-200 hover:text-white hover:bg-[#2e1d33] border border-[#8F652E]/30"
                  : "bg-slate-50 text-slate-800 hover:text-teal-900 hover:bg-teal-50/70 border border-slate-200/80"
              }`}
            >
              <span className="truncate pr-2">{link.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
