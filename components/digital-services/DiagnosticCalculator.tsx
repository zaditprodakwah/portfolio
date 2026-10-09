"use client";

import React, { useState } from "react";
import { 
  Calculator, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  RotateCcw
} from "lucide-react";

export interface DiagnosticState {
  currentMonthlyHosting: number;
  annualPluginCost: number;
  currentSpeedCategory: "slow" | "moderate" | "fast";
  monthlyVisitors: number;
  averageDealValue: number;
}

export const DiagnosticCalculator: React.FC = () => {
  const [state, setState] = useState<DiagnosticState>({
    currentMonthlyHosting: 350000, // Rp 350.000/bln (rata-rata VPS)
    annualPluginCost: 1500000,     // Rp 1.500.000/thn (plugin/tema)
    currentSpeedCategory: "slow",  // LCP > 3.5s
    monthlyVisitors: 3000,
    averageDealValue: 500000,      // Nilai rata-rata transaksi/lead
  });

  // Perhitungan matematis penghematan 3 tahun
  const threeYearOldHostingCost = (state.currentMonthlyHosting * 36) + (state.annualPluginCost * 3);
  const threeYearEdgeCost = 0; // Rp 0 pada Cloudflare Pages Free Tier
  const totalThreeYearSavings = threeYearOldHostingCost - threeYearEdgeCost;

  // Estimasi proyeksi peningkatan konversi berdasarkan riset Google CrUX
  // Memotong waktu muat dari lambat ke < 1.0s rata-rata menaikkan konversi 20% s.d. 35%
  const conversionBoostPercent = state.currentSpeedCategory === "slow" ? 28 : (state.currentSpeedCategory === "moderate" ? 14 : 5);
  
  // Taksiran potensi pendapatan tambahan tahunan (dengan asumsi konversi baseline 2%)
  const baselineLeadsPerMonth = Math.round(state.monthlyVisitors * 0.02);
  const additionalLeadsPerMonth = Math.round(baselineLeadsPerMonth * (conversionBoostPercent / 100));
  const estimatedAnnualValueIncrease = additionalLeadsPerMonth * state.averageDealValue * 12;

  // Format angka rupiah
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Susun payload URL WhatsApp terstruktur
  const generateWhatsAppUrl = () => {
    const phone = "6282316363177";
    const speedText = state.currentSpeedCategory === "slow" 
      ? "Lambat (> 3,5 detik)" 
      : (state.currentSpeedCategory === "moderate" ? "Sedang (2,0 - 3,5 detik)" : "Cepat (< 2,0 detik)");

    const lines = [
      "Halo Zadit, saya telah menggunakan Kalkulator Diagnostik Layanan Digital di situs Anda:",
      "",
      `* Biaya Server Saat Ini: ${formatRupiah(state.currentMonthlyHosting)}/bulan`,
      `* Biaya Lisensi Tahunan: ${formatRupiah(state.annualPluginCost)}/tahun`,
      `* Kondisi Kecepatan: ${speedText}`,
      `* Estimasi Penghematan 3 Tahun: ${formatRupiah(totalThreeYearSavings)}`,
      `* Estimasi Tambahan Omzet: ${formatRupiah(estimatedAnnualValueIncrease)}/tahun`,
      "",
      "Saya ingin berkonsultasi mengenai migrasi arsitektur ke edge serverless dan optimalisasi performa web usaha saya."
    ];

    const message = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${phone}?text=${message}`;
  };

  return (
    <section 
      id="kalkulator-diagnostik" 
      aria-label="Kalkulator Diagnostik Biaya dan Performa Web"
      className="w-full max-w-5xl mx-auto px-4 py-12"
    >
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        {/* Header Seksi */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200/80 mb-2">
              <Calculator className="w-3.5 h-3.5 text-teal-700" />
              <span>SIMULASI MANDIRI 100% SISI PERAMBAN</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Kalkulator Efisiensi Biaya Hosting &amp; Potensi Konversi
            </h3>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Hitung seberapa banyak modal kerja yang dapat dihemat dengan berpindah dari VPS konvensional ke arsitektur edge $0/bulan, serta proyeksi lonjakan prospek bisnis Anda.
            </p>
          </div>

          <button
            onClick={() => setState({
              currentMonthlyHosting: 350000,
              annualPluginCost: 1500000,
              currentSpeedCategory: "slow",
              monthlyVisitors: 3000,
              averageDealValue: 500000,
            })}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-900 self-start sm:self-center transition-colors"
            title="Reset ke nilai default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Parameter</span>
          </button>
        </div>

        {/* Grid Input & Hasil */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Kolom Kiri: Input Penggeser & Opsi (7 Kolom) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Input 1: Biaya Hosting Bulanan */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="font-semibold text-slate-800">
                  Sewa Server / Hosting Bulanan Klien Saat Ini
                </label>
                <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                  {formatRupiah(state.currentMonthlyHosting)} / bln
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="2000000"
                step="50000"
                value={state.currentMonthlyHosting}
                onChange={(e) => setState({ ...state, currentMonthlyHosting: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
              />
              <div className="flex justify-between text-[11px] text-slate-600 font-mono">
                <span>Rp 0 (Sudah Edge)</span>
                <span>Rp 350rb (Rata-rata VPS)</span>
                <span>Rp 2 Juta+ (Dedicated)</span>
              </div>
            </div>

            {/* Input 2: Biaya Lisensi Plugin/Tema Tahunan */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="font-semibold text-slate-800">
                  Biaya Lisensi Tema / Plugin / Ekstensi per Tahun
                </label>
                <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                  {formatRupiah(state.annualPluginCost)} / thn
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="5000000"
                step="250000"
                value={state.annualPluginCost}
                onChange={(e) => setState({ ...state, annualPluginCost: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
              />
              <div className="flex justify-between text-[11px] text-slate-600 font-mono">
                <span>Rp 0</span>
                <span>Rp 1,5 Juta</span>
                <span>Rp 5 Juta+</span>
              </div>
            </div>

            {/* Input 3: Kategori Kecepatan Situs Saat Ini */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">
                Kondisi Kecepatan Buka Web di Ponsel Saat Ini
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setState({ ...state, currentSpeedCategory: "slow" })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    state.currentSpeedCategory === "slow"
                      ? "border-amber-500 bg-amber-50/70 text-amber-950 font-bold ring-1 ring-amber-500"
                      : "border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <div className="text-xs font-semibold">Lambat</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">&gt; 3,5 detik</div>
                </button>

                <button
                  type="button"
                  onClick={() => setState({ ...state, currentSpeedCategory: "moderate" })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    state.currentSpeedCategory === "moderate"
                      ? "border-teal-600 bg-teal-50 text-teal-950 font-bold ring-1 ring-teal-600"
                      : "border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <div className="text-xs font-semibold">Sedang</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">2,0 - 3,5 detik</div>
                </button>

                <button
                  type="button"
                  onClick={() => setState({ ...state, currentSpeedCategory: "fast" })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    state.currentSpeedCategory === "fast"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600"
                      : "border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <div className="text-xs font-semibold">Cepat</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">&lt; 2,0 detik</div>
                </button>
              </div>
            </div>

            {/* Input 4: Estimasi Pengunjung Bulanan */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="font-semibold text-slate-800">
                  Estimasi Pengunjung Unik per Bulan
                </label>
                <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {state.monthlyVisitors.toLocaleString("id-ID")} Pengunjung
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="20000"
                step="500"
                value={state.monthlyVisitors}
                onChange={(e) => setState({ ...state, monthlyVisitors: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
              />
            </div>
          </div>

          {/* Kolom Kanan: Kartu Hasil Estimasi Finansial & CTA (5 Kolom) */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Hasil Proyeksi 3 Tahun
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Bebas Biaya Server
                </span>
              </div>

              {/* Angka Utama 1: Penghematan Hosting */}
              <div>
                <div className="text-xs text-slate-400 mb-1">
                  Total Penghematan Biaya Server (3 Tahun)
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 tracking-tight">
                  {formatRupiah(totalThreeYearSavings)}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Pengeluaran server lama yang kini dapat dialihkan ke modal kerja atau periklanan.
                </div>
              </div>

              {/* Angka Utama 2: Proyeksi Kenaikan Konversi */}
              <div className="pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Proyeksi Kenaikan Kontak / Leads</span>
                  <span className="font-mono font-bold text-teal-300">+{conversionBoostPercent}%</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                  +{additionalLeadsPerMonth * 12} Pelanggan Baru / thn
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Dihitung dari pengurangan hambatan bounce rate seluler saat waktu muat ditekan ke &lt; 1,0s.
                </div>
              </div>

              {/* Keunggulan Ekosistem Edge */}
              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Hosting statis edge Cloudflare Pages Rp 0/bulan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Sertifikat keamanan SSL otomatis terbarui seumur hidup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Bebas risiko kerusakan database SQL konvensional</span>
                </div>
              </div>
            </div>

            {/* Tombol Aksi WhatsApp Direct */}
            <div className="pt-2">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-all text-center"
              >
                <span>Konsultasikan Hasil Diagnostik Ini</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="text-[10px] text-center text-slate-300 mt-2 font-mono">
                Terhubung langsung ke WhatsApp rekayasawan tanpa perantara
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticCalculator;
