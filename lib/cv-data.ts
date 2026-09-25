// lib/cv-data.ts
// Single Source of Truth (SSOT) untuk Portofolio Eksekutif & OS Pertumbuhan Klien

export type Language = 'id' | 'en';

export interface Metric {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  badge: { id: string; en: string };
  title: { id: string; en: string };
  category: { id: string; en: string };
  role: { id: string; en: string };
  clientType: { id: string; en: string };
  description: { id: string; en: string };
  metrics: { id: Metric[]; en: Metric[] };
  highlights: { id: string[]; en: string[] };
}

export interface ServicePillar {
  id: string;
  title: { id: string; en: string };
  shortDesc: { id: string; en: string };
  deliverables: { id: string[]; en: string[] };
  audience: { id: string; en: string };
}

export interface ServicePackage {
  id: string;
  name: { id: string; en: string };
  tagline: { id: string; en: string };
  duration: { id: string; en: string };
  bestFor: { id: string; en: string };
  features: { id: string[]; en: string[] };
}

export interface ToolCategory {
  category: { id: string; en: string };
  description: { id: string; en: string };
  tools: string[];
}

export const cvProfile = {
  name: "Muhammad Khoiruzzadittaqwa",
  shortName: "muhzadit",
  nickname: "Zadit",
  aliases: ["Zadit", "Muh Zadit", "Aditt", "muhzadit", "Zadit Dev"],
  titles: {
    id: "Konsultan Pertumbuhan, Dokumen Bisnis & Riset Terpadu",
    en: "Full-Stack Web Dev, Docs/Slide Design, & Data Solutions Specialist"
  },
  taglines: {
    id: "Dari Kata ke Konversi. Dari Data ke Keputusan Nyata.",
    en: "From Words to Conversion. From Data to Confident Decisions."
  },
  summaries: {
    id: "Praktisi profesional dengan pengalaman lebih dari 10 tahun (sejak 2015) dalam merancang strategi pertumbuhan digital, penyusunan dokumen bisnis eksekutif, pengolahan data statistik, serta pendampingan publikasi ilmiah. Memadukan ketelitian analitik matematika dengan eksekusi pemasaran berorientasi konversi dan solusi teknologi yang ramah bagi audiens non-teknis.",
    en: "Professional practitioner with over 10 years of experience (since 2015) crafting digital growth strategies, executive business proposals, statistical data analysis, and academic research consulting. Combines mathematical analytical rigor with high-conversion marketing and practical, tech-agnostic digital solutions for non-technical stakeholders."
  },
  contact: {
    email: "muhzadit@gmail.com",
    phone: "+62 823-1636-3177",
    whatsappUrl: "https://wa.me/6282316363177",
    location: "Cirebon & Jakarta, Indonesia",
    sribuProfile: "https://www.sribu.com/id/users/muhzadit",
    projectsCoId: "https://projects.co.id/public/browse_users/view/a29c17/muhzadit",
    linkedin: "https://linkedin.com/in/muhzadit",
    github: "https://github.com/zaditprodakwah",
    kontakLink: "https://kontak.link/muhzadit",
    portfolioWeb: "https://muhzadit.pages.dev"
  },
  stats: {
    id: [
      { label: "Tahun Pengalaman", value: "10+" },
      { label: "Rating Kepuasan Klien", value: "5.0 / 5.0" },
      { label: "Ketepatan Waktu Kerja", value: "100%" },
      { label: "Pilar Solusi Terpadu", value: "4 Bidang" }
    ],
    en: [
      { label: "Years Active", value: "10+" },
      { label: "Client Satisfaction", value: "5.0 / 5.0" },
      { label: "On-Time Completion", value: "100%" },
      { label: "Core Solution Pillars", value: "4 Areas" }
    ]
  },
  caseStudies: [
    {
      id: "b2b-leads-seo",
      badge: { id: "Pertumbuhan Organik & Konversi", en: "Organic Growth & Conversions" },
      title: {
        id: "Peningkatan Calon Pelanggan B2B Melalui Pencarian Berniat Tinggi",
        en: "B2B Qualified Lead Generation via High-Intent Search Strategy"
      },
      category: { id: "Pemasaran & SEO", en: "Marketing & SEO" },
      role: { id: "Spesialis Strategi SEO & Konten", en: "SEO & Content Strategist" },
      clientType: { id: "Layanan Bisnis & Korporat", en: "B2B Services & Enterprise" },
      description: {
        id: "Klien mengalami stagnasi leads meskipun memiliki situs web aktif. Dilakukan audit pencarian kata kunci berniat komersial tinggi, pembenahan struktur halaman informasi, penambahan FAQ terstruktur, serta optimasi konten edukatif yang langsung mengarahkan pembaca ke formulir kontak.",
        en: "The client faced stagnant inbound leads despite having an active website. We conducted a commercial-intent keyword audit, reorganized core landing pages, embedded structured FAQs, and published high-trust educational articles that direct prospects straight to consultation."
      },
      metrics: {
        id: [
          { label: "Peningkatan Peringkat", value: "Top 3 Google" },
          { label: "Pertumbuhan Calon Klien", value: "+140% Leads" },
          { label: "Rasio Klik Organik (CTR)", value: "16.8%" },
          { label: "Tingkat Retensi Audiens", value: "2.4x Lebih Lama" }
        ],
        en: [
          { label: "SERP Rank Jump", value: "Top 3 Google" },
          { label: "Qualified Leads Growth", value: "+140% Leads" },
          { label: "Organic Click Rate", value: "16.8% CTR" },
          { label: "Average Session Time", value: "2.4x Longer" }
        ]
      },
      highlights: {
        id: [
          "Riset kata kunci difokuskan pada problem nyata calon pembeli, bukan sekadar volume pencarian acak.",
          "Struktur tulisan disusun dengan bahasa persuasif tanpa istilah teknis yang membingungkan.",
          "Alur navigasi disederhanakan sehingga pengunjung dapat menghubungi tim penjualan dalam 1 klik."
        ],
        en: [
          "Focused strictly on high-intent buyer keywords rather than vanity search volume.",
          "Clear, persuasive copywriting free from confusing technical buzzwords.",
          "Streamlined navigation allowing visitors to contact sales within one click."
        ]
      }
    },
    {
      id: "agribusiness-pitch-deck",
      badge: { id: "Dokumen Bisnis & Investasi", en: "Business Decks & Capital" },
      title: {
        id: "Penyusunan Proposal Usaha & Pitch Deck Kemitraan Agribisnis",
        en: "Business Proposal & Investor Pitch Deck for Commercial Agribusiness"
      },
      category: { id: "Dokumen Bisnis", en: "Business Documents" },
      role: { id: "Penyusun Dokumen & Analis Bisnis", en: "Lead Business Proposal Architect" },
      clientType: { id: "Pelaku Usaha Agribisnis & Investor", en: "Agribusiness Venture & Investors" },
      description: {
        id: "Menyusun draf proposal kemitraan bisnis perkebunan terintegrasi dari awal. Mencakup analisis kelayakan usaha, proyeksi arus kas operasional, pemetaan rantai pasok (supply chain), dan slide presentasi eksekutif siap pakai untuk pertemuan direksi.",
        en: "Crafted a comprehensive partnership proposal and executive pitch deck from the ground up. Encompassed feasibility modeling, operational cash flow projections, supply chain mapping, and board-ready presentation slides for prospective funding partners."
      },
      metrics: {
        id: [
          { label: "Kelengkapan Dokumen", value: "100% Siap Rapat" },
          { label: "Waktu Penyusunan", value: "14 Hari Kerja" },
          { label: "Kejelasan Finansial", value: "Proyeksi 5 Tahun" },
          { label: "Kepuasan Klien", value: "Rating 5.0 Bintang" }
        ],
        en: [
          { label: "Document Readiness", value: "Board-Ready" },
          { label: "Turnaround Time", value: "14 Work Days" },
          { label: "Financial Horizon", value: "5-Year Cash Flow" },
          { label: "Client Review", value: "5.0 Stars" }
        ]
      },
      highlights: {
        id: [
          "Penyajian data numerik dan grafik cash flow yang transparan dan mudah dipahami pihak investor.",
          "Visualisasi alur logistik dan rantai nilai kebun hingga distribusi akhir.",
          "Tata bahasa formal dan persuasif yang memperkuat kredibilitas pimpinan usaha."
        ],
        en: [
          "Clear numeric tables and cash-flow charts easily digestible by non-finance investors.",
          "Detailed supply-chain diagram mapping farm logistics to distribution channels.",
          "Formal, polished business prose reinforcing company executive credibility."
        ]
      }
    },
    {
      id: "academic-sinta-publishing",
      badge: { id: "Riset Akademik & Data", en: "Academic Research & Data" },
      title: {
        id: "Pengolahan Data Kuantitatif & Pendampingan Publikasi Jurnal SINTA",
        en: "Quantitative Data Processing & SINTA Accredited Journal Publication"
      },
      category: { id: "Riset Akademik", en: "Academic Research" },
      role: { id: "Konsultan Data & Publikasi Ilmiah", en: "Research & Statistical Consultant" },
      clientType: { id: "Dosen, Peneliti & Mahasiswa Pascasarjana", en: "Faculty, Researchers & Graduate Scholars" },
      description: {
        id: "Membantu peneliti dalam uji validitas, reliabilitas instrumen, analisis regresi, serta interpretasi output statistik. Naskah disesuaikan secara teliti dengan pedoman selingkung dan standar etika ilmiah hingga lolos telaah rekan sejawat (peer-review).",
        en: "Assisted research scholars with statistical instrument validity, reliability testing, regression analysis, and empirical output interpretation. Guided the scientific manuscript to strictly meet target journal guidelines and peer-review requirements."
      },
      metrics: {
        id: [
          { label: "Status Akreditasi", value: "SINTA 2 - SINTA 4" },
          { label: "Uji Statistik", value: "SPSS & Python" },
          { label: "Tingkat Penerimaan", value: "Diterima Terbit" },
          { label: "Kepatuhan Selingkung", value: "100% Sesuai Template" }
        ],
        en: [
          { label: "Target Accreditation", value: "SINTA 2 - SINTA 4" },
          { label: "Statistical Tools", value: "SPSS & Python" },
          { label: "Publication Outcome", value: "Accepted" },
          { label: "Author Guidelines", value: "100% Compliant" }
        ]
      },
      highlights: {
        id: [
          "Interpretasi data statistik disajikan dalam bahasa penjelasan yang sistematis dan mudah dipertahankan pada sidang riset.",
          "Pemeriksaan kemiripan naskah dan perapian sitasi sesuai gaya referensi internasional (APA/IEEE).",
          "Pendampingan perbaikan draf sesuai catatan masukan dari reviewer jurnal."
        ],
        en: [
          "Statistical interpretations written in clear scholarly language ready for academic defense.",
          "Strict citation audit and reference formatting adhering to APA/IEEE standards.",
          "Step-by-step revision guidance addressing journal reviewer editorial comments."
        ]
      }
    },
    {
      id: "web-performance-upgrade",
      badge: { id: "Solusi Web Cepat & Aksesibel", en: "Fast & Accessible Web" },
      title: {
        id: "Optimasi Kecepatan Situs Web & Aksesibilitas Berorientasi Solusi Klien",
        en: "Client-Centric Web Speed & Usability Modernization"
      },
      category: { id: "Solusi Digital", en: "Digital Solutions" },
      role: { id: "Arsitek Web & Kinerja Sistem", en: "Web Architecture Specialist" },
      clientType: { id: "Yayasan Publik & Portal Usaha", en: "Public Institutions & Business Sites" },
      description: {
        id: "Memperbaiki website yang lambat diakses di jaringan seluler ponsel pengguna. Tanpa mewajibkan klien mengganti seluruh sistem, kami memadukan optimasi aset gambar, penataan caching, pembersihan kode berat, serta perbaikan navigasi ramah pembaca lansia dan pengguna umum.",
        en: "Resolved severe page load lag across mobile networks for high-traffic visitors. Without forcing the client to discard their existing platform, we implemented smart asset caching, image compression, streamlined scripts, and verified high-contrast accessibility for everyday visitors."
      },
      metrics: {
        id: [
          { label: "Kecepatan Muat Ponsel", value: "< 1.5 Detik" },
          { label: "Skor PageSpeed", value: "95+ dari 100" },
          { label: "Tingkat Aksesibilitas", value: "A11y 100%" },
          { label: "Biaya Server Tambahan", value: "Rp 0 (Hemat)" }
        ],
        en: [
          { label: "Mobile Page Load", value: "< 1.5 Seconds" },
          { label: "PageSpeed Score", value: "95+ out of 100" },
          { label: "Accessibility Score", value: "A11y 100%" },
          { label: "Extra Server Cost", value: "$0 (Optimized)" }
        ]
      },
      highlights: {
        id: [
          "Bekerja pada platform pilihan klien (baik WordPress, CMS instansi, maupun sistem modern).",
          "Pengurangan beban ukuran halaman hingga 60% sehingga hemat kuota internet pengunjung.",
          "Tampilan bersih dan responsif sempurna saat dibuka dari smartphone layar kecil."
        ],
        en: [
          "Engineered to adapt to the client's current setup (WordPress, legacy CMS, or modern stack).",
          "60% reduction in total page weight, dramatically saving visitors mobile data.",
          "Clean, responsive layout verified across small and large smartphone screens."
        ]
      }
    }
  ] as CaseStudy[],

  services: [
    {
      id: "academic-data",
      title: {
        id: "Data, Rekayasa Dokumen & Olah Statistik",
        en: "Data Engineering, Documents & Statistical Modeling"
      },
      shortDesc: {
        id: "Ekstraksi tabel PDF ke Excel/CSV, perapian kuesioner survei, pemodelan statistik Rasch/Aiken, serta layouting dokumen Word OpenXML standar APA 7th.",
        en: "Deterministic PDF table extraction, survey data cleansing, Rasch/Aiken statistical modeling, and native OpenXML Word APA 7th document engineering."
      },
      deliverables: {
        id: [
          "Ekstraksi Rekening Koran, Invoice & Tabel PDF ke Excel/CSV",
          "Pembersihan Data Survei & Normalisasi Skala Likert",
          "Rekonstruksi Dokumen Word OpenXML (0 Kotak Teks Liar)",
          "Uji Validitas, Reliabilitas & Uji Hipotesis SPSS/R",
          "Penataan Format Tabel Formal Standar APA 7th Edition"
        ],
        en: [
          "Financial Statement & PDF Table Extraction to Excel/CSV",
          "Survey Data Cleansing & Likert Scale Normalization",
          "Native OpenXML Word Formatting (Zero Floating Text Boxes)",
          "Hypothesis Testing, Rasch Model & Statistical Diagnostics",
          "Formal 3-Line APA 7th Edition Table Architecture"
        ]
      },
      audience: {
        id: "Bisnis UKM, analis keuangan, peneliti akademis, dan pengambil keputusan data.",
        en: "SME businesses, financial analysts, graduate researchers, and data operators."
      }
    },
    {
      id: "web-solutions",
      title: {
        id: "Fullstack Web & Otomasi Digital",
        en: "Fullstack Web & Digital Automation"
      },
      shortDesc: {
        id: "Pembangunan website bisnis berkecepatan sub-detik LCP di Cloudflare Edge, integrasi API, perbaikan bug kode, dan otomasi scraping data headless.",
        en: "Engineering sub-second LCP web platforms on Cloudflare Edge, API integrations, bug fixing, and headless browser data scraping automation."
      },
      deliverables: {
        id: [
          "Pembuatan Landing Page & Web Profil Berbobot Ringan",
          "Optimasi Kecepatan Mobile & Core Web Vitals (INP/LCP)",
          "Skrip Otomasi Pengumpulan Data (CDP & Playwright)",
          "Integrasi Tombol Aksi Cepat WhatsApp & Formulir CRM"
        ],
        en: [
          "Lightweight Next.js Business Websites & Landing Pages",
          "Mobile Speed & Core Web Vitals Optimization (INP/LCP)",
          "Browser Data Harvesting Automation (CDP & Playwright)",
          "Direct WhatsApp Conversion Triggers & Structured Forms"
        ]
      },
      audience: {
        id: "Pemilik bisnis, startup founder, dan perusahaan yang membutuhkan web cepat.",
        en: "Business owners, startup founders, and speed-sensitive digital companies."
      }
    },
    {
      id: "business-docs",
      title: {
        id: "Bisnis, Tata Kelola & SOP Operasional",
        en: "Business Governance, SOPs & Investor Decks"
      },
      shortDesc: {
        id: "Penyusunan dokumen kemitraan usaha, manual SOP yayasan/korporat anti-bottleneck, studi kelayakan, dan pitch deck eksekutif 16:9 TasteSkill.",
        en: "Developing commercial partnership agreements, operational SOP manuals, feasibility studies, and 16:9 executive pitch decks."
      },
      deliverables: {
        id: [
          "Master Pitch Deck Eksekutif 16:9 (TasteSkill Luxury)",
          "Penyusunan Manual Standar Operasional Prosedur (SOP)",
          "Studi Kelayakan Bisnis & Proyeksi BEP Realistis",
          "Tata Kelola Administrasi Yayasan & Lembaga"
        ],
        en: [
          "16:9 Boardroom-Ready Pitch Decks (TasteSkill Luxury)",
          "Standard Operating Procedures (SOP) Development",
          "Commercial Feasibility Studies & Realistic Cash Flows",
          "Foundation Administration & Corporate Governance Memos"
        ]
      },
      audience: {
        id: "Direksi perusahaan, pengelola yayasan, pengusaha rintisan, dan pencari investasi.",
        en: "Corporate leadership, foundation directors, founders, and business operators."
      }
    },
    {
      id: "seo-growth",
      title: {
        id: "Branding, SEO & Marketing Konversi",
        en: "Branding, Technical SEO & Conversion Marketing"
      },
      shortDesc: {
        id: "Akuisisi pembeli melalui riset kata kunci niat beli komersial tinggi, audit Technical SEO, teks antarmuka persuasif, dan optimasi funnel AARRR.",
        en: "Acquiring qualified customers via high commercial-intent keyword research, Technical SEO audits, UX copywriting, and AARRR funnel optimization."
      },
      deliverables: {
        id: [
          "Audit Technical SEO, Kecepatan Perayapan & Schema JSON-LD",
          "Riset Kata Kunci Niat Beli Komersial & Kluster SERP",
          "Penulisan Teks Konversi (UX Copywriting) Tanpa AI Slop",
          "Perancangan Alur Funnel Akuisisi Pelanggan Multi-Kanal"
        ],
        en: [
          "Technical SEO Crawl Health Audit & Schema JSON-LD",
          "High Commercial-Intent Keyword Clustering & SERP Analysis",
          "Persuasive Human UX Copywriting Without Generic AI Slop",
          "Multi-Channel Customer Acquisition Funnel Architecture"
        ]
      },
      audience: {
        id: "Penyedia jasa B2B, e-commerce, pemilik produk digital, dan agensi pertumbuhan.",
        en: "B2B service firms, e-commerce brands, digital products, and growth agencies."
      }
    }
  ] as ServicePillar[],

  packages: [
    {
      id: "audit-session",
      name: {
        id: "Sesi Audit & Konsultasi Awal",
        en: "Initial Audit & Strategic Consultation"
      },
      tagline: {
        id: "Mendiagnosis akar masalah dan memetakan langkah tercepat sebelum memulai proyek.",
        en: "Diagnose core challenges and map out clear, actionable next steps."
      },
      duration: { id: "1-2 Hari Kerja", en: "1-2 Business Days" },
      bestFor: {
        id: "Klien yang ingin memeriksa kesehatan website, arah proposal bisnis, atau data riset.",
        en: "Clients needing clarity on their website health, proposal readiness, or research data."
      },
      features: {
        id: [
          "Pemeriksaan menyeluruh pada dokumen atau website Anda",
          "Sesi diskusi 1-on-1 via Google Meet / WhatsApp Call",
          "Dokumen ringkas rekomendasi tindakan nyata",
          "Tanpa komitmen lanjutan jika ingin mengeksekusi mandiri"
        ],
        en: [
          "Comprehensive review of your existing draft or website",
          "Direct 1-on-1 discussion via Google Meet or WhatsApp",
          "Concise action-plan memo with prioritized recommendations",
          "Zero obligation to continue if you prefer to execute in-house"
        ]
      }
    },
    {
      id: "guided-execution",
      name: {
        id: "Paket Eksekusi Terpandu",
        en: "Guided Project Execution"
      },
      tagline: {
        id: "Pengerjaan proyek dari perumusan awal hingga dokumen atau sistem siap digunakan.",
        en: "Full end-to-end execution from initial draft to final, polished delivery."
      },
      duration: { id: "1-3 Minggu Kerja", en: "1-3 Weeks" },
      bestFor: {
        id: "Klien yang memerlukan proposal bisnis tuntas, optimasi SEO web, atau olah data jurnal.",
        en: "Clients requiring finished business proposals, completed SEO setups, or academic data."
      },
      features: {
        id: [
          "Penyusunan naskah, perhitungan, atau kode secara tuntas",
          "Revisi terstruktur hingga mencapai persetujuan klien",
          "Serah terima seluruh berkas mentah dan panduan penggunaan",
          "Dukungan komunikasi langsung selama proses pengerjaan"
        ],
        en: [
          "Complete drafting, numerical modeling, or web development",
          "Structured revision rounds until complete client satisfaction",
          "Full handover of raw source files and operational guidance",
          "Direct messaging channel during active implementation"
        ]
      }
    },
    {
      id: "retainer-partner",
      name: {
        id: "Mitra Pendampingan Berkala (Retainer)",
        en: "Ongoing Strategic Retainer"
      },
      tagline: {
        id: "Kolaborasi jangka panjang sebagai penasihat strategi pertumbuhan dan operasional.",
        en: "Long-term partnership as your growth, operations, and analytical advisor."
      },
      duration: { id: "Bulanan / Fleksibel", en: "Monthly / Flexible" },
      bestFor: {
        id: "Lembaga, yayasan, atau bisnis yang membutuhkan keahlian terintegrasi tanpa rekrutmen penuh waktu.",
        en: "Institutions, foundations, and businesses needing senior expertise without full-time overhead."
      },
      features: {
        id: [
          "Alokasi jam kerja prioritas setiap minggu",
          "Pemantauan performa web, konten, dan administrasi berkala",
          "Pendampingan langsung dalam rapat mitra atau komite",
          "Laporan kemajuan bulanan yang jelas tanpa jargon berbelit"
        ],
        en: [
          "Dedicated weekly priority time allocation",
          "Continuous web health, content pipeline, and admin monitoring",
          "Executive presence in stakeholder or partner meetings",
          "Transparent monthly performance reports free from fluff"
        ]
      }
    }
  ] as ServicePackage[],

  toolCategories: [
    {
      category: { id: "Dokumen & Manajemen Bisnis", en: "Business Documents & Management" },
      description: {
        id: "Penyusunan narasi bisnis, model keuangan, dan visualisasi proposal.",
        en: "Strategic business narratives, financial projections, and executive pitch decks."
      },
      tools: ["Google Docs & Sheets", "Microsoft Office Suite", "Pitch Deck Keynote/PPT", "Canva Pro", "Supply Chain Workflow"]
    },
    {
      category: { id: "Analitika & Riset Data", en: "Analytics & Research Data" },
      description: {
        id: "Pengolahan data empiris, uji hipotesis, dan pemodelan kuantitatif.",
        en: "Empirical data analysis, hypothesis testing, and quantitative modeling."
      },
      tools: ["Python (Pandas, NumPy)", "SPSS Statistics", "Google Analytics 4", "R Console", "Mendeley / Zotero"]
    },
    {
      category: { id: "Platform Web & CMS", en: "Web Platforms & CMS" },
      description: {
        id: "Sistem web yang cepat, responsif, dan mudah dikelola pemilik situs.",
        en: "Fast, responsive web systems tailored to client operational needs."
      },
      tools: ["WordPress / Elementor", "Next.js & TypeScript", "Tailwind CSS", "Cloudflare Pages & DNS", "Webflow / HTML5"]
    },
    {
      category: { id: "Pemasaran & Visibilitas", en: "Marketing & Search Visibility" },
      description: {
        id: "Optimasi visibilitas online dan penulisan naskah persuasif berorientasi hasil.",
        en: "Online visibility engineering and conversion-driven storytelling."
      },
      tools: ["Google Search Console", "Screaming Frog SEO Spider", "Ahrefs / Semrush", "Schema.org (JSON-LD)", "Conversion Copywriting"]
    }
  ] as ToolCategory[]
};
