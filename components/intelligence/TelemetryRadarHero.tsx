"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Terminal, 
  Download, 
  ArrowUpRight, 
  Activity, 
  Layers, 
  Ship, 
  Store, 
  FileSpreadsheet, 
  CheckCircle2,
  TrendingUp,
  Building2,
  AlertTriangle,
  ArrowRight,
  Compass,
  Clock,
  Sparkles
} from "lucide-react";
import { triggerLeadModal } from "./LeadIntakeModal";

interface SentinelFeed {
  id: string;
  sector: string;
  title: string;
  zone: string;
  kpiNumber: string;
  kpiLabel: string;
  status: "Waspada" | "Stabil" | "Peluang Komersial";
  statusColor: string;
  statusBg: string;
  financialImpact: string;
  recommendedAction: string;
  coordinates: { x: number; y: number };
  dataSource: string;
}

const SENTINEL_FEEDS: SentinelFeed[] = [
  { 
    id: "priok", 
    sector: "Logistik Maritim",
    title: "Tanjung Priok • Area Labuh Luar", 
    zone: "Zona Labuh Luar Jakarta (~400m heksagonal)", 
    kpiNumber: "35 Kapal", 
    kpiLabel: "+72% di atas kapasitas rata-rata",
    status: "Waspada", 
    statusColor: "#ef4444", 
    statusBg: "bg-red-500/10 text-red-400 border-red-500/30",
    financialImpact: "Potensi denda demurrage Rp 45-80 Juta per hari per armada jika waktu sandar molor.",
    recommendedAction: "Penyesuaian jadwal sandar tongkang ke slot labuh alternatif sebelum antrean mengunci.",
    coordinates: { x: 72, y: 32 },
    dataSource: "Telemetri Spasial Maritim Terbuka"
  },
  { 
    id: "berau", 
    sector: "Komoditas Tambang",
    title: "Muara Berau • Transshipment STS", 
    zone: "Titik Labuh Muara Berau, Kalimantan Timur", 
    kpiNumber: "14 Tongkang", 
    kpiLabel: "Throughput normal (8.400 Ton/hari)",
    status: "Stabil", 
    statusColor: "#10b981", 
    statusBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    financialImpact: "Arus transfer komoditas ke kapal induk lancar, estimasi keberangkatan tepat jadwal.",
    recommendedAction: "Pertahankan alur suplai batubara harian tanpa perlu biaya kontingensi tambahan.",
    coordinates: { x: 26, y: 44 },
    dataSource: "Sensor Spasial & Validasi Satelit"
  },
  { 
    id: "sku", 
    sector: "Ritel E-Commerce",
    title: "Katalog Kompetitor & Reseller", 
    zone: "Pemantauan 50 Distributor Utama", 
    kpiNumber: "3 SKU Habis", 
    kpiLabel: "Stok kompetitor 0 (Total Rp 14.2M)",
    status: "Peluang Komersial", 
    statusColor: "#10b981", 
    statusBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    financialImpact: "Konsumen aktif mencari alternatif; peluang merebut transaksi dari kompetitor yang kehabisan barang.",
    recommendedAction: "Naikkan alokasi kampanye dan pasang stok produk substitusi di etalase terdepan.",
    coordinates: { x: 78, y: 68 },
    dataSource: "Pencatatan Delta Stok Berkala Tiap 6 Jam"
  },
  { 
    id: "lpse", 
    sector: "Pengadaan Pemerintah",
    title: "LPSE & Lelang Tender Nasional", 
    zone: "Agregasi 34 Wilayah Pengadaan Publik", 
    kpiNumber: "3 Tender", 
    kpiLabel: "Pemenang tunggal dengan rasio 98.4%",
    status: "Peluang Komersial", 
    statusColor: "#f59e0b", 
    statusBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    financialImpact: "Deteksi paket tender bernilai miliaran rupiah sebelum masa pengumuman penetapan ditutup.",
    recommendedAction: "Evaluasi persyaratan kualifikasi teknis dan siapkan dokumen sanggah jika terindikasi diskriminatif.",
    coordinates: { x: 50, y: 72 },
    dataSource: "Pemantauan Portal Pengadaan LKPP Terbuka"
  },
];

