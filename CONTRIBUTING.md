# 贡献指南 / Contributing Guide

感谢你对 **智能合约安全漏洞案例库** 的关注！本文档说明如何参与本项目的协作。

## 📋 贡献方式

### 1. 提交 Issue
- 在 GitHub 仓库的 **Issues** 页面点击 `New issue`。
- 选择合适的模板：
  - **Bug 报告**：复现漏洞 POC 出错、文档描述错误等。
  - **功能建议**：希望新增某类漏洞案例、增加搜索/筛选功能等。
  - **文档改进**：描述过于专业、需要补充通俗解释等。
- 标题简明扼要，正文包含：环境信息、复现步骤、期望结果、实际结果。

### 2. 提交 Pull Request
1. **Fork** 本仓库到你的 GitHub 账号。
2. 将 fork 后的仓库克隆到本地：
   ```bash
   git clone https://github.com/你的用户名/smart-contract-vuln-case-lib_55.git
   ```
3. 基于 `dev` 分支创建功能分支：
   ```bash
   git checkout dev
   git checkout -b feature/your-feature-name
   ```
4. 编写代码与文档，确保：
   - 漏洞案例包含：原理说明、漏洞源码、复现 POC、修复代码。
   - 遵循现有目录结构与命名规范。
5. 提交代码，使用规范的 commit message：
   ```bash
   git add .
   git commit -m "feat: add xxx vulnerability case"
   ```
6. 推送到你的 fork 并发起 PR，目标分支选择 `dev`：
   ```bash
   git push origin feature/your-feature-name
   ```
7. 在 PR 描述中说明变更内容、关联的 Issue 编号。

## 🌿 分支管理规范

| 分支名称 | 作用 |
| --- | --- |
| `main` | 稳定发布分支，禁止直接推送，仅合并经过验证的版本 |
| `dev` | 开发集成分支，所有功能先合并到此，测试稳定后再入 main |
| `feature/*` | 功能分支，新增漏洞案例或功能 |
| `bugfix/*` | 修复分支，修复 bug 或文档错误 |

## ✍️ Commit Message 规范

采用 [Conventional Commits](https://www.conventionalcommits.org/) 风格：

| 类型 | 说明 |
| --- | --- |
| `feat` | 新增功能/漏洞案例 |
| `fix` | 修复 bug |
| `docs` | 文档变更 |
| `style` | 代码格式（不影响功能） |
| `refactor` | 重构 |
| `test` | 测试相关 |
| `chore` | 构建/工具相关 |

示例：
```
feat: add reentrancy vulnerability case
fix: correct overflow POC in Remix
docs: add beginner-friendly explanation
```

## 📁 目录规范

```
contracts/<漏洞名>/    # Solidity 合约（漏洞合约 + 修复合约）
poc/<漏洞名>/          # 复现 POC 脚本
docs/vulnerabilities/  # 漏洞详细文档
web/                   # 静态浏览网页
```

## 📞 沟通

- 有任何问题欢迎在 Issue 中讨论。
- 维护者会在 1-3 个工作日内回复你的 PR / Issue。

再次感谢你的贡献！🎉
