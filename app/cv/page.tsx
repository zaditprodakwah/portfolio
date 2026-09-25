'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Download, ExternalLink, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';

function CVViewerContent() {
  const [docLang, setDocLang] = useState<'en' | 'id'>('en');
  const currentPdfUrl = docLang === 'en' ? '/cv.pdf' : '/cv-id.pdf';
  const currentFileName = docLang === 'en' ? 'Muhammad_Khoiruzzadittaqwa_CV.pdf' : 'Muhammad_Khoiruzzadittaqwa_CV_ID.pdf';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-slate-900 border-b border-slate-800 py-3.5 px-4 sm:px-8 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl transition-colors border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-700 text-xs font-mono text-slate-300">
              <FileText className="w-4 h-4 text-teal-400" />
              <span className="font-semibold text-white">{currentFileName}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Language Switcher for CV */}
            <div className="inline-flex p-1 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono">
              <button
                type="button"
                onClick={() => setDocLang('en')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
                  docLang === 'en'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                English (ATS)
              </button>
              <button
                type="button"
                onClick={() => setDocLang('id')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
                  docLang === 'id'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Indonesia
              </button>
            </div>

            <a
              href={currentPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
              <span>Buka Tab Baru</span>
            </a>

            <a
              href={currentPdfUrl}
              download={currentFileName}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-heading font-bold uppercase tracking-wider px-4 py-2 rounded-xl shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh PDF</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Document Viewer Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 flex flex-col items-center">
        {/* Verification Status Header */}
        <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span className="font-medium text-slate-200">
              Dokumen resmi terverifikasi: Format 1-kolom ATS Compliant dikompilasi secara deterministik via RenderCV Typst.
            </span>
          </div>
          <span className="font-mono text-[11px] text-teal-400 bg-teal-950/60 border border-teal-800/60 px-2.5 py-1 rounded-md font-semibold">
            muhzadit.pages.dev{currentPdfUrl}
          </span>
        </div>

        {/* Embedded PDF Object */}
        <div className="w-full flex-1 min-h-[75vh] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col">
          <object
            key={currentPdfUrl}
            data={currentPdfUrl}
            type="application/pdf"
            className="w-full h-full min-h-[75vh] flex-1"
          >
            {/* Fallback for browsers / devices that do not embed PDFs */}
            <div className="flex flex-col items-center justify-center p-12 text-center h-full space-y-5 bg-slate-900">
              <FileText className="w-16 h-16 text-teal-400" />
              <div className="space-y-2 max-w-md">
                <h2 className="text-xl font-heading font-bold text-white">
                  Pratinjau Dokumen PDF
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Peramban Anda tidak mendukung penampil PDF tersemat secara langsung. Silakan klik tombol di bawah untuk membuka atau mengunduh dokumen secara utuh.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={currentPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl border border-slate-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-teal-400" />
                  <span>Buka di Tab Baru</span>
                </a>
                <a
                  href={currentPdfUrl}
                  download={currentFileName}
                  className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-heading font-bold uppercase tracking-wider text-xs px-5 py-3 rounded-xl transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh Berkas PDF</span>
                </a>
              </div>
            </div>
          </object>
        </div>
      </main>
    </div>
  );
}

export default function CVPage() {
  return <CVViewerContent />;
}
