-- CreateEnum
CREATE TYPE "AIIncidentSeverity" AS ENUM ('SEVERE', 'SIGNIFICANT', 'MINOR');

-- CreateEnum
CREATE TYPE "AIIncidentKind" AS ENUM ('WRONG_OUTPUT', 'DATA_LEAK', 'PROMPT_INJECTION', 'PERMISSION_BREACH', 'BIAS', 'SERVICE_DISRUPTION', 'UNREGISTERED_AI', 'OTHER');

-- CreateEnum
CREATE TYPE "AIIncidentStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'PENDING_CONFIRMATION', 'CLOSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AIUnregisteredStatus" AS ENUM ('OPEN', 'REGISTERING', 'REGISTERED', 'DISCONTINUED');

-- AlterEnum
ALTER TYPE "AIOpStatus" ADD VALUE 'SUSPENDED';

-- DropForeignKey
ALTER TABLE "AIAuditLog" DROP CONSTRAINT "AIAuditLog_actorId_fkey";

-- AlterTable
ALTER TABLE "AIAgent" ADD COLUMN     "suspendedAt" TIMESTAMP(3),
ADD COLUMN     "suspendedReason" TEXT;

-- AlterTable
ALTER TABLE "AIAuditLog" ADD COLUMN     "actorLabel" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "actorId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "AIIncident" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "severity" "AIIncidentSeverity" NOT NULL,
    "kind" "AIIncidentKind" NOT NULL,
    "agentId" TEXT,
    "platformId" TEXT,
    "traceId" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "detectedById" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "containmentAction" TEXT NOT NULL DEFAULT '',
    "affectsIssuedResult" BOOLEAN NOT NULL DEFAULT false,
    "issuedResultRef" TEXT,
    "sensitiveDataExposed" BOOLEAN NOT NULL DEFAULT false,
    "f28Ref" TEXT,
    "capRef" TEXT,
    "assessedById" TEXT,
    "closedById" TEXT,
    "closureNote" TEXT,
    "cancelReason" TEXT,
    "status" "AIIncidentStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIIncident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIUnregisteredSighting" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "usedBy" TEXT NOT NULL,
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "detectedById" TEXT NOT NULL,
    "dataExposed" TEXT NOT NULL DEFAULT '',
    "sensitiveData" BOOLEAN NOT NULL DEFAULT false,
    "incidentId" TEXT,
    "plannedAction" TEXT NOT NULL DEFAULT '',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "registeredAgentId" TEXT,
    "closeReason" TEXT,
    "status" "AIUnregisteredStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIUnregisteredSighting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AIIncident_code_key" ON "AIIncident"("code");

-- CreateIndex
CREATE UNIQUE INDEX "AIUnregisteredSighting_code_key" ON "AIUnregisteredSighting"("code");

-- AddForeignKey
ALTER TABLE "AIAuditLog" ADD CONSTRAINT "AIAuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIIncident" ADD CONSTRAINT "AIIncident_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "AIAgent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIIncident" ADD CONSTRAINT "AIIncident_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "AIPlatform"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIIncident" ADD CONSTRAINT "AIIncident_detectedById_fkey" FOREIGN KEY ("detectedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIIncident" ADD CONSTRAINT "AIIncident_assessedById_fkey" FOREIGN KEY ("assessedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIIncident" ADD CONSTRAINT "AIIncident_closedById_fkey" FOREIGN KEY ("closedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIUnregisteredSighting" ADD CONSTRAINT "AIUnregisteredSighting_detectedById_fkey" FOREIGN KEY ("detectedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIUnregisteredSighting" ADD CONSTRAINT "AIUnregisteredSighting_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "AIIncident"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIUnregisteredSighting" ADD CONSTRAINT "AIUnregisteredSighting_registeredAgentId_fkey" FOREIGN KEY ("registeredAgentId") REFERENCES "AIAgent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
