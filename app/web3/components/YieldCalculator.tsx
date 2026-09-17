'use client';

import React, { useState } from 'react';

export default function YieldCalculator() {
  const [principal, setPrincipal] = useState<number>(25000);
  const [durationDays, setDurationDays] = useState<number>(30);
  const [apy, setApy] = useState<number>(5.0);

  // Take-rate calculation
  const getFeeBps = (amount: number) => {
    if (amount < 10000) return 100; // 1.00%
    if (amount <= 50000) return 50;  // 0.50%
    return 25; // 0.25%
  };

  const feeBps = getFeeBps(principal);
  const platformFee = (principal * feeBps) / 10000;
  const providerPayout = principal - platformFee;

  // Floating yield accrued during milestone
  const accruedYield = principal * (apy / 100) * (durationDays / 365);
  const clientCashback = accruedYield * 0.5;
  const platformYieldShare = accruedYield * 0.5;
  const totalPlatformRevenue = platformFee + platformYieldShare;
  const effectiveClientCost = principal - clientCashback;

  return (
    <div className="rounded-2xl border border-teal-500/30 bg-slate-900/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-teal-950/20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/40 bg-teal-950/40 px-3 py-1 text-xs font-mono font-medium text-teal-300">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            ECONOMIC ENGINE 1: YIELD-BEARING ESCROW
          </div>
          <h3 className="mt-2 text-2xl font-bold font-heading text-white">
            PayFi Milestone Float & Cash-Back Simulator
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Simulate Aave V3 50/50 interest split during milestone execution (14 to 90 days).
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 uppercase tracking-wider block">Protocol Take-Rate</span>
          <span className="text-xl font-mono font-bold text-teal-400">
            {(feeBps / 100).toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        {/* Principal Slider */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Milestone Principal</span>
            <span className="font-mono font-semibold text-white">${principal.toLocaleString()} USDC</span>
          </div>
          <input
            type="range"
            min="5000"
            max="250000"
            step="5000"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full accent-teal-500 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
            <span>$5k</span>
            <span>$50k</span>
            <span>$250k</span>
          </div>
        </div>

        {/* Duration Slider */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Milestone Duration</span>
            <span className="font-mono font-semibold text-white">{durationDays} Days</span>
          </div>
          <input
            type="range"
            min="14"
            max="90"
            step="1"
            value={durationDays}
            onChange={(e) => setDurationDays(Number(e.target.value))}
            className="w-full accent-teal-500 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
            <span>14d (Sprint)</span>
            <span>30d (Standard)</span>
            <span>90d (Quarter)</span>
          </div>
        </div>

        {/* Aave APY Slider */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Aave V3 Benchmark APY</span>
            <span className="font-mono font-semibold text-teal-400">{apy.toFixed(1)}% APY</span>
          </div>
          <input
            type="range"
            min="3.0"
            max="8.0"
            step="0.1"
            value={apy}
            onChange={(e) => setApy(Number(e.target.value))}
            className="w-full accent-teal-500 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
            <span>3.0% (Conservative)</span>
            <span>5.0% (Historic)</span>
            <span>8.0% (High Demand)</span>
          </div>
        </div>
      </div>

      {/* Outcome Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
          <span className="text-xs text-slate-400 block">Total Accrued Interest</span>
          <span className="text-2xl font-mono font-bold text-teal-300 mt-1 block">
            +${accruedYield.toFixed(2)}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Accrues autonomously on Aave V3
          </span>
        </div>

        <div className="rounded-xl border border-teal-500/40 bg-teal-950/20 p-4">
          <span className="text-xs text-teal-300 block">Client Cash-Back (50%)</span>
          <span className="text-2xl font-mono font-bold text-teal-400 mt-1 block">
            +${clientCashback.toFixed(2)}
          </span>
          <span className="text-[11px] text-teal-200/70 mt-1 block">
            Effective cost: ${(principal - clientCashback).toFixed(2)}
          </span>
        </div>

        <div className="rounded-xl border border-amber-500/40 bg-amber-950/20 p-4">
          <span className="text-xs text-amber-300 block">Provider Milestone Payout</span>
          <span className="text-2xl font-mono font-bold text-amber-400 mt-1 block">
            ${providerPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-amber-200/70 mt-1 block">
            Guaranteed 100% principal protection
          </span>
        </div>

        <div className="rounded-xl border border-indigo-500/40 bg-indigo-950/20 p-4">
          <span className="text-xs text-indigo-300 block">Platform Total Revenue</span>
          <span className="text-2xl font-mono font-bold text-indigo-400 mt-1 block">
            ${totalPlatformRevenue.toFixed(2)}
          </span>
          <span className="text-[11px] text-indigo-200/70 mt-1 block">
            Fee (${platformFee.toFixed(2)}) + Yield (${platformYieldShare.toFixed(2)})
          </span>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-slate-950/50 p-4 border border-slate-800/80 text-xs text-slate-400 leading-relaxed">
        <strong className="text-slate-200">The Mathematical Invariant:</strong> Unlike traditional web2 escrow platforms that pocket 100% of floating interest, the PayFiEscrow smart contract splits interest 50/50. The client pays less than face value through cashback, the developer is 100% guaranteed their payout upon BAST delivery, and the protocol accumulates pure-margin passive cash flow.
      </div>
    </div>
  );
}
