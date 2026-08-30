---
id: ETV.P.F33.03
title: "Danh mục tài khoản hệ thống"
type: Bieu-mau
process: MP33_HeThongTT
module: M33_HeThongTT
revision: "01"
effective_date: ""
status: Cho-soat-xet
knowledge_category: HTQL-noi-bo
permission: Noi-bo
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
related_documents: [ETV.P33, ETV.P28, ETV.P.F33.01, ETV.P.F33.04]
---
# DANH MỤC TÀI KHOẢN HỆ THỐNG

|  |  |
| --- | --- |
| **Mã số** | ETV.P.F 33.03 |
| **Lần ban hành** | 01 |
| **Ngày ban hành** | ..../..../........ |
| **Soát xét** | ..../..../.... |
| **Trang** | 1/2 |

LIÊN HIỆP CÁC HỘI KHOA HỌC VÀ KỸ THUẬT VIỆT NAM
VIỆN KIỂM ĐỊNH CÔNG NGHỆ VÀ MÔI TRƯỜNG

**Kỳ theo dõi:** ..........　**Người lập:** *(QTHT)* ..................

> **Nguyên tắc:** Việc **phê duyệt** quyền truy cập thuộc `ETV.P28` (phiếu **F28.04**). Biểu mẫu này ghi **tài khoản thực tế tồn tại** trên từng hệ thống và bảo đảm mỗi tài khoản truy được về một phiếu đã phê duyệt (ETV.P33 §6.4). QTHT là **người thực hiện**, không phải người phê duyệt.
> **Nghiêm cấm** ghi mật khẩu, khóa API, mã PIN, chứng thư số vào bất kỳ cột nào, kể cả đã mã hóa.

---

## PHẦN I — DANH MỤC TÀI KHOẢN

| TT | Hệ thống / tài sản (mã) | Tên tài khoản | Loại | Người chịu trách nhiệm | **Số phiếu F28.04** | Ngày cấp | Thời hạn hiệu lực | MFA | Nơi lưu bí mật xác thực | Người có quyền cấp phát | Trạng thái |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | | | ☐ Cá nhân ☐ Đặc quyền ☐ Dịch vụ ☐ Bên thứ ba | | | | | ☐ Có ☐ Không | | | ☐ Hoạt động ☐ Tạm khóa ☐ Đã thu hồi |
| 2 | | | ☐ Cá nhân ☐ Đặc quyền ☐ Dịch vụ ☐ Bên thứ ba | | | | | ☐ Có ☐ Không | | | ☐ Hoạt động ☐ Tạm khóa ☐ Đã thu hồi |

> **MFA bắt buộc** với: tài khoản quản trị · truy cập từ xa · thư điện tử công vụ · hệ thống chứa thông tin Hạn chế/Mật (ETV.P28 mục 6.7.1).

---

## PHẦN II — ĐỐI CHIẾU ĐỊNH KỲ TÀI KHOẢN ↔ PHIẾU

*(06 tháng/lần — ETV.P33 §6.4.2 bước 4)*

**Kỳ đối chiếu:** từ ..../..../........ đến ..../..../........　**Ngày thực hiện:** ..../..../........

| Nhóm bất thường | Số lượng | Danh sách | Hướng xử lý |
|---|---|---|---|
| Tài khoản **có trên hệ thống, không có phiếu** | | | **Khóa tạm ngay** + mở sự cố ETV.P28, số: .............. *(không xóa trước khi PT.ATTT xem xét)* |
| Phiếu đã duyệt **chưa được thực hiện** | | | Thực hiện hoặc trả lại phiếu, ghi lý do |
| Tài khoản **quá thời hạn hiệu lực** còn hoạt động | | | Thu hồi ngay |
| Tài khoản của người **đã nghỉ việc, chuyển công tác** | | | Thu hồi ngay; đối chiếu ETV.P03 |
| Tài khoản **dùng chung** không có phê duyệt của LĐV | | | Ngừng sử dụng hoặc trình LĐV phê duyệt kèm lý do, thời hạn, người chịu trách nhiệm |

---

## PHẦN III — RÀ SOÁT TÀI KHOẢN ĐẶC QUYỀN VÀ TÀI KHOẢN DỊCH VỤ

*(Tối thiểu 02 lần/năm, trình LĐV — ETV.P28 mục 6.7.1)*

| TT | Hệ thống | Tài khoản | Loại | Người chịu trách nhiệm | Còn cần thiết | Đã tách khỏi tài khoản dùng hằng ngày | Kết luận | Ngày rà soát |
|---|---|---|---|---|---|---|---|---|
| 1 | | | ☐ Đặc quyền ☐ Dịch vụ | | ☐ Có ☐ Không | ☐ Có ☐ Không áp dụng | ☐ Giữ ☐ Thu hồi ☐ Điều chỉnh quyền | |

---

## PHẦN IV — THU HỒI THEO BIẾN ĐỘNG NHÂN SỰ

*(Thu hồi **trong ngày làm việc** — điều kiện bắt buộc để hoàn tất thủ tục thôi việc theo ETV.P03)*

| TT | Họ tên | Đơn vị | Lý do | Ngày phát sinh | Danh sách tài khoản đã thu hồi | Thiết bị đã thu hồi (F33.01 Phần III) | Ngày hoàn tất | Xác nhận |
|---|---|---|---|---|---|---|---|---|
| 1 | | | ☐ Nghỉ việc ☐ Chuyển công tác ☐ Kết thúc việc của bên thứ ba | | | ☐ | | |

---

| Người lập | Người soát xét | Người phê duyệt Phần III |
| --- | --- | --- |
| *(QTHT)* | *(PT.ATTT)* | *(Lãnh đạo Viện)* |
| Ngày: ..../..../........ | Ngày: ..../..../........ | Ngày: ..../..../........ |

> Hồ sơ lưu **05 năm** theo ETV.P15.
