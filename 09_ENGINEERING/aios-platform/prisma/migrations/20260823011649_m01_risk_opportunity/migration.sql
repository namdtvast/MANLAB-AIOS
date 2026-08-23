-- CreateEnum
CREATE TYPE "M01Source" AS ENUM ('DANH_GIA_NOI_BO', 'XEM_XET_LANH_DAO', 'DE_XUAT_NHAN_VIEN', 'PHAN_NAN', 'DANH_GIA_BEN_NGOAI', 'TNTT_SSLP', 'KHAC');

-- CreateEnum
CREATE TYPE "M01OppSource" AS ENUM ('DANH_GIA_NOI_BO', 'DE_XUAT_NHAN_VIEN', 'PHAN_HOI_KHACH_HANG', 'KHAC');

-- CreateEnum
CREATE TYPE "M01RiskLevel" AS ENUM ('THAP', 'TRUNGBINH', 'CAO', 'RATCAO');

-- CreateEnum
CREATE TYPE "M01Status" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'PENDING_LEADER_APPROVAL', 'IN_PROGRESS', 'DONE');

-- CreateEnum
CREATE TYPE "M01VerifyResult" AS ENUM ('DAT', 'CHUA_DAT');

-- CreateEnum
CREATE TYPE "M01ItemType" AS ENUM ('RISK', 'OPPORTUNITY');

-- CreateTable
CREATE TABLE "M01RiskItem" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "source" "M01Source" NOT NULL,
    "cause" TEXT,
    "controlMeasure" TEXT,
    "severity" INTEGER,
    "possibility" INTEGER,
    "riskScore" INTEGER,
    "riskLevel" "M01RiskLevel",
    "status" "M01Status" NOT NULL DEFAULT 'DRAFT',
    "assigneeId" TEXT,
    "dueDate" TIMESTAMP(3),
    "evidence" TEXT,
    "verifyResult" "M01VerifyResult",
    "verifiedById" TEXT,
    "createdById" TEXT NOT NULL,
    "reviewedById" TEXT,
    "approvedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M01RiskItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M01OpportunityItem" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "source" "M01OppSource" NOT NULL,
    "proposedAction" TEXT,
    "status" "M01Status" NOT NULL DEFAULT 'DRAFT',
    "assigneeId" TEXT,
    "dueDate" TIMESTAMP(3),
    "evidence" TEXT,
    "verifyResult" "M01VerifyResult",
    "verifiedById" TEXT,
    "createdById" TEXT NOT NULL,
    "reviewedById" TEXT,
    "approvedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M01OpportunityItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M01AuditEntry" (
    "id" TEXT NOT NULL,
    "itemType" "M01ItemType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "M01AuditEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "M01RiskItem_code_key" ON "M01RiskItem"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M01OpportunityItem_code_key" ON "M01OpportunityItem"("code");

-- AddForeignKey
ALTER TABLE "M01RiskItem" ADD CONSTRAINT "M01RiskItem_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M01RiskItem" ADD CONSTRAINT "M01RiskItem_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M01RiskItem" ADD CONSTRAINT "M01RiskItem_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M01RiskItem" ADD CONSTRAINT "M01RiskItem_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M01RiskItem" ADD CONSTRAINT "M01RiskItem_verifiedById_fkey" FOREIGN KEY ("verifiedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M01OpportunityItem" ADD CONSTRAINT "M01OpportunityItem_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M01OpportunityItem" ADD CONSTRAINT "M01OpportunityItem_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M01OpportunityItem" ADD CONSTRAINT "M01OpportunityItem_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M01OpportunityItem" ADD CONSTRAINT "M01OpportunityItem_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M01OpportunityItem" ADD CONSTRAINT "M01OpportunityItem_verifiedById_fkey" FOREIGN KEY ("verifiedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M01AuditEntry" ADD CONSTRAINT "M01AuditEntry_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
