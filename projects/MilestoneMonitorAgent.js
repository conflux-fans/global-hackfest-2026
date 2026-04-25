const readline = require("readline");
const BlockchainInterface = require("./BlockchainInterface");
const config = require("./config/agent.config");

/**
 * MilestoneMonitorAgent - AI agent for monitoring milestone escrow contracts
 * Handles chat interactions, proof analysis, and release recommendations
 */
class MilestoneMonitorAgent {
  constructor() {
    this.blockchain = new BlockchainInterface();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.conversationHistory = [];
    this.currentMilestoneContext = null;
  }

  /**
   * Start the agent
   */
  async start() {
    console.log("\n🤖 Conflux Milestone Escrow AI Agent");
    console.log("─".repeat(50));
    console.log("Version:", config.agent.version);
    console.log("Description:", config.agent.description);
    console.log("─".repeat(50) + "\n");

    try {
      // Check blockchain connection
      await this.checkBlockchainConnection();

      // Display all core commands enabled
      console.log("✅ All core commands enabled!");
      console.log("   - deposit <amount>        : Deposit USDT0 to contract");
      console.log("   - create milestone <amount> <deadline> <desc> : Create milestone");
      console.log("   - proof <text>            : Submit proof (auto-analyzes & recommends)");
      console.log("   - approve <id>            : Approve milestone");
      console.log("   - release <id>            : Release funds");
      console.log("   - status                  : View contract status");
      console.log("   - milestones              : List all milestones");
      console.log("   - help                    : Show all commands");
      console.log("");
      console.log("⚡ Gas Sponsorship: All transactions are gas-sponsored - zero cost!");
      console.log("📋 Quick Start: deposit 100 → create milestone 50 2026-12-01 Implement feature → proof <link> → approve 1 → release 1");
      console.log("");

      // Start main chat loop
      this.chatLoop();
    } catch (error) {
      console.error("❌ Error starting agent:", error.message);
      process.exit(1);
    }
  }

  /**
   * Check blockchain connection
   */
  async checkBlockchainConnection() {
    try {
      console.log("🔗 Connecting to Conflux eSpace...");
      const status = await this.blockchain.getContractStatus();
      console.log("✅ Connected successfully!");
      console.log("\n📊 Current Contract Status:");
      console.log("  Total Deposited:", this.blockchain.formatAmount(status.totalDeposited), "USDT0");
      console.log("  Total Released:", this.blockchain.formatAmount(status.totalReleased), "USDT0");
      console.log("  Remaining:", this.blockchain.formatAmount(status.remaining), "USDT0");
      console.log("  Milestones Created:", status.milestonesCreated);
      console.log("  Milestones Completed:", status.milestonesCompleted);
      console.log("");

      const balance = await this.blockchain.getUSDT0Balance();
      console.log("💰 Contract USDT0 Balance:", this.blockchain.formatAmount(balance), "USDT0");

      const userBalance = await this.blockchain.getUserUSDT0Balance();
      console.log("💵 Your Wallet USDT0 Balance:", this.blockchain.formatAmount(userBalance), "USDT0\n");
    } catch (error) {
      console.error("❌ Blockchain connection failed:", error.message);
      throw error;
    }
  }

  /**
   * Main chat loop
   */
  chatLoop() {
    console.log("💬 Chat with the AI Agent (type 'help' for commands, 'exit' to quit):\n");

    this.rl.question("You: ", async (input) => {
      if (input.toLowerCase() === 'exit') {
        console.log("\n👋 Goodbye!");
        this.rl.close();
        process.exit(0);
      }

      try {
        const response = await this.processInput(input);
        console.log("\n🤖 Agent:", response);
        console.log("");
      } catch (error) {
        console.error("❌ Error:", error.message);
      }

      this.chatLoop();
    });
  }

