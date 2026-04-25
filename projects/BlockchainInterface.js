const { ethers } = require("ethers");
const config = require("./config/agent.config");
const MilestoneEscrowABI = require("../artifacts/contracts/MilestoneEscrow.sol/MilestoneEscrow.json");
const MockERC20ABI = require("../artifacts/contracts/MockERC20.sol/MockERC20.json");

/**
 * BlockchainInterface - Handles all Conflux blockchain interactions
 * Provides gas-sponsored transactions for milestone escrow operations
 */
class BlockchainInterface {
  constructor() {
    // Initialize ethers provider and wallet
    this.provider = new ethers.JsonRpcProvider(config.conflux.url);

    // Setup account
    if (config.conflux.privateKey) {
      // Ensure private key has 0x prefix
      const privateKey = config.conflux.privateKey.startsWith('0x')
        ? config.conflux.privateKey
        : '0x' + config.conflux.privateKey;
      this.wallet = new ethers.Wallet(privateKey, this.provider);
      console.log("🔐 Blockchain account initialized:", this.wallet.address);
    }

    // Setup MockERC20 token contract instance
    if (config.conflux.usdt0Address) {
      this.usdt0Token = new ethers.Contract(
        config.conflux.usdt0Address,
        MockERC20ABI.abi,
        this.wallet
      );
      console.log("💵 USDT0 Token address:", config.conflux.usdt0Address);
    } else {
      console.warn("⚠️  USDT0 token address not configured");
    }

    // Setup contract instance
    if (config.conflux.contractAddress) {
      this.contract = new ethers.Contract(
        config.conflux.contractAddress,
        MilestoneEscrowABI.abi,
        this.wallet
      );
      console.log("📍 Contract address:", config.conflux.contractAddress);
    } else {
      console.warn("⚠️  Contract address not configured");
    }
  }

  /**
   * Get contract status
   */
  async getContractStatus() {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }

