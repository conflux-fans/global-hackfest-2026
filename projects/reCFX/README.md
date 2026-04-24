# reCFX

Restake once, secure everything — the first liquid restaking protocol on Conflux eSpace.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Najnomics/reCFX/blob/main/LICENSE)
[![Conflux](https://img.shields.io/badge/built%20on-Conflux-blue)](https://confluxnetwork.org)
[![Hackathon](https://img.shields.io/badge/Global%20Hackfest%202026-green)](https://github.com/conflux-fans/global-hackfest-2026)

## Overview

reCFX is an EigenLayer-inspired liquid restaking protocol built natively on Conflux eSpace. Users deposit sFX (SHUI Finance's liquid staked CFX) into the reCFX vault and receive `reCFX` — a liquid restaking token that earns both SHUI staking yield (~4% APY) and additional operator rewards (2-5% APY) for a combined 6-9% APY. Operators register with bonded CFX stakes, receive delegated security, and pay yield back to restakers. Misbehaving operators are slashed on-chain via fraud proofs or Pyth-oracle-verified SLA breaches.

reCFX introduces the restaking primitive to Conflux for the first time.

## 🏆 Hackathon Information

- **Event**: Global Hackfest 2026
- **Dates**: 2026-03-23 – 2026-04-20
- **Focus Area**: DeFi — Liquid Restaking / Shared Security
- **Prize Targets**: Main Award ($1,500) + Best DeFi Project ($500)
- **Source Code**: [https://github.com/Najnomics/reCFX](https://github.com/Najnomics/reCFX)

## 👥 Team

| Name | Role | GitHub | Discord |
|------|------|--------|---------|
| Nosakhare Jesuorobo | Lead Smart Contract Developer | [@najnomics](https://github.com/najnomics) | najnomics |

## 🚀 Problem Statement

1. **sFX sits idle beyond staking yield.** SHUI Finance lets users stake CFX and receive sFX (~4% APY), but sFX has no secondary utility. The cryptoeconomic security it represents cannot be reused.

2. **No shared security layer on Conflux.** Oracle networks, keeper bots, and sequencers are either centralized or secured by trivially attackable token stakes. No shared security pool exists for new services.

3. **Restaking doesn't exist on Conflux.** EigenLayer proved restaking is one of the most capital-efficient DeFi primitives. No equivalent exists on Conflux — every new protocol must bootstrap security from zero.

## 💡 Solution

reCFX introduces restaking through four composable contracts:

- **reCFXVault** — ERC-4626 style vault. Deposit sFX, receive reCFX shares.
- **OperatorRegistry** — Operators register with 10,000+ CFX bond, fund reward pools.
- **DelegationManager** — Non-custodial delegation with per-block reward accrual and 7-day unbonding.
- **SlashingEngine** — Fraud proofs + Pyth oracle SLA verification. 50% to challenger, 50% to treasury.

**Yield flow:** sFX → reCFX → delegate to operator → earn SHUI APY + operator rewards = **6-9% combined APY**.

## Go-to-Market Plan

**Target Users:**
- Primary: sFX holders seeking additional yield (addressable: full SHUI TVL)
- Secondary: Protocol teams needing decentralized security without bootstrapping a token
- Tertiary: dForce users seeking yield-bearing collateral

**Distribution:**

| Phase | Timeline | Actions |
|-------|----------|---------|
| Hackathon | Now | Testnet deployment, full lifecycle demo |
| Mainnet | Month 1-2 | SHUI partnership, 3 operators, dForce collateral proposal, Conflux grant |
| Scale | Month 3-6 | 10+ operators, reCFX/CFX pool on WallFreeX, governance, $500K TVL target |

**Key Metrics:**

| Metric | 30-Day | 90-Day |
|--------|--------|--------|
| sFX deposited (USD) | $50K | $500K |
| Registered operators | 3 | 10 |
| Active delegations | 50 | 300 |

## ⚡ Conflux Integration

- [x] **eSpace** — All 6 contracts deployed on Conflux eSpace. High TPS enables per-block reward accrual across many delegations.
- [x] **Gas Sponsorship** — `reCFXSponsorManager` refunds gas for restaker transactions. Zero CFX needed beyond the sFX deposit.
- [x] **Built-in Contracts** — Architecture designed around Conflux's `SponsorWhitelistControl` at `0x0888000000000000000000000000000000000001`.

### Partner Integrations

- [x] **SHUI Finance** — Core dependency. sFX is the sole deposit asset. Mutually additive TVL.
- [x] **Pyth Network** — Oracle price feeds for SLA-breach slashing verification. Pyth on eSpace testnet: `0xDd24F84d36BF92C65F92307595335bdFab5Bbd21`.
- [x] **dForce Unitus** — reCFX designed for collateral listing, enabling leveraged restaking.

## ✨ Features

### Core Features
- **Liquid Restaking Token (reCFX)** — ERC-20 LRT, liquid, transferable, composable
- **Dual Yield** — SHUI staking APY + operator rewards simultaneously
- **Non-Custodial Delegation** — Operators get security weight, never custody
- **On-Chain Slashing** — Fraud proofs + Pyth oracle SLA breaches
- **7-Day Unbonding** — Prevents front-running of slash proofs

### Advanced Features
- **Pyth Oracle Slashing** — SLA conditions verified against live Pyth timestamps
- **Gasless UX** — Gas sponsorship for zero-friction experience
- **Multi-Wallet Support** — MetaMask, Fluent, OKX, Rabby, Coinbase, Trust (EIP-6963)

### Future Features
- Governance module, multi-asset restaking, reCFX/CFX pool, AVS marketplace, Cross-Space restaking

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Web3**: Wagmi v2, Viem, TanStack React Query

### Blockchain
- **Network**: Conflux eSpace (Chain ID: 71 testnet / 1030 mainnet)
- **Contracts**: Solidity ^0.8.24
- **Development**: Foundry (forge, cast, anvil)
- **Testing**: 27 tests, 100% pass rate
- **Libraries**: OpenZeppelin v5, Pyth Network EVM SDK

### Infrastructure
- **Hosting**: Vercel
- **CI**: GitHub Actions

## 🏗️ Architecture

```
User (sFX) → reCFXVault (mint reCFX) → DelegationManager (delegate to operator)
                                              ↓                    ↓
                                     OperatorRegistry      SlashingEngine
                                     (bond + rewards)    (Pyth oracle SLA)
```

**Key Design:** Non-custodial delegation. Operators receive security, not custody. sFX never leaves the vault. Only operator bonds are slashable.

## 📋 Prerequisites

- Node.js v20+
- Foundry (`curl -L https://foundry.paradigm.xyz | bash && foundryup`)
- Git
- MetaMask or Fluent Wallet configured for Conflux eSpace Testnet

## 🚀 Installation & Setup

```bash
# Clone
git clone https://github.com/Najnomics/reCFX.git
cd reCFX

# Smart contracts
forge install
forge build

# Frontend
cd frontend
npm install
npm run dev
```

## 🧪 Testing

```bash
# Full test suite (27 tests)
forge test -vvv

# Individual suites
forge test --match-contract ReCFXProtocolTest -vvv
forge test --match-contract ReCFXLifecycleTest -vvv
```

Covers: deposit, withdraw, exchange rate, operator registration, delegation, reward accrual, claiming, undelegation + unbonding, slashing, and full end-to-end lifecycle.

## 📱 Usage

1. **Connect Wallet** — MetaMask or Fluent on Conflux eSpace Testnet
2. **Get sFX** — Use the Faucet page to mint testnet sFX
3. **Deposit** — Deposit sFX, receive reCFX at current exchange rate
4. **Browse Operators** — Compare by reward rate, bond, TVL, slash risk
5. **Delegate** — Approve reCFX, delegate to operator, earn per-block rewards
6. **Claim** — Withdraw accumulated CFX rewards anytime
7. **Undelegate** — Request undelegation (7-day unbonding), then withdraw sFX

## 🎬 Demo

- **Live Demo**: [https://frontend-three-chi-42.vercel.app](https://frontend-three-chi-42.vercel.app)
- **Demo Video**: [https://youtu.be/MMOv8tMFCq0](https://youtu.be/MMOv8tMFCq0)
- **Slides**: [https://gamma.app/docs/Restake-once-secure-everything-v59rpv7dz4ph8s4](https://gamma.app/docs/Restake-once-secure-everything-v59rpv7dz4ph8s4)
- **X Post**: [https://x.com/CNaj_xyz/status/2046438006324605116](https://x.com/CNaj_xyz/status/2046438006324605116)

## 📄 Smart Contracts

### Testnet (Conflux eSpace — Chain ID: 71)

| Contract | Address | Explorer |
|----------|---------|----------|
| MockSFX | `0x44dBf222BE6C4802C8f001a77Ea16Dab14FF49DB` | [View](https://evmtestnet.confluxscan.io/address/0x44dBf222BE6C4802C8f001a77Ea16Dab14FF49DB) |
| OperatorRegistry | `0x08eCa97C14e501e67f62f898925F23fEf968075F` | [View](https://evmtestnet.confluxscan.io/address/0x08eCa97C14e501e67f62f898925F23fEf968075F) |
| reCFXVault | `0x4F26e1344E97c1612Ab98e8fAa00F26F3E9ae399` | [View](https://evmtestnet.confluxscan.io/address/0x4F26e1344E97c1612Ab98e8fAa00F26F3E9ae399) |
| DelegationManager | `0x9599e1A785b6783a9a79b55524edA51587f33Bb1` | [View](https://evmtestnet.confluxscan.io/address/0x9599e1A785b6783a9a79b55524edA51587f33Bb1) |
| SlashingEngine | `0x5450683775b163673D2F9ffBE11d716216AF4a2C` | [View](https://evmtestnet.confluxscan.io/address/0x5450683775b163673D2F9ffBE11d716216AF4a2C) |
| reCFXSponsorManager | `0xeB895Bde2Dd9c0191E5F359a29f5C5296B5712fa` | [View](https://evmtestnet.confluxscan.io/address/0xeB895Bde2Dd9c0191E5F359a29f5C5296B5712fa) |

## 🔒 Security

- ReentrancyGuard on all state-changing functions
- Donation attack prevention (internal accounting)
- Non-custodial delegation (operators never touch sFX)
- Operator-only slashing (restaker capital never at risk)
- 7-day unbonding exceeds fraud proof window
- OpenZeppelin v5 battle-tested libraries

## 🚧 Known Limitations

- Initial operator registry is permissioned (fully permissionless planned post-audit)
- MockSFX used on testnet (real sFX on mainnet)
- Slash watcher is centralized (decentralized challenger network planned)

## 🗺️ Roadmap

### Phase 1 (Hackathon) ✅
- [x] 6 smart contracts deployed on eSpace testnet
- [x] 27 tests, 100% pass rate
- [x] Frontend with multi-wallet support
- [x] Pyth oracle slashing integration
- [x] Full lifecycle verified on-chain

### Phase 2 (Post-Hackathon)
- [ ] SHUI Finance partnership, real sFX integration
- [ ] dForce collateral listing
- [ ] 3 initial operators, mainnet deployment, security audit

### Phase 3 (Scale)
- [ ] Governance, reCFX/CFX pool, multi-asset restaking, AVS marketplace

## 📄 License

MIT License — see [LICENSE](https://github.com/Najnomics/reCFX/blob/main/LICENSE).

## 🙏 Acknowledgments

- **Conflux Network** — Gas sponsorship, high-throughput eSpace, hackathon platform
- **SHUI Finance** — sFX liquid staking primitive
- **EigenLayer** — Restaking model inspiration
- **Pyth Network** — Oracle price feeds for slashing
- **dForce** — Unitus lending market integration target
- **OpenZeppelin** — Security libraries
- **Foundry** — Development toolchain

## 📞 Contact

- **GitHub**: [@najnomics](https://github.com/najnomics)
- **Discord**: najnomics
- **X**: [@CNaj_xyz](https://x.com/CNaj_xyz)
- **Repository**: [https://github.com/Najnomics/reCFX](https://github.com/Najnomics/reCFX)

---

**Built for Global Hackfest 2026 on Conflux eSpace**
