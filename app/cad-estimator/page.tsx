import { Metadata } from "next";
import Link from "next/link";
import CadEstimatorInteractiveViewer from "@/components/CadEstimatorInteractiveViewer";
import { getCanonicalUrl } from "@/lib/canonical-registry";
import {
  Compass,
  FileSpreadsheet,
  Box,
  CheckCircle2,
  Building2,
  Clock,
  ShieldCheck,
  MessageCircle,
  FileCheck2,
  ArrowRight
} from "lucide-react";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Layanan Drafter AutoCAD 2D, SketchUp 3D & Estimator RAB | Zadit",
  description:
    "Jasa drafter dan estimator teknis lepas untuk gambar kerja AutoCAD 2D, visualisasi SketchUp 3D, dan perhitungan RAB BoQ berbasis standar AHSP PUPR di wilayah Kota Cirebon dan sekitarnya.",
  alternates: {
    canonical: getCanonicalUrl("/cad-estimator/"),
  },
  openGraph: {
    title: "Layanan Drafter AutoCAD 2D, SketchUp 3D & Estimator RAB | Zadit",
    description:
      "Dukungan teknis fleksibel per proyek untuk gambar kerja presisi, fasad 3D, dan estimasi biaya konstruksi tanpa selisih hitung.",
    url: getCanonicalUrl("/cad-estimator/"),
    siteName: "Muhammad Khoiruzzadittaqwa (Zadit)",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://muhzadit.pages.dev/og-cad-estimator.jpg",
        width: 1200,
        height: 630,
        alt: "Layanan Drafter AutoCAD 2D, SketchUp 3D & Estimator RAB - Muhammad Khoiruzzadittaqwa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Layanan Drafter AutoCAD 2D, SketchUp 3D & Estimator RAB | Zadit",
    description:
      "Dukungan teknis fleksibel per proyek untuk gambar kerja presisi, fasad 3D, dan estimasi biaya konstruksi tanpa selisih hitung.",
    images: ["https://muhzadit.pages.dev/og-cad-estimator.jpg"],
  },
};

export default function CadEstimatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Layanan Drafter & Estimator Proyek Zadit",
    "description": "Layanan pembuatan gambar kerja AutoCAD 2D, pemodelan SketchUp 3D, dan penyusunan RAB BoQ terformula AHSP PUPR.",
    "provider": {
      "@type": "Person",
      "name": "Muhammad Khoiruzzadittaqwa",
      "alternateName": "Zadit"
    },
    "areaServed": "Cirebon, Jawa Barat, Indonesia",
    "serviceType": [
      "AutoCAD 2D Shop Drawing",
      "SketchUp 3D Architectural Modeling",
      "Rencana Anggaran Biaya (RAB) BoQ Construction"
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16 space-y-6 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
          <Building2 className="w-3.5 h-3.5" />
          <span>Dukungan Teknis Proyek • Wilayah Cirebon &amp; Sekitarnya</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
          Layanan Drafter AutoCAD 2D, SketchUp 3D &amp; Estimator RAB Proyek
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Membantu kontraktor, biro reklame, dan pengembang menyusun paket gambar kerja presisi, visualisasi fasad representatif, dan estimasi biaya terformula rapi berbasis AHSP PUPR.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="https://wa.me/6282316363177?text=Halo%20Mas%20Zadit,%20saya%20ingin%20konsultasi%20paket%20gambar%20CAD%20dan%20RAB%20proyek"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-md flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Diskusi Kebutuhan Tender</span>
          </a>
          <a
            href="/cad-estimator/PORTFOLIO_DRAFTER_ESTIMATOR.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-300 transition-all shadow-xs flex items-center gap-2"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Unduh Portofolio PDF</span>
          </a>
        </div>
      </section>

      {/* Main Interactive Workbench Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <CadEstimatorInteractiveViewer />
      </div>

      {/* Scope of Work Section */}
      <section className="bg-white border-y border-slate-200 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Tiga Pilar Layanan Teknis Siap Lapangan
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Setiap berkas diproduksi dengan kepatuhan standar industri teknik sipil dan arsitektur, siap digunakan untuk pengajuan izin maupun pelaksanaan lapangan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pilar 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-cyan-400 flex items-center justify-center font-bold">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. Gambar Kerja AutoCAD 2D</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Sistem multi-layer ACI standar (struktur, dinding, dimensi, teks).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Detail potongan pondasi telapak, plat buhul, dan angkur baut.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Kop gambar formal skala 1:50 siap cetak lembar kerja A3 dan A4.</span>
                </li>
              </ul>
            </div>

            {/* Pilar 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-bold">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. Pemodelan SketchUp 3D</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Visual perspektif fasad eksterior realistis untuk presentasi persetujuan klien.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Penerapan material fisik (pipa baja, penutup ACP Seven, tiang utama).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Kalkulasi bayangan jatuh matahari untuk verifikasi keselamatan tapak.</span>
                </li>
              </ul>
            </div>

            {/* Pilar 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. Rencana Anggaran Biaya (RAB)</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Kompilasi harga satuan berbasis AHSP PUPR wilayah Cirebon terbaru.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Seluruh rumus terhubung aktif dalam format Excel OpenXML tanpa selisih hitung.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Rincian Bill of Quantities (BoQ) transparan untuk kelengkapan administrasi tender.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Advantage / Engagement Model */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Solusi Fleksibel Saat Tim Internal Mengejar Batas Waktu Tender
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Skema rekanan sub-proyek memberikan keleluasaan bagi perusahaan Anda: mendapatkan kapasitas drafter dan estimator andal saat beban kerja kantor sedang padat, dengan standar pengerjaan terukur dan kecepatan perbaikan yang siap diandalkan.
        </p>

        <div className="pt-4">
          <a
            href="mailto:muhzadit@gmail.com?subject=Tawaran%20Kerjasama%20Mitra%20Drafter%20dan%20Estimator"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-md"
          >
            <span>Kirim Brief Proyek via Email (muhzadit@gmail.com)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
