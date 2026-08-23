# M12_KhieuNai — SPEC (Increment 10, xây mới trên aios-platform)

Tier **M** (đổi schema DB + nhiều file + business rule đáng kể + UI+backend). Không có
`08_Source` nguyên mẫu — xây trực tiếp từ `01_Requirement/DacTa.md` (đã transcribe từ
`ETV.P12_KhieuNai.md`, Đã phê duyệt lần 03).

## OUTCOME

- **WHO**: Người tiếp nhận (mọi kênh), Cán bộ phụ trách xử lý (LĐV phân công), LĐV, QLCL.
- **WHAT**: số hóa tiếp nhận/xử lý/trả lời khiếu nại + ghi nhận phàn nàn/góp ý (khách hàng + nội
  bộ), có gate bắt buộc khởi tạo văn bản khiếu nại chính thức khi không giải quyết được ngay.
- **WHY**: ISO/IEC 17025 §7.9 + ISO 9001 §9.1.2/§10.2 — bắt buộc có quy trình kiểm soát khiếu nại
  hình thức, không xử lý ngầm ngoài hệ thống.
- **SUCCESS CRITERIA**: gate F14.03 (quy tắc 1-2), gate CAPA khi phức tạp (quy tắc 4), gate LĐV-
  only khi dừng giải quyết (quy tắc 5) hoạt động đúng qua Browser thật; validate_links PASS.

## SPEC

### Đối tượng dữ liệu

- `M12Complaint` (F12.01): channel, content, relatedCertificateRef (free text → M11 chưa xây),
  resolvedOnSpot, customerSatisfiedOnSpot, isComplex, externalDocRef (free text → M14 F14.03 chưa
  xây), status, resolution, customerSatisfied, stopReason, capaRef (free text → M13 chưa xây),
  createdById, assignedToId.
- `M12Feedback` (F12.02 + F12.03 **gộp 1 model**, xem "Quyết định phạm vi"): origin
  (KHACH_HANG/NOI_BO), category, content, source, escalatedComplaintId (FK → M12Complaint).
- `M12AuditEntry`: itemType (COMPLAINT/FEEDBACK), itemId, ts, actorId, role, action, reason.

### State machine `M12Complaint.status`

`NHAP → DANG_XU_LY → DA_TRA_LOI → {DONG_HO_SO | KHONG_DAT_THOA_THUAN}`

Nhánh tắt: nếu `resolvedOnSpot && customerSatisfiedOnSpot` khi tạo → thẳng `DONG_HO_SO`, không
qua các bước trung gian (đúng quy tắc 2 "chỉ cần ghi vào Complaint, không bắt buộc F14.03").

### Business Rules → Gate

1. (Quy tắc 1-2) `txAssignComplaint` (NHAP→DANG_XU_LY, do LĐV thực hiện): nếu KHÔNG
   (`resolvedOnSpot && customerSatisfiedOnSpot`) thì bắt buộc `externalDocRef` đã có giá trị mới
   cho phân công — chặn cứng `EXTERNAL_DOC_REQUIRED`.
2. (Quy tắc 5) `txCloseComplaint` (DA_TRA_LOI→...): `customerSatisfied=true` → `DONG_HO_SO`;
   `customerSatisfied=false` → chỉ vai trò `LDV` được thực hiện (`FORBIDDEN` nếu không phải), bắt
   buộc `reason` (`REASON_REQUIRED`) → `KHONG_DAT_THOA_THUAN`.
3. (Quy tắc 4) Trong `txCloseComplaint` nhánh đóng hồ sơ: nếu `isComplex=true` mà chưa có
   `capaRef` → chặn `CAPA_REQUIRED`, không cho đóng hồ sơ.
4. (Quy tắc 6) `Feedback.escalatedComplaintId` chỉ set 1 lần qua action `escalateFeedback` (tạo
   `Complaint` mới từ nội dung feedback) — chặn escalate 2 lần.
5. (Quy tắc 3) `relatedCertificateRef` chỉ là field ghi chú tự do (M11 đã xây nhưng không có FK
   ngược từ Complaint→Certificate theo DacTa — không tự thêm liên kết ngoài phạm vi mô tả).
6. (Quy tắc 7) Lưu hồ sơ theo ETV.P15 — không tự thêm state riêng, dùng chung `M12AuditEntry` như
   mọi module khác.

### Vai trò

`QLCL`, `LDV`, `TIEPNHAN` (Người tiếp nhận), `PHUTRACH` (Cán bộ phụ trách xử lý) — dùng lại 4 tài
khoản demo đã có: `nth@manlab.vn`=TIEPNHAN, `ldp@manlab.vn`=PHUTRACH, `ldv@manlab.vn`=LDV,
`qlcl@manlab.vn`=QLCL (đã tạo sẵn từ Increment 1, chưa dùng ở M12).

## Quyết định phạm vi (cần LĐV xác nhận lại, giống pattern các increment trước)

1. **Gộp `Feedback`/`InternalFeedback` thành 1 model** `M12Feedback` với field `origin` phân biệt
   — 2 đối tượng DacTa gần như trùng field (category/content/escalated), mirror cách đã gộp 3
   loại log M04 thành 1 model `ConditionLog`.
2. Người thực hiện `txAssignComplaint` (phân công cán bộ phụ trách) quy định là **LĐV** — DacTa
   ghi "LĐV phân công xử lý khiếu nại phức tạp" nhưng không nói rõ ai phân công khiếu nại đơn
   giản; chọn LĐV cho mọi trường hợp phân công để nhất quán 1 gate duy nhất.
3. `isComplex` là cờ tự đánh dấu khi tạo/xử lý hồ sơ (không có quy tắc tính tự động từ dữ liệu
   nào khác trong DacTa) — do người dùng (LĐV/phụ trách) tick thủ công.
