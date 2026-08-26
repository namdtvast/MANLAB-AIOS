-- CreateEnum
CREATE TYPE "M33AssetClass" AS ENUM ('MAY_CHU', 'THIET_BI_MANG', 'MAY_TRAM', 'THIET_BI_DI_DONG', 'MAY_TINH_DIEU_KHIEN_DO', 'THIET_BI_LUU_TRU', 'THIET_BI_NGOAI_VI', 'PHAN_MEM_BAN_QUYEN', 'DICH_VU_THUE_NGOAI', 'THIET_BI_KY_SO');

-- CreateEnum
CREATE TYPE "M33NetworkZone" AS ENUM ('QUAN_TRI_VAN_PHONG', 'THIET_BI_DO', 'KHACH_WIFI', 'KHONG_NOI_MANG');

-- CreateEnum
CREATE TYPE "M33Environment" AS ENUM ('VAN_HANH', 'KIEM_THU', 'PHAT_TRIEN');

-- CreateEnum
CREATE TYPE "M33Criticality" AS ENUM ('THAP', 'TRUNG_BINH', 'CAO');

-- CreateEnum
CREATE TYPE "M33DiscoverySource" AS ENUM ('KIEM_KE_KY_DAU', 'MUA_SAM_MOI', 'PHAT_HIEN_CHUA_KIEM_KE');

-- CreateEnum
CREATE TYPE "M33AssetStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'REVIEW_REJECTED', 'PENDING_APPROVAL', 'APPROVAL_REJECTED', 'OPERATING', 'SUSPENDED', 'RETIRED', 'DISPOSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "M33MaintenanceCycle" AS ENUM ('THANG', 'QUY', 'SAU_THANG', 'NAM', 'THEO_KHUYEN_CAO_HANG');

-- CreateEnum
CREATE TYPE "M33MaintenanceType" AS ENUM ('BAO_TRI_DINH_KY', 'VA_LOI_BAO_MAT', 'CAP_NHAT_PHIEN_BAN', 'SUA_CHUA_SU_CO', 'SAO_LUU_KIEM_TRA_KHOI_PHUC', 'THAY_THE_LINH_KIEN');

-- CreateEnum
CREATE TYPE "M33Severity" AS ENUM ('NGHIEM_TRONG', 'CAO', 'TRUNG_BINH', 'THAP');

-- CreateEnum
CREATE TYPE "M33TaskResult" AS ENUM ('THANH_CONG', 'THAT_BAI', 'HOAN');

-- CreateEnum
CREATE TYPE "M33TaskStatus" AS ENUM ('KE_HOACH', 'DANG_THUC_HIEN', 'CHO_NGHIEM_THU', 'HOAN_THANH', 'HUY');

-- CreateEnum
CREATE TYPE "M33PlanStatus" AS ENUM ('DRAFT', 'CHO_PHE_DUYET', 'DA_PHE_DUYET', 'THAY_THE');

-- CreateEnum
CREATE TYPE "M33AccountType" AS ENUM ('CA_NHAN_DINH_DANH', 'DAC_QUYEN_QUAN_TRI', 'DICH_VU_HE_THONG', 'BEN_THU_BA', 'DUNG_CHUNG_NGOAI_LE');

-- CreateEnum
CREATE TYPE "M33AccountStatus" AS ENUM ('DANG_HOAT_DONG', 'TAM_KHOA', 'DA_THU_HOI');

-- CreateEnum
CREATE TYPE "M33ReconScope" AS ENUM ('TOAN_BO', 'DAC_QUYEN_DICH_VU');

-- CreateEnum
CREATE TYPE "M33ReconStatus" AS ENUM ('DANG_THUC_HIEN', 'DA_CHOT');

-- CreateEnum
CREATE TYPE "M33IncidentKind" AS ENUM ('SU_CO', 'YEU_CAU_HO_TRO');

-- CreateEnum
CREATE TYPE "M33Impact" AS ENUM ('NGUNG_TOAN_VIEN', 'NGUNG_MOT_PHONG', 'ANH_HUONG_MOT_NGUOI', 'KHONG_ANH_HUONG');

-- CreateEnum
CREATE TYPE "M33Priority" AS ENUM ('CAO', 'TRUNG_BINH', 'THAP');

-- CreateEnum
CREATE TYPE "M33IncidentStatus" AS ENUM ('MOI', 'DANG_XU_LY', 'CHO_BEN_THU_BA', 'DA_XU_LY', 'DA_DONG', 'HUY');

