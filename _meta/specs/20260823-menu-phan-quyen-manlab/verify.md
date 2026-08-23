# Verification Report — Increment 1 (khung menu theo nhóm)

Phạm vi: [plan.md](plan.md) Increment 1 — nhóm 38 module thành 8 nhóm nghiệp vụ, **chưa** lọc
theo quyền. Mọi người dùng vẫn thấy đủ 38 module như trước.

## Đã làm

| # | Thay đổi | File |
|---|---|---|
| 1 | Thêm `menu_group` + `menu_order`, nâng `schema` → `manlab-aios/process@1.1` | 38 × `04_PROCESS_LIBRARY/MPxx_*/manifest.yaml` |
| 2 | Ghi nhận 2 khóa mới vào lược đồ Hub | `_meta/SCHEMA.md` |
| 3 | `PlatformModule` thêm `menuGroup`/`menuOrder` (nullable) | `prisma/schema.prisma` |
| 4 | Migration cộng thêm 2 cột | `prisma/migrations/20260823134910_menu_group_platform_module/` |
| 5 | Seed đọc `menu_group`/`menu_order` từ manifest, cảnh báo + xếp nhóm mặc định nếu thiếu/sai | `prisma/seed.ts` |
| 6 | Nhãn + thứ tự hiển thị của nhóm (chỉ phần trình bày) | `src/lib/menu.ts` *(mới)* |
| 7 | Sidebar render theo nhóm, nhóm rỗng biến mất, giữ nguyên ô tìm kiếm và chấm "Đang chạy" | `src/components/Sidebar.tsx` |

## Kết quả kiểm chứng

| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| Toàn vẹn liên kết repo | **PASS** | `python3 _meta/validate_links.py` → `Đã kiểm tra 377 link · 38 MP · 38 M · 22 CAP. Vấn đề: 0` |
| Migration áp được | **PASS** | `npx prisma migrate dev` → `Applying migration 20260823134910_menu_group_platform_module`; SQL đúng 2 cột `ADD COLUMN`, không có `DROP`/`ALTER TYPE` |
| Seed nạp đủ | **PASS** | `npx tsx prisma/seed.ts` → `Đã nạp 38 module`, **không** có cảnh báo `[menu]` nào ⇒ cả 38 manifest khai hợp lệ |
| Dữ liệu nhóm trong DB | **PASS** | Truy vấn `platformModule`: 38 module, 0 module thiếu `menuGroup`; đúng 7 nhóm với số lượng 8/5/3/8/5/5/4 |
| Type-check phần đã sửa | **PASS** | `npx tsc --noEmit` → đúng **1** lỗi, nằm ở `src/lib/m14/actions.ts` (xem "Ngoài phạm vi"); 0 lỗi ở file thuộc increment này |
| Lint phần đã sửa | **PASS** | `npx eslint src/components/Sidebar.tsx src/lib/menu.ts prisma/seed.ts` → sạch |
| `npm run build` | **PASS** | Sau khi M14 hoàn tất và được commit (`cc98033`): `✓ Compiled successfully`, `Finished TypeScript`, `Generating static pages (35/35)`, 0 lỗi |
| Sidebar render theo nhóm | **PASS** | Trình duyệt thật, `http://localhost:3000`: 7 `<section>`, tổng 38 liên kết module, đúng thứ tự khai trong manifest (vd Chuỗi kỹ thuật: M09 M08 M10 M18 M11 M19 M23 M20 — theo dòng chảy nghiệp vụ, không theo số Mxx) |
| Lọc tìm kiếm giữ nguyên hành vi | **PASS** | Gõ "chất chuẩn" → còn 2 nhóm (`Nguồn lực: M05`, `Chuỗi kỹ thuật: M19 M23`), 5 nhóm rỗng biến mất |
| Thông báo khi không khớp | **PASS** | Gõ thêm "zzz" → 0 nhóm, hiện "Không tìm thấy module phù hợp." |
| Lỗi console | **PASS** | Chỉ có lỗi WebSocket HMR của tiến trình dev server cũ đã bị dừng; không có lỗi ứng dụng |
| Lọc theo quyền | **NOT APPLICABLE** | Ngoài phạm vi Increment 1 — thuộc Increment 3 |

## Ghi chú thi công song song

Increment này được thực hiện đồng thời với một phiên khác đang xây **M14_TaiLieu** trên cùng cây
làm việc. Ở thời điểm chạy verify lần đầu, `npm run build` dừng ở lỗi kiểu chưa hoàn thiện của
họ (`src/lib/m14/actions.ts(165,5)` — thiếu `createdById`), nên tạm dùng `npx tsc --noEmit` toàn
dự án để chứng minh lỗi khu trú đúng ở M14 và không có lỗi nào ở phần của increment này.

M14 sau đó hoàn tất và được commit (`cc98033`). Đã **chạy lại `npm run build` → PASS** với cả
hai phần cùng trong cây; hạng mục này không còn treo.

Ghi chú: tiến trình `next dev` cũ (PID 80311, do phiên kia khởi động) giữ Prisma client sinh
trước khi thêm cột nên trả về `menuGroup = null`, làm cả 38 module rơi vào nhóm mặc định. Đã
khởi động lại dev server; sau đó hiển thị đúng. Không phải lỗi mã nguồn.

## Điểm lệch so với PLAN (Spec Drift)

PLAN Increment 1 có gạch đầu dòng *"thêm mục 'Việc của tôi' (rỗng ở bước này)"*. **Không làm** —
một mục menu dẫn tới trang rỗng vi phạm chính nguyên tắc increment ("mỗi bước có kết quả dùng
được ngay"). Hai ngăn tạo nên giá trị của nó (*Tôi cần soát xét*, *Tôi cần phê duyệt*) đều cần
lớp quyền của Increment 3. Đã chuyển mục này sang Increment 3; `plan.md` đã cập nhật.
