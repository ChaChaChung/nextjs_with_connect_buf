// 檔案路徑: app/api/eliza/route.ts

import { NextResponse } from "next/server";
import { elizaClient } from "../../lib/connect";

// 處理從前端來的 POST 請求
export async function POST(request: Request) {
  try {
    // 1. 從前端請求中解析出 JSON body
    const body = await request.json();
    const sentence = body.sentence;

    if (!sentence) {
      return NextResponse.json(
        { error: "Sentence is required" },
        { status: 400 }
      );
    }

    // 2. 在伺服器端，使用 elizaClient 呼叫真正的 Go 後端 API
    console.log(`Forwarding request to Go backend with sentence: "${sentence}"`);
    const goResponse = await elizaClient.say({
      sentence: sentence,
    });

    // 3. 將從 Go 後端收到的回應，作為 JSON 回傳給前端
    return NextResponse.json(goResponse);

  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}