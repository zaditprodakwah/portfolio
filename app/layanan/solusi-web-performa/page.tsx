import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import { DirectAnswerBox } from "@/components/DirectAnswerBox";
import { EntityPills } from "@/components/EntityPills";
import { ProtectedContact } from "@/components/ProtectedContact";

export const metadata: Metadata = {
  title: "Solusi Web Cepat, Modern & Aksesibel | Zadit Growth",
  description: "Pengembangan situs web bisnis berkecepatan tinggi (LCP < 1s), bebas lag, keterbacaan tinggi, responsif, dan integrasi WhatsApp instan.",
  alternates: {
    canonical: "https://muhzadit.pages.dev/layanan/solusi-web-performa/"
  },
  openGraph: {
    title: "Solusi Web Cepat, Modern & Aksesibel | Zadit Growth",
    description: "Pengembangan situs web bisnis berkecepatan tinggi (LCP < 1s), bebas lag, keterbacaan tinggi, responsif, dan integrasi WhatsApp instan.",
    url: "https://muhzadit.pages.dev/layanan/solusi-web-performa/",
    images: [
      {
        url: "https://muhzadit.pages.dev/og-web-performa.jpg",
        width: 1200,
        height: 630,
        alt: "Solusi Web Cepat, Modern & Aksesibel | Zadit Growth",
        type: "image/jpeg"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Solusi Web Cepat, Modern & Aksesibel | Zadit Growth",
    description: "Pengembangan situs web bisnis berkecepatan tinggi (LCP < 1s), bebas lag, keterbacaan tinggi, responsif, dan integrasi WhatsApp instan.",
    images: ["https://muhzadit.pages.dev/og-web-performa.jpg"]
  }
};

export default function DigitalSolutionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Solusi Web Performa & Edge Engineering",
    "provider": {
      "@type": "Person",
      "name": "Muhammad Khoiruzzadittaqwa",
      "url": "https://muhzadit.pages.dev/"
    },
    "description": "Layanan optimasi performa web, komputasi tepi Cloudflare, perbaikan LCP dan INP, serta arsitektur web modern tanpa biaya langganan server bulanan.",
    "areaServed": "ID"
  };

  return (
    <div className="min-h-screen bg-alabaster py-12 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-teal-800 hover:text-teal-950 uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Utama</span>
        </Link>

        {/* Header Title */}
        <header className="space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200">
            <Globe className="w-3.5 h-3.5" />
            Pilar Layanan 04
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
            Solusi Web Performa & Edge Engineering
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
            Membangun dan memodernisasi infrastruktur web yang memuat instan di jaringan ponsel pengguna, memenuhi standar aksesibilitas universal, dan bebas dari beban biaya langganan server bulanan.
          </p>
        </header>

        {/* Direct-Answer BLUF */}
        <DirectAnswerBox
          summary="Sebagian besar situs web bisnis dan lembaga menjadi lambat bukan karena kekurangan kapasitas server, melainkan akibat penumpukan plugin yang tidak perlu dan arsitektur kode yang berat di sisi browser pengguna. Solusi kami mengembalikan esensi performa: kompilasi statis (SSG) yang disajikan langsung dari jaringan tepi (Edge CDN) secara instan dan tanpa biaya sewa VPS."
          takeaways={[
            "Kecepatan muat halaman ponsel di bawah 1 detik (LCP < 1.0s, TTFB < 30ms).",
            "Skor performa Google PageSpeed Insights 95-100 di desktop maupun smartphone.",
            "Infrastruktur edge global Cloudflare dengan garansi 100% $0 biaya hosting selamanya.",
            "Pendekatan ramah sistem klien: dapat diterapkan pada situs modern maupun optimasi platform eksisting (WordPress)."
          ]}
        />

        {/* Triad Framework */}
        <section className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Kerangka Kerja Strategis (Triad Framework)
          </h2>

          <div className="space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-amber-500">
              <h3 className="font-bold text-slate-900 mb-1">1. Dilema & Kecemasan Pemangku Kepentingan</h3>
              <p>
                Klien lelah dengan tagihan sewa hosting dan server yang membengkak tiap bulan padahal trafik sedang stabil. Di sisi lain, ada kekhawatiran website tiba-tiba *down* saat promosi atau kampanye donasi sedang berlangsung.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-teal-600">
              <h3 className="font-bold text-slate-900 mb-1">2. Navigasi Politik & Diplomasi Kerja</h3>
              <p>
                Menghilangkan ketergantungan pada vendor server (vendor lock-in). Kami menerjemahkan keputusan arsitektur teknologi ke dalam bahasa efisiensi anggaran kas organisasi yang mudah disetujui direktur keuangan atau bendahara yayasan.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-emerald-600">
              <h3 className="font-bold text-slate-900 mb-1">3. Eksekusi & Deliverable Tahan Uji</h3>
              <p>
                Cetak biru arsitektur web modern, pembersihan aset berat, optimasi caching HTTP dengan aturan stale-while-revalidate, serta jaminan web tahan terhadap lonjakan pengunjung tanpa server down.
              </p>
            </div>
          </div>
        </section>

        {/* Solusi Programmatik Terkait (Spokes) */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Solusi Terfokus & Studi Kasus Spesifik:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/solusi/audit-technical-seo-core-web-vitals"
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-600 shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200 inline-block mb-2">
                  Kecepatan & Caching Edge
                </span>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-teal-800 transition-colors mb-2">
                  Audit Technical SEO & Core Web Vitals
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Skor PageSpeed 99/100, LCP 0.6 detik, dan pemangkasan 100% biaya server dengan Cloudflare Pages.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-teal-700 mt-4 pt-2 border-t border-slate-100">
                <span>Bedah Solusi & Matriks Kasus</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

        {/* Entity Pills */}
        <EntityPills
          entityIds={["web-engineering", "core-web-vitals", "technical-seo"]}
          title="Entitas Knowledge Graph Terkait"
        />

        {/* CTA Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold">Ingin Website Cepat & Bebas Tagihan Server?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Konsultasikan arsitektur web modern yang ringan dan efisien bersama kami.
            </p>
          </div>
          <ProtectedContact
            type="whatsapp"
            label="Konsultasi Web via WhatsApp"
            prefillMessage="Halo Mas Zadit, saya membaca halaman Solusi Web Performa di muhzadit.pages.dev dan ingin berdiskusi mengenai optimasi kecepatan website kami."
            className="shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-xl shadow-xs transition-all"
          />
        </div>
      </div>
    </div>
  );
}
