# FluxPay

Hosted crypto checkout infrastructure for **Conflux eSpace** that helps merchants and developers create payment links, accept **USDT0** payments, verify transactions, and automate payment flows with webhooks.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Conflux](https://img.shields.io/badge/built%20on-Conflux-blue)](https://confluxnetwork.org)
[![Hackathon](https://img.shields.io/badge/Global%20Hackfest%202026-green)](https://github.com/conflux-fans/global-hackfest-2026)

## Overview

FluxPay is a hosted crypto checkout system built for **Conflux eSpace**. It helps merchants and developers create one-time or reusable payment links, collect **USDT0** payments, verify payment completion, and automate post-payment actions with webhooks.

The main problem FluxPay solves is that accepting stablecoin payments in apps is still too hard. Most teams can deploy contracts or hold assets, but they do not have a clean, production-style checkout flow, payment verification layer, or developer-friendly merchant tooling. FluxPay reduces that friction by giving teams a faster path from “I want to accept stablecoin payments” to a working hosted checkout experience.

What makes FluxPay different is its focus on practical merchant payments on Conflux: hosted checkout, payment links, webhook automation, and a checkout SDK for integration into apps.

## 🏆 Hackathon Information

- **Event**: Global Hackfest 2026
- **Focus Area**: Open Innovation
- **Team**: FluxPay
- **Submission Date**: 2026-07-20

## 👥 Team

| Name          | Role                             | GitHub                               | Discord     |
| ------------- | -------------------------------- | ------------------------------------ | ----------- |
| Saheed Lukman | Fullstack / Blockchain Developer | [@hexdee](https://github.com/hexdee) | hexdee#2405 |

## 🚀 Problem Statement

**What problem does your project solve?**

Accepting crypto payments is still too difficult for many builders and merchants. Even when a team wants to accept stablecoin payments, they often need to build too many pieces themselves:

- payment request generation,
- checkout UI,
- payment verification,
- webhook automation,
- merchant management tools,
- and developer integration flows.

This matters because:

- merchants want simpler ways to accept digital payments,
- developers want monetization infrastructure without rebuilding payments from scratch,
- ecosystems like Conflux benefit from more real-world transaction activity.

Current limitations in existing solutions:

- many payment tools are not tailored to Conflux,
- merchant-focused payment tooling is still limited,
- developer onboarding is often too generic or too infrastructure-heavy,
- stablecoin utility is reduced when checkout flows are missing.

Blockchain helps because it provides transparent settlement, programmable payment verification, and event-driven integrations. FluxPay uses those strengths to turn Conflux eSpace into a more practical payment network for apps and merchants.

## 💡 Solution

**How does your project address the problem?**

FluxPay provides a hosted crypto checkout layer for **Conflux eSpace**.

It allows developers and merchants to:

- create payment requests,
- generate checkout links,
- support one-time and reusable payment flows,
- verify payment completion,
- trigger webhook events after payment,
- integrate checkout into apps using an SDK.

### High-level solution

A merchant or app creates a payment through FluxPay. FluxPay returns a hosted checkout link. The customer completes payment using supported Conflux eSpace flow. FluxPay verifies the payment and notifies the merchant backend through webhook events.

### Why this is better

Instead of every team building payment infrastructure from scratch, FluxPay gives them a reusable payment layer with a merchant-facing UI and developer-facing SDK.

### Benefits

- faster time to launch payments,
- better stablecoin utility on Conflux,
- cleaner merchant experience,
- easier developer integration,
- better automation after payment.

## Go-to-Market Plan (required)

### Who it is for

FluxPay is for:

- small online merchants,
- web3 apps with subscriptions or one-time payment flows,
- developers who need hosted checkout links,
- teams that want webhook-based payment automation.

### Why they would use it

They would use FluxPay because it removes the need to build payment infrastructure from scratch. It gives them:

- hosted checkout,
- payment links,
- webhook automation,
- SDK-based integration,
- and a cleaner path to stablecoin payments on Conflux.

### How users or developers will find it

- open-source distribution through GitHub,
- public demo and docs,
- SDK-based developer onboarding,
- hackathon and ecosystem visibility,
- direct outreach to Conflux-native builders and merchants.

### Milestones and metrics

Key milestones:

- improve docs and quickstart,
- harden webhook reliability,
- polish merchant settings and reporting,
- onboard pilot users,
- move toward stronger production readiness.

Key metrics:

- number of payment links created,
- number of successful payments processed,
- number of external developers integrating the SDK,
- number of Conflux-native apps piloting FluxPay,
- stablecoin payment volume.

### Fit for Conflux ecosystem

FluxPay helps expand:

- stablecoin usage,
- merchant adoption,
- developer activity,
- practical payment infrastructure on Conflux eSpace.

## ⚡ Conflux Integration

**How does your project leverage Conflux features?**

- [ ] **Core Space** - Not currently used in this MVP.
- [x] **eSpace** - FluxPay is built around Conflux eSpace payment flows and hosted checkout for eSpace-based stablecoin payments.
- [ ] **Cross-Space Bridge** - Not used in the current MVP.
- [ ] **Gas Sponsorship** - Not implemented in the current MVP.
- [ ] **Built-in Contracts** - Not a focus of the current MVP.
- [ ] **Tree-Graph Consensus** - FluxPay benefits from Conflux network performance, but does not directly expose consensus-specific functionality in the current MVP.

### Partner Integrations

- [ ] **Privy** - Not used in the current MVP.
- [ ] **Pyth Network** - Not used in the current MVP.
- [ ] **LayerZero** - Not used in the current MVP.
- [x] **Other** - **USDT0** integration for Conflux eSpace checkout positioning.

## ✨ Features

### Core Features

- **Hosted Checkout** - Generate a hosted checkout page for customer payments.
- **Payment Links** - Create one-time or reusable payment links.
- **Payment Verification** - Verify payment completion and status server-side.

### Advanced Features

- **Webhook Automation** - Trigger merchant backend actions after payment events.
- **Checkout SDK** - Integrate FluxPay checkout into external apps more easily.

### Future Features (Roadmap)

- **Branding & Merchant Customization** - More customizable checkout and merchant settings.
- **Analytics & Reporting** - Better payment insights, link performance, and merchant analytics.

## 🛠️ Technology Stack

### Frontend

- **Framework**: React / Next.js
- **Styling**: Tailwind CSS
- **State Management**: Local app state / React patterns
- **Web3 Integration**: ethers.js

### Backend

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: Project-specific backend storage/configuration
- **APIs**: REST

### Blockchain

- **Network**: Conflux eSpace
- **Smart Contracts**: Solidity
- **Development**: Hardhat
- **Testing**: Hardhat / JavaScript-based contract workflow

### Infrastructure

- **Hosting**: Vercel (demo frontend), Render (backend/API)
- **Storage**: Standard app/backend storage approach
- **Monitoring**: Basic deployment/runtime monitoring

## 🏗️ Architecture

```text
┌─────────────────┐    ┌─────────────────┐    ┌────────────────────────┐
│   Merchant UI   │    │   Backend/API   │    │   Conflux eSpace       │
│  + Checkout UI  │◄──►│ Payment Logic   │◄──►│   USDT0 / Contracts     │
└─────────────────┘    └─────────────────┘    └────────────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   Checkout SDK  │    │   Webhooks      │
│ App Integration │    │ Merchant Events │
└─────────────────┘    └─────────────────┘
```

**High-level architecture description:**

FluxPay consists of:

- a frontend merchant app for managing payments and links,
- a hosted checkout experience for customers,
- a backend/API for creating payments, verifying them, and emitting webhooks,
- a checkout SDK for developer integrations,
- and Conflux eSpace smart contract / token interactions for payment settlement.

The typical flow is:

1. merchant or app creates a payment,
2. FluxPay returns a checkout URL,
3. customer opens hosted checkout and pays,
4. backend verifies the payment,
5. webhook is sent to merchant backend,
6. merchant app updates payment state.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm**
- **Git**
- **Conflux Wallet** (Fluent Wallet or MetaMask configured for Conflux eSpace)

### Development Tools (Optional)

- **Hardhat** - For smart contract development
- **Docker** - For containerized development

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Hexdee/fluxpay.git
cd fluxpay
```

### 2. Install Dependencies

```bash
npm install

cd backend
npm install
cd ..

cd contracts
npm install
cd ..
```

### 3. Environment Configuration

Create environment files:

```bash
cp .env.example .env.local
cp backend/.env.example backend/.env
```

Edit the environment files with your configuration.

### 4. Smart Contract Deployment

```bash
cd contracts
npx hardhat compile
# run your deploy command/script as configured in the repo
```

### 5. Start Development Servers

```bash
npm run dev

cd backend
npm run dev
```

Your application should now be running locally.

## 🧪 Testing

### Run Tests

```bash
npm test
cd contracts
npx hardhat test
```

## 📱 Usage

### Getting Started

1. Open the merchant app or demo
2. Create a payment request
3. Generate a checkout link
4. Open the checkout flow
5. Complete payment
6. Observe success / webhook / merchant-side update

### Example Workflow: Merchant checkout

```text
1. Create payment
2. Set amount, reference, and customer details
3. Generate checkout link
4. Send customer to hosted checkout
5. Customer pays
6. Payment gets verified
7. Merchant receives webhook event
```

### Example Workflow: Developer integration

```text
1. Install SDK
2. Configure API key
3. Create payment via API
4. Receive checkout link
5. Redirect customer into checkout
6. Listen for webhook events
```

## 🎬 Demo

### Live Demo

- **URL**: [https://fluxpay-demo.vercel.app](https://fluxpay-demo.vercel.app)

### Demo Video

- **YouTube**: [https://youtu.be/W2RhMIpLA0Q](https://youtu.be/W2RhMIpLA0Q)

### Participant Intro Video

- **YouTube Shorts**: [https://youtube.com/shorts/2qJUD-7528c](https://youtube.com/shorts/2qJUD-7528c)

### Social Post

- **X Post**: [https://x.com/dev_hexdee/status/2046324999586234724?s=20](https://x.com/dev_hexdee/status/2046324999586234724?s=20)

### Additional Submission Link

- **Electric Capital PR**: [https://github.com/electric-capital/open-dev-data/pull/2842](https://github.com/electric-capital/open-dev-data/pull/2842)

## 📄 Smart Contracts

### Deployed Contract

#### Testnet / Deployment reference

| Contract         | Address                                      |
| ---------------- | -------------------------------------------- |
| FluxPay Contract | `0x063999E23Bc8E64D81e8Ac3eF340651d922B72D7` |
| USDT0 Testnet    | `0x4d1beB67e8f0102d5c983c26FDf0b7C6FFF37a0c` |

## 🔧 API Documentation

### Main API concepts

- Create payment
- Generate checkout link
- Verify payment state
- Listen for webhook lifecycle events

### SDK Package

- **npm**: [https://www.npmjs.com/package/fluxpay-checkout-sdk](https://www.npmjs.com/package/fluxpay-checkout-sdk)

## 🔒 Security

### Security Measures

- Server-side payment verification
- Structured payment lifecycle handling
- Merchant webhook-based automation
- Separation between checkout flow and merchant/backend actions

### Current Security Note

This is an MVP / hackathon-stage implementation and would benefit from additional production hardening, expanded validation, and deeper security review before large-scale deployment.

## 🚧 Known Issues & Limitations

### Current Limitations

- MVP scope is focused on Conflux eSpace rather than multi-network support
- Merchant analytics and advanced customization are still limited

### Future Improvements

- Better merchant settings and branding
- More analytics and reporting
- Stronger production hardening
- Improved webhook tooling and retry visibility

## 🗺️ Roadmap

### Phase 1 (Hackathon) ✅

- [x] Hosted checkout flow
- [x] Payment creation flow
- [x] Payment links
- [x] Webhook support
- [x] SDK package
- [x] Live demo deployment

### Phase 2 (Post-Hackathon)

- [ ] Enhanced docs and onboarding
- [ ] Better merchant settings
- [ ] Expanded analytics
- [ ] Security hardening

### Phase 3 (Future)

- [ ] Mainnet growth and merchant pilots
- [ ] More integrations
- [ ] Expanded reporting and admin tools
- [ ] Broader ecosystem partnerships

## 🤝 Contributing

Contributions are welcome.

### Development Process

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

### Conflux Hackathon

- **Conflux Network** - For hosting Global Hackfest 2026
- **Conflux ecosystem** - For creating the environment for builders to ship practical infrastructure

## 📞 Contact & Support

### Project Links

- **GitHub**: [https://github.com/Hexdee/fluxpay](https://github.com/Hexdee/fluxpay)
- **Demo**: [https://fluxpay-demo.vercel.app](https://fluxpay-demo.vercel.app)
- **Backend/API**: [https://fluxpay-7f5a.onrender.com](https://fluxpay-7f5a.onrender.com)
- **SDK**: [https://www.npmjs.com/package/fluxpay-checkout-sdk](https://www.npmjs.com/package/fluxpay-checkout-sdk)

### Support

- **Issues**: [https://github.com/Hexdee/fluxpay/issues](https://github.com/Hexdee/fluxpay/issues)

---

**Built for Global Hackfest 2026**

_Thanks for checking out FluxPay._
