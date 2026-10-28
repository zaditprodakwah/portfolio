import { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  FileText,
  BarChart3,
  Search,
  Wrench,
  MessageSquare,
  ShieldCheck,
  Building2,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { getCanonicalUrl } from "@/lib/canonical-registry";
import { SolusiCalculator } from "@/components/SolusiCalculator";

export const metadata: Metadata = {
  title: "Layanan & Solusi Digital | Mulai dari Rp300rb -- Zadit",
  description:
    "Website bisnis, SEO, dokumen resmi, olah data, dan audit digital untuk UMKM, perusahaan, yayasan, dan peneliti di Indonesia. Mulai dari Rp300rb sudah termasuk domain.",
  alternates: {
    canonical: getCanonicalUrl("/paket-solusi/"),
  },
  openGraph: {
    title: "Layanan & Solusi Digital | Mulai dari Rp300rb -- Zadit",
    description:
      "Website bisnis, SEO, dokumen resmi, olah data, dan audit digital. Termin 50:50, NDA tersedia, legalitas PT resmi.",
    url: getCanonicalUrl("/paket-solusi/"),
    type: "website",
  },
};

const layanan = [
  {
    id: "website-bisnis",
    icon: Globe,
    judul: "Website Bisnis & Undangan Digital",
    cerita:
      "Seorang pembeli di Instagram menanyakan: \"Ada websitenya gak, Kak?\" Tanpa website, deal sering batal di sini. Kami bangun halaman bisnis yang memuat profil, layanan, dan kontak -- tanpa biaya server bulanan, tidak down saat ramai pengunjung, dan tampil profesional di Google.",
    contoh: [
      "Landing page produk atau jasa",
      "Company profile & portofolio",
      "Toko online sederhana",
      "Website undangan acara & digital card",
    ],
    mulaiDari: "300.000",
    href: "/landing-300rb/",
  },
  {
    id: "seo-visibilitas",
    icon: Search,
    judul: "SEO & Visibilitas di Google",
    cerita:
      "Kompetitor Anda muncul di halaman pertama Google. Anda tidak. Bukan karena produk mereka lebih baik -- tapi karena mereka mengoptimalkan konten untuk pencarian. Kami riset kata kunci yang relevan, audit kompetitor, dan bangun strategi agar bisnis Anda ditemukan lebih dulu.",
    contoh: [
      "Riset kata kunci & analisis kompetitor",
      "Audit SEO teknis website yang ada",
      "Optimasi konten & meta halaman",
      "Laporan visibilitas berkala",
    ],
    mulaiDari: "750.000",
    href: "/layanan/seo-konten-konversi/",
  },
  {
    id: "dokumen-resmi",
    icon: FileText,
    judul: "Dokumen Bisnis & Administratif",
    cerita:
      "Proposal investor Anda ditolak bukan karena ide yang kurang bagus, tapi karena dokumennya tidak meyakinkan. Atau yayasan Anda butuh profil lembaga, SOP operasional, dan laporan tahunan yang rapi -- tapi tidak ada staf yang menguasainya. Kami kerjakan dari nol, format profesional, siap cetak.",
    contoh: [
      "Proposal bisnis & investasi",
      "Profil perusahaan & lembaga",
      "SOP operasional & tata kelola yayasan",
      "Dokumen akreditasi & laporan resmi",
    ],
    mulaiDari: "500.000",
    href: "/layanan/dokumen-administrasi-bisnis/",
  },
  {
    id: "olah-data",
    icon: BarChart3,
    judul: "Olah Data & Analitik",
    cerita:
      "Data sudah terkumpul di spreadsheet, tapi angka-angkanya belum bicara apapun. Atau Anda butuh data dari sumber eksternal yang tidak tersedia secara manual. Kami proses data SPSS, mining, scraping, hingga laporan riset dan publikasi SINTA -- dengan metodologi yang bisa dipertanggungjawabkan.",
    contoh: [
      "Olah data SPSS & statistika inferensial",
      "Data scraping & mining terstruktur",
      "Laporan riset & visualisasi data",
      "Pendampingan publikasi jurnal SINTA",
    ],
    mulaiDari: "400.000",
    href: "/layanan/olah-data-statistik-sinta/",
  },
  {
    id: "audit-web",
    icon: Wrench,
    judul: "Audit & Perbaikan Website",
    cerita:
      "Website sudah ada, tapi lambat, tidak muncul di Google, atau tampilannya berantakan di HP. Sebelum bikin dari awal (yang lebih mahal), kami audit dulu: cari titik lemahnya, buat laporan prioritas, dan perbaiki yang paling berdampak.",
    contoh: [
      "Audit kecepatan & Core Web Vitals",
      "Perbaikan tampilan mobile",
      "Optimasi gambar & performa halaman",
      "Laporan audit teknis lengkap",
    ],
    mulaiDari: "350.000",
    href: "/layanan/solusi-web-performa/",
  },
];

const faq = [
  {
    q: "Saya tidak paham teknis sama sekali. Apakah bisa tetap menggunakan layanan ini?",
    a: "Justru untuk itulah kami ada. Anda tidak perlu tahu apa itu hosting, domain, atau SEO. Ceritakan kebutuhan bisnis Anda lewat WA, kami yang tentukan pendekatan terbaiknya dan jelaskan hasilnya dengan bahasa yang mudah dipahami.",
  },
  {
    q: "Bagaimana sistem pembayarannya?",
    a: "Termin 50:50. Bayar separuh di awal sebagai konfirmasi, separuh lagi setelah Anda review draf final. Tidak ada kejutan biaya di tengah jalan. Seluruh transaksi dapat diterbitkan atas nama PT PRISMA DIGITAL KREATIF dengan faktur resmi jika diperlukan.",
  },
  {
    q: "Apakah data dan informasi bisnis saya aman?",
    a: "Kami siap menandatangani Non-Disclosure Agreement (NDA) sebelum menerima berkas sensitif apapun. Data Anda hanya diproses di lingkungan terisolasi, tidak pernah dibagikan ke pihak lain tanpa izin tertulis.",
  },
  {
    q: "Apa bedanya website di sini dengan yang di Wordpress atau Wix?",
    a: "Website yang kami bangun tidak perlu bayar server bulanan (Rp200rb-Rp800rb/bulan yang biasa diminta hosting konvensional). Dibangun dengan teknologi modern yang berjalan di jaringan edge global -- lebih cepat, tidak down saat ramai, dan lebih aman dari serangan.",
  },
  {
    q: "Berapa lama pengerjaan biasanya?",
    a: "Untuk website satu halaman: 3-5 hari kerja. Dokumen bisnis: 2-4 hari kerja. Olah data SPSS: 2-7 hari tergantung kompleksitas. Semua estimasi dikonfirmasi di awal sebelum pembayaran pertama.",
  },
];

export default function PaketSolusiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Layanan Digital & Solusi Bisnis",
    provider: {
      "@type": "Organization",
      name: "PT PRISMA DIGITAL KREATIF",
      alternateName: "PRADIKTIF",
      founder: {
        "@type": "Person",
        name: "Muhammad Khoiruzzadittaqwa",
        url: "https://muhzadit.pages.dev/",
      },
      url: "https://muhzadit.pages.dev/",
    },
    description:
      "Website bisnis, SEO, dokumen resmi, olah data, dan audit digital untuk UMKM, perusahaan, yayasan, dan peneliti di Indonesia.",
    areaServed: "ID",
    priceRange: "Rp300.000 - Rp15.000.000",
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-zinc-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── BLOK 1: HERO ── */}
      <section className="px-4 sm:px-6 pt-14 pb-16 max-w-5xl mx-auto">
        <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-10">
          <Link href="/" className="hover:text-teal-700 transition-colors">
            Beranda
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-700 font-semibold">Layanan</span>
        </nav>

        <div className="max-w-3xl">
          <p className="text-xs font-mono font-bold text-teal-700 uppercase tracking-widest mb-4">
            Mulai dari Rp300.000 -- termasuk domain
          </p>

          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
            Ramai di Instagram, Tapi Pelanggan Tidak Datang Sendiri?
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl">
            Bisnis yang hanya bergantung pada story IG dan WA blast tidak akan tumbuh mandiri.
            Website, dokumen yang meyakinkan, dan data yang bicara -- itu yang membuat pembeli
            datang tanpa perlu dikejar-kejar.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/6282316363177?text=Halo%20Mas%20Zadit%2C%20saya%20ingin%20tanya%20tentang%20layanan%20di%20muhzadit.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Ceritakan kebutuhan Anda
            </a>
            <a
              href="#hitung-kebutuhan"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-sm transition-colors"
            >
              Hitung estimasi biaya
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Micro-trust bar */}
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-mono text-slate-500">
            <span className="inline-flex items-center gap-1.5 bg-white border border-slate-100 px-3 py-1.5 rounded-lg">
              <Building2 className="w-3.5 h-3.5 text-teal-600" />
              PT PRISMA DIGITAL KREATIF
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-slate-100 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              NIB: 1801250039976
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-slate-100 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              NDA tersedia
            </span>
          </div>
        </div>
      </section>

      {/* ── BLOK 2: PROBLEM AGITATION ── */}
      <section className="bg-slate-900 text-white px-4 sm:px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-mono text-teal-400 uppercase tracking-widest font-bold mb-4">
            Apakah salah satu situasi ini terasa familiar?
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mt-6">
            {[
              {
                no: "01",
                teks: "Toko Anda ramai di IG, tapi calon pembeli bertanya \"ada websitenya gak?\" -- dan deal batal di situ.",
              },
              {
                no: "02",
                teks: "Proposal sudah dikirim ke investor atau mitra, tapi tidak ada respons. Dokumennya kurang meyakinkan.",
              },
              {
                no: "03",
                teks: "Data sudah terkumpul, deadline semakin dekat, tapi tidak ada yang tahu cara mengolahnya menjadi laporan yang bisa dipresentasikan.",
              },
            ].map((item) => (
              <div key={item.no} className="space-y-3">
                <span className="text-4xl font-heading font-black text-teal-600/40">
                  {item.no}
                </span>
                <p className="text-slate-200 text-sm leading-relaxed">{item.teks}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOK 3: POSITIONING ── */}
      <section className="px-4 sm:px-6 py-14 max-w-5xl mx-auto">
        <div className="bg-teal-50 border border-teal-100 rounded-3xl p-8 sm:p-12">
          <p className="text-teal-800 text-lg sm:text-xl font-semibold leading-relaxed max-w-2xl">
            Kami tidak menjual paket. Kami menyelesaikan masalah spesifik Anda -- website,
            dokumen, data, atau visibilitas pencarian -- dengan hasil yang bisa Anda pegang
            dan harga yang disepakati dari awal.
          </p>
          <p className="mt-4 text-teal-700 text-sm font-mono">
            Termin 50:50 · NDA tersedia · Legalitas PT resmi · Revisi terjadwal
          </p>
        </div>
      </section>

      {/* ── BLOK 4: 5 LAYANAN (STORY-FIRST) ── */}
      <section className="px-4 sm:px-6 pb-16 max-w-5xl mx-auto space-y-6">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mb-2">
            Apa yang bisa kami bantu?
          </h2>
          <p className="text-slate-500 text-sm">
            Lima area kerja -- pilih yang paling relevan dengan situasi Anda saat ini.
          </p>
        </div>

        {layanan.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              id={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:border-teal-200 hover:shadow-sm transition-all"
            >
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-teal-700" />
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-lg font-heading font-bold text-slate-900">
                    {item.judul}
                  </h3>
                  <span className="shrink-0 text-xs font-mono font-bold text-teal-700 bg-teal-50 border border-teal-100 px-2.5 py-1 rounded-lg">
                    mulai Rp{item.mulaiDari}
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">{item.cerita}</p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                  {item.contoh.map((c, i) => (
                    <li
                      key={i}
                      className="text-xs text-slate-500 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>

                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-teal-700 hover:text-teal-900 transition-colors pt-1"
                >
                  Pelajari lebih lanjut <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── BLOK 5: KALKULATOR / FORM TO WA ── */}
      <section
        id="hitung-kebutuhan"
        className="bg-slate-50 border-y border-slate-200 px-4 sm:px-6 py-16"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
              Hitung kebutuhan Anda
            </h2>
            <p className="text-slate-500 text-sm">
              Pilih apa yang Anda butuhkan, dapatkan estimasi, lalu langsung diskusikan via
              WhatsApp -- tanpa komitmen.
            </p>
          </div>
          <SolusiCalculator />
        </div>
      </section>

      {/* ── BLOK 6: PROOF / BUKTI NYATA ── */}
      <section className="px-4 sm:px-6 py-16 max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 text-center mb-12">
          {[
            { angka: "50+", label: "proyek selesai lintas kategori" },
            { angka: "Rp0", label: "biaya server bulanan untuk website yang kami bangun" },
            { angka: "100%", label: "pengerjaan tepat waktu sesuai estimasi awal" },
          ].map((stat) => (
            <div key={stat.angka} className="space-y-1">
              <p className="text-4xl font-heading font-black text-teal-700">{stat.angka}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <p className="text-xs font-mono text-teal-400 uppercase tracking-widest font-bold">
              Transparansi arsitektur
            </p>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Setiap solusi yang kami kerjakan didokumentasikan secara terbuka.
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Bukan janji verbal. Anda bisa telusuri cetak biru teknis, diagram sistem, dan
              prototipe interaktif yang sudah kami rilis.
            </p>
          </div>
          <a
            href="https://zadevpenseo.github.io/case-studies/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-colors"
          >
            Lihat dokumentasi teknis
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ── BLOK 7: RISK REVERSAL ── */}
      <section className="bg-teal-700 text-white px-4 sm:px-6 py-12">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6 text-center">
          {[
            {
              judul: "Termin 50:50",
              deskripsi:
                "Bayar separuh di awal, separuh setelah Anda puas dengan draf final. Tidak ada risiko keluar uang penuh tanpa hasil.",
            },
            {
              judul: "NDA Sebelum Kerja",
              deskripsi:
                "Data sensitif perusahaan atau institusi Anda dilindungi perjanjian kerahasiaan resmi sebelum kami menerima satu berkas pun.",
            },
            {
              judul: "Legalitas PT Resmi",
              deskripsi:
                "Seluruh pekerjaan dapat dibuatkan SPK dan faktur atas nama PT PRISMA DIGITAL KREATIF. Sah untuk kebutuhan laporan keuangan.",
            },
          ].map((item) => (
            <div key={item.judul} className="space-y-2">
              <p className="font-heading font-bold text-lg">{item.judul}</p>
              <p className="text-teal-100 text-sm leading-relaxed">{item.deskripsi}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BLOK 8: FAQ ── */}
      <section className="px-4 sm:px-6 py-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-heading font-extrabold text-slate-900 mb-8">
          Pertanyaan yang sering muncul
        </h2>
        <div className="space-y-5">
          {faq.map((item) => (
            <div
              key={item.q}
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2"
            >
              <h3 className="font-semibold text-slate-900 text-sm">{item.q}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BLOK 9: CLOSING CTA ── */}
      <section className="px-4 sm:px-6 pb-20 pt-4 max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
          Ceritakan kebutuhan Anda
        </h2>
        <p className="text-slate-500 text-sm">
          Tidak perlu tahu istilah teknisnya. Ceritakan saja situasi bisnis Anda -- kami akan
          respons dalam 1x24 jam dengan estimasi yang jujur.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="https://wa.me/6282316363177?text=Halo%20Mas%20Zadit%2C%20saya%20ingin%20konsultasi%20mengenai%20kebutuhan%20digital%20bisnis%20saya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp langsung
          </a>
          <a
            href="mailto:muhzadit@gmail.com"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-sm transition-colors"
          >
            Kirim email
          </a>
        </div>
      </section>
    </main>
  );
}