-- CreateEnum
CREATE TYPE "M33ItemType" AS ENUM ('ASSET', 'PLAN', 'TASK', 'ACCOUNT', 'RECONCILIATION', 'INCIDENT');

-- CreateTable
CREATE TABLE "M33ITAsset" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "assetClass" "M33AssetClass" NOT NULL,
    "model" TEXT,
    "serial" TEXT,
    "networkZone" "M33NetworkZone",
    "environment" "M33Environment" NOT NULL DEFAULT 'VAN_HANH',
    "location" TEXT NOT NULL,
    "userOwnerId" TEXT NOT NULL,
    "custodianId" TEXT NOT NULL,
    "criticality" "M33Criticality" NOT NULL DEFAULT 'THAP',
    "platformRefs" TEXT[],
    "infoAssetRefs" TEXT[],
    "measuringDeviceRef" TEXT,
    "maxClassification" "Classification" NOT NULL DEFAULT 'NOI_BO',
    "diskEncryption" BOOLEAN NOT NULL DEFAULT false,
    "screenLock" BOOLEAN,
    "antimalware" BOOLEAN,
    "defaultPasswordChanged" BOOLEAN,
    "unusedServicesClosed" BOOLEAN,
    "osVersion" TEXT,
    "patchLevel" TEXT,
    "lastPatchedAt" TIMESTAMP(3),
    "commissionedAt" TIMESTAMP(3),
    "handoverRecordRef" TEXT,
    "isPersonalDevice" BOOLEAN NOT NULL DEFAULT false,
    "byodApprovalRef" TEXT,
    "licenseType" TEXT,
    "licenseExpiry" TIMESTAMP(3),
    "warrantyUntil" TIMESTAMP(3),
    "maintenanceContractRef" TEXT,
    "eolDate" TIMESTAMP(3),
    "replacementPlan" TEXT,
    "maintenanceCycle" "M33MaintenanceCycle" NOT NULL DEFAULT 'NAM',
    "lastMaintainedAt" TIMESTAMP(3),
    "recoveryTimeObjective" TEXT,
    "failoverPlan" TEXT,
    "riskRefs" TEXT[],
    "reviewCycleMonths" INTEGER NOT NULL DEFAULT 12,
    "lastReviewedAt" TIMESTAMP(3),
    "discoverySource" "M33DiscoverySource" NOT NULL DEFAULT 'KIEM_KE_KY_DAU',
    "inventoryDueAt" TIMESTAMP(3),
    "networkIsolated" BOOLEAN NOT NULL DEFAULT false,
    "status" "M33AssetStatus" NOT NULL DEFAULT 'DRAFT',
    "reason" TEXT,
    "disposalEvidenceRef" TEXT,
    "createdById" TEXT NOT NULL,
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M33ITAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M33MaintenancePlan" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "downtimeNeeds" TEXT,
    "resourceNeeds" TEXT,
    "status" "M33PlanStatus" NOT NULL DEFAULT 'DRAFT',
    "reason" TEXT,
    "createdById" TEXT NOT NULL,
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M33MaintenancePlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M33MaintenanceTask" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "taskType" "M33MaintenanceType" NOT NULL,
    "severity" "M33Severity",
    "plannedAt" TIMESTAMP(3),
    "dueAt" TIMESTAMP(3),
    "planId" TEXT,
    "changeRef" TEXT,
    "impactAssessmentRef" TEXT,
    "measurementImpactRef" TEXT,
    "methodImpactRef" TEXT,
    "emergencyOrderRef" TEXT,
    "userNotifiedAt" TIMESTAMP(3),
    "performedById" TEXT,
    "performedAt" TIMESTAMP(3),
    "result" "M33TaskResult",
    "evidenceRef" TEXT,
    "acceptedById" TEXT,
    "acceptedAt" TIMESTAMP(3),
    "postCheckResult" TEXT,
    "downtimeMinutes" INTEGER,
    "status" "M33TaskStatus" NOT NULL DEFAULT 'KE_HOACH',
    "reason" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M33MaintenanceTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M33SystemAccount" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "assetId" TEXT,
    "platformRef" TEXT,
    "loginName" TEXT NOT NULL,
    "accountType" "M33AccountType" NOT NULL,
    "holderId" TEXT,
    "holderNote" TEXT,
    "accessRequestRef" TEXT NOT NULL,
    "grantedAt" TIMESTAMP(3) NOT NULL,
    "secretLocation" TEXT NOT NULL,
    "secretIssuer" TEXT NOT NULL,
    "mfaEnabled" BOOLEAN NOT NULL DEFAULT false,
    "validUntil" TIMESTAMP(3),
    "sharedApprovalRef" TEXT,
    "lastReviewRef" TEXT,
    "hrEventRef" TEXT,
    "revocationDueAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "status" "M33AccountStatus" NOT NULL DEFAULT 'DANG_HOAT_DONG',
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M33SystemAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M33AccountReconciliation" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "scope" "M33ReconScope" NOT NULL,
    "orphanAccountIds" TEXT[],
    "orphanRequestRefs" TEXT[],
    "expiredAccountIds" TEXT[],
    "mfaMissingIds" TEXT[],
    "performedById" TEXT NOT NULL,
    "reviewedById" TEXT,
    "submittedToLdvAt" TIMESTAMP(3),
    "status" "M33ReconStatus" NOT NULL DEFAULT 'DANG_THUC_HIEN',
    "closedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M33AccountReconciliation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M33ITIncident" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "kind" "M33IncidentKind" NOT NULL,
    "reportedById" TEXT NOT NULL,
    "reportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "impact" "M33Impact" NOT NULL,
    "priority" "M33Priority" NOT NULL,
    "responseDueAt" TIMESTAMP(3),
    "respondedAt" TIMESTAMP(3),
    "resolutionDueAt" TIMESTAMP(3),
    "escalatedToLdvAt" TIMESTAMP(3),
    "securityFlag" BOOLEAN NOT NULL DEFAULT false,
    "securityIncidentRef" TEXT,
    "securityConcluded" BOOLEAN NOT NULL DEFAULT false,
    "platformIncidentRef" TEXT,
    "measurementImpactRef" TEXT,
    "continuityRef" TEXT,
    "capaRef" TEXT,
    "lessonRef" TEXT,
    "noLessonReason" TEXT,
    "maintenanceRef" TEXT,
    "assignedToId" TEXT,
    "rootCause" TEXT,
    "resolution" TEXT,
    "assetBackToNormal" BOOLEAN,
    "status" "M33IncidentStatus" NOT NULL DEFAULT 'MOI',
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M33ITIncident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M33AuditEntry" (
    "id" TEXT NOT NULL,
    "itemType" "M33ItemType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "M33AuditEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_M33ITAssetToM33MaintenanceTask" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_M33ITAssetToM33MaintenanceTask_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_M33ITAssetToM33MaintenancePlan" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_M33ITAssetToM33MaintenancePlan_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_M33ITAssetToM33ITIncident" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_M33ITAssetToM33ITIncident_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "M33ITAsset_code_key" ON "M33ITAsset"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M33ITAsset_serial_key" ON "M33ITAsset"("serial");

