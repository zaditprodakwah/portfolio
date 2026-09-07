// lib/ai-knowledge.ts
export interface QuickPrompt {
  id: string;
  label: { id: string; en: string };
  question: { id: string; en: string };
  answer: { id: string; en: string };
}

export const quickPrompts: QuickPrompt[] = [
  {
    id: 'pillars',
    label: {
      id: '✨ 4 Pilar Layanan Zadit',
      en: '✨ 4 Core Solution Pillars'
    },
    question: {
      id: 'Apa saja 4 pilar solusi utama yang ditawarkan oleh Zadit?',
      en: 'What are the 4 main solution pillars offered by Zadit?'
    },
    answer: {
      id: 'Zadit menyediakan 4 pilar solusi terpadu: (1) Dokumen Bisnis & Proposal Eksekutif: penyusunan proposal kemitraan bisnis, pitch deck investor, studi kelayakan, dan pemetaan rantai pasok; (2) SEO & Pertumbuhan Konten Konversi: riset kata kunci berniat beli tinggi, audit on-page, artikel edukatif, dan structured schema; (3) Riset Akademik & Olah Data Statistik: analisis kuantitatif SPSS/Python, pemodelan matematika, dan pendampingan publikasi jurnal SINTA; (4) Solusi Digital & Web Cepat: pembuatan dan optimasi website yang cepat, aman, dan responsif ponsel (WordPress, Webflow, atau web kustom).',
      en: 'Zadit provides 4 integrated solution pillars: (1) Executive Business Proposals & Pitch Decks: funding proposals, investor pitch decks, feasibility studies, and supply chain blueprints; (2) SEO & High-Converting Content: commercial intent keyword discovery, on-page health, and authority articles; (3) Academic Research & Statistical Analysis: SPSS/Python quantitative modeling and guidance for SINTA accredited journal publishing; (4) High-Performance Web Solutions: lightweight, secure, and mobile-first website optimization tailored to client platforms.'
    }
  },
  {
    id: 'b2b-seo',
    label: {
      id: '📈 Hasil SEO & Leads Klien',
      en: '📈 Client SEO & Lead Outcomes'
    },
    question: {
      id: 'Bagaimana pendekatan Zadit dalam meningkatkan calon pelanggan dari SEO?',
      en: 'How does Zadit approach driving qualified leads from SEO?'
    },
    answer: {
      id: 'Zadit berfokus pada kata kunci berniat beli tinggi (high commercial intent), bukan sekadar angka kunjungan semu. Dengan merapikan navigasi halaman, menyusun konten persuasif yang menjawab problem audiens, dan menambahkan FAQ terstruktur untuk merebut Google Rich Snippets, klien berhasil meraih posisi Top 3 Google serta lonjakan calon pelanggan (+140% leads) dengan rasio klik organik mencapai 16.8%. Termasuk rekam jejak meraih Juara 3 Kontes SEO Nasional WOM Finance.',
      en: 'Zadit focuses strictly on high-intent buyer keywords rather than vanity traffic metrics. By streamlining landing page UX, crafting persuasive copy addressing pain points, and embedding structured FAQ schemas for Google Rich Snippets, clients have achieved Top 3 Google rankings and a +140% surge in qualified leads with a 16.8% organic CTR, alongside winning 3rd place in the National WOM Finance SEO Championship.'
    }
  },
  {
    id: 'academic-research',
    label: {
      id: '🎓 Jurnal SINTA & Olah Data',
      en: '🎓 SINTA Publishing & Statistics'
    },
    question: {
      id: 'Bagaimana layanan pengolahan data statistik dan pendampingan jurnal SINTA?',
      en: 'How does the statistical data analysis and SINTA journal consulting work?'
    },
    answer: {
      id: 'Berlatar belakang pendidikan matematika dan pengalaman analitik, Zadit mendampingi dosen, mahasiswa pascasarjana, dan peneliti dalam uji validitas, reliabilitas instrumen, korelasi, regresi, hingga uji hipotesis menggunakan SPSS dan Python. Naskah diselaraskan dengan pedoman selingkung jurnal target terakreditasi SINTA (SINTA 2 hingga SINTA 4) dan didampingi hingga tahap revisi reviewer.',
      en: 'Grounded in mathematics education and quantitative analysis, Zadit assists faculty and graduate scholars with instrument validity, reliability testing, regression, and hypothesis modeling using SPSS and Python. Manuscripts are aligned with target SINTA accredited journal guidelines (SINTA 2 through SINTA 4) through peer-review revisions.'
    }
  },
  {
    id: 'proposal-business',
    label: {
      id: '📑 Proposal & Pitch Deck',
      en: '📑 Proposals & Pitch Decks'
    },
    question: {
      id: 'Apakah Zadit bisa membantu pembuatan proposal bisnis atau pitch deck kemitraan?',
      en: 'Can Zadit assist in crafting business proposals or investor pitch decks?'
    },
    answer: {
      id: 'Tentu. Zadit berpengalaman menyusun proposal kemitraan usaha dari nol, termasuk studi kelayakan, proyeksi arus kas operasional 5 tahun, dan visualisasi slide presentasi (PPT/Keynote/PDF) untuk diajukan ke investor atau direksi, seperti pada studi kasus sektor agribisnis dan UMKM dengan rating 5.0 bintang dari klien di Sribu.',
      en: 'Yes. Zadit creates board-ready partnership proposals from scratch, including operational feasibility studies, 5-year financial projections, and executive slide decks for investors and executive committees, demonstrated across agribusiness and SME client projects with a verified 5.0 rating on Sribu.'
    }
  },
  {
    id: 'consultation-contact',
    label: {
      id: '🤝 Cara Memulai Kerjasama',
      en: '🤝 How to Start a Project'
    },
    question: {
      id: 'Bagaimana cara berkonsultasi atau mengajukan proyek kepada Zadit?',
      en: 'How can I discuss a project or start collaborating with Zadit?'
    },
    answer: {
      id: 'Anda dapat menggunakan formulir konsultasi cepat di situs ini yang langsung merangkum kebutuhan Anda ke WhatsApp di +62 823-1636-3177 atau mengirim email ke muhzadit@gmail.com. Tersedia juga paket Audit Awal, Eksekusi Terpandu, maupun Retainer berkala.',
      en: 'You can use the quick intake builder on this site to automatically format your project summary into WhatsApp (+62 823-1636-3177) or email muhzadit@gmail.com. Engagement options include Initial Audits, Guided Execution, and Ongoing Retainers.'
    }
  }
];

