// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title VulnerableToken
 * @notice 存在整数溢出（Integer Overflow）漏洞的代币合约
 * @dev 漏洞点：transfer() 中使用 unchecked 块，导致余额减法下溢，
 *      攻击者余额不足时反而得到巨额代币。
 *      注意：Solidity 0.8+ 默认开启溢出检查，这里显式使用 unchecked 复现漏洞。
 */
contract VulnerableToken {
    mapping(address => uint256) public balanceOf;
    string public name = "VulnToken";
    string public symbol = "VT";

    constructor() {
        balanceOf[msg.sender] = 1000 * 10**18;
    }

    /// @notice 转账 —— 存在整数下溢漏洞
    function transfer(address _to, uint256 _amount) public returns (bool) {
        unchecked {
            // 漏洞：未校验余额是否足够，减法可能下溢
            balanceOf[msg.sender] -= _amount;
            balanceOf[_to] += _amount;
        }
        return true;
    }

    function totalSupply() public pure returns (uint256) {
        return 1000 * 10**18;
    }
}
