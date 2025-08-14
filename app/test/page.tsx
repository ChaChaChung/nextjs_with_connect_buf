"use client";

import { useState } from 'react'
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { ElizaService } from "../../gen/proto/eliza_connect";

export default function HomePage() {
    const [msg, setMsg] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const transport = createConnectTransport({
            baseUrl: "http://localhost:8080",
        });

        const client = createClient(ElizaService, transport);

        // 傳值給 Go
        const res = await client.say({ sentence: msg });

        // 從 Go 取回資料
        alert(res.sentence);
    }

    return (
        <div className="m-5">
            <form onSubmit={handleSubmit} className="space-y-6">
                <input className="mr-2" style={{ background: '#fff', color: '#000' }} onChange={(e) => setMsg(e.target.value)} />
                <button style={{ background: '#fff', color: '#000', padding: '5px', borderRadius: '10px' }}>
                    Say Something...
                </button>
            </form>
        </div>
    );
}
