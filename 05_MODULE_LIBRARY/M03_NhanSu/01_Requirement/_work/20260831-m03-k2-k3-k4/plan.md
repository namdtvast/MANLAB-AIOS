# PLAN — M03 K2/K3/K4

## File bị ảnh hưởng

| File | Thay đổi |
|---|---|
| `prisma/schema.prisma` | +2 enum, +1 model, +2 trường, +1 quan hệ |
| `prisma/migrations/20260831*_m03_k2_k3_k4/migration.sql` | Migration mới |
| `prisma/seed.ts` | 2 nhân sự demo: thêm `legacyCode`, `recordStatus`, lĩnh vực |
| `src/lib/m03/actions.ts` | `fulfillRecruitmentPlan` ghi `recordStatus: APPROVED` |
| `src/lib/m03/labels.ts` | Nhãn tiếng Việt cho 2 enum mới |
| `05_MODULE_LIBRARY/M03_NhanSu/01_Requirement/DacTa.md` | Hợp nhất kết luận đặc tả |
| `05_MODULE_LIBRARY/M03_NhanSu/03_Database/DataModel.md` | K2/K3/K4 chuyển sang "đã chốt" |

**Không đổi:** `rules.ts`, `f03-08.ts`, `HDSD.yaml`, mọi file UI — xem "Ràng buộc phạm vi" trong `spec.md`.

## Increment

| # | Nội dung | Revert độc lập |
|---|---|---|
| 1 | Schema + migration + `prisma generate` | ✔ |
| 2 | Seed + `actions.ts` + `labels.ts` | ✔ |
| 3 | Tài liệu đặc tả (`DacTa.md`, `DataModel.md`) | ✔ |

## Migration — expand, không contract

Toàn bộ là lệnh cộng thêm:

```sql
CREATE TYPE "M03EmployeeRecordStatus" ...
CREATE TYPE "M03InspectionField" ...
ALTER TABLE "M03Employee" ADD COLUMN "legacyCode" TEXT;
ALTER TABLE "M03Employee" ADD COLUMN "recordStatus" "M03EmployeeRecordStatus" NOT NULL DEFAULT 'DRAFT';
UPDATE "M03Employee" SET "recordStatus" = 'APPROVED';   -- backfill bản ghi có sẵn
CREATE UNIQUE INDEX ... ON "M03Employee"("legacyCode");
CREATE TABLE "M03EmployeeField" ...
```

Không `DROP`, không đổi cột sẵn có sang `NOT NULL`, không xoá dữ liệu → **không phải Tier L**, không cần phê duyệt trước khi chạy.

Câu `UPDATE` là điểm cần chú ý: nó đặt **mọi** bản ghi đang có thành `APPROVED`. Đúng với hiện trạng (2 bản ghi seed demo, đều là hồ sơ thật đã qua tuyển dụng), và vô hại nếu bảng rỗng. Nếu chạy sau khi đã nhập dữ liệu ManLab thì **sai** — 12 bản ghi Nháp/Chờ duyệt/Không duyệt sẽ bị đánh dấu đã duyệt. Vì vậy migration này phải chạy **trước** khi di trú.

## Rollback

- Increment 1: `git revert` + chạy migration nghịch (`DROP TABLE "M03EmployeeField"; ALTER TABLE "M03Employee" DROP COLUMN ...; DROP TYPE ...`). Không mất dữ liệu vì các cột này chưa có dữ liệu nghiệp vụ nào ngoài seed.
- Increment 2, 3: `git revert` thuần.

## Rủi ro

| Rủi ro | Mức | Xử lý |
|---|---|---|
| Migration chạy sau khi nhập dữ liệu ManLab → backfill sai 12 bản ghi | Trung bình | Ghi cảnh báo ngay trong file SQL, không chỉ trong tài liệu |
| `legacyCode` unique đụng nhau khi nhập | Thấp | Mã ManLab không tái sử dụng số; 5/145 bản ghi thiếu mã → để `NULL` |
| Enum 12 lĩnh vực sau này cần thêm | Thấp | Thêm giá trị enum trong Postgres là thao tác cộng thêm, không khoá bảng |

## Không tự chạy trên môi trường thật

`prisma migrate deploy` trên VPS do người dùng chạy — phiên này không có `DATABASE_URL` và không SSH được vào production. Ở đây chỉ sinh và kiểm tra file migration.
