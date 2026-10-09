"use client";

import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  PhoneCall, 
  Sparkles,
  ArrowRight
} from "lucide-react";

export const IntakeSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    whatsapp: "",
    serviceType: "quick_launch",
    notes: ""
  });

  const [submitted, setSubmitted] = useState(false);

  // Muat draf tersimpan dari LocalStorage jika ada
  useEffect(() => {
    try {
      const saved = localStorage.getItem("zadit_digital_leads_draft");
      if (saved) {
        setFormData(JSON.parse(saved));
      }
    } catch {
      // Abaikan jika local storage tidak tersedia
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    try {
      localStorage.setItem("zadit_digital_leads_draft", JSON.stringify(updated));
    } catch {
      // Abaikan error kuota
    }
  };

  const handleDirectWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp) return;

    // Simpan ke riwayat lokal
    try {
      const leads = JSON.parse(localStorage.getItem("zadit_digital_leads") || "[]");
      leads.push({ ...formData, timestamp: new Date().toISOString(), channel: "whatsapp" });
      localStorage.setItem("zadit_digital_leads", JSON.stringify(leads));
      localStorage.removeItem("zadit_digital_leads_draft");
    } catch {
      // Abaikan
    }

    const phone = "6282316363177";
    const serviceLabels: Record<string, string> = {
      quick_launch: "Website Peluncur Cepat (Quick-Launch)",
      rescue: "Penyelamatan & Modernisasi Situs (Rescue)",
      b2b_catalog: "Katalog B2B & Sistem Permintaan Harga",
      lead_engine: "Landing Page Berkonversi & Mesin Prospek",
      workflow_auto: "Otomasi Alur Operasional Bisnis",
      retainer: "Layanan Pemeliharaan Terkelola (Retainer)",
      other: "Konsultasi Kustom & Audit Arsitektur"
    };

    const lines = [
      "Halo Zadit, saya ingin berkonsultasi mengenai layanan digital:",
      "",
      `* Nama: ${formData.name}`,
      `* Bisnis: ${formData.businessName || "Belum dicantumkan"}`,
      `* Kontak WhatsApp: ${formData.whatsapp}`,
      `* Kebutuhan: ${serviceLabels[formData.serviceType] || formData.serviceType}`,
      formData.notes ? `* Catatan Tambahan: ${formData.notes}` : "",
      "",
      "Mohon arahan mengenai estimasi waktu dan ketersediaan jadwal konsultasi."
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const handleAsyncSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp) return;

    try {
      const leads = JSON.parse(localStorage.getItem("zadit_digital_leads") || "[]");
      leads.push({ ...formData, timestamp: new Date().toISOString(), channel: "async_web" });
      localStorage.setItem("zadit_digital_leads", JSON.stringify(leads));
      localStorage.removeItem("zadit_digital_leads_draft");
    } catch {
      // Abaikan
    }

    setSubmitted(true);
  };

  return (
    <section 
      id="intake-konsultasi" 
      aria-label="Formulir Konsultasi dan Asistensi Langsung"
      className="w-full max-w-4xl mx-auto px-4 py-12"
    >
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200/80">
            <MessageSquare className="w-3.5 h-3.5 text-teal-700" />
            <span>KONSULTASI LANGSUNG DENGAN REKAYASAWAN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Mulai Diskusi Kebutuhan Digital Bisnis Anda
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Tanpa perlu registrasi akun, tanpa sales perantara. Sampaikan kendala teknis atau rencana proyek Anda langsung kepada rekayasawan utama.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-emerald-950">
              Pesan Konsultasi Anda Berhasil Terkirim!
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800 max-w-lg mx-auto">
              Terima kasih telah menghubungi kami. Kami akan meninjau rincian kebutuhan Anda dan merespons via WhatsApp dalam waktu maksimal 4 jam kerja.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  businessName: "",
                  whatsapp: "",
                  serviceType: "quick_launch",
                  notes: ""
                });
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-800 text-white hover:bg-emerald-900 transition-colors"
            >
              Kirim Kebutuhan Lainnya
            </button>
          </div>
        ) : (
          <form onSubmit={handleDirectWhatsApp} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Kolom 1: Nama Lengkap */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Nama Anda *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Contoh: Hendra Wijaya"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-900"
                />
              </div>

              {/* Kolom 2: Nama Bisnis / Instansi */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Nama Bisnis / Instansi
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Contoh: PT Sumber Logam Presisi"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Kolom 3: Nomor WhatsApp */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Nomor WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="Contoh: 081234567890"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-900"
                />
              </div>

              {/* Kolom 4: Kategori Kebutuhan */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Layanan yang Dibutuhkan *
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-900 bg-white"
                >
                  <option value="quick_launch">Website Peluncur Cepat (Quick-Launch)</option>
                  <option value="rescue">Penyelamatan &amp; Pemulihan Situs (Rescue)</option>
                  <option value="b2b_catalog">Katalog B2B &amp; Alur Permintaan Harga (RFQ)</option>
                  <option value="lead_engine">Landing Page Berkonversi &amp; Mesin Prospek</option>
                  <option value="workflow_auto">Otomasi Alur Operasional Bisnis</option>
                  <option value="retainer">Pemeliharaan Terkelola Rutin (Managed Care)</option>
                  <option value="other">Konsultasi Khusus / Audit Lainnya</option>
                </select>
              </div>
            </div>

            {/* Catatan / Kendala Utama */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Uraian Kendala atau Rencana Proyek
              </label>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Ceritakan kendala situs lama Anda, target tenggat waktu, atau fitur khusus yang Anda inginkan..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-900 resize-none"
              />
            </div>

            {/* Tombol Aksi Ganda */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
              <button
                type="submit"
                className="w-full sm:w-2/3 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all text-center"
              >
                <span>Buka Percakapan WhatsApp Langsung</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleAsyncSubmit}
                className="w-full sm:w-1/3 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors text-center"
              >
                <span>Tinggalkan Pesan di Web</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-600 font-mono pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>Kerahasiaan data Anda dijamin 100%. Tidak ada spam atau pembagian data ke pihak ketiga.</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default IntakeSection;
