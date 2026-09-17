'use client';

import React, { useState } from 'react';
import Wizard from './components/Wizard';
import LivePreview from './components/LivePreview';
import Scenarios from './components/Scenarios';
import YieldCalculator from './components/YieldCalculator';
import SecurityScanner from './components/SecurityScanner';
import FreelanceVault from './components/FreelanceVault';
import FounderPerks from './components/FounderPerks';
import ContractPlayground from './components/ContractPlayground';
import PrimitivesDocs from './components/PrimitivesDocs';
import { SCENARIOS } from './data/web3-catalog';

export default function Web3Page() {
  const [wizardOutput, setWizardOutput] = useState({
    scenario: SCENARIOS[2], // S3: Yield-bearing milestone escrow
    projectName: 'Aave Yield-Bearing Escrow Vault',
    clientEntity: 'PRADIKTIF Venture Partner',
    budgetUsdc: 25000,
    timelineWeeks: 4,
    targetChain: 'Base L2',
  });

  return (
    <div className="relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-teal-500/10 via-teal-900/5 to-transparent blur-3xl rounded-full" />
      <div className="pointer-events-none absolute top-[1200px] -left-40 w-[600px] h-[600px] bg-indigo-500/5 blur-3xl rounded-full" />

      {/* Hero Section */}
      <section className="relative pt-16 md:pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-950/40 px-3.5 py-1.5 text-xs font-mono font-medium text-teal-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-ping" />
            TRI-SIDED WEB3 PROCUREMENT & REVENUE OS (2025-2026)
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight">
            The Non-Custodial <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-teal-400 via-teal-200 to-amber-300 bg-clip-text text-transparent">
              Web3 Engineering OS
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Translating complex Web3 visions into tender-ready 2-page briefs, candidate interview scorecards, and yield-bearing milestone escrows with automated Aave V3 float monetization.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <a
              href="#wizard"
              className="rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-3 text-sm transition-all shadow-lg shadow-teal-500/20 cursor-pointer"
            >
              Generate Tender Brief &rarr;
            </a>
            <a
              href="#yield-calculator"
              className="rounded-xl border border-slate-700 bg-slate-900/80 hover:border-teal-500 text-slate-200 font-medium px-6 py-3 text-sm transition-all cursor-pointer"
            >
              Simulate Escrow Float
            </a>
            <a
              href="#security-radar"
              className="rounded-xl border border-rose-500/40 bg-rose-950/20 hover:border-rose-400 text-rose-300 font-medium px-6 py-3 text-sm transition-all cursor-pointer"
            >
              Anti-Drainer Radar
            </a>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-slate-800/80 text-left">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
              <span className="text-[11px] font-mono text-slate-400 block uppercase">Super-Verticals</span>
              <span className="text-lg font-bold font-mono text-teal-400">4 Categories</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
              <span className="text-[11px] font-mono text-slate-400 block uppercase">Production Recipes</span>
              <span className="text-lg font-bold font-mono text-teal-400">8 Blueprints</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
              <span className="text-[11px] font-mono text-slate-400 block uppercase">Float APY Split</span>
              <span className="text-lg font-bold font-mono text-teal-400">50/50 Aave V3</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
              <span className="text-[11px] font-mono text-slate-400 block uppercase">Security Standards</span>
              <span className="text-lg font-bold font-mono text-teal-400">SEC-001 to SEC-005</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-24">
        {/* Section 1: Interactive Brief Generator & Live Preview */}
        <section id="wizard" className="space-y-6">
          <Wizard onGenerate={(data) => setWizardOutput(data)} />
          <LivePreview data={wizardOutput} />
        </section>

        {/* Section 2: Economic Engine 1: Yield-Bearing Escrow Simulator */}
        <section id="yield-calculator">
          <YieldCalculator />
        </section>

        {/* Section 3: The 8 Production Recipes Matrix */}
        <section id="scenarios">
          <Scenarios />
        </section>

        {/* Section 4: Underground Security & Anti-Drainer Scanner */}
        <section id="security-radar">
          <SecurityScanner />
        </section>

        {/* Section 5: PRADIKTIF Freelancer Vault */}
        <section id="freelance-vault">
          <FreelanceVault />
        </section>

        {/* Section 6: Dual-Stack Smart Contract Playground */}
        <section id="contract-playground">
          <ContractPlayground />
        </section>

        {/* Section 7: Founder Perks & Advertising Directory */}
        <section id="founder-perks">
          <FounderPerks />
        </section>

        {/* Section 8: Architectural Guidelines & CLI Quickstart */}
        <section id="guidelines">
          <PrimitivesDocs />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-sm font-bold font-heading text-white">
              Muhammad Khoiruzzadittaqwa (Zadit)
            </span>
            <p className="text-xs text-slate-400 mt-0.5">
              PRADIKTIF Engineering Board: High-Performance Systems, Web3 Architecture & Machine Learning.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <a href="https://github.com/muhzadit" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
              GitHub
            </a>
            <span>&bull;</span>
            <a href="https://zadit.pages.dev" className="hover:text-teal-400">
              Personal Portal
            </a>
            <span>&bull;</span>
            <span className="text-slate-500">Zero Em-Dash Certified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
