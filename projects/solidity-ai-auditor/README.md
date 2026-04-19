# Solidity AI Auditor

AI-assisted Solidity smart contract auditing with a lightweight web UI and a FastAPI analysis backend.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/PerhapsMeta/SolidityAIAuditor/blob/main/LICENSE)
[![Conflux](https://img.shields.io/badge/built%20for-Conflux%20Hackathon-blue)](https://confluxnetwork.org)
[![Hackathon](https://img.shields.io/badge/Global%20Hackfest%202026-prototype-green)](https://github.com/conflux-fans/global-hackfest-2026)

## Overview

Solidity AI Auditor is a web-based vulnerability detector for reviewing Solidity smart contracts. Users upload a `.sol` file in the frontend, and the backend combines deterministic rule-based checks with an OpenAI structured-output audit pass to generate a concise security report.

The project is designed as a practical prototype: fast to run locally, easy to demo, and focused on high-signal findings such as `delegatecall`, `tx.origin`, unsafe low-level calls, timestamp dependence, unchecked arithmetic, and outdated Solidity compiler targets.

## Hackathon Information

- **Event**: Global Hackfest 2026
- **Focus Area**: Open Innovation
- **Team**: SafeByte
- **Submission Date**: 2026-04-19

## Team

| Name | Role | GitHub | Discord |
|------|------|--------|---------|
| L.yu | Product / Frontend | [@L19711221-debug](https://github.com/L19711221-debug) | TBD |
| Lynn | Backend / AI | [@PerhapsMeta](https://github.com/PerhapsMeta) | TBD |

## Problem Statement

Smart contract security reviews are expensive, slow, and often inaccessible to solo builders, hackathon teams, and early-stage protocol developers. Many teams ship experimental Solidity code without any structured security pass, which increases the risk of avoidable issues reaching testnet or production.

## Solution

Solidity AI Auditor provides a two-layer audit flow:

- deterministic rule-based scanning for common risky Solidity patterns
- OpenAI-powered structured review for higher-level issue detection
- merged audit output with contract name, severity, issue list, summary, and metadata

This makes the tool lightweight enough for demos and early development while still surfacing actionable security findings.

## Go-to-Market Plan

- **Target users**: hackathon teams, indie smart contract developers, student builders, and early-stage Web3 product teams
- **Why they would use it**: it offers a fast security sanity check before code review, testnet deployment, or demo submission
- **Distribution**: hackathon demos, developer communities, Solidity learning groups, and open-source showcases
- **Success metrics**: analyzed contracts, repeat usage, issue detection rate, and AI-backed audit completion rate
- **Ecosystem fit**: positioned as a developer tool for Conflux-compatible contract development workflows

## Conflux Integration

The current repository is an auditing prototype and does not yet include direct on-chain Conflux integration. It is positioned as a developer tool that can later support Conflux deployment and ecosystem-specific validation workflows.

- [ ] **Core Space**
- [ ] **eSpace**
- [ ] **Cross-Space Bridge**
- [ ] **Gas Sponsorship**
- [ ] **Built-in Contracts**
- [ ] **Tree-Graph Consensus**

### Partner Integrations

- [ ] **Privy**
- [ ] **Pyth Network**
- [ ] **LayerZero**
- [x] **Other** - OpenAI API for structured security analysis

## Features

- Solidity file upload and preview
- Rule-based vulnerability checks for risky patterns
- AI-generated structured audit reports
- Strict JSON schema output contract
- Merged analysis pipeline for deterministic and AI findings

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python, FastAPI, Pydantic
- **AI Layer**: OpenAI API with schema-constrained JSON output
- **Infrastructure**: Uvicorn, `.env` configuration, static frontend hosting

## Architecture

```text
Frontend UI -> FastAPI Backend -> OpenAI API
                |
                -> Deterministic Solidity rule checks
```

## Repository

- Main repository: https://github.com/PerhapsMeta/SolidityAIAuditor
- Demo folder: https://github.com/PerhapsMeta/SolidityAIAuditor/tree/main/demo

## Demo

See [demo/README.md](./demo/README.md) for the demo link.
