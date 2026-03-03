-- CreateIndex
CREATE INDEX "DraftShift_companyId_userId_startAt_idx" ON "DraftShift"("companyId", "userId", "startAt");

-- CreateIndex
CREATE INDEX "DraftShift_companyId_vehicleId_startAt_idx" ON "DraftShift"("companyId", "vehicleId", "startAt");
