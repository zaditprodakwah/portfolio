import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPortfolioBySlug, getAllPortfolioSlugs } from "@/lib/portfolio";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllPortfolioSlugs();
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioBySlug(slug);
  if (!item) return {};

  const canonical = `https://muhzadit.pages.dev/portfolio/${item.slug}/`;

  return {
    title: `${item.title} | Portofolio Zadit`,
    description: item.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: item.title,
      description: item.metaDescription,
      url: canonical,
      type: "article",
    },
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getPortfolioBySlug(slug);
  if (!item) notFound();

  const canonical = `https://muhzadit.pages.dev/portfolio/${item.slug}/`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.metaDescription,
    url: canonical,
    author: {
      "@type": "Person",
      name: "Muhammad Khoiruzzadittaqwa",
      url: "https://muhzadit.pages.dev",
    },
    keywords: item.tags.join(", "),
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 text-zinc-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto space-y-10">
        <nav className="flex flex-wrap items-center gap-2 text-xs font-mono font-medium text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/portfolio/" className="hover:text-zinc-900 transition-colors">Portfolio</Link>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">{item.title}</span>
        </nav>

        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold text-teal-800 bg-teal-50 border border-teal-200/70">
              {item.badge}
            </span>
            <span className="text-xs font-mono text-zinc-400">{item.category} &middot; {item.year}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-900 tracking-tight leading-tight">
            {item.title}
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">{item.summary}</p>
        </header>

        {item.kind === "embed" && (
          <section className="rounded-2xl border border-zinc-200 overflow-hidden bg-white">
            <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 text-white text-xs font-mono">
              <span className="text-zinc-300">LIVE DEMO &middot; {item.demoUrl}</span>
              <Link
                href={item.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-300 hover:text-teal-200 font-semibold"
              >
                Buka di tab baru &uarr;
              </Link>
            </div>
            <iframe
              src={item.demoUrl}
              title={item.title}
              className="w-full h-[600px] border-0 bg-white"
            />
          </section>
        )}

        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-xl border border-zinc-200 shadow-xs">
          <h2 className="text-lg font-heading font-semibold text-zinc-900">Highlight</h2>
          <ul className="space-y-2 list-disc list-inside text-sm text-zinc-700 leading-relaxed">
            {item.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-xl border border-zinc-200 shadow-xs">
          <h2 className="text-lg font-heading font-semibold text-zinc-900">Deliverable</h2>
          <ul className="space-y-2 list-disc list-inside text-sm text-zinc-700 leading-relaxed">
            {item.deliverables.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-zinc-100 text-[11px] font-mono text-zinc-600 border border-zinc-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}