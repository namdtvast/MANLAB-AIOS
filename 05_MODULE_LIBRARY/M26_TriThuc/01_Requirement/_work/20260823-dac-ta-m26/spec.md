# M26_TriThuc — SPEC kỹ thuật (work-id 20260823-dac-ta-m26)

> Nghiệp vụ (nguồn sự thật): [`../../DacTa.md`](../../DacTa.md). File này chỉ bổ sung phần **kỹ
> thuật** cần cho BUILD: màn hình, API, tiêu chí chấp nhận, NFR — không lặp lại quy tắc nghiệp vụ.
> Nền tảng đích: `09_ENGINEERING/aios-platform` (Next.js App Router + Prisma + server actions),
> theo đúng khuôn M16/M17.

## 1. RECON — hiện trạng

- `[FACT]` Không có `03_MANAGEMENT_SYSTEM/02_P/ETV.P26*` và không có `06_SHARED_RESOURCES/01_Forms/ETV.P.F26*`.
- `[FACT]` `ETV.QM_QuanlyChatluong.md` §9.3 nêu 5 động từ (thu thập · lưu giữ · chia sẻ · cập nhật ·
  khai thác) và dẫn chiếu "Thủ tục ETV.MP26".
- `[FACT]` `04_PROCESS_LIBRARY/MP26_TriThuc/manifest.yaml`: `capabilities: [CAP-25]`, `module: M26`,
  `standards: ['ISO9001']`, `menu_group: NGUON_LUC`, `menu_order: 5`, `owner: "(cập nhật)"`.
- `[FACT]` `02_CAPABILITIES/CAP-25_BoiCanhTriThuc` gồm MP25 + MP26 → M25 và M26 chia đôi năng lực.
- `[FACT]` `08_KNOWLEDGE_GRAPH` đã có sẵn chỗ chứa nội dung: `06_FAQ`, `07_Case_Study`,
  `11_Lessons_Learned`, `14_Technical_References`, `15_HDSD_ThietBi`, `Wiki/` (16 mục),
  `09_Embedding`, `10_Vector_DB` (ba thư mục cuối hiện chỉ có README).
- `[FACT]` M14 (kiểm soát tài liệu) và M03 (đào tạo, có sẵn biểu mẫu F03.05.x) đã ACTIVE trên
  aios-platform ⇒ M26 phải trỏ tới, không dựng lại.
- `[FACT]` `05_MODULE_LIBRARY/M26_TriThuc/08_Source/` trống; `prisma/schema.prisma` không có model
  tiền tố `M26`; `prisma/seed.ts` đặt module ngoài `ACTIVE_MODULE_CODES` là `COMING_SOON`.
- `[FACT]` Khuôn đã dùng ở M16/M17: model tiền tố `Mxx…`, enum tiền tố `Mxx…`, vai trò dùng bộ tài
  khoản demo `QLCL` / `TP` / `LDV`, mọi chuyển trạng thái đi qua server action trong
  `src/lib/mxx/actions.ts` + `rules.ts` (gate) + `labels.ts` (nhãn tiếng Việt).
- `[ASSUMPTION]` M26 là sổ đăng ký metadata, không lưu file nội dung (không có văn bản ban hành nào
  quy định điều này — nhưng trái lại sẽ vi phạm nguyên tắc một nguồn sự thật của repo).
- `[QUESTION]` 8 câu hỏi chốt — xem `DacTa.md` mục 10.

## 2. Màn hình (UI)

| # | Màn hình | Đường dẫn dự kiến | Vai trò | Nội dung chính |
|---|---|---|---|---|
| 1 | Danh mục tri thức | `/modules/M26` | Tất cả (lọc theo bảo mật) | Bảng mục: mã, tên, nhóm, dạng, mức trọng yếu, chủ sở hữu, chu kỳ rà soát, trạng thái; cờ **Đến hạn rà soát**; nút "Thêm mục" (QLCL/TP) |
| 2 | Chi tiết mục tri thức | `/modules/M26/item/[id]` | Tất cả (theo phân quyền) | Metadata + liên kết nguồn (`source_ref`/`doc_ref`), người giữ, lịch sử phiên bản, hoạt động chia sẻ liên quan; thanh hành động theo trạng thái + vai trò |
| 3 | Bài học kinh nghiệm | `/modules/M26/lessons` + `/lessons/[id]` | Tất cả (gửi) · QLCL/TP (xử lý) · LĐV (phê duyệt) | Danh sách theo nguồn phát sinh; form phân tích và gắn mục tri thức |
| 4 | Nhu cầu tri thức | `/modules/M26/needs` | QLCL, TP, LĐV | Danh sách nhu cầu theo `trigger`, hạn, trạng thái; cảnh báo quá hạn |
| 5 | Chia sẻ tri thức | `/modules/M26/sharing` | QLCL, TP | Kế hoạch/biên bản chia sẻ; chọn mục tri thức Đã phê duyệt; liên kết hồ sơ đào tạo M03 |
| 6 | Rủi ro mất tri thức | `/modules/M26/knowledge-risk` | QLCL, LĐV | Mục trọng yếu là tri thức ẩn, `holders ≤ 1`; nút mở rủi ro sang M01 |