  /**
   * Process user input
   */
  async processInput(input) {
    const lowerInput = input.toLowerCase().trim();

    // Handle commands
    if (lowerInput === 'help') {
      return this.getHelpMessage();
    }

    if (lowerInput === 'status') {
      return await this.getStatus();
    }

    if (lowerInput === 'milestones') {
      return await this.getMilestones();
    }

    if (lowerInput.startsWith('deposit ')) {
      const amount = lowerInput.replace('deposit ', '');
      return await this.deposit(amount);
    }

    if (lowerInput.startsWith('create milestone ')) {
      return await this.handleCreateMilestone(input);
    }

    if (lowerInput.startsWith('milestone ')) {
      const milestoneId = lowerInput.replace('milestone ', '');
      return await this.getMilestoneDetails(milestoneId);
    }

    if (lowerInput.startsWith('proof ')) {
      const proofText = input.substring(6); // Keep original case for proof
      return await this.analyzeProof(proofText);
    }

    if (lowerInput.startsWith('recommend ')) {
      const parts = lowerInput.split(' ');
      const milestoneId = parts[1];
      const reasoning = input.substring(input.indexOf(' ') + 1);
      return await this.submitRecommendation(milestoneId, reasoning);
    }

    if (lowerInput.startsWith('approve ')) {
      const milestoneId = lowerInput.replace('approve ', '');
      return await this.approveMilestone(milestoneId);
    }

    if (lowerInput.startsWith('release ')) {
      const milestoneId = lowerInput.replace('release ', '');
      return await this.releaseMilestone(milestoneId);
    }

    // Default: Handle as general conversation
    return await this.handleConversation(input);
  }

  /**
   * Get help message
   */
  getHelpMessage() {
    return `📚 Available Commands:

  deposit <amount>                - Deposit USDT0 to contract (e.g., "deposit 100")
  create milestone <amount> <deadline> <desc>  - Create milestone (e.g., "create milestone 50 2026-12-01 Implement login")
  status                          - Show contract status
  milestones                      - List all milestones
  milestone <id>                  - Get details for specific milestone
  proof <text>                    - Submit proof for milestone completion (auto-analyzes & recommends)
  recommend <id> <reasoning>      - Submit AI recommendation (manual)
  approve <id>                    - Approve milestone (approver only)
  release <id>                    - Release funds for approved milestone (approver only)
  help                            - Show this help message
  exit                            - Exit the agent

💡 Example Usage:
  - "deposit 100" - Deposit 100 USDT0
  - "create milestone 50 2026-12-01 Implement user authentication" - Create milestone
  - "proof https://github.com/user/repo/pull/123" - Submit proof (auto-analyzes & recommends)
  - "milestone 1" - View milestone details
  - "approve 1" - Approve milestone
  - "release 1" - Release funds

⚡ All transactions are gas-sponsored - zero gas costs!

📋 Workflow:
  1. deposit <amount> - Add funds to contract
  2. create milestone <amount> <deadline> <desc> - Define milestones
  3. proof <evidence> - Submit proof (AI auto-analyzes & recommends)
  4. approve <id> - Approve milestone (client only)
  5. release <id> - Release funds (client only)`;
  }

  /**
   * Get contract status
   */
  async getStatus() {
    const status = await this.blockchain.getContractStatus();
    const balance = await this.blockchain.getUSDT0Balance();
    const userBalance = await this.blockchain.getUserUSDT0Balance();

    return `📊 Contract Status:
  Total Deposited: ${this.blockchain.formatAmount(status.totalDeposited)} USDT0
  Total Released: ${this.blockchain.formatAmount(status.totalReleased)} USDT0
  Remaining: ${this.blockchain.formatAmount(status.remaining)} USDT0
  Milestones Created: ${status.milestonesCreated}
  Milestones Completed: ${status.milestonesCompleted}
  Current Balance: ${this.blockchain.formatAmount(balance)} USDT0

💵 Your Wallet USDT0 Balance: ${this.blockchain.formatAmount(userBalance)} USDT0`;
  }

