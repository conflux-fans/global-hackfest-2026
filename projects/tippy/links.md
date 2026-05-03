# Tippy.Fun — external links

Fill these in before submitting the PR to `conflux-fans/global-hackfest-2026`.

## Core links

| Resource | URL |
| --- | --- |
| Public GitHub repo | `https://github.com/xElvolution/tippy.fun` |
| Live frontend (Vercel) | `https://tippy-fun.vercel.app` |
| Demo video (3–5 min, YouTube unlisted recommended) | `https://youtu.be/wgjAIGD4dMY` (local fallback: [`./demo/demo-video.mp4`](./demo/demo-video.mp4) — ~187 MB, upload to YouTube before committing) |
| Hackathon winner showcase video (was published after win) | `https://youtu.be/dp_lun-oi2c` |
| Participant intro video (30–60 s) | `https://youtube.com/shorts/R0P2rQxx7j8` (local: [`./demo/participant-intro.mp4`](./demo/participant-intro.mp4) — ~8.7 MB, safe to commit) |
| Project logo (1:1, ≥500×500 PNG) | `./demo/logo.png` |

## On-chain artifacts

| Artifact | Value |
| --- | --- |
| Network | Conflux eSpace testnet (chainId `71`) |
| Deployer address | `0x6E6Aa0AcC394666F38f0C90656eC31e63443D179` |
| `TippyMaker` address | `0x4874b94074a16dA564766D25beC3251C0156265d` |
| `TippyMaker` deploy tx | `0x9beb1bf8d218d81f63cd5e1ecf240333cdd72eb053b90bd513f69fa01aa7ccf5` |
| `TestERC20` tUSDT0 (USDT0 mock) | `0x9a70e007447Fe6d787518Dc7E84DC39A4A302Bea` |
| `TestERC20` tAxCNH (AxCNH mock) | `0x1A8678833C4b2A849F0edE21964A14D29c18B49a` |
| ConfluxScan — contract | https://evmtestnet.confluxscan.io/address/0x4874b94074a16dA564766D25beC3251C0156265d |
| ConfluxScan — deploy tx | https://evmtestnet.confluxscan.io/tx/0x9beb1bf8d218d81f63cd5e1ecf240333cdd72eb053b90bd513f69fa01aa7ccf5 |
| Deployment JSON | [`contracts/deployments/confluxEspaceTestnet.json`](../../contracts/deployments/confluxEspaceTestnet.json) |

## Ecosystem-required links

| Item | URL |
| --- | --- |
| Social post — Twitter / X | https://x.com/i/status/2046373464873803780 |
| Electric Capital PR | https://github.com/electric-capital/open-dev-data/pull/2853 |
| Grant proposal on Conflux Forum | `https://forum.conflux.fun/t/grant-proposal-for-tippy-fun/23587` 

## Partner integrations

| Partner | How we use it |
| --- | --- |
| Privy | Email / Google / Twitter / wallet connect + embedded wallets + server-side access-token verification on every protected API route. |
| OpenAI | Three-judge panel + AI arbiter. Verdict hash anchored on-chain via `settleWinners` / `payTip`. |
| Supabase | Off-chain storage for submissions, AI verdicts, and an event-indexed campaign cache. RLS on every table; writes go through the service-role key from server-only routes. |

## Social post — published

Live tweet: **https://x.com/i/status/2046373464873803780**
(drafts for replies / reposts live in [`social.md`](./social.md))
