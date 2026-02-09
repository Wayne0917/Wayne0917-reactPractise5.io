## 🚀 React 進階後台管理系統 (URL Pagination + Advanced Components)
URL Driven Pagination & Advanced Components Architecture
本專案是一個基於 React 19 與 Vite 構建的高效能電商後台管理系統。除了完整的產品 CRUD 功能外，核心亮點在於實作了 URL 驅動的分頁邏輯 與 高度封裝的通用元件庫，旨在提供使用者更穩定的操作體驗與提升代碼的可維護性。

## 🔗 作品連結
👉 [👉 點此查看 Demo 網頁](https://wayne0917.github.io/Wayne0917-reactPractise5.io/)

## ✨ 核心功能與技術亮點
1. URL 驅動分頁 (URL Driven Pagination)
狀態持久化：整合 useSearchParams 監聽網址參數（如 ?page=2）。當使用者重新整理頁面或分享網址時，系統能精確停留在當前頁碼。
自動化請求：分頁切換時自動觸發 API 重新抓取資料，減少手動維護頁碼狀態的複雜度。

2. 高度模組化元件架構 (Atomic Design Thinking)
ProductFormInput：受控組件 (Controlled Component) 模式封裝，支援 text、number 及 textarea，並統一口製 value 與 onChange 的驗證邏輯。
ProductFormBtn：封裝樣式邏輯，實現 UI 一致性並提升重複利用率。
PageNation：純粹的展示元件，透過 Link 驅動網址變更，與路由系統完美契合。

3. 效能與穩定性優化
Hooks 應用：使用 useCallback 封裝 getProductData，避免元件更新時造成不必要的函式重載；利用 useRef 與 useEffect 管理 Bootstrap Modal 實例。
配置分離：透過 .env 與 config.js 管理 API 資訊，確保敏感資訊安全性與多環境佈署的靈活性。

4. 完整的產品管理系統
支援圖片雙軌上傳（本地檔案上傳與遠端圖片網址同步）。
包含產品新增、編輯、刪除及「啟用狀態」一鍵切換。
效能與穩定性優化：

useCallback：優化 API 抓取函式 (getProductData)，減少不必要的重新渲染。
useEffect：精確處理副作用，包括 Bootstrap Modal 的實例初始化與自動聚焦處理。

環境變數保護與配置：
使用 .env 與 config.js 分離敏感資訊（API Base / Path），並確保 Vite 在 Build 期間正確寫入常數 。

完整產品管理介面：
支援產品圖片上傳（File Upload）與外部網址同步功能。
包含產品新增、編輯、刪除、及啟用狀態切換等完整 CRUD 邏輯。

🛠 使用技術
Core: React 19 (Hooks: useState, useEffect, useCallback, useRef, useSearchParams)
Router: React Router 7 (採用 HashRouter 解決 GitHub Pages 重新整理路徑問題)
API: Axios (串接六角學院 API 服務)
UI: Bootstrap 5

Build Tool: Vite (Rolldown-Vite)

## 📂 檔案結構 (src)
Plaintext

src/
├── api/
│   └── config.js          # 環境變數與 API 統一定義
├── components/            # UI 核心零件
│   ├── Form.jsx           # 產品清單表格
│   ├── ProductForm.jsx    # 產品編輯彈窗核心邏輯
│   ├── ProductFormInput.jsx # 通用輸入框元件
│   └── PageNation.jsx     # 分頁控制元件 (Link 驅動)
├── pages/                 # 頁面級別組件
│   ├── LoginPage.jsx      # 登入與 Token 驗證
│   └── ProductPage.jsx    # 後台管理主頁面
├── App.jsx                # 路由配置與全域狀態中心
└── main.jsx               # 進入點 (StrictMode 與 HashRouter)
⚙️ 環境變數設定 (.env)
本專案使用環境變數管理 API 資訊，請在根目錄建立 .env 檔案 ：



## 📦 專案執行方式
Clone 專案

```Bash
git clone https://github.com/Wayne0917/Wayne0917-reactPractise5.io.git
```

安裝必要套件
```Bash
npm install
```

啟動開發伺服器

```Bash
npm run dev
```
