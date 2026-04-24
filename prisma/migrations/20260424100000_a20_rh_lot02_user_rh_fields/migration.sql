-- A20 RH-LOT-02 — enrichissement RH minimal utilisateur
ALTER TABLE "User"
ADD COLUMN "firstName" TEXT,
ADD COLUMN "lastName" TEXT,
ADD COLUMN "initials" TEXT,
ADD COLUMN "phone" TEXT,
ADD COLUMN "isTrainee" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "dailyWorkStartTime" TEXT,
ADD COLUMN "dailyWorkEndTime" TEXT;

CREATE INDEX "User_companyId_isTrainee_idx" ON "User"("companyId", "isTrainee");
