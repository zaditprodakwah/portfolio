'use client';

import React, { useState } from 'react';
import { SCENARIOS, VERTICALS, ScenarioItem } from '../data/web3-catalog';

interface WizardProps {
  onGenerate: (data: {
    scenario: ScenarioItem;
    projectName: string;
    clientEntity: string;
    budgetUsdc: number;
    timelineWeeks: number;
    targetChain: string;
  }) => void;
}

export default function Wizard({ onGenerate }: WizardProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedVertical, setSelectedVertical] = useState<string>('payfi_stablecoins');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('S3');
  const [projectName, setProjectName] = useState<string>('Aave Yield-Bearing Escrow Vault');
  const [clientEntity, setClientEntity] = useState<string>('PRADIKTIF Venture Partner');
  const [budgetUsdc, setBudgetUsdc] = useState<number>(15000);
  const [timelineWeeks, setTimelineWeeks] = useState<number>(3);
  const [targetChain, setTargetChain] = useState<string>('Base L2');

  const availableScenarios = SCENARIOS.filter(
    (s) => s.vertical_id === selectedVertical
  );

  const activeScenario =
    SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  const handleFinish = () => {
    onGenerate({
      scenario: activeScenario,
      projectName,
      clientEntity,
      budgetUsdc,
      timelineWeeks,
      targetChain,
    });
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
      {/* Step Indicators */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-teal-400">
            Interactive Brief Generator
          </span>
          <h3 className="text-xl md:text-2xl font-bold font-heading text-white mt-1">
            Build Tender-Ready Web3 Specification
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-8 w-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                currentStep === step
                  ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20'
                  : currentStep > step
                  ? 'bg-teal-950 text-teal-400 border border-teal-500/40'
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Select Vertical & Scenario */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              1. Select Industry Super-Vertical
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {VERTICALS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setSelectedVertical(v.id);
                    const firstInVertical = SCENARIOS.find((s) => s.vertical_id === v.id);
                    if (firstInVertical) setSelectedScenarioId(firstInVertical.id);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedVertical === v.id
                      ? 'border-teal-500 bg-teal-950/30 text-white'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-teal-400 font-bold block w-fit mb-2">
                    {v.badge}
                  </span>
                  <h4 className="text-sm font-bold text-white mb-1">{v.name}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {v.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              2. Select Production Recipe
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableScenarios.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedScenarioId === sc.id
                      ? 'border-teal-500 bg-slate-950 text-white shadow'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-xs font-bold text-teal-400">{sc.id}</span>
                    <span className="text-[10px] font-mono text-slate-500">{sc.custody_model.type}</span>
                  </div>
                  <h5 className="text-sm font-bold text-white mb-1">{sc.title}</h5>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{sc.owner_job}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold px-6 py-2.5 text-sm transition-all cursor-pointer shadow-lg shadow-teal-500/20"
            >
              Next: Parameters & Budget
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Configure Parameters */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Project / Protocol Title
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Client Entity / DAO Sponsor
              </label>
              <input
                type="text"
                value={clientEntity}
                onChange={(e) => setClientEntity(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Total Budget (USDC / USDT)
              </label>
              <input
                type="number"
                step="1000"
                value={budgetUsdc}
                onChange={(e) => setBudgetUsdc(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-mono text-white focus:border-teal-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Typical range: $5,000 to $50,000 for audited milestone delivery.
              </span>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Delivery Timeline
              </label>
              <select
                value={timelineWeeks}
                onChange={(e) => setTimelineWeeks(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-teal-500 focus:outline-none cursor-pointer"
              >
                <option value={2}>2 Weeks (Fast-Track Prototype)</option>
                <option value={3}>3 Weeks (Standard Production Sprint)</option>
                <option value={4}>4 Weeks (Multi-Contract System)</option>
                <option value={6}>6 Weeks (Enterprise Dual-Rail Protocol)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Primary Deployment Blockchain
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Base L2', 'Solana Mainnet', 'Arbitrum One', 'Ethereum Mainnet'].map((chain) => (
                <button
                  key={chain}
                  onClick={() => setTargetChain(chain)}
                  className={`p-3 rounded-xl border text-center text-xs font-mono font-medium transition-all cursor-pointer ${
                    targetChain === chain
                      ? 'border-teal-500 bg-teal-950/40 text-teal-300 font-bold'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {chain}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(1)}
              className="rounded-xl border border-slate-700 text-slate-300 font-medium px-5 py-2.5 text-sm hover:border-slate-600 cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => {
                setCurrentStep(3);
                handleFinish();
              }}
              className="rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold px-6 py-2.5 text-sm transition-all cursor-pointer shadow-lg shadow-teal-500/20"
            >
              Generate Live Tender Brief
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Generated Confirmation */}
      {currentStep === 3 && (
        <div className="text-center py-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/40 mb-3">
            <span className="text-xl">✔</span>
          </div>
          <h4 className="text-xl font-bold text-white mb-1">
            Tender Specification Generated
          </h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
            Your 2-page brief and interview scorecard are ready for review, clipboard copy, and Markdown export below.
          </p>
          <button
            onClick={() => setCurrentStep(2)}
            className="rounded-xl border border-slate-700 text-xs font-mono text-slate-300 px-4 py-2 hover:border-slate-600 cursor-pointer"
          >
            Edit Parameters
          </button>
        </div>
      )}
    </div>
  );
}
