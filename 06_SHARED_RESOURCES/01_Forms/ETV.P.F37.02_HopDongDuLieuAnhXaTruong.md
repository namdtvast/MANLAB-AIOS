---
id: ETV.P.F37.02
title: "Hợp đồng dữ liệu, ánh xạ trường và biên bản kiểm thử"
type: Bieu-mau
process: MP37_TichHopDuLieu
module: M37_TichHopDuLieu
revision: "01"
effective_date: ""
status: Cho-soat-xet
knowledge_category: HTQL-noi-bo
permission: Noi-bo
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
related_documents: [ETV.P37, ETV.P34, ETV.P.F37.01, ETV.P.F37.03]
---
# HỢP ĐỒNG DỮ LIỆU, ÁNH XẠ TRƯỜNG VÀ BIÊN BẢN KIỂM THỬ

|  |  |
| --- | --- |
| **Mã số** | ETV.P.F 37.02 |
| **Lần ban hành** | 01 |
| **Ngày ban hành** | ..../..../........ |
| **Soát xét** | ..../..../.... |
| **Trang** | 1/3 |

LIÊN HIỆP CÁC HỘI KHOA HỌC VÀ KỸ THUẬT VIỆT NAM
VIỆN KIỂM ĐỊNH CÔNG NGHỆ VÀ MÔI TRƯỜNG

**Điểm tích hợp:** TH-....-....　**Phiên bản hợp đồng:** ..........　**Ngày hiệu lực:** ..../..../........

---

## PHẦN A — HỢP ĐỒNG DỮ LIỆU

| Nhóm | Nội dung |
|---|---|
| Bên gửi — đầu mối | |
| Bên nhận — đầu mối | |
| Phạm vi bản ghi được truyền | |
| Điều kiện lọc | |
| **Dữ liệu KHÔNG được truyền** | |
| Khoá định danh bản ghi *(dùng để đối chiếu, tránh trùng)* | |
| Lịch chạy | |
| Khối lượng bình thường — ngưỡng bất thường | |

### A.1. Cam kết chất lượng *(theo chiều chất lượng của ETV.P34 §6.4)*

| Chỉ số | Cam kết | Cách đo |
|---|---|---|
| Độ trễ tối đa chấp nhận được | | |
| Tỷ lệ lỗi tối đa | | |
| Tỷ lệ bản ghi đầy đủ trường bắt buộc | | |

### A.2. Trách nhiệm khi dữ liệu sai

| Tình huống | Bên chịu trách nhiệm | Hành động | Thời hạn |
|---|---|---|---|
| Dữ liệu nguồn sai | | Sửa tại nguồn và truyền lại | |
| Truyền thất bại, thiếu bản ghi | | | |
| Bản ghi không hợp lệ tại đầu nhận | | ☐ Từ chối ☐ Đưa vào hàng đợi lỗi ☐ Cảnh báo | |

---

## PHẦN B — ÁNH XẠ TRƯỜNG DỮ LIỆU

> Phải **nhất quán với từ điển dữ liệu** của tập dữ liệu tương ứng tại ETV.P34 §6.1.2. Nếu lệch, sửa một trong hai **trước khi mở kết nối** — không để hai định nghĩa cùng tồn tại (ETV.P37 §6.2.1).

| TT | Trường nguồn | Trường đích | Kiểu | **Đơn vị đo** | Định dạng | **Quy tắc chuyển đổi, làm tròn** | Bắt buộc | Miền giá trị hợp lệ | Giá trị mặc định |
|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | ☐ | | |
| 2 | | | | | | | ☐ | | |

> **Cấm tuyệt đối** chuyển đổi đơn vị, làm tròn hoặc suy diễn giá trị **ngầm, không khai báo** ở bảng này (ETV.P37 §6.2.2).

---

## PHẦN C — BIÊN BẢN KIỂM THỬ TRƯỚC KHI MỞ KẾT NỐI

**Môi trường kiểm thử:** ..............................　*(bắt buộc tách khỏi môi trường vận hành)*　**Ngày kiểm thử:** ..../..../........

| TT | Nội dung kiểm thử | Bộ dữ liệu mẫu | Kết quả kỳ vọng | Kết quả thực tế | Đánh giá |
|---|---|---|---|---|---|
| 1 | Truyền đủ số bản ghi | | | | ☐ Đạt ☐ Không |
| 2 | Ánh xạ trường đúng | | | | ☐ Đạt ☐ Không |
| 3 | **Chuyển đổi đơn vị, làm tròn** đúng khai báo | | | | ☐ Đạt ☐ Không |
| 4 | Bản ghi không hợp lệ được xử lý đúng quy tắc | | | | ☐ Đạt ☐ Không |
| 5 | Không trùng, không mất bản ghi khi chạy lại | | | | ☐ Đạt ☐ Không |
| 6 | Xác thực và mã hoá đường truyền hoạt động | | | | ☐ Đạt ☐ Không |

**Riêng kết nối tới thiết bị đo *(ETV.P37 §6.6)*:**

| Nội dung | Kết quả |
|---|---|
| Đối chiếu dữ liệu truyền tự động với **giá trị đọc trực tiếp trên thiết bị** (bộ mẫu đại diện) | ☐ Khớp ☐ Lệch: .......... |
| Phiếu thay đổi ETV.P30 | CR-.......-....... |
| **Đánh giá ảnh hưởng hiệu lực kết quả đo (ETV.P10)** | Số: ..............　Kết luận: ☐ Cho phép ☐ Không |
| Giá trị gốc được giữ nguyên, không bị ghi đè | ☐ |

**Kết luận kiểm thử:** ☐ Đạt — đủ điều kiện trình phê duyệt mở kết nối　☐ Không đạt, lý do: ..............

---

## PHẦN D — LỊCH SỬ PHIÊN BẢN HỢP ĐỒNG

| Phiên bản | Ngày hiệu lực | Nội dung thay đổi | **Phá vỡ tương thích** | Đã thông báo đầu còn lại | Phiếu thay đổi (ETV.P30) | Người phê duyệt |
|---|---|---|---|---|---|---|
| 01 | | Thoả thuận lần đầu | ☐ Có ☐ Không | ☐ | | |

> Thay đổi **phá vỡ tương thích** (bỏ trường, đổi kiểu, **đổi đơn vị đo**, đổi ý nghĩa, đổi khoá định danh) bắt buộc: kiểm thử lại · phiếu thay đổi ETV.P30 · thông báo trước cho đầu còn lại · có phương án quay lui · **LĐV phê duyệt** với điểm tích hợp Mức 3.

---

| Đầu mối kỹ thuật | Chủ sở hữu dữ liệu (ETV.P34) | Chủ sở hữu điểm tích hợp | Đầu mối phía đối tác |
| --- | --- | --- | --- |
| | | | |
| Ngày: ..../..../...... | Ngày: ..../..../...... | Ngày: ..../..../...... | Ngày: ..../..../...... |

> Hợp đồng dữ liệu và mọi phiên bản lưu **suốt vòng đời điểm tích hợp + 05 năm** theo ETV.P15.
