# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-01_A18_BDD-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-02_A18_BDD-LOT-02/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-03_A18_BDD-03/RESULTATS.md`
- `docs/BDD_OPERATIONS_SENSIBLES.md`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `prisma.config.ts`
- `.env`
- `prisma/migrations/`
- `prisma/migrations/migration_lock.toml`
- `scripts/db-backup.ps1`
- `scripts/db-restore.ps1`
- `package.json`

## Commandes et constats

- `npx.cmd prisma validate`
  - exit code `0`
  - sortie cle : `The schema at prisma\schema.prisma is valid`
- `npx.cmd prisma generate`
  - exit code `0`
  - sortie cle : `Generated Prisma Client (v7.7.0)`
- `npx.cmd prisma migrate status`
  - exit code `0`
  - sortie cle : `25 migrations found in prisma/migrations`
  - sortie cle : `Database schema is up to date!`
- `npx.cmd prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --exit-code`
  - exit code `0`
  - sortie cle : `No difference detected.`
- `npx.cmd prisma migrate diff --from-migrations prisma/migrations --to-config-datasource --script`
  - exit code `1`
  - sortie cle :
    `You must pass the --shadow-database-url flag or set datasource.shadowDatabaseUrl in your prisma.config.ts if you want to diff a migrations directory.`
- `npx.cmd prisma db seed`
  - exit code `0`
  - sortie cle :
    `Company preserved: SC Ambulances ... (matched by admin-email)`
  - sortie cle :
    `Seed OK (support + A/B ready for DoD 4.4 tests)`
- `npm.cmd run lint`
  - exit code `0`
- `npm.cmd run build`
  - exit code `0`
  - sortie cle : `Next.js 16.1.6`
- lecture SQL `pg` en lecture seule
  - exit code `0`
  - `16` tables `BASE TABLE`
  - `25` migrations appliquees
  - derniere migration :
    `20260416143000_add_login_audit_log`
  - societes : `SC Ambulances`, `Ambulance Manager - B`
  - comptes `platformRole=SUPPORT` : `0`