export const zaditSystemPrompt = `Anda adalah asisten AI perwakilan resmi dari Muhammad Khoiruzzadittaqwa (Zadit).
Tugas Anda adalah menjawab pertanyaan pengunjung situs zadit.pages.dev mengenai profil, pengalaman kerja, 4 pilar layanan, dan cara bekerjasama secara profesional, santun, akurat, dan mudah dipahami oleh audiens non-teknis.

Profil & Data Fakta Zadit:
- Nama: Muhammad Khoiruzzadittaqwa (Zadit).
- Gelar/Profesi: Konsultan Pertumbuhan, Dokumen Bisnis & Riset Terpadu (Strategic Growth, Business & Research Consultant).
- Pengalaman: 10+ tahun aktif sejak 2015.
- Reputasi: Terverifikasi di Sribu (Rating 5.0 dari 5.0 bintang, 100% on-time delivery).
- Latar Belakang Pendidikan: Pendidikan Matematika (analisis kuantitatif, logika terstruktur, pemodelan data).
- Pengalaman Lembaga: Sekretaris Eksekutif Yayasan Al-Bahjah (tata kelola administrasi, koordinasi program publik).
- 4 Pilar Solusi:
  1. Dokumen Bisnis & Proposal Eksekutif (Pitch deck, studi kelayakan, kemitraan agribisnis/UMKM).
  2. SEO & Pertumbuhan Konten Konversi (Riset kata kunci komersial, on-page, FAQ schema, leads B2B nyata, juara 3 kontes SEO nasional WOM Finance).
  3. Riset Akademik & Olah Data Statistik (Uji instrumen, regresi, SPSS/Python, publikasi jurnal terakreditasi SINTA).
  4. Solusi Digital & Web Cepat (Optimasi kecepatan website, responsif ponsel, ramah aksesibilitas A11y 100%, beradaptasi dengan stack klien baik WordPress maupun kustom).
- Kontak: WhatsApp (+62 823-1636-3177), Email (muhzadit@gmail.com), Sribu (https://www.sribu.com/id/users/muhzadit).

Aturan Komunikasi:
- Bersikap ramah, solutif, dan profesional.
- Gunakan bahasa yang sesuai dengan bahasa pertanyaan pengunjung (Bahasa Indonesia atau English).
- Hindari jargon teknis yang tidak perlu bagi klien non-teknis. Jelaskan manfaat nyata bagi bisnis atau riset mereka.
- Jangan gunakan tanda hubung em-dash ("—").
- Selalu arahkan pengunjung untuk menggunakan formulir konsultasi di halaman atau mengklik tombol WhatsApp untuk berdiskusi langsung dengan Zadit.`;
