# Playwright MCP Server 整合指南

本專案配置了 Playwright MCP Server，讓您可以透過 Model Context Protocol (MCP) 在 Antigravity 環境中與瀏覽器進行自動化互動。

## 環境資訊

請確保您的系統符合以下環境版本：
- **Node.js**: `v24.14.1` 或以上
- **Playwright**: `v1.59.1`

---

## 什麼是 Playwright MCP？

Model Context Protocol (MCP) 允許像 Antigravity 這樣的 AI 客戶端連接並利用外部工具。透過設定 Playwright MCP Server，AI 代理可以直接操作瀏覽器，執行像是：網頁截圖、抓取資料、以及視覺化驗證等任務。

---

## 在 Antigravity 中配置

要在您的 Antigravity IDE 中啟用此功能，請按以下步驟操作：

1. **開啟反重力設定**：按下快捷鍵 `Ctrl + ,` 開啟設定選單。
2. **搜尋設定**：在設定面板的搜尋框中輸入 `"MCP"`。
3. **新增伺服器**：點擊「新增 MCP 伺服器」(Add new MCP server)。
4. **貼上配置**：建立一個名稱為 `playwright` 的伺服器，並將本專案目錄下 `mcp-config.json` 的內容貼上：

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "-y",
        "@playwright/mcp@latest"
      ]
    }
  }
}
```

> **指令說明**：`npx -y @playwright/mcp@latest` 指令會自動同意安裝提示 (`-y`)，並抓取最新版的 Playwright MCP 套件執行，這樣不需要繁瑣的手動全域安裝。

5. **儲存並重新啟動 IDE**：完成配置後，需要重啟 Antigravity 以載入新的 MCP 設定。

完成上述步驟後，您應該能在 MCP 面板中看到 `playwright` 旁邊亮起一個**綠色指示器**，代表運作正常。

---

## 驗證連線

設定並重啟完成後，您可以透過與 AI 代理對話來測試是否連線成功。

💡 **提示**：您可以透過詢問客服人員（或 AI 助理）以下指令來驗證：
> 「開啟瀏覽器並造訪 https://example.com」

如果 AI 順利啟動瀏覽器並返還了螢幕截圖或網頁資訊，就表示您的 Playwright MCP 已經完美運作了！
