"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Radio, 
  TrendingUp, 
  Bot, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  Clock, 
  Database,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Play,
  RotateCcw,
  Sparkles,
  Download,
  Layers
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BeatContent {
  id: number;
  tag: string;
  title: string;
  problem: string;
  solution: string;
  impactMetric: string;
}

const BEATS: BeatContent[] = [
  {
    id: 1,
    tag: "RISIKO INFORMASI",
    title: "Keterlambatan Laporan Publik Membakar Margin Bisnis",
    problem: "Laporan bulanan baru terbit saat dinamika pasar sudah berubah. Stok kompetitor habis atau harga lelang bergeser tanpa disadari.",
    solution: "Sistem sentinel memantau perubahan lapangan secara otomatis tiap hari, memberi peringatan dini sebelum menjadi kabar umum.",
    impactMetric: "Deteksi pergeseran 24-48 jam lebih awal"
  },
  {
    id: 2,
    tag: "TELEMETRI FISIK",
    title: "Sinyal Logistik Maritim Memberi Indikator Riil",
    problem: "Data antrean kapal dan tongkang komoditas sering kali tidak tercermin akurat dalam komunikasi agen pengapalan lokal.",
    solution: "Pelacakan koordinat AIS dan pengelompokan zona spasial menghitung kepadatan labuh armada secara objektif.",
    impactMetric: "Akurasi estimasi waktu sandar hingga 92%"
  },
  {
    id: 3,
    tag: "MUTASI KATALOG",
    title: "Membaca Permintaan Pasar dari Perubahan Stok Etalase",
    problem: "Ketiadaan visibilitas stok kompetitor menyebabkan hilangnya momentum saat pembeli beralih mencari alternatif.",
    solution: "Pencatatan delta stok berkala per 6 jam mendeteksi produk yang ludes terjual dan reseller yang melanggar harga acuan.",
    impactMetric: "Pemantauan 50+ SKU per siklus harian"
  },
  {
    id: 4,
    tag: "VALIDASI OTOMATIS",
    title: "Pipeline Data Terstruktur Tanpa Risiko Skrip Macet",
    problem: "Pengambilan data manual membuang jam kerja tim, sementara scraping biasa rentan rusak saat layout situs target berubah.",
    solution: "Arsitektur penanganan otomatis dengan validasi tipe data ganda, filter duplikasi, dan pencatatan log mandiri.",
    impactMetric: "Zero missing columns & deduplikasi 100%"
  },
  {
    id: 5,
    tag: "HASIL AKSI",
    title: "Penyerahan Siap Pakai Langsung ke Pengambil Keputusan",
    problem: "Tumpukan data mentah tanpa struktur hanya menambah beban analisis dan memperlambat koordinasi direksi.",
    solution: "Format akhir diserahkan dalam spreadsheet bersih, notifikasi harian bot Telegram, atau integrasi endpoint API.",
    impactMetric: "Uji coba sampel 50 baris pertama tanpa biaya"
  }
];

