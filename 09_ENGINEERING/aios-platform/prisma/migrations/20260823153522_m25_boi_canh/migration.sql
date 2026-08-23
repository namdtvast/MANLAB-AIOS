-- CreateEnum
CREATE TYPE "M25CycleType" AS ENUM ('DINH_KY', 'DOT_XUAT');

-- CreateEnum
CREATE TYPE "M25ReviewStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'REVIEW_REJECTED', 'PENDING_APPROVAL', 'APPROVAL_REJECTED', 'APPROVED', 'SUPERSEDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "M25MgmtSystem" AS ENUM ('ISO_9001', 'ISO_17025', 'ISO_17034', 'ISO_27001', 'ISO_42001');

-- CreateEnum
CREATE TYPE "M25IssueOrigin" AS ENUM ('NOI_BO', 'BEN_NGOAI');

-- CreateEnum
CREATE TYPE "M25IssueCategory" AS ENUM ('CHINH_TRI_PHAP_LY', 'KINH_TE_THI_TRUONG', 'XA_HOI_KHACH_HANG', 'CONG_NGHE_SO_AI', 'CANH_TRANH_NGANH', 'MOI_TRUONG_HA_TANG', 'NGUON_LUC_NOI_BO', 'NANG_LUC_KY_THUAT', 'VAN_HOA_TO_CHUC', 'BAO_MAT_THONG_TIN');

-- CreateEnum
CREATE TYPE "M25Direction" AS ENUM ('CO_HOI', 'THACH_THUC', 'CA_HAI', 'TRUNG_TINH');

-- CreateEnum
CREATE TYPE "M25ImpactLevel" AS ENUM ('THAP', 'TRUNG_BINH', 'CAO');

-- CreateEnum
CREATE TYPE "M25PartyGroup" AS ENUM ('KHACH_HANG', 'CO_QUAN_QUAN_LY', 'TO_CHUC_CONG_NHAN', 'CO_QUAN_CHU_QUAN', 'NHAN_SU_NOI_BO', 'NHA_CUNG_CAP', 'DOI_TAC_NGHIEN_CUU', 'CONG_DONG_XA_HOI');

-- CreateEnum
CREATE TYPE "M25InfluenceLevel" AS ENUM ('CAO', 'TRUNG_BINH', 'THAP');

-- CreateEnum
CREATE TYPE "M25MonitorFreq" AS ENUM ('THANG', 'QUY', 'SAU_THANG', 'NAM', 'THEO_SU_KIEN');

-- CreateEnum
CREATE TYPE "M25EntryStatus" AS ENUM ('CON_HIEU_LUC', 'DA_DONG');

-- CreateEnum
CREATE TYPE "M25ExpectationSource" AS ENUM ('HOP_DONG', 'VAN_BAN_PHAP_LUAT', 'TIEU_CHUAN', 'KHAO_SAT_PHAN_HOI', 'KHIEU_NAI', 'DANH_GIA_BEN_NGOAI', 'HOP_TRAO_DOI');

-- CreateEnum
CREATE TYPE "M25FulfillmentStatus" AS ENUM ('DANG_DAP_UNG', 'CHUA_DAP_UNG', 'KHONG_AP_DUNG');

-- CreateEnum
CREATE TYPE "M25ItemType" AS ENUM ('REVIEW', 'ISSUE', 'PARTY', 'EXPECTATION');

