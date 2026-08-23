# M02_BaoMat — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P02_BaoMat.md` (Thủ tục ETV.P02, lần ban hành 03, **Đã
> phê duyệt** 18/07/2026). Transcribe theo thủ tục đã duyệt, không tự đặt thêm quy tắc.

## 1. Mục tiêu module

Số hóa MP02 — kiểm soát bảo mật thông tin/dữ liệu cá nhân của khách hàng và hoạt động nội bộ
PTN, theo ISO/IEC 17025 §4.2 + ISO/IEC 27001 A.5 + Nghị định 13/2023/NĐ-CP (bảo vệ dữ liệu cá
nhân).

## 2. Đối tượng dữ liệu chính

| Đối tượng | Mô tả | Biểu mẫu gốc |
|---|---|---|
| `SecurityCommitment` | Cam kết bảo mật đã ký (nhân viên/thử việc/khách) | F02.01, F02.02, F02.04 |
| `VisitorLog` | Sổ ghi nhận khách hàng/khách tham quan vào khu vực hạn chế | F02.03 |
| `DisclosureApproval` | Phê duyệt công bố thông tin khách hàng ra bên thứ ba | — |
| `SecurityIncident` | Sự cố/nghi ngờ vi phạm bảo mật | — |

### 2.1. `SecurityCommitment`

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `type` | enum: NHAN_VIEN / THU_VIEC / KHACH | có | quyết định biểu mẫu áp dụng |
| `person_name`, `org` | string | có | |
| `signed_date` | date | có | |
| `access_scope` | text | có | phạm vi/khu vực/thông tin được tiếp cận |
| `status` | enum: Hiệu lực / Đã thu hồi | tự quản lý | thu hồi ngay khi chấm dứt công việc (6.2) |

### 2.2. `DisclosureApproval`

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `basis` | text | có | căn cứ pháp luật/hợp đồng yêu cầu công bố |
| `content`, `recipient` | text | có | nội dung công bố, người nhận |
| `approved_by` | ref User | có | **TP hoặc LĐV theo thẩm quyền** (6.4) |
| `customer_notified` | boolean | có | đã thông báo khách hàng trước khi công bố (trừ pháp luật cấm thông báo) |

### 2.3. `SecurityIncident`

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `detected_by`, `detected_at` | ref User, datetime | có | |
| `containment_action` | text | có | biện pháp ngăn chặn ngay (thu hồi email, khóa tài khoản...) |
| `impact_assessment` | text | có | TP đánh giá phạm vi/hậu quả/nghĩa vụ thông báo |
| `notification_required` | boolean | có | có phải thông báo khách hàng/cơ quan thẩm quyền (ND13/2023) |
| `corrective_action` | text | có, trước khi đóng | |

## 3. Vai trò

| Vai trò | Trách nhiệm |
|---|---|
| LĐV | Chủ sở hữu thủ tục; phê duyệt công bố vượt thẩm quyền PTN; chỉ đạo xử lý sự cố nghiêm trọng |
| TP (Trưởng phòng PTN) | Phê duyệt quyền truy cập; duyệt khách tham quan; phê duyệt công bố thông tin trong thẩm quyền; đánh giá/xử lý sự cố |
| QLCL | Theo dõi cam kết, đào tạo, đánh giá tuân thủ, kiểm soát hồ sơ |
| Nhân sự PTN | Dùng thông tin đúng mục đích; báo cáo ngay nguy cơ/sự cố |

## 4. Quy tắc nghiệp vụ

1. Nhân sự (chính thức/bán thời gian/thử việc) phải ký cam kết (F02.01/F02.04) **trước khi**
   được cấp quyền truy cập.
2. Khách/chuyên gia/nhà thầu có thể tiếp cận thông tin bảo mật → bắt buộc ký F02.02 trước khi
   vào khu vực hạn chế, ghi vào `VisitorLog` (F02.03).
3. Quyền truy cập do TP phê duyệt theo vị trí công việc; rà soát khi đổi nhiệm vụ; **thu hồi
   ngay** khi chấm dứt công việc.
4. Không công bố thông tin khách hàng cho bên thứ ba nếu chưa có sự đồng ý của khách hàng, trừ
   khi pháp luật yêu cầu hoặc đã thỏa thuận trong hợp đồng.
