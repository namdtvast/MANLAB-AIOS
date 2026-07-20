# M14 — Đặc tả yêu cầu

## 1. Phạm vi
Số hóa vòng đời kiểm soát văn bản theo `ETV.P14` — tài liệu HTQL, văn bản hành chính, văn bản bên ngoài — từ Đề xuất đến Hủy bỏ/Lưu trữ. **Không** bao gồm hợp đồng (do P03/P07 và module tương ứng quản lý).

## 2. Trường dữ liệu bắt buộc

Định nghĩa gốc và duy nhất của metadata nằm tại `ETV.P14` §7 — bảng dưới đây chỉ ánh xạ sang tên trường trong hệ thống, **không định nghĩa lại ý nghĩa**.

| Nhóm | Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|---|
| Định danh | `id` | string, UNIQUE | ✓ | theo quy tắc mã hoá `ETV.P14` §6.2 |
| | `title` | string | ✓ | |
| | `type` | enum | ✓ | Sổ tay/Thủ tục/Quy trình/Hướng dẫn/Biểu mẫu/Quyết định/Công văn/Thông báo/Biên bản/Báo cáo/Giấy chứng nhận/Văn bản bên ngoài |
| Chủ sở hữu | `owner`, `department`, `process` (← MPxx), `capability` (← CAPxx) | string/ref | ✓ | |
| Kiểm soát | `revision`, `status`, `effective_date` | string/enum/date | ✓ | `status` dùng đúng bảng `07_Workflow/StateMachine.md` |
| Tìm kiếm/AI | `keywords[]`, `related_documents[]`, `ai_tags[]`, `embeddings` | string[]/vector | tuỳ | `embeddings` hệ thống tự sinh, không nhập tay |
| Tuân thủ | `iso_clause[]`, `legal_basis[]` | string[] | ✓ với văn bản HTQL | |
| Kiểm soát truy cập | `knowledge_category`, `permission` | enum/ref | ✓ | `permission` trỏ nhóm quyền định nghĩa tại `ETV.P.F 14.06`, không lặp bảng |
| Vòng đời | `retention`, `digital_signature`, `source`, `supersedes`, `superseded_by` | string/ref | ✓ (`retention`, `source`) | `retention` trỏ `ETV.P.F 14.06` |

## 3. Quy tắc nghiệp vụ

1. `id` duy nhất toàn hệ thống, sinh theo quy tắc mã hoá — không cho tạo thủ công trùng mẫu.
2. Không cho chuyển `Nháp → Chờ soát xét` nếu thiếu trường bắt buộc theo `type` (bảng trên).
3. **Không soát xét** / **Không phê duyệt** bắt buộc nhập `reason` (áp dụng state machine chuẩn, không riêng cho M14).
4. Văn bản `type ∈ {Sổ tay, Thủ tục}` bắt buộc người phê duyệt = tài khoản nhóm **LĐV**, không ủy quyền (theo RACI `ETV.P14` §5).
5. Khi `status → Hết hiệu lực/Hủy`, bắt buộc chọn `Thanh lý` hoặc `Hủy bỏ` (khác hành vi — `ETV.P14` §15) và bắt buộc `reason`.
6. Khi tạo văn bản mới có `supersedes`, hệ thống tự động cập nhật `superseded_by` của văn bản cũ — không sửa tay hai chiều.
7. AI Agent (← M29, qua Skill `etv-document-governance`) chỉ được: gợi ý `id`, gợi ý `iso_clause`/`legal_basis`, cảnh báo trùng phạm vi, cảnh báo sắp hết hạn soát xét (`effective_date` + 36 tháng). **Không** được tự đổi `status`.

## 4. Vai trò
Người lập · Người soát xét (LĐP) · Người phê duyệt (LĐV) · Văn thư/QLCL (cấp mã, phân phối, lưu trữ) — chi tiết RACI: `ETV.P14` §5.

## 5. Liên kết
Quy trình: MP14 · Năng lực: CAP-14 · Căn cứ: ISO/IEC 17025 §8.3, ISO 9001 §7.5, ISO 17034 §8.3 (có điều kiện), ISO/IEC 27001, ISO/IEC 42001 §7.5 · Thủ tục nguồn: `03_MANAGEMENT_SYSTEM/03_ISO17025/procedures/ETV.P14_KiemSoatTaiLieu.md` · Skill AI: `07_AI_OPERATING_SYSTEM/01_Skills/S14_KiemSoatTaiLieu`.
