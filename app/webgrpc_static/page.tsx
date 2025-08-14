import { elizaClient } from "../lib/connect";

export default async function Home() {
  // 這段程式碼在伺服器上執行！
  const response = await elizaClient.say({ sentence: "I feel great today." });

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