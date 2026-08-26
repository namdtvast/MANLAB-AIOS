-- CreateEnum
CREATE TYPE "M28TreatmentOption" AS ENUM ('GIAM_THIEU', 'TRANH', 'CHIA_SE', 'CHAP_NHAN');

-- CreateEnum
CREATE TYPE "M28RiskStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'REVIEW_REJECTED', 'PENDING_APPROVAL', 'APPROVAL_REJECTED', 'DANG_XU_LY', 'DA_XU_LY', 'CHAP_NHAN_TON_DU', 'HET_HIEU_LUC');

-- CreateEnum
CREATE TYPE "M28TreatmentStatus" AS ENUM ('MO', 'DANG_THUC_HIEN', 'HOAN_THANH');

-- CreateEnum
CREATE TYPE "M28SoAStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'PENDING_APPROVAL', 'DA_PHE_DUYET', 'HET_HIEU_LUC');

-- CreateEnum
CREATE TYPE "M28ImplementationStatus" AS ENUM ('CHUA_THUC_HIEN', 'DANG_THUC_HIEN', 'DA_THUC_HIEN');

-- CreateEnum
CREATE TYPE "M28Severity" AS ENUM ('THAP', 'TRUNG_BINH', 'CAO', 'RAT_CAO');

-- CreateEnum
CREATE TYPE "M28IncidentStatus" AS ENUM ('MOI', 'DANG_KHONG_CHE', 'DANG_DIEU_TRA', 'DANG_KHAC_PHUC', 'CHO_KET_LUAN', 'DA_DONG', 'HUY');

-- CreateEnum
CREATE TYPE "M28TriState" AS ENUM ('CO', 'KHONG', 'CHUA_XAC_DINH');

-- CreateEnum
CREATE TYPE "M28SubjectType" AS ENUM ('NHAN_SU_CHINH_THUC', 'THU_VIEC', 'CHUYEN_GIA_NHA_THAU', 'NHA_CUNG_CAP_CNTT');

-- CreateEnum
CREATE TYPE "M28RequestType" AS ENUM ('CAP_MOI', 'THAY_DOI', 'THU_HOI_MOT_PHAN', 'THU_HOI_TOAN_BO');

-- CreateEnum
CREATE TYPE "M28AccessStatus" AS ENUM ('DE_NGHI', 'CHO_PHE_DUYET', 'DA_PHE_DUYET', 'DA_THUC_HIEN', 'TU_CHOI', 'DA_THU_HOI');

-- CreateEnum
CREATE TYPE "M28ReviewScope" AS ENUM ('PHONG', 'TAI_KHOAN_DAC_QUYEN');

-- CreateEnum
CREATE TYPE "M28ItemType" AS ENUM ('RISK', 'TREATMENT', 'SOA_VERSION', 'INCIDENT', 'ACCESS_REQUEST', 'ACCESS_REVIEW');

