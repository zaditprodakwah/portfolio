'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, Linkedin, Github, ExternalLink, Award, FileText } from 'lucide-react';
import { cvProfile } from '@/lib/cv-data';
import { useLanguage } from '@/lib/LanguageContext';
import { ProtectedContact } from './ProtectedContact';

export const ContactFooter: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <footer id="contact" className="bg-slate-900 text-white pt-16 pb-12 px-6 border-t border-slate-800">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-heading font-extrabold text-lg shadow-sm">
                Z
              </div>
              <span className="font-heading font-bold text-lg text-white tracking-tight">
                {cvProfile.name}
              </span>
            </div>
            <p className="text-slate-200 text-sm max-w-md leading-relaxed font-sans">
              {cvProfile.summaries[lang]}
            </p>
            <p className="font-mono text-xs text-teal-400 pt-1 font-semibold">
              {lang === 'id' ? 'Domisili: ' : 'Location: '}
              {cvProfile.contact.location}
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col sm:flex-row gap-8 lg:justify-end text-xs font-mono">
            {/* Direct Protected Channels */}
            <div className="space-y-3">
              <p className="text-slate-300 uppercase tracking-wider text-xs font-bold">
                {lang === 'id' ? 'Komunikasi Terproteksi' : 'Protected Channels'}
              </p>
              <div className="flex flex-col space-y-2.5">
                <ProtectedContact type="whatsapp" />
                <ProtectedContact type="email" />
                <Link
                  href="/cv"
                  className="flex items-center gap-2 text-slate-200 hover:text-teal-300 transition-colors font-mono text-xs font-bold pt-1"
                >
                  <FileText className="w-4 h-4 text-teal-400" />
                  <span>{lang === 'id' ? 'Halaman Resmi CV (/cv)' : 'Official CV Page (/cv)'}</span>
                </Link>
              </div>
            </div>

            {/* Verified External Profiles */}
            <div className="space-y-3">
              <p className="text-slate-300 uppercase tracking-wider text-xs font-bold">
                {lang === 'id' ? 'Tautan Terverifikasi' : 'Verified Profiles'}
              </p>
              <div className="space-y-2.5">
                <a
                  href={cvProfile.contact.sribuProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-200 hover:text-teal-300 transition-colors font-medium"
                >
                  <Award className="w-4 h-4 text-teal-400" />
                  <span>Sribu (Rating 5.0)</span>
                </a>
                <a
                  href={cvProfile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-200 hover:text-teal-300 transition-colors font-medium"
                >
                  <Linkedin className="w-4 h-4 text-teal-400" />
                  <span>LinkedIn Profil</span>
                </a>
                <a
                  href={cvProfile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-200 hover:text-teal-300 transition-colors font-medium"
                >
                  <Github className="w-4 h-4 text-teal-400" />
                  <span>GitHub Repository</span>
                </a>
                <a
                  href={cvProfile.contact.kontakLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-200 hover:text-teal-300 transition-colors font-medium"
                >
                  <ExternalLink className="w-4 h-4 text-teal-400" />
                  <span>Kontak.link Hub</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-400">
          <p>© 2026 Muhammad Khoiruzzadittaqwa. All rights reserved.</p>
          <p>zadit.pages.dev · Strategic Advisory &amp; Growth OS</p>
        </div>
      </div>
    </footer>
  );
};
