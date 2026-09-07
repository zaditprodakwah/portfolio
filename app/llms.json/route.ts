import { getAllSolutions } from "@/lib/solutions";
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
