import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, ExternalLink, ArrowRight, ShieldCheck } from "lucide-react";
import { ENTITY_NODES } from "@/lib/entity-graph";

export const metadata: Metadata = {
  title: "Wawasan & Glosarium Konseptual | Zadit Growth",
  description: "Panduan istilah, konsep metodologi, dan glosarium bisnis, riset statistik, serta performa web dengan referensi resmi Wikidata.",
  alternates: {
    canonical: "https://zadit.pages.dev/wawasan"
  }
};

export default function WawasanGlossaryPage() {
  const nodes = Object.values(ENTITY_NODES);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "Glosarium Konseptual Bisnis, Riset & Web",
    "description": "Kamus istilah dan konsep metodologi terverifikasi untuk dokumen bisnis, olah data statistik, dan rekayasa web.",
    "hasDefinedTerm": nodes.map((node) => ({
      "@type": "DefinedTerm",
      "name": node.name,
      "description": node.description,
      "sameAs": node.wikidataUri
    }))
  };

  const pillarRoutes: Record<string, string> = {
    "business-docs": "/layanan/dokumen-administrasi-bisnis",
    "marketing-seo": "/layanan/seo-konten-konversi",
    "academic-research": "/layanan/olah-data-statistik-sinta",
    "digital-solutions": "/layanan/solusi-web-performa"
  };

  return (
    <div className="min-h-screen bg-alabaster py-12 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            <BookOpen className="w-3.5 h-3.5 text-teal-600" />
            <span>Glosarium & Knowledge Graph</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
            Wawasan Konseptual & Pedoman Istilah
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
            Penjelasan lugas tanpa jargon berlebih mengenai konsep-konsep kunci dalam tata kelola administrasi, metodologi statistik kuantitatif, dan rekayasa performa web.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {nodes.map((node) => {
            const targetRoute = pillarRoutes[node.pillar] || "/";

            return (
              <div
                key={node.id}
                id={node.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-teal-400 transition-all space-y-3 scroll-mt-24"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                      {node.name}
                    </h2>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200/60">
                      {node.level.toUpperCase()}
                    </span>
                  </div>

                  <a
                    href={node.wikidataUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-teal-700 hover:text-teal-800 flex items-center gap-1 font-mono font-medium"
                  >
                    <span>Wikidata URI</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {node.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="text-slate-500">
                    <span className="font-medium">Sinonim Pencarian: </span>
                    <span className="italic">{node.aliases.join(", ")}</span>
                  </div>

                  <Link
                    href={targetRoute}
                    className="inline-flex items-center gap-1 font-bold text-teal-700 hover:text-teal-900"
                  >
                    <span>Lihat Layanan Terkait</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
