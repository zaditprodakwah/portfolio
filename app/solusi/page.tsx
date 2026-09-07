import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass, ArrowRight, ShieldCheck } from "lucide-react";
import { getAllSolutions } from "@/lib/solutions";

export const metadata: Metadata = {
  title: "Matriks Solusi & Kasus Komparatif | Zadit Growth",
  description: "Katalog solusi terprogram dan studi kasus industri: Proposal Bisnis Investor, Konsultan SOP Yayasan, Olah Data SINTA, dan Technical SEO.",
  alternates: {
    canonical: "https://zadit.pages.dev/solusi"
  }
};

export default function SolutionsIndexPage() {
  const solutions = getAllSolutions();

  return (
    <div className="min-h-screen bg-alabaster py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-teal-800 hover:text-teal-950 uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Utama</span>
        </Link>

        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200/80">
            <Compass className="w-3.5 h-3.5 text-teal-600" />
            <span>Matriks Solusi & Kasus Industri</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
            Solusi Spesifik Berbasis Bukti Nyata
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
            Jelajahi perbandingan solusi, kerangka kerja mitigasi risiko, dan studi kasus riil yang dirancang untuk menjawab tantangan industri Anda.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {solutions.map((sol) => (
            <Link
              key={sol.slug}
              href={`/solusi/${sol.slug}`}
              className="group p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-teal-600 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                    {sol.pillarName}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    /{sol.slug}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                  {sol.title}
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {sol.metaDescription}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-teal-700 pt-3 border-t border-slate-100">
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
