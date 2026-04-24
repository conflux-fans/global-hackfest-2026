# MunPay

## Overview

MunPay is a payment receipt protocol built on Conflux eSpace. Every USDT0 transfer made through MunPay automatically mints a soulbound PayNFT receipt on-chain — giving the payer a permanent, verifiable proof of payment that lives in their wallet forever.

## Hackathon

Global Hackfest 2026 (2026-03-23 – 2026-04-20)

## Team

- Mutiara Setya (GitHub: [@mutiarasrn](https://github.com/mutiarasrn)) — Frontend Engineer & BizDev
- Muhamad Harfi (GitHub: [@SyuraMoons](https://github.com/SyuraMoons)) — Smart Contract Engineer & Backend Engineer

## Problem Statement

Crypto payments are fast and borderless, but they leave almost nothing behind. A transaction hash buried in a block explorer is the only record a buyer has after paying. There is no receipt, no invoice, no structured proof of what was paid, to whom, and for what. For merchants, this makes reconciliation a manual process. For buyers, there is no on-chain proof if a dispute arises. Traditional payment rails solve this with invoices and receipts — crypto has no equivalent native primitive.

## Solution

MunPay introduces the **PayNFT** — a non-transferable (soulbound) ERC-721 receipt minted to the payer's wallet after every verified USDT0 payment. Each PayNFT encodes the payer and merchant addresses, exact amount paid, timestamp, source transaction hash, invoice ID, and product SKU. The NFT cannot be transferred or sold. It is purely a receipt — permanent, on-chain, and tied to the payer's identity.

## Go-to-Market Plan

**Target users:** Crypto-native users who regularly transact using crypto, particularly buyers paying merchants for goods and services.

**Distribution:**
- Direct onboarding of early merchants on Conflux eSpace who want structured payment records
- Share via Conflux community channels and crypto-native communities
- Merchant-facing payment link generator (roadmap) to drive buyer-side adoption organically

**Growth:**
- Every PayNFT minted is a visible on-chain artifact — organic discovery via ConfluxScan
- Merchants display "Accepts MunPay" to signal structured receipt support to buyers

**Metrics:**
- Number of PayNFTs minted
- Unique payer wallets
- Unique merchant wallets receiving payments

## Conflux Integration

- [ ] Core Space
- [x] eSpace
- [ ] Cross-Space Bridge
- [ ] Gas Sponsorship
- [ ] Built-in Contracts
- [ ] Partner Integrations (Privy/Pyth/LayerZero)

MunPay is deployed on Conflux eSpace using native USDT0 — the cross-chain USDT token natively supported on Conflux. The PayNFT contract (`PayWithUSDT0Receipt`) is deployed on Conflux eSpace Testnet, and all payment transfers are verified on-chain via the Conflux eSpace RPC.

## Features

- Send USDT0 payments directly to any wallet address
- Auto-mint a soulbound PayNFT receipt to the payer's wallet after every verified payment
- Receipt encodes full payment metadata: amount, merchant, invoice ID, SKU, delivery hash
- On-chain SVG receipt image served via NFT metadata API
- EIP-712 signature-gated minting — prevents fake receipts
- Real-time payment status tracking in the UI (transfer → verification → minting → receipt ready)
- Auto-generated invoice ID, SKU, and delivery hash per transaction

## Technology Stack

- **Frontend:** Next.js 15, Tailwind CSS v4, RainbowKit, Wagmi, Viem
- **Backend:** Node.js, Express, TypeScript, Drizzle ORM
- **Database:** PostgreSQL via Supabase
- **Blockchain:** Conflux eSpace (Testnet)
- **Smart Contracts:** Solidity 0.8.28, Hardhat
- **Token:** USDT0 (native cross-chain USDT on Conflux)
- **Deployment:** Railway (API), Vercel (frontend)

## Setup Instructions

### Prerequisites

- Node.js 20+
- Git
- Conflux wallet (MetaMask with Conflux eSpace Testnet)
- CFX for gas — [faucet](https://efaucet.confluxnetwork.org)
- USDT0 on Conflux eSpace Testnet

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/mutiarasrn/MunPay
   cd MunPay
   ```

2. Deploy the contract

   ```bash
   cd contract
   cp .env.example .env
   # set DEPLOYER_PRIVATE_KEY in .env
   npm install
   npx hardhat deploy-pay-receipt --network confluxESpaceTestnet
   ```

3. Run the API

   ```bash
   cd apii
   cp .env.example .env
   # fill in all required env vars
   npm install
   npm run dev
   ```

4. Run the frontend

   ```bash
   cd my-app
   cp .env.example .env.local
   # set NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
   npm install
   npm run dev
   ```

### Testing

```bash
cd contract && npx hardhat test
cd apii && npm test
```

## Usage

1. Open the app and connect your wallet (MetaMask on Conflux eSpace Testnet)
2. Enter the merchant wallet address and USDT0 amount
3. Click **Pay** — approve and sign the USDT0 transfer transaction
4. The app verifies the transfer and requests a mint authorization from the backend
5. Sign the mint transaction — your PayNFT receipt is minted to your wallet
6. View the receipt on ConfluxScan or directly in MetaMask

## Demo

- **Live Demo:** https://mun-pay.vercel.app/
- **Demo Video:** coming soon

## Architecture

```
Payer                     MunPay API                  Conflux eSpace
  │                           │                              │
  │── fill form ─────────────▶│                              │
  │                           │── create payment intent      │
  │◀─────────────── intent ───│                              │
  │                           │                              │
  │── sign & send USDT0 ─────────────────────────────────────▶│
  │◀─────────────────────────────────────── tx hash ──────────│
  │                           │                              │
  │── submit tx hash ────────▶│                              │
  │                           │── verify transfer on-chain ─▶│
  │                           │── sign EIP-712 authorization  │
  │◀────────────── mint call ─│                              │
  │                           │                              │
  │── mintReceiptWithSignature ──────────────────────────────▶│
  │◀──────────────────────────────────── PayNFT minted ───────│
```

## Smart Contracts

- `PayWithUSDT0Receipt`: `0x294be568d021efb68972eba08551279576b03919` (Conflux eSpace Testnet)
- `USDT0 Token`: `0x4d1beB67e8f0102d5c983c26FDf0b7C6FFF37a0c` (Conflux eSpace Testnet)

## Future Improvements

- Merchant dashboard — merchants can set amount, invoice ID, and product SKU and generate a shareable payment link for buyers
- Support for additional token currencies beyond USDT0
- Mobile-optimized experience and WalletConnect deep linking
- On-chain dispute resolution layer

## License

This project is licensed under the MIT License.

## Acknowledgments

- Conflux Network for USDT0 and eSpace infrastructure
- RainbowKit and Wagmi for wallet connection
- Supabase for managed Postgres
- Hardhat for smart contract tooling
