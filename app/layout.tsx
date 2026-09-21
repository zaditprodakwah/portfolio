import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ENTITY_NODES } from "@/lib/entity-graph";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Muhammad Khoiruzzadittaqwa (muhzadit) | Konsultan Pertumbuhan, Bisnis & Riset",
    template: "%s | muhzadit"
  },
  description: "Portofolio resmi Muhammad Khoiruzzadittaqwa (muhzadit / Zadit). Konsultan dokumen bisnis eksekutif, audit SEO & GEO, riset data statistik SINTA, dan rekayasa web modern.",
  keywords: [
    "Muhammad Khoiruzzadittaqwa",
    "muhzadit",
    "Zadit",
    "Muh Zadit",
    "Aditt",
    "PRADIKTIF",
    "PT PRISMA DIGITAL KREATIF",
    "jasa konsultan seo b2b",
    "jasa pembuatan website nextjs",
    "jasa audit technical seo core web vitals",
    "biaya jasa seo terpercaya",
    "konsultan google ads roi terukur",
    "jasa olah data sinta spss smartpls",
    "jasa publikasi jurnal sinta",
    "konsultan bisnis cirebon"
  ],
  metadataBase: new URL("https://muhzadit.pages.dev/"),
  alternates: {
    canonical: "https://muhzadit.pages.dev/",
    languages: {
      "id-ID": "https://muhzadit.pages.dev/",
      "x-default": "https://muhzadit.pages.dev/"
    },
    types: {
      "application/rss+xml": "https://muhzadit.pages.dev/feed.xml"
    }
  },
  verification: {
    google: "I9y6U1bm8P_UhKve6EYvFENOlia-tQ0ZIvwnul81sxY",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Muhammad Khoiruzzadittaqwa (muhzadit) | Strategic Growth, SEO & Web Practice",
    description: "Portofolio resmi Muhammad Khoiruzzadittaqwa (muhzadit / Zadit). Memadukan dokumen bisnis eksekutif, SEO konversi, riset data kuantitatif SINTA, dan solusi web modern ultra-cepat.",
    url: "https://muhzadit.pages.dev/",
    siteName: "muhzadit",
    images: [
      {
        url: "https://muhzadit.pages.dev/og-image.jpg",
        secureUrl: "https://muhzadit.pages.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Khoiruzzadittaqwa (muhzadit) - Executive Advisory & Digital Practice",
        type: "image/jpeg",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Khoiruzzadittaqwa (muhzadit) | Konsultan Pertumbuhan",
    description: "Portofolio resmi Muhammad Khoiruzzadittaqwa (muhzadit / Zadit). Konsultan dokumen bisnis, audit SEO & GEO, riset data kuantitatif SINTA, dan rekayasa web performa tinggi.",
    images: ["https://muhzadit.pages.dev/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://muhzadit.pages.dev/#person",
      name: "Muhammad Khoiruzzadittaqwa",
      alternateName: ["muhzadit", "Zadit", "Muh Zadit", "Aditt", "Zadit Dev"],
      jobTitle: "Strategic Growth Consultant, Technical SEO Specialist & Research Consultant",
      description: "Konsultan profesional dan pengembang web memadukan dokumen bisnis eksekutif, SEO konversi berbasis riset, analisis data statistik kuantitatif, dan optimasi web modern.",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Zadit-foto.png",
      url: "https://muhzadit.pages.dev/",
      email: "muhzadit@gmail.com",
      telephone: "+6282316363177",
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "Certified Branding & Digital Marketing 360",
          credentialCategory: "Professional Certification",
          recognizedBy: {
            "@type": "Organization",
            name: "MySkill Indonesia"
          },
          url: "https://storage.googleapis.com/myskill-v2-certificates/bootcamp-lZg7BkHghqBwpMqQMa42/4XFrHMqKE9fQdZAoYMP8Vgh9niV2-wfmeamWBoi8Kt1zhduPb.pdf"
        }
      ],
      sameAs: [
        "https://www.wikidata.org/wiki/Q141474900",
        "https://orcid.org/0000-0002-1594-9548",
        "https://scholar.google.com/citations?user=CbR250MAAAAJ",
        "https://independent.academia.edu/muhzadit",
        "https://id.wikipedia.org/wiki/Pengguna:Muhammad_Khoiruzzadittaqwa",
        "https://commons.wikimedia.org/wiki/File:Zadit-foto.png",
        "https://www.cake.me/resumes/muh-zadit",
        "https://kontak.link/muhzadit",
        "https://github.com/zaditprodakwah",
        "https://www.sribu.com/id/users/muhzadit",
        "https://projects.co.id/public/browse_users/view/a29c17/muhzadit",
        "https://www.linkedin.com/in/muhzadit",
        "https://x.com/muhzadit",
        "https://www.facebook.com/profilzadit",
        "https://www.instagram.com/muhzadit",
        "https://www.threads.net/@muhzadit"
      ],
      worksFor: {
        "@id": "https://muhzadit.pages.dev/#organization"
      },
      knowsAbout: Object.values(ENTITY_NODES).map((node) => ({
        "@type": "Thing",
        name: node.name,
        sameAs: node.wikidataUri
      }))
    },
    {
      "@type": "Organization",
      "@id": "https://muhzadit.pages.dev/#organization",
      legalName: "PT PRISMA DIGITAL KREATIF",
      name: "PRADIKTIF",
      url: "https://muhzadit.pages.dev/",
      logo: "https://muhzadit.pages.dev/foto-zadit.jpg",
      taxID: "1801250039976",
      sameAs: [
        "https://www.wikidata.org/wiki/Q141474927"
      ],
      identifier: [
        {
          "@type": "PropertyValue",
          name: "NIB",
          value: "1801250039976"
        },
        {
          "@type": "PropertyValue",
          name: "TDPSE Kominfo",
          value: "017014.01/DJAI.PSE/01/2025"
        }
      ],
      founder: {
        "@id": "https://muhzadit.pages.dev/#person"
      },
      areaServed: ["ID", "Global"],
      knowsAbout: Object.values(ENTITY_NODES).map((node) => ({
        "@type": "Thing",
        name: node.name,
        sameAs: node.wikidataUri
      }))
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://muhzadit.pages.dev/#service",
      name: "PRADIKTIF — PT PRISMA DIGITAL KREATIF",
      url: "https://muhzadit.pages.dev/",
      parentOrganization: { "@id": "https://muhzadit.pages.dev/#organization" },
      founder: { "@id": "https://muhzadit.pages.dev/#person" },
      areaServed: ["ID", "Global"],
      description: "Layanan konsultasi proposal bisnis, audit SEO & GEO AI visibility, riset data statistik SINTA, dan optimasi performa web berizin resmi."
    },
    {
      "@type": "WebSite",
      "@id": "https://muhzadit.pages.dev/#website",
      url: "https://muhzadit.pages.dev/",
      name: "muhzadit",
      alternateName: [
        "Muhammad Khoiruzzadittaqwa",
        "Zadit",
        "Muh Zadit",
        "Aditt",
        "PRADIKTIF",
        "Zadit Dev"
      ],
      description: "Portofolio resmi Muhammad Khoiruzzadittaqwa (muhzadit / Zadit). Konsultan dokumen bisnis, pengolahan data statistik SINTA, dan solusi performa web berorientasi konversi nyata.",
      publisher: {
        "@id": "https://muhzadit.pages.dev/#organization"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://muhzadit.pages.dev/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Metode dan software apa saja yang didukung untuk bimbingan olah data statistik & riset SINTA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mendukung analisis regresi dan uji asumsi klasik (SPSS), Structural Equation Modeling (SEM-PLS / AMOS), pemodelan psikometri Rasch Model PCM, skrip komputasi R, serta pengujian validitas instrumen (Aiken's V & CFA) dengan garansi pendampingan metodologi hingga tuntas sidang atau telaah jurnal."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah dokumen proposal bisnis, studi kelayakan BEP, dan SOP dikerjakan berpayung hukum resmi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya, seluruh dokumen bisnis eksekutif dan SOP disusun secara profesional di bawah legalitas resmi PT PRISMA DIGITAL KREATIF (Brand: PRADIKTIF, NIB 1801250039976, TDPSE Kominfo 017014.01/DJAI.PSE/01/2025) dengan kalkulasi finansial presisi dan standar tata kelola organisasi."
          }
        },
        {
          "@type": "Question",
          "name": "Bagaimana jaminan kerahasiaan data riset dan rahasia bisnis klien?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Seluruh data mentah responden, model bisnis, dan dokumen internal klien dijamin kerahasiaannya (NDA). Penyerahan hasil kerja menerapkan protokol peninjauan bertahap untuk memastikan kesesuaian konsep sebelum berkas master final diserahkan."
          }
        },
        {
          "@type": "Question",
          "name": "Berapa lama estimasi pengerjaan dokumen proposal atau olah data statistik?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Estimasi pengerjaan berkisar antara 2 hingga 7 hari kerja tergantung kompleksitas instrumen riset atau kelengkapan data finansial usaha. Konsultasi dan telaah brief awal dapat dilakukan langsung via WhatsApp resmi."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`scroll-smooth w-full max-w-full overflow-x-hidden ${inter.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="google-site-verification" content="I9y6U1bm8P_UhKve6EYvFENOlia-tQ0ZIvwnul81sxY" />
        <meta httpEquiv="content-language" content="id-ID" />
        <meta name="geo.region" content="ID" />
        <meta name="geo.placename" content="Indonesia" />
        <meta name="geo.position" content="-6.2088;106.8456" />
        <meta name="application-name" content="muhzadit" />
        <meta name="apple-mobile-web-app-title" content="muhzadit" />
        <meta name="language" content="Indonesian" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased text-slate-800 bg-alabaster min-h-screen selection:bg-teal-500/20 selection:text-teal-900 w-full max-w-full overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
