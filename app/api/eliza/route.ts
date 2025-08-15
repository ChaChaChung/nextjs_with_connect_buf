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

    // 2. 同時呼叫兩個 Go 後端 API
    const [sayResponse, randomPersonResponse] = await Promise.all([
      // 呼叫 say 方法
      elizaClient.say({
        sentence: sentence,
      }),
      // 呼叫 getRandomPerson 方法
      elizaClient.getRandomPerson({})
    ]);

    // 3. 整理兩個 API 的回應，一起回傳給前端
    const combinedResponse = {
      say: {
        sentence: sayResponse.sentence
      },
      randomPerson: {
        person: randomPersonResponse.person
      },
      timestamp: new Date().toISOString(),
      message: "成功從 Go 後端取得資料"
    };

    return NextResponse.json(combinedResponse);

  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}