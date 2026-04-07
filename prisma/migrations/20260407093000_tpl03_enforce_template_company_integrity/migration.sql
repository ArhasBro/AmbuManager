-- TPL-03 — Enforcement multi-tenant minimal sur les relations template -> DraftShift / Shift
-- Objectif : empêcher qu'un DraftShift ou un Shift d'une société référence un ShiftTemplate d'une autre société.

-- 1) Nettoyage défensif d'un éventuel historique incohérent avant durcissement.
UPDATE "DraftShift" AS d
SET "templateId" = NULL
WHERE d."templateId" IS NOT NULL
  AND NOT EXISTS (
    SELECT 1
    FROM "ShiftTemplate" AS st
    WHERE st."id" = d."templateId"
      AND st."companyId" = d."companyId"
  );

UPDATE "Shift" AS s
SET "templateId" = NULL
WHERE s."templateId" IS NOT NULL
  AND NOT EXISTS (
    SELECT 1
    FROM "ShiftTemplate" AS st
    WHERE st."id" = s."templateId"
      AND st."companyId" = s."companyId"
  );

-- 2) Garde INSERT/UPDATE côté DraftShift.
CREATE OR REPLACE FUNCTION "check_draftshift_template_company_match"()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW."templateId" IS NULL THEN
    RETURN NEW;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM "ShiftTemplate" AS st
    WHERE st."id" = NEW."templateId"
      AND st."companyId" = NEW."companyId"
  ) THEN
    RAISE EXCEPTION
      'DraftShift.templateId must reference a ShiftTemplate of the same company';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS "DraftShift_template_company_guard" ON "DraftShift";
CREATE TRIGGER "DraftShift_template_company_guard"
BEFORE INSERT OR UPDATE OF "templateId", "companyId"
ON "DraftShift"
FOR EACH ROW
EXECUTE FUNCTION "check_draftshift_template_company_match"();

-- 3) Garde INSERT/UPDATE côté Shift.
CREATE OR REPLACE FUNCTION "check_shift_template_company_match"()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW."templateId" IS NULL THEN
    RETURN NEW;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM "ShiftTemplate" AS st
    WHERE st."id" = NEW."templateId"
      AND st."companyId" = NEW."companyId"
  ) THEN
    RAISE EXCEPTION
      'Shift.templateId must reference a ShiftTemplate of the same company';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS "Shift_template_company_guard" ON "Shift";
CREATE TRIGGER "Shift_template_company_guard"
BEFORE INSERT OR UPDATE OF "templateId", "companyId"
ON "Shift"
FOR EACH ROW
EXECUTE FUNCTION "check_shift_template_company_match"();

-- 4) Empêcher le déplacement inter-sociétés d'un template déjà référencé.
CREATE OR REPLACE FUNCTION "guard_shifttemplate_company_update_when_linked"()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW."companyId" = OLD."companyId" THEN
    RETURN NEW;
  END IF;

  IF EXISTS (SELECT 1 FROM "DraftShift" AS d WHERE d."templateId" = OLD."id")
     OR EXISTS (SELECT 1 FROM "Shift" AS s WHERE s."templateId" = OLD."id") THEN
    RAISE EXCEPTION
      'ShiftTemplate.companyId cannot be changed while linked to DraftShift or Shift';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS "ShiftTemplate_company_update_guard" ON "ShiftTemplate";
CREATE TRIGGER "ShiftTemplate_company_update_guard"
BEFORE UPDATE OF "companyId"
ON "ShiftTemplate"
FOR EACH ROW
EXECUTE FUNCTION "guard_shifttemplate_company_update_when_linked"();
