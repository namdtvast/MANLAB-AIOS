# 20260825-local-model-provider — Nhà cung cấp mô hình nội bộ (self-hosted)

Tier **M** (đổi schema DB + tích hợp). Căn cứ: `ETV.GAI 01` §3.6 — Hướng dẫn Tích hợp máy chủ mô hình AI nội bộ vào ManLab AIOS.

## RECON

| Loại | Nội dung |
|---|---|
| [FACT] | `AIProvider` chỉ có `id`, `code`, `name`, `status` — không có đường nào trỏ tới endpoint của một máy chủ tự vận hành. |
| [FACT] | `AIPlatform` đã có sẵn `apiBaseUrl`, `health`, `lastError`, `lastHealthCheckAt`, `adapterType`, `approvalStatus` — tức là **hạ tầng kiểm tra sức khoẻ đã có**, chỉ thiếu liên kết từ Provider sang. |
| [FACT] | `gateway.chat()` chọn adapter theo `agent.platform.adapterType` và gọi `adapter.chat(agent.platform, …)`; `AIProvider` **không** tham gia đường gọi mô hình — nó là sổ đăng ký. |
| [FACT] | `checkHealthAction()` quét `AIPlatform` có `approvalStatus = APPROVED`, gọi `adapter.health(platform)`, ghi `HEALTHY`/`UNKNOWN`/`DOWN`. |
| [FACT] | Khoá API của nền tảng mô hình đọc từ biến môi trường (`AnthropicAdapter`, `GeminiPlatformAdapter`), **không** từ `AISecret` — bảng đó cố ý chỉ lưu `maskedValue`. |
| [FACT] | Bộ mã lỗi `ChatResult.errorCode` đang dùng: `NO_API_KEY`, `AUTH_FAILED`, `RATE_LIMITED`, `TIMEOUT`, `HTTP_<mã>`, `CONNECTION_ERROR`, `EMPTY_RESPONSE`, `MODEL_REFUSAL`, `PROVIDER_<lý do>`. |
| [FACT] | `gateway.ts` sinh thông báo lỗi `NO_API_KEY` có ghi cứng tên biến `ANTHROPIC_API_KEY`. |
| [ASSUMPTION] | Máy chủ nội bộ phơi API tương thích OpenAI (`GET /v1/models`, `POST /v1/chat/completions`) — đúng với vLLM/TGI/Ollama nêu tại ETV.GAI 01 §2. |

## OUTCOME

**WHO** — Quản trị AI (AI_ADMIN) đăng ký máy chủ mô hình nội bộ; Copilot/Agent dùng mô hình đó.

**WHAT** — (1) `AIProvider` trỏ được tới một `AIPlatform`, dùng lại endpoint và kiểm tra sức khoẻ đã có thay vì nhân đôi; (2) một adapter mới gọi được API tương thích OpenAI của máy chủ nội bộ.

**WHY** — Không có hai thứ này thì bản ghi `MANLAB_LOCAL` ở ETV.GAI 01 Bước 4 là bản ghi chết: không ai biết nó trỏ đi đâu, `gateway.chat()` không gọi được.

**SUCCESS CRITERIA**

1. Tạo Provider kèm `platformId`; trang danh mục hiển thị nền tảng gắn với Provider.
2. Provider cũ (`GEMINI`, `ANTHROPIC`) không gắn nền tảng vẫn chạy như cũ — không hỏng dữ liệu.
3. `LocalOpenAIPlatformAdapter` trả đúng bộ mã lỗi đang dùng cho: thiếu khoá, thiếu endpoint, sai khoá (401/403), quá tần suất (429), timeout, mất kết nối, phản hồi rỗng.
4. `npm test` và `npm run build` PASS.

## SPEC

### Dữ liệu

```prisma
model AIProvider {
  …
  platformId String?
  platform   AIPlatform? @relation(fields: [platformId], references: [id])
}

model AIPlatform {
  …
  providers AIProvider[]
}
```

**`platformId` để `null` được (không bắt buộc)** — đây là quyết định có chủ ý: provider của dịch vụ ngoài (Anthropic, Gemini) không cần bản ghi nền tảng riêng để hoạt động, và ép `NOT NULL` sẽ buộc phải nạp lại dữ liệu cũ. Migration vì vậy chỉ **thêm cột** — không phá huỷ, không cần backfill, revert được bằng cách bỏ cột.

