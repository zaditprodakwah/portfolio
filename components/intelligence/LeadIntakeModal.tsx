"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  ArrowLeft,
  FileSpreadsheet,
  Building,
  User,
  Phone,
  Clock,
  Sparkles,
  Lock,
  Layers,
  HelpCircle
} from "lucide-react";

export function triggerLeadModal(options?: { sector?: string; plan?: string }) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-lead-modal", { detail: options || {} }));
  }
}

interface LeadIntakeModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultSector?: string;
  defaultPlan?: string;
}

const SECTORS = [
  { id: "retail", label: "E-Commerce & Ritel (Stok Pesaing & Harga MAP)", icon: "🛒" },
  { id: "lpse", label: "Pengadaan Pemerintah (Tender LPSE & Pemenang)", icon: "🏛️" },
  { id: "maritime", label: "Logistik Maritim & Pelabuhan (AIS & Antrean)", icon: "🚢" },
  { id: "commodity", label: "Komoditas & Pertambangan (Tongkang & Stok)", icon: "⛏️" },
  { id: "auto", label: "Otomotif & Multifinance (Depresiasi & OTR)", icon: "🚗" },
  { id: "property", label: "Properti & Real Estate (Lelang Bank & Listing)", icon: "🏢" },
  { id: "custom", label: "Kebutuhan Kustom / Sumber Data Khusus", icon: "⚙️" },
];

const FREQUENCIES = [
  "Uji Coba Sampel 50 Baris (Tanpa Biaya)",
  "Laporan Satu Kali (One-time Audit)",
  "Pemantauan Harian Rutin (Daily Sentinel)",
  "Alur Data Otomatis / Integrasi API"
];

