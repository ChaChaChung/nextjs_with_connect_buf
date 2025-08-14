"use client";

import { useState } from 'react'
import { elizaClient } from "../lib/connect";

export default function Home() {
    const [msg, setMsg] = useState('')
    const [response, setResponse] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // 傳值給 Go
        const res = await elizaClient.say({ sentence: msg });
        setResponse(res.sentence)

        // 從 Go 取回資料
        // alert(res.sentence);
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-4xl font-bold mb-8">ConnectRPC with Next.js + Go</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
            <input className="mr-2" style={{ background: '#fff', color: '#000' }} onChange={(e) => setMsg(e.target.value)} />
            <button style={{ background: '#fff', color: '#000', padding: '5px', borderRadius: '10px' }}>
                Submit
            </button>
        </form>
        <div className="mb-12 p-6 border rounded-lg bg-gray-50">
            <p className="mt-4 text-lg text-blue-600">
            <strong>Go Server Response:</strong> {response}
            </p>
        </div>
        </main>
    );
}