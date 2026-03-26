-- VEH-14 — ajout des champs minimaux de conformité documentaire flotte
ALTER TABLE "Vehicle"
ADD COLUMN "insuranceExpiresAt" TIMESTAMP(3),
ADD COLUMN "technicalInspectionExpiresAt" TIMESTAMP(3),
ADD COLUMN "registrationDocumentPresent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "sanitaryApprovalExpiresAt" TIMESTAMP(3);
