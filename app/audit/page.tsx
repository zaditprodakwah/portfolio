import type { Metadata } from "next";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck2, 
  Lock, 
  ExternalLink,
  Zap
} from "lucide-react";
import { DiagnosticHub } from "@/components/diagnostic/DiagnosticHub";

export const metadata: Metadata = {
  title: "Alat Audit Kesiapan Bisnis, Riset SINTA & Web SEO | Zadit Diagnostic OS",
  description: "Evaluasi naskah jurnal, pitch deck, SOP, dan kecepatan web Anda dalam 90 detik. Dapatkan skor kelayakan dan 3 rekomendasi perbaikan instan.",
  alternates: {
    canonical: "https://muhzadit.pages.dev/audit/"
  },
  openGraph: {
    title: "Alat Audit Kesiapan Bisnis, Riset SINTA & Web SEO | Zadit Diagnostic OS",
    description: "Evaluasi naskah jurnal, pitch deck, SOP, dan kecepatan web Anda dalam 90 detik. Dapatkan skor kelayakan dan 3 rekomendasi perbaikan instan.",
    url: "https://muhzadit.pages.dev/audit/",
    images: [
      {
        url: "https://muhzadit.pages.dev/og-audit.jpg",
        width: 1200,
        height: 630,
        alt: "Zadit Diagnostic OS - Alat Audit Bisnis, Riset & Web",
        type: "image/jpeg"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Alat Audit Kesiapan Bisnis, Riset SINTA & Web SEO | Zadit Diagnostic OS",
    description: "Evaluasi naskah jurnal, pitch deck, SOP, dan kecepatan web Anda dalam 90 detik.",
    images: ["https://muhzadit.pages.dev/og-audit.jpg"]
  }
};

export default function AuditPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Zadit Readiness Diagnostic & Web Auditor",
        "url": "https://muhzadit.pages.dev/audit/",
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
          "url": "https://muhzadit.pages.dev/"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Beranda",
            "item": "https://muhzadit.pages.dev/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Alat Audit Kesiapan",
            "item": "https://muhzadit.pages.dev/audit/"
          }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-alabaster text-slate-900 selection:bg-teal-100 selection:text-teal-900 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Breadcrumb & Return Nav */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-200/90 bg-white/90 backdrop-blur-md sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-teal-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            <span>Kembali ke Beranda Portofolio</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <span>Sistem Diagnostik</span>
            <span>/</span>
            <span className="text-teal-800 font-bold">Audit Kesiapan</span>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="max-w-4xl mx-auto px-4 pt-10 pb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200/80 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-teal-700" />
          <span>SCORECARD & DIAGNOSTIC SYSTEM</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight mb-4 max-w-2xl mx-auto">
          Deteksi Titik Kritis Kegagalan Sebelum Penolakan atau Kerugian
        </h1>

        <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed font-sans">
          Jangan biarkan naskah jurnal Anda di-reject editor, proposal investasi diragukan pemodal, atau website mobile lambat membuang calon klien. Dapatkan penilaian objektif dalam 90 detik.
        </p>

        {/* Guarantees Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-6 text-xs text-slate-600 font-mono">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-700" />
            <span>100% Gratis & Tanpa Registrasi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-teal-700" />
            <span>Data Diproses di Browser (Privasi Terjamin)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-teal-700" />
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
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
            Mengapa Uji Diagnostik Dini Sangat Krusial?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Biaya memperbaiki kegagalan pasca-kejadian selalu berkali-kali lipat lebih mahal dibanding audit pencegahan awal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="font-heading font-bold text-sm text-slate-900">
              Riset Akademik & SINTA
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Penolakan naskah (Desk Reject) membuang waktu 3–6 bulan siklus penerbitan jurnal. Memastikan gap novelty sejak awal mengamankan naskah langsung masuk tahap peer-review.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="font-heading font-bold text-sm text-slate-900">
              Pitch Deck & Proposal
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Investor hanya membutuhkan 2 menit untuk menolak proposal yang memiliki kalkulasi unit economics kabur. Model keuangan presisi menjamin kredibilitas founder.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="font-heading font-bold text-sm text-slate-900">
              Web Performa & Konversi
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Setiap 1 detik keterlambatan muat di smartphone memangkas 7% konversi penjualan. Audit Core Web Vitals memastikan situs Anda cepat dan ramah algoritma Google.
            </p>
          </div>
        </div>

        {/* Reassurance Footer */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs text-center space-y-3">
          <p className="text-xs text-slate-700">
            Ingin mendiskusikan dokumen atau arsitektur sistem Anda secara personal?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#consultation"
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors"
            >
              <span>Mulai Diskusi Kebutuhan</span>
            </Link>
            <Link
              href="/cv"
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors border border-slate-200"
            >
              <span>Periksa Rekam Jejak CV Zadit</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
