import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { getSolutionBySlug, getAllSolutionSlugs } from "@/lib/solutions";
import { DirectAnswerBox } from "@/components/DirectAnswerBox";
import { CompetitorMatrixTable } from "@/components/CompetitorMatrixTable";
import { EntityPills } from "@/components/EntityPills";
import { ProtectedContact } from "@/components/ProtectedContact";
import PrincetonCiteBlock from "@/components/PrincetonCiteBlock";
import TriadDirectoryNav from "@/components/TriadDirectoryNav";
import { getCanonicalUrl } from "@/lib/canonical-registry";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllSolutionSlugs();
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};

  const canonical = getCanonicalUrl(`/solusi/${solution.slug}/`);

  return {
    title: `${solution.title} | Zadit Growth`,
    description: solution.metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: solution.title,
      description: solution.metaDescription,
      url: canonical,
      type: "article",
    },
  };
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug) as any;
  if (!solution) notFound();

  const canonical = getCanonicalUrl(`/solusi/${solution.slug}/`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": solution.title,
        "description": solution.metaDescription,
        "brand": {
          "@type": "Organization",
          "name": "Zadit Solutions Hub",
        },
        "offers": {
          "@type": "OfferCatalog",
          "name": "Layanan Konsultasi " + solution.pillarName,
        },
      },
      {
        "@type": "Service",
        "name": solution.title,
        "description": solution.metaDescription,
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
            "name": "Solusi Terarah",
            "item": getCanonicalUrl("/solusi/"),
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": solution.title,
            "item": canonical,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": solution.faq.map((item: any) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer,
          },
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

  const parentPillarRoute = pillarRoutes[solution.pillarId] || "/layanan/";

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 text-zinc-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto space-y-10">
        <TriadDirectoryNav activeTab="solusi" />

        {/* Navigation Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-medium text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <Link href={parentPillarRoute} className="hover:text-zinc-900 transition-colors">
            {solution.pillarName}
          </Link>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">Solusi</span>
        </div>

        {/* Header Section */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 border border-zinc-200">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
            <span>Solusi Terprogram & Riset Industri</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-semibold text-zinc-900 tracking-tight leading-tight">
            {solution.title}
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-sans">
            {solution.metaDescription}
          </p>
        </header>

        {/* Direct-Answer BLUF */}
        <DirectAnswerBox
          summary={solution.directAnswer.summary}
          takeaways={solution.directAnswer.takeaways}
        />

        {/* Princeton Citation Stacking Block if available */}
        {solution.citationAnchor && (
          <PrincetonCiteBlock
            metric={solution.citationAnchor.metric}
            source={solution.citationAnchor.source}
            url={solution.citationAnchor.url}
          />
        )}

        {/* 3-Way Comparative Competitor Matrix */}
        <CompetitorMatrixTable rows={solution.competitorMatrix} />

        {/* Triad Framework Deep Dive */}
        <section className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-zinc-200 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900">
            Bedah Kasus & Dinamika Pemangku Kepentingan
          </h2>

          <div className="space-y-5 text-sm sm:text-base text-zinc-700 leading-relaxed">
            <div className="p-4 rounded-lg bg-zinc-50 border-l-4 border-amber-500">
              <h3 className="font-semibold text-zinc-900 mb-1">
                Dilema & Pertimbangan Risiko Bisnis
              </h3>
              <p>{solution.triadFramework.stakeholderDilemma}</p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-50 border-l-4 border-zinc-600">
              <h3 className="font-semibold text-zinc-900 mb-1">
                Pendekatan Diplomasi & Penyelarasan Tim
              </h3>
              <p>{solution.triadFramework.diplomaticNavigation}</p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-50 border-l-4 border-emerald-600">
              <h3 className="font-semibold text-zinc-900 mb-1">
                Eksekusi Teknis & Deliverable Akhir
              </h3>
              <p>{solution.triadFramework.executionDeliverable}</p>
            </div>
          </div>
        </section>

        {/* Dual-Metric Impact Dashboard */}
        <section className="space-y-4 bg-white p-6 sm:p-8 rounded-xl border border-zinc-200 shadow-xs">
          <h2 className="text-xl font-semibold text-zinc-900">
            Dual-Metric Impact Dashboard
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3 p-4 rounded-lg bg-emerald-50/50 border border-emerald-200/60">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-900">
                Dampak Bisnis & Keberhasilan Riil
              </h3>
              <div className="space-y-2">
                {solution.impactDashboard.businessRoi.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b border-emerald-200/40 pb-1.5 text-xs sm:text-sm"
                  >
                    <span className="text-zinc-700">{item.label}:</span>
                    <strong className="text-zinc-900 font-semibold font-mono">{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 p-4 rounded-lg bg-zinc-50 border border-zinc-200/80">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                Validasi Teknis & Akurasi Eksak
              </h3>
              <div className="space-y-2">
                {solution.impactDashboard.technicalRigor.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b border-zinc-200/40 pb-1.5 text-xs sm:text-sm"
                  >
                    <span className="text-zinc-700">{item.label}:</span>
                    <strong className="text-zinc-900 font-semibold font-mono">{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-4 bg-white p-6 sm:p-8 rounded-xl border border-zinc-200 shadow-xs">
          <h2 className="text-xl font-semibold text-zinc-900">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <div className="space-y-4 pt-2">
            {solution.faq.map((item: any, idx: number) => (
              <div key={idx} className="p-4 rounded-lg bg-zinc-50 border border-zinc-200/70 space-y-1.5">
                <h3 className="font-semibold text-sm sm:text-base text-zinc-900">{item.question}</h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Knowledge Graph Entity Pills */}
        <EntityPills
          entityIds={solution.relatedEntities}
          title="Entitas Knowledge Graph Terkait"
        />

        {/* CTA Banner */}
        <div className="p-6 sm:p-8 rounded-xl bg-zinc-900 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold">Ingin Konsultasi Mengenai Kebutuhan Ini?</h3>
            <p className="text-xs sm:text-sm text-zinc-300">
              Diskusikan langsung bersama{" "}
              <Link href="/" className="text-white underline hover:text-zinc-200">
                Muhammad Khoiruzzadittaqwa (Zadit)
              </Link>{" "}
              tanpa perantara.
            </p>
          </div>
          <ProtectedContact
            type="whatsapp"
            label="Konsultasi Cepat via WhatsApp"
            prefillMessage={`Halo Mas Zadit, saya membaca solusi ${solution.title} di muhzadit.pages.dev dan ingin berdiskusi mengenai proyek kami.`}
            className="shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold py-3 px-5 rounded-lg shadow-xs transition-all"
          />
        </div>
      </div>
    </div>
  );
}
