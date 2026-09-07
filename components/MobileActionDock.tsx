"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, MessageCircle, FileText } from "lucide-react";
import { ProtectedContact } from "./ProtectedContact";

interface MobileActionDockProps {
  onOpenMenu: () => void;
  activeTopic?: string;
}

export function MobileActionDock({ onOpenMenu, activeTopic }: MobileActionDockProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Sembunyikan dock saat form input fokus (virtual keyboard aktif)
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        setIsVisible(false);
      }
    };

    const handleFocusOut = () => {
      setIsVisible(true);
    };

    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);

    return () => {
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  if (!isVisible) return null;

  const prefillMessage = activeTopic
    ? `Halo Mas Zadit, saya membaca topik ${activeTopic} di zadit.pages.dev dan ingin berdiskusi mengenai kebutuhan proyek kami.`
    : "Halo Mas Zadit, saya melihat portofolio Anda di zadit.pages.dev dan ingin berdiskusi mengenai konsultasi layanan.";

  return (
    <aside
      aria-label="Aksi Cepat Mobile"
      className="fixed bottom-3 left-3 right-3 z-40 sm:hidden"
    >
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-2 rounded-2xl shadow-xl border border-slate-700/60 flex items-center justify-between gap-1.5">
        {/* Tombol Menu Drawer */}
        <button
          onClick={onOpenMenu}
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl text-[11px] font-bold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors active:scale-95 cursor-pointer"
          aria-label="Buka Menu Navigasi"
        >
          <Compass className="w-4.5 h-4.5 mb-0.5 text-teal-400" />
          <span>Menu</span>
        </button>

        {/* Tombol WhatsApp Cepat */}
        <div className="flex-[1.4] flex items-center justify-center">
          <ProtectedContact
            type="whatsapp"
            label="WhatsApp"
            prefillMessage={prefillMessage}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs active:scale-95 transition-all"
          />
        </div>

        {/* Tombol Buka CV */}
        <Link
          href="/cv"
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl text-[11px] font-bold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors active:scale-95"
          aria-label="Buka Halaman CV PDF"
        >
          <FileText className="w-4.5 h-4.5 mb-0.5 text-teal-400" />
          <span>Buka CV</span>
        </Link>
      </div>
    </aside>
  );
}
