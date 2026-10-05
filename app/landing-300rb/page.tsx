import { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  Globe,
  Clock,
  MessageSquare,
  ShieldCheck,
  Zap,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  Smartphone,
  ServerOff,
  Coins,
} from "lucide-react";
import { getCanonicalUrl } from "@/lib/canonical-registry";
import { cvProfile } from "@/lib/cv-data";

export const metadata: Metadata = {
  title: "Website Bisnis Siap Pakai Termasuk Domain (Rp300.000) | PRADIKTIF",
  description:
    "Miliki alamat web bisnis resmi berkecepatan tinggi dalam 24-48 jam. Sudah termasuk domain pilihan (.my.id/.biz.id/subdomain), tombol WhatsApp terhubung, dan biaya server bulanan Rp0 selamanya.",
  alternates: {
    canonical: getCanonicalUrl("/landing-300rb/"),
  },
  openGraph: {
    title: "Website Bisnis Siap Pakai Termasuk Domain | PRADIKTIF",
    description:
      "Solusi praktis hadir di internet tanpa ribet sewa server. Satu halaman cepat, desain profesional, langsung terhubung ke WhatsApp pelanggan Anda.",
    url: getCanonicalUrl("/landing-300rb/"),
    type: "website",
  },
};

export default function LandingPromo300Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Paket Website Bisnis Siap Pakai Termasuk Domain",
    "image": "https://muhzadit.pages.dev/og-web-performa.jpg",
    "description":
      "Layanan pembuatan situs web satu halaman cepat untuk pemilik usaha dan profesional mandiri. Sudah termasuk domain pilihan tahun pertama dan hosting edge gratis selamanya.",
    "brand": {
      "@type": "Organization",
      "name": "PT PRISMA DIGITAL KREATIF"
    },
    "offers": {
      "@type": "Offer",
      "price": "300000",
      "priceCurrency": "IDR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-01-01",
      "seller": {
        "@type": "Person",
        "name": "Muhammad Khoiruzzadittaqwa"
      }
    }
  };

  const whatsappMessage = encodeURIComponent(
    "Halo Mas Zadit, saya tertarik memesan Paket Website Bisnis Siap Pakai Rp300.000 (Termasuk Domain). Apakah slot pengerjaan minggu ini masih tersedia? Terima kasih!"
  );

  return (
    <main className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 text-zinc-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <Link href="/" className="hover:text-teal-800 transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/paket-solusi/" className="hover:text-teal-800 transition-colors">
            Paket Solusi
          </Link>
          <span>/</span>
          <span className="text-zinc-900 font-bold">Website Siap Pakai 300rb</span>
        </div>

        {/* 1. HERO SECTION (PAS FRAMEWORK + UNSLOP) */}
        <header className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200/80 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Penawaran Khusus Terbatas: Kuota 5 Slot / Minggu</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
            Miliki Website Bisnis Profesional Siap Pakai Termasuk Domain
          </h1>

          <p className="text-base sm:text-xl text-slate-700 leading-relaxed font-sans max-w-2xl mx-auto">
            Hadir di internet tanpa ribet sewa server. Satu halaman berkecepatan tinggi yang menampilkan profil usaha, katalog produk, dan tombol WhatsApp langsung ke ponsel Anda.
          </p>

          {/* Pricing Highlight Card */}
          <div className="pt-2">
            <div className="inline-block bg-[#1C1322] border-2 border-[#8F652E] rounded-3xl p-6 sm:p-8 text-white text-center shadow-xl max-w-md w-full">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C5A880]">
                Paket Lengkap Siap Pakai
              </span>
              <div className="mt-2 flex items-baseline justify-center gap-1">
                <span className="text-4xl sm:text-5xl font-heading font-extrabold text-[#C5A880] tracking-tight">
                  Rp300.000
                </span>
                <span className="text-xs font-mono text-zinc-400">/ sekali bayar</span>
              </div>
              <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                Sudah termasuk domain resmi pilihan tahun pertama dan biaya server bulanan Rp0 selamanya.
              </p>

              <div className="mt-6 flex flex-col gap-2.5">
                <a
                  href={`https://wa.me/6282316363177?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Amankan Slot via WhatsApp</span>
                </a>
                <span className="text-[11px] font-mono text-zinc-400">
                  Konsultasi santai dan verifikasi nama domain gratis
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* 2. THREE COMMON HEADACHES WE ELIMINATE */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
              Masalah Pembuatan Website yang Kerap Membebani Pemilik Usaha
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Tiga alasan mengapa banyak pengusaha menunda memiliki website sendiri:
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900">Tagihan Server Membengkak</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Banyak pemilik usaha kaget saat ditagih biaya sewa hosting ratusan ribu rupiah setiap bulan meskipun websitenya jarang diakses.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900">Proses Teknis Rumit</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pengaturan DNS, sertifikat SSL, database, dan plugin sering kali membingungkan bagi orang yang ingin fokus menjalankan bisnisnya.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900">Tampilan Lambat & Berantakan</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Website yang memuat lebih dari 3 detik membuat calon pembeli menutup tab dan beralih ke kompetitor di media sosial.
              </p>
            </div>
          </div>
        </section>

        {/* 3. WHAT YOU GET (DELIVERABLES) */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <span className="text-xs font-mono font-bold text-teal-800 uppercase tracking-wider bg-teal-50 px-2.5 py-0.5 rounded">
              Spesifikasi Lengkap
            </span>
            <h2 className="text-2xl font-heading font-extrabold text-slate-900">
              Apa Saja yang Anda Dapatkan dalam Paket Ini?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">Pilihan Nama Domain Resmi</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Termasuk domain .my.id atau .biz.id tahun pertama (misal: namabisnis.my.id), alamat gratis namabisnis.pages.dev selamanya, atau menggunakan domain yang sudah Anda miliki.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ServerOff className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">Bebas Biaya Server Bulanan</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Dihosting di infrastruktur edge global Cloudflare Pages. Tidak ada tagihan sewa hosting bulanan. Bebas biaya selamanya.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">Kecepatan Buka Seketika</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Waktu muat halaman di bawah 1.2 detik (Core Web Vitals hijau), memastikan pembeli langsung melihat penawaran Anda tanpa jeda.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">Desain Ramah Layar Ponsel</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Tata letak rapi yang nyaman dibaca di smartphone, tablet, maupun layar laptop dengan tipografi tegas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">Tombol Pemesanan WhatsApp</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Pengunjung cukup klik 1 tombol untuk mengirim pesan pemesanan yang otomatis terisi rapi ke nomor WhatsApp Anda.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">Penyerahan Kilat 24-48 Jam</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Setelah materi profil dan foto produk Anda kirimkan, website siap mengudara dalam 1 hingga 2 hari kerja.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PROOF OF EXECUTION CALLOUT */}
        <section className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
              Pembuktian Nyata & Standar Kualitas
            </span>
            <h3 className="text-lg sm:text-xl font-heading font-extrabold">
              Ingin Melihat Contoh Kualitas Arsitektur Web Kami?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Kami membangun seluruh sistem web berbasis kode bersih tanpa plugin berat. Anda dapat melihat langsung cetak biru arsitektur dan demo live yang telah kami rilis.
            </p>
          </div>

          <div className="shrink-0 flex gap-2">
            <a
              href="https://zadevpenseo.github.io/case-studies/web-dev-design/animated-landing-page-659928/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Lihat Blueprint HLD</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* 5. TRANSPARENT FAQ */}
        <section className="space-y-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-teal-800 uppercase tracking-wider bg-teal-50 px-2.5 py-0.5 rounded">
              <HelpCircle className="w-3.5 h-3.5 text-teal-700" />
              <span>Pertanyaan Seputar Paket</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
              Pertanyaan yang Sering Ditanyakan
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900">
                Apakah benar tidak ada biaya sewa server bulanan?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Benar. Kami menggunakan teknologi serverless edge Cloudflare Pages yang menyediakan alokasi bandwidth dan hosting tanpa biaya langganan bulanan. Anda tidak perlu membayar tagihan server rutin.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900">
                Bagaimana dengan perpanjangan domain di tahun kedua?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Domain .my.id atau .biz.id sangat terjangkau (sekitar Rp15.000 hingga Rp35.000 per tahun). Di tahun berikutnya, Anda cukup memperpanjang biaya domain tersebut ke registrar resmi tanpa biaya tambahan dari kami.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900">
                Bisa pakai domain .com atau domain yang sudah saya beli?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tentu bisa. Jika Anda sudah memiliki domain sendiri di Niagahoster, Domainesia, atau Namecheap, kami bantu hubungkan tanpa biaya tambahan. Anda juga bisa meng-upgrade ke domain .com baru dengan penyesuaian selisih biaya pendaftaran.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900">
                Materi apa saja yang perlu saya siapkan?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cukup siapkan nama usaha Anda, deskripsi singkat layanan/produk, 3-6 foto produk atau tempat usaha, nomor WhatsApp aktif, dan alamat lokasi. Kami yang susun tata letak dan keterbacaannya.
              </p>
            </div>
          </div>
        </section>

        {/* 6. CLOSING CTA */}
        <footer className="text-center space-y-6 pt-4 border-t border-slate-200">
          <div className="space-y-1 max-w-lg mx-auto">
            <h3 className="text-2xl font-heading font-extrabold text-slate-900">
              Mulai Hadirkan Bisnis Anda di Internet Hari Ini
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Diskusikan nama domain dan konsep bisnis Anda langsung bersama Muhammad Khoiruzzadittaqwa.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/6282316363177?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Hubungi via WhatsApp (0823-1636-3177)</span>
            </a>

            <Link
              href="/paket-solusi/"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Lihat Seluruh Paket Layanan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="pt-2 text-[11px] font-mono text-slate-500">
            Dikelola oleh PT PRISMA DIGITAL KREATIF (NIB 1801250039976) · Bebas Jargon · Transparan
          </div>
        </footer>
      </div>
    </main>
  );
}
