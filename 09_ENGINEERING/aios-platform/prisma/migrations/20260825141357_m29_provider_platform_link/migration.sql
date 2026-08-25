-- AlterTable
ALTER TABLE "AIProvider" ADD COLUMN     "platformId" TEXT;

-- AddForeignKey
ALTER TABLE "AIProvider" ADD CONSTRAINT "AIProvider_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "AIPlatform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
