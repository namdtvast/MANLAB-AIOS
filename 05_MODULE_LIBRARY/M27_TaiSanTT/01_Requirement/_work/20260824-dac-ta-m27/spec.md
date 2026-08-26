# M27_TaiSanTT — SPEC kỹ thuật (work-id 20260824-dac-ta-m27)

> Nghiệp vụ (nguồn sự thật): [`../../DacTa.md`](../../DacTa.md). File này chỉ bổ sung phần **kỹ
> thuật** cần cho BUILD: màn hình, API, tiêu chí chấp nhận, NFR — không lặp lại quy tắc nghiệp vụ.
> Nền tảng đích: `09_ENGINEERING/aios-platform` (Next.js App Router + Prisma + server actions),
> theo đúng khuôn M16/M17/M25.

## 1. RECON — hiện trạng

- `[FACT]` Không có `03_MANAGEMENT_SYSTEM/02_P/ETV.P27*` và không có `06_SHARED_RESOURCES/01_Forms/ETV.P.F27*`.
- `[FACT]` `ETV.QM_QuanlyChatluong.md` §9.4 nêu vòng đời dữ liệu và dẫn chiếu "Thủ tục ETV.MP27";
  §7.11 nêu yêu cầu kiểm soát dữ liệu và hệ thống quản lý thông tin.
- `[FACT]` `ETV.P02_BaoMat.md` (đã ban hành lần 03) §6.8 quy định kênh trao đổi/lưu trữ điện tử,
  §6.9 xử lý sự cố bảo mật, §6.10 lưu giữ và hủy thông tin (hủy hồ sơ quan trọng phải được phê duyệt
  và có bằng chứng) — M27 phải tuân, không viết lại.
- `[FACT]` `04_PROCESS_LIBRARY/MP27_TaiSanTT/manifest.yaml`: `capabilities: [CAP-28]`, `module: M27`,
  `standards: ['ISO27001']`, `menu_group: DU_LIEU_SO`, `menu_order: 4`, `owner: "(cập nhật)"`.
- `[FACT]` `CAP-28_ATTT` gồm MP27, MP28, MP31, MP33, MP34, MP37 → sáu module chia nhau năng lực này;
  chỉ M02 đã có đặc tả thật, M28/M33/M34/M37 vẫn là khung template.
- `[FACT]` `05_MODULE_LIBRARY/M26_TriThuc/01_Requirement/DacTa.md` đã tham chiếu thang phân loại
  "kế thừa của M02/M27" — M27 là nơi phải định nghĩa thang đó.
- `[FACT]` `05_MODULE_LIBRARY/M27_TaiSanTT/08_Source/` trống; `prisma/schema.prisma` không có model
  tiền tố `M27`; module ngoài `ACTIVE_MODULE_CODES` trong `prisma/seed.ts` là `COMING_SOON`.
- `[FACT]` Khuôn đã dùng ở M16/M17/M25: model và enum tiền tố `Mxx…`, vai trò dùng bộ tài khoản demo
  `QLCL` / `TP` / `LDV`, mọi chuyển trạng thái đi qua `src/lib/mxx/actions.ts` + `rules.ts` + `labels.ts`.
- `[ASSUMPTION]` Cần thêm hai vai trò chưa có trong bộ demo: **QT hệ thống** và **Phụ trách ATTT**
  (có thể kiêm nhiệm) — ảnh hưởng tới seed tài khoản và ma trận phân quyền của nền tảng.
- `[QUESTION]` 8 câu hỏi chốt — xem `DacTa.md` mục 10 (đặc biệt câu 3: ranh giới với M34).

## 2. Màn hình (UI)

