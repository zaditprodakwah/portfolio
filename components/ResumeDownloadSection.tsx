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
            <FileText className="w-3.5 h-3.5 text-slate-700" />
            <span>Dokumen Kredensial & Rekam Jejak</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Curriculum Vitae & Ringkasan Kualifikasi
          </h2>

          <p className="text-xs sm:text-base text-slate-700 leading-relaxed font-sans">
            Dikelola secara terstruktur dan terverifikasi. Diformat dalam tata letak bersih tanpa tabel membingungkan, menjamin keterbacaan optimal bagi evaluasi pimpinan institusi, dewan penguji kesarjanaan, maupun komite peninjau kemitraan strategis.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-sans text-slate-800 font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Jam Terbang Profesional 10+ Tahun</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Kepatuhan Etika Akademik & Integritas</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Rekam Jejak Lintas Institusi</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Keterbacaan Standar Eksekutif</span>
            </div>
          </div>

          {/* Action Buttons: Clean Dual PDF Access */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <Link
              href="/cv"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-heading font-semibold text-xs px-5 py-3 rounded-xl shadow-xs transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Lihat CV Lengkap</span>
            </Link>

            <a
              href="/cv.pdf"
              download="Muhammad_Khoiruzzadittaqwa_CV.pdf"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-heading font-semibold text-xs px-4 py-3 rounded-xl shadow-xs transition-colors"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Unduh PDF (English)</span>
            </a>

            <a
              href="/cv-id.pdf"
              download="Muhammad_Khoiruzzadittaqwa_CV_ID.pdf"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-heading font-semibold text-xs px-4 py-3 rounded-xl shadow-xs transition-colors"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Unduh PDF (Bahasa Indonesia)</span>
            </a>
          </div>
        </div>

        {/* Right Preview Card: Clean Executive Snapshot */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200/90 p-5 sm:p-6 rounded-2xl space-y-4 font-sans text-xs">
          <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <span className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider">
              Ringkasan Kualifikasi Pokok
            </span>
            <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono font-medium">
              Terverifikasi
            </span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 font-mono text-[10px] uppercase block">Nama Lengkap</span>
              <span className="font-heading font-bold text-slate-900 text-sm">Muhammad Khoiruzzadittaqwa</span>
            </div>
            <div>
              <span className="text-slate-400 font-mono text-[10px] uppercase block">Fokus Kepakaran</span>
              <span className="text-slate-800 font-medium">Riset Metodologi, Intelijen Reputasi, & Tata Kelola Dokumen</span>
            </div>
            <div>
              <span className="text-slate-400 font-mono text-[10px] uppercase block">Pengalaman Lapangan</span>
              <span className="text-slate-800 font-medium">10+ Tahun (Praktik Mandiri & Konsultatif Sejak 2015)</span>
            </div>
            <div>
              <span className="text-slate-400 font-mono text-[10px] uppercase block">Karya Publikasi</span>
              <span className="text-slate-800 font-medium">Manuskrip Buku Referensi 18 Bab (ilmify.id)</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 font-sans">
            Seluruh berkas kurikulum vitae resmi mencantumkan riwayat proyek, kualifikasi analitik, dan portofolio yang dapat diverifikasi.
          </p>
        </div>
      </div>
    </section>
  );
};
