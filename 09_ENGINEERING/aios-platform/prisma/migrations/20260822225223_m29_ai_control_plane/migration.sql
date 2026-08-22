-- CreateEnum
CREATE TYPE "AIApprovalStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'RETURNED', 'PENDING_APPROVAL', 'REJECTED', 'APPROVED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "AIPromptStatus" AS ENUM ('DRAFT', 'REVIEW', 'APPROVED', 'ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "AIOpStatus" AS ENUM ('ACTIVE', 'DISABLED', 'DEPRECATED');

-- CreateEnum
CREATE TYPE "AIHealth" AS ENUM ('HEALTHY', 'DEGRADED', 'DOWN', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "AIPermissionLevel" AS ENUM ('READ', 'COMPUTE', 'PROPOSE', 'EXECUTE');

-- CreateEnum
CREATE TYPE "AIGuardrailAction" AS ENUM ('BLOCK', 'WARN', 'REQUIRE_CONFIRMATION', 'REQUIRE_APPROVAL');

-- CreateEnum
CREATE TYPE "AIAStatus" AS ENUM ('NOT_ASSESSED', 'DRAFT', 'REVIEWED', 'APPROVED', 'REVIEW_REQUIRED');

-- CreateTable
CREATE TABLE "AIPlatform" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "baseUrl" TEXT,
    "apiBaseUrl" TEXT,
    "environment" TEXT NOT NULL DEFAULT 'INTERNAL',
    "health" "AIHealth" NOT NULL DEFAULT 'UNKNOWN',
    "lastError" TEXT,
    "lastHealthCheckAt" TIMESTAMP(3),
    "owner" TEXT NOT NULL DEFAULT '',
    "adapterType" TEXT NOT NULL,
    "approvalStatus" "AIApprovalStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIPlatform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIProvider" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "AIOpStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIModel" (
    "id" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "purpose" TEXT NOT NULL DEFAULT '',
    "status" "AIOpStatus" NOT NULL DEFAULT 'ACTIVE',
    "temperature" DOUBLE PRECISION,
    "maxTokens" INTEGER,
    "costPer1kTokens" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AISkill" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "platformScope" TEXT NOT NULL DEFAULT '',
    "version" INTEGER NOT NULL DEFAULT 1,
    "status" "AIOpStatus" NOT NULL DEFAULT 'ACTIVE',
    "riskLevel" TEXT NOT NULL DEFAULT 'LOW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AISkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AITool" (
    "id" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "httpMethod" TEXT NOT NULL DEFAULT 'GET',
    "inputSchema" JSONB NOT NULL DEFAULT '{}',
    "outputSchema" JSONB NOT NULL DEFAULT '{}',
    "permissionLevel" "AIPermissionLevel" NOT NULL,
    "riskLevel" TEXT NOT NULL DEFAULT 'LOW',
    "requireConfirmation" BOOLEAN NOT NULL DEFAULT false,
    "requireApproval" BOOLEAN NOT NULL DEFAULT false,
    "status" "AIOpStatus" NOT NULL DEFAULT 'ACTIVE',
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AITool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIAgent" (
    "id" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "purpose" TEXT NOT NULL DEFAULT '',
    "modelId" TEXT,
    "activePromptVersionId" TEXT,
    "status" "AIOpStatus" NOT NULL DEFAULT 'ACTIVE',
    "riskLevel" TEXT NOT NULL DEFAULT 'MEDIUM',
    "owner" TEXT NOT NULL DEFAULT '',
    "version" INTEGER NOT NULL DEFAULT 1,
    "skillIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "toolIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIAgent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIPrompt" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIPrompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIPromptVersion" (
    "id" TEXT NOT NULL,
    "promptId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "AIPromptStatus" NOT NULL DEFAULT 'DRAFT',
    "createdBy" TEXT,
    "approvedBy" TEXT,
    "effectiveFrom" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIPromptVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIGuardrail" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "scopeRef" TEXT,
    "severity" TEXT NOT NULL DEFAULT 'MEDIUM',
    "action" "AIGuardrailAction" NOT NULL,
    "approvalStatus" "AIApprovalStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIGuardrail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIPolicy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "owner" TEXT NOT NULL DEFAULT '',
    "approver" TEXT NOT NULL DEFAULT '',
    "effectiveDate" TIMESTAMP(3),
    "approvalStatus" "AIApprovalStatus" NOT NULL DEFAULT 'DRAFT',
    "reference" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIImpactAssessment" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "dataUsed" TEXT NOT NULL DEFAULT '',
    "affectedUsers" TEXT NOT NULL DEFAULT '',
    "risk" TEXT NOT NULL DEFAULT 'LOW',
    "humanOversight" TEXT NOT NULL DEFAULT '',
    "controls" TEXT NOT NULL DEFAULT '',
    "residualRisk" TEXT NOT NULL DEFAULT 'LOW',
    "status" "AIAStatus" NOT NULL DEFAULT 'NOT_ASSESSED',
    "reviewDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIImpactAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIEvaluationSuite" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIEvaluationSuite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIEvaluationCase" (
    "id" TEXT NOT NULL,
    "suiteId" TEXT NOT NULL,
    "input" JSONB NOT NULL,
    "expected" TEXT NOT NULL,

    CONSTRAINT "AIEvaluationCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIEvaluationRun" (
    "id" TEXT NOT NULL,
    "suiteId" TEXT NOT NULL,
    "agentVersion" INTEGER NOT NULL DEFAULT 1,
    "passCount" INTEGER NOT NULL DEFAULT 0,
    "failCount" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIEvaluationRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIRequest" (
    "id" TEXT NOT NULL,
    "platformId" TEXT,
    "agentId" TEXT,
    "modelId" TEXT,
    "promptVersionId" TEXT,
    "userRef" TEXT NOT NULL,
    "inputTokens" INTEGER NOT NULL DEFAULT 0,
    "outputTokens" INTEGER NOT NULL DEFAULT 0,
    "latencyMs" INTEGER NOT NULL DEFAULT 0,
    "guardrailResult" TEXT NOT NULL DEFAULT 'PASS',
    "evaluationResult" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIToolCall" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "input" JSONB NOT NULL,
    "output" JSONB,
    "status" TEXT NOT NULL,
    "latencyMs" INTEGER NOT NULL DEFAULT 0,
    "errorCode" TEXT,

    CONSTRAINT "AIToolCall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AISecret" (
    "id" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "maskedValue" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "lastRotated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsed" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AISecret_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIAuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "field" TEXT,
    "before" JSONB,
    "after" JSONB,
    "reason" TEXT,
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AIPlatform_code_key" ON "AIPlatform"("code");

-- CreateIndex
CREATE UNIQUE INDEX "AIProvider_code_key" ON "AIProvider"("code");

-- CreateIndex
CREATE UNIQUE INDEX "AISkill_code_key" ON "AISkill"("code");

-- CreateIndex
CREATE UNIQUE INDEX "AITool_code_key" ON "AITool"("code");

-- CreateIndex
CREATE UNIQUE INDEX "AIAgent_code_key" ON "AIAgent"("code");

-- CreateIndex
CREATE UNIQUE INDEX "AIPrompt_code_key" ON "AIPrompt"("code");

-- CreateIndex
CREATE UNIQUE INDEX "AIGuardrail_code_key" ON "AIGuardrail"("code");

-- CreateIndex
CREATE UNIQUE INDEX "AIImpactAssessment_code_key" ON "AIImpactAssessment"("code");

-- AddForeignKey
ALTER TABLE "AIModel" ADD CONSTRAINT "AIModel_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "AIProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AITool" ADD CONSTRAINT "AITool_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "AIPlatform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIAgent" ADD CONSTRAINT "AIAgent_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "AIPlatform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIAgent" ADD CONSTRAINT "AIAgent_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "AIModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIPrompt" ADD CONSTRAINT "AIPrompt_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "AIAgent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIPromptVersion" ADD CONSTRAINT "AIPromptVersion_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "AIPrompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIImpactAssessment" ADD CONSTRAINT "AIImpactAssessment_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "AIAgent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIEvaluationSuite" ADD CONSTRAINT "AIEvaluationSuite_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "AIAgent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIEvaluationCase" ADD CONSTRAINT "AIEvaluationCase_suiteId_fkey" FOREIGN KEY ("suiteId") REFERENCES "AIEvaluationSuite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIEvaluationRun" ADD CONSTRAINT "AIEvaluationRun_suiteId_fkey" FOREIGN KEY ("suiteId") REFERENCES "AIEvaluationSuite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIRequest" ADD CONSTRAINT "AIRequest_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "AIAgent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIRequest" ADD CONSTRAINT "AIRequest_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "AIModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIRequest" ADD CONSTRAINT "AIRequest_promptVersionId_fkey" FOREIGN KEY ("promptVersionId") REFERENCES "AIPromptVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIToolCall" ADD CONSTRAINT "AIToolCall_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "AIRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIToolCall" ADD CONSTRAINT "AIToolCall_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "AITool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIAuditLog" ADD CONSTRAINT "AIAuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
