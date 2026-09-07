'use client';

import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  FileText,
  TrendingUp,
  GraduationCap,
  Globe,
  MessageCircle
} from 'lucide-react';

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
  
  const categories = [
    {
      id: 'proposal',
      label: { id: 'Proposal Bisnis & SOP', en: 'Business Proposals & SOP' },
      icon: FileText
    },
    {
      id: 'academic',
      label: { id: 'Riset Akademik & Olah Data', en: 'Academic Research & Data' },
      icon: GraduationCap
    },
    {
      id: 'web',
      label: { id: 'Website Bisnis & Konversi', en: 'Business Web & Conversion' },
      icon: Globe
    },
    {
      id: 'seo',
      label: { id: 'SEO & Konten Organik', en: 'High-Intent SEO & Content' },
      icon: TrendingUp
    },
    {
      id: 'general',
      label: { id: 'Konsultasi Strategi / Karir', en: 'General Strategy & Career' },
      icon: MessageCircle
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('proposal');
  const [clientName, setClientName] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory) || categories[0];
  const activeCategoryLabel = activeCategoryObj.label.id;

  // Dynamic message builders
  const buildTextMessage = () => {
    if (true) {
      let msg = `Halo Zadit, perkenalkan saya ${clientName.trim() || '[Nama Saya]'}`;
      if (organization.trim()) {
        msg += ` dari ${organization.trim()}`;
      }
      msg += `.\n\nSaya ingin berdiskusi mengenai: *${activeCategoryLabel}*.`;
      if (notes.trim()) {
        msg += `\n\nRingkasan konteks/kebutuhan:\n${notes.trim()}`;
      }
      msg += `\n\nKira-kira kapan waktu yang tepat untuk diskusi awal tanpa komitmen? Terima kasih.`;
      return msg;
    } else {
      let msg = `Hello Zadit, my name is ${clientName.trim() || '[My Name]'}`;
      if (organization.trim()) {
        msg += ` from ${organization.trim()}`;
      }
      msg += `.\n\nI would like to discuss: *${activeCategoryLabel}*.`;
      if (notes.trim()) {
        msg += `\n\nContext / Requirements:\n${notes.trim()}`;
      }
      msg += `\n\nWhen would be a convenient time for an initial discussion? Thank you.`;
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
      true
        ? `Diskusi Kebutuhan: ${activeCategoryLabel} (${clientName.trim() || 'Mitra'})`
        : `Consultation Inquiry: ${activeCategoryLabel} (${clientName.trim() || 'Partner'})`
    );
    const body = encodeURIComponent(buildTextMessage().replace(/\*/g, ''));
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="consultation" className="py-12 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto border-t border-slate-200">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs relative">
        <div className="space-y-3 mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-900 text-xs font-mono uppercase tracking-wider font-bold">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>
              {true ? 'Formulir Diskusi Kebutuhan' : 'Structured Project Inquiry'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            {true
              ? 'Mulai Konsultasi Langsung dengan Zadit'
              : 'Initiate a Direct Consultation with Zadit'}
          </h2>

          <p className="text-slate-700 text-xs sm:text-base max-w-2xl leading-relaxed font-sans">
            {true
              ? 'Pilih bidang kebutuhan Anda untuk menyusun pesan yang terarah. Langsung terhubung ke WhatsApp atau Email resmi tanpa hambatan birokrasi.'
              : 'Select your requirements below to generate a clear, structured consultation message. Connect directly via WhatsApp or Email without friction.'}
          </p>
        </div>

        <div className="space-y-6">
          {/* Step 1: Category Selection with Executive Lucide Icons */}
          <div className="space-y-2.5">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              {true ? '1. Pilih Bidang Kebutuhan Anda' : '1. Select Your Area of Need'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const IconComponent = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 ${
                      isSelected
                        ? 'bg-teal-50 border-teal-700 text-teal-950 font-bold shadow-xs ring-1 ring-teal-700'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-teal-700 text-white' : 'bg-slate-200/80 text-slate-700'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </span>
                    <span className="flex-1 leading-snug">{cat.label.id}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Name & Organization Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="consultation-client-name" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                {true ? '2. Nama Lengkap Anda' : '2. Your Full Name'}
              </label>
              <input
                id="consultation-client-name"
                name="clientName"
                autoComplete="name"
                type="text"
                placeholder={true ? 'Contoh: Budi Santoso' : 'e.g. John Doe'}
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-teal-700 focus:bg-white transition-all placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="consultation-org-name" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                {true ? 'Nama Usaha / Lembaga / Kampus' : 'Organization / University / Business'}
              </label>
              <input
                id="consultation-org-name"
                name="organization"
                autoComplete="organization"
                type="text"
                placeholder={true ? 'Contoh: PT Maju Bersama / Univ. Gadjah Mada' : 'e.g. Acme Corp / Stanford Univ'}
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-teal-700 focus:bg-white transition-all placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Step 3: Notes / Context */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="consultation-notes" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                {true ? '3. Ringkasan Kebutuhan / Deadline' : '3. Context / Questions / Deadline'}
              </label>
              <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                {true ? '(Opsional)' : '(Optional)'}
              </span>
            </div>
            <textarea
              id="consultation-notes"
              name="notes"
              rows={3}
              placeholder={
                true
                  ? 'Ceritakan secara singkat target, kendala yang dihadapi, atau deadline yang diinginkan...'
                  : 'Briefly share your target outcome, current challenges, or desired timeline...'
              }
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-teal-700 focus:bg-white transition-all resize-none placeholder:text-slate-500 font-sans"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleLaunchWhatsApp}
              className="flex-1 inline-flex items-center justify-center gap-2.5 bg-teal-700 hover:bg-teal-800 text-white font-heading font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl shadow-xs transition-all duration-150 group text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 active:scale-[0.99]"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>
                {true ? 'Kirim Ringkasan ke WhatsApp' : 'Open in WhatsApp'}
              </span>
              <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={handleLaunchEmail}
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl shadow-xs transition-all duration-150 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 active:scale-[0.99]"
            >
              <Mail className="w-4 h-4 text-teal-300" />
              <span>
                {true ? 'Kirim via Email Resmi' : 'Send via Direct Email'}
              </span>
            </button>
          </div>

          {/* Reassurance Microcopy */}
          <p className="text-center sm:text-left text-xs text-slate-600 font-sans flex items-center gap-2 justify-center sm:justify-start">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
            <span>
              {true
                ? 'Diskusi awal tanpa komitmen. Kerahasiaan data riset dan bisnis Anda terjamin.'
                : 'Initial discussions carry no obligation. Strict confidentiality guaranteed.'}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
