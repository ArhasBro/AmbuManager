-- CreateEnum
CREATE TYPE "RuleMode" AS ENUM ('OFF', 'ALERT', 'BLOCK', 'BOTH');

-- CreateTable
CREATE TABLE "CompanyRule" (
    "id" TEXT NOT NULL,
    "companyId" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "mode" "RuleMode" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CompanyRule_companyId_idx" ON "CompanyRule"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyRule_companyId_key_key" ON "CompanyRule"("companyId", "key");

-- AddForeignKey
ALTER TABLE "CompanyRule" ADD CONSTRAINT "CompanyRule_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
