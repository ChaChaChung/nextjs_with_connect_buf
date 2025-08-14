"use client"

import { useEffect, useState } from 'react'

export default function StaticPage() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    getGoSimpleResp()
  }, [])

  const getGoSimpleResp = async () => {
    try {
      // 使用瀏覽器的 fetch 來呼叫我們自己的 Next.js API Route
      const res = await fetch("/api/eliza", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sentence: "I feel great today." }),
      });

      if (!res.ok) {
        throw new Error("API call failed");
      }

      const data = await res.json();
      setResponse(data.sentence)
    } catch (error) {
      setResponse("Failed to get response from server.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Connect gRPC with Next.js + Go (Static)</h1>
      
      <div className="mb-12 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Server Component Fetch:</h2>
        <p className="text-gray-700">
          <span className="font-mono bg-gray-200 px-2 py-1 rounded">
            elizaClient.say(&#123; sentence: "I feel great today." &#125;)
          </span>
        </p>
        <p className="text-lg text-blue-600">
          <strong>Go Server Response:</strong> {response}
        </p>
      </div>
    </main>
  );
}