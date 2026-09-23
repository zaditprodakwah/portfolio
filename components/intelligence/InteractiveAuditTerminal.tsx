"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, 
  RefreshCw, 
  Copy, 
  Check, 
  Radio, 
  AlertOctagon, 
  TrendingUp, 
  Cpu, 
  Table, 
  Code2, 
  LayoutDashboard,
  Search,
  CheckCircle2
} from "lucide-react";

type FeedKey = "priok" | "berau" | "retail" | "lpse";
type ViewMode = "dashboard" | "json" | "table";

interface FeedData {
  id: FeedKey;
  label: string;
  source: string;
  anomalyDetected: boolean;
  statusText: string;
  statusColor: string;
  summary: { [key: string]: string | number };
  bulletActions: string[];
  jsonPayload: object;
  tableHeaders: string[];
  tableRows: (string | number)[][];
}

const FEEDS: Record<FeedKey, FeedData> = {
  priok: {
    id: "priok",
    label: "Maritim AIS Tanjung Priok",
    source: "AIS Radar Terbuka & Zona Labuh Luar Priok",
    anomalyDetected: true,
    statusText: "LONJAKAN KEPADATAN (+72%)",
    statusColor: "#ef4444",
    summary: {
      "Zona Pantau": "Area Labuh Luar Tanjung Priok (~400m heksagonal)",
      "Rata-rata 14 Hari": "17.6 Armada Kapal",
      "Aktual Saat Ini": "35 Armada Kapal",
      "Estimasi Tambahan Antre": "+220 Menit per Kapal",
    },
    bulletActions: [
      "Verifikasi Silang: Koordinat dikonfirmasi dari 3 stasiun penerima AIS maritim.",
      "Dampak Logistik: Penumpukan kapal tongkang berpotensi memicu denda demurrage.",
      "Rekomendasi Aksi: Alihkan jadwal pengisian bahan bakar ke slot dini hari."
    ],
    jsonPayload: {
      timestamp: "2026-09-24T01:30:00Z",
      zone_id: "H3_PRIOK_ANCHORAGE_8828",
      baseline_fleet_count: 17.6,
      current_fleet_count: 35,
      z_score: 3.42,
      anomaly_status: "CRITICAL_SPIKE",
      est_delay_minutes: 220,
      verified_by: "PRADIKTIF_SPATIAL_PIPELINE"
    },
    tableHeaders: ["MMSI / KAPAL", "TIPE", "DRAFT (M)", "WAKTU LABUH", "STATUS"],
    tableRows: [
      ["TB. SAMUDRA 08", "Tugboat", "3.2m", "04:12 WIB", "Antre Labuh"],
      ["KM. NUSANTARA IV", "General Cargo", "6.8m", "02:40 WIB", "Menunggu Pandu"],
      ["BG. KALIMANTAN 02", "Barge 300ft", "4.5m", "06:15 WIB", "Siap Sandar"],
      ["TB. MITRA JAYA 1", "Tugboat", "3.0m", "01:10 WIB", "Antre Labuh"]
    ]
  },
  berau: {
    id: "berau",
    label: "Muara Berau Batubara STS",
    source: "Transshipment Ship-to-Ship Muara Berau",
    anomalyDetected: false,
    statusText: "OPERASIONAL NORMAL",
    statusColor: "#10b981",
    summary: {
      "Zona Pantau": "STS Muara Berau Kalimantan Timur",
      "Tongkang Aktif": "14 Armada Terpantau",
      "Kecepatan Angkut": "8.400 Ton / Hari Rata-rata",
      "Status Cuaca Lapangan": "Gelombang Tenang (0.4m)",
    },
    bulletActions: [
      "Arus Pengapalan: Tidak ada hambatan cuaca atau antrean tongkang yang abnormal.",
      "Indikator Pasokan: Pengiriman batubara ke kapal induk berlangsung sesuai jadwal.",
      "Rekomendasi Aksi: Pertahankan kuota pengiriman harian tanpa biaya kontingensi."
    ],
    jsonPayload: {
      timestamp: "2026-09-24T01:30:00Z",
      terminal_zone: "MUARA_BERAU_STS",
      active_barges: 14,
      avg_loading_rate_tpd: 8400,
      weather_risk_index: 0.12,
      anomaly_status: "NORMAL_FLOW",
      est_clearance_hours: 18
    },
    tableHeaders: ["ID TONGKANG", "KOMODITAS", "TONASE", "KAPAL INDUK", "STATUS"],
    tableRows: [
      ["BG. ENERGY 301", "Thermal Coal", "7.800 MT", "MV. PACIFIC GLORY", "Loading"],
      ["BG. TRANS 208", "Coking Coal", "8.200 MT", "MV. OCEAN STAR", "Moored"],
      ["BG. BORNEO IX", "Thermal Coal", "7.500 MT", "MV. ASIA LEADER", "Waiting STS"],
      ["BG. MITRA 77", "Thermal Coal", "8.000 MT", "MV. PACIFIC GLORY", "Loading"]
    ]
  },
  retail: {
    id: "retail",
    label: "Katalog & Reseller E-Commerce",
    source: "Monitoring Etalase 50 SKU Teratas",
    anomalyDetected: true,
    statusText: "PELUANG STOK HABIS (+3 SKU)",
    statusColor: "#10b981",
    summary: {
      "Total SKU Terpantau": "50 Produk Pilihan",
      "Stok Habis di Pesaing": "3 Produk Kunci (Stok = 0)",
      "Estimasi Nilai Transaksi": "Rp 14.250.000 / Hari",
      "Pelanggaran Harga Reseller": "2 Toko di Bawah Acuan (MAP)",
    },
    bulletActions: [
      "Peluang Omzet: Produk kompetitor habis, calon pembeli siap beralih ke toko Anda.",
      "Penegakan Harga: 2 reseller resmi menjual Rp 45.000 lebih murah dari batas resmi.",
      "Rekomendasi Aksi: Naikkan visibilitas iklan untuk SKU substitusi milik Anda sekarang."
    ],
    jsonPayload: {
      timestamp: "2026-09-24T01:30:00Z",
      monitored_skus: 50,
      stockout_competitor_skus: ["SKU-SRM-30", "SKU-CRM-50", "SKU-TON-100"],
      estimated_opportunity_idr: 14250000,
      map_violations_detected: 2,
      recommended_action: "BOOST_INVENTORY_ADVERTISING"
    },
    tableHeaders: ["KODE SKU", "NAMA PRODUK", "HARGA PESAING", "STOK", "STATUS"],
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
    source: "Portal Pengadaan Nasional (34 LPSE)",
    anomalyDetected: true,
    statusText: "PEMENANG TUNGGAL TERDETEKSI",
    statusColor: "#f59e0b",
    summary: {
      "Sektor Pantau": "Konstruksi & Jasa Konsultansi",
      "Total Paket Aktif": "128 Tender Baru",
      "Pemenang Tunggal": "3 Paket (Penawaran 98.4% Pagu)",
      "Potensi Tender Ulang": "1 Paket (Kualifikasi Tidak Terpenuhi)",
    },
    bulletActions: [
      "Pola Penawaran: Ditemukan tender dengan selisih penawaran mendekati 99% pagu anggaran.",
      "Peluang Sanggah: Adanya indikasi persyaratan diskriminatif pada tender logistik daerah.",
      "Rekomendasi Aksi: Siapkan dokumen sanggah kualifikasi sebelum batas waktu verifikasi."
    ],
    jsonPayload: {
      timestamp: "2026-09-24T01:30:00Z",
      portal: "LPSE_AGGREGATOR_34_ZONES",
      active_tenders: 128,
      single_bidder_tenders: 3,
      avg_pagu_ratio: 0.984,
      re_tender_probability: 0.35,
      alert_flag: "AUDIT_REVIEW_RECOMMENDED"
    },
    tableHeaders: ["KODE TENDER", "NAMA PAKET", "INSTANSI", "NILAI PAGU", "STATUS"],
    tableRows: [
      ["TND-89412", "Pembangunan Jembatan B2", "Dinas PUPR Jabar", "Rp 4.200.000.000", "Evaluasi Penawaran"],
      ["TND-89418", "Pengadaan Data Server", "Diskominfo Prov", "Rp 1.150.000.000", "Pemenang Tunggal"],
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
  const [searchFilter, setSearchFilter] = useState<string>("");

  const currentFeed = FEEDS[activeFeedKey];

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 450);
  };

  const handleCopy = () => {
    const textToCopy = viewMode === "json" 
      ? JSON.stringify(currentFeed.jsonPayload, null, 2)
      : Object.entries(currentFeed.summary).map(([k, v]) => `${k}: ${v}`).join(" | ");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-[#0b0d11] text-[#f3f4f6] py-14 sm:py-20 border-b border-white/10" id="terminal-proof">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#10b981] px-3 py-1 rounded-full bg-[#141820] border border-[#10b981]/30">
            <Terminal className="w-3.5 h-3.5" />
            <span>TERMINAL TELEMETRI INTERAKTIF</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#f3f4f6] tracking-tight">
            Uji Langsung Pengolahan Data Telemetri
          </h2>
          <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
            Ganti sektor pengamatan di bawah ini untuk melihat bagaimana data mentah publik diubah menjadi ringkasan bernilai bisnis.
          </p>
        </div>

        {/* Terminal Window Frame */}
        <div className="rounded-2xl bg-[#141820] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md">
          
          {/* Top Control Bar */}
          <div className="p-3 sm:p-4 border-b border-white/10 bg-[#1a202c]/60 flex flex-wrap items-center justify-between gap-3">
            
            {/* Feed Selector Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(Object.keys(FEEDS) as FeedKey[]).map((key) => {
                const isSelected = activeFeedKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveFeedKey(key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#10b981] text-[#0b0d11] font-bold shadow-md shadow-[#10b981]/20"
                        : "bg-[#0b0d11] text-[#9ca3af] hover:text-white border border-white/5"
                    }`}
                  >
                    <span>{FEEDS[key].label}</span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Switcher & Utility Actions */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[#0b0d11] p-1 rounded-lg border border-white/10 text-xs font-mono">
                <button
                  onClick={() => setViewMode("dashboard")}
                  className={`p-1.5 rounded transition-all ${viewMode === "dashboard" ? "bg-[#10b981] text-[#0b0d11]" : "text-[#9ca3af] hover:text-white"}`}
                  title="Dashboard Tampilan"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-1.5 rounded transition-all ${viewMode === "table" ? "bg-[#10b981] text-[#0b0d11]" : "text-[#9ca3af] hover:text-white"}`}
                  title="Pratinjau Tabel"
                >
                  <Table className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("json")}
                  className={`p-1.5 rounded transition-all ${viewMode === "json" ? "bg-[#10b981] text-[#0b0d11]" : "text-[#9ca3af] hover:text-white"}`}
                  title="Raw JSON Payload"
                >
                  <Code2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0b0d11] hover:bg-[#1a202c] text-xs font-mono text-[#9ca3af] hover:text-white border border-white/10 transition-all"
                title="Perbarui Data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin text-[#10b981]" : ""}`} />
                <span className="hidden sm:inline">{isSimulating ? "Sinkronisasi..." : "Perbarui"}</span>
              </button>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0b0d11] hover:bg-[#1a202c] text-xs font-mono text-[#9ca3af] hover:text-white border border-white/10 transition-all"
                title="Salin Data"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? "Tersalin" : "Salin"}</span>
              </button>
            </div>

          </div>

          {/* Terminal Screen Body */}
          <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm bg-[#0b0d11] min-h-[340px]">
            <AnimatePresence mode="wait">
              
              {/* MODE 1: DASHBOARD VIEW */}
              {viewMode === "dashboard" && (
                <motion.div
                  key={`dash-${currentFeed.id}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2 text-xs">
                    <span className="text-[#9ca3af]">// Sumber Terverifikasi: {currentFeed.source}</span>
                    <span 
                      className="px-2.5 py-0.5 rounded text-[11px] font-bold flex items-center gap-1.5"
                      style={{ 
                        backgroundColor: `${currentFeed.statusColor}20`, 
                        color: currentFeed.statusColor,
                        border: `1px solid ${currentFeed.statusColor}40`
                      }}
                    >
                      <Radio className="w-3 h-3 animate-pulse" />
                      {currentFeed.statusText}
                    </span>
                  </div>

                  {/* Summary Metric Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {Object.entries(currentFeed.summary).map(([key, val]) => (
                      <div key={key} className="p-3 rounded-xl bg-[#141820] border border-white/5 space-y-1">
                        <div className="text-white/40 text-[11px] truncate">{key}</div>
                        <div className="text-[#f3f4f6] font-semibold text-xs sm:text-sm">{val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Operational Recommendations Card */}
                  <div className="p-4 rounded-xl bg-[#141820] border border-white/10 space-y-2">
                    <div className="text-xs font-semibold text-[#10b981]">// Analisis & Rekomendasi Aksi Cepat:</div>
                    <div className="text-xs text-[#9ca3af] space-y-1.5">
                      {currentFeed.bulletActions.map((action, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[#10b981] mt-0.5">&gt;</span>
                          <span className="leading-relaxed">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* MODE 2: TABLE VIEW */}
              {viewMode === "table" && (
                <motion.div
                  key={`table-${currentFeed.id}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-[#9ca3af] pb-2 border-b border-white/5">
                    <span>// Format Lembar Kerja Terstruktur (Siap Ekspor Excel / CSV):</span>
                    <span className="text-[#10b981]">{currentFeed.tableRows.length} Baris Data Sampel</span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#141820]">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#1a202c] text-[#9ca3af] border-b border-white/10">
                          {currentFeed.tableHeaders.map((head, i) => (
                            <th key={i} className="p-3 font-semibold text-[11px] whitespace-nowrap">{head}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                        {currentFeed.tableRows.map((row, rIndex) => (
                          <tr key={rIndex} className="hover:bg-white/[0.02] transition-colors">
                            {row.map((cell, cIndex) => (
                              <td key={cIndex} className="p-3 whitespace-nowrap text-[#f3f4f6]">
                                {cIndex === row.length - 1 ? (
                                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#10b981] font-semibold">
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
                </motion.div>
              )}

              {/* MODE 3: RAW JSON PAYLOAD */}
              {viewMode === "json" && (
                <motion.div
                  key={`json-${currentFeed.id}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-[#9ca3af] pb-2 border-b border-white/5">
                    <span>// JSON Response Schema (Akses REST API / Webhook):</span>
                    <span className="text-[#10b981]">Status 200 OK</span>
                  </div>
                  <pre className="p-4 rounded-xl bg-[#141820] border border-white/10 text-[#10b981] text-xs font-mono overflow-x-auto leading-relaxed max-h-[300px]">
                    <code>{JSON.stringify(currentFeed.jsonPayload, null, 2)}</code>
                  </pre>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Terminal Footnote */}
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-[#9ca3af] flex flex-wrap items-center justify-between gap-2">
              <span>Pengambilan terotomasi &bull; Sumber data terbuka dan bebas risiko sengketa</span>
              <span className="text-[#10b981] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Validasi Skema 100% Lolos
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
