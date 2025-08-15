'use client';

import { useState } from 'react';

export default function TestApiPage() {
  const [sentence, setSentence] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/eliza', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sentence }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '發生未知錯誤');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">測試 Eliza API</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="sentence" className="block text-sm font-medium mb-2">
            輸入句子：
          </label>
          <input
            type="text"
            id="sentence"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            placeholder="輸入你想說的句子..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? '處理中...' : '發送請求'}
        </button>
      </form>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <strong>錯誤：</strong> {error}
        </div>
      )}

      {response && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">回應結果：</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Say 回應 */}
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-3">Say 回應</h3>
              <p className="text-blue-700">{response.say?.sentence}</p>
            </div>

            {/* Random Person 回應 */}
            <div className="p-6 bg-green-50 rounded-lg">
              <h3 className="text-lg font-medium text-green-800 mb-3">隨機人員資料</h3>
              {response.randomPerson?.person && (
                <div className="space-y-2 text-green-700">
                  <p><strong>姓名：</strong>{response.randomPerson.person.name}</p>
                  <p><strong>職位：</strong>{response.randomPerson.person.position}</p>
                  <p><strong>部門：</strong>{response.randomPerson.person.department}</p>
                  <p><strong>年齡：</strong>{response.randomPerson.person.age}</p>
                  <p><strong>Email：</strong>{response.randomPerson.person.email}</p>
                </div>
              )}
            </div>
          </div>

          {/* 額外資訊 */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">額外資訊</h3>
            <p className="text-gray-600"><strong>時間戳記：</strong>{response.timestamp}</p>
            <p className="text-gray-600"><strong>訊息：</strong>{response.message}</p>
          </div>

          {/* 完整 JSON 回應 */}
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">完整 JSON 回應</h3>
            <pre className="text-sm text-gray-700 overflow-x-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
