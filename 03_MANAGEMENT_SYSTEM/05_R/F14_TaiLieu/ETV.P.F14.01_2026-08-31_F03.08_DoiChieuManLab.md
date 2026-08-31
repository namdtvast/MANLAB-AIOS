---
id: ETV.P.F14.01
title: "Phiếu đề nghị soát xét ETV.P.F 03.08 — đối chiếu cấu trúc cột với danh sách nhân sự đang vận hành trên ManLab"
type: Bieu-mau
process: MP14_TaiLieu
module: M14_TaiLieu
revision: "01"
effective_date: "31/08/2026"
status: Nhap
knowledge_category: HTQL-noi-bo
permission: Noi-bo
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
related_documents: [ETV.P14, ETV.P03, "ETV.P.F03.08", "ETV.P.F03.09", "ETV.P.F03.13"]
---

# PHIẾU ĐỀ NGHỊ SOÁT XÉT, SỬA ĐỔI, BAN HÀNH VĂN BẢN

Bản điền theo `ETV.P.F 14.01` (ETV.P14 §6.6.1 bước 1–2).

| Trường | Nội dung |
|---|---|
| Mã văn bản đề nghị | **ETV.P.F 03.08** — Danh sách nhân sự |
| Loại văn bản | ☒ Biểu mẫu |
| Loại đề nghị | ☒ Soát xét/sửa đổi |
| Người đề nghị / biên soạn | Dương Thành Nam |
| Ngày đề nghị | 31/08/2026 |
| Hiện trạng văn bản | Lần ban hành **03**, hiệu lực **20/07/2026**, `status: Da-phe-duyet` |
| Đề nghị | **Soát xét, giữ nguyên lần ban hành 03**, ghi ngày soát xét 31/08/2026 |

> **Không tăng lần ban hành.** ETV.P14 §6.4 quy định: *"Khi chỉ biểu mẫu được soát xét mà thủ tục/hướng dẫn chưa ban hành lại, footer biểu mẫu chỉ ghi ngày soát xét (không tăng lần ban hành của thủ tục)."* ETV.P03 vẫn ở lần ban hành 03 và không thay đổi, nên biểu mẫu này giữ 03.

---

## 1. LÝ DO ĐỀ NGHỊ

**Chính biểu mẫu đang yêu cầu việc này.** Ghi chú trong frontmatter `ETV.P.F 03.08` viết:

> *"Đây là biểu mẫu dựng mới lần đầu — cần LĐP/Văn phòng đối chiếu với cấu trúc file Excel danh sách nhân sự đang dùng thực tế trên ManLab (nếu khác cấu trúc dưới đây thì điều chỉnh lại theo thực tế đang vận hành, không thay thế ngược)."*

Lý do ghi chú đó tồn tại: khi dựng biểu mẫu, các file Excel danh sách nhân sự trong hồ sơ Dropbox đều 0 byte (Dropbox online-only) nên **không đọc được**; 11 cột hiện có được suy ra từ các thời điểm ETV.P03 yêu cầu cập nhật danh sách (mục 6.1, 6.5, 6.7, 6.8), không phải từ thực tế vận hành.

**Nay đã đối chiếu được.** Ngày 31/08/2026 có bản kết xuất `vw_tb_qlManLab_NhanSu` — **145 bản ghi, 53 cột** — là chính danh sách nhân sự đang chạy trên ManLab. *(Lưu ý: 145 là số **bản ghi**, không phải số người — xem mục 3(b).)* Đối chiếu cho thấy biểu mẫu **thiếu 5 cột** mà thủ tục ETV.P03 đang cần, và **sai một trường**.

**Bản kết xuất không được đưa vào repo và không đính kèm phiếu này.** 53 cột gồm số CCCD, mã số thuế TNCN, mã số BHXH, số tài khoản, mức lương, chỗ ở, biển số xe, số điện thoại người thân — dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP, trong khi repo công khai trên GitHub. Bản gốc giữ tại hồ sơ nhân sự có phân quyền; phiếu này chỉ trích **tên cột và tập giá trị mã hoá**.

---

## 2. PHẠM VI THAY ĐỔI ĐỀ NGHỊ

Phạm vi tối thiểu: chỉ bảng cột và ghi chú. Không đụng tới mục đích, phạm vi hay ô ký của biểu mẫu.

### Thay đổi 1 — Bổ sung 5 cột đang thiếu

| Cột đề nghị thêm | Vì sao cần |
|---|---|
| **Mã nhân sự** | Khoá định danh dùng xuyên hồ sơ; cấu trúc `<Mã bộ phận><STT>` (`P. ĐL46`). Biểu mẫu hiện ghi `Mã NV` nhưng không nêu quy tắc |
| **Đơn vị công tác** | 80/145 nhân sự thuộc pháp nhân ngoài ETV (chuyên gia, cộng tác viên, công ty liên kết). Danh sách không phân biệt được thì không dùng để chứng minh nhân lực của Viện trước đoàn đánh giá |
| **Nhóm nhân sự** | ETV / Chuyên gia–CTV / Thử việc / Hưu trí |
| **Lĩnh vực kiểm định** | Cái quyết định một người được ký kết quả nào; đầu vào của MP08, MP10, MP21 |
| **Số thẻ KĐV, ngày hết hạn** | Thẻ hết hạn là điều kiện **chặn** ký kết quả kiểm định |

### Thay đổi 2 — Sửa một trường sai bản chất

