-- AlterTable
ALTER TABLE "M26KnowledgeNeed" ADD COLUMN     "targetItemId" TEXT;

-- AddForeignKey
ALTER TABLE "M26KnowledgeNeed" ADD CONSTRAINT "M26KnowledgeNeed_targetItemId_fkey" FOREIGN KEY ("targetItemId") REFERENCES "M26KnowledgeItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
