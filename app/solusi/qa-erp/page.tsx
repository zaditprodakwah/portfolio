'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Download, 
  ArrowLeft, 
  ShieldCheck, 
  Layers, 
  Receipt, 
  Boxes, 
  Factory, 
  CheckCircle, 
  HelpCircle, 
  Bug, 
  Filter, 
  Play, 
  ArrowRight, 
  RefreshCw, 
  Code2, 
  FileSpreadsheet, 
  Check, 
  XCircle, 
  Building2, 
  Calculator, 
  Scale, 
  FileCheck2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

type WorkflowType = 'p2p' | 'o2c' | 'mfg' | 'tax';

export default function ERPQAPortfolioPage() {
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowType>('p2p');
  const [activeStep, setActiveStep] = useState<number>(1);
  
  // Simulator State
  const [simScenario, setSimScenario] = useState<'normal' | 'anomaly'>('normal');
  const [simPOQty, setSimPOQty] = useState<number>(100);
  const [simGRQty, setSimGRQty] = useState<number>(80);
  const [simPrice, setSimPrice] = useState<number>(50000);
  const [simIncludeTax, setSimIncludeTax] = useState<boolean>(true);
  const [simWithholdPPh23, setSimWithholdPPh23] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simResult, setSimResult] = useState<{
    verdict: 'PASSED' | 'BLOCKED';
    message: string;
    varianceUnits: number;
    varianceAmount: number;
    journal: Array<{ code: string; name: string; debit: number; credit: number }>;
    taxSummary: { dpp: number; ppn: number; pph23: number; netPayable: number };
  } | null>(null);

  // Run Simulator Function
  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const billedQty = simPOQty;
      const receivedQty = simScenario === 'normal' ? simPOQty : simGRQty;
      const dppReceived = receivedQty * simPrice;
      const dppBilled = billedQty * simPrice;
      const ppn = simIncludeTax ? Math.round(dppReceived * 0.11) : 0;
      const pph23 = simWithholdPPh23 ? Math.round(dppReceived * 0.02) : 0;
      const isMismatch = simScenario === 'anomaly' && billedQty !== receivedQty;

      if (isMismatch) {
        setSimResult({
          verdict: 'BLOCKED',
          message: `AUDIT HOLD: Tagihan Vendor (Qty: ${billedQty} Unit) melebihi Fisik Barang Diterima (Qty: ${receivedQty} Unit). Selisih ${billedQty - receivedQty} Unit senilai Rp ${((billedQty - receivedQty) * simPrice).toLocaleString('id-ID')}. Sistem ERP otomatis menahan (Hold) status pembayaran AP untuk mencegah overpayment.`,
          varianceUnits: billedQty - receivedQty,
          varianceAmount: (billedQty - receivedQty) * simPrice,
          journal: [
            { code: '113100', name: 'Persediaan Barang Dagang (Fisik Diterima)', debit: dppReceived, credit: 0 },
            { code: '211200', name: 'Hutang Belum Ditagih / GRNI (Fisik Diterima)', debit: 0, credit: dppReceived },
            { code: '211200', name: 'Kliring GRNI (Penerimaan Tagihan)', debit: dppReceived, credit: 0 },
            { code: '118100', name: 'PPN Masukan (Faktur Pajak 11%)', debit: ppn, credit: 0 },
            { code: '211100', name: 'Hutang Usaha / AP Vendor (Disetujui Sebagian)', debit: 0, credit: dppReceived + ppn - pph23 },
            ...(pph23 > 0 ? [{ code: '213200', name: 'Hutang PPh Pasal 23 (2%)', debit: 0, credit: pph23 }] : []),
            { code: '211900', name: 'AP Variance Hold (Suspense Selisih Qty)', debit: 0, credit: (billedQty - receivedQty) * simPrice }
          ],
          taxSummary: {
            dpp: dppReceived,
            ppn: ppn,
            pph23: pph23,
            netPayable: dppReceived + ppn - pph23
          }
        });
      } else {
        setSimResult({
          verdict: 'PASSED',
          message: `VERIFIKASI SUKSES: 3-Way Matching sempurna. PO (Qty: ${billedQty}) = GR (Qty: ${receivedQty}) = Tagihan Vendor. Faktur pajak terverifikasi valid, jurnal akuntansi otomatis seimbang, dan tagihan AP lolos ke jadwal pembayaran (Ready for Payment).`,
          varianceUnits: 0,
          varianceAmount: 0,
          journal: [
            { code: '113100', name: 'Persediaan Barang Dagang (Stok Masuk)', debit: dppReceived, credit: 0 },
            { code: '211200', name: 'Hutang Belum Ditagih (GRNI Accrual)', debit: 0, credit: dppReceived },
            { code: '211200', name: 'Kliring GRNI (Saat Tagihan Vendor Masuk)', debit: dppReceived, credit: 0 },
            { code: '118100', name: 'PPN Masukan (Faktur Pajak Masukan 11%)', debit: ppn, credit: 0 },
            { code: '211100', name: 'Hutang Usaha / Accounts Payable Vendor', debit: 0, credit: dppReceived + ppn - pph23 },
            ...(pph23 > 0 ? [{ code: '213200', name: 'Hutang PPh Pasal 23 (Potongan Jasa 2%)', debit: 0, credit: pph23 }] : [])
          ],
          taxSummary: {
            dpp: dppReceived,
            ppn: ppn,
            pph23: pph23,
            netPayable: dppReceived + ppn - pph23
          }
        });
      }
      setIsSimulating(false);
    }, 400);
  };

  // Test Matrix Filter
  const [testFilter, setTestFilter] = useState<'ALL' | 'RETAIL' | 'MANUFACTURING' | 'FINANCE' | 'TAX'>('ALL');

  const testMatrixData = [
    {
      id: 'TC-RTL-001',
      domain: 'RETAIL',
      scenario: 'Negative Inventory Blocking pada POS',
      precondition: 'Stok Item SKU-A di Toko Cabang = 2 Pcs. Kasir 1 & Kasir 2 membuka keranjang serentak.',
      steps: 'Kasir 1 menjual 2 pcs, Kasir 2 menjual 1 pcs secara bersamaan (simultaneous checkout).',
      expected: 'Sistem menolak transaksi Kasir 2 dengan pesan "Stok tidak mencukupi". Jurnal COGS tidak terdistorsi.',
      status: 'PASSED',
      severity: 'CRITICAL'
    },
    {
      id: 'TC-RTL-002',
      domain: 'RETAIL',
      scenario: 'Inter-Warehouse Stock Transfer & In-Transit Cost',
      precondition: 'Gudang Pusat menerbitkan Surat Jalan (DO) 50 unit SKU-B ke Gudang Cabang.',
      steps: 'Validasi status pengiriman: Saat status "In-Transit", stok tidak bertambah di Cabang dan tidak hilang dari laporan aset.',
      expected: 'Terbentuk jurnal otomatis: [113200] Barang Dalam Transit (D) vs [113100] Persediaan Pusat (C). Begitu diterima di Cabang: [113100] Persediaan Cabang (D) vs [113200] Barang Dalam Transit (C).',
      status: 'PASSED',
      severity: 'HIGH'
    },
    {
      id: 'TC-RTL-003',
      domain: 'RETAIL',
      scenario: 'Rekonsiliasi Kas Kasir (POS Cash Drawer Closing & Variance)',
      precondition: 'Shift kasir berakhir dengan total penjualan tunai di sistem Rp 4.500.000.',
      steps: 'Kasir memasukkan hitungan fisik uang kas sebesar Rp 4.480.000 (Selisih Kurang Rp 20.000). Lakukan validasi closing shift.',
      expected: 'Sistem mencatat selisih ke akun penampung: [520300] Beban Selisih Kasir (D) Rp 20.000, [111100] Kas Fisik Toko (D) Rp 4.480.000, [410100] Penjualan Bersih (C) Rp 4.500.000.',
      status: 'PASSED',
      severity: 'MEDIUM'
    },
    {
      id: 'TC-MFG-001',
      domain: 'MANUFACTURING',
      scenario: 'Multi-Level BOM Explode & Raw Material Allocation',
      precondition: 'BOM Meja Kayu (Level 0) terdiri dari 1 Rangka Besi (Level 1) dan 4 Papan Kayu (Level 1).',
      steps: 'Rilis Perintah Kerja (Manufacturing Order) untuk 100 Meja Kayu. Jalankan fungsi "Check Availability".',
      expected: 'Komponen level bawah ter-reservasi otomatis di sistem. Tidak bisa start Work Order jika bahan baku belum release.',
      status: 'PASSED',
      severity: 'CRITICAL'
    },
    {
      id: 'TC-MFG-002',
      domain: 'MANUFACTURING',
      scenario: 'Alokasi Biaya Tenaga Kerja & Overhead Pabrik (FOH Absorption)',
      precondition: 'Work Center Mesin CNC diatur tarif overhead Rp 75.000/jam mesin dan upah operator Rp 35.000/jam kerja.',
      steps: 'Catat pengerjaan Work Order selama 4 jam kerja mesin dan 4 jam operator. Selesaikan status produksi.',
      expected: 'HPP Barang Jadi otomatis menyerap Biaya Bahan Baku + Biaya Tenaga Kerja (Rp 140.000) + Biaya Mesin (Rp 300.000). Jurnal WIP ke Barang Jadi akurat.',
      status: 'PASSED',
      severity: 'HIGH'
    },
    {
      id: 'TC-MFG-003',
      domain: 'MANUFACTURING',
      scenario: 'Pemisahan Akuntansi Scrap Normal vs Scrap Rusak/Abnormal',
      precondition: 'Proses pemotongan plat besi menghasilkan 5% scrap serbuk normal dan 1 plat rusak akibat human-error operator.',
      steps: 'Input pelaporan scrap di Work Order dengan pemisahan flag: Normal Scrap vs Abnormal Loss.',
      expected: 'Scrap normal diabsorpsi menambah nilai HPP unit jadi. Plat rusak akibat error didebit ke akun [520100] Beban Kerusakan Produksi Periode Berjalan (tidak mendistorsi HPP unit jadi).',
      status: 'PASSED',
      severity: 'HIGH'
    },
    {
      id: 'TC-FIN-001',
      domain: 'FINANCE',
      scenario: '3-Way Matching Tolerance & Auto-Hold Payment',
      precondition: 'PO 100 unit @ Rp 50.000. Penerimaan Barang (GR) tercatat 100 unit. Vendor menerbitkan invoice @ Rp 55.000.',
      steps: 'Validasi tagihan vendor di modul Accounts Payable (AP). Sistem diset batas toleransi harga 0%.',
      expected: 'Sistem menandai tagihan dengan status "Variance Hold". Tombol posting pembayaran dikunci hingga disetujui Manager Purchasing via Price Variance Adjustment.',
      status: 'PASSED',
      severity: 'CRITICAL'
    },
    {
      id: 'TC-FIN-002',
      domain: 'FINANCE',
      scenario: 'Rekonsiliasi Akun Perantara GRNI (Goods Received Not Invoiced)',
      precondition: 'Barang diterima 30 September (akhir periode buku), tagihan vendor baru diterima 5 Oktober.',
      steps: 'Cek laporan neraca per 30 September dan bandingkan dengan mutasi persediaan fisik.',
      expected: 'Nilai persediaan bertambah di neraca diimbangi saldo kredit akun [211200] Hutang Belum Ditagih (GRNI). Laporan keuangan akrual tidak understate hutang.',
      status: 'PASSED',
      severity: 'CRITICAL'
    },
    {
      id: 'TC-TAX-001',
      domain: 'TAX',
      scenario: 'Validasi Faktur Pajak PPN 11% & Skema Pembulatan e-Faktur',
      precondition: 'Invoice terdiri dari 15 item dengan pecahan desimal harga DPP (misal Rp 12.333,33 per pcs).',
      steps: 'Bandingkan kalkulasi PPN: Sum(PPN per item) vs (Sum(DPP) x 11%). Ekspor ke format CSV e-Faktur DJP.',
      expected: 'Penerapan pembulatan sesuai regulasi DJP: PPN dihitung dari total DPP per faktur untuk mencegah selisih Rp 1 yang mengakibatkan reject impor e-Faktur.',
      status: 'PASSED',
      severity: 'CRITICAL'
    },
    {
      id: 'TC-TAX-002',
      domain: 'TAX',
      scenario: 'Pemotongan PPh Pasal 23 atas Tagihan Jasa Teknik/Sewa',
      precondition: 'Vendor menerbitkan tagihan jasa pemeliharaan mesin pabrik senilai DPP Rp 20.000.000 + PPN 11% Rp 2.200.000.',
      steps: 'Proses pendaftaran tagihan dengan flag Objek PPh 23 (Tarif 2%). Buat draf pembayaran.',
      expected: 'Sistem memotong PPh 23 sebesar Rp 400.000. Nilai bersih yang dibayarkan ke kas/bank vendor adalah Rp 21.800.000. Akun [213200] Hutang PPh 23 terkredit Rp 400.000.',
      status: 'PASSED',
      severity: 'HIGH'
    },
    {
      id: 'TC-TAX-003',
      domain: 'TAX',
      scenario: 'Penanganan Kode Transaksi Faktur Pajak Khusus (01 vs 02 vs 07)',
      precondition: 'Pelanggan merupakan perusahaan di Kawasan Berikat (Fasilitas PPN Tidak Dipungut).',
      steps: 'Buat Sales Invoice dengan kode transaksi faktur pajak 07 (Fasilitas Kawasan Berikat).',
      expected: 'Sistem tidak membebankan PPN ke piutang pelanggan (Total Tagihan = DPP). Kolom PPN pada CSV e-Faktur otomatis terisi kode fasilitas dan nomor dokumen persetujuan BC.',
      status: 'PASSED',
      severity: 'HIGH'
    }
  ];

  const filteredTestCases = testFilter === 'ALL' 
    ? testMatrixData 
    : testMatrixData.filter(tc => tc.domain === testFilter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900 pb-20">
      
      {/* Top Enterprise Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali</span>
            </Link>
            <span className="text-slate-300">/</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-900">ERP Quality Assurance Lab</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                Enterprise Edition
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/cv"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-lg border border-slate-300 transition-colors shadow-xs"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Lihat CV Resmi</span>
            </Link>

            <a
              href="/Sample_ERP_Test_Case_Matrix.xlsx"
              download="Sample_ERP_Test_Case_Matrix.xlsx"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-3.5 py-2 rounded-lg transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Excel Test Matrix (.xlsx)</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-10">

        {/* Executive Summary Card */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Dokumentasi Pengujian Mutu Sistem ERP • Retail, Manufaktur & Keuangan</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Portofolio Pengujian Fungsional & Kepatuhan Akuntansi ERP
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Pengujian mutu ERP membutuhkan pemahaman bisnis mendalam melebihi sekadar klik tombol antarmuka (*UI testing*). 
                Laporan ini mendemonstrasikan keahlian teknis dalam memverifikasi integritas alur rantai pasok retail dan perakitan manufaktur, 
                rekonsiliasi jurnal otomatis buku besar (*General Ledger*), pencegahan selisih *3-Way Matching*, 
                serta validasi akurasi pelaporan perpajakan Indonesia (PPN 11% e-Faktur dan pemotongan PPh Pasal 23).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:w-80 shrink-0">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <span className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider">Metodologi</span>
                <span className="text-sm font-bold text-slate-900">ISO/IEC 29119</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <span className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider">Basis Sistem</span>
                <span className="text-sm font-bold text-slate-900">Odoo / PostgreSQL</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <span className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider">Jurnal Akrual</span>
                <span className="text-sm font-bold text-emerald-700">100% Balanced</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <span className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider">Format Pajak</span>
                <span className="text-sm font-bold text-indigo-700">e-Faktur DJP Compliant</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: Deep Workflow & General Ledger Visualizer */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                Pilar Alur Bisnis & Pemetaan Akuntansi
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Alur Transaksi & Dampak Jurnal Buku Besar (General Ledger)
              </h2>
            </div>

            {/* Workflow Navigation Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => { setActiveWorkflow('p2p'); setActiveStep(1); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeWorkflow === 'p2p'
                    ? 'bg-white text-indigo-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Receipt className="w-3.5 h-3.5" />
                <span>1. Procure-to-Pay (P2P)</span>
              </button>

              <button
                onClick={() => { setActiveWorkflow('o2c'); setActiveStep(1); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeWorkflow === 'o2c'
                    ? 'bg-white text-indigo-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Boxes className="w-3.5 h-3.5" />
                <span>2. Retail POS & Multi-Gudang</span>
              </button>

              <button
                onClick={() => { setActiveWorkflow('mfg'); setActiveStep(1); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeWorkflow === 'mfg'
                    ? 'bg-white text-indigo-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Factory className="w-3.5 h-3.5" />
                <span>3. Manufaktur & BOM Multi-Level</span>
              </button>

              <button
                onClick={() => { setActiveWorkflow('tax'); setActiveStep(1); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeWorkflow === 'tax'
                    ? 'bg-white text-indigo-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>4. Perpajakan (PPN 11% & PPh 23)</span>
              </button>
            </div>
          </div>

          {/* Workflow Content: P2P */}
          {activeWorkflow === 'p2p' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {[
                  { step: 1, title: 'Purchase Order (PO)', desc: 'Pengikatan komitmen kuantitas & harga kesepakatan' },
                  { step: 2, title: 'Goods Receipt (GRN)', desc: 'Penerimaan fisik barang & pencatatan hutang akrual (GRNI)' },
                  { step: 3, title: 'Vendor Bill (AP Invoice)', desc: 'Validasi 3-way matching dan pengakuan hutang dagang' },
                  { step: 4, title: 'Payment Disbursement', desc: 'Pelunasan tagihan kas/bank dan kliring hutang' }
                ].map((item) => (
                  <button
                    key={item.step}
                    onClick={() => setActiveStep(item.step)}
                    className={`text-left p-3.5 rounded-xl border transition-all ${
                      activeStep === item.step
                        ? 'bg-indigo-50/50 border-indigo-300 ring-1 ring-indigo-200'
                        : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-slate-500 uppercase">Langkah {item.step}</span>
                      {activeStep === item.step && (
                        <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      )}
                    </div>
                    <div className="text-xs font-bold text-slate-900">{item.title}</div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-snug">{item.desc}</div>
                  </button>
                ))}
              </div>

              {/* Step Details & Financial Jurnal Preview */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                      Fokus QA Tahap {activeStep}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      {activeStep === 1 && 'Verifikasi Approval Hierarchy & Currency Precision'}
                      {activeStep === 2 && 'Penerimaan Gudang & Pengakuan Akrual GRNI'}
                      {activeStep === 3 && 'Automated 3-Way Matching & Tax Invoice Verification'}
                      {activeStep === 4 && 'Payment Batching & Bank Reconciliation Clearing'}
                    </h3>
                  </div>
                  <span className="text-xs font-medium text-slate-500">Standar Akuntansi SAK / IFRS</span>
                </div>

                <div className="text-xs text-slate-600 leading-relaxed">
                  {activeStep === 1 && (
                    <p>
                      <strong>Aspek Pengujian:</strong> Batas otorisasi PO bertingkat (misal: PO &gt; Rp 50jt butuh persetujuan Direktur), 
                      penanganan fluktuasi kurs mata uang asing (Multi-currency), serta penguncian harga agar tidak dapat diubah oleh staf gudang saat barang tiba.
                    </p>
                  )}
                  {activeStep === 2 && (
                    <p>
                      <strong>Aspek Pengujian:</strong> Ketika barang diterima sebelum invoice vendor tiba, sistem <strong>tidak boleh</strong> langsung mengkredit Hutang Usaha (AP), 
                      melainkan wajib mengkredit akun perantara <strong>[211200] Hutang Belum Ditagih (Goods Received Not Invoiced / GRNI)</strong>. Hal ini krusial agar neraca akhir bulan tidak *understate liability*.
                    </p>
                  )}
                  {activeStep === 3 && (
                    <p>
                      <strong>Aspek Pengujian:</strong> Sistem membandingkan Qty PO, Qty GR, dan Qty Invoice. Jika kuantitas tagihan melebihi penerimaan fisik, status tagihan otomatis menjadi <em>On-Hold</em>. 
                      Akun GRNI didebit untuk membersihkan saldo akrual dan hutang riil diakui ke vendor bersangkutan.
                    </p>
                  )}
                  {activeStep === 4 && (
                    <p>
                      <strong>Aspek Pengujian:</strong> Validasi nomor rekening vendor, pembayaran parsial (down payment / installment), pemotongan withholding tax (PPh 23), 
                      dan pencatatan selisih kurs realisasi (*Realized Foreign Exchange Gain/Loss*) jika terdapat perbedaan kurs transaksi versus kurs pembayaran.
                    </p>
                  )}
                </div>

                {/* Journal Table for active step */}
                <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                  <div className="bg-slate-100 px-4 py-2 text-[11px] font-bold text-slate-700 uppercase tracking-wider flex justify-between">
                    <span>Jurnal Otomatis yang Terbentuk (Double-Entry Ledger)</span>
                    <span>Status: Real-Time Balanced</span>
                  </div>
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] text-slate-500 font-semibold">
                        <th className="py-2.5 px-4">Kode Akun</th>
                        <th className="py-2.5 px-4">Nama Akun Buku Besar</th>
                        <th className="py-2.5 px-4 text-right">Debit (Rp)</th>
                        <th className="py-2.5 px-4 text-right">Kredit (Rp)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-xs">
                      {activeStep === 1 && (
                        <tr>
                          <td colSpan={4} className="py-3 px-4 text-center font-sans text-slate-500 italic">
                            Tahap PO bersifat komitmen administratif (*Off-Balance Sheet*). Belum ada jurnal keuangan hingga barang fisik atau uang muka ditransaksikan.
                          </td>
                        </tr>
                      )}
                      {activeStep === 2 && (
                        <>
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-2.5 px-4 font-bold text-slate-800">113100</td>
                            <td className="py-2.5 px-4 font-sans text-slate-800">Persediaan Barang Dagang (Stok Masuk)</td>
                            <td className="py-2.5 px-4 text-right font-bold text-emerald-700">5.000.000</td>
                            <td className="py-2.5 px-4 text-right text-slate-400">0</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-2.5 px-4 font-bold text-slate-800">211200</td>
                            <td className="py-2.5 px-4 font-sans text-slate-800">Hutang Belum Ditagih / GRNI Accrual</td>
                            <td className="py-2.5 px-4 text-right text-slate-400">0</td>
                            <td className="py-2.5 px-4 text-right font-bold text-indigo-700">5.000.000</td>
                          </tr>
                        </>
                      )}
                      {activeStep === 3 && (
                        <>
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-2.5 px-4 font-bold text-slate-800">211200</td>
                            <td className="py-2.5 px-4 font-sans text-slate-800">Kliring Hutang Belum Ditagih (GRNI)</td>
                            <td className="py-2.5 px-4 text-right font-bold text-emerald-700">5.000.000</td>
                            <td className="py-2.5 px-4 text-right text-slate-400">0</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-2.5 px-4 font-bold text-slate-800">118100</td>
                            <td className="py-2.5 px-4 font-sans text-slate-800">PPN Masukan (Faktur Pajak 11%)</td>
                            <td className="py-2.5 px-4 text-right font-bold text-emerald-700">550.000</td>
                            <td className="py-2.5 px-4 text-right text-slate-400">0</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-2.5 px-4 font-bold text-slate-800">211100</td>
                            <td className="py-2.5 px-4 font-sans text-slate-800">Hutang Usaha (Accounts Payable Vendor)</td>
                            <td className="py-2.5 px-4 text-right text-slate-400">0</td>
                            <td className="py-2.5 px-4 text-right font-bold text-indigo-700">5.550.000</td>
                          </tr>
                        </>
                      )}
                      {activeStep === 4 && (
                        <>
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-2.5 px-4 font-bold text-slate-800">211100</td>
                            <td className="py-2.5 px-4 font-sans text-slate-800">Hutang Usaha (Pelunasan AP Vendor)</td>
                            <td className="py-2.5 px-4 text-right font-bold text-emerald-700">5.550.000</td>
                            <td className="py-2.5 px-4 text-right text-slate-400">0</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-2.5 px-4 font-bold text-slate-800">111200</td>
                            <td className="py-2.5 px-4 font-sans text-slate-800">Kas & Bank (Pengeluaran Dana Kliring)</td>
                            <td className="py-2.5 px-4 text-right text-slate-400">0</td>
                            <td className="py-2.5 px-4 text-right font-bold text-indigo-700">5.550.000</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Workflow Content: Retail & Multi-Gudang */}
          {activeWorkflow === 'o2c' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="text-xs font-bold text-indigo-700 mb-1">A. Transfer Antar Gudang</div>
                  <div className="text-xs text-slate-600 leading-relaxed">
                    Pengujian status transit stok: Saat barang keluar dari Gudang Pusat, stok berpindah ke akun buku besar 
                    <strong> [113200] Barang Dalam Transit</strong>. Stok baru masuk ke neraca Cabang setelah tim logistik toko melakukan penerimaan fisik.
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="text-xs font-bold text-indigo-700 mb-1">B. Guardrail Stok Negatif</div>
                  <div className="text-xs text-slate-600 leading-relaxed">
                    Mencegah *race condition* saat dua kasir menjual barang yang sama secara bersamaan. 
                    Jika stok fisik = 0, sistem wajib memblokir checkout guna mencegah kerusakan kalkulasi HPP / Moving Average Cost.
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="text-xs font-bold text-indigo-700 mb-1">C. Rekonsiliasi Kas Kasir (Closing Shift)</div>
                  <div className="text-xs text-slate-600 leading-relaxed">
                    Validasi selisih kas fisik di laci kasir (*cash drawer*) versus total penjualan sistem. 
                    Selisih kurang/lebih otomatis dialokasikan ke akun <strong>[520300] Selisih Kasir</strong> untuk audit investigasi.
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                <div className="bg-slate-100 px-4 py-2 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Contoh Jurnal: Penjualan POS Kasir Toko Retail (Tunai & QRIS)
                </div>
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[11px] text-slate-500 font-sans font-semibold">
                      <th className="py-2 px-4">Kode Akun</th>
                      <th className="py-2 px-4">Keterangan Akun</th>
                      <th className="py-2 px-4 text-right">Debit (Rp)</th>
                      <th className="py-2 px-4 text-right">Kredit (Rp)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-slate-800">111110</td>
                      <td className="py-2.5 px-4 font-sans text-slate-800">Kas di Tangan (Kasir POS Toko)</td>
                      <td className="py-2.5 px-4 text-right font-bold text-emerald-700">1.110.000</td>
                      <td className="py-2.5 px-4 text-right text-slate-400">0</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-slate-800">510100</td>
                      <td className="py-2.5 px-4 font-sans text-slate-800">Harga Pokok Penjualan (HPP Perpetual FIFO)</td>
                      <td className="py-2.5 px-4 text-right font-bold text-emerald-700">750.000</td>
                      <td className="py-2.5 px-4 text-right text-slate-400">0</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-slate-800">410100</td>
                      <td className="py-2.5 px-4 font-sans text-slate-800">Pendapatan Penjualan Retail</td>
                      <td className="py-2.5 px-4 text-right text-slate-400">0</td>
                      <td className="py-2.5 px-4 text-right font-bold text-indigo-700">1.000.000</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-slate-800">213100</td>
                      <td className="py-2.5 px-4 font-sans text-slate-800">PPN Keluaran (Faktur Pajak 11%)</td>
                      <td className="py-2.5 px-4 text-right text-slate-400">0</td>
                      <td className="py-2.5 px-4 text-right font-bold text-indigo-700">110.000</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-slate-800">113100</td>
                      <td className="py-2.5 px-4 font-sans text-slate-800">Persediaan Barang Dagang (Pengurangan Fisik)</td>
                      <td className="py-2.5 px-4 text-right text-slate-400">0</td>
                      <td className="py-2.5 px-4 text-right font-bold text-indigo-700">750.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Workflow Content: Manufaktur */}
          {activeWorkflow === 'mfg' && (
            <div className="space-y-5">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">Struktur Pengujian Perakitan & BOM Bertingkat (Discrete Manufacturing):</span>
                Sistem diuji untuk memvalidasi alur pelepasan bahan baku (*Raw Material Issue*), absorpsi biaya tenaga kerja langsung (*Direct Labor*), 
                pembebanan biaya mesin (*Machine Overhead*), serta pemisahan akuntansi limbah produksi: 
                <strong> Scrap Normal</strong> (dibebankan ke HPP produk jadi) versus <strong>Scrap Abnormal/Cacat</strong> (didebit langsung ke Beban Kerusakan Periode Berjalan agar tidak mendistorsi HPP).
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                <div className="bg-slate-100 px-4 py-2 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Siklus Jurnal Akuntansi Biaya Manufaktur (Manufacturing Order Run)
                </div>
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[11px] text-slate-500 font-sans font-semibold">
                      <th className="py-2 px-4">Tahapan Manufaktur</th>
                      <th className="py-2 px-4">Debet (Penambahan Nilai Aset)</th>
                      <th className="py-2 px-4">Kredit (Pengurangan / Alokasi)</th>
                      <th className="py-2 px-4 text-right">Nilai Simulasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2.5 px-4 font-sans font-medium text-slate-800">1. Rilis Bahan Baku</td>
                      <td className="py-2.5 px-4 font-sans text-slate-800">[113300] Barang Dalam Proses (WIP)</td>
                      <td className="py-2.5 px-4 font-sans text-slate-800">[113110] Persediaan Bahan Mentah</td>
                      <td className="py-2.5 px-4 text-right font-bold text-slate-800">Rp 12.500.000</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans font-medium text-slate-800">2. Absorpsi Tenaga Kerja & FOH</td>
                      <td className="py-2.5 px-4 font-sans text-slate-800">[113300] Barang Dalam Proses (WIP)</td>
                      <td className="py-2.5 px-4 font-sans text-slate-800">[510200] Alokasi Biaya Tenaga Kerja & Mesin</td>
                      <td className="py-2.5 px-4 text-right font-bold text-slate-800">Rp 3.800.000</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans font-medium text-slate-800">3. Penyelesaian Barang Jadi</td>
                      <td className="py-2.5 px-4 font-sans text-slate-800">[113400] Persediaan Barang Jadi (FG)</td>
                      <td className="py-2.5 px-4 font-sans text-slate-800">[113300] Kliring Barang Dalam Proses (WIP)</td>
                      <td className="py-2.5 px-4 text-right font-bold text-emerald-700">Rp 16.300.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Workflow Content: Pajak */}
          {activeWorkflow === 'tax' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="text-xs font-bold text-indigo-700 mb-1">A. Kepatuhan PPN 11% & e-Faktur DJP</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pengujian integritas ekspor CSV Faktur Pajak DJP. Sistem diverifikasi agar menerapkan pembulatan 
                    di tingkat faktur untuk menghindari selisih 1 rupiah (<em>Penny Rounding Discrepancy</em>) antara 
                    akumulasi PPN per baris barang dengan PPN total, yang menjadi penyebab utama kegagalan impor aplikasi e-Faktur.
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="text-xs font-bold text-indigo-700 mb-1">B. Pemotongan PPh Pasal 23 (2%)</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pada transaksi jasa teknik, pemeliharaan, atau sewa aset, sistem diuji memotong otomatis PPh 23 sebesar 2% dari DPP. 
                    Jurnal mengkredit akun penampung <strong>[213200] Hutang PPh Pasal 23</strong> dan mengurangi jumlah kas yang dibayarkan ke vendor secara akurat.
                  </p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                <div className="bg-slate-100 px-4 py-2 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Matriks Kode Transaksi Faktur Pajak DJP yang Diuji
                </div>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[11px] text-slate-500 font-semibold">
                      <th className="py-2 px-4">Kode Transaksi</th>
                      <th className="py-2 px-4">Jenis Transaksi Perpajakan</th>
                      <th className="py-2 px-4">Perlakuan PPN di Jurnal</th>
                      <th className="py-2 px-4 text-center">Hasil Uji Impor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    <tr>
                      <td className="py-2.5 px-4 font-mono font-bold text-indigo-700">010</td>
                      <td className="py-2.5 px-4 text-slate-800">Penyerahan kepada Pihak Selain Pemungut PPN (Reguler B2B/B2C)</td>
                      <td className="py-2.5 px-4 text-slate-600">PPN 11% ditagihkan ke pembeli ([213100] PPN Keluaran)</td>
                      <td className="py-2.5 px-4 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          VALID CSV
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-mono font-bold text-indigo-700">020</td>
                      <td className="py-2.5 px-4 text-slate-800">Penyerahan kepada Pemungut Bendaharawan Pemerintah</td>
                      <td className="py-2.5 px-4 text-slate-600">PPN dipungut oleh instansi pemerintah, tidak masuk kas operasional</td>
                      <td className="py-2.5 px-4 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          VALID CSV
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-mono font-bold text-indigo-700">070</td>
                      <td className="py-2.5 px-4 text-slate-800">Penyerahan Kawasan Berikat (Fasilitas PPN Tidak Dipungut)</td>
                      <td className="py-2.5 px-4 text-slate-600">PPN Tidak Dipungut berdasarkan dokumen kepabeanan (BC 4.0)</td>
                      <td className="py-2.5 px-4 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          VALID CSV
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* SECTION 2: Interactive Sandbox / Simulator */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                Simulator Audit Interaktif
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Uji Coba Langsung: Validasi 3-Way Matching & Engine Jurnal Pajak
              </h2>
            </div>
            <span className="text-xs font-medium text-slate-500">Live Simulation Sandbox</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Control Panel */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Pilih Skenario Pengujian:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setSimScenario('normal'); setSimResult(null); }}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all text-center ${
                      simScenario === 'normal'
                        ? 'bg-white text-indigo-700 border-indigo-300 shadow-2xs'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200/60'
                    }`}
                  >
                    1. Normal Matching (PO = GR = Tagihan)
                  </button>
                  <button
                    onClick={() => { setSimScenario('anomaly'); setSimResult(null); }}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all text-center ${
                      simScenario === 'anomaly'
                        ? 'bg-white text-rose-700 border-rose-300 shadow-2xs'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200/60'
                    }`}
                  >
                    2. Selisih Qty (Tagihan &gt; Fisik Masuk)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Qty di Tagihan PO (Vendor):</label>
                  <input
                    type="number"
                    value={simPOQty}
                    onChange={(e) => setSimPOQty(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">Qty Fisik Diterima (GRN):</label>
                  <input
                    type="number"
                    value={simScenario === 'normal' ? simPOQty : simGRQty}
                    disabled={simScenario === 'normal'}
                    onChange={(e) => setSimGRQty(Number(e.target.value))}
                    className={`w-full border rounded-lg px-3 py-1.5 text-xs font-mono font-bold ${
                      simScenario === 'normal'
                        ? 'bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed'
                        : 'bg-white border-rose-300 text-rose-700 focus:outline-hidden focus:ring-1 focus:ring-rose-500'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600">Harga Satuan Unit (DPP):</label>
                <div className="relative">
                  <span className="absolute left-3 top-1.5 text-xs text-slate-400 font-mono">Rp</span>
                  <input
                    type="number"
                    value={simPrice}
                    onChange={(e) => setSimPrice(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs font-mono font-bold text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={simIncludeTax}
                    onChange={(e) => setSimIncludeTax(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <span>Kenakan PPN Masukan 11% (Faktur Pajak Standar)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={simWithholdPPh23}
                    onChange={(e) => setSimWithholdPPh23(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <span>Potong PPh Pasal 23 (2% Transaksi Jasa Pemeliharaan)</span>
                </label>
              </div>

              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2.5 px-4 rounded-lg transition-colors shadow-xs"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Memvalidasi Aturan Bisnis ERP...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Jalankan Validasi 3-Way Match & Jurnal</span>
                  </>
                )}
              </button>
            </div>

            {/* Simulation Results Display */}
            <div className="lg:col-span-7 space-y-4">
              {simResult ? (
                <div className="space-y-4">
                  {/* Verdict Banner */}
                  <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                    simResult.verdict === 'PASSED'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}>
                    {simResult.verdict === 'PASSED' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider mb-0.5">
                        Hasil Audit: {simResult.verdict}
                      </div>
                      <p className="text-xs leading-relaxed">{simResult.message}</p>
                    </div>
                  </div>

                  {/* Financial Summary */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                    <div>
                      <span className="block text-[10px] font-semibold text-slate-500 uppercase">DPP Aktual</span>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        Rp {simResult.taxSummary.dpp.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold text-slate-500 uppercase">PPN 11%</span>
                      <span className="text-xs font-mono font-bold text-indigo-700">
                        Rp {simResult.taxSummary.ppn.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold text-slate-500 uppercase">Potongan PPh 23</span>
                      <span className="text-xs font-mono font-bold text-rose-700">
                        -Rp {simResult.taxSummary.pph23.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold text-slate-500 uppercase">Net Payable AP</span>
                      <span className="text-xs font-mono font-bold text-emerald-700">
                        Rp {simResult.taxSummary.netPayable.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* Generated Journal */}
                  <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                    <div className="bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-700 uppercase tracking-wider flex justify-between">
                      <span>Buku Besar Hasil Simulasi (General Ledger Entry)</span>
                      <span className="text-emerald-700 font-bold">Debit = Credit Valid</span>
                    </div>
                    <table className="w-full text-left text-xs border-collapse font-mono">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-[10px] text-slate-500 font-sans font-semibold">
                          <th className="py-2 px-3">Akun</th>
                          <th className="py-2 px-3">Keterangan</th>
                          <th className="py-2 px-3 text-right">Debit</th>
                          <th className="py-2 px-3 text-right">Kredit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-[11px]">
                        {simResult.journal.map((j, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="py-2 px-3 font-bold text-slate-800">{j.code}</td>
                            <td className="py-2 px-3 font-sans text-slate-700">{j.name}</td>
                            <td className="py-2 px-3 text-right font-bold text-slate-900">
                              {j.debit > 0 ? `Rp ${j.debit.toLocaleString('id-ID')}` : '-'}
                            </td>
                            <td className="py-2 px-3 text-right font-bold text-slate-900">
                              {j.credit > 0 ? `Rp ${j.credit.toLocaleString('id-ID')}` : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[260px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-slate-400">
                  <Calculator className="w-10 h-10 text-slate-300 mb-2" />
                  <div className="text-xs font-semibold text-slate-600">Simulator Menunggu Perintah</div>
                  <div className="text-[11px] text-slate-400 mt-1 max-w-sm">
                    Pilih skenario normal atau selisih di panel kiri, lalu klik &quot;Jalankan Validasi 3-Way Match &amp; Jurnal&quot; untuk mengamati perlakuan audit ERP.
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 3: Formal QA Test Matrix (ISO/IEC 29119 Compliant) */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                Laporan Uji Mutu Terstruktur
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Matriks Test Cases ERP (Sampel 11 dari 142 Skenario)
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
              {(['ALL', 'RETAIL', 'MANUFACTURING', 'FINANCE', 'TAX'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTestFilter(filter)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded transition-all ${
                    testFilter === filter
                      ? 'bg-white text-indigo-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-x-auto bg-white shadow-2xs">
            <table className="w-full text-left text-xs border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[11px] font-semibold">
                  <th className="py-2.5 px-3">Test ID</th>
                  <th className="py-2.5 px-3">Modul</th>
                  <th className="py-2.5 px-4">Skenario &amp; Prekondisi</th>
                  <th className="py-2.5 px-4">Langkah Pengujian</th>
                  <th className="py-2.5 px-4">Hasil yang Diharapkan</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTestCases.map((tc) => (
                  <tr key={tc.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-indigo-700 whitespace-nowrap">
                      {tc.id}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        tc.domain === 'RETAIL' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        tc.domain === 'MANUFACTURING' ? 'bg-sky-50 text-sky-800 border border-sky-200' :
                        tc.domain === 'FINANCE' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                        'bg-purple-50 text-purple-800 border border-purple-200'
                      }`}>
                        {tc.domain}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{tc.scenario}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{tc.precondition}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-[11px] leading-relaxed">
                      {tc.steps}
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-[11px] leading-relaxed">
                      {tc.expected}
                    </td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Check className="w-3 h-3" />
                        <span>PASSED</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              Menampilkan {filteredTestCases.length} skenario pengujian utama. Matriks komprehensif lengkap tersedia dalam format spreadsheet.
            </div>
            <a
              href="/Sample_ERP_Test_Case_Matrix.xlsx"
              download="Sample_ERP_Test_Case_Matrix.xlsx"
              className="inline-flex items-center gap-1.5 font-bold text-indigo-700 hover:text-indigo-800"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Unduh 142 Test Cases Lengkap (.xlsx)</span>
            </a>
          </div>
        </section>

        {/* SECTION 4: Defect Tracking & Root Cause Analysis (RCA) Showcase */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
              Investigasi Teknis Mendalam
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Catatan Cacat (Defect Log) & Analisis Akar Masalah (Root Cause Analysis)
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Contoh riil temuan anomali arsitektural, investigasi kode sumber, dan perbaikan definitif untuk memastikan stabilitas sistem ERP.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Defect 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-700">BUG-ERP-042</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                  CRITICAL / FIXED
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-900">
                Race Condition Stok Negatif pada POS Simultaneous Checkout
              </h3>
              <div className="text-[11px] text-slate-600 space-y-1 leading-snug">
                <div><strong>Gejala:</strong> Dua terminal POS menjual sisa stok 1 unit pada milidetik yang sama, mengakibatkan stok fisik menjadi -1.</div>
                <div><strong>Root Cause:</strong> Kueri validasi ketersediaan barang di PostgreSQL berjalan tanpa baris penguncian (*Row-Level Lock*).</div>
              </div>
              <div className="bg-slate-900 text-slate-100 p-2.5 rounded-lg text-[10px] font-mono overflow-x-auto">
                <div className="text-slate-400">// Solusi: Pessimistic Locking</div>
                SELECT qty_available FROM stock_quant <br />
                WHERE product_id = :id <br />
                <span className="text-emerald-400 font-bold">FOR UPDATE;</span>
              </div>
            </div>

            {/* Defect 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-700">BUG-ERP-089</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  HIGH / RESOLVED
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-900">
                Selisih 1 Rupiah pada Ekspor CSV e-Faktur Multi-Item
              </h3>
              <div className="text-[11px] text-slate-600 space-y-1 leading-snug">
                <div><strong>Gejala:</strong> File CSV Faktur Pajak ditolak DJP dengan pesan kode error pembulatan pajak.</div>
                <div><strong>Root Cause:</strong> Sistem menjumlahkan PPN yang telah dibulatkan per baris alih-alih mengalikan 11% dari total DPP akumulatif.</div>
              </div>
              <div className="bg-slate-900 text-slate-100 p-2.5 rounded-lg text-[10px] font-mono overflow-x-auto">
                <div className="text-slate-400">// Perbaikan Aturan DJP</div>
                total_dpp = sum(lines.mapped(&apos;price_subtotal&apos;))<br />
                <span className="text-emerald-400 font-bold">total_ppn = round(total_dpp * 0.11)</span>
              </div>
            </div>

            {/* Defect 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-700">BUG-ERP-104</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
                  HIGH / RESOLVED
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-900">
                Bypass Penerbitan Bahan Baku pada Work Order Manufaktur
              </h3>
              <div className="text-[11px] text-slate-600 space-y-1 leading-snug">
                <div><strong>Gejala:</strong> Operator dapat mengklik &quot;Done&quot; pada Work Order meskipun bahan baku belum dicatat keluar gudang.</div>
                <div><strong>Root Cause:</strong> Validator backend tidak mengecek status transfer stok bahan sebelum mengubah state pengerjaan.</div>
              </div>
              <div className="bg-slate-900 text-slate-100 p-2.5 rounded-lg text-[10px] font-mono overflow-x-auto">
                <div className="text-slate-400"># Odoo Model Constraint</div>
                @api.constrains(&apos;state&apos;)<br />
                def _check_raw_materials(self):<br />
                &nbsp;&nbsp;if any(m.state != &apos;done&apos; for m in self.move_raw_ids):<br />
                &nbsp;&nbsp;&nbsp;&nbsp;raise ValidationError(&quot;Bahan baku belum tuntas!&quot;)
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Call to Action & Professional Partnership */}
        <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Siap Melaksanakan Audit & Pengujian Menyeluruh Sistem ERP Anda
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tersedia untuk penugasan pengujian fungsional, pembuatan Test Plan &amp; Test Matrix ISO 29119, 
                audit rekonsiliasi jurnal akuntansi, hingga verifikasi integrasi perpajakan Indonesia. 
                Jadwal kerja fleksibel (Office hour weekdays dan siap standby bila dibutuhkan saat rilis akhir pekan).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="/Sample_ERP_Test_Case_Matrix.xlsx"
                download="Sample_ERP_Test_Case_Matrix.xlsx"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Unduh File Excel Matrix</span>
              </a>

              <Link
                href="/cv"
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg border border-slate-700 transition-colors"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Buka CV Lengkap (/cv)</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Corporate Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 text-center text-xs text-slate-500">
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © {new Date().getFullYear()} Zadit • ERP Quality Assurance &amp; Business Systems Consultant
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Standar: ISO/IEC/IEEE 29119</span>
            <span>•</span>
            <span>Akuntansi: SAK / IFRS</span>
            <span>•</span>
            <span>Pajak: Ditjen Pajak RI</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
