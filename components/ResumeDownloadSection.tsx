'use client';

import React from 'react';
import Link from 'next/link';
import { Download, FileText, CheckCircle, ExternalLink, Terminal, Eye } from 'lucide-react';
import { cvProfile } from '@/lib/cv-data';

export const ResumeDownloadSection: React.FC = () => {
  
  return (
    <section id="resume" className="py-12 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-slate-200">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 font-mono text-xs uppercase font-bold text-slate-800">
            <Terminal className="w-3.5 h-3.5 text-teal-700" />
            <span>{true ? 'Format Standar Eksekutif (RenderCV Typst)' : 'Executive Format (RenderCV Typst)'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            {true ? 'Dokumen Resume & CV Resmi Terverifikasi' : 'Verified Official Executive Resume & CV'}
          </h2>

          <p className="text-xs sm:text-base text-slate-700 leading-relaxed font-sans">
            {true
              ? 'Dikelola secara terstruktur menggunakan metodologi CV-as-Code. Diformat dalam tata letak satu kolom bersih tanpa tabel membingungkan, menjamin keterbacaan optimal pada sistem ATS (Glints, Workday, Greenhouse) maupun evaluasi pimpinan lembaga.'
              : 'Maintained via structured CV-as-Code principles using RenderCV (Typst). Formatted in a clean single-column layout without unreadable tables, ensuring 100% readability across corporate ATS systems and executive reviews.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-sans text-slate-800 font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-700 shrink-0" />
              <span>{true ? 'Kepatuhan Parser ATS 100%' : '100% ATS Parser Compliant'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-700 shrink-0" />
              <span>{true ? 'Rekam Jejak Profesional 10+ Thn' : '10+ Years Professional Track Record'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-700 shrink-0" />
              <span>{true ? 'Metrik Terukur (Google XYZ Formula)' : 'Quantifiable XYZ Metrics'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-700 shrink-0" />
              <span>{true ? 'Tipografi Bersih Source Sans 3' : 'Clean Typography (Source Sans 3)'}</span>
            </div>
          </div>

          {/* Action Buttons: Double CV Access (View & Download) */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/cv"
              className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-heading font-bold uppercase tracking-wider text-xs px-5 py-3 rounded-xl shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
            >
              <Eye className="w-4 h-4" />
              <span>{true ? 'Lihat CV (Pratinjau)' : 'View CV (Preview)'}</span>
            </Link>

            <a
              href="/cv.pdf"
              download="Muhammad_Khoiruzzadittaqwa_CV.pdf"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold uppercase tracking-wider text-xs px-5 py-3 rounded-xl shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
            >
              <Download className="w-4 h-4 text-teal-300" />
              <span>{true ? 'Unduh Dokumen PDF' : 'Download Full PDF'}</span>
            </a>

            <a
              href={cvProfile.contact.sribuProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-slate-300 hover:border-teal-700 text-slate-800 font-mono text-xs font-bold px-4 py-3 rounded-xl transition-all"
            >
              <span>{true ? 'Profil Sribu Terverifikasi' : 'Verified Sribu Profile'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Right Preview Card with WCAG AAA Contrast & No Header Collision */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200/90 p-5 sm:p-6 rounded-2xl space-y-4 font-mono text-xs">
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 min-w-0">
              <FileText className="w-4 h-4 text-teal-700 shrink-0" />
              <span className="font-bold text-slate-900 text-xs truncate">master_resume.yaml</span>
            </div>
            <span className="text-[11px] text-teal-900 bg-teal-50 px-2.5 py-1 rounded border border-teal-300 font-bold shrink-0">
              SSOT Sync Active
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-800 font-mono leading-relaxed bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 overflow-x-auto">
            <p><span className="text-teal-800 font-bold">name:</span> {cvProfile.name}</p>
            <p><span className="text-teal-800 font-bold">website:</span> https://zadit.pages.dev</p>
            <p><span className="text-teal-800 font-bold">role:</span> {cvProfile.titles.id}</p>
            <p><span className="text-teal-800 font-bold">engine:</span> RenderCV v2.3 (Typst)</p>
            <p><span className="text-teal-800 font-bold">experience:</span> 10+ Years (Since 2015)</p>
            <p><span className="text-teal-800 font-bold">satisfaction:</span> 5.0 / 5.0 Rating</p>
          </div>

          <p className="text-[11px] sm:text-xs text-slate-600 italic">
            {true
              ? 'Berkas PDF dikompilasi secara deterministik via mesin Typst sehingga selalu sinkron dengan data profil.'
              : 'The PDF is deterministically compiled via Typst, ensuring exact synchronization with portfolio data.'}
          </p>
        </div>
      </div>
    </section>
  );
};
