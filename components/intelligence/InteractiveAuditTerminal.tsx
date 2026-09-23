"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  RefreshCw, 
  Copy, 
  Check, 
  Table, 
  LayoutDashboard,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
  Building2,
  Ship,
  Store,
  Briefcase,
  Download,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { triggerLeadModal } from "./LeadIntakeModal";

type FeedKey = "priok" | "berau" | "retail" | "lpse";
type ViewMode = "dashboard" | "table";

interface FeedData {
  id: FeedKey;
  label: string;
  category: string;
  source: string;
  statusBadge: string;
  statusColor: string;
  statusBg: string;
  executiveKPIs: { label: string; value: string; note: string }[];
  strategicTakeaways: { heading: string; detail: string }[];
  tableHeaders: string[];
  tableRows: (string | number)[][];
}

const FEEDS: Record<FeedKey, FeedData> = {
  priok: {
    id: "priok",
    label: "Tanjung Priok",
    category: "Logistik Maritim",
    source: "Data Spasial Labuh Luar Priok & Stasiun Maritim Terbuka",
    statusBadge: "Lonjakan Kepadatan (+72%)",
    statusColor: "#ef4444",
    statusBg: "bg-red-500/10 text-red-400 border-red-500/30",
    executiveKPIs: [
      { label: "Wilayah Pemantauan", value: "Area Labuh Luar", note: "Radius heksagonal 400m" },
      { label: "Rata-rata 14 Hari", value: "17.6 Armada", note: "Batas wajar antrean" },
      { label: "Aktual Hari Ini", value: "35 Armada", note: "Lonjakan +72% di atas normal" },
      { label: "Estimasi Waktu Sandar", value: "+220 Menit", note: "Potensi denda demurrage" }
    ],
    strategicTakeaways: [
      { 
        heading: "Verifikasi Lapangan Multi-Sumber", 
        detail: "Kepadatan dikonfirmasi secara serentak dari 3 stasiun penerima sinyal maritim tanpa ketergantungan klaim sepihak agen lokal." 
      },
      { 
        heading: "Mitigasi Denda Waktu Tunggu (Demurrage)", 
        detail: "Penumpukan armada berisiko memicu denda puluhan juta per hari jika jadwal sandar tidak segera dialihkan ke slot alternatif." 
      },
      { 
        heading: "Langkah Strategis Direksi", 
        detail: "Prioritaskan kapal berbiaya sewa tinggi dan negosiasikan slot labuh alternatif sebelum antrean sandar semakin padat." 
      }
    ],
    tableHeaders: ["Armada / Kapal", "Jenis Muatan", "Draft (Meter)", "Waktu Labuh", "Status Operasional"],
    tableRows: [
      ["TB. Samudra 08", "Tugboat Logistik", "3.2m", "04:12 WIB", "Antre Labuh"],
      ["KM. Nusantara IV", "General Cargo", "6.8m", "02:40 WIB", "Menunggu Pandu"],
      ["BG. Kalimantan 02", "Barge 300ft", "4.5m", "06:15 WIB", "Siap Sandar"],
      ["TB. Mitra Jaya 1", "Tugboat Logistik", "3.0m", "01:10 WIB", "Antre Labuh"]
    ]
  },
  berau: {
    id: "berau",
    label: "Muara Berau",
    category: "Komoditas Batubara",
    source: "Transshipment Ship-to-Ship Muara Berau, Kalimantan Timur",
    statusBadge: "Operasional Normal & Lancar",
    statusColor: "#10b981",
    statusBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    executiveKPIs: [
      { label: "Lokasi Alih Muat", value: "STS Muara Berau", note: "Pusat logistik batubara" },
      { label: "Tongkang Beroperasi", value: "14 Unit", note: "Kapasitas throughput optimal" },
      { label: "Rata-rata Muat", value: "8.400 Ton / Hari", note: "Sesuai target mingguan" },
      { label: "Kondisi Cuaca Laut", value: "Tenang (0.4m)", note: "Tidak ada risiko jeda cuaca" }
    ],
    strategicTakeaways: [
      { 
        heading: "Kelancaran Pasokan Ekspor", 
        detail: "Tidak ditemukan hambatan cuaca atau antrean tongkang yang abnormal; alur pemindahan batubara ke kapal induk berjalan normal." 
      },
      { 
        heading: "Efisiensi Biaya Operasional", 
        detail: "Pertahankan jadwal pengiriman harian sesuai kontrak berjalan tanpa memerlukan alokasi anggaran kontingensi cadangan." 
      },
      { 
        heading: "Rekomendasi Manajerial", 
        detail: "Maksimalkan muatan tongkang pada jendela gelombang tenang untuk mengamankan cadangan ekspor sebelum siklus cuaca berganti." 
      }
    ],
    tableHeaders: ["ID Tongkang", "Jenis Komoditas", "Volume Tonase", "Kapal Induk Tujuan", "Status Pemuatan"],
    tableRows: [
      ["BG. Energy 301", "Thermal Coal", "7.800 MT", "MV. Pacific Glory", "Sedang Pemuatan"],
      ["BG. Trans 208", "Coking Coal", "8.200 MT", "MV. Ocean Star", "Sandar Siap Muat"],
      ["BG. Borneo IX", "Thermal Coal", "7.500 MT", "MV. Asia Leader", "Antre Labuh"],
      ["BG. Mitra 77", "Thermal Coal", "8.000 MT", "MV. Pacific Glory", "Sedang Pemuatan"]
    ]
  },
  retail: {
    id: "retail",
    label: "Katalog Ritel & Reseller",
    category: "E-Commerce Nasional",
    source: "Pemantauan Etalase 50 SKU Terpilih dari Top Reseller",
    statusBadge: "Peluang Stok Pesaing Habis",
    statusColor: "#10b981",
    statusBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    executiveKPIs: [
      { label: "Produk Terpantau", value: "50 SKU Kunci", note: "Kategori produk unggulan" },
      { label: "Stok Pesaing Kosong", value: "3 Produk Utama", note: "Stok kompetitor = 0" },
      { label: "Potensi Transaksi Beralih", value: "Rp 14.2M / Siklus", note: "Permintaan pasar aktif" },
      { label: "Pelanggaran Harga", value: "2 Mitra Reseller", note: "Menjual di bawah batas MAP" }
    ],
    strategicTakeaways: [
      { 
        heading: "Peluang Penyerapan Omzet", 
        detail: "Ketika produk pesaing habis, calon pembeli aktif mencari produk substitusi yang tersedia di platform e-commerce." 
      },
      { 
        heading: "Penertiban Reseller Liar", 
        detail: "Tangkapan data membuktikan 2 toko menjual di bawah harga acuan resmi (MAP), merusak struktur harga distributor resmi." 
      },
      { 
        heading: "Tindakan Cepat Pemasaran", 
        detail: "Tingkatkan alokasi kampanye berbayar untuk produk serupa milik Anda dan kirimkan surat teguran resmi ke reseller yang melanggar." 
      }
    ],
    tableHeaders: ["Kode Produk", "Nama Produk Pesaing", "Harga Tertera", "Sisa Stok", "Status Analisis"],
    tableRows: [
      ["SKU-SRM-30", "Serum 30ml Gold", "Rp 185.000", "0 Unit", "Stok Habis (Peluang)"],
      ["SKU-CRM-50", "Krim Malam 50g", "Rp 210.000", "8 Unit", "Penjualan Aktif"],
      ["SKU-TON-100", "Toner Wajah 100ml", "Rp 120.000", "0 Unit", "Stok Habis (Peluang)"],
      ["SKU-CLF-80", "Pembersih Muka", "Rp 85.000", "42 Unit", "Pelanggaran MAP"]
    ]
  },
  lpse: {
    id: "lpse",
    label: "Tender LPSE & Pengadaan",
    category: "Pengadaan Pemerintah",
    source: "Agregasi 34 Portal Pengadaan LKPP Kementerian & Pemda",
    statusBadge: "Pemenang Tunggal Teridentifikasi",
    statusColor: "#f59e0b",
    statusBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    executiveKPIs: [
      { label: "Paket Tender Aktif", value: "128 Paket Baru", note: "Sektor konstruksi & jasa" },
      { label: "Pemenang Tunggal", value: "3 Paket Lelang", note: "Penawaran mendekati 99% HPS" },
      { label: "Peluang Tender Ulang", value: "1 Paket", note: "Kualifikasi teknis bermasalah" },
      { label: "Total Nilai Anggaran", value: "Rp 8.9 Miliar", note: "Paket potensial dipantau" }
    ],
    strategicTakeaways: [
      { 
        heading: "Identifikasi Penawaran Tunggal", 
        detail: "Sistem mendeteksi tender yang hanya memiliki 1 penawar dengan harga penawaran sangat mendekati pagu anggaran proyek." 
      },
      { 
        heading: "Peluang Sanggah Kualifikasi", 
        detail: "Ditemukan indikasi persyaratan sertifikasi yang berpotensi diskriminatif sebelum masa evaluasi lelang ditutup resmi." 
      },
      { 
        heading: "Rekomendasi Vendor / Kontraktor", 
        detail: "Segera siapkan berkas sanggah atau tawarkan paket sub-kontrak resmi kepada kontraktor utama yang telah ditetapkan." 
      }
    ],
    tableHeaders: ["Kode Tender", "Nama Paket Pengadaan", "Instansi Pemerintah", "Nilai Pagu (HPS)", "Tahapan Lelang"],
    tableRows: [
      ["TND-89412", "Pembangunan Jembatan B2", "Dinas PUPR Jabar", "Rp 4.200.000.000", "Evaluasi Penawaran"],
      ["TND-89418", "Pengadaan Data Server", "Diskominfo Provinsi", "Rp 1.150.000.000", "Pemenang Tunggal"],
      ["TND-89422", "Pemeliharaan Jalan Ruas A", "Dinas PU Kota", "Rp 2.800.000.000", "Masa Sanggah"],
      ["TND-89430", "Sistem Informasi Geospasial", "Bappeda Daerah", "Rp 850.000.000", "Kualifikasi Ulang"]
    ]
  }
};

