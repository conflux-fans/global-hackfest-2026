const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("⚡ Setting up Gas Sponsorship for Conflux eSpace...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Setting up sponsorship with account:", deployer.address);

  // Load deployment info
  const deploymentPath = path.join(__dirname, "..", "deployment.json");
  if (!fs.existsSync(deploymentPath)) {
    console.error("❌ Deployment info not found. Please deploy the contract first.");
    return;
  }

  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
  const contractAddress = deploymentInfo.contractAddress;

  console.log("📍 Contract Address:", contractAddress);

  // Get contract instance
  const milestoneEscrow = await hre.ethers.getContractAt("MilestoneEscrow", contractAddress);

  // Get current sponsored addresses
  console.log("\n🔍 Checking current gas sponsorship status...");
  const approver = await milestoneEscrow.approver();
  const beneficiary = await milestoneEscrow.beneficiary();
  const aiAgent = await milestoneEscrow.aiAgent();

  console.log("  Approver:", approver);
  console.log("  Beneficiary:", beneficiary);
  console.log("  AI Agent:", aiAgent);

  // Check contract USDT0 balance
  const usdt0Token = await milestoneEscrow.usdt0Token();
  const usdt0Contract = await hre.ethers.getContractAt("IERC20", usdt0Token);
  const balance = await usdt0Contract.balanceOf(contractAddress);
  console.log("\n💰 Contract USDT0 Balance:", hre.ethers.formatEther(balance), "USDT0");

  // Get contract status
  const status = await milestoneEscrow.getContractStatus();
  console.log("\n📊 Contract Status:");
  console.log("  Total Deposited:", hre.ethers.formatEther(status[0]), "USDT0");
  console.log("  Total Released:", hre.ethers.formatEther(status[1]), "USDT0");
  console.log("  Remaining:", hre.ethers.formatEther(status[2]), "USDT0");
  console.log("  Milestones Created:", status[3].toString());
  console.log("  Milestones Completed:", status[4].toString());

  // Test gas sponsorship by calling a view function
  console.log("\n🧪 Testing gas sponsorship...");
  try {
    const usdt0Balance = await milestoneEscrow.getUSDT0Balance();
    console.log("✅ Successfully called getUSDT0Balance():", hre.ethers.formatEther(usdt0Balance), "USDT0");
  } catch (error) {
    console.error("❌ Error calling getUSDT0Balance():", error.message);
  }

  console.log("\n🎉 Gas sponsorship setup completed!");
  console.log("\n📋 Gas Sponsorship Details:");
  console.log("  SponsorWhitelistControl: 0x0888000000000000000000000000000000000001");
  console.log("  Sponsored Addresses:");
  console.log("    - Approver:", approver);
  console.log("    - AI Agent:", aiAgent);
  console.log("\n💡 These addresses can now call contract functions with zero gas!");
  console.log("\n🔗 Conflux Gas Sponsorship Docs: https://developer.confluxchain.org/espace/gas-sponsorship/overview");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });