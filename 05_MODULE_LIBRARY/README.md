# 05 — MODULE LIBRARY ⭐ (Phần mềm số hóa)

**Ý nghĩa:** 38 module phần mềm M01–M38, mỗi module số hóa một quy trình MPxx tương ứng (quan hệ 1–1).

**Cấu trúc mỗi `Mxx/`:** một `README.md` (đặc tả module) + 9 thư mục con chuẩn:

| Thư mục con | Lưu gì |
|---|---|
| `Requirement` | Đặc tả yêu cầu, user story, đối tượng dữ liệu, bảng trạng thái, quy tắc nghiệp vụ. |
| `API` | Đặc tả API (OpenAPI/Swagger), hợp đồng dữ liệu giữa các hệ thống. |
| `Database` | Lược đồ CSDL, ERD, script migration, từ điển dữ liệu. |
| `UI` | Wireframe, mockup, thiết kế màn hình, luồng thao tác người dùng. |
| `Report` | Mẫu báo cáo/biểu mẫu đầu ra do module sinh ra. |
| `Dashboard` | Thiết kế bảng theo dõi, biểu đồ KPI của module. |
| `Workflow` | BPMN, sơ đồ trạng thái, luồng soát xét – phê duyệt. |
| `Source` | Mã nguồn module hoặc liên kết tới repo code ở tầng 09. |
| `Release` | Ghi chú phát hành, số phiên bản, changelog, hướng dẫn nâng cấp. |

**KHÔNG lưu ở đây:**
- Dữ liệu nghiệp vụ thật (khách hàng, kết quả đo) — đó là dữ liệu vận hành trong CSDL/ManLab
- Mật khẩu, khóa API, secrets — dùng kho bí mật riêng

**Lưu ý:** `Mxx` luôn số hóa `MPxx` cùng số. 9 thư mục con là chuẩn hóa cho mọi module nên không cần README riêng từng cái.
