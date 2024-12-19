// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Faucet {
    address public owner;
    uint256 public lastDripTime;
    uint256 public dripAmount;
    mapping(address => uint256) public dripBalances;

    constructor() {
        owner = msg.sender;
        lastDripTime = block.timestamp;
        dripAmount = 100;
    }

    function drip() public {
        require(block.timestamp > lastDripTime + 1 days, "Faucet: Drip too soon");
        dripBalances[msg.sender] += dripAmount;
        lastDripTime = block.timestamp;
    }

    function withdraw(uint256 amount) public {
        require(dripBalances[msg.sender] >= amount, "Faucet: Insufficient funds");
        dripBalances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function withdrawAll() public {
        withdraw(dripBalances[msg.sender]);
    }
}