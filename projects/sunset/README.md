# Sunset

## Overview

Sunset is a shielded concentrated-liquidity market maker built for **Conflux eSpace**.

Global Hackfest 2026 submission focus:

- private deposits,
- private swaps,
- private withdrawals,
- shielded LP position management,
- and Bitcoin-wrapper plus stablecoin markets such as `WBTC / USDT0`.

## Hackathon

Global Hackfest 2026 (`2026-03-23` to `2026-04-20`)

## Team

- Team name: `Sunset Protocol`
- Sebastián Salazar (GitHub: [@salazarsebas](https://github.com/salazarsebas), Telegram: `salazarsebas`)
- Kevin Membreño (GitHub: [@KevinMB0220](https://github.com/KevinMB0220))
- Josue Araya (GitHub: [@Josue19-08](https://github.com/Josue19-08))

## Problem Statement

Traditional AMMs and CLMMs expose too much strategy and balance data onchain. Sunset adds a privacy-preserving execution layer so traders and LPs can interact with Conflux DeFi without publishing their full behavior by default.

## Solution

Sunset combines shielded notes, commitments, nullifiers, Merkle-root tracked private state, and concentrated liquidity mechanics so users can deposit, swap, withdraw, and manage liquidity with materially better privacy.

## Go-To-Market Plan

Sunset starts with private BTCfi and stablecoin liquidity on Conflux:

- `WBTC / USDT0`
- `tBTC / USDT0`
- `WBTC / USDC`

The first wedge is privacy for active traders, LPs, and treasury operators who need better execution privacy than public AMMs provide.

Primary distribution channels:

- Conflux ecosystem channels,
- hackathon exposure,
- BTCfi and privacy-native communities,
- and ecosystem partnerships after launch.

## Conflux Integration

- built for `Conflux eSpace`
- Solidity deployment pipeline configured for Conflux
- frontend runtime configured for Conflux wallets and RPC
- market thesis built around BTCfi and `USDT0`

- [ ] Core Space
- [x] eSpace
- [ ] Cross-Space Bridge
- [ ] Gas Sponsorship
- [ ] Built-in Contracts
- [ ] Partner Integrations (Privy / Pyth / LayerZero)

## Features

- shielded deposits and withdrawals
- private swap execution
- shielded liquidity position management
- Conflux-oriented deployment and runtime configuration
- BTCfi and `USDT0`-oriented market thesis

## Technology Stack

- Frontend: React, TypeScript, Vite
- Backend: Rust
- Blockchain: Conflux eSpace
- Smart Contracts: Solidity
- Zero-Knowledge Stack: Circom, proving scripts, Merkle/commitment/nullifier flows
- Other: Bun, Ethers, React Query, Zustand

## Setup Instructions

### Prerequisites

- Node.js `18+`
- Bun
- Rust / Cargo
- Git
- Conflux-compatible wallet

### Installation

1. Clone the repository

```bash
git clone https://github.com/SunsetLabs-Game/Sunset-Protocol
cd Sunset-Protocol
```

2. Install dependencies

```bash
bun install
```

3. Configure environment

```bash
cp .env.example .env.local
```

4. Validate Conflux configuration

```bash
bun run env:sync
bun run check:conflux
```

5. Run the frontend

```bash
bun run dev:frontend
```

### Testing

```bash
bun run build:sdk
bun run typecheck
bun run test:sdk
```

## Usage

Suggested user flow:

1. Connect a Conflux-compatible wallet.
2. Configure or load the target Conflux environment.
3. Deposit into a shielded balance.
4. Execute a shielded swap in a supported market.
5. Inspect positions, balances, and protocol state in the app.

## Demo

- Live Demo: not provided
- Demo Video: not provided
- Screenshots: see `demo/`

Judges should evaluate the project through the public repository, screenshots, deployed contract addresses, and local setup flow documented above.

## Judge Instructions

For this submission, the recommended review path is:

1. Inspect the repository and architecture documentation.
2. Verify the deployed contract addresses on Conflux eSpace.
3. Run the project locally using the setup instructions in this README.
4. Review the protocol flows and frontend screens included in the repository.

## Architecture

Sunset has four layers:

- `frontend/` for the user interface,
- `sdk/` for client logic and note handling,
- `asp/` for proof orchestration and relay flows,
- `contracts/solidity/` for the protocol contracts.

## Smart Contracts

- SunsetVerifierCoordinator: `0xdB5ceE120dc582FB7951ABBe2850Dd6Ae8a8182c`
- SunsetPoolFactory: `0xf3e64B8FbFB31Fc3F77789b43A28B23E170b5fbe`
- SunsetRangePool: `0xf15DBD8216F5EFfD790EEfE2ae391DeD634d99d4`
- Deploy Wallet: `0x65D6352004da8F9aBFe54E937Cde76cc85B52bdc`

## Future Improvements

- production deployment hardening,
- broader liquidity support,
- AI-assisted strategy tooling,
- additional audits and reliability work.

## License

MIT

## Acknowledgments

- Conflux Network
- Global Hackfest 2026 organizers
- Open-source libraries and tooling used by the project
