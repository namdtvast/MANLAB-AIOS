# VERIFY — M03 K5

Chạy 31/08/2026 tại `09_ENGINEERING/aios-platform`.

**Khác lần K2/K3/K4: lần này chạy được trên CSDL thật.** Máy có PostgreSQL sẵn, nên tạo một CSDL dùng một lần `aios_k5_verify_tmp`, chạy `migrate deploy` + `db seed` + dựng giao diện trên đó, rồi **xoá cả CSDL lẫn file `.env` tạm**. CSDL `aios_platform_dev` của người dùng **không bị đụng tới** — kiểm bằng `psql -l` trước và sau.

## Acceptance Criteria

| # | Tiêu chí | Kết quả | Evidence |
|---|---|---|---|
| AC1 | Schema hợp lệ, client sinh được | **PASS** | `prisma validate` → *"is valid 🚀"* · `prisma generate` → *"✔ Generated Prisma Client (7.9.1)"* |
| AC2 | Migration chỉ toàn lệnh cộng thêm | **PASS** | 1 × `ADD COLUMN`, 1 × `CREATE TABLE`, 1 × `CREATE UNIQUE INDEX`, 2 × `ADD CONSTRAINT`. Không `DROP`, không `UPDATE`, không backfill |
| AC3 | 5 ca ngày đảo bị bắt | **PASS** | `validateInspectorCard` trả đúng 1 vấn đề nêu *"nhập đảo"*; xác nhận lại trên giao diện thật (xem dưới) |
| AC4 | 4 trạng thái phân biệt đúng, kể cả ở ranh giới | **PASS** | 7 test `inspectorCardState`, có ca đúng thời điểm mốc và ca đúng biên cửa sổ cảnh báo |
| AC5 | Thẻ hiện hành chọn đúng | **PASS** | 3 test `currentInspectorCard` |
| AC6 | Không hồi quy | **PASS** | `npm test` → 26 file / **525 test** (baseline 504, +21 test mới) |
| AC7 | HDSD hợp lệ | **PASS** | `npm run kiem-tra-hdsd` → `M03/04_UI/HDSD.yaml — 8 bước, 2 lưu ý`, 18 file hợp lệ. **Số bước không đổi** (8) — chỉ thêm 1 lưu ý |
| AC8 | Cấu trúc repo nguyên vẹn | **PASS** | `validate_links.py` → 567 link, 0 vấn đề |

## Chạy thật trên CSDL

| Hạng mục | Kết quả | Evidence |
|---|---|---|
| `prisma migrate deploy` | **PASS** | *"All migrations have been successfully applied"* — gồm cả `20260831090000_m03_k2_k3_k4` và `20260831140000_m03_k5_the_kdv` |
| `prisma db seed` | **PASS** | *"🌱 The seed command has been executed"* |
| Dữ liệu đúng như thiết kế | **PASS** | Truy vấn CSDL: `NS-2026-0001 \| P. ĐL01 \| APPROVED \| 0186-01 \| 475/SKHCN \| 2026-03-31 \| 2031-03-31` · `NS-2026-0002 \| VP07 \| PENDING_APPROVAL` (không thẻ) · 2 dòng `M03EmployeeField` đều có `cardId` |
| K3 chứng minh được hai trục độc lập | **PASS** | `NS-2026-0002` mang `status = THUVIEC` **và** `recordStatus = PENDING_APPROVAL` cùng lúc — cặp giá trị mà ManLab không biểu diễn được |

## Kiểm giao diện thật

Dựng dev server, đăng nhập tài khoản demo, mở hồ sơ `NS-2026-0001`.

**Ca 1 — thẻ còn hiệu lực:**
> Năng lực kiểm định · Lĩnh vực được ủy quyền: **Hoá lý (nước) · Hoá lý (khí)** · Thẻ kiểm định viên: **0186-01** · QĐ 475/SKHCN · hạn 31/3/2031 · huy hiệu **Còn hiệu lực**

**Ca 2 — thẻ hết hạn kèm ngày nhập đảo** (sửa thẻ trong CSDL tạm thành đúng dạng lỗi của 5 bản ghi thật: cấp 2031-03-31, hết hạn 2026-03-31):
> huy hiệu **Đã hết hạn** (đỏ) · *"Dữ liệu thẻ cần kiểm tra: ngày cấp không được bằng hoặc sau ngày hết hạn (kiểm tra xem hai ngày có bị nhập đảo không)."* · *"Thẻ hết hiệu lực thì không được sử dụng chuẩn đo lường và không được ký giấy chứng nhận kiểm định (ETV.P05 §6.2, ETV.P11 §6.3)."*

Console: **0 lỗi**. Build: `✓ Compiled successfully`, 90/90 trang.

Đây là bằng chứng cho tiêu chí quan trọng nhất của K5 — *người mở hồ sơ nhân sự **nhìn thấy** thẻ hết hạn mà không phải tự tính ngày*.

## Kiểm tra khác

| Hạng mục | Kết quả |
|---|---|
| Lint | **PASS** — 0 error, 2 warning **có sẵn từ trước** (`seed.ts`, biến không dùng, ngoài phạm vi) |
| Trích dẫn điều khoản | **PASS** — `validate_citations.py --chan` exit 0. `ETV.P05 §6.2` và `ETV.P11 §6.3` là mục đánh số nên công cụ kiểm được thật, không phải kiểm tay |
| Dọn môi trường | **PASS** — `dropdb aios_k5_verify_tmp`, `rm .env`; `psql -l` sau khi dọn còn đúng 5 CSDL như trước |

## NOT RUN / chưa làm — nêu rõ

| Hạng mục | Trạng thái | Ghi chú |
|---|---|---|
| Chặn ký kết quả khi thẻ hết hạn | **NOT APPLICABLE** cho increment này | `canPerformInspection()` đã có và đã test, nhưng nơi chặn thật là M10/M11 — nối dây thuộc increment của hai module đó |
| Cửa sổ cảnh báo 90 ngày | **Chưa có căn cứ thủ tục** | P05 §6.2 và P11 §6.3 không quy định cảnh báo trước bao lâu. Cần LĐP chốt; đổi là sửa một hằng số |
| Di trú 145 bản ghi ManLab | **NOT RUN** | Ngoài phạm vi. Khi làm, 5 bản ghi ngày đảo + 1 thẻ trùng + 1 thẻ thiếu hạn phải xử lý trước hoặc chấp nhận nhập kèm cảnh báo |
| `migrate deploy` trên VPS | **NOT RUN** | Người dùng chạy. Migration này không có câu `UPDATE` nào nên **không phụ thuộc thứ tự** so với việc nhập dữ liệu — khác migration K2/K3/K4 |
