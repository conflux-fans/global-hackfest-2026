# SilkRoute

AI-powered USDT0 and AxCNH cross-border payment protocol on Conflux eSpace.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Conflux](https://img.shields.io/badge/built%20on-Conflux-blue)](https://confluxnetwork.org)
[![Hackathon](https://img.shields.io/badge/Global%20Hackfest%202026-green)](https://github.com/conflux-fans/global-hackfest-2026)
[![Tests](https://img.shields.io/badge/Tests-9%2F9%20passing-brightgreen)](https://github.com/Tasfia-17/Silkroute)

## Overview

SilkRoute enables BRI corridor cross-border payments between USDT0 (USD) and AxCNH (offshore CNH) at 0.3% fee with 3-second settlement. An AI routing agent computes the optimal payment path and logs its reasoning on-chain for every transaction. Built exclusively on Conflux eSpace using USDT0, AxCNH, Swappi DEX, and Pyth oracle.

## Hackathon Information

- **Event**: Global Hackfest 2026
- **Focus Area**: DeFi + AI + Real-World Payments
- **Team**: Tasfia-17
- **Submission Date**: 2026-04-20

## Team

| Name | Role | GitHub |
|------|------|--------|
| Tasfia | Full Stack + Smart Contracts | [@Tasfia-17](https://github.com/Tasfia-17) |

## Problem Statement

Chinese exporters and Belt and Road Initiative contractors across 150+ countries pay 2 to 7% in FX fees and wait 3 days for SWIFT settlements. A $100,000 payment costs around $5,000 and takes 72 hours. 96% of BRI SMEs use informal workarounds because formal channels are too expensive and slow.

The core issues:
- SWIFT fees are 3.5% average on cross-border transfers
- Settlement takes 3 business days minimum
- No direct USD to offshore CNH on-chain settlement existed before AxCNH on Conflux
- Non-crypto users cannot access DeFi due to gas complexity

## Solution

SilkRoute is a smart contract protocol that:

- Accepts USDT0 or AxCNH from the sender
- Routes through Swappi DEX if currency conversion is needed
- Uses Pyth oracle for real-time rate verification
- Logs AI routing reasoning on-chain with every payment
- Settles in approximately 3 seconds at 0.3% fee
- Supports gasless UX via Conflux gas sponsorship

A Chinese merchant can send AxCNH and a recipient anywhere in the BRI corridor receives USDT0 in 3 seconds, paying 91% less than SWIFT.

## Go-to-Market Plan

**Target users:** Chinese exporters, BRI contractors, offshore yuan holders, cross-border SMEs in SE Asia, Central Asia, and Africa.

**Phase 1 (Q2 2026):** Deploy mainnet, onboard 10 pilot users via Conflux China enterprise partnerships, integrate Swappi liquidity pools, apply for Conflux Integration Grant.

**Phase 2 (Q3 2026):** Partner with AnchorX for co-marketing, add LayerZero cross-chain support, launch mobile PWA for field workers, target $1M monthly volume.

**Phase 3 (Q4 2026):** B2B API for Chinese banks, target $10M monthly volume at $30K/month protocol revenue.

**Revenue:** 0.3% fee on all payments. At $10M/month: $360K/year. Fee split 70% treasury, 30% liquidity incentives.

**Why Conflux:** Only regulatory-compliant public blockchain in mainland China. AxCNH and USDT0 are live and exclusive to Conflux. Gas sponsorship enables Web2-like UX.

## Conflux Integration

- [x] **eSpace** - All contracts deployed on Conflux eSpace (Chain ID 71 testnet, 1030 mainnet)
- [x] **Gas Sponsorship** - SponsorWhitelistControl enables zero-gas UX for end users
- [x] **USDT0** - Primary USD settlement token, direct send and swap functions
- [x] **AxCNH** - Offshore CNH settlement, BRI corridor payments
- [x] **Swappi DEX** - USDT0 to AxCNH AMM swaps via Swappi router
- [x] **Pyth Network** - Real-time CFX/USD and USDT/USD price feeds
- [x] **Privy** - Web2-style auth with embedded wallets and email login

## Features

### Core Features
- **Direct USDT0 transfer** - Send USDT0 to any address at 0.3% fee
- **Direct AxCNH transfer** - Send AxCNH to any address at 0.3% fee
- **USDT0 to AxCNH swap** - AI-routed cross-currency payment via Swappi
- **AxCNH to USDT0 swap** - Reverse corridor with oracle-verified rate
- **On-chain AI reasoning** - Every payment stores the routing decision string on-chain
- **Payment history** - Full on-chain record queryable by sender or recipient

### Advanced Features
- **Pyth price update integration** - Fresh oracle data submitted with every swap
- **1% slippage protection** - Minimum output enforced on all swaps
- **Quote functions** - View expected output before sending
- **Fee management** - Owner-controlled fee up to 2% max, treasury withdrawal

## Technology Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (glassmorphism dark theme)
- **Animations**: Framer Motion
- **Web3**: wagmi + viem
- **Auth**: Privy (embedded wallets, email login)

### Blockchain
- **Network**: Conflux eSpace (testnet + mainnet)
- **Smart Contracts**: Solidity 0.8.24
- **Development**: Foundry
- **Testing**: Forge (9/9 tests passing)

### Infrastructure
- **Frontend Hosting**: Vercel
- **Oracle**: Pyth Network (Hermes API)
- **DEX**: Swappi AMM

## Architecture

```
React Frontend (Vite + Tailwind + Privy + wagmi)
        |
        | viem writeContract
        |
SilkRoutePayment.sol (Conflux eSpace)
sendUsdt0()              sendAxCnh()
sendUsdt0ReceiveAxCnh()  sendAxCnhReceiveUsdt0()
quoteUsdt0ToAxCnh()      getPayment()
        |                        |
Pyth Oracle               Swappi Router
CFX/USD + USDT/USD        USDT0 to AxCNH AMM
```

**Flow:** User connects via Privy, enters amount and recipient, AI routing engine computes path and fetches Pyth data, user approves token and sends in one click, contract executes direct transfer or Swappi swap, AI reasoning stored on-chain, recipient receives in 3 seconds.

## Prerequisites

- Node.js 18+
- Foundry (https://book.getfoundry.sh/getting-started/installation)

## Installation and Setup

```bash
git clone https://github.com/Tasfia-17/Silkroute
cd Silkroute
```

### Smart Contracts

```bash
cd contracts
forge install
forge build
forge test -v
```

### Deploy to Conflux eSpace Testnet

```bash
export DEPLOYER_PRIVATE_KEY=0x...
forge script script/Deploy.s.sol:DeployTestnet --rpc-url https://evmtestnet.confluxrpc.com --broadcast --legacy --skip-simulation
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Testing

```
Ran 9 tests for test/SilkRoutePayment.t.sol:SilkRoutePaymentTest
[PASS] test_fee_too_high_reverts()
[PASS] test_fee_update()
[PASS] test_payment_history()
[PASS] test_quote_usdt0_to_axcnh()
[PASS] test_sendAxCnh_receiveUsdt0_swap()
[PASS] test_sendUsdt0_direct()
[PASS] test_sendUsdt0_receiveAxCnh_swap()
[PASS] test_zero_amount_reverts()
[PASS] test_zero_recipient_reverts()

Suite result: ok. 9 passed; 0 failed
```

## Demo

- **Live Demo**: https://silkroute.vercel.app
- **Demo Video**: [demo/demo-video.mp4](demo/demo-video.mp4)
- **GitHub**: https://github.com/Tasfia-17/Silkroute

## Smart Contracts

### Conflux eSpace Testnet (Chain ID 71)

| Contract | Address | Explorer |
|----------|---------|----------|
| SilkRoutePayment | `0x11AADF85Af1c926d5395C4CEa04DBE68B03BdF60` | [View](https://evmtestnet.confluxscan.org/address/0x11AADF85Af1c926d5395C4CEa04DBE68B03BdF60) |
| MockUSDT0 | `0x3EBA12Fbb3d7F5248502aD2c9696a78194beAd21` | [View](https://evmtestnet.confluxscan.org/address/0x3EBA12Fbb3d7F5248502aD2c9696a78194beAd21) |
| MockAxCNH | `0xeD681263EBE64124114e1549FbB24b4EF94258E2` | [View](https://evmtestnet.confluxscan.org/address/0xeD681263EBE64124114e1549FbB24b4EF94258E2) |
| MockPyth | `0x2a24666769A823ec062200A43623e9e1150AcFb8` | [View](https://evmtestnet.confluxscan.org/address/0x2a24666769A823ec062200A43623e9e1150AcFb8) |
| MockSwappiRouter | `0xdE5437b0200b3C7C7e35362DAD0B81875742a6C3` | [View](https://evmtestnet.confluxscan.org/address/0xdE5437b0200b3C7C7e35362DAD0B81875742a6C3) |

### Conflux eSpace Mainnet (Chain ID 1030)

| Contract | Address |
|----------|---------|
| USDT0 | `0xaf37E8B6C9ED7f6318979f56Fc287d76c30847ff` |
| AxCNH | `0x70BFD7F7eADF9b9827541272589A6B2Bb760aE2E` |
| Pyth Oracle | `0xe9d69CdD6Fe41e7B621B4A688C5D1a68cB5c8ADc` |
| Swappi Router | `0x62b0873055Bf896DD869e172119871ac24aEA305` |

## Security

- ReentrancyGuard on all state-changing functions
- SafeERC20 for all token transfers
- safeIncreaseAllowance instead of approve
- Fee withdrawal uses tracked totalFeesCollected, not contract balance
- Max fee capped at 2% (200 bps)
- Slippage protection: 1% minimum output on all swaps

## Roadmap

### Phase 1 (Hackathon)
- [x] Core smart contract with 4 payment functions
- [x] Pyth oracle integration
- [x] Swappi DEX integration
- [x] React frontend with glassmorphism UI
- [x] Privy embedded wallet auth
- [x] Deployed to Conflux eSpace testnet
- [x] 9/9 tests passing

### Phase 2 (Post-Hackathon)
- [ ] Mainnet deployment
- [ ] Gas sponsorship integration (Core Space)
- [ ] LayerZero cross-chain USDT support
- [ ] Mobile PWA

### Phase 3 (Future)
- [ ] B2B API for banks and fintech
- [ ] Multi-currency support
- [ ] Analytics dashboard

## License

MIT. See [LICENSE](https://github.com/Tasfia-17/Silkroute/blob/main/LICENSE).

## Acknowledgments

- Conflux Network for hosting Global Hackfest 2026
- AnchorX for AxCNH
- Tether/LayerZero for USDT0
- Pyth Network for oracle infrastructure
- Swappi for DEX liquidity
- Privy for wallet infrastructure

## Contact

- **GitHub**: [@Tasfia-17](https://github.com/Tasfia-17)
- **Project**: https://github.com/Tasfia-17/Silkroute
- **X Post**: https://x.com/i/status/2046290145465545118
