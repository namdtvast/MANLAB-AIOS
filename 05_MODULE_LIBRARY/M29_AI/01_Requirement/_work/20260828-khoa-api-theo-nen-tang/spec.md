# 20260828-khoa-api-theo-nen-tang — Khoá API theo từng nền tảng, lý do hỏng hiện ra, màn hình tạo Provider/Model, đổi mô hình của tác tử

Tier **M** (đổi schema DB + giao diện + chốt an ninh). Căn cứ: `ETV.GAI 01` §3.4 Bước 4, §3.6.

Khởi phát từ một tình huống vận hành thật: người dùng đăng ký nền tảng `LLM_Q3`
(`https://ai.manlab.vn/v1`, adapter `LocalOpenAIPlatformAdapter`), đưa vào **Hiệu lực**, dò sức
khoẻ ra **Ngừng hoạt động**, và không có cách nào biết vì sao — trong khi lý do (`NO_API_KEY`) đã
nằm sẵn ở `AIPlatform.lastError` từ lần dò đó.

## RECON

| Loại | Nội dung |
|---|---|
| [FACT] | `AIPlatform.lastError` và `lastHealthCheckAt` được `checkHealthAction()` ghi mỗi lần dò, nhưng **không trang nào hiển thị** — bảng ở `/modules/M29` chỉ vẽ huy hiệu `health`. |
| [FACT] | `LocalOpenAIPlatformAdapter` đọc khoá từ đúng **một** biến `LOCAL_LLM_API_KEY` cho **mọi** nền tảng dùng adapter đó. Viện đang có hai nền tảng như vậy (`MANLAB_LOCAL_LLM`, `LLM_Q3`). |
| [FACT] | `createProvider`/`createModel` đã có ở `actions.ts` nhưng **không có màn hình nào gọi** — trang Danh mục chỉ đọc; Provider/Model chỉ sinh ra được bằng seed hoặc SQL. |
| [FACT] | Bảng `AISecret` cố ý chỉ lưu `maskedValue`; khoá thật luôn ở biến môi trường. |
| [FACT] | Đo thực tế 28/08/2026: `GET https://ai.manlab.vn/v1/models` không kèm khoá trả `401 {"error":{"message":"Authentication Error, No api key passed in."}}` — máy chủ sống, thiếu khoá ở phía AIOS. |
| [ASSUMPTION] | Máy chủ cục bộ nào cũng nhận khoá theo `Authorization: Bearer` — đúng với vLLM/LiteLLM/Ollama. |

## OUTCOME

**WHO** — Quản trị AI (registry) và Quản trị hệ thống (platforms) vận hành danh mục M29.

**WHAT** — (1) khoá API khai theo **từng** nền tảng; (2) lý do nền tảng hỏng đọc được ngay trên
giao diện; (3) tạo được Provider và Model bằng màn hình.

**WHY** — Ba thứ này chặn đúng một quy trình: đăng ký máy chủ mô hình nội bộ theo ETV.GAI 01 Bước 4
không đi hết được nếu người vận hành không đặt được khoá riêng, không đọc được lý do hỏng, và
không tạo được bản ghi `AIModel` khớp `--served-model-name`.

**SUCCESS CRITERIA**

1. Hai nền tảng cùng adapter, hai khoá khác nhau, cùng chạy được.
2. Nền tảng thiếu khoá hiện **đúng tên biến** còn thiếu; khoá sai hiện khác với máy chủ tắt.
3. Tạo Provider (gắn nền tảng) và Model (`modelId`) bằng giao diện, có ghi `AIAuditLog`.
4. `npm test` và `npm run build` PASS.

## SPEC

### Dữ liệu

```prisma
model AIPlatform {
  …
  apiKeyEnv String?   // TÊN biến môi trường, KHÔNG phải khoá
}
```

Di trú: `20260828100000_platform_api_key_env`.

### Chốt an ninh — vì sao tên biến bị chặn theo mẫu

Người đăng ký nền tảng cũng chính là người khai `apiBaseUrl`. Nếu họ tự do chọn tên biến, họ khai
được `apiKeyEnv = "AUTH_SECRET"` với `apiBaseUrl` trỏ về máy chủ của họ, và adapter sẽ ngoan ngoãn
gửi `AUTH_SECRET` của Viện đi dưới dạng `Authorization: Bearer`. Vì vậy tên biến bị khoanh theo
`KEY_ENV_PATTERN = /^LOCAL_LLM_API_KEY(_[A-Z0-9]+)*$/` (`src/lib/m29/khoa-api.ts`), kiểm ở **ba**
chỗ: form (gương), `actions.ts` (chốt ghi), và ngay tại chỗ adapter đọc biến (chốt cuối, bắt cả
dữ liệu cũ hoặc đường ghi khác sau này).

