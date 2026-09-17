'use client';

import React from 'react';

export default function PrimitivesDocs() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/40 bg-teal-950/40 px-3 py-1 text-xs font-mono font-medium text-teal-300">
          <span className="h-2 w-2 rounded-full bg-teal-400" />
          SYSTEM DIRECTIVES & DEVELOPER GUIDELINES
        </div>
        <h3 className="mt-2 text-2xl font-bold font-heading text-white">
          Architectural Invariants & Operational Rules
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          Ground-truth engineering rules governing all smart contract deployments, client interactions, and economic engines.
        </p>
      </div>

      {/* Grid of Directives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
          <h4 className="text-base font-bold text-teal-400 mb-2 font-heading">
            1. The Trust-Boundary First Invariant
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Never accept a brief that puts heavy database queries or off-chain state on-chain. Smart contracts are strictly settlement and invariant execution layers. Storage writes must be minimized using transient events, deterministic bit-maps, and custom Solidity errors.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
          <h4 className="text-base font-bold text-amber-400 mb-2 font-heading">
            2. Air-Gapped Key Custody & Lazarus Defense
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Zero private keys are stored in unencrypted environment variables or CI/CD runners. Untrusted client repositories or coding challenges must be run exclusively inside disposable Docker containers to eliminate BeaverTail and InvisibleFerret infostealer threats.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
          <h4 className="text-base font-bold text-indigo-400 mb-2 font-heading">
            3. Autonomous Economic Flywheel
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            All idle escrow capital generates delta-neutral floating yield on Aave V3 or tokenized US Treasuries during milestone execution (14 to 60 days). Accrued interest is split 50% cashback to client, 50% protocol treasury, creating pure-margin protocol income.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
          <h4 className="text-base font-bold text-rose-400 mb-2 font-heading">
            4. Deterministic Code Quality Gates
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every pull request and contract update must pass 100% invariant property tests in Foundry, achieve a clean Slither static analysis run with zero High or Medium issues, and strictly adhere to the Zero Em-Dash standard across all code comments and documentation.
          </p>
        </div>
      </div>

      {/* CLI Quickstart Box */}
      <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-6">
        <h4 className="text-sm font-mono font-bold text-teal-300 mb-2 uppercase tracking-wider">
          CLI Quickstart Commands
        </h4>
        <div className="space-y-2 text-xs font-mono text-slate-300">
          <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span>Generate 2-Page Tender Brief:</span>
            <code className="text-teal-400">npx web3-brief brief S3 -o brief-s3.md</code>
          </div>
          <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span>Generate Candidate Scorecard:</span>
            <code className="text-teal-400">npx web3-brief hire S3</code>
          </div>
          <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span>Generate Winning Proposal:</span>
            <code className="text-teal-400">npx web3-brief propose S3</code>
          </div>
          <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span>Verify Security Invariants:</span>
            <code className="text-teal-400">npx web3-brief audit-check PayFiEscrow.sol</code>
          </div>
        </div>
      </div>
    </div>
  );
}
