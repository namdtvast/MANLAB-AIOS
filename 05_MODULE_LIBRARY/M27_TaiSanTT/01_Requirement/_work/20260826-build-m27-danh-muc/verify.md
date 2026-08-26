# M27_TaiSanTT — VERIFY (work-id 20260826-build-m27-danh-muc)

Trạng thái dùng đúng 5 giá trị: `PASS / FAIL / NOT RUN / NOT APPLICABLE / BLOCKED`.
Mọi `PASS` kèm bằng chứng là lệnh đã chạy hoặc thao tác thật, không suy luận.

## RECON đã sửa lại kế hoạch ở 4 điểm

Ba giả định của `plan.md` sai sau khi khảo sát nền tảng thật — sửa trước khi viết mã:

| Giả định ban đầu | Thực tế | Hệ quả |
|---|---|---|
| Phải **khai enum `Classification`** dùng chung ở `src/lib/m27` | Enum đã có sẵn trong `schema.prisma`, kèm comment *"M27 dùng lại enum này khi lên nền tảng"* | Dùng lại, không khai mới |
| Phải **thêm vai trò** QTHT và PT.ATTT (điều kiện STOP số 1, Tier L) | Đã tồn tại qua `ModuleRoleAssignment` với vocabulary chung `TP/QTHT/ATTT/QLCL/VP/LDV` | **Không** chạm ma trận phân quyền ⇒ giữ Tier M, không phải hỏi người dùng |
| Liên kết M33 bằng **FK thật** | Nền tảng **không dùng FK chéo module** — chỉ ref mềm `String[]` | `systemRefs`, `riskRefs`, `datasetRefs` là ref mềm |
| `vitest.config.ts` không tồn tại | Có, đã cấu hình alias `@` và CI chạy `npm test` | Test viết theo khuôn sẵn, chạy được trong CI |

Ngoài ra phát hiện một lỗi **do chính đợt phê duyệt P27/P28 gây ra**: manifest ghi
`doc_status: Da-phe-duyet`, trong khi `CanCuBanner.tsx` chỉ ánh xạ `issued`/`draft` và 13 thủ tục đã
ban hành khác đều dùng `issued`. Hậu quả: huy hiệu "Đang hiệu lực" không hiện. Đã sửa cả MP27 và
MP28 về `issued` — xác minh bằng ảnh chụp banner ở mục dưới.

## Kết quả

| # | Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|---|
| 1 | Schema hợp lệ | **PASS** | `prisma validate` → "The schema at prisma/schema.prisma is valid 🚀" |
| 2 | Migration **chỉ thêm**, không phá huỷ dữ liệu | **PASS** | `20260826141313_m27_tai_san_tt/migration.sql`: 4 `CREATE TABLE`, 0 kết quả khi grep `DROP\|ALTER COLUMN\|DELETE FROM\|TRUNCATE` |
| 3 | Typecheck | **PASS** | `tsc --noEmit` — 0 lỗi trong `src/lib/m27` và `modules/M27`; lỗi duy nhất còn lại là `src/app/layout.tsx(32,50) LayoutProps` **có sẵn từ trước**, không thuộc phạm vi |
| 4 | Lint | **PASS** | `eslint src/lib/m27 "src/app/(platform)/modules/M27"` — không có cảnh báo |
| 5 | Unit test rules | **PASS** | 37 test mới, phủ 8 điều kiện chặn + chuỗi trạng thái + cờ tính khi đọc |
| 6 | Toàn bộ test nền tảng không hồi quy | **PASS** | `npm test` → 20 file, **375 test** đều xanh |
| 7 | Seed chạy sạch | **PASS** | `tsx prisma/seed.ts` xong; truy vấn DB: M27 `ACTIVE` · 3 tài sản · **32 dòng quy tắc, đúng 4 ô CẤM** · 5 gán vai trò · bảng quy tắc phiên bản 1 `DA_PHE_DUYET` |
| 8 | `validate_links.py` (bắt buộc khi đụng module) | **PASS** | 564 link · 46 MP · 38 M · 22 CAP — 0 vấn đề |
| 9 | `validate_citations.py --chan` | **PASS** | 822 trích dẫn điều khoản — 0 hỏng |

## Verify trên ứng dụng thật (không phải chỉ unit test)

Đăng nhập vai trò **LĐV** tại dev server, quan sát trực tiếp:

