-- CreateEnum
CREATE TYPE "PlanningTemplateCategory" AS ENUM ('VSL', 'AMBULANCE', 'TAXI', 'GARDE');

-- CreateEnum
CREATE TYPE "AutoScheduleScope" AS ENUM ('DAY', 'WEEK');

-- CreateEnum
CREATE TYPE "AutoScheduleStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CANCELLED');

-- AlterTable
ALTER TABLE "ShiftTemplate" ADD COLUMN     "category" "PlanningTemplateCategory" NOT NULL DEFAULT 'AMBULANCE',
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "requiredRole" "Role";

-- CreateTable
CREATE TABLE "AutoScheduleRun" (
    "id" TEXT NOT NULL,
    "companyId" UUID NOT NULL,
    "scope" "AutoScheduleScope" NOT NULL,
    "status" "AutoScheduleStatus" NOT NULL DEFAULT 'DRAFT',
    "day" TIMESTAMP(3),
    "weekStart" TIMESTAMP(3),
    "createdById" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AutoScheduleRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DraftShift" (
    "id" TEXT NOT NULL,
    "companyId" UUID NOT NULL,
    "runId" TEXT NOT NULL,
    "templateId" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID,
    "vehicleId" UUID,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DraftShift_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AutoScheduleRun_companyId_status_idx" ON "AutoScheduleRun"("companyId", "status");

-- CreateIndex
CREATE INDEX "AutoScheduleRun_companyId_day_idx" ON "AutoScheduleRun"("companyId", "day");

-- CreateIndex
CREATE INDEX "AutoScheduleRun_companyId_weekStart_idx" ON "AutoScheduleRun"("companyId", "weekStart");

-- CreateIndex
CREATE INDEX "DraftShift_companyId_date_idx" ON "DraftShift"("companyId", "date");

-- CreateIndex
CREATE INDEX "DraftShift_runId_idx" ON "DraftShift"("runId");

-- CreateIndex
CREATE INDEX "ShiftTemplate_companyId_category_idx" ON "ShiftTemplate"("companyId", "category");

-- AddForeignKey
ALTER TABLE "AutoScheduleRun" ADD CONSTRAINT "AutoScheduleRun_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutoScheduleRun" ADD CONSTRAINT "AutoScheduleRun_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftShift" ADD CONSTRAINT "DraftShift_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftShift" ADD CONSTRAINT "DraftShift_runId_fkey" FOREIGN KEY ("runId") REFERENCES "AutoScheduleRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftShift" ADD CONSTRAINT "DraftShift_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "ShiftTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftShift" ADD CONSTRAINT "DraftShift_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftShift" ADD CONSTRAINT "DraftShift_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
