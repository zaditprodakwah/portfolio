import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Muhammad Khoiruzzadittaqwa | Konsultan Pertumbuhan, Dokumen Bisnis & Riset',
  description: 'Portofolio eksekutif & solusi strategis Muhammad Khoiruzzadittaqwa (Zadit). Membantu bisnis, lembaga, dan akademisi lewat proposal bisnis, SEO konversi, riset data statistik SINTA, dan solusi web modern.',
  metadataBase: new URL('https://zadit.pages.dev'),
  alternates: {
    canonical: 'https://zadit.pages.dev',
  },
  openGraph: {
    title: 'Muhammad Khoiruzzadittaqwa | Strategic Growth, Business & Research Consultant',
    description: '10+ tahun pengalaman memadukan dokumen bisnis eksekutif, SEO & konten konversi, riset data kuantitatif, dan performa web cepat.',
    url: 'https://zadit.pages.dev',
    siteName: 'Zadit Solutions Hub',
    images: [
      {
        url: '/api/og?title=Muhammad+Khoiruzzadittaqwa&description=Strategic+Growth,+Business+%26+Research+Consultant',
        width: 1200,
        height: 630,
        alt: 'Muhammad Khoiruzzadittaqwa - Executive Portfolio',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Khoiruzzadittaqwa | Konsultan Pertumbuhan',
    description: '10+ tahun pengalaman memadukan dokumen bisnis eksekutif, SEO & konten konversi, riset data kuantitatif, dan performa web cepat.',
    images: ['/api/og?title=Muhammad+Khoiruzzadittaqwa&description=Strategic+Growth,+Business+%26+Research+Consultant'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://zadit.pages.dev/#person',
      name: 'Muhammad Khoiruzzadittaqwa',
      alternateName: ['Zadit', 'Muhzadit'],
      jobTitle: 'Strategic Growth, Business & Research Consultant',
      description: 'Konsultan profesional dengan 10+ tahun pengalaman memadukan dokumen bisnis eksekutif, SEO konversi, analisis data statistik kuantitatif, dan optimasi web modern.',
      url: 'https://zadit.pages.dev',
      sameAs: [
        'https://www.sribu.com/id/users/muhzadit',
        'https://linkedin.com/in/muhzadit',
        'https://github.com/muhzadit',
        'https://kontak.link/muhzadit'
      ]
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://zadit.pages.dev/#service',
      name: 'Zadit Strategic Advisory & Growth OS',
      url: 'https://zadit.pages.dev',
      founder: { '@id': 'https://zadit.pages.dev/#person' },
      areaServed: ['ID', 'Global'],
      description: 'Layanan konsultasi proposal bisnis, pitch deck kemitraan, SEO & konten konversi, riset data statistik SPSS/Python, dan optimasi performa web.'
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
      className={`scroll-smooth ${inter.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-alabaster text-slate-900 font-sans antialiased selection:bg-teal-700 selection:text-white">
        {children}
      </body>
    </html>
  );
}
