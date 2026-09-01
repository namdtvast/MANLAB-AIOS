-- M29 — bù sáu trường của DANH MỤC HỆ THỐNG AI (ETV.P29 mục 5.1.2 và 6.1, tức phần 1 biểu mẫu
-- ETV.P.F 29.01) mà bảng "AIAgent" chưa có chỗ chứa, xem
-- 05_MODULE_LIBRARY/M29_AI/01_Requirement/_work/20260901-f2901-dang-ky-he-thong-ai/spec.md
--
-- Toàn bộ là lệnh cộng thêm: không DROP, không xoá dữ liệu, không đổi cột sẵn có sang NOT NULL
-- mà thiếu mặc định.
--
-- CẢNH BÁO THỨ TỰ — giống migration 20260831090000_m03_k2_k3_k4: câu UPDATE ở cuối đặt MỌI bản
-- ghi ĐANG CÓ thành approvalStatus = 'APPROVED'. Đúng với hiện trạng, vì tới thời điểm này tác tử
-- chỉ vào được CSDL qua prisma/seed.ts (không có giao diện đăng ký, đó chính là lý do có
-- migration này) và các bản ghi seed đều là tác tử đang vận hành hợp lệ. Nếu chạy SAU khi giao
-- diện đăng ký đã hoạt động thì mọi hồ sơ đang ở Nháp/Chờ soát xét sẽ bị đánh dấu sai là đã
-- được Lãnh đạo Viện phê duyệt.

-- CreateEnum
CREATE TYPE "AISystemGroup" AS ENUM ('EMBEDDED_AGENT', 'OFFICE_ASSIST', 'TECHNICAL_ANALYSIS', 'DOCUMENT_PROCESSING', 'EXTERNAL_MODEL_SERVICE');

-- CreateEnum
CREATE TYPE "AIAcquisitionType" AS ENUM ('SELF_DEVELOPED', 'PURCHASED', 'SUBSCRIBED', 'THIRD_PARTY_EMBEDDED');

-- CreateEnum
CREATE TYPE "AIReviewCycle" AS ENUM ('SIX_MONTHS', 'ONE_YEAR', 'BY_EVENT');

-- AlterTable
ALTER TABLE "AIAgent" ADD COLUMN     "acquisition" "AIAcquisitionType" NOT NULL DEFAULT 'SELF_DEVELOPED',
ADD COLUMN     "approvalStatus" "AIApprovalStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "approvedBy" TEXT,
ADD COLUMN     "personalData" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reviewCycle" "AIReviewCycle" NOT NULL DEFAULT 'BY_EVENT',
ADD COLUMN     "systemGroup" "AISystemGroup" NOT NULL DEFAULT 'EMBEDDED_AGENT',
ADD COLUMN     "technicalContact" TEXT NOT NULL DEFAULT '';

-- Bản ghi đang có là tác tử seed đang vận hành — đọc kỹ CẢNH BÁO THỨ TỰ ở đầu file trước khi chạy.
UPDATE "AIAgent" SET "approvalStatus" = 'APPROVED' WHERE "approvalStatus" = 'DRAFT';

-- Mức tác động Trung bình của hai tác tử seed đòi chu kỳ rà soát ≤ 01 năm (ETV.P29 mục 5.1.3);
-- mặc định BY_EVENT ở trên là mức của tác động Thấp nên phải kéo về đúng mức, nếu không dữ liệu
-- có sẵn sẽ vi phạm ngay quy tắc R-F29-2 mà chính lần thay đổi này đặt ra.
UPDATE "AIAgent" SET "reviewCycle" = 'ONE_YEAR' WHERE "riskLevel" = 'MEDIUM' AND "reviewCycle" = 'BY_EVENT';
UPDATE "AIAgent" SET "reviewCycle" = 'SIX_MONTHS' WHERE "riskLevel" = 'HIGH' AND "reviewCycle" <> 'SIX_MONTHS';
