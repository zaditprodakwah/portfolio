"use client";

import React from "react";
import DiagnosticCalculator from "./DiagnosticCalculator";
import ServiceCatalog from "./ServiceCatalog";
import PricingTiers from "./PricingTiers";
import CaseStudies from "./CaseStudies";
import IntakeSection from "./IntakeSection";
import { 
  Globe, 
  ShieldCheck, 
  Zap, 
  ArrowDown, 
  CheckCircle2, 
  Sparkles,
  ServerOff,
  Cpu
} from "lucide-react";

export const DigitalServicesHub: React.FC = () => {
  return (
    <div className="w-full flex flex-col space-y-16 py-6">
      {/* Hero Section Spesifik Layanan Digital */}
      <section className="w-full max-w-6xl mx-auto px-4 text-center space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200/80">
          <ServerOff className="w-3.5 h-3.5 text-teal-700" />
          <span>REKAYASA WEB EDGE SERVERLESS BEBAS SEWA BULANAN</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Website Berperforma Tinggi, Hemat Biaya Server &amp; Siap Menghasilkan Penjualan
        </h1>

        <p className="text-sm sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Bebaskan bisnis Anda dari jebakan hosting lambat dan sewa server bulanan yang boros. Kami membangun situs profil, landing page iklan, katalog industri B2B, dan menyelamatkan website yang rusak dengan arsitektur edge modern.
        </p>

        {/* 3 Sorotan Metrik Nilai */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs font-mono text-slate-700">
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Biaya Server Tetap: Rp 0/bulan</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Kecepatan LCP: &lt; 1,0 Detik</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>100% Hak Milik Kode &amp; Domain</span>
          </div>
        </div>

        {/* Navigasi Pintas Seksi */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <a
            href="#kalkulator-diagnostik"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            <span>Kalkulator Penghematan</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
          <a
            href="#katalog-layanan"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <span>Daftar Paket Layanan</span>
          </a>
          <a
            href="#studi-kasus"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <span>Studi Kasus Empiris</span>
          </a>
        </div>
      </section>

      {/* Seksi 1: Kalkulator Diagnostik */}
      <DiagnosticCalculator />

      {/* Seksi 2: Katalog Paket Layanan Terdefinisi */}
      <ServiceCatalog />

      {/* Seksi 3: Transparansi Harga & Termin 50/50 */}
      <PricingTiers />

      {/* Seksi 4: Bank Bukti Studi Kasus Sebelum vs Sesudah */}
      <CaseStudies />

      {/* Seksi 5: Alur Intake & Kontak Langsung WhatsApp */}
      <IntakeSection />
    </div>
  );
};

export default DigitalServicesHub;
