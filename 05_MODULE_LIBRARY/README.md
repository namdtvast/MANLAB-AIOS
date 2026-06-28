# 05 — MODULE LIBRARY ⭐ (Phần mềm số hóa)

**Ý nghĩa:** 38 module M01–M38, mỗi module số hóa một quy trình MP cùng số (1–1).

**Cấu trúc mỗi `Mxx_Slug/`:** `README.md` + 9 thư mục con đánh số:

| Thư mục con | Lưu gì |
|---|---|
| `01_Requirement` | Đặc tả yêu cầu, đối tượng dữ liệu, bảng trạng thái, quy tắc nghiệp vụ |
| `02_API` | Đặc tả API (OpenAPI/Swagger), hợp đồng dữ liệu |
| `03_Database` | Lược đồ CSDL, ERD, migration |
| `04_UI` | Wireframe, mockup, thiết kế màn hình |
| `05_Report` | Mẫu báo cáo/biểu mẫu đầu ra |
| `06_Dashboard` | Thiết kế bảng theo dõi, KPI |
| `07_Workflow` | BPMN, sơ đồ trạng thái, luồng phê duyệt |
| `08_Source` | Mã nguồn hoặc link repo code (09) |
| `09_Release` | Ghi chú phát hành, phiên bản, changelog |

**KHÔNG lưu:** dữ liệu nghiệp vụ thật (→CSDL/ManLab); secrets/mật khẩu.
**Lưu ý:** `Mxx` số hóa `MPxx` cùng số. 9 thư mục con là chuẩn nên không cần README riêng từng cái.
