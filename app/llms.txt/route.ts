import { getAllSolutions } from "@/lib/solutions";
import { getAllWawasan } from "@/lib/wawasan";
import { getAllDirectoryItems } from "@/lib/direktori";
import { getCanonicalUrl } from "@/lib/canonical-registry";

export const dynamic = "force-static";

export async function GET() {
  const solutions = getAllSolutions();
  const teardowns = getAllWawasan();
  const directory = getAllDirectoryItems();

  const text = `# Zadit Executive Hub (https://zadit.pages.dev/)

> Strategic Advisory, Technology Engineering & Growth OS oleh Muhammad Khoiruzzadittaqwa (Zadit).
> Sistem rekayasa terarah untuk efisiensi bisnis, integritas data ilmiah, dan performa web serverless edge.

## Pilar Layanan Modular
- [Dokumen Administrasi & Tata Kelola Bisnis](${getCanonicalUrl("/layanan/dokumen-administrasi-bisnis/")}): Standard Operating Procedure (SOP), evaluasi PSAK 109 yayasan nirlaba, dan proposal bisnis investor.
- [Layanan SEO Teknis & Konten Konversi](${getCanonicalUrl("/layanan/seo-konten-konversi/")}): Penyelarasan graf entitas semantik, optimasi AEO Google AI Overviews, dan Core Web Vitals.
- [Olah Data Statistik & Publikasi SINTA](${getCanonicalUrl("/layanan/olah-data-statistik-sinta/")}): Pendampingan legal metodologi penelitian, SPSS, dan SEM-PLS sesuai Permendikbudristek No 39/2021.
- [Rekayasa Web & Performa Tinggi Edge](${getCanonicalUrl("/layanan/solusi-web-performa/")}): Arsitektur web modern Next.js 15, migrasi VPS ke Cloudflare Pages $0 serverless, dan LCP < 1.0s.

## Studi Kasus & Solusi Terarah
${solutions.map((s) => `- [${s.title}](${getCanonicalUrl(`/solusi/${s.slug}/`)}): ${s.metaDescription}`).join("\n")}

## Analisis Kritis & Teardown Industri
${teardowns.map((w) => `- [${w.title}](${getCanonicalUrl(`/wawasan/${w.slug}/`)}): ${w.directAnswer}`).join("\n")}

## Direktori Layanan Wilayah & Industri
${directory.map((d) => `- [${d.title}](${getCanonicalUrl(`/direktori/${d.category}/${d.slug}/`)}): ${d.areaServed}`).join("\n")}

## Kontak Terproteksi & Konsultasi Langsung
- Beranda Otoritatif: ${getCanonicalUrl("/")}
- Resume Eksekutif: ${getCanonicalUrl("/cv/")}
- Audit Cepat Performa: ${getCanonicalUrl("/audit/")}
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
