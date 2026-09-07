import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileText, ArrowRight, ShieldCheck } from "lucide-react";
import { DirectAnswerBox } from "@/components/DirectAnswerBox";
import { EntityPills } from "@/components/EntityPills";
import { ProtectedContact } from "@/components/ProtectedContact";

export const metadata: Metadata = {
  title: "Dokumen, Tata Kelola & Administrasi Bisnis | Zadit Growth",
  description: "Penyusunan dokumen kemitraan usaha, tata kelola administrasi yayasan, manual SOP operasional, dan studi kelayakan bisnis berstandar perbankan.",
  alternates: {
    canonical: "https://zadit.pages.dev/layanan/dokumen-administrasi-bisnis"
  }
};

export default function BusinessDocsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Dokumen, Tata Kelola & Administrasi Bisnis",
    "provider": {
      "@type": "Person",
      "name": "Muhammad Khoiruzzadittaqwa",
      "url": "https://zadit.pages.dev"
    },
    "description": "Layanan penyusunan dokumen kemitraan usaha, tata kelola administrasi lembaga & yayasan, manual SOP operasional, serta studi kelayakan bisnis berstandar perbankan.",
    "areaServed": "ID",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Paket Dokumen & Administrasi",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Proposal Kerjasama & Kemitraan Usaha" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pedoman SOP & Tata Kelola Yayasan" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Studi Kelayakan Bisnis (Feasibility Study)" } }
      ]
    }
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
            <FileText className="w-3.5 h-3.5" />
            Pilar Layanan 01
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
            Dokumen, Tata Kelola & Administrasi Bisnis
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
            Menghubungkan visi strategis bisnis dan lembaga dengan dokumen kemitraan formal, manual SOP operasional yang ditaati tim, serta analisis kelayakan finansial yang lolos evaluasi perbankan.
          </p>
        </header>

        {/* Direct-Answer BLUF */}
        <DirectAnswerBox
          summary="Penyusunan dokumen bisnis dan administrasi lembaga berstandar eksekutif menuntut kombinasi kepatuhan hukum, mitigasi risiko wanprestasi, transparansi rantai pasok riil, dan pemodelan arus kas yang dapat diuji di hadapan dewan direksi maupun komite perbankan."
          takeaways={[
            "Struktur proposal kemitraan bisnis dirancang dengan klausul mitigasi risiko operasional yang jelas.",
            "Manual SOP lembaga & yayasan disusun kontekstual untuk menjamin akuntabilitas audit donatur dan transparansi kas.",
            "Model keuangan dinamis 5 tahun dengan analisis sensitivitas margin dan kalkulasi susut logistik riil.",
            "Komunikasi dan penulisan naskah dilakukan langsung oleh praktisi berpengalaman 10+ tahun tanpa perantara sales."
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
                Investor dan mitra dagang skeptis terhadap proyeksi bombastis tanpa rincian rantai pasok. Sementara pada yayasan sosial, pengurus sering cemas terhadap potensi temuan audit administrasi, sengketa internal, atau hilangnya kepercayaan donatur akibat pencatatan kas yang belum tertata rapi.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-teal-600">
              <h3 className="font-bold text-slate-900 mb-1">2. Navigasi Politik & Diplomasi Kerja</h3>
              <p>
                Kami menyelaraskan kepentingan antar pihak: menyusun tata kelola yang memberi kepastian pengawasan bagi pembina/investor tanpa mematikan kelincahan kerja tim lapangan. Setiap pasal perjanjian dan prosedur kerja dirumuskan dengan bahasa hukum yang elegan dan santun.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-emerald-600">
              <h3 className="font-bold text-slate-900 mb-1">3. Eksekusi & Deliverable Tahan Uji</h3>
              <p>
                Menghasilkan dokumen siap pakai: Laporan Feasibility Study komprehensif, buku panduan SOP 18 modul kerja terpadu, lembar ceklis harian staf, spreadsheet proyeksi keuangan dinamis, dan peta interaktif alur rantai pasok.
              </p>
            </div>
          </div>
        </section>

        {/* Solusi Programmatik Terkait (Spokes) */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Solusi Terfokus & Studi Kasus Spesifik:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/solusi/proposal-bisnis-rantai-pasok-investor"
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-600 shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200 inline-block mb-2">
                  Kasus Agribisnis 120 Gerai
                </span>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-teal-800 transition-colors mb-2">
                  Proposal Bisnis Rantai Pasok Investor
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Mitigasi risiko operasional buah segar, kalkulasi spoilage rate, dan kontrak kemitraan konsinyasi 120 gerai ritel.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-teal-700 mt-4 pt-2 border-t border-slate-100">
                <span>Bedah Solusi & Matriks Kasus</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/solusi/konsultan-sop-tata-kelola-yayasan"
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-600 shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200 inline-block mb-2">
                  Tata Kelola Nirlaba
                </span>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-teal-800 transition-colors mb-2">
                  Konsultan SOP & Tata Kelola Yayasan
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Sistem pemisahan 3 rekening keuangan, perlindungan pengurus dari risiko hukum, dan transparansi laporan donatur publik.
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
          entityIds={["business-admin", "sop-administrasi", "studi-kelayakan", "proposal-kemitraan"]}
          title="Entitas Knowledge Graph Terkait"
        />

        {/* CTA Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold">Ingin Mendiskusikan Dokumen atau SOP Lembaga Anda?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Konsultasi langsung tanpa perantara untuk membedah kebutuhan proposal dan tata kelola Anda.
            </p>
          </div>
          <ProtectedContact
            type="whatsapp"
            label="Konsultasi Dokumen via WhatsApp"
            prefillMessage="Halo Mas Zadit, saya membaca halaman Dokumen & Tata Kelola Bisnis di zadit.pages.dev dan ingin berdiskusi mengenai kebutuhan dokumen kemitraan / SOP kami."
            className="shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-xl shadow-xs transition-all"
          />
        </div>
      </div>
    </div>
  );
}
