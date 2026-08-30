# 05_R — Record

Hồ sơ, minh chứng, dữ liệu phát sinh từ việc thực hiện các quy trình (kết quả đánh giá, hồ sơ hoàn thành, v.v.). Biểu mẫu **đã điền** thuộc về đây, không phải `04_F`.

**Ghi chú:** Phần lớn hồ sơ vận hành lưu trên ManLab hoặc hệ thống CSDL, không lưu tại đây. Repo chỉ giữ hồ sơ kiểm soát tài liệu cần đi kèm văn bản đã ban hành để truy vết.

## Quy ước thư mục

Gom theo **số thủ tục** sinh ra hồ sơ, tên `F{số thủ tục}_{Slug}` — cùng quy ước với `06_SHARED_RESOURCES/01_Forms/`.

| Thư mục | Nội dung |
|---|---|
| [`F14_TaiLieu/`](F14_TaiLieu/) | Phiếu `ETV.P.F14.01` đề nghị soát xét/ban hành văn bản đã điền và đã ký, theo [`ETV.P14`](../02_P/ETV.P14_KiemSoatTaiLieu.md) |

## Mức bảo mật

Toàn bộ `05_R/` nằm trong danh sách **BLOCKED** của chỉ mục Copilot M29 (`nap-chi-muc-copilot.ts`, lý do: "Hồ sơ đã điền — Hạn chế/Mật theo ETV.P02 §4.1"). Hồ sơ đặt vào đây sẽ **không** được Copilot trích dẫn, kể cả khi khai `permission: Noi-bo`. Muốn đổi điều đó phải sửa bảng lớp tài liệu — đó là quyết định quản trị (PT.ATTT + LĐV duyệt), không phải tinh chỉnh kỹ thuật.
