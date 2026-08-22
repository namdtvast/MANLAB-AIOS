// M29 — IAIPlatformAdapter: cách gọi API thật của từng nền tảng, tách khỏi Tool Gateway để
// không rải `if (platform === "ManLab")` trong logic nghiệp vụ chung (nguyên tắc kiến trúc #2,
// DacTa.md). Port 1:1 từ 08_Source/api/adapters.mjs.
//
// ManlabPlatformAdapter gọi HTTP THẬT ra ngoài (mặc định localhost:8010 — server M10 standalone
// cũ), KHÔNG gọi Prisma của M10 trực tiếp trong cùng process, dù cả 2 module cùng nằm trong repo
// này — giữ đúng nguyên tắc "Agent không bao giờ gọi thẳng DB/API của một nền tảng" ngay cả khi
// về mặt hạ tầng có thể tắt qua đường tắt.

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

export interface PlatformAdapter {
  call(platform: PlatformForAdapter, tool: ToolForAdapter, input: unknown): Promise<CallResult>;
  health(platform: PlatformForAdapter): Promise<{ ok: boolean; error: string | null }>;
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

const ADAPTERS: Record<string, PlatformAdapter> = { ManlabPlatformAdapter, PlaceholderPlatformAdapter };
export const getAdapter = (adapterType: string): PlatformAdapter => ADAPTERS[adapterType] ?? PlaceholderPlatformAdapter;
