/**
 * @title Web3 Catalog Data
 * @author PRADIKTIF Engineering Board
 * @notice Central catalog data for the Web3 Engineering & Procurement OS
 * @dev Zero em-dash compliant data structure
 */

export interface SuperVertical {
  id: string;
  name: string;
  badge: string;
  description: string;
  target_scenarios: string[];
}

export interface ScenarioItem {
  id: string;
  vertical_id: string;
  title: string;
  owner_job: string;
  trust_boundary: {
    on_chain: string[];
    off_chain: string[];
    forbidden: string[];
  };
  custody_model: {
    type: string;
    prohibited: string[];
    recommended: string[];
  };
  kill_risks: string[];
  acceptance_criteria: string[];
  must_hire: string[];
  do_not_hire_yet: string[];
}

export interface FounderPerk {
  id: string;
  vendor: string;
  category: string;
  offer: string;
  value_usd: number;
  promo_code: string;
  claim_url: string;
  criteria: string;
}

export interface SecurityRule {
  id: string;
  name: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  description: string;
  remediation: string;
}

export const VERTICALS: SuperVertical[] = [
  {
    id: 'payfi_stablecoins',
    name: 'PayFi & Stablecoin Rails',
    badge: 'PAYFI',
    description: 'High-velocity merchant settlements, cross-border payroll, and non-custodial milestone escrow with Aave V3 float yield.',
    target_scenarios: ['S1', 'S2', 'S3', 'S8'],
  },
  {
    id: 'ai_agents',
    name: 'AI Agents & Autonomous Execution',
    badge: 'AI-M2M',
    description: 'Machine-to-machine x402 HTTP micro-payments, ERC-4337 policy wallets, and multi-agent swarm budget vaults.',
    target_scenarios: ['S4', 'S5'],
  },
  {
    id: 'rwa_tokenization',
    name: 'Real-World Assets (RWA) & Tokenization',
    badge: 'INSTITUTIONAL',
    description: 'Compliant trade receivables factoring, tokenized US Treasuries, and ERC-3643 accredited investor permissioning.',
    target_scenarios: ['S6'],
  },
  {
    id: 'consumer_micro',
    name: 'Consumer Micro-Transactions & Telegram Apps',
    badge: 'MASS-CONSUMER',
    description: 'Telegram Mini-App gasless onboarding, session keys, and sponsored paymaster architecture for 900M+ users.',
    target_scenarios: ['S7'],
  },
];

