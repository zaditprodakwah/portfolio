import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DigitalServicesHub from "@/components/digital-services/DigitalServicesHub";
import servicesData from "@/content/digital-services/services_seed.json";

export const metadata: Metadata = {
  title: "Layanan Rekayasa Web & Pertumbuhan Digital UMKM | Zadit Growth",
  description: "Platform rekayasa web berkecepatan tinggi (LCP < 1,0s), arsitektur edge tanpa biaya sewa server bulanan (Rp 0/bulan), katalog B2B, dan intake WhatsApp langsung.",
  alternates: {
    canonical: "https://muhzadit.pages.dev/layanan/digital-services/"
  },
  openGraph: {
    title: "Layanan Rekayasa Web & Pertumbuhan Digital UMKM | Zadit Growth",
    description: "Website performa tinggi, bebas biaya server bulanan, katalog B2B, dan penyelamatan situs rusak dengan arsitektur edge modern.",
    url: "https://muhzadit.pages.dev/layanan/digital-services/",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Layanan Rekayasa Web & Pertumbuhan Digital UMKM | Zadit Growth",
    description: "Website performa tinggi, bebas biaya server bulanan, katalog B2B, dan penyelamatan situs rusak dengan arsitektur edge modern."
  }
};

export default function DigitalServicesPage() {
  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "SysBlueprint Digital Services & Edge Engineering",
    "image": "https://muhzadit.pages.dev/og-web-performa.jpg",
    "url": "https://muhzadit.pages.dev/layanan/digital-services/",
    "telephone": "+6282316363177",
    "priceRange": "IDR 2.500.000 - 20.000.000",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ID"
    },
    "provider": {
      "@type": "Person",
      "name": "Muhammad Khoiruzzadittaqwa",
      "jobTitle": "Lead System & Software Architect",
      "url": "https://muhzadit.pages.dev/"
    },
    "description": "Layanan rekayasa website berkecepatan tinggi, modernisasi situs lambat, katalog spesifikasi B2B, dan arsitektur edge serverless Cloudflare tanpa beban biaya server bulanan.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Katalog Layanan Rekayasa Web & Operasional Digital",
      "itemListElement": servicesData.map((s, idx) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s.name,
          "description": s.summary
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": s.priceRange.min,
          "maxPrice": s.priceRange.max,
          "priceCurrency": "IDR"
        },
        "position": idx + 1
      }))
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6">
      {/* Schema.org JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigasi Breadcrumb */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <Link
            href="/layanan/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-teal-800 hover:text-teal-950 uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Direktori Layanan</span>
          </Link>

          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
            Dokumen ID: DS-GROWTH-MASTER-001
          </span>
        </div>

        {/* Master Container Hub */}
        <DigitalServicesHub />
      </div>
    </div>
  );
}
