import React from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
  ctaLink: string;
  takeaway: string;
}

const TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Audit Awal Terfokus",
    price: "Rp 750.000",
    period: "Satu Kali Pembayaran",
    description: "Cocok untuk menguji kualitas dan kecocokan data pada 1 target toko, wilayah, atau sektor sebelum berlangganan.",
    features: [
      "1 Target Toko / Wilayah / Sektor lelang",
      "50 hingga 100 baris data terverifikasi",
      "Pemeriksaan sampel draf pratinjau terlebih dahulu",
      "Ringkasan temuan dan kamus struktur kolom",
      "Format lembar kerja Excel / CSV siap pakai",
      "Penyerahan dalam 24 hingga 48 jam kerja"
    ],
    ctaText: "Pesan Uji Coba Awal",
    ctaLink: "https://wa.me/6285864149673?text=Halo%20Zadit%2C%20saya%20tertarik%20dengan%20Paket%20Audit%20Awal%20Terfokus%20Rp%20750.000.",
    takeaway: "Langkah awal tepat untuk memvalidasi akurasi data sebelum memulai proyek skala penuh."
  },
  {
    id: "sentinel",
    name: "Pemantauan Operasional Rutin",
    price: "Rp 2.500.000",
    period: "per bulan",
    isPopular: true,
    description: "Sistem pemantauan berkelanjutan untuk kontraktor tender, pemilik brand ritel, dan pengelola portofolio properti.",
    features: [
      "Pemantauan harian aktif selama 30 hari kalender",
      "Pilihan sektor: LPSE, E-Commerce, atau Properti",
      "Notifikasi instan bot Telegram langsung ke ponsel",
      "Ringkasan rekapitulasi data setiap pagi",
      "Peringatan dini saat terdeteksi anomali harga atau stok",
      "Rekap spreadsheet mingguan yang sudah diverifikasi",
      "Konsultasi teknis langsung satu pintu dengan Zadit"
    ],
    ctaText: "Mulai Pemantauan Rutin",
    ctaLink: "https://wa.me/6285864149673?text=Halo%20Zadit%2C%20saya%20ingin%20mengaktifkan%20Pemantauan%20Operasional%20Rutin%20Rp%202.500.000%2Fbulan.",
    takeaway: "Paling banyak dipilih untuk mencegah keterlambatan informasi lelang dan persaingan harga liar."
  },
  {
    id: "enterprise",
    name: "Infrastruktur Data Korporasi",
    price: "Rp 7.500.000+",
    period: "per bulan (sesuai lingkup)",
    description: "Solusi data pipeline terpadu untuk institusi pembiayaan multifinance, kantor hukum, dan logistik pertambangan.",
    features: [
      "Pipeline kustom dari berbagai sumber data publik",
      "Akses endpoint API privat yang aman dan terenkripsi",
      "Sinkronisasi berkala ke basis data internal perusahaan",
      "Pemetaan zona spasial dan analisis pergerakan armada",
      "Dukungan teknis prioritas dengan waktu respon cepat",
      "Perjanjian Kerahasiaan Informasi (NDA) resmi",
      "Dokumen invoice dan faktur pajak resmi PT"
    ],
    ctaText: "Diskusikan Kebutuhan Perusahaan",
    ctaLink: "https://wa.me/6285864149673?text=Halo%20Zadit%2C%20kami%20ingin%20mendiskusikan%20kebutuhan%20data%20korporasi%20untuk%20perusahaan%20kami.",
    takeaway: "Dirancang untuk institusi keuangan, firma hukum, dan perusahaan logistik berskala besar."
  }
];

export default function InvestmentPricingTable() {
  return (
    <section className="bg-[#0b0d11] text-[#f3f4f6] py-20 border-b border-white/10" id="pricing">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#8f652e] px-3 py-1 rounded-full bg-[#141820] border border-[#8f652e]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PILIHAN PAKET LAYANAN</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#f3f4f6] tracking-tight">
            Investasi Terencana Tanpa Biaya Tersembunyi
          </h2>
          <p className="text-sm text-[#9ca3af] leading-relaxed">
            Pilih paket yang sesuai dengan tahapan kebutuhan operasional Anda. Mulai dari pengujian sampel target hingga integrasi alur data harian.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`p-6 sm:p-8 rounded-2xl flex flex-col justify-between transition-all relative ${
                tier.isPopular
                  ? "bg-[#141820] border-2 border-[#10b981] shadow-2xl shadow-[#10b981]/10 scale-[1.02]"
                  : "bg-[#141820]/60 border border-white/10 hover:border-white/20"
              }`}
            >
              {/* Popular Badge */}
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#10b981] text-[#0b0d11] font-bold font-mono text-[11px] tracking-wide shadow-md">
                  PILIHAN UTAMA
                </div>
              )}

              <div className="space-y-6">
                
                {/* Header Info */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-[#f3f4f6]">{tier.name}</h3>
                  <p className="text-xs text-[#9ca3af] leading-relaxed min-h-[36px]">
                    {tier.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-2 pb-4 border-b border-white/10">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[#f3f4f6]">
                    {tier.price}
                  </div>
                  <div className="text-xs text-[#9ca3af] font-mono mt-1">
                    {tier.period}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5">
                  <div className="text-xs font-mono text-white/50 uppercase tracking-wider">
                    Cakupan Layanan:
                  </div>
                  {tier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#9ca3af]">
                      <Check className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom CTA & Takeaway */}
              <div className="pt-8 space-y-3">
                <a
                  href={tier.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-lg font-semibold text-xs font-mono flex items-center justify-center gap-2 transition-all ${
                    tier.isPopular
                      ? "bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] shadow-lg shadow-[#10b981]/20"
                      : "bg-[#1a202c] hover:bg-[#2d3748] text-[#f3f4f6] border border-white/10"
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                {/* Clear takeaway footer */}
                <div className="p-2.5 rounded bg-[#0b0d11] border border-white/5 text-[11px] font-mono text-[#9ca3af] text-center">
                  {tier.takeaway}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Custom Scope Note */}
        <div className="mt-12 text-center text-xs font-mono text-[#9ca3af]">
          Membutuhkan pemantauan volume besar atau penyesuaian parameter khusus?{" "}
          <a
            href="https://wa.me/6285864149673?text=Halo%20Zadit%2C%20kami%20ingin%20mendiskusikan%20kebutuhan%20data%20kustom."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#10b981] underline hover:text-[#059669]"
          >
            Konsultasikan langsung dengan Zadit
          </a>
        </div>

      </div>
    </section>
  );
}
