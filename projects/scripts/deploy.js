const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting deployment to Conflux eSpace Testnet...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);

  // Network information
  const network = await hre.ethers.provider.getNetwork();
  console.log("🌐 Network:", network.name);
  console.log("🔗 Chain ID:", network.chainId.toString());

  // Deploy MockERC20 first for testing
  console.log("\n🏗️  Deploying MockERC20 token contract...");
  const MockERC20 = await hre.ethers.getContractFactory("MockERC20");
  const mockERC20 = await MockERC20.deploy("Mock USDT0", "USDT0", 18);
  await mockERC20.waitForDeployment();
  const usdt0Address = await mockERC20.getAddress();
  console.log("✅ MockERC20 deployed to:", usdt0Address);

  // Demo addresses (replace with actual addresses)
  const APPROVER = deployer.address; // Client who approves releases
  const BENEFICIARY = deployer.address; // Developer who receives funds (using same address for testing)
  const AI_AGENT = deployer.address; // AI agent address (using same address for testing)

  console.log("\n📋 Deployment Parameters:");
  console.log("  Deployer:", deployer.address);
  console.log("  Approver (Client):", APPROVER);
  console.log("  Beneficiary (Developer):", BENEFICIARY);
  console.log("  AI Agent:", AI_AGENT);

  // Deploy MilestoneEscrow contract
  console.log("\n🏗️  Deploying MilestoneEscrow contract...");
  const MilestoneEscrow = await hre.ethers.getContractFactory("MilestoneEscrow");
  const milestoneEscrow = await MilestoneEscrow.deploy(
    usdt0Address,
    APPROVER,
    BENEFICIARY,
    AI_AGENT
  );

  await milestoneEscrow.waitForDeployment();
  const contractAddress = await milestoneEscrow.getAddress();

  console.log("✅ MilestoneEscrow deployed to:", contractAddress);

  // Wait for a few block confirmations
  console.log("\n⏳ Waiting for block confirmations...");
  await milestoneEscrow.deploymentTransaction().wait(5);

  // Verify deployment
  console.log("\n🔍 Verifying deployment...");
  const owner = await milestoneEscrow.owner();
  const usdt0Token = await milestoneEscrow.usdt0Token();
  const approver = await milestoneEscrow.approver();
  const beneficiary = await milestoneEscrow.beneficiary();
  const aiAgent = await milestoneEscrow.aiAgent();

  console.log("  Owner:", owner);
  console.log("  USDT0 Token:", usdt0Token);
  console.log("  Approver:", approver);
  console.log("  Beneficiary:", beneficiary);
  console.log("  AI Agent:", aiAgent);

  // Save deployment info
  const deploymentInfo = {
    network: network.name,
    chainId: network.chainId.toString(),
    mockERC20Address: usdt0Address,
    contractAddress: contractAddress,
    deployer: deployer.address,
    usdt0Token: usdt0Token,
    approver: approver,
    beneficiary: beneficiary,
    aiAgent: aiAgent,
    deploymentTimestamp: new Date().toISOString(),
    blockExplorer: `https://evmtestnet.confluxscan.io/address/${contractAddress}`
  };

  const deploymentPath = path.join(__dirname, "..", "deployment.json");
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
  console.log("\n📄 Deployment info saved to:", deploymentPath);

  // Update .env file
  const envPath = path.join(__dirname, "..", ".env");
  let envContent = "";
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, "utf8");
  }

  // Update or add USDT0_ADDRESS
  const usdt0AddressRegex = /^USDT0_ADDRESS=.*$/m;
  const usdt0AddressLine = `USDT0_ADDRESS=${usdt0Address}`;

  if (usdt0AddressRegex.test(envContent)) {
    envContent = envContent.replace(usdt0AddressRegex, usdt0AddressLine);
  } else {
    envContent += `\n${usdt0AddressLine}\n`;
  }

  // Update or add CONTRACT_ADDRESS
  const contractAddressRegex = /^CONTRACT_ADDRESS=.*$/m;
  const contractAddressLine = `CONTRACT_ADDRESS=${contractAddress}`;

  if (contractAddressRegex.test(envContent)) {
    envContent = envContent.replace(contractAddressRegex, contractAddressLine);
  } else {
    envContent += `\n${contractAddressLine}\n`;
  }

  fs.writeFileSync(envPath, envContent);
  console.log("📄 Updated .env file with USDT0 and contract addresses");

  console.log("\n🎉 Deployment completed successfully!");
  console.log("\n📊 Next Steps:");
  console.log("  1. Fund the contract with USDT0");
  console.log("  2. Create milestones using createMilestone()");
  console.log("  3. Run AI agent to monitor and recommend releases");
  console.log("  4. Approver confirms releases using approveMilestone() and releaseMilestone()");
  console.log("\n🔗 Block Explorer:", deploymentInfo.blockExplorer);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });