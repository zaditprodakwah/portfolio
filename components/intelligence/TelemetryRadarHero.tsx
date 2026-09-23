import React from "react";
import Link from "next/link";
import { ShieldCheck, Terminal, Download, ArrowUpRight, Activity, Cpu, Compass, Layers } from "lucide-react";

export default function TelemetryRadarHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 border-b border-white/10 bg-[#0b0d11] text-[#f3f4f6]">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#10b981]/10 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Navigation Breadcrumb / Label */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-[#141820] text-[#10b981] border border-[#10b981]/30">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            PRADIKTIF DATA LAB // REAL-WORLD TELEMETRY & ALTERNATIVE DATA ENGINE
          </div>

          <div className="text-xs font-mono text-[#9ca3af] hidden sm:flex items-center gap-2">
            <span>SISTEM AKTIF: 34 NODE LPSE</span>
            <span className="text-white/20">|</span>
            <span>12 ZONA MARITIM</span>
            <span className="text-white/20">|</span>
            <span className="text-[#10b981]">NON-MNPI COMPLIANT</span>
          </div>
        </div>

        {/* Main Headline & Value Prop */}
        <div className="max-w-4xl space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#f3f4f6] leading-[1.15]">
            Mengubah Telemetri Lapangan Menjadi Keunggulan Keputusan Sebelum Laporan Publik Terbit.
          </h1>

          <p className="text-lg sm:text-xl text-[#9ca3af] leading-relaxed max-w-3xl">
            Kami memproses aliran data fisik maritim, geospasial industri, putusan niaga, dan mutasi pasar secara independen. Memberikan pemilik bisnis dan pengambil kebijakan gambaran faktual mengenai aktivitas lapangan tanpa bergantung pada klaim sepihak.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#terminal-proof"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] font-semibold text-sm transition-all shadow-lg shadow-[#10b981]/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Terminal className="w-4 h-4 text-[#0b0d11]" />
              <span>Uji Terminal Interaktif H3 & SPC</span>
            </a>

            <a
              href="#two-stage-guarantee"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#141820] hover:bg-[#1a202c] text-[#f3f4f6] font-medium text-sm border border-white/10 hover:border-white/20 transition-all"
            >
              <Download className="w-4 h-4 text-[#10b981]" />
              <span>Unduh Sampel Draf (50 Baris Watermarked)</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#9ca3af]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10b981]" />
              <span>PT Prisma Digital Kreatif (NIB 2024 Resmi)</span>
            </div>
            <span className="text-white/20 hidden sm:inline">•</span>
            <div>Rekening Giro Mandiri Perusahaan</div>
            <span className="text-white/20 hidden sm:inline">•</span>
            <div>Kepatuhan UU PDP & Sumber Publik Terverifikasi</div>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="p-5 rounded-xl bg-[#141820] border border-white/10 flex flex-col justify-between hover:border-[#10b981]/40 transition-all group">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#1a202c] flex items-center justify-center text-[#10b981]">
                <Compass className="w-4 h-4" />
              </div>
              <div className="text-xs font-mono text-[#10b981]">UBER H3 RES-8 // ~400M</div>
              <h2 className="text-base font-semibold text-[#f3f4f6]">Kuantisasi Spasial Heksagonal</h2>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Mengonversi koordinat GPS mentah yang berisik menjadi indeks heksagonal 64-bit. Mengeliminasi komputasi jarak geodetik yang lambat dan menjaga privasi aset fisik.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#9ca3af] font-mono flex items-center justify-between">
              <span>Output: CSV/Parquet Spasial</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#10b981] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-xl bg-[#141820] border border-white/10 flex flex-col justify-between hover:border-[#10b981]/40 transition-all group">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#1a202c] flex items-center justify-center text-[#f59e0b]">
                <Activity className="w-4 h-4" />
              </div>
              <div className="text-xs font-mono text-[#f59e0b]">ROLLING Z-SCORE // 3-SIGMA</div>
              <h2 className="text-base font-semibold text-[#f3f4f6]">Kontrol Proses Statistik (SPC)</h2>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Memisahkan fluktuasi musiman alami dengan kejadian anomali fisik nyata. Memberi sinyal instan saat terjadi lonjakan kepadatan pelabuhan atau penurunan operasional.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#9ca3af] font-mono flex items-center justify-between">
              <span>Output: Alert Notifikasi Telegram</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#f59e0b] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-xl bg-[#141820] border border-white/10 flex flex-col justify-between hover:border-[#10b981]/40 transition-all group">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#1a202c] flex items-center justify-center text-[#10b981]">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-xs font-mono text-[#10b981]">MULTI-SNAPSHOT POLLING</div>
              <h2 className="text-base font-semibold text-[#f3f4f6]">SKU Delta & Inferred Velocity</h2>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Mengevaluasi mutasi persediaan katalog kompetitor secara berkala untuk memisahkan penurunan stok akibat transaksi pembelian konsumen dari restock gudang.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#9ca3af] font-mono flex items-center justify-between">
              <span>Output: Laporan Estimasi Omset SKU</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#10b981] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-5 rounded-xl bg-[#141820] border border-white/10 flex flex-col justify-between hover:border-[#10b981]/40 transition-all group">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#1a202c] flex items-center justify-center text-[#8f652e]">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="text-xs font-mono text-[#8f652e]">SWARM PARALLEL AGENTS</div>
              <h2 className="text-base font-semibold text-[#f3f4f6]">Swarm Intelligence Otonom</h2>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Mengerahkan kawanan agen otonom (Scout, Extractor, Synthesizer) yang bekerja serentak untuk mengekstraksi, memvalidasi, dan membersihkan ribuan data tidak terstruktur.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#9ca3af] font-mono flex items-center justify-between">
              <span>Output: Feed Terstruktur & Ringkasan</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8f652e] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
