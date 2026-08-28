# VERIFY — 20260828-man-hinh-ranh-gioi-du-lieu

Chạy 28/08/2026 trên bản build production trong worktree (cổng 54801) + Postgres `aios_platform_dev`,
đăng nhập `ai-secadmin@manlab.vn` (AI_SECURITY_ADMIN — đúng vai trò được phép, không dùng SUPER_ADMIN
để khỏi che mất lỗi phân quyền).

| # | Việc kiểm | Kết quả |
|---|---|---|
| 1 | `npm test` | 472 ca PASS (không thêm ca mới: quy tắc ranh giới đã có 10 ca sẵn ở `copilot-ranh-gioi.test.ts`, thay đổi này chỉ nối giao diện) |
| 2 | `npm run build` | Xong |
| 3 | Cột mới trên trang Danh mục | `MÃ ‖ TÊN ‖ ADAPTER ‖ BIẾN KHOÁ API ‖ RANH GIỚI DỮ LIỆU ‖ TRẠNG THÁI` |
| 4 | Nội dung ô, vai trò AI_SECURITY_ADMIN | `Ra ngoài, không cam kết / Copilot đọc tới mức Công khai / [Đặt ranh giới]` |
| 5 | Cột "Thao tác" (phê duyệt nền tảng) | **Không hiện** với vai trò này — đúng: `platforms:write` chỉ SUPER_ADMIN có |
| 6 | Đổi `MANLAB_AI_Q3` sang "Không rời hạ tầng Viện" | DB: `dataBoundary = NO_EXTERNAL_TRANSFER`, `dataBoundaryRef = null`; `AIAuditLog` ghi `field=dataBoundary`, lý do "Đặt ranh giới dữ liệu theo ETV.P29 §5.5" |

## Bố cục trang Danh mục

Thêm cột làm trang rộng kịch khung và lệch hẳn so với các trang module khác. Thống kê bề rộng
khung trong `src/app/(platform)/modules/**/page.tsx`: **`max-w-4xl` là chuẩn phổ biến nhất
(18 trang)**, trang Danh mục M29 đang `max-w-5xl`.

Sửa cho khớp, và giảm số cột thay vì ép cuộn ngang:

| | Trước | Sau |
|---|---|---|
| Khung trang | `max-w-5xl` (1024px) | `max-w-4xl` (896px) — bằng 18 trang khác |
| Cột bảng Platform | 7 (Mã, Tên, Adapter, Biến khoá, Ranh giới, Trạng thái, Thao tác) | 5 — adapter xuống dòng phụ dưới mã; nút vòng đời nằm cùng ô với huy hiệu trạng thái |
| `min-w` bảng | `64rem` | `52rem` |

Đo lại ở viewport 1440: khung 896px, bảng 894px — **không cuộn ngang**, `document.scrollWidth`
bằng đúng viewport. Kiểm ở cả hai vai trò: AI_SECURITY_ADMIN (không có nút vòng đời) và
SUPER_ADMIN (có đủ nút).

## Phép đo trước/sau — đây là lý do thay đổi này tồn tại

`npm run danh-gia-copilot -- --chi-truy-hoi` trên bộ 20 câu hỏi vàng, Copilot trỏ `MANLAB_AI_Q3`:

| | Truy hồi lấy đúng nguồn | Tài liệu riêng biệt trung bình |
|---|---|---|
| Trước (`EXTERNAL_NO_COMMITMENT`, trần Công khai) | **0/20 = 0,0%** | 2,00 (cùng 2 tài liệu cho mọi câu hỏi) |
| Sau (`NO_EXTERNAL_TRANSFER`, trần Nội bộ) | **19/20 = 95,0%** | 4,65 |

Không đụng tới chỉ mục, truy hồi hay model — chỉ đặt đúng một trường.

**Kết luận đính chính:** lượt hỏi bị `GR-NO-SOURCE` chặn ghi ở
`_work/20260828-khoa-api-theo-nen-tang/verify.md` (mục 13) **không** phải dấu hiệu model
`manlab-ai` kém, mà là hệ quả của ranh giới dữ liệu ở mức siết nhất. Chất lượng model vẫn **chưa
đo**: phải chạy `npm run danh-gia-copilot` (chế độ đầy đủ, gọi model thật) rồi kết luận Đạt/Không
đạt trên phiếu F29.03 theo ETV.P29 §4.8 — việc của người, không của phần mềm.

**Còn 1/20 câu trượt truy hồi** — chưa truy nguyên, thuộc phạm vi tinh chỉnh truy hồi/chỉ mục.
