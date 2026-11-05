import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, UserCheck, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, FileText } from "lucide-react";
import { DirectAnswerBox } from "@/components/DirectAnswerBox";
import { EntityPills } from "@/components/EntityPills";
import { ProtectedContact } from "@/components/ProtectedContact";

export const metadata: Metadata = {
  title: "Rekayasa Karir, CV ATS & Profil LinkedIn Eksekutif | Zadit",
  description:
    "Restrukturisasi profil LinkedIn dan CV ATS berbasis formula Google XYZ, standar Tri Dharma Dikti, serta penyerahan aman tanpa meminta kata sandi akun Anda.",
  alternates: {
    canonical: "https://muhzadit.pages.dev/layanan/karir-ats-linkedin-eksekutif/",
  },
  openGraph: {
    title: "Rekayasa Karir, CV ATS & Profil LinkedIn Eksekutif | Zadit",
    description:
      "Ubah profil LinkedIn menjadi landing page kemitraan bisnis dan lolos seleksi ATS dengan narasi berbasis metrik nyata, bebas joki, dan zero-password handover.",
    url: "https://muhzadit.pages.dev/layanan/karir-ats-linkedin-eksekutif/",
    images: [
      {
        url: "https://muhzadit.pages.dev/og-audit.jpg",
        width: 1200,
        height: 630,
        alt: "Rekayasa Karir & Optimasi LinkedIn Eksekutif | Zadit",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rekayasa Karir, CV ATS & Profil LinkedIn Eksekutif | Zadit",
    description:
      "Restrukturisasi profil LinkedIn dan CV ATS berbasis formula Google XYZ dan serah terima aman tanpa kata sandi.",
    images: ["https://muhzadit.pages.dev/og-audit.jpg"],
  },
};

export default function CareerLinkedInOptimizationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Rekayasa Karir, CV ATS & Profil LinkedIn Eksekutif",
    provider: {
      "@type": "Person",
      name: "Muhammad Khoiruzzadittaqwa",
      url: "https://muhzadit.pages.dev/",
    },
    description:
      "Layanan optimasi profil LinkedIn profesional, penyusunan CV ATS formula Google XYZ, dan Curriculum Vitae Akademik standar Tri Dharma Dikti dengan penyerahan aman tanpa kata sandi.",
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
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-900 hover:text-amber-950 uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Layanan</span>
        </Link>

        {/* Header Title */}
        <header className="space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200">
            <UserCheck className="w-3.5 h-3.5" />
            Pilar Layanan 05
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
            Menjadikan Profil LinkedIn Anda Landing Page Karir & Kemitraan
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
            Rekonstruksi narasi riwayat kerja berbasis formula Google XYZ, standar Tri Dharma Dikti, dan serah terima mandiri tanpa meminta kata sandi akun Anda.
          </p>
        </header>

        {/* Direct-Answer BLUF */}
        <DirectAnswerBox
          summary="Layanan optimasi profil kami menolak praktik meminta email dan kata sandi akun pribadi klien. Seluruh hasil kerja diserahkan melalui Master Blueprint salin-tempel siap pasang dalam 5 menit, spanduk visual terkurasi 1584x396px, dan narasi pencapaian berbasis data terukur yang menonjolkan otoritas keahlian Anda di hadapan rekruter maupun mitra bisnis."
          takeaways={[
            "Jaminan keamanan Zero-Password Handover: privasi akun terlindungi tanpa risiko pemblokiran algoritma LinkedIn.",
            "Intake santai 100% asinkron melalui catatan suara WhatsApp (Voice Note) tanpa kewajiban jadwal video call.",
            "Formula pencapaian Google XYZ: Accomplished [X] measured by [Y] by doing [Z] yang lolos seleksi mesin ATS.",
            "Segmentasi triad persona terarah: Akademisi/Dosen Tri Dharma, Korporat Industri, dan Pemilik Studio/Bisnis B2B."
          ]}
        />

        {/* Section: Mengapa Jasa Murahan Berbahaya */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
            Mengapa Jasa Murah Justru Merugikan Akun Anda?
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Di linimasa media sosial, banyak penawaran jasa LinkedIn Rp 20.000 hingga Rp 50.000 yang sekadar menyalin ulang CV usang ke Google Translate, atau lebih berisiko lagi: meminta data login pribadi klien. Memberikan kredensial login kepada pihak ketiga berpotensi memicu penguncian akun oleh sistem deteksi keamanan LinkedIn serta membocorkan pesan rahasia profesional Anda.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700 block">Risiko Keamanan</span>
              <p className="text-sm font-semibold text-slate-900">Kebocoran Kredensial</p>
              <p className="text-xs text-slate-600">Memberikan password melanggar ketentuan privasi dan rawan pembajakan akun.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700 block">Kelemahan Teks</span>
              <p className="text-sm font-semibold text-slate-900">AI Slop Tanpa Metrik</p>
              <p className="text-xs text-slate-600">Kalimat klise motivasional yang diabaikan rekruter dan gagal terindeks mesin pencari.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 block">Standar Zadit</span>
              <p className="text-sm font-semibold text-slate-900">Zero-Password Blueprint</p>
              <p className="text-xs text-slate-600">Anda menerima dokumen master siap tempel mandiri dalam 5 menit dengan kendali akun 100%.</p>
            </div>
          </div>
        </section>

        {/* Section: 3 Persona Layanan */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
              Arsitektur Profil Berbasis 3 Persona Spesifik
            </h2>
            <p className="text-sm sm:text-base text-slate-700">
              Setiap profil dirancang sesuai tujuan strategis karir Anda tanpa mencampuradukkan bahasa industri dengan kaidah kesarjanaan:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Akademisi & Calon Dosen
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Penyelarasan pilar Tri Dharma Perguruan Tinggi (Pendidikan, Penelitian, Pengabdian), daftar artikel jurnal SINTA/Scopus, dan orasi ilmiah standar PO-PAK Dikti.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>CV Akademik Typst Vektor</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Audit Keterlacakan Sitasi</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 border-teal-200 ring-1 ring-teal-100">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Korporat & Job Seeker
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pemadatan kata kunci teknis industri dan penulisan deskripsi pencapaian berbasis formula Google XYZ yang lolos saringan sistem ATS perusahaan.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  <span>Format CV ATS Standar Global</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  <span>Surat Lamaran Kerja Adaptif</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Founder Studio & Agensi
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Menjadikan profil sebagai B2B Landing Page: penataan proposisi nilai bisnis, etalase studi kasus transformasi klien, dan call to action kemitraan.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                  <span>Custom Banner Visual 1584x396px</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                  <span>Penataan Bagian Featured Portofolio</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Bukti Riil Kasus Lapangan */}
        <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <h2 className="text-lg sm:text-xl font-heading font-bold text-slate-900">
              Bukti Kerja Nyata: Kasus Seleksi Dosen Fisika PGSD
            </h2>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Pada proyek rekayasa karir <strong className="font-semibold text-slate-900">PROOF-DOSEN-001</strong>, kami merekonstruksi berkas Curriculum Vitae kandidat magister Pendidikan Fisika yang awalnya menuliskan riwayat kepemimpinan sekolah secara merendah sehingga berisiko tertolak dekanat. Melalui mesin Typst Oslo, penataan formula Google XYZ, dan penonjolan rekam jejak bimbingan les privat berbasis capaian siswa, berkas berhasil meloloskan kandidat pada formasi dosen PGSD.
          </p>
          <div className="pt-2">
            <Link
              href="/paket-solusi/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 hover:text-teal-950 underline underline-offset-4"
            >
              <span>Lihat kalkulator harga dan simulasi biaya paket karir</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Entity Pills */}
        <EntityPills
          entityIds={[
            "career-engineering",
            "linkedin-optimization",
            "proposal-kemitraan",
            "publikasi-sinta",
          ]}
        />

        {/* CTA Banner with Protected Contact */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold">Siap Mengubah Profil LinkedIn Menjadi Aset Konversi?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Diskusikan narasi karir dan portofolio Anda secara privat dan aman tanpa berbagi kata sandi.
            </p>
          </div>
          <ProtectedContact
            type="whatsapp"
            label="Konsultasi Karir via WhatsApp"
            prefillMessage="Halo Mas Zadit, saya membaca halaman Rekayasa Karir & Profil LinkedIn di muhzadit.pages.dev dan ingin berdiskusi mengenai optimasi profil dan rekonstruksi berkas karir kami."
            className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-xl shadow-xs transition-all"
          />
        </div>
      </div>
    </div>
  );
}