| # | Màn hình | Đường dẫn dự kiến | Vai trò | Nội dung chính |
|---|---|---|---|---|
| 1 | Danh mục tài sản thông tin | `/modules/M27` | Nội bộ (lọc theo phân loại) | Bảng kiểm kê: mã, tên, nhóm dữ liệu, phân loại, CIA, chủ sở hữu, hệ thống, trạng thái; ba cờ đến hạn; nút "Khai báo tài sản" |
| 2 | Chi tiết tài sản | `/modules/M27/asset/[id]` | Nội bộ (theo phân quyền) | Thuộc tính quản trị + **hộp quy tắc xử lý áp dụng** cho mức phân loại; lịch sử chia sẻ, sao lưu, hủy; thanh hành động theo trạng thái + vai trò |
| 3 | Bảng quy tắc xử lý | `/modules/M27/rules` | Nội bộ (đọc) · QLCL/ATTT (soạn) · LĐV (duyệt) | Ma trận **mức phân loại × hành động**, phiên bản hiện hành và lịch sử |
| 4 | Chia sẻ dữ liệu | `/modules/M27/sharing` | TP, QLCL, LĐV | Đề nghị/phê duyệt/thu hồi; cảnh báo bản chia sẻ hết hạn chưa thu hồi |
| 5 | Hủy dữ liệu | `/modules/M27/disposal` | QLCL, QT hệ thống, LĐV | Lập biên bản, phê duyệt trước, ghi nhận thực hiện kèm bằng chứng |
| 6 | Bảng đến hạn | `/modules/M27/due` | QLCL, QT hệ thống, LĐV | 3 tab: đến hạn rà soát · đến hạn kiểm tra khôi phục · đến hạn hủy |
| 7 | Dữ liệu cá nhân | `/modules/M27/personal-data` | QLCL, LĐV | Tài sản có dữ liệu cá nhân, căn cứ xử lý, thời hạn lưu (NĐ 13/2023) |

Quy ước hiển thị: nhãn tiếng Việt tập trung ở `labels.ts`; tài sản **Mật** ẩn hẳn khỏi danh sách với
vai trò không được phép (không hiện tên rồi chặn khi bấm); mức phân loại hiển thị dạng nhãn màu
thống nhất trên toàn nền tảng để các module kế thừa dùng lại.

## 3. API / server action

| Hành động | Vai trò | Gate chính |
|---|---|---|
| `createAsset` / `updateAsset` | TP, QT hệ thống | Bắt buộc `owner`; dạng điện tử ⇒ `custodian` + `system_ref`; hồ sơ ⇒ `retention_ref` → M15 (quy tắc 8) |
| `reclassify` | TP đề nghị + **LĐV** duyệt | Chặn hạ mức dữ liệu khách hàng nếu thiếu căn cứ công bố (quy tắc 3); ghi `AuditLog` trước → sau |
| `submitForReview` | Người lập | Đủ trường bắt buộc theo `asset_type` |
| `review` (Đạt / Không đạt) | Phụ trách ATTT ≠ người lập | Không đạt ⇒ bắt buộc lý do |
| `approve` (Đạt / Không đạt) | **LĐV** | Chặn khi: thiếu `owner`; `contains_personal_data` thiếu `legal_basis`/thời hạn vô hạn (quy tắc 4); `cia_a = Cao` mà `backup_required = false` (quy tắc 7) |
| `markReviewed` | TP (`owner`) | Chỉ tài sản Đang sử dụng |
| `recordRestoreTest` | QT hệ thống (`custodian`) | Bắt buộc bằng chứng; cập nhật `last_restore_test_at` |
| `transferOwner` | QLCL | Bắt buộc người nhận đang làm việc; ghi lý do (thường ← M03) |
| `retireAsset` | TP (`owner`), QLCL | Bắt buộc lý do → Ngừng sử dụng |
| `setAiUse` | QLCL + QT hệ thống | Chỉ bật khi `classification ∈ {Công khai, Nội bộ}` và tài sản Đang sử dụng (quy tắc 12) |
| `createSharing` / `approveSharing` | TP tạo · **LĐV** duyệt | Chặn nếu tài sản không ở Đang sử dụng; dữ liệu khách hàng/cá nhân ⇒ bắt buộc `disclosure_ref` → M02 (quy tắc 6) |
| `revokeSharing` | QT hệ thống, LĐV | Bắt buộc lý do; tự nhắc khi quá `valid_until` |
| `createDisposal` / `approveDisposal` | QLCL, QT hệ thống tạo · **LĐV** duyệt | Chỉ tài sản Ngừng sử dụng **và** hết thời hạn lưu (quy tắc 9) |
| `executeDisposal` | QT hệ thống | `approved_at` phải có trước; `witness ≠ executed_by`; bắt buộc `evidence_ref`; tài sản → Đã hủy |
| `draftRules` / `approveRules` | QLCL, ATTT soạn · **LĐV** duyệt | Phê duyệt ⇒ phiên bản cũ Hết hiệu lực + gắn cờ rà soát cho tài sản bị ảnh hưởng (quy tắc 2) |
| `listAudit` | Quản trị | Chỉ đọc; gồm lượt truy cập tài sản Hạn chế/Mật |