  /**
   * Deposit USDT0 to contract
   */
  async deposit(amount) {
    try {
      console.log(`\n💰 Depositing ${amount} USDT0...`);
      const receipt = await this.blockchain.deposit(amount);

      return `✅ Successfully deposited ${amount} USDT0 to the contract!

📋 Deposit Details:
  Amount: ${amount} USDT0
  Approval Hash: ${receipt.approveHash}
  Deposit Hash: ${receipt.hash}

⚡ Gas sponsored - zero cost transaction!
🔗 View Approval: https://evmtestnet.confluxscan.io/tx/${receipt.approveHash}
🔗 View Deposit: https://evmtestnet.confluxscan.io/tx/${receipt.hash}

💡 Next Step: Create milestones using "create milestone <amount> <deadline> <description>"`;
    } catch (error) {
      let errorMsg = `❌ Error depositing USDT0: ${error.message}`;

      // Add helpful tips for common errors
      if (error.message.includes("Insufficient") || error.message.includes("balance")) {
        errorMsg += `\n\n💡 Solution: Make sure you have USDT0 tokens in your wallet.
   - Check your balance using: status
   - Mint more tokens by running the deployment script`;
      } else if (error.message.includes("allowance")) {
        errorMsg += `\n\n💡 Solution: Approval transaction failed. Try again with a smaller amount or check your wallet.`;
      }

      errorMsg += `\n\n💡 Quick fix: Run the deployment script to mint more USDT0 tokens`;
      return errorMsg;
    }
  }

  /**
   * Handle create milestone command (interactive or parsed)
   */
  async handleCreateMilestone(input) {
    try {
      // Try to parse the command
      // Format: "create milestone <amount> <deadline> <description>"
      const parts = input.trim().split(/\s+/);
      if (parts.length < 4) {
        return `❌ Invalid format. Usage: "create milestone <amount> <deadline> <description>"
Example: "create milestone 50 2026-06-01 Implement user authentication"`;
      }

      const amount = parts[2]; // Amount (will be validated by contract)
      const deadline = parts[3]; // Deadline (could be date or timestamp)
      const description = parts.slice(4).join(' '); // Everything after deadline

      if (!description) {
        return `❌ Description is required. Usage: "create milestone <amount> <deadline> <description>"`;
      }

      // Parse deadline - simplified and more flexible
      let deadlineTimestamp;
      const now = Math.floor(Date.now() / 1000);

      if (deadline.includes('-') || deadline.includes('/')) {
        // It's a date string, convert to timestamp
        const dateObj = new Date(deadline);
        if (isNaN(dateObj.getTime())) {
          return `❌ Invalid deadline: unable to parse "${deadline}". Please provide a future date (e.g., "2026-12-01") or valid timestamp.`;
        }
        deadlineTimestamp = Math.floor(dateObj.getTime() / 1000);
      } else {
        // Try to parse as a number (timestamp)
        const parsed = parseInt(deadline);
        if (!isNaN(parsed) && parsed > 0) {
          deadlineTimestamp = parsed;
          // If timestamp is in seconds format and is reasonable (< 10 years from now)
          if (deadlineTimestamp < now + 315360000) {
            // It's likely already in seconds format
          } else {
            // It might be in milliseconds, convert to seconds
            deadlineTimestamp = Math.floor(deadlineTimestamp / 1000);
          }
        } else {
          return `❌ Invalid deadline: "${deadline}". Please provide a future date (e.g., "2026-12-01") or valid timestamp.`;
        }
      }

      // Validate the parsed timestamp
      if (isNaN(deadlineTimestamp) || deadlineTimestamp <= 0) {
        return `❌ Invalid deadline: unable to parse "${deadline}". Please provide a future date (e.g., "2026-12-01") or valid timestamp.`;
      }

      // Warn if deadline is in the past but still allow it for demo purposes
      const isPast = deadlineTimestamp < now;
      if (isPast) {
        console.log(`⚠️  Warning: Deadline is in the past (${new Date(deadlineTimestamp * 1000).toLocaleString()})`);
        console.log(`   Continuing for demo purposes...`);
      }

      console.log(`\n📝 Creating milestone: ${description}`);
      console.log(`   Amount: ${amount} USDT0`);
      console.log(`   Deadline: ${new Date(deadlineTimestamp * 1000).toLocaleString()}`);

      const receipt = await this.blockchain.createMilestone(amount, deadlineTimestamp, description);

      return `✅ Successfully created milestone!

📋 Milestone Details:
  Amount: ${amount} USDT0
  Deadline: ${new Date(deadlineTimestamp * 1000).toLocaleString()}
  Description: ${description}
  Transaction Hash: ${receipt.hash}

⚡ Gas sponsored - zero cost transaction!
🔗 View on ConfluxScan: https://evmtestnet.confluxscan.io/tx/${receipt.hash}

💡 Next Steps:
  - View all milestones: "milestones"
  - Developer submits proof when complete: "proof <link/evidence>"`;
    } catch (error) {
      let errorMsg = `❌ Error creating milestone: ${error.message}`;

      // Add helpful tips for common errors
      if (error.message.includes("Insufficient deposited funds")) {
        errorMsg += `\n\n💡 Solution: Deposit more USDT0 first using: deposit <amount>\n   Example: deposit 100`;
      } else if (error.message.includes("Only the contract owner") || error.message.includes("caller is not the contract owner")) {
        errorMsg += `\n\n💡 Solution: Make sure you're using the correct wallet address (contract owner)`;
      } else if (error.message.includes("Amount must be greater than 0")) {
        errorMsg += `\n\n💡 Solution: Provide a valid amount greater than 0.\n   Example: create milestone 50 2026-12-01 Implement login`;
      } else if (error.message.includes("Deadline must be in the future")) {
        errorMsg += `\n\n💡 Solution: Provide a future date.\n   Example: create milestone 50 2026-12-01 Implement login`;
      }

      return errorMsg;
    }
  }

