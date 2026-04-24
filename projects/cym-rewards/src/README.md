# Source code

CYM Rewards source lives in a separate repository to keep the hackfest submission folder lean and to preserve the project's independent deployment + issue history.

**Canonical source repo:** https://github.com/intrepidcanadian/cymstudios

The repo is tracked under the Conflux ecosystem in Electric Capital's [Open Dev Data](https://github.com/electric-capital/open-dev-data) taxonomy (PR [#2836](https://github.com/electric-capital/open-dev-data/pull/2836)).

## Key files for judges

| Path | Purpose |
|---|---|
| [`app/api/mcp/rewards/route.ts`](https://github.com/intrepidcanadian/cymstudios/blob/main/app/api/mcp/rewards/route.ts) | Native MCP JSON-RPC 2.0 server — 12 tools including agent-initiated x402 purchase |
| [`app/api/purchase/route.ts`](https://github.com/intrepidcanadian/cymstudios/blob/main/app/api/purchase/route.ts) | x402 settlement endpoint — EIP-3009 `transferWithAuthorization` on Conflux eSpace / Ethereum |
| [`config/networks.ts`](https://github.com/intrepidcanadian/cymstudios/blob/main/config/networks.ts) | Conflux eSpace + Ethereum network configs; facilitator addresses |
| [`lib/x402-client.ts`](https://github.com/intrepidcanadian/cymstudios/blob/main/lib/x402-client.ts) | Client-side EIP-3009 signing helpers |
| [`lib/x402-server.ts`](https://github.com/intrepidcanadian/cymstudios/blob/main/lib/x402-server.ts) | Facilitator-side settlement flow |
| [`app/chat/`](https://github.com/intrepidcanadian/cymstudios/tree/main/app/chat) | Kimi-powered chat concierge that uses the MCP |
| [`app/agents/page.tsx`](https://github.com/intrepidcanadian/cymstudios/blob/main/app/agents/page.tsx) | Public MCP integration guide (rendered at cymstudio.app/agents) |
| [`public/.well-known/gift-cards/agent-registration.json`](https://github.com/intrepidcanadian/cymstudios/blob/main/public/.well-known/gift-cards/agent-registration.json) | ERC-8004 registration document |

## License

MIT — see the [LICENSE](https://github.com/intrepidcanadian/cymstudios/blob/main/LICENSE) in the source repo.
