-- Thu hồi và tạm khóa tài khoản đăng nhập ManLab.
-- Đặc tả: _meta/specs/20260904-thu-hoi-tai-khoan/spec.md
-- Căn cứ: ETV.P28 §6.7.1 + Phụ lục II điểm 6, ETV.P33 §6.4.
--
-- Toàn bộ là lệnh cộng thêm: không DROP, không đổi cột sẵn có, không backfill. Mọi tài khoản
-- đang tồn tại nhận mặc định DANG_HOAT_DONG nên hành vi đăng nhập không đổi cho tới khi có
-- người thực sự khóa/thu hồi một bản ghi trong sổ F33.03.

-- CreateEnum
CREATE TYPE "UserAccountStatus" AS ENUM ('DANG_HOAT_DONG', 'TAM_KHOA', 'DA_THU_HOI');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountStatus" "UserAccountStatus" NOT NULL DEFAULT 'DANG_HOAT_DONG',
ADD COLUMN     "accountStatusAt" TIMESTAMP(3),
ADD COLUMN     "accountStatusReason" TEXT;

-- AlterTable
ALTER TABLE "M33SystemAccount" ADD COLUMN     "platformUserId" TEXT;

-- CreateIndex
-- Mỗi tài khoản đăng nhập nền tảng chỉ có ĐÚNG MỘT bản ghi trong sổ tài khoản hệ thống.
CREATE UNIQUE INDEX "M33SystemAccount_platformUserId_key" ON "M33SystemAccount"("platformUserId");

-- AddForeignKey
ALTER TABLE "M33SystemAccount" ADD CONSTRAINT "M33SystemAccount_platformUserId_fkey" FOREIGN KEY ("platformUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
