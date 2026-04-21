# ConfluxKit

The complete developer toolkit for Conflux eSpace — MCP server, webhook relay, SDK, and scaffolding in one install.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Conflux](https://img.shields.io/badge/built%20on-Conflux-blue)](https://confluxnetwork.org)
[![Hackathon](https://img.shields.io/badge/Global%20Hackfest%202026-green)](https://github.com/conflux-fans/global-hackfest-2026)

## Overview

ConfluxKit solves the three biggest friction points for Conflux eSpace builders: AI coding tools have zero awareness of Conflux contracts and patterns, on-chain events cannot reach off-chain systems without custom infrastructure, and every new project re-solves the same Gas Sponsorship, chain config, and protocol integration boilerplate.

ConfluxKit ships four composable layers — an MCP server (the first in any Web3 ecosystem), a webhook relay, a TypeScript SDK with React hooks, and a CLI scaffold — all in one npm install.

## Hackathon Information

- **Event**: Global Hackfest 2026
- **Focus Area**: Developer Tooling + AI + Conflux
- **Prize Targets**: Main Award ($1,500) + Best Developer Tool ($500) + Best AI + Conflux ($500)
- **Bounty Alignment**: Bounty 04 (MCP Server) + Bounty 05 (Webhook Relay)
- **Submission Date**: 2026-04-20

## Team

| Name | Role | GitHub | Discord |
|------|------|--------|---------|
| Nosakhare Jesuorobo | Lead Developer | [@Najnomics](https://github.com/Najnomics) | najnomics |

## Problem Statement

**Building on Conflux eSpace is dramatically harder than it should be.**

1. **AI coding tools are blind to Conflux.** Claude Code, Cursor, and every AI coding assistant hallucinate addresses and miss Gas Sponsorship entirely. No MCP server exists for Conflux — developers are on their own.

2. **On-chain events cannot reach off-chain systems.** Every dApp that needs event notifications rebuilds subscription infrastructure from scratch. There is no shared webhook relay.

3. **Gas Sponsorship has no SDK.** Conflux's `SponsorWhitelistControl` built-in is the most powerful UX primitive in the ecosystem, but it has no typed interface or React hooks. Most teams skip it.

4. **Every project rebuilds the same scaffold.** Correct chain configs, verified protocol addresses, Hardhat/Foundry setup — every team solves these identically, independently, often incorrectly.

## Solution

**4 composable layers, one npm install:**

- **Layer 1 — MCP Server** (`@confluxkit/mcp`): 8 AI-native tool calls that give Claude Code and Cursor full Conflux awareness. Verified addresses, ABIs, Gas Sponsorship scripts, Pyth feed IDs, project scaffolding, deploy scripts, and pattern explanations.

- **Layer 2 — Webhook Relay** (`@confluxkit/webhook`): Zero-infrastructure event relay. Configure subscriptions in `conflux-hooks.json`, run `npx conflux-relay start`, events flow to Telegram, Discord, Slack, HTTP webhooks, or email.

- **Layer 3 — SDK + React Hooks** (`@confluxkit/sdk`, `@confluxkit/react`): Typed TypeScript clients for Gas Sponsorship, dForce, SHUI, AxCNH, USDT0. Six React hooks: `useGasSponsor`, `useAxCNH`, `useDForce`, `useSFX`, `usePythPrice`, `useConfluxNetwork`.

- **Layer 4 — CLI Scaffold** (`create-conflux-app`): One command generates a complete project with correct chain configs, verified addresses, MCP config, webhook config, and working deploy scripts. 4 templates: Hardhat, Foundry, fullstack (Next.js), AI agent.

## Go-to-Market Plan

### Target Users

- **Primary**: Every developer in Global Hackfest 2026 — ConfluxKit is the tooling layer underneath every other submission
- **Secondary**: Conflux Ecosystem Grant recipients who need to build on eSpace quickly and correctly
- **Tertiary**: AI-first developers using Claude Code and Cursor who want to build on Conflux

### Distribution Strategy

- **Phase 1 (Now)**: All packages on npm. MCP server live. Demo and docs complete.
- **Phase 2 (Month 1-2)**: Apply for Conflux Ecosystem Grant. Submit MCP server to official MCP registry. Publish "Build on Conflux with Claude Code in 5 minutes" tutorial.
- **Phase 3 (Month 3-6)**: Official Conflux recommended toolkit. Target 1,000 npm downloads/month.

### Key Metrics

| Metric | 30-Day Target | 90-Day Target |
| --- | --- | --- |
| npm installs | 100 | 1,000 |
| MCP server active connections | 20 | 200 |
| GitHub stars | 30 | 150 |
| Projects built using ConfluxKit | 5 | 30 |

## Conflux Integration

- [x] **eSpace** — All SDK clients, React hooks, and scaffold templates target Conflux eSpace. MCP server exposes eSpace mainnet (Chain ID: 1030) and testnet (Chain ID: 71). Webhook relay handles eSpace event subscription natively.
- [x] **Gas Sponsorship** — `SponsorWhitelistControl` at `0x0888000000000000000000000000000000000001` is the most prominent feature in the SDK. The MCP server's `get_gas_sponsorship_setup()` tool call turns a 2-day integration into a 5-minute one. `useGasSponsor()` React hook and `SponsorManagerClient` TypeScript class built around this built-in.
- [x] **Built-in Contracts** — Deep integration with `SponsorWhitelistControl` (`0x0888...0001`) and `Staking` (`0x0888...0002`).
- [x] **Tree-Graph Consensus** — Webhook relay deduplicates events by txHash+logIndex to prevent duplicate delivery from uncle blocks.

### Partner Integrations

- [x] **Pyth Network** — `get_pyth_feed_id()` MCP tool with verified feed IDs (CFX/USD, USDT/USD, AxCNH/CNH, ETH/USD, BTC/USD). `usePythPrice()` React hook for real-time oracle prices.
- [x] **dForce Unitus** — Full ABI and address via MCP server. `DForceClient` and `useDForce()` hook.
- [x] **SHUI Finance** — Staking ABI and address via MCP server. `SHUIClient` and `useSFX()` hook.

## Features

### Core Features

- **MCP server with 8 tool calls** — Full Conflux eSpace developer context for AI coding tools
- **Zero-config webhook relay** — On-chain events to Telegram, Discord, Slack, HTTP, Email
- **`create-conflux-app` CLI** — 4 templates, 3 minutes to running testnet project
- **`useGasSponsor()` React hook** — Gas Sponsorship as a single import
- **`SponsorManagerClient`** — Typed Gas Sponsorship: `fund()`, `addToWhitelist()`, `getRunway()`, `getSponsorInfo()`
- **Typed SDK for all major protocols** — DForceClient, SHUIClient, TokenClient (AxCNH, USDT0)

### Future Features

- **Wagmi v2 + TanStack Query** — Rewrite hooks with wagmi patterns
- **GeckoTerminal DEX integration** — `useDEXPool()` hook for live DEX data
- **Redis-backed persistent queue** — Production-grade webhook delivery
- **Core Space MCP tools** — Extend MCP server for dual-space development

## Technology Stack

### Packages

- **MCP Server**: Node.js 20, TypeScript, `@modelcontextprotocol/sdk`
- **Webhook Relay**: Node.js 20, TypeScript, `ethers.js` v6, `axios`
- **SDK**: TypeScript 5, `ethers.js` v6
- **React Hooks**: React 18, `ethers.js` v6
- **CLI**: Node.js 20, Commander.js, Inquirer.js, fs-extra

### Blockchain

- **Network**: Conflux eSpace (mainnet + testnet)
- **Smart Contracts**: Solidity (example contracts in scaffold templates)
- **Development**: Hardhat + Foundry templates
- **Testing**: Jest (91 tests across 5 packages)

## Architecture

```text
AI Coding Tools (Claude Code, Cursor)
         | MCP protocol (stdio)
         v
    @confluxkit/mcp ---- Address Registry (JSON)
                         ABI Registry
                         Pattern Library

Conflux eSpace contracts emit events
         | ethers.js subscription
         v
    @confluxkit/webhook -- Telegram / Discord / Slack / HTTP / Email
                           txHash+logIndex deduplication
                           Exponential backoff retry

Developers build dApps
         |
         v
    @confluxkit/sdk ------- SponsorManagerClient, DForceClient
    @confluxkit/react       SHUIClient, TokenClient
    create-conflux-app      6 React hooks, 4 templates
```

## Installation & Setup

### Quick Start

```bash
git clone https://github.com/Najnomics/confluxkit
cd confluxkit
npm install
npm run build
npm test        # 91 tests pass
npm run demo    # interactive terminal demo
```

### Use in Your Project

```bash
npx create-conflux-app my-dapp --template hardhat
```

Or add individual packages:

```bash
npm install @confluxkit/sdk @confluxkit/react @confluxkit/mcp @confluxkit/webhook
```

## Testing

```bash
npm test        # all 91 tests
npm run demo    # interactive demo against live testnet
```

| Package | Tests |
| --- | --- |
| @confluxkit/sdk | 12 pass |
| @confluxkit/mcp | 32 pass |
| @confluxkit/react | 14 pass |
| @confluxkit/webhook | 17 pass |
| create-conflux-app | 16 pass |

## Demo

- **Demo Video**: [YouTube — ConfluxKit Demo](https://youtu.be/U6P8lNzqEAU)
- **Slides**: [ConfluxKit Presentation](https://gamma.app/docs/The-complete-developer-toolkit-for-Conflux-eSpace-291yo4443bqhmb6)
- **Terminal Demo**: `npm run demo` (runs against live Conflux eSpace testnet)
- **Tweet**: [Announcement](https://x.com/CNaj_xyz/status/2046434191819108692)

## Source Code

Full source code at: [github.com/Najnomics/confluxkit](https://github.com/Najnomics/confluxkit)

## License

This project is licensed under the MIT License.

## Acknowledgments

- **Conflux Network** — For Gas Sponsorship, Staking built-ins, and Bounty 04/05 which directly inspired ConfluxKit
- **Anthropic / MCP team** — For the Model Context Protocol SDK
- **dForce, SHUI Finance, Pyth Network** — For the DeFi protocols ConfluxKit wraps
- **cfxdevkit maintainers** — For the foundation ConfluxKit builds on top of
- **ConfluxBox team (SummerHackfest 2025)** — For proving developer tooling wins prizes on Conflux

## Contact

- **GitHub**: [@Najnomics](https://github.com/Najnomics)
- **Discord**: najnomics
- **Twitter/X**: [@CNaj_xyz](https://x.com/CNaj_xyz)

---

**Built for Global Hackfest 2026**
