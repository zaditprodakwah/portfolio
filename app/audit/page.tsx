import { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle,
  FileCheck2,
  Lock
} from "lucide-react";
import { DiagnosticHub } from "@/components/diagnostic/DiagnosticHub";

export const metadata: Metadata = {
  title: "Alat Audit Kesiapan Bisnis, Riset SINTA & Web SEO Gratis | Muhammad Khoiruzzadittaqwa",
  description: "Uji kelayakan naskah SINTA, proposal bisnis/pitch deck, SOP operasional, dan skor Core Web Vitals secara objektif. Deteksi titik lemah kritis sebelum mengalami penolakan.",
  alternates: {
    canonical: "https://zadit.pages.dev/audit"
  },
  openGraph: {
    title: "Alat Audit Kesiapan Bisnis, Riset SINTA & Web SEO | Zadit Diagnostic OS",
    description: "Evaluasi naskah jurnal, pitch deck, SOP, dan kecepatan web Anda dalam 90 detik. Dapatkan skor kelayakan dan 3 rekomendasi perbaikan instan.",
    url: "https://zadit.pages.dev/audit",
    images: [
      {
        url: "https://zadit.pages.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zadit Diagnostic OS - Alat Audit Bisnis, Riset & Web"
      }
    ]
  }
};

export default function AuditPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Zadit Readiness Diagnostic & Web Auditor",
        "url": "https://zadit.pages.dev/audit",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "IDR"
        },
        "creator": {
          "@type": "Person",
          "name": "Muhammad Khoiruzzadittaqwa",
          "url": "https://zadit.pages.dev"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Beranda",
            "item": "https://zadit.pages.dev"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Alat Audit Kesiapan",
            "item": "https://zadit.pages.dev/audit"
          }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-teal-500 selection:text-slate-950 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Breadcrumb & Return Nav */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-teal-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda Portofolio</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <span>Sistem Diagnostik</span>
            <span>/</span>
            <span className="text-teal-400 font-bold">Audit Kesiapan</span>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="max-w-4xl mx-auto px-4 pt-10 pb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-teal-500/10 text-teal-400 border border-teal-500/30 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SCORECARD MARKETING & DIAGNOSTIC SYSTEM</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight mb-4 max-w-2xl mx-auto">
          Deteksi Titik Kritis Kegagalan Sebelum Penolakan atau Kerugian
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Jangan biarkan naskah jurnal Anda di-reject editor, proposal investasi diragukan pemodal, atau website mobile lambat membuang calon klien. Dapatkan penilaian objektif dalam 90 detik.
        </p>

        {/* Guarantees Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-6 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% Gratis & Tanpa Registrasi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-teal-400" />
            <span>Data Diproses di Browser (Privasi Terjamin)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-indigo-400" />
            <span>Standar Evaluasi Industri</span>
          </div>
        </div>
      </header>

      {/* Main Diagnostic Hub Interactive Engine */}
      <section className="max-w-4xl mx-auto px-4">
        <DiagnosticHub />
      </section>

      {/* Edukasi Masalah & FAQ Substantif */}
      <section className="max-w-3xl mx-auto px-4 pt-16 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
            Mengapa Uji Diagnostik Dini Sangat Krusial?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Biaya memperbaiki kegagalan pasca-kejadian selalu berkali-kali lipat lebih mahal dibanding audit pencegahan awal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="font-heading font-bold text-sm text-slate-200">
              Riset Akademik & SINTA
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Penolakan naskah (Desk Reject) membuang waktu 3–6 bulan siklus penerbitan jurnal. Memastikan gap novelty sejak awal mengamankan naskah langsung masuk tahap peer-review.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="font-heading font-bold text-sm text-slate-200">
              Pitch Deck & Proposal
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Investor hanya membutuhkan 2 menit untuk menolak proposal yang memiliki kalkulasi unit economics kabur. Model keuangan presisi menjamin kredibilitas founder.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="font-heading font-bold text-sm text-slate-200">
              Web Performa & Konversi
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Setiap 1 detik keterlambatan muat di smartphone memangkas 7% konversi penjualan. Audit Core Web Vitals memastikan situs Anda cepat dan ramah algoritma Google.
            </p>
          </div>
        </div>

        {/* Reassurance Footer */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
          <p className="text-xs text-slate-400">
            Ingin mendiskusikan dokumen atau arsitektur sistem Anda secara personal?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#consultation"
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
            >
              <span>Kalkulator Estimasi Proyek</span>
            </Link>
            <Link
              href="/cv"
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-xs font-bold transition-colors border border-teal-500/40"
            >
              <span>Periksa Rekam Jejak CV Zadit</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
