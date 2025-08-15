'use client';

import { useState } from 'react';

interface Appearance {
  id: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  createdAt: string;
  updatedAt: string;
  logoKey: string;
  logoSize: number;
  logoType: string;
}

export default function TestAppearancePage() {
  const [appearanceId, setAppearanceId] = useState('e0537d57-617f-4957-81dd-0bb9ac5b599a');
  const [appearance, setAppearance] = useState<Appearance | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedEndpoint, setSelectedEndpoint] = useState('appearance'); // 新增端點選擇

  // 測試獲取外觀設定
  const testGetAppearance = async () => {
    if (!appearanceId.trim()) {
      setMessage('請輸入外觀 ID');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // 根據選擇的端點使用不同的 API
      let apiUrl = '';
      switch (selectedEndpoint) {
        case 'appearance':
          apiUrl = `/api/appearance?id=${appearanceId}`;
          break;
        case 'appearance-get':
          apiUrl = `/api/appearance/get?id=${appearanceId}`;
          break;
        case 'theme':
          apiUrl = `/api/theme?id=${appearanceId}`;
          break;
        default:
          apiUrl = `/api/eliza?id=${appearanceId}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        // 根據不同端點處理回應資料
        const appearanceData = data.appearance || data.theme;
        setAppearance(appearanceData);
        setMessage(`成功獲取外觀設定: ${data.message}`);
      } else {
        setMessage(`錯誤: ${data.error}`);
        setAppearance(null);
      }
    } catch (error) {
      setMessage(`請求失敗: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setAppearance(null);
    } finally {
      setLoading(false);
    }
  };

  // 測試更新外觀設定
  const testUpdateAppearance = async () => {
    if (!appearance) {
      setMessage('請先獲取外觀設定');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // 更新一些值作為測試
      const updatedAppearance = {
        ...appearance,
        primaryColor: '#FF6B6B',
        secondaryColor: '#4ECDC4',
        logoType: 'png',
        logoSize: 1024
      };

      // 根據選擇的端點使用不同的 API
      let apiUrl = '';
      let requestBody = {};
      
      switch (selectedEndpoint) {
        case 'appearance':
          apiUrl = '/api/appearance';
          requestBody = { appearance: updatedAppearance };
          break;
        case 'appearance-update':
          apiUrl = '/api/appearance/update';
          requestBody = { appearance: updatedAppearance };
          break;
        case 'theme':
          apiUrl = '/api/theme';
          requestBody = { theme: updatedAppearance };
          break;
        default:
          apiUrl = '/api/eliza';
          requestBody = { appearance: updatedAppearance };
      }

      const response = await fetch(apiUrl, {
        method: selectedEndpoint === 'appearance' ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        const appearanceData = data.appearance || data.theme;
        setAppearance(appearanceData);
        setMessage(`成功更新外觀設定: ${data.message}`);
      } else {
        setMessage(`錯誤: ${data.error}`);
      }
    } catch (error) {
      setMessage(`請求失敗: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">外觀設定 API 測試</h1>
      
      {/* 新增端點選擇 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-blue-800">
        <h3 className="font-semibold text-blue-800 mb-2">選擇 API 端點:</h3>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="endpoint"
              value="eliza"
              checked={selectedEndpoint === 'eliza'}
              onChange={(e) => setSelectedEndpoint(e.target.value)}
              className="mr-2"
            />
            原始端點 (/api/eliza)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="endpoint"
              value="appearance"
              checked={selectedEndpoint === 'appearance'}
              onChange={(e) => setSelectedEndpoint(e.target.value)}
              className="mr-2"
            />
            新端點 (/api/appearance)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="endpoint"
              value="appearance-get"
              checked={selectedEndpoint === 'appearance-get'}
              onChange={(e) => setSelectedEndpoint(e.target.value)}
              className="mr-2"
            />
            分離端點 (/api/appearance/get)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="endpoint"
              value="theme"
              checked={selectedEndpoint === 'theme'}
              onChange={(e) => setSelectedEndpoint(e.target.value)}
              className="mr-2"
            />
            主題端點 (/api/theme)
          </label>
        </div>
      </div>
      
      <div className="bg-white text-blue-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">獲取外觀設定</h2>
        
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={appearanceId}
            onChange={(e) => setAppearanceId(e.target.value)}
            placeholder="輸入外觀 ID (例如: e0537d57-617f-4957-81dd-0bb9ac5b599a)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={testGetAppearance}
            disabled={loading}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '載入中...' : '獲取外觀'}
          </button>
        </div>

        {appearance && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="font-semibold mb-2">當前外觀設定:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><strong>ID:</strong> {appearance.id}</div>
              <div><strong>Logo URL:</strong> {appearance.logoUrl || '未設定'}</div>
              <div><strong>主色調:</strong> 
                <span 
                  className="inline-block w-4 h-4 rounded ml-2" 
                  style={{ backgroundColor: appearance.primaryColor || '#ccc' }}
                ></span>
                {appearance.primaryColor || '未設定'}
              </div>
              <div><strong>輔色調:</strong> 
                <span 
                  className="inline-block w-4 h-4 rounded ml-2" 
                  style={{ backgroundColor: appearance.secondaryColor || '#ccc' }}
                ></span>
                {appearance.secondaryColor || '未設定'}
              </div>
              <div><strong>Logo 類型:</strong> {appearance.logoType || '未設定'}</div>
              <div><strong>Logo 大小:</strong> {appearance.logoSize || '未設定'} bytes</div>
              <div><strong>建立時間:</strong> {appearance.createdAt || '未設定'}</div>
              <div><strong>更新時間:</strong> {appearance.updatedAt || '未設定'}</div>
            </div>
          </div>
        )}

        {appearance && (
          <button
            onClick={testUpdateAppearance}
            disabled={loading}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '更新中...' : '測試更新外觀'}
          </button>
        )}
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('錯誤') || message.includes('失敗') 
            ? 'bg-red-100 text-red-700 border border-red-200' 
            : 'bg-green-100 text-green-700 border border-green-200'
        }`}>
          {message}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">使用說明:</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• 選擇你喜歡的 API 端點名稱</li>
          <li>• 輸入外觀 ID 並點擊「獲取外觀」來測試 GetAppearance API</li>
          <li>• 獲取外觀後，點擊「測試更新外觀」來測試 UpdateAppearance API</li>
          <li>• 更新會修改主色調、輔色調、Logo 類型和大小</li>
          <li>• 確保 Go 後端服務正在運行在 localhost:8080</li>
        </ul>
      </div>
    </div>
  );
}
