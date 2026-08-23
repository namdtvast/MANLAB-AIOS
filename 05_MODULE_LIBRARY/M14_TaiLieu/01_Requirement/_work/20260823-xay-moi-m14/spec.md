# M14_TaiLieu — SPEC (Increment 12, xây mới trên aios-platform)

Tier **M** (đổi schema DB + nhiều file + state machine 7 trạng thái + business rule đáng kể +
UI/backend). Không có `08_Source` nguyên mẫu. Khác các increment trước: M14 **đã có sẵn đặc tả
API/DataModel/StateMachine** trong module — bản triển khai bám theo, **không định nghĩa lại**:
- `02_API/API.md` — danh sách endpoint + mã lỗi nghiệp vụ (`MISSING_REQUIRED_FIELD`,
  `REASON_REQUIRED`, `NOT_DRAFT`, `PERMISSION_DENIED`).
- `03_Database/DataModel.md` — thực thể `Document`, `AuditLog` append-only, cặp nghịch đảo
  `supersedes`/`superseded_by`.
- `07_Workflow/StateMachine.md` — **đúng 7 trạng thái**, không thêm trạng thái mới.

## OUTCOME

- **WHO**: NTH (người lập), LĐP (soát xét, thanh lý), LĐV (phê duyệt, hủy bỏ), Văn thư/QLCL (cấp
  mã, ban hành, phân phối), AI Agent (← M29).
- **WHAT**: số hóa vòng đời kiểm soát văn bản theo ETV.P14 — nội bộ (đi) và bên ngoài (đến), từ
  soạn thảo tới thanh lý/hủy bỏ.
- **WHY**: ISO/IEC 17025 §8.3, ISO 9001 §7.5, ISO/IEC 27001, ISO/IEC 42001 §7.5. M14 là **nguồn
  của F14.03** mà M12 đã tham chiếu từ Increment 10 (`M12Complaint.externalDocRef`).
- **SUCCESS CRITERIA**: 6 gate hoạt động đúng qua Browser thật, đặc biệt gate ISO 42001 (AI không
  đổi được trạng thái) và gate không ủy quyền phê duyệt Sổ tay/Thủ tục; `validate_links` PASS.

## SPEC

### Đối tượng dữ liệu

- `M14Document` — ánh xạ `Document` của DataModel.md. Metadata theo **đúng** bảng ETV.P14 §6.3:
  `code` (mã theo §6.2, UNIQUE), `title`, `docType`, `owner`, `department`, `processCode` (→ MPxx),
  `effectiveDate`, `revision`, `keywords[]`, `relatedDocuments[]`, `isoClause[]`, `legalBasis[]`,
  `aiTags[]`, `knowledgeCategory`, `permissionGroup` (→ F14.06), `retention` (→ F14.06),
  `digitalSignature`, `sourceOrg`, `supersedesId` ↔ `supersededById`, `status`, `disposalType`,
  `publishedAt`/`publishedById`, `distributionNote`.
- `M14AiSuggestion` — gợi ý của AI Agent: `field`, `suggestedValue`, `rationale`, `appliedById`,
  `appliedAt`. **AI chỉ ghi vào bảng này**, không ghi thẳng vào `M14Document` (ETV.P14 §6.9).
- `M14AuditEntry` — nhật ký append-only (`actor, role, action, reason, ts`).

### State machine (đúng 7 trạng thái của `07_Workflow/StateMachine.md`)

`NHAP → CHO_SOAT_XET → {KHONG_SOAT_XET → CHO_SOAT_XET | CHO_PHE_DUYET} → {KHONG_PHE_DUYET → CHO_SOAT_XET | DA_PHE_DUYET} → HET_HIEU_LUC_HUY`

"Ban hành/phân phối" (`publish`) là **hành động trong trạng thái `DA_PHE_DUYET`**, không phải
trạng thái mới — giữ đúng 7 giá trị, không tự đặt tên trạng thái khác.

### Business Rules → Gate

1. (Quy tắc 2 DacTa · `MISSING_REQUIRED_FIELD`) `txSubmitReview`: chặn `NHAP → CHO_SOAT_XET` nếu
   thiếu trường bắt buộc **theo `docType`** — thông báo liệt kê đúng tên trường còn thiếu. Văn bản
   HTQL (Sổ tay/Thủ tục/Quy trình/Hướng dẫn/Biểu mẫu) bắt buộc thêm `isoClause`; `effectiveDate`
   bắt buộc từ bước rời `NHAP` (ETV.P14 §6.3 "✓ trừ Nháp").
