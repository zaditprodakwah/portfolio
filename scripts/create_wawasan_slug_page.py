import os

os.makedirs("/Users/mac/Documents/AGENTS_WORK_HUB/apps/zadit-pages/app/wawasan/[slug]", exist_ok=True)

code = """import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, HelpCircle } from "lucide-react";
import { getWawasanBySlug, getAllWawasanSlugs } from "@/lib/wawasan";
import PrincetonCiteBlock from "@/components/PrincetonCiteBlock";
import TriadDirectoryNav from "@/components/TriadDirectoryNav";
import { getCanonicalUrl } from "@/lib/canonical-registry";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllWawasanSlugs();
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getWawasanBySlug(slug);
  if (!item) return {};

  const canonical = getCanonicalUrl(`/wawasan/${item.slug}/`);

  return {
    title: `${item.title} | Wawasan Zadit`,
    description: item.metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: item.title,
      description: item.metaDescription,
      url: canonical,
      type: "article",
      publishedTime: item.publishedAt,
      authors: ["Muhammad Khoiruzzadittaqwa"],
    },
  };
}

export default async function WawasanDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getWawasanBySlug(slug);
  if (!item) notFound();

  const canonical = getCanonicalUrl(`/wawasan/${item.slug}/`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        "isPartOf": {
          "@type": "WebSite",
          "@id": getCanonicalUrl("/"),
          "name": "Zadit Executive Hub",
          "url": getCanonicalUrl("/"),
        },
        "headline": item.title,
        "description": item.metaDescription,
        "datePublished": item.publishedAt,
        "dateModified": item.publishedAt,
        "mainEntityOfPage": canonical,
        "author": {
          "@type": "Person",
          "name": "Muhammad Khoiruzzadittaqwa",
          "url": getCanonicalUrl("/"),
        },
        "publisher": {
          "@type": "Organization",
          "name": "Zadit Executive Hub",
          "url": getCanonicalUrl("/"),
        },
      },
      {
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
          {
            "@type": "ListItem",
            "position": 3,
            "name": item.title,
            "item": canonical,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": item.faq.map((f) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-zinc-900 selection:bg-zinc-200">
      <div className="mx-auto max-w-3xl px-4 py-12 md:py-20 sm:px-6">
        <TriadDirectoryNav activeTab="wawasan" />

        <div className="mb-6">
          <Link
            href="/wawasan/"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Indeks Wawasan</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-4 border-b border-zinc-200 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700">
              {item.category}
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              Dipublikasikan: {item.publishedAt}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-900 leading-tight">
            {item.title}
          </h1>

          <p className="text-base text-zinc-600 leading-relaxed">
            {item.metaDescription}
          </p>
        </header>

        {/* AEO Answer-First BLUF */}
        <section
          aria-label="Ringkasan Jawaban Cepat AEO"
          className="my-8 rounded-xl border border-zinc-300 bg-white p-5 md:p-6 shadow-xs"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Bottom Line Up Front (BLUF) • Jawaban Langsung</span>
          </div>
          <p className="text-sm md:text-base font-medium text-zinc-900 leading-relaxed">
            <strong>{item.directAnswer}</strong>
          </p>
        </section>

        {/* Princeton CITE Block */}
        <PrincetonCiteBlock
          metric={item.princetonCite.metric}
          source={item.princetonCite.source}
          url={item.princetonCite.url}
        />

        {/* Editorial Prose */}
        <article className="prose prose-zinc max-w-none my-10 text-zinc-800 leading-relaxed text-sm md:text-base space-y-4">
          {item.editorialProse.split("\\n\\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>

        {/* Hybrid Respectful Comparison Section */}
        <section className="my-12 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="space-y-2 mb-6">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-zinc-500">
              Analisis Komparatif Objektif
            </span>
            <h2 className="text-xl font-semibold text-zinc-900">
              Matriks Pertimbangan & Keunggulan Komparatif
            </h2>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              {item.hybridComparison.contextTradeOff}
            </p>
          </div>

          {/* Radical Honesty Callouts */}
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <div className="rounded-lg bg-zinc-50 p-4 border border-zinc-200/80">
              <h3 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-1.5">
                Kapan Memilih Model Alternatif:
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {item.hybridComparison.alternativeStrengths}
              </p>
            </div>
            <div className="rounded-lg bg-emerald-50/50 p-4 border border-emerald-200/60">
              <h3 className="text-xs font-semibold text-emerald-950 uppercase tracking-wider mb-1.5">
                Kapan Memilih Pendekatan Zadit:
              </h3>
              <p className="text-xs text-emerald-900/90 leading-relaxed">
                {item.hybridComparison.zaditFitContext}
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-700 border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="py-2.5 px-3 font-semibold text-zinc-900">Kriteria</th>
                  <th className="py-2.5 px-3 font-semibold text-zinc-600">Model Agensi Konvensional</th>
                  <th className="py-2.5 px-3 font-semibold text-zinc-600">Platform Freelance</th>
                  <th className="py-2.5 px-3 font-semibold text-zinc-900 bg-zinc-100/80">Rekayasa Mandiri Zadit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {item.hybridComparison.comparisonTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/50">
                    <td className="py-2.5 px-3 font-medium text-zinc-900">{row.criterion}</td>
                    <td className="py-2.5 px-3 text-zinc-600">{row.traditionalAgency}</td>
                    <td className="py-2.5 px-3 text-zinc-600">{row.freelancePlatform}</td>
                    <td className="py-2.5 px-3 font-medium text-zinc-900 bg-zinc-50/50">{row.zaditEngineering}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="my-12 border-t border-zinc-200 pt-8">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="h-4 w-4 text-zinc-500" />
            <h2 className="text-lg font-semibold text-zinc-900">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
          </div>
          <div className="space-y-4">
            {item.faq.map((f, idx) => (
              <div key={idx} className="rounded-lg border border-zinc-200 bg-white p-4">
                <h3 className="text-sm font-semibold text-zinc-900">{f.question}</h3>
                <p className="mt-1.5 text-xs md:text-sm text-zinc-600 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mandatory Root Domain Contextual Link Invariant */}
        <footer className="mt-16 rounded-xl border border-zinc-200 bg-white p-6 text-center">
          <p className="text-xs md:text-sm text-zinc-600">
            Dikelola dan ditulis oleh{" "}
            <Link
              href={item.rootDomainLink.targetUrl}
              className="font-medium text-zinc-900 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-800"
            >
              {item.rootDomainLink.anchorText}
            </Link>{" "}
            untuk menghadirkan transparansi metodologis dan keandalan sistem tanpa kompromi.
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

with open("/Users/mac/Documents/AGENTS_WORK_HUB/apps/zadit-pages/app/wawasan/[slug]/page.tsx", "w") as f:
    f.write(code)

print("Created app/wawasan/[slug]/page.tsx")
