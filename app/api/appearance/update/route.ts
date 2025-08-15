import { NextResponse } from "next/server";
import { elizaClient } from "../../../lib/connect";
import type { UpdateAppearanceResponse } from "../../../../gen/proto/eliza_pb";

// 更新外觀設定
export async function POST(request: Request) {
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
