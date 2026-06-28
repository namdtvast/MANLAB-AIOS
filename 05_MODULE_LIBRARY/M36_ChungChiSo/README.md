# M36_ChungChiSo — Quản lý chứng chỉ đo lường số (DMC)

> **DMC = Digital Metrology Certificate** — gồm **DCC** (hiệu chuẩn), **DVC** (kiểm định), **DTC** (thử nghiệm).
> Module số hóa quy trình **MP36** (Quản lý chứng chỉ số và truy xuất nguồn gốc), liên kết **MP11** (báo cáo kết quả) và **MP18** (quy tắc quyết định). Căn cứ: ISO/IEC 17025 §7.8.

## Đặc tả tổng quan

| Nội dung | Mô tả |
|---|---|
| **Mục tiêu module** | Quản lý trọn vòng đời chứng chỉ đo lường số: tạo lập → soát xét → phê duyệt → ký số → phát hành → tra cứu QR → thu hồi/thay thế, bảo đảm tính xác thực, toàn vẹn và truy xuất nguồn gốc. |
| **Đối tượng dữ liệu chính** | `Certificate` (DCC/DVC/DTC) |
| **Đối tượng liên kết** | Organization, Customer, Instrument, MeasurementResult, ReferenceStandard, Method, Signature, QRLookup, Version, AuditLog |
| **Vai trò** | Người lập · Người soát xét · Người phê duyệt/ký · Người phát hành · Khách hàng (tra cứu) · Quản trị · AI Agent (hỗ trợ, không phê duyệt) |
| **Trạng thái** | 12 trạng thái (xem `07_Workflow`) |
| **Đầu ra** | File chứng chỉ số (PDF + XML máy đọc), mã QR, trang tra cứu công khai, báo cáo thống kê |
| **Nhật ký** | Mọi thao tác ghi vết: ai · khi nào · nội dung · trạng thái trước→sau |

## Tài liệu chi tiết của module
- `01_Requirement/DacTa.md` — đặc tả yêu cầu, trường dữ liệu, quy tắc nghiệp vụ
- `02_API/API.md` — đặc tả API vòng đời chứng chỉ
- `03_Database/DataModel.md` — mô hình dữ liệu, thực thể, khóa
- `07_Workflow/StateMachine.md` — bảng trạng thái & điều kiện chuyển
- `05_Report/Outputs.md` — đầu ra & định dạng chứng chỉ số

## Nguyên tắc bất biến
1. Số chứng chỉ **duy nhất**; **không sửa sau phát hành** — chỉ tạo phiên bản hoặc chứng chỉ thay thế.
2. Chỉ chứng chỉ **Đã ký số / Đã phát hành** mới tra cứu công khai qua QR.
3. **AI không tự phê duyệt** chứng chỉ (ISO/IEC 42001) — chỉ hỗ trợ phát hiện bất thường/thiếu dữ liệu.
