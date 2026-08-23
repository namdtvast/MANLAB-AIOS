-- CreateEnum
CREATE TYPE "M04LogType" AS ENUM ('ENVIRONMENT', 'CHEMICAL_CABINET', 'EQUIPMENT_CABINET');

-- CreateEnum
CREATE TYPE "M04RiskLevel" AS ENUM ('THUONG', 'CAO');

-- CreateEnum
CREATE TYPE "M04PlanStatus" AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "M04ItemType" AS ENUM ('CONDITION_LOG', 'FIELD_WORK_PLAN');

-- CreateTable
CREATE TABLE "M04AreaSpec" (
    "id" TEXT NOT NULL,
    "areaCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tempMin" DOUBLE PRECISION NOT NULL,
    "tempMax" DOUBLE PRECISION NOT NULL,
    "humidityMin" DOUBLE PRECISION NOT NULL,
    "humidityMax" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M04AreaSpec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M04ConditionLog" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "logType" "M04LogType" NOT NULL,
    "areaId" TEXT NOT NULL,
    "measuredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "deviceRef" TEXT,
    "withinSpec" BOOLEAN NOT NULL DEFAULT true,
    "abnormalAction" TEXT,
    "reportedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M04ConditionLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M04FieldWorkPlan" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "personnel" TEXT[],
    "schedule" TIMESTAMP(3) NOT NULL,
    "workItems" TEXT[],
    "riskLevel" "M04RiskLevel" NOT NULL DEFAULT 'THUONG',
    "status" "M04PlanStatus" NOT NULL DEFAULT 'DRAFT',
    "reason" TEXT,
    "briefed" BOOLEAN NOT NULL DEFAULT false,
    "briefedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "approvedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M04FieldWorkPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M04AuditEntry" (
    "id" TEXT NOT NULL,
    "itemType" "M04ItemType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "M04AuditEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "M04AreaSpec_areaCode_key" ON "M04AreaSpec"("areaCode");

-- CreateIndex
CREATE UNIQUE INDEX "M04ConditionLog_code_key" ON "M04ConditionLog"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M04FieldWorkPlan_code_key" ON "M04FieldWorkPlan"("code");

-- AddForeignKey
ALTER TABLE "M04ConditionLog" ADD CONSTRAINT "M04ConditionLog_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "M04AreaSpec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M04ConditionLog" ADD CONSTRAINT "M04ConditionLog_reportedById_fkey" FOREIGN KEY ("reportedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M04FieldWorkPlan" ADD CONSTRAINT "M04FieldWorkPlan_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M04FieldWorkPlan" ADD CONSTRAINT "M04FieldWorkPlan_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M04AuditEntry" ADD CONSTRAINT "M04AuditEntry_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
