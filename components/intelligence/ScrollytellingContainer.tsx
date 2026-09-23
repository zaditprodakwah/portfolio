"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Radio, 
  TrendingUp, 
  Bot, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  Clock, 
  Database,
  ArrowRight
} from "lucide-react";

interface BeatContent {
  id: number;
  tag: string;
  headline: string;
  subhead: string;
  quote: string;
  takeaway: string;
}

const BEATS: BeatContent[] = [
  {
    id: 1,
    tag: "TANTANGAN KEPUTUSAN",
    headline: "Tebakan yang salah di pasar berujung pada biaya tinggi.",
    subhead: "Banyak keputusan penting diambil berdasarkan laporan bulanan yang sudah lewat masa berlakunya atau sekadar dugaan internal. Ketika pesaing Anda mengamati dinamika pasar setiap hari, bertindak lambat berarti membiarkan peluang berpindah tangan.",
    quote: "Mengetahui perubahan pasar lebih awal memberikan ruang negosiasi yang jauh lebih kuat.",
    takeaway: "Kendala umum: Terlambat mengetahui kehabisan stok lawan atau perubahan harga tender."
  },
  {
    id: 2,
    tag: "KECEPATAN INFORMASI",
    headline: "Aktivitas fisik di lapangan memberikan sinyal lebih awal.",
    subhead: "Laporan resmi membutuhkan waktu berminggu-minggu untuk disusun, tetapi pergerakan armada fisik terjadi saat ini juga. Kepadatan kapal di pelabuhan muara atau antrean tongkang di jalur sungai memperingatkan potensi keterlambatan kargo berhari-hari sebelum kendala tersebut menjadi berita.",
    quote: "Peringatan anomali memisahkan variasi harian biasa dari lonjakan hambatan logistik yang nyata.",
    takeaway: "Manfaat nyata: Memitigasi risiko biaya tunggu kapal dengan prediksi kepadatan zona labuh."
  },
  {
    id: 3,
    tag: "DINAMIKA PENJUALAN",
    headline: "Membaca ritme pasar dari pergerakan persediaan barang.",
    subhead: "Dengan memantau perubahan jumlah barang di etalase secara teratur, Anda dapat memetakan produk mana yang laris dan mana yang bergerak lambat. Ketika barang utama pesaing habis, tim Anda bisa segera memanfaatkan permintaan pembeli yang tidak terlayani.",
    quote: "Momen terbaik memperkuat penawaran adalah saat calon pembeli mencari barang dan pesaing kehabisan stok.",
    takeaway: "Manfaat nyata: Menangkap pembeli aktif dan menegakkan kepatuhan batas harga reseller resmi."
  },
  {
    id: 4,
    tag: "KEANDALAN SISTEM",
    headline: "Pengumpulan data yang stabil dan terverifikasi otomatis.",
    subhead: "Mengambil data secara manual memakan waktu tim, sementara skrip sederhana sering rusak saat situs target berganti tampilan. Kami membangun alur kerja otomatis dengan validasi skema ganda, penyaringan anomali, dan pengecekan silang berkelanjutan.",
    quote: "Sistem yang baik bekerja konsisten di latar belakang sehingga tim Anda fokus pada eksekusi bisnis.",
    takeaway: "Manfaat nyata: Alur data bersih tanpa kekhawatiran skrip macet di tengah jalan."
  },
  {
    id: 5,
    tag: "HASIL SIAP PAKAI",
    headline: "Informasi ringkas yang langsung dapat ditindaklanjuti.",
    subhead: "Kami tidak mengirimkan tumpukan berkas yang membingungkan. Setiap penyerahan sudah dirapikan ke dalam lembar kerja spreadsheet yang jelas, basis data yang mudah dicari, atau notifikasi pesan otomatis yang siap dijadikan dasar rapat direksi.",
    quote: "Nilai data diukur dari seberapa cepat tim manajemen dapat mengambil tindakan nyata.",
    takeaway: "Jaminan kerja: Anda memeriksa sampel 50 baris pertama terlebih dahulu sebelum membuka data lengkap."
  }
];

