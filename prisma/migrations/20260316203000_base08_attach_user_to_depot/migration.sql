-- BASE-08 — rattachement minimal d'un utilisateur à un dépôt
ALTER TABLE "User"
ADD COLUMN "depotId" UUID;

-- CreateIndex
CREATE INDEX "User_depotId_idx" ON "User"("depotId");

-- AddForeignKey
ALTER TABLE "User"
ADD CONSTRAINT "User_depotId_fkey"
FOREIGN KEY ("depotId") REFERENCES "Depot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
