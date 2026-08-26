-- CreateEnum
CREATE TYPE "M27AssetType" AS ENUM ('CSDL_DIEN_TU', 'TEP_TAI_LIEU', 'HO_SO_GIAY', 'UNG_DUNG_NEN_TANG', 'VAT_MANG_TIN_ROI', 'DICH_VU_BEN_THU_BA', 'DU_LIEU_THIET_BI_DO');

-- CreateEnum
CREATE TYPE "M27DataDomain" AS ENUM ('KHACH_HANG', 'KET_QUA_DO', 'HIEU_CHUAN_CRM', 'NHAN_SU', 'TAI_CHINH', 'HE_THONG_QUAN_LY', 'NGHIEN_CUU', 'VAN_HANH_CNTT', 'PHUC_VU_AI');

-- CreateEnum
CREATE TYPE "M27CiaLevel" AS ENUM ('THAP', 'TRUNG_BINH', 'CAO');

-- CreateEnum
CREATE TYPE "M27BackupFrequency" AS ENUM ('NGAY', 'TUAN', 'THANG', 'KHAC');

-- CreateEnum
CREATE TYPE "M27DisposalMethod" AS ENUM ('CAT_VUN_GIAY', 'XOA_AN_TOAN', 'HUY_VAT_LY', 'HUY_KHOA_MA_HOA', 'BEN_THU_BA_XOA');

-- CreateEnum
CREATE TYPE "M27AssetStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'REVIEW_REJECTED', 'PENDING_APPROVAL', 'APPROVAL_REJECTED', 'DANG_SU_DUNG', 'NGUNG_SU_DUNG', 'DA_HUY', 'CANCELLED');

-- CreateEnum
CREATE TYPE "M27RuleAction" AS ENUM ('LUU_TRU', 'TRUYEN_GUI', 'IN_SAO_CHEP', 'MANG_RA_NGOAI', 'CHIA_SE_BEN_THU_BA', 'THIET_BI_CA_NHAN', 'CHI_MUC_AI', 'HUY');

-- CreateEnum
CREATE TYPE "M27RuleVersionStatus" AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'DA_PHE_DUYET', 'HET_HIEU_LUC');

-- CreateEnum
CREATE TYPE "M27ItemType" AS ENUM ('ASSET', 'RULE_VERSION');

-- CreateTable
CREATE TABLE "M27InfoAsset" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "assetType" "M27AssetType" NOT NULL,
    "dataDomain" "M27DataDomain" NOT NULL,
    "description" TEXT NOT NULL,
    "classification" "Classification" NOT NULL,
    "ciaC" "M27CiaLevel" NOT NULL,
    "ciaI" "M27CiaLevel" NOT NULL,
    "ciaA" "M27CiaLevel" NOT NULL,
    "classificationDowngradeRef" TEXT,
    "containsPersonalData" BOOLEAN NOT NULL DEFAULT false,
    "personalDataScope" TEXT,
    "legalBasis" TEXT,
    "ownerId" TEXT NOT NULL,
    "custodianId" TEXT,
    "storageLocation" TEXT NOT NULL,
    "systemRefs" TEXT[],
    "docRef" TEXT,
    "recordRef" TEXT,
    "datasetRefs" TEXT[],
    "retentionPeriod" TEXT NOT NULL,
    "retentionBasis" TEXT NOT NULL,
    "disposalMethod" "M27DisposalMethod" NOT NULL,
    "backupRequired" BOOLEAN NOT NULL DEFAULT false,
    "backupFrequency" "M27BackupFrequency",
    "lastRestoreTestAt" TIMESTAMP(3),
    "externalSharingAllowed" BOOLEAN NOT NULL DEFAULT false,
    "aiUseAllowed" BOOLEAN NOT NULL DEFAULT false,
    "riskRefs" TEXT[],
    "reviewCycleMonths" INTEGER NOT NULL DEFAULT 12,
    "lastReviewedAt" TIMESTAMP(3),
    "status" "M27AssetStatus" NOT NULL DEFAULT 'DRAFT',
    "reason" TEXT,
    "createdById" TEXT NOT NULL,
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M27InfoAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M27RuleVersion" (
    "id" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "effectiveFrom" TIMESTAMP(3),
    "status" "M27RuleVersionStatus" NOT NULL DEFAULT 'DRAFT',
    "note" TEXT,
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M27RuleVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M27ClassificationRule" (
    "id" TEXT NOT NULL,
    "ruleVersionId" TEXT NOT NULL,
    "classification" "Classification" NOT NULL,
    "action" "M27RuleAction" NOT NULL,
    "requirement" TEXT NOT NULL,
    "isProhibited" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "M27ClassificationRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M27AuditEntry" (
    "id" TEXT NOT NULL,
    "itemType" "M27ItemType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "M27AuditEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "M27InfoAsset_code_key" ON "M27InfoAsset"("code");

-- CreateIndex
CREATE INDEX "M27InfoAsset_status_dataDomain_idx" ON "M27InfoAsset"("status", "dataDomain");

-- CreateIndex
CREATE INDEX "M27InfoAsset_classification_idx" ON "M27InfoAsset"("classification");

-- CreateIndex
CREATE INDEX "M27InfoAsset_lastReviewedAt_idx" ON "M27InfoAsset"("lastReviewedAt");

-- CreateIndex
CREATE INDEX "M27InfoAsset_lastRestoreTestAt_idx" ON "M27InfoAsset"("lastRestoreTestAt");

-- CreateIndex
CREATE INDEX "M27InfoAsset_containsPersonalData_idx" ON "M27InfoAsset"("containsPersonalData");

-- CreateIndex
CREATE UNIQUE INDEX "M27RuleVersion_version_key" ON "M27RuleVersion"("version");

-- CreateIndex
CREATE INDEX "M27RuleVersion_status_idx" ON "M27RuleVersion"("status");

-- CreateIndex
CREATE INDEX "M27ClassificationRule_classification_action_idx" ON "M27ClassificationRule"("classification", "action");

-- CreateIndex
CREATE UNIQUE INDEX "M27ClassificationRule_ruleVersionId_classification_action_key" ON "M27ClassificationRule"("ruleVersionId", "classification", "action");

-- CreateIndex
CREATE INDEX "M27AuditEntry_itemType_itemId_idx" ON "M27AuditEntry"("itemType", "itemId");

-- AddForeignKey
ALTER TABLE "M27InfoAsset" ADD CONSTRAINT "M27InfoAsset_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M27InfoAsset" ADD CONSTRAINT "M27InfoAsset_custodianId_fkey" FOREIGN KEY ("custodianId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M27InfoAsset" ADD CONSTRAINT "M27InfoAsset_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M27InfoAsset" ADD CONSTRAINT "M27InfoAsset_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M27InfoAsset" ADD CONSTRAINT "M27InfoAsset_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M27RuleVersion" ADD CONSTRAINT "M27RuleVersion_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M27ClassificationRule" ADD CONSTRAINT "M27ClassificationRule_ruleVersionId_fkey" FOREIGN KEY ("ruleVersionId") REFERENCES "M27RuleVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M27AuditEntry" ADD CONSTRAINT "M27AuditEntry_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
