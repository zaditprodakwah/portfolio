import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Web3 Engineering & Procurement OS | Muhammad Khoiruzzadittaqwa (Zadit) - PRADIKTIF',
  description:
    'The Tri-Sided Web3 Engineering, Procurement, & Autonomous Revenue OS. Generate tender-ready briefs, hire vetted smart contract engineers, audit security invariants, and deploy yield-bearing milestone escrows.',
  keywords: [
    'Web3 Engineering OS',
    'Smart Contract Brief',
    'Yield-Bearing Escrow',
    'PayFi Rails',
    'AI Agent Wallet',
    'Foundry Solidity',
    'Solana Anchor',
    'Web3 Procurement',
    'PRADIKTIF',
  ],
  alternates: {
    canonical: 'https://muhzadit.pages.dev/web3/',
  },
  openGraph: {
    title: 'Web3 Engineering & Procurement OS | PRADIKTIF',
    description:
      'Turn Web3 visions into tender-ready 2-page briefs, candidate scorecards, and yield-bearing milestone contracts with Aave float monetization.',
    url: 'https://muhzadit.pages.dev/web3/',
    siteName: 'Muhammad Khoiruzzadittaqwa (Zadit) - PRADIKTIF',
    type: 'website',
  },
};

export default function Web3Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Web3 Engineering & Procurement OS',
    operatingSystem: 'Cross-platform, Web-based, Node.js CLI',
    applicationCategory: 'DeveloperApplication, BusinessApplication',
    description:
      'Autonomous Web3 specification generator, candidate hiring audit, and non-custodial yield-bearing milestone escrow platform.',
    author: {
      '@type': 'Person',
      name: 'Muhammad Khoiruzzadittaqwa',
      jobTitle: 'Principal Web3 Architect & Lead Systems Consultant',
      url: 'https://muhzadit.pages.dev',
    },
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
      description: 'Open source catalog with enterprise advisory and escrow rails.',
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
