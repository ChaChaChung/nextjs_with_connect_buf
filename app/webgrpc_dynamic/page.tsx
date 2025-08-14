"use client";

import { useState } from 'react'
import { elizaClient } from "../lib/connect";

export default function Home() {
    const [msg, setMsg] = useState('')
    const [response, setResponse] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true);
        setResponse("");

        try {
            // 傳值給 Go
            const res = await elizaClient.say({ sentence: msg });
            setResponse(res.sentence)
        } catch (error) {
            console.error(error);
            setResponse("Failed to get response from server.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-4xl font-bold mb-8">Connect Web gRPC with Next.js + Go (Dynamic)</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
            <input
                className="mr-2"
                style={{ padding: "0.5rem", width: "300px", background: '#fff', color: '#000', borderRadius: '5px' }}
                onChange={(e) => setMsg(e.target.value)}
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
            response && (
                <div className="mb-12 p-6 border rounded-lg bg-gray-50">
                    <p className="text-lg text-blue-600">
                    <strong>Go Server Response:</strong> {response}
                    </p>
                </div>
            )
        }
        </main>
    );
}