-- CreateTable
CREATE TABLE "M25ContextReview" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "cycleType" "M25CycleType" NOT NULL,
    "periodYear" INTEGER NOT NULL,
    "triggerReason" TEXT,
    "scopeSystems" "M25MgmtSystem"[],
    "summary" TEXT,
    "conclusion" TEXT,
    "status" "M25ReviewStatus" NOT NULL DEFAULT 'DRAFT',
    "reason" TEXT,
    "createdById" TEXT NOT NULL,
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "supersedesId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M25ContextReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M25ContextIssue" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "origin" "M25IssueOrigin" NOT NULL,
    "category" "M25IssueCategory" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "direction" "M25Direction" NOT NULL,
    "affectedSystems" "M25MgmtSystem"[],
    "impactLevel" "M25ImpactLevel" NOT NULL,
    "monitoringMethod" TEXT NOT NULL,
    "monitoringFrequency" "M25MonitorFreq" NOT NULL,
    "ownerId" TEXT,
    "objectiveRefs" TEXT[],
    "evidenceRefs" TEXT[],
    "status" "M25EntryStatus" NOT NULL DEFAULT 'CON_HIEU_LUC',
    "closeReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M25ContextIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M25IssueRiskLink" (
    "id" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    "riskId" TEXT,
    "opportunityId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M25IssueRiskLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M25InterestedParty" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "group" "M25PartyGroup" NOT NULL,
    "influenceLevel" "M25InfluenceLevel" NOT NULL,
    "engagementChannel" TEXT NOT NULL,
    "monitoringFrequency" "M25MonitorFreq" NOT NULL,
    "ownerId" TEXT,
    "impartialityFlag" BOOLEAN NOT NULL DEFAULT false,
    "status" "M25EntryStatus" NOT NULL DEFAULT 'CON_HIEU_LUC',
    "closeReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M25InterestedParty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M25PartyExpectation" (
    "id" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "source" "M25ExpectationSource" NOT NULL,
    "isComplianceObligation" BOOLEAN NOT NULL DEFAULT false,
    "obligationRef" TEXT,
    "responseAction" TEXT NOT NULL,
    "responseModuleRef" TEXT,
    "fulfillmentStatus" "M25FulfillmentStatus" NOT NULL DEFAULT 'DANG_DAP_UNG',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M25PartyExpectation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M25AuditEntry" (
    "id" TEXT NOT NULL,
    "itemType" "M25ItemType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "M25AuditEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "M25ContextReview_code_key" ON "M25ContextReview"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M25ContextReview_supersedesId_key" ON "M25ContextReview"("supersedesId");

-- CreateIndex
CREATE UNIQUE INDEX "M25ContextIssue_code_key" ON "M25ContextIssue"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M25IssueRiskLink_issueId_riskId_key" ON "M25IssueRiskLink"("issueId", "riskId");

-- CreateIndex
CREATE UNIQUE INDEX "M25IssueRiskLink_issueId_opportunityId_key" ON "M25IssueRiskLink"("issueId", "opportunityId");

-- CreateIndex
CREATE UNIQUE INDEX "M25InterestedParty_code_key" ON "M25InterestedParty"("code");

-- AddForeignKey
ALTER TABLE "M25ContextReview" ADD CONSTRAINT "M25ContextReview_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M25ContextReview" ADD CONSTRAINT "M25ContextReview_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M25ContextReview" ADD CONSTRAINT "M25ContextReview_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M25ContextReview" ADD CONSTRAINT "M25ContextReview_supersedesId_fkey" FOREIGN KEY ("supersedesId") REFERENCES "M25ContextReview"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M25ContextIssue" ADD CONSTRAINT "M25ContextIssue_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "M25ContextReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M25ContextIssue" ADD CONSTRAINT "M25ContextIssue_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M25IssueRiskLink" ADD CONSTRAINT "M25IssueRiskLink_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "M25ContextIssue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M25IssueRiskLink" ADD CONSTRAINT "M25IssueRiskLink_riskId_fkey" FOREIGN KEY ("riskId") REFERENCES "M01RiskItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M25IssueRiskLink" ADD CONSTRAINT "M25IssueRiskLink_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "M01OpportunityItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M25InterestedParty" ADD CONSTRAINT "M25InterestedParty_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "M25ContextReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M25InterestedParty" ADD CONSTRAINT "M25InterestedParty_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M25PartyExpectation" ADD CONSTRAINT "M25PartyExpectation_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "M25InterestedParty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M25AuditEntry" ADD CONSTRAINT "M25AuditEntry_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
