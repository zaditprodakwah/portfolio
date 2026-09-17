'use client';

import React, { useState } from 'react';
import { FOUNDER_PERKS } from '../data/web3-catalog';

export default function FounderPerks() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-950/40 px-3 py-1 text-xs font-mono font-medium text-amber-300">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            ECONOMIC ENGINE 5: FOUNDER PERKS & PARTNERS
          </div>
          <h3 className="mt-2 text-2xl font-bold font-heading text-white">
            Curated Infrastructure Perks & Subsidies
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Over $1,100 in direct partner credits and hardware discounts negotiated for PRADIKTIF builders.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 uppercase tracking-wider block">Aggregate Value</span>
          <span className="text-xl font-mono font-bold text-amber-400">$1,100+ USD</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FOUNDER_PERKS.map((perk) => (
          <div
            key={perk.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between hover:border-teal-500/50 transition-all shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold text-teal-400 uppercase">
                  {perk.category}
                </span>
                <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-xs font-mono font-bold text-amber-300">
                  ${perk.value_usd} Value
                </span>
              </div>

              <h4 className="text-lg font-bold text-white mb-2">{perk.vendor}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{perk.offer}</p>

              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 mb-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  Promo / Referral Code:
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-teal-300">
                    {perk.promo_code}
                  </span>
                  <button
                    onClick={() => handleCopyCode(perk.promo_code)}
                    className="text-[11px] font-mono text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    {copiedCode === perk.promo_code ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[11px] text-slate-500 mb-4 italic">Criteria: {perk.criteria}</p>
              <a
                href={perk.claim_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold py-2.5 transition-all cursor-pointer"
              >
                Claim Perk &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Web3 Native Ad Banner */}
      <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/60 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 border border-slate-800 px-2 py-0.5 rounded">
            AD NETWORK
          </span>
          <p className="text-xs text-slate-300">
            Reach 10,000+ monthly smart contract engineers and Web3 founders through native Coinzilla & Slise inventory.
          </p>
        </div>
        <a
          href="https://coinzilla.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-teal-400 hover:text-teal-300 whitespace-nowrap cursor-pointer"
        >
          Advertise with PRADIKTIF &rarr;
        </a>
      </div>
    </div>
  );
}
