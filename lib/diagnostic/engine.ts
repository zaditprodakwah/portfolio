export type DiagnosticPillar = "web" | "sinta" | "bisnis" | "sop";

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  score: number;
  fatalRisk?: string;
  remedy?: string;
  nextQuestionId?: string;
}

export interface DiagnosticQuestion {
  id: string;
  pillar: DiagnosticPillar;
  title: string;
  subtitle: string;
  options: QuestionOption[];
}

export interface DiagnosticResult {
  pillar: DiagnosticPillar;
  pillarLabel: string;
  overallScore: number;
  grade: "A" | "B" | "C" | "D";
  statusTitle: string;
  statusDescription: string;
  fatalVulnerabilities: string[];
  remediationSteps: string[];
  waPrefillText: string;
  metricsBreakdown?: {
    label: string;
    score: number;
    maxScore: number;
    status: "good" | "warning" | "danger";
  }[];
  rawMetrics?: {
    url?: string;
    lcp?: string;
    cls?: string;
    fcp?: string;
    performanceScore?: number;
    seoScore?: number;
    a11yScore?: number;
    isLiveAnalyzed?: boolean;
  };
}

export const DIAGNOSTIC_PILLARS: {
  id: DiagnosticPillar;
  title: string;
  badge: string;
  desc: string;
  iconName: string;
}[] = [
  {
    id: "web",
    title: "Web Performa & Audit CWV/SEO",
    badge: "Live URL / Wizard",
    desc: "Cek Core Web Vitals (LCP, CLS, INP), kecepatan mobile, dan risiko ranking Google.",
    iconName: "Globe"
  },
  {
    id: "sinta",
    title: "Riset & Naskah Jurnal SINTA / Scopus",
    badge: "Metodologi & Validitas",
    desc: "Diagnosa kebaruan (novelty), kelayakan rasio sampel statistik, sitasi Mendeley & Turnitin.",
    iconName: "GraduationCap"
  },
  {
    id: "bisnis",
    title: "Pitch Deck & Model Keuangan Bisnis",
    badge: "Investor & Kelayakan",
    desc: "Uji unit economics, validasi ukuran pasar (TAM/SAM/SOM), dan viabilitas BEP kas.",
    iconName: "Briefcase"
  },
  {
    id: "sop",
    title: "Tata Kelola SOP & Operasional Organisasi",
    badge: "Sistem & Skalabilitas",
    desc: "Deteksi risiko Single Point of Failure, tumpang tindih RACI, dan kepatuhan dokumen legal.",
    iconName: "ShieldCheck"
  }
];

