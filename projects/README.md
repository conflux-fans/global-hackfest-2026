# AIMilestone — Conflux Gas-Sponsored Milestone Escrow AI Agent 🚀

**Conflux Global Hackfest 2026 Entry**

A revolutionary milestone-based escrow system combining AI-powered monitoring with Conflux's zero-gas transaction capabilities. Perfect for decentralized project funding with human oversight.

## 🌟 Key Features

- **⚡ Zero Gas Experience**: Leverages Conflux CIP-30 Gas Sponsorship for cost-free transactions
- **🤖 AI-Powered Monitoring**: Intelligent agent analyzes progress and recommends releases
- **👥 Human-in-the-Loop**: Final approval required from clients for security
- **💰 USDT0 Integration**: Stablecoin-based payments for predictable value
- **🔒 Secure Smart Contracts**: Built on OpenZeppelin with comprehensive testing
- **📊 Real-Time Tracking**: Monitor milestones, payments, and project progress

## 🏆 Why This Wins

1. **Solves Real Pain Points**: Eliminates gas cost barriers while maintaining security
2. **Innovative Tech Stack**: First AI + Gas Sponsorship combination on Conflux
3. **Complete Demo**: Working MVP with chat interface and blockchain integration
4. **Production Ready**: Tested contracts, clear documentation, easy deployment
5. **Market Potential**: Huge demand for trustless freelance/funding platforms

## 🎯 Demo Video Highlights

Our 3-minute demo showcases:

1. **Smart Contract Deployment** - See the contract live on ConfluxScan
2. **USDT0 Deposit** - Client funds the escrow with stablecoins
3. **Milestone Creation** - Set up project milestones with amounts and deadlines
4. **AI Chat Interface** - Interact with the AI agent naturally
5. **Proof Submission** - Submit GitHub PR links or text descriptions
6. **AI Analysis** - Watch AI analyze and recommend releases
7. **Human Approval** - Client confirms AI recommendations
8. **Zero-Gas Release** - See USDT0 transferred with 0 gas cost!
9. **ConfluxScan Verification** - Verify all transactions on block explorer

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Client        │    │   AI Agent       │    │   Developer     │
│  (Approver)     │    │  (Eliza-based)   │    │  (Beneficiary)  │
└────────┬────────┘    └────────┬─────────┘    └────────┬────────┘
         │                      │                       │
         │ 1. Deposit USDT0     │ 4. Analyze Proof      │ 3. Submit Proof
         │ 2. Create Milestones │ 5. Recommend Release  │
         │ 6. Approve Release   │                       │
         │ 7. Confirm Release   │                       │
         └──────────┬───────────┴───────────┬───────────┘
                    │                       │
         ┌──────────▼───────────────────────▼──────────┐
         │     Conflux eSpace Smart Contract             │
         │  - MilestoneEscrow.sol                       │
         │  - USDT0 Management                          │
         │  - Gas Sponsorship (CIP-30)                  │
         └──────────┬───────────────────────────────────┘
                    │
         ┌──────────▼──────────┐
         │  Conflux Blockchain  │
         │  - eSpace Testnet   │
         │  - Zero Gas Fees    │
         └─────────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn
- Conflux eSpace testnet account with CFX
- USDT0 tokens (testnet)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/conflux-milestone-escrow.git
cd conflux-milestone-escrow

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your private key and contract address
```

### Deployment

```bash
# Deploy to Conflux eSpace testnet
npm run deploy

# Setup gas sponsorship
npm run setup-sponsorship

# Run demo flow
npm run demo
```

### AI Agent

```bash
cd agents
npm install

# Start the AI agent chat interface
npm start
```

## 📝 Usage Examples

### Smart Contract Interactions

```javascript
// Deposit USDT0
await milestoneEscrow.deposit(ethers.parseEther("1000"));

// Create milestone
await milestoneEscrow.createMilestone(
  ethers.parseEther("300"),
  Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
  "Complete project architecture"
);

// AI agent recommends release
await milestoneEscrow.submitAIRecommendation(1, "GitHub shows completion...");

// Approver confirms
await milestoneEscrow.approveMilestone(1);

// Release funds (zero gas!)
await milestoneEscrow.releaseMilestone(1);
```

### AI Agent Chat

```
You: I've completed milestone 1, here's the proof: https://github.com/user/repo/pull/123

🤖 Agent: 🔍 Analyzing proof...
🎯 Analysis Result:
✅ GitHub link detected and completion confirmed.
✅ Quality indicators present (testing, review, etc.).

