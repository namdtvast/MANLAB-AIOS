-- CreateEnum
CREATE TYPE "M26KnowledgeForm" AS ENUM ('TRI_THUC_HIEN', 'TRI_THUC_AN');

-- CreateEnum
CREATE TYPE "M26Category" AS ENUM ('PHAP_LY_TIEU_CHUAN', 'KY_THUAT_DO_LUONG', 'VAN_HANH_THIET_BI', 'BAI_HOC_TINH_HUONG', 'HE_THONG_QUAN_LY', 'KHACH_HANG_DICH_VU', 'SO_HOA_DU_LIEU_AI', 'NGHIEN_CUU_PHAT_TRIEN');

-- CreateEnum
CREATE TYPE "M26Origin" AS ENUM ('NOI_BO', 'BEN_NGOAI');

-- CreateEnum
CREATE TYPE "M26Criticality" AS ENUM ('THAP', 'TRUNG_BINH', 'CAO');

-- CreateEnum
CREATE TYPE "M26Confidentiality" AS ENUM ('CONG_KHAI', 'NOI_BO', 'HAN_CHE', 'MAT');

-- CreateEnum
CREATE TYPE "M26ReviewCycle" AS ENUM ('SAU_THANG', 'NAM', 'HAI_NAM', 'THEO_SU_KIEN');

-- CreateEnum
CREATE TYPE "M26ItemStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'REVIEW_REJECTED', 'PENDING_APPROVAL', 'APPROVAL_REJECTED', 'APPROVED', 'RETIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "M26LessonSource" AS ENUM ('KPH_CAPA', 'KHIEU_NAI', 'KET_QUA_NGOAI_KIEM_SOAT', 'DANH_GIA', 'SU_CO_THIET_BI', 'SU_CO_ATTT', 'SU_CO_AI', 'HOP_DONG_DU_AN', 'NGHIEN_CUU');

-- CreateEnum
CREATE TYPE "M26LessonStatus" AS ENUM ('MOI', 'DANG_PHAN_TICH', 'CHO_PHE_DUYET', 'DA_PHE_DUYET', 'HUY');

-- CreateEnum
CREATE TYPE "M26NeedTrigger" AS ENUM ('PHUONG_PHAP_MOI', 'THIET_BI_MOI', 'MO_RONG_PHAM_VI', 'BIEN_DONG_NHAN_SU', 'CONG_NGHE_AI_MOI', 'THAY_DOI_PHAP_LUAT', 'VAN_DE_BOI_CANH', 'KPH_LAP_LAI', 'CHUYEN_GIAO_TRI_THUC_AN');

-- CreateEnum
CREATE TYPE "M26NeedMethod" AS ENUM ('DAO_TAO_NOI_BO', 'DAO_TAO_BEN_NGOAI', 'TUYEN_DUNG', 'THUE_CHUYEN_GIA', 'MUA_TAI_LIEU', 'NGHIEN_CUU_NOI_BO', 'HOP_TAC_CHUYEN_GIAO', 'KEM_CAP', 'VAN_BAN_HOA');

-- CreateEnum
CREATE TYPE "M26NeedStatus" AS ENUM ('MO', 'DANG_BO_SUNG', 'DA_DAP_UNG', 'KHONG_THUC_HIEN');

-- CreateEnum
CREATE TYPE "M26SharingForm" AS ENUM ('SINH_HOAT_CHUYEN_MON', 'DAO_TAO_NOI_BO', 'KEM_CAP', 'BAN_TIN_FAQ', 'PHO_BIEN_HOI_THAO', 'BAN_GIAO_NHAN_SU');

-- CreateEnum
CREATE TYPE "M26SharingStatus" AS ENUM ('KE_HOACH', 'DA_THUC_HIEN', 'HUY');

-- CreateEnum
CREATE TYPE "M26ItemType" AS ENUM ('ITEM', 'LESSON', 'NEED', 'SHARING');