export const DIAGNOSTIC_QUESTIONS: Record<DiagnosticPillar, DiagnosticQuestion[]> = {
  sinta: [
    {
      id: "sinta_novelty",
      pillar: "sinta",
      title: "Bagaimana status novelty (kebaruan) dan research gap naskah Anda?",
      subtitle: "Editor jurnal bereputasi menolak 70% naskah di tahap awal jika gap penelitian tidak terbukti.",
      options: [
        {
          id: "s1_a",
          label: "Sudah ada matriks komparasi 10+ jurnal terbaru (< 5 thn) & formulasi gap eksplisit",
          score: 30
        },
        {
          id: "s1_b",
          label: "Ada latar belakang masalah, tapi perbandingan riset terkini belum disajikan sistematis",
          score: 15,
          fatalRisk: "Naskah berisiko tinggi langsung ditolak (Desk Reject) karena kontribusi kebaruan dianggap tidak jelas oleh Editor.",
          remedy: "Susun State-of-the-Art Research Matrix membandingkan 12-15 artikel terindeks Scopus/SINTA 2 terbitan 2022-2026."
        },
        {
          id: "s1_c",
          label: "Belum ada kajian naskah sejenis; masih berfokus pada masalah praktis di lokasi objek",
          score: 5,
          fatalRisk: "Ketiadaan teoritis gap membuat naskah dipandang sebagai laporan magang/skripsi biasa, bukan artikel ilmiah jurnal.",
          remedy: "Rekonstruksi Bab Pendahuluan menggunakan format gap fenomena vs teoritis dengan rujukan terbitan 5 tahun terakhir."
        }
      ]
    },
    {
      id: "sinta_method",
      pillar: "sinta",
      title: "Bagaimana kecukupan rasio sampel & kekuatan pengujian statistik Anda?",
      subtitle: "Penelitian kuantitatif memerlukan justifikasi ukuran sampel yang kokoh agar hasil valid.",
      options: [
        {
          id: "s2_a",
          label: "Memenuhi kaidah Hair et al. (5-10x jumlah indikator) / R-Tabel & Convergent Validity terpenuhi",
          score: 25
        },
        {
          id: "s2_b",
          label: "Jumlah sampel minimal batas bawah (N=30-50), belum uji asumsi klasik / model fit lengkap",
          score: 12,
          fatalRisk: "Model struktural rentan invalid (GFI, AGFI, atau AVE rendah) saat diuji di SmartPLS/SPSS/AMOS.",
          remedy: "Lakukan bootstrapping re-sampling dan eliminasi indikator dengan outer loading < 0.70 secara metodologis."
        },
        {
          id: "s2_c",
          label: "Data belum dikumpulkan secara terstandardisasi / kuesioner belum diuji pilot validitasnya",
          score: 5,
          fatalRisk: "Hasil interpretasi rentan bias dan mudah dibantah saat sesi review substantif dewan editor.",
          remedy: "Lakukan pilot study 30 responden untuk mengunci validitas Pearson Product Moment & Cronbach\'s Alpha > 0.70."
        }
      ]
    },
    {
      id: "sinta_references",
      pillar: "sinta",
      title: "Berapa persentase daftar pustaka yang berasal dari jurnal primer 5 tahun terakhir?",
      subtitle: "Jurnal SINTA 1/2 dan Scopus mensyaratkan minimal 80% rujukan artikel jurnal primer mutakhir.",
      options: [
        {
          id: "s3_a",
          label: "Lebih dari 80% jurnal bereputasi (< 5 tahun) dan dikelola otomatis via Mendeley / Zotero",
          score: 25
        },
        {
          id: "s3_b",
          label: "Sekitar 40-70% jurnal, sisanya buku teks terbitan lama dan prosiding seminar",
          score: 14,
          fatalRisk: "Sitasi usang menurunkan skor evaluasi kebaruan dan kredibilitas kajian literatur.",
          remedy: "Perbarui 15-20 sitasi buku teks menjadi artikel jurnal bereputasi ber-DOI aktif dari database Scopus/ScienceDirect."
        },
        {
          id: "s3_c",
          label: "Mayoritas buku teks lama, website/blog, dan naskah skripsi tanpa integrasi Mendeley",
          score: 5,
          fatalRisk: "Reviewer akan langsung meminta perbaikan total (Major Revision) atau menolak karena pustaka tidak primer.",
          remedy: "Migrasikan seluruh referensi ke metadata Mendeley Desktop/Csl dan prioritaskan artikel terbitan 2022–2026."
        }
      ]
    },
    {
      id: "sinta_turnitin",
      pillar: "sinta",
      title: "Berapa skor uji kemiripan (Turnitin) & target naskah Anda saat ini?",
      subtitle: "Ambang batas aman publikasi umumnya mensyaratkan skor similarity di bawah 20%.",
      options: [
        {
          id: "s4_a",
          label: "Turnitin terverifikasi < 15%, target publikasi SINTA 1-2 atau Scopus Q1-Q3",
          score: 20
        },
        {
          id: "s4_b",
          label: "Turnitin 20-30%, target SINTA 3-4 atau prosiding konferensi internasional",
          score: 10,
          fatalRisk: "Indeks kemiripan di atas 20% sering memicu penolakan otomatis oleh sistem editorial jurnal.",
          remedy: "Terapkan teknik parafrase akademis tingkat lanjut pada bagian Tinjauan Pustaka dan Pembahasan."
        },
        {
          id: "s4_c",
          label: "Turnitin belum dicek / > 35%, target naskah mendesak untuk syarat kelulusan/sidang",
          score: 0,
          fatalRisk: "Bahaya pelanggaran integritas akademik serius jika naskah terdeteksi memiliki plagiarisme kata demi kata.",
          remedy: "Lakukan audit Turnitin tanpa repository dan parafrase mendalam sebelum naskah diajukan ke kampus/jurnal."
        }
      ]
    }
  ],
  bisnis: [
    {
      id: "bisnis_unit_econ",
      pillar: "bisnis",
      title: "Bagaimana kejelasan model keuangan, BEP, dan proyeksi arus kas Anda?",
      subtitle: "Investor profesional menilai kelayakan proposal dari kalkulasi unit economics yang masuk akal.",
      options: [
        {
          id: "b1_a",
          label: "Lengkap dengan proyeksi arus kas 3 tahun, kalkulasi BEP (unit/rupiah), & rasio margin kontribusi",
          score: 30
        },
        {
          id: "b1_b",
          label: "Ada proyeksi omzet dan biaya umum, tetapi belum terurai ke analisis CAC vs LTV atau runway kas",
          score: 15,
          fatalRisk: "Investor institusi dan komite kredit bank akan meragukan ketahanan kas bisnis saat terjadi penurunan omzet.",
          remedy: "Bangun financial model dinamis yang memperlihatkan titik impas (BEP) dan skenario sensitivitas (optimis/moderat/pesimis)."
        },
        {
          id: "b1_c",
          label: "Baru sebatas estimasi laba kasar dan target omzet tanpa dasar perhitungan COGS/HPP yang valid",
          score: 5,
          fatalRisk: "Proposal dinilai tidak bankable dan tidak layak diajukan untuk pendanaan formal.",
          remedy: "Bedah struktur HPP riil per produk/layanan dan tetapkan margin kontribusi sebelum menyusun proposal pendanaan."
        }
      ]
    },
    {
      id: "bisnis_market",
      pillar: "bisnis",
      title: "Bagaimana Anda memetakan ukuran pasar (TAM/SAM/SOM) dan kompetisi?",
      subtitle: "Angka potensi pasar harus didukung sumber data terpercaya, bukan sekadar asumsi.",
      options: [
        {
          id: "b2_a",
          label: "Data TAM/SAM/SOM berbasis riset industri kredibel dan dilengkapi matriks keunggulan kompetitif",
          score: 25
        },
        {
          id: "b2_b",
          label: "Menyebutkan ukuran pasar umum industri, tetapi SOM (pasar realistis dijangkau) masih berupa estimasi",
          score: 12,
          fatalRisk: "Klaim potensi pasar yang terlalu fantastis tanpa bukti penetrasi membuat investor kehilangan kepercayaan.",
          remedy: "Persempit SOM berbasis kapasitas armada/gerai tahun pertama dan analisis profil pembeli spesifik."
        },
        {
          id: "b2_c",
          label: "Belum membagi ukuran pasar secara sistematis; menganggap belum ada kompetitor sejenis",
          score: 5,
          fatalRisk: "Menyatakan 'tidak ada kompetitor' merupakan tanda bahaya utama bagi reviewer proposal bisnis.",
          remedy: "Susun tabel matriks posisi kompetitif (2x2) membandingkan keunggulan harga, kecepatan, dan kualitas produk."
        }
      ]
    },
    {
      id: "bisnis_traction",
      pillar: "bisnis",
      title: "Seberapa kuat validasi pasar atau bukti penjualan yang dapat dilampirkan?",
      subtitle: "Traksi nyata membuktikan bahwa pasar bersedia membayar produk/jasa Anda.",
      options: [
        {
          id: "b3_a",
          label: "Sudah mencetak pendapatan rutin (revenue-generating) dengan pertumbuhan bulanan tercatat rapi",
          score: 25
        },
        {
          id: "b3_b",
          label: "Sudah memiliki bukti transaksi awal / pilot project berbayar, namun belum stabil setiap bulan",
          score: 14,
          fatalRisk: "Calon mitra atau investor akan mempertanyakan konsistensi retensi pelanggan dan siklus penjualan.",
          remedy: "Dokumentasikan data testimoni kepuasan klien, riwayat repeat-order, dan LOI (Letter of Intent) kemitraan."
        },
        {
          id: "b3_c",
          label: "Masih dalam tahap ide/konsep purwarupa (pre-revenue) tanpa validasi pembayaran nyata",
          score: 5,
          fatalRisk: "Valuasi bisnis sulit dijustifikasi tanpa adanya komitmen finansial dari pengguna awal.",
          remedy: "Fokuskan pitch deck pada validasi masalah nyata dan kekuatan rekam jejak tim pendiri mengeksekusi solusi."
        }
      ]
    },
    {
      id: "bisnis_purpose",
      pillar: "bisnis",
      title: "Apa target audiens atau tujuan utama presentasi proposal Anda?",
      subtitle: "Penekanan narasi pitch deck berbeda drastis antara investor ekuitas dan perbankan.",
      options: [
        {
          id: "b4_a",
          label: "Presentasi investor modal ventura / angel investor tahap pendanaan awal (Pre-seed / Seed)",
          score: 20
        },
        {
          id: "b4_b",
          label: "Pengajuan pinjaman perbankan / modal kerja / hibah kompetisi bisnis nasional",
          score: 20
        },
        {
          id: "b4_c",
          label: "Proposal penawaran kemitraan B2B / proposal tender pengadaan korporat",
          score: 18
        },
        {
          id: "b4_d",
          label: "Panduan internal direksi untuk kelayakan pembukaan cabang / diversifikasi produk baru",
          score: 15
        }
      ]
    }
  ],
  sop: [
    {
      id: "sop_spof",
      pillar: "sop",
      title: "Seberapa besar operasional harian bergantung pada figur pimpinan / pemilik?",
      subtitle: "Bisnis yang tidak bisa berjalan tanpa kehadiran owner memiliki nilai valuasi rendah.",
      options: [
        {
          id: "o1_a",
          label: "Operasional berjalan mandiri melalui SOP tertulis & pimpinan hanya fokus pada arah strategis",
          score: 30
        },
        {
          id: "o1_b",
          label: "Sebagian alur berjalan, tetapi persetujuan penting dan penanganan masalah tetap harus ke pimpinan",
          score: 15,
          fatalRisk: "Terjadi kemacetan alur kerja (bottleneck) saat order melonjak karena pimpinan kewalahan mengurus hal mikro.",
          remedy: "Rumuskan batas wewenang otorisasi (approval matrix) yang jelas untuk level manajer dan staf senior."
        },
        {
          id: "o1_c",
          label: "Bisnis terancam terhenti jika pimpinan berhalangan; instruksi kerja masih bersifat lisan",
          score: 5,
          fatalRisk: "Ketergantungan personil kritis akut: pergantian staf baru akan langsung memicu kekacauan layanan klien.",
          remedy: "Kodifikasikan 5 proses bisnis paling vital menjadi dokumen SOP Standar lengkap dengan flowchart alur."
        }
      ]
    },
    {
      id: "sop_raci",
      pillar: "sop",
      title: "Apakah sudah ada uraian tugas tertulis (Jobdesc & Matriks RACI) di setiap divisi?",
      subtitle: "Ketidakjelasan batas wewenang memicu saling lempar tanggung jawab saat timbul komplain.",
      options: [
        {
          id: "o2_a",
          label: "Tiap personil memegang jobdesc formal, indikator KPI terukur, dan rantai komando jelas",
          score: 25
        },
        {
          id: "o2_b",
          label: "Ada uraian tugas umum, tetapi batas tanggung jawab antar-divisi sering tumpang tindih saat ada kendala",
          score: 12,
          fatalRisk: "Saling menyalahkan antar-tim saat terjadi kesalahan pengiriman atau keluhan mutu layanan.",
          remedy: "Implementasikan RACI Matrix (Responsible, Accountable, Consulted, Informed) untuk setiap titik serah-terima kerja."
        },
        {
          id: "o2_c",
          label: "Staf bekerja serabutan mengerjakan apa saja sesuai instruksi harian tanpa batasan tugas baku",
          score: 5,
          fatalRisk: "Pemborosan jam kerja operasional dan sulit mengukur performa kerja karyawan secara objektif.",
          remedy: "Petakan struktur organisasi resmi dan terbitkan lembar tanggung jawab tugas pokok dan fungsi (Tupoksi)."
        }
      ]
    },
    {
      id: "sop_compliance",
      pillar: "sop",
      title: "Bagaimana sistem tata kelola arsip, dokumen perjanjian kerja, dan keamanan data?",
      subtitle: "Kekuatan legalitas melindungi bisnis Anda dari sengketa ketenagakerjaan dan kebocoran rahasia.",
      options: [
        {
          id: "o3_a",
          label: "Tersimpan rapi di cloud terenkripsi, hak akses bertingkat, dan perjanjian kerahasiaan (NDA) lengkap",
          score: 25
        },
        {
          id: "o3_b",
          label: "Dokumen tersebar di komputer masing-masing staf; kontrak kerja karyawan belum semua diperbarui",
          score: 12,
          fatalRisk: "Risiko kehilangan file penting saat komputer rusak atau staf mengundurkan diri membawa database klien.",
          remedy: "Sentralisasikan seluruh file ke penyimpanan cloud tim dengan struktur folder terstandardisasi per departemen."
        },
        {
          id: "o3_c",
          label: "Belum ada kontrak kerja formal (PKWT/PKWTT), tidak ada klausul NDA, arsip masih berceceran fisik",
          score: 5,
          fatalRisk: "Kerentanan hukum tinggi bila terjadi gugatan ketenagakerjaan atau penyalahgunaan data rahasia usaha.",
          remedy: "Standardisasi draf Perjanjian Kerja Waktu Tertentu (PKWT) dan pakta kepatuhan kerahasiaan data perusahaan."
        }
      ]
    },
    {
      id: "sop_scale",
      pillar: "sop",
      title: "Berapa skala tim Anda saat ini dan proyeksi pertumbuhan operasional ke depan?",
      subtitle: "Sistem yang baik harus dirancang mampu menampung pertumbuhan tanpa menambah kekacauan.",
      options: [
        {
          id: "o4_a",
          label: "Tim 15-50+ orang dan sedang bersiap ekspansi cabang / rekrutmen divisi baru",
          score: 20
        },
        {
          id: "o4_b",
          label: "Tim 5-14 orang dan sedang menata standardisasi agar operasional lebih tertib",
          score: 16
        },
        {
          id: "o4_c",
          label: "Tim < 5 orang dan baru mulai meletakkan pondasi sistem kerja profesional",
          score: 12
        }
      ]
    }
  ],
  web: [
    {
      id: "web_cwv",
      pillar: "web",
      title: "Bagaimana kecepatan muat halaman website Anda di perangkat smartphone (Mobile)?",
      subtitle: "Google memprioritaskan skor mobile LCP < 2.5s dalam Core Web Vitals untuk penentuan peringkat.",
      options: [
        {
          id: "w1_a",
          label: "Website terbuka instan di HP (< 2 detik) dan skor Google PageSpeed di atas 85",
          score: 30
        },
        {
          id: "w1_b",
          label: "Kecepatan di laptop terasa cukup cepat, namun di HP koneksi seluler terasa lambat (3-5 detik)",
          score: 15,
          fatalRisk: "LCP lambat (>2.5 detik) menyebabkan lebih dari 50% calon pembeli mobile pergi sebelum melihat produk Anda.",
          remedy: "Optimalisasi format gambar ke WebP/AVIF, minimalkan script pelacak pihak ketiga, dan manfaatkan CDN Edge."
        },
        {
          id: "w1_c",
          label: "Loading terasa sangat berat (> 5 detik); sering mengalami pergeseran tata letak saat dibuka di HP",
          score: 5,
          fatalRisk: "Tingginya bounce rate merugikan biaya iklan Anda dan membuat website terlempar dari halaman pertama Google.",
          remedy: "Migrasikan arsitektur website ke teknologi modern (Next.js 15 / Jamstack) dengan skor performa terjamin."
        }
      ]
    },
    {
      id: "web_seo_arch",
      pillar: "web",
      title: "Apakah website sudah memiliki struktur metadata & schema terhubung (JSON-LD)?",
      subtitle: "Schema.org membantu mesin pencari Google dan AI Search (AEO) memahami kredibilitas bisnis Anda.",
      options: [
        {
          id: "w2_a",
          label: "Lengkap dengan Schema Person/Organization, Breadcrumbs, OpenGraph medsos, dan sitemap XML otomatis",
          score: 25
        },
        {
          id: "w2_b",
          label: "Sudah ada plugin SEO standar (Yoast/RankMath), tapi metadata OpenGraph sering tidak memunculkan gambar di WhatsApp",
          score: 12,
          fatalRisk: "Tautan website yang dibagikan ke WhatsApp/medsos terlihat tidak profesional karena gambar preview rusak.",
          remedy: "Pasang static OpenGraph image 1200x630px dengan rasio aspek teruji dan inject Schema JSON-LD eksplisit."
        },
        {
          id: "w2_c",
          label: "Belum memasang pengaturan SEO sama sekali; judul dan deskripsi masih bawaan template website",
          score: 5,
          fatalRisk: "Website tidak dapat bersaing di pencarian organik dan sulit ditemukan oleh calon pelanggan yang mencari jasa Anda.",
          remedy: "Rancang siloing kata kunci spesifik dan pasang meta tag terstruktur untuk seluruh halaman penting."
        }
      ]
    },
    {
      id: "web_conversion",
      pillar: "web",
      title: "Bagaimana integrasi konversi pengunjung menjadi prospek chat WhatsApp?",
      subtitle: "Website profesional harus mengubah traffic menjadi percakapan penjualan secara natural.",
      options: [
        {
          id: "w3_a",
          label: "Tersedia tombol aksi cepat dengan teks prefilled otomatis sesuai topik yang dibaca pengunjung",
          score: 25
        },
        {
          id: "w3_b",
          label: "Hanya ada tautan nomor HP atau tombol WhatsApp biasa tanpa prefilled pesan kebutuhan",
          score: 14,
          fatalRisk: "Calon klien sering bingung memulai percakapan sehingga batal mengirim pesan konsultasi.",
          remedy: "Pasang smart CTA dengan parameter pesan dinamis sehingga Anda langsung mengetahui asal halaman klien."
        },
        {
          id: "w3_c",
          label: "Pengunjung hanya diarahkan ke form email kontak panjang yang jarang diisi oleh pengguna mobile",
          score: 5,
          fatalRisk: "Tingginya friksi formulir panjang memangkas konversi penjualan hingga 80% pada pengguna Indonesia.",
          remedy: "Gantikan form kaku dengan tombol interaksi 1-tap WhatsApp yang ramah pengguna mobile."
        }
      ]
    },
    {
      id: "web_pseo",
      pillar: "web",
      title: "Apakah website Anda memiliki halaman penangkap kata kunci spesifik (Programmatic SEO)?",
      subtitle: "Menjaring traffic bernilai tinggi memerlukan halaman solusi spesifik untuk setiap intent pencarian.",
      options: [
        {
          id: "w4_a",
          label: "Memiliki katalog solusi berstruktur matriks atau artikel komparasi untuk menjaring puluhan kueri kata kunci",
          score: 20
        },
        {
          id: "w4_b",
          label: "Hanya memiliki 4-5 halaman utama (Home, About, Services, Contact) tanpa konten spesifik berkala",
          score: 12,
          fatalRisk: "Peluang mendapatkan klien dari pencarian kueri panjang (long-tail keywords) terbuang sia-sia.",
          remedy: "Kembangkan halaman matriks solusi spesifik (misal: pilar studi kasus & perbandingan alternatif solusi)."
        },
        {
          id: "w4_c",
          label: "Website berupa landing page satu halaman (single-page) tanpa halaman pendukung",
          score: 8
        }
      ]
    }
  ]
};

