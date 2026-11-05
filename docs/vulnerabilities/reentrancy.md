# 重入攻击 (Reentrancy Attack)

| 属性 | 值 |
| --- | --- |
| 漏洞类型 | 逻辑漏洞 / 外部调用 |
| 严重程度 | 🔴 高危 |
| 首次著名事件 | The DAO 攻击（2016，损失约 6000 万美元 ETH） |
| 相关合约 | [VulnerableBank.sol](../../contracts/reentrancy/VulnerableBank.sol) |
| 攻击合约 | [ReentrancyAttack.sol](../../contracts/reentrancy/ReentrancyAttack.sol) |
| 修复合约 | [FixedBank.sol](../../contracts/reentrancy/FixedBank.sol) |
| 复现 POC | [reentrancy.poc.js](../../poc/reentrancy/reentrancy.poc.js) |

## 📌 漏洞原理

重入攻击的核心在于：**合约在向外部地址转账时，外部地址（通常是另一个合约）可以在接收 ETH 的同时重新调用原合约的函数，而原合约的状态变量尚未更新。**

典型的执行顺序错误如下：

```
1. 用户调用 withdraw()
2. 合约读取用户余额 balance
3. 合约向用户转账（触发用户合约的 receive() / fallback()）
   └─ 用户合约在 receive() 中再次调用 withdraw()  ← 重入点
4. 合约才将用户余额置零
```

由于第 3 步转账时余额还未清零，攻击者可以反复递归调用 `withdraw()`，直到合约资金被抽干。

## 🐛 漏洞代码分析

```solidity
function withdraw() public {
    uint256 balance = balances[msg.sender];
    require(balance > 0, "Insufficient balance");

    // ❌ 漏洞：先转账，后更新状态
    (bool success, ) = msg.sender.call{value: balance}("");
    require(success, "Transfer failed");

    balances[msg.sender] = 0;  // 状态更新太晚
}
```

关键问题：**外部调用（`call`）发生在状态更新（`balances[msg.sender] = 0`）之前**。

## 💥 攻击流程

1. 攻击者向 `VulnerableBank` 存入 1 ETH。
2. 攻击者调用 `withdraw()`，银行向攻击合约转账 1 ETH。
3. 攻击合约的 `receive()` 被触发，再次调用 `bank.withdraw()`。
4. 此时 `balances[attacker]` 仍为 1 ETH（未被清零），`require` 通过，再次转账。
5. 重复步骤 3-4，直到银行合约余额不足。
6. 攻击者调用 `collect()` 取回所有窃取的 ETH。

## 🔧 修复方案

### 方案一：Checks-Effects-Interactions 模式（推荐）

先更新状态，再进行外部调用：

```solidity
function withdraw() public {
    uint256 balance = balances[msg.sender];
    require(balance > 0, "Insufficient balance");

    balances[msg.sender] = 0;  // ✅ 先更新状态

    (bool success, ) = msg.sender.call{value: balance}("");
    require(success, "Transfer failed");
}
```

### 方案二：使用 ReentrancyGuard 互斥锁

引入 OpenZeppelin 的 `ReentrancyGuard`，在函数执行期间锁定，防止重入：

```solidity
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract FixedBank is ReentrancyGuard {
    function withdraw() public nonReentrant {
        // ...
    }
}
```

### 方案三：拉取模式（Pull over Push）

不主动向用户转账，而是让用户自行提取（`withdraw` 改为内部记账 + 单独的提取函数），减少外部调用的攻击面。

## 📚 延伸阅读

- [SWC-107: Reentrancy](https://swcregistry.io/docs/SWC-107)
- [The DAO 攻击事件复盘](https://en.wikipedia.org/wiki/The_DAO_(organization))
- [OpenZeppelin ReentrancyGuard](https://docs.openzeppelin.com/contracts/5.x/api/utils#ReentrancyGuard)
