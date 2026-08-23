# M13_KhacPhuc — SPEC (Increment 11, xây mới trên aios-platform)

Tier **M** (đổi schema DB + nhiều file + business rule đáng kể + UI+backend). Không có
`08_Source` nguyên mẫu — xây trực tiếp từ `01_Requirement/DacTa.md` (đã transcribe từ
`ETV.P13_KhacPhuc.md`, Đã phê duyệt lần 03, tên đầy đủ "Kiểm soát Công việc Không phù hợp").

## OUTCOME

- **WHO**: Toàn thể nhân viên PTN (phát hiện + ghi sổ), QLCL, QLKT, LĐV.
- **WHAT**: số hóa phát hiện → đánh giá mức độ (Nhẹ/Nặng) → xử lý công việc không phù hợp, với
  phương án hành động khắc phục bắt buộc thẩm xét cho mức Nặng.
- **WHY**: ISO/IEC 17025 §7.10 + ISO 9001 §10.2. M13 là **điểm hội tụ CAPA** — M05/M10/M12 đều
  dẫn về đây; M12 đã có field `capaRef` trỏ sang module này (hiện là free text).
- **SUCCESS CRITERIA**: 4 gate (dừng hẳn việc khi Nặng; tách vai người thực hiện ≠ người thẩm
  xét; không tự mở khóa tiếp tục công việc khi chưa thẩm xét đạt; chỉ LĐV cho phát hành báo cáo
  thay thế) hoạt động đúng qua Browser thật; `validate_links` PASS.

## SPEC

### Đối tượng dữ liệu

- `M13NonconformingWork` (F13.01 — sổ theo dõi): `sourceType`
  (TU_PHAT_HIEN/KHIEU_NAI←M12/IC_VUOT_GIOI_HAN←M05/KHAC), `sourceRef` (tham chiếu tự do),
  `description`, `severity` (NHE/NANG, **null khi chưa đánh giá**), `severityBasis`,
  `assessedById`, `status`, `emergencyStop` (dừng ngay khẩn cấp lúc phát hiện — quy tắc 1),
  `stoppedWork` (dừng hẳn — quy tắc 4), `detectedById`.
- `M13CorrectiveActionPlan` (**1-1** với NCW, chỉ mức Nặng): `rootCause`, `actionPlan`,
  `assignedToId`, `status`, `completedAt`, `reviewedById`, `reviewedAt`, `reviewNote`,
  `replacementReportRef`, `replacementApprovedById`, `replacementApprovedAt`.
- `M13RevokedReport` (n-1 với NCW): `reportRef`, `note` — báo cáo/GCN thu hồi (← M11).
- `M13MonitoringNote` (n-1 với NCW): `note` — "ghi chép đầy đủ diễn biến" của mức Nhẹ (quy tắc 3).
- `M13AuditEntry`: itemType (NCW/CAP), itemId, ts, actorId, role, action, reason.

### State machine

`M13NonconformingWork.status`: `GHI_NHAN → {DANG_THEO_DOI (Nhẹ) | DANG_KHAC_PHUC (Nặng)} → DA_KHAC_PHUC`

`M13CorrectiveActionPlan.status`: `DANG_THUC_HIEN → CHO_THAM_XET → {DAT | KHONG_DAT → DANG_THUC_HIEN}`

### Business Rules → Gate

1. (Quy tắc 2) `txAssessSeverity`: chỉ `LDV`/`QLCL`/`QLKT` được đánh giá mức độ (`FORBIDDEN` với
   NHANVIEN), bắt buộc `severityBasis` (`BASIS_REQUIRED`) — không có công thức tự động.
   `NHE → DANG_THEO_DOI`; `NANG → DANG_KHAC_PHUC` + tự đặt `stoppedWork = true` (quy tắc 4:
   mức Nặng bắt buộc dừng hẳn công việc, không cho chọn khác).
2. (Quy tắc 4-5) `txCreateCapPlan`: chỉ `QLCL` lập phương án, chỉ khi `severity = NANG`
   (`NOT_SEVERE` nếu Nhẹ), bắt buộc `rootCause`/`actionPlan`/`assignedToId`.