2. (Quy tắc 1 · `INVALID_CODE_FORMAT`) Mã văn bản nội bộ phải khớp quy tắc mã hóa §6.2
   (`ETV.QM`, `ETV.P xx`, `ETV.P.F xx.yy`, `ETV.MXa xx`, `ETV.Gb xx`); văn bản **bên ngoài** không
   ép định dạng (mã do nơi phát hành đặt). `code` UNIQUE toàn hệ thống.
3. (RACI §III · tách vai trò) `txReview` chỉ vai trò `LDP`; người soát xét **không được là người
   lập** (`SELF_REVIEW`). Không đạt → `KHONG_SOAT_XET`, bắt buộc `reason` (`REASON_REQUIRED`).
4. (Quy tắc 4 DacTa · `NO_DELEGATION`) `txApprove` cần vai trò `LDV` hoặc `LDV_UYQUYEN`; nhưng
   `docType ∈ {SO_TAY, THU_TUC}` **chỉ `LDV` chính danh** — người được ủy quyền bị chặn cứng.
   Không đạt → `KHONG_PHE_DUYET` + `reason`.
5. (Quy tắc 5 · §6.11) Kết thúc vòng đời có **hai hành vi khác nhau**, cùng đích
   `HET_HIEU_LUC_HUY`: `txRetire` (Thanh lý — chỉ `LDP`) và `txDiscard` (Hủy bỏ — chỉ `LDV`), cả
   hai bắt buộc `reason`, ghi `disposalType` để phân biệt. Chỉ từ `DA_PHE_DUYET`.
6. (Quy tắc 7 · ISO 42001 §7.5 · `AI_CANNOT_TRANSITION`) Mọi transition đều chặn cứng actor có vai
   trò `AI_AGENT` — AI chỉ được tạo `M14AiSuggestion`; gợi ý phải do người có thẩm quyền bấm "Áp
   dụng" mới ghi vào `M14Document`.
7. (Quy tắc 6) `supersedes` là cặp nghịch đảo: ghi một chiều → hệ thống tự đồng bộ chiều còn lại
   trong cùng transaction.
8. `txPublish` (Văn thư/QLCL) chỉ khi `DA_PHE_DUYET`; ghi `publishedAt`/`publishedById` +
   `distributionNote` (F14.04), không đổi `status`.

### Cross-module (đọc thật, không import code)

Trang chi tiết văn bản bên ngoài tra `M12Complaint` theo `externalDocRef = code` để hiển thị các
khiếu nại đang viện dẫn văn bản này — chiều ngược của liên kết M12 → F14.03 đã có từ Increment 10.

### Vai trò

`NTH`, `LDP`, `LDV`, `LDV_UYQUYEN`, `VANTHU`, `AI_AGENT`. Dùng lại `nth@`, `ldp@`, `ldv@`,
`vanphong@manlab.vn` (VANTHU — đã tạo ở M03), `ai-operator@manlab.vn` (AI_AGENT — đã tạo ở M29);
**tạo mới** `pvt@manlab.vn` cho `LDV_UYQUYEN`.

## Quyết định phạm vi (cần LĐV xác nhận lại)

1. **`LDV_UYQUYEN` là vai trò mới do bản triển khai đặt ra** để kiểm chứng được quy tắc 4 ("người
   phê duyệt = tài khoản nhóm LĐV, **không ủy quyền**"). ETV.P14 không định nghĩa vai trò người
   được ủy quyền; nếu Viện không dùng cơ chế ủy quyền thì vai trò này chỉ tồn tại để chặn.
2. **Gate `SELF_REVIEW` ở bước soát xét** — RACI tách NTH và LĐP nhưng không viết thành cấm; bổ
   sung theo tinh thần tách vai trò đã dùng ở M10/M13.
3. **`supersedes` chỉ đồng bộ hai chiều, KHÔNG tự chuyển văn bản cũ sang `Hết hiệu lực`** — quy
   tắc 6 chỉ nói "tự động cập nhật `superseded_by`". Thay vì tự thanh lý (suy diễn), UI hiển thị
   cảnh báo mềm để LĐP chủ động thanh lý.
4. **`publish` không phải trạng thái** mà là hành động trong `DA_PHE_DUYET` — bám StateMachine.md
   đúng 7 giá trị; API.md có endpoint `/publish` riêng nên tách thành hành động độc lập.
5. `permissionGroup`/`retention` lưu dạng chuỗi tham chiếu F14.06 (biểu mẫu **chưa số hóa**) —
   DataModel.md yêu cầu FK tới bản ghi F14.06, chưa làm được vì chưa có nguồn; ghi rõ là nợ kỹ
   thuật, không tự bịa bảng danh mục quyền/thời hạn lưu.
