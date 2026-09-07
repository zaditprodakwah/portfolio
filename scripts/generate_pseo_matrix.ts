// scripts/generate_pseo_matrix.ts
// Programmatic SEO Matrix Generator & Zod Validation Engine

import fs from "fs";
import path from "path";
import { PSEOMatrixSchema } from "./schema/direktori";

const rootDir = path.resolve(__dirname, "..");
const matrixPath = path.join(rootDir, "content/direktori-matrix.json");

export function validateAndSyncMatrix() {
  console.log("=== [pSEO Matrix Engine] Memvalidasi Integritas Data direktori-matrix.json ===");

  if (!fs.existsSync(matrixPath)) {
    throw new Error(`File matriks tidak ditemukan di ${matrixPath}`);
  }

  const raw = fs.readFileSync(matrixPath, "utf8");
  const parsed = JSON.parse(raw);

  // Validasi dengan Zod Schema Ketat
  const result = PSEOMatrixSchema.safeParse(parsed);

  if (!result.success) {
    console.error("❌ [ZOD VALIDATION FAILED] Terdeteksi kesalahan skema:", result.error.format());
    process.exit(1);
  }

  console.log(`✅ [ZOD VALIDATION PASSED] Berhasil memvalidasi ${result.data.length} klaster direktori.`);

  // Audit Anti-Duplikasi Slug
  const slugSet = new Set<string>();
  for (const item of result.data) {
    const key = `${item.category}/${item.slug}`;
    if (slugSet.has(key)) {
      console.error(`❌ [DUPLICATE DETECTED] Duplikasi rute terdeteksi: ${key}`);
      process.exit(1);
    }
    slugSet.add(key);
  }

  console.log("✅ [SLUG INTEGRITY] 100% rute unik tanpa tabrakan.");
}

if (process.argv[1]?.endsWith("generate_pseo_matrix.ts")) {
  validateAndSyncMatrix();
}
