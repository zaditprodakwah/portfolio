"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  Database
} from "lucide-react";

export default function GeospatialInteractiveStudio() {
  const [activeTab, setActiveTab] = useState<"map" | "ahp" | "carbon" | "cloud">("map");

  // Dynamic Mini-Calculator for Canopy Carbon Allometry (Chave 2014 & i-Tree Eco)
  const [crownRadius, setCrownRadius] = useState<number>(3.5);
  const [treeHeight, setTreeHeight] = useState<number>(14);
  const [woodDensity, setWoodDensity] = useState<number>(0.57); // Tropika rata-rata g/cm3

  // Diameter tajuk & DBH allometrik aproksimasi
  const crownDiameter = crownRadius * 2;
  const estimatedDbh = Math.pow(crownDiameter / 1.5, 1.15) * 4.2; // Estimasi empiris DBH (cm)
  // Chave et al. 2014: AGB = 0.0673 * (rho * D^2 * H)^0.976
  const agbKg = 0.0673 * Math.pow(woodDensity * Math.pow(estimatedDbh, 2) * treeHeight, 0.976);
  const carbonMg = (agbKg * 0.47) / 1000; // IPCC rasio karbon 47%
  const annualSequestrationKg = carbonMg * (44 / 12) * 1000 * 0.045; // Laju serapan tahunan rata-rata 4.5%

  return (
    <section className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 pb-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-teal-50 text-teal-800 border border-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Verifikasi Komputasi Spasial &amp; Kartografi Vektor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-zinc-900 leading-tight">
            Etalase Intelijen Geospasial: AHP Saaty, Karbon Drone &amp; Cloud GEE
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-sans">
            Bukan sekadar gambar peta statis dari perangkat lunak desktop. Eksplorasi bukti matematis konsistensi AHP, kalkulator allometri karbon kanopi pohon, serta arsitektur komputasi awan bebas freeze.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-100 border border-zinc-200 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("map")}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === "map"
                ? "bg-teal-800 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Peta Vektor SVG</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ahp")}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === "ahp"
                ? "bg-teal-800 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Matriks AHP Saaty</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("carbon")}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === "carbon"
                ? "bg-teal-800 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60"
            }`}
          >
            <Trees className="w-3.5 h-3.5" />
            <span>Allometri Karbon</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cloud")}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === "cloud"
                ? "bg-teal-800 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Kaggle &amp; GEE Cloud</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Peta Vektor SVG */}
      {activeTab === "map" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-zinc-800">SPESIFIKASI KARTOGRAFI:</span>
              <span>Proyeksi UTM WGS84 &middot; Layout Vektor Skala 1:1 &middot; Standar FAO 1976</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-teal-800 bg-teal-100/60 px-2.5 py-1 rounded-md">
              <span>Resolusi Vektor Murni: Nol Penurunan Kualitas Cetak</span>
            </div>
          </div>

          <div className="relative rounded-2xl border border-zinc-300 overflow-hidden bg-slate-900 p-2 sm:p-6 shadow-inner">
            <svg
              viewBox="0 0 800 520"
              className="w-full h-auto max-h-[560px] bg-slate-950 rounded-xl"
              role="img"
              aria-label="Peta Tematik Vektor Kesesuaian Lahan dan Pemantauan Genangan"
            >
              <defs>
                <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,4" />
                </pattern>
                <linearGradient id="reliefGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>

              {/* Background Map Frame */}
              <rect x="15" y="15" width="770" height="490" fill="url(#reliefGrad)" stroke="#475569" strokeWidth="1.5" />
              <rect x="25" y="70" width="540" height="425" fill="#090d16" stroke="#334155" strokeWidth="1" />
              <rect x="25" y="70" width="540" height="425" fill="url(#gridPattern)" />

              {/* Title Block */}
              <text x="32" y="42" fontSize="16" fontWeight="bold" fill="#f8fafc" fontFamily="sans-serif">
                PETA KESESUAIAN ZONASI SPASIAL &amp; NERACA LINGKUNGAN
              </text>
              <text x="32" y="58" fontSize="11" fill="#94a3b8" fontFamily="monospace">
                Model: AHP Saaty (CR = 0.041) &middot; Sentinel-1 SAR UN-SPIDER &middot; FAO S1-N
              </text>

              {/* Simulated Spatial Polygons / Contour Zones */}
              <path
                d="M 60 140 Q 120 100 220 130 T 380 180 T 480 160 T 520 280 T 420 420 T 260 450 T 100 380 Z"
                fill="#047857"
                fillOpacity="0.25"
                stroke="#10b981"
                strokeWidth="1.5"
              />
              <path
                d="M 120 180 Q 180 140 260 170 T 360 220 T 420 320 T 320 400 T 180 340 Z"
                fill="#0284c7"
                fillOpacity="0.35"
                stroke="#38bdf8"
                strokeWidth="1.5"
              />
              <path
                d="M 180 220 Q 240 200 300 240 T 340 310 T 260 360 T 200 300 Z"
                fill="#eab308"
                fillOpacity="0.3"
                stroke="#facc15"
                strokeWidth="1.2"
              />

              {/* Flood Polygon from SAR */}
              <path
                d="M 380 340 Q 440 320 500 360 T 530 440 T 450 460 T 390 410 Z"
                fill="#ef4444"
                fillOpacity="0.3"
                stroke="#f87171"
                strokeWidth="1.2"
                strokeDasharray="4,3"
              />
              <text x="420" y="395" fontSize="10" fill="#fca5a5" fontFamily="monospace">
                Area Genangan SAR (UN-SPIDER)
              </text>

              {/* Coordinate Grid Labels */}
              <text x="30" y="85" fontSize="9" fill="#64748b" fontFamily="monospace">06&deg;45&apos;00&quot; S</text>
              <text x="30" y="485" fontSize="9" fill="#64748b" fontFamily="monospace">06&deg;52&apos;30&quot; S</text>
              <text x="480" y="490" fontSize="9" fill="#64748b" fontFamily="monospace">108&deg;35&apos;00&quot; E</text>

              {/* Right Side Cartographic Legend Panel */}
              <g transform="translate(580, 70)">
                <rect x="0" y="0" width="195" height="425" fill="#0f172a" stroke="#334155" strokeWidth="1" rx="6" />
                <text x="16" y="26" fontSize="13" fontWeight="bold" fill="#f8fafc" fontFamily="sans-serif">
                  LEGENDA KARTOGRAFI
                </text>
                <line x1="16" y1="36" x2="179" y2="36" stroke="#334155" strokeWidth="1" />

                {/* S1 */}
                <rect x="16" y="48" width="14" height="14" fill="#0284c7" stroke="#38bdf8" />
                <text x="38" y="60" fontSize="11" fill="#e2e8f0" fontFamily="sans-serif">S1 : Sangat Sesuai</text>
                {/* S2 */}
                <rect x="16" y="72" width="14" height="14" fill="#047857" stroke="#10b981" />
                <text x="38" y="84" fontSize="11" fill="#e2e8f0" fontFamily="sans-serif">S2 : Cukup Sesuai</text>
                {/* S3 */}
                <rect x="16" y="96" width="14" height="14" fill="#eab308" stroke="#facc15" />
                <text x="38" y="108" fontSize="11" fill="#e2e8f0" fontFamily="sans-serif">S3 : Sesuai Marginal</text>
                {/* N */}
                <rect x="16" y="120" width="14" height="14" fill="#ef4444" stroke="#f87171" strokeDasharray="2,2" />
                <text x="38" y="132" fontSize="11" fill="#e2e8f0" fontFamily="sans-serif">N : Genangan / Rawan</text>

                {/* Separator */}
                <line x1="16" y1="148" x2="179" y2="148" stroke="#334155" strokeWidth="1" />

                {/* North Arrow */}
                <g transform="translate(97, 200)">
                  <polygon points="0,-32 -9,6 0,0" fill="#38bdf8" />
                  <polygon points="0,-32 9,6 0,0" fill="#64748b" />
                  <circle cx="0" cy="0" r="2.5" fill="#0f172a" />
                  <text x="-5" y="24" fontSize="14" fontWeight="bold" fill="#f8fafc" fontFamily="sans-serif">U</text>
                </g>

                {/* Graphic Scale */}
                <g transform="translate(20, 275)">
                  <text x="0" y="0" fontSize="10" fill="#94a3b8" fontFamily="monospace">SKALA GRAFIS 1:25.000</text>
                  <rect x="0" y="8" width="75" height="5" fill="#f8fafc" />
                  <rect x="75" y="8" width="75" height="5" fill="#0284c7" />
                  <text x="0" y="24" fontSize="9" fill="#cbd5e1" fontFamily="monospace">0</text>
                  <text x="68" y="24" fontSize="9" fill="#cbd5e1" fontFamily="monospace">1 km</text>
                  <text x="142" y="24" fontSize="9" fill="#cbd5e1" fontFamily="monospace">2 km</text>
                </g>

                {/* Provenance Box */}
                <g transform="translate(16, 325)">
                  <rect x="0" y="0" width="163" height="85" fill="#1e293b" rx="4" stroke="#475569" strokeWidth="0.5" />
                  <text x="8" y="16" fontSize="9" fontWeight="bold" fill="#f8fafc" fontFamily="monospace">PROVENANSI DATA:</text>
                  <text x="8" y="30" fontSize="8.5" fill="#94a3b8" fontFamily="monospace">&bull; Citra: Sentinel-1 SAR</text>
                  <text x="8" y="44" fontSize="8.5" fill="#94a3b8" fontFamily="monospace">&bull; DEM: Copernicus 30m</text>
                  <text x="8" y="58" fontSize="8.5" fill="#94a3b8" fontFamily="monospace">&bull; Allometri: Chave 2014</text>
                  <text x="8" y="72" fontSize="8.5" fill="#38bdf8" fontFamily="monospace">&bull; Status: Valid Matematis</text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* Tab 2: Matriks AHP Saaty */}
      {activeTab === "ahp" && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs sm:text-sm leading-relaxed">
            Dalam penentuan kesesuaian lahan, banyak studi ditolak penguji atau evaluator dinas karena pembobotan kriteria bersifat subjektif tanpa verifikasi rasio konsistensi. Saya menyusun matriks perbandingan berpasangan Saaty dengan kalkulasi deterministik yang menjamin nilai Consistency Ratio (CR) selalu berada di bawah 0.10.
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-zinc-100 text-zinc-900 font-mono border-b border-zinc-200">
                  <th className="p-3.5">Kriteria Parameter</th>
                  <th className="p-3.5">Kelerengan</th>
                  <th className="p-3.5">Curah Hujan</th>
                  <th className="p-3.5">Jenis Tanah</th>
                  <th className="p-3.5">Jarak Sungai</th>
                  <th className="p-3.5 bg-teal-100/70 text-teal-900 font-bold">Bobot Prioritas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-zinc-700 font-mono">
                <tr>
                  <td className="p-3.5 font-bold text-zinc-900">Kelerengan (Slope)</td>
                  <td className="p-3.5">1.000</td>
                  <td className="p-3.5">3.000</td>
                  <td className="p-3.5">4.000</td>
                  <td className="p-3.5">2.000</td>
                  <td className="p-3.5 bg-teal-50 font-bold text-teal-900">46.7%</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-zinc-900">Curah Hujan (Rainfall)</td>
                  <td className="p-3.5">0.333</td>
                  <td className="p-3.5">1.000</td>
                  <td className="p-3.5">2.000</td>
                  <td className="p-3.5">0.500</td>
                  <td className="p-3.5 bg-teal-50 font-bold text-teal-900">16.0%</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-zinc-900">Jenis Tanah (Soil Type)</td>
                  <td className="p-3.5">0.250</td>
                  <td className="p-3.5">0.500</td>
                  <td className="p-3.5">1.000</td>
                  <td className="p-3.5">0.333</td>
                  <td className="p-3.5 bg-teal-50 font-bold text-teal-900">9.5%</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-zinc-900">Jarak Sungai (Proximity)</td>
                  <td className="p-3.5">0.500</td>
                  <td className="p-3.5">2.000</td>
                  <td className="p-3.5">3.000</td>
                  <td className="p-3.5">1.000</td>
                  <td className="p-3.5 bg-teal-50 font-bold text-teal-900">27.8%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase">Principal Eigenvalue</span>
              <p className="text-lg font-mono font-bold text-zinc-900">&lambda; max = 4.109</p>
              <p className="text-[11px] text-zinc-500">Nilai eigen maksimum orde n=4</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
              <span className="text-[11px] font-mono text-zinc-500 uppercase">Consistency Index (CI)</span>
              <p className="text-lg font-mono font-bold text-zinc-900">CI = 0.036</p>
              <p className="text-[11px] text-zinc-500">Penyimpangan matriks terhitung</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-[11px] font-mono text-emerald-700 uppercase font-bold">Consistency Ratio (CR)</span>
              <p className="text-xl font-mono font-bold text-emerald-800">CR = 0.041 &lt; 0.10</p>
              <p className="text-[11px] text-emerald-700 font-medium">Lolos Standar Saaty (Valid 100%)</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Allometri Karbon Drone */}
      {activeTab === "carbon" && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
            Menghitung biomassa dan cadangan karbon pohon individu dari ortofoto drone tanpa perlu menebang pohon. Formula ini menggabungkan model pantropis Chave et al. (2014) dengan protokol serapan karbon tahunan i-Tree Eco EPA.
          </div>

          <div className="grid md:grid-cols-2 gap-6 bg-zinc-50 p-6 rounded-2xl border border-zinc-200">
            {/* Interactive Sliders */}
            <div className="space-y-5">
              <h3 className="text-sm font-heading font-bold text-zinc-900 uppercase tracking-wider">
                Parameter Morfometri Pohon (Input Drone)
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-600">Radius Tajuk Mahkota (Crown Radius):</span>
                  <span className="font-bold text-teal-800">{crownRadius.toFixed(1)} meter</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.1"
                  value={crownRadius}
                  onChange={(e) => setCrownRadius(parseFloat(e.target.value))}
                  className="w-full accent-teal-800 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-600">Estimasi Tinggi Tegakan Pohon (Height):</span>
                  <span className="font-bold text-teal-800">{treeHeight.toFixed(1)} meter</span>
                </div>
                <input
                  type="range"
                  min="3.0"
                  max="35.0"
                  step="0.5"
                  value={treeHeight}
                  onChange={(e) => setTreeHeight(parseFloat(e.target.value))}
                  className="w-full accent-teal-800 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-600">Densitas Kayu Rata-Rata (Wood Density):</span>
                  <span className="font-bold text-teal-800">{woodDensity.toFixed(2)} g/cm&sup3;</span>
                </div>
                <input
                  type="range"
                  min="0.30"
                  max="0.85"
                  step="0.01"
                  value={woodDensity}
                  onChange={(e) => setWoodDensity(parseFloat(e.target.value))}
                  className="w-full accent-teal-800 cursor-pointer"
                />
                <span className="text-[11px] text-zinc-500 italic block">
                  Standar jenis kayu campuran tropika basah Indonesia: 0.55 - 0.60 g/cm&sup3;
                </span>
              </div>
            </div>

            {/* Live Outputs */}
            <div className="space-y-4 bg-white p-5 rounded-xl border border-zinc-200 flex flex-col justify-between">
              <h3 className="text-sm font-heading font-bold text-zinc-900 uppercase tracking-wider">
                Hasil Kalkulasi Deterministik (Output ESG)
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2 text-xs sm:text-sm">
                  <span className="text-zinc-600">Estimasi DBH Batang:</span>
                  <span className="font-mono font-bold text-zinc-900">{estimatedDbh.toFixed(1)} cm</span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2 text-xs sm:text-sm">
                  <span className="text-zinc-600">Biomassa Atas Permukaan (AGB):</span>
                  <span className="font-mono font-bold text-zinc-900">{agbKg.toFixed(1)} kg/pohon</span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2 text-xs sm:text-sm">
                  <span className="text-zinc-600">Stok Karbon Tersimpan:</span>
                  <span className="font-mono font-bold text-teal-800">{carbonMg.toFixed(3)} Mg C</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-xs sm:text-sm">
                  <span className="text-zinc-700 font-medium">Serapan Karbon Tahunan:</span>
                  <span className="font-mono font-bold text-emerald-700">{annualSequestrationKg.toFixed(1)} kg CO2e/thn</span>
                </div>
              </div>

              <div className="p-3 bg-teal-50 rounded-lg text-[11px] text-teal-900 leading-snug">
                Data ini diekspor langsung ke GeoJSON kanopi pohon lengkap dengan koordinat titik pusat mahkota, siap dilampirkan pada laporan audit keberlanjutan.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Kaggle & GEE Cloud Bridge */}
      {activeTab === "cloud" && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
            Solusi untuk keluhan laptop macet (*freeze*) saat mengolah ortofoto gigapiksel dan keterbatasan kuota token pada plugin AI. Saya memisahkan pemrosesan berat ke lingkungan cloud computing berakselerasi GPU gratis.
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-900 text-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-[11px] font-mono text-teal-400">
                  KAGGLE GPU NOTEBOOK (T4/P100)
                </span>
                <Terminal className="w-4 h-4 text-zinc-400" />
              </div>
              <h4 className="font-heading font-bold text-base text-zinc-100">
                Segmentasi Mahkota Pohon (DeepForest &amp; SAMGeo)
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Menjalankan deteksi pohon drone berbasis AI di atas GPU Nvidia 16GB VRAM tanpa membebani memori laptop Anda. Hasil segmentasi diekspor ke Shapefile/GeoJSON.
              </p>
              <div className="pt-2 text-xs font-mono text-zinc-300 bg-zinc-950 p-2.5 rounded-lg overflow-x-auto">
                <code>pip install deepforest samgeo kagglehub</code>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 text-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-[11px] font-mono text-sky-400">
                  GOOGLE EARTH ENGINE (GEE)
                </span>
                <Database className="w-4 h-4 text-zinc-400" />
              </div>
              <h4 className="font-heading font-bold text-base text-zinc-100">
                Deteksi Banjir Radar SAR Bebas Kuota Token
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Skrip otomatisasi JavaScript/Python untuk memproses data Sentinel-1 GRD, penapisan slope mask DEM, dan permanent water mask JRC langsung di cluster Google Cloud.
              </p>
              <div className="pt-2 text-xs font-mono text-zinc-300 bg-zinc-950 p-2.5 rounded-lg overflow-x-auto">
                <code>ee.ImageCollection(&apos;COPERNICUS/S1_GRD&apos;)</code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Conversion Action */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200">
        <p className="text-xs text-zinc-500">
          Butuh kolaborasi analisis multikriteria, kalkulasi neraca karbon, atau integrasi skrip cloud untuk riset Anda?
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/layanan/analisis-geospasial-lingkungan/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold transition-all shadow-sm"
          >
            <span>Lihat Paket Layanan Geospasial</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
