# VERIFY — 20260825-local-model-provider

Ngày 25/08/2026. Mọi dòng `PASS` dưới đây kèm lệnh và kết quả thật, không suy luận từ bước khác.

## Kết quả

| # | Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|---|
| 1 | Migration áp được, chỉ thêm cột | **PASS** | `npx prisma migrate deploy` → "All migrations have been successfully applied". SQL sinh ra đúng 2 câu: `ALTER TABLE "AIProvider" ADD COLUMN "platformId" TEXT;` + `ADD CONSTRAINT … ON DELETE RESTRICT ON UPDATE CASCADE`. Không `DROP`, không `NOT NULL`, không backfill. |
| 2 | Bộ test đầy đủ | **PASS** | `npm test` → **13 tệp / 210 ca đạt**, trong đó 14 ca mới của `adapters-local.test.ts`. |
| 3 | Kiểm kiểu + dựng bản phát hành | **PASS** | `npm run build` → "Compiled successfully", TypeScript qua, sinh đủ tuyến `/modules/M29/registry`. (Lượt đầu **FAIL** ở 2 lỗi TS2493/TS2352 trong chính tệp test — đã sửa bằng cách khai đủ tham số cho mock `fetch`, dựng lại mới PASS.) |
| 4 | ESLint | **PASS** | `npm run lint` → 0 lỗi, 2 cảnh báo `no-unused-vars` ở `seed.ts:2524,2532` — **có sẵn từ trước**, nằm ngoài vùng sửa (khối mới ở khoảng dòng 900). |
| 5 | Seed chạy lại được, không nhân bản | **PASS** | `npx tsx prisma/seed.ts` chạy hết, không lỗi. Dùng `upsert` theo `code`. |
| 6 | Dữ liệu đúng thiết kế | **PASS** | Truy vấn `psql` trực tiếp:<br>`ANTHROPIC → ANTHROPIC_API (APPROVED)`, `GEMINI → GEMINI_API (APPROVED)`, `MANLAB_LOCAL → MANLAB_LOCAL_LLM · https://llm.manlab.vn/v1 · DRAFT · LocalOpenAIPlatformAdapter`; model `manlab-local-14b` ở trạng thái `DISABLED`. |
| 7 | Giao diện thật | **PASS** | Dev server thật, `/modules/M29/registry`: bảng Platform hiện `MANLAB_LOCAL_LLM · LocalOpenAIPlatformAdapter · Nháp`; danh sách Provider hiện `… · nền tảng ANTHROPIC_API / GEMINI_API / MANLAB_LOCAL_LLM`. Có ảnh chụp màn hình. |
| 8 | Không hỏng dữ liệu cũ | **PASS** | Provider cũ vẫn `ACTIVE`, model cũ nguyên vẹn; 210 ca test cũ + mới đều đạt. |
| 9 | Toàn vẹn liên kết repo | **PASS** | `python3 _meta/validate_links.py` → 498 link · 38 MP · 38 M · 22 CAP · **0 vấn đề**. |
| 10 | Gọi máy chủ mô hình nội bộ **thật** | **NOT RUN** | `llm.manlab.vn` chưa dựng — máy chủ chưa qua Bước 1–6 của `ETV.GAI 01`. Đường gọi mới chỉ được kiểm bằng test có mô phỏng `fetch`. |
| 11 | Kiểm tra sức khoẻ tự động cho nền tảng nội bộ | **NOT APPLICABLE** | `checkHealthAction()` chỉ dò nền tảng `APPROVED`; bản ghi mẫu cố ý để `DRAFT` nên chưa vào vòng dò — đúng thiết kế, tránh báo động DOWN giả. |

## Đối chiếu Acceptance Criteria

AC-1 … AC-9 đều có ca test tương ứng trong `src/lib/m29/__tests__/adapters-local.test.ts` và đã đạt.
AC-10 kiểm bằng giao diện thật (mục 7).

Hai ca ngoài danh sách AC ban đầu, thêm vào khi BUILD:

- Adapter **có mặt trong hằng `ADAPTERS`** — thiếu bước đăng ký thì `getAdapter()` âm thầm rơi về
  `PlaceholderPlatformAdapter` và lỗi chỉ lộ ra lúc chạy thật.
- **`PROVIDER_<lý do>`** khi máy chủ tự dừng (`finish_reason` khác `stop`) — tách khỏi lỗi hạ tầng
  để đọc trace không nhầm, thống nhất với cách `GeminiPlatformAdapter` đang làm.

## Thay đổi ngoài phạm vi ban đầu, đã làm có chủ ý

`gateway.ts` trước đây ghi cứng tên biến `ANTHROPIC_API_KEY` vào thông báo lỗi `NO_API_KEY`. Thay
đổi này làm thông báo đó **có thể sai chỗ**: Agent chạy trên nền tảng nội bộ mà thiếu khoá sẽ được
bảo đi đặt khoá của Anthropic. Đã sửa thành nêu **tên nền tảng**, và cập nhật ca test tương ứng
trong `copilot-chat.test.ts` (giữ nguyên ý định gốc của ca test: báo đúng nguyên nhân, không báo
lỗi chung chung).

## Việc còn lại — không thuộc phạm vi lần này

1. **Trần mức bảo mật chưa gắn theo từng nền tảng.** `mucBaoMatToiDa()` trong `copilot/retrieval.ts`
   đọc biến toàn cục `COPILOT_MUC_BAO_MAT_TOI_DA`, mặc định fail-closed ở `Cong-khai`. Lập luận của
   ETV.P29 §5.5 (không có cam kết "không huấn luyện lại" thì chỉ gửi tài liệu Công khai) **không áp
   theo cách đó** cho máy chủ nội bộ, vì dữ liệu không rời hạ tầng của Viện — `ETV.GAI 01` §3.7 cho
   phép mô hình nội bộ nhận tới mức Hạn chế. Nhưng **không được** chỉ nâng biến toàn cục lên
   `Noi-bo`: làm vậy nới cho **cả** nhà cung cấp ngoài. Hướng đúng là chuyển trần thành thuộc tính
   của `AIPlatform`. Cần quyết định trước khi làm.
2. **Chưa có thực thể quy tắc định tuyến** (`ETV.GAI 01` §3.6c) — chọn nền tảng vẫn gắn cứng ở
   `AIAgent.platformId`, chưa định tuyến theo loại tác vụ và mức phân loại dữ liệu, chưa có dự phòng
   theo chính sách §3.7.
3. **Chưa có màn hình tạo Provider** kèm chọn nền tảng — `createProvider()` đã nhận `platformId`
   nhưng giao diện danh mục hiện chỉ đọc.
