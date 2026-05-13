# EVIDENCES

Elements factuels utilises pendant la session.

---

## Sources utilisees

### Documentation officielle relue

- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md` : absent.
- `docs/2-sessions/1-ALPHA/BLOC_A16/SESSION-20260423-05_A16_SEC-01/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A16/SESSION-20260423-05_A16_SEC-01/FIN_SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A16/SESSION-20260423-06_A16_SEC-LOT-02/RESULTATS.md`
- `docs/2-sessions/1-ALPHA/BLOC_A16/SESSION-20260423-06_A16_SEC-LOT-02/FIN_SESSION.md`
- `docs/2-sessions/1-ALPHA/BLOC_A16/SESSION-20260423-06_A16_SEC-LOT-02/PATCH/README_PATCH.md`

### Code reel controle

- `lib/auth.ts`
- `types/next-auth.d.ts`
- `lib/security/password-policy.ts`
- `lib/validators/user.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `lib/imports/import-engine.ts`
- `proxy.ts`
- `lib/permissions.ts`
- `app/api/**/route.ts`
- `app/**/page.tsx`
- `scripts/db-backup.ps1`
- `scripts/db-restore.ps1`
- `.gitignore`
- `package.json`
- `scripts/quality/smoke-api-critical-contracts.test.mjs`
- `scripts/quality/targeted-sensitive-blocks.test.mjs`

### Observations factuelles

- Routes API observees : 37 fichiers `app/api/**/route.ts`.
- Routes API avec `getServerSession`, `companyId` et signal permission/role :
  36.
- Exception observee : `app/api/auth/[...nextauth]/route.ts`, route NextAuth.
- Pages observees : 11 fichiers `app/**/page.tsx` hors API.
- Page publique observee : `app/login/page.tsx`.
- Pages applicatives protegees observees : `/`, `/audit`, `/company`,
  `/dashboard`, `/depots`, `/onboarding`, `/planning`, `/templates`, `/users`,
  `/vehicles`.
- `git ls-files .env .env.local .env.development .env.production` : sortie vide.

### Validations terminales executees

```text
npx.cmd prisma validate
Exit code: 0
The schema at prisma\schema.prisma is valid
```

```text
npm.cmd run lint
Exit code: 0
> ambulance-manager@0.1.0 lint
> eslint .
```

```text
npm.cmd run test:quality
Exit code: 0
Smoke tests: 6 pass, 0 fail
Targeted tests: 7 pass, 0 fail
Warning observed: package.json does not declare "type": "module"; Node reparsed
some TS-imported files as ES modules.
```

```text
npm.cmd run build
Exit code: 0
Next.js 16.1.6
Compiled successfully
TypeScript OK
Generated static pages: 28/28
```

```text
PowerShell parse scripts/db-backup.ps1
Exit code: 0
db-backup.ps1 parse OK
```

```text
PowerShell parse scripts/db-restore.ps1
Exit code: 0
db-restore.ps1 parse OK
```

```text
git ls-files .env .env.local .env.development .env.production
Exit code: 0
Sortie vide
```
