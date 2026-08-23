# M26_TriThuc — VERIFY (BUILD Increment 1–11, ngày 24/08/2026)

Môi trường: worktree riêng trên nhánh `feat/m26-tri-thuc` (base `main`), DB dev riêng
`aios_platform_m26`, dev server `http://localhost:3100`. Không dùng chung DB `aios_platform_dev`
với phiên đang làm M25.

## 1. Kiểm tra tự động

| Hạng mục | Lệnh | Kết quả |
|---|---|---|
| Schema Prisma | `npx prisma validate` | **PASS** — "The schema at prisma/schema.prisma is valid" |
| Migration | `npx prisma migrate dev` | **PASS** — 2 migration mới (`m26_tri_thuc`, `m26_need_target_item`) áp sạch, chỉ thêm bảng/cột |
| Seed | `npx tsx prisma/seed.ts` | **PASS** — 5 mục tri thức, 2 bài học, 2 nhu cầu, 1 hoạt động chia sẻ, vai trò M26 cho 5 tài khoản |
| Kiểu tĩnh | `npx tsc --noEmit` | **PASS** — không lỗi trong mã M26 (còn lỗi `LayoutProps` sẵn có của `src/app/layout.tsx`, không thuộc phạm vi) |
| Lint | `npx eslint src/lib/m26 src/app/(platform)/modules/M26` | **PASS** — không cảnh báo |
| Build | `npm run build` | **PASS** — "Compiled successfully"; 8 route M26 xuất hiện trong bảng route |

## 2. Tiêu chí chấp nhận (thao tác thật trên giao diện, 4 vai trò)

| # | Tiêu chí | Kết quả | Bằng chứng |
|---|---|---|---|
| AC1 | Tri thức hiện thiếu cả nguồn gốc lẫn tài liệu M14 ⇒ chặn lưu; có một trong hai ⇒ lưu được | **PASS** | Lỗi "Tri thức hiện bắt buộc có đường dẫn nội dung gốc hoặc mã tài liệu kiểm soát bên M14"; sau khi điền `sourceRef` tạo được `TT-2026-0012` |
| AC2 | Tri thức ẩn không có người giữ ⇒ chặn lưu | **PASS** | Lỗi "Tri thức ẩn bắt buộc ghi ít nhất 1 người đang giữ tri thức" |
| AC3 | Tri thức ẩn trọng yếu Cao chỉ 1 người giữ ⇒ không phê duyệt được; bổ sung đủ thì duyệt được | **PASS** | LĐV bấm Phê duyệt `TT-2026-0002` → bị chặn kèm nêu rõ còn thiếu gì; sau khi có phiếu chuyển giao `NC-2026-0001` và rủi ro `RR-2026-0001` → `status = APPROVED` trong DB |
| AC4 | TP trùng người lập không soát xét được | **PASS** | TP bấm "Soát xét đạt" trên `TT-2026-0005` (do chính TP lập) → "Người lập không được tự soát xét mục của mình"; soát xét `TT-2026-0011` (QLCL lập) thì đạt |
| AC5 | Chỉ LĐV phê duyệt được | **PASS** | TP bấm Phê duyệt → "Chỉ Lãnh đạo Viện được phê duyệt mục tri thức (ETV.P26 mục 4.1)" |
| AC6 | Phiên bản mới được duyệt ⇒ bản cũ Hết hiệu lực, `supersedes` đúng, bản cũ rời chỉ mục AI | **PASS** | `TT-2026-0011` (v2, supersedes `TT-2026-0003`) được duyệt → `TT-2026-0003` = `RETIRED`, `aiIndexed = false`, có bản ghi nhật ký "Hết hiệu lực do có phiên bản mới được phê duyệt" |
| — | Mục là tài liệu kiểm soát không tự đánh phiên bản (quy tắc 2) | **PASS** | Tạo phiên bản mới trên `TT-2026-0001` (có `docId`) → "phiên bản do MP14 quyết định" |
| AC7 | Không bật được chỉ mục AI cho mục Hạn chế/Mật | **PASS** | QLCL bật chỉ mục cho `TT-2026-0004` (Mật) → "Tri thức mức Hạn chế/Mật không bao giờ được đưa vào chỉ mục trợ lý AI" |
| AC8 | Mục Hạn chế/Mật không hiển thị với vai trò không được phép; lượt xem hợp lệ vào nhật ký | **PASS** | Vai trò Nhân viên: danh mục báo "1 mục không hiển thị", không lộ tiêu đề; mở thẳng URL mục Mật → 404 (chặn ở server). QLCL mở mục Mật → nhật ký có "Xem mục tri thức mức Mật" |
| AC9 | Bảng đến hạn rà soát đúng; xác nhận rà soát làm mục rời bảng | **PASS** | `TT-2026-0003` hiện "1 chu kỳ" quá hạn; sau "Xác nhận đã rà soát" → bảng trống, `lastReviewedAt` cập nhật |
| AC10 | Bài học chưa gắn mục tri thức ⇒ không trình/phê duyệt được | **PASS** | `BH-2026-0001` trình phê duyệt → "Bài học phải gắn với một mục tri thức…"; sau khi gắn `TT-2026-0001` → `CHO_PHE_DUYET` |
| AC11 | Nhu cầu đóng khi thiếu kết quả ⇒ bị chặn | **PASS** | `NC-2026-0001` đóng → "Chỉ đóng ở trạng thái Đã đáp ứng khi có kết quả…"; sau khi ghi hồ sơ đào tạo `PT-2026-0001` → `DA_DAP_UNG` |
| AC12 | Đào tạo nội bộ thiếu hồ sơ M03 ⇒ chặn hoàn thành | **PASS** | `CS-2026-0003` ghi nhận đã thực hiện → "Hình thức Đào tạo nội bộ bắt buộc dẫn chiếu hồ sơ đào tạo bên M03 (F03.05.x)" |
| AC13 | Đóng KPH nặng ở M13 ⇒ M26 tự sinh bài học | **NOT RUN** | Thuộc Increment 12 (hook sang M13/M12/M10/M16) — **ngoài phạm vi** lượt build này theo quyết định giữ PR riêng để revert độc lập |
| AC14 | Mọi chuyển trạng thái ghi nhật ký đủ ai/khi nào/trước→sau/lý do | **PASS** | Bảng `M26AuditEntry`: "LĐV phê duyệt | PENDING_APPROVAL → APPROVED", "Soát xét đạt | PENDING_REVIEW → PENDING_APPROVAL", … |

