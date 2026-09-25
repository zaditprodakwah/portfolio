"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Briefcase, Globe, FileCheck2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function AudienceQualifier() {
  const { language } = useLanguage();
  const isId = language === "id";

  const roles = [
    {
      id: "data-doc",
      targetId: "layanan-riset",
      serviceKey: "academic-data",
      routeUrl: "/solusi/document-data-studio",
      icon: FileCheck2,
      hook: isId ? "Data Berantakan & Format Dokumen Rusak?" : "Messy Data & Broken Document Formats?",
      title: isId ? "Bisnis, Analis Data & Operasional" : "Businesses, Data Operators & Analysts",
      desc: isId
        ? "Ekstraksi mutasi rekening PDF ke Excel, pembersihan data survei kuesioner, dan rekonstruksi naskah Word OpenXML tanpa kotak teks liar."
        : "Deterministic PDF bank statement parsing to Excel, survey dataset cleansing, and Word OpenXML rebuilding with zero broken text boxes.",
      badge: isId ? "Data & Rekayasa Dokumen" : "Data & Document Engineering"
    },
    {
      id: "bisnis",
      targetId: "layanan-dokumen",
      serviceKey: "business-docs",
      routeUrl: "/layanan/dokumen-administrasi-bisnis",
      icon: Briefcase,
      hook: isId ? "Peluang Usaha Tertahan Dokumen?" : "Growth Delayed by Unstructured Docs?",
      title: isId ? "Pelaku Usaha, UMKM & Lembaga" : "Business Founders & Institutions",
      desc: isId
        ? "Penyusunan proposal kemitraan investor, studi kelayakan, proyeksi arus kas realistis, dan standardisasi buku pedoman SOP operasional."
        : "Investor partnership proposals, commercial feasibility studies, cash flow models, and operational SOP manuals.",
      badge: isId ? "Proposal & SOP" : "Proposals & SOP"
    },
    {
      id: "akademisi",
      targetId: "layanan-riset",
      serviceKey: "academic-data",
      routeUrl: "/layanan/olah-data-statistik-sinta",
      icon: GraduationCap,
      hook: isId ? "Tenggat Waktu & Revisi Menumpuk?" : "Facing Tight Deadlines & Revisions?",
      title: isId ? "Akademisi, Dosen & Peneliti" : "Researchers & Academics",
      desc: isId
        ? "Bimbingan metodologi riset, pemodelan statistik (SPSS, SEM, Python), uji hipotesis, dan penyiapan naskah publikasi jurnal terakreditasi."
        : "Research methodology advisory, quantitative modeling (SPSS, SEM, Python), hypothesis tests, and journal submission readiness.",
      badge: isId ? "Riset & Olah Data" : "Research & Statistics"
    },
    {
      id: "web",
      targetId: "layanan-web",
      serviceKey: "web-solutions",
      routeUrl: "/layanan/solusi-web-performa",
      icon: Globe,
      hook: isId ? "Website Lambat & Sepi Pembeli?" : "Slow Website & Missing Leads?",
      title: isId ? "Bisnis Berkembang & Perusahaan" : "Growing Businesses & Companies",
      desc: isId
        ? "Website profil dan landing page ringan yang terbuka instan di ponsel pelanggan, bebas hambatan teknis, dan terhubung langsung ke WhatsApp penjualan."
        : "Lightweight, instant-loading mobile business websites engineered for search intent and direct WhatsApp client acquisition.",
      badge: isId ? "Web & Konversi" : "Web & Conversions"
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
          {isId ? "Pilih Kebutuhan Anda" : "Select Your Objective"}
        </span>
        <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 tracking-tight">
          {isId ? "Apa Hambatan Utama yang Ingin Anda Selesaikan Hari Ini?" : "What Friction Point Are We Resolving Today?"}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-1">
          {isId
            ? "Pilih kendala yang sedang Anda hadapi untuk melihat spesifikasi solusi dan standar pengerjaannya."
            : "Select your primary bottleneck to inspect tailored solutions and verifiable deliverables."}
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
                  <span>{isId ? "Jelajahi Solusi Ini" : "Explore Solution"}</span>
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
        <span className="text-[10px] text-slate-500 font-mono ml-1">
          {isId ? "Geser untuk melihat 4 bidang →" : "Swipe to explore 4 areas →"}
        </span>
      </div>
    </div>
  );
}
