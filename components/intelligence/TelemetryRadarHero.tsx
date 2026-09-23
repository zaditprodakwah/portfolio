"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Terminal, 
  Download, 
  ArrowUpRight, 
  Activity, 
  Cpu, 
  Compass, 
  Layers,
  Radio,
  Ship,
  Store,
  FileSpreadsheet,
  CheckCircle2
} from "lucide-react";

interface RadarNode {
  id: string;
  label: string;
  zone: string;
  metric: string;
  status: "Normal" | "Anomali" | "Peluang";
  color: string;
  x: number;
  y: number;
}

const RADAR_NODES: RadarNode[] = [
  { id: "priok", label: "Tanjung Priok", zone: "Area Labuh Luar", metric: "35 Kapal (+72% Kepadatan)", status: "Anomali", color: "#ef4444", x: 68, y: 32 },
  { id: "berau", label: "Muara Berau", zone: "Tongkang Batubara", metric: "14 Armada STS Aktif", status: "Normal", color: "#10b981", x: 28, y: 45 },
  { id: "lpse", label: "LPSE Nasional", zone: "Tender Konstruksi", metric: "3 Pemenang Tunggal", status: "Peluang", color: "#f59e0b", x: 52, y: 70 },
  { id: "sku", label: "Katalog Ritel", zone: "Top 50 Reseller", metric: "3 SKU Utama Habis (Rp 14.2M)", status: "Peluang", color: "#10b981", x: 78, y: 65 },
];

export default function TelemetryRadarHero() {
  const [selectedNode, setSelectedNode] = useState<RadarNode>(RADAR_NODES[0]);

  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:py-20 border-b border-white/10 bg-[#0b0d11] text-[#f3f4f6]">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#10b981]/10 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Navigation Breadcrumb / Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-[#141820] text-[#10b981] border border-[#10b981]/30">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span>PRADIKTIF DATA LAB • INTELIJEN PASAR DAN TELEMETRI BISNIS</span>
          </div>

          <div className="text-xs font-mono text-[#9ca3af] hidden sm:flex items-center gap-2">
            <span>34 Titik Pantau LPSE</span>
            <span className="text-white/20">|</span>
            <span>12 Zona Maritim</span>
            <span className="text-white/20">|</span>
            <span className="text-[#10b981]">Kepatuhan UU PDP</span>
          </div>
        </div>

        {/* 2-Column Hero: Headline on Left, Interactive Telemetry Radar on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Value Prop & Direct CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#f3f4f6] leading-[1.15]">
              Deteksi Perubahan Lapangan Sebelum Menjadi Berita Publik.
            </h1>

            <p className="text-base sm:text-lg text-[#9ca3af] leading-relaxed">
              Kami memantau pergerakan maritim fisik, ketersediaan katalog kompetitor, dan penetapan lelang tender secara otomatis. Memberi Anda keunggulan negosiasi dan kalkulasi biaya riil.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#terminal-proof"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-[#10b981]/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Terminal className="w-4 h-4 text-[#0b0d11]" />
                <span>Simulasi Data Lapangan</span>
              </a>

              <a
                href="#two-stage-guarantee"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#141820] hover:bg-[#1a202c] text-[#f3f4f6] font-medium text-xs sm:text-sm border border-white/10 hover:border-white/20 transition-all"
              >
                <Download className="w-4 h-4 text-[#10b981]" />
                <span>Uji Sampel 50 Baris Gratis</span>
              </a>
            </div>

            {/* Verified Trust Strip */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-[#9ca3af]">
              <div className="flex items-center gap-1.5 text-[#f3f4f6]">
                <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                <span>PT Prisma Digital Kreatif (NIB 1801250039976)</span>
              </div>
              <span className="text-white/20 hidden sm:inline">•</span>
              <div>Rekening Mandiri Giro Resmi</div>
              <span className="text-white/20 hidden sm:inline">•</span>
              <div className="text-[#10b981]">Data Publik Terbuka</div>
            </div>
          </div>

          {/* Right Column: INTERACTIVE RADAR WIDGET */}
          <div className="lg:col-span-5">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#141820] border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono text-[#9ca3af]">
                <div className="flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-[#10b981] animate-pulse" />
                  <span className="text-white font-medium">SENTINEL RADAR TERPADU</span>
                </div>
                <span className="text-[11px] text-[#10b981]">LIVE MONITOR</span>
              </div>

              {/* Radar Graphic Canvas Simulation */}
              <div className="relative w-full aspect-square max-h-[260px] mx-auto rounded-xl bg-[#0b0d11] border border-white/5 flex items-center justify-center overflow-hidden">
                {/* Concentric Radar Rings */}
                <div className="absolute w-[85%] h-[85%] rounded-full border border-white/5" />
                <div className="absolute w-[60%] h-[60%] rounded-full border border-white/10" />
                <div className="absolute w-[35%] h-[35%] rounded-full border border-[#10b981]/20" />
                <div className="absolute w-full h-[1px] bg-white/5" />
                <div className="absolute h-full w-[1px] bg-white/5" />

                {/* Rotating Sweep Beam */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute w-full h-full origin-center pointer-events-none"
                  style={{
                    background: "conic-gradient(from 0deg, rgba(16, 185, 129, 0.25) 0deg, transparent 60deg, transparent 360deg)"
                  }}
                />

                {/* Interactive Target Nodes on Radar */}
                {RADAR_NODES.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  return (
                    <motion.button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      whileHover={{ scale: 1.25 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ top: `${node.y}%`, left: `${node.x}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all z-20 ${
                        isSelected 
                          ? "ring-4 ring-[#10b981]/30 bg-[#10b981] shadow-lg shadow-[#10b981]/50" 
                          : "bg-[#1a202c] border border-white/30 hover:border-white"
                      }`}
                      title={node.label}
                    >
                      <span 
                        className="block w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: isSelected ? "#0b0d11" : node.color }} 
                      />
                    </motion.button>
                  );
                })}
              </div>

              {/* Node Detail Readout Box */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 p-3 rounded-xl bg-[#0b0d11] border border-white/10 font-mono text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#f3f4f6] font-bold">{selectedNode.label}</span>
                    <span 
                      className="px-2 py-0.5 rounded text-[10px] font-semibold"
                      style={{ 
                        backgroundColor: `${selectedNode.color}20`, 
                        color: selectedNode.color,
                        border: `1px solid ${selectedNode.color}40`
                      }}
                    >
                      {selectedNode.status}
                    </span>
                  </div>
                  <div className="text-[#9ca3af] text-[11px] flex justify-between">
                    <span>Zona: {selectedNode.zone}</span>
                    <span className="text-white font-medium">{selectedNode.metric}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* 4 Core Pillars Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
