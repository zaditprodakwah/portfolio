'use client';

import React, { useState } from 'react';
import { ScenarioItem } from '../data/web3-catalog';

interface LivePreviewProps {
  data: {
    scenario: ScenarioItem;
    projectName: string;
    clientEntity: string;
    budgetUsdc: number;
    timelineWeeks: number;
    targetChain: string;
  };
}

export default function LivePreview({ data }: LivePreviewProps) {
  const [activeTab, setActiveTab] = useState<'brief' | 'scorecard'>('brief');
  const [copied, setCopied] = useState<boolean>(false);

  const { scenario, projectName, clientEntity, budgetUsdc, timelineWeeks, targetChain } = data;

  // Generate Tender Brief Text
  const tenderBriefMarkdown = `# Tender-Ready Web3 Project Brief: ${projectName}
**Client Entity / Sponsor**: ${clientEntity}  
**Architecture Standard**: PRADIKTIF Web3 Engineering OS  
**Target Blockchain**: ${targetChain}  
**Allocated Milestone Budget**: $${budgetUsdc.toLocaleString()} USDC  
**Execution Window**: ${timelineWeeks} Weeks  

---

## 1. Project Objective & Scope
The objective is to architect, verify, and deploy a production-ready Web3 infrastructure component implementing the **${scenario.id}: ${scenario.title}** specification.

### Core Deliverables
1. **Production Smart Contracts**: Written in Solidity (EVM) or Rust (Anchor), compliant with OpenZeppelin / Anchor standards.
2. **Quality Assurance Suite**: 100% test coverage on critical state transitions with property-based invariant fuzzing.
3. **Static Security Analysis**: Slither / Mythril verification report with zero unmitigated High or Medium findings.
4. **Client Failover SDK**: Viem/Wagmi integration library with dual-RPC automated fallback and Flashbots MEV protection.
5. **Mainnet Handover Runbook**: Scripted deployment pipeline and BAST certificate ownership transfer to Client Safe multisig.

---

## 2. Trust Boundary Specification
- **On-Chain Execution**: ${scenario.trust_boundary.on_chain.join(', ')}.
- **Off-Chain Components**: ${scenario.trust_boundary.off_chain.join(', ')}.
- **Strictly Forbidden Patterns**: ${scenario.trust_boundary.forbidden.join(', ')}.

---

## 3. Custody & Escrow Architecture
- **Custody Type**: ${scenario.custody_model.type}.
- **Prohibited**: ${scenario.custody_model.prohibited.join(', ')}.
- **Recommended**: ${scenario.custody_model.recommended.join(', ')}.
- **Settlement Rule**: 100% milestone principal deposited in escrow prior to sprint commencement. Floating interest generated during escrow is split 50% cashback to client, 50% to protocol treasury.

---

## 4. Milestone Schedule & Escrow Releases
- **Milestone 1 (25% - $${(budgetUsdc * 0.25).toLocaleString()} USDC)**: Interface ABIs, data schemas, and architecture specification sign-off.
- **Milestone 2 (35% - $${(budgetUsdc * 0.35).toLocaleString()} USDC)**: Core smart contracts, 100% invariant tests, and Slither static analysis report.
- **Milestone 3 (25% - $${(budgetUsdc * 0.25).toLocaleString()} USDC)**: Testnet deployment, block explorer verification, and Viem dual-RPC client hook.
- **Milestone 4 (15% - $${(budgetUsdc * 0.15).toLocaleString()} USDC)**: Mainnet deployment, Safe multisig ownership handover, and signed BAST delivery certificate.
`;

  // Generate Scorecard Text
  const scorecardMarkdown = `# Candidate Interview Scorecard & Rejection Tests
**Target Role**: Lead Web3 & Smart Contract Engineer (${scenario.id})  
**Project Context**: ${projectName}  

---

## 1. Mandatory Competencies (Must Hire)
${scenario.must_hire.map((m) => `- [ ] **${m}**`).join('\n')}

---

## 2. Immediate Disqualification Criteria (Do Not Hire)
${scenario.do_not_hire_yet.map((d) => `- [!] **${d}**`).join('\n')}

---

## 3. Critical Kill-Risk Probe Questions
${scenario.kill_risks
  .map(
    (k, i) =>
      `### Question ${i + 1}: Mitigating ${k}
*Target Answer*: Candidate must articulate how they prevent ${k} using automated invariant tests, EIP-712 non-replayable nonces, or multi-sig timelocks rather than relying on manual code reviews.`
  )
  .join('\n\n')}
`;

  const activeContent = activeTab === 'brief' ? tenderBriefMarkdown : scorecardMarkdown;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = activeTab === 'brief' ? `brief-${scenario.id}.md` : `scorecard-${scenario.id}.md`;
    const blob = new Blob([activeContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 md:p-8 shadow-2xl">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('brief')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'brief'
                ? 'bg-teal-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            Tender-Ready Brief (2-Page)
          </button>
          <button
            onClick={() => setActiveTab('scorecard')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'scorecard'
                ? 'bg-teal-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            Hiring & Rejection Scorecard
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-xs font-mono text-slate-200 hover:border-teal-500 hover:text-teal-300 transition-all cursor-pointer"
          >
            <span>{copied ? '✔ Copied' : 'Copy Markdown'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-teal-500/40 bg-teal-950/30 text-xs font-mono text-teal-300 hover:bg-teal-950/50 transition-all cursor-pointer"
          >
            <span>Download .md</span>
          </button>
        </div>
      </div>

      {/* Code / Markdown Display Container */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-6 overflow-x-auto max-h-[500px]">
        <pre className="text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-wrap">
          {activeContent}
        </pre>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-mono">
        <span>PRADIKTIF Spec Generator</span>
        <span>Zero Em-Dash Compliant</span>
      </div>
    </div>
  );
}
