ALTER TABLE "User"
ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;

CREATE INDEX "User_companyId_isActive_idx" ON "User"("companyId", "isActive");
