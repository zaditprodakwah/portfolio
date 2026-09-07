import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";
import { DirectAnswerBox } from "@/components/DirectAnswerBox";
import { EntityPills } from "@/components/EntityPills";
import { ProtectedContact } from "@/components/ProtectedContact";

export const metadata: Metadata = {
  title: "Pengolahan Data Statistik & Pendampingan Publikasi SINTA | Zadit Growth",
  description: "Uji validitas reliabilitas, analisis regresi, interpretasi SPSS/Python, dan bimbingan revisi naskah jurnal bereputasi SINTA 2-4.",
  alternates: {
    canonical: "https://zadit.pages.dev/layanan/olah-data-statistik-sinta/"
  },
  openGraph: {
    title: "Pengolahan Data Statistik & Pendampingan Publikasi SINTA | Zadit Growth",
    description: "Uji validitas reliabilitas, analisis regresi, interpretasi SPSS/Python, dan bimbingan revisi naskah jurnal bereputasi SINTA 2-4.",
    url: "https://zadit.pages.dev/layanan/olah-data-statistik-sinta/",
    images: [
      {
        url: "https://zadit.pages.dev/og-olah-data.jpg",
        width: 1200,
        height: 630,
        alt: "Pengolahan Data Statistik & Pendampingan Publikasi SINTA | Zadit Growth",
        type: "image/jpeg"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pengolahan Data Statistik & Pendampingan Publikasi SINTA | Zadit Growth",
    description: "Uji validitas reliabilitas, analisis regresi, interpretasi SPSS/Python, dan bimbingan revisi naskah jurnal bereputasi SINTA 2-4.",
    images: ["https://zadit.pages.dev/og-olah-data.jpg"]
  }
};

export default function AcademicResearchPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Olah Data Statistik & Riset Jurnal SINTA",
    "provider": {
      "@type": "Person",
      "name": "Muhammad Khoiruzzadittaqwa",
      "url": "https://zadit.pages.dev/"
    },
    "description": "Layanan bimbingan metodologi kuantitatif, analisis regresi SPSS, uji instrumen penelitian, dan penyesuaian naskah jurnal ilmiah terakreditasi SINTA.",
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
            <BarChart3 className="w-3.5 h-3.5" />
            Pilar Layanan 03
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
            Olah Data Statistik & Riset Jurnal SINTA
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
            Pendampingan metodologi kuantitatif yang etis, saintifik, dan transparan untuk memastikan naskah penelitian tesis, disertasi, dan artikel ilmiah Anda lolos uji sidang serta telaah reviewer jurnal SINTA.
          </p>
        </header>

        {/* Direct-Answer BLUF */}
        <DirectAnswerBox
          summary="Bimbingan statistik riset profesional menolak keras praktik jalan pintas manipulasi data (faking/p-hacking). Fokus kami adalah membimbing peneliti memahami landasan teori statistik, memastikan instrumen kuesioner valid dan reliabel, serta menyusun interpretasi tabel empiris berstandar APA 7th Edition yang siap dipertahankan."
          takeaways={[
            "Pengujian asumsi klasik tuntas (normalitas, multikolinearitas, heteroskedastisitas, autokorelasi).",
            "Bimbingan intensif agar peneliti menguasai logika di balik angka saat menjawab pertanyaan penguji sidang.",
            "Penyusunan kerangka surat tanggapan reviewer (rebuttal letter) yang argumentatif dan ilmiah.",
            "Layanan konsultatif resmi yang menjamin 100% kepatuhan etika akademik dan orisinalitas riset."
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
                Dosen dan mahasiswa pascasarjana seringkali mengalami stres tinggi akibat batas waktu publikasi (syarat wisuda atau kenaikan jabatan). Ketakutan utama adalah penolakan naskah (desk reject) karena reviewer menganggap metodologi atau instrumen penelitian cacat.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-teal-600">
              <h3 className="font-bold text-slate-900 mb-1">2. Navigasi Politik & Diplomasi Kerja</h3>
              <p>
                Menghadapi catatan kritis reviewer jurnal dengan diplomasi saintifik yang tenang: tidak membantah secara defensif, melainkan menyajikan justifikasi empiris berdasar rujukan metodologi terkemuka (seperti Hair et al. atau Ghozali) serta perbaikan tabel yang rapi.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-emerald-600">
              <h3 className="font-bold text-slate-900 mb-1">3. Eksekusi & Deliverable Tahan Uji</h3>
              <p>
                Output SPSS/Python teranotasi lengkap, bab pembahasan metode dan hasil yang siap integrasi ke naskah, panduan lisan sebelum ujian sidang, serta draft revisi artikel ilmiah berstandar akreditasi SINTA 2-4.
              </p>
            </div>
          </div>
        </section>

        {/* Solusi Programmatik Terkait (Spokes) */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Solusi Terfokus & Studi Kasus Spesifik:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/solusi/jasa-olah-data-spss-publikasi-sinta"
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-600 shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200 inline-block mb-2">
                  Akreditasi Jurnal Ilmiah
                </span>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-teal-800 transition-colors mb-2">
                  Jasa Olah Data SPSS & Publikasi SINTA
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Uji instrumen Cronbach Alpha 0.892, regresi linier, dan naskah lolos akreditasi SINTA 2 tanpa revisi metodologi.
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
          entityIds={["statistics-data", "analisis-spss", "uji-validitas-reliabilitas", "publikasi-sinta"]}
          title="Entitas Knowledge Graph Terkait"
        />

        {/* CTA Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold">Butuh Bimbingan Statistik atau Publikasi Riset Anda?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Diskusikan metodologi dan data penelitian Anda secara privat dan etis bersama kami.
            </p>
          </div>
          <ProtectedContact
            type="whatsapp"
            label="Konsultasi Riset via WhatsApp"
            prefillMessage="Halo Mas Zadit, saya membaca halaman Riset & Olah Data Statistik di zadit.pages.dev dan ingin berdiskusi mengenai analisis data / publikasi jurnal kami."
            className="shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-xl shadow-xs transition-all"
          />
        </div>
      </div>
    </div>
  );
}
