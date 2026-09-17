'use client';

import React, { useState } from 'react';
import { SCENARIOS, VERTICALS, ScenarioItem } from '../data/web3-catalog';

export default function Scenarios() {
  const [activeVertical, setActiveVertical] = useState<string>('all');
  const [selectedScenario, setSelectedScenario] = useState<ScenarioItem>(SCENARIOS[0]);

  const filteredScenarios =
    activeVertical === 'all'
      ? SCENARIOS
      : SCENARIOS.filter((s) => s.vertical_id === activeVertical);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/40 bg-teal-950/40 px-3 py-1 text-xs font-mono font-medium text-teal-300">
            <span className="h-2 w-2 rounded-full bg-teal-400" />
            THE 8 PRODUCTION RECIPES
          </div>
          <h3 className="mt-2 text-2xl md:text-3xl font-bold font-heading text-white">
            Architecture Matrix & Trust Boundaries
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Proven execution recipes with explicit on-chain vs off-chain trust boundaries and disqualification tests.
          </p>
        </div>

        {/* Vertical Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveVertical('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeVertical === 'all'
                ? 'bg-teal-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All (8)
          </button>
          {VERTICALS.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveVertical(v.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeVertical === v.id
                  ? 'bg-teal-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {v.badge}
            </button>
          ))}
        </div>
      </div>

      {/* Scenarios Grid & Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scenario Selectors */}
        <div className="lg:col-span-5 space-y-3">
          {filteredScenarios.map((scenario) => {
            const isSelected = selectedScenario.id === scenario.id;
            return (
              <div
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-teal-500 bg-slate-900 shadow-lg shadow-teal-950/30'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-teal-400 border border-slate-700">
                    {scenario.id}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    {scenario.custody_model.type}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">{scenario.title}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {scenario.owner_job}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Scenario Deep Dive */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold px-2.5 py-1 rounded bg-teal-500/20 text-teal-400 border border-teal-500/40">
                  {selectedScenario.id}
                </span>
                <span className="text-xs font-mono text-slate-400 uppercase">
                  Recipe Blueprint
                </span>
              </div>
              <span className="text-xs font-mono font-medium text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-full">
                {selectedScenario.custody_model.type}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold font-heading text-white mb-2">
              {selectedScenario.title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {selectedScenario.owner_job}
            </p>

            {/* Trust Boundary Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-4">
                <span className="text-xs font-mono font-semibold text-teal-300 block mb-2">
                  ON-CHAIN TRUST BOUNDARY
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedScenario.trust_boundary.on_chain.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-teal-400 mt-0.5">✔</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4">
                <span className="text-xs font-mono font-semibold text-rose-300 block mb-2">
                  FORBIDDEN ANTI-PATTERNS
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedScenario.trust_boundary.forbidden.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400 mt-0.5">✖</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Kill Risks & Rejection Tests */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 mb-4">
              <span className="text-xs font-mono font-semibold text-amber-400 block mb-2">
                CRITICAL KILL RISKS (PROBE IN INTERVIEWS)
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedScenario.kill_risks.map((risk, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">!</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Must Hire vs Do Not Hire */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <span className="font-mono font-bold text-teal-400 block mb-1">Must Hire:</span>
                <span className="text-slate-300">{selectedScenario.must_hire.join(', ')}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <span className="font-mono font-bold text-rose-400 block mb-1">Do Not Hire Yet:</span>
                <span className="text-slate-400">{selectedScenario.do_not_hire_yet.join(', ')}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <span>CLI Command:</span>
            <code className="rounded bg-slate-950 px-2 py-1 text-teal-300 border border-slate-800">
              npx web3-brief brief {selectedScenario.id}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
