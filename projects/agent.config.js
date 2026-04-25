require("dotenv").config();

module.exports = {
  // Conflux eSpace Configuration
  conflux: {
    url: process.env.CONFLUX_URL || "https://evmtestnet.confluxrpc.com",
    chainId: parseInt(process.env.CHAIN_ID || "71"),
    privateKey: process.env.PRIVATE_KEY,
    contractAddress: process.env.CONTRACT_ADDRESS,
    usdt0Address: process.env.USDT0_ADDRESS
  },

  // AI Configuration (OpenAI)
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 500
  },

  // Agent Configuration
  agent: {
    name: "MilestoneMonitor",
    version: "1.0.0",
    description: "AI agent for monitoring milestone escrow contracts and providing release recommendations",
    checkInterval: 60000 // Check every minute
  },

  // Milestone Analysis Configuration
  analysis: {
    confidenceThreshold: 0.7, // Minimum confidence to recommend release
    requireGitHubLink: false, // Whether to require GitHub PR links
    requireTextDescription: true // Whether to require text descriptions
  },

  // Gas Sponsorship
  gasSponsorship: {
    enabled: true,
    sponsorAddress: "0x0888000000000000000000000000000000000001"
  }
};