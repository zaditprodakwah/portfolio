"use client";

import Image from "next/image";
import { ShieldCheck, MessageSquare } from "lucide-react";

interface PersonalGreetingCapsuleProps {
  lang?: "id" | "en";
}

export function PersonalGreetingCapsule({ lang = "id" }: PersonalGreetingCapsuleProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-teal-300 transition-all">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
        <div className="relative shrink-0">
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden ring-3 ring-teal-600/10 shadow-sm relative bg-slate-100">
            <Image
              src="/foto-zadit.jpg"
              alt="Muhammad Khoiruzzadittaqwa"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span
            className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-emerald-500 border-2 border-white rounded-full"
            title="Online & Tersedia"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Muhammad Khoiruzzadittaqwa
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200/60">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              {lang === "id" ? "Tersedia untuk Kolaborasi" : "Available for Projects"}
            </span>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
            {lang === "id" ? (
              <>
                Selamat datang. Saya mendampingi pelaku usaha, pengurus yayasan, dosen, dan rekruter menyelesaikan kebutuhan dokumen kemitraan, analisis data riset, serta web performa tinggi dengan tenang, rapi, dan dapat dipertanggungjawabkan.
              </>
            ) : (
              <>
                Welcome. I partner with business founders, non-profit trustees, researchers, and hiring teams to deliver executive documents, statistical research, and high-performance web systems with calm precision and rigorous accountability.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
