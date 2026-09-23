"use client";

import React, { useState } from "react";
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
  CheckCircle2,
  Sparkles,
  Zap
} from "lucide-react";

interface RadarNode {
  id: string;
  label: string;
  feedType: string;
  zone: string;
  metric: string;
  status: "Normal" | "Anomali" | "Peluang";
  color: string;
  x: number;
  y: number;
  actionImpact: string;
}

const RADAR_NODES: RadarNode[] = [
  { 
    id: "priok", 
    label: "Tanjung Priok", 
    feedType: "Telemetri Maritim AIS",
    zone: "Area Labuh Luar Priok", 
    metric: "35 Kapal (+72% Kepadatan)", 
    status: "Anomali", 
    color: "#ef4444", 
    x: 70, 
    y: 30,
    actionImpact: "Sesuaikan jadwal sandar armada sebelum terkena denda demurrage."
  },
  { 
    id: "berau", 
    label: "Muara Berau", 
    feedType: "Transshipment Batubara STS",
    zone: "Titik Labuh Muara Berau", 
    metric: "14 Tongkang STS Beroperasi", 
    status: "Normal", 
    color: "#10b981", 
    x: 28, 
    y: 42,
    actionImpact: "Arus pemuatan komoditas lancar, kapasitas throughput optimal."
  },
  { 
    id: "sku", 
    label: "Katalog Ritel & Reseller", 
    feedType: "Delta Mutasi E-Commerce",
    zone: "Top 50 Reseller Nasional", 
    metric: "3 SKU Habis • Stok Kompetitor 0", 
    status: "Peluang", 
    color: "#10b981", 
    x: 76, 
    y: 68,
    actionImpact: "Naikkan alokasi kampanye untuk menangkap pembeli yang siap beralih."
  },
  { 
    id: "lpse", 
    label: "LPSE Pengadaan Publik", 
    feedType: "Pemantauan Tender Otomatis",
    zone: "Paket Lelang Konstruksi", 
    metric: "3 Pemenang Tunggal Teridentifikasi", 
    status: "Peluang", 
    color: "#f59e0b", 
    x: 48, 
    y: 72,
    actionImpact: "Lacak penetapan tender 24 jam sebelum publikasi umum."
  },
];

