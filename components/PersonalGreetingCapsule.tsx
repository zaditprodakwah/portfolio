"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MessageSquareCode, X } from "lucide-react";

interface PersonalGreetingCapsuleProps {
  lang?: "id" | "en";
  onOpenChat?: () => void;
}

export function PersonalGreetingCapsule({ lang = "id", onOpenChat }: PersonalGreetingCapsuleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    // Check sessionStorage so it does not disturb returning navigations
    const seen = sessionStorage.getItem("has_seen_greeting_capsule_v1");
    if (!seen) {
      // Gentle delay before floating in
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsDismissed(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => setIsDismissed(true), 300);
    sessionStorage.setItem("has_seen_greeting_capsule_v1", "true");
  };

  if (isDismissed) return null;

  return (
    <aside
      aria-label={lang === "id" ? "Sapaan Personal Zadit" : "Personal Greeting from Zadit"}
      className={`fixed bottom-20 sm:bottom-5 left-3 right-3 sm:left-auto sm:right-5 z-40 max-w-sm sm:max-w-md bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-2xl p-4 sm:p-5 transition-all duration-300 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      {/* Close button */}
      <button
        onClick={handleDismiss}
        type="button"
        aria-label={lang === "id" ? "Tutup sapaan" : "Dismiss greeting"}
        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      <div className="flex items-start gap-3.5 sm:gap-4 pr-6">
        {/* Photo with Online Dot (Without priority to prevent unused preload warning) */}
        <div className="relative shrink-0 mt-0.5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden ring-2 ring-teal-600/20 shadow-sm relative bg-slate-100">
            <Image
              src="/foto-zadit.jpg"
              alt="Muhammad Khoiruzzadittaqwa"
              fill
              sizes="(max-width: 640px) 48px, 56px"
              className="object-cover"
              loading="lazy"
            />
          </div>
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-xs"
            title="Online & Siap Berdiskusi"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="text-xs sm:text-sm font-heading font-bold text-slate-900 truncate">
              Muhammad Khoiruzzadittaqwa
            </h3>
          </div>

          <p className="text-xs text-slate-600 leading-snug line-clamp-2 sm:line-clamp-3 mb-2.5">
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-[11px] font-heading font-bold tracking-wide uppercase transition-colors shadow-xs cursor-pointer"
              >
                <MessageSquareCode className="w-3.5 h-3.5" />
                <span>{lang === "id" ? "Tanya AI" : "Chat with AI"}</span>
              </button>
            )}

            <a
              href="https://wa.me/6281351859871?text=Halo%20Mas%20Zadit,%20saya%20tertarik%20berkonsultasi%20mengenai%20kebutuhan%20proyek."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-heading font-semibold transition-colors"
            >
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
