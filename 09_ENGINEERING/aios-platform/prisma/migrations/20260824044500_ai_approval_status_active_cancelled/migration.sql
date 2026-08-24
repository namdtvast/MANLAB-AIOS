-- AlterEnum
-- Bổ sung 2 trạng thái cho vòng đời bản ghi nền tảng số theo ETV.P35 mục 6:
--   ACTIVE    = Hiệu lực (đã phê duyệt VÀ đã bật giám sát/kết nối) — trạng thái 7
--   CANCELLED = Hủy (bỏ bản ghi trước khi phê duyệt)              — trạng thái 9
-- Thêm giá trị vào enum là thao tác additive: không đổi dữ liệu hiện có, không mất mát.
-- Không dùng giá trị mới trong chính migration này nên ADD VALUE chạy an toàn trong transaction (PostgreSQL 12+).
ALTER TYPE "AIApprovalStatus" ADD VALUE IF NOT EXISTS 'ACTIVE' AFTER 'APPROVED';
ALTER TYPE "AIApprovalStatus" ADD VALUE IF NOT EXISTS 'CANCELLED' AFTER 'ARCHIVED';
