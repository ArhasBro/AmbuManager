-- BASE-09-FIX — matérialisation SQL manquante du rattachement Shift -> Depot
ALTER TABLE "Shift"
ADD COLUMN "depotId" UUID;

CREATE INDEX "Shift_depotId_idx" ON "Shift"("depotId");

ALTER TABLE "Shift"
ADD CONSTRAINT "Shift_depotId_fkey"
FOREIGN KEY ("depotId") REFERENCES "Depot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