Hằng đặt ở `khoa-api.ts` chứ không ở `adapters.ts` vì form là client component; import từ
`adapters.ts` sẽ kéo SDK nhà cung cấp vào bundle trình duyệt.

### Mã lỗi

`NO_API_KEY` của adapter cục bộ đổi thành `NO_API_KEY:<TÊN_BIẾN>`; thêm `INVALID_KEY_ENV`.
`healthErrorLabel()` (`labels.ts`) dịch sang tiếng Việt và **không che tên biến** — đó là tên
biến, không phải giá trị bí mật, và chính nó là thứ người vận hành cần để sửa.

### Giao diện

| Màn hình | Thêm gì |
|---|---|
| `/modules/M29` | Dưới huy hiệu sức khoẻ: câu lý do + mốc dò gần nhất |
| `/modules/M29/registry` | Cột **Biến khoá API** (chỉ nền tảng dùng adapter cục bộ), form `NewProviderForm`, form `NewModelForm`, ô `apiKeyEnv` trong form đăng ký nền tảng |
| `/modules/M29/agents/[id]` | Khối **Nền tảng và mô hình**: đổi nền tảng/model của tác tử, và mở lại tác tử đang tạm dừng |

### Thứ tự các bảng danh mục

Mọi **bảng hiển thị** của M29 xếp theo `updatedAt desc` thay vì theo mã: Platform (Tổng quan +
Danh mục), Agent, Provider, Model, Tool, Hạn mức chi phí. Đăng ký, đổi trạng thái phê duyệt, đặt
biến khoá, đổi mô hình và cả vòng dò sức khoẻ đều chạm `updatedAt`, nên bản ghi người vận hành
vừa thao tác luôn nằm dòng đầu — xếp theo mã thì nó lẫn giữa danh sách đúng lúc cần nhìn nhất.

**Cố ý giữ xếp theo mã:** các danh sách đổ vào ô chọn (`<select>` của form đổi mô hình, form hạn
mức, form xử lý AI chưa đăng ký, form lập phiếu sự cố) và dải chip Skill. Ở đó người dùng tìm một
mục **đã biết tên**, nên thứ tự ABC ổn định là đúng; thứ tự đổi theo lần sửa gần nhất chỉ làm khó
tìm.

### Đổi mô hình của tác tử — cưỡng chế ETV.P29 §5.8

`§5.8` xếp "đổi mô hình/nhà cung cấp" vào **thay đổi lớn**: lập lại AIA và đánh giá chất lượng,
LĐV phê duyệt. Phần mềm không thay được người phê duyệt, nhưng chặn được đường vòng:

1. Điều kiện đổi nằm ở `rules.ts#kiemTraDoiMoHinh` (thuần, test được, không cần DB): bắt buộc ghi
   lý do ≥10 ký tự; nền tảng phải Đã phê duyệt/Hiệu lực; model phải Hoạt động; **model phải thuộc
   nhà cung cấp gắn đúng nền tảng đang chọn** — không kiểm thì tạo được cặp "gọi máy chủ A bằng
   tên model của máy chủ B", lỗi chỉ lộ ở lượt gọi thật.
2. Đổi xong: tác tử `SUSPENDED` với lý do riêng `MODEL_CHANGED`, AIA đang `APPROVED` về
   `REVIEW_REQUIRED`, ghi `AIAuditLog` cả hai.
3. **Không** tự gỡ tạm dừng khi AIA được phê duyệt lại — khác với `AIA_OVERDUE`. Đổi mô hình đòi
   thêm *đánh giá chất lượng* (F29.03) mà phần mềm không kiểm được, nên mở lại là hành động riêng
   có ghi lý do (chỗ dẫn số phiếu).

Phát sinh trong lúc làm: `resumeAgent()` đã tồn tại nhưng **không màn hình nào gọi** — tác tử bị
tạm dừng vì sự cố cũng đang kẹt. Nút "Mở lại tác tử" bịt luôn lỗ này.

## KHÔNG LÀM

- Không lưu khoá vào cơ sở dữ liệu dưới mọi hình thức.
- Không tự dò khoá cho nền tảng dùng adapter khác (Anthropic/Gemini có biến cố định của riêng SDK).
- Không đụng vòng đời phê duyệt: nền tảng mới vẫn sinh ra ở `DRAFT`, ranh giới dữ liệu vẫn siết nhất.