      const status = await this.contract.getContractStatus();
      return {
        totalDeposited: status[0].toString(),
        totalReleased: status[1].toString(),
        remaining: status[2].toString(),
        milestonesCreated: status[3].toString(),
        milestonesCompleted: status[4].toString()
      };
    } catch (error) {
      console.error("❌ Error getting contract status:", error.message);
      throw error;
    }
  }

  /**
   * Get all milestones
   */
  async getAllMilestones() {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }

      const milestones = await this.contract.getAllMilestones();
      return milestones.map((ms, index) => ({
        id: ms.id.toString(),
        amount: ms.amount.toString(),
        deadline: ms.deadline.toString(),
        description: ms.description,
        aiRecommended: ms.aiRecommended,
        aiReasoning: ms.aiReasoning,
        approved: ms.approved,
        released: ms.released,
        releasedAt: ms.releasedAt.toString()
      }));
    } catch (error) {
      console.error("❌ Error getting milestones:", error.message);
      throw error;
    }
  }

  /**
   * Get specific milestone
   */
  async getMilestone(milestoneId) {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }

      const milestone = await this.contract.getMilestone(milestoneId);
      return {
        id: milestone[0].toString(),
        amount: milestone[1].toString(),
        deadline: milestone[2].toString(),
        description: milestone[3],
        aiRecommended: milestone[4],
        aiReasoning: milestone[5],
        approved: milestone[6],
        released: milestone[7],
        releasedAt: milestone[8].toString()
      };
    } catch (error) {
      console.error("❌ Error getting milestone:", error.message);
      throw error;
    }
  }

  /**
   * Deposit USDT0 to contract (gas sponsored)
   */
  async deposit(amount) {
    try {
      if (!this.contract || !this.wallet || !this.usdt0Token) {
        throw new Error("Contract, wallet, or USDT0 token not initialized");
      }

      console.log(`💰 Depositing ${amount} USDT0 to contract...`);

      // Convert amount to wei
      const amountInWei = ethers.parseUnits(amount, 18);

      // Step 1: Approve the contract to spend USDT0 tokens
      console.log("📝 Step 1: Approving USDT0 transfer to contract...");
      const approveTx = await this.usdt0Token.approve(
        this.contract.target,
        amountInWei
      );
      console.log("⏳ Approval transaction sent:", approveTx.hash);

      const approveReceipt = await approveTx.wait();
      console.log("✅ Approval successful!");
      console.log("🔗 Approval hash:", approveReceipt.hash);

      // Step 2: Deposit the tokens to the contract
      console.log("📝 Step 2: Depositing USDT0 to contract...");
      const depositTx = await this.contract.deposit(amountInWei);
      console.log("⏳ Deposit transaction sent:", depositTx.hash);

      const depositReceipt = await depositTx.wait();
      console.log("✅ Deposit successful!");
      console.log("🔗 Deposit hash:", depositReceipt.hash);

      return {
        hash: depositReceipt.hash,
        approveHash: approveReceipt.hash,
        amount: amount
      };
    } catch (error) {
      console.error("❌ Error depositing USDT0:", error.message);

      // Provide detailed error messages
      if (error.message.includes("ERC20InsufficientBalance")) {
        throw new Error("Insufficient USDT0 balance in your wallet. Please mint more tokens first using the deployment script.");
      } else if (error.message.includes("ERC20InsufficientAllowance")) {
        throw new Error("Insufficient allowance. Failed to approve contract to spend tokens.");
      } else if (error.message.includes("caller is not the approver")) {
        throw new Error("You are not authorized to perform this action. Check your wallet address.");
      } else if (error.message.includes("Milestone not found")) {
        throw new Error("Milestone not found. Please check the milestone ID.");
      } else if (error.message.includes("Insufficient deposited funds")) {
        throw new Error("Insufficient USDT0 deposited in contract. Please deposit more USDT0 first using: deposit <amount>");
      } else {
        throw error;
      }
    }
  }

  /**
   * Create milestone (gas sponsored)
   */
  async createMilestone(amount, deadline, description) {
    try {
      if (!this.contract || !this.wallet) {
        throw new Error("Contract or wallet not initialized");
      }

      console.log(`📝 Creating milestone: ${description}`);
      console.log(`   Amount: ${amount} USDT0`);
      console.log(`   Deadline: ${new Date(deadline * 1000).toLocaleString()}`);

      // Convert amount to wei
      const amountInWei = ethers.parseUnits(amount, 18);

      const tx = await this.contract.createMilestone(amountInWei, deadline, description);
      console.log("⏳ Transaction sent:", tx.hash);

      const receipt = await tx.wait();
      console.log("✅ Milestone created successfully!");
      console.log("🔗 Transaction hash:", receipt.hash);

      return receipt;
    } catch (error) {
      console.error("❌ Error creating milestone:", error.message);

      // Provide detailed error messages
      if (error.message.includes("Insufficient deposited funds")) {
        throw new Error("Insufficient USDT0 deposited in contract. Please deposit more USDT0 first using: deposit <amount>");
      } else if (error.message.includes("caller is not the contract owner")) {
        throw new Error("Only the contract owner can create milestones. Please check your wallet address.");
      } else if (error.message.includes("Amount must be greater than 0")) {
        throw new Error("Amount must be greater than 0. Example: create milestone 50 2026-12-01 Implement login");
      } else if (error.message.includes("Deadline must be in the future")) {
        throw new Error("Deadline must be in the future. Example: create milestone 50 2026-12-01 Implement login");
      } else {
        throw error;
      }
    }
  }

  /**
   * Submit AI recommendation for milestone release (gas sponsored)
   */
  async submitAIRecommendation(milestoneId, reasoning) {
    try {
      if (!this.contract || !this.wallet) {
        throw new Error("Contract or wallet not initialized");
      }

      console.log(`🤖 Submitting AI recommendation for milestone ${milestoneId}...`);

      const tx = await this.contract.submitAIRecommendation(milestoneId, reasoning);
      console.log("⏳ Transaction sent:", tx.hash);
      console.log("⚡ Gas sponsored by contract - zero cost to AI agent!");

      const receipt = await tx.wait();
      console.log("✅ AI recommendation submitted successfully!");
      console.log("🔗 Transaction hash:", receipt.hash);

      // Ensure consistent return format with hash property
      return {
        hash: receipt.hash,
        transactionHash: receipt.hash,
        ...receipt
      };
    } catch (error) {
      console.error("❌ Error submitting AI recommendation:", error.message);

      // Provide detailed error messages
      if (error.message.includes("Milestone not found")) {
        throw new Error("Milestone not found. Please check the milestone ID.");
      } else if (error.message.includes("already recommended")) {
        throw new Error("This milestone already has an AI recommendation.");
      } else if (error.message.includes("already approved")) {
        throw new Error("This milestone is already approved. No need to submit recommendation.");
      } else {
        throw error;
      }
    }
  }

  /**
   * Approve milestone (for approver role)
   */
  async approveMilestone(milestoneId) {
    try {
      if (!this.contract || !this.wallet) {
        throw new Error("Contract or wallet not initialized");
      }

      console.log(`✅ Approving milestone ${milestoneId}...`);

      const tx = await this.contract.approveMilestone(milestoneId);
      console.log("⏳ Transaction sent:", tx.hash);
      console.log("⚡ Gas sponsored by contract - zero cost to approver!");

      const receipt = await tx.wait();
      console.log("✅ Milestone approved successfully!");
      console.log("🔗 Transaction hash:", receipt.hash);

      // Ensure consistent return format with hash property
      return {
        hash: receipt.hash,
        transactionHash: receipt.hash,
        ...receipt
      };
    } catch (error) {
      console.error("❌ Error approving milestone:", error.message);

      // Provide detailed error messages
      if (error.message.includes("caller is not the approver")) {
        throw new Error("Only the approver (client) can approve milestones. Check your wallet address.");
      } else if (error.message.includes("Milestone not found")) {
        throw new Error("Milestone not found. Please check the milestone ID.");
      } else if (error.message.includes("already approved")) {
        throw new Error("This milestone is already approved.");
      } else if (error.message.includes("NoAIRecommendation") || error.message.includes("No AI recommendation")) {
        throw new Error("No AI recommendation found for this milestone. Submit proof first using: proof <evidence>");
      } else {
        throw error;
      }
    }
  }

  /**
   * Release milestone funds (for approver role, gas sponsored)
   */
  async releaseMilestone(milestoneId) {
    try {
      if (!this.contract || !this.wallet) {
        throw new Error("Contract or wallet not initialized");
      }

      console.log(`💸 Releasing funds for milestone ${milestoneId}...`);

      const tx = await this.contract.releaseMilestone(milestoneId);
      console.log("⏳ Transaction sent:", tx.hash);
      console.log("⚡ Gas sponsored by contract - zero cost!");

      const receipt = await tx.wait();
      console.log("✅ Funds released successfully!");
      console.log("🔗 Transaction hash:", receipt.hash);

      // Ensure consistent return format with hash property
      return {
        hash: receipt.hash,
        transactionHash: receipt.hash,
        ...receipt
      };
    } catch (error) {
      console.error("❌ Error releasing milestone:", error.message);

      // Provide detailed error messages
      if (error.message.includes("caller is not the approver")) {
        throw new Error("Only the approver (client) can release funds. Check your wallet address.");
      } else if (error.message.includes("Milestone not found")) {
        throw new Error("Milestone not found. Please check the milestone ID.");
      } else if (error.message.includes("not approved")) {
        throw new Error("The milestone must be approved first. Use: approve " + milestoneId);
      } else if (error.message.includes("already released")) {
        throw new Error("This milestone has already been released.");
      } else if (error.message.includes("Insufficient")) {
        throw new Error("The contract doesn't have enough USDT0 balance to release this amount. Deposit more funds.");
      } else {
        throw error;
      }
    }
  }

  /**
   * Get USDT0 balance of contract
   */
  async getUSDT0Balance() {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }

      const balance = await this.contract.getUSDT0Balance();
      return balance.toString();
    } catch (error) {
      console.error("❌ Error getting USDT0 balance:", error.message);
      throw error;
    }
  }

  /**
   * Get user's USDT0 wallet balance
   */
  async getUserUSDT0Balance() {
    try {
      if (!this.usdt0Token || !this.wallet) {
        throw new Error("USDT0 token or wallet not initialized");
      }

      const balance = await this.usdt0Token.balanceOf(this.wallet.address);
      return balance.toString();
    } catch (error) {
      console.error("❌ Error getting user USDT0 balance:", error.message);
      throw error;
    }
  }

  /**
   * Monitor contract events
   */
  async monitorEvents(callback) {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }

      console.log("👀 Starting to monitor contract events...");

      // Listen for AIRecommendation events
      this.contract.on("AIRecommendation", (milestoneId, reasoning, event) => {
        console.log("📢 Event - AI Recommendation:");
        console.log("   Milestone ID:", milestoneId.toString());
        console.log("   Reasoning:", reasoning);
        if (callback) callback("AIRecommendation", event);
      });

      // Listen for MilestoneApproved events
      this.contract.on("MilestoneApproved", (milestoneId, approver, event) => {
        console.log("📢 Event - Milestone Approved:");
        console.log("   Milestone ID:", milestoneId.toString());
        console.log("   Approver:", approver);
        if (callback) callback("MilestoneApproved", event);
      });

      // Listen for FundsReleased events
      this.contract.on("FundsReleased", (milestoneId, amount, beneficiary, event) => {
        console.log("📢 Event - Funds Released:");
        console.log("   Milestone ID:", milestoneId.toString());
        console.log("   Amount:", this.formatAmount(amount.toString()), "USDT0");
        console.log("   Beneficiary:", beneficiary);
        if (callback) callback("FundsReleased", event);
      });

    } catch (error) {
      console.error("❌ Error setting up event monitoring:", error.message);
      throw error;
    }
  }

  /**
   * Format amount for display
   */
  formatAmount(amount) {
    const value = BigInt(amount);
    return (Number(value) / 1e18).toFixed(2);
  }

  /**
   * Format timestamp for display
   */
  formatTimestamp(timestamp) {
    return new Date(Number(timestamp) * 1000).toLocaleString();
  }
}

module.exports = BlockchainInterface;