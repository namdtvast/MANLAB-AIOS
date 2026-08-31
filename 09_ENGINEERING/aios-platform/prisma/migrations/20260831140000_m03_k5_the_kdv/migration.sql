-- M03 K5 — Thẻ kiểm định viên đo lường.
-- Khoảng cách K5 tại 05_MODULE_LIBRARY/M03_NhanSu/03_Database/DataModel.md §4.
--
-- Toàn bộ là lệnh cộng thêm: không DROP, không đổi cột sẵn có, không backfill, không xoá dữ liệu.
-- Khác migration 20260831090000 (K2/K3/K4), migration này KHÔNG có câu UPDATE nào nên không phụ
-- thuộc thứ tự so với việc nhập dữ liệu ManLab.

-- AlterTable
ALTER TABLE "M03EmployeeField" ADD COLUMN     "cardId" TEXT;

-- CreateTable
CREATE TABLE "M03InspectorCard" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "employeeId" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "decisionNumber" TEXT,
    "issuedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M03InspectorCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
-- Chỉ unique trong phạm vi một nhân sự — KHÔNG unique toàn cục. Lý do và đánh đổi: chú thích
-- trên @@unique trong schema.prisma và _work/20260831-m03-k5/spec.md.
CREATE UNIQUE INDEX "M03InspectorCard_employeeId_cardNumber_key" ON "M03InspectorCard"("employeeId", "cardNumber");

-- AddForeignKey
ALTER TABLE "M03EmployeeField" ADD CONSTRAINT "M03EmployeeField_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "M03InspectorCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M03InspectorCard" ADD CONSTRAINT "M03InspectorCard_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "M03Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
