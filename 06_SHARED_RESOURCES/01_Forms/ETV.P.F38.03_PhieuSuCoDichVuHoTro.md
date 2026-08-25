---
id: ETV.P.F38.03
title: "Phiếu sự cố dịch vụ số và nhật ký hỗ trợ người dùng"
type: Bieu-mau
process: MP38_DichVuSo
module: M38_DichVuSo
revision: "01"
effective_date: "25/08/2026"
status: Cho-soat-xet
knowledge_category: HTQL-noi-bo
permission: Noi-bo
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
related_documents: [ETV.P38, ETV.P12, ETV.P.F38.01, ETV.P.F38.02]
---
# PHIẾU SỰ CỐ DỊCH VỤ SỐ VÀ NHẬT KÝ HỖ TRỢ NGƯỜI DÙNG

|  |  |
| --- | --- |
| **Mã số** | ETV.P.F 38.03 |
| **Lần ban hành** | 01 |
| **Ngày ban hành** | 25/08/2026 |
| **Soát xét** | ..../..../.... |
| **Trang** | 1/2 |

LIÊN HIỆP CÁC HỘI KHOA HỌC VÀ KỸ THUẬT VIỆT NAM
VIỆN KIỂM ĐỊNH CÔNG NGHỆ VÀ MÔI TRƯỜNG

**Dịch vụ:** ..............................　**Mã:** ..............

---

## PHẦN A — PHIẾU SỰ CỐ DỊCH VỤ

**Số phiếu:** ..............　**Thời điểm phát sinh:** ..../..../........ giờ ..........　**Người phát hiện:** ..................

| Trường | Nội dung |
|---|---|
| Mô tả sự cố ở phía người dùng | |
| Số người dùng bị ảnh hưởng | |
| **Phân mức** *(§6.4.1)* | ☐ **Cao** — ngừng hoàn toàn · **hiển thị sai kết quả** · **lộ dữ liệu giữa các khách hàng**<br>☐ **Trung bình** — một chức năng chính không dùng được, chậm đáng kể<br>☐ **Thấp** — lỗi hiển thị nhỏ, không ảnh hưởng nội dung kết quả |
| Đã tạm ngừng chức năng liên quan | ☐ Có — thời điểm: ..........　☐ Không, lý do: .............. |

### A.1. Nghĩa vụ thông báo

| Đối tượng | Hạn theo mức | Thời điểm thực tế | Nội dung, kênh | Đã nêu **kênh thay thế** |
|---|---|---|---|---|
| Nội bộ — LĐV | Cao: **01 giờ** · TB: 04 giờ làm việc · Thấp: 01 ngày làm việc | | | — |
| Khách hàng, người dùng | Cao: **04 giờ** · TB: 01 ngày làm việc nếu chưa khắc phục | | | ☐ |
| Cơ quan có thẩm quyền *(nếu pháp luật yêu cầu)* | Theo quy định | | | — |

> **Hiển thị sai kết quả** hoặc **lộ dữ liệu khách hàng**: tạm ngừng chức năng **ngay**, chuyển ETV.P28 (lộ dữ liệu), chuyển ETV.P10/ETV.P11 (hiệu lực kết quả đã cung cấp), báo cáo LĐV — **không chờ khắc phục xong mới báo** (ETV.P38 §6.4.1).

### A.2. Định tuyến theo nguyên nhân *(§6.4.2)*

| Nguyên nhân | Có | Định tuyến | Số hồ sơ |
|---|---|---|---|
| Nền tảng vận hành lỗi | ☐ | **ETV.P35** | F35.03 số: ...... |
| Hạ tầng, mạng | ☐ | **ETV.P33** | F33.04 số: ...... |
| Sai lệch dữ liệu từ kết nối | ☐ | **ETV.P37** — tạm ngừng điểm tích hợp | F37.03 số: ...... |
| Sai nội dung kết quả, chứng chỉ | ☐ | **ETV.P11 · ETV.P36** | Số: ...... |
| Lộ lọt dữ liệu, truy cập trái phép | ☐ | **ETV.P28** — không đóng phiếu trước khi P28 kết luận | F28.03 số: ...... |
| Gián đoạn vượt ngưỡng kích hoạt kế hoạch liên tục | ☐ | **ETV.P31** | F31.04 số: ...... |
| Lặp ≥ **03 lần trong 90 ngày** | ☐ | **ETV.P13** — bắt buộc KPH | Số: ...... |

### A.3. Xử lý và đóng phiếu

**Nguyên nhân:** ..............................................................................................

**Biện pháp đã thực hiện:** ....................................................................................

| # | Điều kiện đóng phiếu | Kết quả |
|---|---|---|
| 1 | Dịch vụ đã trở lại hoạt động bình thường | ☐ |
| 2 | Kết luận của thủ tục được định tuyến (nếu có) | ☐ / Không áp dụng |
| 3 | Với kết quả đã cung cấp sai: đã thu hồi, đính chích theo ETV.P11 và thông báo khách hàng | ☐ / Không áp dụng |
| 4 | Kết luận về mở KPH (ETV.P13) | ☐ Không cần　☐ Có → số: ...... |

**Tổng thời gian gián đoạn:** ..........　**Ảnh hưởng tới mức sẵn sàng tháng:** ..........

| Người xử lý *(ĐMKT)* | Chủ sở hữu dịch vụ | QLCL xác nhận đóng |
| --- | --- | --- |
| | | |
| Ngày: ..../..../........ | Ngày: ..../..../........ | Ngày: ..../..../........ |

---

## PHẦN B — GIÁN ĐOẠN CÓ KẾ HOẠCH *(§6.4.3)*

| TT | Lý do | Thời gian dự kiến | Ngày thông báo *(trước tối thiểu 03 ngày làm việc)* | Kênh thay thế đã nêu | Phiếu thay đổi ETV.P30 | Thời gian thực tế |
|---|---|---|---|---|---|---|
| 1 | | | | ☐ | | |

---

## PHẦN C — NHẬT KÝ HỖ TRỢ NGƯỜI DÙNG

| TT | Ngày nhận | Người, tổ chức yêu cầu | Nội dung | Phân loại | Người xử lý | Ngày trả lời | Trong hạn cam kết | Kết quả |
|---|---|---|---|---|---|---|---|---|
| 1 | | | | ☐ Hỏi đáp ☐ Sự cố ☐ Góp ý ☐ **Khiếu nại** | | | ☐ Có ☐ Không | ☐ Đã đóng ☐ Chuyển tiếp |

> Nội dung mang tính **khiếu nại** → chuyển **ETV.P12 ngay khi nhận diện**, không xử lý riêng trong kênh số; thời điểm tiếp nhận tính từ khi khách hàng gửi trên kênh số (ETV.P38 §6.3.3). Số phiếu khiếu nại: ..............
> Góp ý cải tiến → đưa vào danh mục sáng kiến theo **ETV.P32**, mã sáng kiến: ..............
> Nhân sự hỗ trợ **không** tự diễn giải nội dung kỹ thuật của kết quả — chuyển người có thẩm quyền theo ETV.P11.

---

> Phiếu sự cố lưu **05 năm sau khi đóng**; nhật ký hỗ trợ lưu **03 năm** theo ETV.P15.
