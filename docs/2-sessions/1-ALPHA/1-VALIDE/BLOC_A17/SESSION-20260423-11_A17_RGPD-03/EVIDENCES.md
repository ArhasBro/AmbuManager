# EVIDENCES

Éléments factuels utilisés pendant la session.

---

## Sources utilisées

- Documentation officielle relue :
  - `docs/1-master/DOCUMENT_MAITRE.md`
  - `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
  - `docs/1-master/RGPD_BASE_MINIMALE.md`
- Historique de bloc relu car utile a `RGPD-03` :
  - `docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-09_A17_RGPD-01/RESULTATS.md`
  - `docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-10_A17_RGPD-LOT-02/RESULTATS.md`
  - `docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-10_A17_RGPD-LOT-02/FIN_SESSION.md`
  - `docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-10_A17_RGPD-LOT-02/PATCH/README_PATCH.md`
- Fichiers code verifies :
  - `prisma/schema.prisma`
  - `lib/auth.ts`
  - `lib/permissions.ts`
  - `lib/rbac.ts`
  - `app/api/audit/route.ts`
  - `app/api/users/route.ts`
  - `app/api/users/[id]/route.ts`
  - `app/api/users/[id]/archive/route.ts`
  - `app/api/users/[id]/depot/route.ts`
  - `app/api/users/[id]/reset-password/route.ts`
  - `app/api/users/[id]/absences/route.ts`
  - `app/api/users/[id]/absences/[absenceId]/route.ts`
  - `lib/services/audit/personal-data-audit.ts`
  - `lib/services/audit/login-audit.ts`
  - `lib/services/users/archive-user.ts`
  - `lib/services/users/assign-user-depot.ts`
  - `lib/services/users/user-absence.ts`
  - `app/api/planning/exports/route.ts`
  - `lib/planning/export.ts`
  - `app/api/imports/route.ts`
  - `lib/imports/import-engine.ts`
  - `app/login/page.tsx`
  - `app/privacy/page.tsx`
  - `scripts/quality/smoke-api-critical-contracts.test.mjs`
- Commandes reellement executees :
  - `npx prisma validate`
  - `npm run test:quality`
  - `npm run lint`
  - `npm run build`
  - `git apply --check "docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-11_A17_RGPD-03/PATCH/PATCH__SESSION-20260423-11_A17_RGPD-03.diff"`
  - `git apply "docs/2-sessions/1-ALPHA/BLOC_A17/SESSION-20260423-11_A17_RGPD-03/PATCH/PATCH__SESSION-20260423-11_A17_RGPD-03.diff"`

---

## Preuves factuelles principales

- `prisma/schema.prisma` confirme la presence des donnees personnelles
  cartographiees dans `RGPD_BASE_MINIMALE.md` :
  `User`, `UserAbsence`, `PlanningAuditLog`, `LoginAuditLog`.
- `lib/auth.ts` enregistre les connexions reussies/echouees dans
  `LoginAuditLog` et enrichit la session avec `id`, `role`, `platformRole`,
  `companyId`.
- `lib/permissions.ts` maintient les controles d'acces observes sur users,
  audit et exports.
- `app/api/users/*` et `lib/services/users/*` conservent l'ecriture d'audit
  personnel sur creation, modification, archivage, reset mot de passe,
  affectation depot et CRUD absences.
- `app/api/planning/exports/route.ts` et `lib/planning/export.ts` confirment
  l'existence d'un export planning nominatif, distinct d'un export RGPD dedie.
- `app/api/imports/route.ts` et `lib/imports/import-engine.ts` confirment les
  imports users et absences reserves aux roles `ADMIN` / `GERANT`.
- `app/login/page.tsx` expose toujours le lien vers `/privacy`.
- `app/privacy/page.tsx` expose toujours la mention d'information RGPD
  minimale, avec apostrophe encodee en `&apos;`.
- `scripts/quality/smoke-api-critical-contracts.test.mjs` et
  `npm run test:quality` ont revele puis valide le seul residuel bloquant de
  la session.