-- CreateTable
CREATE TABLE "M26KnowledgeItem" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "knowledgeForm" "M26KnowledgeForm" NOT NULL,
    "category" "M26Category" NOT NULL,
    "origin" "M26Origin" NOT NULL,
    "summary" TEXT NOT NULL,
    "sourceRef" TEXT,
    "docId" TEXT,
    "ownerId" TEXT NOT NULL,
    "criticality" "M26Criticality" NOT NULL,
    "confidentiality" "M26Confidentiality" NOT NULL,
    "appliesTo" TEXT[],
    "reviewCycle" "M26ReviewCycle" NOT NULL,
    "lastReviewedAt" TIMESTAMP(3),
    "aiIndexed" BOOLEAN NOT NULL DEFAULT false,
    "version" INTEGER NOT NULL DEFAULT 1,
    "supersedesId" TEXT,
    "status" "M26ItemStatus" NOT NULL DEFAULT 'DRAFT',
    "reason" TEXT,
    "createdById" TEXT NOT NULL,
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "retiredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M26KnowledgeItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M26KnowledgeHolder" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M26KnowledgeHolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M26ItemRiskLink" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "riskId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M26ItemRiskLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M26LessonLearned" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sourceType" "M26LessonSource" NOT NULL,
    "sourceRef" TEXT NOT NULL,
    "m13NcId" TEXT,
    "context" TEXT NOT NULL,
    "rootCauseRef" TEXT,
    "lesson" TEXT NOT NULL,
    "recommendedAction" TEXT NOT NULL,
    "knowledgeItemId" TEXT,
    "shareRequired" BOOLEAN NOT NULL DEFAULT false,
    "status" "M26LessonStatus" NOT NULL DEFAULT 'MOI',
    "reason" TEXT,
    "createdById" TEXT NOT NULL,
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M26LessonLearned_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M26KnowledgeNeed" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "trigger" "M26NeedTrigger" NOT NULL,
    "triggerRef" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requiredBy" TIMESTAMP(3) NOT NULL,
    "method" "M26NeedMethod" NOT NULL,
    "responsibleId" TEXT NOT NULL,
    "resultItemId" TEXT,
    "resultTrainingId" TEXT,
    "status" "M26NeedStatus" NOT NULL DEFAULT 'MO',
    "reason" TEXT,
    "createdById" TEXT NOT NULL,
    "decidedById" TEXT,
    "decidedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M26KnowledgeNeed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M26SharingEvent" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "form" "M26SharingForm" NOT NULL,
    "heldAt" TIMESTAMP(3) NOT NULL,
    "topic" TEXT NOT NULL,
    "presenterId" TEXT NOT NULL,
    "evidenceTrainingId" TEXT,
    "evidenceRef" TEXT,
    "handoverNote" TEXT,
    "effectivenessNote" TEXT,
    "status" "M26SharingStatus" NOT NULL DEFAULT 'KE_HOACH',
    "reason" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M26SharingEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M26SharingItem" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "M26SharingItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M26SharingParticipant" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "note" TEXT,

    CONSTRAINT "M26SharingParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M26AuditEntry" (
    "id" TEXT NOT NULL,
    "itemType" "M26ItemType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "before" TEXT,
    "after" TEXT,
    "reason" TEXT,

    CONSTRAINT "M26AuditEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "M26KnowledgeItem_code_key" ON "M26KnowledgeItem"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M26KnowledgeItem_supersedesId_key" ON "M26KnowledgeItem"("supersedesId");

-- CreateIndex
CREATE UNIQUE INDEX "M26KnowledgeHolder_itemId_userId_key" ON "M26KnowledgeHolder"("itemId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "M26ItemRiskLink_itemId_riskId_key" ON "M26ItemRiskLink"("itemId", "riskId");

-- CreateIndex
CREATE UNIQUE INDEX "M26LessonLearned_code_key" ON "M26LessonLearned"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M26KnowledgeNeed_code_key" ON "M26KnowledgeNeed"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M26SharingEvent_code_key" ON "M26SharingEvent"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M26SharingItem_eventId_itemId_key" ON "M26SharingItem"("eventId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "M26SharingParticipant_eventId_userId_key" ON "M26SharingParticipant"("eventId", "userId");

-- CreateIndex
CREATE INDEX "M26AuditEntry_itemType_itemId_idx" ON "M26AuditEntry"("itemType", "itemId");

-- AddForeignKey
ALTER TABLE "M26KnowledgeItem" ADD CONSTRAINT "M26KnowledgeItem_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26KnowledgeItem" ADD CONSTRAINT "M26KnowledgeItem_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26KnowledgeItem" ADD CONSTRAINT "M26KnowledgeItem_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26KnowledgeItem" ADD CONSTRAINT "M26KnowledgeItem_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26KnowledgeItem" ADD CONSTRAINT "M26KnowledgeItem_docId_fkey" FOREIGN KEY ("docId") REFERENCES "M14Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26KnowledgeItem" ADD CONSTRAINT "M26KnowledgeItem_supersedesId_fkey" FOREIGN KEY ("supersedesId") REFERENCES "M26KnowledgeItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26KnowledgeHolder" ADD CONSTRAINT "M26KnowledgeHolder_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "M26KnowledgeItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26KnowledgeHolder" ADD CONSTRAINT "M26KnowledgeHolder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26ItemRiskLink" ADD CONSTRAINT "M26ItemRiskLink_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "M26KnowledgeItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26ItemRiskLink" ADD CONSTRAINT "M26ItemRiskLink_riskId_fkey" FOREIGN KEY ("riskId") REFERENCES "M01RiskItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26LessonLearned" ADD CONSTRAINT "M26LessonLearned_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26LessonLearned" ADD CONSTRAINT "M26LessonLearned_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26LessonLearned" ADD CONSTRAINT "M26LessonLearned_knowledgeItemId_fkey" FOREIGN KEY ("knowledgeItemId") REFERENCES "M26KnowledgeItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26LessonLearned" ADD CONSTRAINT "M26LessonLearned_m13NcId_fkey" FOREIGN KEY ("m13NcId") REFERENCES "M13NonconformingWork"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26KnowledgeNeed" ADD CONSTRAINT "M26KnowledgeNeed_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26KnowledgeNeed" ADD CONSTRAINT "M26KnowledgeNeed_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26KnowledgeNeed" ADD CONSTRAINT "M26KnowledgeNeed_decidedById_fkey" FOREIGN KEY ("decidedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26KnowledgeNeed" ADD CONSTRAINT "M26KnowledgeNeed_resultItemId_fkey" FOREIGN KEY ("resultItemId") REFERENCES "M26KnowledgeItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26KnowledgeNeed" ADD CONSTRAINT "M26KnowledgeNeed_resultTrainingId_fkey" FOREIGN KEY ("resultTrainingId") REFERENCES "M03TrainingRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26SharingEvent" ADD CONSTRAINT "M26SharingEvent_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26SharingEvent" ADD CONSTRAINT "M26SharingEvent_presenterId_fkey" FOREIGN KEY ("presenterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26SharingEvent" ADD CONSTRAINT "M26SharingEvent_evidenceTrainingId_fkey" FOREIGN KEY ("evidenceTrainingId") REFERENCES "M03TrainingRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26SharingItem" ADD CONSTRAINT "M26SharingItem_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "M26SharingEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26SharingItem" ADD CONSTRAINT "M26SharingItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "M26KnowledgeItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26SharingParticipant" ADD CONSTRAINT "M26SharingParticipant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "M26SharingEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26SharingParticipant" ADD CONSTRAINT "M26SharingParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M26AuditEntry" ADD CONSTRAINT "M26AuditEntry_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
