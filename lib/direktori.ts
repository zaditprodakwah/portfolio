// lib/direktori.ts
// SSOT Module for pSEO Directory (Local, Industry, and Semantic Clusters)

import fs from "fs";
import path from "path";

export interface PSEODirectoryItem {
  category: "web" | "seo" | "sinta" | "bisnis";
  slug: string;
  type: "local" | "industry" | "semantic";
  title: string;
  metaDescription: string;
  targetKeyword: string;
  areaServed: string;
  wikidataUri: string;
  localOrIndustryContext: string;
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

const matrixFilePath = path.join(process.cwd(), "content/direktori-matrix.json");

export function getAllDirectoryItems(): PSEODirectoryItem[] {
  if (!fs.existsSync(matrixFilePath)) {
    return [];
  }

  try {
    const raw = fs.readFileSync(matrixFilePath, "utf8");
    return JSON.parse(raw) as PSEODirectoryItem[];
  } catch (err) {
    console.error("Error reading direktori-matrix.json:", err);
    return [];
  }
}

export function getDirectoryItem(category: string, slug: string): PSEODirectoryItem | null {
  const items = getAllDirectoryItems();
  return items.find((i) => i.category === category && i.slug === slug) || null;
}

export function getAllDirectoryParams(): Array<{ category: string; slug: string }> {
  const items = getAllDirectoryItems();
  return items.map((i) => ({ category: i.category, slug: i.slug }));
}
