CREATE TABLE "LoginAuditLog" (
    "id" TEXT NOT NULL,
    "companyId" UUID NOT NULL,
    "actorUserId" UUID,
    "email" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "reason" TEXT,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginAuditLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "LoginAuditLog_companyId_createdAt_idx" ON "LoginAuditLog"("companyId", "createdAt");
CREATE INDEX "LoginAuditLog_companyId_email_createdAt_idx" ON "LoginAuditLog"("companyId", "email", "createdAt");
CREATE INDEX "LoginAuditLog_companyId_success_createdAt_idx" ON "LoginAuditLog"("companyId", "success", "createdAt");
CREATE INDEX "LoginAuditLog_actorUserId_idx" ON "LoginAuditLog"("actorUserId");

ALTER TABLE "LoginAuditLog" ADD CONSTRAINT "LoginAuditLog_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LoginAuditLog" ADD CONSTRAINT "LoginAuditLog_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
