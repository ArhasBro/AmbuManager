-- CreateTable
CREATE TABLE "PlanningAuditLog" (
    "id" TEXT NOT NULL,
    "companyId" UUID NOT NULL,
    "actorUserId" UUID,
    "runId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlanningAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlanningAuditLog_companyId_createdAt_idx" ON "PlanningAuditLog"("companyId", "createdAt");

-- CreateIndex
CREATE INDEX "PlanningAuditLog_companyId_action_createdAt_idx" ON "PlanningAuditLog"("companyId", "action", "createdAt");

-- CreateIndex
CREATE INDEX "PlanningAuditLog_companyId_entityType_entityId_idx" ON "PlanningAuditLog"("companyId", "entityType", "entityId");

-- CreateIndex
CREATE INDEX "PlanningAuditLog_runId_idx" ON "PlanningAuditLog"("runId");

-- CreateIndex
CREATE INDEX "PlanningAuditLog_actorUserId_idx" ON "PlanningAuditLog"("actorUserId");

-- AddForeignKey
ALTER TABLE "PlanningAuditLog" ADD CONSTRAINT "PlanningAuditLog_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanningAuditLog" ADD CONSTRAINT "PlanningAuditLog_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanningAuditLog" ADD CONSTRAINT "PlanningAuditLog_runId_fkey" FOREIGN KEY ("runId") REFERENCES "AutoScheduleRun"("id") ON DELETE SET NULL ON UPDATE CASCADE;
