"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FileSpreadsheet,
  Layers,
  Box,
  Download,
  Calculator,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Compass
} from "lucide-react";

export default function CadEstimatorInteractiveViewer() {
  const [activeTab, setActiveTab] = useState<"excel" | "autocad" | "sketchup">("excel");

  // Dynamic Mini-Calculator for Billboard Size
  const [panelWidth, setPanelWidth] = useState<number>(8);
  const [panelHeight, setPanelHeight] = useState<number>(4);
  const [poleHeight, setPoleHeight] = useState<number>(6);

  const panelArea = panelWidth * panelHeight;
  const poleWeight = poleHeight * 94; // approx kg for 14" seamless pipe
  const estimatedSubtotal = 2070000 + (panelArea * 520000) + (poleWeight * 42500) + 17155200;
  const estimatedPpn = estimatedSubtotal * 0.11;
  const estimatedTotal = estimatedSubtotal + estimatedPpn;

  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verifikasi Lingkungan Kerja Asli (Native UI)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Lingkungan Kerja AutoCAD 2D, SketchUp 3D &amp; Excel RAB
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Eksplorasi contoh nyata dokumen kerja siap tender untuk konstruksi reklame billboard 4x8 meter di Kota Cirebon. Dilengkapi rumus kalkulasi aktif tanpa selisih hitung material.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("excel")}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === "excel"
                ? "bg-emerald-700 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>1. Excel 365 RAB</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("autocad")}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === "autocad"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>2. AutoCAD 2026</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sketchup")}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === "sketchup"
                ? "bg-rose-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3. SketchUp 3D</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Microsoft Excel 365 View */}
      {activeTab === "excel" && (
        <div className="space-y-6">
          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md bg-white">
            <img
              src="/cad-estimator/excel_rab_window.svg"
              alt="Tampilan Antarmuka Microsoft Excel 365 RAB Terformula"
              className="w-full h-auto block"
            />
          </div>

          {/* Technical Specs & Dynamic Calculator */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Bedah Formula Aktif OpenXML (Tanpa Selisih Hitung)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                  <div className="text-slate-500">Sel F18 (Angkur Baut):</div>
                  <div className="font-bold text-emerald-700">=D18*E18</div>
                  <div className="text-slate-600 text-[11px] font-sans">Volume (16 btg) x Harga Satuan AHSP PUPR Cirebon</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                  <div className="text-slate-500">Sel F25 (Subtotal):</div>
                  <div className="font-bold text-emerald-700">=SUM(F15:F24)</div>
                  <div className="text-slate-600 text-[11px] font-sans">Akumulasi seluruh item persiapan, pondasi, dan baja</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                  <div className="text-slate-500">Sel F26 (PPN 11%):</div>
                  <div className="font-bold text-emerald-700">=F25*11%</div>
                  <div className="text-slate-600 text-[11px] font-sans">Penyesuaian tarif PPN resmi UU HPP No. 7/2021</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                  <div className="text-slate-500">Sel F27 (Total Tender):</div>
                  <div className="font-bold text-emerald-700">=F25+F26</div>
                  <div className="text-slate-600 text-[11px] font-sans">Nilai penawaran akhir siap lampirkan dokumen lelang</div>
                </div>
              </div>
            </div>

            {/* Interactive Calculator Box */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-700" />
                Simulasi Ukuran Reklame Lain
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-700 font-medium block mb-1">Lebar Panel: {panelWidth} Meter</label>
                  <input
                    type="range"
                    min="3"
                    max="12"
                    value={panelWidth}
                    onChange={(e) => setPanelWidth(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-medium block mb-1">Tinggi Panel: {panelHeight} Meter</label>
                  <input
                    type="range"
                    min="2"
                    max="6"
                    value={panelHeight}
                    onChange={(e) => setPanelHeight(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-medium block mb-1">Elevasi Tiang: {poleHeight} Meter</label>
                  <input
                    type="range"
                    min="4"
                    max="12"
                    value={poleHeight}
                    onChange={(e) => setPoleHeight(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>

              <div className="border-t border-emerald-200 pt-3">
                <div className="text-xs text-slate-600">Estimasi Total (+ PPN 11%):</div>
                <div className="text-lg font-bold font-mono text-emerald-800">
                  Rp {Math.round(estimatedTotal).toLocaleString("id-ID")}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: AutoCAD 2026 Model Space View */}
      {activeTab === "autocad" && (
        <div className="space-y-6">
          <div className="rounded-xl overflow-hidden border border-slate-700 shadow-md bg-slate-900">
            <img
              src="/cad-estimator/autocad_window.svg"
              alt="Tampilan AutoCAD 2026 Model Space 2D"
              className="w-full h-auto block"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="font-bold text-slate-900">Sistem Layer ACI Standar</div>
              <p className="text-slate-600">
                Pemisahan tegas: Merah untuk kolom struktur &amp; angkur, Cyan untuk pipa baja &amp; siku bracing, Hijau untuk dimensi, dan Kuning untuk teks notasi.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="font-bold text-slate-900">Dimensi Ber-Arsir 45°</div>
              <p className="text-slate-600">
                Standar gambar kerja arsitektur dan struktur (*architectural ticks*), tanpa panah mekanikal yang membingungkan tukang di lapangan.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="font-bold text-slate-900">Kop Gambar (Title Block) Resmi</div>
              <p className="text-slate-600">
                Memuat identitas proyek, skala terkalibrasi 1:50, nama drafter resmi, dan status gambar AS-PLANNED siap cetak lembar A3 atau A4.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: SketchUp Pro 3D Perspective View */}
      {activeTab === "sketchup" && (
        <div className="space-y-6">
          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md bg-white">
            <img
              src="/cad-estimator/sketchup_window.svg"
              alt="Tampilan SketchUp Pro 2026 Perspektif Fasad 3D"
              className="w-full h-auto block"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="font-bold text-slate-900">Cakrawala Langit &amp; Tanah</div>
              <p className="text-slate-600">
                Gaya default arsitektur SketchUp dengan gradasi langit biru lembut ke putih dan bidang tanah netral, memudahkan visualisasi konteks lingkungan tapak.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="font-bold text-slate-900">Bayangan Jatuh Matahari 45°</div>
              <p className="text-slate-600">
                Simulasi pencahayaan matahari riil (pukul 14:00 WIB) untuk menguji bayangan panel terhadap jalan raya dan keselamatan rambu lalu lintas.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="font-bold text-slate-900">Figur Skala Manusia 1.75 M</div>
              <p className="text-slate-600">
                Memastikan proporsi pondasi telapak, ketinggian tangga monyet, dan elevasi bebas tiang pipa 14 inci mudah dipahami klien awam.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Download Action Bar */}
      <div className="p-6 bg-slate-900 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-sm font-bold text-emerald-400">Unduh Paket Berkas Kerja Asli</div>
          <p className="text-xs text-slate-300">
            Dapatkan berkas mentah DXF, dokumen lembar kerja Excel terformula, dan kartu portofolio cetak.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/cad-estimator/konstruksi_pylon_sign___billboard_4x8_meter_rab.xlsx"
            download
            className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Excel RAB (.XLSX)</span>
          </a>
          <a
            href="/cad-estimator/konstruksi_pylon_sign___billboard_4x8_meter.dxf"
            download
            className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>AutoCAD (.DXF)</span>
          </a>
          <a
            href="/cad-estimator/PORTFOLIO_DRAFTER_ESTIMATOR.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lembar PDF</span>
          </a>
        </div>
      </div>
    </section>
  );
}

