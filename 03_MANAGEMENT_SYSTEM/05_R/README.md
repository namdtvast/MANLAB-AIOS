# 05_R — Record

Hồ sơ, minh chứng, dữ liệu phát sinh từ việc thực hiện các quy trình (kết quả đánh giá, hồ sơ hoàn thành, v.v.). Biểu mẫu **đã điền** thuộc về đây, không phải `04_F`.

**Ghi chú:** Phần lớn hồ sơ vận hành lưu trên ManLab hoặc hệ thống CSDL, không lưu tại đây. Repo chỉ giữ hồ sơ kiểm soát tài liệu cần đi kèm văn bản đã ban hành để truy vết.

## Quy ước thư mục

Gom theo **số thủ tục** sinh ra hồ sơ, tên `F{số thủ tục}_{Slug}` — cùng quy ước với `06_SHARED_RESOURCES/01_Forms/`.

| Thư mục | Nội dung |
|---|---|
| [`F14_TaiLieu/`](F14_TaiLieu/) | Phiếu `ETV.P.F14.01` đề nghị soát xét/ban hành văn bản đã điền và đã ký, theo [`ETV.P14`](../02_P/ETV.P14_KiemSoatTaiLieu.md) |

## Mức bảo mật

Toàn bộ `05_R/` nằm trong danh sách **BLOCKED** của chỉ mục Copilot M29 (`nap-chi-muc-copilot.ts`, lý do: "Hồ sơ đã điền — chưa có bản ghi F27.01 gán mức theo từng lớp (ETV.P27 §6.1.3, §6.2)"). Hồ sơ đặt vào đây sẽ **không** được Copilot trích dẫn, kể cả khi khai `permission: Noi-bo`. Muốn đổi điều đó phải sửa bảng lớp tài liệu — đó là quyết định quản trị (PT.ATTT + LĐV duyệt), không phải tinh chỉnh kỹ thuật.

Chặn cả thư mục là **fail-closed có chủ đích, không phải kết luận về mức của từng lớp bên trong**. [`ETV.P27 §6.1.3`](../02_P/ETV.P27_QuanTriDuLieuTaiSanTT.md) đặt nhóm "dữ liệu hệ thống quản lý — tài liệu, hồ sơ ISO, đánh giá nội bộ" ở mức **tối thiểu Nội bộ**; nhưng `05_R/` sẽ nhận hồ sơ của mọi thủ tục về sau — nhân sự và hợp đồng tối thiểu Mật, kết quả đo tối thiểu Hạn chế — trong khi chưa lớp nào có bản ghi `ETV.P.F27.01` gán mức. Đề xuất mở riêng lớp `F14_TaiLieu` đang trình: [`_work/20260831-lop-ho-so-kiem-soat-tai-lieu/de-xuat.md`](../../05_MODULE_LIBRARY/M29_AI/01_Requirement/_work/20260831-lop-ho-so-kiem-soat-tai-lieu/de-xuat.md).

> **Ghi chú sửa 31/08/2026.** Lý do chặn trước đây ghi "Hạn chế/Mật theo ETV.P02 §4.1" — dẫn sai điều khoản: `ETV.P02 §4.1` là bảng thuật ngữ chia nhị phân *bảo mật/công khai*, không dựng thang 4 mức, mà mức Nội bộ cũng đã là không công khai. Thang 4 mức thuộc `ETV.P27 §6.2`. Sửa trích dẫn **không đổi hành vi**: `05_R/` vẫn bị chặn nguyên như trước.
