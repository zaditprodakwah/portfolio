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
            PRADIKTIF DATA LAB • INTELIJEN PASAR DAN TELEMETRI BISNIS
          </div>

          <div className="text-xs font-mono text-[#9ca3af] hidden sm:flex items-center gap-2">
            <span>34 Titik Pantau LPSE</span>
            <span className="text-white/20">|</span>
            <span>12 Zona Maritim</span>
            <span className="text-white/20">|</span>
            <span className="text-[#10b981]">Kepatuhan UU PDP</span>
          </div>
        </div>

        {/* Main Headline & Value Prop */}
        <div className="max-w-4xl space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#f3f4f6] leading-[1.15]">
            Mengubah Informasi Lapangan Menjadi Keunggulan Keputusan Sebelum Laporan Publik Terbit.
          </h1>

          <p className="text-lg sm:text-xl text-[#9ca3af] leading-relaxed max-w-3xl">
            Kami mengolah data pergerakan maritim, aktivitas wilayah, putusan lelang, dan mutasi pasar secara independen. Memberikan pemilik bisnis dan pimpinan proyek gambaran faktual mengenai kondisi lapangan tanpa bergantung pada klaim sepihak.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#terminal-proof"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] font-semibold text-sm transition-all shadow-lg shadow-[#10b981]/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Terminal className="w-4 h-4 text-[#0b0d11]" />
              <span>Coba Simulasi Data Lapangan</span>
            </a>

            <a
              href="#two-stage-guarantee"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#141820] hover:bg-[#1a202c] text-[#f3f4f6] font-medium text-sm border border-white/10 hover:border-white/20 transition-all"
            >
              <Download className="w-4 h-4 text-[#10b981]" />
              <span>Lihat Contoh Data (50 Baris Gratis)</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#9ca3af]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10b981]" />
              <span>PT Prisma Digital Kreatif (NIB 2024 Resmi)</span>
            </div>
            <span className="text-white/20 hidden sm:inline">•</span>
            <div>Rekening Giro Bank Mandiri Resmi</div>
            <span className="text-white/20 hidden sm:inline">•</span>
            <div>Sumber Data Publik Terbuka dan Bebas Risiko Hukum</div>
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
              <div className="text-xs font-mono text-[#10b981]">ZONA SPASIAL PRESISI</div>
              <h2 className="text-base font-semibold text-[#f3f4f6]">Pemetaan Wilayah Heksagonal</h2>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Mengelompokkan titik koordinat geografis menjadi zona terstruktur. Mempercepat perhitungan jarak antrean dan menjaga kerahasiaan lokasi aset fisik.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#9ca3af] font-mono flex items-center justify-between">
              <span>Format: Berkas Spasial Siap Analisis</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#10b981] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-xl bg-[#141820] border border-white/10 flex flex-col justify-between hover:border-[#10b981]/40 transition-all group">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#1a202c] flex items-center justify-center text-[#f59e0b]">
                <Activity className="w-4 h-4" />
              </div>
              <div className="text-xs font-mono text-[#f59e0b]">DETEKSI PERUBAHAN TAJAM</div>
              <h2 className="text-base font-semibold text-[#f3f4f6]">Peringatan Anomali Statistik</h2>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Membedakan fluktuasi normal mingguan dengan lonjakan kejadian luar biasa. Anda mendapatkan peringatan dini saat terjadi antrean janggal atau penurunan drastis.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#9ca3af] font-mono flex items-center justify-between">
              <span>Format: Notifikasi Cepat Telegram</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#f59e0b] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-xl bg-[#141820] border border-white/10 flex flex-col justify-between hover:border-[#10b981]/40 transition-all group">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#1a202c] flex items-center justify-center text-[#10b981]">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-xs font-mono text-[#10b981]">ANALISIS SELISIH STOK</div>
              <h2 className="text-base font-semibold text-[#f3f4f6]">Pelacakan Mutasi Katalog</h2>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Memeriksa perubahan stok barang secara berkala. Mengetahui produk mana yang aktif dibeli konsumen dan produk mana yang sekadar menghabiskan ruang gudang.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#9ca3af] font-mono flex items-center justify-between">
              <span>Format: Rekap Estimasi Transaksi</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#10b981] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-5 rounded-xl bg-[#141820] border border-white/10 flex flex-col justify-between hover:border-[#10b981]/40 transition-all group">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#1a202c] flex items-center justify-center text-[#8f652e]">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="text-xs font-mono text-[#8f652e]">PIPELINE TERUJI</div>
              <h2 className="text-base font-semibold text-[#f3f4f6]">Otomasi Validasi Berlapis</h2>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Menggunakan sistem pengumpulan terstruktur yang memverifikasi skema data secara otomatis, menyaring duplikasi, dan memastikan integritas data tetap bersih.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#9ca3af] font-mono flex items-center justify-between">
              <span>Format: Basis Data Bersih dan Rapi</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8f652e] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
