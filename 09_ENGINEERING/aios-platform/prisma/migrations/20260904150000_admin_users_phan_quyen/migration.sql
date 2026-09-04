-- Trang quản trị người dùng và phân quyền (/admin/users).
-- Đặc tả: _meta/specs/20260904-admin-users-phan-quyen/spec.md
-- Căn cứ: ETV.P28 §6.7.1 + Phụ lục II điểm 5, ETV.P33 §6.4.
--
-- Toàn bộ là lệnh cộng thêm: không DROP, không đổi cột sẵn có, không backfill. Quyền đã cấp
-- trước đây giữ nguyên hiệu lực, chỉ không có căn cứ phiếu — chính là số mà /admin/users phơi ra.

-- CreateEnum
CREATE TYPE "PlatformAccessAction" AS ENUM ('CAP_VAI_TRO_MODULE', 'THU_HOI_VAI_TRO_MODULE', 'DOI_VAI_TRO_NEN_TANG');

-- AlterTable
ALTER TABLE "ModuleRoleAssignment" ADD COLUMN     "accessRequestId" TEXT,
ADD COLUMN     "grantedById" TEXT;

-- CreateTable
CREATE TABLE "PlatformAccessAudit" (
    "id" TEXT NOT NULL,
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "action" "PlatformAccessAction" NOT NULL,
    "moduleCode" TEXT,
    "role" TEXT,
    "previousRole" TEXT,
    "accessRequestId" TEXT,
    "note" TEXT,

    CONSTRAINT "PlatformAccessAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlatformAccessAudit_subjectId_at_idx" ON "PlatformAccessAudit"("subjectId", "at");

-- AddForeignKey
ALTER TABLE "ModuleRoleAssignment" ADD CONSTRAINT "ModuleRoleAssignment_accessRequestId_fkey" FOREIGN KEY ("accessRequestId") REFERENCES "M28AccessRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleRoleAssignment" ADD CONSTRAINT "ModuleRoleAssignment_grantedById_fkey" FOREIGN KEY ("grantedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformAccessAudit" ADD CONSTRAINT "PlatformAccessAudit_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformAccessAudit" ADD CONSTRAINT "PlatformAccessAudit_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