| | Nội dung |
|---|---|
| **Trước** | Cột `Trạng thái` với ba lựa chọn: ☐ Thử việc ☐ Chính thức ☐ Đã nghỉ |
| **Sau** | Tách hai cột: **Trạng thái lao động** (Thử việc / Chính thức / Đã nghỉ) và **Trạng thái duyệt** (Nháp / Chờ duyệt / Đã duyệt / Không duyệt) |

Trên ManLab hai trục này đang bị gộp vào một cột, hệ quả là người đã nghỉ việc không biểu diễn được là bản ghi đã duyệt hay chưa. Biểu mẫu không nên tái tạo lỗi đó.

### Thay đổi 3 — Ghi rõ những cột **không** đưa vào biểu mẫu

Biểu mẫu này là **danh sách**, không phải sơ yếu lý lịch. Đề nghị ghi thẳng vào ghi chú rằng số CCCD, mã số thuế, mã số BHXH, số tài khoản, mức lương, chỗ ở, biển số xe **không** thuộc biểu mẫu này — chúng đã nằm ở `ETV.P.F 03.01` (Sơ yếu lý lịch) và `ETV.P.F 03.09` (HĐLĐ), và mỗi lần nhân bản là thêm một bản sao dữ liệu cá nhân phải bảo vệ.

Không có câu này thì lần sau ai đó lại "bổ sung cho đủ cột như trên ManLab".

### Thay đổi 4 — Cập nhật ghi chú frontmatter

Gỡ câu *"cần LĐP/Văn phòng đối chiếu…"* (đã đối chiếu xong), thay bằng ghi nhận đã đối chiếu ngày 31/08/2026 với bản kết xuất 145 bản ghi, và thêm `review_date: "31/08/2026"`.

**Bản dự thảo đầy đủ:** [`_ETV.P.F03.08_DanhSachNhanSu_soatxet_duthao.md`](../../../06_SHARED_RESOURCES/01_Forms/F03_NhanSu/_ETV.P.F03.08_DanhSachNhanSu_soatxet_duthao.md) — `status: Nhap`. Bản đã ban hành **chưa bị sửa**; hợp nhất và xoá bản dự thảo sau khi LĐV phê duyệt.

---

## 3. HAI ĐIỂM ĐỀ NGHỊ LĐP/LĐV LƯU Ý

**(a) Biểu mẫu này mô tả cái đang có hay cái nên có?** 53 cột trên ManLab chứa vài trường bản thân đã sai bản chất (trạng thái trộn vào loại hợp đồng, trạng thái ghi đè bộ phận). Dự thảo chọn **sửa theo cái nên có** ở hai chỗ (Thay đổi 2 và 3) thay vì chép nguyên trạng — điều này khiến biểu mẫu **lệch với phần mềm** cho tới khi ManLab được sửa. Nếu LĐP muốn biểu mẫu khớp phần mềm ngay, bỏ Thay đổi 2, giữ nguyên một cột Trạng thái.

Khuyến nghị của người soạn: **giữ Thay đổi 2**. Biểu mẫu là chuẩn mực, phần mềm là hiện trạng; chép hiện trạng vào chuẩn mực thì mất luôn căn cứ để sửa phần mềm.

**(b) Phiếu này không đề nghị sửa dữ liệu trên ManLab.** Các lỗi dữ liệu phát hiện khi đối chiếu (30 bản ghi bị ghi đè bộ phận thành `CDHĐ`; 3 bản ghi trong cột họ tên không phải người — `ETV`, `Admin` và tên pháp nhân của Viện; 2 bản ghi họ tên chỉ có một từ; 1 bản ghi ghi lĩnh vực là "Kế toán Nội bộ"; "Đã nghĩ việc" sai chính tả; 4 cột rỗng hoàn toàn trong view) đã ghi lại tại [`M03_NhanSu/03_Database/DataModel.md`](../../../05_MODULE_LIBRARY/M03_NhanSu/03_Database/DataModel.md) §4 để Văn phòng/IT xử lý riêng. Sửa dữ liệu vận hành không thuộc phạm vi ETV.P14.

---

## 4. Ý KIẾN LĐP (thẩm định sự cần thiết — ETV.P14 §6.6.1 bước 2)

☐ Không cần thiết — lý do: .....................

☐ Cần thiết — phân công:

| Vai trò | Người được phân công | Thời hạn hoàn thành |
|---|---|---|
| Người biên soạn | | |
| Người soát xét | | |

Chữ ký LĐP: ..................... Ngày: .....................

## 5. KẾT QUẢ SOÁT XÉT (LĐP — bước 4)

☐ Đạt → chuyển `Chờ phê duyệt` · ☐ Không đạt → **Không soát xét** (bắt buộc lý do): .....................

Ý kiến về mục 3(a) — biểu mẫu mô tả cái đang có hay cái nên có: .....................

Người soát xét: ..................... · Ngày: .....................

## 6. KẾT QUẢ PHÊ DUYỆT (LĐV — bước 5)

☐ Phê duyệt · ☐ Không phê duyệt (bắt buộc lý do): .....................

Người phê duyệt: ..................... · Ngày phê duyệt: .....................

Ngày soát xét ghi trên biểu mẫu: ..................... · Lần ban hành: **giữ 03**

---

*Bản dự thảo do AI hỗ trợ soạn. Theo ETV.P29 §1.3 nguyên tắc 1 ("Con người quyết định cuối cùng") và ETV.P14 §6.9, AI chỉ đề xuất và kiểm tra — không soát xét, không phê duyệt, không tự cấp mã số, không tự chuyển trạng thái văn bản.*