`onDelete` giữ mặc định (`Restrict`): không cho xoá một nền tảng khi còn Provider trỏ vào.

### Quy tắc nghiệp vụ

| Mã | Quy tắc |
|---|---|
| BR-1 | `AIProvider.platformId` chỉ là **liên kết đăng ký**. Đường gọi mô hình vẫn đi qua `agent.platform` — không đổi kiến trúc, không đổi `gateway.chat()`. |
| BR-2 | Adapter đọc endpoint từ `platform.apiBaseUrl`. Không có → `NO_API_BASE_URL`. |
| BR-3 | Khoá API đọc từ biến môi trường `LOCAL_LLM_API_KEY`, giữ đúng cách các adapter mô hình hiện có làm. Không đọc từ `AISecret`. |
| BR-4 | Thông báo lỗi thiếu khoá của Copilot không được ghi cứng tên biến của một nhà cung cấp cụ thể — sẽ sai khi Agent chạy trên nền tảng khác. |

### Acceptance Criteria

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Nền tảng có `apiBaseUrl`, có `LOCAL_LLM_API_KEY` | gọi `health()` | `GET {apiBaseUrl}/models`; 2xx → `ok: true` |
| AC-2 | Không có `LOCAL_LLM_API_KEY` | gọi `health()`/`chat()` | `NO_API_KEY`, không phát HTTP |
| AC-3 | Nền tảng không có `apiBaseUrl` | gọi `chat()` | `NO_API_BASE_URL`, không phát HTTP |
| AC-4 | Máy chủ trả 401 hoặc 403 | gọi `chat()` | `AUTH_FAILED` |
| AC-5 | Máy chủ trả 429 | gọi `chat()` | `RATE_LIMITED` |
| AC-6 | Máy chủ trả 500 | gọi `chat()` | `HTTP_500` |
| AC-7 | Máy chủ trả 200 kèm nội dung + `usage` | gọi `chat()` | `errorCode: null`, ánh xạ đúng `prompt_tokens`→`inputTokens`, `completion_tokens`→`outputTokens` |
| AC-8 | Máy chủ trả 200 nhưng nội dung rỗng | gọi `chat()` | `EMPTY_RESPONSE` |
| AC-9 | Máy chủ không phản hồi quá 30 s | gọi `chat()` | `TIMEOUT` |
| AC-10 | Provider có `platformId` | mở trang M29 · Danh mục | Cột "Nền tảng" hiện mã nền tảng; provider không gắn hiện `—` |

### NFR

Timeout 30 000 ms, không thử lại — bằng ngưỡng đang áp cho nền tảng mô hình hiện có, và đúng ETV.GAI 01 §3.5 (một GPU duy nhất, thử lại nhiều lần chỉ dồn tải).

## PLAN

| Increment | Nội dung | Revert |
|---|---|---|
| 1 | `schema.prisma`: `platformId` + quan hệ hai chiều; migration `add_provider_platform_link` | Bỏ cột |
| 2 | `actions.ts`: `createProvider` nhận `platformId?`; trang `registry` thêm cột Nền tảng | Revert file |
| 3 | `adapters.ts`: `LocalOpenAIPlatformAdapter` + đăng ký `ADAPTERS`; `gateway.ts`: bỏ tên biến môi trường ghi cứng | Revert file |
| 4 | `seed.ts`: nền tảng `MANLAB_LOCAL_LLM` + provider `MANLAB_LOCAL` + model, theo đúng tham số ETV.GAI 01 §3.5 | Revert file |
| 5 | Test `adapters-local.test.ts` phủ AC-1…AC-9 | Xoá file |

**Rủi ro và cách chặn**

| Rủi ro | Chặn |
|---|---|
| `adapters.ts` đang có thay đổi chưa commit của phiên khác | Đã liên hệ chủ sở hữu; chỉ sửa sau khi họ commit; dùng thay thế chuỗi chính xác, không ghi đè cả file |
| Migration chạm dữ liệu đang có | Chỉ `ADD COLUMN` cho phép NULL — không backfill, không đổi kiểu, không xoá |
| Seed tạo trùng bản ghi khi chạy lại | Dùng `upsert` theo `code` như khối `seedCopilot` đang làm |

## VERIFY

Điền sau khi BUILD — xem `verify.md`.
