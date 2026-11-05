// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title FixedBank
 * @notice 修复重入漏洞后的银行合约
 * @dev 修复方案：
 *      1. 先更新状态（余额置零），再转账 —— Checks-Effects-Interactions 模式
 *      2. 引入 ReentrancyGuard 互斥锁，防止重入
 */
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract FixedBank is ReentrancyGuard {
    mapping(address => uint256) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    /// @notice 安全提款：先更新状态，后转账，并加互斥锁
    function withdraw() public nonReentrant {
        uint256 balance = balances[msg.sender];
        require(balance > 0, "Insufficient balance");

        // 修复①：先更新状态
        balances[msg.sender] = 0;

        // 修复②：后转账
        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Transfer failed");
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
