# 开发计划 / Development Plan

## 🎯 项目目标

构建一个轻量级的 Solidity 智能合约安全漏洞案例库，面向区块链 / Web3 入门学习者，每条漏洞配套原理说明、漏洞源码、复现 POC、修复代码，并提供静态网页方便浏览检索。

## 📋 版本规划

### v0.1.0（当前版本）
- [x] 项目基础框架（README、LICENSE、CONTRIBUTING、CHANGELOG）
- [x] 重入攻击（Reentrancy）漏洞案例
- [x] 整数溢出（Integer Overflow）漏洞案例
- [x] 静态浏览网页（web/index.html）

### v0.2.0（计划中）
- [ ] 权限劫持（Access Control / Authorization）漏洞案例
- [ ] 闪电贷（Flash Loan）攻击案例
- [ ] 前端整数处理（Front-Running / MEV）案例
- [ ] 网页增加分类筛选与暗色模式

### v0.3.0（计划中）
- [ ] 集成 Hardhat 测试框架，POC 可一键运行
- [ ] 增加漏洞案例数量至 10+
- [ ] 支持在线 Markdown 渲染

## 🏗️ 技术栈

| 类别 | 选型 |
| --- | --- |
| 智能合约 | Solidity ^0.8.0 |
| 测试框架 | Hardhat + ethers.js |
| 前端 | 原生 HTML / CSS / JavaScript（无构建工具） |
| 版本控制 | Git + GitHub |

## 📐 设计原则

1. **轻量**：不引入复杂框架，开箱即用。
2. **完整**：每条漏洞包含「原理 → 漏洞代码 → POC → 修复」闭环。
3. **可复现**：POC 可在 Remix 或 Hardhat 中直接运行。
4. **教育友好**：文档包含通俗解释与延伸阅读。

## 🧪 测试计划

- 每个漏洞案例配套 Hardhat 测试脚本，验证攻击可复现。
- 修复合约需通过对应的安全测试（攻击失败）。
- 静态网页在 Chrome / Firefox / Edge 中验证可正常浏览与搜索。

## 🚧 已知问题

- `FixedBank.sol` 依赖 `@openzeppelin/contracts`，需先 `npm install` 才能编译。
- POC 脚本依赖 Hardhat 环境，纯 Remix 用户需手动按文档步骤复现。
