// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title VulnerableBank
 * @notice 存在重入攻击（Reentrancy）漏洞的简易银行合约
 * @dev 漏洞点：withdraw() 中先向用户转账，再更新余额状态，
 *      攻击者可在 fallback/receive 中反复调用 withdraw 窃取资金。
 */
contract VulnerableBank {
    mapping(address => uint256) public balances;

    /// @notice 用户存款
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    /// @notice 用户提款 —— 存在重入漏洞
    function withdraw() public {
        uint256 balance = balances[msg.sender];
        require(balance > 0, "Insufficient balance");

        // 漏洞：先转账，后更新状态
        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Transfer failed");

        balances[msg.sender] = 0;
    }

    /// @notice 查看合约总余额
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
