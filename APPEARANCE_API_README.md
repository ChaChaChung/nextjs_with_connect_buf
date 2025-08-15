# 外觀設定 API 使用說明

## 概述

這個專案新增了兩個外觀相關的 API 端點，用於與 Go 後端服務進行 gRPC 通訊：

1. **GetAppearance** - 獲取外觀設定
2. **UpdateAppearance** - 更新外觀設定

## API 端點

### 1. 獲取外觀設定 (GET)

**端點:** `/api/eliza`

**方法:** GET

**查詢參數:**
- `id` (必需): 外觀設定的唯一識別碼

**範例請求:**
```bash
GET /api/eliza?id=001
```

**成功回應:**
```json
{
  "success": true,
  "appearance": {
    "id": "001",
    "logo_url": "https://example.com/logo.png",
    "primary_color": "#FF6B6B",
    "secondary_color": "#4ECDC4",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z",
    "logo_key": "logo_001",
    "logo_size": 1024,
    "logo_type": "png"
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "message": "成功從 Go 後端取得外觀設定"
}
```

### 2. 更新外觀設定 (PUT)

**端點:** `/api/eliza`

**方法:** PUT

**請求體:**
```json
{
  "appearance": {
    "id": "001",
    "logo_url": "https://example.com/new-logo.png",
    "primary_color": "#FF6B6B",
    "secondary_color": "#4ECDC4",
    "logo_key": "logo_001",
    "logo_size": 2048,
    "logo_type": "png"
  }
}
```

**成功回應:**
```json
{
  "success": true,
  "appearance": {
    "id": "001",
    "logo_url": "https://example.com/new-logo.png",
    "primary_color": "#FF6B6B",
    "secondary_color": "#4ECDC4",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T12:00:00Z",
    "logo_key": "logo_001",
    "logo_size": 2048,
    "logo_type": "png"
  },
  "message": "外觀更新成功",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## 測試頁面

專案包含一個測試頁面 `/test-appearance`，可以用來測試這些 API：

- 輸入外觀 ID 並點擊「獲取外觀」來測試 GetAppearance API
- 獲取外觀後，點擊「測試更新外觀」來測試 UpdateAppearance API
- 頁面會顯示當前的外觀設定和操作結果

## 技術架構

### 前端 (Next.js)
- **API 路由:** `app/api/eliza/route.ts`
- **測試頁面:** `app/test-appearance/page.tsx`
- **Connect 客戶端:** `app/lib/connect.tsx`

### 後端 (Go)
- **Proto 定義:** `proto/eliza.proto`
- **服務實作:** Go 後端服務中的 `ElizaServer` 結構體
- **gRPC 方法:** `GetAppearance` 和 `UpdateAppearance`

### 類型定義
- **TypeScript 類型:** `gen/proto/eliza_pb.ts`
- **Connect 服務:** `gen/proto/eliza_connect.ts`

## 使用流程

1. **啟動 Go 後端服務** (確保運行在 localhost:8080)
2. **啟動 Next.js 開發伺服器** (`npm run dev`)
3. **訪問測試頁面** (`/test-appearance`)
4. **測試 API 功能**

## 注意事項

- 確保 Go 後端服務正在運行
- 外觀 ID 必須存在於後端資料庫中
- 更新操作會驗證必要欄位的存在
- 所有時間戳記使用 ISO 8601 格式
- 錯誤處理包含詳細的錯誤訊息

## 錯誤處理

API 會回傳適當的 HTTP 狀態碼和錯誤訊息：

- **400 Bad Request:** 缺少必要參數或無效的請求格式
- **500 Internal Server Error:** 後端服務錯誤或資料庫操作失敗

錯誤回應格式：
```json
{
  "error": "錯誤描述",
  "details": "詳細錯誤訊息"
}
```