-- CreateIndex
CREATE INDEX "M33ITAsset_status_assetClass_idx" ON "M33ITAsset"("status", "assetClass");

-- CreateIndex
CREATE INDEX "M33ITAsset_eolDate_idx" ON "M33ITAsset"("eolDate");

-- CreateIndex
CREATE INDEX "M33ITAsset_licenseExpiry_idx" ON "M33ITAsset"("licenseExpiry");

-- CreateIndex
CREATE INDEX "M33ITAsset_warrantyUntil_idx" ON "M33ITAsset"("warrantyUntil");

-- CreateIndex
CREATE INDEX "M33ITAsset_lastMaintainedAt_idx" ON "M33ITAsset"("lastMaintainedAt");

-- CreateIndex
CREATE INDEX "M33ITAsset_lastReviewedAt_idx" ON "M33ITAsset"("lastReviewedAt");

-- CreateIndex
CREATE INDEX "M33ITAsset_inventoryDueAt_idx" ON "M33ITAsset"("inventoryDueAt");

-- CreateIndex
CREATE UNIQUE INDEX "M33MaintenancePlan_code_key" ON "M33MaintenancePlan"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M33MaintenanceTask_code_key" ON "M33MaintenanceTask"("code");

-- CreateIndex
CREATE INDEX "M33MaintenanceTask_status_dueAt_idx" ON "M33MaintenanceTask"("status", "dueAt");

-- CreateIndex
CREATE UNIQUE INDEX "M33SystemAccount_code_key" ON "M33SystemAccount"("code");

-- CreateIndex
CREATE INDEX "M33SystemAccount_status_revocationDueAt_idx" ON "M33SystemAccount"("status", "revocationDueAt");

