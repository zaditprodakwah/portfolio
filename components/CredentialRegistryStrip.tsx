"use client";

import React, { useState } from "react";
import { 
  Award, 
  ExternalLink, 
  Check, 
  Copy, 
  ShieldCheck, 
  Terminal, 
  FileCheck2, 
  Building,
  GraduationCap
} from "lucide-react";
import { CREDENTIALS_REGISTRY, CredentialItem } from "@/lib/credentials-data";
import { useLanguage } from "@/context/LanguageContext";

export const CredentialRegistryStrip: React.FC = () => {
  const { language } = useLanguage();
  const isId = language === "id";
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (category: CredentialItem["category"]) => {
    switch (category) {
      case "engineering":
        return <Terminal className="w-3.5 h-3.5 text-slate-700" />;
      case "legal":
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />;
      case "marketing":
        return <FileCheck2 className="w-3.5 h-3.5 text-blue-700" />;
      case "management":
        return <Building className="w-3.5 h-3.5 text-amber-700" />;
      default:
        return <Award className="w-3.5 h-3.5 text-slate-700" />;
    }
  };

  return (
    <section 
      id="kredensial-resmi" 
      aria-label="Registri Kredensial dan Sertifikasi Resmi"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
    >
      <div className="space-y-6">
        
        {/* Header Seksi */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200/90 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/80 text-[11px] font-mono font-semibold text-emerald-800 uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isId ? "Registri Kredensial Resmi" : "Official Credential Registry"}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
              {isId ? "Sertifikasi Profesi & Legalitas Terverifikasi" : "Verified Professional Certifications & Registry"}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md font-sans">
            {isId 
              ? "Seluruh lisensi dan identitas terdaftar dapat diaudit langsung melalui tautan repositori penerbit atau nomor registrasi resmi."
              : "All credentials and registrations are directly auditable via issuing repository links or official registration IDs."}
          </p>
        </div>

        {/* Grid Kartu Kredensial Berstandar Modern Web Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CREDENTIALS_REGISTRY.map((item) => {
            const hasVerification = Boolean(item.verificationUrl);
            return (
              <article 
                key={item.id}
                className="relative bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors shadow-2xs group"
              >
                {/* Header Kartu */}
                <header className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {getCategoryIcon(item.category)}
                      <span>{item.issuer}</span>
                    </span>
                    {item.duration && (
                      <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 font-semibold">
                        {item.duration}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 leading-snug pt-1">
                    {hasVerification ? (
                      <a 
                        href={item.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-emerald-800 transition-colors after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 rounded"
                      >
                        {item.title}
                      </a>
                    ) : (
                      <span>{item.title}</span>
                    )}
                  </h3>
                </header>

                {/* Konten Ringkasan */}
                <p className="text-xs text-slate-600 leading-relaxed font-sans grow">
                  {item.description}
                </p>

                {/* Footer Kartu & Aksi Independen */}
                <footer className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs relative z-10">
                  {item.credentialId ? (
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] text-slate-500 font-medium truncate max-w-[120px]" title={item.credentialId}>
                        ID: {item.credentialId}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(item.id, item.credentialId!);
                        }}
                        className="p-1 text-slate-400 hover:text-slate-700 transition-colors rounded hover:bg-slate-100"
                        title={isId ? "Salin ID Kredensial" : "Copy Credential ID"}
                        aria-label={isId ? "Salin ID Kredensial" : "Copy Credential ID"}
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-500">
                      {item.badge}
                    </span>
                  )}

                  {hasVerification && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-heading font-medium text-slate-700 group-hover:text-emerald-800 transition-colors">
                      <span>{isId ? "Verifikasi" : "Verify"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  )}
                </footer>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
