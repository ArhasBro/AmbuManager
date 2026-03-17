ALTER TABLE "Vehicle"
ADD COLUMN "depotId" UUID;

CREATE INDEX "Vehicle_depotId_idx" ON "Vehicle"("depotId");

ALTER TABLE "Vehicle"
ADD CONSTRAINT "Vehicle_depotId_fkey"
FOREIGN KEY ("depotId") REFERENCES "Depot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
