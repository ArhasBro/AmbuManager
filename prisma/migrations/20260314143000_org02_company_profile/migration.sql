-- ORG-02 — ajout des champs minimaux du profil société ALPHA
ALTER TABLE "Company"
ADD COLUMN "managerNames" TEXT,
ADD COLUMN "address" TEXT,
ADD COLUMN "phone" TEXT,
ADD COLUMN "siret" TEXT;
