-- CreateEnum
CREATE TYPE "M10RecordType" AS ENUM ('PT_ILC', 'QC', 'STABILITY', 'PLAN', 'PUBLICATION');

-- CreateEnum
CREATE TYPE "M10Status" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'RETURNED', 'PENDING_APPROVAL', 'REJECTED', 'APPROVED', 'PUBLISHED', 'EXPIRED', 'REVOKED');

-- CreateEnum
CREATE TYPE "M10Result" AS ENUM ('PASS', 'WARNING', 'FAIL');

-- CreateEnum
CREATE TYPE "M10PubStatus" AS ENUM ('PASS', 'CONDITIONAL', 'WARNING', 'FAIL_BLOCKED', 'EXPIRED');

-- CreateTable
CREATE TABLE "ModuleRoleAssignment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "moduleCode" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ModuleRoleAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M10Assessment" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "recordType" "M10RecordType" NOT NULL,
    "object" TEXT NOT NULL,
    "status" "M10Status" NOT NULL DEFAULT 'DRAFT',
    "result" "M10Result",
    "version" INTEGER NOT NULL DEFAULT 1,
    "indicators" JSONB NOT NULL,
    "planId" TEXT,
    "procedureId" TEXT,
    "personnelId" TEXT,
    "criteriaId" TEXT,
    "rawData" INTEGER NOT NULL DEFAULT 0,
    "evidence" INTEGER NOT NULL DEFAULT 0,
    "capaId" TEXT,
    "pubStatus" "M10PubStatus",
    "sourceCertId" TEXT,
    "sourceSnapshotAt" TIMESTAMP(3),
    "releaseAllowed" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "reviewedById" TEXT,
    "approvedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M10Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M10AuditEntry" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "M10AuditEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ModuleRoleAssignment_userId_moduleCode_role_key" ON "ModuleRoleAssignment"("userId", "moduleCode", "role");

-- CreateIndex
CREATE UNIQUE INDEX "M10Assessment_code_key" ON "M10Assessment"("code");

-- AddForeignKey
ALTER TABLE "ModuleRoleAssignment" ADD CONSTRAINT "ModuleRoleAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M10Assessment" ADD CONSTRAINT "M10Assessment_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M10Assessment" ADD CONSTRAINT "M10Assessment_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M10Assessment" ADD CONSTRAINT "M10Assessment_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M10AuditEntry" ADD CONSTRAINT "M10AuditEntry_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "M10Assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M10AuditEntry" ADD CONSTRAINT "M10AuditEntry_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
