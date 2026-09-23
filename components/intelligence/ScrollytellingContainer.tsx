"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  EyeOff, 
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
    tag: "BABAK 1 // KEBUTAAN DATA",
    headline: "Tebakan yang salah di pasar harganya mahal.",
    subhead: "Keputusan bernilai miliaran rupiah sering kali diambil dari klaim sepihak kompetitor atau data laporan bulanan yang sudah basi. Anda tidak bisa memenangkan persaingan hanya bermodal intuisi ketika lawan mengamati setiap langkah Anda.",
    quote: "Ketiadaan visibilitas lapangan bukan sekadar hambatan operasional, melainkan kebocoran margin yang terus mengalir.",
    takeaway: "Indikasi Masalah: Buta terhadap pergerakan stok lawan dan keterlambatan respon lelang pasar."
  },
  {
    id: 2,
    tag: "BABAK 2 // TELEMETRI FISIK",
    headline: "Pergerakan fisik di lapangan tidak bisa berbohong.",
    subhead: "Ketika laporan keuangan baru terbit 3 bulan sekali, telemetri fisik terjadi setiap detik. Lonjakan kapal labuh jangkar di Tanjung Priok atau antrean tongkang di sungai Mahakam memberi sinyal kemacetan logistik dan kenaikan biaya demurrage 7 hari sebelum berita korporat beredar.",
    quote: "Kontrol Proses Statistik (SPC) memisahkan fluktuasi normal dari anomali 3-Sigma yang nyata.",
    takeaway: "Sinyal Nyata: H3 Hex Cell Resolusi 8 mencatat lonjakan dwell-time +220 menit dan Z-Score +3.53 Sigma."
  },
  {
    id: 3,
    tag: "BABAK 3 // MULTI-CYCLE VELOCITY",
    headline: "Membongkar omset lawan dari mutasi katalog.",
    subhead: "Dengan melacak selisih persediaan katalog setiap siklus, engine kami memisahkan mana produk yang benar-benar laku terjual dari produk yang sekadar pajangan. Begitu stok kompetitor utama menyentuh angka nol, sinyal Out-of-Stock conquesting langsung aktif.",
    quote: "Jangan bakar anggaran iklan saat lawan siap siaga. Lipatgandakan konversi saat rak mereka kosong.",
    takeaway: "Metrik Terkunci: 50 SKU dipantau, Inferred GMV terhitung presisi, deteksi pelanggaran batas harga MAP."
  },
  {
    id: 4,
    tag: "BABAK 4 // SWARM INTELLIGENCE",
    headline: "Pasukan agen otonom, bukan bot scraping rapuh.",
    subhead: "Scraping tradisional mudah tumbang saat struktur web berubah. Kami mengerahkan Swarm Orchestrator dengan 3 peran terspesialisasi: Scout menemukan sumber, Extractor memvalidasi skema, dan Synthesizer membersihkan anomali menjadi format terstruktur.",
    quote: "Evolusi dari skrip rapuh menuju arsitektur multi-agen deterministik berkapasitas ribuan node.",
    takeaway: "Keandalan Sistem: Pengecekan silang otomatis, validasi skema Zod, dan nol data palsu."
  },
  {
    id: 5,
    tag: "BABAK 5 // KEPUTUSAN TERARAH",
    headline: "50 baris data valid lebih berharga daripada 50 jam rapat.",
    subhead: "Kami tidak menjual tumpukan data mentah yang membingungkan. Kami menyerahkan bukti siap pakai dalam format CSV bersih, database SQLite terenkripsi, atau alert instan Telegram yang langsung memicu aksi bisnis nyata.",
    quote: "Data terbaik adalah data yang mempercepat eksekusi dan mengunci keuntungan sebelum pasar menyadarinya.",
    takeaway: "Model Serah Terima: 50 baris sampel gratis ber-watermark sebelum pembukaan master data penuh."
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
            <span>NARRATIVE FLIGHT LOG // BAGAIMANA INTELIJEN BEKERJA</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#f3f4f6] tracking-tight">
            Dari Titik Buta Menjadi Keunggulan Mutlak
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af]">
            Gulir perlahan untuk melihat bagaimana telemetri mentah ditransformasikan menjadi sinyal keputusan deterministik.
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
                  <span className="ml-2 text-white/60">SPECTRE_TELEMETRY_ENGINE.sh</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#10b981] animate-pulse">● LIVE</span>
                  <span className="text-white/40">BEAT 0{activeBeat}/05</span>
                </div>
              </div>

              {/* Dynamic Visual States Based on activeBeat */}
              <div className="min-h-[380px] flex flex-col justify-between">
                
                {/* STATE 1: BLINDSPOT */}
                {activeBeat === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="p-3 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/30 flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-[#ef4444] shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <div className="font-semibold text-[#ef4444] font-mono">STATUS: HIGH LATENCY & DATA BLINDNESS</div>
                        <div className="text-[#9ca3af]">Keputusan bersandar pada laporan bulanan. Estimasi kerugian akibat salah patokan harga dan keterlambatan info lelang.</div>
                      </div>
                    </div>

                    <div className="space-y-2 opacity-50 filter blur-[0.8px] select-none pointer-events-none">
                      <div className="h-6 bg-white/5 rounded w-3/4 animate-pulse" />
                      <div className="h-20 bg-white/5 rounded w-full" />
                      <div className="h-12 bg-white/5 rounded w-5/6" />
                    </div>

                    <div className="p-4 rounded bg-[#1a202c] border border-white/5 text-xs font-mono space-y-2">
                      <div className="text-[#9ca3af]">// DIAGNOSTIK KEBUTAAN PASAR:</div>
                      <div className="text-[#ef4444] font-mono">&gt; Out-of-Stock Competitor: TIDAK TERDETEKSI</div>
                      <div className="text-[#ef4444] font-mono">&gt; Pelanggaran Batas Harga MAP: TIDAK DIKETAHUI</div>
                      <div className="text-[#ef4444] font-mono">&gt; Risiko Demurrage Pelabuhan: TINGGI (TANPA PREDIKSI)</div>
                    </div>
                  </div>
                )}

                {/* STATE 2: PHYSICAL TELEMETRY (PRIOK H3) */}
                {activeBeat === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="p-3 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30 flex items-start gap-3">
                      <Radio className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5 animate-pulse" />
                      <div className="text-xs space-y-1">
                        <div className="font-semibold text-[#10b981] font-mono">ZONA MARITIM: PELABUHAN TANJUNG PRIOK</div>
                        <div className="text-[#9ca3af]">Resolusi Grid Uber H3 Res-8 (~400m radius perimeter labuh luar)</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-[#0b0d11] border border-white/10 font-mono text-xs space-y-2">
                      <div className="flex justify-between text-[#9ca3af]">
                        <span>H3_INDEX</span>
                        <span className="text-[#10b981]">h3_08_+0000361_-0000023</span>
                      </div>
                      <div className="flex justify-between text-[#9ca3af]">
                        <span>BASELINE_ARMADA (14D)</span>
                        <span>17.6 KAPAL</span>
                      </div>
                      <div className="flex justify-between text-[#9ca3af]">
                        <span>DETEKSI_AKTUAL</span>
                        <span className="text-[#f59e0b] font-bold">35 KAPAL KOMERSIAL</span>
                      </div>
                      <div className="flex justify-between text-[#9ca3af]">
                        <span>STANDAR_DEVIASI</span>
                        <span>4.93</span>
                      </div>
                      <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                        <span className="text-[#f3f4f6]">SKOR_Z-SCORE (SPC)</span>
                        <span className="px-2 py-0.5 rounded bg-[#ef4444]/20 text-[#ef4444] font-bold border border-[#ef4444]/40">
                          +3.53 SIGMA [ANOMALI]
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] text-[#9ca3af] font-mono bg-[#1a202c] p-2.5 rounded">
                      &gt; PREDIKSI: Dwell time naik +220 menit. Rekomendasi mitigasi rute tongkang segera dikirim ke Telegram.
                    </div>
                  </div>
                )}

                {/* STATE 3: MULTI-CYCLE VELOCITY (SKU DELTA) */}
                {activeBeat === 3 && (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="p-3 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30 flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <div className="font-semibold text-[#10b981] font-mono">E-COMMERCE DELTA VELOCITY ENGINE</div>
                        <div className="text-[#9ca3af]">Membandingkan Snapshot T-0 dan T-1 secara deterministik</div>
                      </div>
                    </div>

                    <div className="p-3 rounded bg-[#0b0d11] border border-white/10 text-xs font-mono space-y-2 overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="text-[#9ca3af] border-b border-white/10 pb-1">
                            <th className="py-1">SKU_ID</th>
                            <th className="py-1">STOK</th>
                            <th className="py-1">STATUS</th>
                            <th className="py-1 text-right">INFERRED_GMV</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          <tr>
                            <td className="py-1 text-[#f3f4f6]">SKU-A01</td>
                            <td className="py-1 text-[#ef4444]">48 &rarr; 0</td>
                            <td className="py-1 text-[#ef4444] font-semibold">[OUT_OF_STOCK]</td>
                            <td className="py-1 text-right text-[#10b981]">£1,440</td>
                          </tr>
                          <tr>
                            <td className="py-1 text-[#f3f4f6]">SKU-B14</td>
                            <td className="py-1 text-[#9ca3af]">12 &rarr; 8</td>
                            <td className="py-1 text-[#10b981]">[SALE_EVENT]</td>
                            <td className="py-1 text-right text-[#10b981]">£210</td>
                          </tr>
                          <tr>
                            <td className="py-1 text-[#f3f4f6]">SKU-C89</td>
                            <td className="py-1 text-[#9ca3af]">2 &rarr; 50</td>
                            <td className="py-1 text-[#f59e0b]">[RESTOCK]</td>
                            <td className="py-1 text-right text-white/40">£0</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="p-3 rounded bg-[#1a202c] border border-white/5 text-xs font-mono flex items-center justify-between">
                      <span className="text-[#9ca3af]">TOTAL INFERRED GMV:</span>
                      <span className="text-[#10b981] font-bold font-mono">£2,194 (50 SKU AUDITED)</span>
                    </div>
                  </div>
                )}

                {/* STATE 4: SWARM INTELLIGENCE */}
                {activeBeat === 4 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="p-3 rounded-lg bg-[#8f652e]/10 border border-[#8f652e]/30 flex items-start gap-3">
                      <Bot className="w-5 h-5 text-[#8f652e] shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <div className="font-semibold text-[#8f652e] font-mono">SWARM ORCHESTRATOR // 3 AGENT NODES</div>
                        <div className="text-[#9ca3af]">Eksekusi terdesentralisasi tanpa beban marginal waktu manusia</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                      <div className="p-3 rounded bg-[#0b0d11] border border-[#10b981]/30 space-y-1">
                        <div className="text-[#10b981] font-bold">NODE 01</div>
                        <div className="text-[#f3f4f6]">SCOUT</div>
                        <div className="text-[10px] text-[#9ca3af]">URL & DOM Discovery</div>
                      </div>
                      <div className="p-3 rounded bg-[#0b0d11] border border-[#10b981]/30 space-y-1">
                        <div className="text-[#10b981] font-bold">NODE 02</div>
                        <div className="text-[#f3f4f6]">EXTRACTOR</div>
                        <div className="text-[10px] text-[#9ca3af]">Zod Schema Parsing</div>
                      </div>
                      <div className="p-3 rounded bg-[#0b0d11] border border-[#10b981]/30 space-y-1">
                        <div className="text-[#10b981] font-bold">NODE 03</div>
                        <div className="text-[#f3f4f6]">SYNTHESIZER</div>
                        <div className="text-[10px] text-[#9ca3af]">Anomaly & Delta Risk</div>
                      </div>
                    </div>

                    <div className="p-3 rounded bg-[#1a202c] border border-white/5 font-mono text-[11px] text-[#9ca3af] space-y-1">
                      <div>&gt; Pipeline Integrity: 100% Deterministic (Zero AI Slop)</div>
                      <div>&gt; Anti-Fingerprint: Stealth CDP & Randomized Canvas TLS</div>
                    </div>
                  </div>
                )}

                {/* STATE 5: DECISION READY VALUE */}
                {activeBeat === 5 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="p-3 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <div className="font-semibold text-[#10b981] font-mono">DELIVERABLE TERVERIFIKASI // SIAP EKSEKUSI</div>
                        <div className="text-[#9ca3af]">Output langsung masuk ke alur kerja manajemen Anda</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="p-2.5 rounded bg-[#0b0d11] border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-[#10b981]" />
                          <span>DATABASE SQLITE / PARQUET BERSIH</span>
                        </div>
                        <span className="text-[#10b981]">READY</span>
                      </div>
                      <div className="p-2.5 rounded bg-[#0b0d11] border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#f59e0b]" />
                          <span>BOT TELEGRAM ALERT LAPANGAN</span>
                        </div>
                        <span className="text-[#10b981]">ACTIVE</span>
                      </div>
                      <div className="p-2.5 rounded bg-[#0b0d11] border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-[#8f652e]" />
                          <span>REST API ENDPOINT TERENKRIPSI</span>
                        </div>
                        <span className="text-[#10b981]">SECURE</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href="#two-stage-guarantee"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] font-bold text-xs font-mono transition-all"
                      >
                        <span>AMBIL SAMPEL 50 BARIS GRATIS TAHAP 1</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#9ca3af]">
                <span>STANDAR: ISO 9001 DATA HYGIENE</span>
                <span className="text-[#10b981]">PRADIKTIF ENGINE v2.4</span>
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
                        FASE {beat.id} DARI 5
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

                    {/* Measured Takeaway Box (Anti-empty card feet) */}
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
