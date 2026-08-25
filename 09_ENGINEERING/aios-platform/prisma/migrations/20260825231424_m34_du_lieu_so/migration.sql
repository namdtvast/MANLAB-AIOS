-- CreateEnum
CREATE TYPE "Classification" AS ENUM ('CONG_KHAI', 'NOI_BO', 'HAN_CHE', 'MAT');

-- CreateEnum
CREATE TYPE "M34DataGroup" AS ENUM ('DO_KY_THUAT', 'HO_SO_NGHIEP_VU', 'DU_LIEU_CHU', 'QUAN_TRI', 'HE_THONG_QUAN_LY', 'CONG_BO', 'TRI_TUE_NHAN_TAO');

-- CreateEnum
CREATE TYPE "M34LifecycleStage" AS ENUM ('HOAT_DONG', 'LUU_TRU', 'DE_NGHI_HUY');

-- CreateEnum
CREATE TYPE "M34DataSetStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'REVIEW_REJECTED', 'PENDING_APPROVAL', 'APPROVAL_REJECTED', 'ACTIVE', 'ARCHIVED', 'DISPOSAL_PROPOSED', 'DISPOSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "M34ReviewCycle" AS ENUM ('THANG_12', 'THANG_06');

-- CreateEnum
CREATE TYPE "M34DictStatus" AS ENUM ('DRAFT', 'ACTIVE', 'SUPERSEDED');

-- CreateEnum
CREATE TYPE "M34MasterStatus" AS ENUM ('DE_NGHI', 'DA_CONG_NHAN', 'THU_HOI');

-- CreateEnum
CREATE TYPE "M34FindingStatus" AS ENUM ('MOI', 'DANG_XU_LY', 'DA_XU_LY');

-- CreateEnum
CREATE TYPE "M34QualityDimension" AS ENUM ('CHINH_XAC', 'DAY_DU', 'NHAT_QUAN', 'KIP_THOI', 'DUY_NHAT', 'HOP_LE');

-- CreateEnum
CREATE TYPE "M34QualityStatus" AS ENUM ('MOI', 'DANG_DO', 'CO_KET_QUA', 'DAT', 'KHONG_DAT');

-- CreateEnum
CREATE TYPE "M34BelowThresholdCase" AS ENUM ('MOT_CHIEU_KHONG_ANH_HUONG', 'HAI_KY_LIEN_TIEP', 'ANH_HUONG_KET_QUA_DA_PHAT_HANH', 'TU_TICH_HOP_DONG_BO', 'DU_LIEU_CHU_TRUNG');

-- CreateEnum
CREATE TYPE "M34Trend" AS ENUM ('CAI_THIEN', 'GIU_NGUYEN', 'XAU_DI');

-- CreateEnum
CREATE TYPE "M34PublishedImpact" AS ENUM ('CHUA_DUNG_PHAT_HANH', 'DA_DUNG_PHAT_HANH');

-- CreateEnum
CREATE TYPE "M34ValidityConclusion" AS ENUM ('CON_HIEU_LUC', 'THU_HOI_PHAT_HANH_LAI');

-- CreateEnum
CREATE TYPE "M34CorrectionStatus" AS ENUM ('MOI', 'DANG_XEM_XET', 'CHO_KET_LUAN_P10_P11', 'DA_HIEU_CHINH', 'TU_CHOI');

-- CreateEnum
CREATE TYPE "M34SharingType" AS ENUM ('NOI_BO_VUOT_QUYEN', 'RA_NGOAI_VIEN', 'DINH_KY_TU_DONG');

-- CreateEnum
CREATE TYPE "M34SharingStatus" AS ENUM ('DRAFT', 'CHO_Y_KIEN_ATTT', 'CHO_PHE_DUYET', 'DA_PHE_DUYET', 'DA_THUC_HIEN', 'DA_THU_HOI', 'TU_CHOI');

-- CreateEnum
CREATE TYPE "M34AIPurpose" AS ENUM ('DU_LIEU_NGU_CANH', 'TAP_TRI_THUC', 'DANH_GIA_MO_HINH');

