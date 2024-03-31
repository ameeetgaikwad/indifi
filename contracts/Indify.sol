// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {BorrowerToken} from "./BorrowerToken.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract IndiFi {
    address public USDT_TOKEN;

    // Struct to represent a liquidity provider
    struct LiquidityProvider {
        address provider;
        address token;
        uint256 amount;
    }

    // Struct to represent a borrower
    struct Borrower {
        uint256 collateralAmount;
        uint256 borrowedAmount;
        uint256 startTime;
    }

    BorrowerToken public borrowToken;

    // Mapping from addresses to liquidity provider details
    mapping(address => LiquidityProvider) public lenders;

    // Mapping from addresses to borrower details
    mapping(address => Borrower) public borrowers;

    // Borrower limit
    mapping(address => uint256) public borrowerLimit;

    // Events
    event LiquidityProvided(address indexed provide, uint256 amount);
    event LiquidityRemoved(address indexed provider, uint256 amount);
    event TokensBorrowed(address indexed borrower, uint256 amount);
    event TokensRepayed(address indexed borrower, uint256 amount);

    // Constructor
    constructor(BorrowerToken _borrowToken, address _usdtToken) {
        borrowToken = _borrowToken;
        USDT_TOKEN = _usdtToken;
    }

    // Function to lend tokens
    function lend(uint256 _amount) external {
        require(_amount > 0, "Lending amount must be greater than 0 ETH");
        // Transfer the tokens from the lender to this contract
        IERC20(USDT_TOKEN).transferFrom(msg.sender, address(this), _amount);
        borrowerLimit[msg.sender] += _amount;
        lenders[msg.sender].amount += _amount; // check it again
        // Store lender details
        emit LiquidityProvided(msg.sender, _amount);
    }

    function borrow(uint256 _amount) external {
        require(_amount <= borrowerLimit[msg.sender], "not enough collateral");
        borrowToken.mint(msg.sender, _amount);
        borrowerLimit[msg.sender] -= _amount;
        emit TokensBorrowed(msg.sender, _amount);
    }

    function repay(uint256 _amount) external {
        require(
            lenders[msg.sender].amount >= _amount,
            "not enough eth to repay"
        );
        lenders[msg.sender].amount -= _amount;
        borrowToken.transferFrom(msg.sender, address(this), _amount);
        IERC20(USDT_TOKEN).transfer(msg.sender, _amount);
        emit LiquidityRemoved(msg.sender, _amount);
        emit TokensRepayed(msg.sender, _amount);
    }
}
