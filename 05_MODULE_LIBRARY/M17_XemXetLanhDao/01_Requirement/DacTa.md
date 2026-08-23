# M17_XemXetLanhDao — Đặc tả yêu cầu

> Nguồn: `03_MANAGEMENT_SYSTEM/02_P/ETV.P17_XemXetLanhDao.md` (Thủ tục ETV.P17, lần ban hành 03,
> **Đã phê duyệt** 21/07/2026, tên đầy đủ "Xem xét của Lãnh đạo"). 4/4 biểu mẫu áp dụng
> (`ETV.P.F 17.01`–`17.03` + `13.01`) chưa số hóa — nguồn chỉ có hồ sơ đã điền theo năm
> (2019–2025), không có bản mẫu trống. Phụ lục I của nguồn đã có sẵn đặc tả 3 màn hình ManLab —
> dùng trực tiếp làm cơ sở mục 2 dưới đây.

## 1. Mục tiêu module

Số hóa MP17 — tổ chức chương trình xem xét định kỳ (Quý 4 hằng năm, sau khi hoàn thành đánh giá
nội bộ/bên ngoài) hoặc đột xuất của Lãnh đạo Viện đối với hệ thống quản lý, theo ISO 9001 §9.3 +
ISO/IEC 17025 §8.9. Là **đầu ra hội tụ** của M16 (kết quả đánh giá là 1 trong 12 nội dung bắt
buộc xem xét) và **đầu vào** cho M13 (hành động khắc phục/phòng ngừa sau kết luận họp).

## 2. Đối tượng dữ liệu chính

| Đối tượng | Mô tả | Biểu mẫu |
|---|---|---|
| `ReviewPlan` | Kế hoạch/chương trình xem xét của lãnh đạo | F17.01 |
| `ReviewMinutes` | Đánh giá/biên bản kết quả xem xét theo 12 nội dung | F17.02 |
| `ReviewActionTracking` | Theo dõi hành động sau xem xét | F17.03 |
| `CorrectiveActionRequest` | Phiếu yêu cầu khắc phục/phòng ngừa (← M13) | F13.01 |

### 2.1. `ReviewPlan`

`title`, `is_ad_hoc` (đột xuất/định kỳ), `planned_date`, `location`, `attendees[]`,
`planned_topics[]` (chọn từ 12 nội dung chuẩn — xem 2.4), `status`
(Nháp/Gửi yêu cầu duyệt/Đã duyệt/Không duyệt), `created_by` (QLCL), `reviewed_by` (Trưởng phòng),
`approved_by` (LĐV).

### 2.2. `ReviewMinutes`

`plan_ref`, `meeting_date`, `topic_results[]` (12 dòng, mỗi dòng `topic_id` + `assessment_result`
theo đúng thứ tự F17.01), `conclusion` (kết luận cuối cùng của LĐV), `recorded_by` (QLCL, thư ký).

### 2.3. `ReviewActionTracking`

`action_description`, `start_date`, `due_date`, `status`
(Đang thực hiện/Hoàn thành/Quá hạn), `assigned_to`, `progress_notes`, `capa_ref` (→ M13 nếu phát
sinh phiếu yêu cầu khắc phục).

### 2.4. 12 nội dung xem xét bắt buộc (ISO/IEC 17025:2017 §8.9 — không được rút gọn danh sách)

1. Sự phù hợp của chính sách và mục tiêu chất lượng
2. Sự phù hợp của các thủ tục
3. Các kết quả đánh giá nội bộ (← M16)
4. Tình trạng hành động từ các cuộc xem xét trước
5. Kết quả các cuộc đánh giá nội bộ gần nhất (← M16)
6. Các hành động khắc phục (← M13)
7. Kết quả đánh giá của tổ chức bên ngoài
8. Kết quả so sánh liên phòng/thử nghiệm thành thạo
9. Khiếu nại, phản hồi khách hàng, phản hồi nhân viên (← M12)
10. Khuyến nghị cải tiến
11. Vấn đề quan trọng khác (chất lượng, nguồn lực, đào tạo — ← M03)
12. Mục tiêu năm tiếp theo

## 3. Vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| LĐV | Chủ sở hữu; phê duyệt chương trình; chủ trì họp; kết luận cuối cùng |
| Trưởng phòng | Phối hợp phê duyệt chương trình cùng LĐV |
| QLCL | Lập chương trình (thường Quý 4, sau khi hoàn thành đánh giá nội bộ/bên ngoài trong năm); thông báo liên quan; chuẩn bị báo cáo tổng kết; làm thư ký, ghi biên bản; lưu hồ sơ; lập phiếu yêu cầu khắc phục sau họp; kiểm tra hành động khắc phục |
| Cán bộ được phân công báo cáo | Chuẩn bị + trình bày báo cáo nội dung được giao |
| Thành viên cuộc họp | Đưa ý kiến cải tiến/khắc phục/phòng ngừa |

## 4. Quy tắc nghiệp vụ

1. `ReviewPlan` định kỳ lập **hằng năm vào Quý 4**, và **chỉ sau khi đã hoàn thành các cuộc đánh
   giá nội bộ/bên ngoài trong năm** (phụ thuộc M16) — hệ thống nên cảnh báo nếu tạo trước khi có
   đủ dữ liệu đánh giá của năm đó.
