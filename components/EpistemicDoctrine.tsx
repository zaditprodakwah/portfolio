"use client";

import React from "react";
import { CheckCircle2, ShieldAlert, Sparkles, Scale, FileCheck, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const EpistemicDoctrine: React.FC = () => {
  const { language } = useLanguage();
  const isId = language === "id";

  const doctrines = [
    {
      num: "I",
      icon: Scale,
      title: isId ? "Nalar di Balik Data" : "Evidence Over Assumptions",
      subtitle: isId ? "Menolak Angka Sintetis & Halusinasi" : "Rejecting Synthetic Hallucinations",
      body: isId
        ? "Data statistik tanpa pemahaman konteks sosial hanyalah kebisingan angka. Setiap analisis wajib berpijak pada bukti empiris yang dapat diverifikasi ulang dan bebas dari bias rekaan."
        : "Statistical data devoid of social context is mere numerical noise. Every inquiry must be anchored in verifiable empirical evidence, immune to artificial fabrications."
    },
    {
      num: "II",
      icon: FileCheck,
      title: isId ? "Ketelitian Mutu Teruji" : "Rigor Over Superficial Speed",
      subtitle: isId ? "Menolak Jalan Pintas yang Merusak Kredibilitas" : "Rejecting Reputational Shortcuts",
      body: isId
        ? "Kami menolak praktik instan atau percaloan yang mencederai integritas institusi. Setiap dokumen tata kelola, naskah riset, dan arsitektur sistem dirancang untuk tahan uji audit pemangku kepentingan."
        : "We categorically reject instant shortcuts that compromise institutional credibility. Every governance document, scholarly paper, and system is built to endure rigorous audit scrutiny."
    },
    {
      num: "III",
      icon: Users,
      title: isId ? "Kemitraan Langsung Sejawat" : "Radical Direct Partnership",
      subtitle: isId ? "Bebas Perantara Agensi & Birokrasi Berjenjang" : "Direct Access Without Agency Overhead",
      body: isId
        ? "Anda berdialog dan bekerja langsung dengan praktisi utama. Tidak ada perantara pemasaran atau birokrasi berliku, menjamin kejernihan komunikasi, kerahasiaan data, dan akuntabilitas penuh."
        : "You consult and collaborate directly with the principal practitioner. Zero agency intermediaries, ensuring complete clarity, strict confidentiality, and uncompromised accountability."
    }
  ];

  return (
    <section 
      id="doktrin" 
      aria-label="Doktrin dan Landasan Nalar"
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10"
    >
      <div className="space-y-4 sm:space-y-6">
        
        {/* Section Header */}
        <div className="space-y-1.5 max-w-2xl">
          <span className="font-mono text-[11px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">
            {isId ? "Landasan Berpikir" : "Epistemic Creed"}
          </span>
          <h2 className="text-lg sm:text-2xl font-heading font-extrabold text-slate-900 tracking-tight">
            {isId ? "Tiga Kaidah Mutlak dalam Setiap Keputusan" : "Three Non-Negotiable Tenets in Every Engagement"}
          </h2>
        </div>

        {/* 3 Compact Doppelrand Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {doctrines.map((doc) => {
            const Icon = doc.icon;
            return (
              <div 
                key={doc.num}
                className="relative rounded-2xl p-1 bg-slate-100/80 border border-slate-200/90 shadow-2xs transition-all hover:border-slate-300"
              >
                <div className="rounded-xl p-4 sm:p-5 bg-white h-full flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400">
                        {doc.num}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 leading-snug">
                        {doc.title}
                      </h3>
                      <p className="text-[11px] font-sans text-slate-500 font-medium">
                        {doc.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans pt-1">
                      {doc.body}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
