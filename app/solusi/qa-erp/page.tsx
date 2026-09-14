'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Download, 
  ExternalLink, 
  ArrowLeft, 
  ShieldCheck, 
  Layers, 
  Database, 
  Receipt, 
  Boxes, 
  Factory, 
  CheckCircle,
  HelpCircle,
  Search,
  Bug,
  Filter
} from 'lucide-react';

interface TestCase {
  id: string;
  module: 'p2p' | 'o2c' | 'mfg' | 'finance' | 'retail';
  moduleLabel: string;
  title: string;
  severity: 'Blocker' | 'Critical' | 'Major';
  precondition: string;
  steps: string[];
  testData: string;
  expectedResult: string;
  actualResult: string;
  status: 'PASSED' | 'RESOLVED';
}

interface BugReport {
  id: string;
  module: string;
  title: string;
  severity: 'Blocker' | 'Critical' | 'Major';
  rootCause: string;
  impact: string;
  resolution: string;
}

const TEST_CASES: TestCase[] = [
  {
    id: 'TC-P2P-001',
    module: 'p2p',
    moduleLabel: 'Purchasing (P2P)',
    title: 'Validasi 3-Way Matching (PO vs Penerimaan Gudang vs Tagihan Vendor)',
    severity: 'Critical',
    precondition: 'PO #PO-2026-008 status Confirmed (100 unit @ Rp50.000 + PPN 11%). Good Receipt fisik baru masuk 60 unit.',
    steps: [
      'Gudang memvalidasi penerimaan fisik sebanyak 60 unit.',
      'Finance menerima tagihan vendor (Vendor Bill) sejumlah 100 unit.',
      'Finance mencoba memvalidasi dan menjadwalkan auto-payment untuk 100 unit.'
    ],
    testData: 'PO Qty: 100, GR Qty: 60, Vendor Bill Qty: 100',
    expectedResult: 'Sistem menahan status pembayaran (Payment Hold) dan memunculkan Quantity Variance Alert karena tagihan melebihi bukti fisik penerimaan.',
    actualResult: 'Sistem memblokir approval pembayaran otomatis dan mewajibkan revisi tagihan atau persetujuan deviasi dari supervisor.',
    status: 'PASSED'
  },
  {
    id: 'TC-O2C-002',
    module: 'o2c',
    moduleLabel: 'Sales & POS (O2C)',
    title: 'Pencegahan Stok Negatif (Negative Stock) pada Checkout Multi-Gudang',
    severity: 'Blocker',
    precondition: 'Produk SKU-KECAP-01 di Gudang Toko A tersisa 5 unit, Gudang Pusat memiliki 100 unit.',
    steps: [
      'Buka antarmuka kasir / sales order Toko A.',
      'Input kuantitas penjualan 7 unit produk SKU-KECAP-01.',
      'Klik tombol Konfirmasi / Bayar.'
    ],
    testData: 'SKU: SKU-KECAP-01, Request Qty: 7, Gudang: Toko A',
    expectedResult: 'Sistem memblokir transaksi dengan notifikasi "Stok Tidak Mencukupi (Tersedia: 5 unit)", atau memicu auto-transfer request antar gudang.',
    actualResult: 'Muncul alert validasi stok fisik, checkout tertahan, dan saldo inventaris gudang tidak berubah menjadi minus (-2).',
    status: 'PASSED'
  },
  {
    id: 'TC-MFG-003',
    module: 'mfg',
    moduleLabel: 'Manufaktur & BOM',
    title: 'Kalkulasi HPP Multi-Level BOM & Alokasi Scrap Abnormal',
    severity: 'Major',
    precondition: 'BOM Produk Roti: Tepung (Rp10.000), Telur (Rp5.000), Gula (Rp3.000), Overhead Rp2.000. Toleransi scrap standar 5%.',
    steps: [
      'Terbitkan Perintah Produksi (Manufacturing Order) 1.000 unit.',
      'Input realisasi kerugian bahan (scrap) sebesar 8% (3% melebihi batas toleransi).',
      'Selesaikan Work Order (Mark as Done).'
    ],
    testData: 'MO #MO-9901, Actual Scrap: 8% (Excess: 3%)',
    expectedResult: 'HPP finished goods menyerap scrap normal, sedangkan selisih 3% dialokasikan ke akun Beban Kerugian Produksi tanpa menggelembungkan nilai stok persediaan.',
    actualResult: 'Jurnal Work-in-Progress (WIP) tereliminasi seimbang, nilai HPP finished goods akurat Rp20.600/unit, dan selisih kerugian tercatat rapi di beban usaha.',
    status: 'PASSED'
  },
  {
    id: 'TC-ACC-004',
    module: 'finance',
    moduleLabel: 'Finance & Akuntansi',
    title: 'Validasi Jurnal Otomatis saat Penerimaan Barang (Accrued Liabilities / GRNI)',
    severity: 'Critical',
    precondition: 'PO pengadaan barang dagang senilai Rp10.000.000 berstatus konfirmasi.',
    steps: [
      'Staf gudang mengklik "Validate" pada Surat Penerimaan Barang (Goods Receipt).',
      'Buka modul Accounting -> Buku Jurnal Umum (General Ledger).',
      'Verifikasi akun penampung sementara dan balance debit/kredit.'
    ],
    testData: 'GR #WH/IN/0042, Nilai PO: Rp10.000.000',
    expectedResult: 'Terbentuk jurnal otomatis secara real-time: Debit Persediaan Rp10.000.000 dan Kredit Hutang Belum Ditagih (GRNI) Rp10.000.000, tanpa mendebit akun Kas/Bank sebelum ada tagihan lunas.',
    actualResult: 'Jurnal terbentuk instan, posisi neraca balance, dan buku besar persediaan langsung termutasi.',
    status: 'PASSED'
  },
  {
    id: 'TC-TAX-005',
    module: 'finance',
    moduleLabel: 'Pajak & Invoicing',
    title: 'Perhitungan Akurat PPN 11% & Pemotongan PPh 23 (2%) pada Faktur Gabungan',
    severity: 'Critical',
    precondition: 'Faktur vendor berisi Sparepart Rp5.000.000 (Objek PPN 11%) dan Jasa Servis Rp1.000.000 (Objek PPN 11% + PPh 23 2%).',
    steps: [
      'Input tagihan dengan dua baris akun beban terpisah (Barang vs Jasa Teknik).',
      'Aktifkan flag PPh 23 pada baris jasa servis.',
      'Validasi ringkasan DPP, PPN, PPh pasal 23, dan Net Payable.'
    ],
    testData: 'Barang: Rp5.000.000, Jasa: Rp1.000.000',
    expectedResult: 'Total DPP Rp6.000.000, PPN Rp660.000, Potongan PPh 23 Rp20.000. Total transfer ke vendor pas Rp6.640.000, dan terbentuk akun Hutang Pajak PPh 23 sebesar Rp20.000.',
    actualResult: 'Kalkulasi presisi tanpa selisih pembulatan 1 rupiah pun, dan laporan SPT Masa Pajak siap diekspor.',
    status: 'PASSED'
  },
  {
    id: 'TC-RET-006',
    module: 'retail',
    moduleLabel: 'Retail & POS',
    title: 'Alur Retur Penjualan (Credit Note) & Alokasi Stok ke Lokasi Karantina',
    severity: 'Major',
    precondition: 'Pelanggan mengajukan retur barang cacat atas Invoice #INV-2026-112 senilai Rp1.500.000.',
    steps: [
      'Terbitkan Retur Penjualan (Sales Return) dengan referensi nomor invoice asal.',
      'Pilih lokasi penyimpanan: Gudang Karantina / Scrap (bukan gudang pajangan toko).',
      'Terbitkan Credit Note untuk pengembalian dana / saldo deposit pembeli.'
    ],
    testData: 'SKU: SKU-ELEK-99, Nilai: Rp1.500.000',
    expectedResult: 'Piutang pelanggan berkurang Rp1.500.000, stok barang masuk ke karantina (tidak bisa terjual di kasir), dan jurnal balik HPP terposting otomatis.',
    actualResult: 'Kartu stok dan saldo piutang terupdate sesuai, mutasi fisik terisolasi dari kasir POS.',
    status: 'PASSED'
  }
];

