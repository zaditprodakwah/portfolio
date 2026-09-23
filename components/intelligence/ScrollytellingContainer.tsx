"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Clock, 
  Database,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Play,
  Download,
  ShieldCheck,
  TrendingUp,
  FileSpreadsheet,
  Cpu,
  Ship,
  Store,
  Building2,
  Sparkles
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WorkflowStep {
  id: number;
  stageName: string;
  badge: string;
  title: string;
  businessProblem: string;
  sentinelSolution: string;
  measurableOutcome: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    stageName: "Peringatan Dini",
    badge: "FASE 01",
    title: "Keterlambatan Laporan Berkala Mengikis Margin Bisnis",
    businessProblem: "Laporan bulanan internal baru terbit saat dinamika pasar sudah bergeser. Stok pesaing habis atau harga lelang tender berubah tanpa sempat diantisipasi.",
    sentinelSolution: "Sistem sentinel memantau perubahan lapangan otomatis setiap hari, mengirimkan notifikasi ringkas 24 hingga 48 jam sebelum menjadi kabar umum.",
    measurableOutcome: "Deteksi pergeseran pasar 24-48 jam lebih awal"
  },
  {
    id: 2,
    stageName: "Telemetri Lapangan",
    badge: "FASE 02",
    title: "Sinyal Logistik Maritim Memberikan Indikator Riil",
    businessProblem: "Informasi antrean kapal dan tongkang komoditas sering kali tidak akurat dalam komunikasi agen lokal, memicu denda keterlambatan sandar puluhan juta.",
    sentinelSolution: "Pemetaan spasial dan sensor pergerakan armada menghitung kepadatan zona labuh secara objektif tanpa bias perkiraan manual.",
    measurableOutcome: "Akurasi estimasi waktu sandar hingga 92%"
  },
  {
    id: 3,
    stageName: "Mutasi Katalog",
    badge: "FASE 03",
    title: "Membaca Permintaan Pasar dari Perubahan Stok Etalase",
    businessProblem: "Ketiadaan visibilitas stok pesaing membuat Anda kehilangan momen transaksi saat pembeli mencari produk alternatif yang siap kirim.",
    sentinelSolution: "Pencatatan delta mutasi stok tiap 6 jam mendeteksi produk yang ludes terjual serta menertibkan reseller yang melanggar harga acuan (MAP).",
    measurableOutcome: "Pemantauan berkala 50+ produk pilihan per hari"
  },
  {
    id: 4,
    stageName: "Validasi Otomatis",
    badge: "FASE 04",
    title: "Pipeline Data Terstruktur Tanpa Risiko Skrip Macet",
    businessProblem: "Pengumpulan data manual membuang jam kerja tim, sementara scraping biasa rentan rusak saat susunan halaman web target diperbarui.",
    sentinelSolution: "Arsitektur pengumpulan adaptif dengan validasi tipe data ganda, filter duplikasi, dan jaminan kepatuhan terhadap regulasi privasi data.",
    measurableOutcome: "Zero data hilang & deduplikasi 100% tervalidasi"
  },
  {
    id: 5,
    stageName: "Serah Terima Eksekutif",
    badge: "FASE 05",
    title: "Format Siap Pakai Langsung untuk Pengambil Keputusan",
    businessProblem: "Tumpukan data mentah tanpa struktur hanya menambah beban tim analisis dan memperlambat koordinasi jajaran direksi.",
    sentinelSolution: "Diserahkan dalam lembar kerja spreadsheet rapi, notifikasi ringkasan pagi via Telegram, atau integrasi API langsung ke sistem internal Anda.",
    measurableOutcome: "Uji coba sampel pratinjau 50 baris pertama tanpa biaya"
  }
];

