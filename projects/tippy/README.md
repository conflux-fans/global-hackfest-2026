# Tippy.Fun

> **Non-custodial bounties and always-on tipping, judged by AI, settled on Conflux eSpace.**

Tippy.Fun is a launchpad where the **judges are AI agents** and the prize
escrow lives on-chain. Organizers create a campaign in two clicks, pick the prize token
(CFX / USDT0 / AxCNH), write an AI rubric, and participants submit work from the site. A panel
of three OpenAI judges plus an AI arbiter scores every entry; the arbiter's verdict hash is
written on-chain via `TippyMaker.sol`, and rewards are either claimable by winners (Bounty
mode) or auto-paid the moment the arbiter says pass (Tip mode).

No custodian, no admin key, no protocol fee. Audit trail lives on Conflux eSpace.

## Team


- Elvolution — GitHub `@xElvolution` — Discord `Elvolution#9060`

## Hackathon

**Global Hackfest 2026** on [Conflux](https://confluxnetwork.org)
(2026-03-23 → 2026-04-20).

Targeting: **Best AI + Conflux**, **Best Developer Tool**, **Best DeFi Project** (non-custodial
escrow), **Best USDT0 Integration**, **Best AxCNH Integration**, and the **Privy** partner
integration prize.

**Winner demo (YouTube):** [https://youtu.be/dp_lun-oi2c](https://youtu.be/dp_lun-oi2c) - showcase video for Global Hackfest 2026.

## Two modes, one contract

| Mode | Flow | Payout |
| --- | --- | --- |
| **Bounty / Hackathon** (claim-based) | AI panel ranks submissions → organizer publishes winners → winners claim before deadline → unclaimed funds return to organizer. | `settleWinners` + `claim` + `reclaimUnclaimed` |
| **Tip / Always-on** (auto-pay) | Rolling submissions → AI arbiter decides pass/fail → contract transfers prize instantly. | `payTip` |

Both modes share the same AI pipeline, the same on-chain audit surface, and the same
`TippyMaker.sol` contract.

## AI judging pipeline

1. Organizer sets **criteria** and picks a **judge panel** (v1 = 3 OpenAI models with distinct
   personas: strict technical reviewer, creative reviewer, rubric-follower).
2. `/api/judging/run` dispatches each submission to every judge concurrently. Each verdict
   (score 0-100 + rationale) is stored in Supabase.
3. An **AI arbiter** (OpenAI `gpt-4o`) receives all verdicts, produces the final aggregated
   score, pass/fail decision, and arbiter rationale.
4. The arbiter blob is canonicalised and `keccak256`-hashed. That digest becomes the
   `verdictHash` on `settleWinners` / `payTip`, and lands on every `WinnerSettled` /
   `TipPaid` event.
5. Full rationales stay in Supabase (human-readable audit); only the digest goes on-chain
   (cheap, tamper-evident). Anyone can re-run the hash and verify the AI output didn't move.

## Conflux integration

- **Space**: Conflux eSpace. Mainnet chainId `1030`, testnet chainId `71`.
- **Contract**: [`contracts/contracts/TippyMaker.sol`](../../contracts/contracts/TippyMaker.sol).
- **Native CFX**: prize pools in CFX with zero extra config.
- **ERC-20 prizes**: USDT0 and AxCNH are first-class tokens in the create flow (targets the
  _Best USDT0_ and _Best AxCNH_ category prizes). Mock `TestERC20` contracts deploy on
  testnet alongside `TippyMaker` so the full flow is reviewable without real tokens.
- **Privy** for auth + embedded wallets (server-side verification of the access token before
  any Supabase write, client-side connect with email / Google / Twitter / external wallet).
- **Explorer**: every payout / tip / verdict deep-links to `evm.confluxscan.io` in the UI.

## Live deployment

| Artifact | Value |
| --- | --- |
| Network | Conflux eSpace testnet (chainId `71`) |
| Deployer | [`0x6E6Aa0AcC394666F38f0C90656eC31e63443D179`](https://evmtestnet.confluxscan.io/address/0x6E6Aa0AcC394666F38f0C90656eC31e63443D179) |
| `TippyMaker` contract | [`0x4874b94074a16dA564766D25beC3251C0156265d`](https://evmtestnet.confluxscan.io/address/0x4874b94074a16dA564766D25beC3251C0156265d) |
| Deployment tx | [`0x9beb1bf8d218d81f63cd5e1ecf240333cdd72eb053b90bd513f69fa01aa7ccf5`](https://evmtestnet.confluxscan.io/tx/0x9beb1bf8d218d81f63cd5e1ecf240333cdd72eb053b90bd513f69fa01aa7ccf5) |
| `TestERC20` — tUSDT0 (USDT0 mock) | [`0x9a70e007447Fe6d787518Dc7E84DC39A4A302Bea`](https://evmtestnet.confluxscan.io/address/0x9a70e007447Fe6d787518Dc7E84DC39A4A302Bea) |
| `TestERC20` — tAxCNH (AxCNH mock) | [`0x1A8678833C4b2A849F0edE21964A14D29c18B49a`](https://evmtestnet.confluxscan.io/address/0x1A8678833C4b2A849F0edE21964A14D29c18B49a) |
| Live frontend | https://tippy-fun.vercel.app |

Exact values are also written to `contracts/deployments/confluxEspaceTestnet.json` and
printed by the deploy script.

## Tech stack

- **Frontend**: Next.js 16 (App Router, React 19, React Compiler), Tailwind v4, Framer Motion.
- **Auth / wallets**: Privy + wagmi + viem.
- **Contracts**: Solidity `0.8.24`, Hardhat, `@nomicfoundation/hardhat-toolbox`, `viaIR`.
- **Blockchain**: Conflux eSpace (mainnet `1030`, testnet `71`).
- **Data / AI**: Supabase (Postgres + Storage + RLS), OpenAI (`gpt-4o`, `gpt-4o-mini`).
- **Testing**: Hardhat + Chai.

## Repository layout

```
tippy-fun/
├── contracts/
│   ├── contracts/TippyMaker.sol     # the non-custodial registry
│   ├── contracts/mocks/TestERC20.sol
│   ├── test/TippyMaker.test.ts
│   └── scripts/deploy.ts
├── web/
│   ├── src/app/**                   # Next.js 16 App Router
│   ├── src/app/api/judging/run/     # AI judging orchestrator
│   ├── src/app/api/submissions/
│   ├── src/app/api/indexer/
│   ├── src/lib/ai/openaiJudge.ts    # OpenAI judge + arbiter
│   ├── src/hooks/useTippyCampaigns.ts
│   └── supabase/migrations/0001_init.sql
├── docs/go-to-market.md             # GTM plan (required by rules)
└── projects/tippy/                  # this folder — hackathon submission bundle
```

## Run it locally

```bash
pnpm -C contracts install && pnpm -C web install
cp contracts/.env.example contracts/.env
cp web/.env.example web/.env.local

pnpm -C contracts test
pnpm -C contracts deploy:testnet     # prints .env values to paste into web/.env.local
pnpm -C web dev
```

Open <http://localhost:3000>, hit **Connect wallet** (Privy), **Create campaign**, pick a mode
and token, submit work, and run AI judging.

## Innovation areas checked

- [x] **AI + Blockchain integration** — multi-judge AI panel with on-chain verdict hash.
- [x] **Developer Experience & Tooling** — reference implementation for non-custodial bounties.
- [x] **DeFi innovation** — dual-mode escrow (claim-based + auto-pay) with ERC-20 support.
- [x] **Real-World Applications** — bounty platforms / content tipping / hackathon ops.

## Screenshots

High-res stills for every screen in the app live in
[`demo/screenshots/`](./demo/screenshots/) — see the
[index](./demo/screenshots/README.md). A quick tour:

| Flow | Screenshot |
| --- | --- |
| Landing / connect | [`01-landing.png`](./demo/screenshots/01-landing.png) |
| Create campaign (mode, token, AI rubric) | [`03-create-campaign-wizard.png`](./demo/screenshots/03-create-campaign-wizard.png) |
| AI judging panel + verdict hash | [`04-campaign-detail-judging-audit.png`](./demo/screenshots/04-campaign-detail-judging-audit.png) |
| Public campaign (tip + submit) | [`06-public-campaign-page.png`](./demo/screenshots/06-public-campaign-page.png) |
| Payout portal (claim / auto-pay) | [`08-payout-portal.png`](./demo/screenshots/08-payout-portal.png) |
| On-chain audit ledger | [`09-treasury-tx-history.png`](./demo/screenshots/09-treasury-tx-history.png) |

## Links

See [`links.md`](./links.md) for repo, demo, video, Electric Capital PR, and social post.
The submission PR body should use [`SUBMISSION.md`](./SUBMISSION.md) as the template.

## License

MIT — see [`../../LICENSE`](../../LICENSE).
