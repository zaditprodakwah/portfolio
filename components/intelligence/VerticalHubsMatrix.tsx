"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Car, 
  ShoppingBag, 
  Home, 
  Scale, 
  Ship, 
  Globe, 
  AlertCircle, 
  CheckCircle, 
  FileSpreadsheet, 
  Send
} from "lucide-react";

interface VerticalData {
  id: string;
  name: string;
  shortName: string;
  icon: React.ElementType;
  targetClient: string;
  bleedingNeckPain: string;
  dataVectors: string[];
  businessImpact: string;
  deliverableFormat: string;
  roiTakeaway: string;
}

const VERTICALS: VerticalData[] = [
  {
    id: "lpse",
    name: "Pengadaan Pemerintah & Tender (LPSE / LKPP)",
    shortName: "Pengadaan & Tender",
    icon: Building2,
    targetClient: "Kontraktor Konstruksi, Vendor Pengadaan Barang/Jasa, Distributor Alkes.",
    bleedingNeckPain: "Ketinggalan informasi lelang tender bernilai miliaran rupiah karena ratusan situs LPSE kementerian dan pemda terfragmentasi, sering mengalami gangguan server, dan tidak memiliki bot notifikasi terpusat.",
    dataVectors: [
      "Kode_Tender",
      "Instansi_Pengada",
      "Pagu_HPS_IDR",
      "Syarat_KBLI_SBU",
      "Batas_Akhir_Pendaftaran",
      "Historical_Discount_Rate (Rata-rata diskon pemenang tender sebelumnya di dinas terkait)"
    ],
    businessImpact: "Menerima notifikasi lelang baru di WhatsApp atau Telegram dalam 15 menit sejak tayang, lengkap dengan patokan harga tawar optimal untuk memenangkan lelang tanpa menebak.",
    deliverableFormat: "Feed notifikasi bot Telegram harian dan rekap spreadsheet Excel terverifikasi setiap minggu.",
    roiTakeaway: "ROI: Mengamankan 1 proyek lelang tender bernilai Rp 1 Miliar menutupi biaya pemantauan selama bertahun-tahun."
  },
  {
    id: "automotive",
    name: "Otomotif, Multifinance & Leasing Gadai BPKB",
    shortName: "Otomotif & Leasing",
    icon: Car,
    targetClient: "Perusahaan Pembiayaan (Multifinance), Balai Lelang Kendaraan, Dealer Mobil Bekas Skala Besar.",
    bleedingNeckPain: "Salah menaksir harga pasar wajar kendaraan agunan BPKB. Saat nasabah gagal bayar, unit sitaan terpaksa dilelang rugi ratusan juta rupiah karena nilai pencairan pinjaman terlalu tinggi.",
    dataVectors: [
      "Brand",
      "Model",
      "Variant",
      "Tahun_Pembuatan",
      "Transmisi",
      "Median_Price_IDR",
      "Listing_Duration_Days",
      "Depreciation_Curve_Monthly"
    ],
    businessImpact: "Menetapkan plafon pencairan kredit aman (Loan-to-Value 70%) secara presisi berdasarkan harga likuidasi riil di pasar, bukan asumsi taksiran manual.",
    deliverableFormat: "Endpoint REST API taksiran nilai kendaraan atau master file CSV kurva depresiasi bulanan.",
    roiTakeaway: "ROI: Mencegah kerugian kredit macet puluhan juta per unit kendaraan sitaan yang dilelang."
  },
  {
    id: "ecommerce",
    name: "E-Commerce & Retail Marketplace Intelligence",
    shortName: "E-Commerce & Retail",
    icon: ShoppingBag,
    targetClient: "Brand Principal (FMCG, Skincare, Fashion, Gadget), Star Seller, E-Commerce Aggregator.",
    bleedingNeckPain: "Perang harga akibat reseller tidak resmi menjual di bawah harga acuan resmi (MAP), serta ketidaktahuan kapan stok kompetitor utama habis di pasar.",
    dataVectors: [
      "SKU_ID",
      "Product_Title",
      "Seller_ID",
      "Current_Price",
      "MAP_Floor_Price",
      "Violation_Flag",
      "Units_Sold_24h",
      "Estimated_GMV_IDR"
    ],
    businessImpact: "Menertibkan reseller nakal dengan bukti screenshot otomatis, dan langsung melipatgandakan anggaran iklan saat stok kompetitor kosong untuk merebut pembeli aktif.",
    deliverableFormat: "Dashboard mingguan CSV bersih dan alert pelanggaran harga secara real-time.",
    roiTakeaway: "ROI: Menjaga integritas harga jaringan distributor dan menyedot transaksi saat kompetitor kehabisan stok."
  },
  {
    id: "property",
    name: "Properti, Real Estate & Villa Sewa Harian (STR)",
    shortName: "Properti & STR",
    icon: Home,
    targetClient: "Investor Properti Individu, Family Office, Operator Villa Bali/Jogja, Pengembang Perumahan.",
    bleedingNeckPain: "Membeli unit apartemen atau villa dengan janji imbal hasil manis dari broker, padahal tingkat keterisian kamar aslinya sangat sepi dan pasar mengalami kelebihan pasokan.",
    dataVectors: [
      "Listing_ID",
      "Cluster_Kecamatan",
      "Days_on_Market (DOM > 180 Hari)",
      "Price_Drop_History_Pct",
      "Occupancy_Rate_90d",
      "Average_Daily_Rate_IDR",
      "Estimated_RevPAR"
    ],
    businessImpact: "Menemukan penjual properti terdesak untuk ditawar diskon besar, serta memvalidasi okupansi dan estimasi pendapatan sewa harian riil sebelum mentransfer dana investasi.",
    deliverableFormat: "Laporan analisis kelayakan yield area radius 2 km berformat PDF dan spreadsheet CSV queryable.",
    roiTakeaway: "ROI: Menghemat ratusan juta rupiah saat negosiasi beli dan menghindari aset sewa berkinerja buruk."
  },
  {
    id: "litigation",
    name: "Hukum, Litigasi & Deteksi Kepailitan (PKPU / Pailit)",
    shortName: "Hukum & PKPU",
    icon: Scale,
    targetClient: "Bank Korporat, Konsorsium Kreditur, Kantor Hukum (Law Firm), Auditor Finansial.",
    bleedingNeckPain: "Terlambat mengetahui debitur besar digugat PKPU atau pailit di Pengadilan Niaga, menyebabkan hilangnya hak suara voting restrukturisasi utang miliaran rupiah.",
    dataVectors: [
      "Nomor_Perkara",
      "Pengadilan_Niaga",
      "Nama_Termohon_PKPU",
      "Nama_Pemohon",
      "Tanggal_Daftar",
      "Status_Perkara",
      "Klasifikasi_Utang"
    ],
    businessImpact: "Menjadi pihak pertama yang mendaftarkan piutang resmi sebelum batas waktu verifikasi kurator ditutup oleh pengadilan niaga.",
    deliverableFormat: "Feed alert kepailitan otomatis via email dan Telegram dalam 1 jam setelah perkara tercatat di SIPP.",
    roiTakeaway: "ROI: Mengamankan hak tagih utang bernilai miliaran rupiah sebelum aset debitur disita pihak lain."
  },
  {
    id: "commodities",
    name: "Komoditas Tambang, Energi & Logistik Maritim",
    shortName: "Komoditas & Maritim",
    icon: Ship,
    targetClient: "Trader Batubara/Nikel, Pemilik Armada Tongkang (Tug & Barge), Broker Komoditas.",
    bleedingNeckPain: "Terkena denda keterlambatan sandar kapal (demurrage) puluhan juta rupiah per hari akibat antrean liar di pelabuhan muara atau jalur keluar sungai tambang.",
    dataVectors: [
      "H3_Hex_Cell",
      "Port_Zone_Name",
      "Active_Vessel_Count",
      "Avg_Dwell_Minutes",
      "Rolling_Z_Score",
      "Congestion_Status",
      "MODI_Quota_Delta"
    ],
    businessImpact: "Mengantisipasi hambatan jalur tongkang dari sungai Barito/Mahakam dan memitigasi risiko demurrage 5 hari sebelum kapal kargo tiba di titik labuh.",
    deliverableFormat: "Indeks kepadatan pelabuhan harian berbasis H3 grid via CSV atau Parquet.",
    roiTakeaway: "ROI: Mencegah denda demurrage puluhan juta per hari per kapal tongkang yang menunggu antrean."
  },
  {
    id: "seo",
    name: "SEO & Digital Presence Intelligence",
    shortName: "SEO & Digital Presence",
    icon: Globe,
    targetClient: "Agensi Pemasaran Digital, Brand Korporat B2B, Publisher Berita, Pemilik Jaringan Media.",
    bleedingNeckPain: "Kehilangan pangsa lalu lintas pencarian bernilai miliaran akibat buta terhadap pergeseran algoritma, tidak mengetahui celah kata kunci lawan, atau penurunan peringkat tiba-tiba.",
    dataVectors: [
      "Keyword_Cluster",
      "Search_Volume_Intent",
      "SERP_Competitor_Overlap",
      "Backlink_Toxicity_Score",
      "Core_Web_Vitals_Delta",
      "Estimated_Traffic_Value"
    ],
    businessImpact: "Merekayasa balik strategi SEO kompetitor secara algoritmik, menemukan celah pasar tersembunyi, dan mengoptimalkan aset digital berdasarkan data empiris.",
    deliverableFormat: "Matriks Celah Kata Kunci Excel, Laporan Audit Teknis Situs (PDF), dan Dasbor Monitor Posisi Peringkat Waktu Nyata.",
    roiTakeaway: "ROI: Memangkas biaya iklan berbayar dengan merebut peringkat pencarian organik bernilai tinggi."
  }
];