export function calculateQuestionnaireScore(
  pillar: DiagnosticPillar,
  selectedOptionIds: Record<string, string>
): DiagnosticResult {
  const questions = DIAGNOSTIC_QUESTIONS[pillar] || [];
  let totalScore = 0;
  let maxPossibleScore = 0;
  const fatalVulnerabilities: string[] = [];
  const remediationSteps: string[] = [];

  const metricsBreakdown = questions.map((q) => {
    const selectedId = selectedOptionIds[q.id];
    const selectedOpt = q.options.find((opt) => opt.id === selectedId) || q.options[q.options.length - 1];
    const questionMax = Math.max(...q.options.map((o) => o.score));

    totalScore += selectedOpt.score;
    maxPossibleScore += questionMax;

    if (selectedOpt.fatalRisk) {
      fatalVulnerabilities.push(selectedOpt.fatalRisk);
    }
    if (selectedOpt.remedy) {
      remediationSteps.push(selectedOpt.remedy);
    }

    const ratio = selectedOpt.score / questionMax;
    return {
      label: q.title,
      score: selectedOpt.score,
      maxScore: questionMax,
      status: (ratio >= 0.8 ? "good" : ratio >= 0.5 ? "warning" : "danger") as "good" | "warning" | "danger"
    };
  });

  const normalizedScore = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 50;

  let grade: "A" | "B" | "C" | "D" = "C";
  let statusTitle = "Rentan Gesekan & Butuh Optimasi";
  let statusDescription = "Ditemukan sejumlah celah kritis yang dapat menghambat persetujuan atau menurunkan konversi.";

  if (normalizedScore >= 85) {
    grade = "A";
    statusTitle = "Sangat Siap & Berdaya Saing Tinggi";
    statusDescription = "Struktur dasar Anda sudah kokoh dan memenuhi standar profesional industri.";
  } else if (normalizedScore >= 70) {
    grade = "B";
    statusTitle = "Fondasi Cukup Baik dengan Celah Minor";
    statusDescription = "Ada beberapa aspek teknis penting yang perlu disempurnakan agar tidak menjadi hambatan evaluasi.";
  } else if (normalizedScore < 50) {
    grade = "D";
    statusTitle = "Tingkat Risiko Kritis (Butuh Remediasi Total)";
    statusDescription = "Naskah atau sistem Anda saat ini memiliki kerentanan fatal yang berisiko tinggi memicu penolakan langsung.";
  }

  const pillarInfo = DIAGNOSTIC_PILLARS.find((p) => p.id === pillar);
  const pillarLabel = pillarInfo ? pillarInfo.title : pillar;

  const waPrefill = [
    `Halo Mas Zadit, saya baru saja menjalankan Asesmen Diagnostik di zadit.pages.dev/audit.`,
    ``,
    `*Hasil Ringkasan Audit:*`,
    `• Kategori: ${pillarLabel}`,
    `• Skor Kesiapan: ${normalizedScore}/100 (Predikat: ${grade} - ${statusTitle})`,
    fatalVulnerabilities.length > 0 ? `• Titik Lemah Kritis: ${fatalVulnerabilities[0].slice(0, 90)}...` : "",
    ``,
    `Saya ingin berdiskusi mengenai langkah perbaikan rinci dan estimasi bantuan penyelesaian bersama Mas Zadit.`
  ].filter(Boolean).join("\n");

  return {
    pillar,
    pillarLabel,
    overallScore: normalizedScore,
    grade,
    statusTitle,
    statusDescription,
    fatalVulnerabilities: fatalVulnerabilities.slice(0, 3),
    remediationSteps: remediationSteps.slice(0, 3),
    waPrefillText: waPrefill,
    metricsBreakdown
  };
}

