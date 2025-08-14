"use client"; // 標記為 Client Component

import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("Hello from Next.js client!");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse("");

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
      setResponse(data.sentence);

    } catch (error) {
      console.error(error);
      setResponse("Failed to get response from server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Next.js BFF Pattern with ConnectRPC
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ padding: "0.5rem", width: "300px" }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem" }}
        >
          {isLoading ? "Sending..." : "Send to Go via Next.js API"}
        </button>
      </form>

      {response && (
        <div style={{ marginTop: "1rem" }}>
          <p style={{ fontFamily: "monospace", background: "#eee", padding: "1rem", color: 'navy' }}>
            <strong>Response:</strong> {response}
          </p>
        </div>
      )}
    </main>
  );
}