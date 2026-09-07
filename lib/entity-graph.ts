// apps/zadit-pages/lib/entity-graph.ts
// Single Source of Truth (SSOT) untuk Entity Knowledge Graph & Graphify Linking Engine
// Diadopsi dari arsitektur NEWSPORTAL / groundworkpub/engine dengan hierarki 2-tingkat (Makro & Mikro)

export type PillarId = "business-docs" | "marketing-seo" | "academic-research" | "digital-solutions";

export interface EntityNode {
  id: string;
  name: string;
  level: "macro" | "micro";
  pillar: PillarId;
  wikidataUri: string;
  description: string;
  aliases: string[];
}

export interface EntityEdge {
  sourceId: string;
  targetId: string;
  relationType: ":PREREQUISITE_FOR" | ":PART_OF" | ":EVIDENCE_FOR" | ":OPTIMIZES" | ":RELATED_TO";
  weight: number; // 0.0 - 1.0
}

export const ENTITY_NODES: Record<string, EntityNode> = {
  // --- Pilar 1: Dokumen, Tata Kelola & Administrasi Bisnis ---
  "business-admin": {
    id: "business-admin",
    name: "Business Administration & Governance",
    level: "macro",
    pillar: "business-docs",
    wikidataUri: "https://www.wikidata.org/wiki/Q860686",
    description: "Prinsip tata kelola organisasi, pengelolaan aset, kepatuhan legal, dan administrasi operasional bisnis.",
    aliases: ["tata kelola administrasi", "administrasi bisnis", "manajemen organisasi"]
  },
  "sop-administrasi": {
    id: "sop-administrasi",
    name: "Standar Operasional Prosedur (SOP)",
    level: "micro",
    pillar: "business-docs",
    wikidataUri: "https://www.wikidata.org/wiki/Q1129528",
    description: "Pedoman baku langkah-langkah kerja untuk menjamin efisiensi, akuntabilitas, dan kepatuhan audit internal.",
    aliases: ["sop operasional", "pedoman kerja yayasan", "manual kepatuhan"]
  },
  "studi-kelayakan": {
    id: "studi-kelayakan",
    name: "Studi Kelayakan Bisnis",
    level: "micro",
    pillar: "business-docs",
    wikidataUri: "https://www.wikidata.org/wiki/Q1053155",
    description: "Analisis komprehensif kelayakan pasar, teknis, finansial, dan legal sebelum proyek bisnis dijalankan.",
    aliases: ["feasibility study", "analisa kelayakan investasi", "executive summary bisnis"]
  },
  "proposal-kemitraan": {
    id: "proposal-kemitraan",
    name: "Proposal Kerjasama & Kemitraan",
    level: "micro",
    pillar: "business-docs",
    wikidataUri: "https://www.wikidata.org/wiki/Q1134015",
    description: "Dokumen penawaran resmi untuk meyakinkan mitra dagang, investor, atau lembaga donor dengan perhitungan risiko.",
    aliases: ["proposal usaha", "penawaran konsinyasi", "pitch deck kemitraan"]
  },

  // --- Pilar 2: SEO, Konten & Konversi Digital ---
  "seo-strategy": {
    id: "seo-strategy",
    name: "Search Engine Optimization Strategy",
    level: "macro",
    pillar: "marketing-seo",
    wikidataUri: "https://www.wikidata.org/wiki/Q180711",
    description: "Strategi komprehensif menjaring pencarian organik Google berniat tinggi tanpa ketergantungan iklan berbayar.",
    aliases: ["strategi seo organik", "optimasi mesin pencari", "topical authority"]
  },
  "technical-seo": {
    id: "technical-seo",
    name: "Technical SEO & Silo Architecture",
    level: "micro",
    pillar: "marketing-seo",
    wikidataUri: "https://www.wikidata.org/wiki/Q180711",
    description: "Penataan struktur perayapan, pembersihan kode, sitemap XML, dan arsitektur tautan internal bebas orphan.",
    aliases: ["audit technical seo", "internal linking silo", "crawl budget"]
  },

  // --- Pilar 3: Olah Data Statistik & Riset SINTA ---
  "statistics-data": {
    id: "statistics-data",
    name: "Statistics & Quantitative Methodology",
    level: "macro",
    pillar: "academic-research",
    wikidataUri: "https://www.wikidata.org/wiki/Q1124434",
    description: "Metodologi kuantitatif untuk pengujian hipotesis, validasi data sampel, dan pengambilan keputusan berbasis bukti.",
    aliases: ["metodologi kuantitatif", "analisis data statistik", "statistika terapan"]
  },
  "analisis-spss": {
    id: "analisis-spss",
    name: "Analisis Regresi & Uji Asumsi SPSS",
    level: "micro",
    pillar: "academic-research",
    wikidataUri: "https://www.wikidata.org/wiki/Q10861030",
    description: "Pengolahan data empiris dengan uji normalitas, multikolinearitas, heteroskedastisitas, dan regresi berganda.",
    aliases: ["regresi linier berganda", "olah data spss skripsi", "uji hipotesis statistik"]
  },
  "uji-validitas-reliabilitas": {
    id: "uji-validitas-reliabilitas",
    name: "Uji Validitas & Reliabilitas (Cronbach Alpha)",
    level: "micro",
    pillar: "academic-research",
    wikidataUri: "https://www.wikidata.org/wiki/Q843232",
    description: "Verifikasi ketepatan dan konsistensi instrumen kuesioner agar data penelitian tidak bias dan tahan uji sidang.",
    aliases: ["cronbachs alpha", "uji validitas instrumen", "konsistensi internal kuesioner"]
  },
  "publikasi-sinta": {
    id: "publikasi-sinta",
    name: "Publikasi Jurnal Terakreditasi SINTA",
    level: "micro",
    pillar: "academic-research",
    wikidataUri: "https://www.wikidata.org/wiki/Q115869408",
    description: "Standar publikasi artikel ilmiah nasional terakreditasi Kemendikbudristek (SINTA 1 hingga SINTA 4).",
    aliases: ["jurnal sinta 2", "akreditasi jurnal kemendikbud", "revisi peer-review ilmiah"]
  },

  // --- Pilar 4: Solusi Web Performa & Edge Engineering ---
  "web-engineering": {
    id: "web-engineering",
    name: "Web Performance & Edge Computing",
    level: "macro",
    pillar: "digital-solutions",
    wikidataUri: "https://www.wikidata.org/wiki/Q1123286",
    description: "Rekayasa arsitektur web modern berbasis jaringan komputasi tepi (Edge) dengan latensi ultra-rendah dan $0 server.",
    aliases: ["komputasi tepi cloudflare", "arsitektur web modern", "edge computing"]
  },
  "core-web-vitals": {
    id: "core-web-vitals",
    name: "Core Web Vitals (LCP, INP, CLS)",
    level: "micro",
    pillar: "digital-solutions",
    wikidataUri: "https://www.wikidata.org/wiki/Q106670857",
    description: "Standar metrik resmi Google untuk mengukur kecepatan render visual (LCP), interaktivitas (INP), dan stabilitas visual (CLS).",
    aliases: ["google core web vitals", "kecepatan lcp ttfb", "pagespeed 100"]
  }
};

