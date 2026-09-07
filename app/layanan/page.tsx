import { Metadata } from "next";
import Link from "next/link";
import TriadDirectoryNav from "@/components/TriadDirectoryNav";
import { getCanonicalUrl } from "@/lib/canonical-registry";

export const metadata: Metadata = {
  title: "Katalog Layanan Modular Eksekutif | Zadit",
  description: "Daftar lengkap 4 pilar layanan rekayasa modular: Dokumen Administrasi Bisnis, Olah Data Statistik SINTA, SEO Teknis Konversi, dan Arsitektur Web Performa Tinggi.",
  alternates: {
    canonical: getCanonicalUrl("/layanan/"),
  },
  openGraph: {
    title: "Katalog Layanan Modular Eksekutif | Zadit",
    description: "Rekayasa presisi untuk efisiensi bisnis, integritas data ilmiah, dan performa web serverless edge.",
    url: getCanonicalUrl("/layanan/"),
    type: "website",
  },
};

const pillars = [
  {
    slug: "dokumen-administrasi-bisnis",
    title: "Dokumen Administrasi & Tata Kelola Bisnis",
    badge: "Tata Kelola & Legalitas",
    description: "Penyusunan Standard Operating Procedure (SOP), evaluasi PSAK 109 yayasan nirlaba, proposal bisnis kelayakan investor, dan restrukturisasi administrasi operasional.",
    deliverables: ["Dokumen SOP Terstandardisasi", "Pedoman Akuntabilitas Finansial", "Executive Investor Deck & Pitch"],
    sla: "3–7 Hari Kerja",
    href: "/layanan/dokumen-administrasi-bisnis/",
  },
  {
    slug: "seo-konten-konversi",
    title: "Layanan SEO Teknis & Konten Konversi",
    badge: "Visibilitas & Akuisisi",
    description: "Penyelarasan graf entitas, optimalisasi Core Web Vitals, penulisan konten otoritatif AEO/GEO, dan programmatic SEO terukur tanpa ketergantungan model retainer.",
    deliverables: ["Audit Arsitektur Entitas", "Injeksi Konten AI Overviews (AEO)", "Setup Graf JSON-LD Otoritatif"],
    sla: "5–10 Hari Kerja",
    href: "/layanan/seo-konten-konversi/",
  },
  {
    slug: "olah-data-statistik-sinta",
    title: "Olah Data Statistik & Publikasi Ilmiah SINTA",
    badge: "Integritas Metodologi",
    description: "Pendampingan komputasi ekonometrika dan biostatistika (SPSS, SEM-PLS, SmartPLS, R) untuk tesis, disertasi, dan naskah jurnal bereputasi SINTA 1–2 / Scopus.",
    deliverables: ["Matriks Uji Asumsi Klasik", "Interpretasi Output Statistik Bebas Bias", "Revisi Reviewer Metodologi"],
    sla: "2–5 Hari Kerja",
    href: "/layanan/olah-data-statistik-sinta/",
  },
  {
    slug: "solusi-web-performa",
    title: "Rekayasa Web & Performa Tinggi Edge",
    badge: "Arsitektur $0 Serverless",
    description: "Pengembangan web Next.js 15, migrasi VPS boros ke Cloudflare Pages/Edge, optimasi Largest Contentful Paint (LCP < 1.2s), dan arsitektur zero-maintenance.",
    deliverables: ["Full Static Edge Web Build", "Optimasi Core Web Vitals Hijau (95+)", "Konfigurasi Zero-Cost Edge Tier"],
    sla: "3–7 Hari Kerja",
    href: "/layanan/solusi-web-performa/",
  },
];

export default function LayananDirectoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": getCanonicalUrl("/layanan/"),
        "url": getCanonicalUrl("/layanan/"),
        "name": "Katalog Layanan Modular Eksekutif | Zadit",
        "description": "Indeks resmi 4 pilar layanan rekayasa teknologi dan tata kelola bisnis.",
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
              "name": "Katalog Layanan",
              "item": getCanonicalUrl("/layanan/"),
            },
          ],
        },
      },
      {
        "@type": "ItemList",
        "name": "Pilar Layanan Modular",
        "numberOfItems": pillars.length,
        "itemListElement": pillars.map((p, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": p.title,
          "url": getCanonicalUrl(p.href),
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-zinc-900 selection:bg-zinc-200">
      <div className="mx-auto max-w-4xl px-4 py-12 md:py-20 sm:px-6">
        <TriadDirectoryNav activeTab="layanan" />

        {/* Header */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600 mb-4 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            Katalog Layanan Resmi
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
            Layanan Rekayasa Modular
          </h1>
          <p className="mt-3 text-base text-zinc-600 md:text-lg leading-relaxed max-w-2xl">
            Empat pilar layanan terfokus dengan cakupan deliverable terukur, tanpa biaya tersembunyi, dan dikerjakan langsung secara presisi tanpa perantara birokrasi.
          </p>
        </header>

        {/* Pillars Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {pillars.map((pillar) => (
            <article
              key={pillar.slug}
              className="group flex flex-col justify-between rounded-xl border border-zinc-200/80 bg-white p-6 shadow-sm transition-all hover:border-zinc-400 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="rounded bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-700">
                    {pillar.badge}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">
                    SLA: {pillar.sla}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
                  <Link href={pillar.href} className="focus:outline-none">
                    {pillar.title}
                  </Link>
                </h2>

                <p className="mt-2.5 text-sm text-zinc-600 leading-relaxed">
                  {pillar.description}
                </p>

                <div className="mt-5 border-t border-zinc-100 pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block mb-2">
                    Deliverable Utama:
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-600">
                    {pillar.deliverables.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-zinc-400"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                <Link
                  href={pillar.href}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-900 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Buka Spesifikasi Lengkap</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Contextual Link to Root Domain */}
        <section className="mt-16 rounded-xl border border-zinc-200 bg-white p-6 md:p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">
            Butuh Rekayasa Solusi Lintas Disiplin?
          </h2>
          <p className="mt-2 text-sm text-zinc-600 max-w-xl mx-auto">
            Setiap permasalahan operasional dapat dikombinasikan dalam satu arsitektur terpadu. Konsultasikan langsung bersama{" "}
            <Link
              href="/"
              className="font-medium text-zinc-900 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-800"
            >
              konsultan teknologi bisnis eksekutif
            </Link>{" "}
            untuk pemetaan kebutuhan Anda.
          </p>
          <div className="mt-5">
            <Link
              href="/#konsultasi"
              className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-5 py-2.5 text-xs font-medium text-white shadow-sm hover:bg-zinc-800 transition-colors"
            >
              Jadwalkan Diskusi Awal
            </Link>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