3. (Quy tắc 5 — **gate tách vai trò**) `txReviewCapPlan`: chỉ `QLCL` thẩm xét
   (`FORBIDDEN`), và **người thẩm xét không được là người được phân công thực hiện**
   (`SELF_REVIEW` — kể cả khi người đó có vai trò QLCL). Chỉ từ `CHO_THAM_XET`.
4. (Quy tắc 5 — **không tự mở khóa**) `txCloseNcw`:
   - mức `NANG`: chặn `CAP_REVIEW_REQUIRED` nếu chưa có phương án hoặc phương án chưa `DAT` —
     không mở khóa theo thời hạn, không do người thực hiện tự xác nhận;
   - mức `NHE`: chặn `MONITORING_REQUIRED` nếu chưa có ghi chép theo dõi nào (quy tắc 3
     "theo dõi chặt chẽ, ghi chép đầy đủ diễn biến, không đóng hồ sơ ngay").
5. (Quy tắc 6) `txApproveReplacementReport`: chỉ `LDV` (`FORBIDDEN`), bắt buộc NCW có ít nhất 1
   báo cáo đã thu hồi (`NO_REVOKED_REPORT`), bắt buộc phương án đã `DAT` (`CAP_REVIEW_REQUIRED`)
   — "không phát hành lại tự động dù phương án đã hoàn thành".
6. (Quy tắc 1) `emergencyStop` ghi nhận ngay lúc tạo, **không gate phê duyệt trước** — được dừng
   ngay rồi báo cáo sau; chỉ ghi nhật ký.
7. (Quy tắc 7) Lưu hồ sơ theo ETV.P15 — dùng chung `M13AuditEntry` như mọi module khác.

### Cross-module (đọc thật, không import code)

Trang chi tiết NCW có `sourceType = KHIEU_NAI` + `sourceRef` khớp `M12Complaint.code` → hiển thị
link sang khiếu nại đó, query thẳng bảng `M12Complaint` bằng Prisma (mirror cách M17 đọc bảng
M16). Không sửa gì thuộc M12; `M12Complaint.capaRef` giữ nguyên là free text.

### Vai trò

`NHANVIEN` (toàn thể nhân viên PTN), `QLCL`, `QLKT`, `LDV`. Dùng lại `nth@manlab.vn` = NHANVIEN,
`qlcl@manlab.vn` = QLCL, `ldv@manlab.vn` = LDV; **tạo mới 1 tài khoản** `qlkt@manlab.vn` cho vai
trò QLKT (chưa từng có trong seed — có tiền lệ ở M03 khi tạo `vanphong@manlab.vn`).

## Quyết định phạm vi (cần LĐV xác nhận lại)

1. **`M13CorrectiveActionPlan` quan hệ 1-1 với NCW** — DacTa không nói rõ 1 KPH có thể có nhiều
   phương án; chọn 1-1 và cho phép thẩm xét KHÔNG ĐẠT quay lại `DANG_THUC_HIEN` (lặp trên cùng
   một bản ghi) thay vì tạo phương án mới.
2. **Gate tách vai trò `SELF_REVIEW`** (người được phân công thực hiện không được tự thẩm xét
   phương án của mình) — DacTa chỉ nói "QLCL thẩm xét"; bổ sung ràng buộc này theo tinh thần tách
   vai trò đã hiện thực ở M10 (`canReview`/`canApprove`), không có câu chữ trực tiếp trong P13.
3. **`txApproveReplacementReport` yêu cầu phương án đã `DAT`** — suy ra từ thứ tự tuần tự của mục
   6.3 (thẩm xét → cho phát hành thay thế), không phải câu chữ trực tiếp.
4. **Mức Nhẹ bắt buộc ≥1 ghi chép theo dõi trước khi đóng** — DacTa nói "ghi chép đầy đủ diễn
   biến, không đóng hồ sơ ngay" nhưng không định lượng; chọn ngưỡng tối thiểu 1 bản ghi.
5. **F13.01 chưa số hóa được** (nguồn Dropbox rỗng 0 byte, ghi rõ trong ETV.P13) — cấu trúc sổ
   theo dõi ở đây suy từ nội dung quy trình, **không suy diễn bố cục biểu mẫu gốc**.