5. Khi buộc phải công bố theo pháp luật/hợp đồng: bắt buộc thông báo khách hàng trước (trừ khi
   pháp luật cấm thông báo) + `DisclosureApproval` phải có `approved_by` (TP/LĐV theo thẩm quyền).
6. Không xác nhận/cung cấp kết quả qua điện thoại, trừ khi có cơ chế nhận diện người nhận và TP
   đã phê duyệt.
7. Chia sẻ dữ liệu cá nhân cho bên thứ ba phải tuân Nghị định 13/2023/NĐ-CP (có sự đồng ý, đúng
   mục đích đã nêu).
8. Phát hiện sự cố bảo mật → ngăn chặn ngay (không được tự xóa/che giấu bằng chứng) → báo
   TP/QLCL → TP đánh giá phạm vi/nghĩa vụ thông báo → thực hiện khắc phục.
9. Hồ sơ hết hạn lưu trữ: hủy giấy bằng phương pháp không khôi phục được, xóa an toàn dữ liệu
   điện tử — việc hủy hồ sơ quan trọng phải được phê duyệt + có bằng chứng.
10. Điều khoản dân sự trong F02.01 (phạt vi phạm, không cạnh tranh) phải phối hợp rà soát định
    kỳ với M03 (Nhân sự) — PTN không tự sửa điều khoản pháp lý lao động.

## 5. Liên kết

Quy trình: MP02 · Năng lực: CAP-28_ATTT · Thủ tục gốc: `ETV.P02_BaoMat.md` (Đã phê duyệt, lần 03)
· Biểu mẫu: F02.01–F02.05, F07.02 (phiếu nhận/trả thiết bị) · Lưu hồ sơ: ETV.P15 · Liên quan:
ETV.P03 (Nhân sự — điều khoản hợp đồng), ETV.P07 (Hợp đồng), ETV.P14 (Kiểm soát tài liệu) · Căn
cứ: ISO 9001 §7.5, ISO/IEC 17025 §4.2/§8.3, ISO/IEC 27001 A.5.9–A.5.18/A.5.37/A.8.13, NĐ 13/2023.

## 6. Triển khai thật (Increment 6, aios-platform)

Đã xây thành CRUD + 3 gate nghiệp vụ thật trong `09_ENGINEERING/aios-platform` (Prisma +
Next.js), không có `08_Source` nguyên mẫu (giống M01/M03). Chi tiết đầy đủ + bằng chứng VERIFY:
`01_Requirement/_work/20260823-xay-moi-m02/{spec.md, plan.md, verify.md}`.

**Điểm kỹ thuật quan trọng**: `SecurityCommitment.employeeId` là **FK thật** tới `M03Employee`
(không phải chuỗi tham chiếu tự do như dự kiến ban đầu ở M03) — vì M03 đã xây thật trước M02
trong cùng phiên làm việc. Đã xác nhận qua Browser: mở cam kết loại Nhân viên hiển thị đúng liên
kết `NS-2026-0002 — Trần Thị Bích`.

**Phạm vi Increment 6** — 4/4 entity DacTa.md có mặt, nhưng `SecurityCommitment` không có bước
soát xét/phê duyệt riêng (ký giấy = hiệu lực ngay, digitize chỉ ghi nhận lại — quyết định phạm vi
cần LĐP xác nhận, xem spec.md). Gate chính đã verify thật: `DisclosureApproval` (bắt buộc thông
báo khách hàng trừ khi pháp luật cấm — quy tắc 5; đúng thẩm quyền TP/LĐV theo lựa chọn khi tạo),
`SecurityIncident` (bắt buộc đánh giá trước khi chuyển bước, bắt buộc biện pháp khắc phục trước
khi đóng — quy tắc 8). Gate `VisitorLog` (bắt buộc cam kết KHÁCH hợp lệ) đã cài ở server nhưng
chưa demo runtime vì UI tự nhiên chỉ cho chọn cam kết hợp lệ.

Vai trò module: `NV`, `TP`, `QLCL`(chưa dùng ở Increment 6), `LDV` — dùng lại 3 tài khoản demo
M01/M03 (nth→NV, ldp→TP, ldv→LDV), không tạo tài khoản mới.
