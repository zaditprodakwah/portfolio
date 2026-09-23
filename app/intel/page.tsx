import { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/canonical-registry";
import TelemetryRadarHero from "@/components/intelligence/TelemetryRadarHero";
import ScrollytellingContainer from "@/components/intelligence/ScrollytellingContainer";
import VerticalHubsMatrix from "@/components/intelligence/VerticalHubsMatrix";
import InteractiveAuditTerminal from "@/components/intelligence/InteractiveAuditTerminal";
import TwoStageDeliveryGuarantee from "@/components/intelligence/TwoStageDeliveryGuarantee";
import InvestmentPricingTable from "@/components/intelligence/InvestmentPricingTable";
import EnterpriseFounderFooter from "@/components/intelligence/EnterpriseFounderFooter";
import FloatingTelemetryDock from "@/components/intelligence/FloatingTelemetryDock";

export const metadata: Metadata = {
  title: "Intelijen Data Lapangan & Sentinel Pasar | PRADIKTIF Data Lab",
  description: "Pipeline telemetri dunia nyata independen: Kuantisasi Spasial H3, Anomali Z-Score SPC, Delta Mutasi E-Commerce, dan Pemantauan Tender LPSE untuk Keunggulan Keputusan Bisnis.",
  keywords: [
    "alternative data indonesia",
    "intelijen pasar e-commerce",
    "monitoring tender lpse otomatis",
    "kuantisasi spasial uber h3",
    "deteksi anomali spc 3 sigma",
    "depresiasi mobil bekas multifinance",
    "deteksi dini pkpu pailit",
    "pt prisma digital kreatif",
    "zadit",
    "daas data as a service indonesia"
  ],
  alternates: {
    canonical: getCanonicalUrl("/intel/"),
  },
  openGraph: {
    title: "Intelijen Data Lapangan & Sentinel Pasar | PRADIKTIF Data Lab",
    description: "Mengubah telemetri lapangan menjadi keunggulan keputusan sebelum laporan publik terbit. Solusi vertikal industri terverifikasi.",
    url: getCanonicalUrl("/intel/"),
    siteName: "Zadit Executive Hub",
    locale: "id_ID",
    type: "website",
  },
};

export default function IntelShowcasePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Beranda",
            "item": "https://muhzadit.pages.dev/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Intel",
            "item": getCanonicalUrl("/intel/")
          }
        ]
      },
      {
        "@type": "Service",
        "name": "PRADIKTIF Data Intelligence & Sentinel Pasar",
        "provider": {
          "@type": "Organization",
          "name": "PT Prisma Digital Kreatif",
          "url": "https://muhzadit.pages.dev/"
        },
        "description": "Layanan pipeline intelijen telemetri maritim, mutasi e-commerce, tender pemerintah, dan anomali geospasial berbasis Kontrol Proses Statistik.",
        "areaServed": "ID",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Paket Data Intelligence",
          "itemListElement": [
            {
              "@type": "Offer",
              "name": "Starter Intelligence Audit",
              "price": "750000",
              "priceCurrency": "IDR"
            },
            {
              "@type": "Offer",
              "name": "Operational Business Sentinel",
              "price": "2500000",
              "priceCurrency": "IDR"
            },
            {
              "@type": "Offer",
              "name": "Enterprise DaaS & Data Stream",
              "price": "7500000",
              "priceCurrency": "IDR"
            }
          ]
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#0b0d11] text-[#f3f4f6] selection:bg-[#10b981] selection:text-[#0b0d11]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TelemetryRadarHero />
      <ScrollytellingContainer />
      <VerticalHubsMatrix />
      <InteractiveAuditTerminal />
      <TwoStageDeliveryGuarantee />
      <InvestmentPricingTable />
      <EnterpriseFounderFooter />
      <FloatingTelemetryDock />
    </main>
  );
}