export const SCENARIOS: ScenarioItem[] = [
  {
    id: 'S1',
    vertical_id: 'payfi_stablecoins',
    title: 'Merchant Stablecoin Checkout & Instant Settlement',
    owner_job: 'Accept non-custodial USDC payments with sub-cent transaction fees and instant fulfillment webhooks.',
    trust_boundary: {
      on_chain: ['Token transfer validation', 'Deduction of protocol take-rate', 'Order hash emission'],
      off_chain: ['Shopping cart inventory', 'EIP-681 QR generation', 'Order database'],
      forbidden: ['Storing merchant private keys in server database', 'Blind transaction signing'],
    },
    custody_model: {
      type: 'Non-Custodial Direct Settlement',
      prohibited: ['Centralized database balance ledgers', 'Hot wallet key custody'],
      recommended: ['Direct Safe multisig vault forwarding', 'SPL Token-2022 PDA accounts'],
    },
    kill_risks: [
      'Permit2 signature hijacking with unconstrained spender',
      'Counterfeit USDC token deposit attack',
      'Webhook replay attacks without deterministic hash validation',
    ],
    acceptance_criteria: [
      'Settlement gas cost strictly under 45,000 gas units on Base',
      'Merchant webhook dispatched within 1.5 seconds of block confirmation',
      'Zero unhandled exceptions on RPC failover switch',
    ],
    must_hire: ['Foundry testing experience', 'Viem/Wagmi client integration', 'Webhook idempotency architecture'],
    do_not_hire_yet: ['Generic NFT minting tutorial developers', 'Developers who test contracts only on Remix'],
  },
  {
    id: 'S2',
    vertical_id: 'payfi_stablecoins',
    title: 'Global Payroll & Real-Time Salary Streaming',
    owner_job: 'Stream salaries to global contributors per second with autonomous cancellation and clawback logic.',
    trust_boundary: {
      on_chain: ['Per-second streaming math', 'Deposit and withdrawal balances', 'Cancellation vesting checkpoints'],
      off_chain: ['Employee timesheet portal', 'Tax form generation', 'Email notification alerts'],
      forbidden: ['Manual monthly manual transaction signing for hundreds of workers'],
    },
    custody_model: {
      type: 'Smart Contract Stream Escrow',
      prohibited: ['Employer single EOA holding aggregate payroll'],
      recommended: ['Gnosis Safe 3-of-5 multisig owner', 'Sablier/Superfluid streaming primitives'],
    },
    kill_risks: [
      'Integer rounding loss over long streaming durations',
      'Unauthorized stream pause by single key compromise',
      'Front-running cancellation notice to withdraw unvested funds',
    ],
    acceptance_criteria: [
      'Token math verified accurate to 1 wei over 365-day stream simulation',
      'Foundry invariant test proves contract solvency under all exit conditions',
      'Employee receives unvested funds refund instantly upon employer cancellation',
    ],
    must_hire: ['Solidity 0.8+ fixed-point math specialists', 'Anchor stream PDA engineers'],
    do_not_hire_yet: ['Frontend developers without on-chain time evaluation knowledge'],
  },
  {
    id: 'S3',
    vertical_id: 'payfi_stablecoins',
    title: 'Yield-Bearing Milestone Escrow for Service Contracts',
    owner_job: 'Lock B2B milestone funds, generate 5% APY Aave float yield, and split yield 50/50 between client and platform.',
    trust_boundary: {
      on_chain: ['Principal locking in Aave V3', 'Milestone release authorization', '50/50 float yield calculation'],
      off_chain: ['Deliverable file storage (IPFS)', 'Signed BAST delivery certificates', 'Dispute mediation chat'],
      forbidden: ['Unrestricted single-party fund withdrawal', 'Reentrant transfer calls'],
    },
    custody_model: {
      type: 'Yield-Bearing Non-Custodial Escrow',
      prohibited: ['Custodial escrow platform holding client USDC in omnibus account'],
      recommended: ['Aave V3 supply vault', 'Dispute arbiter 2-of-3 quorum Safe'],
    },
    kill_risks: [
      'Aave pool liquidity de-peg freezing client funds',
      'Deadlock dispute without timeout resolution window',
      'Reentrancy exploit during milestone payout execution',
    ],
    acceptance_criteria: [
      '100% of principal protected under all market conditions',
      'Floating yield mathematically split 50% cashback to client, 50% to treasury',
      'Foundry test suite passes reentrancy assertions without warnings',
    ],
    must_hire: ['OpenZeppelin ReentrancyGuard engineers', 'Aave V3 integration specialists'],
    do_not_hire_yet: ['Developers who propose centralized custodial escrow bots'],
  },
  {
    id: 'S4',
    vertical_id: 'ai_agents',
    title: 'Autonomous AI Agent Microservice & API Toll Gate (x402)',
    owner_job: 'Enable autonomous AI agents to pay per HTTP API inference using EIP-712 micro-vouchers without credit cards.',
    trust_boundary: {
      on_chain: ['AgentPolicyWallet spend caps', 'Batch voucher settlement on Base L2', 'Authorized provider registry'],
      off_chain: ['EIP-712 signature verification', 'AI inference streaming', 'Redis voucher nonce tracking'],
      forbidden: ['Giving agents unbounded private key access with master treasury funds'],
    },
    custody_model: {
      type: 'Guarded Agent Policy Smart Account',
      prohibited: ['Raw private keys stored in agent prompt memory or environment files'],
      recommended: ['ERC-4337 Session Keys with daily spending cap ($10 max/day)'],
    },
    kill_risks: [
      'Infinite query loop draining founder treasury in seconds',
      'Signature replay across different chains or providers',
      'Agent prompt injection exposing private key',
    ],
    acceptance_criteria: [
      'Off-chain signature verification executes in under 5ms on edge worker',
      'AgentPolicyWallet strictly reverts transactions exceeding $10/day',
      'Batch settlement cost per query is less than $0.0001 on Base',
    ],
    must_hire: ['EIP-712 typed data signing specialists', 'FastAPI / Cloudflare Worker edge architects'],
    do_not_hire_yet: ['Engineers who have only used standard API keys and Stripe webhooks'],
  },
  {
    id: 'S5',
    vertical_id: 'ai_agents',
    title: 'Multi-Agent Swarm Coordinator & Shared Budget Vault',
    owner_job: 'Orchestrate collaborative AI agent swarms with compartmentalized sub-wallets and target contract whitelists.',
    trust_boundary: {
      on_chain: ['Role-based daily budget limits', 'Contract target whitelist', 'Rolling 24-hour spend reset'],
      off_chain: ['Agent inter-process communication', 'Consensus voting algorithms', 'Task queue management'],
      forbidden: ['Allowing one compromised agent sub-wallet to siphon peer budgets'],
    },
    custody_model: {
      type: 'Multi-Agent Compartmentalized Vault',
      prohibited: ['Single shared private key across multiple agent nodes'],
      recommended: ['Gnosis Safe Zodiac Module with sub-account permission seeds'],
    },
    kill_risks: [
      'Compromised agent prompt executing arbitrary token transfer to attacker',
      'Deadlock where two agents await each other on-chain state indefinitely',
      'Exceeding gas budgets during concurrent swarm transaction bursts',
    ],
    acceptance_criteria: [
      'Any transaction to a non-whitelisted contract reverts with TargetNotAuthorized',
      'Budget resets automatically after 86,400 seconds without admin transaction',
      'Swarm telemetry emits structured events for all agent spend actions',
    ],
    must_hire: ['Gnosis Safe Zodiac module developers', 'Autonomous agent systems engineers'],
    do_not_hire_yet: ['Developers who propose simple Telegram bot wallets without spend caps'],
  },
  {
    id: 'S6',
    vertical_id: 'rwa_tokenization',
    title: 'Decentralized Invoice Factoring & Trade Receivables',
    owner_job: 'Tokenize verified B2B commercial invoices for instant 85% advance financing with ERC-3643 KYC compliance.',
    trust_boundary: {
      on_chain: ['ERC-1155 / ERC-3643 debt tokenization', 'Liquidity pool disbursal', 'IdentityRegistry KYC checks'],
      off_chain: ['Legal invoice underwriting', 'Physical goods delivery tracking', 'Corporate debtor credit appraisal'],
      forbidden: ['Allowing unverified or non-KYC wallets to trade tokenized commercial debt'],
    },
    custody_model: {
      type: 'Institutional Escrow & Debt Registry',
      prohibited: ['Anonymous, permissionless secondary liquidity pools for debt notes'],
      recommended: ['Identity-bound ERC-3643 contract with legal underwriting attestation'],
    },
    kill_risks: [
      'Double invoicing fraud across multiple blockchain networks',
      'Regulatory compliance breach by serving non-accredited participants',
      'Corporate debtor default impacting senior liquidity pool capital',
    ],
    acceptance_criteria: [
      'Debt token transfer strictly reverts if sender or recipient lacks verified KYC bit',
      'Double invoice registry hashes invoice tax ID + invoice number deterministically',
      'Junior tranche absorbs first 10% loss before senior investor pool is touched',
    ],
    must_hire: ['ERC-3643 / Centrifuge protocol architects', 'RWA legal-engineering bridge consultants'],
    do_not_hire_yet: ['Standard degen DeFi yield-farming fork developers'],
  },
  {
    id: 'S7',
    vertical_id: 'consumer_micro',
    title: 'Telegram Mini-App Consumer Micropayments & Gasless Onboarding',
    owner_job: 'Enable 900M+ Telegram users to make $0.10-$5.00 micro-purchases gaslessly using embedded smart accounts.',
    trust_boundary: {
      on_chain: ['ERC-4337 UserOperation execution', 'ERC-20 Paymaster fee settlement', 'Session key permissions'],
      off_chain: ['Telegram initData HMAC validation', 'Bundler relayer submission', 'Mini-app webview UX'],
      forbidden: ['Requiring users to export seed phrases or hold native ETH/SOL for gas'],
    },
    custody_model: {
      type: 'Embedded Non-Custodial Smart Account',
      prohibited: ['Custodial central database wallets managed by server admin keys'],
      recommended: ['Turnkey / Privy MPC or Biconomy ERC-4337 Smart Account'],
    },
    kill_risks: [
      'Malicious actors draining paymaster gas sponsorship reserves',
      'Telegram auth spoofing resulting in account hijacking',
      'User drop-off exceeding 90% due to signature pop-up fatigue',
    ],
    acceptance_criteria: [
      'First-time user onboarding to transaction completed within 3 taps',
      'User balance requires zero native ETH/SOL to complete micro-payments',
      'Paymaster whitelist strictly rejects unauthorized target contract calls',
    ],
    must_hire: ['ERC-4337 Account Abstraction specialists', 'Telegram Mini-App webview engineers'],
    do_not_hire_yet: ['Engineers who only build traditional browser extension dApps'],
  },
  {
    id: 'S8',
    vertical_id: 'payfi_stablecoins',
    title: 'Corporate & DAO Treasury Yield Sweeper',
    owner_job: 'Sweep idle operational stablecoins above a liquid reserve into Aave/Ondo, earning 5% APY passively.',
    trust_boundary: {
      on_chain: ['Buffer preservation logic', 'Aave/Ondo yield allocation', '5% performance fee deduction'],
      off_chain: ['Keeper execution bots (Gelato)', 'Chainlink USDC price feed oracle', 'Treasury dashboard'],
      forbidden: ['Depositing treasury assets into volatile, non-pegged, or algorithmic pools'],
    },
    custody_model: {
      type: 'Safe Zodiac Yield Sweeper Module',
      prohibited: ['Single founder hot wallet managing company treasury funds'],
      recommended: ['3-of-5 Gnosis Safe with Zodiac Keeper authorization'],
    },
    kill_risks: [
      'Underlying DeFi lending protocol bad debt or exploit',
      'Keeper bot private key compromise redirecting swept capital',
      'Secondary stablecoin peg loss during automated rebalancing',
    ],
    acceptance_criteria: [
      'Liquid reserve buffer never drops below target without alerting multisig signers',
      'Keeper bot restricted strictly to verified protocol gateways',
      'Monotonically increasing treasury value verified by invariant test',
    ],
    must_hire: ['Zodiac module developers', 'Institutional DeFi treasury risk analysts'],
    do_not_hire_yet: ['DEX trading bot developers with high-risk degen track records'],
  },
];

