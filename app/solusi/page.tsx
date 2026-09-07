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
