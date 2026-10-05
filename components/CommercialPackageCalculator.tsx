"use client";

import React, { useState } from "react";
import { Calculator, MessageSquare, ArrowRight, CheckCircle2, ShieldCheck, Clock } from "lucide-react";
import { cvProfile } from "@/lib/cv-data";

interface ServiceOption {
  id: string;
  category: string;
  name: string;
  basePrice: number;
  slaDays: number;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  { id: "promo-web-300rb", category: "Web", name: "Website Bisnis Siap Pakai Termasuk Domain (.my.id/.biz.id/subdomain)", basePrice: 300000, slaDays: 2 },
  { id: "landing-edge", category: "Web", name: "Turnkey High-Converting Landing Page ($0 Cloudflare)", basePrice: 3500000, slaDays: 4 },
  { id: "corporate-edge", category: "Web", name: "Corporate Edge Portal & Directory Engine", basePrice: 9500000, slaDays: 10 },
  { id: "elementor-json", category: "Web", name: "Elementor JSON UI Delivery (Zero Plugin)", basePrice: 4500000, slaDays: 4 },
  { id: "pdf-parser", category: "Data", name: "DocuMorph PDF & Rekening Koran Parser", basePrice: 4500000, slaDays: 3 },
  { id: "jira-engine", category: "Data", name: "Automated Jira/Linear Weekly Report Engine", basePrice: 12500000, slaDays: 7 },
  { id: "pitch-deck", category: "Dokumen", name: "Executive 16:9 Presentation Deck (TasteSkill)", basePrice: 5000000, slaDays: 5 },
  { id: "feasibility", category: "Dokumen", name: "Bankable Business Feasibility & Financial Model", basePrice: 12000000, slaDays: 10 },
  { id: "sem-pls", category: "Riset", name: "Olah Data Statistik SEM-PLS / SmartPLS / Rasch", basePrice: 2500000, slaDays: 4 },
  { id: "prisma-slr", category: "Riset", name: "PRISMA 2020 Systematic Literature Review", basePrice: 8500000, slaDays: 12 },
];

const ADDONS = [
  { id: "pt-invoice", name: "Faktur Pajak & Kontrak Kerjasama PT PRISMA DIGITAL KREATIF Resmi", price: 0, slaPlus: 0 },
  { id: "custom-com-id", name: "Upgrade Domain Premium (.com / .id resmi)", price: 200000, slaPlus: 0 },
  { id: "rush-sla", name: "Layanan Prioritas Kilat (SLA Dipangkas 40%)", price: 500000, slaPlus: -1 },
  { id: "bilingual", name: "Paket Dwi-Bahasa (Naskah Inggris & Indonesia PUEBI)", price: 1500000, slaPlus: 1 },
];


