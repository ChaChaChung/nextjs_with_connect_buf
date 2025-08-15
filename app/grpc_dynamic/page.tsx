"use client"; // 標記為 Client Component

import { useState } from "react";

type responseType = {
  say: {
    sentence: string;
  };
  randomPerson: {
    person: {
      age: number
      department: string
      email: string
      id: string
      name: string
      position: string
    }
  };
  timestamp: string;
  message: string;
}

export default function DynamicPage() {
  const [inputValue, setInputValue] = useState("Hello from Next.js client!");
  const [response, setResponse] = useState<responseType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse(null);

    try {
      // 使用瀏覽器的 fetch 來呼叫我們自己的 Next.js API Route
      const res = await fetch("/api/eliza", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sentence: inputValue }),
      });

      if (!res.ok) {
        throw new Error("API call failed");
      }

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error(error);
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Connect gRPC with Next.js + Go (Dynamic)</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ padding: "0.5rem", width: "300px", background: '#fff', color: '#000', borderRadius: '5px' }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem", background: '#ff7e7e', color: '#fff', borderRadius: '5px' }}
        >
          {isLoading ? "Sending..." : "Send to Go via Next.js API"}
        </button>
      </form>

      {
        response?.say && (
          <div className="mb-12 p-6 border rounded-lg bg-gray-50">
              <p className="text-lg text-blue-600">
              <strong>Go Server Response:</strong> {response.say.sentence}
              </p>
          </div>
        )
      }
      {
        response?.randomPerson && (
          <div className="mb-12 p-6 border rounded-lg bg-gray-50">
              <p className="text-lg text-blue-600">
              <strong>Go Server Random Person:</strong> {response.randomPerson.person.name} / {response.randomPerson.person.age}歲 / {response.randomPerson.person.position}
              </p>
          </div>
        )
      }
    </main>
  );
}