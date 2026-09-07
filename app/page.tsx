"use client";

import React, { useState } from "react";
import { LanguageProvider } from "@/lib/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { QuickAuditTeaser } from "@/components/QuickAuditTeaser";
import { ServicesSection } from "@/components/ServicesSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { ConsultationBuilder } from "@/components/ConsultationBuilder";
import { ResumeDownloadSection } from "@/components/ResumeDownloadSection";
import { ContactFooter } from "@/components/ContactFooter";
import { AIChatDrawer } from "@/components/AIChatDrawer";
import { MobileNavDrawer } from "@/components/MobileNavDrawer";
import { MobileActionDock } from "@/components/MobileActionDock";
import { FloatingToCWidget } from "@/components/FloatingToCWidget";

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <LanguageProvider>
      <main className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-alabaster pb-32 sm:pb-12 scroll-smooth">
        <Navbar
          onOpenChat={() => setIsChatOpen(true)}
          onOpenMenu={() => setIsMenuOpen(true)}
        />
        
        <HeroSection onOpenChat={() => setIsChatOpen(true)} />

        <QuickAuditTeaser />

        <ServicesSection />

        <CaseStudiesSection />

        <ConsultationBuilder />

        <ResumeDownloadSection />

        <ContactFooter />

        <MobileNavDrawer
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />

        <MobileActionDock
          onOpenMenu={() => setIsMenuOpen(true)}
        />

        <AIChatDrawer
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />

        <FloatingToCWidget />
      </main>
    </LanguageProvider>
  );
}
