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

// Nền tảng mô hình ngôn ngữ thứ hai. Có mặt để chứng minh nguyên tắc kiến trúc #2 hoạt động: đổi
// nhà cung cấp mô hình KHÔNG đụng tới gateway, guardrail, truy hồi hay bộ đánh giá — chỉ thêm một
// adapter và đổi adapterType của bản ghi AIPlatform.
//
// LƯU Ý TUÂN THỦ, không phải chi tiết kỹ thuật: ETV.P29 §5.5 buộc phải có điều khoản của nhà cung
// cấp về việc KHÔNG dùng dữ liệu để huấn luyện lại, trích vào hồ sơ AIA (F29.02). Điều khoản này
// KHÁC NHAU giữa các bậc dịch vụ của cùng một nhà cung cấp. Không bảo đảm được thì chỉ được gửi
// tài liệu mức Công khai — tức là chỉ 12/1865 đoạn trong chỉ mục hiện tại.
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta";

interface GeminiResponse {
  candidates?: { content?: { parts?: { text?: string }[] }; finishReason?: string }[];
  usageMetadata?: { promptTokenCount?: number; candidatesTokenCount?: number; thoughtsTokenCount?: number };
  error?: { code?: number; message?: string; status?: string };
}

const GeminiPlatformAdapter: PlatformAdapter = {
  async call() {
    return { status: 501, output: null, latencyMs: 0, errorCode: "NOT_A_TOOL_PLATFORM" };
  },
  async health() {
    if (!process.env.GEMINI_API_KEY) return { ok: false, error: "NO_API_KEY" };
    try {
      const r = await callWithTimeout(`${GEMINI_API_URL}/models?pageSize=1`, { headers: { "x-goog-api-key": process.env.GEMINI_API_KEY } }, 5000);
      return { ok: r.status < 400, error: r.status >= 400 ? `HTTP ${r.status}` : null };
    } catch (e) {
      return { ok: false, error: e instanceof Error && e.name === "AbortError" ? "TIMEOUT" : String(e) };
    }
  },
  async chat(_platform, req) {
    const apiKey = process.env.GEMINI_API_KEY;
    const started = Date.now();
    if (!apiKey) return { text: "", inputTokens: 0, outputTokens: 0, latencyMs: 0, errorCode: "NO_API_KEY" };

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), ANTHROPIC_TIMEOUT_MS);
    try {
      // Gemini gọi vai trò trợ lý là "model", không phải "assistant".
      const contents = req.messages.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }));
      const goi = (tatSuyLuan: boolean) =>
        fetch(`${GEMINI_API_URL}/models/${encodeURIComponent(req.modelId)}:generateContent`, {
          method: "POST",
          headers: { "x-goog-api-key": apiKey, "content-type": "application/json" },
          body: JSON.stringify({
            contents,
            systemInstruction: { parts: [{ text: req.system }] },
            generationConfig: {
              maxOutputTokens: req.maxTokens,
              // Model Gemini đời mới tiêu tốn maxOutputTokens cho cả phần suy luận nội bộ. Tra cứu
              // tài liệu đã có sẵn trích đoạn nên không cần suy luận sâu; tắt đi để ngân sách không
              // bị suy luận ăn hết rồi trả về rỗng với finishReason=MAX_TOKENS.
              ...(tatSuyLuan ? { thinkingConfig: { thinkingBudget: 0 } } : {}),
            },
          }),
          signal: ctrl.signal,
        });

      // Không phải model nào cũng nhận thinkingConfig — đo thực tế: gemini-3.5-flash và
      // gemini-3.1-flash-lite nhận, gemini-3.6-flash và gemini-3.5-flash-lite trả 400. Thử tắt
      // suy luận trước, chỉ khi đúng lỗi 400 thì gọi lại không kèm tham số đó; lỗi 400 lần hai
      // được trả về nguyên trạng, không che.
      let res = await goi(true);
      if (res.status === 400) res = await goi(false);

      const body = (await res.json().catch(() => null)) as GeminiResponse | null;
      const latencyMs = Date.now() - started;

      if (!res.ok)
        return {
          text: "",
          inputTokens: 0,
          outputTokens: 0,
          latencyMs,
          errorCode: res.status === 401 || res.status === 403 ? "AUTH_FAILED" : res.status === 429 ? "RATE_LIMITED" : `HTTP_${res.status}`,
        };

      const cand = body?.candidates?.[0];
      const text = (cand?.content?.parts ?? [])
        .map((p) => p.text ?? "")
        .join("")
        .trim();
      const inputTokens = body?.usageMetadata?.promptTokenCount ?? 0;
      const outputTokens = (body?.usageMetadata?.candidatesTokenCount ?? 0) + (body?.usageMetadata?.thoughtsTokenCount ?? 0);

      // Nhà cung cấp có thể chặn nội dung vì lý do an toàn của họ — đó KHÔNG phải lỗi hạ tầng và
      // cũng không phải hành vi từ chối của Copilot, nên tách mã riêng để đọc trace không nhầm.
      if (!text && cand?.finishReason && cand.finishReason !== "STOP")
        return { text: "", inputTokens, outputTokens, latencyMs, errorCode: `PROVIDER_${cand.finishReason}` };

      return { text, inputTokens, outputTokens, latencyMs, errorCode: text ? null : "EMPTY_RESPONSE" };
    } catch (e) {
      return {
        text: "",
        inputTokens: 0,
        outputTokens: 0,
        latencyMs: Date.now() - started,
        errorCode: e instanceof Error && e.name === "AbortError" ? "TIMEOUT" : "CONNECTION_ERROR",
      };
    } finally {
      clearTimeout(timer);
    }
  },
};

