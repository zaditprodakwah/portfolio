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
} from "lucide-react";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Visual Editorial Studio & Desain Sampul Realistis | Muhammad Khoiruzzadittaqwa (Zadit)",
  description:
    "Layanan desain sampul buku dan e-book profesional dengan kalkulasi presisi fisik penerbitan: kurvatur punggung jilid, ketebalan greyboard, mockup 3D fotorealistik 300 DPI, master PSD Smart Object, dan video teaser 9:16.",
  alternates: {
    canonical: "https://muhzadit.pages.dev/editorial-studio/",
  },
};

export default function EditorialStudioPage() {
  const whatsappNumber = "6285156550882";
  const whatsappMessage = encodeURIComponent(
    "Halo Mas Zadit, saya ingin berkonsultasi mengenai desain sampul buku/e-book dengan spesifikasi editorial fisik dan visual mockup 3D."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 text-zinc-900 font-sans">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header Breadcrumbs & Intro */}
        <header className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200/80 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Boutique Visual Editorial & Cover Studio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-zinc-900 tracking-tight leading-tight">
            Desain Sampul Buku Realistis: Presisi Fisik Cetak, Geometri Punggung, dan Visual 3D Sinematik
          </h1>

          <p className="text-base sm:text-lg text-zinc-700 leading-relaxed max-w-3xl">
            Banyak penulis dan penerbit menerima mockup sampul berupa kotak digital datar yang tampak kaku
            seperti template instan. Di studio ini, saya merancang sampul dengan memperhitungkan ilmu fisika
            kertas, ketebalan jilid asli, serta kilau tekstur pernis agar buku Anda tampak memikat baik di etalase
            toko maupun layar gawai.
          </p>
        </header>

        {/* Hero Interactive 3D Model Viewer */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-zinc-900">
                Spesimen 3D Interaktif: Belajar Desain Grafis Untuk Pemula
              </h2>
              <p className="text-sm text-zinc-600">
                Putar buku secara leluasa di bawah untuk memeriksa sampul depan, lekukan punggung jilid, dan barcode belakang.
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-md text-xs font-mono bg-zinc-100 text-zinc-700 border border-zinc-200">
              ISO A5 : 240 Halaman
            </span>
          </div>

          <InteractiveBookViewer fallbackImage="/editorial-studio/hero-mockup-3d.png" />
        </section>

        {/* Physical Print Specifications Card */}
        <section className="bg-white rounded-2xl border border-zinc-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-800 border border-teal-100">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-zinc-900">
                Kartu Spesifikasi Fisik Penerbitan
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500">
                Dihitung secara matematis berdasarkan standar produksi percetakan buku nasional.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Format Dimensi
              </span>
              <p className="text-base font-semibold text-zinc-900">ISO A5 (14.8 x 21.0 cm)</p>
              <p className="text-xs text-zinc-600 leading-normal">
                Proporsi standar buku panduan populer, nyaman digenggam dan proporsional di rak display.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Tebal Punggung (Spine)
              </span>
              <p className="text-base font-semibold text-zinc-900">17.4 mm (Presisi Kaliber)</p>
              <p className="text-xs text-zinc-600 leading-normal">
                Kalkulasi 240 halaman kertas isi krem 72 gsm ditambah ketebalan board hardcover 3.0 mm.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Kertas & Gramatur
              </span>
              <p className="text-base font-semibold text-zinc-900">Bookpaper Krem 72 gsm</p>
              <p className="text-xs text-zinc-600 leading-normal">
                Kertas bertekstur lembut dengan daya pantul rendah, menjaga mata pembaca tetap nyaman berlama-lama.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Struktur Jilid
              </span>
              <p className="text-base font-semibold text-zinc-900">Hardcover Jahit Benang</p>
              <p className="text-xs text-zinc-600 leading-normal">
                Inti greyboard kaku dengan punggung silindris fleksibel yang dapat dibuka rata tanpa merusak ikatan.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Finishing Sampul
              </span>
              <p className="text-base font-semibold text-zinc-900">Doff + Spot UV 3D Glossy</p>
              <p className="text-xs text-zinc-600 leading-normal">
                Lapisan doff beludru dipadukan dengan pernis berkilap timbul pada tipografi judul utama.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Legalitas & Kolofon
              </span>
              <p className="text-base font-semibold text-zinc-900">EAN-13 ISBN & Barcode Harga</p>
              <p className="text-xs text-zinc-600 leading-normal">
                Garis barcode vektor berdefinisi tinggi, siap dipindai scanner optik kasir dan toko ritel.
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
              Anda tidak hanya menerima gambar mentah. Setiap paket dilengkapi berkas produksi yang ramah bagi
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
                  Berkas master resolusi tinggi (35 MB) dengan layer Smart Object terpisah. Tim Anda dapat mengganti
                  artwork sampul depan atau belakang dalam dua kali klik tanpa perlu mengatur ulang bayangan.
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>Photoshop CC Compatible</span>
                <span>Layer Smart Object</span>
              </div>
            </div>

            {/* Format Item 2 */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  SVG
                </div>
                <h3 className="text-lg font-heading font-bold text-zinc-900">
                  Pola Vektor Skala 1:1 (CorelDraw & Illustrator)
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Pola kerja lengkap berskala milimeter presisi: garis potong (trim lines), area bleed 3 mm,
                  panduan lipat engsel (hinge fold), dan batas aman teks agar tidak terpotong pisau percetakan.
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>Skala 1:1 Milimeter</span>
                <span>Bleed & Fold Guides</span>
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
                  Gambar transparansi murni beresolusi ultra-tinggi (5120 x 2880 piksel) dengan bayangan lantai
                  alami. Sangat fleksibel untuk ditempelkan di landing page, marketplace, atau poster promosi.
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>5120 x 2880 Retina 2x</span>
                <span>Alpha Transparency</span>
              </div>
            </div>

            {/* Format Item 4 */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                  MP4
                </div>
                <h3 className="text-lg font-heading font-bold text-zinc-900">
                  Video Teaser Vertikal 9:16 (60 FPS) & GIF
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Klip animasi gerak kamera sinematik yang menampakkan detail buku secara berputar halus.
                  Format vertikal siap tayang langsung di Instagram Reels, TikTok, YouTube Shorts, dan Threads.
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>1080 x 1920 Vertikal</span>
                <span>60 FPS Smooth Motion</span>
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
              Pilih cakupan yang sesuai dengan tahap penerbitan Anda, mulai dari template cepat hingga paket lengkap media promosi.
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

            {/* Tier 2: 3D Studio & Master Print (Recommended) */}
            <div className="bg-white rounded-2xl border-2 border-teal-700 p-6 flex flex-col justify-between space-y-6 shadow-md relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-bold bg-teal-700 text-white shadow-xs">
                PALING POPULER
              </div>

              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800">
                  Tier 2 : Standar Industri Cetak
                </div>
                <h3 className="text-xl font-heading font-bold text-zinc-900">3D Studio & Master Suite</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Solusi ideal bagi penerbit profesional dan indie author yang menerbitkan buku fisik ke percetakan
                  sekaligus membutuhkan aset etalase digital.
                </p>

                <div className="pt-2 border-t border-zinc-100 space-y-2.5 text-xs text-zinc-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Seluruh cakupan Tier 1</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Mockup 3D interaktif fotorealistik 300 DPI dengan kurvatur jilid asli</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Master Photoshop Smart Object (.psd 35MB)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Pola vektor 1:1 Corel/Illustrator dengan garis lipat & bleed</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Spesifikasi tata letak InDesign dan kalkulasi ketebalan punggung</span>
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
                <h3 className="text-xl font-heading font-bold text-zinc-900">Motion Cinematic Teaser</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Layanan komprehensif bagi Anda yang ingin menggalang pre-order atau meluncurkan buku secara agresif
                  di platform media sosial berbasis video.
                </p>

                <div className="pt-2 border-t border-zinc-100 space-y-2.5 text-xs text-zinc-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Seluruh cakupan Tier 1 dan Tier 2</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>Video gerak 3D vertikal 9:16 (60 FPS MP4)</span>
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
              Diskusikan Kebutuhan Sampul & Format Cetak Buku Anda
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Punya naskah yang siap diterbitkan atau ingin memperbarui tampilan sampul buku lama? Kirimkan judul,
              ringkasan cerita, dan estimasi halaman. Saya akan menghitungkan tebal punggung jilid yang tepat
              serta menyiapkan rekomendasi visualnya.
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
