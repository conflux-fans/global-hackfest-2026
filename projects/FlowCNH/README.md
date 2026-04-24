# FlowCNH

> Real-time cross-border payment streaming powered by AxCNH — money that moves as fast as work happens.

## Links

- **Live Demo:** https://flowcnhxyz.vercel.app
- **Source Code:** https://github.com/Kingg-titan/FlowCNH-
- **Demo Video:** https://youtu.be/186_iVk1En0
- **Presentation:** https://gamma.app/docs/Payroll-for-the-CNH-Corridor-In-Real-Time-xbladj628yvitn1
- **Tweet:** https://x.com/i/status/2046352561154695562

## What It Does

FlowCNH is a programmable payment streaming protocol built on Conflux eSpace, using AxCNH (the offshore yuan-pegged stablecoin by AnchorX) as the primary settlement asset. Employers fund a smart contract once; funds drip to worker wallets second-by-second in real time.

### Core Features

- **Second-by-second streaming** — Worker balance increases every block, withdrawable any time
- **AxCNH-native** — Purpose-built for the Asia cross-border CNH payment corridor
- **Gasless withdrawals** — All claim() calls sponsored via Conflux Fee Sponsorship
- **dForce yield** — Idle stream balances earn yield in dForce Unitus (Phase 2)
- **Stream NFTs** — Each stream is an ERC-721, making positions transferable and composable
- **Batch streams** — Employers create multiple streams in one transaction

## Architecture

```
Employer → FlowCNHRouter.sol → StreamVault.sol (holds AxCNH, tracks accrual)
                              → StreamNFT.sol (ERC-721 per stream)
                              → SponsorManager.sol (gasless claims)
                              → DForceAdapter.sol (idle yield)

Worker calls claim() → gas sponsored → AxCNH arrives instantly
```

## Smart Contracts (Conflux eSpace Testnet — Chain ID: 71)

| Contract | Address |
|----------|---------|
| FlowCNHRouter | `0x2Cd74565C93BC180e29bE542047b06605e974ca0` |
| StreamVault | `0x09a1Bfac7fED8754f1EB37C802eEc9ED831A82F9` |
| StreamNFT | `0x349CcB9d138bE918B1AcE5849EFdd5c4652c9CbB` |
| FlowCNHSponsorManager | `0xA8640Dd210A6b506F2C0560A1268a2424695af61` |
| DForceAdapter | `0xfD8a5df577184ad156DcF5Ec7a27B7194cC8d116` |

## Conflux Integration

- **eSpace** — All contracts on Conflux eSpace. Low gas makes per-second accounting viable.
- **Fee Sponsorship** — SponsorWhitelistControl sponsors claim() calls. Workers never need CFX.
- **AxCNH (AnchorX)** — Primary stream asset. First streaming protocol for AxCNH.
- **dForce Unitus** — Idle yield integration (Phase 2 for production verification).

## Technology Stack

- **Smart Contracts:** Solidity ^0.8.24, Foundry (18 tests passing incl. fuzz + invariants)
- **Frontend:** Next.js 14, wagmi v2, RainbowKit, TailwindCSS
- **Backend:** Node.js yield harvester service
- **DevOps:** GitHub Actions CI, Vercel deployment

## Go-to-Market Plan

**Phase 1 (Now):** Live testnet demo targeting Main Award + Best AxCNH Integration.

**Phase 2 (Month 1-2):** Mainnet deploy with real AxCNH + dForce yield. Apply for Conflux Ecosystem Grant and AnchorX fund.

**Phase 3 (Month 3-6):** Meson.fi cross-chain entry, multi-recipient batch streams, 50 active streams target.

**Target Users:** Remote-first companies paying Asian contractors via the Belt and Road / CNH corridor.

## Team

- **Ebuka Egbunike** — Smart Contract & Full-Stack Developer (GitHub: [@Kingg-titan](https://github.com/Kingg-titan))

## Prize Targets

- Main Award ($1,500)
- Best AxCNH Integration ($500)

## License

MIT
