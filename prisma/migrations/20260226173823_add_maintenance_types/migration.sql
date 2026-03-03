-- CreateTable
CREATE TABLE "MaintenanceType" (
    "id" TEXT NOT NULL,
    "companyId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaintenanceType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MaintenanceType_companyId_idx" ON "MaintenanceType"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "MaintenanceType_companyId_name_key" ON "MaintenanceType"("companyId", "name");

-- AddForeignKey
ALTER TABLE "MaintenanceType" ADD CONSTRAINT "MaintenanceType_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
