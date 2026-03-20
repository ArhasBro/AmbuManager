-- USERS-13 — création du modèle minimal d'indisponibilités / absences utilisateur
CREATE TABLE "UserAbsence" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "reason" TEXT,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAbsence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserAbsence_companyId_userId_startAt_idx" ON "UserAbsence"("companyId", "userId", "startAt");

-- CreateIndex
CREATE INDEX "UserAbsence_companyId_startAt_idx" ON "UserAbsence"("companyId", "startAt");

-- AddForeignKey
ALTER TABLE "UserAbsence"
ADD CONSTRAINT "UserAbsence_companyId_fkey"
FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAbsence"
ADD CONSTRAINT "UserAbsence_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
