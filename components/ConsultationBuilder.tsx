'use client';

import React, { useState } from 'react';
import { Send, Mail, MessageSquare, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const ENC_EMAIL = 'bXVoemFkaXRAZ21haWwuY29t';
const ENC_WA_BASE = 'aHR0cHM6Ly93YS5tZS82MjgyMzE2MzYzMTc3';

function safeDecode(b64: string): string {
  try {
    if (typeof window !== 'undefined' && window.atob) {
      return window.atob(b64);
    }
  } catch {
    // fallback
  }
  return '';
}

export const ConsultationBuilder: React.FC = () => {
  const { lang } = useLanguage();

  const categories = [
    {
      id: 'proposal',
      label: { id: 'Proposal Bisnis & Pitch Deck', en: 'Business Proposal & Pitch Deck' },
      icon: '📊'
    },
    {
      id: 'seo',
      label: { id: 'SEO & Konten Konversi', en: 'SEO & High-Converting Content' },
      icon: '🚀'
    },
    {
      id: 'academic',
      label: { id: 'Riset Akademik & Olah Data', en: 'Academic Research & Data' },
      icon: '🎓'
    },
    {
      id: 'web',
      label: { id: 'Pembuatan / Optimasi Website', en: 'Web Development & Speed' },
      icon: '⚡'
    },
    {
      id: 'general',
      label: { id: 'Konsultasi Strategi Umum', en: 'General Strategic Advice' },
      icon: '💬'
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('proposal');
  const [clientName, setClientName] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory) || categories[0];
  const activeCategoryLabel = activeCategoryObj.label[lang];

  // Dynamic message builders
  const buildTextMessage = () => {
    if (lang === 'id') {
      let msg = `Halo Zadit, perkenalkan saya ${clientName.trim() || '[Nama Saya]'}`;
      if (organization.trim()) {
        msg += ` dari ${organization.trim()}`;
      }
      msg += `.\n\nSaya ingin berkonsultasi mengenai: *${activeCategoryLabel}*.`;
      if (notes.trim()) {
        msg += `\n\nDetail/Pertanyaan:\n${notes.trim()}`;
      }
      msg += `\n\nKira-kira kapan kita bisa menjadwalkan diskusi singkat? Terima kasih.`;
      return msg;
    } else {
      let msg = `Hello Zadit, my name is ${clientName.trim() || '[My Name]'}`;
      if (organization.trim()) {
        msg += ` from ${organization.trim()}`;
      }
      msg += `.\n\nI would like to discuss: *${activeCategoryLabel}*.`;
      if (notes.trim()) {
        msg += `\n\nContext / Project Details:\n${notes.trim()}`;
      }
      msg += `\n\nWhen would be a convenient time for a brief consultation? Thank you.`;
      return msg;
    }
  };

  const handleLaunchWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    const waBase = safeDecode(ENC_WA_BASE);
    const msg = encodeURIComponent(buildTextMessage());
    window.open(`${waBase}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const handleLaunchEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = safeDecode(ENC_EMAIL);
    const subject = encodeURIComponent(
      lang === 'id'
        ? `Konsultasi Proyek: ${activeCategoryLabel} (${clientName.trim() || 'Mitra'})`
        : `Consultation Inquiry: ${activeCategoryLabel} (${clientName.trim() || 'Partner'})`
    );
    const body = encodeURIComponent(buildTextMessage().replace(/\*/g, ''));
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="consultation" className="py-20 px-6 max-w-4xl mx-auto border-t border-slate-200">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
        {/* Decorative background aura */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-50 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-300 text-teal-900 text-xs font-mono uppercase tracking-wider font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {lang === 'id' ? 'Formulir Kebutuhan Cepat' : 'Frictionless Consultation Intake'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            {lang === 'id'
              ? 'Mulai Konsultasi Langsung dengan Zadit'
              : 'Initiate a Direct Consultation with Zadit'}
          </h2>

          <p className="text-slate-700 text-sm sm:text-base max-w-2xl leading-relaxed">
            {lang === 'id'
              ? 'Pilih kebutuhan Anda di bawah ini untuk menghasilkan ringkasan pesan yang rapi dan terarah. Langsung terhubung ke WhatsApp atau Email tanpa birokrasi rumit.'
              : 'Select your requirements below to generate a clear, structured consultation message. Connect directly via WhatsApp or Email without friction.'}
          </p>
        </div>

        <div className="space-y-8 relative z-10">
          {/* Step 1: Category Selection with WCAG AAA Contrast */}
          <div className="space-y-3">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              {lang === 'id' ? '1. Pilih Bidang Kebutuhan Anda' : '1. Select Your Area of Need'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 ${
                      isSelected
                        ? 'bg-teal-50 border-teal-700 text-teal-950 font-bold shadow-xs ring-1 ring-teal-700'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white hover:border-slate-400'
                    }`}
                  >
                    <span className="text-xl">{cat.icon}</span>
                    <span className="flex-1 leading-snug">{cat.label[lang]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Name & Organization Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="consultation-client-name" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                {lang === 'id' ? '2. Nama Lengkap Anda' : '2. Your Full Name'}
              </label>
              <input
                id="consultation-client-name"
                name="clientName"
                autoComplete="name"
                type="text"
                placeholder={lang === 'id' ? 'Misal: Budi Santoso' : 'e.g. John Doe'}
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-medium focus:outline-none focus:border-teal-700 focus:bg-white transition-all placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="consultation-org-name" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                {lang === 'id' ? 'Nama Usaha / Lembaga / Kampus' : 'Organization / University / Business'}
              </label>
              <input
                id="consultation-org-name"
                name="organization"
                autoComplete="organization"
                type="text"
                placeholder={lang === 'id' ? 'Misal: PT Maju Bersama / Univ. Indonesia' : 'e.g. Acme Corp / Stanford Univ'}
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-medium focus:outline-none focus:border-teal-700 focus:bg-white transition-all placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Step 3: Optional Notes / Details */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="consultation-notes" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                {lang === 'id' ? '3. Keterangan Tambahan / Pertanyaan' : '3. Context / Questions'}
              </label>
              <span className="text-xs font-mono text-slate-700 uppercase font-semibold">
                {lang === 'id' ? '(Opsional)' : '(Optional)'}
              </span>
            </div>
            <textarea
              id="consultation-notes"
              name="notes"
              rows={3}
              placeholder={
                lang === 'id'
                  ? 'Ceritakan secara singkat target, kendala yang dihadapi, atau deadline yang diinginkan...'
                  : 'Briefly share your target outcome, current challenges, or desired timeline...'
              }
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-medium focus:outline-none focus:border-teal-700 focus:bg-white transition-all resize-none placeholder:text-slate-500"
            />
          </div>

          {/* Protected Action Buttons (No raw email/phone in static HTML) */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={handleLaunchWhatsApp}
              className="flex-1 inline-flex items-center justify-center gap-3 bg-teal-700 hover:bg-teal-800 text-white font-heading font-bold uppercase tracking-wider text-xs px-6 py-4 rounded-xl shadow-sm transition-all duration-200 group text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>
                {lang === 'id' ? 'Kirim Pesan ke WhatsApp' : 'Open in WhatsApp'}
              </span>
              <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={handleLaunchEmail}
              className="inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold uppercase tracking-wider text-xs px-6 py-4 rounded-xl shadow-sm transition-all duration-200 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
            >
              <Mail className="w-4 h-4 text-teal-300" />
              <span>
                {lang === 'id' ? 'Kirim via Email Resmi' : 'Send via Direct Email'}
              </span>
            </button>
          </div>

          <p className="text-center sm:text-left text-xs text-slate-700 font-sans flex items-center gap-2 justify-center sm:justify-start font-medium">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
            <span>
              {lang === 'id'
                ? 'Privasi data Anda terjaga. Kontak dienkripsi untuk mencegah bot spam otomatis.'
                : 'Your data is strictly protected. Channels are shielded against automated scraping bots.'}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
