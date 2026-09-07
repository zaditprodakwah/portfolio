import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ExternalLink, ArrowRight, FileText } from "lucide-react";
import { ENTITY_NODES } from "@/lib/entity-graph";
import { getAllWawasan } from "@/lib/wawasan";
import TriadDirectoryNav from "@/components/TriadDirectoryNav";
import { getCanonicalUrl } from "@/lib/canonical-registry";

export const metadata: Metadata = {
  title: "Wawasan Industri, Teardown & Glosarium Konseptual | Zadit",
  description: "Dekomposisi kritis model agensi, risiko akademik karya ilmiah, efisiensi hosting edge, serta glosarium istilah terverifikasi Wikidata.",
  alternates: {
    canonical: getCanonicalUrl("/wawasan/"),
  },
  openGraph: {
    title: "Wawasan Industri, Teardown & Glosarium Konseptual | Zadit",
    description: "Analisis stoik dan dekonstruksi teknis untuk keputusan teknologi dan tata kelola bisnis yang lebih cerdas.",
    url: getCanonicalUrl("/wawasan/"),
    type: "website",
  },
};

export default function WawasanIndexPage() {
  const articles = getAllWawasan();
  const nodes = Object.values(ENTITY_NODES);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": getCanonicalUrl("/wawasan/"),
        "url": getCanonicalUrl("/wawasan/"),
        "name": "Wawasan Industri, Teardown & Glosarium Konseptual | Zadit",
        "description": "Kompilasi analisis kritis industri dan glosarium entitas resmi.",
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
              "name": "Wawasan & Teardown",
              "item": getCanonicalUrl("/wawasan/"),
            },
          ],
        },
      },
      {
        "@type": "ItemList",
        "name": "Analisis Kritis & Teardown Industri",
        "numberOfItems": articles.length,
        "itemListElement": articles.map((art, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": art.title,
          "url": getCanonicalUrl(`/wawasan/${art.slug}/`),
        })),
      },
      {
        "@type": "DefinedTermSet",
        "name": "Glosarium Konseptual Bisnis, Riset & Web",
        "hasDefinedTerm": nodes.map((node) => ({
          "@type": "DefinedTerm",
          "name": node.name,
          "description": node.description,
          "sameAs": node.wikidataUri,
        })),
      },
    ],
  };

  const pillarRoutes: Record<string, string> = {
    "business-docs": "/layanan/dokumen-administrasi-bisnis/",
    "marketing-seo": "/layanan/seo-konten-konversi/",
    "academic-research": "/layanan/olah-data-statistik-sinta/",
    "digital-solutions": "/layanan/solusi-web-performa/",
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-zinc-900 selection:bg-zinc-200">
      <div className="mx-auto max-w-4xl px-4 py-12 md:py-20 sm:px-6 space-y-12">
        <TriadDirectoryNav activeTab="wawasan" />

        {/* Page Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600 shadow-sm">
            <BookOpen className="h-3.5 w-3.5 text-zinc-500" />
            <span>Wawasan & Graf Pengetahuan</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
            Wawasan Kritis & Glosarium Konseptual
          </h1>
          <p className="text-base text-zinc-600 md:text-lg leading-relaxed max-w-2xl">
            Dekomposisi objektif terhadap praktik industri yang tidak efisien, dipadukan dengan glosarium istilah terverifikasi Wikidata untuk kepatuhan semantik AI Search.
          </p>
        </header>

        {/* Section 1: Editorial Industry Teardowns */}
        <section aria-labelledby="teardowns-heading" className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <div>
              <h2 id="teardowns-heading" className="text-xl font-semibold text-zinc-900">
                Analisis Kritis & Teardown Industri
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Investigasi mendalam mengenai trade-off metodologi, model agensi, dan efisiensi teknologi.
              </p>
            </div>
            <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-mono text-zinc-600">
              {articles.length} Esai
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {articles.map((art) => (
              <article
                key={art.slug}
                className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-zinc-400 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="rounded bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700">
                      {art.category}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono">
                      {art.publishedAt}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
                    <Link href={`/wawasan/${art.slug}/`} className="focus:outline-none">
                      {art.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs text-zinc-600 leading-relaxed line-clamp-3">
                    {art.metaDescription}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                    {art.princetonCite.metric.split(" ")[0]} Verified
                  </span>
                  <Link
                    href={`/wawasan/${art.slug}/`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-zinc-900 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Baca Analisis</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 2: Conceptual Entity Graph Glossary */}
        <section aria-labelledby="glossary-heading" className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <div>
              <h2 id="glossary-heading" className="text-xl font-semibold text-zinc-900">
                Glosarium Konseptual Graf Entitas
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Peta relasi semantik resmi dengan referensi persistent identifier Wikidata (URI).
              </p>
            </div>
            <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-mono text-zinc-600">
              {nodes.length} Entitas
            </span>
          </div>

          <div className="grid gap-4">
            {nodes.map((node) => {
              const targetRoute = pillarRoutes[node.pillar] || "/";

              return (
                <div
                  key={node.id}
                  id={node.id}
                  className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-xs transition-all hover:border-zinc-300 scroll-mt-24 space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm md:text-base font-semibold text-zinc-900">
                        {node.name}
                      </h3>
                      <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600">
                        {node.level.toUpperCase()}
                      </span>
                    </div>

                    <a
                      href={node.wikidataUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1 font-mono transition-colors"
                    >
                      <span>Wikidata</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
                    {node.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-zinc-100 text-xs">
                    <div className="text-zinc-500 text-[11px]">
                      <span>Alias: </span>
                      <span className="italic text-zinc-700">{node.aliases.join(", ")}</span>
                    </div>

                    <Link
                      href={targetRoute}
                      className="inline-flex items-center gap-1 font-medium text-zinc-900 hover:underline"
                    >
                      <span>Lihat Pilar Terkait</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer Link Invariant */}
        <footer className="mt-16 rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-xs">
          <p className="text-xs md:text-sm text-zinc-600">
            Seluruh data dan glosarium ini dikembangkan oleh{" "}
            <Link
              href="/"
              className="font-medium text-zinc-900 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-800"
            >
              konsultan teknologi bisnis eksekutif
            </Link>{" "}
            sebagai bagian dari komitmen transparansi rekayasa data.
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
