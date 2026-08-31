-- M03 — chốt ba khoảng cách K2/K3/K4 nêu tại
-- 05_MODULE_LIBRARY/M03_NhanSu/03_Database/DataModel.md §4.
--
-- CẢNH BÁO THỨ TỰ: migration này phải chạy TRƯỚC khi nhập dữ liệu nhân sự từ ManLab.
-- Câu UPDATE ở cuối đặt MỌI bản ghi đang có thành recordStatus = 'APPROVED'. Đúng với hiện
-- trạng (chỉ có bản ghi seed sinh từ đề xuất tuyển dụng đã được LĐV phê duyệt), nhưng nếu chạy
-- SAU khi đã nhập 145 bản ghi ManLab thì 12 bản ghi đang ở Nháp/Chờ duyệt/Không duyệt sẽ bị
-- đánh dấu sai là đã duyệt.
--
-- Toàn bộ là lệnh cộng thêm: không DROP, không đổi cột sẵn có sang NOT NULL, không xoá dữ liệu.

-- CreateEnum
CREATE TYPE "M03EmployeeRecordStatus" AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "M03InspectionField" AS ENUM ('KHOI_LUONG', 'DUNG_TICH_LUU_LUONG', 'AP_SUAT', 'NHIET_DO', 'DO_AM', 'QUANG_HOC', 'THOI_GIAN_TAN_SO', 'HOA_LY_NUOC', 'HOA_LY_KHI', 'Y_TE', 'QUAN_TRAC_RA_KHI', 'QUAN_TRAC_RA_NUOC');

-- AlterTable
ALTER TABLE "M03Employee" ADD COLUMN     "legacyCode" TEXT,
ADD COLUMN     "recordStatus" "M03EmployeeRecordStatus" NOT NULL DEFAULT 'DRAFT';

-- CreateTable
CREATE TABLE "M03EmployeeField" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "field" "M03InspectionField" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M03EmployeeField_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "M03EmployeeField_employeeId_field_key" ON "M03EmployeeField"("employeeId", "field");

-- CreateIndex
CREATE UNIQUE INDEX "M03Employee_legacyCode_key" ON "M03Employee"("legacyCode");

-- AddForeignKey
ALTER TABLE "M03EmployeeField" ADD CONSTRAINT "M03EmployeeField_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "M03Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Backfill: hồ sơ nhân sự đã tồn tại trước migration này đều sinh từ fulfillRecruitmentPlan(),
-- tức từ đề xuất tuyển dụng đã được LĐV phê duyệt — không để chúng rơi về DRAFT.
UPDATE "M03Employee" SET "recordStatus" = 'APPROVED';
