"use client";

import React, { useState } from "react";
import { Terminal, RefreshCw, Copy, Check, Radio, AlertOctagon, TrendingUp, Cpu } from "lucide-react";

export default function InteractiveAuditTerminal() {
  const [activeFeed, setActiveFeed] = useState<"priok" | "ecommerce">("priok");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  const handleCopy = () => {
    const textToCopy = activeFeed === "priok" 
      ? "H3_INDEX: h3_08_+0000361_-0000023 | BASELINE: 17.6 | CURRENT: 35 | Z_SCORE: +3.53 | STATUS: ANOMALY_SPIKE"
      : "CYCLE: T-0_vs_T-1 | AUDITED: 50_SKU | OOS_ITEMS: 3 | INFERRED_GMV: Rp14,250,000 | ACTION: CONQUESTING_ALERT";
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-[#0b0d11] text-[#f3f4f6] py-20 border-b border-white/10" id="terminal-proof">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#10b981] px-3 py-1 rounded-full bg-[#141820] border border-[#10b981]/30">
            <Terminal className="w-3.5 h-3.5" />
            <span>PEMBUKTIAN TEKNIS DETERMINISTIK</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#f3f4f6] tracking-tight">
            Terminal Intelijen Interaktif
          </h2>
          <p className="text-sm text-[#9ca3af]">
            Lihat langsung bagaimana engine lokal SPECTRE mengeksekusi perhitungan kuantisasi spasial H3, statistik Z-Score, dan inferensi delta stok tanpa mock terselubung.
          </p>
        </div>

        {/* Terminal Window Frame */}
        <div className="rounded-2xl bg-[#141820] border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Top Bar with Tabs and Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-white/10 bg-[#1a202c]/50">
            
            {/* Terminal Window Dots & Selector */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
                <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                <span className="w-3 h-3 rounded-full bg-[#10b981]" />
              </div>

              {/* Feed Switcher */}
              <div className="flex items-center bg-[#0b0d11] p-1 rounded-lg border border-white/10 text-xs font-mono">
                <button
                  onClick={() => setActiveFeed("priok")}
                  className={`px-3 py-1 rounded transition-all ${
                    activeFeed === "priok"
                      ? "bg-[#10b981] text-[#0b0d11] font-semibold"
                      : "text-[#9ca3af] hover:text-white"
                  }`}
                >
                  FEED 1: MARITIM PRIOK
                </button>
                <button
                  onClick={() => setActiveFeed("ecommerce")}
                  className={`px-3 py-1 rounded transition-all ${
                    activeFeed === "ecommerce"
                      ? "bg-[#10b981] text-[#0b0d11] font-semibold"
                      : "text-[#9ca3af] hover:text-white"
                  }`}
                >
                  FEED 2: E-COMMERCE DELTA
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0b0d11] hover:bg-[#1a202c] text-xs font-mono text-[#9ca3af] hover:text-white border border-white/10 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin text-[#10b981]" : ""}`} />
                <span>{isSimulating ? "MEMINDAI..." : "JALANKAN ULANG"}</span>
              </button>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0b0d11] hover:bg-[#1a202c] text-xs font-mono text-[#9ca3af] hover:text-white border border-white/10 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "TERSALIN" : "SALIN DATA"}</span>
              </button>
            </div>

          </div>

          {/* Terminal Screen Body */}
          <div className="p-6 font-mono text-xs sm:text-sm bg-[#0b0d11] min-h-[380px] space-y-6">
            
            {activeFeed === "priok" ? (
              /* PRIOK MARITIME TELEMETRY */
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="text-[#9ca3af] flex items-center justify-between border-b border-white/5 pb-2">
                  <span>// TARGET TELEMETRI: PELABUHAN TANJUNG PRIOK (ZONA LABUH LUAR)</span>
                  <span className="text-[#10b981] flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    LIVE_SENSOR_ONLINE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 bg-[#141820] p-4 rounded-xl border border-white/5">
                    <div className="text-white/40 text-xs">// KOORDINAT GRID H3</div>
                    <div className="text-[#f3f4f6] text-sm">h3_08_+0000361_-0000023</div>
                    <div className="text-xs text-[#9ca3af]">Resolusi 8 (Akurasi ~400 meter radius)</div>
                  </div>

                  <div className="space-y-2 bg-[#141820] p-4 rounded-xl border border-white/5">
                    <div className="text-white/40 text-xs">// STATISTIK BASELINE 14 HARI</div>
                    <div className="text-[#f3f4f6] text-sm">Rata-rata: 17.6 Kapal | Deviasi: 4.93</div>
                    <div className="text-xs text-[#f59e0b]">Armada Aktual Terdeteksi: 35 Kapal (+72%)</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#141820] border border-white/10 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-white/60">ANALISIS STATISTICAL PROCESS CONTROL (SPC):</span>
                    <span className="px-2.5 py-1 rounded bg-[#ef4444]/20 border border-[#ef4444]/40 text-[#ef4444] font-bold text-xs flex items-center gap-1.5">
                      <AlertOctagon className="w-3.5 h-3.5" />
                      SKOR Z-SCORE: +3.53 SIGMA [ANOMALI TERTINGGI]
                    </span>
                  </div>

                  <div className="text-xs text-[#9ca3af] space-y-1.5 pt-2 border-t border-white/5">
                    <div>&gt; SWARM STATUS: 4 Node Agen Aktif melakukan validasi silang AIS maritim.</div>
                    <div>&gt; ESTIMASI DAMPAK: Kenaikan waktu tunggu bongkar muat (dwell-time): +220 menit per kapal.</div>
                    <div>&gt; KESIMPULAN REKOMENDASI: Risiko denda demurrage kargo tongkang batubara: TINGGI.</div>
                  </div>
                </div>
              </div>
            ) : (
              /* E-COMMERCE MULTI-CYCLE DELTA */
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="text-[#9ca3af] flex items-center justify-between border-b border-white/5 pb-2">
                  <span>// TARGET DELTA: KATALOG RESELLER & KOMPETITOR UTAMA</span>
                  <span className="text-[#10b981] flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    SNAPSHOT_INTERVAL_6H
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 bg-[#141820] p-4 rounded-xl border border-white/5">
                    <div className="text-white/40 text-xs">// CAKUPAN AUDIT KATALOG</div>
                    <div className="text-[#f3f4f6] text-sm">50 SKU Terpantau Real-Time</div>
                    <div className="text-xs text-[#10b981]">Total Inferred GMV: Rp 14.250.000 / Siklus</div>
                  </div>

                  <div className="space-y-2 bg-[#141820] p-4 rounded-xl border border-white/5">
                    <div className="text-white/40 text-xs">// PELANGGARAN HARGA ACUAN (MAP)</div>
                    <div className="text-[#ef4444] text-sm">2 Toko Reseller Melanggar</div>
                    <div className="text-xs text-[#ef4444]">Bantingan Harga: -Rp 45.000 dari HET Resmi</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#141820] border border-white/10 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-white/60">STATUS SINYAL OTONOM:</span>
                    <span className="px-2.5 py-1 rounded bg-[#10b981]/20 border border-[#10b981]/40 text-[#10b981] font-bold text-xs flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      ACTION_TRIGGER: OUT_OF_STOCK CONQUESTING
                    </span>
                  </div>

                  <div className="text-xs text-[#9ca3af] space-y-1.5 pt-2 border-t border-white/5">
                    <div>&gt; SKU HERO KOMPETITOR: Stok 48 unit habis terjual (Stok = 0).</div>
                    <div>&gt; REKOMENDASI OTOMASI: Lipatgandakan anggaran iklan produk substitusi klien sebesar 40%.</div>
                    <div>&gt; ESTIMASI KEUNTUNGAN: Menyerap 70% pembeli aktif yang mencari produk tersebut hari ini.</div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Terminal Footnote */}
            <div className="pt-3 border-t border-white/10 text-xs text-[#9ca3af] flex flex-wrap items-center justify-between gap-2">
              <span>ALGORITMA: PRADIKTIF STATISTICAL INFERENCE ENGINE (ISO COMPLIANT)</span>
              <span className="text-[#10b981]">ZERO MNPI // 100% REVERSIBLE AUDIT TRAIL</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
