-- CreateEnum
CREATE TYPE "M17PlanStatus" AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "M17ActionStatus" AS ENUM ('DANG_THUC_HIEN', 'HOAN_THANH');

-- CreateEnum
CREATE TYPE "M17ItemType" AS ENUM ('PLAN', 'MINUTES', 'ACTION');

-- CreateTable
CREATE TABLE "M17ReviewPlan" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isAdHoc" BOOLEAN NOT NULL DEFAULT false,
    "plannedDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "attendees" TEXT[],
    "plannedTopics" INTEGER[],
    "status" "M17PlanStatus" NOT NULL DEFAULT 'DRAFT',
    "reason" TEXT,
    "createdById" TEXT NOT NULL,
    "tpApprovedById" TEXT,
    "tpApprovedAt" TIMESTAMP(3),
    "ldvApprovedById" TEXT,
    "ldvApprovedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M17ReviewPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M17ReviewMinutes" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "meetingDate" TIMESTAMP(3) NOT NULL,
    "topicResults" JSONB NOT NULL,
    "conclusion" TEXT,
    "recordedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M17ReviewMinutes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M17ReviewActionTracking" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "minutesId" TEXT NOT NULL,
    "actionDescription" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "M17ActionStatus" NOT NULL DEFAULT 'DANG_THUC_HIEN',
    "assignedTo" TEXT NOT NULL,
    "progressNotes" TEXT,
    "capaRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M17ReviewActionTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M17CorrectiveActionRequest" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "minutesId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M17CorrectiveActionRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M17AuditEntry" (
    "id" TEXT NOT NULL,
    "itemType" "M17ItemType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "M17AuditEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "M17ReviewPlan_code_key" ON "M17ReviewPlan"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M17ReviewMinutes_code_key" ON "M17ReviewMinutes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M17ReviewActionTracking_code_key" ON "M17ReviewActionTracking"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M17CorrectiveActionRequest_code_key" ON "M17CorrectiveActionRequest"("code");

-- AddForeignKey
ALTER TABLE "M17ReviewPlan" ADD CONSTRAINT "M17ReviewPlan_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M17ReviewPlan" ADD CONSTRAINT "M17ReviewPlan_tpApprovedById_fkey" FOREIGN KEY ("tpApprovedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M17ReviewPlan" ADD CONSTRAINT "M17ReviewPlan_ldvApprovedById_fkey" FOREIGN KEY ("ldvApprovedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M17ReviewMinutes" ADD CONSTRAINT "M17ReviewMinutes_planId_fkey" FOREIGN KEY ("planId") REFERENCES "M17ReviewPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M17ReviewMinutes" ADD CONSTRAINT "M17ReviewMinutes_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M17ReviewActionTracking" ADD CONSTRAINT "M17ReviewActionTracking_minutesId_fkey" FOREIGN KEY ("minutesId") REFERENCES "M17ReviewMinutes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M17CorrectiveActionRequest" ADD CONSTRAINT "M17CorrectiveActionRequest_minutesId_fkey" FOREIGN KEY ("minutesId") REFERENCES "M17ReviewMinutes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M17CorrectiveActionRequest" ADD CONSTRAINT "M17CorrectiveActionRequest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M17AuditEntry" ADD CONSTRAINT "M17AuditEntry_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
