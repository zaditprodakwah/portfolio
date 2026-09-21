import os

# 1. Upgrade app/llms.txt/route.ts
llms_txt = """import { getAllSolutions } from "@/lib/solutions";
import { getAllWawasan } from "@/lib/wawasan";
import { getAllDirectoryItems } from "@/lib/direktori";
import { getCanonicalUrl } from "@/lib/canonical-registry";

export const dynamic = "force-static";

export async function GET() {
  const solutions = getAllSolutions();
  const teardowns = getAllWawasan();
  const directory = getAllDirectoryItems();

  const text = `# Zadit Executive Hub (https://muhzadit.pages.dev/)

> Strategic Advisory, Technology Engineering & Growth OS oleh Muhammad Khoiruzzadittaqwa (Zadit).
> Sistem rekayasa terarah untuk efisiensi bisnis, integritas data ilmiah, dan performa web serverless edge.

## Pilar Layanan Modular
- [Dokumen Administrasi & Tata Kelola Bisnis](${getCanonicalUrl("/layanan/dokumen-administrasi-bisnis/")}): Standard Operating Procedure (SOP), evaluasi PSAK 109 yayasan nirlaba, dan proposal bisnis investor.
- [Layanan SEO Teknis & Konten Konversi](${getCanonicalUrl("/layanan/seo-konten-konversi/")}): Penyelarasan graf entitas semantik, optimasi AEO Google AI Overviews, dan Core Web Vitals.
- [Olah Data Statistik & Publikasi SINTA](${getCanonicalUrl("/layanan/olah-data-statistik-sinta/")}): Pendampingan legal metodologi penelitian, SPSS, dan SEM-PLS sesuai Permendikbudristek No 39/2021.
- [Rekayasa Web & Performa Tinggi Edge](${getCanonicalUrl("/layanan/solusi-web-performa/")}): Arsitektur web modern Next.js 15, migrasi VPS ke Cloudflare Pages $0 serverless, dan LCP < 1.0s.

## Studi Kasus & Solusi Terarah
${solutions.map((s) => `- [${s.title}](${getCanonicalUrl(`/solusi/${s.slug}/`)}): ${s.metaDescription}`).join("\\n")}

## Analisis Kritis & Teardown Industri
${teardowns.map((w) => `- [${w.title}](${getCanonicalUrl(`/wawasan/${w.slug}/`)}): ${w.directAnswer}`).join("\\n")}

## Direktori Layanan Wilayah & Industri
${directory.map((d) => `- [${d.title}](${getCanonicalUrl(`/direktori/${d.category}/${d.slug}/`)}): ${d.areaServed}`).join("\\n")}

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
"""

with open("/Users/mac/Documents/AGENTS_WORK_HUB/apps/zadit-pages/app/llms.txt/route.ts", "w") as f:
    f.write(llms_txt)