export default function ScrollytellingContainer() {
  const [activeBeat, setActiveBeat] = useState<number>(1);
  const desktopBeatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Interactive local states for simulator
  const [beat1Mode, setBeat1Mode] = useState<"legacy" | "sentinel">("sentinel");
  const [beat2Zone, setBeat2Zone] = useState<"priok" | "berau">("priok");
  const [beat4Running, setBeat4Running] = useState<boolean>(false);
  const [beat4Progress, setBeat4Progress] = useState<number>(100);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // GSAP ScrollTrigger for Desktop Scrollytelling
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Only apply ScrollTrigger on desktop screen width (>= 1024px)
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      desktopBeatRefs.current.forEach((el, index) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveBeat(index + 1),
          onEnterBack: () => setActiveBeat(index + 1),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleStepClick = (stepId: number) => {
    setActiveBeat(stepId);
    
    // On desktop, smoothly scroll to the target beat
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      const targetElement = desktopBeatRefs.current[stepId - 1];
      if (targetElement) {
        const yOffset = -120;
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
    // On mobile, zero scroll jumping occurs because the activeBeat directly swaps the tabbed view!
  };

  const nextBeat = () => {
    if (activeBeat < BEATS.length) {
      handleStepClick(activeBeat + 1);
    }
  };

  const prevBeat = () => {
    if (activeBeat > 1) {
      handleStepClick(activeBeat - 1);
    }
  };

  const runBeat4Pipeline = () => {
    setBeat4Running(true);
    setBeat4Progress(0);
    const interval = setInterval(() => {
      setBeat4Progress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setBeat4Running(false);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  const handleSampleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const currentBeat = BEATS[activeBeat - 1];

  // Reusable Simulator Panel Content
  const renderSimulatorBody = () => (
    <div className="h-[270px] flex flex-col justify-between">
      <AnimatePresence mode="wait">
        
        {/* PHASE 1: RISIKO INFORMASI */}
        {activeBeat === 1 && (
          <motion.div
            key="beat-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#9ca3af]">// Perbandingan Waktu Respons:</span>
              <div className="flex items-center bg-[#0b0d11] p-0.5 rounded-lg border border-white/10 text-[10px] font-mono">
                <button
                  onClick={() => setBeat1Mode("legacy")}
                  className={`px-2 py-0.5 rounded ${beat1Mode === "legacy" ? "bg-[#ef4444] text-white font-bold" : "text-[#9ca3af]"}`}
                >
                  Metode Lama
                </button>
                <button
                  onClick={() => setBeat1Mode("sentinel")}
                  className={`px-2 py-0.5 rounded ${beat1Mode === "sentinel" ? "bg-[#10b981] text-[#0b0d11] font-bold" : "text-[#9ca3af]"}`}
                >
                  Sentinel Baru
                </button>
              </div>
            </div>

            {beat1Mode === "legacy" ? (
              <div className="p-3 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/30 space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-[#ef4444] font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>KONDISI: TERLAMBAT MENGETAHUI PERUBAHAN</span>
                </div>
                <div className="text-[#9ca3af] text-[11px] leading-relaxed">
                  Pesaing kehabisan stok 3 hari lalu. Laporan internal baru masuk minggu depan. Anda kehilangan momen lonjakan penjualan senilai Rp 14.2M.
                </div>
                <div className="pt-1 text-[10px] text-[#ef4444] border-t border-[#ef4444]/20">
                  Risiko: Hilang peluang transaksi & margin tergerus
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30 space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-[#10b981] font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>KONDISI: PERINGATAN ANOMALI 48 JAM LEBIH AWAL</span>
                </div>
                <div className="text-[#9ca3af] text-[11px] leading-relaxed">
                  Bot mengirim alert: 3 produk utama kompetitor habis (stok 0). Tim Anda langsung menaikkan anggaran iklan dan memenangkan pembeli siap transaksi.
                </div>
                <div className="pt-1 text-[10px] text-[#10b981] border-t border-[#10b981]/20">
                  Hasil: Konversi naik seketika tanpa tebakan
                </div>
              </div>
            )}

            <div className="p-2 rounded-lg bg-[#0b0d11] border border-white/5 text-[11px] font-mono text-[#9ca3af] space-y-1">
              <div>&gt; Pelacakan otomatis: 24 jam nonstop</div>
              <div>&gt; Format alert: Pesan ringkas Telegram langsung ke direksi</div>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: TELEMETRI FISIK */}
        {activeBeat === 2 && (
          <motion.div
            key="beat-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#9ca3af]">// Pilih Zona Maritim:</span>
              <div className="flex items-center bg-[#0b0d11] p-0.5 rounded-lg border border-white/10 text-[10px] font-mono">
                <button
                  onClick={() => setBeat2Zone("priok")}
                  className={`px-2 py-0.5 rounded ${beat2Zone === "priok" ? "bg-[#10b981] text-[#0b0d11] font-bold" : "text-[#9ca3af]"}`}
                >
                  Tanjung Priok
                </button>
                <button
                  onClick={() => setBeat2Zone("berau")}
                  className={`px-2 py-0.5 rounded ${beat2Zone === "berau" ? "bg-[#10b981] text-[#0b0d11] font-bold" : "text-[#9ca3af]"}`}
                >
                  Muara Berau
                </button>
              </div>
            </div>

            {beat2Zone === "priok" ? (
              <div className="p-3 rounded-xl bg-[#0b0d11] border border-white/10 font-mono text-xs space-y-1.5">
                <div className="flex justify-between text-[#9ca3af]">
                  <span>WILAYAH PANTAU</span>
                  <span className="text-[#10b981]">Area Labuh Luar Priok</span>
                </div>
                <div className="flex justify-between text-[#9ca3af]">
                  <span>RATA-RATA KAPAL</span>
                  <span>17 - 18 Armada</span>
                </div>
                <div className="flex justify-between text-[#9ca3af]">
                  <span>AKTUAL HARI INI</span>
                  <span className="text-[#ef4444] font-bold">35 Armada (+72%)</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px]">
                  <span>STATUS LOGISTIK</span>
                  <span className="px-2 py-0.5 rounded bg-[#ef4444]/20 text-[#ef4444] font-bold">
                    Kepadatan Tinggi
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-[#0b0d11] border border-white/10 font-mono text-xs space-y-1.5">
                <div className="flex justify-between text-[#9ca3af]">
                  <span>WILAYAH PANTAU</span>
                  <span className="text-[#10b981]">Transshipment STS Muara Berau</span>
                </div>
                <div className="flex justify-between text-[#9ca3af]">
                  <span>TONGKANG TERDETEKSI</span>
                  <span>14 Unit Berlabuh</span>
                </div>
                <div className="flex justify-between text-[#9ca3af]">
                  <span>STATUS ANTRIAN</span>
                  <span className="text-[#10b981] font-bold">Lancar (Normal 12-16)</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px]">
                  <span>ESTIMASI BONGKAR</span>
                  <span className="px-2 py-0.5 rounded bg-[#10b981]/20 text-[#10b981] font-bold">
                    On Schedule
                  </span>
                </div>
              </div>
            )}

            <div className="text-[11px] text-[#9ca3af] font-mono bg-[#141820] p-2 rounded-lg border border-white/5">
              &gt; Nilai Keputusan: Menyesuaikan jadwal tongkang muara sebelum terkena denda waktu tunggu (demurrage).
            </div>
          </motion.div>
        )}

        {/* PHASE 3: MUTASI KATALOG */}
        {activeBeat === 3 && (
          <motion.div
            key="beat-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="text-xs font-mono text-[#9ca3af]">// Hasil Pengecekan Stok Reseller (Siklus 6 Jam):</div>
            
            <div className="p-2.5 rounded-xl bg-[#0b0d11] border border-white/10 text-xs font-mono space-y-1.5">
              <div className="grid grid-cols-12 text-[#9ca3af] text-[10px] pb-1 border-b border-white/10">
                <span className="col-span-5">SKU / PRODUK</span>
                <span className="col-span-3 text-center">MUTASI</span>
                <span className="col-span-4 text-right">STATUS</span>
              </div>
              <div className="grid grid-cols-12 text-[11px] items-center">
                <span className="col-span-5 text-[#f3f4f6] truncate">Serum 30ml Gold</span>
                <span className="col-span-3 text-center text-[#ef4444]">48 &rarr; 0</span>
                <span className="col-span-4 text-right text-[#ef4444] font-bold">Stok Habis</span>
              </div>
              <div className="grid grid-cols-12 text-[11px] items-center">
                <span className="col-span-5 text-[#f3f4f6] truncate">Krim Malam 50g</span>
                <span className="col-span-3 text-center text-[#10b981]">12 &rarr; 8</span>
                <span className="col-span-4 text-right text-[#10b981]">Aktif (4 Terjual)</span>
              </div>
              <div className="grid grid-cols-12 text-[11px] items-center">
                <span className="col-span-5 text-[#f3f4f6] truncate">Pembersih B2B</span>
                <span className="col-span-3 text-center text-[#f59e0b]">Rp 85K</span>
                <span className="col-span-4 text-right text-[#f59e0b]">Pelanggaran Acuan</span>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-[#141820] border border-white/5 text-xs font-mono flex items-center justify-between text-[11px]">
              <span className="text-[#9ca3af]">Aksi Instan:</span>
              <span className="text-[#10b981] font-semibold">Tegakkan MAP / Rebut Pembeli</span>
            </div>
          </motion.div>
        )}

        {/* PHASE 4: VALIDASI OTOMATIS */}
        {activeBeat === 4 && (
          <motion.div
            key="beat-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#9ca3af]">// Mesin Validasi Integritas:</span>
              <button
                onClick={runBeat4Pipeline}
                disabled={beat4Running}
                className="px-2.5 py-1 rounded bg-[#10b981] text-[#0b0d11] font-mono text-[10px] font-bold flex items-center gap-1 hover:bg-[#059669] transition-all"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{beat4Running ? "Memvalidasi..." : "Tes Eksekusi"}</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className={`p-2 rounded-xl bg-[#0b0d11] border ${beat4Progress >= 30 ? "border-[#10b981] text-[#10b981]" : "border-white/10 text-white/40"}`}>
                <div className="font-bold text-[11px]">1. PARSING</div>
                <div className="text-[10px] text-[#9ca3af]">Sumber Publik</div>
              </div>
              <div className={`p-2 rounded-xl bg-[#0b0d11] border ${beat4Progress >= 65 ? "border-[#10b981] text-[#10b981]" : "border-white/10 text-white/40"}`}>
                <div className="font-bold text-[11px]">2. SKEMA</div>
                <div className="text-[10px] text-[#9ca3af]">Cek Tipe Data</div>
              </div>
              <div className={`p-2 rounded-xl bg-[#0b0d11] border ${beat4Progress >= 100 ? "border-[#10b981] text-[#10b981]" : "border-white/10 text-white/40"}`}>
                <div className="font-bold text-[11px]">3. FILTER</div>
                <div className="text-[10px] text-[#9ca3af]">0 Duplikasi</div>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-[#0b0d11] border border-white/5 font-mono text-[11px] text-[#9ca3af] space-y-1">
              <div className="text-[#10b981] font-semibold">STATUS: PIPELINE NORMAL (100% SUKSES)</div>
              <div>&gt; Tahan terhadap perubahan HTML situs target</div>
              <div>&gt; Kepatuhan UU PDP dan etika ekstraksi informasi publik</div>
            </div>
          </motion.div>
        )}

        {/* PHASE 5: HASIL AKSI */}
        {activeBeat === 5 && (
          <motion.div
            key="beat-5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="text-xs font-mono text-[#9ca3af]">// Deliverable Siap Pakai:</div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="p-2 rounded-lg bg-[#0b0d11] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-[#10b981]" />
                  <span className="text-[11px]">Spreadsheet Excel / CSV Terstruktur</span>
                </div>
                <span className="text-[#10b981] text-[10px]">Tersedia</span>
              </div>
              <div className="p-2 rounded-lg bg-[#0b0d11] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span className="text-[11px]">Ringkasan Pagi Bot Telegram</span>
                </div>
                <span className="text-[#10b981] text-[10px]">Harian</span>
              </div>
              <div className="p-2 rounded-lg bg-[#0b0d11] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#8f652e]" />
                  <span className="text-[11px]">Private REST API & Webhook</span>
                </div>
                <span className="text-[#10b981] text-[10px]">Opsional</span>
              </div>
            </div>

            <button
              onClick={handleSampleDownload}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] font-bold text-xs font-mono transition-all shadow-md shadow-[#10b981]/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadSuccess ? "Sampel Berhasil Disiapkan!" : "Minta Sampel Data Target Anda"}</span>
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );

  return (
    <section 
      id="alur"
      ref={containerRef}
      className="relative bg-[#0b0d11] text-[#f3f4f6] py-12 sm:py-20 border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-6 lg:mb-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#10b981] px-3 py-1 rounded-full bg-[#141820] border border-[#10b981]/20">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>METODOLOGI & ALUR KERJA SENTINEL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#f3f4f6] tracking-tight">
            Transparansi Alur Pengolahan Data Lapangan
          </h2>
          <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
            Dari penangkapan sinyal fisik hingga verifikasi integritas berstandar industri. Pilih tahapan untuk melihat simulasi respon sistem secara langsung.
          </p>

          {/* Stepper Tabs Bar (Universal, Smooth Interaction) */}
          <div className="pt-2">
            {/* Progress line */}
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-3">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#10b981] to-[#34d399]" 
                animate={{ width: `${(activeBeat / BEATS.length) * 100}%` }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {BEATS.map((beat) => {
                const isSelected = activeBeat === beat.id;
                return (
                  <button
                    key={beat.id}
                    onClick={() => handleStepClick(beat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap border shrink-0 ${
                      isSelected
                        ? "bg-[#10b981] text-[#0b0d11] border-[#10b981] font-bold shadow-md shadow-[#10b981]/20 scale-105"
                        : "bg-[#141820] text-[#9ca3af] border-white/10 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span className="font-semibold">0{beat.id}</span>
                    <span className="inline">{beat.tag}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MOBILE VIEW (< 1024px): ZERO-JUMP TABBED STEPPER DECK           */}
        {/* ============================================================== */}
        <div className="block lg:hidden space-y-4">
          
          {/* Mobile Interactive Deck Container */}
          <div className="rounded-2xl bg-[#141820] border border-[#10b981]/30 p-4 shadow-xl relative overflow-hidden backdrop-blur-md">
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10 text-xs font-mono text-[#9ca3af]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span className="ml-2 text-white/80 text-[11px]">Simulasi Fase 0{activeBeat}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#10b981] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span>0{activeBeat}/05</span>
              </div>
            </div>

            {/* Stable Simulator Body */}
            {renderSimulatorBody()}

          </div>

          {/* Mobile Narrative Step Card (Directly below simulator, Zero Jumping) */}
          <div className="p-4 rounded-xl bg-[#141820] border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#10b981] font-bold">
                0{currentBeat.id} // {currentBeat.tag}
              </span>
              <span className="text-[#9ca3af] text-[11px]">
                Tahap {currentBeat.id} dari 5
              </span>
            </div>

            <h3 className="text-base font-semibold text-[#f3f4f6] leading-snug">
              {currentBeat.title}
            </h3>

            <p className="text-xs text-[#9ca3af] leading-relaxed">
              {currentBeat.problem}
            </p>

            <div className="p-3 rounded-lg bg-[#0b0d11] border-l-2 border-[#10b981] text-xs text-[#f3f4f6]">
              <span className="font-semibold text-[#10b981]">Solusi: </span>
              <span>{currentBeat.solution}</span>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#10b981]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                <span>Dampak: {currentBeat.impactMetric}</span>
              </div>
            </div>

            {/* Mobile Step Switcher Buttons */}
            <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/10 text-xs font-mono">
              <button
                onClick={prevBeat}
                disabled={activeBeat === 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0b0d11] text-[#9ca3af] disabled:opacity-30 border border-white/10"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>

              <span className="text-white/50 text-[11px]">Langkah {activeBeat} / 5</span>

              <button
                onClick={nextBeat}
                disabled={activeBeat === BEATS.length}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#10b981] text-[#0b0d11] font-bold disabled:opacity-30"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* DESKTOP VIEW (>= 1024px): 2-COLUMN SMOOTH SCROLLYTELLING       */}
        {/* ============================================================== */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start relative">
          
          {/* Left Column: STICKY DESKTOP SIMULATOR */}
          <div className="lg:col-span-6 sticky top-24 z-20 self-start">
            <div className="rounded-2xl bg-[#141820] border border-[#10b981]/30 p-5 shadow-2xl relative overflow-hidden backdrop-blur-md">
              
              {/* Terminal Window Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono text-[#9ca3af]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                  <span className="ml-2 text-white/80 text-[11px]">Simulasi Telemetri Aktif</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="text-[#10b981] font-bold">Fase 0{activeBeat}/05</span>
                </div>
              </div>

              {/* Dynamic Animated Body */}
              {renderSimulatorBody()}

              {/* Bottom Card Guarantee Readout */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#9ca3af]">
                <span>Integritas Terverifikasi</span>
                <span className="text-[#10b981]">PRADIKTIF DATA LAB</span>
              </div>
            </div>
          </div>

          {/* Right Column: CRISP NARRATIVE BEATS */}
          <div className="lg:col-span-6 space-y-8 py-2">
            {BEATS.map((beat, index) => {
              const isActive = activeBeat === beat.id;
              return (
                <div
                  key={beat.id}
                  ref={(el) => { desktopBeatRefs.current[index] = el; }}
                  onClick={() => handleStepClick(beat.id)}
                  className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? "bg-[#141820] border-[#10b981]/60 shadow-xl shadow-[#10b981]/10 scale-[1.02] ring-1 ring-[#10b981]/40" 
                      : "bg-[#0b0d11]/70 border-white/5 opacity-50 hover:opacity-80"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#10b981] font-bold">
                        0{beat.id} // {beat.tag}
                      </span>
                      <span className="text-[#9ca3af] text-[11px]">
                        Langkah {beat.id} dari 5
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-[#f3f4f6] leading-snug">
                      {beat.title}
                    </h3>

                    <p className="text-sm text-[#9ca3af] leading-relaxed">
                      {beat.problem}
                    </p>

                    <div className="p-3.5 rounded-lg bg-[#0b0d11] border-l-2 border-[#10b981] text-xs text-[#f3f4f6]">
                      <span className="font-semibold text-[#10b981]">Solusi: </span>
                      <span>{beat.solution}</span>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#10b981]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                        <span>Dampak: {beat.impactMetric}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "rotate-90 text-[#10b981]" : "text-white/30"}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