export default function InteractiveAuditTerminal() {
  const [activeFeedKey, setActiveFeedKey] = useState<FeedKey>("priok");
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const currentFeed = FEEDS[activeFeedKey];

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 450);
  };

  const handleCopy = () => {
    const textToCopy = currentFeed.executiveKPIs.map(k => `${k.label}: ${k.value} (${k.note})`).join(" | ");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-[#0b0d11] text-[#f3f4f6] py-16 sm:py-24 border-b border-white/10" id="terminal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 text-xs text-[#10b981] px-3.5 py-1 rounded-full bg-[#141820] border border-[#10b981]/30 font-medium">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>DASBOR INTELIJEN & EXPLORER DATA INTERAKTIF</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#f3f4f6] tracking-tight">
            Uji Simulasi Penyajian Data Siap Ambil Keputusan
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
            Pilih sektor di bawah ini untuk melihat bagaimana data mentah lapangan dikonversi menjadi ringkasan eksekutif dan lembar kerja spreadsheet yang bersih dan siap tindak lanjuti.
          </p>
        </div>

        {/* Executive Studio Card Frame */}
        <div className="rounded-2xl bg-[#141820] border border-[#10b981]/30 shadow-2xl overflow-hidden backdrop-blur-md">
          
          {/* Top Control Bar */}
          <div className="p-4 sm:p-5 border-b border-white/10 bg-[#161c26] flex flex-wrap items-center justify-between gap-3">
            
            {/* Sector Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {(Object.keys(FEEDS) as FeedKey[]).map((key) => {
                const isSelected = activeFeedKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveFeedKey(key)}
                    className={`px-3.5 py-2 rounded-xl text-xs transition-all flex items-center gap-2 ${
                      isSelected
                        ? "bg-[#10b981] text-[#0b0d11] font-semibold shadow-md shadow-[#10b981]/20 scale-105"
                        : "bg-[#0b0d11] text-[#9ca3af] hover:text-white border border-white/10 font-medium"
                    }`}
                  >
                    <span>{FEEDS[key].label}</span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Switcher (Executive Dashboard vs Spreadsheet Table) */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[#0b0d11] p-1 rounded-xl border border-white/10 text-xs">
                <button
                  onClick={() => setViewMode("dashboard")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-medium ${viewMode === "dashboard" ? "bg-[#10b981] text-[#0b0d11] font-semibold" : "text-[#9ca3af] hover:text-white"}`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Ringkasan Eksekutif</span>
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-medium ${viewMode === "table" ? "bg-[#10b981] text-[#0b0d11] font-semibold" : "text-[#9ca3af] hover:text-white"}`}
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>Pratinjau Tabel Excel</span>
                </button>
              </div>

              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0b0d11] hover:bg-[#1a202c] text-xs text-[#9ca3af] hover:text-white border border-white/10 transition-all font-medium"
                title="Sinkronisasi Data Terkini"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin text-[#10b981]" : ""}`} />
                <span>{isSimulating ? "Menyegarkan..." : "Perbarui"}</span>
              </button>
            </div>

          </div>

          {/* Studio Content Body */}
          <div className="p-4 sm:p-7 bg-[#0b0d11] min-h-[360px]">
            <AnimatePresence mode="wait">
              
              {/* MODE 1: EXECUTIVE DASHBOARD */}
              {viewMode === "dashboard" && (
                <motion.div
                  key={`dash-${currentFeed.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Context Header Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 text-xs">
                    <span className="text-[#9ca3af] font-medium">Sumber Data: {currentFeed.source}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${currentFeed.statusBg}`}>
                      Status: {currentFeed.statusBadge}
                    </span>
                  </div>

                  {/* 4 Executive KPI Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    {currentFeed.executiveKPIs.map((kpi, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#141820] border border-white/10 space-y-1.5">
                        <div className="text-xs text-[#9ca3af]">{kpi.label}</div>
                        <div className="text-lg sm:text-xl font-bold text-[#f3f4f6] tracking-tight">{kpi.value}</div>
                        <div className="text-[11px] text-[#10b981]">{kpi.note}</div>
                      </div>
                    ))}
                  </div>

                  {/* Strategic Action Matrix */}
                  <div className="p-5 rounded-2xl bg-[#141820] border border-white/10 space-y-3">
                    <div className="text-xs font-semibold text-[#10b981] uppercase tracking-wider">
                      Telaah & Rekomendasi Langkah Strategis:
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                      {currentFeed.strategicTakeaways.map((takeaway, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-[#0b0d11] border border-white/5 space-y-1.5">
                          <div className="text-xs font-semibold text-[#f3f4f6] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                            <span>{takeaway.heading}</span>
                          </div>
                          <p className="text-xs text-[#9ca3af] leading-relaxed">
                            {takeaway.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* MODE 2: SPREADSHEET TABLE PREVIEW */}
              {viewMode === "table" && (
                <motion.div
                  key={`table-${currentFeed.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#9ca3af] pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-[#10b981]" />
                      <span className="text-[#f3f4f6] font-medium">Contoh Berkas Lembar Kerja Rapi (Siap Pakai Excel / Google Sheets):</span>
                    </div>
                    <span className="text-[#10b981] font-medium">Format Kolom Terstandar</span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#141820]">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#1a222e] text-[#9ca3af] border-b border-white/10">
                          {currentFeed.tableHeaders.map((head, i) => (
                            <th key={i} className="p-3.5 font-semibold text-xs whitespace-nowrap text-[#f3f4f6]">{head}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-xs">
                        {currentFeed.tableRows.map((row, rIndex) => (
                          <tr key={rIndex} className="hover:bg-white/[0.02] transition-colors">
                            {row.map((cell, cIndex) => (
                              <td key={cIndex} className="p-3.5 whitespace-nowrap text-[#cbd5e1]">
                                {cIndex === row.length - 1 ? (
                                  <span className="px-2.5 py-1 rounded-md bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] font-medium text-[11px]">
                                    {cell}
                                  </span>
                                ) : (
                                  cell
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-3 rounded-xl bg-[#141820] border border-white/5 text-xs text-[#9ca3af] flex flex-wrap items-center justify-between gap-2">
                    <span>Seluruh kolom telah melalui pembersihan otomatis, tanpa baris kosong, dan siap diolah tim Anda.</span>
                    <button
                      onClick={() => triggerLeadModal({ 
                        sector: currentFeed.label, 
                        plan: "Format Lembar Kerja Spreadsheet Penuh (" + currentFeed.label + ")" 
                      })}
                      className="text-[#10b981] font-medium hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Minta Format Spreadsheet Penuh</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Studio Bottom Bar */}
            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-[#9ca3af] flex flex-wrap items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-[#f3f4f6]">
                <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                Sumber Resmi Terbuka • Kepatuhan Regulasi Etika & Privasi Data
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141820] hover:bg-white/10 text-xs text-[#f3f4f6] border border-white/10 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Tersalin!" : "Salin Ringkasan"}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
