import { NextResponse } from "next/server";
import { elizaClient } from "../../lib/connect";
import type { 
  SayResponse, 
  GetRandomPersonResponse, 
  GetAppearanceResponse, 
  UpdateAppearanceResponse 
} from "../../../gen/proto/eliza_pb";

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
        sentence: (sayResponse as SayResponse).sentence
      },
      randomPerson: {
        person: (randomPersonResponse as GetRandomPersonResponse).person
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

// 處理 GET 請求 - 獲取外觀設定
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "ID parameter is required" },
        { status: 400 }
      );
    }

    // 呼叫 Go 後端的 GetAppearance 方法
    const response = await elizaClient.getAppearance({
      id: id
    });

    return NextResponse.json({
      success: true,
      appearance: (response as GetAppearanceResponse).appearance,
      timestamp: new Date().toISOString(),
      message: "成功從 Go 後端取得外觀設定"
    });

  } catch (error) {
    console.error("GetAppearance API error:", error);
    return NextResponse.json(
      { error: "Failed to get appearance", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// 處理 PUT 請求 - 更新外觀設定
export async function PUT(request: Request) {
  try {
    // 1. 從前端請求中解析出 JSON body
    const body = await request.json();
    const appearance = body.appearance;

    if (!appearance || !appearance.id) {
      return NextResponse.json(
        { error: "Appearance object with ID is required" },
        { status: 400 }
      );
    }

    // 2. 呼叫 Go 後端的 UpdateAppearance 方法
    const response = await elizaClient.updateAppearance({
      appearance: appearance
    });

    return NextResponse.json({
      success: true,
      appearance: (response as UpdateAppearanceResponse).appearance,
      message: (response as UpdateAppearanceResponse).message,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("UpdateAppearance API error:", error);
    return NextResponse.json(
      { error: "Failed to update appearance", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}