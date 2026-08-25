// M29 — IAIPlatformAdapter: cách gọi API thật của từng nền tảng, tách khỏi Tool Gateway để
// không rải `if (platform === "ManLab")` trong logic nghiệp vụ chung (nguyên tắc kiến trúc #2,
// DacTa.md). Port 1:1 từ 08_Source/api/adapters.mjs.
//
// ManlabPlatformAdapter gọi HTTP THẬT ra ngoài (mặc định localhost:8010 — server M10 standalone
// cũ), KHÔNG gọi Prisma của M10 trực tiếp trong cùng process, dù cả 2 module cùng nằm trong repo
// này — giữ đúng nguyên tắc "Agent không bao giờ gọi thẳng DB/API của một nền tảng" ngay cả khi
// về mặt hạ tầng có thể tắt qua đường tắt.

import Anthropic from "@anthropic-ai/sdk";

interface CallResult {
  status: number;
  output: unknown;
  latencyMs: number;
  errorCode: string | null;
}

async function callWithTimeout(url: string, options: RequestInit, ms: number): Promise<Omit<CallResult, "errorCode">> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const started = Date.now();
    const res = await fetch(url, { ...options, signal: ctrl.signal });
    const output = await res.json().catch(() => null);
    return { status: res.status, output, latencyMs: Date.now() - started };
  } finally {
    clearTimeout(timer);
  }
}

export interface PlatformForAdapter {
  apiBaseUrl: string | null;
}
export interface ToolForAdapter {
  endpoint: string;
  httpMethod: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  modelId: string; // id model tại nhà cung cấp, lấy từ AIModel.modelId
  system: string; // nội dung AIPromptVersion đang hiệu lực + ngữ cảnh trích dẫn
  messages: ChatMessage[];
  maxTokens: number;
  /** Độ sâu suy luận. Tra cứu tài liệu là việc nhẹ — "low" giữ độ trễ trong ngưỡng spec §12. */
  effort: "low" | "medium" | "high";
}

export interface ChatResult {
  text: string;
  inputTokens: number;
  outputTokens: number;
  latencyMs: number;
  errorCode: string | null; // null = thành công
}

export interface PlatformAdapter {
  call(platform: PlatformForAdapter, tool: ToolForAdapter, input: unknown): Promise<CallResult>;
  health(platform: PlatformForAdapter): Promise<{ ok: boolean; error: string | null }>;
  // TÙY CHỌN — chỉ nền tảng mô hình ngôn ngữ mới cài đặt. Giữ tùy chọn để không phải sửa
  // ManlabPlatformAdapter (nền tảng nghiệp vụ, không có khái niệm hội thoại).
  chat?(platform: PlatformForAdapter, req: ChatRequest): Promise<ChatResult>;
}

const ManlabPlatformAdapter: PlatformAdapter = {
  async call(platform, tool, input) {
    if (!platform.apiBaseUrl) return { status: 502, output: null, latencyMs: 0, errorCode: "NO_API_BASE_URL" };
    const url = platform.apiBaseUrl + tool.endpoint;
    try {
      const r = await callWithTimeout(
        url,
        {
          method: tool.httpMethod || "GET",
          headers: { "Content-Type": "application/json" },
          body: tool.httpMethod && tool.httpMethod !== "GET" ? JSON.stringify(input ?? {}) : undefined,
        },
        5000
      );
      return { ...r, errorCode: r.status >= 400 ? "PLATFORM_ERROR" : null };
    } catch (e) {
      return { status: 504, output: null, latencyMs: 5000, errorCode: e instanceof Error && e.name === "AbortError" ? "TIMEOUT" : "CONNECTION_ERROR" };
    }
  },
  async health(platform) {
    if (!platform.apiBaseUrl) return { ok: false, error: "NO_API_BASE_URL" };
    try {
      const r = await callWithTimeout(platform.apiBaseUrl + "/api/kpi/summary", {}, 3000);
      return { ok: r.status < 400, error: r.status >= 400 ? `HTTP ${r.status}` : null };
    } catch (e) {
      return { ok: false, error: e instanceof Error && e.name === "AbortError" ? "TIMEOUT" : String(e) };
    }
  },
};

