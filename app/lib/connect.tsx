import { createConnectTransport } from "@connectrpc/connect-web";
import { createClient } from "@connectrpc/connect";
import { ElizaService } from "../../gen/proto/eliza_connect";

// 建立一個 transport 指向我們的 Go 伺服器
const transport = createConnectTransport({
  baseUrl: "http://localhost:8080", // Go 伺服器的位址
});

// 使用 transport 和服務定義來建立一個類型安全的客戶端
export const elizaClient = createClient(ElizaService, transport);