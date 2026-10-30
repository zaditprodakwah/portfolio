"use client";

import React, { useState } from "react";
import { Layers, Eye, Check, ZoomIn, ZoomOut, RotateCcw, FileText, Package } from "lucide-react";

export default function PackagingDielineDemo() {
  const [activeModel, setActiveModel] = useState<"book" | "box">("book");
  const [showCutLines, setShowCutLines] = useState(true);
  const [showCreaseLines, setShowCreaseLines] = useState(true);
  const [showBleed, setShowBleed] = useState(true);
  const [showArtwork, setShowArtwork] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  const resetView = () => setZoomLevel(1);
  const zoomIn = () => setZoomLevel((z) => Math.min(1.6, z + 0.15));
  const zoomOut = () => setZoomLevel((z) => Math.max(0.7, z - 0.15));

  return (
    <div className="w-full bg-white rounded-2xl border border-zinc-200/90 shadow-xs overflow-hidden">
      {/* Header Toolbar */}
      <div className="p-4 sm:p-5 border-b border-zinc-100 flex flex-wrap items-center justify-between gap-3 bg-[#FAF8F5]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveModel("book")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeModel === "book"
                ? "bg-zinc-900 text-white shadow-xs"
                : "bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-100"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Pola Bentang Hardcover Buku</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveModel("box")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeModel === "box"
                ? "bg-zinc-900 text-white shadow-xs"
                : "bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-100"
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Pola Dus Kemasan FEFCO 0427</span>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-zinc-200 text-zinc-600">
          <button
            type="button"
            onClick={zoomIn}
            className="p-1.5 hover:bg-zinc-100 rounded transition-colors"
            title="Perbesar"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono px-1 min-w-[42px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            type="button"
            onClick={zoomOut}
            className="p-1.5 hover:bg-zinc-100 rounded transition-colors"
            title="Perkecil"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={resetView}
            className="p-1.5 hover:bg-zinc-100 rounded transition-colors border-l border-zinc-100"
            title="Reset Ukuran"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Layer Visibility Toggles */}
      <div className="px-4 py-2.5 bg-zinc-50 border-b border-zinc-100 flex flex-wrap items-center gap-3 text-xs text-zinc-600">
        <span className="font-semibold text-zinc-500 text-[11px] uppercase tracking-wider">
          Layer Percetakan:
        </span>

        <button
          type="button"
          onClick={() => setShowArtwork(!showArtwork)}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
            showArtwork
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium"
              : "bg-white text-zinc-400 border border-zinc-200"
          }`}
        >
          <Check className={`w-3 h-3 ${showArtwork ? "opacity-100" : "opacity-30"}`} />
          <span>Grafis Desain</span>
        </button>

        <button
          type="button"
          onClick={() => setShowCutLines(!showCutLines)}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
            showCutLines
              ? "bg-rose-50 text-rose-800 border border-rose-200 font-medium"
              : "bg-white text-zinc-400 border border-zinc-200"
          }`}
        >
          <Check className={`w-3 h-3 ${showCutLines ? "opacity-100" : "opacity-30"}`} />
          <span className="inline-block w-2.5 h-0.5 bg-rose-500 mr-0.5" />
          <span>Garis Potong (Pisau Pond)</span>
        </button>

        <button
          type="button"
          onClick={() => setShowCreaseLines(!showCreaseLines)}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
            showCreaseLines
              ? "bg-blue-50 text-blue-800 border border-blue-200 font-medium"
              : "bg-white text-zinc-400 border border-zinc-200"
          }`}
        >
          <Check className={`w-3 h-3 ${showCreaseLines ? "opacity-100" : "opacity-30"}`} />
          <span className="inline-block w-2.5 border-t border-dashed border-blue-500 mr-0.5" />
          <span>Garis Lipatan (Rel Mesin)</span>
        </button>

        <button
          type="button"
          onClick={() => setShowBleed(!showBleed)}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
            showBleed
              ? "bg-amber-50 text-amber-800 border border-amber-200 font-medium"
              : "bg-white text-zinc-400 border border-zinc-200"
          }`}
        >
          <Check className={`w-3 h-3 ${showBleed ? "opacity-100" : "opacity-30"}`} />
          <span className="inline-block w-2.5 h-0.5 bg-amber-500 mr-0.5" />
          <span>Lebihan Potong (Bleed 3mm)</span>
        </button>
      </div>

      {/* SVG Canvas Workspace */}
      <div className="w-full h-[420px] sm:h-[480px] bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center p-4 select-none">
        <div
          style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.2s ease-out" }}
          className="w-full max-w-3xl flex items-center justify-center"
        >
          {activeModel === "book" ? (
            /* Dieline Bentang Hardcover Buku ISO A5 */
            <svg
              viewBox="0 0 880 540"
              className="w-full h-auto drop-shadow-md bg-white rounded-lg"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Bleed Layer */}
              {showBleed && (
                <rect
                  x="40"
                  y="40"
                  width="800"
                  height="460"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              )}

              {/* Artwork Layer */}
              {showArtwork && (
                <g opacity="0.92">
                  {/* Back Cover Artwork */}
                  <rect x="70" y="70" width="340" height="400" fill="#fbf8f2" />
                  <rect x="100" y="110" width="280" height="24" rx="4" fill="#0f172a" opacity="0.1" />
                  <rect x="100" y="150" width="240" height="12" rx="2" fill="#475569" opacity="0.15" />
                  <rect x="100" y="170" width="260" height="12" rx="2" fill="#475569" opacity="0.15" />
                  <rect x="100" y="190" width="200" height="12" rx="2" fill="#475569" opacity="0.15" />
                  {/* Barcode Mock */}
                  <rect x="250" y="380" width="120" height="60" fill="#ffffff" stroke="#cbd5e1" />
                  <text x="260" y="445" fontSize="9" fontFamily="monospace" fill="#0f172a">
                    ISBN 978-623-7123
                  </text>

                  {/* Spine Artwork */}
                  <rect x="410" y="70" width="60" height="400" fill="#f8f5ee" />
                  <text
                    x="440"
                    y="270"
                    transform="rotate(-90, 440, 270)"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                    fill="#1e293b"
                    textAnchor="middle"
                  >
                    BELAJAR DESAIN GRAFIS : AALIYAH
                  </text>

                  {/* Front Cover Artwork */}
                  <rect x="470" y="70" width="340" height="400" fill="#fbf8f2" />
                  {/* Color Splash Mock */}
                  <circle cx="640" cy="270" r="85" fill="#0284c7" opacity="0.12" />
                  <circle cx="680" cy="240" r="60" fill="#f43f5e" opacity="0.15" />
                  <circle cx="610" cy="290" r="65" fill="#f59e0b" opacity="0.15" />
                  <text x="510" y="140" fontSize="11" fontWeight="bold" fill="#0284c7" fontFamily="sans-serif">
                    PANDUAN LENGKAP
                  </text>
                  <text x="510" y="185" fontSize="28" fontWeight="bold" fill="#0f172a" fontFamily="sans-serif">
                    Belajar Desain
                  </text>
                  <text x="510" y="215" fontSize="20" fontStyle="italic" fill="#e11d48" fontFamily="serif">
                    Untuk Pemula
                  </text>
                  <text x="510" y="440" fontSize="12" fontWeight="600" fill="#334155" fontFamily="sans-serif">
                    Aaliyah Lusianti dkk
                  </text>
                </g>
              )}

              {/* Crease Lines (Lipatan Punggung & Engsel) */}
              {showCreaseLines && (
                <g stroke="#2563eb" strokeWidth="1.8" strokeDasharray="6 4">
                  <line x1="410" y1="70" x2="410" y2="470" />
                  <line x1="470" y1="70" x2="470" y2="470" />
                  {/* Hinge Joint Score 6mm */}
                  <line x1="395" y1="70" x2="395" y2="470" strokeOpacity="0.5" />
                  <line x1="485" y1="70" x2="485" y2="470" strokeOpacity="0.5" />
                </g>
              )}

              {/* Cut Lines (Garis Pisau Potong Luar) */}
              {showCutLines && (
                <rect
                  x="70"
                  y="70"
                  width="740"
                  height="400"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.2"
                />
              )}

              {/* Technical Annotations */}
              <text x="240" y="60" fontSize="10" fontFamily="monospace" fill="#ef4444" textAnchor="middle">
                Sampul Belakang (148 mm)
              </text>
              <text x="440" y="60" fontSize="10" fontFamily="monospace" fill="#2563eb" textAnchor="middle">
                Punggung (17.4 mm)
              </text>
              <text x="640" y="60" fontSize="10" fontFamily="monospace" fill="#ef4444" textAnchor="middle">
                Sampul Depan (148 mm)
              </text>
            </svg>
          ) : (
            /* Dieline Dus Kemasan Produk FEFCO 0427 Mailer Box */
            <svg
              viewBox="0 0 880 540"
              className="w-full h-auto drop-shadow-md bg-white rounded-lg"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Bleed Layer */}
              {showBleed && (
                <path
                  d="M140,50 L740,50 L740,490 L140,490 Z"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              )}

              {/* Artwork Layer */}
              {showArtwork && (
                <g opacity="0.92">
                  {/* Top Lid */}
                  <rect x="320" y="80" width="240" height="130" fill="#faf5ee" />
                  <text x="440" y="145" fontSize="18" fontWeight="bold" fill="#0f172a" textAnchor="middle" fontFamily="sans-serif">
                    PREMIUM PACKAGING
                  </text>
                  <text x="440" y="165" fontSize="10" fill="#71717a" textAnchor="middle" fontFamily="sans-serif">
                    E-Flute Corrugated Box
                  </text>

                  {/* Rear Wall */}
                  <rect x="320" y="210" width="240" height="50" fill="#f4ede0" />

                  {/* Base Floor */}
                  <rect x="320" y="260" width="240" height="130" fill="#faf5ee" />
                  <text x="440" y="330" fontSize="12" fontWeight="600" fill="#0284c7" textAnchor="middle" fontFamily="sans-serif">
                    Inside Unboxing Experience
                  </text>

                  {/* Front Wall */}
                  <rect x="320" y="390" width="240" height="50" fill="#f4ede0" />

                  {/* Left Side Double Walls */}
                  <rect x="180" y="260" width="140" height="130" fill="#f4ede0" />
                  {/* Right Side Double Walls */}
                  <rect x="560" y="260" width="140" height="130" fill="#f4ede0" />
                </g>
              )}

              {/* Crease Lines (Rel Lipatan FEFCO) */}
              {showCreaseLines && (
                <g stroke="#2563eb" strokeWidth="1.8" strokeDasharray="6 4">
                  <line x1="320" y1="210" x2="560" y2="210" />
                  <line x1="320" y1="260" x2="560" y2="260" />
                  <line x1="320" y1="390" x2="560" y2="390" />
                  <line x1="320" y1="260" x2="320" y2="390" />
                  <line x1="560" y1="260" x2="560" y2="390" />
                  {/* Roll-over side wall scores */}
                  <line x1="250" y1="260" x2="250" y2="390" strokeOpacity="0.6" />
                  <line x1="630" y1="260" x2="630" y2="390" strokeOpacity="0.6" />
                </g>
              )}

              {/* Cut Lines (Pisau Pond Luar) */}
              {showCutLines && (
                <path
                  d="M 320,80 
                     L 560,80 
                     L 560,210 
                     L 700,210 
                     L 700,390 
                     L 560,390 
                     L 560,440 
                     L 320,440 
                     L 320,390 
                     L 180,390 
                     L 180,210 
                     L 320,210 Z"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.2"
                />
              )}

              <text x="440" y="470" fontSize="10" fontFamily="monospace" fill="#ef4444" textAnchor="middle">
                FEFCO 0427 Mailer Box : Standar Internasional Karton Dus E-Flute
              </text>
            </svg>
          )}
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="p-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500 bg-white">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-medium text-zinc-700">Skala Vektor 1:1 Milimeter Presisi</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span>Format: CorelDraw (.cdr), Illustrator (.ai), InDesign (.indd)</span>
          <span className="text-zinc-300">|</span>
          <span>Standar: CMYK FOGRA39 300 DPI</span>
        </div>
      </div>
    </div>
  );
}
