// lib/canonical-registry.ts
// Single Source of Truth (SSOT) for Site-Wide Canonicalization & Trailing-Slash Standards

export const BASE_URL = "https://muhzadit.pages.dev";

/**
 * Ensures any pathname is formatted into a clean, canonical URL with a strict trailing slash.
 * Matches next.config.mjs 'trailingSlash: true\.
 * Eliminates all HTTP 308 Permanent Redirect hops for search crawlers.
 */
export function getCanonicalUrl(path: string = "/"): string {
  let pathname = path;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    try {
      const url = new URL(path);
      pathname = url.pathname;
    } catch {
      // fallback
    }
  }

  if (!pathname.startsWith("/")) {
    pathname = `/${pathname}`;
  }

  // Ensure trailing slash unless it has a file extension (.xml, .txt, .json, .ico, .jpg, .png)
  const isFile = /\.[a-zA-Z0-9]+$/.test(pathname);
  if (!isFile && !pathname.endsWith("/")) {
    pathname = `${pathname}/`;
  }

  return `${BASE_URL}${pathname}`;
}

export interface IntentMapping {
  canonicalPath: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  pillar: "bisnis" | "seo" | "sinta" | "web" | "general";
  category: "core" | "layanan" | "solusi" | "wawasan" | "direktori";
}

export const SITE_CANONICAL_REGISTRY: Record<string, IntentMapping> = {
  "/": {
    canonicalPath: "/",
    primaryKeyword: "konsultan teknologi bisnis eksekutif",
    secondaryKeywords: ["rekayasa web performa", "pendampingan sinta", "dokumen tata kelola bisnis"],
    pillar: "general",
    category: "core",
  },
  "/audit/": {
    canonicalPath: "/audit/",
    primaryKeyword: "audit instan performa web bisnis",
    secondaryKeywords: ["cek core web vitals", "analisis lcp inp", "evaluasi website eksekutif"],
    pillar: "web",
    category: "core",
  },
  "/cv/": {
    canonicalPath: "/cv/",
    primaryKeyword: "muhammad khoiruzzadittaqwa resume eksekutif",
    secondaryKeywords: ["portfolio full-stack engineer", "pengembang sistem edge"],
    pillar: "general",
    category: "core",
  },
  "/layanan/": {
    canonicalPath: "/layanan/",
    primaryKeyword: "katalog layanan rekayasa modular eksekutif",
    secondaryKeywords: ["layanan dokumen bisnis", "layanan olah data sinta", "jasa seo konversi", "solusi edge web"],
    pillar: "general",
    category: "layanan",
  },
  "/layanan/dokumen-administrasi-bisnis/": {
    canonicalPath: "/layanan/dokumen-administrasi-bisnis/",
    primaryKeyword: "jasa penyusunan dokumen administrasi sop bisnis",
    secondaryKeywords: ["tata kelola yayasan", "proposal bisnis investor", "penyusunan sop perusahaan"],
    pillar: "bisnis",
    category: "layanan",
  },
  "/layanan/seo-konten-konversi/": {
    canonicalPath: "/layanan/seo-konten-konversi/",
    primaryKeyword: "layanan seo teknis dan konten berorientasi konversi",
    secondaryKeywords: ["seo arsitektur entitas", "optimasi aeo google overviews", "strategi pseo b2b"],
    pillar: "seo",
    category: "layanan",
  },
  "/layanan/olah-data-statistik-sinta/": {
    canonicalPath: "/layanan/olah-data-statistik-sinta/",
    primaryKeyword: "pendampingan olah data statistik publikasi sinta scopus",
    secondaryKeywords: ["jasa spss sem pls tesis", "bimbingan metodologi kuantitatif", "revisi peer review jurnal"],
    pillar: "sinta",
    category: "layanan",
  },
  "/layanan/solusi-web-performa/": {
    canonicalPath: "/layanan/solusi-web-performa/",
    primaryKeyword: "arsitektur web performa tinggi cloudflare edge",
    secondaryKeywords: ["optimasi core web vitals lcp", "web serverless zero cost", "migrasi vps ke edge"],
    pillar: "web",
    category: "layanan",
  },
  "/solusi/": {
    canonicalPath: "/solusi/",
    primaryKeyword: "studi kasus solusi rekayasa teknologi dan bisnis",
    secondaryKeywords: ["solusi masalah operasional", "triad framework studi kasus"],
    pillar: "general",
    category: "solusi",
  },
  "/wawasan/": {
    canonicalPath: "/wawasan/",
    primaryKeyword: "analisis kritis industri dan wawasan teknologi bisnis",
    secondaryKeywords: ["teardown model agensi", "glosarium graf entitas", "standar etika rekayasa"],
    pillar: "general",
    category: "wawasan",
  },
  "/direktori/": {
    canonicalPath: "/direktori/",
    primaryKeyword: "direktori layanan rekayasa wilayah dan industri",
    secondaryKeywords: ["pseo jasa per kota", "layanan rekayasa per sektor", "indeks solusi lokal"],
    pillar: "general",
    category: "direktori",
  },
  "/intel/": {
    canonicalPath: "/intel/",
    primaryKeyword: "intelijen data telemetri bisnis dan sentinel pasar",
    secondaryKeywords: ["alternative data daas indonesia", "deteksi anomali spc h3", "delta katalog e-commerce", "monitoring tender lpse"],
    pillar: "bisnis",
    category: "solusi",
  },
  "/intelligence/": {
    canonicalPath: "/intel/",
    primaryKeyword: "intelijen data telemetri bisnis dan sentinel pasar",
    secondaryKeywords: ["alternative data daas indonesia", "deteksi anomali spc h3", "delta katalog e-commerce", "monitoring tender lpse"],
    pillar: "bisnis",
    category: "solusi",
  },
};
