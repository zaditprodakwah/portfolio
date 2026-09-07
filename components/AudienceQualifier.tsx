"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Briefcase, Globe, UserCheck, ArrowRight, CheckCircle2 } from "lucide-react";

interface AudienceQualifierProps {
  lang?: "id" | "en";
}

export function AudienceQualifier({ lang = "id" }: AudienceQualifierProps) {
  const roles = [
    {
      id: "akademisi",
      targetId: "layanan-riset",
      serviceKey: "academic-data",
      routeUrl: "/layanan/olah-data-statistik-sinta",
      icon: GraduationCap,
      hook: true ? "Tenggat Waktu & Revisi Menumpuk?" : "Facing Tight Deadlines & Revisions?",
      title: true ? "Akademisi, Dosen & Mahasiswa" : "Researchers & Academics",
      desc: true
        ? "Bimbingan metodologi skripsi/tesis/disertasi, olah data statistik (SPSS, SEM, Python), dan penyiapan naskah publikasi jurnal SINTA."
        : "Methodology guidance for thesis/dissertation, quantitative analysis (SPSS, SEM, Python), and SINTA journal manuscript preparation.",
      badge: true ? "Riset & Olah Data" : "Research & Statistics"
    },
    {
      id: "bisnis",
      targetId: "layanan-dokumen",
      serviceKey: "business-docs",
      routeUrl: "/layanan/dokumen-administrasi-bisnis",
      icon: Briefcase,
      hook: true ? "Peluang Usaha Tertahan Dokumen?" : "Growth Delayed by Unstructured Docs?",
      title: true ? "Pelaku Usaha, UMKM & Lembaga" : "Business Founders & Institutions",
      desc: true
        ? "Proposal kemitraan investor, studi kelayakan (FS), proyeksi keuangan BEP realistis, dan standardisasi buku pedoman SOP operasional."
        : "Investor partnership proposals, commercial feasibility studies, BEP financial models, and operational SOP manuals.",
      badge: true ? "Proposal & SOP" : "Proposals & SOP"
    },
    {
      id: "web",
      targetId: "layanan-web",
      serviceKey: "web-solutions",
      routeUrl: "/layanan/solusi-web-performa",
      icon: Globe,
      hook: true ? "Website Lambat & Sepi Prospek?" : "Website Slow & Missing Conversions?",
      title: true ? "Bisnis Berkembang & UKM" : "Growing Businesses & Brands",
      desc: true
        ? "Website profil dan landing page ringan yang terbuka instan di ponsel, ramah SEO pencarian berniat beli, dan langsung terhubung WhatsApp."
        : "Lightweight, instant-loading mobile business websites optimized for search intent and direct WhatsApp client acquisition.",
      badge: true ? "Web & Konversi" : "Web & Conversions"
    },
    {
      id: "karir",
      targetId: "resume",
      serviceKey: "cv",
      routeUrl: "/cv",
      icon: UserCheck,
      hook: true ? "Gagal di Tahap Skrining Lamaran?" : "Filtered Out at CV Screening?",
      title: true ? "Profesional & Rekruter" : "Professionals & Recruiters",
      desc: true
        ? "Penyusunan CV eksekutif format ATS internasional, portofolio kredensial terverifikasi, dan rekam jejak resmi rating 5.0 Sribulancer."
        : "ATS-compliant international executive resume design, verified career credentials, and official 5.0 Sribu track record.",
      badge: true ? "CV ATS & Kredensial" : "ATS CV & Credential"
    }
  ];

  const handleSelectRole = (e: React.MouseEvent, targetId: string, serviceKey: string) => {
    e.preventDefault();
    
    // Dispatch custom event so ServicesSection automatically expands the accordion
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-service-accordion", {
          detail: { serviceId: serviceKey, elementId: targetId }
        })
      );
    }

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("ring-4", "ring-teal-500/40", "transition-all");
      setTimeout(() => {
        el.classList.remove("ring-4", "ring-teal-500/40");
      }, 1500);
    } else {
      // Fallback scroll to services section
      const svcSection = document.getElementById("services");
      if (svcSection) {
        svcSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-12">
      <div className="text-center mb-6">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/80 inline-block mb-2">
          {true ? "Pilih Kebutuhan Anda" : "Select Your Objective"}
        </span>
        <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 tracking-tight">
          {true ? "Apa yang Sedang Menahan Kemajuan Anda Hari Ini?" : "What Friction Point Are We Resolving Today?"}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-1">
          {true
            ? "Pilih kendala utama Anda untuk melihat spesifikasi solusi dan standar pengerjaannya."
            : "Select your primary bottleneck to inspect tailored solutions and execution standards."}
        </p>
      </div>

      <div className="flex sm:grid sm:grid-cols-2 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory gap-3 sm:gap-4 pb-4 sm:pb-0 w-full scroll-pl-0 scrollbar-none">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <div
              key={role.id}
              onClick={(e) => handleSelectRole(e, role.targetId, role.serviceKey)}
              className="group text-left p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-teal-600 transition-all cursor-pointer flex flex-col justify-between min-h-[160px] active:scale-[0.99] snap-start shrink-0 w-[82vw] max-w-[320px] sm:w-auto sm:max-w-none"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSelectRole(e as any, role.targetId, role.serviceKey);
                }
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                      <Icon className="w-4.5 h-4.5" />
                    </span>
                    <div>
                      <span className="text-[10px] font-mono text-teal-800 font-bold block uppercase tracking-wider">
                        {role.hook}
                      </span>
                      <span className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-teal-800 transition-colors">
                        {role.title}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-0.5 mt-2">
                  {role.desc}
                </p>
              </div>

              <div className="flex items-center justify-between gap-2 mt-4 pt-2.5 border-t border-slate-100">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 group-hover:text-teal-900">
                  <span>{true ? "Jelajahi Solusi Ini" : "Explore Solution"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  {role.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Swipe Indicator Dots */}
      <div className="flex sm:hidden items-center justify-center gap-1.5 mt-2">
        {roles.map((_, idx) => (
          <span key={idx} className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        ))}
        <span className="text-[10px] text-slate-500 font-mono ml-1">Geser untuk melihat 4 bidang &rarr;</span>
      </div>
    </div>
  );
}
