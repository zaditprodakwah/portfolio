import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { getSolutionBySlug, getAllSolutionSlugs } from "@/lib/solutions";
import { DirectAnswerBox } from "@/components/DirectAnswerBox";
import { CompetitorMatrixTable } from "@/components/CompetitorMatrixTable";
import { EntityPills } from "@/components/EntityPills";
import { ProtectedContact } from "@/components/ProtectedContact";

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSolutionSlugs();
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return { title: "Solusi Tidak Ditemukan | Zadit Growth" };
  }

  return {
    title: `${solution.title} | Zadit Growth`,
    description: solution.metaDescription,
    alternates: {
      canonical: `https://zadit.pages.dev/solusi/${solution.slug}`
    }
  };
}

export default async function SolutionDetailPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": solution.title,
        "description": solution.metaDescription,
        "provider": {
          "@type": "Person",
          "name": "Muhammad Khoiruzzadittaqwa",
          "url": "https://zadit.pages.dev"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": solution.faq.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      }
    ]
  };

  const pillarRoutes: Record<string, string> = {
    "business-docs": "/layanan/dokumen-administrasi-bisnis",
    "marketing-seo": "/layanan/seo-konten-konversi",
    "academic-research": "/layanan/olah-data-statistik-sinta",
    "digital-solutions": "/layanan/solusi-web-performa"
  };

  const parentPillarRoute = pillarRoutes[solution.pillarId] || "/";

  return (
    <div className="min-h-screen bg-alabaster py-12 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Navigation Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-slate-600">
          <Link href="/" className="hover:text-teal-800 transition-colors">Beranda</Link>
          <span>/</span>
          <Link href={parentPillarRoute} className="hover:text-teal-800 transition-colors">
            {solution.pillarName}
          </Link>
          <span>/</span>
          <span className="text-teal-800">Solusi</span>
        </div>

        {/* Header Section */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200/80">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Solusi Terprogram & Riset Industri</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
            {solution.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
            {solution.metaDescription}
          </p>
        </header>

        {/* Direct-Answer BLUF */}
        <DirectAnswerBox
          summary={solution.directAnswer.summary}
          takeaways={solution.directAnswer.takeaways}
        />

        {/* 3-Way Comparative Competitor Matrix */}
        <CompetitorMatrixTable rows={solution.competitorMatrix} />

        {/* Triad Framework Deep Dive */}
        <section className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Bedah Kasus & Dinamika Pemangku Kepentingan
          </h2>

          <div className="space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-amber-500">
              <h3 className="font-bold text-slate-900 mb-1">Dilema & Pertimbangan Risiko Bisnis</h3>
              <p>{solution.triadFramework.stakeholderDilemma}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-teal-600">
              <h3 className="font-bold text-slate-900 mb-1">Pendekatan Diplomasi & Penyelarasan Tim</h3>
              <p>{solution.triadFramework.diplomaticNavigation}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-emerald-600">
              <h3 className="font-bold text-slate-900 mb-1">Eksekusi Teknis & Deliverable Akhir</h3>
              <p>{solution.triadFramework.executionDeliverable}</p>
            </div>
          </div>
        </section>

        {/* Dual-Metric Impact Dashboard */}
        <section className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900">
            Dual-Metric Impact Dashboard
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3 p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/60">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Dampak Bisnis & Keberhasilan Riil
              </h3>
              <div className="space-y-2">
                {solution.impactDashboard.businessRoi.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-emerald-200/40 pb-1.5 text-xs sm:text-sm">
                    <span className="text-slate-700">{item.label}:</span>
                    <strong className="text-slate-900 font-bold font-mono">{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 p-4 rounded-xl bg-teal-50/50 border border-teal-200/60">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-900">
                Validasi Teknis & Akurasi Eksak
              </h3>
              <div className="space-y-2">
                {solution.impactDashboard.technicalRigor.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-teal-200/40 pb-1.5 text-xs sm:text-sm">
                    <span className="text-slate-700">{item.label}:</span>
                    <strong className="text-slate-900 font-bold font-mono">{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <div className="space-y-4 pt-2">
            {solution.faq.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                <h3 className="font-bold text-sm sm:text-base text-slate-900">{item.question}</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{item.answer}</p>
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
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold">Ingin Konsultasi Mengenai Kebutuhan Ini?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Diskusikan langsung dengan Muhammad Khoiruzzadittaqwa (Zadit) tanpa perantara.
            </p>
          </div>
          <ProtectedContact
            type="whatsapp"
            label="Konsultasi Cepat via WhatsApp"
            prefillMessage={`Halo Mas Zadit, saya membaca solusi ${solution.title} di zadit.pages.dev dan ingin berdiskusi mengenai proyek kami.`}
            className="shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-xl shadow-xs transition-all"
          />
        </div>
      </div>
    </div>
  );
}
