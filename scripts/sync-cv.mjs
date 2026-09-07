import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const careerEngineDir = path.resolve(rootDir, '../../05_CAREER_ATS_ENGINE');

const masterPdfPath = path.join(careerEngineDir, 'rendercv_output', 'Muhammad_Khoiruzzadittaqwa_CV.pdf');
const publicPdfPath = path.join(rootDir, 'public', 'cv.pdf');

console.log('[sync-cv] Syncing RenderCV PDF...');
if (fs.existsSync(masterPdfPath)) {
  fs.copyFileSync(masterPdfPath, publicPdfPath);
  console.log('[sync-cv] Copied master PDF to public/cv.pdf');
} else {
  console.warn('[sync-cv] Master PDF not found at', masterPdfPath);
}