const PlaceholderPlatformAdapter: PlatformAdapter = {
  async call() {
    return { status: 501, output: null, latencyMs: 0, errorCode: "NOT_INTEGRATED" };
  },
  async health() {
    return { ok: false, error: "NOT_INTEGRATED" };
  },
};

// Nền tảng mô hình ngôn ngữ ngoài Viện. Đây là adapter ĐẦU TIÊN gửi dữ liệu ra khỏi hạ tầng
// của Viện, nên mọi điều kiện được phép gửi (mức bảo mật tài liệu, guardrail, AIA) phải đã được
// kiểm ở Tool Gateway TRƯỚC khi tới đây — adapter cố ý không tự phán xét nội dung.
//
// Khóa API đọc từ biến môi trường ANTHROPIC_API_KEY (SDK tự đọc), KHÔNG lấy từ AISecret: bảng
// AISecret cố ý chỉ lưu maskedValue (xem chú thích tại model AISecret trong schema.prisma).
const ANTHROPIC_TIMEOUT_MS = 30_000; // timeout cứng theo spec §12

let anthropicClient: Anthropic | null = null;

function anthropic(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  anthropicClient ??= new Anthropic({ timeout: ANTHROPIC_TIMEOUT_MS, maxRetries: 1 });
  return anthropicClient;
}

function chatError(code: string, latencyMs: number): ChatResult {
  return { text: "", inputTokens: 0, outputTokens: 0, latencyMs, errorCode: code };
}

const AnthropicAdapter: PlatformAdapter = {
  async call() {
    // Nền tảng mô hình không phơi Tool nghiệp vụ nào — Agent muốn gọi Tool thì đi qua nền tảng
    // nghiệp vụ tương ứng, không đi vòng qua đây.
    return { status: 501, output: null, latencyMs: 0, errorCode: "NOT_A_TOOL_PLATFORM" };
  },
  async health() {
    const c = anthropic();
    if (!c) return { ok: false, error: "NO_API_KEY" };
    try {
      await c.models.list({ limit: 1 });
      return { ok: true, error: null };
    } catch (e) {
      if (e instanceof Anthropic.APIError) return { ok: false, error: `HTTP ${e.status}` };
      return { ok: false, error: String(e) };
    }
  },
  async chat(_platform, req) {
    const c = anthropic();
    const started = Date.now();
    if (!c) return chatError("NO_API_KEY", 0);

    try {
      // KHÔNG gửi temperature: các model Claude hiện hành (Opus 5, Sonnet 5, họ 4.6+) đã bỏ tham
      // số lấy mẫu và trả 400 nếu nhận được. Cột AIModel.temperature vẫn giữ cho nền tảng khác.
      // Độ sâu suy luận điều khiển bằng output_config.effort thay cho temperature.
      const res = await c.messages.create({
        model: req.modelId,
        max_tokens: req.maxTokens,
        system: req.system,
        messages: req.messages,
        output_config: { effort: req.effort },
      });
      const latencyMs = Date.now() - started;

      if (res.stop_reason === "refusal")
        return { text: "", inputTokens: res.usage.input_tokens, outputTokens: res.usage.output_tokens, latencyMs, errorCode: "MODEL_REFUSAL" };

      const text = res.content
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("")
        .trim();

      return {
        text,
        inputTokens: res.usage.input_tokens,
        outputTokens: res.usage.output_tokens,
        latencyMs,
        errorCode: text ? null : "EMPTY_RESPONSE",
      };
    } catch (e) {
      const latencyMs = Date.now() - started;
      if (e instanceof Anthropic.AuthenticationError) return chatError("AUTH_FAILED", latencyMs);
      if (e instanceof Anthropic.RateLimitError) return chatError("RATE_LIMITED", latencyMs);
      if (e instanceof Anthropic.APIConnectionTimeoutError) return chatError("TIMEOUT", latencyMs);
      if (e instanceof Anthropic.APIError) return chatError(`HTTP_${e.status}`, latencyMs);
      return chatError("CONNECTION_ERROR", latencyMs);
    }
  },
};

const ADAPTERS: Record<string, PlatformAdapter> = { ManlabPlatformAdapter, PlaceholderPlatformAdapter, AnthropicAdapter };
export const getAdapter = (adapterType: string): PlatformAdapter => ADAPTERS[adapterType] ?? PlaceholderPlatformAdapter;
