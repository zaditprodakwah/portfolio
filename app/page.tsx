"use client";

import React, { useState } from "react";
import { LanguageProvider } from "@/lib/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { ConsultationBuilder } from "@/components/ConsultationBuilder";
import { ResumeDownloadSection } from "@/components/ResumeDownloadSection";
import { ContactFooter } from "@/components/ContactFooter";
import { AIChatDrawer } from "@/components/AIChatDrawer";
import { MobileNavDrawer } from "@/components/MobileNavDrawer";
import { MobileActionDock } from "@/components/MobileActionDock";
import { ENTITY_NODES } from "@/lib/entity-graph";

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Schema.org Linked Data JSON-LD dengan Otoritas Graf Entitas Wikidata
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://zadit.pages.dev/#person",
        "name": "Muhammad Khoiruzzadittaqwa",
        "alternateName": ["Zadit", "muhzadit"],
        "url": "https://zadit.pages.dev",
        "jobTitle": "Strategic Growth, Business Proposal & Research Consultant",
        "image": "https://zadit.pages.dev/foto-zadit.jpg",
        "sameAs": [
          "https://www.sribu.com/id/users/muhzadit",
          "https://linkedin.com/in/muhzadit",
          "https://github.com/muhzadit",
          "https://kontak.link/muhzadit"
        ],
        "knowsAbout": Object.values(ENTITY_NODES).map((node) => ({
          "@type": "Thing",
          "name": node.name,
          "sameAs": node.wikidataUri
        }))
      },
      {
        "@type": "WebSite",
        "@id": "https://zadit.pages.dev/#website",
        "url": "https://zadit.pages.dev",
        "name": "Zadit Growth OS & Executive Portfolio",
        "description": "Portfolio eksekutif, dokumen bisnis, pengolahan data statistik SINTA, dan solusi performa web berorientasi konversi nyata.",
        "publisher": {
          "@id": "https://zadit.pages.dev/#person"
        }
      }
    ]
  };

  return (
    <LanguageProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <main className="min-h-screen flex flex-col bg-alabaster pb-16 sm:pb-0">
        <Navbar
          onOpenChat={() => setIsChatOpen(true)}
          onOpenMenu={() => setIsMenuOpen(true)}
        />
        
        <HeroSection onOpenChat={() => setIsChatOpen(true)} />

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
      </main>
    </LanguageProvider>
  );
}
