const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🎬 Running Milestone Escrow Demo Flow...\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("👤 Demo Account:", deployer.address);

  // Load deployment info
  const deploymentPath = path.join(__dirname, "..", "deployment.json");
  if (!fs.existsSync(deploymentPath)) {
    console.error("❌ Deployment info not found. Please deploy the contract first.");
    return;
  }

  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
  const contractAddress = deploymentInfo.contractAddress;

  console.log("📍 Contract Address:", contractAddress);
  console.log("🔗 Explorer:", deploymentInfo.blockExplorer, "\n");

  // Get contract instance
  const milestoneEscrow = await hre.ethers.getContractAt("MilestoneEscrow", contractAddress);

  // Get USDT0 token contract
  const usdt0Address = await milestoneEscrow.usdt0Token();
  const usdt0Contract = await hre.ethers.getContractAt("IERC20", usdt0Address);

  // ============================================
  // STEP 1: Check Initial Status
  // ============================================
  console.log("📊 STEP 1: Checking Initial Contract Status");
  console.log("─".repeat(50));

  const initialStatus = await milestoneEscrow.getContractStatus();
  console.log("Total Deposited:", hre.ethers.formatEther(initialStatus[0]), "USDT0");
  console.log("Total Released:", hre.ethers.formatEther(initialStatus[1]), "USDT0");
  console.log("Milestones Created:", initialStatus[3].toString());
  console.log("Milestones Completed:", initialStatus[4].toString());

  const usdt0Balance = await milestoneEscrow.getUSDT0Balance();
  console.log("Contract USDT0 Balance:", hre.ethers.formatEther(usdt0Balance), "USDT0\n");

  // ============================================
  // STEP 2: Deposit USDT0 (Demo - would need actual USDT0)
  // ============================================
  console.log("💰 STEP 2: Deposit USDT0");
  console.log("─".repeat(50));
  console.log("⚠️  Note: This step requires actual USDT0 tokens.");
  console.log("For demo purposes, we'll skip actual deposit and show the flow.\n");

  const demoDepositAmount = hre.ethers.parseEther("1000"); // 1000 USDT0
  console.log("Would deposit:", hre.ethers.formatEther(demoDepositAmount), "USDT0");
  console.log("Command: milestoneEscrow.deposit(", hre.ethers.formatEther(demoDepositAmount), ")\n");

  // ============================================
  // STEP 3: Create Milestones
  // ============================================
  console.log("🎯 STEP 3: Create Milestones");
  console.log("─".repeat(50));

  const milestones = [
    {
      amount: hre.ethers.parseEther("300"),
      deadline: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days from now
      description: "Complete project architecture and setup development environment"
    },
    {
      amount: hre.ethers.parseEther("300"),
      deadline: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60, // 14 days from now
      description: "Implement core smart contracts and pass security audit"
    },
    {
      amount: hre.ethers.parseEther("400"),
      deadline: Math.floor(Date.now() / 1000) + 21 * 24 * 60 * 60, // 21 days from now
      description: "Deploy to mainnet, complete testing, and deliver final documentation"
    }
  ];

  for (let i = 0; i < milestones.length; i++) {
    const ms = milestones[i];
    console.log(`Creating Milestone ${i + 1}:`);
    console.log("  Amount:", hre.ethers.formatEther(ms.amount), "USDT0");
    console.log("  Deadline:", new Date(ms.deadline * 1000).toLocaleString());
    console.log("  Description:", ms.description);
    console.log("  Command: milestoneEscrow.createMilestone(",
      hre.ethers.formatEther(ms.amount), ",",
      ms.deadline, ',',
      `"${ms.description}")\n`
    );
  }

  // ============================================
  // STEP 4: AI Agent Simulation
  // ============================================
  console.log("🤖 STEP 4: AI Agent Monitoring & Recommendation");
  console.log("─".repeat(50));
  console.log("AI Agent analyzes milestone progress...\n");

  const aiRecommendations = [
    {
      milestoneId: 1,
      reasoning: "GitHub repository shows complete architecture with 15+ commits, development environment setup confirmed, and initial smart contract drafts submitted. Milestone requirements met with 95% confidence."
    },
    {
      milestoneId: 2,
      reasoning: "Core contracts implemented and tested. Security audit passed with no critical issues. Code review completed successfully. Ready for deployment."
    },
    {
      milestoneId: 3,
      reasoning: "Mainnet deployment completed successfully. All test cases passed. Documentation comprehensive and clear. Project deliverables fully completed."
    }
  ];

  for (const rec of aiRecommendations) {
    console.log(`AI Recommendation for Milestone ${rec.milestoneId}:`);
    console.log("  Command: milestoneEscrow.submitAIRecommendation(",
      rec.milestoneId, ',',
      `"${rec.reasoning}")\n`
    );
  }

  // ============================================
  // STEP 5: Approver Confirmation (Human-in-the-loop)
  // ============================================
  console.log("✅ STEP 5: Approver Confirmation");
  console.log("─".repeat(50));
  console.log("Client (Approver) reviews AI recommendations...\n");

  for (let i = 1; i <= milestones.length; i++) {
    console.log(`Milestone ${i} Approval:`);
    console.log("  Command: milestoneEscrow.approveMilestone(", i, ")\n");
  }

  // ============================================
  // STEP 6: Fund Release (Gas Sponsored)
  // ============================================
  console.log("💸 STEP 6: Fund Release (Zero Gas)");
  console.log("─".repeat(50));
  console.log("Releasing funds for approved milestones...\n");

  for (let i = 1; i <= milestones.length; i++) {
    const ms = milestones[i - 1];
    console.log(`Releasing Milestone ${i}:`);
    console.log("  Amount:", hre.ethers.formatEther(ms.amount), "USDT0");
    console.log("  Command: milestoneEscrow.releaseMilestone(", i, ")");
    console.log("  ⚡ Gas Cost: 0 (Sponsored by contract)\n");
  }

  // ============================================
  // STEP 7: Final Status
  // ============================================
  console.log("📊 STEP 7: Final Contract Status");
  console.log("─".repeat(50));

  const finalStatus = await milestoneEscrow.getContractStatus();
  console.log("Total Deposited:", hre.ethers.formatEther(finalStatus[0]), "USDT0");
  console.log("Total Released:", hre.ethers.formatEther(finalStatus[1]), "USDT0");
  console.log("Remaining:", hre.ethers.formatEther(finalStatus[2]), "USDT0");
  console.log("Milestones Created:", finalStatus[3].toString());
  console.log("Milestones Completed:", finalStatus[4].toString());

  const allMilestones = await milestoneEscrow.getAllMilestones();
  console.log("\n📋 All Milestones:");
  for (const ms of allMilestones) {
    console.log(`\nMilestone ${ms.id}:`);
    console.log("  Amount:", hre.ethers.formatEther(ms.amount), "USDT0");
    console.log("  Description:", ms.description);
    console.log("  AI Recommended:", ms.aiRecommended);
    console.log("  AI Reasoning:", ms.aiReasoning.substring(0, 50) + "...");
    console.log("  Approved:", ms.approved);
    console.log("  Released:", ms.released);
    if (ms.released) {
      console.log("  Released At:", new Date(Number(ms.releasedAt) * 1000).toLocaleString());
    }
  }

  // ============================================
  // Demo Summary
  // ============================================
  console.log("\n🎉 Demo Flow Completed!");
  console.log("─".repeat(50));
  console.log("\n📹 Demo Video Checklist:");
  console.log("  ☐ Show contract deployment on ConfluxScan");
  console.log("  ☐ Demonstrate USDT0 deposit transaction");
  console.log("  ☐ Show milestone creation");
  console.log("  ☐ Chat with AI agent about progress");
  console.log("  ☐ Submit proof (GitHub PR link)");
  console.log("  ☐ Show AI recommendation");
  console.log("  ☐ Approver confirms release");
  console.log("  ☐ Show zero-gas transaction on ConfluxScan");
  console.log("  ☐ Verify USDT0 received by beneficiary");
  console.log("\n🔗 Resources:");
  console.log("  Contract:", deploymentInfo.blockExplorer);
  console.log("  ConfluxScan: https://evmtestnet.confluxscan.io");
  console.log("  Gas Sponsorship: https://developer.confluxchain.org/espace/gas-sponsorship/overview");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });