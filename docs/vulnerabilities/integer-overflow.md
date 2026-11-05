# 整数溢出 / 下溢 (Integer Overflow / Underflow)

| 属性 | 值 |
| --- | --- |
| 漏洞类型 | 算术运算漏洞 |
| 严重程度 | 🟠 中危（0.8 以下版本高危） |
| 相关合约 | [VulnerableToken.sol](../../contracts/overflow/VulnerableToken.sol) |
| 修复合约 | [FixedToken.sol](../../contracts/overflow/FixedToken.sol) |
| 复现 POC | [overflow.poc.js](../../poc/overflow/overflow.poc.js) |

## 📌 漏洞原理

Solidity 的整数类型（如 `uint256`）有固定取值范围。当运算结果超出范围时，会发生**溢出（overflow）**或**下溢（underflow）**：

- **溢出**：`uint256` 最大值 `2^256 - 1` 加 1 后变为 0。
- **下溢**：`uint256` 的 0 减 1 后变为 `2^256 - 1`。

在 Solidity **0.8.0 之前**，溢出/下溢不会报错，会静默回绕，导致严重的逻辑错误。0.8.0 及以上版本默认开启溢出检查，会抛出异常回滚交易。但若使用 `unchecked` 块显式关闭检查，漏洞依然存在。

## 🐛 漏洞代码分析

```solidity
function transfer(address _to, uint256 _amount) public returns (bool) {
    unchecked {
        // ❌ 漏洞：未校验余额是否足够，减法可能下溢
        balanceOf[msg.sender] -= _amount;
        balanceOf[_to] += _amount;
    }
    return true;
}
```

当攻击者余额为 0 时调用 `transfer(to, 1)`：
- `balanceOf[msg.sender] -= 1` → `0 - 1` 下溢为 `2^256 - 1`
- 攻击者凭空获得巨额代币

## 💥 攻击流程

1. 攻击者余额为 0。
2. 攻击者调用 `transfer(任意地址, 1)`。
3. 由于 `unchecked`，`0 - 1` 下溢为 `type(uint256).max`。
4. 攻击者余额变为 `type(uint256).max`，可随意转账。

## 🔧 修复方案

### 方案一：依赖 Solidity 0.8+ 内置检查（推荐）

不使用 `unchecked`，让编译器自动检查溢出：

```solidity
function transfer(address _to, uint256 _amount) public returns (bool) {
    balanceOf[msg.sender] -= _amount;  // ✅ 溢出时自动 revert
    balanceOf[_to] += _amount;
    return true;
}
```

### 方案二：显式校验余额

```solidity
function transfer(address _to, uint256 _amount) public returns (bool) {
    require(balanceOf[msg.sender] >= _amount, "Insufficient balance");
    balanceOf[msg.sender] -= _amount;
    balanceOf[_to] += _amount;
    return true;
}
```

### 方案三：使用 SafeMath 库（0.8 以下版本）

对于 0.8 以下的 Solidity 版本，使用 OpenZeppelin 的 `SafeMath` 库：

```solidity
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
using SafeMath for uint256;

balanceOf[msg.sender] = balanceOf[msg.sender].sub(_amount);
```

## 📚 延伸阅读

- [SWC-101: Integer Overflow and Underflow](https://swcregistry.io/docs/SWC-101)
- [Solidity 0.8.0 溢出检查变更](https://docs.soliditylang.org/en/v0.8.0/080-breaking-changes.html)
- [OpenZeppelin SafeMath](https://docs.openzeppelin.com/contracts/4.x/api/utils#SafeMath)
