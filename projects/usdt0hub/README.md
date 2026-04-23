# USDT0Hub

> The intelligent liquidity layer for USDT0 on Conflux — bridge once, earn everywhere.

## Project Info

| Field | Details |
|-------|---------|
| **Project Name** | USDT0Hub |
| **Team** | Ikpia Emmanuel ([@Ikpia](https://github.com/Ikpia)) |
| **GitHub Repo** | [github.com/Ikpia/USDT0Hub](https://github.com/Ikpia/USDT0Hub) |
| **Live Demo** | [usdt0hub.vercel.app](https://usdt0hub.vercel.app) |
| **Demo Video** | [YouTube (3 min)](https://youtu.be/aN47DfVBlp4) |
| **Pitch Deck** | [Slides](https://gamma.app/docs/Payroll-for-the-CNH-Corridor-In-Real-Time-xbladj628yvitn1) |
| **Tweet** | [X Post](https://x.com/i/status/2046364674828967982) |
| **Electric Capital PR** | [See submission issue] |

---

## Overview

USDT0Hub is an omnichain liquidity aggregation and smart routing protocol purpose-built for USDT0 on Conflux eSpace. It solves three problems:

1. **No unified yield entry point** — USDT0Hub's Smart Router (ERC-4626 vault) automatically routes USDT0 deposits to the highest-yielding strategy across dForce Unitus, WallFreeX, and SHUI Finance.

2. **No USD/CNH FX primitive** — USDT0Hub introduces the first on-chain USDT0 ↔ AxCNH atomic swap using a StableSwap AMM with Pyth oracle pricing.

3. **No intelligent routing** — USDT0Hub's Bridge Receiver hooks into Meson.fi so users can deposit from 60+ chains in one transaction.

All interactions are gas-sponsored via Conflux's `SponsorWhitelistControl` — zero CFX required.

---

## Conflux Integration

- [x] **eSpace** — All 7 contracts deployed on Conflux eSpace testnet (Chain ID 71)
- [x] **Gas Sponsorship** — `USDT0HubSponsorManager.sol` wraps `SponsorWhitelistControl` at `0x0888000000000000000000000000000000000001` to sponsor all user transactions
- [x] **Built-in Contracts** — Programmatic fee sponsorship management via the built-in contract
- [x] **Partner Integrations:**
  - **LayerZero (USDT0 OFT)** — Core asset. Router integrates the official USDT0 OFT contract for cross-chain sends (`quoteUsdt0Bridge()` / `bridgeUsdt0()`). Mainnet OFT: `0xC57efa1c7113D98BdA6F9f249471704Ece5dd84A`
  - **Meson.fi** — `USDT0BridgeReceiver.sol` hooks into Meson's destination call for auto-routing
  - **dForce Unitus** — Primary USDT0 lending yield strategy adapter
  - **WallFreeX** — Stablecoin LP yield strategy adapter
  - **Pyth Network** — Pull-based oracle for USDT/USD and USD/CNH price feeds powering the FX pair

---

## Innovation Areas

- [x] Best USDT0 Integration — USDT0 is the core asset; OFT bridging, yield routing, FX swap all built around it
- [x] Best DeFi Project — ERC-4626 vault, StableSwap AMM, multi-strategy yield routing, LP fee distribution
- [x] Best AxCNH Integration — First on-chain USDT0/AxCNH FX market on any chain

---

## Smart Contracts (Testnet — Chain ID 71)

| Contract | Address |
|----------|---------|
| USDT0 (Mock) | `0xd382984b05554D9d5aE9Ab62f6aA22De553be8b7` |
| USDT0 OFT (Mock) | `0xBa600674c1b3FEDaD2244Be759aF4142c00f0BE2` |
| AxCNH (Mock) | `0x809FA23FEa777d37CdF3acab67Cd62D9A75e7BCf` |
| USDT0Router | `0xFca52d74ab1E9468889b7bC59DdC7D84b8B84F8a` |
| USDT0AxCNHPair | `0xd75deBc05976291Df39411607121873330Fd14F3` |
| USDT0BridgeReceiver | `0x00f1AE6Ef6C6C3aD0Cbb9f424aDfCF344cB4fC35` |
| USDT0HubSponsorManager | `0xa23f76b617f4F6aEa723645D399A523fdb9A3fc5` |

---

## Tech Stack

- **Smart Contracts:** Solidity 0.8.24, Foundry, OpenZeppelin 5.x (35 tests passing)
- **Frontend:** Next.js 14, React 18, Wagmi v2, Viem, TailwindCSS
- **Rebalancer:** Node.js, TypeScript, Viem
- **Oracle:** Pyth Network (pull-based)
- **Wallets:** Fluent, MetaMask, Rabby, Coinbase, OKX + any injected

---

## Go-to-Market Plan

**Target Users:**
- Stablecoin yield seekers bridging USDT0 to Conflux from 60+ chains
- Asia corridor businesses needing non-custodial USD ↔ CNH conversion
- Conflux-native DeFi users wanting one interface for all yield
- Liquidity providers earning FX swap fees

**Distribution:**
- Phase 1 (Hackathon): Testnet deployment + live demo
- Phase 2 (Month 1-2): Mainnet launch, Conflux Ecosystem Grant, Meson.fi + AnchorX co-marketing
- Phase 3 (Month 3-6): Pyth live feeds, liquidity mining, $1M USDT0 volume target

| Metric | 30-Day | 90-Day |
|--------|--------|--------|
| USDT0 Routed | $100K | $1M |
| FX Swap Volume | $50K | $500K |
| Unique Depositors | 150 | 1,000 |

---

## Demo

- **Live App:** [usdt0hub.vercel.app](https://usdt0hub.vercel.app)
- **Demo Video:** [YouTube — USDT0Hub walkthrough (3 min)](https://youtu.be/aN47DfVBlp4)
- **Pitch Deck:** [Slides](https://gamma.app/docs/Payroll-for-the-CNH-Corridor-In-Real-Time-xbladj628yvitn1)

---

## Source Code

Full source code: [github.com/Ikpia/USDT0Hub](https://github.com/Ikpia/USDT0Hub)

```
USDT0Hub/
├── src/                    # Solidity smart contracts
│   ├── USDT0Router.sol     # ERC-4626 vault + yield routing
│   ├── USDT0AxCNHPair.sol  # StableSwap AMM (Pyth oracle)
│   ├── USDT0BridgeReceiver.sol
│   ├── USDT0HubSponsorManager.sol
│   ├── adapters/           # dForce, WallFreeX, SHUI adapters
│   ├── interfaces/         # IYieldStrategy, IPyth, IUSDT0OFT, etc.
│   └── mocks/              # Test tokens + mock oracle
├── test/                   # Forge tests (35 passing)
├── frontend/               # Next.js 14 + Wagmi v2 + TailwindCSS
├── rebalancer/             # Off-chain APY monitor + rebalance trigger
└── script/                 # Deployment scripts
```

---

## License

MIT
