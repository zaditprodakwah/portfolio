import { Metadata } from "next";
import Link from "next/link";
import InteractiveBookViewer from "@/components/InteractiveBookViewer";
import EditorialShowcaseTabs from "@/components/EditorialShowcaseTabs";
import {
  Sparkles,
  BookOpen,
  Layers,
  FileCheck2,
  Video,
  Palette,
  Printer,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Download,
  ShieldCheck,
  Package,
  Compass,
} from "lucide-react";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Visual Editorial Studio & Desain Sampul Realistis | Muhammad Khoiruzzadittaqwa (Zadit)",
  description:
    "Layanan desain sampul buku, e-book, dan kemasan box profesional dengan kalkulasi presisi fisik penerbitan: kurvatur punggung jilid, ketebalan greyboard, dus FEFCO 0427, mockup 3D fotorealistik 300 DPI, master PSD Smart Object, dan video teaser 9:16.",
  alternates: {
    canonical: "https://muhzadit.pages.dev/editorial-studio/",
  },
  openGraph: {
    title: "Visual Editorial Studio & Desain Sampul Realistis",
    description:
      "Desain sampul buku fisik, e-book, dan kemasan box dengan presisi kurvatur jilid, pola vektor FEFCO 0427, serta simulasi 3D fotorealistik.",
    url: "https://muhzadit.pages.dev/editorial-studio/",
    siteName: "Muhammad Khoiruzzadittaqwa (Zadit)",
    images: [
      {
        url: "/og-editorial-studio.jpg",
        width: 1200,
        height: 630,
        alt: "Visual Editorial & Packaging Studio",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visual Editorial Studio & Desain Sampul Realistis",
    description:
      "Desain sampul buku fisik, e-book, dan kemasan box dengan presisi kurvatur jilid, pola vektor FEFCO 0427, serta simulasi 3D fotorealistik.",
    images: ["/og-editorial-studio.jpg"],
  },
};

export default function EditorialStudioPage() {
  const whatsappNumber = "6285156550882";
  const whatsappMessage = encodeURIComponent(
    "Halo Mas Zadit, saya ingin berkonsultasi mengenai desain sampul buku dan kemasan dus box dengan spesifikasi fisik cetak serta simulasi 3D."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": "Layanan Desain Sampul Buku & Dus Kemasan Box 3D",
        "description":
          "Desain sampul buku hardcover, softcover, dus kemasan box FEFCO 0427, pola vektor cetak 1:1, dan animasi 3D fotorealistik.",
        "brand": {
          "@type": "Person",
          "name": "Muhammad Khoiruzzadittaqwa",
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "IDR",
          "lowPrice": "350000",
          "highPrice": "1500000",
        },
      },
      {
        "@type": "Service",
        "name": "Visual Editorial & 3D Packaging Design Studio",
        "serviceType": "Editorial Cover and Packaging Design",
        "provider": {
          "@type": "Person",
          "name": "Muhammad Khoiruzzadittaqwa",
          "url": "https://muhzadit.pages.dev",
        },
        "areaServed": "Indonesia",
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Beranda",
            "item": "https://muhzadit.pages.dev/",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Visual Editorial Studio",
            "item": "https://muhzadit.pages.dev/editorial-studio/",
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 text-zinc-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header Breadcrumbs & Intro */}
        <header className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200/80 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Boutique Visual Editorial & Packaging Studio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-zinc-900 tracking-tight leading-tight">
            Desain Sampul Buku & Dus Kemasan Box Realistis: Presisi Fisik Cetak, Geometri Punggung Jilid, Pola Dieline FEFCO 0427, dan Simulasi 3D Sinematik
          </h1>

          <p className="text-base sm:text-lg text-zinc-700 leading-relaxed max-w-3xl">
            Banyak penulis dan penerbit menerima pratinjau sampul berupa kotak digital datar yang tampak kaku seperti template instan.
            Di studio ini, saya merancang sampul buku fisik dan dus kemasan boks mailer dengan memperhitungkan ilmu fisika kertas,
            ketebalan greyboard, pola garis lipat percetakan, serta kilau tekstur pernis agar karya Anda tampil memikat baik di etalase
            toko maupun layar gawai.
          </p>
        </header>

        {/* Hero Interactive 3D Model Viewer */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-2xl font-heading font-bold text-zinc-900">
                Spesimen Fisik Interaktif: Buku Hardcover & Dus Kemasan Box <span className="whitespace-nowrap">FEFCO 0427</span>
              </h2>
              <p className="text-sm text-zinc-600">
                Pilih spesimen di bilah kontrol: periksa kurvatur jilid buku fisik, buka kemasan dus mailer dengan penggeser unboxing, atau amati tumpukan karton display etalase toko.
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-md text-xs font-mono bg-zinc-100 text-zinc-700 border border-zinc-200">
              Presisi Percetakan Skala 1:1
            </span>
          </div>

          <InteractiveBookViewer fallbackImage="/editorial-studio/hero-mockup-3d.png" />
        </section>

        {/* Physical Print & Packaging Specifications Card */}
        <section className="bg-white rounded-2xl border border-zinc-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-800 border border-teal-100">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-zinc-900">
                Kartu Spesifikasi Fisik Penerbitan & Kemasan Boks
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500">
                Dihitung secara matematis berdasarkan standar produksi percetakan buku dan pabrik kemasan karton nasional.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Buku ISO A5 & Punggung
              </span>
              <p className="text-base font-semibold text-zinc-900">14.8 x 21.0 cm (Spine 17.4 mm)</p>
              <p className="text-xs text-zinc-600 leading-normal">
                Kalkulasi 240 halaman kertas bookpaper krem 72 gsm ditambah ketebalan board hardcover 3.0 mm.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Dus Kemasan Mailer
              </span>
              <p className="text-base font-semibold text-zinc-900">FEFCO 0427 (22.0 x 16.0 x 4.5 cm)</p>
              <p className="text-xs text-zinc-600 leading-normal">
                Dimensi interior presisi dengan ruang proteksi kertas tisu, mengunci buku agar tidak goyang saat ekspedisi.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Bahan Karton Kemasan
              </span>
              <p className="text-base font-semibold text-zinc-900">Corrugated E-Flute 1.5 mm (400 gsm)</p>
              <p className="text-xs text-zinc-600 leading-normal">
                Struktur karton gelombang mikro kokoh dengan liner kraft alami, tahan benturan dan ramah daur ulang.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Struktur Jilid Buku
              </span>
              <p className="text-base font-semibold text-zinc-900">Hardcover Jahit Benang</p>
              <p className="text-xs text-zinc-600 leading-normal">
                Inti greyboard kaku dengan punggung silindris fleksibel yang dapat dibuka rata tanpa merusak ikatan halaman.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Finishing Eksklusif
              </span>
              <p className="text-base font-semibold text-zinc-900">Doff Beludru, Spot UV & Sablon</p>
              <p className="text-xs text-zinc-600 leading-normal">
                Tekstur doff halus dipadu pernis timbul pada judul buku serta sablon presisi pada tutup kemasan karton.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Pola Pisau & Legalitas
              </span>
              <p className="text-base font-semibold text-zinc-900">Dieline 1:1, ISBN & Barcode</p>
              <p className="text-xs text-zinc-600 leading-normal">
                Pola pond pisau siap potong pabrik dan garis barcode EAN-13 tajam siap pindai kasir toko buku.
              </p>
            </div>
          </div>
        </section>

        {/* Deliverables & Software Interchange Formats */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-900">
              Format Serah Terima Siap Pakai untuk Segala Kebutuhan
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 max-w-3xl">
              Anda tidak hanya menerima gambar mentah. Setiap paket dilengkapi berkas produksi lengkap yang ramah bagi
              tim percetakan, desainer in-house, dan promotor media sosial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Format Item 1 */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
                  PSD
                </div>
                <h3 className="text-lg font-heading font-bold text-zinc-900">
                  Photoshop Smart Object Master Mockup
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Berkas master resolusi tinggi (35 MB) dengan layer Smart Object terpisah untuk sampul buku dan boks kemasan.
                  Tim Anda dapat mengganti artwork sampul atau logo boks dalam dua kali klik tanpa perlu mengatur ulang bayangan.
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>Photoshop CC Compatible</span>
                <span>Layer Smart Object Buku & Boks</span>
              </div>
            </div>

            {/* Format Item 2 */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  SVG
                </div>
                <h3 className="text-lg font-heading font-bold text-zinc-900">
                  Pola Vektor Skala 1:1 (Sampul Buku & Dieline Box)
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Pola kerja lengkap berskala milimeter presisi: garis potong (cut lines), rel lipat (crease rules),
                  area bleed 3 mm, serta pola bentang dieline boks FEFCO 0427 siap diserahkan ke vendor percetakan.
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>Skala 1:1 Milimeter</span>
                <span>Sampul + Dieline Boks FEFCO 0427</span>
              </div>
            </div>

            {/* Format Item 3 */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm">
                  PNG
                </div>
                <h3 className="text-lg font-heading font-bold text-zinc-900">
                  Render 300 DPI True Alpha Transparent
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Gambar transparansi murni beresolusi ultra-tinggi (5120 x 2880 piksel) dengan bayangan lantai alami:
                  buku hardcover tunggal, dus kemasan terbuka berisi buku, dan tumpukan dus untuk display toko online.
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>5120 x 2880 Retina 2x</span>
                <span>Buku, Boks & Tumpukan Dus</span>
              </div>
            </div>

            {/* Format Item 4 */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                  MP4
                </div>
                <h3 className="text-lg font-heading font-bold text-zinc-900">
                  Video Teaser Vertikal 9:16 (60 FPS) & Animasi Unboxing
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Klip animasi gerak kamera sinematik yang memperlihatkan unboxing boks kemasan dan pemaparan buku secara berputar halus.
                  Format vertikal siap tayang langsung di Instagram Reels, TikTok, YouTube Shorts, dan Threads.
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>1080 x 1920 Vertikal</span>
                <span>60 FPS Smooth Unboxing Motion</span>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Asset Showcase & Media Promotion */}
        <EditorialShowcaseTabs />

        {/* 3-Tier Packages & Pricing */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-900">
              Pilihan Paket Layanan Editorial Studio
            </h2>
            <p className="text-sm sm:text-base text-zinc-600">
              Pilih cakupan yang sesuai dengan tahap penerbitan Anda, mulai dari template cepat hingga paket lengkap media promosi dan kemasan boks fisik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1: Canva Boutique */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 flex flex-col justify-between space-y-6 shadow-xs hover:border-zinc-300 transition-colors">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-800">
                  Tier 1 : Cepat & Mandiri
                </div>
                <h3 className="text-xl font-heading font-bold text-zinc-900">Canva Boutique Cover</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Cocok bagi kreator konten atau penerbit mandiri yang membutuhkan desain sampul rapi dengan kemudahan
                  mengedit teks sendiri sewaktu-waktu di Canva.
                </p>

                <div className="pt-2 border-t border-zinc-100 space-y-2.5 text-xs text-zinc-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Desain sampul depan berhierarki bersih dan kontras matang</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Tautan kolaborasi template resmi Canva</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Ekspor PDF cetak dan gambar JPEG/PNG siap unggah</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Panduan penyesuaian font dan palet warna</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 transition-colors"
                >
                  <span>Pilih Paket Canva</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Tier 2: 3D Studio & Master Packaging Suite (Recommended) */}
            <div className="bg-white rounded-2xl border-2 border-teal-700 p-6 flex flex-col justify-between space-y-6 shadow-md relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-bold bg-teal-700 text-white shadow-xs">
                PALING POPULER
              </div>

              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800">
                  Tier 2 : Standar Industri Cetak & Kemasan
                </div>
                <h3 className="text-xl font-heading font-bold text-zinc-900">3D Studio & Packaging Suite</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Solusi ideal bagi penerbit profesional dan indie author yang menerbitkan buku fisik serta kemasan boks eksklusif
                  ke percetakan sekaligus membutuhkan aset etalase digital.
                </p>

                <div className="pt-2 border-t border-zinc-100 space-y-2.5 text-xs text-zinc-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Seluruh cakupan Tier 1</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Mockup 3D interaktif fotorealistik sampul buku & dus kemasan box</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Master Photoshop Smart Object (.psd) buku dan boks kemasan</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Pola vektor 1:1 Corel/Illustrator (sampul buku + dieline box FEFCO 0427)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Spesifikasi percetakan buku (InDesign) & spesifikasi produksi karton box</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800 transition-colors shadow-xs"
                >
                  <span>Pilih Paket 3D Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Tier 3: Motion Cinematic Teaser */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 flex flex-col justify-between space-y-6 shadow-xs hover:border-zinc-300 transition-colors">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-800">
                  Tier 3 : Kampanye Peluncuran Penuh
                </div>
                <h3 className="text-xl font-heading font-bold text-zinc-900">Motion Cinematic Teaser & Unboxing</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Layanan komprehensif bagi Anda yang ingin menggalang pre-order atau meluncurkan buku dan edisi kemasan boks secara agresif
                  di platform media sosial berbasis video.
                </p>

                <div className="pt-2 border-t border-zinc-100 space-y-2.5 text-xs text-zinc-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Seluruh cakupan Tier 1 dan Tier 2</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Video gerak sinematik unboxing 3D vertikal 9:16 (60 FPS MP4)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Animasi looping web GIF untuk landing page & email</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Rancangan naskah 5-beat promosi untuk takarir (caption) medsos</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 transition-colors"
                >
                  <span>Pilih Paket Motion</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation Call to Action */}
        <section className="bg-amber-50/60 rounded-3xl border border-amber-200/80 p-8 sm:p-12 space-y-6 text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-900">
              Diskusikan Kebutuhan Sampul Buku & Dus Kemasan Box Anda
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Punya naskah yang siap diterbitkan, ingin menyiapkan edisi box set eksklusif, atau memperbarui tampilan sampul buku lama?
              Kirimkan judul, ringkasan naskah, dan format cetak yang diinginkan. Saya akan menghitungkan tebal punggung jilid,
              menyiapkan rekomendasi pola kemasan boks, serta merancang visual 3D-nya.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-800 text-white text-sm font-semibold hover:bg-teal-900 transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Konsultasi Langsung via WhatsApp</span>
            </a>

            <Link
              href="/cad-estimator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-zinc-300 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>Studio CAD &amp; Estimator Proyek</span>
            </Link>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-zinc-300 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Lihat Portfolio Lainnya</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
