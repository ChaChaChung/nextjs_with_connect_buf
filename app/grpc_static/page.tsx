import { elizaClient } from "../lib/connect"; // 直接引入我們與 Go 連線的客戶端

// 這是一個預設的 Server Component，因為它是一個 async function
// 並且沒有 "use client" 標記
export default async function StaticPage() {
  console.log("Fetching data for static page at build time...");

  // 1. 在伺服器端（建置時期）直接呼叫 Go API
  const response = await elizaClient.say({
    sentence: "This page was generated statically!",
  });

  console.log("Data fetched successfully.");

  // 2. 將拿到的資料直接渲染成 JSX
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Connect gRPC with Next.js + Go (Static)</h1>
      <p>
        這個頁面的內容是在專案**建置時**就從 Go 後端取得並預先渲染好的。
      </p>
      <div style={{ marginTop: "1rem" }}>
        <p style={{ fontFamily: "monospace", background: "#eee", padding: "1rem", color: 'navy' }}>
          <strong>來自 Go 伺服器的靜態資料:</strong> {response.sentence}
        </p>
      </div>
      <p style={{ marginTop: "2rem", fontStyle: "italic" }}>
        您可以試著停止 Go 伺服器，然後用 `npm run start` 啟動 Next.js 的正式服務，這個頁面依然能正常顯示！
      </p>
    </main>
  );
}