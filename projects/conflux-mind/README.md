# ConfluxMind

> Autonomous DeFAI yield optimization — your capital, always working at peak efficiency.

**[Demo Video](https://youtu.be/PF0_yvuteCE)** | **[Slide Deck](https://gamma.app/docs/Autonomous-DeFAI-Yield-Optimization-on-Conflux-eSpace-8izfjq0he4sjqc6?mode=doc)** | **[Live App](https://confluxmind.vercel.app)** | **[About Page](https://confluxmind.vercel.app/about)**

---

## Overview

ConfluxMind is an autonomous, AI-powered yield aggregation protocol built on Conflux eSpace. Users deposit assets into a non-custodial ERC-4626 vault; an AIflux-inspired AI agent continuously reads live yield signals across Conflux's DeFi ecosystem — dForce Unitus lending markets, SHUI Finance liquid staking, and WallFreeX liquidity pools — and autonomously rebalances allocations toward the highest risk-adjusted returns using a 3-factor scoring model.

All user interactions are gasless via Conflux's native Fee Sponsorship mechanism.

---

## Hackathon

**Global Hackfest 2026** | 2026-03-23 – 2026-04-20

**Prize Targets:** Main Award ($1,500) + Best AI + Conflux ($500) + Best DeFi ($500)

---

## Team

- **Nosakhare Jesuorobo** — Solo Developer (GitHub: [@najnomics](https://github.com/najnomics), Discord: najnomics)

---

## Problem Statement

DeFi yield on Conflux eSpace is fragmented across multiple protocols — dForce Unitus, SHUI Finance, WallFreeX — each with independently fluctuating APYs. Users must manually monitor, calculate, and execute rebalances. Capital sits idle in suboptimal positions.

---

## Solution

Three-layer architecture:

1. **Vault Layer** — ERC-4626 vault accepts deposits, mints cmTokens, non-custodial
2. **AI Strategy Layer** — AIflux-inspired agent uses 3-factor scoring (yield rate 40% + utilization risk 30% + liquidity depth 30%) to compute optimal allocations and execute atomic rebalances
3. **Gasless UX Layer** — Conflux Fee Sponsorship via SponsorWhitelistControl

---

## Go-to-Market Plan

- **Phase 1 (Hackathon):** Testnet deployment, live demo, community feedback
- **Phase 2 (Month 1-2):** Mainnet launch with USDT0 + AxCNH. Conflux Ecosystem Grant application.
- **Phase 3 (Month 3-6):** Expand integrations. Protocol fee switch. Target $500K TVL.

**Target users:** DeFi-native users on Conflux, bridging users (USDT0/AxCNH), DAO treasuries.

---

## Conflux Integration

- [x] **eSpace** — All contracts deployed on Conflux eSpace testnet
- [x] **Gas Sponsorship** — GasSponsorManager.sol wraps SponsorWhitelistControl
- [x] **Built-in Contracts** — Programmatic Fee Sponsorship management
- [x] **@cfxdevkit/geckoterminal** — Market data for AI scoring
- [x] **@conflux-devkit/node** — Chain utilities
- [x] **AIflux (Eliza pattern)** — Agent architecture from cfxdevkit/AIflux
- [x] **Partner Integrations:** dForce Unitus, SHUI Finance, WallFreeX

---

## Features

- Autonomous 3-factor yield optimization (not just "pick highest APY")
- ERC-4626 compliant vault
- Gasless user experience via Conflux Fee Sponsorship
- Real-time AI reasoning visible on dashboard
- Non-custodial with emergency withdrawal circuit breaker
- 31 passing Foundry tests

---

## Technology Stack

- **Frontend:** React 18, Next.js 14, Wagmi v2, Viem, TailwindCSS, Recharts
- **AI Agent:** AIflux-inspired (Eliza action pattern), Node.js 20, TypeScript, ethers.js v6, @cfxdevkit/geckoterminal, @conflux-devkit/node
- **Smart Contracts:** Solidity ^0.8.24, Foundry, OpenZeppelin ERC-4626
- **Blockchain:** Conflux eSpace (Chain ID 71 testnet)

---

## Deployed Contracts (Conflux eSpace Testnet)

| Contract | Address |
|----------|---------|
| MockUSDT | [`0x1Fb61DC9751c3c0259E2E70E1af5968012953667`](https://evmtestnet.confluxscan.org/address/0x1Fb61DC9751c3c0259E2E70E1af5968012953667) |
| ConfluxMindVault | [`0x76Cbe8f11FdaC8edE2a49E297163508af9A17cF2`](https://evmtestnet.confluxscan.org/address/0x76Cbe8f11FdaC8edE2a49E297163508af9A17cF2) |
| StrategyController | [`0x766d707FA8deD8F23C3bF65e547d19aA5F154188`](https://evmtestnet.confluxscan.org/address/0x766d707FA8deD8F23C3bF65e547d19aA5F154188) |
| GasSponsorManager | [`0x0105543D716AbE2dc96c41d6AEA913a3A0603eFA`](https://evmtestnet.confluxscan.org/address/0x0105543D716AbE2dc96c41d6AEA913a3A0603eFA) |
| dForce Strategy | [`0x6926165994325ABC6e551af84EdCBab98Af4eFe3`](https://evmtestnet.confluxscan.org/address/0x6926165994325ABC6e551af84EdCBab98Af4eFe3) |
| SHUI Strategy | [`0xF94A8F5CfA9E0FD1D0920419b936181eC1790be8`](https://evmtestnet.confluxscan.org/address/0xF94A8F5CfA9E0FD1D0920419b936181eC1790be8) |
| WallFreeX Strategy | [`0xF0A7dbCCBcB3F315103cf7e6368A5b0CdBCf0e10`](https://evmtestnet.confluxscan.org/address/0xF0A7dbCCBcB3F315103cf7e6368A5b0CdBCf0e10) |

---

## Demo

- **Demo Video:** [https://youtu.be/PF0_yvuteCE](https://youtu.be/PF0_yvuteCE)
- **Slide Deck:** [https://gamma.app/docs/Autonomous-DeFAI-Yield-Optimization-on-Conflux-eSpace-8izfjq0he4sjqc6](https://gamma.app/docs/Autonomous-DeFAI-Yield-Optimization-on-Conflux-eSpace-8izfjq0he4sjqc6?mode=doc)
- **Live App:** [https://confluxmind.vercel.app](https://confluxmind.vercel.app)
- **GitHub Repo:** [https://github.com/Najnomics/ConfluxMind](https://github.com/Najnomics/ConfluxMind)

---

## Future Improvements

- Multi-chain vault entry via LayerZero/Meson.fi
- Full AIflux/ElizaOS runtime with Discord/Telegram connectors
- On-chain governance for strategy whitelisting
- Agent decentralization with slashable bonds
- Core Space deployment for full native Gas Sponsorship

---

## License

MIT License — see [LICENSE](https://github.com/Najnomics/ConfluxMind/blob/main/LICENSE)
