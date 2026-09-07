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
  title: "Muhammad Khoiruzzadittaqwa | Konsultan Pertumbuhan, Dokumen Bisnis & Riset",
  description: "Portofolio eksekutif & solusi strategis Muhammad Khoiruzzadittaqwa (Zadit). Membantu bisnis, lembaga, dan akademisi lewat proposal bisnis, SEO konversi, riset data statistik SINTA, dan solusi web modern.",
  metadataBase: new URL("https://zadit.pages.dev/"),
  alternates: {
    canonical: "https://zadit.pages.dev/",
    languages: {
      "id-ID": "https://zadit.pages.dev/",
      "en-US": "https://zadit.pages.dev/"
    },
    types: {
      "application/rss+xml": "https://zadit.pages.dev/feed.xml"
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
    title: "Muhammad Khoiruzzadittaqwa | Strategic Growth, Business & Research Consultant",
    description: "10+ tahun pengalaman memadukan dokumen bisnis eksekutif, SEO & konten konversi, riset data kuantitatif, dan performa web cepat.",
    url: "https://zadit.pages.dev/",
    siteName: "Zadit Solutions Hub",
    images: [
      {
        url: "https://zadit.pages.dev/og-image.jpg",
        secureUrl: "https://zadit.pages.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Khoiruzzadittaqwa - Executive Advisory & Digital Practice",
        type: "image/jpeg",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Khoiruzzadittaqwa | Konsultan Pertumbuhan",
    description: "10+ tahun pengalaman memadukan dokumen bisnis eksekutif, SEO & konten konversi, riset data kuantitatif, dan performa web cepat.",
    images: ["https://zadit.pages.dev/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://zadit.pages.dev/#person",
      name: "Muhammad Khoiruzzadittaqwa",
      alternateName: ["Zadit", "Muhzadit", "muhzadit"],
      jobTitle: "Strategic Growth, Business Proposal & Research Consultant",
      description: "Konsultan profesional dengan 10+ tahun pengalaman memadukan dokumen bisnis eksekutif, SEO konversi, analisis data statistik kuantitatif, dan optimasi web modern.",
      image: "https://zadit.pages.dev/foto-zadit.jpg",
      url: "https://zadit.pages.dev/",
      sameAs: [
        "https://www.sribu.com/id/users/muhzadit",
        "https://linkedin.com/in/muhzadit",
        "https://github.com/muhzadit",
        "https://kontak.link/muhzadit"
      ],
      knowsAbout: Object.values(ENTITY_NODES).map((node) => ({
        "@type": "Thing",
        name: node.name,
        sameAs: node.wikidataUri
      }))
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://zadit.pages.dev/#service",
      name: "Zadit Strategic Advisory & Growth OS",
      url: "https://zadit.pages.dev/",
      founder: { "@id": "https://zadit.pages.dev/#person" },
      areaServed: ["ID", "Global"],
      description: "Layanan konsultasi proposal bisnis, pitch deck kemitraan, SEO & konten konversi, riset data statistik SPSS/Python, dan optimasi performa web."
    },
    {
      "@type": "WebSite",
      "@id": "https://zadit.pages.dev/#website",
      url: "https://zadit.pages.dev/",
      name: "Zadit Growth OS & Executive Portfolio",
      description: "Portfolio eksekutif, dokumen bisnis, pengolahan data statistik SINTA, dan solusi performa web berorientasi konversi nyata.",
      publisher: {
        "@id": "https://zadit.pages.dev/#person"
      }
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
      lang="id-ID"
      className={`scroll-smooth w-full max-w-full overflow-x-hidden ${inter.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="google-site-verification" content="I9y6U1bm8P_UhKve6EYvFENOlia-tQ0ZIvwnul81sxY" />
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
