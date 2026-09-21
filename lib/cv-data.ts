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
    en: "Strategic Growth, Business & Research Consultant"
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
      id: "business-docs",
      title: {
        id: "Dokumen, Tata Kelola & Administrasi Bisnis",
        en: "Governance, SOPs & Executive Business Documents"
      },
      shortDesc: {
        id: "Penyusunan dokumen kemitraan usaha, tata kelola administrasi lembaga & yayasan, manual SOP operasional, serta studi kelayakan bisnis berstandar perbankan.",
        en: "Developing commercial partnership agreements, institutional governance frameworks, operational SOP manuals, and bank-grade feasibility studies."
      },
      deliverables: {
        id: [
          "Dokumen Kemitraan & Proposal Usaha",
          "Tata Kelola Administrasi Lembaga & Yayasan",
          "Penyusunan Standar Operasional Prosedur (SOP)",
          "Studi Kelayakan Bisnis (Feasibility Study)",
          "Model Finansial & Proyeksi Arus Kas 5 Tahun"
        ],
        en: [
          "Commercial Partnership & Business Proposals",
          "Institutional Governance & Foundation Administration",
          "Standard Operating Procedures (SOP) Development",
          "Comprehensive Feasibility Studies & Executive Memos",
          "5-Year Financial Models & Cash Flow Forecasts"
        ]
      },
      audience: {
        id: "Pemilik usaha, pengelola yayasan, pengusaha rintisan, dan direksi perusahaan.",
        en: "Business owners, foundation directors, founders, and corporate leadership."
      }
    },
    {
      id: "seo-growth",
      title: {
        id: "SEO & Pertumbuhan Konten Konversi",
        en: "SEO & High-Conversion Content Growth"
      },
      shortDesc: {
        id: "Membawa calon pembeli dan audiens tertarget ke website Anda melalui riset kata kunci berniat komersial, perbaikan on-page, dan tulisan persuasif.",
        en: "Attracting high-intent buyers and targeted audiences to your site through keyword research, technical on-page health, and persuasive copywriting."
      },
      deliverables: {
        id: [
          "Riset Kata Kunci Berniat Beli & Analisis Pesaing",
          "Audit Struktur On-Page & Kecepatan Perayapan",
          "Penulisan Artikel Pilar & Naskah Landing Page",
          "Penataan Schema FAQ untuk Tampil Menonjol di Google"
        ],
        en: [
          "Commercial Intent Keyword & Competitor Analysis",
          "On-Page Technical Audit & Crawl Health Check",
          "Authority Pillar Content & High-Converting Landing Page Copy",
          "Structured FAQ Schema Integration for Rich Snippets"
        ]
      },
      audience: {
        id: "Bisnis B2B, penyedia jasa profesional, toko online, dan media informasi.",
        en: "B2B service providers, professional firms, e-commerce, and digital publications."
      }
    },
    {
      id: "academic-data",
      title: {
        id: "Riset Akademik & Analisis Data Statistik",
        en: "Academic Research & Statistical Data Analysis"
      },
      shortDesc: {
        id: "Pengolahan data penelitian kuantitatif, pemodelan statistik matematika, serta pendampingan penyusunan artikel ilmiah terstandar akreditasi SINTA.",
        en: "Quantitative research data processing, mathematical modeling, and comprehensive guidance for SINTA accredited journal manuscripts."
      },
      deliverables: {
        id: [
          "Uji Validitas, Reliabilitas & Normalitas Instrumen",
          "Analisis Korelasi, Regresi, ANOVA & Uji Hipotesis",
          "Interpretasi Output SPSS / Python dalam Format Laporan Ilmiah",
          "Penyelarasan Naskah dengan Pedoman Penulisan Jurnal SINTA"
        ],
        en: [
          "Instrument Validity, Reliability & Normality Testing",
          "Regression, Correlation, ANOVA & Hypothesis Modeling",
          "Interpretation of SPSS/Python Outputs into Academic Prose",
          "Manuscript Alignment with Target Journal Submission Guidelines"
        ]
      },
      audience: {
        id: "Dosen, mahasiswa pascasarjana (S2/S3), peneliti lembaga, dan akademisi.",
        en: "Lecturers, graduate scholars, institutional researchers, and educators."
      }
    },
    {
      id: "web-solutions",
      title: {
        id: "Solusi Digital & Web Berkinerja Tinggi",
        en: "Digital Solutions & High-Performance Web"
      },
      shortDesc: {
        id: "Pembuatan dan modernisasi website yang sangat cepat, aman, dan mudah digunakan, dengan teknologi yang disesuaikan kebutuhan riil Anda.",
        en: "Development and modernization of lightweight, secure, and accessible websites tailored to your existing platform."
      },
      deliverables: {
        id: [
          "Pembuatan Situs Profil Perusahaan & Landing Page Penjualan",
          "Optimasi Kecepatan Muat Halaman (Mobile PageSpeed)",
          "Perbaikan Navigasi & Kemudahan Akses (A11y 100%)",
          "Konfigurasi Domain, Hosting Cloudflare & Perlindungan Keamanan"
        ],
        en: [
          "Company Profile & High-Conversion Sales Landing Pages",
          "Mobile PageSpeed Optimization & Core Web Vitals Upgrades",
          "Usability & Accessibility Improvements (A11y 100%)",
          "Cloudflare Edge Setup, Fast DNS & Built-In Security"
        ]
      },
      audience: {
        id: "Pelaku UMKM, lembaga nirlaba, instansi publik, dan praktisi independen.",
        en: "SMEs, non-profits, educational organizations, and independent professionals."
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