export default function ScrollytellingContainer() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const desktopStepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Interactive local states for simulator
  const [step1Mode, setStep1Mode] = useState<"legacy" | "sentinel">("sentinel");
  const [step2Zone, setStep2Zone] = useState<"priok" | "berau">("priok");
  const [step4Running, setStep4Running] = useState<boolean>(false);
  const [step4Progress, setStep4Progress] = useState<number>(100);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // GSAP ScrollTrigger for Desktop Scrollytelling
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      desktopStepRefs.current.forEach((el, index) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStep(index + 1),
          onEnterBack: () => setActiveStep(index + 1),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
    
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      const targetElement = desktopStepRefs.current[stepId - 1];
      if (targetElement) {
        const yOffset = -120;
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const nextStep = () => {
    if (activeStep < WORKFLOW_STEPS.length) {
      handleStepClick(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 1) {
      handleStepClick(activeStep - 1);
    }
  };

  const runStep4Pipeline = () => {
    setStep4Running(true);
    setStep4Progress(0);
    const interval = setInterval(() => {
      setStep4Progress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep4Running(false);
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

  const currentStep = WORKFLOW_STEPS[activeStep - 1];

  // Reusable Executive Simulation Card Body
  const renderExecutiveSimulator = () => (
    <div className="h-[280px] flex flex-col justify-between">
      <AnimatePresence mode="wait">
        
        {/* STEP 1: PERINGATAN DINI */}
        {activeStep === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3.5"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
              <span className="text-[#9ca3af] font-medium">Bandingkan Dampak Respons Pasar:</span>
              <div className="flex items-center bg-[#0b0d11] p-0.5 rounded-lg border border-white/10 text-xs">
                <button
                  onClick={() => setStep1Mode("legacy")}
                  className={`px-2.5 py-1 rounded-md transition-all ${step1Mode === "legacy" ? "bg-red-500/20 text-red-300 font-semibold border border-red-500/30" : "text-[#9ca3af]"}`}
                >
                  Metode Manual
                </button>
                <button
                  onClick={() => setStep1Mode("sentinel")}
                  className={`px-2.5 py-1 rounded-md transition-all ${step1Mode === "sentinel" ? "bg-[#10b981] text-[#0b0d11] font-semibold" : "text-[#9ca3af]"}`}
                >
                  Sentinel Otomatis
                </button>
              </div>
            </div>

            {step1Mode === "legacy" ? (
              <div className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/20 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-red-400 font-semibold">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>KONDISI: TERLAMBAT MENERIMA SINYAL PASAR</span>
                </div>
                <p className="text-[#cbd5e1] leading-relaxed">
                  Pesaing kehabisan stok 3 hari lalu. Laporan rekap internal baru masuk minggu depan. Anda kehilangan momen lonjakan omzet dan pembeli yang aktif mencari.
                </p>
                <div className="pt-2 text-[11px] text-red-400 border-t border-red-500/15">
                  Dampak: Kehilangan potensi transaksi bernilai belasan juta rupiah.
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#10b981] font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>KONDISI: PERINGATAN ANOMALI 48 JAM LEBIH AWAL</span>
                </div>
                <p className="text-[#cbd5e1] leading-relaxed">
                  Sistem otomatis mendeteksi 3 produk kunci kompetitor habis (stok 0). Tim Anda langsung menaikkan anggaran iklan dan memenangkan pelanggan siap beli.
                </p>
                <div className="pt-2 text-[11px] text-[#10b981] border-t border-emerald-500/15">
                  Dampak: Konversi transaksi meningkat seketika tanpa spekulasi.
                </div>
              </div>
            )}

            <div className="p-2.5 rounded-lg bg-[#0b0d11] border border-white/5 text-[11px] text-[#9ca3af] flex items-center justify-between">
              <span>Siklus Otomasi: 24 Jam Nonstop</span>
              <span className="text-[#10b981]">Pengiriman: Ringkasan Telegram Langsung</span>
            </div>
          </motion.div>
        )}

        {/* STEP 2: TELEMETRI FISIK */}
        {activeStep === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3.5"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
              <span className="text-[#9ca3af] font-medium">Pilih Wilayah Pantau Maritim:</span>
              <div className="flex items-center bg-[#0b0d11] p-0.5 rounded-lg border border-white/10 text-xs">
                <button
                  onClick={() => setStep2Zone("priok")}
                  className={`px-2.5 py-1 rounded-md transition-all ${step2Zone === "priok" ? "bg-[#10b981] text-[#0b0d11] font-semibold" : "text-[#9ca3af]"}`}
                >
                  Tanjung Priok
                </button>
                <button
                  onClick={() => setStep2Zone("berau")}
                  className={`px-2.5 py-1 rounded-md transition-all ${step2Zone === "berau" ? "bg-[#10b981] text-[#0b0d11] font-semibold" : "text-[#9ca3af]"}`}
                >
                  Muara Berau
                </button>
              </div>
            </div>

            {step2Zone === "priok" ? (
              <div className="p-3.5 rounded-xl bg-[#0b0d11] border border-white/10 text-xs space-y-2">
                <div className="flex justify-between items-center text-[#9ca3af]">
                  <span>Wilayah Pengamatan</span>
                  <span className="text-[#f3f4f6] font-medium">Area Labuh Luar Priok</span>
                </div>
                <div className="flex justify-between items-center text-[#9ca3af]">
                  <span>Rata-rata Normal Armada</span>
                  <span className="text-[#f3f4f6]">17 - 18 Kapal</span>
                </div>
                <div className="flex justify-between items-center text-[#9ca3af]">
                  <span>Kondisi Riil Hari Ini</span>
                  <span className="text-red-400 font-bold">35 Kapal (+72% Kepadatan)</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px]">
                  <span>Status Operasional</span>
                  <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-semibold">
                    Kepadatan Tinggi • Waspada Demurrage
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-[#0b0d11] border border-white/10 text-xs space-y-2">
                <div className="flex justify-between items-center text-[#9ca3af]">
                  <span>Wilayah Pengamatan</span>
                  <span className="text-[#f3f4f6] font-medium">Transshipment STS Muara Berau</span>
                </div>
                <div className="flex justify-between items-center text-[#9ca3af]">
                  <span>Tongkang Aktif Beroperasi</span>
                  <span className="text-[#f3f4f6]">14 Unit Terpantau</span>
                </div>
                <div className="flex justify-between items-center text-[#9ca3af]">
                  <span>Kelancaran Transfer Komoditas</span>
                  <span className="text-[#10b981] font-bold">Lancar (Kapasitas Optimal)</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px]">
                  <span>Estimasi Sandar</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                    Sesuai Jadwal (On Schedule)
                  </span>
                </div>
              </div>
            )}

            <div className="p-2.5 rounded-lg bg-[#141820] border border-white/5 text-[11px] text-[#9ca3af]">
              <span className="text-[#10b981] font-medium">Manfaat Keputusan: </span>
              Menyesuaikan slot sandar sebelum terkena denda waktu tunggu armada (demurrage).
            </div>
          </motion.div>
        )}

        {/* STEP 3: MUTASI KATALOG */}
        {activeStep === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3.5"
          >
            <div className="text-xs text-[#9ca3af] font-medium pb-1 border-b border-white/10">
              Hasil Pengecekan Stok Pesaing & Reseller (Siklus 6 Jam):
            </div>
            
            <div className="p-2.5 rounded-xl bg-[#0b0d11] border border-white/10 text-xs space-y-1.5">
              <div className="grid grid-cols-12 text-[#9ca3af] text-[11px] pb-1 border-b border-white/10 font-semibold">
                <span className="col-span-5">Produk / SKU</span>
                <span className="col-span-3 text-center">Mutasi Stok</span>
                <span className="col-span-4 text-right">Status Pasar</span>
              </div>
              <div className="grid grid-cols-12 text-[11px] items-center py-1">
                <span className="col-span-5 text-[#f3f4f6] truncate font-medium">Serum 30ml Gold</span>
                <span className="col-span-3 text-center text-red-400 font-semibold">48 &rarr; 0</span>
                <span className="col-span-4 text-right text-red-400 font-semibold">Stok Habis (Peluang)</span>
              </div>
              <div className="grid grid-cols-12 text-[11px] items-center py-1">
                <span className="col-span-5 text-[#f3f4f6] truncate font-medium">Krim Malam 50g</span>
                <span className="col-span-3 text-center text-[#10b981]">12 &rarr; 8</span>
                <span className="col-span-4 text-right text-[#10b981]">4 Unit Terjual</span>
              </div>
              <div className="grid grid-cols-12 text-[11px] items-center py-1">
                <span className="col-span-5 text-[#f3f4f6] truncate font-medium">Pembersih B2B</span>
                <span className="col-span-3 text-center text-amber-400">Rp 85.000</span>
                <span className="col-span-4 text-right text-amber-400 font-semibold">Melanggar MAP</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#141820] border border-white/5 text-xs flex items-center justify-between">
              <span className="text-[#9ca3af]">Tindakan Segera:</span>
              <span className="text-[#10b981] font-semibold">Tegakkan Harga Acuan / Rebut Pembeli</span>
            </div>
          </motion.div>
        )}

        {/* STEP 4: VALIDASI OTOMATIS */}
        {activeStep === 4 && (
          <motion.div
            key="step-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3.5"
          >
            <div className="flex items-center justify-between pb-1 border-b border-white/10 text-xs">
              <span className="text-[#9ca3af] font-medium">Mesin Validasi Integritas Data:</span>
              <button
                onClick={runStep4Pipeline}
                disabled={step4Running}
                className="px-3 py-1 rounded bg-[#10b981] text-[#0b0d11] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#059669] transition-all"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{step4Running ? "Menguji..." : "Uji Validasi"}</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className={`p-2.5 rounded-xl bg-[#0b0d11] border ${step4Progress >= 30 ? "border-[#10b981] text-[#10b981]" : "border-white/10 text-white/40"}`}>
                <div className="font-semibold text-xs">1. Pengambilan</div>
                <div className="text-[11px] text-[#9ca3af]">Sumber Terbuka</div>
              </div>
              <div className={`p-2.5 rounded-xl bg-[#0b0d11] border ${step4Progress >= 65 ? "border-[#10b981] text-[#10b981]" : "border-white/10 text-white/40"}`}>
                <div className="font-semibold text-xs">2. Standardisasi</div>
                <div className="text-[11px] text-[#9ca3af]">Kamus Kolom Rapi</div>
              </div>
              <div className={`p-2.5 rounded-xl bg-[#0b0d11] border ${step4Progress >= 100 ? "border-[#10b981] text-[#10b981]" : "border-white/10 text-white/40"}`}>
                <div className="font-semibold text-xs">3. Penyaringan</div>
                <div className="text-[11px] text-[#9ca3af]">Zero Duplikasi</div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0b0d11] border border-white/5 text-xs text-[#9ca3af] space-y-1">
              <div className="text-[#10b981] font-semibold">Status: Seluruh Verifikasi Lolos 100%</div>
              <div className="text-[11px]">• Kebal terhadap perubahan struktur situs target</div>
              <div className="text-[11px]">• Mematuhi regulasi privasi data dan etika bisnis</div>
            </div>
          </motion.div>
        )}

        {/* STEP 5: SERAH TERIMA EKSEKUTIF */}
        {activeStep === 5 && (
          <motion.div
            key="step-5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="text-xs text-[#9ca3af] font-medium pb-1 border-b border-white/10">
              Format Serah Terima Siap Pakai untuk Manajemen:
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#0b0d11] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileSpreadsheet className="w-4 h-4 text-[#10b981]" />
                  <span className="font-medium">Lembar Kerja Excel / CSV Bersih</span>
                </div>
                <span className="text-[#10b981] font-semibold">Tersedia</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0b0d11] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="font-medium">Ringkasan Pagi Bot Telegram</span>
                </div>
                <span className="text-[#10b981] font-semibold">Harian</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0b0d11] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-[#8f652e]" />
                  <span className="font-medium">Integrasi API / Webhook Sistem</span>
                </div>
                <span className="text-[#10b981] font-semibold">Opsional</span>
              </div>
            </div>

            <button
              onClick={handleSampleDownload}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] font-semibold text-xs transition-all shadow-md shadow-[#10b981]/20"
            >
              <Download className="w-4 h-4" />
              <span>{downloadSuccess ? "Sampel Berhasil Disiapkan!" : "Minta Sampel Data Sektor Anda"}</span>
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
      className="relative bg-[#0b0d11] text-[#f3f4f6] py-14 sm:py-24 border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-8 lg:mb-12 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs text-[#10b981] px-3 py-1 rounded-full bg-[#141820] border border-[#10b981]/20 font-medium">
            <Layers className="w-3.5 h-3.5" />
            <span>ALUR KERJA & METODOLOGI OPERASIONAL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#f3f4f6] tracking-tight">
            Transparansi Alur Pengolahan Data Lapangan
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
            Dari penangkapan sinyal fisik hingga verifikasi integritas berstandar industri. Pilih tahapan di bawah untuk melihat simulasi hasil pengolahan data secara langsung.
          </p>

          {/* Stepper Tabs Bar (Universal, Smooth Interaction) */}
          <div className="pt-3">
            {/* Progress line */}
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-3">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#10b981] to-[#34d399]" 
                animate={{ width: `${(activeStep / WORKFLOW_STEPS.length) * 100}%` }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {WORKFLOW_STEPS.map((step) => {
                const isSelected = activeStep === step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs transition-all flex items-center gap-2 whitespace-nowrap border shrink-0 ${
                      isSelected
                        ? "bg-[#10b981] text-[#0b0d11] border-[#10b981] font-semibold shadow-md shadow-[#10b981]/20 scale-105"
                        : "bg-[#141820] text-[#9ca3af] border-white/10 hover:border-white/20 hover:text-white font-medium"
                    }`}
                  >
                    <span className="font-bold">0{step.id}</span>
                    <span>{step.stageName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MOBILE VIEW (< 1024px): ZERO-JUMP EXECUTIVE TABBED DECK       */}
        {/* ============================================================== */}
        <div className="block lg:hidden space-y-4">
          
          {/* Mobile Interactive Deck Container */}
          <div className="rounded-2xl bg-[#141820] border border-[#10b981]/30 p-4 shadow-xl relative overflow-hidden backdrop-blur-md">
            
            {/* Executive Sub-Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs text-[#9ca3af]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-[#f3f4f6] font-semibold">Simulasi Fase 0{activeStep}</span>
              </div>
              <span className="text-[#10b981] font-semibold">
                Langkah {activeStep} dari 5
              </span>
            </div>

            {/* Stable Simulator Body */}
            {renderExecutiveSimulator()}

          </div>

          {/* Mobile Narrative Step Card (Directly below simulator, Zero Jumping) */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#141820] border border-white/10 space-y-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#10b981] font-bold">
                {currentStep.badge} // {currentStep.stageName.toUpperCase()}
              </span>
              <span className="text-[#9ca3af]">
                Tahap {currentStep.id} dari 5
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-[#f3f4f6] leading-snug">
              {currentStep.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
              {currentStep.businessProblem}
            </p>

            <div className="p-3 rounded-lg bg-[#0b0d11] border-l-2 border-[#10b981] text-xs text-[#f3f4f6] space-y-1">
              <div className="font-semibold text-[#10b981]">Solusi PRADIKTIF:</div>
              <p className="text-[#cbd5e1] leading-relaxed">{currentStep.sentinelSolution}</p>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-[#10b981] font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Hasil Terukur: {currentStep.measurableOutcome}</span>
              </div>
            </div>

            {/* Mobile Step Switcher Buttons */}
            <div className="pt-3 flex items-center justify-between gap-2 border-t border-white/10 text-xs">
              <button
                onClick={prevStep}
                disabled={activeStep === 1}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0b0d11] text-[#9ca3af] disabled:opacity-30 border border-white/10 font-medium"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>

              <span className="text-white/50 text-xs">Langkah {activeStep} / 5</span>

              <button
                onClick={nextStep}
                disabled={activeStep === WORKFLOW_STEPS.length}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10b981] text-[#0b0d11] font-semibold disabled:opacity-30"
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
            <div className="rounded-2xl bg-[#141820] border border-[#10b981]/30 p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
              
              {/* Simulator Header */}
              <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-white/10 text-xs text-[#9ca3af]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="text-[#f3f4f6] font-semibold">Simulasi Respon Sistem Data</span>
                </div>
                <span className="text-[#10b981] font-semibold">
                  Fase 0{activeStep} dari 05
                </span>
              </div>

              {/* Dynamic Animated Body */}
              {renderExecutiveSimulator()}

              {/* Bottom Card Readout */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#9ca3af]">
                <span>Integritas Terverifikasi</span>
                <span className="text-[#10b981] font-medium">PRADIKTIF DATA LAB</span>
              </div>
            </div>
          </div>

          {/* Right Column: CRISP NARRATIVE BEATS */}
          <div className="lg:col-span-6 space-y-8 py-2">
            {WORKFLOW_STEPS.map((step, index) => {
              const isActive = activeStep === step.id;
              return (
                <div
                  key={step.id}
                  ref={(el) => { desktopStepRefs.current[index] = el; }}
                  onClick={() => handleStepClick(step.id)}
                  className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? "bg-[#141820] border-[#10b981]/60 shadow-xl shadow-[#10b981]/10 scale-[1.02] ring-1 ring-[#10b981]/30" 
                      : "bg-[#0b0d11]/70 border-white/5 opacity-50 hover:opacity-80"
                  }`}
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#10b981] font-bold">
                        {step.badge} // {step.stageName.toUpperCase()}
                      </span>
                      <span className="text-[#9ca3af]">
                        Langkah {step.id} dari 5
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-[#f3f4f6] leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-sm text-[#9ca3af] leading-relaxed">
                      {step.businessProblem}
                    </p>

                    <div className="p-3.5 rounded-xl bg-[#0b0d11] border-l-2 border-[#10b981] text-xs text-[#f3f4f6] space-y-1">
                      <div className="font-semibold text-[#10b981]">Solusi PRADIKTIF:</div>
                      <p className="text-[#cbd5e1] leading-relaxed">{step.sentinelSolution}</p>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-[#10b981] font-medium">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Hasil Terukur: {step.measurableOutcome}</span>
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