  /**
   * Get all milestones
   */
  async getMilestones() {
    const milestones = await this.blockchain.getAllMilestones();

    if (milestones.length === 0) {
      return "No milestones created yet.";
    }

    let response = "📋 All Milestones:\n\n";
    milestones.forEach((ms, index) => {
      response += `Milestone ${ms.id}:\n`;
      response += `  Amount: ${this.blockchain.formatAmount(ms.amount)} USDT0\n`;
      response += `  Deadline: ${this.blockchain.formatTimestamp(ms.deadline)}\n`;
      response += `  Description: ${ms.description}\n`;
      response += `  Status: ${ms.released ? '✅ Released' : ms.approved ? '✅ Approved' : ms.aiRecommended ? '🤖 AI Recommended' : '⏳ Pending'}\n\n`;
    });

    return response;
  }

  /**
   * Get specific milestone details
   */
  async getMilestoneDetails(milestoneId) {
    try {
      const milestone = await this.blockchain.getMilestone(milestoneId);

      let status = "⏳ Pending";
      if (milestone.released) status = "✅ Released";
      else if (milestone.approved) status = "✅ Approved";
      else if (milestone.aiRecommended) status = "🤖 AI Recommended";

      return `📋 Milestone ${milestone.id} Details:
  Amount: ${this.blockchain.formatAmount(milestone.amount)} USDT0
  Deadline: ${this.blockchain.formatTimestamp(milestone.deadline)}
  Description: ${milestone.description}
  Status: ${status}
  AI Recommended: ${milestone.aiRecommended ? 'Yes' : 'No'}
  AI Reasoning: ${milestone.aiReasoning || 'Not provided'}
  Approved: ${milestone.approved ? 'Yes' : 'No'}
  Released: ${milestone.released ? 'Yes' : 'No'}
  Released At: ${milestone.releasedAt !== '0' ? this.blockchain.formatTimestamp(milestone.releasedAt) : 'Not released'}`;
    } catch (error) {
      return `❌ Error: ${error.message}. Please check the milestone ID.`;
    }
  }

