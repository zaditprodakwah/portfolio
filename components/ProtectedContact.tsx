"use client";

import React, { useState, useEffect } from "react";
import { Mail, MessageSquare, Copy, Check, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

// Base64 obfuscated credentials (immune to plain-text regex crawler scraping)
const ENC_EMAIL = "bXVoemFkaXRAZ21haWwuY29t";
const ENC_PHONE = "KzYyIDgyMy0xNjM2LTMxNzc=";
const ENC_WA_BASE = "aHR0cHM6Ly93YS5tZS82MjgyMzE2MzYzMTc3";

function safeDecode(b64: string): string {
  try {
    if (typeof window !== "undefined" && window.atob) {
      return window.atob(b64);
    }
  } catch {
    // fallback
  }
  return "";
}

interface ProtectedContactProps {
  type: "email" | "whatsapp" | "phone";
  className?: string;
  showIcon?: boolean;
  label?: string;
  actionText?: string;
  prefillMessage?: string;
}

export const ProtectedContact: React.FC<ProtectedContactProps> = ({
  type,
  className = "",
  showIcon = true,
  label,
  actionText,
  prefillMessage,
}) => {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [decodedValue, setDecodedValue] = useState<string>("");

  useEffect(() => {
    if (type === "email") {
      setDecodedValue(safeDecode(ENC_EMAIL));
    } else if (type === "phone" || type === "whatsapp") {
      setDecodedValue(safeDecode(ENC_PHONE));
    }
  }, [type]);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!decodedValue) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(decodedValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAction = () => {
    if (type === "email") {
      const email = decodedValue || safeDecode(ENC_EMAIL);
      window.location.href = `mailto:${email}`;
    } else if (type === "whatsapp") {
      const waBase = safeDecode(ENC_WA_BASE);
      const url = prefillMessage
        ? `${waBase}?text=${encodeURIComponent(prefillMessage)}`
        : waBase;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const displayText = label || actionText || decodedValue || (
    <span className="text-slate-400 italic flex items-center gap-1 text-[11px]">
      <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
      {lang === "id" ? "[Kontak Terproteksi]" : "[Protected Contact]"}
    </span>
  );

  return (
    <div className={`inline-flex items-center gap-2 group ${className}`}>
      <button
        type="button"
        onClick={handleAction}
        className="inline-flex items-center gap-2 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded-md py-1 cursor-pointer"
        title={lang === "id" ? "Klik untuk membuka komunikasi langsung" : "Click to launch direct channel"}
      >
        {showIcon && (
          <>
            {type === "email" ? (
              <Mail className="w-4 h-4 text-teal-400 shrink-0" />
            ) : (
              <MessageSquare className="w-4 h-4 text-teal-400 shrink-0" />
            )}
          </>
        )}

        <span className="font-semibold">
          {displayText}
        </span>
      </button>

      {decodedValue && !label && (
        <button
          type="button"
          onClick={handleCopy}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-400 cursor-pointer"
          title={lang === "id" ? "Salin ke papan klip" : "Copy to clipboard"}
          aria-label={lang === "id" ? "Salin kontak" : "Copy contact info"}
        >
          {copied ? (
            <span className="flex items-center gap-1 text-xs text-teal-400 font-mono font-bold">
              <Check className="w-3 h-3" />
              <span>{lang === "id" ? "Tersalin" : "Copied"}</span>
            </span>
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      )}
    </div>
  );
};
