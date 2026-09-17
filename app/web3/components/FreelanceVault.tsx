'use client';

import React, { useState } from 'react';

const DOCUMENTS = [
  {
    id: 'proposal',
    name: '5-Move Winning Proposal Blueprint',
    badge: 'WINNING BIDS',
    summary: 'Consultative proposal structure proven across global Web3 RFPs and enterprise clients.',
    snippet: `### The 5-Move Proposal Architecture
1. Move 1: Context Anchor & Risk Recognition (Target unspoken bottlenecks).
2. Move 2: Architecture Blueprint & PoW Teaser (Foundry fuzzing, dual-rail Viem failover).
3. Move 3: Phased Milestone Roadmaps with Concrete Deliverables.
4. Move 4: Lazarus Defense & Operational Assurance (Air-gapped compilation).
5. Move 5: Low-Friction Asynchronous Call-to-Action (No pushy live calls).`,
  },
  {
    id: 'sow',
    name: 'Web3 Statement of Work (SOW)',
    badge: 'LEGAL BOUNDARY',
    summary: 'Defines in-scope deliverables, explicit out-of-scope boundaries, and escrow release gates.',
    snippet: `### In-Scope Deliverables
- Production smart contracts (Solidity 0.8.24+ / Anchor 0.30+).
- 100% test coverage with Foundry invariant property tests.
- Static analysis audit pass with Slither (0 High/Medium findings).
- Type-safe Viem/Wagmi SDK with dual-RPC failover.
- Scripted deployment & Gnosis Safe / Squads multisig ownership handover.

### Out-of-Scope Protection
Third-party audit badges, deployer gas fees, tokenomics market-making, and native mobile apps are explicitly excluded.`,
  },
  {
    id: 'bast',
    name: 'BAST Delivery Acceptance Certificate',
    badge: 'ESCROW RELEASE',
    summary: 'Bilingual legal document triggering the final 15-20% milestone escrow release and IP transfer.',
    snippet: `### Berita Acara Serah Terima (BAST) / Acceptance Certificate
- Nomor: BAST/PRADIKTIF/WEB3/2026/001
- Pemicu Pelunasan: Penandatanganan BAST ini menjadi instruksi mutlak dan pemicu pelepasan dana milestone akhir dari rekening escrow kepada Service Provider.
- Pengalihan Hak Cipta: Dengan selesainya pelunasan 100%, hak cipta dan hak komersial kode beralih secara sah dan mengikat kepada Klien.`,
  },
  {
    id: 'rate_card',
    name: 'Web3 Rate Card & Milestone Benchmarks',
    badge: 'PRICING MATRIX',
    summary: 'Value-based pricing standards for 2025-2026 smart contract and protocol engineering.',
    snippet: `### Professional Rate Matrix (Denominated in USDC)
- Tier 1 (Tokens & Vesting): $2,500 - $4,500 (5-7 Days)
- Tier 2 (PayFi & Yield Escrow): $5,000 - $9,500 (10-14 Days)
- Tier 3 (AI Agent Policy Wallets): $8,500 - $15,000 (14-21 Days)
- Tier 4 (Enterprise RWA & Factoring): $16,000 - $35,000 (21-35 Days)
- Effective Hourly Rate (TEHR): $125 - $200 / hour.`,
  },
  {
    id: 'lazarus',
    name: 'Lazarus Sandbox & Infostealer SOP',
    badge: 'AIR-GAPPED DEFENSE',
    summary: 'Zero-trust defense against BeaverTail, InvisibleFerret, and malicious take-home coding challenges.',
    snippet: `### The 5 Golden Rules of Defense
1. Never run 'npm install' or 'cargo build' on your host machine for untrusted code.
2. Never clone client repos to your primary development workstation.
3. Keep private keys strictly inside physical hardware wallets (Ledger, Trezor Safe).
4. Run untrusted code exclusively in disposable Docker containers:
   docker run --rm -it --network bridge --security-opt=no-new-privileges node:20-bookworm-slim
5. Inspect package.json for suspicious preinstall and postinstall scripts.`,
  },
];

export default function FreelanceVault() {
  const [selectedDoc, setSelectedDoc] = useState(DOCUMENTS[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedDoc.snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/40 bg-teal-950/40 px-3 py-1 text-xs font-mono font-medium text-teal-300">
            <span className="h-2 w-2 rounded-full bg-teal-400" />
            PRADIKTIF FREELANCER OS
          </div>
          <h3 className="mt-2 text-2xl font-bold font-heading text-white">
            High-Value Engineering & Delivery Vault
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Contract templates, pricing matrices, and security protocols designed for six-figure Web3 developers.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-xl border border-teal-500/40 bg-teal-950/30 px-4 py-2 text-xs font-mono text-teal-300 hover:bg-teal-950/50 transition-all cursor-pointer w-fit"
        >
          <span>{copied ? '✔ Copied to Clipboard' : 'Copy Document Snippet'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Document Navigation Buttons */}
        <div className="lg:col-span-4 space-y-2">
          {DOCUMENTS.map((doc) => {
            const isSelected = selectedDoc.id === doc.id;
            return (
              <button
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-teal-500 bg-teal-950/30 text-white shadow'
                    : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-teal-400 font-bold">
                    {doc.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{doc.name}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {doc.summary}
                </p>
              </button>
            );
          })}
        </div>

        {/* Document Content View */}
        <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <span className="text-xs font-mono text-teal-400">{selectedDoc.name}</span>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
                PRADIKTIF Standard
              </span>
            </div>
            <pre className="text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-wrap bg-slate-900/40 p-4 rounded-lg border border-slate-800/60 overflow-x-auto">
              {selectedDoc.snippet}
            </pre>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Location: packs/freelancer/</span>
            <span className="text-teal-400">Anti-AI Slop Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
