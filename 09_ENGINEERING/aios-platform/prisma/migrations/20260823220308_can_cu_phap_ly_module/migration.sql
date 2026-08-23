-- AlterTable
ALTER TABLE "PlatformModule" ADD COLUMN     "docId" TEXT,
ADD COLUMN     "docStatus" TEXT,
ADD COLUMN     "docTitle" TEXT,
ADD COLUMN     "docVersion" TEXT,
ADD COLUMN     "forms" JSONB,
ADD COLUMN     "isoClauses" TEXT[],
ADD COLUMN     "issuedDate" TIMESTAMP(3),
ADD COLUMN     "legalBasis" TEXT[],
ADD COLUMN     "procedureOwner" TEXT,
ADD COLUMN     "procedurePath" TEXT;