export default function LeadIntakeModal({ 
  isOpen: propIsOpen, 
  onClose: propOnClose,
  defaultSector = "E-Commerce & Ritel (Stok Pesaing & Harga MAP)",
  defaultPlan = "Uji Coba Sampel 50 Baris (Tanpa Biaya)"
}: LeadIntakeModalProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(false);
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [sector, setSector] = useState<string>(defaultSector);
  const [plan, setPlan] = useState<string>(defaultPlan);
  const [targetQuery, setTargetQuery] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ sector?: string; plan?: string }>;
      if (customEvent.detail?.sector) {
        setSector(customEvent.detail.sector);
      }
      if (customEvent.detail?.plan) {
        setPlan(customEvent.detail.plan);
      }
      setStep(1);
      setInternalOpen(true);
      setIsSubmitted(false);
      setErrorMessage("");
    };

    window.addEventListener("open-lead-modal", handleOpenEvent);
    return () => window.removeEventListener("open-lead-modal", handleOpenEvent);
  }, []);

  const isModalVisible = propIsOpen !== undefined ? propIsOpen : internalOpen;

  const handleClose = () => {
    setInternalOpen(false);
    if (propOnClose) propOnClose();
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetQuery.trim()) {
      setErrorMessage("Mohon sebutkan target spesifik yang ingin dipantau.");
      return;
    }
    setErrorMessage("");
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !companyName.trim() || !whatsappNumber.trim()) {
      setErrorMessage("Nama, perusahaan, dan nomor WhatsApp wajib diisi.");
      return;
    }
    setErrorMessage("");
    setIsSubmitting(true);

    // Formatted executive qualification brief for Zadit's real WhatsApp (+62 823-1636-3177)
    const textMessage = `*PENGAJUAN SAMPEL DATA • PRADIKTIF DATA LAB*
----------------------------------------
*Pemohon:* ${fullName}
*Perusahaan / Brand:* ${companyName}
*No. WhatsApp Pemohon:* ${whatsappNumber}
----------------------------------------
*Sektor Industri:* ${sector}
*Target Objek Pantau:* ${targetQuery}
*Paket / Frekuensi:* ${plan}
${notes.trim() ? `*Catatan Khusus:* ${notes.trim()}\n` : ""}----------------------------------------
_Diajukan via Formulir Kualifikasi Resmi zadit-pages_
_Penyedia: Zadit (PT Prisma Digital Kreatif - NIB 1801250039976)_`;

    const encoded = encodeURIComponent(textMessage);
    const waUrl = `https://wa.me/6282316363177?text=${encoded}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.open(waUrl, "_blank");
    }, 500);
  };

  if (!isModalVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-xl bg-[#141820] border border-[#10b981]/35 rounded-2xl shadow-2xl p-5 sm:p-8 my-auto overflow-hidden text-[#f3f4f6]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#9ca3af] hover:text-white hover:bg-white/10 transition-colors"
          title="Tutup Formulir"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header & Value Proposition */}
            <div className="space-y-1.5 mb-5 pr-8">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#10b981] px-2.5 py-0.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/25">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FORMULIR KUALIFIKASI KEBUTUHAN DATA</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#f3f4f6] tracking-tight">
                Minta Pratinjau Sampel 50 Baris
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Uji format dan akurasi data target Anda secara cuma-cuma sebelum komitmen anggaran. Kami siapkan berkas spreadsheet siap pakai dalam 24 jam kerja.
              </p>
            </div>

            {/* Step Progress Indicator (CRO Multi-step) */}
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/10 text-xs">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium ${
                step === 1 
                  ? "bg-[#10b981] text-[#0b0d11]" 
                  : "bg-white/10 text-[#10b981]"
              }`}>
                <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Spesifikasi Data</span>
              </div>
              <div className="w-4 h-[1px] bg-white/20" />
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium ${
                step === 2 
                  ? "bg-[#10b981] text-[#0b0d11]" 
                  : "bg-white/5 text-[#9ca3af]"
              }`}>
                <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">2</span>
                <span>Penerima Berkas</span>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
                {errorMessage}
              </div>
            )}

            {/* STEP 1: SPECIFICATION */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-4 text-xs">
                
                {/* Sektor Bisnis */}
                <div className="space-y-1.5">
                  <label className="block text-[#cbd5e1] font-medium">
                    1. Sektor Industri / Bidang Pemantauan <span className="text-[#10b981]">*</span>
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#0b0d11] border border-white/15 text-[#f3f4f6] focus:border-[#10b981] focus:outline-none transition-colors"
                    required
                  >
                    {SECTORS.map((sec) => (
                      <option key={sec.id} value={sec.label}>
                        {sec.icon} {sec.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target Spesifik */}
                <div className="space-y-1.5">
                  <label htmlFor="lead-target-query" className="block text-[#cbd5e1] font-medium">
                    2. Objek atau Target Spesifik yang Ingin Dipantau <span className="text-[#10b981]">*</span>
                  </label>
                  <input
                    id="lead-target-query"
                    name="targetQuery"
                    type="text"
                    placeholder="Contoh: Nama toko resmi kompetitor di marketplace, domain LPSE daerah, pelabuhan tertentu..."
                    value={targetQuery}
                    onChange={(e) => setTargetQuery(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#0b0d11] border border-white/15 text-[#f3f4f6] placeholder:text-white/30 focus:border-[#10b981] focus:outline-none transition-colors"
                    required
                  />
                  <p className="text-[11px] text-[#9ca3af]">
                    Bisa berupa tautan toko, nama perusahaan kompetitor, atau nama lelang yang sedang Anda incar.
                  </p>
                </div>

                {/* Paket / Frekuensi Layanan */}
                <div className="space-y-1.5">
                  <label className="block text-[#cbd5e1] font-medium">
                    3. Kebutuhan Frekuensi / Paket Rujukan
                  </label>
                  <select
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#0b0d11] border border-white/15 text-[#f3f4f6] focus:border-[#10b981] focus:outline-none transition-colors"
                  >
                    {FREQUENCIES.map((freq) => (
                      <option key={freq} value={freq}>
                        {freq}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CTA Next */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] font-semibold text-xs transition-all shadow-lg shadow-[#10b981]/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Lanjut ke Detail Penerima Berkas</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Guarantee Microcopy */}
                <div className="flex items-center justify-center gap-2 text-[11px] text-[#9ca3af] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>Protokol 2 Tahap: Sampel bebas biaya untuk memeriksa kecocokan format.</span>
                </div>

              </form>
            )}

            {/* STEP 2: RECIPIENT INFORMATION */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                {/* Review Target Summary */}
                <div className="p-3 rounded-xl bg-[#0b0d11] border border-white/10 text-xs text-[#9ca3af] space-y-1">
                  <div className="flex items-center justify-between text-[#cbd5e1]">
                    <span className="font-semibold text-[#10b981]">Target:</span>
                    <button 
                      type="button" 
                      onClick={() => setStep(1)} 
                      className="text-[#10b981] hover:underline"
                    >
                      Ubah Target
                    </button>
                  </div>
                  <div className="text-white font-medium truncate">{targetQuery}</div>
                  <div className="text-[11px] text-[#9ca3af]">{sector} • {plan}</div>
                </div>

                {/* Nama Lengkap & Perusahaan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label htmlFor="lead-full-name" className="block text-[#cbd5e1] font-medium">
                      Nama Pemohon / PIC <span className="text-[#10b981]">*</span>
                    </label>
                    <input
                      id="lead-full-name"
                      name="fullName"
                      autoComplete="name"
                      type="text"
                      placeholder="Nama Lengkap Anda"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#0b0d11] border border-white/15 text-[#f3f4f6] placeholder:text-white/30 focus:border-[#10b981] focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="lead-company-name" className="block text-[#cbd5e1] font-medium">
                      Perusahaan / Brand <span className="text-[#10b981]">*</span>
                    </label>
                    <input
                      id="lead-company-name"
                      name="companyName"
                      autoComplete="organization"
                      type="text"
                      placeholder="Nama PT / CV / Brand"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#0b0d11] border border-white/15 text-[#f3f4f6] placeholder:text-white/30 focus:border-[#10b981] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Nomor WhatsApp */}
                <div className="space-y-1.5">
                  <label htmlFor="lead-whatsapp-number" className="block text-[#cbd5e1] font-medium">
                    Nomor WhatsApp Anda <span className="text-[#10b981]">*</span>
                  </label>
                  <input
                    id="lead-whatsapp-number"
                    name="whatsappNumber"
                    autoComplete="tel"
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#0b0d11] border border-white/15 text-[#f3f4f6] placeholder:text-white/30 focus:border-[#10b981] focus:outline-none transition-colors"
                    required
                  />
                  <p className="text-[11px] text-[#9ca3af]">
                    Digunakan untuk mengirim berkas Excel draf sampel dan verifikasi brief langsung oleh Zadit.
                  </p>
                </div>

                {/* Catatan Tambahan (Opsional) */}
                <div className="space-y-1.5">
                  <label htmlFor="lead-notes" className="block text-[#cbd5e1] font-medium">
                    Kebutuhan Kolom / Catatan Khusus (Opsional)
                  </label>
                  <input
                    id="lead-notes"
                    name="notes"
                    type="text"
                    placeholder="Contoh: Perlu kolom estimasi stok, nomor tender, atau tanggal lelang"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#0b0d11] border border-white/15 text-[#f3f4f6] placeholder:text-white/30 focus:border-[#10b981] focus:outline-none transition-colors"
                  />
                </div>

                {/* Trust Seal */}
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 text-[11px] text-[#9ca3af]">
                  <Lock className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                  <span>Kerahasiaan data dan identitas instansi dilindungi NDA resmi PT Prisma Digital Kreatif.</span>
                </div>

                {/* Buttons Navigation */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-3 rounded-xl bg-[#0b0d11] hover:bg-white/10 text-[#f3f4f6] border border-white/10 font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 rounded-xl bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] font-semibold text-xs transition-all shadow-lg shadow-[#10b981]/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Menyiapkan Berkas..." : "Kirim Spesifikasi ke WhatsApp Resmi"}</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        ) : (
          /* Submission Success State */
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#10b981]/20 text-[#10b981] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-xl font-semibold text-[#f3f4f6]">
                Spesifikasi Data Berhasil Terkirim
              </h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed max-w-sm mx-auto">
                Rincian target <strong className="text-white">{targetQuery}</strong> telah tersusun rapi dan diteruskan ke WhatsApp resmi Zadit (PT Prisma Digital Kreatif).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#0b0d11] border border-white/10 text-xs text-left space-y-1.5 text-[#9ca3af]">
              <div className="font-semibold text-[#10b981] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Tahapan Selanjutnya (SLA 24 Jam):</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-[11px]">
                <li>Zadit memverifikasi kelayakan teknis struktur sumber data.</li>
                <li>Pembuatan berkas lembar kerja Excel 50 baris draf pratinjau.</li>
                <li>Pengiriman berkas langsung ke WhatsApp Anda ({whatsappNumber}).</li>
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-[#141820] hover:bg-white/10 text-xs text-[#f3f4f6] border border-white/10 transition-colors cursor-pointer"
              >
                Selesai
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
