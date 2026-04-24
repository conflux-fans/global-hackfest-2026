# SeamPay

Real-time USDT0 payroll streaming on Conflux eSpace.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Conflux](https://img.shields.io/badge/built%20on-Conflux-blue)](https://confluxnetwork.org)
[![Hackathon](https://img.shields.io/badge/Global%20Hackfest%202026-green)](https://github.com/conflux-fans/global-hackfest-2026)

## Overview

SeamPay is a non-custodial payroll streaming protocol built on Conflux eSpace. Employers deposit USDT0 into a vault contract and set a per-second salary rate for each worker. Workers accrue earnings every second and can withdraw anytime with no intermediary and no minimum amount. It replaces the traditional monthly payroll batch cycle with a continuous, on-chain stream that settles in 3 seconds at fractions of a cent in gas fees.

## Hackathon Information

- **Event**: Global Hackfest 2026
- **Focus Area**: Open Innovation - Build anything you want using Conflux features
- **Team**: SeamPay
- **Submission Date**: 2026-04-20

## Team

| Name | Role | GitHub | Discord |
|------|------|--------|---------|
| [Ayush Chandekar] | Smart Contracts + Backend | [ayu-ch](https://github.com/ayu-ch) | hsuya_ |
| [Nitin Gupta] | Frontend | [@nitininhouse](https://github.com/nitininhouse) | astacode_7777 |

## Problem Statement

Cross-border payroll is broken. A remote worker in Southeast Asia or Latin America working for a company in the US or Europe faces a painful reality every month:

- **3 to 5 day delays** between when work is done and when pay arrives
- **3 to 5% cut** taken by banks, payment processors, and SWIFT intermediaries
- **No visibility** into when money will actually land in their account
- **Currency conversion losses** on top of transfer fees
- **Minimum transfer thresholds** that make small or frequent payments impractical

Traditional payroll systems were designed for a world of local employees, monthly pay cycles, and centralized banks. They are fundamentally incompatible with the global, remote, async nature of modern work.

For workers living paycheck to paycheck, a 5-day delay is not an inconvenience. It is a financial emergency. Blockchain technology solves this by enabling programmable, permissionless, per-second money movement that no bank or processor can block or delay.

## Solution

SeamPay replaces the payroll batch cycle with a continuous stream.

An employer deposits USDT0 into a non-custodial vault contract on Conflux eSpace. They set a per-second salary rate for each worker. From that moment, the worker's balance starts accruing every second, on-chain, transparently. The worker can withdraw what they have earned at any time, with no intermediary, no approval required, and no minimum amount.

There is no payday. There is no cutoff date. The work happens every second, and so does the pay.

**For employers:** fund once, stream indefinitely. Full visibility into vault balance, daily burn rate, runway in days, and every active worker stream on one screen.

**For workers:** your earned balance is always yours. Pull it on day 1, day 7, or let it accumulate. The contract enforces it, not a promise.

## Go-to-Market Plan

**Who is it for:**
SeamPay targets remote-first companies that hire internationally and workers in emerging markets who bear the cost of traditional payroll. Early adopters are crypto-native companies already paying in stablecoins who want more granular, real-time control over payroll.

**How we get users:**
- Direct outreach to crypto companies and DAOs that already use USDT for contractor payments
- Integration with Conflux ecosystem projects looking for payroll infrastructure
- Word of mouth among remote workers in markets where SWIFT delays are most painful

**Metrics we care about:**
- Total Value Locked (TVL) in active vaults
- Number of active worker streams
- Total USDT0 streamed and withdrawn
- Employer retention (recurring deposits)

**Conflux ecosystem fit:**
SeamPay is a primitive that other Conflux applications can build on. Any protocol that needs programmable recurring payments, subscription billing, or vesting can plug into the same StreamVault contract. It brings real-world payroll volume and USDT0 usage to the Conflux eSpace ecosystem.

## Conflux Integration

- [x] **eSpace** - The entire protocol runs on Conflux eSpace. The StreamVault contract is deployed on eSpace testnet and takes advantage of EVM compatibility, 3-second finality, and near-zero gas fees that make per-second micro-settlements economically viable.
- [ ] **Core Space** - Not used in this version
- [ ] **Cross-Space Bridge** - Not used in this version
- [ ] **Gas Sponsorship** - Planned for future version to sponsor worker withdrawal transactions
- [ ] **Built-in Contracts** - Not used in this version
- [ ] **Tree-Graph Consensus** - The fast finality of Tree-Graph is what makes streaming payroll practical at any salary level

### Partner Integrations

- [ ] **Privy** - Planned for future version for embedded wallet onboarding for non-crypto workers
- [ ] **Pyth Network** - Not used in this version
- [x] **LayerZero** - USDT0, the token used for all payroll streams, is bridged to Conflux eSpace via LayerZero's Omnichain Fungible Token standard and backed 1:1 by USDT on Ethereum
- [ ] **Other** - OpenZeppelin contracts for ReentrancyGuard and SafeERC20

## Features

### Core Features
- **Per-second payroll streaming** - Workers accrue USDT0 every second based on a wei-per-second rate set by the employer
- **Non-custodial vault** - Funds are held in a permissionless smart contract, not a company wallet
- **Anytime withdrawal** - Workers pull earned funds whenever they want, no approval needed
- **Stream management** - Employers can start, update, or stop streams; accrued earnings are always preserved
- **Runway visibility** - Employers see exactly how many days of payroll remain at the current burn rate
- **Reclaim unstreamed funds** - Employers can withdraw vault funds not yet allocated to any worker

### Advanced Features
- **Credit snapshotting** - When a stream rate is changed or stopped, earnings under the old rate are snapshotted so workers never lose accrued funds
- **Auto tab selection** - The UI detects whether the connected wallet is the vault owner and defaults to the correct tab automatically
- **Read-only public RPC** - Vault stats load on the landing page and app even before a wallet is connected, using Conflux's public RPC

### Future Features (Roadmap)
- **Gas sponsorship for workers** - Sponsor withdrawal gas so workers with zero CFX can still withdraw
- **Multi-vault support** - Allow one employer to manage multiple vaults for different teams or projects
- **Privy embedded wallets** - Onboard workers who have never used a crypto wallet before
- **CSV bulk stream setup** - Set up streams for dozens of workers from a single file upload
- **Mobile app** - Native iOS and Android app for workers to monitor and withdraw earnings

## Technology Stack

### Frontend
- **Framework**: React 18
- **Build tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Web3 Integration**: ethers.js v6

### Backend
- No dedicated backend. All state lives on-chain. The frontend reads directly from the Conflux eSpace public RPC using a read-only provider, so the app works without a wallet connected.

### Blockchain
- **Network**: Conflux eSpace (testnet chainId 71, mainnet chainId 1030)
- **Smart Contracts**: Solidity 0.8.24
- **Development**: Hardhat
- **Testing**: Hardhat + Mocha
- **Libraries**: OpenZeppelin (ReentrancyGuard, SafeERC20, IERC20)

### Infrastructure
- **Hosting**: Vercel
- **Storage**: On-chain only, no IPFS or external storage

## Architecture

```
+------------------+        +----------------------+
|  SeamPay UI      |        |  Conflux eSpace      |
|  (React + Vite)  +------->+  StreamVault.sol     |
|                  |        |  MockUSDT0.sol        |
|  useWallet.js    |        +----------+-----------+
|  useVault.js     |                   |
+------------------+        +----------+-----------+
         |                  |  USDT0 (LayerZero)   |
         |                  |  backed 1:1 by USDT  |
         |                  |  on Ethereum         |
         v                  +----------------------+
  MetaMask / browser
  wallet (ethers.js v6)
```

The frontend connects directly to the Conflux eSpace RPC. There is no backend server or database. All payroll state (vault balance, stream rates, accrued amounts, worker list) is read directly from the smart contract. Write operations (deposit, setStream, withdraw) are signed by the user's wallet and submitted as on-chain transactions.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **yarn** or **npm**
- **Git**
- **MetaMask** configured for Conflux eSpace testnet

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/seampay.git
cd seampay
```

### 2. Install dependencies

```bash
# Contract and script deps
cd remitstream
yarn install

# Frontend deps
cd frontend
yarn install
```

### 3. Configure environment

```bash
# Root -- for deploying contracts
cp .env.example .env
# Fill in: PRIVATE_KEY

# Frontend -- after deploying
cp frontend/.env.example frontend/.env
# Fill in: VITE_VAULT_ADDRESS, VITE_USDT0_ADDRESS
```

```env
# frontend/.env
VITE_VAULT_ADDRESS=0x43Bf701B987f0FaC72F0a88a7d30fDa12E449636
VITE_USDT0_ADDRESS=0x478F70645367DbEc0B8Dc6e88921B9c602cFf351
VITE_CHAIN_ID=71
```

### 4. Deploy contracts

```bash
cd remitstream

# Testnet
npx hardhat run scripts/deploy.js --network confluxTestnet

# Mainnet
npx hardhat run scripts/deploy.js --network confluxMainnet
```

### 5. Start the frontend

```bash
cd frontend
yarn dev
```

Open [http://localhost:5173](http://localhost:5173).

## Testing

```bash
cd remitstream

# Run all contract tests
npx hardhat test

# With gas report
REPORT_GAS=true npx hardhat test
```

## Usage

### Employer workflow

1. Connect MetaMask on Conflux eSpace testnet
2. The app detects you are the vault owner and opens the Employer tab
3. Enter an amount and click **Approve + Deposit** to fund the vault
4. Paste a worker's wallet address, enter a weekly salary in USDT0, and click **Set stream**
5. Monitor vault balance, daily burn, and runway on the stats cards
6. Stop any stream or reclaim unstreamed funds at any time

### Worker workflow

1. Connect MetaMask on Conflux eSpace testnet
2. The app detects you are not the vault owner and opens the Worker tab
3. Your accrued USDT0 balance is shown on the hero card, updated every 10 seconds from the chain
4. Click **Withdraw** to send your entire accrued balance to your wallet, or enter a custom amount

## Demo

### Live Demo
- **URL**: [https://your-vercel-link.vercel.app](https://your-vercel-link.vercel.app)

### Demo Video
- **YouTube**: [https://youtube.com/watch?v=your-video](https://youtube.com/watch?v=your-video)

## Smart Contracts

### Deployed Contracts

#### Conflux eSpace Testnet (chainId 71)

| Contract | Address | Explorer |
|----------|---------|----------|
| StreamVault | `0x43Bf701B987f0FaC72F0a88a7d30fDa12E449636` | [View on ConfluxScan](https://evmtestnet.confluxscan.io/address/0x43Bf701B987f0FaC72F0a88a7d30fDa12E449636) |
| MockUSDT0 | `0x478F70645367DbEc0B8Dc6e88921B9c602cFf351` | [View on ConfluxScan](https://evmtestnet.confluxscan.io/address/0x478F70645367DbEc0B8Dc6e88921B9c602cFf351) |

### Contract Interface

```solidity
interface IStreamVault {
    function deposit(uint256 amount) external;
    function setStream(address worker, uint256 ratePerSecond) external;
    function stopStream(address worker) external;
    function reclaimUnstreamed(uint256 amount) external;
    function withdraw(uint256 amount) external;
    function accrued(address worker) external view returns (uint256);
    function vaultBalance() external view returns (uint256);
    function runwayDays() external view returns (uint256);
    function getWorkers() external view returns (address[] memory);
    function streams(address) external view returns (
        uint256 ratePerSecond,
        uint256 startTime,
        uint256 credit,
        uint256 withdrawn,
        bool exists
    );
}
```

### Accounting model

```
accrued = credit + (ratePerSecond x elapsed) - withdrawn
```

`credit` snapshots a worker's earnings whenever their stream is updated or stopped. This ensures workers never lose accrued funds when an employer changes a rate or pauses a stream.

## Security

- **ReentrancyGuard** on all functions that transfer tokens
- **SafeERC20** for all token transfers to handle non-standard ERC20 behaviour
- **onlyOwner** modifier on all employer actions
- **Accrual cap** to vault balance so the contract never reports more owed than exists
- The contract has no upgradeability, no proxy, and no admin backdoor. What is deployed is what runs.

### Known limitations
- Single owner model: only one employer address can manage the vault. Multi-sig or DAO-controlled vaults are a future improvement.
- No on-chain worker registry beyond the address list. Worker metadata (name, role) is managed off-chain.
- Contract has not been formally audited. Use on testnet or with small amounts.

## Roadmap

### Phase 1 (Hackathon) - Done
- [x] StreamVault smart contract
- [x] MockUSDT0 for testnet
- [x] Hardhat deploy scripts and tests
- [x] SeamPay frontend with landing page and app
- [x] Employer tab: deposit, set stream, stop stream, reclaim
- [x] Worker tab: view accrued balance, withdraw
- [x] Testnet deployment

### Phase 2 (Post-Hackathon)
- [ ] Gas sponsorship for worker withdrawals
- [ ] Privy embedded wallets for non-crypto workers
- [ ] Formal security audit
- [ ] Mainnet deployment with real USDT0
- [ ] Multi-vault support

### Phase 3 (Future)
- [ ] Mobile app for workers
- [ ] CSV bulk stream setup for employers
- [ ] Analytics dashboard (TVL, streams, volume)
- [ ] SDK for other Conflux protocols to integrate streaming payments

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Conflux Network** - For hosting the hackathon and providing fast, cheap EVM infrastructure
- **LayerZero + Tether** - For USDT0, which makes credible dollar payroll on Conflux possible
- **OpenZeppelin** - For battle-tested smart contract primitives

## Contact and Support

### Project Links
- **GitHub**: [https://github.com/your-username/seampay](https://github.com/your-username/seampay)
- **Demo**: [https://your-vercel-link.vercel.app](https://your-vercel-link.vercel.app)
- **Announcement tweet**: [https://x.com/0xbl4ze/status/2046416961001898469](https://x.com/0xbl4ze/status/2046416961001898469)
- **Electric Capital open-dev-data PR**: [https://github.com/electric-capital/open-dev-data/pull/2856](https://github.com/electric-capital/open-dev-data/pull/2854)

---

**Built for Global Hackfest 2026**
