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
      ? "LOKASI: Area Labuh Luar Tanjung Priok | RATA-RATA: 17.6 Kapal | AKTUAL: 35 Kapal | STATUS: KEPADATAN MENINGKAT | WAKTU TUNGGU: +220 Menit"
      : "INTERVAL: 6 Jam | TOTAL ITEM: 50 SKU | BARANG HABIS: 3 Produk | ESTIMASI NILAI TRANSAKSI: Rp 14.250.000";
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
            <span>SIMULASI PEMANTAUAN DATA LANGSUNG</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#f3f4f6] tracking-tight">
            Pratinjau Pengolahan Data Lapangan
          </h2>
          <p className="text-sm text-[#9ca3af] leading-relaxed">
            Lihat contoh bagaimana sistem kami mengolah data pergerakan logistik maritim dan perubahan stok etalase produk secara otomatis menjadi informasi yang siap Anda gunakan.
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
                  Contoh 1: Kepadatan Maritim
                </button>
                <button
                  onClick={() => setActiveFeed("ecommerce")}
                  className={`px-3 py-1 rounded transition-all ${
                    activeFeed === "ecommerce"
                      ? "bg-[#10b981] text-[#0b0d11] font-semibold"
                      : "text-[#9ca3af] hover:text-white"
                  }`}
                >
                  Contoh 2: Perubahan Stok Ritel
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
                <span>{isSimulating ? "Memperbarui..." : "Perbarui Data"}</span>
              </button>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0b0d11] hover:bg-[#1a202c] text-xs font-mono text-[#9ca3af] hover:text-white border border-white/10 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Tersalin" : "Salin Ringkasan"}</span>
              </button>
            </div>

          </div>

          {/* Terminal Screen Body */}
          <div className="p-6 font-mono text-xs sm:text-sm bg-[#0b0d11] min-h-[380px] space-y-6">
            
            {activeFeed === "priok" ? (
              /* PRIOK MARITIME TELEMETRY */
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="text-[#9ca3af] flex items-center justify-between border-b border-white/5 pb-2">
                  <span>// Pemantauan Area: Zona Labuh Luar Tanjung Priok</span>
                  <span className="text-[#10b981] flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    Sensor Aktif
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 bg-[#141820] p-4 rounded-xl border border-white/5">
                    <div className="text-white/40 text-xs">// Radius Wilayah Pemantauan</div>
                    <div className="text-[#f3f4f6] text-sm">Zona Heksagonal (~400 meter)</div>
                    <div className="text-xs text-[#9ca3af]">Menyaring koordinat GPS menjadi klaster akurat</div>
                  </div>

                  <div className="space-y-2 bg-[#141820] p-4 rounded-xl border border-white/5">
                    <div className="text-white/40 text-xs">// Data Pembanding (Rata-rata 14 Hari)</div>
                    <div className="text-[#f3f4f6] text-sm">Standar Normal: 17 - 18 Kapal</div>
                    <div className="text-xs text-[#f59e0b]">Armada Terdeteksi Saat Ini: 35 Kapal (+72%)</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#141820] border border-white/10 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-white/60">Hasil Analisis Kepadatan:</span>
                    <span className="px-2.5 py-1 rounded bg-[#ef4444]/20 border border-[#ef4444]/40 text-[#ef4444] font-bold text-xs flex items-center gap-1.5">
                      <AlertOctagon className="w-3.5 h-3.5" />
                      Status: Peningkatan Kepadatan Tajam
                    </span>
                  </div>

                  <div className="text-xs text-[#9ca3af] space-y-1.5 pt-2 border-t border-white/5">
                    <div>&gt; Verifikasi Silang: Data sinyal armada dikonfirmasi dari berbagai penerima AIS maritim.</div>
                    <div>&gt; Estimasi Dampak: Waktu tunggu sandar diperkirakan meningkat rata-rata 3,5 jam per kapal.</div>
                    <div>&gt; Saran Tindakan: Sesuaikan jadwal kapal tongkang tujuan muara untuk menghindari denda tunggu.</div>
                  </div>
                </div>
              </div>
            ) : (
              /* E-COMMERCE MULTI-CYCLE DELTA */
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="text-[#9ca3af] flex items-center justify-between border-b border-white/5 pb-2">
                  <span>// Pemantauan Toko: Etalase Pesaing Utama & Jaringan Reseller</span>
                  <span className="text-[#10b981] flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Pembaruan Berkala
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 bg-[#141820] p-4 rounded-xl border border-white/5">
                    <div className="text-white/40 text-xs">// Jumlah Produk Terpantau</div>
                    <div className="text-[#f3f4f6] text-sm">50 Produk Kategori Unggulan</div>
                    <div className="text-xs text-[#10b981]">Estimasi Perputaran Nilai: Rp 14.250.000 / Siklus</div>
                  </div>

                  <div className="space-y-2 bg-[#141820] p-4 rounded-xl border border-white/5">
                    <div className="text-white/40 text-xs">// Pemantauan Kepatuhan Harga</div>
                    <div className="text-[#ef4444] text-sm">2 Toko Menjual di Bawah Harga Acuan</div>
                    <div className="text-xs text-[#ef4444]">Selisih: Rp 45.000 lebih murah dari batas resmi</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#141820] border border-white/10 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-white/60">Peluang Penjualan yang Terbuka:</span>
                    <span className="px-2.5 py-1 rounded bg-[#10b981]/20 border border-[#10b981]/40 text-[#10b981] font-bold text-xs flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      Peringatan: Stok Barang Pesaing Habis
                    </span>
                  </div>

                  <div className="text-xs text-[#9ca3af] space-y-1.5 pt-2 border-t border-white/5">
                    <div>&gt; Situasi Lapangan: Produk utama kompetitor habis terjual (stok 0 unit).</div>
                    <div>&gt; Saran Tindakan: Naikkan visibilitas iklan untuk produk serupa milik Anda selama persediaan kompetitor belum terisi.</div>
                    <div>&gt; Potensi: Menjangkau calon pembeli yang siap bertransaksi namun mendapati toko sebelah kosong.</div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Terminal Footnote */}
            <div className="pt-3 border-t border-white/10 text-xs text-[#9ca3af] flex flex-wrap items-center justify-between gap-2">
              <span>Sumber: Agregasi data publik terbuka dan terverifikasi</span>
              <span className="text-[#10b981]">Kepatuhan Etika Akses Data dan Privasi</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
