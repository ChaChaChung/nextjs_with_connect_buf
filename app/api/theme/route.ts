import { NextResponse } from "next/server";
import { elizaClient } from "../../lib/connect";
import type { 
  GetAppearanceResponse, 
  UpdateAppearanceResponse 
} from "../../../gen/proto/eliza_pb";

// 獲取主題設定
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
      theme: (response as GetAppearanceResponse).appearance,
      timestamp: new Date().toISOString(),
      message: "成功從 Go 後端取得主題設定"
    });

  } catch (error) {
    console.error("GetTheme API error:", error);
    return NextResponse.json(
      { error: "Failed to get theme", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// 更新主題設定
export async function POST(request: Request) {
  try {
    // 1. 從前端請求中解析出 JSON body
    const body = await request.json();
    const theme = body.theme;

    if (!theme || !theme.id) {
      return NextResponse.json(
        { error: "Theme object with ID is required" },
        { status: 400 }
      );
    }

    // 2. 呼叫 Go 後端的 UpdateAppearance 方法
    const response = await elizaClient.updateAppearance({
      appearance: theme
    });

    return NextResponse.json({
      success: true,
      theme: (response as UpdateAppearanceResponse).appearance,
      message: (response as UpdateAppearanceResponse).message,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("UpdateTheme API error:", error);
    return NextResponse.json(
      { error: "Failed to update theme", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