const BUG_REPORTS: BugReport[] = [
  {
    id: 'BUG-ERP-089',
    module: 'Accounting & Pajak',
    title: 'Selisih Pembulatan (Rounding Error) Rp1 pada Faktur Pajak e-Faktur Multi-Item',
    severity: 'Critical',
    rootCause: 'Fungsi pajak menghitung round(subtotal * 0.11) di setiap baris item secara terpisah sebelum dijumlahkan, bukan sum(subtotal) * 0.11.',
    impact: 'Gagal impor ke aplikasi e-Faktur Ditjen Pajak karena terdapat selisih nominal Rp1 - Rp3 pada faktur bernilai ganjil.',
    resolution: 'Refactor formula kalkulasi pajak ke standard Half-Up pada basis DPP akumulatif dan menambahkan akun penampung rounding difference.'
  },
  {
    id: 'BUG-ERP-092',
    module: 'Inventory & POS',
    title: 'Race Condition Stok Minus saat 2 Kasir Melakukan Checkout Unit Terakhir Bersamaan',
    severity: 'Blocker',
    rootCause: 'Validasi sisa stok hanya dilakukan di memory cache frontend browser tanpa adanya database atomic row-locking (SELECT FOR UPDATE).',
    impact: 'Stok gudang berubah menjadi minus (-1) dan terjadi pesanan ganda untuk 1 unit barang fisik.',
    resolution: 'Implementasi database transaction level locking dan atomic stock deduction pada trigger validasi order.'
  },
  {
    id: 'BUG-ERP-095',
    module: 'Manufacturing / MRP',
    title: 'Work Order Dapat Ditandai "Done" Padahal Alokasi Bahan Baku Belum Di-consume',
    severity: 'Major',
    rootCause: 'Bypass validasi pada tombol batch-completion di antarmuka web yang tidak memverifikasi flag konsumsi komponen BOM.',
    impact: 'Nilai persediaan barang jadi bertambah namun stok bahan mentah tidak berkurang, mengakibatkan HPP laporan keuangan terdistorsi.',
    resolution: 'Menambahkan interceptor validator di backend yang menolak penutupan status Work Order jika ada komponen BOM yang belum tuntas di-consume.'
  }
];

