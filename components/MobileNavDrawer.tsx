"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, FileText, Compass, BookOpen, Layers, PhoneCall, ExternalLink, Archive } from "lucide-react";
import { ProtectedContact } from "./ProtectedContact";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: "id" | "en";
}

export function MobileNavDrawer({ isOpen, onClose, lang = "id" }: MobileNavDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto">
        <div>
          {/* Header Drawer */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div>
              <span className="font-bold text-base text-slate-900">Menu Navigasi</span>
              <span className="text-xs text-slate-500 block">muhzadit.pages.dev</span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Tutup Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600 px-3 py-1">
              {true ? "Pilar Layanan" : "Core Pillars"}
            </div>

            <Link
              href="/layanan/dokumen-administrasi-bisnis"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              <Layers className="w-4.5 h-4.5 text-teal-600" />
              Dokumen & SOP Bisnis
            </Link>

            <Link
              href="/layanan/seo-konten-konversi"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              <Layers className="w-4.5 h-4.5 text-teal-600" />
              SEO & Konten Konversi
            </Link>

            <Link
              href="/layanan/olah-data-statistik-sinta"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              <Layers className="w-4.5 h-4.5 text-teal-600" />
              Olah Data Riset & SINTA
            </Link>

            <Link
              href="/layanan/solusi-web-performa"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              <Layers className="w-4.5 h-4.5 text-teal-600" />
              Web Performa & Edge
            </Link>

            <div className="text-xs font-bold uppercase tracking-wider text-slate-600 px-3 pt-4 pb-1">
              {true ? "Halaman Khusus" : "Resources"}
            </div>

            <Link
              href="/audit"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold bg-teal-50 text-teal-900 border border-teal-200/80 transition-colors"
            >
              <Compass className="w-4.5 h-4.5 text-teal-600" />
              Alat Audit Kesiapan (Gratis)
            </Link>

            <Link
              href="/solusi"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              <Compass className="w-4.5 h-4.5 text-teal-600" />
              Matriks Solusi & Kasus
            </Link>

            <Link
              href="/wawasan"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              <BookOpen className="w-4.5 h-4.5 text-teal-600" />
              Wawasan & Glosarium
            </Link>

            <Link
              href="/portfolio"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              <Archive className="w-4.5 h-4.5 text-teal-600" />
              Portfolio Interaktif
            </Link>

            <Link
              href="/cv"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              <FileText className="w-4.5 h-4.5 text-teal-600" />
              Lihat CV Resmi (PDF)
            </Link>
          </nav>
        </div>

        {/* Footer Contact */}
        <div className="pt-6 border-t border-slate-100">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 mb-3">
            <span className="text-xs font-bold text-slate-800 block mb-1">
              Konsultasi WhatsApp Langsung
            </span>
            <span className="text-xs text-slate-700 block mb-3">
              Diskusikan kebutuhan dokumen, riset, atau web Anda secara santai.
            </span>
            <ProtectedContact
              type="whatsapp"
              label="Buka Obrolan WhatsApp"
              className="w-full justify-center bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center gap-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
