// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title FixedToken
 * @notice 修复整数溢出漏洞后的代币合约
 * @dev 修复方案：
 *      1. 移除 unchecked 块，依赖 Solidity 0.8+ 内置溢出检查
 *      2. 显式校验余额是否充足（require）
 *      3. 使用 SafeMath 库（0.8 以下版本）或内置检查
 */
contract FixedToken {
    mapping(address => uint256) public balanceOf;
    string public name = "FixedToken";
    string public symbol = "FT";

    constructor() {
        balanceOf[msg.sender] = 1000 * 10**18;
    }

    /// @notice 安全转账：先校验余额，再执行算术运算
    function transfer(address _to, uint256 _amount) public returns (bool) {
        // 修复①：显式校验余额
        require(balanceOf[msg.sender] >= _amount, "Insufficient balance");

        // 修复②：不使用 unchecked，依赖 0.8+ 内置溢出检查
        balanceOf[msg.sender] -= _amount;
        balanceOf[_to] += _amount;

        return true;
    }

    function totalSupply() public pure returns (uint256) {
        return 1000 * 10**18;
    }
}
