"use client";

import { useState, useMemo } from "react";
import { MessageSquare } from "lucide-react";

const KATEGORI = [
  {
    id: "karir",
    label: "Karir, CV ATS & Profil LinkedIn",
    deskripsi: "Formula Google XYZ, custom banner 1584x396, Zero-Password Blueprint, Tri Dharma",
    base: 350000,
    skalaLabel: [
      "Profil LinkedIn Mandiri (Blueprint + Banner)",
      "The Double Threat: CV ATS + LinkedIn Overhaul",
      "Academic & Executive Prestige: Tri Dharma / Founder B2B"
    ],
    skalaMulti: [1, 1.5714, 2.7142],
  },
  {
    id: "sempro",
    label: "Ringkasan Kuliah & Persiapan Sempro",
    deskripsi: "Exam-ready synthesis, transkrip bebas noise, prediksi soal, bedah metopen",
    base: 250000,
    skalaLabel: [
      "Exam-Ready Synthesis (Transkrip + Kisi-kisi)",
      "Dossier Pertahanan Sempro Bab 1-3",
      "Pendampingan Metodologi Sempro Lengkap"
    ],
    skalaMulti: [1, 2, 3.8],
  },
  {
    id: "website",
    label: "Website bisnis baru",
    deskripsi: "Landing page, company profile, toko sederhana, undangan digital",
    base: 300000,
    skalaLabel: ["1 halaman", "3-5 halaman", "Dengan fitur khusus"],
    skalaMulti: [1, 2.2, 3.8],
  },
  {
    id: "seo",
    label: "SEO & visibilitas Google",
    deskripsi: "Riset kata kunci, audit, optimasi konten",
    base: 750000,
    skalaLabel: ["Audit & laporan", "Optimasi + konten", "Strategi penuh + monitor"],
    skalaMulti: [1, 1.8, 3.2],
  },
  {
    id: "dokumen",
    label: "Dokumen bisnis resmi",
    deskripsi: "Proposal, SOP, profil lembaga, laporan",
    base: 500000,
    skalaLabel: ["1 dokumen (s.d. 10 hal)", "Paket 3-5 dokumen", "Dokumen kompleks + revisi penuh"],
    skalaMulti: [1, 2.5, 4.5],
  },
  {
    id: "data",
    label: "Olah data & analitik",
    deskripsi: "SPSS, mining, scraping, laporan riset, SINTA",
    base: 400000,
    skalaLabel: ["Data ringan (s.d. 500 responden)", "Menengah + visualisasi", "Kompleks + pendampingan publikasi"],
    skalaMulti: [1, 2, 4],
  },
  {
    id: "audit",
    label: "Audit & perbaikan website",
    deskripsi: "Kecepatan, SEO teknis, mobile, Core Web Vitals",
    base: 350000,
    skalaLabel: ["Laporan audit saja", "Audit + perbaikan minor", "Audit + perbaikan menyeluruh"],
    skalaMulti: [1, 2, 3.5],
  },
];

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(n / 50000) * 50000);
}

export function SolusiCalculator() {
  const [selectedKategori, setSelectedKategori] = useState<string | null>(null);
  const [selectedSkala, setSelectedSkala] = useState<number>(0);
  const [catatan, setCatatan] = useState("");

  const kategori = KATEGORI.find((k) => k.id === selectedKategori);

  const estimasi = useMemo(() => {
    if (!kategori) return null;
    return kategori.base * kategori.skalaMulti[selectedSkala];
  }, [kategori, selectedSkala]);

  const waMessage = useMemo(() => {
    if (!kategori) return "";
    const skalaText = kategori.skalaLabel[selectedSkala];
    const estimasiText = estimasi ? formatRupiah(estimasi) : "";
    const catatanText = catatan.trim() ? `\n\nCatatan tambahan: ${catatan.trim()}` : "";
    return encodeURIComponent(
      `Halo Mas Zadit, saya ingin konsultasi tentang layanan *${kategori.label}* (skala: ${skalaText}).\n\nEstimasi awal yang muncul di kalkulator: ${estimasiText}.${catatanText}\n\nBoleh kita diskusikan lebih lanjut?`
    );
  }, [kategori, selectedSkala, estimasi, catatan]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-8">
      {/* Step 1: Pilih kategori */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-slate-800">
          1. Anda butuh bantuan untuk apa?
        </p>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {KATEGORI.map((k) => (
            <button
              key={k.id}
              onClick={() => {
                setSelectedKategori(k.id);
                setSelectedSkala(0);
              }}
              className={`text-left p-3.5 rounded-xl border text-sm transition-all ${
                selectedKategori === k.id
                  ? "border-teal-500 bg-teal-50 text-teal-900"
                  : "border-slate-200 hover:border-slate-300 text-slate-700"
              }`}
            >
              <span className="font-semibold block">{k.label}</span>
              <span className="text-xs text-slate-400 mt-0.5 block">{k.deskripsi}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Pilih skala */}
      {kategori && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-800">2. Seberapa besar proyeknya?</p>
          <div className="flex flex-col gap-2">
            {kategori.skalaLabel.map((label, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSkala(idx)}
                className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                  selectedSkala === idx
                    ? "border-teal-500 bg-teal-50 text-teal-900 font-semibold"
                    : "border-slate-200 hover:border-slate-300 text-slate-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Catatan opsional */}
      {kategori && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-800">
            3. Ada hal spesifik yang ingin Anda sampaikan?{" "}
            <span className="font-normal text-slate-400">(opsional)</span>
          </p>
          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            rows={3}
            placeholder="Misal: saya punya toko parfum, butuh website yang ada katalog produknya..."
            className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none placeholder-slate-300 text-slate-700"
          />
        </div>
      )}

      {/* Estimasi & CTA */}
      {estimasi && kategori && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Estimasi biaya
            </p>
            <p className="text-3xl font-heading font-black text-teal-700 mt-1">
              {formatRupiah(estimasi)}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Angka ini adalah perkiraan awal. Harga final dikonfirmasi setelah diskusi singkat
              via WhatsApp, tanpa komitmen apapun.
            </p>
          </div>

          <a
            href={`https://wa.me/6282316363177?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            Konsultasikan Kebutuhan via WhatsApp
          </a>

          <p className="text-center text-xs text-slate-400">
            Atau kirim email ke{" "}
            <a
              href="mailto:muhzadit@gmail.com"
              className="text-teal-600 hover:underline font-medium"
            >
              muhzadit@gmail.com
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