export default function TelemetryRadarHero() {
  const [selectedNode, setSelectedNode] = useState<RadarNode>(RADAR_NODES[0]);

  return (
    <section 
      id="cockpit"
      className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-white/10 bg-[#0b0d11] text-[#f3f4f6]"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#10b981]/15 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Operational Status Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-white/10 text-xs font-mono">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141820] text-[#10b981] border border-[#10b981]/30">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-bold tracking-wider">COMMAND COCKPIT • PRADIKTIF DATA LAB</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#9ca3af]">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#10b981]" />
              <span className="text-white">Latensi: 18ms</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="text-[#10b981]">Siklus Pantau: Tiap 6 Jam</span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-white/70">PT Prisma Digital Kreatif</span>
          </div>
        </div>

        {/* Command Cockpit: Side-by-side above the fold */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Direct Value Proposition */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#10b981]">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>INTELIJEN TELEMETRI PASAR & DATA LAPANGAN</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#f3f4f6] leading-[1.12]">
              Deteksi Perubahan Lapangan Sebelum Menjadi Berita Publik.
            </h1>

            <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed max-w-xl">
              Memantau pergerakan armada maritim fisik, mutasi katalog stok kompetitor, dan lelang pengadaan publik secara otomatis. Menghadirkan sinyal akurat untuk kalkulasi biaya dan keputusan strategis bisnis Anda.
            </p>

            {/* Quick Interactive Feed Pills */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-mono text-[#9ca3af]">Uji sinyal telemetri aktif di bawah:</div>
              <div className="flex flex-wrap gap-2">
                {RADAR_NODES.map((node) => {
                  const isActive = selectedNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 border ${
                        isActive
                          ? "bg-[#10b981] text-[#0b0d11] font-bold border-[#10b981] shadow-md shadow-[#10b981]/20 scale-105"
                          : "bg-[#141820] text-[#9ca3af] border-white/10 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <span 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: isActive ? "#0b0d11" : node.color }}
                      />
                      <span>{node.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#terminal"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-[#10b981]/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Terminal className="w-4 h-4 text-[#0b0d11]" />
                <span>Buka Terminal Simulasi</span>
              </a>

              <a
                href="#alur"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#141820] hover:bg-[#1a202c] text-[#f3f4f6] font-medium text-xs sm:text-sm border border-white/10 hover:border-white/20 transition-all"
              >
                <Layers className="w-4 h-4 text-[#10b981]" />
                <span>Lihat Alur Kerja</span>
              </a>

              <a
                href="https://wa.me/6285864149673?text=Halo%20Zadit%2C%20saya%20tertarik%20melihat%20sampel%20telemetri%20data%20PRADIKTIF%20untuk%20kebutuhan%20bisnis%20kami."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#141820] hover:bg-[#1a202c] text-[#10b981] font-medium text-xs sm:text-sm border border-[#10b981]/30 hover:border-[#10b981] transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Minta Sampel Data</span>
              </a>
            </div>

            {/* Verified Business Credential Strip */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-mono text-[#9ca3af]">
              <div className="flex items-center gap-1.5 text-[#f3f4f6]">
                <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                <span>PT Prisma Digital Kreatif (NIB 1801250039976)</span>
              </div>
              <span className="text-white/20 hidden sm:inline">•</span>
              <div>PSE Kominfo Terdaftar</div>
              <span className="text-white/20 hidden sm:inline">•</span>
              <div className="text-[#10b981]">Data Publik Resmi & Terverifikasi</div>
            </div>
          </div>

          {/* Right Column: INTERACTIVE COMMAND RADAR & TELEMETRY DISPLAY */}
          <div className="lg:col-span-5">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#141820] border border-[#10b981]/25 shadow-2xl relative overflow-hidden backdrop-blur-md">
              
              {/* Radar Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-[#10b981] animate-pulse" />
                  <span className="text-white font-medium">RADAR TELEMETRI SENTINEL</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#10b981]">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Radar Graphic Canvas Simulation */}
              <div className="relative w-full aspect-square max-h-[250px] mx-auto rounded-xl bg-[#0b0d11] border border-white/5 flex items-center justify-center overflow-hidden">
                {/* Concentric Radar Rings */}
                <div className="absolute w-[86%] h-[86%] rounded-full border border-white/5" />
                <div className="absolute w-[62%] h-[62%] rounded-full border border-white/10" />
                <div className="absolute w-[36%] h-[36%] rounded-full border border-[#10b981]/20" />
                <div className="absolute w-full h-[1px] bg-white/5" />
                <div className="absolute h-full w-[1px] bg-white/5" />

                {/* Rotating Sweep Beam */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute w-full h-full origin-center pointer-events-none"
                  style={{
                    background: "conic-gradient(from 0deg, rgba(16, 185, 129, 0.28) 0deg, transparent 55deg, transparent 360deg)"
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
                  className="mt-3 p-3 rounded-xl bg-[#0b0d11] border border-white/10 font-mono text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-[#9ca3af]">{selectedNode.feedType}</div>
                      <span className="text-[#f3f4f6] font-bold text-sm">{selectedNode.label}</span>
                    </div>
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

                  <div className="text-[11px] flex justify-between border-t border-white/5 pt-1.5 text-[#9ca3af]">
                    <span>Zona: {selectedNode.zone}</span>
                    <span className="text-[#10b981] font-semibold">{selectedNode.metric}</span>
                  </div>

                  <div className="text-[10px] text-[#9ca3af] bg-[#141820] p-2 rounded-lg border border-white/5">
                    <span className="text-[#10b981] font-semibold">Dampak Bisnis: </span>
                    <span>{selectedNode.actionImpact}</span>
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
                Mengelompokkan titik koordinat geografis menjadi zona terstruktur. Mempercepat perhitungan jarak antrean armada dan kepadatan titik labuh fisik.
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
                Memeriksa perubahan stok barang kompetitor tiap 6 jam. Mengetahui produk mana yang ludes terjual dan produk mana yang pasif menghabiskan ruang gudang.
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
                Sistem pengumpulan data terstruktur yang memverifikasi skema secara otomatis, menyaring duplikasi, dan menjaga integritas data tetap bersih.
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
