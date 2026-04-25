# 🚀 Quick Start Guide - Conflux Milestone Escrow MVP

## ⏱️ 2-Day MVP Setup for Hackathon

### Day 1: Smart Contract Deployment (2-3 hours)

#### 1. Environment Setup (15 minutes)
```bash
# Navigate to project
cd conflux-milestone-escrow

# Run setup script
./setup.sh

# Edit .env file with your private key
nano .env
```

**Required in .env:**
```env
PRIVATE_KEY=your_conflux_private_key
CONTRACT_ADDRESS=  # Leave empty, will be filled after deployment
```

#### 2. Get Testnet Funds (10 minutes)
- Visit: https://faucet.confluxnetwork.org
- Get testnet CFX for gas
- Get testnet USDT0 (if available)

#### 3. Deploy Contract (10 minutes)
```bash
# Compile contracts
npm run compile

# Deploy to testnet
npm run deploy
```

**Expected Output:**
```
🚀 Starting deployment to Conflux eSpace Testnet...
📝 Deploying contracts with account: 0x...
✅ MilestoneEscrow deployed to: 0x...
📄 Deployment info saved to: deployment.json
```

#### 4. Setup Gas Sponsorship (5 minutes)
```bash
npm run setup-sponsorship
```

#### 5. Test Contract (30 minutes)
```bash
# Run tests
npm test

# Run demo flow
npm run demo
```

### Day 2: AI Agent & Demo (2-3 hours)

#### 1. Setup AI Agent (15 minutes)
```bash
cd agents

# Install dependencies
npm install

# Create .env file
cp ../.env .env

# Add OpenAI API key (optional, for advanced features)
echo "OPENAI_API_KEY=your_key_here" >> .env
```

#### 2. Test AI Agent (30 minutes)
```bash
# Start the agent
npm start
```

**Test these commands:**
```
help
status
milestones
proof I've completed milestone 1 with GitHub PR: https://github.com/user/repo/pull/1
```

#### 3. Create Demo Video (1-2 hours)

**Video Structure (3-5 minutes):**

**Part 1: Introduction (30 seconds)**
- Show project title and key features
- Mention Conflux Gas Sponsorship + AI monitoring

**Part 2: Smart Contract Demo (1 minute)**
- Show deployment script running
- Show contract on ConfluxScan
- Display contract address and explorer link

**Part 3: Milestone Creation (30 seconds)**
- Show creating milestones via script
- Explain USDT0 deposit process

**Part 4: AI Agent Demo (1.5 minutes)**
- Start AI agent chat
- Submit proof (GitHub PR link)
- Show AI analysis and recommendation
- Demonstrate human approval process
- Show zero-gas transaction

**Part 5: Verification (30 seconds)**
- Show USDT0 transfer on ConfluxScan
- Display final contract status
- Show beneficiary received funds

**Part 6: Conclusion (30 seconds)**
- Summarize key achievements
- Show GitHub repo link
- Thank you and contact info

**Screen Recording Tools:**
- Mac: Built-in screen recorder (Cmd+Shift+5)
- Windows: OBS Studio
- Linux: SimpleScreenRecorder

#### 4. Prepare Submission (30 minutes)

**GitHub Repository:**
```bash
git init
git add .
git commit -m "Initial commit - Conflux Milestone Escrow MVP"
git remote add origin https://github.com/yourusername/conflux-milestone-escrow.git
git push -u origin main
```

**Submission Checklist:**
- [x] GitHub repository with clear README
- [x] Deployed contract on testnet
- [x] 3-5 minute demo video
- [x] Working AI agent chat interface
- [x] Zero-gas transaction demonstration
- [x] USDT0 integration shown
- [x] Clear documentation

## 🎯 Demo Script (Copy-Paste for Video)

```bash
# Terminal 1: Contract Deployment
echo "=== Part 1: Smart Contract Deployment ==="
npm run compile
npm run deploy

# Show ConfluxScan
echo "Visit: https://evmtestnet.confluxscan.io/address/CONTRACT_ADDRESS"

# Terminal 2: AI Agent
echo "=== Part 2: AI Agent Demo ==="
cd agents
npm start

# In the chat, type:
help
status
milestones

# Submit proof
proof I've completed the first milestone. Here's the GitHub PR: https://github.com/example/repo/pull/123

# Show AI recommendation
recommend 1 "GitHub PR shows complete implementation with all tests passing. Code review approved."

# Terminal 3: Blockchain interaction (if needed)
# Show zero-gas transaction on ConfluxScan
```

## 📱 Demo Tips for Maximum Impact

1. **Highlight Gas Sponsorship**: Emphasize "ZERO GAS" multiple times
2. **Show Real Transactions**: Display actual ConfluxScan pages
3. **Demonstrate AI Intelligence**: Show proof analysis capabilities
4. **Keep it Fast**: Edit out long waiting times
5. **Use Clear Audio**: Good microphone, speak clearly
6. **Show Code**: Briefly display key contract functions
7. **Mention Hackathon**: Reference Conflux Global Hackfest 2026

## 🏆 Winning Points to Emphasize

1. **First AI + Gas Sponsorship combo on Conflux**
2. **Solves real freelancer/funding problems**
3. **Production-ready code with tests**
4. **Zero gas = mass adoption potential**
5. **Human oversight ensures security**
6. **USDT0 = stable, predictable value**
7. **Complete working demo, not just concepts**

## 🆘 Troubleshooting

**Common Issues:**

1. **Private key errors**
   - Ensure private key has 0x prefix
   - Check account has testnet CFX

2. **Contract deployment fails**
   - Check network connection
   - Verify gas price settings
   - Ensure sufficient CFX balance

3. **AI agent won't start**
   - Check Node.js version (16+)
   - Verify dependencies installed
   - Check .env file configuration

4. **Gas sponsorship not working**
   - Verify SponsorWhitelistControl address
   - Check contract has CFX for gas
   - Ensure addresses are whitelisted

## 📞 Quick Help

- **Conflux Discord**: https://discord.gg/confluxnetwork
- **Conflux Docs**: https://developer.confluxchain.org
- **Gas Sponsorship**: https://developer.confluxchain.org/espace/gas-sponsorship/overview

---

**Good luck with the hackathon! 🚀**

This MVP is designed to be completed in 2 days with zero programming background. Focus on the demo video and clear explanation of the gas sponsorship + AI combination.