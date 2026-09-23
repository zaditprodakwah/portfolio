"use client";

import React from "react";
import { ShieldCheck, FileCheck, Unlock, ArrowRight, CheckCircle2 } from "lucide-react";
import { triggerLeadModal } from "./LeadIntakeModal";

export default function TwoStageDeliveryGuarantee() {
  return (
    <section className="bg-[#0b0d11] text-[#f3f4f6] py-20 border-b border-white/10" id="jaminan">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#10b981] px-3 py-1 rounded-full bg-[#141820] border border-[#10b981]/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>KEPASTIAN KUALITAS • PENGECEKAN TANPA RISIKO</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#f3f4f6] tracking-tight">
            Protokol Pengecekan 2 Tahap
          </h2>
          <p className="text-sm text-[#9ca3af] leading-relaxed">
            Anda dapat memastikan format dan kelengkapan data sesuai kebutuhan sebelum mengeluarkan anggaran proyek. Kami menyediakan pratinjau sampel untuk diperiksa bersama tim Anda.
          </p>
        </div>

        {/* 2 Stages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          
          {/* STAGE 1 */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141820] border border-[#10b981]/30 flex flex-col justify-between space-y-6 hover:border-[#10b981]/50 transition-all shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs px-3 py-1 rounded bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 font-semibold">
                  TAHAP 1: VALIDASI AWAL
                </span>
                <span className="text-xs text-[#10b981] font-bold">TANPA BIAYA</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1a202c] flex items-center justify-center text-[#10b981] shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#f3f4f6]">Pratinjau Sampel 50 Baris</h3>
                  <div className="text-xs text-[#9ca3af]">Pemeriksaan Struktur Kolom dan Format Berkas</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                Kami mengekstraksi dan menyerahkan 50 baris pertama data target Anda dalam lembar kerja Excel bertanda air. Anda dan tim dapat langsung menguji kesesuaian kolom, tipe data, dan keakuratan isi tanpa kewajiban komitmen di awal.
              </p>

              <div className="p-3.5 rounded-xl bg-[#0b0d11] border border-white/5 space-y-2 text-xs text-[#9ca3af]">
                <div className="text-[#10b981] font-semibold">Yang Anda Terima di Tahap 1:</div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>50 baris data riil siap periksa</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Penjelasan struktur kolom (Data Dictionary)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Diskusi penyesuaian format sesuai kebutuhan internal</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-[#10b981]">
              Waktu penyiapan: Tersedia dalam 24 jam kerja
            </div>
          </div>

          {/* STAGE 2 */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141820] border border-white/10 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs px-3 py-1 rounded bg-[#8f652e]/20 text-[#8f652e] border border-[#8f652e]/30 font-semibold">
                  TAHAP 2: SERAH TERIMA DATA PENUH
                </span>
                <span className="text-xs text-[#9ca3af]">AKSES LENGKAP</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1a202c] flex items-center justify-center text-[#8f652e] shrink-0">
                  <Unlock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#f3f4f6]">Penyerahan Berkas Master & Akses API</h3>
                  <div className="text-xs text-[#9ca3af]">Data Bersih Tanpa Tanda Air</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                Setelah format pada Tahap 1 disetujui, kami memproses dan menyerahkan seluruh dataset lengkap tanpa tanda air. Dilengkapi opsi basis data SQLite, alur pembaruan berkala, atau endpoint API sesuai kebutuhan paket kerja sama.
              </p>

              <div className="p-3.5 rounded-xl bg-[#0b0d11] border border-white/5 space-y-2 text-xs text-[#9ca3af]">
                <div className="text-[#8f652e] font-semibold">Yang Anda Terima di Tahap 2:</div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Berkas data master bersih 100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Akses query basis data atau integrasi API</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Dokumen invoice dan faktur resmi perusahaan</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-[#9ca3af]">
              Penyerahan resmi di bawah PT Prisma Digital Kreatif
            </div>
          </div>

        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-8 p-6 rounded-2xl bg-[#1a202c] border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-semibold text-[#f3f4f6]">
              Ingin Menguji Sampel Data untuk Kebutuhan Anda?
            </h4>
            <p className="text-xs text-[#9ca3af]">
              Kirimkan nama target, tautan rujukan, atau wilayah pemantauan Anda. Kami siapkan contoh 50 baris pertama untuk ditinjau.
            </p>
          </div>

          <button
            onClick={() => triggerLeadModal({ plan: "Pratinjau Sampel 50 Baris (Tahap 1)" })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] font-semibold text-xs transition-all shrink-0 cursor-pointer shadow-lg shadow-[#10b981]/20"
          >
            <span>Minta Pratinjau Sampel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