export const FOUNDER_PERKS: FounderPerk[] = [
  {
    id: 'quicknode_growth',
    vendor: 'QuickNode',
    category: 'RPC & Infrastructure',
    offer: 'Enterprise Web3 RPC Credits ($300 value for 3 months) on Base, Solana & Arbitrum',
    value_usd: 300,
    promo_code: 'PRADIKTIF300',
    claim_url: 'https://quicknode.com/?tap_a=pradiktif',
    criteria: 'Active Web3 project with verified deployment brief.',
  },
  {
    id: 'trezor_safe',
    vendor: 'Trezor',
    category: 'Hardware Security',
    offer: '15% Off Trezor Safe 3 / Safe 5 Multi-Sig Signer Bundles',
    value_usd: 50,
    promo_code: 'PRADIKTIFSAFE',
    claim_url: 'https://trezor.io',
    criteria: 'Hardware signer verification for project deployers.',
  },
  {
    id: 'moonpay_fiat',
    vendor: 'MoonPay',
    category: 'On/Off-Ramp',
    offer: 'Zero Gateway Integration Fee + 30 Days Free Fiat Settlement',
    value_usd: 500,
    promo_code: 'MOONPAY-PRADIKTIF',
    claim_url: 'https://moonpay.com/partners',
    criteria: 'B2B or Consumer app accepting fiat-to-crypto payments.',
  },
  {
    id: 'coinzilla_ads',
    vendor: 'Coinzilla',
    category: 'Web3 Native Advertising',
    offer: '$250 Matching Ad Credit on First Campaign Launch',
    value_usd: 250,
    promo_code: 'CZ-PRADIKTIF250',
    claim_url: 'https://coinzilla.com',
    criteria: 'First-time advertiser promoting verified Web3 application.',
  },
];

