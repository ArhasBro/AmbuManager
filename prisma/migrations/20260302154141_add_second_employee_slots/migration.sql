-- AlterTable
ALTER TABLE "DraftShift" ADD COLUMN     "user2Id" UUID;

-- AlterTable
ALTER TABLE "Shift" ADD COLUMN     "user2Id" UUID;

-- CreateIndex
CREATE INDEX "DraftShift_companyId_user2Id_startAt_idx" ON "DraftShift"("companyId", "user2Id", "startAt");

-- CreateIndex
CREATE INDEX "Shift_companyId_user2Id_startAt_idx" ON "Shift"("companyId", "user2Id", "startAt");

-- AddForeignKey
ALTER TABLE "DraftShift" ADD CONSTRAINT "DraftShift_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
