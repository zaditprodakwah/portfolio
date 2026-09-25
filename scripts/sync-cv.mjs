import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const careerEngineDir = path.resolve(rootDir, '../../05_CAREER_ATS_ENGINE');

const masterPdfPath = path.join(careerEngineDir, 'rendercv_output', 'Muhammad_Khoiruzzadittaqwa_CV.pdf');
const masterPdfIdPath = path.join(careerEngineDir, 'rendercv_output', 'Muhammad_Khoiruzzadittaqwa_CV_ID.pdf');
const publicPdfPath = path.join(rootDir, 'public', 'cv.pdf');
const publicPdfIdPath = path.join(rootDir, 'public', 'cv-id.pdf');

console.log('[sync-cv] Syncing RenderCV PDF...');
if (fs.existsSync(masterPdfPath)) {
  fs.copyFileSync(masterPdfPath, publicPdfPath);
  console.log('[sync-cv] Copied master English PDF to public/cv.pdf');
} else {
  console.warn('[sync-cv] Master English PDF not found at', masterPdfPath);
}

if (fs.existsSync(masterPdfIdPath)) {
  fs.copyFileSync(masterPdfIdPath, publicPdfIdPath);
  console.log('[sync-cv] Copied master Indonesian PDF to public/cv-id.pdf');
} else {
  console.warn('[sync-cv] Master Indonesian PDF not found at', masterPdfIdPath);
}

const masterPhotoPath = path.join(careerEngineDir, "muh-zadit-photo.jpg");
const publicPhotoPath = path.join(rootDir, "public", "foto-zadit.jpg");

console.log("[sync-cv] Syncing Profile Photo...");
if (fs.existsSync(masterPhotoPath)) {
  fs.copyFileSync(masterPhotoPath, publicPhotoPath);
  console.log("[sync-cv] Copied master photo to public/foto-zadit.jpg");
} else {
  console.warn("[sync-cv] Master photo not found at", masterPhotoPath);
}

import { execSync } from "node:child_process";
const ogScript = path.join(rootDir, "scripts", "generate-og-image.py");
if (fs.existsSync(ogScript)) {
  console.log("[sync-cv] Generating static OpenGraph social card...");
  try {
    execSync(`python3 "${ogScript}"`, { stdio: "inherit" });
  } catch (e) {
    console.warn("[sync-cv] Failed to run generate-og-image.py", e.message);
  }
}
