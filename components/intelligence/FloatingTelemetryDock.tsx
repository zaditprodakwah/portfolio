"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { 
  LayoutDashboard, 
  Layers, 
  Building2, 
  FileSpreadsheet, 
  CreditCard, 
  MessageSquare,
  ArrowUp
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: "cockpit", label: "Ringkasan", shortLabel: "Ringkas", icon: LayoutDashboard },
  { id: "alur", label: "Alur Kerja", shortLabel: "Alur", icon: Layers },
  { id: "sektor", label: "Sektor Usaha", shortLabel: "Sektor", icon: Building2 },
  { id: "terminal", label: "Simulasi Data", shortLabel: "Simulasi", icon: FileSpreadsheet },
  { id: "investasi", label: "Paket", shortLabel: "Paket", icon: CreditCard },
];

export default function FloatingTelemetryDock() {
  const [activeSection, setActiveSection] = useState<string>("cockpit");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setPercent(Math.round(v * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl pointer-events-auto">
      <div className="relative rounded-2xl bg-[#0b0d11]/92 border border-[#10b981]/30 backdrop-blur-xl shadow-2xl shadow-black/80 overflow-hidden">
        
        {/* Dynamic Reading Progress Line */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-white/5">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#059669] shadow-sm shadow-[#10b981]"
            style={{ scaleX, transformOrigin: "0%" }}
          />
        </div>

        <div className="px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between gap-2 text-xs">
          
          {/* Status Indicator & Scroll % */}
          <div className="flex items-center gap-2 text-xs text-[#9ca3af] shrink-0">
            <button 
              onClick={scrollToTop}
              title="Kembali ke atas"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#141820] hover:bg-white/10 transition-colors border border-white/5 text-[#f3f4f6] font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="font-semibold text-[#10b981]">SENTINEL</span>
              <span className="text-[11px] text-white/50">{percent}%</span>
            </button>
          </div>

          {/* Quick Section Anchors */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap border font-medium ${
                    isActive
                      ? "bg-[#10b981] text-[#0b0d11] font-semibold border-[#10b981] shadow-md shadow-[#10b981]/20 scale-105"
                      : "text-[#9ca3af] hover:text-white bg-[#141820]/70 border-white/5 hover:border-white/15"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">{item.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Direct Lead Qualification CTA */}
          <div className="shrink-0 flex items-center gap-1">
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("open-lead-modal", { detail: { plan: "Pratinjau Sampel 50 Baris" } }));
                }
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] text-xs font-semibold transition-all shadow-md shadow-[#10b981]/20 whitespace-nowrap cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>Minta Sampel</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
