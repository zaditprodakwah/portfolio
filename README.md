# zadit-pages — Next.js 15 Executive Showcase & Career OS

Portofolio web modern, pSEO Programmatic Solutions, dan antarmuka interaktif **Muhammad Khoiruzzadittaqwa (Zadit)**, di-hosting di **Cloudflare Pages (`https://muhzadit.pages.dev`)**.

---

## 4 Pilar Layanan Strategis

1. **Dokumen, Tata Kelola & Administrasi Bisnis** (`/layanan/dokumen-administrasi-bisnis`): Penyusunan SOP operasional berstandar ISO, studi kelayakan (feasibility study), proposal kemitraan investor rantai pasok, dan pemodelan finansial 5 tahun.
2. **SEO Teknis & Pertumbuhan Konten Konversi** (`/layanan/seo-konten-konversi`): Arsitektur topical authority, optimasi Core Web Vitals (INP < 200ms, LCP < 2.5s), GEO/AEO answer engine citation, dan strategi programmatic SEO skala besar.
3. **Analisis Statistik & Olah Data Penelitian** (`/layanan/olah-data-statistik-sinta`): Olah data SPSS, SEM-PLS (SmartPLS), instrumen penelitian, uji reliabilitas Cronbach's Alpha, dan pendampingan naskah jurnal bereputasi SINTA & Scopus.
4. **Solusi Web & Performa Digital** (`/layanan/solusi-web-performa`): Web app performa tinggi Next.js 15, edge rendering di Cloudflare Pages, interaktivitas mobile-first, dan integrasi API tanpa latensi server.

---

## Fitur Arsitektur & Teknologi

1. **pSEO Programmatic Solution Engine (`/solusi/[slug]`)**:
   - 3-Way Comparative Decision Matrix (Zadit vs Agensi Konvensional vs Freelancer Lepas).
   - Triad Framework (Metodologi, Eksekusi, Serah Terima).
   - Direct Answer Box (BLUF untuk AI Overviews & Perplexity citation).
2. **Wikidata Entity Graph & Semantic SEO (`lib/entity-graph.ts` & `/wawasan`)**:
   - Pemetaan taksonomi 2 tingkat (Macro & Micro entities) terhubung ke QID Wikidata resmi.
   - Schema.org `@graph` JSON-LD lengkap dengan `knowsAbout`, `hasOfferCatalog`, dan `Organization`.
3. **Mobile-First High-Converting UX**:
   - *Personal Greeting Capsule*: Foto profil, status ketersediaan aktif (*Tersedia untuk konsultasi & proyek strategis*).
   - *Audience Qualifier*: Pemilih peran 4 profil audiens dengan navigasi instan.
   - *Reading Progress Bar*: Indikator scroll persentase halus.
   - *Mobile Action Dock*: Tombol aksi melayang di mobile dengan pesan WhatsApp dinamis terenkripsi.
4. **Keamanan Kontak (Protected Contact)**:
   - Proteksi email dan nomor WhatsApp menggunakan Base64 encoding client-side decoding guna mencegah bot scraping.
5. **Machine Discovery Surfaces**:
   - Human CV: `/cv` & `/cv.pdf`
   - AI Crawlers: `/llms.txt`
   - Machine Data: `/cv.json`
   - Dynamic Sitemap: `/sitemap.xml`
   - Search Engine Directives: `/robots.txt`
6. **Cloudflare Edge Fleet & D1 Database**:
   - Static export 0ms TTFB di Cloudflare Edge.
   - Schema Cloudflare D1 Serverless SQL (`schema.sql`) untuk pencatatan telemetri intent dan inquiry leads.

---

## Perintah Pengembangan

```bash
# 1. Jalankan development server lokal
npm run dev

# 2. Sinkronkan PDF terbaru dari CV engine
npm run sync:cv

# 3. Build static export (menghasilkan folder out/)
npm run build

# 4. Deploy langsung ke Cloudflare Pages
npm run deploy
```