-- CreateTable
CREATE TABLE "M28SecurityRisk" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "assetRefs" TEXT[],
    "classification" "Classification" NOT NULL,
    "threat" TEXT NOT NULL,
    "vulnerability" TEXT NOT NULL,
    "existingControls" TEXT,
    "impactC" INTEGER NOT NULL,
    "impactI" INTEGER NOT NULL,
    "impactA" INTEGER NOT NULL,
    "likelihood" INTEGER NOT NULL,
    "impact" INTEGER NOT NULL,
    "riskScore" INTEGER NOT NULL,
    "treatmentOption" "M28TreatmentOption" NOT NULL,
    "soaControlRefs" TEXT[],
    "ownerId" TEXT NOT NULL,
    "residualLikelihood" INTEGER,
    "residualImpact" INTEGER,
    "residualScore" INTEGER,
    "residualAcceptedById" TEXT,
    "residualAcceptedAt" TIMESTAMP(3),
    "residualAcceptReason" TEXT,
    "m01RiskRef" TEXT,
    "bcpInput" BOOLEAN NOT NULL DEFAULT false,
    "lastAssessedAt" TIMESTAMP(3),
    "status" "M28RiskStatus" NOT NULL DEFAULT 'DRAFT',
    "reason" TEXT,
    "createdById" TEXT NOT NULL,
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M28SecurityRisk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M28RiskTreatment" (
    "id" TEXT NOT NULL,
    "riskId" TEXT NOT NULL,
    "measure" TEXT NOT NULL,
    "soaControlRef" TEXT NOT NULL,
    "responsibleId" TEXT NOT NULL,
    "resources" TEXT,
    "dueAt" TIMESTAMP(3) NOT NULL,
    "interimMeasure" TEXT,
    "verificationMethod" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3),
    "verifiedById" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "status" "M28TreatmentStatus" NOT NULL DEFAULT 'MO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M28RiskTreatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M28SoAVersion" (
    "id" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "scopeOrganization" TEXT NOT NULL,
    "scopeLocation" TEXT NOT NULL,
    "scopeInformation" TEXT NOT NULL,
    "scopeSystems" TEXT NOT NULL,
    "scopeInterfaces" TEXT NOT NULL,
    "scopeExclusions" TEXT,
    "effectiveDate" TIMESTAMP(3),
    "supersedesId" TEXT,
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "status" "M28SoAStatus" NOT NULL DEFAULT 'DRAFT',
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M28SoAVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M28SoAControl" (
    "id" TEXT NOT NULL,
    "soaVersionId" TEXT NOT NULL,
    "controlCode" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "applicable" BOOLEAN NOT NULL DEFAULT true,
    "justification" TEXT,
    "exclusionReason" TEXT,
    "implementation" TEXT,
    "responsibleId" TEXT,
    "implementationStatus" "M28ImplementationStatus" NOT NULL DEFAULT 'CHUA_THUC_HIEN',
    "evidenceRefs" TEXT[],
    "evidenceDueAt" TIMESTAMP(3),

    CONSTRAINT "M28SoAControl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M28SecurityIncident" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "reporterId" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3),
    "detectedAt" TIMESTAMP(3) NOT NULL,
    "reportedAt" TIMESTAMP(3) NOT NULL,
    "symptom" TEXT NOT NULL,
    "assetRefs" TEXT[],
    "classification" "Classification" NOT NULL,
    "involvesCustomerData" "M28TriState" NOT NULL DEFAULT 'CHUA_XAC_DINH',
    "involvesPersonalData" "M28TriState" NOT NULL DEFAULT 'CHUA_XAC_DINH',
    "severity" "M28Severity" NOT NULL,
    "containedAt" TIMESTAMP(3),
    "containmentActions" TEXT,
    "evidencePreserved" TEXT,
    "directCause" TEXT,
    "scopeOfImpact" TEXT,
    "affectsResultValidity" BOOLEAN NOT NULL DEFAULT false,
    "m10Ref" TEXT,
    "m11Ref" TEXT,
    "notifications" JSONB,
    "recoveryAt" TIMESTAMP(3),
    "riskRefs" TEXT[],
    "capaRef" TEXT,
    "lessonRef" TEXT,
    "closedById" TEXT,
    "closedAt" TIMESTAMP(3),
    "status" "M28IncidentStatus" NOT NULL DEFAULT 'MOI',
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M28SecurityIncident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M28AccessRequest" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "subjectId" TEXT,
    "subjectExternal" TEXT,
    "subjectType" "M28SubjectType" NOT NULL,
    "ndaRef" TEXT,
    "awarenessTrainingRef" TEXT,
    "requestType" "M28RequestType" NOT NULL,
    "reason" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "mfaRequired" BOOLEAN NOT NULL DEFAULT false,
    "requestedById" TEXT NOT NULL,
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "executedById" TEXT,
    "executedAt" TIMESTAMP(3),
    "systemLogRef" TEXT,
    "revokedAt" TIMESTAMP(3),
    "assetsReturned" BOOLEAN NOT NULL DEFAULT false,
    "status" "M28AccessStatus" NOT NULL DEFAULT 'DE_NGHI',
    "statusReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M28AccessRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M28AccessReview" (
    "id" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "scope" "M28ReviewScope" NOT NULL,
    "department" TEXT,
    "accountsReviewed" INTEGER NOT NULL DEFAULT 0,
    "excessFound" INTEGER NOT NULL DEFAULT 0,
    "revoked" INTEGER NOT NULL DEFAULT 0,
    "revocationRefs" TEXT[],
    "reviewerId" TEXT NOT NULL,
    "reviewedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M28AccessReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M28AuditEntry" (
    "id" TEXT NOT NULL,
    "itemType" "M28ItemType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "M28AuditEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "M28SecurityRisk_code_key" ON "M28SecurityRisk"("code");

-- CreateIndex
CREATE INDEX "M28SecurityRisk_status_riskScore_idx" ON "M28SecurityRisk"("status", "riskScore");

-- CreateIndex
CREATE INDEX "M28SecurityRisk_classification_idx" ON "M28SecurityRisk"("classification");

-- CreateIndex
CREATE INDEX "M28SecurityRisk_lastAssessedAt_idx" ON "M28SecurityRisk"("lastAssessedAt");

-- CreateIndex
CREATE INDEX "M28SecurityRisk_bcpInput_idx" ON "M28SecurityRisk"("bcpInput");

-- CreateIndex
CREATE INDEX "M28RiskTreatment_riskId_idx" ON "M28RiskTreatment"("riskId");

-- CreateIndex
CREATE INDEX "M28RiskTreatment_status_dueAt_idx" ON "M28RiskTreatment"("status", "dueAt");

-- CreateIndex
CREATE UNIQUE INDEX "M28SoAVersion_version_key" ON "M28SoAVersion"("version");

-- CreateIndex
CREATE INDEX "M28SoAVersion_status_idx" ON "M28SoAVersion"("status");

-- CreateIndex
CREATE INDEX "M28SoAControl_applicable_implementationStatus_idx" ON "M28SoAControl"("applicable", "implementationStatus");

-- CreateIndex
CREATE INDEX "M28SoAControl_evidenceDueAt_idx" ON "M28SoAControl"("evidenceDueAt");

-- CreateIndex
CREATE UNIQUE INDEX "M28SoAControl_soaVersionId_controlCode_key" ON "M28SoAControl"("soaVersionId", "controlCode");

-- CreateIndex
CREATE UNIQUE INDEX "M28SecurityIncident_code_key" ON "M28SecurityIncident"("code");

-- CreateIndex
CREATE INDEX "M28SecurityIncident_status_severity_idx" ON "M28SecurityIncident"("status", "severity");

-- CreateIndex
CREATE INDEX "M28SecurityIncident_detectedAt_idx" ON "M28SecurityIncident"("detectedAt");

-- CreateIndex
CREATE INDEX "M28SecurityIncident_classification_idx" ON "M28SecurityIncident"("classification");

-- CreateIndex
CREATE UNIQUE INDEX "M28AccessRequest_code_key" ON "M28AccessRequest"("code");

-- CreateIndex
CREATE INDEX "M28AccessRequest_status_requestType_idx" ON "M28AccessRequest"("status", "requestType");

-- CreateIndex
CREATE INDEX "M28AccessRequest_revokedAt_idx" ON "M28AccessRequest"("revokedAt");

-- CreateIndex
CREATE INDEX "M28AccessReview_scope_reviewedAt_idx" ON "M28AccessReview"("scope", "reviewedAt");

-- CreateIndex
CREATE INDEX "M28AuditEntry_itemType_itemId_idx" ON "M28AuditEntry"("itemType", "itemId");

-- AddForeignKey
ALTER TABLE "M28SecurityRisk" ADD CONSTRAINT "M28SecurityRisk_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M28SecurityRisk" ADD CONSTRAINT "M28SecurityRisk_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M28SecurityRisk" ADD CONSTRAINT "M28SecurityRisk_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M28SecurityRisk" ADD CONSTRAINT "M28SecurityRisk_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M28SecurityRisk" ADD CONSTRAINT "M28SecurityRisk_residualAcceptedById_fkey" FOREIGN KEY ("residualAcceptedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M28RiskTreatment" ADD CONSTRAINT "M28RiskTreatment_riskId_fkey" FOREIGN KEY ("riskId") REFERENCES "M28SecurityRisk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M28RiskTreatment" ADD CONSTRAINT "M28RiskTreatment_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M28RiskTreatment" ADD CONSTRAINT "M28RiskTreatment_verifiedById_fkey" FOREIGN KEY ("verifiedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M28SoAVersion" ADD CONSTRAINT "M28SoAVersion_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M28SoAControl" ADD CONSTRAINT "M28SoAControl_soaVersionId_fkey" FOREIGN KEY ("soaVersionId") REFERENCES "M28SoAVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M28SoAControl" ADD CONSTRAINT "M28SoAControl_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M28SecurityIncident" ADD CONSTRAINT "M28SecurityIncident_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M28SecurityIncident" ADD CONSTRAINT "M28SecurityIncident_closedById_fkey" FOREIGN KEY ("closedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M28AccessRequest" ADD CONSTRAINT "M28AccessRequest_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M28AccessRequest" ADD CONSTRAINT "M28AccessRequest_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M28AccessRequest" ADD CONSTRAINT "M28AccessRequest_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M28AccessRequest" ADD CONSTRAINT "M28AccessRequest_executedById_fkey" FOREIGN KEY ("executedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M28AccessReview" ADD CONSTRAINT "M28AccessReview_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M28AuditEntry" ADD CONSTRAINT "M28AuditEntry_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