// Nền tảng mô hình TỰ VẬN HÀNH của Viện: máy chủ GPU nội bộ phơi API tương thích OpenAI qua
// vLLM/TGI/Ollama. Trình tự đưa một máy chủ vào đây: ETV.GAI 01 — Hướng dẫn Tích hợp máy chủ mô
// hình AI nội bộ vào ManLab AIOS.
//
// Khác hai adapter trên ở một điểm về tuân thủ, không phải kỹ thuật: dữ liệu KHÔNG rời hạ tầng
// của Viện. Điều đó KHÔNG đồng nghĩa được nhận tài liệu mức Hạn chế — ETV.P29 §5.1.5 xếp "truy
// cập hoặc lập chỉ mục" dữ liệu Hạn chế/Mật vào Điều cấm tuyệt đối, trong khi ETV.P34 §6.8 lại
// cho phép có điều kiện. Xung đột đó chưa được giải quyết ở cấp thủ tục, nên ETV.GAI 01 §3.7 áp
// bản cấm chặt hơn: trần thực tế của nền tảng này hiện là Nội bộ. Bù lại chỉ có MỘT GPU: mất máy
// chủ là mất toàn bộ năng lực suy luận nội bộ. Vì vậy adapter cố ý
// KHÔNG tự thử lại và KHÔNG tự chuyển sang nhà cung cấp khác — quyết định chuyển hay trả lỗi có
// kiểm soát thuộc về chính sách định tuyến, không thuộc về adapter.
//
// Endpoint đọc từ AIPlatform.apiBaseUrl (một nguồn sự thật duy nhất cho endpoint — xem chú thích
// tại AIProvider.platformId trong schema.prisma); khóa đọc từ biến môi trường như các adapter mô
// hình khác, KHÔNG lấy từ AISecret vì bảng đó chỉ lưu maskedValue.
const LOCAL_LLM_ENV_KEY = "LOCAL_LLM_API_KEY";
// 30 s, không thử lại — theo ETV.GAI 01 §3.5. Đặt hằng riêng thay vì dùng lại hằng của Anthropic
// để ngưỡng của máy chủ nội bộ đổi được độc lập với dịch vụ ngoài.
const LOCAL_LLM_TIMEOUT_MS = 30_000;

interface OpenAIChatResponse {
  choices?: { message?: { content?: string }; finish_reason?: string }[];
  usage?: { prompt_tokens?: number; completion_tokens?: number };
}

