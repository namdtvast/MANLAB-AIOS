// LocalOpenAIPlatformAdapter là đường gọi máy chủ mô hình tự vận hành của Viện (ETV.GAI 01).
// Bộ test khóa lại ba bất biến:
//   (1) thiếu endpoint hoặc thiếu khóa thì KHÔNG phát HTTP — máy chủ nội bộ không được gọi mù;
//   (2) mã lỗi trả về đúng bộ dùng chung của ChatResult, vì trang giám sát và bảng trace đọc theo
//       mã này chứ không đọc thông báo;
//   (3) adapter có mặt trong hằng ADAPTERS — sai adapterType sẽ âm thầm rơi về Placeholder.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getAdapter, type ChatRequest, type PlatformForAdapter } from "../adapters";

const adapter = getAdapter("LocalOpenAIPlatformAdapter");
const PLATFORM: PlatformForAdapter = { apiBaseUrl: "https://llm.manlab.vn/v1" };
const REQ: ChatRequest = {
  modelId: "manlab-local-14b",
  system: "Lời nhắc hệ thống",
  messages: [{ role: "user", content: "Hỏi thử" }],
  maxTokens: 512,
  effort: "low",
};

// Khai đủ tham số của fetch để `mock.calls` giữ được kiểu — vi.fn(async () => …) cho ra tuple
// rỗng và không đọc được đối số đã gửi.
function reply(status: number, body: unknown) {
  const fn = vi.fn<(url: string | URL | Request, init?: RequestInit) => Promise<Response>>();
  // Cài đặt không nhận tham số, kiểu lấy từ generic — `mock.calls` vẫn đọc được đối số đã gửi.
  fn.mockImplementation(async () => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } }));
  return fn;
}

const OK_BODY = {
  choices: [{ message: { content: " Trả lời " }, finish_reason: "stop" }],
  usage: { prompt_tokens: 120, completion_tokens: 34 },
};

describe("LocalOpenAIPlatformAdapter", () => {
  beforeEach(() => {
    vi.stubEnv("LOCAL_LLM_API_KEY", "khoa-thu-nghiem");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("có mặt trong ADAPTERS, không rơi về Placeholder", () => {
    expect(adapter).not.toBe(getAdapter("KhongTonTai"));
    expect(adapter.chat).toBeTypeOf("function");
  });

  it("không phơi Tool nghiệp vụ", async () => {
    const r = await adapter.call(PLATFORM, { endpoint: "/x", httpMethod: "GET" }, {});
    expect(r.errorCode).toBe("NOT_A_TOOL_PLATFORM");
  });

  it("health gọi GET /models và báo ok khi 2xx", async () => {
    const fetchMock = reply(200, { data: [{ id: "manlab-local-14b" }] });
    vi.stubGlobal("fetch", fetchMock);
    await expect(adapter.health(PLATFORM)).resolves.toEqual({ ok: true, error: null });
    expect(fetchMock.mock.calls[0][0]).toBe("https://llm.manlab.vn/v1/models");
  });

  it("health báo NO_API_BASE_URL và NO_API_KEY mà không phát HTTP", async () => {
    const fetchMock = reply(200, {});
    vi.stubGlobal("fetch", fetchMock);

    await expect(adapter.health({ apiBaseUrl: null })).resolves.toEqual({ ok: false, error: "NO_API_BASE_URL" });
    vi.stubEnv("LOCAL_LLM_API_KEY", "");
    await expect(adapter.health(PLATFORM)).resolves.toEqual({ ok: false, error: "NO_API_KEY" });

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("chat thiếu endpoint hoặc thiếu khóa thì dừng trước khi phát HTTP", async () => {
    const fetchMock = reply(200, OK_BODY);
    vi.stubGlobal("fetch", fetchMock);

    expect((await adapter.chat!({ apiBaseUrl: null }, REQ)).errorCode).toBe("NO_API_BASE_URL");
    vi.stubEnv("LOCAL_LLM_API_KEY", "");
    expect((await adapter.chat!(PLATFORM, REQ)).errorCode).toBe("NO_API_KEY");

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("chat gửi đúng lược đồ OpenAI: lời nhắc hệ thống là message đầu danh sách", async () => {
    const fetchMock = reply(200, OK_BODY);
    vi.stubGlobal("fetch", fetchMock);
    await adapter.chat!(PLATFORM, REQ);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://llm.manlab.vn/v1/chat/completions");
    expect((init!.headers as Record<string, string>).authorization).toBe("Bearer khoa-thu-nghiem");
    expect(JSON.parse(init!.body as string)).toMatchObject({
      model: "manlab-local-14b",
      max_tokens: 512,
      messages: [
        { role: "system", content: "Lời nhắc hệ thống" },
        { role: "user", content: "Hỏi thử" },
      ],
    });
  });

  it("chat thành công ánh xạ đúng token vào/ra và cắt khoảng trắng", async () => {
    vi.stubGlobal("fetch", reply(200, OK_BODY));
    const r = await adapter.chat!(PLATFORM, REQ);
    expect(r.errorCode).toBeNull();
    expect(r.text).toBe("Trả lời");
    expect(r.inputTokens).toBe(120);
    expect(r.outputTokens).toBe(34);
  });

  it.each([
    [401, "AUTH_FAILED"],
    [403, "AUTH_FAILED"],
    [429, "RATE_LIMITED"],
    [500, "HTTP_500"],
  ])("máy chủ trả %i thì mã lỗi là %s", async (status, code) => {
    vi.stubGlobal("fetch", reply(status, { error: { message: "loi" } }));
    expect((await adapter.chat!(PLATFORM, REQ)).errorCode).toBe(code);
  });

  it("phản hồi 200 nhưng rỗng thì báo EMPTY_RESPONSE", async () => {
    vi.stubGlobal("fetch", reply(200, { choices: [{ message: { content: "" }, finish_reason: "stop" }], usage: {} }));
    expect((await adapter.chat!(PLATFORM, REQ)).errorCode).toBe("EMPTY_RESPONSE");
  });

  it("máy chủ dừng vì lý do của chính nó thì tách mã PROVIDER_*, không lẫn với lỗi hạ tầng", async () => {
    vi.stubGlobal("fetch", reply(200, { choices: [{ message: { content: "" }, finish_reason: "length" }], usage: { prompt_tokens: 9 } }));
    const r = await adapter.chat!(PLATFORM, REQ);
    expect(r.errorCode).toBe("PROVIDER_LENGTH");
    expect(r.inputTokens).toBe(9);
  });

  it("mất kết nối báo CONNECTION_ERROR, bị hủy vì quá hạn báo TIMEOUT", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("fetch failed");
      })
    );
    expect((await adapter.chat!(PLATFORM, REQ)).errorCode).toBe("CONNECTION_ERROR");

    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        const err = new Error("aborted");
        err.name = "AbortError";
        throw err;
      })
    );
    expect((await adapter.chat!(PLATFORM, REQ)).errorCode).toBe("TIMEOUT");
  });
});
