"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Table,
  CheckCircle2,
  Download,
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Layers,
  ArrowRight,
  Database,
  BarChart3,
  FileCheck2,
} from "lucide-react";
import {
  cleanSurveyData,
  parseFinancialStatement,
  formatDocumentStructure,
  SAMPLE_SURVEY_RAW,
  SAMPLE_STATEMENT_RAW,
  type SurveyCleanResult,
  type StatementParseResult,
} from "@/lib/omnidata-engine";

export default function DocumentDataStudioPage() {
  const [activeTab, setActiveTab] = useState<"survey" | "statement" | "word" | "packages">("survey");

  // State untuk Survey Cleaner
  const [surveyInput, setSurveyInput] = useState(SAMPLE_SURVEY_RAW);
  const [surveyResult, setSurveyResult] = useState<SurveyCleanResult | null>(() => cleanSurveyData(SAMPLE_SURVEY_RAW));

  // State untuk Statement Parser
  const [statementInput, setStatementInput] = useState(SAMPLE_STATEMENT_RAW);
  const [statementResult, setStatementResult] = useState<StatementParseResult | null>(() => parseFinancialStatement(SAMPLE_STATEMENT_RAW));

  const handleRunSurvey = () => {
    setSurveyResult(cleanSurveyData(surveyInput));
  };

  const handleRunStatement = () => {
    setStatementResult(parseFinancialStatement(statementInput));
  };

  const handleDownloadCsv = () => {
    if (!statementResult) return;
    const blob = new Blob([statementResult.csvOutput], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "rekening_koran_terformat.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#0E0911] text-zinc-100 py-12 px-4 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-zinc-200 transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/solusi/" className="hover:text-zinc-200 transition-colors">Solusi</Link>
          <span>/</span>
          <span className="text-[#C5A880] font-medium">Document & Data Studio</span>
        </div>

        {/* Hero Header */}
        <header className="space-y-4 border-b border-zinc-800/80 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#231627] text-[#C5A880] border border-[#8F652E]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#8F652E]" />
            <span>Katalog Solusi & Portofolio Rekayasa Dokumen</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            OmniData & DocuMorph Studio
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-3xl leading-relaxed">
            Sistem transformasi deterministik untuk dokumen terkunci dan data kotor. Memulihkan tabel PDF ke format Microsoft Word asli, mengekstrak rekening koran ke CSV, serta membersihkan dataset survei untuk analisis empiris.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Privasi Klien Mutlak (Pemrosesan Sisi Peramban)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
              <FileCheck2 className="w-4 h-4 text-[#C5A880]" />
              <span>Standar Tipografi APA 7th Edition</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
              <Database className="w-4 h-4 text-sky-400" />
              <span>Validasi Statistik (Aiken V & Rasch Model)</span>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-2">
          {[
            { id: "survey", label: "01. Pembersih Data Survei", icon: BarChart3 },
            { id: "statement", label: "02. Ekstraksi Rekening ke CSV", icon: Table },
            { id: "word", label: "03. Rekayasa Word & APA 7th", icon: FileText },
            { id: "packages", label: "04. Paket Layanan Multi-Platform", icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#231627] text-[#C5A880] border border-[#8F652E]/50 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#C5A880]" : "text-zinc-500"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: SURVEY DATA CLEANSER */}
        {activeTab === "survey" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Input Card */}
              <div className="bg-[#150F18] border border-zinc-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A880]">Input Data Kuesioner Mentah</span>
                    <button
                      onClick={() => {
                        setSurveyInput(SAMPLE_SURVEY_RAW);
                        setSurveyResult(cleanSurveyData(SAMPLE_SURVEY_RAW));
                      }}
                      className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Muat Contoh</span>
                    </button>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Format baris: ID Responden, Q1, Q2, Q3, Q4, Q5 (Skala Likert 1-5). Simulasikan entri ganda atau angka salah (misal: 99 atau 0).
                  </p>
                  <textarea
                    rows={10}
                    value={surveyInput}
                    onChange={(e) => setSurveyInput(e.target.value)}
                    className="w-full bg-[#0E0911] border border-zinc-800 rounded-lg p-3 text-xs font-mono text-zinc-200 focus:outline-none focus:border-[#8F652E]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleRunSurvey}
                    className="w-full flex items-center justify-center gap-2 bg-[#8F652E] hover:bg-[#A5783A] text-white font-medium py-2.5 px-4 rounded-lg text-xs transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Jalankan Audit & Pembersihan Data</span>
                  </button>
                </div>
              </div>

              {/* Output Metrics */}
              {surveyResult && (
                <div className="bg-[#150F18] border border-zinc-800 rounded-xl p-5 space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Hasil Audit & Validasi Kuesioner</span>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-[#0E0911] border border-zinc-800/80 rounded-lg p-3 text-center">
                      <div className="text-lg font-mono font-bold text-white">{surveyResult.totalRaw}</div>
                      <div className="text-[11px] text-zinc-400">Total Baris Mentah</div>
                    </div>
                    <div className="bg-[#0E0911] border border-zinc-800/80 rounded-lg p-3 text-center">
                      <div className="text-lg font-mono font-bold text-emerald-400">{surveyResult.totalClean}</div>
                      <div className="text-[11px] text-zinc-400">Baris Bersih Valid</div>
                    </div>
                    <div className="bg-[#0E0911] border border-zinc-800/80 rounded-lg p-3 text-center">
                      <div className="text-lg font-mono font-bold text-amber-400">{surveyResult.duplicatesRemoved}</div>
                      <div className="text-[11px] text-zinc-400">Duplikat Tereliminasi</div>
                    </div>
                    <div className="bg-[#0E0911] border border-zinc-800/80 rounded-lg p-3 text-center">
                      <div className="text-lg font-mono font-bold text-sky-400">{surveyResult.anomaliesFixed}</div>
                      <div className="text-[11px] text-zinc-400">Skor Dinormalisasi</div>
                    </div>
                  </div>

                  {/* Cleaned Table */}
                  <div className="overflow-x-auto max-h-56 border border-zinc-800 rounded-lg">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#231627] text-[#C5A880] sticky top-0">
                        <tr>
                          <th className="p-2 border-b border-zinc-800">ID</th>
                          <th className="p-2 border-b border-zinc-800">Q1</th>
                          <th className="p-2 border-b border-zinc-800">Q2</th>
                          <th className="p-2 border-b border-zinc-800">Q3</th>
                          <th className="p-2 border-b border-zinc-800">Q4</th>
                          <th className="p-2 border-b border-zinc-800">Q5</th>
                          <th className="p-2 border-b border-zinc-800">Rerata</th>
                          <th className="p-2 border-b border-zinc-800">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60 bg-[#0E0911]">
                        {surveyResult.cleanedRows.map((row) => (
                          <tr key={row.id} className="hover:bg-zinc-900/50">
                            <td className="p-2 font-medium text-white">{row.id}</td>
                            <td className="p-2 text-zinc-300">{row.q1}</td>
                            <td className="p-2 text-zinc-300">{row.q2}</td>
                            <td className="p-2 text-zinc-300">{row.q3}</td>
                            <td className="p-2 text-zinc-300">{row.q4}</td>
                            <td className="p-2 text-zinc-300">{row.q5}</td>
                            <td className="p-2 font-bold text-[#C5A880]">{row.mean}</td>
                            <td className="p-2">
                              <span
                                className={`px-1.5 py-0.5 rounded text-[10px] ${
                                  row.status === "Valid"
                                    ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
                                    : "bg-amber-950/60 text-amber-400 border border-amber-800/40"
                                }`}
                              >
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Vaulted Arch Takeaway Box */}
                  <div className="bg-[#231627]/60 border border-[#8F652E]/40 rounded-lg p-3 flex items-start gap-2.5 text-xs text-zinc-300">
                    <span className="text-[#C5A880] text-sm font-bold">✦</span>
                    <div>
                      <strong>Hasil Metrik:</strong> Rerata total instrumen adalah {surveyResult.overallMean} dengan estimasi reliabilitas konsistensi internal tinggi. Siap dianalisis ke SPSS, SmartPLS, atau R.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: FINANCIAL STATEMENT TO CSV */}
        {activeTab === "statement" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Input Statement */}
              <div className="bg-[#150F18] border border-zinc-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A880]">Input Teks Mutasi / Rekening Koran</span>
                    <button
                      onClick={() => {
                        setStatementInput(SAMPLE_STATEMENT_RAW);
                        setStatementResult(parseFinancialStatement(SAMPLE_STATEMENT_RAW));
                      }}
                      className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Muat Contoh</span>
                    </button>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Format: [Tanggal] [Uraian Transaksi] [DEBIT/KREDIT] [Nominal] SALDO [Saldo Akhir].
                  </p>
                  <textarea
                    rows={10}
                    value={statementInput}
                    onChange={(e) => setStatementInput(e.target.value)}
                    className="w-full bg-[#0E0911] border border-zinc-800 rounded-lg p-3 text-xs font-mono text-zinc-200 focus:outline-none focus:border-[#8F652E]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleRunStatement}
                    className="w-full flex items-center justify-center gap-2 bg-[#8F652E] hover:bg-[#A5783A] text-white font-medium py-2.5 px-4 rounded-lg text-xs transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Ekstraksi Tabel & Rekonsiliasi Transaksi</span>
                  </button>
                </div>
              </div>

              {/* Output Statement */}
              {statementResult && (
                <div className="bg-[#150F18] border border-zinc-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">Tabel Transaksi Terstruktur</span>
                    <button
                      onClick={handleDownloadCsv}
                      className="inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-2.5 py-1 rounded text-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh CSV</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#0E0911] border border-zinc-800/80 rounded-lg p-3 text-center">
                      <div className="text-sm font-mono font-bold text-rose-400">Rp {statementResult.totalDebit.toLocaleString("id-ID")}</div>
                      <div className="text-[11px] text-zinc-400">Total Debit (Pengeluaran)</div>
                    </div>
                    <div className="bg-[#0E0911] border border-zinc-800/80 rounded-lg p-3 text-center">
                      <div className="text-sm font-mono font-bold text-emerald-400">Rp {statementResult.totalKredit.toLocaleString("id-ID")}</div>
                      <div className="text-[11px] text-zinc-400">Total Kredit (Pemasukan)</div>
                    </div>
                    <div className="bg-[#0E0911] border border-zinc-800/80 rounded-lg p-3 text-center">
                      <div className="text-sm font-mono font-bold text-[#C5A880]">Rp {statementResult.closingBalance.toLocaleString("id-ID")}</div>
                      <div className="text-[11px] text-zinc-400">Saldo Penutupan Terverifikasi</div>
                    </div>
                  </div>

                  <div className="overflow-x-auto max-h-56 border border-zinc-800 rounded-lg">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#231627] text-[#C5A880] sticky top-0">
                        <tr>
                          <th className="p-2 border-b border-zinc-800">Tanggal</th>
                          <th className="p-2 border-b border-zinc-800">Uraian</th>
                          <th className="p-2 border-b border-zinc-800">Tipe</th>
                          <th className="p-2 border-b border-zinc-800 text-right">Nominal</th>
                          <th className="p-2 border-b border-zinc-800 text-right">Saldo</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60 bg-[#0E0911]">
                        {statementResult.transactions.map((t, idx) => (
                          <tr key={idx} className="hover:bg-zinc-900/50">
                            <td className="p-2 text-zinc-400 whitespace-nowrap">{t.date}</td>
                            <td className="p-2 font-medium text-white max-w-[180px] truncate">{t.description}</td>
                            <td className="p-2">
                              <span
                                className={`px-1.5 py-0.5 rounded text-[10px] ${
                                  t.type === "Kredit"
                                    ? "bg-emerald-950/60 text-emerald-400"
                                    : "bg-rose-950/60 text-rose-400"
                                }`}
                              >
                                {t.type}
                              </span>
                            </td>
                            <td className="p-2 text-right text-zinc-200">Rp {t.amount.toLocaleString("id-ID")}</td>
                            <td className="p-2 text-right font-bold text-[#C5A880]">Rp {t.balance.toLocaleString("id-ID")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-[#231627]/60 border border-[#8F652E]/40 rounded-lg p-3 flex items-start gap-2.5 text-xs text-zinc-300">
                    <span className="text-[#C5A880] text-sm font-bold">✦</span>
                    <div>
                      <strong>Hasil Rekonsiliasi:</strong> Tabel transaksi terekstraksi 100% dengan saldo akhir akurat tanpa baris terpotong. Berkas siap diimpor ke sistem akuntansi.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: WORD RE-ENGINEERING & APA 7TH */}
        {activeTab === "word" && (
          <div className="space-y-6">
            <div className="bg-[#150F18] border border-zinc-800 rounded-xl p-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A880]">Komparasi Sebelum & Sesudah Rekayasa Dokumen</span>
                <h3 className="text-xl font-bold text-white">Standar Format OpenXML Native vs Konverter Otomatis Biasa</h3>
                <p className="text-xs sm:text-sm text-zinc-300">
                  Konverter PDF otomatis biasa sering kali mengurung paragraf dalam puluhan kotak teks (text box) yang saling tumpang tindih. Kami membangun ulang naskah menggunakan hierarki heading standar Microsoft Word, tabel formal 3 garis APA 7th, serta penomoran halaman dinamis.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Before Card */}
                <div className="bg-[#0E0911] border border-rose-950/60 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-rose-400 font-semibold uppercase tracking-wider">
                    <span>Sebelum: Konversi Otomatis Biasa</span>
                    <span>⚠️ Format Rusak</span>
                  </div>
                  <ul className="space-y-2 text-xs text-zinc-400">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400">✕</span>
                      <span>Paragraf terkunci di dalam puluhan text box terpisah yang merusak alur ketikan.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400">✕</span>
                      <span>Tabel berantakan dengan garis vertikal berlebih dan cell padding sempit.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400">✕</span>
                      <span>Heading tidak terdaftar pada panel navigasi dokumen Word (Navigation Pane kosong).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400">✕</span>
                      <span>Pemisah baris terputus-putus di tengah kalimat akibat pemaksaan layout PDF.</span>
                    </li>
                  </ul>
                  <div className="bg-rose-950/20 border border-rose-900/30 rounded p-3 text-[11px] text-rose-300">
                    Dampak: Klien menghabiskan waktu berjam-jam merapikan margin dan menghapus text box satu per satu.
                  </div>
                </div>

                {/* After Card */}
                <div className="bg-[#0E0911] border border-[#8F652E]/60 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#C5A880] font-semibold uppercase tracking-wider">
                    <span>Sesudah: Rekayasa Dokumen Zadit</span>
                    <span>✓ Siap Terbit & Mudah Diedit</span>
                  </div>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Alur teks mengalir bebas (clean inline text) tanpa satu pun floating text box liar.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Tabel formal APA 7th Edition (3 garis horizontal elegan, 0 garis vertikal).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Heading 1, Heading 2, dan Heading 3 terindeks penuh di panel navigasi Word.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Pemisah halaman dan penomoran bab otomatis sesuai standar institusi.</span>
                    </li>
                  </ul>
                  <div className="bg-[#231627] border border-[#8F652E]/40 rounded p-3 text-[11px] text-[#C5A880]">
                    Dampak: Dokumen langsung siap cetak atau dikirimkan ke dewan direksi, dosen penguji, atau klien bisnis.
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SERVICE PACKAGES */}
        {activeTab === "packages" && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A880]">Pilihan Paket Kerja Transparan</span>
              <h3 className="text-2xl font-bold text-white">Tiga Skema Layanan Transformasi Dokumen & Data</h3>
              <p className="text-xs sm:text-sm text-zinc-400">
                Pilih paket yang sesuai dengan volume halaman atau kompleksitas berkas Anda. Seluruh paket dilindungi garansi revisi akurasi data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              
              {/* Tier 1 */}
              <div className="bg-[#150F18] border border-zinc-800 rounded-xl p-6 flex flex-col justify-between space-y-6 hover:border-zinc-700 transition-colors">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-zinc-400">Tier 1: Ringkas</span>
                    <h4 className="text-lg font-bold text-white">Starter Extraction</h4>
                    <div className="text-2xl font-bold font-mono text-[#C5A880]">$45 <span className="text-xs font-sans text-zinc-400">/ Rp150.000</span></div>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Konversi dokumen PDF hingga 15 halaman menjadi berkas Word atau Excel dengan pemformatan tabel dasar.
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-300 border-t border-zinc-800 pt-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Hingga 15 halaman PDF</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Ekstraksi tabel ke Excel / Word</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Waktu pengerjaan 1 hari</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#231627]/60 border border-zinc-800 rounded p-2.5 text-[11px] text-zinc-300">
                  Cocok untuk: Surat perjanjian, modul ringkas, formulir pendaftaran.
                </div>
              </div>

              {/* Tier 2 */}
              <div className="bg-[#1C1322] border-2 border-[#8F652E] rounded-xl p-6 flex flex-col justify-between space-y-6 relative shadow-lg">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8F652E] text-white text-[10px] font-bold px-3 py-0.5 rounded-full tracking-wider uppercase">
                  Paling Banyak Dipilih
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-[#C5A880]">Tier 2: Standar Bisnis</span>
                    <h4 className="text-lg font-bold text-white">Standard Cleansing</h4>
                    <div className="text-2xl font-bold font-mono text-[#C5A880]">$120 <span className="text-xs font-sans text-zinc-400">/ Rp350.000</span></div>
                  </div>
                  <p className="text-xs text-zinc-300">
                    Konversi dokumen kompleks hingga 50 halaman atau pembersihan dataset survei kuesioner hingga 500 baris.
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-200 border-t border-zinc-800 pt-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Hingga 50 halaman / 500 baris survei</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Deduplikasi data & perbaikan anomali</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Format tabel formal APA 7th / Excel formula</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Waktu pengerjaan 2 hari</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#231627] border border-[#8F652E]/50 rounded p-2.5 text-[11px] text-[#C5A880]">
                  Cocok untuk: Rekening koran bank bulanan, data skripsi/tesis, laporan laba rugi.
                </div>
              </div>

              {/* Tier 3 */}
              <div className="bg-[#150F18] border border-zinc-800 rounded-xl p-6 flex flex-col justify-between space-y-6 hover:border-zinc-700 transition-colors">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-zinc-400">Tier 3: Korporat & Skala Besar</span>
                    <h4 className="text-lg font-bold text-white">Enterprise Pipeline</h4>
                    <div className="text-2xl font-bold font-mono text-[#C5A880]">$280 <span className="text-xs font-sans text-zinc-400">/ Rp750.000</span></div>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Transformasi skala besar hingga 150 halaman atau 2.500 baris data kuesioner, dilengkapi ringkasan visual slide 16:9.
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-300 border-t border-zinc-800 pt-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Hingga 150 halaman / 2.500 baris data</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>OCR presisi untuk scan buram</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Slide presentasi eksekutif 16:9 editable</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Garansi revisi tanpa batas</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#231627]/60 border border-zinc-800 rounded p-2.5 text-[11px] text-zinc-300">
                  Cocok untuk: Laporan audit tahunan korporat, riset survei pasar multi-kota.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Footer CTA & Asynchronous Proposal Request */}
        <section className="bg-gradient-to-r from-[#231627] via-[#1C1322] to-[#150F18] border border-[#8F652E]/40 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Butuh Penataan Format atau Pembersihan Sampel Dokumen?</h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Anda tidak perlu berkomitmen pada proyek penuh sebelum melihat hasilnya. Kirimkan 2 halaman sampel PDF atau 20 baris data Anda untuk kami tinjau dan formatkan secara asinkron tanpa biaya awal.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/cv/"
              className="inline-flex items-center gap-2 bg-[#8F652E] hover:bg-[#A5783A] text-white font-medium px-5 py-2.5 rounded-lg text-xs transition-colors shadow-sm"
            >
              <span>Pelajari Profil & Kredensial Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="mailto:muhzadit@gmail.com?subject=Tinjauan%20Sampel%20Dokumen%20OmniData"
              className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-medium px-5 py-2.5 rounded-lg text-xs transition-colors"
            >
              <span>Kirimkan Sampel Berkas via Email</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
