import os

os.makedirs("/Users/mac/Documents/AGENTS_WORK_HUB/apps/zadit-pages/app/direktori", exist_ok=True)

code = """import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Briefcase, ArrowRight, ExternalLink } from "lucide-react";
import { getAllDirectoryItems } from "@/lib/direktori";
import { getCanonicalUrl } from "@/lib/canonical-registry";

export const metadata: Metadata = {
  title: "Direktori Rekayasa Wilayah & Vertikal Industri | Zadit",
  description: "Indeks direktori pSEO layanan rekayasa teknologi, dokumen bisnis, dan riset statistik per wilayah strategis serta sektor industri di Indonesia.",
  alternates: {
    canonical: getCanonicalUrl("/direktori/"),
  },
  openGraph: {
    title: "Direktori Rekayasa Wilayah & Vertikal Industri | Zadit",
    description: "Pemetaan solusi teknis dan tata kelola bisnis berbasis kebutuhan spesifik wilayah dan vertikal industri.",
    url: getCanonicalUrl("/direktori/"),
    type: "website",
  },
};

export default function DirectoryIndexPage() {
  const items = getAllDirectoryItems();
  const localItems = items.filter((i) => i.type === "local");
  const industryItems = items.filter((i) => i.type === "industry");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": getCanonicalUrl("/direktori/"),
        "url": getCanonicalUrl("/direktori/"),
        "name": "Direktori Rekayasa Wilayah & Vertikal Industri | Zadit",
        "description": "Kompilasi panduan solusi rekayasa per wilayah dan industri.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": getCanonicalUrl("/"),
          "name": "Zadit Executive Hub",
          "url": getCanonicalUrl("/"),
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Beranda",
              "item": getCanonicalUrl("/"),
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Direktori Layanan",
              "item": getCanonicalUrl("/direktori/"),
            },
          ],
        },
      },
      {
        "@type": "ItemList",
        "name": "Indeks Direktori Layanan Rekayasa",
        "numberOfItems": items.length,
        "itemListElement": items.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.title,
          "url": getCanonicalUrl(`/direktori/${item.category}/${item.slug}/`),
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-zinc-900 selection:bg-zinc-200">
      <div className="mx-auto max-w-4xl px-4 py-12 md:py-20 sm:px-6 space-y-12">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">Direktori Wilayah & Industri</span>
        </div>

        {/* Page Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-900"></span>
            Direktori Layanan Terarah
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
            Direktori Rekayasa Wilayah & Industri
          </h1>
          <p className="text-base text-zinc-600 md:text-lg leading-relaxed max-w-2xl">
            Pemetaan spesifikasi layanan teknis, tata kelola bisnis, dan riset akademik yang disesuaikan dengan konteks geografis serta dinamika operasional sektor industri spesifik.
          </p>
        </header>

        {/* Section 1: Local Regions */}
        <section aria-labelledby="local-heading" className="space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 pb-3">
            <MapPin className="h-4 w-4 text-zinc-600" />
            <h2 id="local-heading" className="text-xl font-semibold text-zinc-900">
              Wilayah Bisnis & Pusat Riset Strategis
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {localItems.map((item) => (
              <article
                key={`${item.category}-${item.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-zinc-400 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="rounded bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-700">
                      {item.areaServed}
                    </span>
                    <a
                      href={item.wikidataUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-zinc-400 hover:text-zinc-700 flex items-center gap-1"
                    >
                      <span>Wikidata</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>

                  <h3 className="text-base font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
                    <Link href={`/direktori/${item.category}/${item.slug}/`}>
                      {item.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs text-zinc-600 leading-relaxed line-clamp-3">
                    {item.metaDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500 font-mono">
                    /{item.category}/{item.slug}/
                  </span>
                  <Link
                    href={`/direktori/${item.category}/${item.slug}/`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-zinc-900 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Buka Panduan</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 2: Industry Verticals */}
        <section aria-labelledby="industry-heading" className="space-y-6 pt-4">
          <div className="flex items-center gap-2 border-b border-zinc-200 pb-3">
            <Briefcase className="h-4 w-4 text-zinc-600" />
            <h2 id="industry-heading" className="text-xl font-semibold text-zinc-900">
              Sektor Vertikal & Spesialisasi Industri
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {industryItems.map((item) => (
              <article
                key={`${item.category}-${item.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-zinc-400 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="rounded bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-700">
                      Sektor: {item.slug.toUpperCase()}
                    </span>
                    <a
                      href={item.wikidataUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-zinc-400 hover:text-zinc-700 flex items-center gap-1"
                    >
                      <span>Wikidata</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>

                  <h3 className="text-base font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
                    <Link href={`/direktori/${item.category}/${item.slug}/`}>
                      {item.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs text-zinc-600 leading-relaxed line-clamp-3">
                    {item.metaDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500 font-mono">
                    /{item.category}/{item.slug}/
                  </span>
                  <Link
                    href={`/direktori/${item.category}/${item.slug}/`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-zinc-900 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Buka Panduan</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Mandatory Root Link Invariant */}
        <footer className="mt-16 rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-xs">
          <p className="text-xs md:text-sm text-zinc-600">
            Seluruh layanan direktori ini disediakan langsung oleh{" "}
            <Link
              href="/"
              className="font-medium text-zinc-900 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-800"
            >
              konsultan teknologi bisnis eksekutif
            </Link>{" "}
            dengan standar akuntabilitas tanpa perantara.
          </p>
        </footer>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
"""

with open("/Users/mac/Documents/AGENTS_WORK_HUB/apps/zadit-pages/app/direktori/page.tsx", "w") as f:
    f.write(code)

print("Created app/direktori/page.tsx")
