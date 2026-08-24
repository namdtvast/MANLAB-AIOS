# 20260824-enum-approval-status — CLASSIFY / RECON / OUTCOME / SPEC / PLAN

> Gộp 4 pha vào một file do quy mô thay đổi nhỏ; báo cáo VERIFY tách riêng tại
> [verify.md](verify.md). Kết luận cuối đã hợp nhất vào [DacTa.md](../../DacTa.md) mục 9 và 10.

## CLASSIFY — Tier M

Đổi **schema DB** (enum dùng chung 3 model) ⇒ Tier M theo mục 3 của skill DEV-SPEC-001.
Không thuộc Tier L: không đổi authentication/authorization, không tenant isolation, không
migration phá hủy dữ liệu (thêm giá trị enum là thao tác **additive**), không breaking public API.

## RECON

**[FACT]**

1. `AIApprovalStatus` (`prisma/schema.prisma:418`) có 7 giá trị: `DRAFT`, `PENDING_REVIEW`,
   `RETURNED`, `PENDING_APPROVAL`, `REJECTED`, `APPROVED`, `ARCHIVED`.
2. Enum dùng bởi **3 model**: `AIPlatform` (M35), `AIGuardrail`, `AIPolicy` (M29) — không chỉ M35.
3. `approvalTransitions` (`src/lib/m29/rules.ts`) là **port 1:1** từ bản authoritative
   `05_MODULE_LIBRARY/M29_AI/08_Source/api/rules.mjs`; header ghi rõ "KHÔNG đổi hành vi so với bản
   gốc". Hàm `archive()` hiện **gộp** Hết hiệu lực và Hủy vào một giá trị `ARCHIVED`.
4. Nhãn hiển thị ở `src/lib/m29/labels.ts`, kiểu `Record<string, ...>` ⇒ thiếu key **không** gây
   lỗi biên dịch, nhưng badge hiển thị rỗng khi gặp giá trị mới.
5. `datasource = postgresql`; migration là file SQL thủ công trong thư mục timestamp.
6. M35 chưa có route API và chưa có màn hình riêng — chỉ có model `AIPlatform` trong schema.

**[ASSUMPTION]** Migration không dùng giá trị enum mới trong chính nó ⇒ `ALTER TYPE ... ADD VALUE`
chạy an toàn trong transaction của Prisma (PostgreSQL 12+).

**[QUESTION → đã tự quyết]** Có sửa `approvalTransitions` để **sinh ra** `ACTIVE`/`CANCELLED` ngay
trong thay đổi này không? → **Không**, xem PLAN mục "Ngoài phạm vi".

## OUTCOME

- **WHO**: đội xây M35 (bước BUILD tiếp theo) và M29 (dùng chung enum).
- **WHAT**: `AIApprovalStatus` có thêm `ACTIVE` (Hiệu lực) và `CANCELLED` (Hủy); migration áp được
  trên CSDL hiện có; nhãn tiếng Việt hiển thị đúng cho hai giá trị mới.
- **WHY**: `ETV.P35` mục 6 quy định **09** trạng thái, tách riêng *Đã phê duyệt* (được chấp thuận,
  chưa chạy) và *Hiệu lực* (đã bật giám sát/kết nối). Gộp *Hiệu lực* vào `APPROVED` thì không phân
  biệt được nền tảng đã duyệt nhưng **chưa** bật kiểm tra sức khỏe ⇒ không thực thi được điều kiện
  chặn cứng (c) tại mục 5.2.3 của thủ tục.
- **SUCCESS CRITERIA**: `prisma validate` PASS · `prisma generate` sinh đủ 9 giá trị ·
  `tsc --noEmit` PASS · `next build` PASS · `eslint` sạch · `validate_links.py` PASS ·
  migration SQL đúng cú pháp PostgreSQL và **không** làm mất dữ liệu hiện có.

## SPEC

**Data**

| Giá trị mới | Nhãn tiếng Việt | Tone | Vị trí trong enum | Trạng thái ETV.P35 |
|---|---|---|---|---|
| `ACTIVE` | Hiệu lực | good | sau `APPROVED` | 7 |
| `CANCELLED` | Hủy | crit | sau `ARCHIVED` | 9 |

**Business rules** — chưa kích hoạt trong thay đổi này, ghi để bước BUILD sau thực thi:

- `APPROVED → ACTIVE` chỉ khi `health_check_enabled = true` với nền tảng PRODUCTION hoặc
  `criticality ∈ {Cao, Trung bình}` (ETV.P35 mục 5.1.7 bước 6).
- `CANCELLED` chỉ đến từ các trạng thái **trước** phê duyệt, bắt buộc lý do (ETV.P35 mục 6).
- `ARCHIVED` giữ nguyên nghĩa *Hết hiệu lực*; nhãn hiện tại "Hết hiệu lực/Hủy" **không đổi** trong
  thay đổi này để không lệch hành vi đang chạy của `AIGuardrail`/`AIPolicy`.

**Acceptance criteria**

| # | Tiêu chí |
|---|---|
| AC-01 | `prisma validate` báo schema hợp lệ |
| AC-02 | Prisma Client sinh ra đủ 9 giá trị, thứ tự đúng |
| AC-03 | `next build` và `tsc --noEmit` không lỗi |
| AC-04 | Badge trạng thái hiển thị "Hiệu lực"/"Hủy" thay vì rỗng |
| AC-05 | Migration additive, không `DROP`/`UPDATE` dữ liệu |

**NFR**: không đổi hành vi hiện có của M29 (`AIGuardrail`, `AIPolicy` tiếp tục dùng đúng 7 giá trị
cũ cho tới khi có thay đổi riêng).

## PLAN

**Increment 1** — `prisma/schema.prisma`: thêm 2 giá trị kèm chú thích dẫn chiếu điều khoản thủ tục.
**Increment 2** — `prisma/migrations/20260824044500_ai_approval_status_active_cancelled/migration.sql`:
`ALTER TYPE ... ADD VALUE IF NOT EXISTS ... AFTER ...` (2 câu lệnh).
**Increment 3** — `src/lib/m29/labels.ts`: thêm nhãn và tone cho 2 giá trị mới.

**Ngoài phạm vi (có chủ đích)**

Không sửa `approvalTransitions` trong `src/lib/m29/rules.ts` ở thay đổi này, vì:

1. Hàm dùng chung cho **Platform/Guardrail/Policy** — thêm `activate()`/`cancel()` sẽ đổi hành vi
   của hai đối tượng M29 mà `ETV.P35` không điều chỉnh.
2. Bản authoritative là `M29_AI/08_Source/api/rules.mjs`; sửa port TS mà không sửa bản gốc là phá
   vỡ cam kết "port 1:1" ghi ở đầu file.
3. Vào thời điểm thực hiện có phiên khác đang mở nhánh `feat/m29-giam-sat-su-co` trên cùng vùng mã.

Hệ quả: sau thay đổi này hai giá trị mới **chưa có transition nào sinh ra chúng** — đúng ý định,
đây là bước chuẩn bị schema để BUILD M35 dùng.

**Rollback**: revert commit. Giá trị enum thừa trong PostgreSQL không gây lỗi cho mã cũ; nếu cần gỡ
hẳn khỏi CSDL thì phải tạo type mới và chuyển cột (chỉ làm khi chắc chắn không bản ghi nào mang giá
trị đó) — không cần cho thao tác revert thông thường.
