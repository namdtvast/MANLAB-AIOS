-- CreateEnum
CREATE TYPE "M14DocType" AS ENUM ('SO_TAY', 'THU_TUC', 'QUY_TRINH', 'HUONG_DAN', 'BIEU_MAU', 'QUYET_DINH', 'CONG_VAN', 'THONG_BAO', 'BIEN_BAN', 'BAO_CAO', 'GIAY_CHUNG_NHAN', 'VAN_BAN_BEN_NGOAI');

-- CreateEnum
CREATE TYPE "M14DocStatus" AS ENUM ('NHAP', 'CHO_SOAT_XET', 'KHONG_SOAT_XET', 'CHO_PHE_DUYET', 'KHONG_PHE_DUYET', 'DA_PHE_DUYET', 'HET_HIEU_LUC_HUY');

-- CreateEnum
CREATE TYPE "M14KnowledgeCategory" AS ENUM ('NOI_BO', 'CONG_KHAI', 'MAT');

-- CreateEnum
CREATE TYPE "M14DisposalType" AS ENUM ('THANH_LY', 'HUY_BO');

-- CreateEnum
CREATE TYPE "M14ItemType" AS ENUM ('DOCUMENT', 'SUGGESTION');

-- CreateTable
CREATE TABLE "M14Document" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "docType" "M14DocType" NOT NULL,
    "owner" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "processCode" TEXT,
    "effectiveDate" TIMESTAMP(3),
    "revision" TEXT,
    "keywords" TEXT[],
    "relatedDocuments" TEXT[],
    "isoClause" TEXT[],
    "legalBasis" TEXT[],
    "aiTags" TEXT[],
    "knowledgeCategory" "M14KnowledgeCategory",
    "permissionGroup" TEXT,
    "retention" TEXT,
    "digitalSignature" TEXT,
    "sourceOrg" TEXT,
    "status" "M14DocStatus" NOT NULL DEFAULT 'NHAP',
    "disposalType" "M14DisposalType",
    "reviewNote" TEXT,
    "publishedAt" TIMESTAMP(3),
    "publishedById" TEXT,
    "distributionNote" TEXT,
    "supersedesId" TEXT,
    "createdById" TEXT NOT NULL,
    "reviewedById" TEXT,
    "approvedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M14Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M14AiSuggestion" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "suggestedValue" TEXT NOT NULL,
    "rationale" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appliedById" TEXT,
    "appliedAt" TIMESTAMP(3),

    CONSTRAINT "M14AiSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M14AuditEntry" (
    "id" TEXT NOT NULL,
    "itemType" "M14ItemType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "M14AuditEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "M14Document_code_key" ON "M14Document"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M14Document_supersedesId_key" ON "M14Document"("supersedesId");

-- AddForeignKey
ALTER TABLE "M14Document" ADD CONSTRAINT "M14Document_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M14Document" ADD CONSTRAINT "M14Document_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M14Document" ADD CONSTRAINT "M14Document_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M14Document" ADD CONSTRAINT "M14Document_publishedById_fkey" FOREIGN KEY ("publishedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M14Document" ADD CONSTRAINT "M14Document_supersedesId_fkey" FOREIGN KEY ("supersedesId") REFERENCES "M14Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M14AiSuggestion" ADD CONSTRAINT "M14AiSuggestion_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "M14Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M14AiSuggestion" ADD CONSTRAINT "M14AiSuggestion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M14AiSuggestion" ADD CONSTRAINT "M14AiSuggestion_appliedById_fkey" FOREIGN KEY ("appliedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M14AuditEntry" ADD CONSTRAINT "M14AuditEntry_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
