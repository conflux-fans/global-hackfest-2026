# DOF-MESH — Deterministic Governance for Autonomous AI Agents

Mathematically proven, on-chain verified compliance for AI agents — before they act.

[![License](https://img.shields.io/badge/license-BSL--1.1-lightgrey)](LICENSE)
[![Conflux](https://img.shields.io/badge/built%20on-Conflux-blue)](https://confluxnetwork.org)
[![Hackathon](https://img.shields.io/badge/Global%20Hackfest%202026-green)](https://github.com/conflux-fans/global-hackfest-2026)
[![Tests](https://img.shields.io/badge/tests-4%2C308%20passing-brightgreen)](https://github.com/Cyberpaisa/DOF-MESH)
[![Z3](https://img.shields.io/badge/Z3%20proofs-4%2F4%20PROVEN-blue)](https://github.com/Cyberpaisa/DOF-MESH)

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

**Who it's for:** AI agent developers needing verifiable compliance for regulated industries (finance, healthcare, legal) and blockchain protocols wanting provably-correct agents managing treasuries or DAOs.

**Why Conflux:** Gas Sponsorship is architecturally necessary for agent infrastructure. Agents should not hold gas — they should act. Conflux's native `SponsorWhitelistControl` makes zero-friction agent compliance possible. No other EVM chain has this natively.

**Acquisition:** dof-sdk on PyPI (`pip install dof-sdk`) — developers adopt the framework and Conflux integration comes included. ERC-8004 (Autonomous Agent Identity Standard, submitted to Ethereum Magicians) creates network effects as the identity layer DOF-MESH verifies.

**Metrics:** 80+ on-chain attestations across 8 chains, 238+ autonomous agent cycles completed, 38+ proofs on Conflux Testnet.

## ⚡ Conflux Integration

- [x] **eSpace** — DOFProofRegistry deployed at [`0x554cCa8ceBE30dF95CeeFfFBB9ede5bA7C7A9B83`](https://evmtestnet.confluxscan.io/address/0x554cCa8ceBE30dF95CeeFfFBB9ede5bA7C7A9B83) on Conflux eSpace Testnet (chain ID 71). 38+ proofs registered.
- [x] **Gas Sponsorship** — `SponsorWhitelistControl` at `0x0888000000000000000000000000000000000001` integrated. Agents pay zero gas to register compliance proofs.
- [x] **Built-in Contracts** — Gas Sponsorship for agent proof registration

## 🎬 Demo

- **Video**: [https://youtu.be/WwpqXdYYID8](https://youtu.be/WwpqXdYYID8) (104 seconds)
- **Docs**: [https://dofmesh.com](https://dofmesh.com)
- **GitHub**: [github.com/Cyberpaisa/DOF-MESH](https://github.com/Cyberpaisa/DOF-MESH)
- **Contract**: [ConfluxScan](https://evmtestnet.confluxscan.io/address/0x554cCa8ceBE30dF95CeeFfFBB9ede5bA7C7A9B83)

### Verified Transactions on Conflux

| Date | TX Hash | What it proves |
|------|---------|----------------|
| Apr 6, 2026 | [`bf98ea58...bebf740c`](https://evmtestnet.confluxscan.io/tx/bf98ea58265dcd8433f594376d0d679fde65d93ae8cc18d841627308bebf740c) | Full 6-step governance cycle — Agent #1687 |
| Apr 6, 2026 | [`77d4ddea...b12465e5`](https://evmtestnet.confluxscan.io/tx/77d4ddea0043bf6df5a916cd7040886e0a97480ab12465e5842ce7c2f26b4b10) | Direct attestation test |

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| Language | Python 3.12 |
| Agent framework | CrewAI |
| Formal verification | Z3 SMT Solver (Microsoft Research) |
| Blockchain | Conflux eSpace (chain 71) + 7 other EVM chains |
| Smart contracts | Solidity (DOFProofRegistry.sol) |
| Web3 | web3.py v7.x |
| Gas Sponsorship | Conflux SponsorWhitelistControl |
| Agent identity | ERC-8004 (Autonomous Agent Identity Standard) |
| SDK | dof-sdk v0.6.0 on PyPI |
| Docs | Mintlify (23 pages at dofmesh.com) |

## Quick Start

```bash
git clone https://github.com/Cyberpaisa/DOF-MESH
cd DOF-MESH
pip install -r requirements.txt

# Full 6-step governance cycle (dry-run)
python3 scripts/conflux_demo.py --dry-run

# With real on-chain attestation (requires CONFLUX_PRIVATE_KEY)
python3 scripts/conflux_demo.py

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
| On-chain attestations (Conflux) | 38+ |
| On-chain attestations (all chains) | 80+ |
| Autonomous agent cycles | 238+ |
| LLM calls in governance path | 0 |
| Active chains | 8 |

## 🗺️ Roadmap

### Phase 1 — Hackathon ✅
- [x] DOFProofRegistry on Conflux Testnet
- [x] Gas Sponsorship integration
- [x] 38+ proofs registered, 2 verified TXs
- [x] 4/4 Z3 theorems PROVEN
- [x] dof-sdk v0.6.0 on PyPI

### Phase 2 — Conflux Production (Q2 2026)
- [ ] Conflux eSpace Mainnet deployment
- [ ] Gas Sponsorship automation for agent fleets
- [ ] Conflux Core Space integration

### Phase 3 — Ecosystem (Q3-Q4 2026)
- [ ] ERC-8004 + DOF compliance bundle
- [ ] Conflux DeFi DAO treasury governance
- [ ] Governance-as-a-Service API

## 📞 Contact

- **GitHub**: [@Cyberpaisa](https://github.com/Cyberpaisa)
- **X/Twitter**: [@Cyber_paisa](https://x.com/Cyber_paisa)
- **Docs**: [dofmesh.com](https://dofmesh.com)
- **ERC-8004**: [ethereum-magicians.org/t/erc-formal-governance-proof-registry/28152](https://ethereum-magicians.org/t/erc-formal-governance-proof-registry/28152)

---

**"The majority of frameworks verify what happened. DOF verifies what is about to happen."**

*Built with ❤️ for Global Hackfest 2026 — Medellín, Colombia*