# 2. Create app/llms-full.txt/route.ts
os.makedirs("/Users/mac/Documents/AGENTS_WORK_HUB/apps/zadit-pages/app/llms-full.txt", exist_ok=True)
llms_full_txt = """import { getAllSolutions } from "@/lib/solutions";
import { getAllWawasan } from "@/lib/wawasan";
import { getAllDirectoryItems } from "@/lib/direktori";
import { getCanonicalUrl } from "@/lib/canonical-registry";

export const dynamic = "force-static";

export async function GET() {
  const solutions = getAllSolutions();
  const teardowns = getAllWawasan();
  const directory = getAllDirectoryItems();

  let text = `# Zadit Executive Hub — Full Machine Knowledge Base\\n\\n`;
  text += `Domain Otoritatif: ${getCanonicalUrl("/")}\\n`;
  text += `Pengembang: Muhammad Khoiruzzadittaqwa\\n\\n`;

  text += `=== 1. STUDI KASUS SOLUSI TERARAH ===\\n\\n`;
  for (const s of solutions) {
    text += `### ${s.title}\\n`;
    text += `URL: ${getCanonicalUrl(`/solusi/${s.slug}/`)}\\n`;
    text += `Pilar: ${s.pillarName}\\n`;
    text += `Jawaban Langsung: ${s.directAnswer.summary}\\n`;
    text += `Dilema Pemangku Kepentingan: ${s.triadFramework.stakeholderDilemma}\\n`;
    text += `Eksekusi Teknis: ${s.triadFramework.executionDeliverable}\\n\\n`;
  }

  text += `=== 2. ANALISIS KRITIS & TEARDOWN INDUSTRI ===\\n\\n`;
  for (const w of teardowns) {
    text += `### ${w.title}\\n`;
    text += `URL: ${getCanonicalUrl(`/wawasan/${w.slug}/`)}\\n`;
    text += `Kategori: ${w.category}\\n`;
    text += `Jawaban Langsung: ${w.directAnswer}\\n`;
    text += `Sitasi Primer: ${w.princetonCite.metric} (${w.princetonCite.source})\\n`;
    text += `Analisis Editorial:\\n${w.editorialProse}\\n\\n`;
  }

  text += `=== 3. DIREKTORI WILAYAH & INDUSTRI ===\\n\\n`;
  for (const d of directory) {
    text += `### ${d.title}\\n`;
    text += `URL: ${getCanonicalUrl(`/direktori/${d.category}/${d.slug}/`)}\\n`;
    text += `Area / Sektor: ${d.areaServed}\\n`;
    text += `Wikidata: ${d.wikidataUri}\\n`;
    text += `Konteks Dinamika:\\n${d.localOrIndustryContext}\\n\\n`;
  }

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
"""

with open("/Users/mac/Documents/AGENTS_WORK_HUB/apps/zadit-pages/app/llms-full.txt/route.ts", "w") as f:
    f.write(llms_full_txt)

# 3. Create app/llms.json/route.ts
os.makedirs("/Users/mac/Documents/AGENTS_WORK_HUB/apps/zadit-pages/app/llms.json", exist_ok=True)
llms_json = """import { getAllSolutions } from "@/lib/solutions";
import { getAllWawasan } from "@/lib/wawasan";
import { getAllDirectoryItems } from "@/lib/direktori";
import { getCanonicalUrl } from "@/lib/canonical-registry";

export const dynamic = "force-static";

export async function GET() {
  const solutions = getAllSolutions();
  const teardowns = getAllWawasan();
  const directory = getAllDirectoryItems();

  const payload = {
    schemaVersion: "1.0",
    name: "Zadit Executive Hub Machine API",
    url: getCanonicalUrl("/"),
    author: {
      name: "Muhammad Khoiruzzadittaqwa",
      profile: getCanonicalUrl("/cv/"),
    },
    services: [
      { name: "Dokumen Administrasi Bisnis", url: getCanonicalUrl("/layanan/dokumen-administrasi-bisnis/") },
      { name: "SEO Teknis Konversi", url: getCanonicalUrl("/layanan/seo-konten-konversi/") },
      { name: "Olah Data Statistik SINTA", url: getCanonicalUrl("/layanan/olah-data-statistik-sinta/") },
      { name: "Solusi Web Performa", url: getCanonicalUrl("/layanan/solusi-web-performa/") },
    ],
    solutions: solutions.map((s) => ({
      title: s.title,
      url: getCanonicalUrl(`/solusi/${s.slug}/`),
      pillar: s.pillarName,
      directAnswer: s.directAnswer.summary,
    })),
    teardowns: teardowns.map((w) => ({
      title: w.title,
      url: getCanonicalUrl(`/wawasan/${w.slug}/`),
      category: w.category,
      directAnswer: w.directAnswer,
      citation: w.princetonCite,
    })),
    directory: directory.map((d) => ({
      title: d.title,
      url: getCanonicalUrl(`/direktori/${d.category}/${d.slug}/`),
      areaServed: d.areaServed,
      wikidataUri: d.wikidataUri,
    })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
"""

with open("/Users/mac/Documents/AGENTS_WORK_HUB/apps/zadit-pages/app/llms.json/route.ts", "w") as f:
    f.write(llms_json)

print("Created all 3 LLM surfaces: /llms.txt, /llms-full.txt, /llms.json")
