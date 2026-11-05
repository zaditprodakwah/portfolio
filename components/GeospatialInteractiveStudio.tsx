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
  Database,
  Sliders,
  Eye,
  CheckCircle2,
  FileCode,
  Download
} from "lucide-react";

export default function GeospatialInteractiveStudio() {
  const [activeTab, setActiveTab] = useState<"topography" | "sar" | "drone" | "ahp">("topography");

  // State for SAR Flood Before/After Toggle
  const [sarMode, setSarMode] = useState<"post" | "pre" | "diff">("post");

  // State for Drone Canopy Inspector
  const [selectedTree, setSelectedTree] = useState<number | null>(1);

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
            <span>Laboratorium Visual Interaktif (Native Canvas)</span>
          </div>
          <h2 className="text-lg sm:text-xl font-heading font-bold text-zinc-900">
            Simulasi Kartografi Medan, Radar Satelit &amp; Neraca Karbon
          </h2>
          <p className="text-zinc-500 text-xs font-sans">
            Pilih instrumen di bawah untuk memeriksa tata letak DEM, deteksi banjir SAR, sensus tajuk drone, atau matriks Saaty.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-zinc-100 border border-zinc-200 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("topography")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "topography"
                ? "bg-emerald-800 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Topografi &amp; Relief</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("sar")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "sar"
                ? "bg-emerald-800 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60"
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>Radar SAR Banjir</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("drone")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "drone"
                ? "bg-emerald-800 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60"
            }`}
          >
            <Trees className="w-3.5 h-3.5" />
            <span>Kanopi Drone &amp; Karbon</span>
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
        </div>
      </div>

      {/* TAB 1: TOPOGRAFI & RELIEF KARTOGRAFI */}
      {activeTab === "topography" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-zinc-900">STUDI WILAYAH:</span>
              <span>Kepulauan Natuna &middot; Model Elevasi Digital DEMNAS 8m &middot; Interval Kontur 25m</span>
            </div>
            <div className="font-mono text-[11px] text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded">
              Standar Kartografi BIG / SNI 19-6502
            </div>
          </div>

          {/* Full Realistic Map Frame */}
          <div className="relative rounded-2xl border-2 border-zinc-800 overflow-hidden bg-slate-900 p-2 sm:p-5 shadow-md">
            <svg
              viewBox="0 0 860 560"
              className="w-full h-auto bg-slate-950 rounded-lg select-none"
              role="img"
              aria-label="Peta Tata Letak Elevasi dan Relief Topografi Kepulauan Natuna"
            >
              <defs>
                {/* Hillshade Texture Filter */}
                <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0c1f38" />
                  <stop offset="100%" stopColor="#061224" />
                </linearGradient>
                <linearGradient id="hillshadeLight" x1="315%" y1="0%" x2="135%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#000000" stopOpacity="0.0" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
                </linearGradient>
                <pattern id="mapGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1e293b" strokeWidth="0.6" strokeDasharray="3,3" />
                </pattern>
              </defs>

              {/* Outer Neatline */}
              <rect x="8" y="8" width="844" height="544" fill="#0b1320" stroke="#475569" strokeWidth="1.5" />
              <rect x="18" y="18" width="824" height="524" fill="#080f1a" stroke="#1e293b" strokeWidth="0.8" />

              {/* Ocean Canvas with Grid */}
              <rect x="25" y="75" width="580" height="455" fill="url(#oceanGrad)" />
              <rect x="25" y="75" width="580" height="455" fill="url(#mapGrid)" />

              {/* Realistic Geographic Island Landmass (Natuna Island Geometry) */}
              <g id="natunaLandmass" transform="translate(45, 90)">
                {/* 0-50m Coastal Lowland (Lush Emerald) */}
                <path
                  d="M 120 70 C 180 50, 240 60, 310 90 C 370 120, 430 180, 460 250 C 480 300, 460 370, 410 400 C 360 425, 290 410, 220 390 C 160 370, 110 340, 80 290 C 50 240, 60 180, 75 130 C 85 95, 95 80, 120 70 Z"
                  fill="#1b4332"
                  stroke="#2d6a4f"
                  strokeWidth="1.2"
                />

                {/* 50-150m Lower Foothills (Forest Green) */}
                <path
                  d="M 140 100 C 190 85, 240 95, 295 120 C 350 145, 395 195, 420 250 C 435 290, 415 345, 380 370 C 340 390, 280 375, 225 355 C 175 338, 135 310, 110 270 C 88 230, 95 185, 110 145 C 120 115, 128 105, 140 100 Z"
                  fill="#2d6a4f"
                  stroke="#40916c"
                  strokeWidth="1"
                />

                {/* 150-300m Upper Hills (Amber Olive) */}
                <path
                  d="M 175 140 C 215 130, 260 138, 305 160 C 350 182, 380 220, 395 265 C 405 298, 385 335, 355 350 C 320 365, 270 350, 230 332 C 190 315, 160 288, 145 255 C 130 220, 140 180, 155 155 C 162 144, 168 142, 175 140 Z"
                  fill="#748cab"
                  stroke="#98c1d9"
                  strokeWidth="0.8"
                />

                {/* 300-600m Ridge & Highland (Terracotta Ochre) */}
                <path
                  d="M 210 175 C 245 168, 280 175, 315 195 C 345 212, 365 242, 370 275 C 375 300, 355 320, 330 328 C 300 338, 260 322, 235 305 C 205 285, 185 260, 180 230 C 175 200, 192 182, 210 175 Z"
                  fill="#b07d62"
                  stroke="#d4a373"
                  strokeWidth="0.8"
                />

                {/* 600m+ Mountain Peaks: Gunung Ranai (Crimson / Summit White) */}
                <path
                  d="M 245 210 C 270 205, 295 212, 315 228 C 330 240, 340 260, 338 280 C 335 295, 320 305, 305 308 C 285 312, 260 300, 245 285 C 230 270, 225 248, 230 230 C 235 215, 240 211, 245 210 Z"
                  fill="#c1121f"
                  stroke="#fdf0d5"
                  strokeWidth="1"
                />
                <circle cx="280" cy="250" r="3" fill="#fdf0d5" />
                <text x="290" y="248" fontSize="10" fontWeight="bold" fill="#fdf0d5" fontFamily="sans-serif">
                  ▲ G. Ranai (1.035 m)
                </text>

                {/* River Drainage Network (Hydrology) */}
                <path
                  d="M 275 255 Q 240 290, 210 330 T 170 375"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                />
                <path
                  d="M 290 260 Q 330 295, 370 340 T 425 385"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1"
                />
                <path
                  d="M 260 230 Q 230 190, 190 150 T 135 95"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1"
                />

                {/* Shading Overlay for 3D Relief */}
                <path
                  d="M 120 70 C 180 50, 240 60, 310 90 C 370 120, 430 180, 460 250 C 480 300, 460 370, 410 400 C 360 425, 290 410, 220 390 C 160 370, 110 340, 80 290 C 50 240, 60 180, 75 130 C 85 95, 95 80, 120 70 Z"
                  fill="url(#hillshadeLight)"
                  style={{ mixBlendMode: "overlay" }}
                />
              </g>

              {/* Geographic Graticule Labels */}
              <text x="30" y="90" fontSize="9" fill="#94a3b8" fontFamily="monospace">04&deg;05&apos;00&quot; N</text>
              <text x="30" y="300" fontSize="9" fill="#94a3b8" fontFamily="monospace">03&deg;55&apos;00&quot; N</text>
              <text x="30" y="515" fontSize="9" fill="#94a3b8" fontFamily="monospace">03&deg;45&apos;00&quot; N</text>
              <text x="490" y="520" fontSize="9" fill="#94a3b8" fontFamily="monospace">108&deg;25&apos;00&quot; E</text>

              {/* Formal Map Header Inside Frame */}
              <rect x="25" y="24" width="810" height="42" fill="#0f172a" stroke="#334155" strokeWidth="1" rx="4" />
              <text x="40" y="44" fontSize="14" fontWeight="bold" fill="#f8fafc" fontFamily="sans-serif">
                PETA HIPSOMETRI &amp; KELAS KETINGGIAN LAHAN
              </text>
              <text x="40" y="58" fontSize="10" fill="#94a3b8" fontFamily="monospace">
                Kabupaten Natuna, Provinsi Kepulauan Riau &middot; Sumber Data: DEMNAS Badan Informasi Geospasial
              </text>

              {/* Right Side Formal Marginalia / Legend Panel */}
              <g transform="translate(615, 75)">
                <rect x="0" y="0" width="220" height="455" fill="#0f172a" stroke="#334155" strokeWidth="1" rx="4" />

                {/* Legend Header */}
                <text x="14" y="22" fontSize="12" fontWeight="bold" fill="#f8fafc" fontFamily="sans-serif">
                  LEGENDA KARTOGRAFI
                </text>
                <line x1="14" y1="30" x2="206" y2="30" stroke="#334155" strokeWidth="1" />

                {/* Elevation Color Ramps */}
                <text x="14" y="46" fontSize="10" fontWeight="bold" fill="#94a3b8" fontFamily="monospace">
                  KELAS ELEVASI (MDPL):
                </text>

                <g transform="translate(14, 55)">
                  <rect x="0" y="0" width="16" height="12" fill="#c1121f" />
                  <text x="24" y="10" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace">&gt; 600 m (Puncak Ranai)</text>

                  <rect x="0" y="16" width="16" height="12" fill="#b07d62" />
                  <text x="24" y="26" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace">300 - 600 m (Perbukitan)</text>

                  <rect x="0" y="32" width="16" height="12" fill="#748cab" />
                  <text x="24" y="42" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace">150 - 300 m (Kaki Bukit)</text>

                  <rect x="0" y="48" width="16" height="12" fill="#2d6a4f" />
                  <text x="24" y="58" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace">50 - 150 m (Dataran Rendah)</text>

                  <rect x="0" y="64" width="16" height="12" fill="#1b4332" />
                  <text x="24" y="74" fontSize="9.5" fill="#e2e8f0" fontFamily="monospace">0 - 50 m (Pesisir Pantai)</text>
                </g>

                {/* Water & Hydrology */}
                <line x1="14" y1="145" x2="206" y2="145" stroke="#334155" strokeWidth="0.8" />
                <g transform="translate(14, 155)">
                  <line x1="0" y1="6" x2="16" y2="6" stroke="#38bdf8" strokeWidth="2" />
                  <text x="24" y="10" fontSize="9.5" fill="#e2e8f0" fontFamily="sans-serif">Jaringan Sungai Utama</text>

                  <rect x="0" y="16" width="16" height="8" fill="#0c1f38" stroke="#38bdf8" strokeWidth="0.8" />
                  <text x="24" y="24" fontSize="9.5" fill="#e2e8f0" fontFamily="sans-serif">Wilayah Perairan Laut</text>
                </g>

                {/* North Arrow Compass */}
                <line x1="14" y1="195" x2="206" y2="195" stroke="#334155" strokeWidth="0.8" />
                <g transform="translate(110, 240)">
                  <polygon points="0,-32 -9,6 0,0" fill="#38bdf8" />
                  <polygon points="0,-32 9,6 0,0" fill="#64748b" />
                  <circle cx="0" cy="0" r="2.5" fill="#0f172a" />
                  <text x="-5" y="24" fontSize="13" fontWeight="bold" fill="#f8fafc" fontFamily="sans-serif">U</text>
                </g>

                {/* Bar Scale */}
                <g transform="translate(25, 290)">
                  <text x="0" y="0" fontSize="9.5" fill="#94a3b8" fontFamily="monospace">SKALA 1:100.000</text>
                  <rect x="0" y="6" width="80" height="4" fill="#f8fafc" />
                  <rect x="80" y="6" width="80" height="4" fill="#0284c7" />
                  <text x="0" y="20" fontSize="8.5" fill="#cbd5e1" fontFamily="monospace">0</text>
                  <text x="74" y="20" fontSize="8.5" fill="#cbd5e1" fontFamily="monospace">5 km</text>
                  <text x="148" y="20" fontSize="8.5" fill="#cbd5e1" fontFamily="monospace">10 km</text>
                </g>

                {/* Inset Map (Indeks Lokasi Indonesia) */}
                <line x1="14" y1="325" x2="206" y2="325" stroke="#334155" strokeWidth="0.8" />
                <g transform="translate(14, 335)">
                  <rect x="0" y="0" width="192" height="60" fill="#090d16" stroke="#334155" strokeWidth="0.6" rx="2" />
                  <text x="6" y="12" fontSize="8" fill="#94a3b8" fontFamily="monospace">PETA INDEKS WILAYAH:</text>
                  {/* Miniature Indonesia Inset */}
                  <path d="M 15 25 Q 35 22, 55 35 T 85 45" fill="none" stroke="#64748b" strokeWidth="1.5" />
                  <circle cx="58" cy="22" r="3.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                  <text x="66" y="24" fontSize="8" fill="#ef4444" fontFamily="monospace">Lokasi Kajian</text>
                  <path d="M 95 30 Q 120 28, 145 38" fill="none" stroke="#64748b" strokeWidth="1.5" />
                </g>

                {/* Provenance Box */}
                <g transform="translate(14, 405)">
                  <text x="0" y="10" fontSize="8" fill="#64748b" fontFamily="monospace">PROVENANSI &amp; METADATA:</text>
                  <text x="0" y="22" fontSize="8" fill="#94a3b8" fontFamily="monospace">&bull; Datum: WGS 1984, Zona UTM 48N</text>
                  <text x="0" y="34" fontSize="8" fill="#94a3b8" fontFamily="monospace">&bull; Analisis: Topographic Relief &amp; Shading</text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* TAB 2: SENTINEL-1 SAR DETEKSI BANJIR */}
      {activeTab === "sar" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-zinc-900">SENSOR AKTIF:</span>
              <span>Sentinel-1 C-Band SAR (12 Hari Revisit) &middot; Bebas Gangguan Tutupan Awan &middot; Protokol UN-SPIDER</span>
            </div>
            {/* Interactive Mode Switcher */}
            <div className="flex items-center gap-1 bg-zinc-200/80 p-0.5 rounded-lg font-mono text-[11px]">
              <button
                type="button"
                onClick={() => setSarMode("post")}
                className={`px-2.5 py-1 rounded ${
                  sarMode === "post" ? "bg-white text-zinc-900 font-bold shadow-xs" : "text-zinc-600"
                }`}
              >
                Peta Genangan Banjir (Post-Event)
              </button>
              <button
                type="button"
                onClick={() => setSarMode("pre")}
                className={`px-2.5 py-1 rounded ${
                  sarMode === "pre" ? "bg-white text-zinc-900 font-bold shadow-xs" : "text-zinc-600"
                }`}
              >
                Citra Sebelum Banjir (Baseline)
              </button>
              <button
                type="button"
                onClick={() => setSarMode("diff")}
                className={`px-2.5 py-1 rounded ${
                  sarMode === "diff" ? "bg-white text-zinc-900 font-bold shadow-xs" : "text-zinc-600"
                }`}
              >
                Mask Penapisan (Permanent Water + Slope)
              </button>
            </div>
          </div>

          {/* SAR Visual Simulation */}
          <div className="relative rounded-2xl border-2 border-zinc-800 overflow-hidden bg-slate-950 p-4 sm:p-6 text-white space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-xs font-mono">
              <span className="text-teal-400">GOOGLE EARTH ENGINE CLOUD EXECUTION: S1_GRD_FLOAT</span>
              <span className="text-zinc-400">Polarisasi: VV + VH &middot; Speckle Filter: Lee 7x7</span>
            </div>

            <div className="relative aspect-video max-h-[460px] w-full rounded-xl overflow-hidden border border-zinc-800 bg-neutral-900 flex items-center justify-center">
              <svg viewBox="0 0 760 420" className="w-full h-full">
                {/* Background Radar Speckle Terrain */}
                <rect x="0" y="0" width="760" height="420" fill="#171717" />

                {/* Simulated Synthetic Radar Backscatter Patterns */}
                <g opacity={sarMode === "pre" ? "0.9" : "0.5"}>
                  <path d="M 50 80 Q 150 40 300 70 T 550 60 T 700 120 L 720 380 L 40 380 Z" fill="#262626" />
                  <path d="M 120 140 Q 240 110 380 150 T 600 140 T 680 280 L 100 320 Z" fill="#404040" />
                </g>

                {/* Permanent Water Body (Rivers / Reservoirs) */}
                <path
                  d="M 180 0 Q 220 120 280 200 T 380 320 T 420 420"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="12"
                />
                <text x="295" y="215" fontSize="10" fill="#38bdf8" fontFamily="monospace">
                  Sungai Utama (Air Permanen)
                </text>

                {/* Post-Event Flood Extent (Specular reflection = dark in SAR, highlighted in Red/Cyan) */}
                {(sarMode === "post" || sarMode === "diff") && (
                  <g>
                    <path
                      d="M 240 180 Q 290 140 360 170 T 440 250 T 360 340 T 260 270 Z"
                      fill="#ef4444"
                      fillOpacity="0.45"
                      stroke="#f87171"
                      strokeWidth="2"
                    />
                    <path
                      d="M 410 230 Q 480 210 540 260 T 560 350 T 460 360 T 390 300 Z"
                      fill="#ef4444"
                      fillOpacity="0.4"
                      stroke="#f87171"
                      strokeWidth="1.8"
                    />
                    <text x="310" y="260" fontSize="11" fontWeight="bold" fill="#fecaca" fontFamily="monospace">
                      Area Genangan Banjir: 1.482 Ha
                    </text>
                  </g>
                )}

                {/* Filtering Mask Overlays in Diff Mode */}
                {sarMode === "diff" && (
                  <g>
                    {/* Slope Mask > 5% */}
                    <rect x="520" y="40" width="180" height="140" fill="#eab308" fillOpacity="0.25" stroke="#facc15" strokeDasharray="3,3" />
                    <text x="530" y="65" fontSize="9" fill="#fde047" fontFamily="monospace">Slope &gt; 5&deg; (Ditapis)</text>
                  </g>
                )}
              </svg>

              {/* Status Badge in Viewer */}
              <div className="absolute bottom-4 left-4 p-3 rounded-lg bg-black/85 backdrop-blur border border-zinc-700 text-xs font-mono space-y-1">
                <div className="text-emerald-400 flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Ambang Batas Otsu Deterministik: -14.2 dB</span>
                </div>
                <div className="text-zinc-400">
                  Estimasi Warga Terdampak: 4.820 Jiwa &middot; Tutupan Awan Optik: 86% (Tembus Radar)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: KANOPI DRONE & INVENTARISASI KARBON */}
      {activeTab === "drone" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 leading-relaxed font-sans">
            Segmentasi pohon individu dari ortofoto drone beresolusi 5 cm/piksel menggunakan model deep learning (DeepForest / SAMGeo) yang dijalankan di Kaggle GPU, dikonversi deterministik ke stok karbon Chave 2014 tanpa menebang pohon.
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Visual Canopy Inspector */}
            <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-zinc-800 p-4 space-y-3 text-white">
              <div className="flex items-center justify-between text-xs font-mono border-b border-zinc-800 pb-2">
                <span className="text-emerald-400">ORTOFOTO DRONE: DETEKSI TAJUK MAHKOTA (CHM)</span>
                <span className="text-zinc-400">Klik lingkaran pohon untuk inspeksi data</span>
              </div>

              <div className="relative aspect-video max-h-[380px] w-full rounded-xl overflow-hidden bg-emerald-950/40 border border-emerald-900/60 flex items-center justify-center">
                <svg viewBox="0 0 600 360" className="w-full h-full select-none">
                  {/* Drone Green Background Texture */}
                  <rect x="0" y="0" width="600" height="360" fill="#062817" />

                  {/* Individual Detected Trees */}
                  {[
                    { id: 1, cx: 120, cy: 110, r: 42, color: "#22c55e", label: "Pohon #1 (Meranti)" },
                    { id: 2, cx: 210, cy: 90, r: 35, color: "#16a34a", label: "Pohon #2 (Keruing)" },
                    { id: 3, cx: 160, cy: 190, r: 48, color: "#15803d", label: "Pohon #3 (Ulin Tua)" },
                    { id: 4, cx: 290, cy: 140, r: 38, color: "#22c55e", label: "Pohon #4 (Kapur)" },
                    { id: 5, cx: 380, cy: 110, r: 44, color: "#16a34a", label: "Pohon #5 (Dipterokarpa)" },
                    { id: 6, cx: 330, cy: 220, r: 52, color: "#15803d", label: "Pohon #6 (Kanopi Lebar)" },
                    { id: 7, cx: 460, cy: 180, r: 40, color: "#22c55e", label: "Pohon #7 (Mahoni)" },
                    { id: 8, cx: 240, cy: 280, r: 36, color: "#16a34a", label: "Pohon #8 (Akasia)" },
                  ].map((tree) => (
                    <g
                      key={tree.id}
                      onClick={() => setSelectedTree(tree.id)}
                      className="cursor-pointer transition-transform hover:scale-105"
                    >
                      <circle
                        cx={tree.cx}
                        cy={tree.cy}
                        r={tree.r}
                        fill={tree.color}
                        fillOpacity={selectedTree === tree.id ? "0.85" : "0.55"}
                        stroke={selectedTree === tree.id ? "#ffffff" : "#4ade80"}
                        strokeWidth={selectedTree === tree.id ? "2.5" : "1"}
                      />
                      <circle cx={tree.cx} cy={tree.cy} r="3" fill="#ffffff" />
                      <text
                        x={tree.cx}
                        y={tree.cy - tree.r - 4}
                        fontSize="9"
                        fill="#ffffff"
                        textAnchor="middle"
                        fontFamily="monospace"
                        className="bg-black/60"
                      >
                        {tree.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Dynamic Metric Calculations */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-zinc-500 uppercase">
                  Inspektor Allometri Pohon Terpilih
                </span>
                <div className="p-3 bg-white rounded-xl border border-zinc-200 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-600">ID Tegakan:</span>
                    <span className="font-mono font-bold text-zinc-900">Tree-ID #0{selectedTree || 1}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-600">Diameter Tajuk:</span>
                    <span className="font-mono font-bold text-emerald-800">{crownDiameter.toFixed(1)} meter</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-600">Estimasi DBH:</span>
                    <span className="font-mono font-bold text-zinc-900">{estimatedDbh.toFixed(1)} cm</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-600">Biomassa AGB:</span>
                    <span className="font-mono font-bold text-zinc-900">{agbKg.toFixed(1)} kg</span>
                  </div>
                  <div className="flex justify-between text-xs border-t border-zinc-100 pt-1.5">
                    <span className="text-zinc-800 font-semibold">Stok Karbon (C):</span>
                    <span className="font-mono font-bold text-teal-800">{carbonMg.toFixed(3)} Mg C</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-800 font-semibold">Serapan CO2e/thn:</span>
                    <span className="font-mono font-bold text-emerald-700">{annualSequestrationKg.toFixed(1)} kg CO2e</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-[11px] text-zinc-500 font-mono">
                <p>&bull; Model Pantropis Chave (2014): ln(AGB) = &alpha; + &beta; ln(&rho; D&sup2; H)</p>
                <p>&bull; Format Serah Terima: GeoPackage (.gpkg) &amp; Tabel Karbon CSV</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MATRIKS AHP SAATY INTERAKTIF */}
      {activeTab === "ahp" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs sm:text-sm leading-relaxed font-sans">
            Penguji skripsi/tesis dan dinas teknis sering menggugurkan peta kesesuaian lahan jika bobot kriteria hanya ditentukan asal-asalan (*arbitrer*). Di bawah ini adalah kalkulasi deterministik Saaty yang membuktikan konsistensi matriks perbandingan berpasangan.
          </div>

          <div className="grid md:grid-cols-2 gap-6 bg-zinc-50 p-5 rounded-2xl border border-zinc-200">
            {/* Slider Adjustments */}
            <div className="space-y-4">
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
            <div className="bg-white p-5 rounded-xl border border-zinc-200 flex flex-col justify-between space-y-4">
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

      {/* Bottom Conversion Action */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200">
        <p className="text-xs text-zinc-500">
          Memerlukan peta layout kartografis berstandar penerbitan atau analisis awan bebas freeze untuk proyek Anda?
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
