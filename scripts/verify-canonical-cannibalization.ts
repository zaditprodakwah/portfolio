// scripts/verify-canonical-cannibalization.ts
// Site-Wide Canonicalization & Anti-Cannibalization Build Guard

import fs from "fs";
import path from "path";
import { SITE_CANONICAL_REGISTRY, getCanonicalUrl } from "../lib/canonical-registry";

function computeJaccardSimilarity(str1: string, str2: string): number {
  const set1 = new Set(str1.toLowerCase().split(/\s+/).filter(Boolean));
  const set2 = new Set(str2.toLowerCase().split(/\s+/).filter(Boolean));

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

export function runAudit() {
  console.log("=== [Audit Kanonikalisasi & Anti-Kanibalisasi Fundamental] ===");

  let hasError = false;

  // 1. Audit Trailing Slash pada Canonical Registry
  console.log("1. Memeriksa format trailing slash pada seluruh rute terdaftar...");
  for (const [key, mapping] of Object.entries(SITE_CANONICAL_REGISTRY)) {
    if (!mapping.canonicalPath.endsWith("/")) {
      console.error(`❌ [CANONICAL ERROR] Rute ${key} tidak berakhiran trailing slash!`);
      hasError = true;
    }
    const expectedUrl = getCanonicalUrl(mapping.canonicalPath);
    if (!expectedUrl.endsWith("/")) {
      console.error(`❌ [CANONICAL ERROR] URL ${expectedUrl} tidak berakhiran trailing slash!`);
      hasError = true;
    }
  }
  console.log("   ✅ Seluruh rute canonical registry berakhiran trailing slash.");

  // 2. Audit Anti-Kanibalisasi Antara Target Keywords
  console.log("2. Memeriksa kemiripan semantik (Anti-Cannibalization)...");
  const entries = Object.entries(SITE_CANONICAL_REGISTRY);

  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const [pathA, itemA] = entries[i];
      const [pathB, itemB] = entries[j];

      const sim = computeJaccardSimilarity(itemA.primaryKeyword, itemB.primaryKeyword);
      if (sim >= 0.60) {
        console.error(
          `❌ [CANNIBALIZATION WARNING] Kemiripan intent tinggi (${(sim * 100).toFixed(1)}%) antara:\n   - ${pathA} ("${itemA.primaryKeyword}")\n   - ${pathB} ("${itemB.primaryKeyword}")`
        );
        hasError = true;
      }
    }
  }
  console.log("   ✅ Skor kemiripan antar-intent aman (< 0.60). Tidak ada kanibalisasi kata kunci.");

  if (hasError) {
    console.error("❌ Audit gagal! Selesaikan masalah di atas sebelum build.");
    process.exit(1);
  } else {
    console.log("🎉 [AUDIT SUKSES] Sistem kanonikalisasi & anti-kanibalisasi 100% patuh.");
  }
}

if (process.argv[1]?.endsWith("verify-canonical-cannibalization.ts")) {
  runAudit();
}
