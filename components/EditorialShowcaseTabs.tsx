"use client";

import React, { useState } from "react";
import Image from "next/image";
import PackagingDielineDemo from "./PackagingDielineDemo";
import {
  Video,
  Camera,
  Layers,
  CheckCircle2,
  FileCheck2,
  Package,
  BookOpen,
  Sparkles,
} from "lucide-react";

export default function EditorialShowcaseTabs() {
  const [activeTab, setActiveTab] = useState<"video" | "photos" | "dieline">("video");

  return (
    <section className="bg-zinc-900 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/80 pb-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Showcase Hasil Produksi & Media Promosi</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-bold tracking-tight text-white leading-tight">
            Aset Visual Siap Tayang & Berkas Produksi Nyata
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Dari animasi video vertikal untuk media sosial, foto material beresolusi 300 DPI, hingga
            pola potong skala 1:1 untuk mesin percetakan.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-800/80 border border-zinc-700/80 shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("video")}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === "video"
                ? "bg-teal-700 text-white shadow-xs"
                : "text-zinc-300 hover:text-white hover:bg-zinc-700/50"
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video Teaser 9:16</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("photos")}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === "photos"
                ? "bg-teal-700 text-white shadow-xs"
                : "text-zinc-300 hover:text-white hover:bg-zinc-700/50"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Foto Material 300 DPI</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("dieline")}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === "dieline"
                ? "bg-teal-700 text-white shadow-xs"
                : "text-zinc-300 hover:text-white hover:bg-zinc-700/50"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Pola Potong Vektor 1:1</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Video Vertikal 9:16 & Looping GIF */}
      {activeTab === "video" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-semibold">
                Spesifikasi Video Promosi
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                Animasi Kamera Sinematik untuk Menarik Perhatian di Media Sosial
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Klip video vertikal berformat 9:16 menyorot lekukan jilid buku, pantulan cahaya pernis,
                dan ketebalan kertas secara halus. Format ini dirancang khusus untuk memenuhi standar
                layar penuh pada Instagram Reels, TikTok, YouTube Shorts, dan Threads.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Rasio vertikal 1080 x 1920 piksel pas di seluruh layar ponsel</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Gerakan kamera 60 frame per detik tanpa jeda patah atau distorsi</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Format GIF looping ringan untuk sematan situs web dan surel promosi</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dilengkapi rekomendasi struktur naskah promosi singkat untuk takarir</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-md text-xs font-mono bg-zinc-800 border border-zinc-700 text-zinc-300">
                Format: MP4 (H.264)
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-mono bg-zinc-800 border border-zinc-700 text-zinc-300">
                FPS: 60 Smooth Motion
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-mono bg-zinc-800 border border-zinc-700 text-zinc-300">
                Audio: Stereo Ambient Ready
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            {/* Smartphone Mockup Bezel */}
            <div className="relative w-[260px] sm:w-[290px] aspect-[9/16] rounded-[2.5rem] p-3 bg-zinc-800 border-4 border-zinc-700 shadow-2xl flex flex-col justify-between">
              {/* Speaker / Notch Bar */}
              <div className="w-20 h-3 bg-zinc-900 rounded-full mx-auto mb-2 shrink-0 z-10" />

              {/* Screen Area */}
              <div className="relative w-full flex-1 rounded-[1.8rem] overflow-hidden bg-black">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                  poster="/editorial-studio/teaser-loop.gif"
                >
                  <source src="/editorial-studio/teaser-9x16.mp4" type="video/mp4" />
                  Peramban Anda belum mendukung pemutaran video MP4.
                </video>

                <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 text-zinc-200 backdrop-blur-xs pointer-events-none">
                  60 FPS HD
                </div>
              </div>

              {/* Bottom Home Indicator */}
              <div className="w-24 h-1 bg-zinc-600 rounded-full mx-auto mt-2 shrink-0" />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Galeri Foto Material 300 DPI */}
      {activeTab === "photos" && (
        <div className="space-y-6 pt-2">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Galeri Spesimen Material Fisik & Pengemasan
            </h3>
            <p className="text-zinc-300 text-sm max-w-3xl leading-relaxed">
              Setiap elemen cetak dirancang dengan spesifikasi gramatur dan tekstur yang serasi,
              menciptakan pengalaman unboxing yang berkesan bagi pembaca dan pelanggan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Specimen 1: Buku Hardcover */}
            <div className="bg-zinc-800/80 rounded-2xl border border-zinc-700/80 overflow-hidden flex flex-col justify-between shadow-xs">
              <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden">
                <Image
                  src="/editorial-studio/hero-mockup-3d.png"
                  alt="Spesimen Buku Hardcover ISO A5"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono bg-black/75 text-amber-300 border border-amber-400/30">
                  Produk Utama
                </span>
              </div>
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-heading font-bold text-white">
                    Buku Hardcover Doff + Spot UV
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Format ISO A5 dengan 240 halaman kertas krem 72 gsm, tebal punggung 17.4 mm, dan
                    lapisan pernis timbul pada tipografi judul.
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-700/60 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>Jahit Benang</span>
                  <span>Board 3 mm</span>
                </div>
              </div>
            </div>

            {/* Specimen 2: Dus Kemasan FEFCO 0427 */}
            <div className="bg-zinc-800/80 rounded-2xl border border-zinc-700/80 overflow-hidden flex flex-col justify-between shadow-xs">
              <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden">
                <Image
                  src="/editorial-studio/specimen-box.jpg"
                  alt="Dus Kemasan E-Flute FEFCO 0427"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono bg-black/75 text-teal-300 border border-teal-400/30">
                  Pengemasan
                </span>
              </div>
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-heading font-bold text-white">
                    Dus Kemasan Corrugated E-Flute
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Model lipatan FEFCO 0427 yang kokoh melindungi sudut buku saat pengiriman kurir
                    tanpa membutuhkan perekat lakban berlebih.
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-700/60 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>Gelombang E 1.5mm</span>
                  <span>Kraft Cokelat</span>
                </div>
              </div>
            </div>

            {/* Specimen 3: Hang Tag Art Carton */}
            <div className="bg-zinc-800/80 rounded-2xl border border-zinc-700/80 overflow-hidden flex flex-col justify-between shadow-xs">
              <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden">
                <Image
                  src="/editorial-studio/specimen-hangtag.jpg"
                  alt="Hang Tag Karton Tebal 310 gsm"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono bg-black/75 text-emerald-300 border border-emerald-400/30">
                  Aksesoris
                </span>
              </div>
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-heading font-bold text-white">
                    Hang Tag Karton 310 gsm
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Label gantung berpita katun alami dengan lubang ring logam, memberikan kesan
                    eksklusif dan sentuhan personal bagi pembeli.
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-700/60 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>Art Carton 310g</span>
                  <span>Tali Katun</span>
                </div>
              </div>
            </div>

            {/* Specimen 4: Stiker Segel Vinyl */}
            <div className="bg-zinc-800/80 rounded-2xl border border-zinc-700/80 overflow-hidden flex flex-col justify-between shadow-xs">
              <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden">
                <Image
                  src="/editorial-studio/specimen-sticker.jpg"
                  alt="Stiker Segel Vinyl Die-Cut"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono bg-black/75 text-purple-300 border border-purple-400/30">
                  Segel Keaslian
                </span>
              </div>
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-heading font-bold text-white">
                    Stiker Segel Vinyl Die-Cut
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Stiker segel penutup amplop dan kemasan berbahan vinyl tahan air dengan daya rekat
                    tinggi serta potongan tepi pisau yang rapi.
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-700/60 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>Vinyl Tahan Air</span>
                  <span>Potong Die-Cut</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Pola Potong Vektor 1:1 Dieline Demo */}
      {activeTab === "dieline" && (
        <div className="space-y-4 pt-2">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Simulator Pola Potong Vektor Skala 1:1
            </h3>
            <p className="text-zinc-300 text-sm max-w-3xl leading-relaxed">
              Periksa ketelitian garis potong, garis lipatan engsel, dan batas aman bleed pada lembar
              kerja sebelum dikirim ke mesin percetakan.
            </p>
          </div>

          <div className="text-zinc-900">
            <PackagingDielineDemo />
          </div>
        </div>
      )}
    </section>
  );
}
