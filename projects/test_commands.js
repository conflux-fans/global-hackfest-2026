const MilestoneMonitorAgent = require("./MilestoneMonitorAgent");
const BlockchainInterface = require("./BlockchainInterface");

async function testBasicFunctionality() {
  console.log("🧪 Testing AIMilestone functionality...\n");

  try {
    // Test blockchain connection
    console.log("1️⃣ Testing blockchain connection...");
    const blockchain = new BlockchainInterface();
    const status = await blockchain.getContractStatus();
    console.log("✅ Blockchain connected!");
    console.log(`   Total Deposited: ${blockchain.formatAmount(status.totalDeposited)} USDT0`);
    console.log(`   Milestones Created: ${status.milestonesCreated}\n`);

    // Test milestones listing
    console.log("2️⃣ Testing milestones listing...");
    const milestones = await blockchain.getAllMilestones();
    console.log(`✅ Found ${milestones.length} milestone(s)`);
    if (milestones.length > 0) {
      milestones.forEach(ms => {
        console.log(`   Milestone ${ms.id}: ${ms.description}`);
        console.log(`   Amount: ${blockchain.formatAmount(ms.amount)} USDT0`);
        console.log(`   Status: ${ms.released ? 'Released' : ms.approved ? 'Approved' : ms.aiRecommended ? 'AI Recommended' : 'Pending'}\n`);
      });
    }

    // Test AI agent initialization
    console.log("3️⃣ Testing AI agent initialization...");
    const agent = new MilestoneMonitorAgent();
    console.log("✅ AI agent initialized successfully!\n");

    // Test proof analysis logic
    console.log("4️⃣ Testing proof analysis logic...");
    const testProof = "https://github.com/user/repo/pull/123 - Implementation completed and tested";
    const pendingMilestones = milestones.filter(ms => !ms.released && !ms.approved);

    if (pendingMilestones.length > 0) {
      const analysis = agent.analyzeProofContent(testProof, pendingMilestones);
      console.log("✅ Proof analysis logic works!");
      console.log(`   Milestone ID: ${analysis.milestoneId}`);
      console.log(`   Recommend: ${analysis.recommend ? 'Yes' : 'No'}`);
      console.log(`   Reasoning: ${analysis.reasoning.substring(0, 100)}...\n`);
    } else {
      console.log("⚠️  No pending milestones to test proof analysis\n");
    }

    console.log("🎉 All basic functionality tests passed!");
    console.log("\n📋 Ready for demo:");
    console.log("   - deposit <amount>");
    console.log("   - create milestone <amount> <deadline> <description>");
    console.log("   - proof <text>");
    console.log("   - approve <id>");
    console.log("   - release <id>");

    process.exit(0);

  } catch (error) {
    console.error("❌ Test failed:", error.message);
    process.exit(1);
  }
}

// Run tests
testBasicFunctionality();