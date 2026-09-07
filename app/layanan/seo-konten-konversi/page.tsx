import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Search, ArrowRight, CheckCircle2 } from "lucide-react";
import { DirectAnswerBox } from "@/components/DirectAnswerBox";
import { EntityPills } from "@/components/EntityPills";
import { ProtectedContact } from "@/components/ProtectedContact";

export const metadata: Metadata = {
  title: "SEO, Konten & Konversi Digital | Zadit Growth",
  description: "Layanan strategi SEO organik, riset kata kunci komersial berniat tinggi, penataan arsitektur silo, dan konten edukatif yang melipatgandakan qualified inbound leads.",
  alternates: {
    canonical: "https://zadit.pages.dev/layanan/seo-konten-konversi"
  }
};

export default function MarketingSeoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "SEO, Konten & Konversi Digital",
    "provider": {
      "@type": "Person",
      "name": "Muhammad Khoiruzzadittaqwa",
      "url": "https://zadit.pages.dev"
    },
    "description": "Layanan strategi SEO on-page, riset kata kunci berniat komersial tinggi, penataan arsitektur tautan internal silo, dan optimasi konversi leads.",
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
            <Search className="w-3.5 h-3.5" />
            Pilar Layanan 02
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
            SEO, Konten & Konversi Digital
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
            Mengubah situs web Anda dari sekadar brosur digital pasif menjadi mesin penjaring calon pembeli berniat tinggi secara organik dan berkelanjutan.
          </p>
        </header>

        {/* Direct-Answer BLUF */}
        <DirectAnswerBox
          summary="Strategi SEO modern bukan tentang memanipulasi algoritma dengan backlink instan (PBN), melainkan membangun Otoritas Topikal (Topical Authority), menyelaraskan arsitektur tautan internal (siloing), dan menghadirkan konten edukasi mendalam yang meyakinkan calon pelanggan untuk bertransaksi."
          takeaways={[
            "Riset kata kunci difokuskan pada problem nyata pembeli (commercial & transactional intent), bukan vanity volume.",
            "Penataan struktur website bebas tautan yatim (zero-orphan architecture) untuk mempercepat perayapan Google.",
            "Penyusunan artikel hub & spoke yang saling memperkuat posisi peringkat di halaman pertama Google.",
            "Optimasi formulir dan CTA kontak yang menghasilkan pertumbuhan pesan masuk WhatsApp riil (+140% leads)."
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
                Pemilik usaha seringkali kecewa setelah membayar mahal agensi SEO yang hanya memberikan grafik impresi kata kunci tanpa adanya penambahan kontak pembeli. Di sisi lain, tim pemasaran khawatir situs web terkena penalti deindex Google akibat praktik manipulatif.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-teal-600">
              <h3 className="font-bold text-slate-900 mb-1">2. Navigasi Politik & Diplomasi Kerja</h3>
              <p>
                Kami mengalihkan metrik keberhasilan dari sekadar ranking kosmetik ke arah *Qualified Inbound Leads*. Menyelaraskan materi website dengan tim penjualan agar calon pelanggan yang datang sudah teredukasi mengenai nilai keunggulan produk/jasa klien.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-emerald-600">
              <h3 className="font-bold text-slate-900 mb-1">3. Eksekusi & Deliverable Tahan Uji</h3>
              <p>
                Audit teknis komprehensif, pembenahan struktur on-page, penataan tautan internal berbasis graf, kalender konten berniat komersial, serta penataan Core Web Vitals yang menjamin waktu muat ponsel di bawah 1.5 detik.
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
                  Audit Teknis & Kecepatan
                </span>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-teal-800 transition-colors mb-2">
                  Audit Technical SEO & Core Web Vitals
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Optimasi kecepatan rendering LCP 0.6s, penghapusan skrip boros, dan eliminasi biaya server bulanan.
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
          entityIds={["seo-strategy", "technical-seo", "core-web-vitals"]}
          title="Entitas Knowledge Graph Terkait"
        />

        {/* CTA Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold">Ingin Meningkatkan Konversi Organik Situs Web Anda?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Diskusikan audit struktur SEO dan kata kunci berniat komersial bersama kami.
            </p>
          </div>
          <ProtectedContact
            type="whatsapp"
            label="Konsultasi SEO via WhatsApp"
            prefillMessage="Halo Mas Zadit, saya membaca halaman SEO & Konversi di zadit.pages.dev dan ingin berdiskusi mengenai audit SEO website kami."
            className="shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-xl shadow-xs transition-all"
          />
        </div>
      </div>
    </div>
  );
}
