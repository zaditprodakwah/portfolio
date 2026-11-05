import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MapPin, ArrowRight, CheckCircle2, ShieldCheck, Satellite, Trees, Compass } from "lucide-react";
import { DirectAnswerBox } from "@/components/DirectAnswerBox";
import { EntityPills } from "@/components/EntityPills";
import { ProtectedContact } from "@/components/ProtectedContact";
import GeospatialInteractiveStudio from "@/components/GeospatialInteractiveStudio";

export const metadata: Metadata = {
  title: "Analisis Geospasial, GIS & Citra Satelit Lingkungan | Zadit",
  description:
    "Layanan analisis spasial multikriteria AHP-GIS, pemetaan genangan banjir radar Sentinel-1 SAR, dan inventarisasi karbon pohon alometri Chave 2014 serta i-Tree Eco.",
  alternates: {
    canonical: "https://muhzadit.pages.dev/layanan/analisis-geospasial-lingkungan/",
  },
  openGraph: {
    title: "Analisis Geospasial, GIS & Citra Satelit Lingkungan | Zadit",
    description:
      "Evaluasi kesesuaian lahan berstandar FAO, deteksi banjir bebas tutupan awan dengan radar SAR, serta audit biomassa dan emisi CO2e pohon siap sidang dan publikasi jurnal.",
    url: "https://muhzadit.pages.dev/layanan/analisis-geospasial-lingkungan/",
    images: [
      {
        url: "https://muhzadit.pages.dev/og-olah-data.jpg",
        width: 1200,
        height: 630,
        alt: "Analisis Geospasial & Citra Satelit Lingkungan | Zadit",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Analisis Geospasial, GIS & Citra Satelit Lingkungan | Zadit",
    description:
      "Layanan geospasial presisi: AHP-GIS konsistensi Saaty, radar banjir SAR Sentinel-1, dan alometri karbon tegakan pohon.",
    images: ["https://muhzadit.pages.dev/og-olah-data.jpg"],
  },
};

export default function GeospatialEnvironmentalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Analisis Geospasial, GIS & Citra Satelit Lingkungan",
    provider: {
      "@type": "Person",
      name: "Muhammad Khoiruzzadittaqwa",
      url: "https://muhzadit.pages.dev/",
    },
    description:
      "Layanan analisis spasial multikriteria AHP Saaty, pemrosesan citra radar Sentinel-1 SAR, dan inventarisasi karbon pohon alometri pantropis berstandar FAO dan IPCC.",
    areaServed: "ID",
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Navigation Breadcrumb */}
        <Link
          href="/layanan/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-900 hover:text-emerald-950 uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Layanan</span>
        </Link>

        {/* Header Title */}
        <header className="space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-900 border border-emerald-200">
            <MapPin className="w-3.5 h-3.5" />
            Pilar Layanan 06
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
            Analisis Geospasial, GIS & Citra Satelit Lingkungan
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
            Solusi pemetaan analitis yang memadukan teori evaluasi spasial multikriteria (AHP Saaty), penginderaan jauh radar satelit (Sentinel-1 SAR), dan pemodelan alometri karbon tegakan pohon (Chave 2014 & i-Tree Eco) untuk laporan perencanaan wilayah dan naskah publikasi ilmiah.
          </p>
        </header>

        {/* Direct-Answer BLUF */}
        <DirectAnswerBox
          summary="Layanan geospasial ini memadukan ketepatan matematis, kepatuhan metodologi akademik, dan visualisasi kartografis berstandar penerbitan. Seluruh proses pembobotan kriteria diuji rasio konsistensinya secara deterministik (CR < 0,10), citra satelit radar diproses bebas hambatan tutupan awan, dan sensus vegetasi dihitung potensi cadangan karbonnya berstandar IPCC untuk dokumen yang siap dipertahankan di hadapan dewan penguji maupun penilai teknis instansi."
          takeaways={[
            "Evaluasi Kesesuaian Lahan AHP-GIS: Matriks perbandingan berpasangan Saaty teruji konsistensi dengan klasifikasi kesesuaian FAO (S1 hingga N).",
            "Radar Satelit Sentinel-1 SAR: Deteksi banjir akurat saat cuaca berawan lebat menggunakan polarisasi ganda dan filter kelerengan DEM.",
            "Inventarisasi Karbon & Kanopi: Konversi sensus ortofoto drone ke metrik biomassa (AGB), simpanan karbon (C), dan serapan emisi gas rumah kaca (CO2e).",
            "Ekspor Vektor Siap Publikasi: Hasil diserahkan dalam format Shapefile, GeoJSON, dan peta kartografi vektor murni (SVG/PDF) tanpa watermark."
          ]}
        />

        {/* Live Interactive Studio & Verification Laboratory */}
        <GeospatialInteractiveStudio />

        {/* Section: Tantangan Pengolahan GIS Konvensional */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
            Tantangan Pengolahan Spasial yang Sering Dihadapi
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Banyak mahasiswa dan konsultan lingkungan menghadapi kendala teknis saat mengoperasikan perangkat lunak GIS di laptop pribadi, mulai dari laptop yang membeku saat mengolah citra raster berukuran besar, keraguan menentukan ambang batas genangan banjir, hingga kritik tajam penguji sidang akibat inkonsistensi pembobotan kriteria:
          </p>
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700 block">Kelemahan Metodologi</span>
              <p className="text-sm font-semibold text-slate-900">Inkonsistensi Bobot AHP</p>
              <p className="text-xs text-slate-600">Nilai perbandingan kriteria ditentukan asal-asalan tanpa validasi rasio konsistensi Saaty (CR), sehingga rentan dibantai penguji sidang.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700 block">Kendala Citra Optik</span>
              <p className="text-sm font-semibold text-slate-900">Tertutup Kabut & Awan</p>
              <p className="text-xs text-slate-600">Citra satelit optik (Sentinel-2 / Landsat) sering tertutup awan tebal tepat di saat puncak kejadian banjir, menyebabkan analisis gagal total.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 block">Standar Zadit</span>
              <p className="text-sm font-semibold text-slate-900">Komputasi Presisi & Radar SAR</p>
              <p className="text-xs text-slate-600">Matriks AHP diverifikasi deterministik (CR &lt; 0,10), radar SAR menembus awan tebal, dan komputasi berat didelegasikan ke cloud engine.</p>
            </div>
          </div>
        </section>

        {/* Section: 3 Pilar Layanan Geospasial */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
              Tiga Pilar Layanan Geospasial & Lingkungan
            </h2>
            <p className="text-sm sm:text-base text-slate-700">
              Dirancang untuk memenuhi kebutuhan penelitian skripsi, tesis, dokumen perizinan lingkungan hidup (AMDAL/UKL-UPL), dan pelaporan ESG:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">
                1. Evaluasi Lahan AHP-GIS
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pemodelan Spatial Multi-Criteria Evaluation (SMCE) untuk pemilihan lokasi optimal permukiman, kawasan industri, tempat pembuangan akhir, atau komoditas pertanian unggulan.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Matriks Saaty Teruji CR &lt; 0,10</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Zonasi Kesesuaian Lahan FAO</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Kisi-kisi Tanya Jawab Sidang</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 border-teal-200 ring-1 ring-teal-100">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                <Satellite className="w-5 h-5 text-teal-700" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">
                2. Pemetaan Banjir SAR
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ekstraksi genangan banjir memanfaatkan gelombang mikro radar Sentinel-1 SAR GRD yang menembus tutupan awan hujan, dikombinasikan dengan pemodelan hidrologi DEM.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  <span>Deteksi Perubahan Backscatter dB</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  <span>Filter Lee Speckle & Mask Lereng</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  <span>Estimasi Luasan Terdampak (Ha)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                <Trees className="w-5 h-5 text-slate-700" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">
                3. Karbon & Kanopi Pohon
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inventarisasi tegakan pohon dari hasil ortofoto drone atau survei lapang, dihitung cadangan biomassa dan serapan emisi gas rumah kaca menggunakan alometri ilmiah.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                  <span>Model Alometri Chave et al. (2014)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                  <span>Standarisasi Emisi i-Tree Eco</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                  <span>Atlas Geospasial Digital GeoJSON</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Transparansi Harga & Paket Layanan */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
              Pilihan Paket Layanan & Biaya Transparan
            </h2>
            <p className="text-sm sm:text-base text-slate-700">
              Biaya tetap tanpa biaya tersembunyi, dilengkapi serah terima berkas sumber data spasial dan pendampingan konsultasi metodologi:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Tier 1: AHP GIS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-xs">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Paling Populer untuk Tesis/Skripsi
                </span>
                <h3 className="text-xl font-heading font-bold text-slate-900">
                  Evaluasi Lahan AHP-GIS
                </h3>
                <p className="text-2xl font-heading font-black text-slate-900">
                  Rp 850.000
                </p>
                <p className="text-xs text-slate-600">
                  SLA: 2-3 hari kerja. Cocok untuk riset penetapan zonasi kesesuaian lahan dengan validitas rasio konsistensi kriteria Saaty.
                </p>
                <ul className="text-xs text-slate-700 space-y-2 pt-4 border-t border-slate-100">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Matriks perbandingan berpasangan (CR &lt; 0,10)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Weighted Overlay klasifikasi FAO (S1, S2, S3, N)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Draf narasi metodologi dan interpretasi Bab 4</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Peta kartografi resolusi tinggi SVG dan Shapefile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Catatan kisi-kisi tanya jawab dospem &amp; penguji</span>
                  </li>
                </ul>
              </div>
              <ProtectedContact
                type="whatsapp"
                label="Pilih Paket AHP-GIS"
                prefillMessage="Halo Mas Zadit, saya ingin konsultasi mengenai Paket Evaluasi Lahan AHP-GIS (SMCE) untuk penelitian kami."
                className="w-full justify-center bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-xs transition-all"
              />
            </div>

            {/* Tier 2: Sentinel-1 SAR */}
            <div className="bg-white border-2 border-teal-600 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-sm relative">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md">
                  Analisis Bencana &amp; AMDAL
                </span>
                <h3 className="text-xl font-heading font-bold text-slate-900">
                  Pemetaan Banjir Radar SAR
                </h3>
                <p className="text-2xl font-heading font-black text-slate-900">
                  Rp 1.450.000
                </p>
                <p className="text-xs text-slate-600">
                  SLA: 3-4 hari kerja. Deteksi genangan banjir berbasis radar Sentinel-1 bebas hambatan awan mendung dan hujan lebat.
                </p>
                <ul className="text-xs text-slate-700 space-y-2 pt-4 border-t border-slate-100">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                    <span>Citra Sentinel-1 GRD polarisasi ganda pra &amp; pasca banjir</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                    <span>Reduksi derau hamburan dengan Lee Speckle Filter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                    <span>Masking badan air permanen JRC &amp; kelerengan DEM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                    <span>Rekapitulasi luasan genangan per unit desa/kecamatan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                    <span>Paket data GeoTIFF, GeoJSON, dan poster peta infografis</span>
                  </li>
                </ul>
              </div>
              <ProtectedContact
                type="whatsapp"
                label="Pilih Paket Banjir SAR"
                prefillMessage="Halo Mas Zadit, saya ingin konsultasi mengenai Paket Pemetaan Banjir Radar SAR Sentinel-1 untuk area kajian kami."
                className="w-full justify-center bg-teal-700 hover:bg-teal-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-xs transition-all"
              />
            </div>

            {/* Tier 3: Tree Canopy Carbon */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-xs">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md">
                  Audit Keberlanjutan &amp; ESG
                </span>
                <h3 className="text-xl font-heading font-bold text-slate-900">
                  Inventarisasi Karbon Pohon
                </h3>
                <p className="text-2xl font-heading font-black text-slate-900">
                  Rp 2.850.000
                </p>
                <p className="text-xs text-slate-600">
                  SLA: 5-7 hari kerja. Evaluasi biomassa, simpanan karbon, dan serapan emisi CO2e pohon menggunakan alometri Chave 2014 &amp; i-Tree Eco.
                </p>
                <ul className="text-xs text-slate-700 space-y-2 pt-4 border-t border-slate-100">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-0.5" />
                    <span>Kompilasi sensus biometrik pohon dari drone / survei</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-0.5" />
                    <span>Kalkulasi biomassa di atas permukaan tanah (AGB) Chave 2014</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-0.5" />
                    <span>Estimasi simpanan karbon (C) dan serapan gas rumah kaca (CO2e)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-0.5" />
                    <span>Atlas digital sebaran pohon interaktif format GeoJSON</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-0.5" />
                    <span>Laporan eksekutif lengkap siap lampir dokumen ESG/jurnal</span>
                  </li>
                </ul>
              </div>
              <ProtectedContact
                type="whatsapp"
                label="Pilih Paket Karbon Pohon"
                prefillMessage="Halo Mas Zadit, saya ingin konsultasi mengenai Paket Inventarisasi Karbon & Kanopi Pohon Drone/Satelit untuk lokasi kami."
                className="w-full justify-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-xs transition-all"
              />
            </div>
          </div>
        </section>

        {/* Entity Pills & Verification */}
        <EntityPills
          entityIds={["statistics-data", "analisis-spss", "publikasi-sinta", "web-engineering"]}
          title="Entitas Knowledge Graph & Metodologi Terkait"
        />

        {/* Bottom Consultation Desk */}
        <section className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-10 space-y-6 text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
              Butuh Diskusi Awal Terkait Skema Spasial Anda?
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-sans">
              Kirimkan draf kriteria penelitian atau koordinat area kajian (AOI) Anda. Saya akan memeriksa kesesuaian metodologi dan ketersediaan data satelit terlebih dahulu sebelum menyepakati kerja sama.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <ProtectedContact
              type="whatsapp"
              label="Konsultasi Langsung via WhatsApp"
              prefillMessage="Halo Mas Zadit, saya ingin berdiskusi mengenai kebutuhan analisis spasial, GIS, atau citra satelit lingkungan."
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold py-3 px-6 rounded-xl text-sm transition-colors shadow-lg"
            />
            <Link
              href="/layanan/"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-200 hover:text-white uppercase tracking-wider transition-colors"
            >
              <span>Jelajahi Solusi Lainnya</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
