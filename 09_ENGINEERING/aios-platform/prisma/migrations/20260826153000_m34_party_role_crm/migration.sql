CREATE TYPE "M34PartyType" AS ENUM ('ORGANIZATION', 'PERSON');
CREATE TYPE "M34PartyStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'PENDING_APPROVAL', 'ACTIVE', 'REVIEW_REJECTED', 'APPROVAL_REJECTED', 'ARCHIVED');
CREATE TYPE "M34PartyRoleType" AS ENUM ('CUSTOMER', 'SUPPLIER', 'SUBCONTRACTOR', 'MANUFACTURER', 'PARTNER', 'REGULATOR', 'ACCREDITATION_BODY', 'EXPERT');

CREATE TABLE "M34Party" (
  "id" TEXT NOT NULL,
  "seq" SERIAL NOT NULL,
  "code" TEXT NOT NULL,
  "partyType" "M34PartyType" NOT NULL,
  "legalName" TEXT NOT NULL,
  "shortName" TEXT,
  "taxId" TEXT,
  "legacyCode" TEXT,
  "address" TEXT,
  "ward" TEXT,
  "province" TEXT,
  "country" TEXT NOT NULL DEFAULT 'Việt Nam',
  "source" TEXT,
  "ownerId" TEXT,
  "status" "M34PartyStatus" NOT NULL DEFAULT 'DRAFT',
  "reason" TEXT,
  "createdById" TEXT NOT NULL,
  "reviewedById" TEXT,
  "reviewedAt" TIMESTAMP(3),
  "approvedById" TEXT,
  "approvedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "M34Party_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "M34PartyRole" (
  "id" TEXT NOT NULL,
  "partyId" TEXT NOT NULL,
  "roleType" "M34PartyRoleType" NOT NULL,
  "scopeNote" TEXT,
  "validFrom" TIMESTAMP(3),
  "validTo" TIMESTAMP(3),
  "active" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "M34PartyRole_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "M34PartyContact" (
  "id" TEXT NOT NULL,
  "partyId" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "position" TEXT,
  "email" TEXT,
  "phone" TEXT,
  "isLegalRep" BOOLEAN NOT NULL DEFAULT false,
  "isPrimary" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "M34PartyContact_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "M34Party_code_key" ON "M34Party"("code");
CREATE INDEX "M34Party_legalName_idx" ON "M34Party"("legalName");
CREATE INDEX "M34Party_taxId_idx" ON "M34Party"("taxId");
CREATE INDEX "M34Party_status_idx" ON "M34Party"("status");
CREATE UNIQUE INDEX "M34PartyRole_partyId_roleType_key" ON "M34PartyRole"("partyId", "roleType");

ALTER TABLE "M34Party" ADD CONSTRAINT "M34Party_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "M34Party" ADD CONSTRAINT "M34Party_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "M34Party" ADD CONSTRAINT "M34Party_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "M34PartyRole" ADD CONSTRAINT "M34PartyRole_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "M34Party"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "M34PartyContact" ADD CONSTRAINT "M34PartyContact_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "M34Party"("id") ON DELETE CASCADE ON UPDATE CASCADE;
