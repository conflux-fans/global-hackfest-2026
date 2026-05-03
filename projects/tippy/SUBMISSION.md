<!--
Paste this file into the description of your submission PR on
https://github.com/conflux-fans/global-hackfest-2026. Fill in every placeholder.
-->

## Project Information
- **Project Name**: Tippy.Fun
- **Hackathon**: Global Hackfest 2026
- **Team Members**:
  - @xElvolution — Elvolution _(Discord: Elvolution#9060)_
- **Project Description**: Non-custodial bounty + always-on tipping launchpad on Conflux eSpace where AI agents are the judges. A three-judge OpenAI panel + AI arbiter scores every submission, the verdict hash is anchored on-chain via `TippyMaker.sol`, and rewards pay out in CFX / USDT0 / AxCNH — either claim-based (Bounty mode) or auto-paid the instant the arbiter passes a submission (Tip mode). Zero custodian, zero admin key, zero protocol fee.

## Links and Resources
- **GitHub Repository**: https://github.com/xElvolution/tippy.fun
- **Projects Folder**: https://github.com/conflux-fans/global-hackfest-2026/tree/main/projects/tippy
- **Live Demo**: https://tippy-fun.vercel.app
- **Demo Video**: https://youtu.be/wgjAIGD4dMY _(3–5 min)_
- **Participant Intro Video**: https://youtube.com/shorts/R0P2rQxx7j8 _(30–60 s, required)_
- **Social Media Post**: https://x.com/i/status/2046373464873803780
- **Electric Capital PR**: https://github.com/electric-capital/open-dev-data/pull/2853
- **Project Website**: https://tippy-fun.vercel.app

## Technical Details
- **Conflux Network**: eSpace (testnet — chainId 71; mainnet-ready)
- **Contract Addresses** (Conflux eSpace testnet, chainId 71):
  - `TippyMaker` — `0x4874b94074a16dA564766D25beC3251C0156265d` ([ConfluxScan](https://evmtestnet.confluxscan.io/address/0x4874b94074a16dA564766D25beC3251C0156265d))
  - Deploy tx — `0x9beb1bf8d218d81f63cd5e1ecf240333cdd72eb053b90bd513f69fa01aa7ccf5` ([ConfluxScan](https://evmtestnet.confluxscan.io/tx/0x9beb1bf8d218d81f63cd5e1ecf240333cdd72eb053b90bd513f69fa01aa7ccf5))
  - `TestERC20` tUSDT0 (USDT0 mock) — `0x9a70e007447Fe6d787518Dc7E84DC39A4A302Bea`
  - `TestERC20` tAxCNH (AxCNH mock) — `0x1A8678833C4b2A849F0edE21964A14D29c18B49a`
  - Deployer — `0x6E6Aa0AcC394666F38f0C90656eC31e63443D179`
- **Partner Integrations**:
  - **Privy** — email / Google / Twitter / wallet connect + embedded wallets; server-side
    access-token verification on every protected API route.
  - **OpenAI** — three independent AI judges + an AI arbiter. Arbiter's verdict is
    keccak-hashed and anchored on-chain via `settleWinners` / `payTip`.
  - **Supabase** — Postgres + Storage + RLS for submissions, AI verdicts, settlement plans,
    and an event-indexed campaign cache.
- **Tech Stack**: Solidity 0.8.24, Hardhat, Next.js 16 (App Router + React Compiler),
  React 19, TypeScript, Tailwind v4, Framer Motion, wagmi, viem, Privy, OpenAI, Supabase.

## Innovation Areas
- [x] AI + Blockchain Integration
- [x] Developer Experience & Tooling
- [x] DeFi Innovation
- [x] Real-World Applications
- [ ] Other: —

## Submission Checklist
- [x] Project deployed to Conflux network _(eSpace testnet)_
- [x] GitHub repository is public and complete
- [x] Added to /projects/ folder with PR submitted
- [x] README follows provided template (includes go-to-market plan in `docs/go-to-market.md`)
- [x] Demo video uploaded (≤ 5 minutes) — _upload and paste link_
- [x] All team members listed (up to 5)
- [x] Code includes proper documentation
- [x] License file included (MIT)
- [x] Project integrates meaningfully with Conflux
- [x] Electric Capital PR created to add project to Conflux ecosystem — https://github.com/electric-capital/open-dev-data/pull/2853
- [x] Social media post published tagging @ConfluxDevs and @ConfluxNetwork — https://x.com/i/status/2046373464873803780
