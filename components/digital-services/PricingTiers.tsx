"use client";

import React from "react";
import { 
  ShieldCheck, 
  CheckCircle2, 
  Coins, 
  Lock, 
  FileCode, 
  CreditCard,
  ArrowRight
} from "lucide-react";

export const PricingTiers: React.FC = () => {
  const tiers = [
    {
      name: "Quick-Launch Foundation",
      price: "Rp 2,5 Juta - Rp 5 Juta",
      description: "Ideal untuk UMKM dan profesional yang butuh situs profil bisnis pertama yang cepat dan elegan.",
      timeline: "5 - 7 Hari",
      features: [
        "1 - 5 Halaman Web Responsif",
        "Arsitektur Edge Cloudflare $0 Server",
        "Katalog Jasa & Alur Kontak WhatsApp",
        "Optimasi Core Web Vitals Hijau",
        "Serah Terima Kode Sumber Penuh"
      ],
      ctaText: "Mulai Paket Foundation",
      highlight: false
    },
    {
      name: "Website Rescue & Modernize",
      price: "Rp 3,5 Juta - Rp 7,5 Juta",
      description: "Solusi penyelamatan darurat untuk situs lambat, terkena malware, atau ditinggalkan vendor lama.",
      timeline: "3 - 7 Hari (Audit 48 Jam)",
      features: [
        "Audit Forensik Keamanan 48 Jam",
        "Pembersihan Malware & Celah Injeksi",
        "Migrasi ke Edge Serverless $0 Server",
        "Pemulihan Skor Kecepatan LCP < 1,0s",
        "Pengembalian Otoritas Akun Domain"
      ],
      ctaText: "Selamatkan Website Anda",
      highlight: true
    },
    {
      name: "B2B Custom Workflow",
      price: "Rp 8 Juta - Rp 20 Juta",
      description: "Dirancang untuk distributor, pabrik manufaktur, dan bisnis spesifikasi teknis industri.",
      timeline: "10 - 20 Hari",
      features: [
        "Katalog Spesifikasi Komponen Ratusan Item",
        "Formulir Permintaan Penawaran Harga (RFQ)",
        "Unduh Dokumen Teknis PDF 1-Klik",
        "Struktur Data Schema.org Product B2B",
        "Pelatihan Pengelolaan Data Mandiri"
      ],
      ctaText: "Konsultasikan Sistem B2B",
      highlight: false
    },
    {
      name: "Managed Care Retainer",
      price: "Rp 500rb - Rp 1,5 Juta / bln",
      description: "Pendampingan rutin bulanan untuk menjaga stabilitas performa, keamanan, dan pembaruan konten minor.",
      timeline: "Langganan Fleksibel",
      features: [
        "Pemantauan Uptime 24/7 & SSL Terkelola",
        "Pemeriksaan Cadangan Data Tiap Pekan",
        "SLA Respons Darurat Maksimal 4 Jam",
        "Alokasi 3 Jam Pembaruan Konten / Bulan",
        "Laporan Analitik Trafik Berkala"
      ],
      ctaText: "Amankan Retainer Web",
      highlight: false
    }
  ];

  const createWhatsAppUrl = (tierName: string) => {
    const phone = "6282316363177";
    const text = encodeURIComponent(
      `Halo Zadit, saya ingin berkonsultasi mengenai paket *${tierName}*. Mohon informasi ketersediaan slot pengerjaan minggu ini.`
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <section 
      id="transparansi-harga" 
      aria-label="Tabel Transparansi Harga dan Termin Pembayaran"
      className="w-full max-w-6xl mx-auto px-4 py-12"
    >
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200/80">
          <Coins className="w-3.5 h-3.5 text-teal-700" />
          <span>TRANSPARANSI EKONOMI TANPA BIAYA TERSEMBUNYI</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Struktur Investasi Terukur &amp; Termin Pembayaran 50/50
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Kami menolak skema harga manipulatif. Semua estimasi dipatok sesuai kompleksitas luaran dengan kepastian pembayaran berimbang yang adil bagi kedua belah pihak.
        </p>
      </div>

      {/* Grid 4 Tier Komersial */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {tiers.map((t, idx) => (
          <div
            key={idx}
            className={`flex flex-col justify-between rounded-2xl p-6 transition-all ${
              t.highlight
                ? "bg-slate-900 text-white border-2 border-teal-500 shadow-lg scale-102"
                : "bg-white border border-slate-200 text-slate-900 shadow-xs"
            }`}
          >
            <div className="space-y-4">
              {t.highlight && (
                <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider bg-teal-500 text-slate-950 px-2 py-0.5 rounded">
                  Paling Banyak Diminati
                </span>
              )}

              <div>
                <h3 className="text-base font-bold leading-snug">
                  {t.name}
                </h3>
                <div className={`text-xl font-extrabold font-mono mt-2 ${t.highlight ? "text-teal-400" : "text-slate-900"}`}>
                  {t.price}
                </div>
                <div className={`text-[11px] font-mono mt-1 ${t.highlight ? "text-slate-400" : "text-slate-500"}`}>
                  Durasi: {t.timeline}
                </div>
              </div>

              <p className={`text-xs leading-relaxed ${t.highlight ? "text-slate-300" : "text-slate-600"}`}>
                {t.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-200/20">
                <div className={`text-[11px] font-bold uppercase tracking-wider ${t.highlight ? "text-slate-400" : "text-slate-500"}`}>
                  Cakupan Utama:
                </div>
                <ul className="space-y-2 text-xs">
                  {t.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${t.highlight ? "text-teal-400" : "text-emerald-600"}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200/20">
              <a
                href={createWhatsAppUrl(t.name)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors ${
                  t.highlight
                    ? "bg-teal-400 hover:bg-teal-300 text-slate-950"
                    : "bg-slate-900 hover:bg-teal-700 text-white"
                }`}
              >
                <span>{t.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* 3 Pilar Perlindungan Klien (Guardrails) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-teal-100 text-teal-800 shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Termin Pembayaran 50/50</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              50% uang muka ditransfer untuk mengunci slot kalender eksekusi. Pelunasan 50% sisanya hanya dibayarkan setelah seluruh kriteria serah terima tervalidasi bersama di domain staging.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-teal-100 text-teal-800 shrink-0">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">100% Hak Milik Kode &amp; Aset</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Seluruh kode sumber, konfigurasi domain, dan kredensial diserahkan penuh kepada Anda. Bebas biaya royalti tersembunyi dan nol penguncian vendor (zero vendor lock-in).
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-teal-100 text-teal-800 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Bebas Biaya Server Tetap</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Website dideploy ke infrastruktur static edge Cloudflare Pages dengan batas gratis tanpa batas bandwidth, menghemat pengeluaran sewa hosting Rp 1,8 juta hingga Rp 6 juta setiap tahun.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
