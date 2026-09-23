"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Building, UserCheck, MessageSquare, ArrowUpRight, ExternalLink, FileText, CheckCircle2 } from "lucide-react";
import { triggerLeadModal } from "./LeadIntakeModal";

export default function EnterpriseFounderFooter() {
  return (
    <footer className="bg-[#0b0d11] text-[#f3f4f6] pt-16 pb-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Founder & Corporate Identity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: PT PRISMA & LEGAL CREDENTIALS (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[#10b981] px-3 py-1 rounded-full bg-[#141820] border border-[#10b981]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>LEGALITAS RESMI & ENTITAS BADAN HUKUM</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#f3f4f6] tracking-tight">
                PT Prisma Digital Kreatif
              </h3>
              <p className="text-sm text-[#9ca3af] leading-relaxed max-w-xl">
                Badan hukum resmi yang memayungi layanan teknologi data, portal riset, dan rekayasa intelijen pasar. Beroperasi penuh dengan izin berusaha berbasis risiko dan tanda daftar resmi kementerian terkait.
              </p>
            </div>

            {/* Credential Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* NIB & KBLI */}
              <div className="p-4 rounded-xl bg-[#141820] border border-white/10 space-y-2">
                <div className="text-[#9ca3af] flex items-center justify-between">
                  <span className="font-semibold text-[11px] uppercase tracking-wider text-[#10b981]">Izin Berusaha Resmi (OSS)</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                </div>
                <div className="text-[#f3f4f6] font-semibold text-sm">NIB: 1801250039976</div>
                <div className="text-[#9ca3af] text-[11px] leading-relaxed">
                  <div>KBLI 73100 (Periklanan & Konsultasi Manajemen)</div>
                  <div className="text-white/40 mt-1">Domisili: Cirebon, Jawa Barat, Indonesia</div>
                </div>
              </div>

              {/* TDPSE KOMINFO */}
              <div className="p-4 rounded-xl bg-[#141820] border border-white/10 space-y-2">
                <div className="text-[#9ca3af] flex items-center justify-between">
                  <span className="font-semibold text-[11px] uppercase tracking-wider text-[#10b981]">Tanda Daftar Penyelenggara Sistem</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                </div>
                <div className="text-[#f3f4f6] font-semibold text-sm">TDPSE KOMINFO RI</div>
                <div className="text-[#9ca3af] text-[11px] leading-relaxed">
                  <div>Nomor: 017014.01/DJAI.PSE/01/2025</div>
                  <div className="mt-1 text-[#10b981]">Platform Terdaftar Resmi</div>
                </div>
              </div>
            </div>

            {/* Invoice & Founder Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#141820] border border-white/5 space-y-1">
                <div className="text-[#9ca3af] text-[11px] uppercase tracking-wider">Transaksi & Administrasi</div>
                <div className="text-[#f3f4f6] font-semibold">Faktur & Invoice Resmi PT</div>
                <div className="text-[#9ca3af] text-[11px]">a.n. PT Prisma Digital Kreatif</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#141820] border border-white/5 space-y-1">
                <div className="text-[#9ca3af] text-[11px] uppercase tracking-wider">Arsitek Sistem & Konsultan</div>
                <div className="text-[#f3f4f6] font-semibold">Zadit</div>
                <div className="text-[#9ca3af] text-[11px]">Lead Data Strategist</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#141820]/70 border border-white/5 space-y-1 text-xs text-[#9ca3af]">
              <div className="text-[#f3f4f6] font-medium flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#10b981]" />
                <span>Konsultasi Teknis Satu Pintu dengan Zadit</span>
              </div>
              <p className="leading-relaxed">
                Anda berdiskusi langsung dengan perancang sistem utama tanpa perantara pihak ketiga, memastikan setiap parameter data dipahami secara presisi sesuai kebutuhan bisnis Anda.
              </p>
            </div>
          </div>

          {/* Column 2: DIRECT CONSULTATION CHANNELS (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#141820] border border-white/10 space-y-5">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-[#10b981] uppercase tracking-wider">Komunikasi Resmi</div>
              <h4 className="text-lg font-semibold text-[#f3f4f6]">
                Mulai Diskusi Kebutuhan Data Anda
              </h4>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Kirimkan tautan target atau wilayah pemantauan Anda. Kami menganalisis kelayakan teknis dan format data awal dalam 24 jam kerja.
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => triggerLeadModal({ plan: "Konsultasi Strategis Intelijen Data" })}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] font-semibold text-xs transition-all shadow-lg shadow-[#10b981]/10 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Konsultasikan Spesifikasi Data (Isi Formulir)</span>
                </div>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <Link
                href="/cv/"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#0b0d11] hover:bg-[#1a202c] text-[#f3f4f6] text-xs border border-white/10 hover:border-white/20 transition-all font-medium"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#10b981]" />
                  <span>Profil & Portofolio Terverifikasi Zadit</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-white/50" />
              </Link>

              <Link
                href="/solusi/"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#0b0d11] hover:bg-[#1a202c] text-[#f3f4f6] text-xs border border-white/10 hover:border-white/20 transition-all font-medium"
              >
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#8f652e]" />
                  <span>Katalog Solusi Bisnis & Riset Lainnya</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-white/50" />
              </Link>
            </div>

            <div className="pt-2 text-[11px] text-[#9ca3af] text-center border-t border-white/5">
              Waktu Respon Cepat: Hari Kerja (08.00 - 18.00 WIB)
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Standards */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#9ca3af]">
          <div>
            &copy; {new Date().getFullYear()} PT Prisma Digital Kreatif. Seluruh hak cipta dilindungi undang-undang.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Kerahasiaan & Keamanan Data Bisnis</span>
            <span className="text-white/20">•</span>
            <span>Standar Perlindungan Data Pribadi</span>
            <span className="text-white/20">•</span>
            <span className="text-[#10b981] font-medium">PRADIKTIF DATA LAB</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
