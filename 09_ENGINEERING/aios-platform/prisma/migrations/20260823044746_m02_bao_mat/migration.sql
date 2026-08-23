-- CreateEnum
CREATE TYPE "M02CommitmentType" AS ENUM ('NHAN_VIEN', 'THU_VIEC', 'KHACH');

-- CreateEnum
CREATE TYPE "M02CommitmentStatus" AS ENUM ('HIEU_LUC', 'DA_THU_HOI');

-- CreateEnum
CREATE TYPE "M02DisclosureStatus" AS ENUM ('DRAFT', 'APPROVED');

-- CreateEnum
CREATE TYPE "M02AuthorityLevel" AS ENUM ('TP', 'LDV');

-- CreateEnum
CREATE TYPE "M02IncidentStatus" AS ENUM ('DETECTED', 'ASSESSED', 'CLOSED');

-- CreateEnum
CREATE TYPE "M02ItemType" AS ENUM ('COMMITMENT', 'VISITOR_LOG', 'DISCLOSURE', 'INCIDENT');

-- CreateTable
CREATE TABLE "M02SecurityCommitment" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "type" "M02CommitmentType" NOT NULL,
    "personName" TEXT NOT NULL,
    "org" TEXT,
    "signedDate" TIMESTAMP(3) NOT NULL,
    "accessScope" TEXT NOT NULL,
    "status" "M02CommitmentStatus" NOT NULL DEFAULT 'HIEU_LUC',
    "employeeId" TEXT,
    "revokedAt" TIMESTAMP(3),
    "revokedById" TEXT,
    "revokeReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M02SecurityCommitment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M02VisitorLog" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "commitmentId" TEXT NOT NULL,
    "visitorName" TEXT NOT NULL,
    "org" TEXT,
    "purpose" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "entryTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exitTime" TIMESTAMP(3),
    "approvedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M02VisitorLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M02DisclosureApproval" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "basis" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "legallyProhibitedNotify" BOOLEAN NOT NULL DEFAULT false,
    "customerNotified" BOOLEAN NOT NULL DEFAULT false,
    "authorityLevel" "M02AuthorityLevel" NOT NULL,
    "status" "M02DisclosureStatus" NOT NULL DEFAULT 'DRAFT',
    "approvedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M02DisclosureApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M02SecurityIncident" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "detectedById" TEXT NOT NULL,
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "containmentAction" TEXT NOT NULL,
    "impactAssessment" TEXT,
    "notificationRequired" BOOLEAN,
    "assessedById" TEXT,
    "correctiveAction" TEXT,
    "closedById" TEXT,
    "status" "M02IncidentStatus" NOT NULL DEFAULT 'DETECTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M02SecurityIncident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M02AuditEntry" (
    "id" TEXT NOT NULL,
    "itemType" "M02ItemType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "M02AuditEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "M02SecurityCommitment_code_key" ON "M02SecurityCommitment"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M02VisitorLog_code_key" ON "M02VisitorLog"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M02DisclosureApproval_code_key" ON "M02DisclosureApproval"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M02SecurityIncident_code_key" ON "M02SecurityIncident"("code");

-- AddForeignKey
ALTER TABLE "M02SecurityCommitment" ADD CONSTRAINT "M02SecurityCommitment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "M03Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M02SecurityCommitment" ADD CONSTRAINT "M02SecurityCommitment_revokedById_fkey" FOREIGN KEY ("revokedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M02VisitorLog" ADD CONSTRAINT "M02VisitorLog_commitmentId_fkey" FOREIGN KEY ("commitmentId") REFERENCES "M02SecurityCommitment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M02VisitorLog" ADD CONSTRAINT "M02VisitorLog_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M02DisclosureApproval" ADD CONSTRAINT "M02DisclosureApproval_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M02SecurityIncident" ADD CONSTRAINT "M02SecurityIncident_detectedById_fkey" FOREIGN KEY ("detectedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M02SecurityIncident" ADD CONSTRAINT "M02SecurityIncident_assessedById_fkey" FOREIGN KEY ("assessedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M02SecurityIncident" ADD CONSTRAINT "M02SecurityIncident_closedById_fkey" FOREIGN KEY ("closedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M02AuditEntry" ADD CONSTRAINT "M02AuditEntry_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
