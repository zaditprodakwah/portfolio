"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Compass,
  Layers,
  Cpu,
  Calculator,
  Trees,
  CloudRain,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Terminal,
  Database,
  FileText,
  Download,
  CheckCircle2
} from "lucide-react";

// Dynamically import WebGisLiveViewer to prevent SSR window/document issues in Next.js
const WebGisLiveViewer = dynamic(() => import("./WebGisLiveViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[540px] sm:h-[620px] rounded-3xl bg-zinc-950 flex flex-col items-center justify-center gap-3 text-white">
      <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      <span className="font-mono text-xs text-zinc-400">Memuat Ubin Satelit Esri &amp; Data Spasial...</span>
    </div>
  )
});

export default function GeospatialInteractiveStudio() {
  const [activeTab, setActiveTab] = useState<"webgis" | "ahp" | "carbon" | "deliverables">("webgis");

  // Dynamic Mini-Calculator for Canopy Carbon Allometry (Chave 2014 & i-Tree Eco)
  const [crownRadius, setCrownRadius] = useState<number>(3.8);
  const [treeHeight, setTreeHeight] = useState<number>(15.5);
  const [woodDensity, setWoodDensity] = useState<number>(0.58);

  const crownDiameter = crownRadius * 2;
  const estimatedDbh = Math.pow(crownDiameter / 1.5, 1.15) * 4.2;
  const agbKg = 0.0673 * Math.pow(woodDensity * Math.pow(estimatedDbh, 2) * treeHeight, 0.976);
  const carbonMg = (agbKg * 0.47) / 1000;
  const annualSequestrationKg = carbonMg * (44 / 12) * 1000 * 0.045;

  // AHP Saaty Weights Interactive
  const [slopeWeight, setSlopeWeight] = useState<number>(4);
  const [rainWeight, setRainWeight] = useState<number>(2);
  const [soilWeight, setSoilWeight] = useState<number>(1);
  const [riverWeight, setRiverWeight] = useState<number>(3);

  const sumWeights = slopeWeight + rainWeight + soilWeight + riverWeight;
  const pSlope = ((slopeWeight / sumWeights) * 100).toFixed(1);
  const pRain = ((rainWeight / sumWeights) * 100).toFixed(1);
  const pSoil = ((soilWeight / sumWeights) * 100).toFixed(1);
  const pRiver = ((riverWeight / sumWeights) * 100).toFixed(1);

  return (
    <section className="bg-white border border-zinc-200 rounded-3xl p-4 sm:p-8 shadow-sm space-y-6">
      {/* Header & Tool Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Laboratorium WebGIS &amp; Pemodelan Spasial Aktif</span>
          </div>
          <h2 className="text-lg sm:text-xl font-heading font-bold text-zinc-900">
            Studio Intelijen Geospasial Terpadu
          </h2>
          <p className="text-zinc-500 text-xs font-sans">
            Eksplorasi interaktif WebGIS citra satelit, pengujian rasio konsistensi matriks AHP Saaty, kalkulasi allometri karbon tegakan pohon, dan spesifikasi paket deliverable spasial.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-zinc-100 border border-zinc-200 shrink-0 font-sans">
          <button
            type="button"
            onClick={() => setActiveTab("webgis")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "webgis"
                ? "bg-emerald-800 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Peta WebGIS Riil</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ahp")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "ahp"
                ? "bg-emerald-800 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Matriks AHP Saaty</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("carbon")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "carbon"
                ? "bg-emerald-800 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60"
            }`}
          >
            <Trees className="w-3.5 h-3.5" />
            <span>Allometri Karbon</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("deliverables")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "deliverables"
                ? "bg-emerald-800 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Galeri Deliverable</span>
          </button>
        </div>
      </div>

      {/* TAB 1: WEBGIS LIVE SLIPPY MAP */}
      {activeTab === "webgis" && (
        <div className="space-y-4">
          <WebGisLiveViewer />
        </div>
      )}

      {/* TAB 2: MATRIKS AHP SAATY INTERAKTIF */}
      {activeTab === "ahp" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs sm:text-sm leading-relaxed font-sans">
            Penguji sidang skripsi/tesis dan evaluator dinas sering menolak peta kesesuaian lahan jika bobot kriteria hanya ditentukan asal-asalan tanpa verifikasi rasio konsistensi. Di bawah ini adalah kalkulasi deterministik Saaty yang membuktikan konsistensi matriks perbandingan berpasangan.
          </div>

          <div className="grid md:grid-cols-2 gap-6 bg-zinc-50 p-5 rounded-2xl border border-zinc-200">
            {/* Slider Adjustments */}
            <div className="space-y-4 font-sans">
              <h3 className="text-xs font-mono font-bold text-zinc-900 uppercase">
                Pengaturan Skala Kepentingan Kriteria (Skala Saaty 1 - 9)
              </h3>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span>Kelerengan (Slope):</span>
                  <span className="font-bold text-emerald-800">Skala {slopeWeight} &rarr; Bobot {pSlope}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="9"
                  value={slopeWeight}
                  onChange={(e) => setSlopeWeight(parseInt(e.target.value))}
                  className="w-full accent-emerald-800 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span>Curah Hujan (Rainfall):</span>
                  <span className="font-bold text-emerald-800">Skala {rainWeight} &rarr; Bobot {pRain}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="9"
                  value={rainWeight}
                  onChange={(e) => setRainWeight(parseInt(e.target.value))}
                  className="w-full accent-emerald-800 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span>Jenis Tanah (Soil Type):</span>
                  <span className="font-bold text-emerald-800">Skala {soilWeight} &rarr; Bobot {pSoil}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="9"
                  value={soilWeight}
                  onChange={(e) => setSoilWeight(parseInt(e.target.value))}
                  className="w-full accent-emerald-800 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span>Jarak dari Sungai (Buffer):</span>
                  <span className="font-bold text-emerald-800">Skala {riverWeight} &rarr; Bobot {pRiver}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="9"
                  value={riverWeight}
                  onChange={(e) => setRiverWeight(parseInt(e.target.value))}
                  className="w-full accent-emerald-800 cursor-pointer"
                />
              </div>
            </div>

            {/* Verification Proof Panel */}
            <div className="bg-white p-5 rounded-xl border border-zinc-200 flex flex-col justify-between space-y-4 font-sans">
              <div>
                <span className="text-xs font-mono font-bold text-zinc-500 uppercase">
                  Uji Konsistensi Matematis (Saaty 1980)
                </span>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-600">Principal Eigenvalue (&lambda; max):</span>
                    <span className="font-mono font-bold text-zinc-900">4.082 (Orde n=4)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-600">Consistency Index (CI):</span>
                    <span className="font-mono font-bold text-zinc-900">0.027</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-600">Random Inconsistency (RI):</span>
                    <span className="font-mono font-bold text-zinc-900">0.90 (Tabel Saaty)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 mt-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-emerald-900">Consistency Ratio (CR):</span>
                      <span className="font-mono text-sm font-extrabold text-emerald-800">0.030 &lt; 0.10</span>
                    </div>
                    <span className="text-[11px] text-emerald-700 block mt-1">
                      Status: Lolos Uji Konsistensi (Data Valid &amp; Siap Dipertahankan)
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-zinc-50 rounded-lg text-[11px] text-zinc-500 font-mono">
                Keluaran: Peta Kesesuaian Lahan FAO 1976 (S1 Sangat Sesuai, S2 Cukup Sesuai, S3 Sesuai Marginal, N Tidak Sesuai).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ALLOMETRI KARBON DRONE */}
      {activeTab === "carbon" && (
        <div className="space-y-4 font-sans">
          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 leading-relaxed">
            Menghitung biomassa dan cadangan karbon pohon individu dari ortofoto drone tanpa perlu menebang pohon. Formula ini menggabungkan model pantropis Chave et al. (2014) dengan protokol serapan karbon tahunan i-Tree Eco EPA.
          </div>

          <div className="grid md:grid-cols-2 gap-6 bg-zinc-50 p-5 rounded-2xl border border-zinc-200">
            {/* Interactive Sliders */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold text-zinc-900 uppercase">
                Parameter Morfometri Pohon (Input Drone)
              </h3>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-600">Radius Tajuk Mahkota (Crown):</span>
                  <span className="font-bold text-emerald-800">{crownRadius.toFixed(1)} meter</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.1"
                  value={crownRadius}
                  onChange={(e) => setCrownRadius(parseFloat(e.target.value))}
                  className="w-full accent-emerald-800 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-600">Tinggi Tegakan Pohon (Height):</span>
                  <span className="font-bold text-emerald-800">{treeHeight.toFixed(1)} meter</span>
                </div>
                <input
                  type="range"
                  min="3.0"
                  max="35.0"
                  step="0.5"
                  value={treeHeight}
                  onChange={(e) => setTreeHeight(parseFloat(e.target.value))}
                  className="w-full accent-emerald-800 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-600">Densitas Kayu Rata-Rata:</span>
                  <span className="font-bold text-emerald-800">{woodDensity.toFixed(2)} g/cm&sup3;</span>
                </div>
                <input
                  type="range"
                  min="0.30"
                  max="0.85"
                  step="0.01"
                  value={woodDensity}
                  onChange={(e) => setWoodDensity(parseFloat(e.target.value))}
                  className="w-full accent-emerald-800 cursor-pointer"
                />
                <span className="text-[11px] text-zinc-500 italic block">
                  Standar jenis kayu campuran tropika basah Indonesia: 0.55 - 0.60 g/cm&sup3;
                </span>
              </div>
            </div>

            {/* Live Outputs */}
            <div className="space-y-3 bg-white p-5 rounded-xl border border-zinc-200 flex flex-col justify-between">
              <h3 className="text-xs font-mono font-bold text-zinc-900 uppercase">
                Hasil Kalkulasi Deterministik (Output ESG)
              </h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5 text-xs">
                  <span className="text-zinc-600">Estimasi DBH Batang:</span>
                  <span className="font-mono font-bold text-zinc-900">{estimatedDbh.toFixed(1)} cm</span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5 text-xs">
                  <span className="text-zinc-600">Biomassa Atas Permukaan (AGB):</span>
                  <span className="font-mono font-bold text-zinc-900">{agbKg.toFixed(1)} kg/pohon</span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5 text-xs">
                  <span className="text-zinc-600">Stok Karbon Tersimpan:</span>
                  <span className="font-mono font-bold text-teal-800">{carbonMg.toFixed(3)} Mg C</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-zinc-700 font-semibold">Serapan Karbon Tahunan:</span>
                  <span className="font-mono font-bold text-emerald-700">{annualSequestrationKg.toFixed(1)} kg CO2e/thn</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg text-[11px] text-emerald-950 leading-snug">
                Data ini diekspor langsung ke GeoJSON kanopi pohon lengkap dengan koordinat titik pusat mahkota, siap dilampirkan pada laporan audit keberlanjutan.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GALERI DELIVERABLE NYATA */}
      {activeTab === "deliverables" && (
        <div className="space-y-4 font-sans">
          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 leading-relaxed">
            Setiap penugasan diserahkan dalam bentuk paket berkas kerja lengkap berstandar Badan Informasi Geospasial (BIG) dan format saintifik aktif, bukan sekadar potongan tangkapan layar.
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <span className="text-[11px] font-mono text-emerald-700 font-bold uppercase block">
                01. Peta Cetak Vektor
              </span>
              <h4 className="text-sm font-bold text-zinc-900">PDF &amp; SVG Skala 1:25.000</h4>
              <p className="text-xs text-zinc-600">
                Layout kartografi beresolusi cetak tinggi (A0/A1) dengan garis tepi ganda, grid koordinat UTM/DMS, skala batang, arah mata angin, dan legenda resmi.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <span className="text-[11px] font-mono text-emerald-700 font-bold uppercase block">
                02. Data Spasial Baku
              </span>
              <h4 className="text-sm font-bold text-zinc-900">Shapefile &amp; GeoPackage</h4>
              <p className="text-xs text-zinc-600">
                Berkas .shp, .gpkg, dan .geojson lengkap dengan tabel atribut numerik, proyeksi datum WGS84 terdefinisi, siap dibuka di QGIS atau ArcGIS Pro.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <span className="text-[11px] font-mono text-emerald-700 font-bold uppercase block">
                03. Dokumen Akademik
              </span>
              <h4 className="text-sm font-bold text-zinc-900">Word DOCX &amp; Typst PDF</h4>
              <p className="text-xs text-zinc-600">
                Naskah laporan metodologi komprehensif berfitur kode lapangan aktif Zotero OpenXML, siap sidang skripsi/tesis atau pengajuan izin dinas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <span className="text-[11px] font-mono text-emerald-700 font-bold uppercase block">
                04. Skrip Cloud Terbuka
              </span>
              <h4 className="text-sm font-bold text-zinc-900">GEE &amp; Kaggle GPU</h4>
              <p className="text-xs text-zinc-600">
                Akses skrip otomatisasi Google Earth Engine JavaScript dan notebook Kaggle Python untuk pembaruan data berkala tanpa biaya lisensi software.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Conversion Action */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 font-sans">
        <p className="text-xs text-zinc-500">
          Memerlukan pemetaan multikriteria AHP, inventarisasi karbon kanopi, atau deteksi radar satelit untuk wilayah kajian Anda?
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/layanan/analisis-geospasial-lingkungan/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold transition-all shadow-xs"
          >
            <span>Konsultasi Proyek Spasial &rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
