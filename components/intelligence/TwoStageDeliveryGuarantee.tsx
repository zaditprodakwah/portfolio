import React from "react";
import { ShieldCheck, FileCheck, Unlock, ArrowRight, CheckCircle2 } from "lucide-react";

export default function TwoStageDeliveryGuarantee() {
  return (
    <section className="bg-[#0b0d11] text-[#f3f4f6] py-20 border-b border-white/10" id="two-stage-guarantee">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#10b981] px-3 py-1 rounded-full bg-[#141820] border border-[#10b981]/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PROTEKSI KARYA BERTAHAP // ZERO RISK GUARANTEE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#f3f4f6] tracking-tight">
            Protokol Serah Terima 2 Tahap
          </h2>
          <p className="text-sm text-[#9ca3af]">
            Anda tidak perlu membeli kucing dalam karung. Kami memberikan jaminan kepastian format dan integritas kolom sebelum Anda memutuskan mengeluarkan anggaran.
          </p>
        </div>

        {/* 2 Stages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          
          {/* STAGE 1 */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141820] border border-[#10b981]/30 flex flex-col justify-between space-y-6 hover:border-[#10b981]/50 transition-all shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-3 py-1 rounded bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 font-semibold">
                  TAHAP 01 // UJI STRUKTUR
                </span>
                <span className="text-xs font-mono text-[#10b981] font-bold">100% BEBAS BIAYA</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1a202c] flex items-center justify-center text-[#10b981] shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#f3f4f6]">Sampel Draf 50 Baris Bertanda Air</h3>
                  <div className="text-xs text-[#9ca3af]">Pemeriksaan Integritas Kolom & Format Data</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                Kami mengekstraksi dan menyerahkan 50 baris pertama data target Anda dalam format CSV atau Excel bertanda air (*watermarked preview*). Anda dapat membuka dan mengaudit langsung kecocokan skema, kelengkapan kolom, dan akurasi nilai tanpa risiko finansial.
              </p>

              <div className="p-3.5 rounded-xl bg-[#0b0d11] border border-white/5 space-y-2 text-xs font-mono text-[#9ca3af]">
                <div className="text-[#10b981] font-semibold">// YANG ANDA DAPATKAN DI TAHAP 1:</div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>50 baris data riil terverifikasi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Kamus data (Data Dictionary) lengkap</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Konsultasi validasi format tanpa komitmen</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs font-mono text-[#10b981]">
              Status: Siap diuji coba dalam 24 jam kerja
            </div>
          </div>

          {/* STAGE 2 */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141820] border border-white/10 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-3 py-1 rounded bg-[#8f652e]/20 text-[#8f652e] border border-[#8f652e]/30 font-semibold">
                  TAHAP 02 // SERAH TERIMA MASTER
                </span>
                <span className="text-xs font-mono text-[#9ca3af]">FULL ACCESS</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1a202c] flex items-center justify-center text-[#8f652e] shrink-0">
                  <Unlock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#f3f4f6]">Master File Bersih & Akses API</h3>
                  <div className="text-xs text-[#9ca3af]">Kunci Data Dibuka Penuh</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                Setelah format dan struktur data pada Tahap 1 disetujui, kami menyerahkan seluruh dataset master bersih tanpa tanda air. Dilengkapi basis data SQLite queryable, pipeline otomatis, atau endpoint REST API terenkripsi sesuai kesepakatan paket.
              </p>

              <div className="p-3.5 rounded-xl bg-[#0b0d11] border border-white/5 space-y-2 text-xs font-mono text-[#9ca3af]">
                <div className="text-[#8f652e] font-semibold">// YANG ANDA DAPATKAN DI TAHAP 2:</div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Master CSV / Parquet bersih 100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Akses query database SQLite lokal</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Faktur pajak dan invoice resmi PT</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs font-mono text-[#9ca3af]">
              Status: Serah terima resmi dengan jaminan integritas
            </div>
          </div>

        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-8 p-6 rounded-2xl bg-[#1a202c] border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-semibold text-[#f3f4f6]">
              Ingin Menguji Data Toko Kompetitor atau Wilayah Properti Anda?
            </h4>
            <p className="text-xs text-[#9ca3af]">
              Kirimkan nama target, link, atau wilayah. Kami buatkan draf 50 baris pertama untuk Anda tinjau.
            </p>
          </div>

          <a
            href="https://wa.me/6285864149673?text=Halo%20Zadit%2C%20saya%20ingin%20meminta%20sampel%20draf%2050%20baris%20Tahap%201%20untuk%20data%20intelijen."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] font-semibold text-xs font-mono transition-all shrink-0"
          >
            <span>KIRIM TARGET SAMPEL</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
