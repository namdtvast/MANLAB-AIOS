-- M29 FinOps: tách giá token vào/ra, lưu snapshot chi phí và quản lý hạn mức tháng.
ALTER TABLE "AIModel"
  ADD COLUMN "inputCostPerMillionTokens" DOUBLE PRECISION NOT NULL DEFAULT 0,
  ADD COLUMN "outputCostPerMillionTokens" DOUBLE PRECISION NOT NULL DEFAULT 0,
  ADD COLUMN "currency" TEXT NOT NULL DEFAULT 'USD',
  ADD COLUMN "pricingUpdatedAt" TIMESTAMP(3);

-- Chuyển giá pha trộn cũ sang cùng một giá vào/ra để lịch sử không đột ngột về 0.
UPDATE "AIModel"
SET "inputCostPerMillionTokens" = "costPer1kTokens" * 1000,
    "outputCostPerMillionTokens" = "costPer1kTokens" * 1000,
    "pricingUpdatedAt" = CURRENT_TIMESTAMP
WHERE "costPer1kTokens" > 0;

ALTER TABLE "AIRequest"
  ADD COLUMN "inputUnitCostPerMillion" DOUBLE PRECISION NOT NULL DEFAULT 0,
  ADD COLUMN "outputUnitCostPerMillion" DOUBLE PRECISION NOT NULL DEFAULT 0,
  ADD COLUMN "estimatedCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
  ADD COLUMN "costCurrency" TEXT NOT NULL DEFAULT 'USD';

CREATE TABLE "AIBudget" (
  "id" TEXT NOT NULL,
  "code" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "agentId" TEXT,
  "monthlyLimit" DOUBLE PRECISION NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'USD',
  "warningPercent" INTEGER NOT NULL DEFAULT 80,
  "blockAtLimit" BOOLEAN NOT NULL DEFAULT true,
  "status" "AIOpStatus" NOT NULL DEFAULT 'ACTIVE',
  "effectiveFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "effectiveTo" TIMESTAMP(3),
  "owner" TEXT NOT NULL DEFAULT '',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AIBudget_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AIBudget_code_key" ON "AIBudget"("code");
CREATE INDEX "AIBudget_agentId_status_idx" ON "AIBudget"("agentId", "status");
ALTER TABLE "AIBudget" ADD CONSTRAINT "AIBudget_agentId_fkey"
  FOREIGN KEY ("agentId") REFERENCES "AIAgent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
