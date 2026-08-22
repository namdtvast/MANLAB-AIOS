-- AlterTable
ALTER TABLE "AIGuardrail" ADD COLUMN     "approvedBy" TEXT;

-- AlterTable
ALTER TABLE "AIPlatform" ADD COLUMN     "approvedBy" TEXT;

-- AlterTable
ALTER TABLE "AIPolicy" ADD COLUMN     "approvedBy" TEXT;