const LocalOpenAIPlatformAdapter: PlatformAdapter = {
  async call() {
    return { status: 501, output: null, latencyMs: 0, errorCode: "NOT_A_TOOL_PLATFORM" };
  },
  async health(platform) {
    if (!platform.apiBaseUrl) return { ok: false, error: "NO_API_BASE_URL" };
    const key = process.env[LOCAL_LLM_ENV_KEY];
    if (!key) return { ok: false, error: "NO_API_KEY" };
    try {
      const r = await callWithTimeout(`${platform.apiBaseUrl}/models`, { headers: { authorization: `Bearer ${key}` } }, 5000);
      return { ok: r.status < 400, error: r.status >= 400 ? `HTTP ${r.status}` : null };
    } catch (e) {
      return { ok: false, error: e instanceof Error && e.name === "AbortError" ? "TIMEOUT" : String(e) };
    }
  },
  async chat(platform, req) {
    const started = Date.now();
    // Thiếu endpoint hoặc thiếu khóa thì dừng TRƯỚC khi phát HTTP — gọi mù ra mạng không giúp gì
    // mà còn làm nhiễu nhật ký truy cập của máy chủ.
    if (!platform.apiBaseUrl) return chatError("NO_API_BASE_URL", 0);
    const key = process.env[LOCAL_LLM_ENV_KEY];
    if (!key) return chatError("NO_API_KEY", 0);

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), LOCAL_LLM_TIMEOUT_MS);
    try {
      const res = await fetch(`${platform.apiBaseUrl}/chat/completions`, {
        method: "POST",
        headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
        body: JSON.stringify({
          model: req.modelId,
          max_tokens: req.maxTokens,
          // Lược đồ OpenAI đặt lời nhắc hệ thống là message đầu danh sách, không phải một trường
          // riêng như Anthropic (system) hay Gemini (systemInstruction).
          messages: [{ role: "system", content: req.system }, ...req.messages],
        }),
        signal: ctrl.signal,
      });
      const latencyMs = Date.now() - started;
      const body = (await res.json().catch(() => null)) as OpenAIChatResponse | null;

      if (!res.ok)
        return chatError(res.status === 401 || res.status === 403 ? "AUTH_FAILED" : res.status === 429 ? "RATE_LIMITED" : `HTTP_${res.status}`, latencyMs);

      const choice = body?.choices?.[0];
      const text = (choice?.message?.content ?? "").trim();
      const inputTokens = body?.usage?.prompt_tokens ?? 0;
      const outputTokens = body?.usage?.completion_tokens ?? 0;

      // Máy chủ dừng vì lý do của chính nó (cạn max_tokens, bộ lọc nội dung) — tách mã riêng để
      // đọc trace không nhầm với lỗi hạ tầng, giống cách GeminiPlatformAdapter đang làm.
      if (!text && choice?.finish_reason && choice.finish_reason !== "stop")
        return { text: "", inputTokens, outputTokens, latencyMs, errorCode: `PROVIDER_${choice.finish_reason.toUpperCase()}` };

      return { text, inputTokens, outputTokens, latencyMs, errorCode: text ? null : "EMPTY_RESPONSE" };
    } catch (e) {
      return chatError(e instanceof Error && e.name === "AbortError" ? "TIMEOUT" : "CONNECTION_ERROR", Date.now() - started);
    } finally {
      clearTimeout(timer);
    }
  },
};

const ADAPTERS: Record<string, PlatformAdapter> = {
  ManlabPlatformAdapter,
  PlaceholderPlatformAdapter,
  AnthropicAdapter,
  GeminiPlatformAdapter,
  LocalOpenAIPlatformAdapter,
};
export const getAdapter = (adapterType: string): PlatformAdapter => ADAPTERS[adapterType] ?? PlaceholderPlatformAdapter;

// Danh sách bộ chuyển đổi có thật, cho form đăng ký nền tảng và cho kiểm tra ở tầng hành động.
// Đọc từ chính ADAPTERS để thêm adapter mới không phải nhớ cập nhật thêm chỗ nào khác.
export const ADAPTER_TYPES = Object.keys(ADAPTERS);
