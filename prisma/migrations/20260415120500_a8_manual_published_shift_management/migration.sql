ALTER TABLE "Shift"
  ADD COLUMN "isCancelled" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "cancelledAt" TIMESTAMP(3),
  ADD COLUMN "cancellationReason" TEXT;

CREATE INDEX "Shift_companyId_isCancelled_startAt_idx" ON "Shift"("companyId", "isCancelled", "startAt");
