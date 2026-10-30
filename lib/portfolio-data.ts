// apps/zadit-pages/lib/portfolio-data.ts
// Single Source of Truth (SSOT) untuk Portofolio dan Bukti Empiris Terverifikasi
// Disinkronkan dengan 04_KNOWLEDGE_VAULT dan apps/zadevpenseo.github.io

export type PortfolioCategory = "all" | "metascience" | "business" | "web-systems";

export interface PortfolioEvidenceItem {
  id: string;
  title: string;
  domain: string;
  category: "metascience" | "business" | "web-systems";
  summary: string;
  tag: string;
  artifactType: string;
  artifactUrl: string;
  highlights: string[];
}

export const PORTFOLIO_EVIDENCE: PortfolioEvidenceItem[] = [
  {
    id: "tiket-4c-diamond",
    title: "The Fundamentals of Marketing: 4C Diamond & 4P Analysis",
    domain: "Tiket.com Hotel Booking Ecosystem",
    category: "business",
    summary: "Dossier studi kasus pemesanan hotel Tiket.com menggunakan kerangka 4C Diamond (Company, Customer, Competitor, Change) dan pemetaan strategi pemasaran 4P.",
    tag: "Strategi Bisnis",
    artifactType: "Dossier PDF",
    artifactUrl: "https://drive.google.com/file/d/1Re-usXcuKQsjQWoO69wVCjzhsHxwns8K/view?usp=drive_web",
    highlights: ["Analisis 4C Diamond", "Bauran Pemasaran 4P", "Pemetaan Pasar Hotel"],
  },
  {
    id: "systems-vault",
    title: "Systems Architecture, Blueprints & Live Demos Vault",
    domain: "PT PRISMA DIGITAL KREATIF",
    category: "web-systems",
    summary: "Vault dokumentasi arsitektur sistem independen berbasis Astro Starlight, Pagefind WASM search, dan prototipe langsung untuk de-risking operasional.",
    tag: "Arsitektur Sistem",
    artifactType: "Live System",
    artifactUrl: "https://zadevpenseo.github.io",
    highlights: ["Astro v5 + Starlight", "Pagefind WASM 1.5", "High-Level Design Blueprints"],
  },
  {
    id: "metascience-benchmarks",
    title: "Scholarly Metascience & Psychometric Benchmark Suite",
    domain: "Kaggle Open Dataset & Notebooks",
    category: "metascience",
    summary: "Suite komputasi psikometri terbuka: kalkulasi Aiken V, simulasi bootstrap 10.000 iterasi, dan benchmark integritas naskah ilmiah bebas fabrikasi.",
    tag: "Komputasi Riset",
    artifactType: "Kaggle Dataset",
    artifactUrl: "https://www.kaggle.com/datasets/muhzadit/scholarly-metascience-benchmarks",
    highlights: ["Kalkulasi Aiken V", "Bootstrap 10.000 Iterasi", "Integritas Data Kesarjanaan"],
  },
  {
    id: "tiket-aarrr-funnel",
    title: "Digital Marketing Framework: 4C & AARRR Funnel Architecture",
    domain: "Tiket.com Growth Engine",
    category: "business",
    summary: "Penerapan strategi akuisisi, aktivasi, retensi, pendapatan, dan rujukan (AARRR Funnel) serta kampanye loyalitas Blibli-Tiket Rewards multikanal.",
    tag: "Growth Marketing",
    artifactType: "Arsitektur Funnel",
    artifactUrl: "https://drive.google.com/file/d/17dgJc-vTCJUbSLGmuGBv3_v8Z6V94N7r/view?usp=drive_web",
    highlights: ["Funnel AARRR", "Alokasi Anggaran Multikanal", "Program Loyalitas"],
  },
  {
    id: "ilmify-platform",
    title: "Ilmify.id: Platform Penjernih Riset & Kalkulator Metodologi",
    domain: "ilmify.id / Edutech Riset",
    category: "metascience",
    summary: "Platform web interaktif yang menyediakan kalkulator validitas instrumen Aiken V, evaluasi MMAT 2018, dan kanvas penjernih masalah skripsi/tesis.",
    tag: "Edukasi Riset",
    artifactType: "Platform Web",
    artifactUrl: "https://ilmify.id",
    highlights: ["Kalkulator Aiken V", "Audit MMAT 2018", "Kanvas Penjernih Masalah"],
  },
  {
    id: "institutional-governance",
    title: "Standardisasi Prosedur Operasional & Studi Kelayakan Bisnis",
    domain: "Tata Kelola Institusional",
    category: "business",
    summary: "Penyusunan dokumen prosedur operasional standar (SOP) dan proyeksi ekonomi unit bisnis yang terstruktur, akuntabel, dan siap dipertanggungjawabkan di hadapan komite audit.",
    tag: "Tata Kelola",
    artifactType: "Dokumen Tata Kelola",
    artifactUrl: "/solusi",
    highlights: ["SOP Terstruktur", "Studi Kelayakan Ekonomi", "Akuntabilitas Audit"],
  },
];