Quy ước hiển thị: nhãn trạng thái/enum tiếng Việt tập trung ở `labels.ts`; mục `Đã phê duyệt` hiển
thị **chỉ đọc** (ẩn nút sửa, chỉ còn "Tạo phiên bản mới" / "Xác nhận đã rà soát" / "Tuyên bố hết
hiệu lực"); mục `Hạn chế/Mật` ẩn khỏi danh sách với vai trò không được phép (ẩn hẳn, không hiện
tiêu đề rồi chặn khi bấm).

## 3. API / server action

| Hành động | Vai trò | Gate chính |
|---|---|---|
| `createItem` / `updateItem` | QLCL, TP | Tri thức hiện ⇒ bắt buộc `source_ref`/`doc_ref` (quy tắc 1); tri thức ẩn ⇒ `holders ≥ 1`; chỉ sửa khi chưa phê duyệt |
| `submitForReview` | Người lập | Đủ trường bắt buộc theo `knowledge_form` |
| `review` (Đạt / Không đạt) | TP ≠ người lập | Không đạt ⇒ bắt buộc lý do |
| `approve` (Đạt / Không đạt) | **LĐV** (bắt buộc khi `criticality = Cao`) | **Chặn** khi tri thức ẩn trọng yếu chỉ 1 người giữ mà chưa có liên kết M01 + `KnowledgeNeed` chuyển giao (quy tắc 3) |
| `markReviewed` | TP (`owner`) | Chỉ với mục Đã phê duyệt; cập nhật `last_reviewed_at` |
| `createNewVersion` | QLCL, TP (`owner`) | Chỉ từ mục Đã phê duyệt; `version + 1`, `supersedes_ref`; khi bản mới được duyệt ⇒ bản cũ `Hết hiệu lực` + `ai_indexed = false` **cùng giao dịch** (quy tắc 5) |
| `retireItem` | LĐV, QLCL | Bắt buộc lý do; gỡ chỉ mục AI cùng giao dịch |
| `cancelItem` | LĐV | Chỉ khi chưa phê duyệt; bắt buộc lý do |
| `setAiIndex` | QLCL + Quản trị hệ thống | `status = Đã phê duyệt` **và** `confidentiality ∈ {Công khai, Nội bộ}` (quy tắc 10) |
| `createLesson` / `updateLesson` | Nhân viên (tạo) · QLCL, TP (xử lý) | Bắt buộc `source_type` + `source_ref` |
| `approveLesson` | **LĐV** | **Chặn** nếu thiếu `knowledge_item_ref` (quy tắc 7) |
| `createNeed` / `fulfillNeed` | QLCL, TP | `fulfill` ⇒ bắt buộc `result_ref` (quy tắc 8) |
| `waiveNeed` | **LĐV** | Bắt buộc lý do |
| `planSharing` / `completeSharing` | QLCL, TP | Chỉ chọn mục Đã phê duyệt; `form = Đào tạo nội bộ` ⇒ bắt buộc `evidence_ref` → M03 |
| `listAudit` | Quản trị | Chỉ đọc; gồm cả lượt truy cập mục Hạn chế/Mật |

Vi phạm gate ⇒ trả lỗi nghiệp vụ có mã (khuôn REST tương đương: `409` + mã lỗi), không im lặng bỏ qua.

## 4. Tiêu chí chấp nhận (AC)

