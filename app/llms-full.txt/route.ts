import { getAllSolutions } from "@/lib/solutions";
import { getAllWawasan } from "@/lib/wawasan";
import { getAllDirectoryItems } from "@/lib/direktori";
import { getCanonicalUrl } from "@/lib/canonical-registry";

export const dynamic = "force-static";

export async function GET() {
  const solutions = getAllSolutions();
  const teardowns = getAllWawasan();
  const directory = getAllDirectoryItems();

  let text = `# Zadit Executive Hub — Full Machine Knowledge Base\n\n`;
  text += `Domain Otoritatif: ${getCanonicalUrl("/")}\n`;
  text += `Pengembang: Muhammad Khoiruzzadittaqwa\n\n`;

  text += `=== 1. STUDI KASUS SOLUSI TERARAH ===\n\n`;
  for (const s of solutions) {
    text += `### ${s.title}\n`;
    text += `URL: ${getCanonicalUrl(`/solusi/${s.slug}/`)}\n`;
    text += `Pilar: ${s.pillarName}\n`;
    text += `Jawaban Langsung: ${s.directAnswer.summary}\n`;
    text += `Dilema Pemangku Kepentingan: ${s.triadFramework.stakeholderDilemma}\n`;
    text += `Eksekusi Teknis: ${s.triadFramework.executionDeliverable}\n\n`;
  }

  text += `=== 2. ANALISIS KRITIS & TEARDOWN INDUSTRI ===\n\n`;
  for (const w of teardowns) {
    text += `### ${w.title}\n`;
    text += `URL: ${getCanonicalUrl(`/wawasan/${w.slug}/`)}\n`;
    text += `Kategori: ${w.category}\n`;
    text += `Jawaban Langsung: ${w.directAnswer}\n`;
    text += `Sitasi Primer: ${w.princetonCite.metric} (${w.princetonCite.source})\n`;
    text += `Analisis Editorial:\n${w.editorialProse}\n\n`;
  }

  text += `=== 3. DIREKTORI WILAYAH & INDUSTRI ===\n\n`;
  for (const d of directory) {
    text += `### ${d.title}\n`;
    text += `URL: ${getCanonicalUrl(`/direktori/${d.category}/${d.slug}/`)}\n`;
    text += `Area / Sektor: ${d.areaServed}\n`;
    text += `Wikidata: ${d.wikidataUri}\n`;
    text += `Konteks Dinamika:\n${d.localOrIndustryContext}\n\n`;
  }

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