2. `ReviewPlan` đột xuất được tạo khi có vấn đề nghiêm trọng phát sinh hoặc cần thay đổi hệ
   thống quản lý — không giới hạn theo lịch Quý 4, nhưng vẫn bắt buộc LĐV + Trưởng phòng phê
   duyệt chương trình như định kỳ.
3. Thông báo chương trình tới bộ phận/cá nhân liên quan **ít nhất 2 tuần trước** cuộc họp, kèm
   thời hạn nộp báo cáo cho cán bộ được phân công.
4. `ReviewMinutes` bắt buộc đủ **cả 12 nội dung** theo ISO/IEC 17025 §8.9 (mục 2.4) — không cho
   lưu biên bản thiếu bất kỳ nội dung nào trong danh sách chuẩn.
5. Kết luận cuối cùng của cuộc họp là quyền quyết định của **LĐV** — không phải biểu quyết đa số
   thành viên (khác M16 nơi kết luận là của trưởng đoàn đánh giá, nhưng cùng nguyên tắc "một
   người chốt").
6. Sau họp, nếu biên bản có đề xuất khắc phục/cải tiến/phòng ngừa → QLCL bắt buộc lập
   `CorrectiveActionRequest` (mã đúng `ETV.P.F 13.01`, thuộc phạm vi **M13**, không phải
   `01.01` như bản gốc ghi nhầm — đã sửa khi số hóa `ETV.P17`, xem ghi chú số hóa trong nguồn) —
   không tự xử lý khắc phục ngay trong module này.
7. `ReviewActionTracking` phải tự động đánh dấu `Quá hạn` khi `due_date` đã qua mà `status` chưa
   là `Hoàn thành` — không chờ cập nhật thủ công.
8. Hồ sơ xem xét lãnh đạo (chương trình/biên bản/báo cáo/phiếu khắc phục) lưu theo **ETV.P15**.

## 5. Liên kết

Quy trình: MP17 · Năng lực: CAP-16_ChatLuong · Thủ tục gốc: `ETV.P17_XemXetLanhDao.md` (Đã phê
duyệt, lần 03) · Biểu mẫu: F17.01–F17.03 (chưa có bản mẫu trống) + F13.01 (thuộc M13) · Lưu hồ
sơ: ETV.P15 · Liên quan: M16 (đầu vào — kết quả đánh giá nội bộ/bên ngoài), M13 (đầu ra — hành
động khắc phục/phòng ngừa sau kết luận họp), M12 (đầu vào — khiếu nại/phản hồi), M03 (đầu vào —
đào tạo/nguồn lực) · Căn cứ: ISO 9001 §9.3, ISO/IEC 17025 §8.9.

## 6. Triển khai thật (Increment 9, aios-platform)

Đã xây thành CRUD + gate đồng phê duyệt (co-approval) + gate đủ 12 nội dung trong
`09_ENGINEERING/aios-platform` (Prisma + Next.js), không có `08_Source` nguyên mẫu (giống
M01/M02/M03/M04/M16). Chi tiết đầy đủ + bằng chứng VERIFY:
`01_Requirement/_work/20260823-xay-moi-m17/{spec.md, plan.md, verify.md}`.

**Quyết định phạm vi cần LĐV xác nhận lại**:
1. `ReviewActionTracking.status = Quá hạn` là **tính toán khi đọc** (derived, không lưu DB) —
   mirror pattern đã dùng ở M04/M20, DacTa chỉ nói "phải tự động đánh dấu" không quy định cơ chế.
2. Gate đồng phê duyệt (quy tắc 2: "bắt buộc LĐV + Trưởng phòng phê duyệt") triển khai là **2 phê
   duyệt độc lập theo bất kỳ thứ tự nào**, chuyển `APPROVED` ngay khi đủ cả 2 — khác hẳn mô hình
   phân cấp tuần tự đã dùng ở M10/M16 (`PENDING_REVIEW` → `PENDING_APPROVAL`), vì DacTa dùng liên
   từ "và" ngang hàng chứ không mô tả cấp trên/cấp dưới.
3. Cảnh báo mềm quy tắc 1 (chưa đủ dữ liệu đánh giá M16 của năm) triển khai bằng **query Prisma
   thật** trực tiếp vào bảng `M16AuditReport`/`M16AuditProgram`/`M16AuditPlan` — không chặn tạo
   `ReviewPlan`, đúng tinh thần "nên cảnh báo" không phải "bắt buộc".

Gate chính đã verify thật qua Browser: đồng phê duyệt chương trình xem xét (test chiều TP duyệt
trước → LĐV duyệt sau → tự động `APPROVED`, xem `verify.md` mục "Điều CHƯA verify" về chiều ngược
lại), gate đủ 12 nội dung khi lập biên bản (chặn đúng khi thiếu 1 nội dung, cho qua khi đủ 12),
gate chỉ LĐV ghi kết luận cuộc họp (nhánh thành công), hiển thị "Quá hạn"/"Hoàn thành" đúng theo
tính toán khi đọc, cảnh báo mềm cross-module không hiển thị sai khi M16 đã có dữ liệu năm đó.

Vai trò module: `QLCL`, `TP` (Trưởng phòng), `LDV` — dùng lại 3 tài khoản demo M01/M02/M03/M04,
không tạo tài khoản mới. `CorrectiveActionRequest` (F13.01) chỉ tạo bản ghi tối giản, chưa có FK
thật tới M13 (M13 chưa xây).
