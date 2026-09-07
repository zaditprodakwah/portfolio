"use client";

import { Briefcase, Building2, GraduationCap, UserCheck, ArrowRight } from "lucide-react";

interface AudienceQualifierProps {
  lang?: "id" | "en";
}

export function AudienceQualifier({ lang = "id" }: AudienceQualifierProps) {
  const roles = [
    {
      id: "bisnis",
      targetId: "layanan-dokumen",
      icon: Briefcase,
      title: lang === "id" ? "Pelaku Bisnis & UMKM" : "Business & Founders",
      desc: lang === "id" 
        ? "Proposal kemitraan investor, studi kelayakan, dan peningkatan leads organik."
        : "Investor decks, commercial feasibility models, and organic lead acquisition.",
      badge: lang === "id" ? "Solusi Dokumen & Bisnis" : "Business Solutions"
    },
    {
      id: "yayasan",
      targetId: "layanan-dokumen",
      icon: Building2,
      title: lang === "id" ? "Lembaga & Yayasan" : "Foundations & Institutions",
      desc: lang === "id"
        ? "Tata kelola administrasi, buku SOP operasional, dan kepatuhan audit donatur."
        : "Administrative governance, operational SOP manuals, and donor audit compliance.",
      badge: lang === "id" ? "SOP & Tata Kelola" : "Governance & SOP"
    },
    {
      id: "akademisi",
      targetId: "layanan-riset",
      icon: GraduationCap,
      title: lang === "id" ? "Dosen & Peneliti" : "Faculty & Researchers",
      desc: lang === "id"
        ? "Olah data statistik SPSS, uji validitas kuesioner, dan naskah jurnal SINTA."
        : "SPSS quantitative statistics, instrument validity, and SINTA manuscript review.",
      badge: lang === "id" ? "Riset & Publikasi" : "Research & Data"
    },
    {
      id: "rekruter",
      targetId: "layanan-web",
      icon: UserCheck,
      title: lang === "id" ? "Rekruter & Klien Korporat" : "Recruiters & Executives",
      desc: lang === "id"
        ? "Verifikasi rekam jejak 10+ tahun, rating 5.0 Sribulancer, dan dokumen CV resmi."
        : "10+ years verified track record, 5.0 Sribu rating, and formal executive CV.",
      badge: lang === "id" ? "Profil & Rekam Jejak" : "Track Record"
    }
  ];

  const handleSelectRole = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Add brief highlight effect
      el.classList.add("ring-4", "ring-teal-400/50", "transition-all");
      setTimeout(() => {
        el.classList.remove("ring-4", "ring-teal-400/50");
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="text-center mb-5">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 inline-block mb-2">
          {lang === "id" ? "Pilih Kebutuhan Anda" : "Select Your Objective"}
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
          {lang === "id" ? "Apa yang Sedang Ingin Anda Selesaikan Hari Ini?" : "What Challenge Are We Solving Today?"}
        </h3>
      </div>

      <div className="flex sm:grid sm:grid-cols-2 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory gap-3 sm:gap-4 pb-3 sm:pb-0 w-full scroll-pl-0 scrollbar-none">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              onClick={() => handleSelectRole(role.targetId)}
              className="group text-left p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-teal-500 transition-all cursor-pointer flex flex-col justify-between min-h-[120px] active:scale-[0.99] snap-start shrink-0 w-[82vw] max-w-[320px] sm:w-auto sm:max-w-none"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <Icon className="w-4.5 h-4.5" />
                    </span>
                    <span className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-teal-700 transition-colors">
                      {role.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60">
                    {role.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-0.5">
                  {role.desc}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-teal-700 group-hover:text-teal-800 mt-3 pt-2 border-t border-slate-100">
                <span>{lang === "id" ? "Jelajahi Solusi Ini" : "Explore Solution"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
      {/* Mobile Swipe Indicator Dots */}
      <div className="flex sm:hidden items-center justify-center gap-1.5 mt-2">
        {roles.map((_, idx) => (
          <span key={idx} className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        ))}
        <span className="text-[10px] text-slate-500 font-mono ml-1">Geser &rarr;</span>
      </div>
    </div>
  );
}
