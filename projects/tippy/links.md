# Tippy.Fun — external links

Fill these in before submitting the PR to `conflux-fans/global-hackfest-2026`.

## Core links

| Resource | URL |
| --- | --- |
| Public GitHub repo | `https://github.com/xElvolution/tippy.fun` |
| Live frontend (Vercel) | `https://tippy-fun.vercel.app` |
| Demo video (3–5 min, YouTube unlisted recommended) | `https://youtu.be/wgjAIGD4dMY` (local fallback: [`./demo/demo-video.mp4`](./demo/demo-video.mp4) — ~187 MB, upload to YouTube before committing) |
| Participant intro video (30–60 s) | `https://youtube.com/shorts/R0P2rQxx7j8` (local: [`./demo/participant-intro.mp4`](./demo/participant-intro.mp4) — ~8.7 MB, safe to commit) |
| Project logo (1:1, ≥500×500 PNG) | `./demo/logo.png` |

## On-chain artifacts

| Artifact | Value |
| --- | --- |
| Network | Conflux eSpace testnet (chainId `71`) |
| `TippyMaker` address | `0x...` |
| `TippyMaker` deploy tx | `0x...` |
| `TestERC20` (USDT0 mock) | `0x...` |
| `TestERC20` (AxCNH mock) | `0x...` |
| ConfluxScan (contract) | `https://evmtestnet.confluxscan.io/address/0x...` |
| Deployment JSON | [`contracts/deployments/confluxEspaceTestnet.json`](../../contracts/deployments/confluxEspaceTestnet.json) |



## Partner integrations

| Partner | How we use it |
| --- | --- |
| Privy | Email / Google / Twitter / wallet connect + embedded wallets + server-side access-token verification on every protected API route. |
| OpenAI | Three-judge panel + AI arbiter. Verdict hash anchored on-chain via `settleWinners` / `payTip`. |
| Supabase | Off-chain storage for submissions, AI verdicts, and an event-indexed campaign cache. RLS on every table; writes go through the service-role key from server-only routes. |

## Tweet template

```
🚀 Submitting Tippy.Fun for Global Hackfest 2026!

Non-custodial bounty + always-on tipping launchpad on Conflux eSpace.
AI judges (OpenAI x3 + arbiter) score submissions, verdict hash lives on-chain,
rewards pay out in CFX / USDT0 / AxCNH — claim-based OR auto-pay.

Repo: https://github.com/xElvolution/tippy.fun
Demo: https://tippy-fun.vercel.app

@ConfluxDevs @ConfluxNetwork #globalhackfest26 #ConfluxHackathon
```

```
