import { elizaClient } from "../lib/connect"; // 直接引入我們與 Go 連線的客戶端

// 這是一個預設的 Server Component，因為它是一個 async function
// 並且沒有 "use client" 標記
export default async function StaticPage() {
  // 1. 在伺服器端（建置時期）直接呼叫 Go API
  const response = await elizaClient.say({ sentence: "I feel great today." });

  console.log("Data fetched successfully.");

  // 2. 將拿到的資料直接渲染成 JSX
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Connect Web gRPC with Next.js + Go (Static)</h1>
      
      <div className="mb-12 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Server Component Fetch:</h2>
        <p className="text-gray-700">
          <span className="font-mono bg-gray-200 px-2 py-1 rounded">
            elizaClient.say(&#123; sentence: "I feel great today." &#125;)
          </span>
        </p>
        <p className="text-lg text-blue-600">
          <strong>Go Server Response:</strong> {response.sentence}
        </p>
      </div>
    </main>
  );
}