export default function TelemetryRadarHero() {
  const [selectedFeed, setSelectedFeed] = useState<SentinelFeed>(SENTINEL_FEEDS[0]);

  return (
    <section 
      id="cockpit"
      className="relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-24 border-b border-white/10 bg-[#0b0d11] text-[#f3f4f6]"
    >
      {/* Background Subtle Executive Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[420px] bg-gradient-to-b from-[#10b981]/12 via-emerald-950/5 to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Executive Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-3.5 border-b border-white/10 text-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141820] text-[#10b981] border border-[#10b981]/30 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span>PRADIKTIF DATA LAB • INTELIJEN PASAR DAN KEPUTUSAN BISNIS</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#9ca3af]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#10b981]" />
              <span className="text-[#f3f4f6]">Pembaruan: Tiap 6 Jam</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="text-[#10b981]">Status Sinyal: Aktif Terverifikasi</span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-white/70">PT Prisma Digital Kreatif</span>
          </div>
        </div>

        {/* Hero Headline & Value Narrative */}
        <div className="max-w-3xl mb-8 space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-semibold tracking-tight text-[#f3f4f6] leading-[1.12]">
            Ketahui Perubahan Pasar Sebelum Tercatat di Laporan Publik.
          </h1>
          <p className="text-base sm:text-lg text-[#9ca3af] leading-relaxed">
            Kami mengolah data pergerakan maritim fisik, mutasi stok etalase pesaing, dan tender pengadaan publik menjadi sinyal keputusan terstruktur. Memberi Anda keunggulan negosiasi dan kalkulasi biaya riil tanpa mengandalkan tebakan.
          </p>
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE EXECUTIVE COCKPIT (Fully in-place & instant feedback) */}
        {/* ============================================================== */}
        <div className="rounded-2xl bg-[#141820] border border-[#10b981]/25 p-4 sm:p-7 shadow-2xl backdrop-blur-md space-y-6">
          
          {/* Cockpit Top Bar & Tab Buttons */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-[#9ca3af] font-medium">
                Pilih sektor pantau untuk melihat ringkasan sinyal dan estimasi dampak bisnis:
              </span>
              <span className="text-[#10b981] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                Live Sentinel Active
              </span>
            </div>

            {/* Selector Tabs (Smooth tactile pill selection) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SENTINEL_FEEDS.map((feed) => {
                const isSelected = selectedFeed.id === feed.id;
                return (
                  <button
                    key={feed.id}
                    onClick={() => setSelectedFeed(feed)}
                    className={`relative p-3 rounded-xl text-left transition-all border ${
                      isSelected
                        ? "bg-[#1a222e] border-[#10b981] shadow-lg shadow-[#10b981]/15 text-[#f3f4f6]"
                        : "bg-[#0b0d11]/70 border-white/5 text-[#9ca3af] hover:border-white/20 hover:text-[#f3f4f6]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#10b981]">
                        {feed.sector}
                      </span>
                      <span 
                        className="w-2 h-2 rounded-full shrink-0" 
                        style={{ backgroundColor: feed.statusColor }}
                      />
                    </div>
                    <div className="text-xs sm:text-sm font-semibold truncate text-[#f3f4f6]">
                      {feed.id === "priok" ? "Tanjung Priok" : feed.id === "berau" ? "Muara Berau" : feed.id === "sku" ? "Mutasi Ritel" : "Tender LPSE"}
                    </div>
                    <div className="text-[11px] text-[#9ca3af] truncate mt-0.5">
                      {feed.kpiNumber}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Executive Cockpit Body (Directly visible in-place on Mobile & Desktop) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFeed.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 items-center"
            >
              
              {/* Left Column: Executive Map & Activity Canvas */}
              <div className="lg:col-span-5 bg-[#0b0d11] border border-white/10 rounded-xl p-4 relative overflow-hidden flex flex-col justify-between min-h-[260px]">
                
                {/* Visual Map Grid Pattern */}
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Visual Radar Rings & Coordinate Anchor */}
                <div className="relative w-full h-[180px] flex items-center justify-center">
                  <div className="absolute w-44 h-44 rounded-full border border-white/5" />
                  <div className="absolute w-32 h-32 rounded-full border border-white/10" />
                  <div className="absolute w-20 h-20 rounded-full border border-[#10b981]/20" />
                  
                  {/* Subtle rotating pulse beam */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    className="absolute w-44 h-44 origin-center pointer-events-none"
                    style={{
                      background: "conic-gradient(from 0deg, rgba(16, 185, 129, 0.2) 0deg, transparent 50deg, transparent 360deg)"
                    }}
                  />

                  {/* Dynamic Active Location Node */}
                  <motion.div
                    initial={{ scale: 0.7 }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 flex flex-col items-center"
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center shadow-xl border-2"
                      style={{ 
                        backgroundColor: "#141820", 
                        borderColor: selectedFeed.statusColor,
                        boxShadow: `0 0 20px ${selectedFeed.statusColor}40`
                      }}
                    >
                      {selectedFeed.id === "priok" && <Ship className="w-5 h-5 text-red-400" />}
                      {selectedFeed.id === "berau" && <Activity className="w-5 h-5 text-emerald-400" />}
                      {selectedFeed.id === "sku" && <Store className="w-5 h-5 text-emerald-400" />}
                      {selectedFeed.id === "lpse" && <Building2 className="w-5 h-5 text-amber-400" />}
                    </div>
                    <span className="mt-2 text-xs font-semibold text-[#f3f4f6] bg-[#141820]/90 px-2.5 py-0.5 rounded-full border border-white/10 shadow">
                      {selectedFeed.title.split("•")[0]}
                    </span>
                  </motion.div>
                </div>

                {/* Map Bottom Metadata */}
                <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#9ca3af]">
                  <span>Sumber: {selectedFeed.dataSource}</span>
                  <span className="text-[#10b981] font-medium">Terverifikasi</span>
                </div>
              </div>

              {/* Right Column: Executive Decision Matrix & Financial Impact */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Title and Status Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-xs text-[#9ca3af]">Lokasi & Wilayah Pantau:</div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[#f3f4f6]">
                      {selectedFeed.title}
                    </h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${selectedFeed.statusBg}`}>
                    Status: {selectedFeed.status}
                  </span>
                </div>

                {/* Key Metric Big Number Strip */}
                <div className="p-3.5 rounded-xl bg-[#0b0d11] border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#9ca3af]">Indikator Utama Saat Ini:</div>
                    <div className="text-xl sm:text-2xl font-bold text-[#f3f4f6] tracking-tight">
                      {selectedFeed.kpiNumber}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#9ca3af]">Keterangan:</div>
                    <div className="text-xs sm:text-sm font-medium text-[#10b981]">
                      {selectedFeed.kpiLabel}
                    </div>
                  </div>
                </div>

                {/* Financial & Operational Takeaway Card */}
                <div className="p-3.5 rounded-xl bg-[#1a222e] border border-white/5 space-y-2">
                  <div className="text-xs font-semibold text-[#f3f4f6] flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#10b981]" />
                    <span>Estimasi Dampak Operasional & Finansial:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                    {selectedFeed.financialImpact}
                  </p>
                </div>

                {/* Recommended Business Action */}
                <div className="p-3.5 rounded-xl bg-[#0b0d11] border-l-2 border-[#10b981] space-y-1">
                  <div className="text-xs font-semibold text-[#10b981]">
                    Rekomendasi Langkah Bisnis:
                  </div>
                  <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                    {selectedFeed.recommendedAction}
                  </p>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

          {/* Action CTAs Strip */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#terminal"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] font-semibold text-xs sm:text-sm transition-all shadow-md shadow-[#10b981]/20"
              >
                <span>Buka Dasbor Simulasi</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#alur"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0b0d11] hover:bg-[#1a202c] text-[#f3f4f6] font-medium text-xs sm:text-sm border border-white/10 transition-all"
              >
                <Layers className="w-4 h-4 text-[#10b981]" />
                <span>Alur Pengolahan Data</span>
              </a>
            </div>

            <button
              onClick={() => triggerLeadModal({ 
                sector: selectedFeed.sector, 
                plan: "Pratinjau Sampel 50 Baris (" + selectedFeed.sector + ")" 
              })}
              className="inline-flex items-center gap-2 text-xs font-medium text-[#10b981] hover:text-[#34d399] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Minta Sampel Data Sektor Ini (Gratis 50 Baris)</span>
            </button>
          </div>

        </div>

        {/* Verified Business Credential Strip */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#9ca3af]">
          <div className="flex items-center gap-1.5 text-[#f3f4f6]">
            <ShieldCheck className="w-4 h-4 text-[#10b981]" />
            <span className="font-medium">PT Prisma Digital Kreatif (NIB 1801250039976)</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div>Tanda Daftar PSE Kominfo Resmi</div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div>Faktur & Invoice Resmi PT</div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="text-[#10b981]">Kepatuhan UU Perlindungan Data Pribadi</div>
        </div>

        {/* 4 Core Value Pillars (Executive Bento Grid) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-xl bg-[#141820] border border-white/10 flex flex-col justify-between hover:border-[#10b981]/40 transition-all group">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#1a202c] flex items-center justify-center text-[#10b981]">
                <Compass className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold text-[#10b981] tracking-wider uppercase">Wilayah Geospasial</div>
              <h2 className="text-base font-semibold text-[#f3f4f6]">Kuantisasi Spasial Terstruktur</h2>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Mengelompokkan pergerakan fisik menjadi zona heksagonal terukur. Mempercepat perhitungan kepadatan labuh dan menjaga kerahasiaan lokasi aset Anda.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#9ca3af] flex items-center justify-between">
              <span>Format: Berkas Spasial Analitik</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#10b981] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#141820] border border-white/10 flex flex-col justify-between hover:border-[#10b981]/40 transition-all group">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#1a202c] flex items-center justify-center text-[#f59e0b]">
                <Activity className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold text-[#f59e0b] tracking-wider uppercase">Deteksi Lonjakan</div>
              <h2 className="text-base font-semibold text-[#f3f4f6]">Peringatan Dini Anomali</h2>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Membedakan fluktuasi wajar dengan anomali luar biasa. Anda mendapatkan peringatan instan saat terjadi lonjakan antrean kapal atau perubahan drastis.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#9ca3af] flex items-center justify-between">
              <span>Format: Notifikasi Cepat Telegram</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#f59e0b] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#141820] border border-white/10 flex flex-col justify-between hover:border-[#10b981]/40 transition-all group">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#1a202c] flex items-center justify-center text-[#10b981]">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold text-[#10b981] tracking-wider uppercase">Analisis Pasar Ritel</div>
              <h2 className="text-base font-semibold text-[#f3f4f6]">Pelacakan Mutasi Stok Berkala</h2>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Memeriksa perubahan stok barang kompetitor tiap 6 jam. Mengetahui produk mana yang ludes terjual dan reseller mana yang melanggar harga resmi (MAP).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#9ca3af] flex items-center justify-between">
              <span>Format: Rekap Nilai Transaksi</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#10b981] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#141820] border border-white/10 flex flex-col justify-between hover:border-[#10b981]/40 transition-all group">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#1a202c] flex items-center justify-center text-[#8f652e]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold text-[#8f652e] tracking-wider uppercase">Integritas Data</div>
              <h2 className="text-base font-semibold text-[#f3f4f6]">Validasi Skema & Audit Berlapis</h2>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Pipeline data terstruktur yang memvalidasi tipe data secara otomatis, menyaring duplikasi, dan memastikan berkas akhir siap pakai tanpa kesalahan kolom.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#9ca3af] flex items-center justify-between">
              <span>Format: Basis Data Excel / CSV Bersih</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8f652e] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