export default function ERPQAPortfolioPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'p2p' | 'o2c' | 'mfg' | 'finance' | 'retail'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTestCases = TEST_CASES.filter((tc) => {
    const matchesTab = activeTab === 'all' || tc.module === activeTab;
    const matchesSearch = 
      tc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tc.moduleLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tc.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-white pb-20">
      {/* Top Navbar */}
      <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl transition-colors border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-mono font-semibold text-teal-400">Solusi & Portofolio QA ERP</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/cv"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl border border-slate-700 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-teal-400" />
              <span>Buka CV Resmi (/cv)</span>
            </Link>

            <a
              href="/Sample_ERP_Test_Case_Matrix.xlsx"
              download="Sample_ERP_Test_Case_Matrix.xlsx"
              className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-white bg-teal-600 hover:bg-teal-500 px-4 py-2 rounded-xl shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh File Excel (.xlsx)</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 space-y-10">
        {/* Profile & Header Banner */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-850 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4 max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-teal-950/80 text-teal-300 border border-teal-800/80">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>QA Tester ERP Terverifikasi • Tersedia Fulltime & Standby Discord</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Portofolio & Sampel Uji Sistem ERP: <br className="hidden sm:inline" />
              <span className="text-teal-400">Retail, Manufaktur & Akuntansi Otomatis</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Dokumen ini mendemonstrasikan metodologi pengujian fungsional *End-to-End* pada aplikasi ERP 
              (berbasis arsitektur kustom dan ekosistem Odoo). Mencakup validasi integritas data rantai pasok, 
              stok fisik multi-gudang, jurnal akuntansi otomatis, hingga kepatuhan faktur pajak Indonesia (PPN 11% & PPh 23).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl">
                <span className="block text-[11px] font-mono text-slate-400">Ketersediaan</span>
                <span className="text-xs font-bold text-teal-300">Office Hour Weekdays + Weekend</span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl">
                <span className="block text-[11px] font-mono text-slate-400">Metodologi</span>
                <span className="text-xs font-bold text-white">ISO/IEEE 29119 QA Standard</span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl">
                <span className="block text-[11px] font-mono text-slate-400">Kanal Komunikasi</span>
                <span className="text-xs font-bold text-white">Discord, GitHub, Jira</span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl">
                <span className="block text-[11px] font-mono text-slate-400">Presisi Finansial</span>
                <span className="text-xs font-bold text-teal-300">Zero Rounding Error</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Core Pillars of ERP Testing */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-400" />
            <span>Alur Cakupan Pengujian Bisnis ERP</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400 font-mono text-xs font-bold">
                01
              </div>
              <h3 className="font-bold text-sm text-white">Procure-to-Pay (P2P)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pengadaan barang, Purchase Order, validasi fisik Good Receipt, dan verifikasi 3-Way Matching invoice sebelum pembayaran.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400 font-mono text-xs font-bold">
                02
              </div>
              <h3 className="font-bold text-sm text-white">Order-to-Cash (O2C) & POS</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sales quotation, integrasi kasir toko ritel, alur surat jalan pengiriman (DO), dan pencegahan negative stock antar lokasi.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400 font-mono text-xs font-bold">
                03
              </div>
              <h3 className="font-bold text-sm text-white">Manufaktur & BOM (MRP)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bill of Materials bertingkat, penugasan Work Order, pencatatan konsumsi bahan baku aktual, dan alokasi scrap abnormal.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400 font-mono text-xs font-bold">
                04
              </div>
              <h3 className="font-bold text-sm text-white">Akuntansi & Pajak Otomatis</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Validasi akun penampung sementara (GRNI), posting balance debit/kredit, perhitungan PPN 11%, dan pemotongan PPh 21/23.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Test Case Matrix Section */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-teal-400" />
                <span>Sampel Matriks Uji Fungsional (Test Case Matrix)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Filter berdasarkan modul atau cari skenario spesifik. Format lengkap tersedia di file Excel terlampir.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari skenario uji..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-500"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { key: 'all', label: 'Semua Modul' },
              { key: 'p2p', label: 'Purchasing (P2P)' },
              { key: 'o2c', label: 'Sales & Kasir (O2C)' },
              { key: 'mfg', label: 'Manufaktur (BOM)' },
              { key: 'finance', label: 'Akuntansi & Pajak' },
              { key: 'retail', label: 'Retur & Multi-Gudang' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-teal-600 text-white shadow-xs font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Test Case Cards List */}
          <div className="space-y-4">
            {filteredTestCases.map((tc) => (
              <div
                key={tc.id}
                className="bg-slate-950 border border-slate-800/90 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-850 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded-md border border-teal-800">
                        {tc.id}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">[{tc.moduleLabel}]</span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-white">{tc.title}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full font-bold border ${
                        tc.severity === 'Blocker'
                          ? 'bg-red-950/80 text-red-300 border-red-800'
                          : tc.severity === 'Critical'
                          ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                          : 'bg-blue-950/80 text-blue-300 border-blue-800'
                      }`}
                    >
                      {tc.severity}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                      {tc.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2 bg-slate-900/60 p-3.5 rounded-xl border border-slate-850">
                    <span className="font-mono font-semibold text-slate-400 block">Kondisi Awal (Pre-conditions):</span>
                    <p className="text-slate-300 leading-relaxed">{tc.precondition}</p>

                    <span className="font-mono font-semibold text-slate-400 block pt-1">Langkah Pengujian (Steps to Reproduce):</span>
                    <ol className="list-decimal list-inside space-y-1 text-slate-300">
                      {tc.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="space-y-2 bg-slate-900/60 p-3.5 rounded-xl border border-slate-850">
                    <span className="font-mono font-semibold text-slate-400 block">Hasil yang Diharapkan (Expected Result):</span>
                    <p className="text-emerald-300/90 leading-relaxed">{tc.expectedResult}</p>

                    <span className="font-mono font-semibold text-slate-400 block pt-1">Hasil Pengujian Aktual (Actual Result):</span>
                    <p className="text-slate-200 leading-relaxed">{tc.actualResult}</p>
                  </div>
                </div>
              </div>
            ))}

            {filteredTestCases.length === 0 && (
              <div className="text-center py-12 text-slate-500 text-xs">
                Tidak ada skenario uji yang cocok dengan kata kunci tersebut.
              </div>
            )}
          </div>
        </section>

        {/* Real Defect & Bug Tracking Showcase */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Bug className="w-5 h-5 text-red-400" />
              <span>Studi Kasus Penanganan Bug Kritis (Defect Log)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Contoh riil analisis akar masalah (*Root Cause Analysis*) pada kasus ketidaksinkronan pajak dan stok.
            </p>
          </div>

          <div className="space-y-4">
            {BUG_REPORTS.map((bug) => (
              <div
                key={bug.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-red-400 bg-red-950/70 border border-red-800 px-2 py-0.5 rounded-md">
                      {bug.id}
                    </span>
                    <span className="text-xs text-slate-400">[{bug.module}]</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800 px-2.5 py-0.5 rounded-full">
                    RESOLVED
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white">{bug.title}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850">
                    <span className="font-mono text-slate-400 block text-[11px] font-semibold mb-1">Akar Masalah (Root Cause):</span>
                    <p className="text-slate-300">{bug.rootCause}</p>
                  </div>

                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850">
                    <span className="font-mono text-slate-400 block text-[11px] font-semibold mb-1">Dampak Bisnis (Impact):</span>
                    <p className="text-amber-300/90">{bug.impact}</p>
                  </div>

                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850">
                    <span className="font-mono text-slate-400 block text-[11px] font-semibold mb-1">Solusi & Verifikasi (Fix):</span>
                    <p className="text-emerald-300/90">{bug.resolution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA / Action Strip */}
        <section className="bg-gradient-to-r from-teal-950/80 to-slate-900 border border-teal-800/60 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="font-bold text-white text-base sm:text-lg">
              Siap Memulai Pengujian Sistem ERP Anda Hari Ini
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Tersedia untuk sesi sinkronisasi Discord, pengujian end-to-end berkala, dan penyusunan Test Plan terstruktur.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/cv"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-teal-400" />
              <span>Lihat CV Lengkap</span>
            </Link>

            <a
              href="/Sample_ERP_Test_Case_Matrix.xlsx"
              download="Sample_ERP_Test_Case_Matrix.xlsx"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-heading font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Excel Matrix</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
