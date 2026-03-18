-- SUP-02 — modélisation minimale du rôle support global distinct des rôles client
CREATE TYPE "PlatformRole" AS ENUM ('SUPPORT');

ALTER TABLE "User"
ADD COLUMN "platformRole" "PlatformRole",
ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "companyId" DROP NOT NULL;

CREATE INDEX "User_platformRole_idx" ON "User"("platformRole");

ALTER TABLE "User"
ADD CONSTRAINT "User_role_scope_check"
CHECK (
  (
    "platformRole" IS NULL
    AND "role" IS NOT NULL
    AND "companyId" IS NOT NULL
  )
  OR
  (
    "platformRole" IS NOT NULL
    AND "role" IS NULL
    AND "companyId" IS NULL
  )
);
