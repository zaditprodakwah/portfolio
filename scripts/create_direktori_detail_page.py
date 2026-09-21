import os

os.makedirs("/Users/mac/Documents/AGENTS_WORK_HUB/apps/zadit-pages/app/direktori/[category]/[slug]", exist_ok=True)

code = """import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase, ExternalLink, HelpCircle, ShieldCheck } from "lucide-react";
import { getDirectoryItem, getAllDirectoryParams } from "@/lib/direktori";
import { getCanonicalUrl } from "@/lib/canonical-registry";
import ProtectedContact from "@/components/ProtectedContact";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllDirectoryParams();
}

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const item = getDirectoryItem(category, slug);
  if (!item) return {};

  const canonical = getCanonicalUrl(`/direktori/${item.category}/${item.slug}/`);

  return {
    title: `${item.title} | Direktori Zadit`,
    description: item.metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: item.title,
      description: item.metaDescription,
      url: canonical,
      type: "article",
    },
  };
}

export default async function DirectoryDetailPage({ params }: PageProps) {
  const { category, slug } = await params;
  const item = getDirectoryItem(category, slug);
  if (!item) notFound();

  const canonical = getCanonicalUrl(`/direktori/${item.category}/${item.slug}/`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${canonical}#service`,
        "name": item.title,
        "description": item.metaDescription,
        "url": canonical,
        "areaServed": item.type === "local" ? item.areaServed : undefined,
        "knowsAbout": item.type === "industry" ? item.slug : undefined,
        "sameAs": item.wikidataUri,
        "provider": {
          "@type": "Person",
          "name": "Muhammad Khoiruzzadittaqwa",
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
            "name": "Direktori Layanan",
            "item": getCanonicalUrl("/direktori/"),
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
      <div className="mx-auto max-w-3xl px-4 py-12 md:py-20 sm:px-6 space-y-10">
        {/* Navigation Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/direktori/" className="hover:text-zinc-900 transition-colors">
            Direktori
          </Link>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">{item.slug}</span>
        </div>

        <div>
          <Link
            href="/direktori/"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Indeks Direktori</span>
          </Link>
        </div>

        {/* Header */}
        <header className="space-y-4 border-b border-zinc-200 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700">
              {item.type === "local" ? (
                <MapPin className="h-3 w-3 text-zinc-500" />
              ) : (
                <Briefcase className="h-3 w-3 text-zinc-500" />
              )}
              <span>{item.areaServed}</span>
            </span>
            <a
              href={item.wikidataUri}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5 text-[11px] font-mono text-zinc-500 border border-zinc-200 hover:text-zinc-800"
            >
              <span>Wikidata Reference</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-900 leading-tight">
            {item.title}
          </h1>

          <p className="text-base text-zinc-600 leading-relaxed">
            {item.metaDescription}
          </p>
        </header>

        {/* Local / Industry Context Narrative */}
        <section aria-label="Latar Belakang Tantangan" className="rounded-xl border border-zinc-200 bg-white p-6 shadow-xs space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">
            Dinamika & Tantangan Lapangan
          </h2>
          <p className="text-sm text-zinc-700 leading-relaxed">
            {item.localOrIndustryContext}
          </p>
        </section>

        {/* Nuanced Hybrid Trade-off Section */}
        <section aria-label="Matriks Pertimbangan Objektif" className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-6">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-zinc-500">
              Pertimbangan Pemilihan Model
            </span>
            <h2 className="text-xl font-semibold text-zinc-900">
              Matriks Perbandingan & Keunggulan Eksekusi
            </h2>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
              {item.hybridComparison.contextTradeOff}
            </p>
          </div>

          {/* Radical Honesty Callouts */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-zinc-50 p-4 border border-zinc-200/80">
              <h3 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-1">
                Kapan Memilih Model Alternatif:
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {item.hybridComparison.alternativeStrengths}
              </p>
            </div>
            <div className="rounded-lg bg-emerald-50/50 p-4 border border-emerald-200/60">
              <h3 className="text-xs font-semibold text-emerald-950 uppercase tracking-wider mb-1">
                Kapan Memilih Rekayasa Zadit:
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
                  <th className="py-2.5 px-3 font-semibold text-zinc-900">Kriteria Evaluasi</th>
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
        <section aria-label="Pertanyaan Umum" className="border-t border-zinc-200 pt-8 space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-zinc-500" />
            <h2 className="text-lg font-semibold text-zinc-900">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>
          <div className="space-y-3">
            {item.faq.map((f, idx) => (
              <div key={idx} className="rounded-lg border border-zinc-200 bg-white p-4">
                <h3 className="text-sm font-semibold text-zinc-900">{f.question}</h3>
                <p className="mt-1.5 text-xs md:text-sm text-zinc-600 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Contact */}
        <div className="p-6 rounded-xl bg-zinc-900 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold">Konsultasikan Kebutuhan Proyek Anda</h3>
            <p className="text-xs text-zinc-300">
              Tatap muka langsung atau konsultasi daring terenkripsi bersama Muhammad Khoiruzzadittaqwa.
            </p>
          </div>
          <ProtectedContact
            type="whatsapp"
            label="Konsultasi Langsung via WhatsApp"
            prefillMessage={`Halo Mas Zadit, saya melihat panduan ${item.title} di direktori muhzadit.pages.dev dan ingin mendiskusikan kebutuhan kami.`}
            className="shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold py-2.5 px-4 rounded-lg transition-all"
          />
        </div>

        {/* Mandatory Root Domain Contextual Link Invariant */}
        <footer className="mt-16 rounded-xl border border-zinc-200 bg-white p-6 text-center">
          <p className="text-xs md:text-sm text-zinc-600">
            Dikelola oleh{" "}
            <Link
              href={item.rootDomainLink.targetUrl}
              className="font-medium text-zinc-900 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-800"
            >
              {item.rootDomainLink.anchorText}
            </Link>{" "}
            sebagai dedikasi rekayasa teknologi dan tata kelola berintegritas tinggi.
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

with open("/Users/mac/Documents/AGENTS_WORK_HUB/apps/zadit-pages/app/direktori/[category]/[slug]/page.tsx", "w") as f:
    f.write(code)

print("Created app/direktori/[category]/[slug]/page.tsx")
