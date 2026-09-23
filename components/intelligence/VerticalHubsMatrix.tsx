"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
import { triggerLeadModal } from "./LeadIntakeModal";

interface VerticalData {
  id: string;
  name: string;
  shortName: string;
  icon: React.ElementType;
  targetClient: string;
  coreChallenge: string;
  dataParameters: string[];
  operationalBenefits: string;
  deliveryFormat: string;
  valueTakeaway: string;
}

const VERTICALS: VerticalData[] = [
  {
    id: "lpse",
    name: "Pengadaan Pemerintah & Lelang Tender (LPSE / LKPP)",
    shortName: "Pengadaan & Tender",
    icon: Building2,
    targetClient: "Kontraktor Konstruksi, Vendor Pengadaan Barang/Jasa, Distributor Alat Kesehatan.",
    coreChallenge: "Banyak kontraktor kehilangan kesempatan lelang tender bernilai miliaran rupiah karena ratusan portal LPSE kementerian dan pemerintah daerah terpisah, sering mengalami gangguan server, dan tidak memiliki sistem notifikasi terpusat.",
    dataParameters: [
      "Kode dan Nama Paket Tender",
      "Instansi dan Lokasi Pengadaan",
      "Pagu Anggaran dan Nilai HPS",
      "Persyaratan Kualifikasi KBLI / SBU",
      "Batas Waktu Pendaftaran",
      "Estimasi Pola Penawaran Pemenang Terdahulu di Dinas Terkait"
    ],
    operationalBenefits: "Menerima pemberitahuan tender baru di Telegram atau WhatsApp dalam hitungan menit sejak penayangan, lengkap dengan perkiraan persentase penawaran harga optimal agar Anda tidak mengajukan penawaran secara asal menebak.",
    deliveryFormat: "Pemberitahuan bot Telegram setiap kali ada tender baru dan rekap spreadsheet Excel terverifikasi setiap minggu.",
    valueTakeaway: "Nilai Manfaat: Memenangkan satu paket tender bernilai ratusan juta rupiah sudah jauh melampaui investasi sistem pemantauan ini."
  },
  {
    id: "automotive",
    name: "Otomotif, Pembiayaan Multifinance & Gadai BPKB",
    shortName: "Otomotif & Leasing",
    icon: Car,
    targetClient: "Perusahaan Pembiayaan (Multifinance), Balai Lelang Kendaraan, Dealer Mobil Bekas.",
    coreChallenge: "Menaksir nilai pasar agunan BPKB kendaraan secara manual rawan keliru. Saat nasabah mengalami kredit macet, unit kendaraan sitaan terpaksa dilelang rugi karena batas pencairan awal ditetapkan terlalu tinggi.",
    dataParameters: [
      "Merek, Model, dan Varian Kendaraan",
      "Tahun Pembuatan dan Jenis Transmisi",
      "Harga Median Pasar Aktual",
      "Lama Tayang Listing (Days on Market)",
      "Tren Kurva Depresiasi Harga Bulanan"
    ],
    operationalBenefits: "Menetapkan plafon pencairan pinjaman aman (Loan-to-Value terukur) berdasarkan harga pasar transaksi riil, meminimalkan potensi kerugian saat kendaraan jaminan harus dilelang.",
    deliveryFormat: "Akses endpoint API taksiran nilai pasar kendaraan atau berkas kurva depresiasi bulanan berformat CSV/Excel.",
    valueTakeaway: "Nilai Manfaat: Menjaga batas aman pembiayaan dan mencegah kerugian lelang puluhan juta per unit kendaraan."
  },
  {
    id: "ecommerce",
    name: "E-Commerce & Intelijen Pasar Ritel Online",
    shortName: "E-Commerce & Retail",
    icon: ShoppingBag,
    targetClient: "Pemilik Brand (FMCG, Skincare, Fashion, Elektronik), Star Seller, Distributor Resmi.",
    coreChallenge: "Perang harga akibat reseller tidak resmi yang menjual di bawah harga acuan resmi (MAP) merusak margin distributor, sementara ketiadaan pemantauan stok pesaing membuat Anda melewatkan lonjakan permintaan saat barang pesaing habis.",
    dataParameters: [
      "ID dan Judul Produk Pesaing",
      "Nama Toko dan Identitas Penjual",
      "Harga Jual Saat Ini vs Batas Harga Resmi",
      "Indikator Pelanggaran Harga Acuan",
      "Perkiraan Unit Terjual per Siklus",
      "Estimasi Nilai Transaksi per Kategori"
    ],
    operationalBenefits: "Mendapatkan bukti tangkapan layar otomatis untuk menertibkan reseller yang merusak harga pasar, serta langsung meningkatkan alokasi iklan promosi saat stok barang pesaing utama habis untuk merebut pembeli yang aktif mencari.",
    deliveryFormat: "Laporan mingguan lembar kerja bersih dan notifikasi instan saat terdeteksi pelanggaran harga atau kehabisan stok.",
    valueTakeaway: "Nilai Manfaat: Menjaga stabilitas harga jaringan distribusi dan menyerap transaksi saat kompetitor tidak siap stok."
  },
  {
    id: "property",
    name: "Properti, Real Estate & Villa Sewa Harian",
    shortName: "Properti & Villa",
    icon: Home,
    targetClient: "Investor Properti, Pengelola Villa Wisata, Family Office, Pengembang Perumahan.",
    coreChallenge: "Membeli unit apartemen atau villa sewa harian berdasarkan janji tingkat okupansi sepihak dari agen, padahal tingkat keterisian kamar aslinya rendah dan kawasan sekitar mengalami kelebihan pasokan.",
    dataParameters: [
      "Identitas dan Lokasi Listing Properti",
      "Lama Tayang di Pasar (Days on Market > 180 Hari)",
      "Riwayat Penurunan Harga yang Diajukan Penjual",
      "Tingkat Okupansi Riil 90 Hari Terakhir",
      "Rata-rata Tarif Harian (Average Daily Rate)",
      "Estimasi Pendapatan Kamar Tersedia (RevPAR)"
    ],
    operationalBenefits: "Menemukan penjual properti yang listing-nya sudah lama tidak terjual untuk dinegosiasi dengan diskon signifikan, serta memvalidasi potensi keuntungan sewa secara objektif sebelum menandatangani perjanjian pembelian.",
    deliveryFormat: "Laporan kelayakan investasi properti radius 2 km berformat PDF ringkas dan lembar kerja data CSV.",
    valueTakeaway: "Nilai Manfaat: Menghindarkan Anda dari investasi properti salah beli dan membuka ruang tawar harga lebih menguntungkan."
  },
  {
    id: "litigation",
    name: "Hukum, Litigasi Niaga & Deteksi Dini Kepailitan",
    shortName: "Hukum & Kepailitan",
    icon: Scale,
    targetClient: "Bank Korporasi, Tim Kreditur, Kantor Hukum (Law Firm), Auditor Finansial.",
    coreChallenge: "Terlambat mengetahui mitra bisnis atau debitur besar didaftarkan perkara PKPU atau Pailit di Pengadilan Niaga, yang dapat berakibat hilangnya hak suara resmi dalam rapat restrukturisasi piutang bernilai miliaran rupiah.",
    dataParameters: [
      "Nomor Registrasi Perkara",
      "Pengadilan Niaga Terkait",
      "Nama Termohon dan Pemohon PKPU/Pailit",
      "Tanggal Pendaftaran Resmi",
      "Klasifikasi dan Status Terkini Perkara"
    ],
    operationalBenefits: "Menjadi pihak pertama yang mendaftarkan tagihan piutang resmi sebelum tenggat waktu verifikasi kurator ditutup, sehingga hak hukum dan pengembalian dana perusahaan tetap terlindungi.",
    deliveryFormat: "Pemberitahuan otomatis via email atau Telegram dalam beberapa jam setelah perkara terdaftar resmi di pengadilan.",
    valueTakeaway: "Nilai Manfaat: Memastikan kepastian hak tagih piutang perusahaan sebelum aset debitur disita pihak lain."
  },
  {
    id: "commodities",
    name: "Komoditas Pertambangan, Energi & Logistik Maritim",
    shortName: "Komoditas & Maritim",
    icon: Ship,
    targetClient: "Trader Batubara dan Mineral, Pemilik Armada Tongkang, Perusahaan Ekspedisi Laut.",
    coreChallenge: "Terkena beban denda keterlambatan sandar kapal (demurrage) puluhan juta rupiah per hari akibat antrean kapal yang menumpuk di pelabuhan muara atau jalur keluar sungai tambang tanpa peringatan dini.",
    dataParameters: [
      "Zona Area Labuh Heksagonal",
      "Nama Area Pelabuhan atau Muara",
      "Jumlah Armada Aktif Terpantau",
      "Rata-rata Waktu Tunggu (Dwell-Time)",
      "Status Kepadatan dibandingkan Kondisi Wajar",
      "Pergerakan Perubahan Kuota Ekspor"
    ],
    operationalBenefits: "Mengantisipasi hambatan antrean kapal di muara sungai utama beberapa hari sebelum armada tiba, sehingga rute tongkang atau jadwal pengiriman dapat disesuaikan untuk memangkas risiko denda tunggu kapal.",
    deliveryFormat: "Indeks kepadatan pelabuhan harian dalam lembar kerja spreadsheet atau feed notifikasi data otomatis.",
    valueTakeaway: "Nilai Manfaat: Menghemat biaya denda tunggu puluhan juta per hari per kapal yang mengantre di pelabuhan."
  },
  {
    id: "seo",
    name: "SEO Teknis & Visibilitas Pencarian Digital",
    shortName: "SEO & Kehadiran Web",
    icon: Globe,
    targetClient: "Brand Korporat B2B, Agensi Pemasaran Digital, Pemilik Portal Berita dan Media.",
    coreChallenge: "Kehilangan potensi calon klien bernilai besar karena tidak mengetahui kata kunci pencarian yang sedang direbut pesaing atau penurunan peringkat pencarian yang tidak segera disadari.",
    dataParameters: [
      "Klaster Kata Kunci Bernilai Konversi Tinggi",
      "Volume dan Minat Pencarian Pengguna",
      "Tingkat Persaingan Hasil Pencarian (SERP)",
      "Skor Kesehatan Tautan Eksternal (Backlink)",
      "Metrik Kecepatan Web (Core Web Vitals)"
    ],
    operationalBenefits: "Menemukan celah kata kunci pencarian yang belum digarap pesaing dan merapikan struktur web berbasis data konkret untuk meningkatkan kunjungan calon pembeli tanpa terus bergantung pada iklan berbayar.",
    deliveryFormat: "Matriks Celah Kata Kunci Excel, Laporan Rekomendasi Teknis, dan Dasbor Pemantau Peringkat Berkala.",
    valueTakeaway: "Nilai Manfaat: Memangkas ketergantungan biaya iklan dengan membangun saluran pencarian organik yang menghasilkan prospek berkelanjutan."
  }
];

