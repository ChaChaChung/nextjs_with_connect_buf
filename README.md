# Next.js with gRPC-Connect and Buf

這是一個使用 Next.js 前端和 Go gRPC-Connect 後端的專案，展示如何在前端同時呼叫多個後端 API 並整合結果。

## 專案結構

```
nextjs_with_connect_buf/
├── app/                    # Next.js 應用程式
│   ├── api/               # API 路由
│   │   └── eliza/         # Eliza API 端點
│   ├── test-api/          # 測試頁面
│   └── lib/               # 共用函式庫
├── gen/                   # 生成的 TypeScript 檔案
│   └── proto/
├── proto/                 # Protocol Buffers 定義
└── go_server.go          # Go 後端伺服器
```

## 功能特色

### 1. 同時呼叫多個 Go API
- **Say API**: 回傳使用者輸入的句子
- **GetRandomPerson API**: 回傳隨機人員資料
- 使用 `Promise.all()` 並行呼叫兩個 API
- 整合兩個 API 的回應結果

### 2. 回應格式
```json
{
  "say": {
    "sentence": "你說的是：Hello World"
  },
  "randomPerson": {
    "person": {
      "id": "001",
      "name": "張小明",
      "age": 28,
      "email": "zhang.xiaoming@company.com",
      "department": "工程部",
      "position": "軟體工程師"
    }
  },
  "timestamp": "2024-01-01T12:00:00.000Z",
  "message": "成功從 Go 後端取得資料"
}
```

## 快速開始

### 1. 安裝依賴
```bash
npm install
```

### 2. 啟動 Go 後端
```bash
go run go_server.go
```
後端將在 `:8080` 啟動

### 3. 啟動 Next.js 前端
```bash
npm run dev
```
前端將在 `:3003` 啟動

### 4. 測試 API
訪問 `http://localhost:3003/test-api` 來測試 API 功能

## API 端點

### POST /api/eliza
- **用途**: 同時呼叫 Go 後端的兩個 API 方法
- **請求體**: `{ "sentence": "你的句子" }`
- **回應**: 包含兩個 API 結果的整合回應

## 技術架構

### 前端 (Next.js)
- 使用 `@connectrpc/connect-web` 建立 gRPC-Connect 客戶端
- 並行呼叫多個後端 API
- 整合和格式化回應資料

### 後端 (Go)
- 使用 `connectrpc.com/connect` 建立 gRPC-Connect 伺服器
- 實作 `ElizaService` 的兩個方法
- 支援 CORS 跨域請求

### Protocol Buffers
- 定義服務介面和訊息格式
- 自動生成 TypeScript 和 Go 程式碼

## 開發注意事項

1. **CORS 設定**: 後端已設定允許來自 `localhost:3003` 的請求
2. **錯誤處理**: 前端包含完整的錯誤處理和載入狀態
3. **類型安全**: 使用生成的 TypeScript 類型確保類型安全
4. **並行處理**: 使用 `Promise.all()` 提高 API 呼叫效率

## 故障排除

### 常見問題
1. **後端連接失敗**: 確保 Go 伺服器在 `:8080` 運行
2. **CORS 錯誤**: 檢查後端的 CORS 設定
3. **Proto 檔案錯誤**: 重新生成 TypeScript 檔案

### 重新生成 Proto 檔案
```bash
buf generate
```

## 擴展功能

可以輕鬆添加新的 API 方法：
1. 在 `proto/eliza.proto` 中定義新的服務方法
2. 在 Go 後端實作新方法
3. 在前端 API 路由中呼叫新方法
4. 更新測試頁面顯示新功能
