# DOF-MESH — Deterministic Governance for Autonomous AI Agents

Mathematically proven, on-chain verified compliance for AI agents — before they act.

[![License](https://img.shields.io/badge/license-BSL--1.1-lightgrey)](LICENSE)
[![Conflux](https://img.shields.io/badge/built%20on-Conflux-blue)](https://confluxnetwork.org)
[![Hackathon](https://img.shields.io/badge/Global%20Hackfest%202026-green)](https://github.com/conflux-fans/global-hackfest-2026)
[![Tests](https://img.shields.io/badge/tests-4%2C308%20passing-brightgreen)](https://github.com/Cyberpaisa/DOF-MESH)
[![Z3](https://img.shields.io/badge/Z3%20proofs-4%2F4%20PROVEN-blue)](https://github.com/Cyberpaisa/DOF-MESH)

**[📺 Demo Video (3 min)](https://youtu.be/XAuTQFNLQQY)** · **[🎬 Participant Intro (44s)](https://youtu.be/d7TxKIzKXds)** · **[🌐 dofmesh.com](https://dofmesh.com)** · **[🐦 Submission Tweet](https://x.com/Cyber_paisa/status/2042478622972277158)** · **[⚡ Electric Capital PR #2815 ✅](https://github.com/electric-capital/open-dev-data/pull/2815)**

## Overview

DOF-MESH is the first framework that **mathematically proves** autonomous AI agents behaved correctly — before they act. It combines Z3 SMT formal verification, deterministic governance (zero LLM in the decision path), and on-chain attestation via Conflux eSpace to produce tamper-proof compliance records.

Conflux's native **Gas Sponsorship** makes this viable at scale: agents pay zero gas to register compliance proofs, removing the operational burden of gas management from autonomous agent fleets.

## 🏆 Hackathon Information

- **Event**: Global Hackfest 2026
- **Focus Area**: Open Innovation — AI × Blockchain infrastructure
- **Team**: Cyber Paisa (solo builder, Medellín, Colombia)
- **Submission Date**: 2026-04-20 @ 11:59:59

## 👥 Team

| Name | Role | GitHub | X/Twitter |
|------|------|--------|-----------|
| Juan Carlos Quiceno | Founder · Full-Stack · Smart Contracts | [@Cyberpaisa](https://github.com/Cyberpaisa) | [@Cyber_paisa](https://x.com/Cyber_paisa) |

## 🚀 Problem Statement

Autonomous AI agents execute transactions, call APIs, and make financial decisions on behalf of users. Today's answer to "did this agent behave correctly?" is: *trust us*.

- Rules encoded as prompts can be overridden at any moment
- LLM-based validators hallucinate — a validator that can lie cannot validate
- Audit logs can be altered after the fact
- There is no cryptographic proof an agent followed its governance contract before it acted

## 💡 Solution

DOF-MESH verifies agent compliance **before execution** using three independent deterministic layers, then publishes a keccak256 proof hash on-chain to Conflux:

1. **Constitution** — deterministic HARD/SOFT rules (regex + AST). Zero LLM.
2. **Z3 SMT Verification** — 4 theorems mathematically PROVEN for all possible inputs
3. **TRACER Score** — 5-dimensional quality scoring

Result: a tamper-proof, on-chain record that an agent passed formal governance verification before acting.

## Go-to-Market Plan

> "Unprovable AI decisions shouldn't control money."

**Category we're creating:** Deterministic Agent Governance — not "security tool," not "monitoring." A new category.

### The Market Window (Why Now)

| Signal | Data |
|---|---|
| OZ Defender closes | July 1, 2026 — $180B+ in DeFi increasingly relies on automated governance |
| AI agent incidents | 88% of orgs had incidents in 2026 (Gravitee State of AI Security) |
| MCP ecosystem growth | Rapidly growing — 10,000+ active servers as of March 2026 |
| Formal verification market | $420M → $2.1B by 2033, CAGR 19.8% (Research Intelo) |

### Beachhead — First Market

**AI agents that move money.** Autonomous trading bots, treasury automation agents, governance execution agents — any agent with financial authority where one wrong decision costs millions.

- Highest pain: one exploit = catastrophic loss
- Fastest decision cycle: developers ship weekly
- Clear ROI: 1 incident avoided = ~$5.3M saved vs $1,188/year (Pro plan)

### Traction — Live Today

| Metric | Value |
|---|---|
| Unit tests passing | 4,308 |
| Autonomous cycles | 238+ (0 governance incidents) |
| On-chain transactions | 146 confirmed (Conflux eSpace) |
| Chains deployed | 9 (4 mainnets: Avalanche, Base, Celo, Tempo) |
| Z3 theorems proven | 4/4 per cycle |
| Latency | 8.2ms average |
| External validation | +26.1% improvement across 10 frontier models (Adaline, 200M+ API calls/day) |

> This is not a prototype. This is running.

### Pricing

| Tier | Price | Verifications | For |
|---|---|---|---|
| Free | $0 | 100/month | Developers evaluating |
| Builder | $29/mo | 5,000/month + dashboard | Indie devs, small protocols |
| Pro | $99/mo | 50,000/month + MCP + SLA | DeFi protocols, AI agent teams |
| Enterprise | Custom | Unlimited + audit reports | Banks, regulated teams |

**ROI:** Average Web3 incident loss 2025: ~$5.3M (CertiK). DOF-MESH Pro annual = $1,188. ROI for one incident avoided: **4,461x**.

### Market Opportunity

| | Value | Source |
|---|---|---|
| AI agent security TAM | $574.9M (2026), CAGR 50.4% | Gravitee 2026 |
| Agentic AI broader TAM | $9.14B (2026) → $139B (2034) | Fortune Business Insights |
| Formal verification TAM | $420M → $2.1B by 2033 | Research Intelo |
| SAM — on-chain governance | ~$270M | DOF-MESH addressable segment |
| SOM — 18 months | $4.7M (Conflux + 5 chains) | Based on current deployments |

### Unfair Advantage

| What | Why it matters |
|---|---|
| Z3 + TRACER combined | Only system with formal verification + behavioral tracing in production |
| +26.1% model improvement | Validated on Adaline (200M+ API calls/day) — not self-reported |
| 4,308 tests before launch | Production-grade from day one, not a prototype |
| Proof-to-Gasless on Conflux | Conflux uniquely enables native gas sponsorship — $0 gas for verified agents |
| First Conflux MCP Server | Distribution moat in fastest-growing developer infrastructure category |

### 90-Day Execution

| Days | Action | Goal |
|---|---|---|
| 1–30 | 10 Conflux protocol pilots via hackathon network | First paying users |
| 1–30 | MCP server listed publicly | Organic developer reach |
| 31–60 | "Defender Migration Guide" published | Capture exiting teams |
| 61–90 | Conflux mainnet deployment + USDT0 integration | Production milestone |
| 61–90 | First enterprise pilot signed | $1K+ MRR anchor |

## ⚡ Conflux Integration

- [x] **DOFProofRegistryV1** — [`0x554cCa8ceBE30dF95CeeFfFBB9ede5bA7C7A9B83`](https://evmtestnet.confluxscan.io/address/0x554cCa8ceBE30dF95CeeFfFBB9ede5bA7C7A9B83) — 146 proofs, production-proven.
- [x] **DOFProofRegistryV2 (Proof-to-Gasless)** — [`0x58F0126B647E87a9a49e79971E168ce139326fd1`](https://evmtestnet.confluxscan.io/address/0x58F0126B647E87a9a49e79971E168ce139326fd1) — LIVE. Agents with TRACER≥0.4 + Constitution≥0.9 auto-whitelisted in `SponsorWhitelistControl`. **Math earns gas-free transactions.**
- [x] **Gas Sponsorship** — `SponsorWhitelistControl` at `0x0888000000000000000000000000000000000001`. Zero-gas compliance for qualifying agents.
- [x] **Conflux MCP Server** — First MCP server for Conflux. Any LLM (Claude, GPT, Cursor) connects to on-chain governance via 6 tools: `verify_agent_compliance`, `register_proof_on_chain`, `check_gasless_status`, `get_proof_history`, `get_network_stats`, `analyze_defi_compliance`.

## 🎬 Demo

- **Demo Video (3 min)**: [https://youtu.be/XAuTQFNLQQY](https://youtu.be/XAuTQFNLQQY)
- **Participant Intro (44s)**: [https://youtu.be/d7TxKIzKXds](https://youtu.be/d7TxKIzKXds)
- **Submission Tweet**: [https://x.com/Cyber_paisa/status/2042478622972277158](https://x.com/Cyber_paisa/status/2042478622972277158)
- **Docs**: [https://dofmesh.com](https://dofmesh.com)
- **GitHub**: [github.com/Cyberpaisa/DOF-MESH](https://github.com/Cyberpaisa/DOF-MESH/tree/conflux-hackathon)
- **Electric Capital PR**: [#2815 MERGED ✅](https://github.com/electric-capital/open-dev-data/pull/2815)

### Verified Transactions on Conflux

| Date | TX Hash | What it proves |
|------|---------|----------------|
| Apr 9, 2026 | [`0xd9cfdc...bfd2d`](https://evmtestnet.confluxscan.io/tx/0xd9cfdca0eb46dd126e6ff5894f55263c42f9ffd23af0719678cac8d2a43bfd2d) | V2 Proof-to-Gasless — Z3 4/4, TRACER 0.47, gaslessGranted=true |
| Apr 9, 2026 | [`0xaa618e...05ed5`](https://evmtestnet.confluxscan.io/tx/0xaa618ed01f1fd80dedf866c3b09d6edf54fbdc60cc7df6dc893dc5d5c4605ed5) | DOFProofRegistryV2 deployment |
| Apr 6, 2026 | [`bf98ea58...bebf740c`](https://evmtestnet.confluxscan.io/tx/bf98ea58265dcd8433f594376d0d679fde65d93ae8cc18d841627308bebf740c) | Full 6-step governance cycle — Agent #1687 (V1) |
| Apr 6, 2026 | [`77d4ddea...b12465e5`](https://evmtestnet.confluxscan.io/tx/77d4ddea0043bf6df5a916cd7040886e0a97480ab12465e5842ce7c2f26b4b10) | Direct attestation test (V1) |

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| Language | Python 3.12 |
| Agent framework | CrewAI |
| Formal verification | Z3 SMT Solver (Microsoft Research) |
| Blockchain | Conflux eSpace (chain 71) + 8 other EVM chains |
| Smart contracts | Solidity (DOFProofRegistryV1 + V2 Proof-to-Gasless) |
| Web3 | web3.py v7.x |
| Gas Sponsorship | Conflux SponsorWhitelistControl |
| Agent identity | ERC-8004 (Autonomous Agent Identity Standard) |
| SDK | dof-sdk v0.6.0 on PyPI |
| Docs | Mintlify (23 pages at dofmesh.com) |

## Quick Start

```bash
pip install dof-sdk

from dof import DOFVerifier
v = DOFVerifier()
result = v.verify_action(
    agent_id="my-agent",
    action="transfer",
    params={"amount": 500, "token": "USDC"}
)
# → z3_proof: "4/4 VERIFIED"
# → attestation: "0x44b45cd..." ← permanent on Conflux
# → latency_ms: 8.2
# → verdict: "APPROVED"
```

```bash
# Or run full demo
git clone https://github.com/Cyberpaisa/DOF-MESH
cd DOF-MESH && pip install -r requirements.txt
python3 scripts/conflux_demo.py --dry-run

# Verify on-chain (no DOF software needed)
cast call 0x554cCa8ceBE30dF95CeeFfFBB9ede5bA7C7A9B83 \
  "getProofCount()(uint256)" \
  --rpc-url https://evmtestnet.confluxrpc.com
```

## Metrics

| Metric | Value |
|--------|-------|
| Tests passing | 4,308 |
| Z3 formal theorems proven | 4/4 |
| On-chain attestations (Conflux V1) | 146 confirmed |
| On-chain attestations (Conflux V2) | 2 (deployed Apr 9, 2026) |
| MCP tools operational | 6/6 |
| Autonomous agent cycles | 238+ |
| LLM calls in governance path | 0 |
| Active chains | 9 (4 mainnets) |

## 🗺️ Roadmap

### Phase 1 — Hackathon ✅
- [x] DOFProofRegistryV1 on Conflux Testnet — 146 proofs confirmed
- [x] DOFProofRegistryV2 Proof-to-Gasless — deployed Apr 9
- [x] Gas Sponsorship + SponsorWhitelistControl integrated
- [x] Conflux MCP Server — first MCP for Conflux Network
- [x] gaslessGranted=true confirmed on-chain
- [x] 4/4 Z3 theorems PROVEN
- [x] dof-sdk v0.6.0 on PyPI
- [x] Electric Capital PR #2815 MERGED

### Phase 2 — Conflux Production (Q2 2026)
- [ ] Conflux eSpace Mainnet deployment
- [ ] Gas Sponsorship automation for agent fleets
- [ ] USDT0 integration for agent payment rails

### Phase 3 — Ecosystem (Q3-Q4 2026)
- [ ] ERC-8004 + DOF compliance bundle
- [ ] Conflux DeFi DAO treasury governance
- [ ] Governance-as-a-Service API

## 📞 Contact

- **GitHub**: [@Cyberpaisa](https://github.com/Cyberpaisa)
- **X/Twitter**: [@Cyber_paisa](https://x.com/Cyber_paisa)
- **Telegram**: [@Cyber_paisa](https://t.me/Cyber_paisa)
- **Docs**: [dofmesh.com](https://dofmesh.com)
- **ERC-8004**: [ethereum-magicians.org/t/erc-formal-governance-proof-registry/28152](https://ethereum-magicians.org/t/erc-formal-governance-proof-registry/28152)

---

**"The majority of frameworks verify what happened. DOF verifies what is about to happen."**

*Built by @Cyber_paisa for Global Hackfest 2026 — Medellín, Colombia*
