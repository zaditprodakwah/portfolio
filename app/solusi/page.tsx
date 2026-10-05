import { Metadata } from "next";
import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";
import { getAllSolutions } from "@/lib/solutions";
import TriadDirectoryNav from "@/components/TriadDirectoryNav";
import { getCanonicalUrl } from "@/lib/canonical-registry";

export const metadata: Metadata = {
  title: "Matriks Solusi & Kasus Komparatif | Zadit Growth",
  description: "Katalog solusi terprogram dan studi kasus industri: Proposal Bisnis Investor, Konsultan SOP Yayasan, Olah Data SINTA, dan Technical SEO.",
  alternates: {
    canonical: getCanonicalUrl("/solusi/"),
  },
};

export default function SolutionsIndexPage() {
  const solutions = getAllSolutions();

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 text-zinc-900">
      <div className="max-w-4xl mx-auto space-y-8">
        <TriadDirectoryNav activeTab="solusi" />

        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 border border-zinc-200">
            <Compass className="w-3.5 h-3.5 text-zinc-600" />
            <span>Matriks Solusi & Kasus Industri</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-900 tracking-tight leading-tight">
            Solusi Terarah Berbasis Bukti Nyata
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl">
            Jelajahi perbandingan solusi, kerangka kerja mitigasi risiko, dan studi kasus riil yang dirancang untuk menjawab tantangan industri Anda.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {/* Official Commercial Packages Hub */}
          <Link
            href="/paket-solusi/"
            className="group p-6 sm:p-7 rounded-2xl bg-white border-2 border-teal-600/40 hover:border-teal-700 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-slate-900"
          >
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200 uppercase tracking-wider">
                  Katalog Komersial Resmi
                </span>
                <span className="text-xs font-mono text-slate-400">/paket-solusi/</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors">
                Paket Solusi Rekayasa & Biaya Transparan (4 Pilar Bisnis)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Telusuri paket lengkap otomasi alur kerja data B2B, arsitektur web edge $0 Cloudflare, pitch deck eksekutif 16:9, dan riset akademik SINTA resmi lengkap dengan kalkulator kebutuhan interaktif.
              </p>
            </div>
            <div className="shrink-0 inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-4 py-2.5 rounded-xl border border-teal-200/80 group-hover:bg-teal-700 group-hover:text-white transition-colors">
              <span>Buka Paket & Biaya</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Featured Interactive Studio */}
          <Link
            href="/solusi/document-data-studio/"
            className="group p-6 sm:p-7 rounded-xl bg-gradient-to-br from-[#1C1322] to-[#150F18] border border-[#8F652E]/40 hover:border-[#8F652E] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 text-white"
          >

            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-medium text-[#C5A880] bg-[#231627] px-2.5 py-0.5 rounded border border-[#8F652E]/30">
                  Interactive Studio & Portofolio Flagship
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  /solusi/document-data-studio/
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-[#C5A880] transition-colors">
                OmniData & DocuMorph Studio: Rekayasa Dokumen & Pembersih Data Interaktif
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Uji langsung sistem pembersihan data survei kuesioner, ekstraksi rekening koran ke format CSV, perbandingan format Word OpenXML standar APA 7th, serta katalog paket kerja untuk Upwork, Freelancer, Projects.co.id, dan Sribu.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-[#C5A880] pt-3 border-t border-zinc-800">
              <span>Buka Studio Interaktif & Unduh CSV Sampel</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {solutions.map((sol) => (
            <Link
              key={sol.slug}
              href={`/solusi/${sol.slug}/`}
              className="group p-6 sm:p-7 rounded-xl bg-white border border-zinc-200 hover:border-zinc-400 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-medium text-zinc-700 bg-zinc-100 px-2.5 py-0.5 rounded border border-zinc-200">
                    {sol.pillarName}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">
                    /{sol.slug}/
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
                  {sol.title}
                </h2>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {sol.metaDescription}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-zinc-900 pt-3 border-t border-zinc-100">
                <span>Pelajari Matriks Komparatif & Hasil Riil</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
