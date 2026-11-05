# 智能合约安全漏洞案例库 smart-contract-vuln-case-lib_55

> 面向区块链 / Web3 入门学习者的轻量级 Solidity 经典漏洞案例库。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Solidity](https://img.shields.io/badge/Solidity-^0.8.0-blue.svg)](https://soliditylang.org/)

## 📖 项目简介

本项目收集整理 Solidity 智能合约中经典的安全漏洞案例，每条漏洞均配套：

- 📝 **原理说明**：漏洞产生的根本原因与攻击思路
- 🐛 **漏洞源码**：存在漏洞的 Solidity 合约
- 💥 **复现 POC**：可在 Remix / Hardhat 中运行的攻击脚本
- 🔧 **修复代码**：修复后的安全合约版本

同时附带一个简单的静态网页，方便浏览与检索漏洞案例，适合课程学习与教学演示。

## ⚠️ 安全声明

本项目中的漏洞合约与 POC **仅供学习研究使用**，严禁用于任何非法攻击行为。请在本地测试环境（如 Remix、Hardhat Network、Ganache）中复现，切勿部署到以太坊主网或其他公链。

## 📂 目录结构

```
smart-contract-vuln-case-lib_55/
├── LICENSE                      # MIT 开源许可证
├── README.md                    # 项目说明
├── CONTRIBUTING.md              # 贡献指南
├── CHANGELOG.md                 # 版本更新记录
├── docs/                        # 详细文档
│   ├── development-plan.md      # 开发计划
│   └── vulnerabilities/         # 漏洞详细文档
│       ├── reentrancy.md
│       └── integer-overflow.md
├── contracts/                   # Solidity 合约
│   ├── reentrancy/              # 重入攻击案例
│   │   ├── VulnerableBank.sol   # 漏洞合约
│   │   ├── ReentrancyAttack.sol # 攻击合约
│   │   └── FixedBank.sol        # 修复合约
│   └── overflow/                # 整数溢出案例
│       ├── VulnerableToken.sol  # 漏洞合约
│       └── FixedToken.sol       # 修复合约
├── poc/                         # 复现 POC 脚本
│   ├── reentrancy/
│   └── overflow/
└── web/                         # 静态浏览网页
    ├── index.html
    ├── style.css
    └── script.js
```

## 🚀 快速开始

### 环境要求
- Node.js >= 16
- npm 或 yarn
- 可选：[Remix IDE](https://remix.ethereum.org/)（在线，无需安装）

### 使用 Remix 复现（推荐新手）
1. 打开 [Remix IDE](https://remix.ethereum.org/)。
2. 将 `contracts/` 下对应的 `.sol` 文件复制到 Remix 中。
3. 选择合适的编译器版本（`^0.8.0`）并编译。
4. 部署漏洞合约与攻击合约，按 POC 文档步骤执行攻击。

### 使用 Hardhat 复现
```bash
npm install
npx hardhat test
```

## 📚 漏洞案例列表

> 当前已收录 **1** 个漏洞案例（重入攻击 Reentrancy），欢迎通过 Issue 贡献新案例！

| 序号 | 漏洞名称 | 严重程度 | 合约文件 | 文档 |
| --- | --- | --- | --- | --- |
| 1 | 重入攻击 (Reentrancy) | 🔴 高危 | [VulnerableBank.sol](contracts/reentrancy/VulnerableBank.sol) | [reentrancy.md](docs/vulnerabilities/reentrancy.md) |

## 🌐 在线浏览

直接在浏览器中打开 `web/index.html` 即可浏览所有漏洞案例，支持关键字搜索。

## 🤝 参与贡献

欢迎提交 Issue 与 Pull Request！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解贡献流程与分支规范。

## 📄 开源许可证

本项目采用 [MIT License](LICENSE) 开源协议，允许自由使用、修改、分发，仅需保留版权声明。
