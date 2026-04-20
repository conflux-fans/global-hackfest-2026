# VeilPay Video Demonstration

### Demo Video URL
(Coming Soon)

### Script Overview

1.  **Identity Registration**: Showcasing how users register their stealth meta-address on the Conflux eSpace Testnet via the `StealthRegistry` contract.
2.  **Shielded Payments**: Demonstrating a peer-to-peer transfer using a one-time stealth address, where the transaction is announced via the `StealthAnnouncer`.
3.  **The Privacy Scan**: Viewing the recipient side, where the app scans the indexed announcements in Convex to identify and claim the private payment.
4.  **ZK Dark Pool Trade**: Submitting a private limit order. Explaining how **Noir ZK-SNARKs** generate a proof of trade validity without exposing the price or amount.
5.  **AI Privacy Diagnostic**: Reviewing the "Anonymity Score" provided by the AI agent, which helps users maintain optimal privacy habits on-chain.
6.  **Micro-Investment Round-Up**: Showing how public spending gaps are automatically shielded and invested into the yield-bearing privacy vault.

### Technical Highlights
- **Gasless Operations**: All stealth announcements and vault deposits are sponsored via Conflux Fee Sponsorship.
- **Privacy Model**: EIP-5564 Stealth Addresses + UltraPlonk ZK Verifier.
- **Speed**: Sub-second trade discovery via the custom WebSocket indexer.
