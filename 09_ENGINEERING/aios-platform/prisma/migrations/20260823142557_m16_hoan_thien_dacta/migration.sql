/*
  Warnings:

  - A unique constraint covering the columns `[ncwId]` on the table `M16AuditFinding` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "M16QualType" AS ENUM ('ISO_17025', 'DANH_GIA_NOI_BO', 'KINH_NGHIEM_TRUONG_DOAN');

-- AlterEnum
ALTER TYPE "M13SourceType" ADD VALUE 'DANH_GIA_NOI_BO';

-- AlterEnum
ALTER TYPE "M16ProgramStatus" ADD VALUE 'CLOSED';

-- AlterTable
ALTER TABLE "M16AuditFinding" ADD COLUMN     "acknowledgedAt" TIMESTAMP(3),
ADD COLUMN     "acknowledgedById" TEXT,
ADD COLUMN     "ncwId" TEXT,
ADD COLUMN     "rootCauseProposal" TEXT;

-- AlterTable
ALTER TABLE "M16AuditPlan" ADD COLUMN     "followUpOfProgramId" TEXT;

-- AlterTable
ALTER TABLE "M16AuditProgram" ADD COLUMN     "closedAt" TIMESTAMP(3),
ADD COLUMN     "closedById" TEXT,
ADD COLUMN     "closureNote" TEXT,
ADD COLUMN     "teamLeadEmployeeId" TEXT;

-- CreateTable
CREATE TABLE "M16ProgramMember" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M16ProgramMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M16AuditorQualification" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "qualType" "M16QualType" NOT NULL,
    "trainingRecordId" TEXT,
    "note" TEXT,
    "recognizedById" TEXT NOT NULL,
    "recognizedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M16AuditorQualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M16ReportDissent" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "opinionBy" TEXT NOT NULL,
    "opinion" TEXT NOT NULL,
    "recordedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M16ReportDissent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "M16ProgramMember_programId_employeeId_key" ON "M16ProgramMember"("programId", "employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "M16AuditorQualification_employeeId_qualType_key" ON "M16AuditorQualification"("employeeId", "qualType");

-- CreateIndex
CREATE UNIQUE INDEX "M16AuditFinding_ncwId_key" ON "M16AuditFinding"("ncwId");

-- AddForeignKey
ALTER TABLE "M16AuditPlan" ADD CONSTRAINT "M16AuditPlan_followUpOfProgramId_fkey" FOREIGN KEY ("followUpOfProgramId") REFERENCES "M16AuditProgram"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M16AuditProgram" ADD CONSTRAINT "M16AuditProgram_teamLeadEmployeeId_fkey" FOREIGN KEY ("teamLeadEmployeeId") REFERENCES "M03Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M16AuditProgram" ADD CONSTRAINT "M16AuditProgram_closedById_fkey" FOREIGN KEY ("closedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M16ProgramMember" ADD CONSTRAINT "M16ProgramMember_programId_fkey" FOREIGN KEY ("programId") REFERENCES "M16AuditProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M16ProgramMember" ADD CONSTRAINT "M16ProgramMember_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "M03Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M16AuditorQualification" ADD CONSTRAINT "M16AuditorQualification_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "M03Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M16AuditorQualification" ADD CONSTRAINT "M16AuditorQualification_trainingRecordId_fkey" FOREIGN KEY ("trainingRecordId") REFERENCES "M03TrainingRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M16AuditorQualification" ADD CONSTRAINT "M16AuditorQualification_recognizedById_fkey" FOREIGN KEY ("recognizedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M16AuditFinding" ADD CONSTRAINT "M16AuditFinding_acknowledgedById_fkey" FOREIGN KEY ("acknowledgedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M16AuditFinding" ADD CONSTRAINT "M16AuditFinding_ncwId_fkey" FOREIGN KEY ("ncwId") REFERENCES "M13NonconformingWork"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M16ReportDissent" ADD CONSTRAINT "M16ReportDissent_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "M16AuditReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M16ReportDissent" ADD CONSTRAINT "M16ReportDissent_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