export const SECURITY_RULES: SecurityRule[] = [
  {
    id: 'SEC-001',
    name: 'Permit2 Signature Trap Defense',
    severity: 'CRITICAL',
    description: 'Attackers craft malicious EIP-712 Permit2 payloads with unconstrained spenders and max uint48 expiry.',
    remediation: 'Validate domain separator, non-replayable monotonic nonce, and limit allowance duration to 1 hour max.',
  },
  {
    id: 'SEC-002',
    name: 'Hostage Funds & Insolvency Guard',
    severity: 'CRITICAL',
    description: 'Smart contracts locking funds without fallback bypass or dispute arbiter mechanisms.',
    remediation: 'Implement 14-day inactivity timeout with 2-of-3 multisig arbiter dispute resolution.',
  },
  {
    id: 'SEC-003',
    name: 'Autonomous Agent Runaway Loop Barrier',
    severity: 'HIGH',
    description: 'AI agents entering infinite inference or execution loops, draining treasury gas reserves.',
    remediation: 'Enforce AgentPolicyWallet rolling 24-hour spend limits with hard ceiling resets.',
  },
  {
    id: 'SEC-004',
    name: 'Supply Chain & Fake Token Filter',
    severity: 'HIGH',
    description: 'Counterfeit ERC-20/SPL tokens simulating Circle USDC or Tether USDT.',
    remediation: 'Hardcode official Circle USDC mint address; reject unverified mint addresses at contract level.',
  },
  {
    id: 'SEC-005',
    name: 'Private Mempool MEV Sandwich Shield',
    severity: 'MEDIUM',
    description: 'Public mempool transactions front-run and sandwiched by automated searcher bots.',
    remediation: 'Route all write transactions through Flashbots Protect RPC or Jito bundle relays.',
  },
];

export const ECONOMIC_TIERS = {
  protocol_take_rates: [
    { volume_bracket: '$0 - $10,000', take_rate_bps: 100, percentage: '1.00%' },
    { volume_bracket: '$10,001 - $50,000', take_rate_bps: 50, percentage: '0.50%' },
    { volume_bracket: '$50,001+', take_rate_bps: 25, percentage: '0.25%' },
  ],
  yield_float_split: {
    client_cashback_pct: 50,
    platform_treasury_pct: 50,
    benchmark_apy_pct: 5.0,
  },
  gateway_saas: {
    starter_usd_per_mo: 49,
    enterprise_usd_per_mo: 199,
  },
  treasury_sweep: {
    performance_fee_bps: 500, // 5%
    benchmark_apy_pct: 5.0,
  },
};
