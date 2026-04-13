-- A6 TPL-07 -> TPL-13
-- Module templates minimal administrable : archivage logique, composition minimale,
-- type de véhicule requis, nombre de personnes requis, templates non horodatés, couleur libre.

ALTER TABLE "ShiftTemplate"
  ADD COLUMN "secondaryAllowedRoles" "Role"[] NOT NULL DEFAULT ARRAY[]::"Role"[],
  ADD COLUMN "minStaffCount" INTEGER,
  ADD COLUMN "requiredVehicleType" "VehicleType",
  ADD COLUMN "archivedAt" TIMESTAMP(3),
  ADD COLUMN "isTimeDefined" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "color" TEXT;

ALTER TABLE "ShiftTemplate"
  ALTER COLUMN "startTime" DROP NOT NULL,
  ALTER COLUMN "endTime" DROP NOT NULL;

UPDATE "ShiftTemplate"
SET
  "minStaffCount" = CASE
    WHEN "category" IN ('AMBULANCE', 'GARDE') THEN 2
    ELSE 1
  END,
  "requiredRole" = CASE
    WHEN "requiredRole" IS NOT NULL THEN "requiredRole"
    WHEN "category" IN ('AMBULANCE', 'GARDE') THEN 'ADE'::"Role"
    WHEN "category" = 'TAXI' THEN 'TAXI'::"Role"
    ELSE NULL
  END,
  "secondaryAllowedRoles" = CASE
    WHEN "category" IN ('AMBULANCE', 'GARDE') THEN ARRAY['ADE', 'AA']::"Role"[]
    WHEN "category" = 'VSL' THEN ARRAY['AA', 'ADE', 'TAXI']::"Role"[]
    WHEN "category" = 'TAXI' THEN ARRAY['TAXI']::"Role"[]
    ELSE ARRAY[]::"Role"[]
  END,
  "requiredVehicleType" = CASE
    WHEN "category" IN ('AMBULANCE', 'GARDE') THEN 'AMBULANCE'::"VehicleType"
    WHEN "category" = 'VSL' THEN 'VSL'::"VehicleType"
    WHEN "category" = 'TAXI' THEN 'TAXI'::"VehicleType"
    ELSE NULL
  END
WHERE "minStaffCount" IS NULL;

CREATE INDEX "ShiftTemplate_companyId_archivedAt_idx" ON "ShiftTemplate"("companyId", "archivedAt");
