import React from "react";
import Link from "next/link";
import { ShieldCheck, Building, UserCheck, MessageSquare, ArrowUpRight, ExternalLink, FileText, CheckCircle2 } from "lucide-react";

export default function EnterpriseFounderFooter() {
  return (
    <footer className="bg-[#0b0d11] text-[#f3f4f6] pt-16 pb-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Founder & Corporate Identity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: PT PRISMA & LEGAL CREDENTIALS (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#10b981] px-3 py-1 rounded-full bg-[#141820] border border-[#10b981]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>LEGALITAS RESMI DAN ENTITAS BADAN HUKUM</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#f3f4f6] tracking-tight">
                PT Prisma Digital Kreatif
              </h3>
              <p className="text-sm text-[#9ca3af] leading-relaxed max-w-xl">
                Badan hukum resmi yang memayungi layanan teknologi data, portal digital, dan rekayasa kecerdasan komputasi. Beroperasi penuh dengan izin berusaha berbasis risiko dan tanda daftar resmi kementerian terkait.
              </p>
            </div>

            {/* Credential Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              {/* NIB & KBLI */}
              <div className="p-4 rounded-xl bg-[#141820] border border-white/10 space-y-2">
                <div className="text-white/40 flex items-center justify-between">
                  <span>// IZIN BERUSAHA (OSS)</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                </div>
                <div className="text-[#f3f4f6] font-semibold text-sm">NIB: 1801250039976</div>
                <div className="text-[#9ca3af] text-[11px] leading-relaxed space-y-0.5">
                  <div>KBLI 63112 (Aktivitas Hosting)</div>
                  <div>KBLI 63122 (Portal Web & Platform Digital)</div>
                  <div>KBLI 73100 (Periklanan)</div>
                  <div>KBLI 74130 (Desain Komunikasi Visual)</div>
                </div>
              </div>

              {/* MENKUMHAM & TDPSE KOMINFO */}
              <div className="p-4 rounded-xl bg-[#141820] border border-white/10 space-y-2">
                <div className="text-white/40 flex items-center justify-between">
                  <span>// PENGESAHAN & PENDAFTARAN</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                </div>
                <div className="text-[#f3f4f6] font-semibold text-sm">SK MENKUMHAM RI</div>
                <div className="text-[#9ca3af] text-[11px] leading-relaxed">
                  <div>AHU-000565.AH.01.30.Tahun 2025</div>
                  <div className="mt-1 pt-1 border-t border-white/5 text-[#10b981]">
                    TDPSE Kominfo: 017014.01/DJAI.PSE/01/2025
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Mandiri Giro & Founder Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-[#141820] border border-white/5 space-y-1">
                <div className="text-white/40">// REKENING RESMI PERUSAHAAN</div>
                <div className="text-[#f3f4f6] font-semibold">BANK MANDIRI GIRO</div>
                <div className="text-[#9ca3af] text-[11px]">a.n. PT Prisma Digital Kreatif</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#141820] border border-white/5 space-y-1">
                <div className="text-white/40">// PENANGGUNG JAWAB & ARSITEK DATA</div>
                <div className="text-[#f3f4f6] font-semibold">Zadit</div>
                <div className="text-[#9ca3af] text-[11px]">Lead Consultant & System Engineer</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#141820]/70 border border-white/5 space-y-1 text-xs text-[#9ca3af]">
              <div className="text-[#f3f4f6] font-medium flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#10b981]" />
                <span>Konsultasi Teknis Satu Pintu dengan Zadit</span>
              </div>
              <p className="leading-relaxed">
                Anda berdiskusi langsung dengan perancang sistem utama tanpa melalui perantara sales junior, memastikan setiap kebutuhan data dipahami secara presisi.
              </p>
            </div>
          </div>

          {/* Column 2: DIRECT CONSULTATION CHANNELS (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#141820] border border-white/10 space-y-5">
            <div className="space-y-1">
              <div className="text-xs font-mono text-[#8f652e]">HUBUNGI LANGSUNG // SATU PINTU</div>
              <h4 className="text-lg font-semibold text-[#f3f4f6]">
                Mulai Diskusi Kebutuhan Data Anda
              </h4>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Kirimkan tautan target, sektor lelang, atau kebutuhan pemantauan Anda. Kami merespons dengan telaah kelayakan teknis awal dalam 24 jam kerja.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="https://wa.me/6285864149673?text=Halo%20Zadit%2C%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20data%20intelijen."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] font-semibold text-xs font-mono transition-all shadow-lg shadow-[#10b981]/10"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Bisnis: +62 858-6414-9673</span>
                </div>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <Link
                href="/cv/"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#0b0d11] hover:bg-[#1a202c] text-[#f3f4f6] text-xs font-mono border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#10b981]" />
                  <span>Profil Ringkas & Portofolio Zadit</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-white/50" />
              </Link>

              <Link
                href="/solusi/"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#0b0d11] hover:bg-[#1a202c] text-[#f3f4f6] text-xs font-mono border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#8f652e]" />
                  <span>Katalog Solusi Bisnis & Riset Lainnya</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-white/50" />
              </Link>
            </div>

            <div className="pt-2 text-[11px] font-mono text-[#9ca3af] text-center border-t border-white/5">
              Waktu Respon Cepat: Hari Kerja (08.00 - 18.00 WIB)
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Standards */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#9ca3af]">
          <div>
            &copy; {new Date().getFullYear()} PT Prisma Digital Kreatif. Seluruh hak cipta dilindungi undang-undang.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Kerahasiaan & Keamanan Data Bisnis</span>
            <span className="text-white/20">•</span>
            <span>Standar Perlindungan Data Pribadi</span>
            <span className="text-white/20">•</span>
            <span className="text-[#10b981]">PRADIKTIF DATA LAB</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