export const ENTITY_EDGES: EntityEdge[] = [
  { sourceId: "sop-administrasi", targetId: "business-admin", relationType: ":PART_OF", weight: 0.95 },
  { sourceId: "studi-kelayakan", targetId: "proposal-kemitraan", relationType: ":PREREQUISITE_FOR", weight: 0.90 },
  { sourceId: "proposal-kemitraan", targetId: "business-admin", relationType: ":PART_OF", weight: 0.85 },
  
  { sourceId: "technical-seo", targetId: "seo-strategy", relationType: ":PART_OF", weight: 0.95 },
  { sourceId: "technical-seo", targetId: "core-web-vitals", relationType: ":OPTIMIZES", weight: 0.88 },
  
  { sourceId: "uji-validitas-reliabilitas", targetId: "analisis-spss", relationType: ":PREREQUISITE_FOR", weight: 0.95 },
  { sourceId: "analisis-spss", targetId: "publikasi-sinta", relationType: ":EVIDENCE_FOR", weight: 0.92 },
  { sourceId: "analisis-spss", targetId: "statistics-data", relationType: ":PART_OF", weight: 0.90 },
  { sourceId: "publikasi-sinta", targetId: "statistics-data", relationType: ":RELATED_TO", weight: 0.85 },
  
  { sourceId: "core-web-vitals", targetId: "web-engineering", relationType: ":PART_OF", weight: 0.95 },

  // Cross-Pillar Synergistic Bridges (Sinergi Lintas Layanan)
  { sourceId: "proposal-kemitraan", targetId: "seo-strategy", relationType: ":RELATED_TO", weight: 0.72 },
  { sourceId: "sop-administrasi", targetId: "publikasi-sinta", relationType: ":RELATED_TO", weight: 0.70 },
  { sourceId: "technical-seo", targetId: "web-engineering", relationType: ":RELATED_TO", weight: 0.80 }
];

/** Ambil entitas terhubung berdasarkan bobot relasi graf */
export function getConnectedEntities(nodeId: string, minWeight = 0.70): Array<{ entity: EntityNode; relation: string; weight: number }> {
  const edges = ENTITY_EDGES.filter(
    (e) => (e.sourceId === nodeId || e.targetId === nodeId) && e.weight >= minWeight
  );

  return edges.map((e) => {
    const targetId = e.sourceId === nodeId ? e.targetId : e.sourceId;
    return {
      entity: ENTITY_NODES[targetId],
      relation: e.relationType,
      weight: e.weight
    };
  }).filter((item) => item.entity !== undefined);
}

/** Ambil seluruh entitas dalam pilar tertentu */
export function getEntitiesByPillar(pillar: PillarId): EntityNode[] {
  return Object.values(ENTITY_NODES).filter((node) => node.pillar === pillar);
}
