// apps/zadit-pages/lib/credentials-data.ts
// Single Source of Truth (SSOT) untuk Kredensial, Sertifikasi, dan Legalitas Resmi
// Disinkronkan dengan 04_KNOWLEDGE_VAULT/CANONICAL_IDENTITY_SNAPSHOT.json

export interface CredentialItem {
  id: string;
  title: string;
  issuer: string;
  category: "engineering" | "marketing" | "management" | "legal";
  badge: string;
  duration?: string;
  credentialId?: string;
  verificationUrl?: string;
  description: string;
  highlight?: boolean;
}

export const CREDENTIALS_REGISTRY: CredentialItem[] = [
  {
    id: "fcc-backend",
    title: "Back-End Development and APIs V8 Developer Certification",
    issuer: "freeCodeCamp.org",
    category: "engineering",
    badge: "Developer Certification",
    duration: "~300 Jam Kurikulum",
    verificationUrl: "https://freecodecamp.org/certification/muhzadit/back-end-development-and-apis",
    description: "Sertifikasi pengembang backend resmi ~300 jam dalam perancangan microservices, REST APIs, arsitektur basis data, dan otomasi serverless.",
    highlight: true,
  },
  {
    id: "pse-kominfo",
    title: "Tanda Daftar Penyelenggara Sistem Elektronik (TDPSE)",
    issuer: "Kementerian Komunikasi dan Digital (Kominfo RI)",
    category: "legal",
    badge: "Registrasi Legalitas Negara",
    credentialId: "017014.01/DJAI.PSE/01/2025",
    description: "Legalitas resmi penyelenggaraan sistem elektronik nasional di bawah entitas PT PRISMA DIGITAL KREATIF (NIB: 1801250039976).",
    highlight: true,
  },
  {
    id: "orcid-global",
    title: "ORCID Global Researcher Identifier",
    issuer: "ORCID International Registry",
    category: "legal",
    badge: "Pengenal Kesarjanaan Global",
    credentialId: "0000-0002-1594-9548",
    verificationUrl: "https://orcid.org/0000-0002-1594-9548",
    description: "Nomor pengenal peneliti kanonikal internasional untuk atribusi kesarjanaan, audit sitasi, dan keterlacakan luaran ilmiah.",
    highlight: true,
  },
  {
    id: "emi-content-marketing",
    title: "Content Marketing Certification",
    issuer: "eMarketing Institute (Denmark)",
    category: "marketing",
    badge: "Sertifikasi Internasional",
    credentialId: "CERT002199550-EMI",
    verificationUrl: "https://drive.google.com/drive/folders/1DJQEPKeX7GfY8DwWg17a-lxntCPzMGTp",
    description: "Kompetensi terverifikasi dalam arsitektur konten strategis, pemetaan persona audiens, optimasi distribusi multikanal, dan analitik konversi.",
  },
  {
    id: "emi-blogging",
    title: "Blogging & Digital Publishing Certification",
    issuer: "eMarketing Institute (Denmark)",
    category: "marketing",
    badge: "Editorial Governance",
    credentialId: "CERT002198818-EMI",
    verificationUrl: "https://drive.google.com/drive/folders/1DJQEPKeX7GfY8DwWg17a-lxntCPzMGTp",
    description: "Perancangan kalender editorial, struktur artikel analitis panjang, integrasi on-page SEO, dan retensi keterbacaan publik.",
  },
  {
    id: "pca-project-management",
    title: "Project Management Certified",
    issuer: "Professional Certification Academy",
    category: "management",
    badge: "Agile & Governance",
    verificationUrl: "https://drive.google.com/drive/folders/1DJQEPKeX7GfY8DwWg17a-lxntCPzMGTp",
    description: "Manajemen proyek Agile/Scrum dan Waterfall, tata kelola milestone, matriks mitigasi risiko, dan tata kelola ruang lingkup institusi.",
  },
  {
    id: "fullstack-digmar-360",
    title: "Certified Fullstack Digital Marketing & Branding 360",
    issuer: "Digital Marketing Mentoring (Batch 27)",
    category: "marketing",
    badge: "Distinction Honors (85/100)",
    verificationUrl: "https://drive.google.com/drive/folders/1DJQEPKeX7GfY8DwWg17a-lxntCPzMGTp",
    description: "Kelulusan predikat Distinction dalam perancangan kampanye komersial skala penuh, pemodelan anggaran media, dan analitik CAC/ROAS.",
  },
  {
    id: "privy-signature",
    title: "Privy Certified E-Signature & Identity",
    issuer: "PrivyID (PSrE Berinduk Kominfo)",
    category: "legal",
    badge: "Identitas Digital Hukum",
    description: "Tanda tangan digital tersertifikasi yang memenuhi kekuatan pembuktian hukum transaksi elektronik untuk pengesahan kontrak dan dokumen.",
  },
];