💡 Recommendation: Based on the proof provided, I recommend proceeding with milestone 1.

You: approve 1

✅ Agent: ✅ Milestone 1 approved successfully!
⚡ Gas sponsored - zero cost transaction!

You: release 1

✅ Agent: ✅ Funds released successfully!
💰 USDT0 has been transferred to the beneficiary's wallet!
```

## 🔧 Configuration

### Environment Variables (.env)

```env
# Conflux eSpace Configuration
PRIVATE_KEY=your_private_key_here
CONFLUX_URL=https://evmtestnet.confluxrpc.com
CHAIN_ID=71

# Contract Configuration
USDT0_ADDRESS=0x0000000000000000000000000000000000000000
CONTRACT_ADDRESS=your_deployed_contract_address

# AI Configuration
OPENAI_API_KEY=your_openai_api_key
```

### Agent Configuration (agents/config/agent.config.js)

```javascript
module.exports = {
  conflux: {
    url: "https://evmtestnet.confluxrpc.com",
    chainId: 71,
    privateKey: process.env.PRIVATE_KEY,
    contractAddress: process.env.CONTRACT_ADDRESS
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4",
    temperature: 0.7
  }
};
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test file
npx hardhat test test/MilestoneEscrow.test.js

# Run tests with coverage
npx hardhat coverage
```

## 📊 Contract Functions

### Core Functions

- `deposit(uint256 amount)` - Deposit USDT0 into escrow
- `createMilestone(uint256 amount, uint256 deadline, string description)` - Create new milestone
- `submitAIRecommendation(uint256 milestoneId, string reasoning)` - AI submits release recommendation
- `approveMilestone(uint256 milestoneId)` - Approver confirms milestone (human-in-the-loop)
- `releaseMilestone(uint256 milestoneId)` - Release funds (zero gas!)

### View Functions

- `getMilestone(uint256 milestoneId)` - Get milestone details
- `getAllMilestones()` - Get all milestones
- `getContractStatus()` - Get overall contract status
- `getUSDT0Balance()` - Get contract USDT0 balance

## 🔒 Security Features

- **OpenZeppelin Contracts**: Battle-tested security libraries
- **Access Control**: Role-based permissions (owner, approver, AI agent)
- **Reentrancy Protection**: Guards against reentrancy attacks
- **Input Validation**: Comprehensive parameter checking
- **Gas Sponsorship Control**: Sponsored addresses whitelisted
- **Emergency Controls**: Owner can update critical addresses

## 🌐 Conflux Integration

### Gas Sponsorship (CIP-30)

The contract uses Conflux's native gas sponsorship:

```solidity
ISponsorWhitelistControl public constant sponsorWhitelist =
    ISponsorWhitelistControl(0x0888000000000000000000000000000000000001);

// Automatically sponsors gas for approver and AI agent
_enableGasSponsorship(approver);
_enableGasSponsorship(aiAgent);
```

### Network Details

- **Testnet**: Conflux eSpace Testnet (Chain ID: 71)
- **Mainnet**: Conflux eSpace Mainnet (Chain ID: 1030)
- **Explorer**: https://evmtestnet.confluxscan.io
- **RPC**: https://evmtestnet.confluxrpc.com

## 📈 Future Enhancements

- [ ] Multi-signature approval support
- [ ] Dispute resolution mechanism
- [ ] Advanced AI models with GitHub API integration
- [ ] Mobile app interface
- [ ] Multi-currency support
- [ ] Reputation system for developers
- [ ] Insurance integration

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Developed for**: Conflux Global Hackfest 2026
- **Tech Stack**: Solidity, Hardhat, Node.js, Eliza Framework
- **Special Thanks**: Conflux team for the amazing gas sponsorship feature

## 🔗 Links

- **Conflux eSpace**: https://confluxnetwork.org/espace
- **Gas Sponsorship Docs**: https://developer.confluxchain.org/espace/gas-sponsorship/overview
- **Eliza Framework**: https://github.com/eliza-zone
- **Demo Video**: https://youtu.be/k8lM-jEnzYQ
- **Live Demo**: https://youtube.com/shorts/-gU9kmwV0lw?feature=share

## 📞 Support

For questions or support:
- GitHub Issues: https://github.com/NathanWu77
- Email: 13918713047@163.com

---

**Built with ❤️ for Conflux Global Hackfest 2026**

*Revolutionizing decentralized project funding with AI and zero-gas transactions*