export default function VerticalHubsMatrix() {
  const [selectedId, setSelectedId] = useState<string>("lpse");
  const activeVertical = VERTICALS.find((v) => v.id === selectedId) || VERTICALS[0];

  return (
    <section className="bg-[#0b0d11] text-[#f3f4f6] py-20 border-b border-white/10" id="vertical-hubs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#8f652e] px-3 py-1 rounded bg-[#141820] border border-[#8f652e]/30">
            <span>MATRIKS SEKTOR // SPESIALISASI INDUSTRI NYATA</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#f3f4f6] tracking-tight">
            Kami Menyelesaikan Masalah Operasional Spesifik, Bukan Menjual Data Abstrak.
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af]">
            Klien membayar mahal karena menghadapi kebocoran laba bersih atau risiko lelang yang mendesak. Pilih sektor industri Anda untuk melihat spesifikasi data dan dampak finansialnya.
          </p>
        </div>

        {/* Tab Buttons (Horizontal Scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-white/10">
          {VERTICALS.map((vertical) => {
            const Icon = vertical.icon;
            const isSelected = vertical.id === selectedId;
            return (
              <button
                key={vertical.id}
                onClick={() => setSelectedId(vertical.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? "bg-[#10b981] text-[#0b0d11] border-[#10b981] font-semibold shadow-lg shadow-[#10b981]/10"
                    : "bg-[#141820] text-[#9ca3af] border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[#0b0d11]" : "text-[#10b981]"}`} />
                <span>{vertical.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="mt-8 rounded-2xl bg-[#141820] border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          <div className="space-y-6">
            
            {/* Title & Target Client */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/10">
              <div className="space-y-1">
                <div className="text-xs font-mono text-[#10b981]">SEKTOR AKTIF // {activeVertical.id.toUpperCase()}</div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#f3f4f6]">
                  {activeVertical.name}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-[#1a202c] border border-white/5 text-xs text-[#9ca3af] max-w-md">
                <span className="text-[#f3f4f6] font-medium font-mono">TARGET KLIEN: </span>
                {activeVertical.targetClient}
              </div>
            </div>

            {/* Bleeding Neck Pain Box */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#ef4444]/5 border border-[#ef4444]/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#ef4444] font-semibold">
                <AlertCircle className="w-4 h-4 text-[#ef4444]" />
                <span>TITIK SAKIT FINANSIAL UTAMA (THE BLEEDING NECK PROBLEM)</span>
              </div>
              <p className="text-sm text-[#f3f4f6]/90 leading-relaxed">
                {activeVertical.bleedingNeckPain}
              </p>
            </div>

            {/* 2-Column: Data Vectors & Business Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Column 1: Exact Data Vectors */}
              <div className="p-5 rounded-xl bg-[#0b0d11] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#10b981]">
                  <FileSpreadsheet className="w-4 h-4 text-[#10b981]" />
                  <span>VEKTOR DATA YANG DISERAHKAN (KOLOM RIIL)</span>
                </div>
                <div className="space-y-1.5 font-mono text-xs text-[#9ca3af]">
                  {activeVertical.dataVectors.map((col, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[#10b981] select-none">&gt;</span>
                      <span className="text-[#f3f4f6]">{col}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Business Impact & Deliverables */}
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-[#1a202c] border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#10b981]">
                    <CheckCircle className="w-4 h-4 text-[#10b981]" />
                    <span>DAMPAK BISNIS TERUKUR</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                    {activeVertical.businessImpact}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0b0d11] border border-white/10 text-xs font-mono space-y-1">
                  <div className="text-[#8f652e]">FORMAT DELIVERABLE RESMI:</div>
                  <div className="text-[#f3f4f6]">{activeVertical.deliverableFormat}</div>
                </div>
              </div>

            </div>

            {/* Measured Takeaway Footer */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#10b981] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span>{activeVertical.roiTakeaway}</span>
              </div>

              <a
                href="#two-stage-guarantee"
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] text-xs font-semibold font-mono transition-all"
              >
                <span>Minta Draf Sampel Sektor Ini</span>
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
