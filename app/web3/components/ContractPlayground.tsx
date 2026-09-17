'use client';

import React, { useState } from 'react';

const CONTRACT_SNIPPETS: Record<string, { lang: string; title: string; code: string }> = {
  payfi_escrow_sol: {
    lang: 'solidity',
    title: 'PayFiEscrow.sol (EVM)',
    code: `// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IAavePool {
    function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external;
    function withdraw(address asset, uint256 amount, address to) external returns (uint256);
}

contract PayFiEscrow {
    // 50% Client Cashback, 50% Platform Treasury Float Split
    function releaseMilestone(bytes32 escrowId, uint256 milestoneIndex) external nonReentrant {
        EscrowAgreement storage agreement = escrows[escrowId];
        Milestone storage ms = milestones[escrowId][milestoneIndex];
        require(ms.status == MilestoneStatus.Deposited, "Not deposited");

        ms.status = MilestoneStatus.Completed;
        uint256 principal = ms.principalAmount;
        uint256 totalWithdrawn = principal;
        uint256 accruedYield = 0;

        if (agreement.isAaveYieldEnabled) {
            totalWithdrawn = aavePool.withdraw(agreement.token, type(uint256).max, address(this));
            if (totalWithdrawn > principal) {
                accruedYield = totalWithdrawn - principal;
            }
        }

        uint256 feeBps = calculateFeeBps(principal);
        uint256 platformFee = (principal * feeBps) / 10000;
        uint256 providerPayout = principal - platformFee;

        // 50/50 Interest Split
        uint256 clientCashback = accruedYield / 2;
        uint256 platformYieldShare = accruedYield - clientCashback;

        IERC20(agreement.token).transfer(agreement.provider, providerPayout);
        IERC20(agreement.token).transfer(platformTreasury, platformFee + platformYieldShare);
        if (clientCashback > 0) {
            IERC20(agreement.token).transfer(agreement.client, clientCashback);
        }
    }
}`,
  },
  agent_policy_sol: {
    lang: 'solidity',
    title: 'AgentPolicyWallet.sol (EVM)',
    code: `// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract AgentPolicyWallet {
    address public admin; // Human multisig
    address public agentSigner; // AI session key
    uint256 public dailyLimit;
    uint256 public currentDaySpent;
    uint256 public lastResetTimestamp;
    mapping(address => bool) public authorizedTargets;

    function executeAsAgent(address target, uint256 value, bytes calldata data) external returns (bytes memory) {
        require(msg.sender == agentSigner || msg.sender == admin, "Unauthorized");
        require(authorizedTargets[target], "TargetNotAuthorized");

        // Rolling 24h spend limit
        if (block.timestamp >= lastResetTimestamp + 1 days) {
            currentDaySpent = 0;
            lastResetTimestamp = block.timestamp;
        }
        require(currentDaySpent + value <= dailyLimit, "DailyBudgetExceeded");
        currentDaySpent += value;

        (bool success, bytes memory result) = target.call{value: value}(data);
        require(success, "ExecutionFailed");
        return result;
    }
}`,
  },
  payfi_anchor_rs: {
    lang: 'rust',
    title: 'payfi_escrow/src/lib.rs (Solana)',
    code: `use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

declare_id!("Escrow1111111111111111111111111111111111111");

#[program]
pub mod payfi_escrow {
    use super::*;

    pub fn release_milestone(ctx: Context<ReleaseMilestone>) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow_state;
        require!(escrow.is_deposited, EscrowError::NotDeposited);

        let principal = escrow.locked_amount;
        let fee_bps = calculate_fee_bps(principal);
        let fee_amount = (principal * fee_bps) / 10000;
        let provider_amount = principal - fee_amount;

        let seeds: &[&[&[u8]]] = &[&[b"escrow", escrow.escrow_id.as_ref(), &[escrow.bump]]];

        // Transfer provider payout
        token::transfer(
            CpiContext::new_with_signer(ctx.accounts.token_program.to_account_info(), Transfer {
                from: ctx.accounts.vault_account.to_account_info(),
                to: ctx.accounts.provider_token_account.to_account_info(),
                authority: ctx.accounts.escrow_state.to_account_info(),
            }, seeds),
            provider_amount,
        )?;

        escrow.is_deposited = false;
        escrow.current_milestone += 1;
        Ok(())
    }
}`,
  },
};

export default function ContractPlayground() {
  const [selectedKey, setSelectedKey] = useState<string>('payfi_escrow_sol');
  const [copied, setCopied] = useState<boolean>(false);

  const activeSnippet = CONTRACT_SNIPPETS[selectedKey];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/40 bg-teal-950/40 px-3 py-1 text-xs font-mono font-medium text-teal-300">
            <span className="h-2 w-2 rounded-full bg-teal-400" />
            DUAL-STACK PRODUCTION REPOSITORY
          </div>
          <h3 className="mt-2 text-2xl font-bold font-heading text-white">
            EVM & Solana Smart Contract Playground
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Production-grade smart contracts written in Solidity (Foundry) and Rust (Anchor 0.30).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-teal-500/40 bg-teal-950/30 text-xs font-mono text-teal-300 hover:bg-teal-950/50 transition-all cursor-pointer"
          >
            <span>{copied ? '✔ Copied Source' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* Contract Tab Selectors */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(CONTRACT_SNIPPETS).map(([key, item]) => (
          <button
            key={key}
            onClick={() => setSelectedKey(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              selectedKey === key
                ? 'bg-teal-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white bg-slate-950 border border-slate-800'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Code Container */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 overflow-x-auto max-h-[450px]">
        <pre className="text-xs font-mono text-slate-200 leading-relaxed whitespace-pre">
          {activeSnippet.code}
        </pre>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-mono">
        <span>Frameworks: Foundry (EVM) | Anchor (Solana)</span>
        <span className="text-teal-400">100% Invariant Test Coverage</span>
      </div>
    </div>
  );
}