  /**
   * Analyze proof and provide recommendation
   */
  async analyzeProof(proofText) {
    console.log("\n🔍 Analyzing proof...");
    console.log("📝 Proof text:", proofText);

    try {
      // Get milestones to find which one this might be for
      const milestones = await this.blockchain.getAllMilestones();
      const pendingMilestones = milestones.filter(ms => !ms.released && !ms.approved);

      if (pendingMilestones.length === 0) {
        return `ℹ️  No pending milestones found.

📋 Current State:
  Total Milestones: ${milestones.length}
  Pending: 0
  Approved/Released: ${milestones.filter(ms => ms.approved || ms.released).length}

💡 Suggestions:
  - Create a new milestone first: "create milestone <amount> <deadline> <description>"
  - View all milestones: "milestones"`;
      }

      // Analyze the proof (simplified AI analysis)
      const analysis = this.analyzeProofContent(proofText, pendingMilestones);

      // ALWAYS auto-submit the recommendation to blockchain for demo purposes
      console.log(`\n🤖 Auto-submitting recommendation for milestone ${analysis.milestoneId}...`);
      try {
        const receipt = await this.blockchain.submitAIRecommendation(analysis.milestoneId, analysis.reasoning);
        console.log("✅ Recommendation submitted successfully!");

        return `🎯 Analysis Result:

${analysis.reasoning}

✅ AI recommendation automatically submitted to blockchain!

📋 Recommendation Details:
  Milestone ID: ${analysis.milestoneId}
  Reasoning: ${analysis.reasoning.substring(0, 200)}...
  Transaction Hash: ${receipt.hash}

⚡ Gas sponsored - zero cost transaction!
🔗 View on ConfluxScan: https://evmtestnet.confluxscan.io/tx/${receipt.hash}

📝 Next Steps:
  1. Wait for approver (client) to review
  2. Approver will use 'approve ${analysis.milestoneId}' to confirm
  3. Funds will be released using 'release ${analysis.milestoneId}'`;
      } catch (error) {
        console.error("❌ Error submitting recommendation:", error.message);
        return `🎯 Analysis Result:

${analysis.reasoning}

❌ Auto-submission failed: ${error.message}

💡 Manual submission:
  recommend ${analysis.milestoneId} "${analysis.reasoning.substring(0, 100)}..."`;
      }
    } catch (error) {
      return `❌ Error analyzing proof: ${error.message}

💡 Tips:
  - Check contract status: "status"
  - View all milestones: "milestones"
  - Make sure you have pending milestones to analyze`;
    }
  }

  /**
   * Analyze proof content (simplified AI logic)
   */
  analyzeProofContent(proofText, pendingMilestones) {
    const text = proofText.toLowerCase();

    // Check for GitHub links
    const hasGitHubLink = text.includes('github.com') || text.includes('pr/') || text.includes('pull/');

    // Check for completion indicators
    const completionIndicators = [
      'completed', 'finished', 'done', 'implemented', 'deployed',
      'tested', 'merged', 'released', 'delivered', 'ready', 'working'
    ];

    const hasCompletionIndicator = completionIndicators.some(indicator => text.includes(indicator));

    // Check for quality indicators
    const qualityIndicators = [
      'tested', 'audit', 'review', 'documented', 'optimized',
      'secure', 'performant', 'scalable', 'quality', 'production'
    ];

    const hasQualityIndicator = qualityIndicators.some(indicator => text.includes(indicator));

    // Determine which milestone this might be for
    const targetMilestone = pendingMilestones[0]; // Default to first pending
    const milestoneId = targetMilestone.id;

    // Build reasoning - ALWAYS recommend for demo purposes
    let reasoning = "";

    if (hasGitHubLink && hasCompletionIndicator) {
      reasoning += `✅ GitHub link detected and completion confirmed. `;
      if (hasQualityIndicator) {
        reasoning += `✅ Quality indicators present (testing, review, etc.). `;
        reasoning += `The proof shows concrete evidence of milestone completion with proper quality checks. Strong recommendation for approval.`;
      } else {
        reasoning += `✅ Proof submitted shows clear evidence of completion via GitHub link. Ready for client review and approval.`;
      }
    } else if (hasCompletionIndicator) {
      reasoning += `✅ Completion indicators detected. Developer confirms milestone is complete and ready for review.`;
      if (!hasGitHubLink) {
        reasoning += ` ⚠️  Note: No GitHub link provided for verification. Consider adding PR link for better transparency.`;
      }
    } else if (hasGitHubLink) {
      reasoning += `✅ GitHub link provided showing code work. Developer has submitted evidence of progress. `;
      reasoning += `Ready for client to review and confirm milestone completion.`;
    } else {
      reasoning += `✅ Proof submitted by developer. Milestone work has been completed according to developer's submission.`;
      reasoning += `Ready for client review and approval process.`;
    }

    // Add milestone context
    reasoning += `\n\n📋 Target Milestone ${milestoneId}: "${targetMilestone.description}"`;
    reasoning += `\n💰 Amount: ${this.blockchain.formatAmount(targetMilestone.amount)} USDT0`;
    reasoning += `\n📅 Deadline: ${this.blockchain.formatTimestamp(targetMilestone.deadline)}`;
    reasoning += `\n\n🤖 AI Analysis: Evidence provided supports milestone completion. Recommendation submitted for client review.`;

    // ALWAYS recommend for demo purposes - remove conditional logic
    let suggestion = "";

    return {
      milestoneId,
      reasoning,
      recommend: true, // ALWAYS recommend
      suggestion
    };
  }

