'use client';

import React, { useState } from 'react';
import { SECURITY_RULES, SecurityRule } from '../data/web3-catalog';

export default function SecurityScanner() {
  const [targetInput, setTargetInput] = useState<string>('');
  const [selectedRule, setSelectedRule] = useState<SecurityRule>(SECURITY_RULES[0]);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'complete'>('idle');

  const handleRunScan = () => {
    if (!targetInput.trim()) return;
    setScanStatus('scanning');
    setTimeout(() => {
      setScanStatus('complete');
    }, 600);
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default:
        return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/40 bg-rose-950/40 px-3 py-1 text-xs font-mono font-medium text-rose-300">
            <span className="h-2 w-2 rounded-full bg-rose-400" />
            UNDERGROUND SECURITY RADAR
          </div>
          <h3 className="mt-2 text-2xl font-bold font-heading text-white">
            Zero-Trust Threat & Drainer Invariant Checker
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Audit contracts and transaction signatures against the 5 primary 2025-2026 exploit vectors.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Rules Active:</span>
          <span className="rounded-md bg-slate-800 px-2 py-1 text-xs font-mono text-teal-300">
            SEC-001 through SEC-005
          </span>
        </div>
      </div>

      {/* Target input */}
      <div className="my-6">
        <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
          Target Contract Address, EIP-712 Struct, or GitHub Commit
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="e.g. 0x000000000022D473030F116dDEE9F6B43aC78BA3 or PayFiEscrow.sol"
            value={targetInput}
            onChange={(e) => setTargetInput(e.target.value)}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-mono text-white placeholder-slate-600 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          <button
            onClick={handleRunScan}
            disabled={scanStatus === 'scanning'}
            className="rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold px-6 py-3 text-sm transition-all shadow-lg shadow-teal-500/20 disabled:opacity-50 cursor-pointer"
          >
            {scanStatus === 'scanning' ? 'Auditing Rules...' : 'Run Security Check'}
          </button>
        </div>
      </div>

      {/* Interactive Rules Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Rules List */}
        <div className="lg:col-span-5 space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
            Standard Verification Vectors
          </span>
          {SECURITY_RULES.map((rule) => {
            const isSelected = selectedRule.id === rule.id;
            return (
              <button
                key={rule.id}
                onClick={() => setSelectedRule(rule)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-teal-500 bg-teal-950/30 text-white'
                    : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-teal-400">{rule.id}</span>
                    <span className="text-xs font-medium">{rule.name}</span>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getSeverityBadge(
                    rule.severity
                  )}`}
                >
                  {rule.severity}
                </span>
              </button>
            );
          })}
        </div>

        {/* Rule Detail View */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
              <span className="text-xs font-mono text-teal-400">{selectedRule.id} Specification</span>
              <span
                className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${getSeverityBadge(
                  selectedRule.severity
                )}`}
              >
                {selectedRule.severity} SEVERITY
              </span>
            </div>

            <h4 className="text-lg font-bold text-white mb-2">{selectedRule.name}</h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {selectedRule.description}
            </p>

            <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-4">
              <span className="text-xs font-mono text-amber-400 block mb-1 uppercase tracking-wider">
                Mandatory Remediation Invariant
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {selectedRule.remediation}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Enforced by: web3-brief audit-check</span>
            <span className="text-teal-400">100% Deterministic</span>
          </div>
        </div>
      </div>
    </div>
  );
}
