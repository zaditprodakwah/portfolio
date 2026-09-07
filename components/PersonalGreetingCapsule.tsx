"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MessageSquareCode, X, ChevronUp, Sparkles } from "lucide-react";

interface PersonalGreetingCapsuleProps {
  lang?: "id" | "en";
  onOpenChat?: () => void;
}

export function PersonalGreetingCapsule({ lang = "id", onOpenChat }: PersonalGreetingCapsuleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Check sessionStorage so it does not disturb returning navigations
    const seen = sessionStorage.getItem("has_seen_greeting_capsule_v1");
    if (!seen) {
      // Gentle delay before floating in
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsDismissed(false);
        // On very small screens, auto-minimize after 6 seconds to prevent content occlusion
        if (typeof window !== "undefined" && window.innerWidth < 640) {
          const autoMinTimer = setTimeout(() => {
            setIsMinimized(true);
          }, 6000);
          return () => clearTimeout(autoMinTimer);
        }
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsVisible(false);
    setTimeout(() => setIsDismissed(true), 300);
    sessionStorage.setItem("has_seen_greeting_capsule_v1", "true");
  };

  if (isDismissed) return null;

  // Mini-pill state (compact bubble on mobile)
  if (isMinimized) {
    return (
      <aside
        aria-label="Sapaan Zadit"
        className="fixed bottom-20 sm:bottom-5 right-3 sm:right-5 z-40 sm:hidden"
      >
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg rounded-full py-1.5 px-3 hover:border-teal-500 transition-all cursor-pointer group active:scale-95"
        >
          <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-teal-600/30">
            <Image
              src="/foto-zadit.jpg"
              alt="Zadit"
              fill
              sizes="28px"
              className="object-cover"
              loading="lazy"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border border-white rounded-full" />
          </div>
          <span className="text-xs font-heading font-bold text-slate-900 group-hover:text-teal-700">
            Zadit • Konsultasi
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-teal-600 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </aside>
    );
  }

  return (
    <aside
      aria-label={lang === "id" ? "Sapaan Personal Zadit" : "Personal Greeting from Zadit"}
      className={`fixed bottom-20 sm:bottom-5 left-3 right-3 sm:left-auto sm:right-5 z-40 max-w-sm sm:max-w-md bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-2xl p-4 sm:p-5 transition-all duration-300 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      {/* Controls: Minimize on mobile + Dismiss */}
      <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
        <button
          onClick={() => setIsMinimized(true)}
          type="button"
          aria-label="Minimize greeting"
          className="sm:hidden w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors text-[10px]"
          title="Kecilkan"
        >
          _
        </button>
        <button
          onClick={handleDismiss}
          type="button"
          aria-label={lang === "id" ? "Tutup sapaan" : "Dismiss greeting"}
          className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-start gap-3 sm:gap-4 pr-12 sm:pr-8">
        {/* Photo with Online Dot */}
        <div className="relative shrink-0 mt-0.5">
          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl overflow-hidden ring-2 ring-teal-600/20 shadow-xs relative bg-slate-100">
            <Image
              src="/foto-zadit.jpg"
              alt="Muhammad Khoiruzzadittaqwa"
              fill
              sizes="(max-width: 640px) 44px, 56px"
              className="object-cover"
              loading="lazy"
            />
          </div>
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-xs"
            title="Online & Siap Berdiskusi"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="text-xs sm:text-sm font-heading font-bold text-slate-900 truncate">
              Muhammad Khoiruzzadittaqwa
            </h3>
          </div>

          <p className="text-[11px] sm:text-xs text-slate-700 leading-snug line-clamp-2 sm:line-clamp-3 mb-2.5">
            {lang === "id"
              ? "Halo! Sedang mempersiapkan naskah jurnal SINTA, olah data statistik rumit, atau butuh web cepat? Mari kita selesaikan solusinya."
              : "Hello! Finalizing a research manuscript, statistical modeling, or building a high-speed web platform? Feel free to discuss your requirements."}
          </p>

          <div className="flex items-center gap-2">
            {onOpenChat && (
              <button
                type="button"
                onClick={() => {
                  handleDismiss();
                  onOpenChat();
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-[10px] sm:text-[11px] font-heading font-bold tracking-wide uppercase transition-colors shadow-xs cursor-pointer"
              >
                <MessageSquareCode className="w-3.5 h-3.5" />
                <span>{lang === "id" ? "Tanya AI" : "Chat with AI"}</span>
              </button>
            )}

            <a
              href="https://wa.me/6282316363177?text=Halo%20Mas%20Zadit,%20saya%20tertarik%20berkonsultasi%20mengenai%20kebutuhan%20proyek."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] sm:text-[11px] font-heading font-semibold transition-colors"
            >
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
