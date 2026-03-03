-- CreateIndex
CREATE INDEX "Shift_companyId_userId_startAt_idx" ON "Shift"("companyId", "userId", "startAt");

-- CreateIndex
CREATE INDEX "Shift_companyId_vehicleId_startAt_idx" ON "Shift"("companyId", "vehicleId", "startAt");