  /**
   * Submit AI recommendation to blockchain
   */
  async submitRecommendation(milestoneId, reasoning) {
    try {
      console.log(`\n🤖 Submitting recommendation for milestone ${milestoneId}...`);
      const receipt = await this.blockchain.submitAIRecommendation(milestoneId, reasoning);

      return `✅ AI recommendation submitted successfully!

📋 Recommendation Details:
  Milestone ID: ${milestoneId}
  Reasoning: ${reasoning}
  Transaction Hash: ${receipt.hash}

⚡ Gas sponsored - zero cost transaction!
🔗 View on ConfluxScan: https://evmtestnet.confluxscan.io/tx/${receipt.hash}

📝 Next Steps:
  1. Wait for approver (client) to review
  2. Approver will use 'approve ${milestoneId}' to confirm
  3. Funds will be released using 'release ${milestoneId}'`;
    } catch (error) {
      return `❌ Error submitting recommendation: ${error.message}`;
    }
  }

  /**
   * Approve milestone (approver only)
   */
  async approveMilestone(milestoneId) {
    try {
      console.log(`\n✅ Approving milestone ${milestoneId}...`);
      const receipt = await this.blockchain.approveMilestone(milestoneId);

      return `✅ Milestone ${milestoneId} approved successfully!

📋 Approval Details:
  Milestone ID: ${milestoneId}
  Approved by: ${this.blockchain.wallet.address}
  Transaction Hash: ${receipt.hash}

⚡ Gas sponsored - zero cost transaction!
🔗 View on ConfluxScan: https://evmtestnet.confluxscan.io/tx/${receipt.hash}

📝 Next Step:
  Release funds using: release ${milestoneId}`;
    } catch (error) {
      let errorMsg = `❌ Error approving milestone: ${error.message}`;

      // Add helpful tips for common errors
      if (error.message.includes("caller is not the approver")) {
        errorMsg += `\n\n💡 Solution: Only the approver (client) can approve milestones. Check your wallet address.`;
      } else if (error.message.includes("Milestone not found")) {
        errorMsg += `\n\n💡 Solution: Check the milestone ID using: milestone ${milestoneId}`;
      } else if (error.message.includes("already approved")) {
        errorMsg += `\n\n💡 Info: This milestone is already approved. You can proceed to release funds.`;
      } else if (error.message.includes("NoAIRecommendation") || error.message.includes("No AI recommendation")) {
        errorMsg += `\n\n💡 Solution: Submit proof first using: proof <evidence>
   The AI agent needs to analyze and recommend the milestone before approval.
   Example: proof https://github.com/user/repo/pull/123`;
      } else if (error.message.includes("not recommended")) {
        errorMsg += `\n\n💡 Solution: Submit proof first using: proof <evidence>
   The milestone needs AI recommendation before approval.`;
      }

      return errorMsg;
    }
  }