-- CreateIndex
CREATE INDEX "M33SystemAccount_validUntil_idx" ON "M33SystemAccount"("validUntil");

-- CreateIndex
CREATE UNIQUE INDEX "M33AccountReconciliation_code_key" ON "M33AccountReconciliation"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M33AccountReconciliation_period_scope_key" ON "M33AccountReconciliation"("period", "scope");

-- CreateIndex
CREATE UNIQUE INDEX "M33ITIncident_code_key" ON "M33ITIncident"("code");

-- CreateIndex
CREATE INDEX "M33ITIncident_status_priority_idx" ON "M33ITIncident"("status", "priority");

-- CreateIndex
CREATE INDEX "M33ITIncident_responseDueAt_idx" ON "M33ITIncident"("responseDueAt");

-- CreateIndex
CREATE INDEX "M33AuditEntry_itemType_itemId_idx" ON "M33AuditEntry"("itemType", "itemId");

-- CreateIndex
CREATE INDEX "_M33ITAssetToM33MaintenanceTask_B_index" ON "_M33ITAssetToM33MaintenanceTask"("B");

-- CreateIndex
CREATE INDEX "_M33ITAssetToM33MaintenancePlan_B_index" ON "_M33ITAssetToM33MaintenancePlan"("B");

-- CreateIndex
CREATE INDEX "_M33ITAssetToM33ITIncident_B_index" ON "_M33ITAssetToM33ITIncident"("B");

-- AddForeignKey
ALTER TABLE "M33ITAsset" ADD CONSTRAINT "M33ITAsset_userOwnerId_fkey" FOREIGN KEY ("userOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M33ITAsset" ADD CONSTRAINT "M33ITAsset_custodianId_fkey" FOREIGN KEY ("custodianId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M33ITAsset" ADD CONSTRAINT "M33ITAsset_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M33ITAsset" ADD CONSTRAINT "M33ITAsset_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M33MaintenancePlan" ADD CONSTRAINT "M33MaintenancePlan_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M33MaintenancePlan" ADD CONSTRAINT "M33MaintenancePlan_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M33MaintenanceTask" ADD CONSTRAINT "M33MaintenanceTask_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M33MaintenanceTask" ADD CONSTRAINT "M33MaintenanceTask_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M33MaintenanceTask" ADD CONSTRAINT "M33MaintenanceTask_acceptedById_fkey" FOREIGN KEY ("acceptedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M33MaintenanceTask" ADD CONSTRAINT "M33MaintenanceTask_planId_fkey" FOREIGN KEY ("planId") REFERENCES "M33MaintenancePlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M33SystemAccount" ADD CONSTRAINT "M33SystemAccount_holderId_fkey" FOREIGN KEY ("holderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M33SystemAccount" ADD CONSTRAINT "M33SystemAccount_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "M33ITAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M33AccountReconciliation" ADD CONSTRAINT "M33AccountReconciliation_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M33ITIncident" ADD CONSTRAINT "M33ITIncident_reportedById_fkey" FOREIGN KEY ("reportedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M33ITIncident" ADD CONSTRAINT "M33ITIncident_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M33AuditEntry" ADD CONSTRAINT "M33AuditEntry_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_M33ITAssetToM33MaintenanceTask" ADD CONSTRAINT "_M33ITAssetToM33MaintenanceTask_A_fkey" FOREIGN KEY ("A") REFERENCES "M33ITAsset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_M33ITAssetToM33MaintenanceTask" ADD CONSTRAINT "_M33ITAssetToM33MaintenanceTask_B_fkey" FOREIGN KEY ("B") REFERENCES "M33MaintenanceTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_M33ITAssetToM33MaintenancePlan" ADD CONSTRAINT "_M33ITAssetToM33MaintenancePlan_A_fkey" FOREIGN KEY ("A") REFERENCES "M33ITAsset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_M33ITAssetToM33MaintenancePlan" ADD CONSTRAINT "_M33ITAssetToM33MaintenancePlan_B_fkey" FOREIGN KEY ("B") REFERENCES "M33MaintenancePlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_M33ITAssetToM33ITIncident" ADD CONSTRAINT "_M33ITAssetToM33ITIncident_A_fkey" FOREIGN KEY ("A") REFERENCES "M33ITAsset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_M33ITAssetToM33ITIncident" ADD CONSTRAINT "_M33ITAssetToM33ITIncident_B_fkey" FOREIGN KEY ("B") REFERENCES "M33ITIncident"("id") ON DELETE CASCADE ON UPDATE CASCADE;