Vi phạm gate ⇒ trả lỗi nghiệp vụ có mã (khuôn REST tương đương: `409` + mã lỗi). **Không có** server
action xóa `InfoAsset`.

## 4. Tiêu chí chấp nhận (AC)

| # | Tiêu chí | Cách verify |
|---|---|---|
| AC1 | Tài sản không có `owner` ⇒ chặn gửi soát xét và chặn phê duyệt | Thao tác UI 2 chiều |
| AC2 | Tài sản điện tử thiếu `custodian`/`system_ref` ⇒ chặn lưu | Thao tác UI 2 chiều |
| AC3 | Dữ liệu khách hàng đặt mức Nội bộ/Công khai không có căn cứ ⇒ bị chặn; có `disclosure_ref` ⇒ cho phép | Thao tác UI 2 chiều |
| AC4 | `contains_personal_data = true` thiếu `legal_basis` hoặc thời hạn lưu vô hạn ⇒ chặn phê duyệt | Thao tác UI 2 chiều |
| AC5 | `cia_a = Cao` mà `backup_required = false` ⇒ chặn phê duyệt | Thao tác UI 2 chiều |
| AC6 | Màn hình chi tiết hiển thị đúng bộ quy tắc xử lý của mức phân loại hiện tại; đổi mức ⇒ bộ quy tắc đổi theo | So sánh 2 tài sản khác mức |
| AC7 | Phê duyệt phiên bản bảng quy tắc mới ⇒ phiên bản cũ Hết hiệu lực, tài sản bị ảnh hưởng gắn cờ cần rà soát | Kiểm tra UI + DB |
| AC8 | Chia sẻ dữ liệu khách hàng thiếu `disclosure_ref` ⇒ LĐV không phê duyệt được | Thao tác UI 2 chiều |
| AC9 | Bản chia sẻ quá `valid_until` hiện cảnh báo thu hồi; sau khi thu hồi thì mất cảnh báo | Dữ liệu seed có bản quá hạn |
| AC10 | Lập biên bản hủy cho tài sản **Đang sử dụng** hoặc chưa hết thời hạn lưu ⇒ bị chặn | Thao tác UI 2 chiều |
| AC11 | `executeDisposal` khi chưa được phê duyệt, hoặc `witness = executed_by`, hoặc thiếu bằng chứng ⇒ bị chặn; thực hiện hợp lệ ⇒ tài sản → **Đã hủy** và bản ghi vẫn tra cứu được | Thao tác UI + kiểm tra DB |
| AC12 | Không có bất kỳ đường nào xóa bản ghi tài sản (kể cả API trực tiếp) | Rà soát server action + thử gọi |
| AC13 | Tài sản **Mật** không hiển thị với vai trò không được phép; lượt xem hợp lệ vào nhật ký | Đăng nhập 2 vai trò + xem AuditLog |
| AC14 | Ba bảng đến hạn (rà soát/khôi phục/hủy) hiển thị đúng; ghi nhận rà soát hoặc kiểm tra khôi phục ⇒ mục rời khỏi bảng | Dữ liệu seed có mục quá hạn và chưa quá hạn |
| AC15 | Bật `ai_use_allowed` cho tài sản **Hạn chế** hoặc **Mật** ⇒ bị chặn (`ETV.P28` mục 6.7) | Thử cả 4 mức phân loại |
| AC16 | Mọi chuyển trạng thái và mọi lần đổi mức phân loại ghi `AuditLog` đủ ai/khi nào/trước→sau/lý do | Xem nhật ký sau chuỗi thao tác |

