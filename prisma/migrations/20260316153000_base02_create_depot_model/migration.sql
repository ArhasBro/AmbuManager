-- BASE-02 — création du modèle base / dépôt administrable minimal
CREATE TABLE "Depot" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Depot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Depot_companyId_idx" ON "Depot"("companyId");

-- CreateIndex
CREATE INDEX "Depot_companyId_isActive_idx" ON "Depot"("companyId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Depot_companyId_name_key" ON "Depot"("companyId", "name");

-- AddForeignKey
ALTER TABLE "Depot" ADD CONSTRAINT "Depot_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
