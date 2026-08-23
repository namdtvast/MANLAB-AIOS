-- CreateEnum
CREATE TYPE "M12Channel" AS ENUM ('TRUC_TIEP', 'DIEN_THOAI', 'EMAIL', 'VAN_BAN', 'FORM_ONLINE');

-- CreateEnum
CREATE TYPE "M12ComplaintStatus" AS ENUM ('NHAP', 'DANG_XU_LY', 'DA_TRA_LOI', 'DONG_HO_SO', 'KHONG_DAT_THOA_THUAN');

-- CreateEnum
CREATE TYPE "M12FeedbackOrigin" AS ENUM ('KHACH_HANG', 'NOI_BO');

-- CreateEnum
CREATE TYPE "M12FeedbackCategory" AS ENUM ('QUY_TRINH', 'THAI_DO_PHUC_VU', 'PHOI_HOP_NOI_BO', 'DIEU_HANH', 'THOI_GIAN_XU_LY');

-- CreateEnum
CREATE TYPE "M12ItemType" AS ENUM ('COMPLAINT', 'FEEDBACK');

-- CreateTable
CREATE TABLE "M12Complaint" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "channel" "M12Channel" NOT NULL,
    "content" TEXT NOT NULL,
    "relatedCertificateRef" TEXT,
    "resolvedOnSpot" BOOLEAN NOT NULL DEFAULT false,
    "customerSatisfiedOnSpot" BOOLEAN,
    "isComplex" BOOLEAN NOT NULL DEFAULT false,
    "externalDocRef" TEXT,
    "status" "M12ComplaintStatus" NOT NULL DEFAULT 'NHAP',
    "resolution" TEXT,
    "customerSatisfied" BOOLEAN,
    "stopReason" TEXT,
    "capaRef" TEXT,
    "createdById" TEXT NOT NULL,
    "assignedToId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M12Complaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M12Feedback" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "origin" "M12FeedbackOrigin" NOT NULL,
    "category" "M12FeedbackCategory" NOT NULL,
    "content" TEXT NOT NULL,
    "source" TEXT,
    "escalatedComplaintId" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M12Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M12AuditEntry" (
    "id" TEXT NOT NULL,
    "itemType" "M12ItemType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "M12AuditEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "M12Complaint_code_key" ON "M12Complaint"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M12Feedback_code_key" ON "M12Feedback"("code");

-- AddForeignKey
ALTER TABLE "M12Complaint" ADD CONSTRAINT "M12Complaint_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M12Complaint" ADD CONSTRAINT "M12Complaint_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M12Feedback" ADD CONSTRAINT "M12Feedback_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M12Feedback" ADD CONSTRAINT "M12Feedback_escalatedComplaintId_fkey" FOREIGN KEY ("escalatedComplaintId") REFERENCES "M12Complaint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M12AuditEntry" ADD CONSTRAINT "M12AuditEntry_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