export async function runLiveWebSpeedAudit(targetUrl: string): Promise<DiagnosticResult> {
  let cleanUrl = targetUrl.trim();
  if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
    cleanUrl = `https://${cleanUrl}`;
  }

  try {
    const apiUrl = `/api/audit`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(apiUrl, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: cleanUrl }),
      signal: controller.signal 
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      let errMsg = `Audit API Error: HTTP ${res.status}`;
      try {
        const errData = await res.json();
        if (errData.error) errMsg = errData.error;
      } catch (e) {}
      throw new Error(errMsg);
    }

    const data = await res.json();

    if (data.error) {
       throw new Error(data.error);
    }

    const perfScore = data.score || 0;
    const seoScore = data.seo || 0;
    const a11yScore = data.accessibility || 0;
    const lcp = data.lcp || "N/A";
    const cls = data.cls || "N/A";
    const fcp = data.fcp || "N/A";
    const latencyMs = data.latencyMs || 0;

    const overallScore = Math.round(perfScore * 0.5 + seoScore * 0.3 + a11yScore * 0.2);

    const fatalVulnerabilities: string[] = data.vulnerabilities || [];
    const remediationSteps: string[] = [];

    if (perfScore < 60) {
      if (!fatalVulnerabilities.some(v => v.includes("Skor performa mobile tergolong lambat"))) {
        fatalVulnerabilities.push(
          `Skor performa mobile tergolong lambat (${perfScore}/100, LCP: ${lcp}). Pengunjung mobile cenderung langsung meninggalkan halaman sebelum penawaran terbaca.`
        );
      }
      remediationSteps.push(
        "Kompresi aset visual ke format WebP/AVIF serta defer script analitik pihak ketiga yang membebani thread utama."
      );
    }

    if (cls !== "N/A" && parseFloat(cls) > 0.1) {
      fatalVulnerabilities.push(
        `Cumulative Layout Shift terdeteksi tinggi (${cls}). Elemen tombol atau teks bergeser saat dimuat, mengganggu pengunjung dan penalti Core Web Vitals.`
      );
      remediationSteps.push(
        "Tetapkan dimensi eksplisit (width & height) pada gambar dan banner untuk mencegah pergeseran tata letak (CLS)."
      );
    }

    if (seoScore < 80) {
      if (!fatalVulnerabilities.some(v => v.includes("Skor SEO on-page"))) {
         fatalVulnerabilities.push(
          `Skor SEO on-page (${seoScore}/100) menunjukkan adanya kelemahan meta deskripsi, canonical URL, atau struktur heading mesin pencari.`
         );
      }
      remediationSteps.push(
        "Lengkapi tag meta OpenGraph, Canonical URL, dan Schema.org JSON-LD agar tautan terindeks sempurna di Google dan rapi saat dibagikan ke WhatsApp."
      );
    }

    if (fatalVulnerabilities.length === 0) {
      fatalVulnerabilities.push("Performa web sudah baik, namun perlu peningkatan halaman pSEO dan smart WhatsApp conversion dock.");
      remediationSteps.push("Pasang smart CTA conversion dock berbasis intent agar pengunjung terkonversi menjadi chat prospek.");
    }

    let grade: "A" | "B" | "C" | "D" = "C";
    let statusTitle = "Performa Mobile Butuh Akselerasi";
    let statusDescription = `Website ${cleanUrl} memerlukan perbaikan kecepatan muat dan optimasi Core Web Vitals.`;

    if (overallScore >= 85) {
      grade = "A";
      statusTitle = "Kecepatan Mobile Sangat Optimal";
      statusDescription = `Website ${cleanUrl} memiliki respon cepat dan memenuhi standar Google Core Web Vitals.`;
    } else if (overallScore >= 70) {
      grade = "B";
      statusTitle = "Performa Cukup dengan Ruang Optimasi";
      statusDescription = `Website ${cleanUrl} berjalan cukup baik namun masih memiliki hambatan pada kecepatan render mobile.`;
    } else if (overallScore < 50) {
      grade = "D";
      statusTitle = "Kecepatan Kritis (Potensi Kehilangan Klien Tinggi)";
      statusDescription = `Loading website ${cleanUrl} sangat lambat di perangkat ponsel, memicu tingginya bounce rate calon pembeli.`;
    }

    if (data.fallback) {
      statusTitle += " (Server Probe)";
      statusDescription += ` (Skor Dihitung via Heuristik Probe: Latency ${latencyMs}ms)`;
    }

    const waPrefill = [
      `Halo Mas Zadit, saya baru saja menguji website ${cleanUrl} di Tool Audit zadit.pages.dev/audit.`,
      ``,
      `*Hasil Pengujian Google PageSpeed Mobile:*`,
      `• Skor Performa: ${perfScore}/100 (LCP: ${lcp}, CLS: ${cls})`,
      `• Skor SEO: ${seoScore}/100 | Aksesibilitas: ${a11yScore}/100`,
      `• Skor Keseluruhan: ${overallScore}/100 (${grade})`,
      fatalVulnerabilities.length > 0 ? `• Celah Kritis: ${fatalVulnerabilities[0].slice(0, 90)}...` : "",
      ``,
      `Saya ingin konsultasi optimasi kecepatan dan perbaikan SEO website kami bersama Mas Zadit.`
    ].filter(Boolean).join("\n");

    return {
      pillar: "web",
      pillarLabel: data.fallback ? "Web & Keamanan DNS Server Probe" : "Web & Core Web Vitals Live Audit",
      overallScore,
      grade,
      statusTitle,
      statusDescription,
      fatalVulnerabilities,
      remediationSteps,
      waPrefillText: waPrefill,
      metricsBreakdown: [
        {
          label: "Kecepatan Performa Mobile",
          score: perfScore,
          maxScore: 100,
          status: perfScore >= 80 ? "good" : perfScore >= 50 ? "warning" : "danger"
        },
        {
          label: "Kesehatan SEO On-Page",
          score: seoScore,
          maxScore: 100,
          status: seoScore >= 80 ? "good" : seoScore >= 60 ? "warning" : "danger"
        },
        {
          label: "Standar Aksesibilitas Web",
          score: a11yScore,
          maxScore: 100,
          status: a11yScore >= 80 ? "good" : a11yScore >= 60 ? "warning" : "danger"
        }
      ],
      rawMetrics: {
        url: cleanUrl,
        lcp,
        cls,
        fcp,
        performanceScore: perfScore,
        seoScore,
        a11yScore,
        isLiveAnalyzed: true
      }
    };
  } catch (error: any) {
    console.error("Critical failure calling /api/audit:", error);
    
    const waPrefill = [
      `Halo Mas Zadit, saya menguji website ${cleanUrl} di zadit.pages.dev/audit namun terjadi kegagalan sistem.`,
      `Saya ingin meminta audit manual dari Mas Zadit untuk Core Web Vitals website kami.`
    ].join("\n");

    return {
      pillar: "web",
      pillarLabel: "Web & Core Web Vitals (Error)",
      overallScore: 0,
      grade: "D",
      statusTitle: "Pemeriksaan Gagal Dijalankan",
      statusDescription: `Terjadi kendala teknis saat mengaudit ${cleanUrl}: ${error.message || "Unknown Error"}`,
      fatalVulnerabilities: [
        "Sistem tidak dapat menghubungi layanan audit. Pastikan URL valid dan dapat diakses secara publik, serta bukan alamat IP internal."
      ],
      remediationSteps: [
        "Coba gunakan URL lain atau hubungi konsultan untuk audit manual."
      ],
      waPrefillText: waPrefill,
      metricsBreakdown: [
        { label: "Ketersediaan Layanan", score: 0, maxScore: 100, status: "danger" }
      ],
      rawMetrics: {
        url: cleanUrl,
        isLiveAnalyzed: false
      }
    };
  }
}