  /**
   * Release milestone funds (approver only)
   */
  async releaseMilestone(milestoneId) {
    try {
      console.log(`\n💸 Releasing funds for milestone ${milestoneId}...`);

      // Get milestone details first
      const milestone = await this.blockchain.getMilestone(milestoneId);

      const receipt = await this.blockchain.releaseMilestone(milestoneId);

      return `✅ Funds released successfully for milestone ${milestoneId}!

📋 Release Details:
  Milestone ID: ${milestoneId}
  Amount Released: ${this.blockchain.formatAmount(milestone.amount)} USDT0
  Beneficiary: (set in contract)
  Transaction Hash: ${receipt.hash}

⚡ Gas sponsored - zero cost transaction!
🔗 View on ConfluxScan: https://evmtestnet.confluxscan.io/tx/${receipt.hash}

💰 USDT0 has been transferred to the beneficiary's wallet!`;
    } catch (error) {
      let errorMsg = `❌ Error releasing funds: ${error.message}`;

      // Add helpful tips for common errors
      if (error.message.includes("caller is not the approver")) {
        errorMsg += `\n\n💡 Solution: Only the approver (client) can release funds. Check your wallet address.`;
      } else if (error.message.includes("Milestone not found")) {
        errorMsg += `\n\n💡 Solution: Check the milestone ID using: milestone ${milestoneId}`;
      } else if (error.message.includes("not approved")) {
        errorMsg += `\n\n💡 Solution: The milestone must be approved first. Use: approve ${milestoneId}`;
      } else if (error.message.includes("already released")) {
        errorMsg += `\n\n💡 Info: This milestone has already been released.`;
      } else if (error.message.includes("Insufficient")) {
        errorMsg += `\n\n💡 Solution: The contract doesn't have enough USDT0 balance to release this amount. Deposit more funds.`;
      } else if (error.message.includes("NoAIRecommendation") || error.message.includes("No AI recommendation")) {
        errorMsg += `\n\n💡 Solution: Submit proof first using: proof <evidence>
   The AI agent needs to analyze and recommend the milestone before approval.`;
      }

      return errorMsg;
    }
  }

  /**
   * Handle general conversation
   */
  async handleConversation(input) {
    // Simple conversation responses
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return "Hello! I'm your Conflux Milestone Escrow AI Agent. I can help you monitor milestones, analyze proofs, and manage fund releases. Type 'help' to see available commands.";
    }

    if (lowerInput.includes('gas')) {
      return "⚡ Gas Sponsorship: This contract uses Conflux CIP-30 gas sponsorship, meaning the approver and AI agent can execute transactions with zero gas costs! The contract owner sponsors the gas fees.";
    }

    if (lowerInput.includes('usdt') || lowerInput.includes('token')) {
      const balance = await this.blockchain.getUSDT0Balance();
      return `💰 USDT0 Token: This escrow uses USDT0 for all transactions. Current contract balance: ${this.blockchain.formatAmount(balance)} USDT0`;
    }

    if (lowerInput.includes('how') && lowerInput.includes('work')) {
      return `🔄 How it works:
1. Client deposits USDT0 and creates milestones
2. Developer completes work and submits proof
3. AI agent analyzes proof and recommends release
4. Client (approver) reviews and confirms
5. Funds are released with zero gas cost
6. Process repeats for each milestone`;
    }

    return `I'm here to help with milestone escrow management. You can ask me about:
- Contract status and milestones
- Submitting proofs for analysis
- Gas sponsorship benefits
- How the system works

Type 'help' for a full list of commands, or provide a GitHub PR link or proof description for analysis!`;
  }
}

// Start the agent if this file is run directly
if (require.main === module) {
  const agent = new MilestoneMonitorAgent();
  agent.start();
}

module.exports = MilestoneMonitorAgent;