## 5. NFR

- **Ghi vết**: `AuditLog` append-only; ghi cả lượt **đọc** với tài sản Hạn chế/Mật; đổi mức phân
  loại luôn lưu giá trị trước → sau kèm người duyệt.
- **Không xóa**: tầng dữ liệu không có thao tác xóa `InfoAsset`, `DataSharing`, `DisposalRecord`.
- **Phân quyền**: kiểm tra vai trò **và** mức phân loại ở server action; lọc ngay ở tầng truy vấn.
- **Nhất quán luật**: quy tắc xử lý đọc từ phiên bản `ClassificationRule` **đang hiệu lực**, không
  hard-code trong UI — đổi luật không cần sửa mã.
- **Thang phân loại dùng chung**: enum `Classification` khai báo **một lần** ở `src/lib/m27` và được
  M26/M14/M15/M34 import lại; không nhân bản enum ở module khác.
- **Truy vết chéo**: liên kết sang M02/M03/M14/M15/M33/M28 dùng khóa ngoại thật với module đã ACTIVE;
  với module chưa xây (M28, M33, M34) lưu tham chiếu mềm + cảnh báo, chuyển thành FK khi module lên.
- **Ngôn ngữ**: nhãn/thông báo tiếng Việt; enum lưu tiếng Anh trong DB theo khuôn M16/M17.
- **Hiệu năng**: danh mục phân trang ≥ 50 dòng/trang; ba cờ đến hạn là **tính khi đọc** (derived),
  không lưu cột — thống nhất với M04/M17/M20/M25/M26.

## 6. Rủi ro của chính đặc tả này

| Rủi ro | Mức | Giảm nhẹ |
|---|---|---|
| Thủ tục `ETV.P27` khi ban hành khác đặc tả suy dẫn | **Cao** | BUILD chỉ bắt đầu sau khi chốt 8 câu hỏi ở DacTa mục 10; gom quy tắc `[SUY DẪN]` vào `rules.ts` |
| Chồng lấn kiểm kê với **M34_DuLieuSo** (cả hai cùng "danh mục dữ liệu") | **Cao** | Câu hỏi 3 phải chốt trước khi xây M34; ranh giới đã ghi ở DacTa mục 1 |
| Thang phân loại đổi sau khi M26 đã dùng | Trung bình | Enum khai báo một lần ở M27, M26 import lại (NFR) ⇒ đổi một chỗ |
| Danh mục kiểm kê phình to rồi không ai rà soát | **Cao** | Bắt buộc `owner` là cá nhân + ba bảng đến hạn + cảnh báo leo thang lên LĐV |
| Kiểm kê kỳ đầu tốn công, dễ bỏ dở | Trung bình | Câu hỏi 8: bắt đầu từ dữ liệu khách hàng và dữ liệu kết quả đo |
| Ràng buộc rủi ro M28 (quy tắc 10) không thực thi được vì M28 chưa xây | Trung bình | Giai đoạn đầu là cảnh báo mềm, chuyển chặn cứng khi M28 lên nền tảng |
| Vai trò **QT hệ thống** và **Phụ trách ATTT** chưa tồn tại trên nền tảng | Trung bình | Increment 1 bổ sung vai trò + tài khoản demo trước khi làm gate |
