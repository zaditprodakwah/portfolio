"use client";

import React, { useState } from "react";
import servicesData from "@/content/digital-services/services_seed.json";
import { 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Sparkles 
} from "lucide-react";

export const ServiceCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Semua Layanan (6)" },
    { id: "Fondasi Bisnis", label: "Fondasi & Peluncur Cepat" },
    { id: "Optimasi & Pemulihan", label: "Penyelamatan Situs" },
    { id: "Pertumbuhan Penjualan", label: "Landing Page Konversi" },
    { id: "Sistem B2B", label: "Katalog & RFQ Industri" },
    { id: "Layanan Berkelanjutan", label: "Pemeliharaan Rutin" },
  ];

  const filteredServices = selectedCategory === "all"
    ? servicesData
    : servicesData.filter(s => s.category === selectedCategory);

  const createWhatsAppInquiry = (serviceName: string, displayPrice: string) => {
    const phone = "6282316363177";
    const text = encodeURIComponent(
      `Halo Zadit, saya tertarik dengan layanan *${serviceName}* (${displayPrice}). Saya ingin berdiskusi mengenai ruang lingkup kebutuhan bisnis saya.`
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <section 
      id="katalog-layanan" 
      aria-label="Katalog Layanan Digital Terstruktur"
      className="w-full max-w-6xl mx-auto px-4 py-12"
    >
      {/* Header Seksi */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200/80">
          <Briefcase className="w-3.5 h-3.5 text-teal-700" />
          <span>PAKET LAYANAN BERBASIS HASIL PASTI</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Katalog Layanan Rekayasa Web &amp; Operasional Digital
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Setiap paket memiliki ruang lingkup terdefinisi, estimasi waktu penyelesaian yang terikat, serta jaminan kepemilikan aset digital 100% di tangan Anda.
        </p>

        {/* Tab Filter Kategori */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Kartu Layanan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="flex flex-col justify-between bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-teal-500/60 hover:shadow-md transition-all"
          >
            <div className="space-y-4">
              {/* Badge & Timeline */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/80">
                  {service.badge}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-slate-600">
                  <Clock className="w-3 h-3 text-slate-600" />
                  {service.timeline}
                </span>
              </div>

              {/* Judul & Sasaran */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {service.summary}
                </p>
              </div>

              {/* Nilai Investasi Transparan */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] font-mono text-slate-600">Rentang Investasi</div>
                <div className="text-lg font-extrabold font-mono text-slate-900 mt-0.5">
                  {service.priceRange.display}
                </div>
                <div className="text-[10px] text-slate-600 mt-1 font-mono">
                  {service.priceRange.terms}
                </div>
              </div>

              {/* Luaran Pasti (In-Scope) */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                  <span>Luaran Pasti (In-Scope):</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Batasan Ruang Lingkup (Out-of-Scope) */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  Batasan Ruang Lingkup:
                </div>
                <ul className="space-y-1 text-[11px] text-slate-600">
                  {service.outOfScope.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <XCircle className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tombol Aksi Pesan WhatsApp */}
            <div className="pt-6 mt-6 border-t border-slate-100">
              <a
                href={createWhatsAppInquiry(service.name, service.priceRange.display)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-900 hover:bg-teal-700 text-white transition-colors"
              >
                <span>Konsultasikan Paket Ini</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceCatalog;
