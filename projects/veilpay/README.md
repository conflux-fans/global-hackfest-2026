# VeilPay 🛡️ 💸

Privacy-first, automated DeFi suite and micro-investment platform on Conflux eSpace.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Conflux](https://img.shields.io/badge/built%20on-Conflux-blue)](https://confluxnetwork.org)
[![Hackathon](https://img.shields.io/badge/Global%20Hackfest%202026-green)](https://github.com/conflux-fans/global-hackfest-2026)

## Overview

VeilPay solves the problem of total transparency on public blockchains by providing a production-grade privacy layer for Conflux eSpace. It enables users to make stealth payments (EIP-5564) and trade on a ZK-SNARKs powered Dark Pool, keeping their financial activities shielded from public tracking. The core innovation is a "Round-Up" micro-investment engine that automatically shields and invests spare change into yield-bearing privacy vaults.

## 🏆 Hackathon Information

- **Event**: Global Hackfest 2026
- **Focus Area**: Open Innovation - Privacy & DeFi
- **Team**: Solo Developer
- **Submission Date**: 2026-04-20

## 👥 Team

| Name | Role | GitHub |
|------|------|--------|
| Nivesh Gajengi | Lead Developer | [@nickthelegend](https://github.com/nickthelegend) |

## 🚀 Problem Statement

**What problem does your project solve?**

Public blockchains like Conflux are transparent by design, which means every payment, trade, and investment is linked to a permanent public identity. This leads to:
- **Privacy Risks**: Personal spending habits are exposed to anyone with an explorer.
- **Security Risks**: Large holders are easily targeted through wallet tracking.
- **Lack of Institutional Adoption**: Businesses cannot use public DeFi for confidential payroll or trading without exposing sensitive data.

## 💡 Solution

**How does your project address the problem?**

VeilPay provides a multi-layer privacy model:
1.  **Stealth Payments (EIP-5564)**: Every peer-to-peer payment uses a unique, one-time address derived from the recipient's public "meta-address".
2.  **ZK Dark Pool**: Shielded trading where order details (price/amount) are never revealed on-chain. Noir ZK-SNARKs prove trade validity without exposing inputs.
3.  **Privacy Vaults**: Assets are deposited into a shielded vault to break the link between public identities and trading activity.
4.  **AI Privacy Diagnostic**: An integrated agent that analyzes transaction patterns and provides an "Anonymity Score" to help users avoid doxxing their wallets.

## Go-to-Market Plan (required)

- **Target Audience**: Privacy-conscious retail users, micro-investors, and developers looking for private P2P payment rails.
- **Adoption Strategy**: Leveraging the "Round-Up" feature to lower the barrier to entry for privacy—users don't have to learn complex ZK tools; they just spend as usual, and VeilPay handles the shielding.
- **Ecosystem Fit**: VeilPay acts as a fundamental privacy primitive for the Conflux ecosystem, enabling confidential financial operations for other dApps.

## ⚡ Conflux Integration

**How does your project leverage Conflux features?**

- [x] **eSpace**: Core protocol and contracts deployed on eSpace Testnet (Chain ID 71).
- [x] **Gas Sponsorship**: All vault deposits and stealth announcements are gasless for the user via Conflux Fee Sponsorship.
- [x] **cfxdevkit**: Uses `@cfxdevkit/node` for chain utilities and follows the **AIflux** agent pattern.

### Partner Integrations

- [x] **Noir**: Used for ZK-SNARKs circuits and order commitments.
- [x] **Convex**: Used for sub-second indexing of stealth announcements.

## ✨ Features

### Core Features
- **Stealth Addressing (EIP-5564)**: Generate one-time addresses for shielded P2P transfers.
- **ZK Dark Pool**: Private order book where trades are matched off-chain and settled with ZK proofs.
- **Micro-Investment Round-Ups**: Automatically shield "spare change" from transactions.

### Advanced Features
- **AI Anonymity Scoring**: Real-time feedback on your on-chain privacy health.
- **Encrypted Order Mesh**: High-speed, secure relay for dark pool orders via ECDH.

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15
- **Styling**: Tailwind CSS 4
- **Web3 Integration**: Wagmi v3, RainbowKit, Ethers.js v6

### Backend / Infrastructure
- **Indexer**: Convex (Serverless)
- **Matching Engine**: Node.js (Off-chain)
- **ZK Framework**: Noir (ZK-SNARKs)

### Blockchain
- **Network**: Conflux eSpace Testnet
- **Smart Contracts**: Solidity ^0.8.24
- **Development**: Hardhat / Foundry

## 🎬 Demo

### Live Demo
- **URL**: [https://veilpay-eight.vercel.app](https://veilpay-eight.vercel.app)

### Demo Video
- **YouTube**: (Coming Soon)

## 📄 Smart Contracts

### Deployed Contracts (eSpace Testnet)

| Contract | Address |
|----------|---------|
| StealthRegistry | `0x32825cf98aA9f1fA10D2025B06894094F765B177` |
| StealthAnnouncer | `0x37672d29a18F8681F72c8ecB98b99C1F08e34772` |
| DarkBookEngine | `0xf8b85BCf5a9b52F3D95b323a82F3cF90dF8AB0C1` |
| Vault | `0x97f9BB7A7D941eb6B4995307F6E03d038e2Dcb18` |
| UltraPlonkVerifier | `0xa724a2eC009Ae6F2c8fFF287b849a926645B6670` |
| TestToken (dUSDC) | `0xfCaBa68297d86E56e01E8e9CcB88AF06bc093b9E` |

---

**Built with ❤️ for Global Hackfest 2026**
