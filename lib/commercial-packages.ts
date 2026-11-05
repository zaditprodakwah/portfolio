export interface ProofLink {
  label: string;
  url: string;
  type: "case-study" | "demo" | "code";
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  priceIdr: number;
  priceFormatted: string;
  period?: string;
  sla: string;
  targetAudience: string;
  bestFor: string;
  deliverables: string[];
  proofLinks: ProofLink[];
  highlight?: boolean;
}

export interface CommercialPackage {
  id: string;
  pillarNumber: string;
  title: string;
  badge: string;
  problemSummary: string;
  solutionMechanism: string;
  iconName: string;
  tiers: PricingTier[];
}

export const COMMERCIAL_PACKAGES: CommercialPackage[] = [
  {
    id: "data-intelligence",
    pillarNumber: "01",
    title: "Data & Workflow Intelligence Engine",
    badge: "Efisiensi B2B & Korporat",
    iconName: "Database",
    problemSummary: "Tim manajerial menghabiskan 10-15 jam per minggu merekap progres Jira secara manual, data keuangan PDF terkunci tanpa parser otomatis, dan dashboard BI statis tidak memberikan narasi tindakan yang jelas kepada jajaran direksi.",
    solutionMechanism: "Kami mengintegrasikan pipeline ETL otomatis, reverse API Atlassian, dan engine narasi visual data (Plotly.js) yang memotong 90% waktu rekapitulasi rutin menjadi laporan eksekutif siap baca.",
    tiers: [
      {
        id: "documorph-parser",
        name: "DocuMorph PDF & Financial Statement Parser",
        tagline: "Ekstraksi PDF Rekening Koran & Invoice ke Excel/JSON Bersih",
        priceIdr: 4500000,
        priceFormatted: "Rp4.500.000",
        sla: "2-3 Hari Kerja",
        targetAudience: "Bagian Keuangan, UMKM, Perusahaan Dagang",
        bestFor: "Rekonsiliasi mutasi bank ratusan halaman tanpa salah ketik manual",
        deliverables: [
          "Skrip parser kustom Python/Node.js bebas biaya bulanan",
          "Ekstraksi tabel rekening koran/invoice ke Excel dan JSON bersih",
          "Uji validasi matematis debit-kredit dengan selisih saldo nol",
          "Dokumentasi SOP pemakaian untuk staf non-teknis"
        ],
        proofLinks: [
          {
            label: "HLD Blueprint Arsitektur DocuMorph",
            url: "https://zadevpenseo.github.io/case-studies/data-analysis/documorph-pdf-table-extraction/",
            type: "case-study"
          },
          {
            label: "Live Demo Omnidata Studio",
            url: "https://muhzadit.pages.dev/solusi/document-data-studio/",
            type: "demo"
          }
        ]
      },
      {
        id: "jira-executive-engine",
        name: "Automated Jira & Engineering Weekly Reporting",
        tagline: "Konsol Dwi-Arah CLI/MCP & Ringkasan Eksekutif Tim Developer",
        priceIdr: 12500000,
        priceFormatted: "Rp12.500.000",
        sla: "5-7 Hari Kerja",
        targetAudience: "VP of Engineering, CTO, Product Manager B2B",
        bestFor: "Menghubungkan Jira Cloud/Linear ke ringkasan sprint mingguan otomatis",
        highlight: true,
        deliverables: [
          "Pipeline agregasi tiket sprint Jira dengan Atlassian REST API v3",
          "Engine ringkasan otomatis status blocker, velocity, dan alokasi tim",
          "Konsol terminal dwi-arah CLI/MCP untuk mutasi tiket real-time",
          "Template laporan Markdown dan HTML siap kirim ke Slack/Email Direksi"
        ],
        proofLinks: [
          {
            label: "HLD Blueprint Jira Automation #40725359",
            url: "https://zadevpenseo.github.io/case-studies/data-analysis/jira-weekly-report-automation-40725359/",
            type: "case-study"
          },
          {
            label: "Live Demo Terminal Console Jira",
            url: "https://zadevpenseo.github.io/demos/jira-weekly-report/",
            type: "demo"
          }
        ]
      },
      {
        id: "data-storytelling-retainer",
        name: "Fractional Data Storytelling & ETL Architect",
        tagline: "Pendampingan Analitik & Visualisasi Keputusan Bulanan",
        priceIdr: 18500000,
        priceFormatted: "Rp18.500.000",
        period: "/bulan",
        sla: "SLA Dedicated 24 Jam",
        targetAudience: "Perusahaan Skala Menengah, B2B SaaS, Agensi Korporat",
        bestFor: "Transformasi berkala data mentah bisnis menjadi 1-kalimat kesimpulan defensibel",
        deliverables: [
          "Arsitektur visualisasi data interaktif berbasis Plotly.js kustom",
          "Penyusunan 4 uji narasi data: Story, Intuition, Concision, Honesty",
          "Dukungan langsung via channel privat Slack/WhatsApp Tim Eksekutif",
          "Kerahasiaan data terjamin penuh dengan Non-Disclosure Agreement (NDA)"
        ],
        proofLinks: [
          {
            label: "HLD Blueprint Data Storytelling Engine",
            url: "https://zadevpenseo.github.io/case-studies/data-analysis/executive-data-storytelling-engine/",
            type: "case-study"
          },
          {
            label: "Live Demo Plotly Visual Explainer",
            url: "https://zadevpenseo.github.io/demos/data-storytelling-engine/",
            type: "demo"
          }
        ]
      }
    ]
  },
  {
    id: "edge-web-architecture",
    pillarNumber: "02",
    title: "High-Performance Web & Edge Architecture",
    badge: "Infrastruktur $0 Server Fee",
    iconName: "Globe",
    problemSummary: "Situs web lambat (LCP > 3.5s) mengakibatkan 50%+ calon pelanggan kabur, biaya sewa server bulanan terus membengkak, dan kerentanan keamanan database monolitik rentan disusupi peretas.",
    solutionMechanism: "Kami mengompilasi situs ke arsitektur edge serverless (Next.js di atas Cloudflare Pages). Hasilnya adalah kecepatan global seketika, proteksi DDoS bawaan, dan eliminasi biaya server bulanan selamanya.",
    tiers: [
      {
        id: "promo-web-kilat-300rb",
        name: "Website Bisnis Siap Pakai Termasuk Domain",
        tagline: "Hadir di Internet Tanpa Ribet Server: Satu Halaman Cepat, Termasuk Domain & Tombol WhatsApp",
        priceIdr: 300000,
        priceFormatted: "Rp300.000",
        sla: "1-2 Hari Kerja",
        targetAudience: "Pemilik Bisnis Lokal, UMKM, Konsultan Solo & Kreator",
        bestFor: "Memiliki alamat web resmi berkecepatan tinggi tanpa beban sewa server bulanan",
        highlight: true,
        deliverables: [
          "Satu halaman website responsif cepat (LCP < 1.2 detik) ramah smartphone",
          "Pilihan domain resmi: Termasuk domain .my.id / .biz.id tahun pertama, subdomain brand.pages.dev gratis selamanya, atau setup domain milik sendiri",
          "Tombol WhatsApp langsung dengan pesan otomatis terformat rapi",
          "Profil usaha, katalog layanan/produk, jam operasional, dan peta lokasi",
          "Hosting edge global Cloudflare Pages dengan biaya bulanan Rp0 selamanya",
          "Bebas biaya pemeliharaan server (Zero Server Maintenance)"
        ],
        proofLinks: [
          {
            label: "HLD Blueprint High-Performance Landing Engine",
            url: "https://zadevpenseo.github.io/case-studies/web-dev-design/animated-landing-page-659928/",
            type: "case-study"
          },
          {
            label: "Live Demo WordPress Playground Tanpa Server",
            url: "https://muhzadit.pages.dev/elementor-demo/",
            type: "demo"
          }
        ]
      },
      {
        id: "starter-landing-edge",
        name: "Turnkey High-Converting Landing Page",
        tagline: "Halaman Penjualan Ultra Cepat, SEO Terpadu & WhatsApp Ready",
        priceIdr: 3500000,
        priceFormatted: "Rp3.500.000",
        sla: "3-4 Hari Kerja",
        targetAudience: "Pelaku UMKM, Konsultan Solo, Penjual Produk Bernilai Tinggi",
        bestFor: "Meluncurkan produk baru dengan konversi maksimal tanpa pusing teknis",
        deliverables: [
          "Pengembangan Next.js 15 Tailwind CSS dengan skor Core Web Vitals 95+",
          "Integrasi tombol WhatsApp otomatis dengan pre-filled teks pesanan",
          "Skema SEO JSON-LD lengkap untuk keterbacaan Google & AI Search (AEO)",
          "Deploy langsung ke Cloudflare Pages dengan biaya hosting Rp0"
        ],
        proofLinks: [
          {
            label: "HLD Blueprint Animated Landing Page",
            url: "https://zadevpenseo.github.io/case-studies/web-dev-design/animated-landing-page-659928/",
            type: "case-study"
          }
        ]
      },

      {
        id: "corporate-edge-portal",
        name: "Corporate Portal & Interactive Web Engine",
        tagline: "Website Perusahaan Multi-Halaman & Direktori Cepat",
        priceIdr: 9500000,
        priceFormatted: "Rp9.500.000",
        sla: "7-10 Hari Kerja",
        targetAudience: "Perusahaan Swasta, Yayasan, Lembaga Pendidikan, Startup",
        bestFor: "Membangun kredibilitas korporat dengan profil institusional modern",
        highlight: true,
        deliverables: [
          "Arsitektur Next.js 15 App Router hingga 10 halaman terstruktur",
          "Katalog direktori solusi, studi kasus, dan formulir audit interaktif",
          "Desain mewah standar TasteSkill ramah aksesibilitas WCAG 2.1 AA",
          "Penyelarasan DNS domain resmi perusahaan (.co.id / .com / .org)"
        ],
        proofLinks: [
          {
            label: "HLD Blueprint Gworky Edge Web App",
            url: "https://zadevpenseo.github.io/case-studies/web-dev-design/gworky-edge-web-app/",
            type: "case-study"
          },
          {
            label: "Live Demo Gworky Edge Platform",
            url: "https://zadevpenseo.github.io/demos/gworky-edge-app/",
            type: "demo"
          }
        ]
      },
      {
        id: "elementor-json-delivery",
        name: "Elementor JSON UI & WordPress Rescue",
        tagline: "Paket Template JSON Siap Impor Tanpa Server Dependency",
        priceIdr: 4500000,
        priceFormatted: "Rp4.500.000",
        sla: "2-4 Hari Kerja",
        targetAudience: "Pemilik WordPress yang Ingin Merapikan Tampilan Sendiri",
        bestFor: "Pembaruan tampilan website WordPress tanpa perlu akses kredensial sensitif",
        deliverables: [
          "File template .json per halaman siap impor lewat Elementor Core gratis",
          "Nol ketergantungan plugin pihak ketiga yang rawan crash atau memperlambat web",
          "Demo interaktif yang divalidasi via WordPress Playground dalam browser",
          "Panduan video langkah impor mandiri berdurasi 5 menit"
        ],
        proofLinks: [
          {
            label: "HLD Blueprint Elementor JSON UI",
            url: "https://zadevpenseo.github.io/case-studies/web-dev-design/elementor-json-ui-engine/",
            type: "case-study"
          },
          {
            label: "Live Demo WordPress Playground",
            url: "https://muhzadit.pages.dev/elementor-demo/",
            type: "demo"
          }
        ]
      }
    ]
  },
  {
    id: "strategic-narrative",
    pillarNumber: "03",
    title: "Strategic Narrative & Executive Pitch Decks",
    badge: "TasteSkill Luxury Editorial",
    iconName: "FileText",
    problemSummary: "Proposal kemitraan CSR atau permohonan modal sering ditolak karena tata letak visual amatir, bahasa klise AI yang tidak meyakinkan, serta proyeksi keuangan yang tidak masuk akal bagi komite penilai.",
    solutionMechanism: "Kami menerapkan standar editorial mewah 16:9 (TasteSkill Design System), narasi transformasi B2B (SCAR Framework), dan model kelayakan finansial deterministik yang defensibel di hadapan investor.",
    tiers: [
      {
        id: "executive-deck",
        name: "Executive 16:9 Presentation Deck",
        tagline: "Deck Kemitraan Strategis, CSR BUMN & Penggalangan Dana",
        priceIdr: 5000000,
        priceFormatted: "Rp5.000.000",
        sla: "3-5 Hari Kerja",
        targetAudience: "Yayasan Sosial, Lembaga Dakwah, Pengusaha Agribisnis, Startup",
        bestFor: "Presentasi penting penentu keputusan di hadapan direksi atau donatur",
        deliverables: [
          "Master deck 16:9 (12-18 slide) dalam format PDF High-Res dan PPTX editable",
          "Arsitektur visual flywheel, tata kelola tipografi mewah, dan nol kartu kosong",
          "Naskah persuasi bebas AI slop dan bebas tanda em-dash",
          "Draf ringkasan eksekutif 1 halaman (One-Pager Executive Memo)"
        ],
        proofLinks: [
          {
            label: "HLD Blueprint Executive Pitch Decks",
            url: "https://zadevpenseo.github.io/case-studies/writer/executive-pitch-decks-jcg-partnership/",
            type: "case-study"
          }
        ]
      },
      {
        id: "feasibility-model",
        name: "Bankable Business Feasibility & Financial Model",
        tagline: "Proposal Usaha Komprehensif & Proyeksi Arus Kas Deterministik",
        priceIdr: 12000000,
        priceFormatted: "Rp12.000.000",
        sla: "7-10 Hari Kerja",
        targetAudience: "Perusahaan Menengah, Koperasi, Pemohon Kredit Perbankan/LPDB",
        bestFor: "Pengajuan pinjaman investasi modal kerja dan ekspansi operasional cabang",
        highlight: true,
        deliverables: [
          "Buku studi kelayakan bisnis 30-50 halaman format Word formal",
          "Model proyeksi keuangan dinamis (Excel formula tanpa circular error)",
          "Kalkulasi kelayakan investasi: NPV, IRR, Payback Period, dan Rasio Likuiditas",
          "Ringkasan profil manajemen dan mitigasi risiko operasional"
        ],
        proofLinks: [
          {
            label: "HLD Blueprint Business Feasibility Models",
            url: "https://zadevpenseo.github.io/case-studies/writer/business-feasibility-financial-models/",
            type: "case-study"
          }
        ]
      }
    ]
  },
  {
    id: "academic-research",
    pillarNumber: "04",
    title: "Academic Research & Journal Advisory",
    badge: "100% Legal & Bebas Joki",
    iconName: "BarChart3",
    problemSummary: "Naskah penelitian dosen dan mahasiswa pascasarjana kerap tertahan atau ditolak reviewer SINTA/Scopus akibat cacat uji asumsi statistik, ketidakjelasan sintesis literatur, atau pemformatan sitasi manual yang acak-acakan.",
    solutionMechanism: "Dipimpin langsung oleh praktisi berlatar belakang studi S1 Tadris Matematika Institut Al Bahjah Cirebon (tuntas 132 SKS, IPK 3.64), kami mentransfer penalaran komputasi legal dan menyusun naskah Word OpenXML Native Zotero standar APA 7th Edition murni.",
    tiers: [
      {
        id: "exam-lecture-synthesis",
        name: "Exam-Ready Lecture Synthesis Kit",
        tagline: "Audio Rekaman Kelas ke Modul Ringkasan & 10 Prediksi Soal Ujian",
        priceIdr: 250000,
        priceFormatted: "Rp250.000",
        period: "paket 6-8 sesi",
        sla: "24-48 Jam",
        targetAudience: "Mahasiswa Sarjana & Pascasarjana",
        bestFor: "Mengubah rekaman suara kuliah Zoom atau kelas luring yang bising menjadi ringkasan PDF 4-6 halaman dan kisi-kisi ujian",
        deliverables: [
          "Denoising audio dan transkripsi akurat bebas noise ruangan",
          "Modul ringkasan eksekutif 4-6 halaman siap cetak",
          "10 prediksi soal ujian beserta kunci jawaban konseptual",
          "Bebas repot mendengarkan ulang rekaman kuliah berjam-jam"
        ],
        proofLinks: [
          {
            label: "Katalog Penawaran Akademik SSOT",
            url: "https://muhzadit.pages.dev/layanan/olah-data-statistik-sinta/",
            type: "case-study"
          }
        ]
      },
      {
        id: "statistical-computing",
        name: "Advanced Statistical Computing & Modeling",
        tagline: "Olah Data SEM-PLS, SmartPLS 4, SPSS, AMOS, Rasch & Aiken",
        priceIdr: 2500000,
        priceFormatted: "Rp2.500.000",
        sla: "2-4 Hari Kerja",
        targetAudience: "Mahasiswa Pascasarjana (S2/S3), Peneliti Independen",
        bestFor: "Menyelesaikan hambatan komputasi data tesis dan disertasi kuantitatif",
        deliverables: [
          "Eksekusi komputasi data bersih dengan laporan uji asumsi klasik lengkap",
          "Tabel formal APA 7th Edition (3 garis horizontal elegan, 0 garis vertikal)",
          "Interpretasi verbal hasil uji hipotesis bebas bias konfirmasi",
          "Sesi asistensi penjelasan metodologi via voice/teks hingga sidang lulus"
        ],
        proofLinks: [
          {
            label: "HLD Blueprint Modeling Matematika & Statistika",
            url: "https://zadevpenseo.github.io/case-studies/data-analysis/mathematical-modeling-and-statistics/",
            type: "case-study"
          },
          {
            label: "HLD Blueprint Validasi Psikometri & Rasch",
            url: "https://zadevpenseo.github.io/case-studies/data-analysis/psychometric-survey-validation-rasch/",
            type: "case-study"
          }
        ]
      },
      {
        id: "prisma-slr-advisory",
        name: "PRISMA 2020 Systematic Literature Review & Journal Prep",
        tagline: "Studi Kepustakaan Terstruktur & Format Naskah Siap Submit",
        priceIdr: 8500000,
        priceFormatted: "Rp8.500.000",
        sla: "7-14 Hari Kerja",
        targetAudience: "Dosen, Tim Riset Lembaga Pendidikan, Peneliti Jurnal",
        bestFor: "Penyusunan artikel telaah literatur bereputasi SINTA 2 atau Scopus Q3-Q4",
        highlight: true,
        deliverables: [
          "Diagram alur PRISMA 2020 transparan dari basis data OpenAlex/PubMed",
          "Matriks sintesis bukti empiris ratusan artikel ilmiah",
          "Naskah Word OpenXML Native dengan kode sitasi dinamis Zotero/Mendeley",
          "Pengecekan kemiripan teks bebas plagiarisme dan audit anti-AI slop"
        ],
        proofLinks: [
          {
            label: "HLD Blueprint Peer-Reviewed Empirical Publishing",
            url: "https://zadevpenseo.github.io/case-studies/writer/peer-reviewed-empirical-publishing/",
            type: "case-study"
          }
        ]
      }
    ]
  },
  {
    id: "career-linkedin-positioning",
    pillarNumber: "05",
    title: "Career Engineering & Executive LinkedIn Positioning",
    badge: "Mobilitas Karir & Otoritas B2B",
    iconName: "UserCheck",
    problemSummary: "Profil LinkedIn yang usang, tata letak CV Canva warna-warni yang gugur di sistem ATS, dan ketiadaan narasi pencapaian terukur membuat kandidat berpotensi serta pemilik bisnis kehilangan peluang kemitraan bernilai tinggi.",
    solutionMechanism: "Kami merestrukturisasi narasi karir berbasis formula Google XYZ, merancang spanduk visual terkurasi 1584x396px, dan menyusun Master Blueprint siap pasang dengan jaminan 100% Zero-Password Handover sesuai ADR-0052.",
    tiers: [
      {
        id: "linkedin-standalone",
        name: "Standalone LinkedIn Profile Overhaul",
        tagline: "Profil Publik Siap Konversi Kemitraan & Penyerahan Bebas Password",
        priceIdr: 350000,
        priceFormatted: "Rp350.000",
        sla: "2 Hari Kerja",
        targetAudience: "Founder Studio, Konsultan Independen, Praktisi Bisnis",
        bestFor: "Mengubah akun LinkedIn pasif menjadi landing page kemitraan bisnis tanpa membocorkan kata sandi",
        deliverables: [
          "Restrukturisasi Headline berdaya pikat dan About section naratif",
          "3 sampai 5 deskripsi pengalaman kerja berbasis formula Google XYZ",
          "Custom Branded Banner 1584x396px siap pasang (Canva/PNG)",
          "Master Blueprint (.docx) panduan salin-tempel 5 menit mandiri"
        ],
        proofLinks: [
          {
            label: "Arsitektur Layanan LinkedIn ADR-0052",
            url: "https://muhzadit.pages.dev/layanan/karir-ats-linkedin-eksekutif/",
            type: "case-study"
          }
        ]
      },
      {
        id: "double-threat-combo",
        name: "The Double Threat: CV ATS + LinkedIn Overhaul",
        tagline: "Paket Kombo Karir Lengkap (Mesin ATS & Profil Publik)",
        priceIdr: 550000,
        priceFormatted: "Rp550.000",
        sla: "3 Hari Kerja",
        targetAudience: "Job Seeker Korporat, Fresh Graduate, Profesional Menengah",
        bestFor: "Menembus seleksi mesin ATS sekaligus memikat rekruter saat memantau profil LinkedIn",
        highlight: true,
        deliverables: [
          "Format CV ATS standar industri (Typst Vektor PDF + Dokumen Master Word)",
          "Overhaul profil LinkedIn penuh (Headline, About, Experience, Skills)",
          "Custom Branded Banner visual 1584x396px resolusi tinggi",
          "Surat lamaran kerja (Cover Letter) adaptif siap sesuaikan lowongan"
        ],
        proofLinks: [
          {
            label: "Studi Kasus Rekayasa Karir PROOF-DOSEN-001",
            url: "https://muhzadit.pages.dev/layanan/karir-ats-linkedin-eksekutif/",
            type: "case-study"
          }
        ]
      },
      {
        id: "academic-executive-prestige",
        name: "Academic & Executive Prestige Suite",
        tagline: "Standarisasi Tri Dharma Dikti / Portofolio Founder B2B",
        priceIdr: 950000,
        priceFormatted: "Rp950.000",
        sla: "4-5 Hari Kerja",
        targetAudience: "Calon Dosen, Peneliti Lembaga, Agency Owner",
        bestFor: "Seleksi formasi dosen perguruan tinggi atau akuisisi klien bernilai tinggi",
        deliverables: [
          "Curriculum Vitae Akademik standar PO-PAK Dikti (Tri Dharma Perguruan Tinggi)",
          "Overhaul profil LinkedIn berorientasi Thought Leadership & Kemitraan",
          "Paket starter konten opini bulan pertama (3 draf artikel LinkedIn)",
          "Master Blueprint dokumen siap arsip dan bebas retensi pihak ketiga"
        ],
        proofLinks: [
          {
            label: "Studi Kasus Seleksi Dosen Fisika Nikmah",
            url: "https://muhzadit.pages.dev/layanan/karir-ats-linkedin-eksekutif/",
            type: "case-study"
          }
        ]
      }
    ]
  },
  {
    id: "spatial-geo-intelligence",
    pillarNumber: "06",
    title: "Analisis Geospasial, GIS & Citra Satelit Lingkungan",
    badge: "Presisi Spasial & Ekologi",
    iconName: "MapPin",
    problemSummary: "Peneliti dan instansi perencana sering terbentur kompleksitas analisis spasial multikriteria (AHP-GIS), keterbatasan komputasi laptop saat memproses citra radar banjir Sentinel-1 SAR, serta kesulitan mengonversi sensus pohon drone menjadi angka serapan karbon dan emisi CO2e yang diakui standar internasional.",
    solutionMechanism: "Kami menghadirkan pipeline geospasial terdesentralisasi: perhitungan matriks perbandingan berpasangan Saaty (CR < 0,10), klasifikasi kesesuaian lahan FAO (S1 hingga N), pemrosesan SAR dan DEM berbasis cloud, serta model alometri Chave 2014 dan i-Tree Eco berformat Shapefile, GeoJSON, dan peta kartografi vektor SVG siap publikasi.",
    tiers: [
      {
        id: "ahp-gis-suitability",
        name: "Evaluasi Kesesuaian Lahan AHP-GIS (SMCE)",
        tagline: "Matriks Perbandingan Berpasangan Saaty & Tumpang Susun Spasial FAO",
        priceIdr: 850000,
        priceFormatted: "Rp850.000",
        sla: "2-3 Hari Kerja",
        targetAudience: "Mahasiswa S1/S2 Perencanaan Wilayah, Kehutanan, Pertanian, Geografi",
        bestFor: "Menentukan lokasi optimal (TPA, permukiman, komoditas tani) dengan pengujian rasio konsistensi matematis yang lolos uji sidang",
        highlight: true,
        deliverables: [
          "Matriks perbandingan berpasangan kriteria Saaty teruji konsistensi (CR < 0,10)",
          "Tumpang susun spasial terbobot (Weighted Overlay) klasifikasi FAO S1, S2, S3, dan N",
          "Draf narasi metodologi dan interpretasi tabel Bab 4 berstandar akademik",
          "Peta kartografi vektor resolusi tinggi (SVG dan Shapefile/GeoJSON)",
          "Lembar catatan kisi-kisi tanya jawab untuk menghadapi penguji sidang"
        ],
        proofLinks: [
          {
            label: "Arsitektur Geospasial Headless ADR-0054",
            url: "https://muhzadit.pages.dev/layanan/analisis-geospasial-lingkungan/",
            type: "case-study"
          }
        ]
      },
      {
        id: "sentinel1-flood-sar",
        name: "Pemetaan Genangan Banjir Radar SAR Sentinel-1",
        tagline: "Deteksi Perubahan Backscatter Bebas Gangguan Awan & Filter Kelerengan DEM",
        priceIdr: 1450000,
        priceFormatted: "Rp1.450.000",
        sla: "3-4 Hari Kerja",
        targetAudience: "Peneliti Bencana, BPBD, Konsultan AMDAL, Mahasiswa Lingkungan Hidup",
        bestFor: "Memetakan luasan genangan banjir saat musim hujan lebat tanpa terhalang tutupan awan optik",
        deliverables: [
          "Pemrosesan citra radar Sentinel-1 GRD polarisasi ganda (VV/VH) sebelum dan sesudah bencana",
          "Reduksi derau hamburan dengan Lee Speckle Filter deterministik",
          "Penyaringan badan air permanen (JRC Global Surface Water) dan topografi curam (SRTM DEM slope)",
          "Kalkulasi total luasan genangan banjir per unit desa/kecamatan (hektare)",
          "Paket data spasial lengkap (GeoTIFF raster genangan, GeoJSON vektor batas banjir, dan peta infografis)"
        ],
        proofLinks: [
          {
            label: "Pipeline Remote Sensing GEE Sentinel-1",
            url: "https://muhzadit.pages.dev/layanan/analisis-geospasial-lingkungan/",
            type: "case-study"
          }
        ]
      },
      {
        id: "canopy-carbon-atlas",
        name: "Inventarisasi Karbon & Kanopi Pohon Drone/Satelit",
        tagline: "Model Alometri Pantropis Chave 2014 & Standarisasi Ekologis i-Tree Eco",
        priceIdr: 2850000,
        priceFormatted: "Rp2.850.000",
        sla: "5-7 Hari Kerja",
        targetAudience: "Pengelola Hutan Kota, Perusahaan ESG, Dinas Lingkungan Hidup, Riset Tesis Kehutanan",
        bestFor: "Audit biomassa tegakan pohon, stok karbon tersimpan, dan serapan emisi gas rumah kaca untuk laporan keberlanjutan",
        deliverables: [
          "Kompilasi sensus biometrik pohon (DBH, tinggi, diameter tajuk) berbasis ortofoto drone atau survei lapang",
          "Kalkulasi biomassa di atas permukaan tanah (AGB) model alometri Chave 2014",
          "Estimasi stok karbon (C) dan ekuivalen emisi gas rumah kaca terserap (CO2e)",
          "Atlas digital sebaran pohon interaktif format GeoJSON dan peta zonasi tematik",
          "Laporan eksekutif inventarisasi karbon lengkap siap lampir dokumen ESG atau publikasi jurnal"
        ],
        proofLinks: [
          {
            label: "Audit Karbon Pohon Kampus PROOF-ITREE-001",
            url: "https://muhzadit.pages.dev/layanan/analisis-geospasial-lingkungan/",
            type: "case-study"
          }
        ]
      }
    ]
  }
];

export const CLIENT_SEGMENTS = [
  { id: "all", label: "Semua Segmen" },
  { id: "corporate", label: "Korporasi & B2B" },
  { id: "business", label: "UMKM & Toko Online" },
  { id: "institution", label: "Lembaga Pendidikan & Kampus" },
  { id: "foundation", label: "Yayasan & Lembaga Dakwah" },
  { id: "individual", label: "Individu & Akademisi" }
];
