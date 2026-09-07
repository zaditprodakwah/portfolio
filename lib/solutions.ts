// apps/zadit-pages/lib/solutions.ts
// Single Source of Truth (SSOT) untuk Solusi Programmatik & Competitor Hijacking

import fs from "fs";
import path from "path";

export interface SolutionItem {
  slug: string;
  pillarId: string;
  pillarName: string;
  title: string;
  metaDescription: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  directAnswer: {
    summary: string;
    takeaways: string[];
  };
  triadFramework: {
    stakeholderDilemma: string;
    diplomaticNavigation: string;
    executionDeliverable: string;
  };
  impactDashboard: {
    businessRoi: Array<{ label: string; value: string }>;
    technicalRigor: Array<{ label: string; value: string }>;
  };
  competitorMatrix: Array<{
    dimension: string;
    ourSolution: string;
    legacyAgency: string;
    cheapFreelance: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  relatedEntities: string[];
}

const solutionsDirectory = path.join(process.cwd(), "content/solutions");

/** Mengambil seluruh data solusi yang tersedia */
export function getAllSolutions(): SolutionItem[] {
  if (!fs.existsSync(solutionsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(solutionsDirectory);
  const solutions: SolutionItem[] = [];

  for (const fileName of fileNames) {
    if (fileName.endsWith(".json")) {
      const fullPath = path.join(solutionsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      try {
        const parsed = JSON.parse(fileContents) as SolutionItem;
        solutions.push(parsed);
      } catch (err) {
        console.error("Gagal membaca solusi:", fileName, err);
      }
    }
  }

  return solutions;
}

/** Mengambil data solusi berdasarkan slug */
export function getSolutionBySlug(slug: string): SolutionItem | null {
  const fullPath = path.join(solutionsDirectory, `${slug}.json`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    return JSON.parse(fileContents) as SolutionItem;
  } catch {
    return null;
  }
}

/** Mengambil seluruh slug untuk Next.js generateStaticParams */
export function getAllSolutionSlugs(): Array<{ slug: string }> {
  const solutions = getAllSolutions();
  return solutions.map((s) => ({ slug: s.slug }));
}
