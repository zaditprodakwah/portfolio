// apps/zadit-pages/lib/portfolio.ts
// Single Source of Truth (SSOT) untuk katalog Portfolio interaktif & deliverable

import fs from "fs";
import path from "path";

export interface PortfolioItem {
  slug: string;
  title: string;
  metaDescription: string;
  badge: string;
  category: string;
  year: string;
  kind: "embed" | "case-study" | "code";
  demoUrl: string;
  tags: string[];
  summary: string;
  highlights: string[];
  deliverables: string[];
}

const portfolioDirectory = path.join(process.cwd(), "content/portfolio");

/** Mengambil seluruh item portfolio yang tersedia */
export function getAllPortfolioItems(): PortfolioItem[] {
  if (!fs.existsSync(portfolioDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(portfolioDirectory);
  const items: PortfolioItem[] = [];

  for (const fileName of fileNames) {
    if (fileName.endsWith(".json")) {
      const fullPath = path.join(portfolioDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      try {
        const parsed = JSON.parse(fileContents) as PortfolioItem;
        items.push(parsed);
      } catch (err) {
        console.error("Gagal membaca portfolio:", fileName, err);
      }
    }
  }

  return items.sort((a, b) => Number(b.year) - Number(a.year));
}

/** Mengambil satu item portfolio berdasarkan slug */
export function getPortfolioBySlug(slug: string): PortfolioItem | null {
  const fullPath = path.join(portfolioDirectory, `${slug}.json`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    return JSON.parse(fileContents) as PortfolioItem;
  } catch {
    return null;
  }
}

/** Mengambil seluruh slug untuk generateStaticParams */
export function getAllPortfolioSlugs() {
  return getAllPortfolioItems().map((item) => ({ slug: item.slug }));
}