# VERIFY — 20260829-danh-muc-sap-xep-bang

Đo ngày 29/08/2026 trên nhánh `claude/m29-danh-muc-sap-xep-bang`.

## File đã sửa

| File | Thay đổi |
|---|---|
| `src/lib/m29/labels.ts` | Thêm `RISK_LEVEL_LABEL` + `RISK_LEVEL_TONE` (gỡ nhân bản hằng `RISK_LEVELS` vốn khai riêng ở 2 form) |
| `src/app/(platform)/modules/M29/registry/page.tsx` | Dựng lại: thứ tự mục, thanh mục lục, 5 bảng, hằng `TH`, hai hàm nhỏ `Badge`/`EmptyRow` |
| `NewPlatformForm.tsx` · `NewProviderForm.tsx` · `NewModelForm.tsx` · `NewToolForm.tsx` · `NewSkillForm.tsx` | `<summary>` đổi `text-ink` → `text-accent`; thống nhất nhãn `+ Đăng ký … mới` |
| `NewModelForm.tsx` | Thêm dòng gợi ý cho ô `outputRate` |

## Kết quả

| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| `npm test` | **PASS** | 24 file test · 480 test PASS, 913 ms |
| `npm run build` | **PASS** | Biên dịch xong toàn bộ route, không lỗi type |
| Lỗi biên dịch ở dev server | **PASS** | `grep -cE "Failed to compile\|Module not found\|Type error"` trên `.next/dev/logs/next-development.log` = **0** |
| Lỗi runtime ở dev server | **PASS** | Mọi dòng `level:"ERROR"` còn lại đều phát từ `chrome-extension://eppiocemhmnlbhjplcgkofciiegomcon` (tiện ích trình duyệt của máy người dùng), không phải từ mã ứng dụng |
| `python3 _meta/validate_links.py` | **PASS** | `564 link · 46 MP · 38 M · 22 CAP. Vấn đề: 0` |
| `python3 _meta/validate_citations.py --chan` | **PASS** | `854 trích dẫn · 48 thủ tục. Trích dẫn hỏng: 0 / 0` |
| AC-1…AC-5 (đối chiếu mắt trên giao diện) | **NOT RUN** | Trình duyệt xem trước không còn phiên đăng nhập; nhập mật khẩu để đăng nhập nằm ngoài phạm vi tác tử được phép. Người dùng tự đối chiếu trên phiên đang mở của mình trước khi commit. |

## Điều CHƯA verify — nói rõ

Năm tiêu chí chấp nhận AC-1…AC-5 là tiêu chí **thị giác**, chưa được đối chiếu bằng mắt trong phiên
này. Build PASS chỉ chứng minh mã hợp lệ về kiểu và biên dịch được — **không** chứng minh trang bày
đúng thứ tự, bảng đủ cột, hay liên kết neo cuộn đúng chỗ. Chờ người dùng xác nhận trên trình duyệt
đang đăng nhập rồi mới commit.
