# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

### Documentation
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/3-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-01_A18_BDD-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-02_A18_BDD-LOT-02/SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A18/SESSION-20260424-02_A18_BDD-LOT-02/RESULTATS.md`

### Code et configuration
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `prisma.config.ts`
- `.env`
- `docs/BDD_OPERATIONS_SENSIBLES.md`
- `package.json`

### Base locale observee
- PostgreSQL `ambulance_db`
- schema `public`
- `16` tables `BASE TABLE` constatees
- `25` migrations constatees dans `_prisma_migrations`
- derniere migration constatee : `20260416143000_add_login_audit_log`
- societes observees apres seed : `SC Ambulances`, `Ambulance Manager - B`
- comptes support `platformRole=SUPPORT` observes : `0`

### Commandes reellement executees
- `npx prisma validate`
- `npx prisma generate`
- `npx prisma migrate status`
- `npx prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --exit-code`
- `npx prisma migrate diff --from-migrations prisma/migrations --to-config-datasource --script`
- `npx prisma db seed`
- lecture SQL `pg` en lecture seule pour compter tables, migrations, societes et comptes support
- `npm run lint`
- `npm run build`
