-- CreateEnum
CREATE TYPE "M16AuditType" AS ENUM ('NOI_BO', 'BEN_NGOAI');

-- CreateEnum
CREATE TYPE "M16PlanStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "M16ProgramStatus" AS ENUM ('DRAFT', 'CONFIRMED');

-- CreateEnum
CREATE TYPE "M16Conformity" AS ENUM ('PHU_HOP', 'KHONG_PHU_HOP');

-- CreateEnum
CREATE TYPE "M16ItemType" AS ENUM ('PLAN', 'PROGRAM', 'REPORT');

-- CreateTable
CREATE TABLE "M16AuditPlan" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "type" "M16AuditType" NOT NULL,
    "year" INTEGER NOT NULL,
    "scope" TEXT[],
    "auditors" TEXT[],
    "isAdHoc" BOOLEAN NOT NULL DEFAULT false,
    "status" "M16PlanStatus" NOT NULL DEFAULT 'DRAFT',
    "reason" TEXT,
    "createdById" TEXT NOT NULL,
    "reviewedById" TEXT,
    "approvedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M16AuditPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M16AuditProgram" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "auditDate" TIMESTAMP(3) NOT NULL,
    "teamLeadName" TEXT NOT NULL,
    "teamMembers" TEXT[],
    "status" "M16ProgramStatus" NOT NULL DEFAULT 'DRAFT',
    "confirmedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M16AuditProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M16AuditFinding" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "clauseRef" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "conformity" "M16Conformity" NOT NULL,
    "evidence" TEXT,
    "auditorSignature" TEXT NOT NULL,
    "capaRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M16AuditFinding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M16AuditReport" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "openingMeetingNotes" TEXT,
    "closingMeetingDate" TIMESTAMP(3) NOT NULL,
    "closingConclusion" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isLate" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M16AuditReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M16AuditEntry" (
    "id" TEXT NOT NULL,
    "itemType" "M16ItemType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "M16AuditEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "M16AuditPlan_code_key" ON "M16AuditPlan"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M16AuditProgram_code_key" ON "M16AuditProgram"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M16AuditFinding_code_key" ON "M16AuditFinding"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M16AuditReport_code_key" ON "M16AuditReport"("code");

-- AddForeignKey
ALTER TABLE "M16AuditPlan" ADD CONSTRAINT "M16AuditPlan_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M16AuditPlan" ADD CONSTRAINT "M16AuditPlan_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M16AuditPlan" ADD CONSTRAINT "M16AuditPlan_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M16AuditProgram" ADD CONSTRAINT "M16AuditProgram_planId_fkey" FOREIGN KEY ("planId") REFERENCES "M16AuditPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M16AuditFinding" ADD CONSTRAINT "M16AuditFinding_programId_fkey" FOREIGN KEY ("programId") REFERENCES "M16AuditProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M16AuditReport" ADD CONSTRAINT "M16AuditReport_programId_fkey" FOREIGN KEY ("programId") REFERENCES "M16AuditProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M16AuditReport" ADD CONSTRAINT "M16AuditReport_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M16AuditEntry" ADD CONSTRAINT "M16AuditEntry_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