export default function ScrollytellingContainer() {
  const [activeBeat, setActiveBeat] = useState<number>(1);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.45;
      
      beatRefs.current.forEach((el, index) => {
        if (!el) return;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveBeat(index + 1);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative bg-[#0b0d11] text-[#f3f4f6] py-20 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#10b981] px-3 py-1 rounded bg-[#141820] border border-[#10b981]/20">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>ALUR KERJA DAN TRANSFORMASI DATA</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#f3f4f6] tracking-tight">
            Bagaimana Informasi Lapangan Membantu Bisnis Anda
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af]">
            Gulir layar untuk melihat perbandingan antara keterlambatan informasi konvensional dan kecepatan pemantauan lapangan langsung.
          </p>
        </div>

        {/* 2-Column Scrollytelling Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          
          {/* Left Column: STICKY DYNAMIC VISUAL TERMINAL */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 z-20 space-y-4">
            <div className="rounded-xl bg-[#141820] border border-white/10 p-5 shadow-2xl relative overflow-hidden backdrop-blur-sm">
              
              {/* Terminal Window Chrome */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono text-[#9ca3af]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80" />
                  <span className="ml-2 text-white/60">Simulasi Pemantauan Lapangan</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#10b981] animate-pulse">● AKTIF</span>
                  <span className="text-white/40">Bagian {activeBeat} dari 5</span>
                </div>
              </div>

              {/* Dynamic Visual States Based on activeBeat */}
              <div className="min-h-[380px] flex flex-col justify-between">
                
                {/* STATE 1: KETERLAMBATAN INFORMASI */}
                {activeBeat === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="p-3.5 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/30 flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-[#ef4444] shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <div className="font-semibold text-[#ef4444] font-mono">SITUASI UMUM: KETERLAMBATAN INFORMASI</div>
                        <div className="text-[#9ca3af]">Keputusan bersandar pada laporan bulanan lama. Dampaknya: harga lelang tidak kompetitif dan stok habis tidak terpantau.</div>
                      </div>
                    </div>

                    <div className="space-y-2 opacity-50 filter blur-[0.8px] select-none pointer-events-none">
                      <div className="h-6 bg-white/5 rounded w-3/4 animate-pulse" />
                      <div className="h-20 bg-white/5 rounded w-full" />
                      <div className="h-12 bg-white/5 rounded w-5/6" />
                    </div>

                    <div className="p-4 rounded bg-[#1a202c] border border-white/5 text-xs font-mono space-y-2">
                      <div className="text-[#9ca3af]">// Titik Buta yang Sering Terjadi:</div>
                      <div className="text-[#ef4444] font-mono">&gt; Kehabisan stok barang di toko pesaing: Terlambat diketahui</div>
                      <div className="text-[#ef4444] font-mono">&gt; Pelanggaran harga acuan oleh reseller: Tidak terdeteksi</div>
                      <div className="text-[#ef4444] font-mono">&gt; Antrean kapal di pelabuhan: Menimbulkan denda tunggu</div>
                    </div>
                  </div>
                )}

                {/* STATE 2: PHYSICAL TELEMETRY (PRIOK H3) */}
                {activeBeat === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="p-3.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30 flex items-start gap-3">
                      <Radio className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5 animate-pulse" />
                      <div className="text-xs space-y-1">
                        <div className="font-semibold text-[#10b981] font-mono">STUDI KASUS: PEMANTAUAN LOGISTIK PELABUHAN</div>
                        <div className="text-[#9ca3af]">Area Labuh Luar Tanjung Priok (Radius pemantauan ~400 meter)</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-[#0b0d11] border border-white/10 font-mono text-xs space-y-2">
                      <div className="flex justify-between text-[#9ca3af]">
                        <span>ZONA_PANTAU</span>
                        <span className="text-[#10b981]">Area Labuh Luar Priok</span>
                      </div>
                      <div className="flex justify-between text-[#9ca3af]">
                        <span>RATA-RATA KAPAL (14 HARI)</span>
                        <span>17 - 18 Kapal</span>
                      </div>
                      <div className="flex justify-between text-[#9ca3af]">
                        <span>ARMADA SAAT INI</span>
                        <span className="text-[#f59e0b] font-bold">35 Kapal (Meningkat)</span>
                      </div>
                      <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                        <span className="text-[#f3f4f6]">STATUS KEPADATAN</span>
                        <span className="px-2 py-0.5 rounded bg-[#ef4444]/20 text-[#ef4444] font-bold border border-[#ef4444]/40">
                          LONJAKAN ANOMALI TERDETEKSI
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] text-[#9ca3af] font-mono bg-[#1a202c] p-2.5 rounded">
                      &gt; Langkah: Waktu tunggu diperkirakan naik 3-4 jam. Rekomendasi penyesuaian jadwal armada langsung dikirimkan ke tim logistik.
                    </div>
                  </div>
                )}

                {/* STATE 3: MULTI-CYCLE VELOCITY (SKU DELTA) */}
                {activeBeat === 3 && (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="p-3.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30 flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <div className="font-semibold text-[#10b981] font-mono">STUDI KASUS: PERGERAKAN STOK TOKO RITEL</div>
                        <div className="text-[#9ca3af]">Membandingkan perubahan persediaan setiap 6 jam</div>
                      </div>
                    </div>

                    <div className="p-3 rounded bg-[#0b0d11] border border-white/10 text-xs font-mono space-y-2 overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="text-[#9ca3af] border-b border-white/10 pb-1">
                            <th className="py-1">PRODUK</th>
                            <th className="py-1">STOK</th>
                            <th className="py-1">KETERANGAN</th>
                            <th className="py-1 text-right">ESTIMASI NILAI</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          <tr>
                            <td className="py-1 text-[#f3f4f6]">Serum Wajah 30ml</td>
                            <td className="py-1 text-[#ef4444]">48 &rarr; 0</td>
                            <td className="py-1 text-[#ef4444] font-semibold">Stok Habis</td>
                            <td className="py-1 text-right text-[#10b981]">Rp 7.200.000</td>
                          </tr>
                          <tr>
                            <td className="py-1 text-[#f3f4f6]">Krim Malam 50g</td>
                            <td className="py-1 text-[#9ca3af]">12 &rarr; 8</td>
                            <td className="py-1 text-[#10b981]">Terjual Aktif</td>
                            <td className="py-1 text-right text-[#10b981]">Rp 840.000</td>
                          </tr>
                          <tr>
                            <td className="py-1 text-[#f3f4f6]">Sabun Pembersih</td>
                            <td className="py-1 text-[#9ca3af]">2 &rarr; 50</td>
                            <td className="py-1 text-[#f59e0b]">Stok Masuk</td>
                            <td className="py-1 text-right text-white/40">Restock</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="p-3 rounded bg-[#1a202c] border border-white/5 text-xs font-mono flex items-center justify-between">
                      <span className="text-[#9ca3af]">Tindakan:</span>
                      <span className="text-[#10b981] font-semibold">Peluang promosi aktif untuk produk pengganti</span>
                    </div>
                  </div>
                )}

                {/* STATE 4: SWARM INTELLIGENCE */}
                {activeBeat === 4 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="p-3.5 rounded-lg bg-[#8f652e]/10 border border-[#8f652e]/30 flex items-start gap-3">
                      <Bot className="w-5 h-5 text-[#8f652e] shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <div className="font-semibold text-[#8f652e] font-mono">ARSITEKTUR PENGECEKAN GANDA</div>
                        <div className="text-[#9ca3af]">Tiga tahapan pengolahan data otomatis untuk akurasi maksimal</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                      <div className="p-3 rounded bg-[#0b0d11] border border-[#10b981]/30 space-y-1">
                        <div className="text-[#10b981] font-bold">TAHAP 1</div>
                        <div className="text-[#f3f4f6]">Pemindaian</div>
                        <div className="text-[10px] text-[#9ca3af]">Pencarian sumber resmi</div>
                      </div>
                      <div className="p-3 rounded bg-[#0b0d11] border border-[#10b981]/30 space-y-1">
                        <div className="text-[#10b981] font-bold">TAHAP 2</div>
                        <div className="text-[#f3f4f6]">Validasi</div>
                        <div className="text-[10px] text-[#9ca3af]">Pemeriksaan format kolom</div>
                      </div>
                      <div className="p-3 rounded bg-[#0b0d11] border border-[#10b981]/30 space-y-1">
                        <div className="text-[#10b981] font-bold">TAHAP 3</div>
                        <div className="text-[#f3f4f6]">Penyusunan</div>
                        <div className="text-[10px] text-[#9ca3af]">Penyaringan data ganda</div>
                      </div>
                    </div>

                    <div className="p-3 rounded bg-[#1a202c] border border-white/5 font-mono text-[11px] text-[#9ca3af] space-y-1">
                      <div>&gt; Penanganan otomatis saat format halaman sumber berubah</div>
                      <div>&gt; Perlindungan privasi dan kepatuhan aturan akses informasi publik</div>
                    </div>
                  </div>
                )}

                {/* STATE 5: DECISION READY VALUE */}
                {activeBeat === 5 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="p-3.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <div className="font-semibold text-[#10b981] font-mono">FORMAT BERSIH SIAP PAKAI</div>
                        <div className="text-[#9ca3af]">Dapat langsung dianalisis di Excel atau diintegrasikan ke sistem Anda</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="p-2.5 rounded bg-[#0b0d11] border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-[#10b981]" />
                          <span>Lembar Kerja Excel / CSV Terstruktur</span>
                        </div>
                        <span className="text-[#10b981]">Lengkap</span>
                      </div>
                      <div className="p-2.5 rounded bg-[#0b0d11] border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#f59e0b]" />
                          <span>Peringatan Pesan Telegram Harian</span>
                        </div>
                        <span className="text-[#10b981]">Otomatis</span>
                      </div>
                      <div className="p-2.5 rounded bg-[#0b0d11] border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-[#8f652e]" />
                          <span>Akses API Aman (Opsional Korporat)</span>
                        </div>
                        <span className="text-[#10b981]">Tersedia</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href="#two-stage-guarantee"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] font-bold text-xs font-mono transition-all"
                      >
                        <span>Minta Sampel Data Target Anda</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#9ca3af]">
                <span>Standar: Integritas Data Terverifikasi</span>
                <span className="text-[#10b981]">PRADIKTIF DATA LAB</span>
              </div>
            </div>
          </div>

          {/* Right Column: SCROLLING NARRATIVE TRACK */}
          <div className="lg:col-span-6 space-y-24 py-12">
            {BEATS.map((beat, index) => {
              const isActive = activeBeat === beat.id;
              return (
                <div
                  key={beat.id}
                  ref={(el) => { beatRefs.current[index] = el; }}
                  className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                    isActive 
                      ? "bg-[#141820] border-[#10b981]/40 shadow-xl shadow-[#10b981]/5 scale-[1.01]" 
                      : "bg-[#0b0d11]/50 border-white/5 opacity-40 hover:opacity-75"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold tracking-wider text-[#10b981]">
                        {beat.tag}
                      </span>
                      <span className="text-xs font-mono text-[#9ca3af]">
                        Poin {beat.id} dari 5
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-semibold text-[#f3f4f6] leading-tight">
                      {beat.headline}
                    </h3>

                    <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
                      {beat.subhead}
                    </p>

                    <blockquote className="p-4 rounded-lg bg-[#1a202c]/60 border-l-2 border-[#10b981] text-xs sm:text-sm text-[#f3f4f6]/90 italic">
                      &ldquo;{beat.quote}&rdquo;
                    </blockquote>

                    {/* Measured Takeaway Box */}
                    <div className="pt-3 border-t border-white/10 text-xs font-mono text-[#10b981] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                      <span>{beat.takeaway}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
