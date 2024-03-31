// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BorrowerToken is ERC20, Ownable {
    address public controller;
    constructor(
        address initialOwner
    ) ERC20("iINR", "iINR") Ownable(initialOwner) {}

    function mint(address to, uint256 amount) public onlyController {
        _mint(to, amount);
    }

    modifier onlyController() {
        require(msg.sender == controller, "not a controller");
        _;
    }

    function changeController(address _controller) public onlyOwner {
        controller = _controller;
    }
}
