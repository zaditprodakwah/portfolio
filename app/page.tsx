"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ExecutiveLobbyHero } from "@/components/ExecutiveLobbyHero";
import { EpistemicDoctrine } from "@/components/EpistemicDoctrine";
import { ExecutivePavilions } from "@/components/ExecutivePavilions";
import { ScholarlyMonographPreview } from "@/components/ScholarlyMonographPreview";
import { SelectedCaseEvidence } from "@/components/SelectedCaseEvidence";
import { CredentialRegistryStrip } from "@/components/CredentialRegistryStrip";
import { ResumeDownloadSection } from "@/components/ResumeDownloadSection";
import { ExecutiveDialogueSalon } from "@/components/ExecutiveDialogueSalon";
import { ContactFooter } from "@/components/ContactFooter";
import { AIChatDrawer } from "@/components/AIChatDrawer";
import { MobileNavDrawer } from "@/components/MobileNavDrawer";
import { MobileActionDock } from "@/components/MobileActionDock";
import { FloatingToCWidget } from "@/components/FloatingToCWidget";

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#FAF9F6] text-[#141416] pb-24 sm:pb-12 scroll-smooth">
      <Navbar
        onOpenChat={() => setIsChatOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
      />
      
      {/* 1. Sapaan Lobi Eksekutif: Foto, Identitas, H1 Lugas, Tombol Aksi Jempol */}
      <ExecutiveLobbyHero onOpenChat={() => setIsChatOpen(true)} />

      {/* 2. Doktrin Nalar: 3 Prinsip Berpikir Fundamental */}
      <EpistemicDoctrine />

      {/* 3. Empat Koridor Praktik: Navigasi Padat Tanpa Label Harga/Paket */}
      <ExecutivePavilions />

      {/* 4. Etalase Manuskrip Kesarjanaan: Jangkar & Kompas Riset Ilmiah (ilmify.id) */}
      <ScholarlyMonographPreview />

      {/* 5. Rekam Jejak & Bukti Empiris Terpilih */}
      <SelectedCaseEvidence />

      {/* 6. Registri Kredensial & Sertifikasi Resmi */}
      <CredentialRegistryStrip />

      {/* 7. Akses Resume & CV Resmi */}
      <ResumeDownloadSection />

      {/* 7. Salon Dialog: Pintu Masuk Konsultasi Terbuka & Ramah */}
      <ExecutiveDialogueSalon />

      {/* 8. Catatan Kaki & Hak Cipta */}
      <ContactFooter />

      {/* Drawers & Controls */}
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
  );
}