| # | Tiêu chí | Cách verify |
|---|---|---|
| AC1 | Tri thức hiện thiếu cả `source_ref` và `doc_ref` ⇒ chặn lưu; có một trong hai ⇒ lưu được | Thao tác UI 2 chiều |
| AC2 | Tri thức ẩn không có người giữ ⇒ chặn lưu | Thao tác UI 2 chiều |
| AC3 | Tri thức ẩn `criticality = Cao` chỉ 1 người giữ, chưa có liên kết M01 + nhu cầu chuyển giao ⇒ **không phê duyệt được**; sau khi bổ sung thì duyệt được | Thao tác UI 2 chiều |
| AC4 | TP trùng người lập **không** soát xét được; TP khác soát xét được | Đăng nhập 2 tài khoản |
| AC5 | Mục `criticality = Cao` chỉ LĐV phê duyệt được (QLCL/TP bị từ chối) | Thử 3 vai trò |
| AC6 | Sau phê duyệt: mục chỉ đọc; tạo phiên bản mới và duyệt ⇒ bản cũ tự `Hết hiệu lực`, `supersedes_ref` đúng, `ai_indexed` bản cũ = false | Kiểm tra UI + DB |
| AC7 | Không bật được `ai_indexed` cho mục chưa phê duyệt hoặc mục Hạn chế/Mật | Thử 4 tổ hợp trạng thái × bảo mật |
| AC8 | Mục Hạn chế/Mật **không hiển thị** với vai trò không được phép và mọi lượt xem hợp lệ đều vào nhật ký | Đăng nhập 2 vai trò + xem AuditLog |
| AC9 | Bảng "Đến hạn rà soát" hiển thị đúng mục quá hạn theo `review_cycle`; `markReviewed` làm mục rời khỏi bảng | Dữ liệu seed có mục quá hạn và chưa quá hạn |
| AC10 | `LessonLearned` chưa gắn mục tri thức ⇒ không phê duyệt được | Thao tác UI 2 chiều |
| AC11 | `KnowledgeNeed` chuyển "Đã đáp ứng" khi thiếu `result_ref` ⇒ bị chặn; "Không thực hiện" chỉ LĐV làm được và bắt buộc lý do | Thao tác UI 2 chiều |
| AC12 | `SharingEvent` không chọn được mục chưa phê duyệt; đào tạo nội bộ thiếu `evidence_ref` ⇒ chặn hoàn thành | Thao tác UI 2 chiều |
| AC13 | Đóng KPH nặng ở M13 ⇒ M26 tự sinh `LessonLearned` trạng thái **Mới**, **không chặn** thao tác của M13 | Thử luồng M13 → xem danh sách M26 |
| AC14 | Mọi chuyển trạng thái ghi `AuditLog` đủ ai/khi nào/trước→sau/lý do | Xem nhật ký sau chuỗi thao tác |

## 5. NFR

- **Ghi vết**: `AuditLog` append-only, không API xóa/sửa; ghi cả lượt **đọc** với mục Hạn chế/Mật.
- **Bất biến hồ sơ**: mục `Đã phê duyệt`/`Hết hiệu lực` không có đường ghi nội dung trong server action.
- **Phân quyền**: kiểm tra vai trò **và** mức bảo mật ở server action, không chỉ ẩn ở UI; truy vấn
  danh sách lọc ngay ở tầng dữ liệu (không lấy hết rồi lọc ở client).
- **Nhất quán chỉ mục AI**: đổi trạng thái + gỡ chỉ mục nằm trong **cùng một giao dịch**; nếu bước
  gỡ thất bại thì rollback cả chuyển trạng thái (thà không đổi trạng thái còn hơn để AI dùng tri
  thức lỗi thời).
- **Truy vết chéo**: liên kết sang M01/M03/M13/M14 dùng khóa ngoại thật với module đã ACTIVE, không
  lưu chuỗi tự do.
- **Không sao chép nội dung**: `summary` giới hạn độ dài (đề xuất ≤ 2.000 ký tự) để chặn thói quen
  dán toàn văn tài liệu vào module.
- **Ngôn ngữ**: toàn bộ nhãn/thông báo tiếng Việt; enum lưu tiếng Anh trong DB theo khuôn M16/M17.
- **Hiệu năng**: danh mục phân trang ≥ 50 dòng/trang; cờ "đến hạn rà soát" là **tính khi đọc**
  (derived), không lưu cột — thống nhất với M04/M17/M20/M25.

## 6. Rủi ro của chính đặc tả này

| Rủi ro | Mức | Giảm nhẹ |
|---|---|---|
| Thủ tục `ETV.P26` khi ban hành khác đặc tả suy dẫn | **Cao** | BUILD chỉ nên bắt đầu sau khi chốt 8 câu hỏi ở DacTa mục 10; gom quy tắc `[SUY DẪN]` vào `rules.ts` để sửa một chỗ |
| M26 bị dùng như kho tài liệu thứ hai (chép nội dung vào) | **Cao** | Quy tắc 1 + giới hạn độ dài `summary` + review khi nhập liệu kỳ đầu |
| Chồng lấn với M27 (tài sản thông tin) khi M27 được xây sau | Trung bình | M26 kế thừa thang bảo mật của M27, không định nghĩa riêng (quy tắc 9); chốt câu hỏi 7 trước khi BUILD M27 |
| Chồng lấn với M14 về phiên bản tài liệu | Trung bình | Quy tắc 2: mục có `doc_ref` không tự đánh phiên bản |
| Chỉ mục AI lệch với danh mục (tri thức lỗi thời vẫn được AI trích dẫn) | **Cao** | Ràng buộc cùng giao dịch (NFR) + AC7 + job đối soát định kỳ giữa `ai_indexed` và chỉ mục thật |
| Biểu mẫu F26.01–F26.04 chưa ban hành ⇒ bản xuất không dùng làm hồ sơ chính thức được | Trung bình | Increment xuất biểu mẫu để sau cùng; trước đó dán nhãn "bản nháp nội bộ" |
