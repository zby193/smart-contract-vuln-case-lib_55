// 漏洞案例数据
const vulnCases = [
    {
        id: 1,
        title: "重入攻击",
        titleEn: "Reentrancy Attack",
        type: "逻辑漏洞 / 外部调用",
        severity: "high",
        description: "合约在向外部地址转账时，外部合约可在接收 ETH 的同时重新调用原合约函数，而原合约状态尚未更新，导致资金被反复窃取。",
        keywords: ["重入", "reentrancy", "外部调用", "the dao", "call"],
        doc: "../docs/vulnerabilities/reentrancy.md",
        contract: "../contracts/reentrancy/VulnerableBank.sol",
        poc: "../poc/reentrancy/reentrancy.poc.js"
    },
    {
        id: 2,
        title: "整数溢出 / 下溢",
        titleEn: "Integer Overflow / Underflow",
        type: "算术运算漏洞",
        severity: "medium",
        description: "当运算结果超出整数类型取值范围时发生溢出或下溢，在 Solidity 0.8 以下或使用 unchecked 时不会报错，导致余额异常。",
        keywords: ["溢出", "下溢", "overflow", "underflow", "算术", "unchecked"],
        doc: "../docs/vulnerabilities/integer-overflow.md",
        contract: "../contracts/overflow/VulnerableToken.sol",
        poc: "../poc/overflow/overflow.poc.js"
    }
];

const caseListEl = document.getElementById("caseList");
const emptyStateEl = document.getElementById("emptyState");
const searchInputEl = document.getElementById("searchInput");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentSeverity = "all";
let currentSearch = "";

// 渲染案例列表
function renderCases() {
    const filtered = vulnCases.filter(c => {
        const matchSeverity = currentSeverity === "all" || c.severity === currentSeverity;
        const searchText = currentSearch.toLowerCase().trim();
        const matchSearch = !searchText ||
            c.title.toLowerCase().includes(searchText) ||
            c.titleEn.toLowerCase().includes(searchText) ||
            c.type.toLowerCase().includes(searchText) ||
            c.description.toLowerCase().includes(searchText) ||
            c.keywords.some(k => k.toLowerCase().includes(searchText));
        return matchSeverity && matchSearch;
    });

    // 更新统计
    document.getElementById("totalCount").textContent = vulnCases.length;
    document.getElementById("highCount").textContent = vulnCases.filter(c => c.severity === "high").length;
    document.getElementById("mediumCount").textContent = vulnCases.filter(c => c.severity === "medium").length;

    if (filtered.length === 0) {
        caseListEl.innerHTML = "";
        emptyStateEl.style.display = "block";
        return;
    }

    emptyStateEl.style.display = "none";
    caseListEl.innerHTML = filtered.map(c => {
        const severityText = c.severity === "high" ? "🔴 高危" : c.severity === "medium" ? "🟠 中危" : "🟢 低危";
        return `
            <div class="case-card">
                <div class="case-header">
                    <h3 class="case-title">${c.title}</h3>
                    <span class="severity-badge severity-${c.severity}">${severityText}</span>
                </div>
                <p class="case-type">${c.titleEn} · ${c.type}</p>
                <p class="case-desc">${c.description}</p>
                <div class="case-links">
                    <a href="${c.doc}" target="_blank">📖 详细文档</a>
                    <a href="${c.contract}" target="_blank">📄 漏洞合约</a>
                    <a href="${c.poc}" target="_blank">💥 复现 POC</a>
                </div>
            </div>
        `;
    }).join("");
}

// 搜索
searchInputEl.addEventListener("input", e => {
    currentSearch = e.target.value;
    renderCases();
});

// 严重程度筛选
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentSeverity = btn.dataset.severity;
        renderCases();
    });
});

// 初始化
renderCases();
