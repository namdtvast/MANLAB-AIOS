-- CreateEnum
CREATE TYPE "M03RecruitmentStatus" AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'FULFILLED', 'REJECTED');

-- CreateEnum
CREATE TYPE "M03EmploymentType" AS ENUM ('CHINHTHUC', 'THUVIEC', 'THUCTAP', 'HDDV');

-- CreateEnum
CREATE TYPE "M03EmployeeStatus" AS ENUM ('THUVIEC', 'CHINHTHUC', 'DANGHIVIEC');

-- CreateEnum
CREATE TYPE "M03TrainingPlanType" AS ENUM ('BAN_DAU', 'DINH_KY', 'BO_SUNG');

-- CreateEnum
CREATE TYPE "M03TrainingResult" AS ENUM ('DAT', 'CHUA_DAT', 'BO_SUNG');

-- CreateEnum
CREATE TYPE "M03TrainingStatus" AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'NEEDS_SUPPLEMENT');

-- CreateEnum
CREATE TYPE "M03ContractType" AS ENUM ('THOIVU', 'KHONGTHOIHAN', 'THUVIEC', 'THUCTAP');

-- CreateEnum
CREATE TYPE "M03ContractStatus" AS ENUM ('DRAFT', 'PENDING_SIGN', 'ACTIVE', 'TERMINATED');

-- CreateEnum
CREATE TYPE "M03ServiceType" AS ENUM ('CHUYENMON', 'PHOTHONG');

-- CreateEnum
CREATE TYPE "M03ServiceStatus" AS ENUM ('DRAFT', 'ACTIVE', 'TERMINATED');

-- CreateEnum
CREATE TYPE "M03TerminationContractType" AS ENUM ('LABOR', 'SERVICE');

-- CreateEnum
CREATE TYPE "M03ItemType" AS ENUM ('RECRUITMENT', 'TRAINING_RECORD', 'LABOR_CONTRACT', 'SERVICE_CONTRACT', 'TERMINATION');

-- CreateTable
CREATE TABLE "M03RecruitmentPlan" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "headcount" INTEGER NOT NULL DEFAULT 1,
    "requirement" TEXT NOT NULL,
    "status" "M03RecruitmentStatus" NOT NULL DEFAULT 'DRAFT',
    "reason" TEXT,
    "createdById" TEXT NOT NULL,
    "approvedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M03RecruitmentPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M03Employee" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "employmentType" "M03EmploymentType" NOT NULL,
    "hireDate" TIMESTAMP(3) NOT NULL,
    "status" "M03EmployeeStatus" NOT NULL DEFAULT 'THUVIEC',
    "securityCommitmentRef" TEXT NOT NULL DEFAULT '',
    "recruitmentPlanId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M03Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M03TrainingPlan" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "planType" "M03TrainingPlanType" NOT NULL,
    "content" TEXT[],
    "trainer" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M03TrainingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M03TrainingRecord" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "trainingPlanId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "c1AttendedAllContent" BOOLEAN NOT NULL DEFAULT false,
    "c2FollowedRules" BOOLEAN NOT NULL DEFAULT false,
    "c3CanPerformWork" BOOLEAN NOT NULL DEFAULT false,
    "c4RecordsComplete" BOOLEAN NOT NULL DEFAULT false,
    "c5AssessmentPassed" BOOLEAN NOT NULL DEFAULT false,
    "c6EvidenceSufficient" BOOLEAN NOT NULL DEFAULT false,
    "assessmentMethod" TEXT,
    "evidence" TEXT,
    "result" "M03TrainingResult",
    "status" "M03TrainingStatus" NOT NULL DEFAULT 'DRAFT',
    "reason" TEXT,
    "approvedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M03TrainingRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M03LaborContract" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "contractType" "M03ContractType" NOT NULL,
    "duration" TEXT,
    "salary" INTEGER,
    "bhxhInfo" TEXT,
    "status" "M03ContractStatus" NOT NULL DEFAULT 'DRAFT',
    "effectiveDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),
    "renewalHistory" JSONB,
    "signedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M03LaborContract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M03ServiceContract" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "serviceType" "M03ServiceType" NOT NULL,
    "duration" TEXT,
    "fee" INTEGER,
    "status" "M03ServiceStatus" NOT NULL DEFAULT 'DRAFT',
    "signedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "M03ServiceContract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M03ContractTermination" (
    "id" TEXT NOT NULL,
    "seq" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "contractType" "M03TerminationContractType" NOT NULL,
    "contractId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "securityRevoked" BOOLEAN NOT NULL DEFAULT false,
    "bhxhSettled" BOOLEAN NOT NULL DEFAULT false,
    "terminatedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "M03ContractTermination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "M03AuditEntry" (
    "id" TEXT NOT NULL,
    "itemType" "M03ItemType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "M03AuditEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "M03RecruitmentPlan_code_key" ON "M03RecruitmentPlan"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M03Employee_code_key" ON "M03Employee"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M03TrainingPlan_code_key" ON "M03TrainingPlan"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M03TrainingRecord_code_key" ON "M03TrainingRecord"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M03LaborContract_code_key" ON "M03LaborContract"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M03ServiceContract_code_key" ON "M03ServiceContract"("code");

-- CreateIndex
CREATE UNIQUE INDEX "M03ContractTermination_code_key" ON "M03ContractTermination"("code");

-- AddForeignKey
ALTER TABLE "M03RecruitmentPlan" ADD CONSTRAINT "M03RecruitmentPlan_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M03RecruitmentPlan" ADD CONSTRAINT "M03RecruitmentPlan_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M03Employee" ADD CONSTRAINT "M03Employee_recruitmentPlanId_fkey" FOREIGN KEY ("recruitmentPlanId") REFERENCES "M03RecruitmentPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M03TrainingPlan" ADD CONSTRAINT "M03TrainingPlan_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "M03Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M03TrainingRecord" ADD CONSTRAINT "M03TrainingRecord_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "M03TrainingPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M03TrainingRecord" ADD CONSTRAINT "M03TrainingRecord_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "M03Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M03TrainingRecord" ADD CONSTRAINT "M03TrainingRecord_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M03LaborContract" ADD CONSTRAINT "M03LaborContract_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "M03Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M03LaborContract" ADD CONSTRAINT "M03LaborContract_signedById_fkey" FOREIGN KEY ("signedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M03ServiceContract" ADD CONSTRAINT "M03ServiceContract_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "M03Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M03ServiceContract" ADD CONSTRAINT "M03ServiceContract_signedById_fkey" FOREIGN KEY ("signedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M03ContractTermination" ADD CONSTRAINT "M03ContractTermination_terminatedById_fkey" FOREIGN KEY ("terminatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "M03AuditEntry" ADD CONSTRAINT "M03AuditEntry_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
