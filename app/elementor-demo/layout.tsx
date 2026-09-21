import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Demo: Landing Elementor dari File JSON | Muhammad Khoiruzzadittaqwa (Zadit) - PRADIKTIF',
  description:
    'Demo WordPress Playground: menginstall Elementor dan tema Hello Elementor, lalu memuat tiga halaman PRADIKTIF berbahasa Indonesia (home, layanan, kontak) dengan 30 widget gratis. Setiap halaman 100% bisa disunting lewat Editor Elementor.',
  keywords: [
    'Elementor JSON',
    'WordPress Playground',
    'Impor Template Elementor',
    'Design System Elementor',
    'PRADIKTIF',
    'Zadit',
  ],
  alternates: {
    canonical: 'https://muhzadit.pages.dev/elementor-demo/',
  },
  openGraph: {
    title: 'Demo: Landing Elementor dari File JSON | PRADIKTIF',
    description:
      'WordPress asli berjalan di dalam browser, memuat landing Elementor dari file JSON siap impor.',
    url: 'https://muhzadit.pages.dev/elementor-demo/',
    siteName: 'Muhammad Khoiruzzadittaqwa (Zadit) - PRADIKTIF',
    type: 'website',
  },
};

export default function ElementorDemoLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Demo Impor Halaman Elementor dari File JSON',
    operatingSystem: 'Cross-platform, Browser-based (WordPress Playground)',
    applicationCategory: 'WebApplication, WebDesignApplication',
    description:
      'WordPress dijalankan di dalam browser dengan Elementor terinstall, memuat halaman dari file JSON format version 0.4, dan tetap dapat disunting melalui Editor Elementor.',
    author: {
      '@type': 'Person',
      name: 'Muhammad Khoiruzzadittaqwa',
      jobTitle: 'Web & Design Systems Consultant',
      url: 'https://muhzadit.pages.dev',
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 selection:bg-teal-500/30 selection:text-teal-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}