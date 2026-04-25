// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// USDT0 Addresses
// USDT0 Mainnet: 0xaf37E8B6C9ED7f6318979f56Fc287d76c30847ff
// USDT0 Testnet: Set in deployment script

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title MilestoneEscrow
 * @dev Gas-sponsored milestone escrow contract for Conflux eSpace
 * Supports USDT0 deposits, milestone management, AI recommendations, and approver confirmations
 * Integrates with Conflux CIP-30 Gas Sponsorship for zero-gas transactions
 */
contract MilestoneEscrow is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // Conflux CIP-30 Gas Sponsorship Interface
    ISponsorWhitelistControl public constant sponsorWhitelist =
        ISponsorWhitelistControl(0x0888000000000000000000000000000000000001);

    // USDT0 Token Interface
    IERC20 public usdt0Token;

    // Contract Roles
    address public approver; // Client who approves releases
    address public beneficiary; // Developer who receives funds
    address public aiAgent; // AI agent that submits recommendations

    // Milestone Structure
    struct Milestone {
        uint256 id;
        uint256 amount;          // USDT0 amount for this milestone
        uint256 deadline;        // Unix timestamp deadline
        string description;      // Milestone description
        bool aiRecommended;      // AI has recommended release
        string aiReasoning;      // AI's reasoning for recommendation
        bool approved;           // Approver has confirmed release
        bool released;           // Funds have been released
        uint256 releasedAt;      // Timestamp when released
    }

    // State Variables
    uint256 public totalDeposited;
    uint256 public totalReleased;
    uint256 public milestoneCount;

    // Mappings
    mapping(uint256 => Milestone) public milestones;
    mapping(address => bool) public sponsoredAddresses; // Addresses with gas sponsorship

    // Events
    event Deposited(address indexed depositor, uint256 amount);
    event MilestoneCreated(uint256 indexed milestoneId, uint256 amount, uint256 deadline);
    event AIRecommendation(uint256 indexed milestoneId, string reasoning);
    event MilestoneApproved(uint256 indexed milestoneId, address indexed approver);
    event FundsReleased(uint256 indexed milestoneId, address indexed beneficiary, uint256 amount);
    event GasSponsorshipEnabled(address indexed sponsoredAddress);

    // Errors
    error InsufficientBalance();
    error InvalidMilestone();
    error MilestoneAlreadyReleased();
    error NotAuthorized();
    error InvalidAddress();
    error DeadlineNotReached();
    error NoAIRecommendation();
    error AlreadyApproved();

    /**
     * @dev Constructor to initialize the escrow contract
     * @param _usdt0Token Address of USDT0 token contract
     * @param _approver Address of the approver (client)
     * @param _beneficiary Address of the beneficiary (developer)
     * @param _aiAgent Address of the AI agent
     */
    constructor(
        address _usdt0Token,
        address _approver,
        address _beneficiary,
        address _aiAgent
    ) Ownable(msg.sender) {
        require(_usdt0Token != address(0), "InvalidAddress");
        require(_approver != address(0), "InvalidAddress");
        require(_beneficiary != address(0), "InvalidAddress");
        require(_aiAgent != address(0), "InvalidAddress");

        usdt0Token = IERC20(_usdt0Token);
        approver = _approver;
        beneficiary = _beneficiary;
        aiAgent = _aiAgent;
        milestoneCount = 0;

        // Enable gas sponsorship for key addresses (Conflux CIP-30)
        // NOTE: Temporarily disabled for initial deployment
        // _enableGasSponsorship(_approver);
        // _enableGasSponsorship(_aiAgent);
    }

    /**
     * @dev Enable gas sponsorship for an address using Conflux CIP-30
     * @param addr Address to enable gas sponsorship for
     */
    function _enableGasSponsorship(address addr) internal {
        bytes memory empty;
        // Add privilege for this contract to sponsor the address
        sponsorWhitelist.addPrivilege(addr, address(this));
        // Set this contract as gas sponsor for the address
        sponsorWhitelist.setSponsorForGas(addr, address(this));
        sponsoredAddresses[addr] = true;
        emit GasSponsorshipEnabled(addr);
    }

    /**
     * @dev Deposit USDT0 into the escrow
     * @param amount Amount of USDT0 to deposit
     */
    function deposit(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");

        // Transfer USDT0 from sender to contract
        usdt0Token.safeTransferFrom(msg.sender, address(this), amount);

        totalDeposited += amount;
        emit Deposited(msg.sender, amount);
    }

    /**
     * @dev Create a new milestone
     * @param amount USDT0 amount for this milestone
     * @param deadline Unix timestamp for milestone deadline
     * @param description Description of the milestone
     */
    function createMilestone(
        uint256 amount,
        uint256 deadline,
        string memory description
    ) external onlyOwner nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(deadline > block.timestamp, "Deadline must be in future");
        require(amount <= usdt0Token.balanceOf(address(this)), "Insufficient deposited funds");

        milestoneCount++;
        milestones[milestoneCount] = Milestone({
            id: milestoneCount,
            amount: amount,
            deadline: deadline,
            description: description,
            aiRecommended: false,
            aiReasoning: "",
            approved: false,
            released: false,
            releasedAt: 0
        });

        emit MilestoneCreated(milestoneCount, amount, deadline);
    }

    /**
     * @dev AI agent submits recommendation for milestone release (gas sponsored)
     * @param milestoneId ID of the milestone
     * @param reasoning AI's reasoning for the recommendation
     */
    function submitAIRecommendation(
        uint256 milestoneId,
        string memory reasoning
    ) external nonReentrant {
        require(msg.sender == aiAgent, "NotAuthorized");
        require(milestoneId > 0 && milestoneId <= milestoneCount, "InvalidMilestone");
        require(!milestones[milestoneId].aiRecommended, "Already recommended");

        Milestone storage milestone = milestones[milestoneId];
        milestone.aiRecommended = true;
        milestone.aiReasoning = reasoning;

        emit AIRecommendation(milestoneId, reasoning);
    }

    /**
     * @dev Approver confirms milestone release (human-in-the-loop, gas sponsored)
     * @param milestoneId ID of the milestone to approve
     */
    function approveMilestone(uint256 milestoneId) external nonReentrant {
        require(msg.sender == approver, "NotAuthorized");
        require(milestoneId > 0 && milestoneId <= milestoneCount, "InvalidMilestone");

        Milestone storage milestone = milestones[milestoneId];
        require(milestone.aiRecommended, "NoAIRecommendation");
        require(!milestone.approved, "AlreadyApproved");
        require(!milestone.released, "MilestoneAlreadyReleased");

        milestone.approved = true;
        emit MilestoneApproved(milestoneId, msg.sender);
    }

    /**
     * @dev Release funds for an approved milestone (gas sponsored for approver)
     * @param milestoneId ID of the milestone to release
     */
    function releaseMilestone(uint256 milestoneId) external nonReentrant {
        require(msg.sender == approver, "NotAuthorized");
        require(milestoneId > 0 && milestoneId <= milestoneCount, "InvalidMilestone");

        Milestone storage milestone = milestones[milestoneId];
        require(milestone.approved, "Not approved");
        require(!milestone.released, "MilestoneAlreadyReleased");
        require(usdt0Token.balanceOf(address(this)) >= milestone.amount, "InsufficientBalance");

        milestone.released = true;
        milestone.releasedAt = block.timestamp;
        totalReleased += milestone.amount;

        // Transfer USDT0 to beneficiary
        usdt0Token.safeTransfer(beneficiary, milestone.amount);

        emit FundsReleased(milestoneId, beneficiary, milestone.amount);
    }

    /**
     * @dev Update approver address
     * @param newApprover New approver address
     */
    function setApprover(address newApprover) external onlyOwner {
        require(newApprover != address(0), "InvalidAddress");

        // Remove sponsorship from old approver
        // NOTE: Temporarily disabled for initial deployment
        // if (sponsoredAddresses[approver]) {
        //     bytes memory empty;
        //     sponsorWhitelist.removePrivilege(approver, address(this));
        // }

        approver = newApprover;

        // Enable sponsorship for new approver
        // NOTE: Temporarily disabled for initial deployment
        // _enableGasSponsorship(newApprover);
    }

    /**
     * @dev Update beneficiary address
     * @param newBeneficiary New beneficiary address
     */
    function setBeneficiary(address newBeneficiary) external onlyOwner {
        require(newBeneficiary != address(0), "InvalidAddress");
        beneficiary = newBeneficiary;
    }

    /**
     * @dev Update AI agent address
     * @param newAiAgent New AI agent address
     */
    function setAIAgent(address newAiAgent) external onlyOwner {
        require(newAiAgent != address(0), "InvalidAddress");

        // Remove sponsorship from old AI agent
        // NOTE: Temporarily disabled for initial deployment
        // if (sponsoredAddresses[aiAgent]) {
        //     bytes memory empty;
        //     sponsorWhitelist.removePrivilege(aiAgent, address(this));
        // }

        aiAgent = newAiAgent;

        // Enable sponsorship for new AI agent
        // NOTE: Temporarily disabled for initial deployment
        // _enableGasSponsorship(newAiAgent);
    }

    /**
     * @dev Enable gas sponsorship for additional address
     * @param addr Address to enable gas sponsorship for
     */
    function enableGasSponsorship(address addr) external onlyOwner {
        require(addr != address(0), "InvalidAddress");
        require(!sponsoredAddresses[addr], "Already sponsored");
        _enableGasSponsorship(addr);
    }

    /**
     * @dev Get USDT0 balance of the contract
     */
    function getUSDT0Balance() external view returns (uint256) {
        return usdt0Token.balanceOf(address(this));
    }

    /**
     * @dev Get milestone details
     * @param milestoneId ID of the milestone
     */
    function getMilestone(uint256 milestoneId) external view returns (
        uint256 id,
        uint256 amount,
        uint256 deadline,
        string memory description,
        bool aiRecommended,
        string memory aiReasoning,
        bool approved,
        bool released,
        uint256 releasedAt
    ) {
        require(milestoneId > 0 && milestoneId <= milestoneCount, "InvalidMilestone");
        Milestone memory milestone = milestones[milestoneId];
        return (
            milestone.id,
            milestone.amount,
            milestone.deadline,
            milestone.description,
            milestone.aiRecommended,
            milestone.aiReasoning,
            milestone.approved,
            milestone.released,
            milestone.releasedAt
        );
    }

    /**
     * @dev Get all milestones
     */
    function getAllMilestones() external view returns (Milestone[] memory) {
        Milestone[] memory allMilestones = new Milestone[](milestoneCount);
        for (uint256 i = 1; i <= milestoneCount; i++) {
            allMilestones[i - 1] = milestones[i];
        }
        return allMilestones;
    }

    /**
     * @dev Get contract status
     */
    function getContractStatus() external view returns (
        uint256 deposited,
        uint256 released,
        uint256 remaining,
        uint256 milestonesCreated,
        uint256 milestonesCompleted
    ) {
        uint256 completed = 0;
        for (uint256 i = 1; i <= milestoneCount; i++) {
            if (milestones[i].released) {
                completed++;
            }
        }
        return (
            totalDeposited,
            totalReleased,
            totalDeposited - totalReleased,
            milestoneCount,
            completed
        );
    }
}

/**
 * @title ISponsorWhitelistControl
 * @dev Interface for Conflux CIP-30 Gas Sponsorship
 */
interface ISponsorWhitelistControl {
    /**
     * @dev Add privilege for an address to be sponsored by this contract
     * @param account Address to sponsor
     * @param sponsor Address that will pay gas (this contract)
     */
    function addPrivilege(address account, address sponsor) external;

    /**
     * @dev Remove privilege for an address
     * @param account Address to remove sponsorship from
     * @param sponsor Address that was paying gas
     */
    function removePrivilege(address account, address sponsor) external;

    /**
     * @dev Set sponsor for gas for an address
     * @param account Address to set sponsor for
     * @param sponsor Address that will pay gas
     */
    function setSponsorForGas(address account, address sponsor) external;
}