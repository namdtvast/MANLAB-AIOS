# VERIFY — M03 K2/K3/K4

Chạy ngày 31/08/2026 tại `09_ENGINEERING/aios-platform` sau `npm ci` (exit 0) và `npx prisma generate`.

## Acceptance Criteria

| # | Tiêu chí | Kết quả | Evidence |
|---|---|---|---|
| AC1 | Schema hợp lệ, client sinh được | **PASS** | `npx prisma validate` → *"The schema at prisma/schema.prisma is valid 🚀"* · `npx prisma generate` → *"✔ Generated Prisma Client (7.9.1)"* |
| AC2 | Migration chỉ toàn lệnh cộng thêm | **PASS** | `migration.sql`: 2 × `CREATE TYPE`, 1 × `ALTER TABLE … ADD COLUMN`, 1 × `CREATE TABLE`, 2 × `CREATE UNIQUE INDEX`, 1 × `ADD CONSTRAINT`, 1 × `UPDATE`. Không có `DROP`, không đổi cột sẵn có sang `NOT NULL` |
| AC3 | Bản ghi cũ không rơi về `DRAFT` | **PASS** | Dòng cuối `migration.sql`: `UPDATE "M03Employee" SET "recordStatus" = 'APPROVED';` |
| AC4 | Nhân sự sinh từ tuyển dụng mang `APPROVED` | **PASS** | `src/lib/m03/actions.ts` — `fulfillRecruitmentPlan()` ghi `recordStatus: "APPROVED"`; `prisma/seed.ts` emp1 tương tự |
| AC5 | 12 lĩnh vực có nhãn tiếng Việt | **PASS** | `src/lib/m03/__tests__/labels.test.ts` — 6 test mới, kiểm cả chiều thiếu nhãn lẫn chiều nhãn thừa |
| AC6 | Không hồi quy | **PASS** | `npm test` → 25 file / **504 test** xanh (baseline trước khi sửa: 24 file / 498 test) |
| AC7 | Cấu trúc repo nguyên vẹn | **PASS** | `python3 _meta/validate_links.py` → *"Đã kiểm tra 567 link · 46 MP · 38 M · 22 CAP. Vấn đề: 0"* |

## Kiểm tra bổ sung

| Hạng mục | Kết quả | Evidence |
|---|---|---|
| Build | **PASS** | `npm run build` → *"✓ Compiled successfully"*, 90/90 trang tĩnh sinh xong |
| Lint | **PASS** | `npm run lint` → 0 error, 2 warning **có sẵn từ trước** (`seed.ts:2640`, `:2648` — biến không dùng, ngoài phạm vi sửa) |
| HDSD | **PASS** | `npm run kiem-tra-hdsd` → 18 file HDSD hợp lệ. `M03/04_UI/HDSD.yaml` **không đổi** — increment này không thêm bước thao tác nào cho người dùng |
| Trích dẫn điều khoản | **PASS** | `python3 _meta/validate_citations.py --chan` → exit 0 |
| Không lọt dữ liệu cá nhân | **PASS** | Seed dùng tên hư cấu có sẵn từ trước (Nguyễn Văn An, Trần Thị Bích); `legacyCode` seed là `P. ĐL01`/`VP07` — mã minh hoạ, không lấy từ bản kết xuất ManLab |

## NOT RUN — nêu rõ, không quy tròn thành hoàn tất

| Hạng mục | Trạng thái | Vì sao |
|---|---|---|
| `prisma migrate deploy` trên CSDL thật | **NOT RUN** | Phiên này không có `DATABASE_URL` và không truy cập được VPS. Migration mới chỉ được **sinh và đọc**, chưa từng chạy trên Postgres |
| `prisma db seed` trên CSDL trắng | **NOT RUN** | Cùng lý do. Nghĩa là `fields: { create: [...] }` trong seed chưa được chứng minh bằng lần chạy thật — grep và typecheck **không** thay thế được việc này |
| Kiểm giao diện | **NOT APPLICABLE** | Increment không đụng file UI nào |

**Hai mục NOT RUN là việc người dùng phải chạy trên môi trường có CSDL**, theo thứ tự:

```bash
npx prisma migrate deploy
npx prisma db seed
```

Chạy `migrate deploy` **trước** khi nhập dữ liệu ManLab — lý do ghi ngay đầu `migration.sql`.

## Diff review

6 file sửa (+131 −1), 3 thư mục mới. Dòng `−1` duy nhất là dòng `status` cũ bị thay bằng khối có chú thích. Không refactor ngoài phạm vi, không đổi dependency, không đụng `rules.ts` / `f03-08.ts` / file UI — đúng ràng buộc phạm vi tại `spec.md`.
