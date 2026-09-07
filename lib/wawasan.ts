// apps/zadit-pages/lib/wawasan.ts
// SSOT untuk Analisis Kritis & Teardown Industri

import fs from "fs";
import path from "path";

export interface WawasanItem {
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  publishedAt: string;
  directAnswer: string;
  princetonCite: {
    metric: string;
    source: string;
    url: string;
  };
  editorialProse: string;
  hybridComparison: {
    contextTradeOff: string;
    alternativeStrengths: string;
    zaditFitContext: string;
    comparisonTable: Array<{
      criterion: string;
      traditionalAgency: string;
      freelancePlatform: string;
      zaditEngineering: string;
    }>;
  };
  rootDomainLink: {
    anchorText: string;
    targetUrl: string;
  };
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

const wawasanDirectory = path.join(process.cwd(), "content/wawasan");

export function getAllWawasan(): WawasanItem[] {
  if (!fs.existsSync(wawasanDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(wawasanDirectory);
  const items: WawasanItem[] = [];

  for (const fileName of fileNames) {
    if (fileName.endsWith(".json")) {
      const fullPath = path.join(wawasanDirectory, fileName);
      try {
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const parsed = JSON.parse(fileContents) as WawasanItem;
        items.push(parsed);
      } catch (err) {
        console.error("Gagal membaca wawasan:", fileName, err);
      }
    }
  }

  return items;
}

export function getWawasanBySlug(slug: string): WawasanItem | null {
  const fullPath = path.join(wawasanDirectory, `${slug}.json`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    return JSON.parse(fileContents) as WawasanItem;
  } catch {
    return null;
  }
}

export function getAllWawasanSlugs(): Array<{ slug: string }> {
  const items = getAllWawasan();
  return items.map((w) => ({ slug: w.slug }));
}
