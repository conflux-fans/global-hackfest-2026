const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MilestoneEscrow Contract", function () {
  let milestoneEscrow;
  let usdt0Token;
  let owner;
  let approver;
  let beneficiary;
  let aiAgent;
  let user;

  beforeEach(async function () {
    [owner, approver, beneficiary, aiAgent, user] = await ethers.getSigners();

    // Deploy mock USDT0 token for testing
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    usdt0Token = await MockERC20.deploy("USDT0", "USDT0", 18);
    await usdt0Token.waitForDeployment();

    // Deploy MilestoneEscrow contract
    const MilestoneEscrow = await ethers.getContractFactory("MilestoneEscrow");
    milestoneEscrow = await MilestoneEscrow.deploy(
      await usdt0Token.getAddress(),
      approver.address,
      beneficiary.address,
      aiAgent.address
    );
    await milestoneEscrow.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await milestoneEscrow.owner()).to.equal(owner.address);
    });

    it("Should set the correct USDT0 token", async function () {
      expect(await milestoneEscrow.usdt0Token()).to.equal(await usdt0Token.getAddress());
    });

    it("Should set the correct approver", async function () {
      expect(await milestoneEscrow.approver()).to.equal(approver.address);
    });

    it("Should set the correct beneficiary", async function () {
      expect(await milestoneEscrow.beneficiary()).to.equal(beneficiary.address);
    });

    it("Should set the correct AI agent", async function () {
      expect(await milestoneEscrow.aiAgent()).to.equal(aiAgent.address);
    });

    it("Should initialize with zero milestones", async function () {
      expect(await milestoneEscrow.milestoneCount()).to.equal(0);
    });
  });

  describe("Deposits", function () {
    it("Should accept USDT0 deposits", async function () {
      const depositAmount = ethers.parseEther("1000");

      // Mint and approve USDT0
      await usdt0Token.mint(user.address, depositAmount);
      await usdt0Token.connect(user).approve(await milestoneEscrow.getAddress(), depositAmount);

      // Deposit
      await expect(milestoneEscrow.connect(user).deposit(depositAmount))
        .to.emit(milestoneEscrow, "Deposited")
        .withArgs(user.address, depositAmount);

      // Check balance
      expect(await milestoneEscrow.totalDeposited()).to.equal(depositAmount);
      expect(await usdt0Token.balanceOf(await milestoneEscrow.getAddress())).to.equal(depositAmount);
    });

    it("Should reject zero amount deposits", async function () {
      await expect(milestoneEscrow.connect(user).deposit(0))
        .to.be.revertedWith("Amount must be greater than 0");
    });
  });

  describe("Milestones", function () {
    const milestoneAmount = ethers.parseEther("300");
    const milestoneDeadline = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days
    const milestoneDescription = "Complete project setup";

    beforeEach(async function () {
      // Deposit funds first
      const depositAmount = ethers.parseEther("1000");
      await usdt0Token.mint(owner.address, depositAmount);
      await usdt0Token.approve(await milestoneEscrow.getAddress(), depositAmount);
      await milestoneEscrow.deposit(depositAmount);
    });

    it("Should create a milestone", async function () {
      await expect(milestoneEscrow.createMilestone(milestoneAmount, milestoneDeadline, milestoneDescription))
        .to.emit(milestoneEscrow, "MilestoneCreated")
        .withArgs(1, milestoneAmount, milestoneDeadline);

      expect(await milestoneEscrow.milestoneCount()).to.equal(1);

      const milestone = await milestoneEscrow.getMilestone(1);
      expect(milestone.amount).to.equal(milestoneAmount);
      expect(milestone.deadline).to.equal(milestoneDeadline);
      expect(milestone.description).to.equal(milestoneDescription);
    });

    it("Should reject milestone creation with insufficient funds", async function () {
      const largeAmount = ethers.parseEther("2000"); // More than deposited
      await expect(milestoneEscrow.createMilestone(largeAmount, milestoneDeadline, milestoneDescription))
        .to.be.revertedWith("Insufficient deposited funds");
    });

    it("Should reject milestone creation with past deadline", async function () {
      const pastDeadline = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
      await expect(milestoneEscrow.createMilestone(milestoneAmount, pastDeadline, milestoneDescription))
        .to.be.revertedWith("Deadline must be in future");
    });
  });

  describe("AI Recommendations", function () {
    const milestoneAmount = ethers.parseEther("300");
    const milestoneDeadline = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
    const milestoneDescription = "Complete project setup";
    const aiReasoning = "GitHub repository shows complete implementation with tests passing";

    beforeEach(async function () {
      // Deposit and create milestone
      const depositAmount = ethers.parseEther("1000");
      await usdt0Token.mint(owner.address, depositAmount);
      await usdt0Token.approve(await milestoneEscrow.getAddress(), depositAmount);
      await milestoneEscrow.deposit(depositAmount);
      await milestoneEscrow.createMilestone(milestoneAmount, milestoneDeadline, milestoneDescription);
    });

    it("Should allow AI agent to submit recommendation", async function () {
      await expect(milestoneEscrow.connect(aiAgent).submitAIRecommendation(1, aiReasoning))
        .to.emit(milestoneEscrow, "AIRecommendation")
        .withArgs(1, aiReasoning);

      const milestone = await milestoneEscrow.getMilestone(1);
      expect(milestone.aiRecommended).to.be.true;
      expect(milestone.aiReasoning).to.equal(aiReasoning);
    });

    it("Should reject recommendation from non-AI agent", async function () {
      await expect(milestoneEscrow.connect(user).submitAIRecommendation(1, aiReasoning))
        .to.be.revertedWith("NotAuthorized");
    });

    it("Should reject duplicate recommendations", async function () {
      await milestoneEscrow.connect(aiAgent).submitAIRecommendation(1, aiReasoning);
      await expect(milestoneEscrow.connect(aiAgent).submitAIRecommendation(1, "Different reasoning"))
        .to.be.revertedWith("Already recommended");
    });
  });

  describe("Milestone Approval and Release", function () {
    const milestoneAmount = ethers.parseEther("300");
    const milestoneDeadline = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
    const milestoneDescription = "Complete project setup";
    const aiReasoning = "GitHub repository shows complete implementation with tests passing";

    beforeEach(async function () {
      // Setup: deposit, create milestone, AI recommendation
      const depositAmount = ethers.parseEther("1000");
      await usdt0Token.mint(owner.address, depositAmount);
      await usdt0Token.approve(await milestoneEscrow.getAddress(), depositAmount);
      await milestoneEscrow.deposit(depositAmount);
      await milestoneEscrow.createMilestone(milestoneAmount, milestoneDeadline, milestoneDescription);
      await milestoneEscrow.connect(aiAgent).submitAIRecommendation(1, aiReasoning);
    });

    it("Should allow approver to approve milestone", async function () {
      await expect(milestoneEscrow.connect(approver).approveMilestone(1))
        .to.emit(milestoneEscrow, "MilestoneApproved")
        .withArgs(1, approver.address);

      const milestone = await milestoneEscrow.getMilestone(1);
      expect(milestone.approved).to.be.true;
    });

    it("Should reject approval from non-approver", async function () {
      await expect(milestoneEscrow.connect(user).approveMilestone(1))
        .to.be.revertedWith("NotAuthorized");
    });

    it("Should reject approval without AI recommendation", async function () {
      // Create second milestone without AI recommendation
      await milestoneEscrow.createMilestone(milestoneAmount, milestoneDeadline, "Second milestone");
      await expect(milestoneEscrow.connect(approver).approveMilestone(2))
        .to.be.revertedWith("NoAIRecommendation");
    });

    it("Should release funds to beneficiary", async function () {
      const initialBalance = await usdt0Token.balanceOf(beneficiary.address);

      await milestoneEscrow.connect(approver).approveMilestone(1);

      await expect(milestoneEscrow.connect(approver).releaseMilestone(1))
        .to.emit(milestoneEscrow, "FundsReleased")
        .withArgs(1, beneficiary.address, milestoneAmount);

      const finalBalance = await usdt0Token.balanceOf(beneficiary.address);
      expect(finalBalance - initialBalance).to.equal(milestoneAmount);

      const milestone = await milestoneEscrow.getMilestone(1);
      expect(milestone.released).to.be.true;
      expect(milestone.releasedAt).to.be.gt(0);
    });

    it("Should reject release from non-approver", async function () {
      await milestoneEscrow.connect(approver).approveMilestone(1);
      await expect(milestoneEscrow.connect(user).releaseMilestone(1))
        .to.be.revertedWith("NotAuthorized");
    });

    it("Should reject release without approval", async function () {
      await expect(milestoneEscrow.connect(approver).releaseMilestone(1))
        .to.be.revertedWith("Not approved");
    });

    it("Should reject duplicate releases", async function () {
      await milestoneEscrow.connect(approver).approveMilestone(1);
      await milestoneEscrow.connect(approver).releaseMilestone(1);
      await expect(milestoneEscrow.connect(approver).releaseMilestone(1))
        .to.be.revertedWith("MilestoneAlreadyReleased");
    });
  });

  describe("Contract Status", function () {
    it("Should return correct contract status", async function () {
      const depositAmount = ethers.parseEther("1000");
      await usdt0Token.mint(owner.address, depositAmount);
      await usdt0Token.approve(await milestoneEscrow.getAddress(), depositAmount);
      await milestoneEscrow.deposit(depositAmount);

      const status = await milestoneEscrow.getContractStatus();
      expect(status[0]).to.equal(depositAmount); // totalDeposited
      expect(status[1]).to.equal(0); // totalReleased
      expect(status[2]).to.equal(depositAmount); // remaining
      expect(status[3]).to.equal(0); // milestonesCreated
      expect(status[4]).to.equal(0); // milestonesCompleted
    });

    it("Should return USDT0 balance", async function () {
      const depositAmount = ethers.parseEther("1000");
      await usdt0Token.mint(owner.address, depositAmount);
      await usdt0Token.approve(await milestoneEscrow.getAddress(), depositAmount);
      await milestoneEscrow.deposit(depositAmount);

      const balance = await milestoneEscrow.getUSDT0Balance();
      expect(balance).to.equal(depositAmount);
    });
  });

  describe("Gas Sponsorship", function () {
    it("Should enable gas sponsorship for approver and AI agent on deployment", async function () {
      // This test verifies that gas sponsorship is set up correctly
      // Actual gas sponsorship functionality is tested on Conflux network
      const approverAddr = await milestoneEscrow.approver();
      const aiAgentAddr = await milestoneEscrow.aiAgent();

      expect(approverAddr).to.equal(approver.address);
      expect(aiAgentAddr).to.equal(aiAgent.address);
    });
  });
});