"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { 
  Radar, 
  Layers, 
  Cpu, 
  Terminal, 
  CreditCard, 
  MessageSquare,
  ChevronUp,
  Radio
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: "cockpit", label: "Radar", shortLabel: "Radar", icon: Radar },
  { id: "alur", label: "Alur", shortLabel: "Alur", icon: Layers },
  { id: "sektor", label: "Sektor", shortLabel: "Sektor", icon: Cpu },
  { id: "terminal", label: "Terminal", shortLabel: "Terminal", icon: Terminal },
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
    <div className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-3xl pointer-events-auto">
      <div className="relative rounded-2xl bg-[#0b0d11]/90 border border-[#10b981]/25 backdrop-blur-xl shadow-2xl shadow-black/80 overflow-hidden">
        
        {/* Laser Progress Line */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-white/5">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#059669] shadow-sm shadow-[#10b981]"
            style={{ scaleX, transformOrigin: "0%" }}
          />
        </div>

        <div className="px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between gap-2 text-xs">
          
          {/* Status Sentinel Ping & Progress % */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#9ca3af] shrink-0">
            <button 
              onClick={scrollToTop}
              title="Kembali ke atas"
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#141820] hover:bg-white/10 transition-colors border border-white/5 text-[#f3f4f6]"
            >
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="font-bold text-[#10b981]">LIVE</span>
              <span className="text-[10px] text-white/50">{percent}%</span>
            </button>
          </div>

          {/* Quick Nav Anchors */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-lg font-mono text-[11px] transition-all whitespace-nowrap border ${
                    isActive
                      ? "bg-[#10b981] text-[#0b0d11] font-bold border-[#10b981] shadow-md shadow-[#10b981]/20"
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

          {/* Direct CTA */}
          <div className="shrink-0 flex items-center gap-1">
            <a
              href="https://wa.me/6285864149673?text=Halo%20Zadit%2C%20saya%20tertarik%20melihat%20sampel%20telemetri%20data%20PRADIKTIF%20untuk%20kebutuhan%20bisnis%20kami."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#10b981] hover:bg-[#059669] text-[#0b0d11] font-mono text-[11px] font-bold transition-all shadow-md shadow-[#10b981]/20 whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>Minta Sampel</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