## 3. Spec drift đã xử lý trong lúc BUILD

**Phiếu nhu cầu chuyển giao không gắn được vào mục đang chờ duyệt.** Bản SPEC dùng chung một trường
`result_ref` cho cả "kết quả bổ sung tri thức" lẫn "phiếu chuyển giao phục vụ gate mục 5.1.6". Ô chọn
kết quả chỉ liệt kê mục **đã phê duyệt**, nên mục tri thức ẩn trọng yếu đang chờ duyệt không bao giờ
gắn được phiếu ⇒ gate khóa vĩnh viễn, không có đường mở.

Đã tách thành hai trường: `targetItemId` (đầu vào — mục tri thức mà nhu cầu nhằm bổ sung/chuyển giao)
và `resultItemId`/`resultTrainingId` (đầu ra khi đóng phiếu). Gate, bảng rủi ro mất tri thức và màn
chi tiết mục tri thức đọc theo `targetItem`.

## 4. Phạm vi chưa làm

| Increment | Nội dung | Lý do |
|---|---|---|
| 12 | Hook mềm từ M13/M12/M10/M16 tự sinh bài học kinh nghiệm | Chạm 4 module đang chạy thật — giữ PR riêng để revert độc lập (AC13 chưa verify được) |
| 13 | Xuất biểu mẫu F26.01–F26.04 và trích xuất báo cáo cho M17 | Tách khỏi PR lõi |
| — | Nạp/gỡ chỉ mục AI thật ở `08_KNOWLEDGE_GRAPH/09_Embedding, 10_Vector_DB` | Thuộc M29; M26 mới quản cờ `aiIndexed` trong DB |
