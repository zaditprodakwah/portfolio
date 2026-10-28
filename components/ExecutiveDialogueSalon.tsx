"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, Mail, FileText, Download, ShieldCheck, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ENC_EMAIL = "bXVoemFkaXRAZ21haWwuY29t";
const ENC_WA_BASE = "aHR0cHM6Ly93YS5tZS82MjgyMzE2MzYzMTc3";

function safeDecode(b64: string): string {
  try {
    if (typeof window !== "undefined" && window.atob) {
      return window.atob(b64);
    }
  } catch {
    // fallback
  }
  return "";
}

export const ExecutiveDialogueSalon: React.FC = () => {
  const { language } = useLanguage();
  const isId = language === "id";

  const handleWhatsApp = () => {
    const base = safeDecode(ENC_WA_BASE);
    if (!base) return;
    const msg = isId
      ? "Halo Mas Zadit, saya ingin berdiskusi mengenai konsultasi dan telaah strategis."
      : "Hello Zadit, I would like to schedule an executive consultation regarding strategic data advisory.";
    window.open(`${base}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleEmail = () => {
    const email = safeDecode(ENC_EMAIL);
    if (!email) return;
    const subject = isId
      ? "Konsultasi Strategis / Permohonan Diskusi"
      : "Strategic Advisory Inquiry";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <section 
      id="dialog" 
      aria-label="Pintu Masuk Dialog Eksekutif"
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14"
    >
      <div className="relative rounded-3xl p-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white shadow-sm overflow-hidden">
        <div className="rounded-[22px] p-6 sm:p-10 bg-slate-950/60 backdrop-blur-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          <div className="space-y-3.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>{isId ? "SALON DIALOG & KONSULTASI LANGSUNG" : "EXECUTIVE DIALOGUE & ADVISORY"}</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-heading font-extrabold text-white tracking-tight leading-snug">
              {isId 
                ? "Mulai Percakapan Tanpa Hambatan Birokrasi" 
                : "Initiate Direct Strategic Collaboration"}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {isId
                ? "Setiap organisasi, proyek riset, atau institusi memiliki tantangan unik yang tidak dapat diselesaikan dengan resep cetak ulang. Jika Anda sedang menghadapi dilema data yang rumit, membutuhkan tinjauan metodologi yang ketat, atau ingin merancang sistem informasi yang efisien, pintu dialog ini terbuka untuk Anda."
                : "Every institution and research initiative encounters distinct dilemmas that cannot be addressed by recycled playbooks. If you are navigating complex data, require methodological scrutiny, or seek to engineer reliable information architectures, our dialogue begins here."}
            </p>

            <div className="text-[11px] text-slate-400 font-sans">
              <span>
                {isId
                  ? "Kerahasiaan data dan hak cipta naskah Anda terikat etika profesional penuh."
                  : "All inquiries are held under strict professional discretion and intellectual confidentiality."}
              </span>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-heading font-bold text-xs sm:text-sm shadow-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>{isId ? "Hubungi via WhatsApp Personal" : "Connect via WhatsApp"}</span>
            </button>

            <button
              onClick={handleEmail}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-heading font-semibold text-xs sm:text-sm shadow-xs transition-colors"
            >
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{isId ? "Kirim Surel Eksekutif" : "Send Executive Email"}</span>
            </button>

            <div className="pt-2 flex items-center justify-center sm:justify-start md:justify-center gap-4 text-xs font-mono text-slate-400">
              <Link href="/cv" className="hover:text-white transition-colors underline underline-offset-4">
                {isId ? "Lihat Profil CV" : "View CV Profile"}
              </Link>
              <span>•</span>
              <a 
                href="/cv.pdf" 
                download="Muhammad_Khoiruzzadittaqwa_CV.pdf"
                className="hover:text-white transition-colors flex items-center gap-1 underline underline-offset-4"
              >
                <Download className="w-3 h-3" />
                <span>PDF CV</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
