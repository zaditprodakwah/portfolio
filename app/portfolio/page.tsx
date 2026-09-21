import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { getAllPortfolioItems } from "@/lib/portfolio";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Portfolio Interaktif & Deliverable | Muhammad Khoiruzzadittaqwa (Zadit) - PRADIKTIF",
  description:
    "Katalog deliverable nyata dengan demo berjalan: landing Elementor dari file JSON yang dijalankan di WordPress Playground, studi kasus otomasi web, dokumen bisnis, dan riset data kuantitatif.",
  alternates: {
    canonical: "https://muhzadit.pages.dev/portfolio/",
  },
};

export default function PortfolioIndexPage() {
  const items = getAllPortfolioItems();

  return (
    <main className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 text-zinc-900">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 border border-zinc-200">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>Portfolio Modular & Deliverable</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-zinc-900 tracking-tight leading-tight">
            Deliverable yang berjalan, bukan sekadar screenshot
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-sans max-w-3xl">
            Tiap entri di sini adalah hasil riil dari pengerjaan PRADIKTIF di bawah PT Prisma
            Digital Kreatif: demo interaktif yang bisa Anda putar langsung di browser, file yang
            siap diserahkan ke klien, dan studi kasus yang mencerminkan cara saya bekerja berbasis
            bukti. Satu proyek dibuka menjadi banyak artefak yang bisa diperiksa sendiri.
          </p>
        </header>

        {items.length === 0 ? (
          <p className="text-sm text-zinc-500">Belum ada item portfolio.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={`/portfolio/${item.slug}/`}
                className="group bg-white rounded-2xl border border-zinc-200 p-6 shadow-xs hover:shadow-md hover:border-teal-600/40 transition-all flex flex-col gap-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold text-teal-800 bg-teal-50 border border-teal-200/70">
                    {item.badge}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-teal-700 transition-colors" />
                </div>
                <h2 className="text-lg font-heading font-bold text-zinc-900 leading-snug">
                  {item.title}
                </h2>
                <p className="text-sm text-zinc-600 leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2 mt-auto">
                  {item.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-zinc-100 text-xs font-mono text-zinc-600 border border-zinc-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}