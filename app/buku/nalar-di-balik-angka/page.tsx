"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  ArrowRight, 
  ExternalLink, 
  Sliders, 
  Sparkles, 
  Compass, 
  Scale, 
  Eye, 
  HelpCircle,
  Mail,
  Send,
  CheckCircle2
} from "lucide-react";

export default function MonografNalarDiBalikAngkaPage() {
  // Simulasi interaktif: Sumbu Y Terpotong vs Sumbu Jujur
  const [isTruncated, setIsTruncated] = useState(true);
  
  // Form dialog/peminatan pembaca
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "Guru / Pendidik", note: "" });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/85 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold text-sm">
              Z
            </span>
            <span className="font-heading font-semibold text-slate-200 group-hover:text-white transition-colors">
              Zadit <span className="text-slate-400 font-normal">/ Buku</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link 
              href="https://zadevpenseo.github.io/monograf/nalar-di-balik-angka/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Baca Online Gratis</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-teal-300">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>Buku Sains Populer Terbuka</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.2]">
          Nalar di Balik Angka
        </h1>

        <p className="text-lg sm:text-xl text-teal-300/90 font-medium max-w-2xl mx-auto leading-relaxed">
          Membongkar Ilusi Grafik, Menghidupkan Intuisi Statistika, dan Menumbuhkan Sikap Kritis
        </p>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Ketika grafik di media sosial, berita televisi, dan ruang rapat kantor tampak begitu meyakinkan, 
          apakah kita benar-benar memahami apa yang sedang diceritakan, atau kita hanya terpukau oleh gambar yang rapi?
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="https://zadevpenseo.github.io/monograf/nalar-di-balik-angka/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all shadow-lg shadow-teal-500/20"
          >
            <BookOpen className="w-4 h-4" />
            <span>Mulai Membaca Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#daftar-isi"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
          >
            <span>Lihat Garis Besar Bab</span>
          </a>
        </div>

        <div className="pt-6 text-xs text-slate-400 flex items-center justify-center gap-2">
          <span>Ditulis oleh <strong className="text-slate-200">Muhammad Khoiruzzadittaqwa</strong></span>
          <span>•</span>
          <span>Akses Bebas Biaya</span>
        </div>
      </section>

      {/* Interactive Teaser Widget */}
      <section className="py-16 px-4 sm:px-6 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs text-teal-400">
              <Sliders className="w-3.5 h-3.5" />
              <span>Eksperimen Sederhana</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Coba Sendiri: Bagaimana Grafik Bisa Mempermainkan Mata Kita?
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
              Bayangkan persentase kepuasan pelanggan naik tipis dari <strong>98,2%</strong> ke <strong>99,4%</strong>. 
              Ganti cara penyajian sumbu di bawah ini untuk melihat perbedaannya.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <span className="text-xs sm:text-sm font-medium text-slate-300">
                Pilih Sudut Pandang Grafik:
              </span>
              <div className="inline-flex p-1 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setIsTruncated(true)}
                  className={`px-3.5 py-1.5 rounded-md font-medium transition-all ${
                    isTruncated 
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Sumbu Terpotong (97% - 100%)
                </button>
                <button
                  type="button"
                  onClick={() => setIsTruncated(false)}
                  className={`px-3.5 py-1.5 rounded-md font-medium transition-all ${
                    !isTruncated 
                      ? "bg-teal-500/20 text-teal-300 border border-teal-500/30" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Sumbu Proporsional (0% - 100%)
                </button>
              </div>
            </div>

            {/* Visual Bars */}
            <div className="h-56 flex items-end justify-center gap-12 sm:gap-20 px-6 pb-6 pt-4 rounded-xl bg-slate-900/30 border border-slate-800/60 relative">
              <div className="absolute left-4 top-4 bottom-6 flex flex-col justify-between text-[11px] font-mono text-slate-400">
                <span>100%</span>
                <span>{isTruncated ? "98,5%" : "50%"}</span>
                <span>{isTruncated ? "97,0%" : "0%"}</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-mono font-medium text-slate-300">98,2%</span>
                <div 
                  className="w-16 sm:w-24 rounded-t bg-slate-700 transition-all duration-300"
                  style={{ height: isTruncated ? "60px" : "150px" }}
                />
                <span className="text-xs text-slate-400">Tahun Lalu</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <span className={`text-xs font-mono font-bold ${isTruncated ? "text-rose-400" : "text-teal-400"}`}>
                  99,4%
                </span>
                <div 
                  className={`w-16 sm:w-24 rounded-t transition-all duration-300 ${
                    isTruncated ? "bg-rose-500" : "bg-teal-500"
                  }`}
                  style={{ height: isTruncated ? "160px" : "154px" }}
                />
                <span className="text-xs text-slate-400">Tahun Ini</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed border ${
              isTruncated 
                ? "bg-rose-950/20 border-rose-500/30 text-rose-200" 
                : "bg-teal-950/20 border-teal-500/30 text-teal-200"
            }`}>
              {isTruncated ? (
                <p>
                  <strong>Sumbu Terpotong:</strong> Batang tahun ini tampak hampir <strong>tiga kali lipat</strong> lebih tinggi. Kesan pertama yang tertangkap mata adalah lonjakan luar biasa, padahal kenaikan aslinya hanya 1,2%. Ini trik paling umum yang sering lolos di presentasi laporan.
                </p>
              ) : (
                <p>
                  <strong>Sumbu Lengkap:</strong> Kedua batang tampak setara dan wajar. Mata kita melihat kenyataan yang jujur: kinerja tahun lalu sudah sangat tinggi, dan kenaikan tahun ini adalah penyempurnaan bertahap yang proporsional.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mengapa Buku Ini Ditulis */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Buku Ini untuk Siapa?
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Statistika bukan sekadar milik peneliti di laboratorium atau analis di ruang server.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-semibold text-white text-base">Pendidik & Guru</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Membantu murid beralih dari sekadar menghafal rumus hitungan ke kemampuan memahami makna di balik angka, membaca grafik dengan benar, dan mengajukan pertanyaan kritis.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-semibold text-white text-base">Orang Tua & Masyarakat</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Membentengi keluarga dari klaim kesehatan palsu, judul berita yang menyesatkan, dan infografis provokatif di media sosial yang sengaja memotong data demi sensasi.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-semibold text-white text-base">Profesional & Pengambil Keputusan</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Menghindari keputusan keliru di ruang rapat akibat korelasi palsu, perancu tersembunyi, atau ringkasan data rata-rata yang mengaburkan realitas kelompok sebenarnya.
            </p>
          </div>
        </div>
      </section>

      {/* Daftar Isi / Ringkasan Bab */}
      <section id="daftar-isi" className="py-20 px-4 sm:px-6 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Garis Besar Perjalanan Buku
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Delapan bab yang membawa pembaca dari kekeliruan umum hingga panduan praktis keseharian.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-teal-400 block">BAGIAN I: ILUSI VISUAL</span>
                <h4 className="text-base font-semibold text-white">1. Menghafal Rumus, Buta Makna & 2. Anatomi Manipulasi Visual</h4>
                <p className="text-slate-400 text-xs mt-1">
                  Mengapa seseorang yang pandai berhitung bisa terkecoh grafik, dan bagaimana 6 trik visual sering mengelabui mata kita.
                </p>
              </div>
              <Link 
                href="https://zadevpenseo.github.io/monograf/nalar-di-balik-angka/bab-01-menghafal-rumus-buta-makna/"
                target="_blank"
                className="text-xs text-teal-400 hover:underline shrink-0 flex items-center gap-1"
              >
                <span>Baca Bab 1</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-indigo-400 block">BAGIAN II: KOMPAS NILAI</span>
                <h4 className="text-base font-semibold text-white">3. Epistemologi Tabayyun & 4. Amanah dan Tawazun</h4>
                <p className="text-slate-400 text-xs mt-1">
                  Seni menguji sumber data dan sampel, serta pentingnya melihat proporsi kelompok agar tidak terjebak paradoks statistik.
                </p>
              </div>
              <Link 
                href="https://zadevpenseo.github.io/monograf/nalar-di-balik-angka/bab-03-epistemologi-tabayyun-seni-menguji-klaim/"
                target="_blank"
                className="text-xs text-indigo-400 hover:underline shrink-0 flex items-center gap-1"
              >
                <span>Baca Bab 3</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 block">BAGIAN III: REVOLUSI LAYAR</span>
                <h4 className="text-base font-semibold text-white">5. Mengapa Kertas Membekukan Nalar? & 6. Laboratorium Visual</h4>
                <p className="text-slate-400 text-xs mt-1">
                  Beban pikiran saat berkutat dengan hitungan manual dan bagaimana simulasi visual membantu kita melihat keteraturan jangka panjang.
                </p>
              </div>
              <Link 
                href="https://zadevpenseo.github.io/monograf/nalar-di-balik-angka/bab-05-mengapa-kertas-membekukan-nalar/"
                target="_blank"
                className="text-xs text-emerald-400 hover:underline shrink-0 flex items-center gap-1"
              >
                <span>Baca Bab 5</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-amber-400 block">BAGIAN IV: PRAKSIS DAN MASA DEPAN</span>
                <h4 className="text-base font-semibold text-white">7. Nalar Kritis di Sekolah & Rumah & 8. Menavigasi Dunia Algoritma</h4>
                <p className="text-slate-400 text-xs mt-1">
                  Panduan tiga tangga literasi data untuk ruang kelas dan keluarga, serta cara bersikap tenang di tengah banjir kecerdasan buatan.
                </p>
              </div>
              <Link 
                href="https://zadevpenseo.github.io/monograf/nalar-di-balik-angka/bab-07-membimbing-nalar-kritis-di-sekolah-dan-rumah/"
                target="_blank"
                className="text-xs text-amber-400 hover:underline shrink-0 flex items-center gap-1"
              >
                <span>Baca Bab 7</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Profil Penulis Singkat & Membumi */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center font-bold text-teal-400 text-lg">
              MZ
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white">Muhammad Khoiruzzadittaqwa</h3>
              <p className="text-xs text-slate-400">Pendidik Matematika & Praktisi Analisis Data</p>
            </div>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Menaruh minat mendalam pada bagaimana cara manusia belajar dan bernalar dengan angka. 
            Melalui buku ini, penulis berupaya menjembatani teori matematika dengan kehidupan nyata, 
            agar siapa pun bisa membedakan antara fakta objektif dan manipulasi visual secara percaya diri.
          </p>
        </div>
      </section>

      {/* Hubungi Penulis / Dialog Pembaca */}
      <section className="py-16 px-4 sm:px-6 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
              <span>Ruang Diskusi & Berbagi</span>
            </div>
            <h2 className="font-heading text-2xl font-bold text-white">
              Punya Tanggapan atau Pertanyaan?
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Jika Anda seorang pendidik, orang tua, atau pembaca yang ingin berbagi pengalaman seputar literasi data, silakan kirimkan pesan singkat Anda.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 rounded-xl bg-teal-950/30 border border-teal-500/30 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-teal-400 mx-auto" />
              <h4 className="font-semibold text-white text-sm">Pesan Berhasil Terkirim</h4>
              <p className="text-slate-300 text-xs">
                Terima kasih telah meluangkan waktu. Kami akan membaca tanggapan Anda dengan senang hati.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300">Nama</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nama Anda"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alamat@email.com"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300">Pesan atau Tanggapan</label>
                <textarea
                  rows={3}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Tuliskan pengalaman atau pertanyaan Anda seputar literasi data..."
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Pesan</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800 text-center text-xs text-slate-500 space-y-2">
        <div className="flex justify-center items-center gap-4 text-slate-400">
          <Link href="/" className="hover:text-slate-200">Beranda</Link>
          <span>•</span>
          <Link href="https://zadevpenseo.github.io/monograf/nalar-di-balik-angka/" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">
            Web Reader Lengkap
          </Link>
        </div>
        <p>© 2026 Muhammad Khoiruzzadittaqwa · Didedikasikan untuk keterbukaan ilmu dan nalar kritis masyarakat.</p>
      </footer>
    </div>
  );
}