export default function VerticalHubsMatrix() {
  const [selectedId, setSelectedId] = useState<string>("lpse");
  const activeVertical = VERTICALS.find((v) => v.id === selectedId) || VERTICALS[0];

  return (
    <section className="bg-[#0b0d11] text-[#f3f4f6] py-16 sm:py-24 border-b border-white/10" id="sektor">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#8f652e] px-3 py-1 rounded-full bg-[#141820] border border-[#8f652e]/30">
            <span>SOLUSI BERDASARKAN SEKTOR USAHA</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#f3f4f6] tracking-tight">
            Solusi Terarah untuk Kebutuhan Spesifik Industri Anda
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
            Setiap industri menghadapi risiko operasional yang berbeda, mulai dari keterlambatan info tender lelang hingga persaingan harga yang menekan margin. Pilih sektor usaha Anda untuk melihat parameter data yang kami pantau dan manfaat langsungnya untuk bisnis Anda.
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? "bg-[#10b981] text-[#0b0d11] border-[#10b981] font-semibold shadow-lg shadow-[#10b981]/20 scale-[1.02]"
                    : "bg-[#141820] text-[#9ca3af] border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[#0b0d11]" : "text-[#10b981]"}`} />
                <span>{vertical.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display with Motion Animation */}
        <div className="mt-8 rounded-2xl bg-[#141820] border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVertical.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Title & Target Client */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/10">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-[#10b981]">SEKTOR AKTIF // {activeVertical.shortName.toUpperCase()}</div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#f3f4f6]">
                    {activeVertical.name}
                  </h3>
                </div>
                <div className="p-3 rounded-xl bg-[#1a202c] border border-white/5 text-xs text-[#9ca3af] max-w-md">
                  <span className="text-[#f3f4f6] font-medium font-mono">Relevan untuk: </span>
                  {activeVertical.targetClient}
                </div>
              </div>

              {/* Core Challenge Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#ef4444]/5 border border-[#ef4444]/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#ef4444] font-semibold">
                  <AlertCircle className="w-4 h-4 text-[#ef4444]" />
                  <span>TANTANGAN UTAMA DI LAPANGAN:</span>
                </div>
                <p className="text-sm text-[#f3f4f6]/90 leading-relaxed">
                  {activeVertical.coreChallenge}
                </p>
              </div>

              {/* 2-Column: Data Parameters & Operational Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Column 1: Exact Data Parameters */}
                <div className="p-5 rounded-xl bg-[#0b0d11] border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#10b981]">
                    <FileSpreadsheet className="w-4 h-4 text-[#10b981]" />
                    <span>PARAMETER DATA YANG ANDA TERIMA:</span>
                  </div>
                  <div className="space-y-1.5 font-mono text-xs text-[#9ca3af]">
                    {activeVertical.dataParameters.map((col, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-[#10b981] select-none">&bull;</span>
                        <span className="text-[#f3f4f6]">{col}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Operational Benefits & Delivery Format */}
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-[#1a202c] border border-white/5 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#10b981]">
                      <CheckCircle className="w-4 h-4 text-[#10b981]" />
                      <span>MANFAAT LANGSUNG UNTUK OPERASIONAL:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                      {activeVertical.operationalBenefits}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0b0d11] border border-white/10 text-xs font-mono space-y-1">
                    <div className="text-[#8f652e]">FORMAT PENGIRIMAN:</div>
                    <div className="text-[#f3f4f6]">{activeVertical.deliveryFormat}</div>
                  </div>
                </div>

              </div>

              {/* Value Takeaway Footer */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-mono text-[#10b981] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span>{activeVertical.valueTakeaway}</span>
                </div>

                <button
                  type="button"
                  onClick={() => triggerLeadModal({ 
                    sector: activeVertical.name, 
                    plan: "Pratinjau Sampel " + activeVertical.shortName 
                  })}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] text-xs font-semibold transition-all shadow-md shadow-[#10b981]/10 cursor-pointer"
                >
                  <span>Minta Contoh Data Sektor Ini</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