export const CommercialPackageCalculator: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>(["landing-edge"]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["pt-invoice"]);
  const [clientSegment, setClientSegment] = useState<string>("UMKM / Bisnis");
  const [notes, setNotes] = useState<string>("");

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((item) => item !== id)
          : prev
        : [...prev, id]
    );
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Kalkulasi Total Harga & Hari Kerja
  const totalBasePrice = selectedServices.reduce((sum, sId) => {
    const s = SERVICE_OPTIONS.find((opt) => opt.id === sId);
    return sum + (s ? s.basePrice : 0);
  }, 0);

  const totalAddonPrice = selectedAddons.reduce((sum, aId) => {
    const a = ADDONS.find((opt) => opt.id === aId);
    return sum + (a ? a.price : 0);
  }, 0);

  const finalPrice = totalBasePrice + totalAddonPrice;

  const maxServiceSla = Math.max(
    ...selectedServices.map((sId) => {
      const s = SERVICE_OPTIONS.find((opt) => opt.id === sId);
      return s ? s.slaDays : 3;
    })
  );

  const addonSlaChange = selectedAddons.reduce((sum, aId) => {
    const a = ADDONS.find((opt) => opt.id === aId);
    return sum + (a ? a.slaPlus : 0);
  }, 0);

  const finalSla = Math.max(2, maxServiceSla + addonSlaChange);

  // WhatsApp Pre-filled URL Generator
  const generateWhatsAppLink = () => {
    const chosenServiceNames = selectedServices
      .map((id) => SERVICE_OPTIONS.find((s) => s.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const chosenAddonNames = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const text = `Halo Mas Zadit, saya mewakili segmen *${clientSegment}*.

Saya tertarik dengan estimasi solusi berikut:
• Layanan Utama: ${chosenServiceNames}
• Tambahan/Ketentuan: ${chosenAddonNames || "Standar"}
• Estimasi Investasi: Rp${finalPrice.toLocaleString("id-ID")}
• Target Waktu (SLA): Sekitar ${finalSla} hari kerja
${notes ? `• Catatan Kebutuhan: ${notes}\n` : ""}
Apakah kita bisa meninjau kesiapan brief dan jadwal pengerjaan ini? Terima kasih!`;

    return `https://wa.me/6282316363177?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-teal-800 uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full">
            <Calculator className="w-3.5 h-3.5 text-teal-700" />
            <span>Kalkulator Kebutuhan & Estimasi Transparan</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
            Simulasikan Lingkup Pekerjaan & Anggaran Anda
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Pilih modul yang dibutuhkan untuk melihat estimasi hari kerja dan nilai investasi transparan dalam rupiah.
          </p>
        </div>

        {/* Profil Hukum PT */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-right hidden sm:block">
          <p className="text-[11px] font-mono text-slate-500">Badan Usaha Resmi:</p>
          <p className="text-xs font-bold text-slate-800">PT PRISMA DIGITAL KREATIF</p>
          <p className="text-[10px] text-teal-800 font-mono">NIB: 1801250039976</p>
        </div>
      </div>

      {/* Step 1: Segmen Klien */}
      <div className="space-y-3">
        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block">
          1. Pilih Profil Entitas Anda:
        </label>
        <div className="flex flex-wrap gap-2">
          {["Individu / Akademisi", "UMKM / Bisnis", "Korporasi B2B", "Lembaga Pendidikan / Kampus", "Yayasan / Lembaga Dakwah"].map((seg) => (
            <button
              key={seg}
              type="button"
              onClick={() => setClientSegment(seg)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                clientSegment === seg
                  ? "bg-slate-900 text-white shadow-xs font-bold"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {seg}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Pilihan Layanan Utama */}
      <div className="space-y-3">
        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block">
          2. Pilih Modul Layanan Utama (Bisa Pilih Lebih Dari Satu):
        </label>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICE_OPTIONS.map((opt) => {
            const isChecked = selectedServices.includes(opt.id);
            return (
              <div
                key={opt.id}
                onClick={() => toggleService(opt.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isChecked
                    ? "bg-teal-50/70 border-teal-600 shadow-xs"
                    : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-teal-800">
                    {opt.category}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isChecked
                        ? "bg-teal-700 border-teal-700 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-900 leading-snug">
                  {opt.name}
                </p>
                <div className="flex items-center justify-between text-xs font-mono pt-1 border-t border-slate-200/50">
                  <span className="font-extrabold text-slate-900">
                    Rp {opt.basePrice.toLocaleString("id-ID")}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    ~{opt.slaDays} Hari
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 3: Add-ons & Legalitas */}
      <div className="space-y-3">
        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block">
          3. Opsi Kemitraan & Tambahan:
        </label>
        <div className="grid sm:grid-cols-3 gap-3">
          {ADDONS.map((addon) => {
            const isChecked = selectedAddons.includes(addon.id);
            return (
              <div
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                  isChecked
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                    isChecked
                      ? "bg-teal-500 border-teal-500 text-slate-950"
                      : "border-slate-400 bg-white"
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold leading-snug">{addon.name}</p>
                  <p
                    className={`font-mono text-[11px] ${
                      isChecked ? "text-teal-300" : "text-slate-500"
                    }`}
                  >
                    {addon.price === 0
                      ? "Sudah Termasuk (Gratis)"
                      : `+Rp${addon.price.toLocaleString("id-ID")}`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 4: Ringkasan & CTA */}
      <div className="bg-[#1C1322] rounded-2xl p-6 sm:p-7 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md border border-[#8F652E]/40">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880]">
            <Clock className="w-3.5 h-3.5" />
            <span>Estimasi Waktu Pengerjaan: Sekitar {finalSla} Hari Kerja</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-mono text-zinc-400">Total Estimasi:</span>
            <span className="text-3xl sm:text-4xl font-heading font-extrabold text-[#C5A880] tracking-tight">
              Rp {finalPrice.toLocaleString("id-ID")}
            </span>
          </div>
          <p className="text-xs text-zinc-300 max-w-xl leading-relaxed">
            Estimasi bersifat transparan tanpa biaya langganan server bulanan tersembunyi. Pembayaran menggunakan termin aman 50% di awal dan 50% setelah serah terima hasil kerja.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row gap-3">
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Pesan via WhatsApp Sekarang</span>
          </a>
        </div>
      </div>
    </div>
  );
};
