# EVIDENCES.md

## Référentiel
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:59-107`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:350-360`

## Rôle support distinct / hors société
- `prisma/schema.prisma:22-24` → enum `PlatformRole { SUPPORT }`
- `prisma/schema.prisma:149-188` → `User.role?`, `User.platformRole?`, `User.companyId?`, index `platformRole`
- `prisma/migrations/20260318203000_sup02_platform_support_role/migration.sql:1-21` → contrainte `User_role_scope_check` :
  - compte tenant = `platformRole IS NULL` + `role IS NOT NULL` + `companyId IS NOT NULL`
  - compte plateforme = `platformRole IS NOT NULL` + `role IS NULL` + `companyId IS NULL`
- `lib/auth.ts:43-71` → chargement `role`, `platformRole`, `companyId` au login
- `lib/auth.ts:133-139` → exposition `session.user.platformRole` et `session.user.isGlobalSupport`
- `types/next-auth.d.ts:6-29` → typage session/JWT enrichi

## Absence de droits support implicites
- `lib/rbac.ts:3-15` → `allowGlobalSupport` existe mais n’est pas utilisé sur les routes contrôlées
- `lib/permissions.ts:38-42` → `isGlobalSupport(platformRole)` retourne immédiatement `false`
- `lib/permission-catalog.ts:1-92` → aucun code de permission spécifique au support

## Compte support nominatif
- `prisma/seed.ts:44-64` → lecture stricte des 3 variables support
- `prisma/seed.ts:157-186` → upsert support avec `platformRole=SUPPORT`, `role=null`, `companyId=null`, `depotId=null`
- `prisma/seed.ts:189-194` → warning explicite si la colonne `platformRole` manque en base
- `prisma/seed.ts:299-305` → seed du compte support hors société

## Invisibilité côté client
- `app/api/users/route.ts:39-54` → liste client bornée à `companyId`, `platformRole: null`, `role: { not: null }`
- `lib/services/users/assign-user-depot.ts:45-57` → cible bornée aux utilisateurs de société uniquement
- `app/api/users/[id]/reset-password/route.ts:62-72` et `77-88` → reset borné aux utilisateurs de société
- `app/users/page.tsx:32-35` → texte UI indiquant que les comptes support globaux sont exclus des flux client
- `app/users/user-depot-assignment-client.tsx:203-205` → texte UI confirmant la même exclusion

## Traçabilité support minimale
- `lib/services/audit/support-action-trace.ts:18-31` → journalisation uniquement si `actorPlatformRole === SUPPORT`
- Appels présents :
  - `lib/services/users/assign-user-depot.ts:107-137`
  - `lib/services/vehicles/assign-vehicle-depot.ts:106-138`
  - `lib/services/depots/create-depot.ts:33-56`
  - `lib/services/depots/update-depot.ts:54-81`
  - `lib/services/depots/archive-depot.ts:52-77`
  - `app/api/users/[id]/reset-password/route.ts:109-136`
  - `app/api/vehicles/route.ts:100-126` et `181-210`
- Stockage cible : `PlanningAuditLog` dans `prisma/schema.prisma:64-90`

## Non-opérabilité actuelle du support global sur ces mutations
- `app/api/users/[id]/reset-password/route.ts:42-45` → nécessite `actorUserId`, `companyId`, puis `canManageUsers(...)`
- `app/api/users/[id]/depot/route.ts:32-35` → même borne
- `app/api/vehicles/[id]/depot/route.ts:32-35` → même borne
- `app/api/depots/route.ts:24-29` → exige `companyId` et `requireRole(role, [ADMIN, GERANT])`
- `app/api/depots/[id]/route.ts:33-36` → même borne
- `app/api/depots/[id]/archive/route.ts:34-37` → même borne
- `app/api/vehicles/route.ts:48-52`, `77-80`, `140-143` → exige `companyId` + rôle tenant
- `app/dashboard/page.tsx:20-29` → les accès admin/dashboard restent calculés à partir des permissions tenant et du rôle tenant
- Conséquence logique : le compte support nominal de `SUP-03` (`role=null`, `companyId=null`) ne peut pas atteindre les mutations qui déclenchent `traceSupportAction`.

## Validations terminales relancées

### `npx prisma validate`
```text
Loaded Prisma config from prisma.config.ts.

Error: request to https://binaries.prisma.sh/all_commits/94a226be1cf2967af2541cca5529f0f7ba866919/debian-openssl-3.0.x/schema-engine.gz.sha256 failed, reason: getaddrinfo EAI_AGAIN binaries.prisma.sh
```

### `npx prisma generate`
```text
Loaded Prisma config from prisma.config.ts.

Error: request to https://binaries.prisma.sh/all_commits/94a226be1cf2967af2541cca5529f0f7ba866919/debian-openssl-3.0.x/schema-engine.gz.sha256 failed, reason: getaddrinfo EAI_AGAIN binaries.prisma.sh
```

### `npm run lint`
```text
> ambulance-manager@0.1.0 lint
> eslint .
```

### `npm run build`
```text
> ambulance-manager@0.1.0 build
> next build

Failed to compile.

./app/api/company/rules/route.ts:4:10
Type error: Module '"@prisma/client"' has no exported member 'RuleMode'.
```

## Contradictions documentaires constatées
- `docs/2-sessions/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-02_A2_SUP-02/RESULTATS.md:27-33` annonce une chaîne terminale verte.
- `docs/2-sessions/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-03_A2_SUP-03/RESULTATS.md:63-70` annonce également une chaîne verte.
- `docs/2-sessions/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-05_A2_SUP-05/RESULTATS.md:17-24` annonce à nouveau une chaîne terminale complète.
- `docs/2-sessions/1-ALPHA/BLOC_A2/3-SUP/SESSION-20260318-05_A2_SUP-05/RESULTATS.md:6-15` décrit une traçabilité support “implémentée” ; le code montre un câblage réel, mais non atteignable par le compte support global nominal dans les routes contrôlées.