-- CreateEnum
CREATE TYPE "M34AIApprovalStatus" AS ENUM ('DE_NGHI', 'DA_PHE_DUYET', 'THU_HOI');

-- CreateEnum
CREATE TYPE "M34ItemType" AS ENUM ('DATASET', 'DICTIONARY', 'MASTER', 'FINDING', 'QUALITY', 'CORRECTION', 'SHARING', 'AI_APPROVAL');

-- CreateTable
CREATE TABLE "M34DataSet" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dataGroup" "M34DataGroup" NOT NULL,
    "purpose" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "stewardId" TEXT NOT NULL,
    "primaryEntererId" TEXT,
    "platformRef" TEXT,
    "infraRef" TEXT,
    "copiesNote" TEXT,
    "classification" "Classification" NOT NULL,
    "hasPersonalData" BOOLEAN NOT NULL,
    "personalDataLegalRef" TEXT,
    "qualityMetricsNote" TEXT,
    "lifecycleStage" "M34LifecycleStage" NOT NULL DEFAULT 'HOAT_DONG',
    "activeRetention" TEXT,
    "retentionBasis" TEXT NOT NULL,
    "readScope" TEXT,
    "writeScope" TEXT,
    "externalSharingNote" TEXT,
    "infoAssetRef" TEXT,
    "recordRef" TEXT,
    "integrationRefs" TEXT[],
    "isMasterData" BOOLEAN NOT NULL DEFAULT false,
    "dictionaryRequired" BOOLEAN NOT NULL,
    "lineageNote" TEXT,
    "aiUsageApproved" BOOLEAN NOT NULL DEFAULT false,
    "reviewCycle" "M34ReviewCycle" NOT NULL DEFAULT 'THANG_12',
    "lastReviewedAt" TIMESTAMP(3),
    "suspendedUse" BOOLEAN NOT NULL DEFAULT false,
    "suspendReason" TEXT,
    "status" "M34DataSetStatus" NOT NULL DEFAULT 'DRAFT',
    "reason" TEXT,
    "mergedIntoId" TEXT,
    "disposalRetentionExpired" BOOLEAN NOT NULL DEFAULT false,
    "disposalNotBasis" BOOLEAN NOT NULL DEFAULT false,
    "disposalNoDispute" BOOLEAN NOT NULL DEFAULT false,
    "disposalNoDependent" BOOLEAN NOT NULL DEFAULT false,
    "disposalAtttConfirmedById" TEXT,
    "disposalRecordRef" TEXT,
    "createdById" TEXT NOT NULL,
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M34DataSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M34DictionaryVersion" (
    "id" TEXT NOT NULL,
    "dataSetId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "effectiveDate" TIMESTAMP(3),
    "changeRef" TEXT,
    "status" "M34DictStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M34DictionaryVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M34DictionaryField" (
    "id" TEXT NOT NULL,
    "versionId" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "dataType" TEXT NOT NULL,
    "unit" TEXT,
    "validDomain" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "validationRule" TEXT,
    "example" TEXT,

    CONSTRAINT "M34DictionaryField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M34MasterDataSource" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "masterType" TEXT NOT NULL,
    "dataSetId" TEXT NOT NULL,
    "sourceSystem" TEXT NOT NULL,
    "authorizedEditors" TEXT NOT NULL,
    "syncTargets" TEXT[],
    "status" "M34MasterStatus" NOT NULL DEFAULT 'DE_NGHI',
    "reason" TEXT,
    "recognizedById" TEXT,
    "recognizedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M34MasterDataSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M34MasterMergeMap" (
    "id" TEXT NOT NULL,
    "masterSourceId" TEXT NOT NULL,
    "oldRef" TEXT NOT NULL,
    "survivingRef" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M34MasterMergeMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M34ParallelLookupFinding" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "masterSourceId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "usedBy" TEXT NOT NULL,
    "usedFor" TEXT NOT NULL,
    "diffNote" TEXT NOT NULL,
    "causedError" BOOLEAN NOT NULL,
    "capaRef" TEXT,
    "stoppedAt" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),
    "status" "M34FindingStatus" NOT NULL DEFAULT 'MOI',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M34ParallelLookupFinding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M34QualityMeasurement" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "dataSetId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "measuredById" TEXT,
    "measuredAt" TIMESTAMP(3),
    "trend" "M34Trend",
    "status" "M34QualityStatus" NOT NULL DEFAULT 'MOI',
    "belowThresholdCase" "M34BelowThresholdCase",
    "remediationPlan" TEXT,
    "remediationDue" TIMESTAMP(3),
    "capaRef" TEXT,
    "validityRef" TEXT,
    "integrationRef" TEXT,
    "reason" TEXT,
    "concludedById" TEXT,
    "concludedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M34QualityMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M34QualityRow" (
    "id" TEXT NOT NULL,
    "measurementId" TEXT NOT NULL,
    "dimension" "M34QualityDimension" NOT NULL,
    "metric" TEXT NOT NULL,
    "method" TEXT,
    "threshold" TEXT NOT NULL,
    "value" TEXT,
    "passed" BOOLEAN,

    CONSTRAINT "M34QualityRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M34DataCorrection" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "dataSetId" TEXT NOT NULL,
    "recordPointer" TEXT NOT NULL,
    "oldValue" TEXT NOT NULL,
    "newValue" TEXT NOT NULL,
    "correctionReason" TEXT NOT NULL,
    "evidenceRef" TEXT,
    "requestedById" TEXT NOT NULL,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedImpact" "M34PublishedImpact",
    "validityRef" TEXT,
    "validityConclusion" "M34ValidityConclusion",
    "correctionRecordId" TEXT,
    "performedById" TEXT,
    "performedAt" TIMESTAMP(3),
    "capaRef" TEXT,
    "approvedById" TEXT,
    "status" "M34CorrectionStatus" NOT NULL DEFAULT 'MOI',
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M34DataCorrection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M34SharingRequest" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "requestType" "M34SharingType" NOT NULL,
    "dataSetId" TEXT NOT NULL,
    "hasCustomerData" BOOLEAN NOT NULL,
    "requesterId" TEXT NOT NULL,
    "recipient" TEXT,
    "purpose" TEXT NOT NULL,
    "scopeNote" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "useUntil" TIMESTAMP(3),
    "legalBasis" TEXT,
    "minScopeLimited" BOOLEAN NOT NULL DEFAULT false,
    "minAnonymized" BOOLEAN NOT NULL DEFAULT false,
    "minAnonymizeNA" TEXT,
    "minTimeLimited" BOOLEAN NOT NULL DEFAULT false,
    "minProtectedChannel" BOOLEAN NOT NULL DEFAULT false,
    "minNdaRef" TEXT,
    "minReturnDelete" BOOLEAN NOT NULL DEFAULT false,
    "atttOpinionById" TEXT,
    "atttOpinionAt" TIMESTAMP(3),
    "atttOpinionNote" TEXT,
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "executedById" TEXT,
    "executedAt" TIMESTAMP(3),
    "logRef" TEXT,
    "revokeDue" TIMESTAMP(3),
    "revokeRequestedAt" TIMESTAMP(3),
    "revokeEvidenceRef" TEXT,
    "status" "M34SharingStatus" NOT NULL DEFAULT 'DRAFT',
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M34SharingRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M34AIDataApproval" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "dataSetId" TEXT NOT NULL,
    "aiPurpose" "M34AIPurpose" NOT NULL,
    "aiSystemRef" TEXT,
    "aiaRef" TEXT NOT NULL,
    "mitigation" TEXT NOT NULL,
    "atttOpinionById" TEXT,
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "status" "M34AIApprovalStatus" NOT NULL DEFAULT 'DE_NGHI',
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M34AIDataApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M34AuditEntry" (
    "id" TEXT NOT NULL,
    "itemType" "M34ItemType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "M34AuditEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "M34DataSet_code_key" ON "M34DataSet"("code");

-- CreateIndex
CREATE INDEX "M34DataSet_lifecycleStage_status_idx" ON "M34DataSet"("lifecycleStage", "status");

-- CreateIndex
CREATE INDEX "M34DataSet_lastReviewedAt_idx" ON "M34DataSet"("lastReviewedAt");

-- CreateIndex
CREATE UNIQUE INDEX "M34DictionaryVersion_dataSetId_version_key" ON "M34DictionaryVersion"("dataSetId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "M34DictionaryField_versionId_fieldName_key" ON "M34DictionaryField"("versionId", "fieldName");

-- CreateIndex
CREATE UNIQUE INDEX "M34MasterDataSource_code_key" ON "M34MasterDataSource"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M34ParallelLookupFinding_code_key" ON "M34ParallelLookupFinding"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M34QualityMeasurement_code_key" ON "M34QualityMeasurement"("code");

-- CreateIndex
CREATE INDEX "M34QualityMeasurement_dataSetId_measuredAt_idx" ON "M34QualityMeasurement"("dataSetId", "measuredAt");

-- CreateIndex
CREATE UNIQUE INDEX "M34QualityMeasurement_dataSetId_period_key" ON "M34QualityMeasurement"("dataSetId", "period");

-- CreateIndex
CREATE UNIQUE INDEX "M34QualityRow_measurementId_dimension_key" ON "M34QualityRow"("measurementId", "dimension");

-- CreateIndex
CREATE UNIQUE INDEX "M34DataCorrection_code_key" ON "M34DataCorrection"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M34SharingRequest_code_key" ON "M34SharingRequest"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M34AIDataApproval_code_key" ON "M34AIDataApproval"("code");

-- CreateIndex
CREATE INDEX "M34AuditEntry_itemType_itemId_idx" ON "M34AuditEntry"("itemType", "itemId");

-- AddForeignKey
ALTER TABLE "M34DataSet" ADD CONSTRAINT "M34DataSet_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M34DataSet" ADD CONSTRAINT "M34DataSet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M34DataSet" ADD CONSTRAINT "M34DataSet_stewardId_fkey" FOREIGN KEY ("stewardId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M34DataSet" ADD CONSTRAINT "M34DataSet_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M34DictionaryVersion" ADD CONSTRAINT "M34DictionaryVersion_dataSetId_fkey" FOREIGN KEY ("dataSetId") REFERENCES "M34DataSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M34DictionaryField" ADD CONSTRAINT "M34DictionaryField_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "M34DictionaryVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M34MasterDataSource" ADD CONSTRAINT "M34MasterDataSource_dataSetId_fkey" FOREIGN KEY ("dataSetId") REFERENCES "M34DataSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M34MasterMergeMap" ADD CONSTRAINT "M34MasterMergeMap_masterSourceId_fkey" FOREIGN KEY ("masterSourceId") REFERENCES "M34MasterDataSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M34ParallelLookupFinding" ADD CONSTRAINT "M34ParallelLookupFinding_masterSourceId_fkey" FOREIGN KEY ("masterSourceId") REFERENCES "M34MasterDataSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M34QualityMeasurement" ADD CONSTRAINT "M34QualityMeasurement_dataSetId_fkey" FOREIGN KEY ("dataSetId") REFERENCES "M34DataSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M34QualityMeasurement" ADD CONSTRAINT "M34QualityMeasurement_measuredById_fkey" FOREIGN KEY ("measuredById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M34QualityRow" ADD CONSTRAINT "M34QualityRow_measurementId_fkey" FOREIGN KEY ("measurementId") REFERENCES "M34QualityMeasurement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M34DataCorrection" ADD CONSTRAINT "M34DataCorrection_dataSetId_fkey" FOREIGN KEY ("dataSetId") REFERENCES "M34DataSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M34DataCorrection" ADD CONSTRAINT "M34DataCorrection_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M34SharingRequest" ADD CONSTRAINT "M34SharingRequest_dataSetId_fkey" FOREIGN KEY ("dataSetId") REFERENCES "M34DataSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M34SharingRequest" ADD CONSTRAINT "M34SharingRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M34SharingRequest" ADD CONSTRAINT "M34SharingRequest_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M34AIDataApproval" ADD CONSTRAINT "M34AIDataApproval_dataSetId_fkey" FOREIGN KEY ("dataSetId") REFERENCES "M34DataSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M34AIDataApproval" ADD CONSTRAINT "M34AIDataApproval_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M34AuditEntry" ADD CONSTRAINT "M34AuditEntry_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
