-- CreateEnum
CREATE TYPE "M13SourceType" AS ENUM ('TU_PHAT_HIEN', 'KHIEU_NAI', 'IC_VUOT_GIOI_HAN', 'KHAC');

-- CreateEnum
CREATE TYPE "M13Severity" AS ENUM ('NHE', 'NANG');

-- CreateEnum
CREATE TYPE "M13NcwStatus" AS ENUM ('GHI_NHAN', 'DANG_THEO_DOI', 'DANG_KHAC_PHUC', 'DA_KHAC_PHUC');

-- CreateEnum
CREATE TYPE "M13CapStatus" AS ENUM ('DANG_THUC_HIEN', 'CHO_THAM_XET', 'DAT', 'KHONG_DAT');

-- CreateEnum
CREATE TYPE "M13ItemType" AS ENUM ('NCW', 'CAP');

-- CreateTable
CREATE TABLE "M13NonconformingWork" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "sourceType" "M13SourceType" NOT NULL,
    "sourceRef" TEXT,
    "description" TEXT NOT NULL,
    "severity" "M13Severity",
    "severityBasis" TEXT,
    "assessedById" TEXT,
    "status" "M13NcwStatus" NOT NULL DEFAULT 'GHI_NHAN',
    "emergencyStop" BOOLEAN NOT NULL DEFAULT false,
    "stoppedWork" BOOLEAN NOT NULL DEFAULT false,
    "detectedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M13NonconformingWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M13CorrectiveActionPlan" (
    "id" TEXT NOT NULL,
    "ncwId" TEXT NOT NULL,
    "rootCause" TEXT NOT NULL,
    "actionPlan" TEXT NOT NULL,
    "assignedToId" TEXT NOT NULL,
    "status" "M13CapStatus" NOT NULL DEFAULT 'DANG_THUC_HIEN',
    "completedAt" TIMESTAMP(3),
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "reviewNote" TEXT,
    "replacementReportRef" TEXT,
    "replacementApprovedById" TEXT,
    "replacementApprovedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M13CorrectiveActionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M13RevokedReport" (
    "id" TEXT NOT NULL,
    "ncwId" TEXT NOT NULL,
    "reportRef" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M13RevokedReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M13MonitoringNote" (
    "id" TEXT NOT NULL,
    "ncwId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M13MonitoringNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M13AuditEntry" (
    "id" TEXT NOT NULL,
    "itemType" "M13ItemType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "M13AuditEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "M13NonconformingWork_code_key" ON "M13NonconformingWork"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M13CorrectiveActionPlan_ncwId_key" ON "M13CorrectiveActionPlan"("ncwId");

-- AddForeignKey
ALTER TABLE "M13NonconformingWork" ADD CONSTRAINT "M13NonconformingWork_detectedById_fkey" FOREIGN KEY ("detectedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M13NonconformingWork" ADD CONSTRAINT "M13NonconformingWork_assessedById_fkey" FOREIGN KEY ("assessedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M13CorrectiveActionPlan" ADD CONSTRAINT "M13CorrectiveActionPlan_ncwId_fkey" FOREIGN KEY ("ncwId") REFERENCES "M13NonconformingWork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M13CorrectiveActionPlan" ADD CONSTRAINT "M13CorrectiveActionPlan_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M13CorrectiveActionPlan" ADD CONSTRAINT "M13CorrectiveActionPlan_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M13CorrectiveActionPlan" ADD CONSTRAINT "M13CorrectiveActionPlan_replacementApprovedById_fkey" FOREIGN KEY ("replacementApprovedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M13RevokedReport" ADD CONSTRAINT "M13RevokedReport_ncwId_fkey" FOREIGN KEY ("ncwId") REFERENCES "M13NonconformingWork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M13MonitoringNote" ADD CONSTRAINT "M13MonitoringNote_ncwId_fkey" FOREIGN KEY ("ncwId") REFERENCES "M13NonconformingWork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M13MonitoringNote" ADD CONSTRAINT "M13MonitoringNote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M13AuditEntry" ADD CONSTRAINT "M13AuditEntry_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