| AC | Nội dung | Trạng thái | Quan sát được |
|---|---|---|---|
| — | Module hiện trong menu, đúng nhóm `DU_LIEU_SO`, chấm xanh ACTIVE | **PASS** | Sidebar: "M27 Quản trị dữ liệu và tài sản thông tin" |
| — | Banner căn cứ đọc từ manifest | **PASS** | "Căn cứ: ETV.P27 · lần ban hành 01 · ngày 26/08/2026 · **Đang hiệu lực**" + 3 biểu mẫu F27.01–03 |
| AC14 | Ba cờ đến hạn tính khi đọc | **PASS** | TS-001 *Quá hạn kiểm chứng phục hồi* (Sẵn sàng=Cao ⇒ chu kỳ 6 tháng, lần cuối cách 8 tháng) · TS-002 *Đến hạn rà soát* (Mật + dữ liệu cá nhân ⇒ 6 tháng, cách 9 tháng) · TS-003 *Cho phép dùng cho AI* |
| AC6 | Chi tiết tài sản hiển thị đúng bộ quy tắc của **mức phân loại hiện tại** | **PASS** | Trang TS-2026-002 (Mật) liệt kê đủ 8 hành động, trong đó **3 ô CẤM**: Mang ra ngoài Viện · Lưu trên thiết bị cá nhân · Đưa vào chỉ mục AI |
| AC16 | Gate chạy **ở server action**, không chỉ ở giao diện | **PASS** | Bấm "Ghi nhận đã rà soát" với vai trò LĐV (không phải chủ sở hữu, không phải QLCL) → giao diện hiện đúng thông báo của `rules.ts`: *"Chỉ chủ sở hữu tài sản hoặc QLCL ghi nhận rà soát định kỳ (ETV.P27 §6.8)."* |
| — | Bảng đến hạn 4 nhóm | **PASS** | Đúng 1 dòng rà soát, 1 dòng kiểm chứng phục hồi, 0 ngừng sử dụng, 0 vô chủ |
| — | Bảng quy tắc xử lý (F27.02) | **PASS** | Ma trận 8×4 đầy đủ, 4 ô CẤM tô đỏ |

## Chưa verify — nêu rõ, không quy tròn thành đã xong

| Hạng mục | Trạng thái | Vì sao |
|---|---|---|
| AC13 — tài sản **Mật** ẩn với vai trò không được phép | **NOT RUN** | Mã đã lọc ở cả trang danh mục và trang chi tiết (`canSeeSecret`), nhưng chưa đăng nhập bằng vai trò TP/QTHT để quan sát tận mắt |
| AC3 — chặn hạ mức phân loại thiếu căn cứ | **PASS (unit)** · **NOT RUN (UI)** | Có test cho `approvalIssues`; chưa thao tác hai chiều trên giao diện |
| Ghi lượt **đọc** tài sản Hạn chế/Mật vào nhật ký | **NOT RUN** | Đặc tả yêu cầu (NFR mục 5); lần này mới ghi nhật ký thao tác **ghi**, chưa ghi lượt đọc |
| AC8–AC12 (chia sẻ, huỷ dữ liệu) | **NOT APPLICABLE** | Ngoài phạm vi lần này — xem `outcome.md`; chia sẻ thuộc ETV.P34 |
| Xuất PDF/Excel F27.01, F27.02 | **NOT APPLICABLE** | Ngoài phạm vi lần này |

## Nợ kỹ thuật đã ghi trong mã

- `loadAssetForRules` đang suy ra `ownerActive` bằng "bản ghi User còn tồn tại" vì nền tảng chưa có
  cờ nhân sự đã nghỉ việc. Khi M03 cấp trạng thái nhân sự, đây là **chỗ duy nhất** phải sửa để cờ
  *Tài sản vô chủ* và điều kiện chặn số 1 phản ánh đúng thực tế (ETV.P27 §6.8).
- `CLASSIFICATION_LABEL` vẫn nằm ở `src/lib/m34/labels.ts` (M33 cũng import chéo từ đó). Theo P27
  §6.2 thì **M27 mới là chủ sở hữu thang phân loại**, nên nhãn nên chuyển về `src/lib/m27/labels.ts`
  và để M33/M34 import ngược lại — việc này đụng hai module khác nên tách commit riêng.
