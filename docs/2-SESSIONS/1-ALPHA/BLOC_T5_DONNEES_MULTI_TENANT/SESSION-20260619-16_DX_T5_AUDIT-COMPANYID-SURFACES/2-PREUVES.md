# 2 - Preuves

## 1. Fichiers lus

- `docs/2-SESSIONS/README_SESSIONS.md`
- `docs/1-MASTER/03-METHODE_DE_TRAVAIL.md`
- `docs/1-MASTER/04-PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-MASTER/05-BLOCS_SESSIONS_PRODUCTION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-14_DX_T5_CADRAGE-BLOC-SESSIONS/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-14_DX_T5_CADRAGE-BLOC-SESSIONS/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-14_DX_T5_CADRAGE-BLOC-SESSIONS/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-15_DX_T5_AUDIT-MAPPING-ENTITES/3-FIN_DE_SESSION.md`
- `prisma/schema.prisma`
- `app/api/audit/route.ts`
- `app/api/company/profile/route.ts`
- `app/api/company/rules/route.ts`
- `app/api/depots/route.ts`
- `app/api/depots/[id]/route.ts`
- `app/api/depots/[id]/archive/route.ts`
- `app/api/templates/route.ts`
- `app/api/templates/[id]/route.ts`
- `app/api/templates/[id]/archive/route.ts`
- `app/api/vehicles/route.ts`
- `app/api/vehicles/[id]/route.ts`
- `app/api/vehicles/[id]/archive/route.ts`
- `app/api/vehicles/[id]/depot/route.ts`
- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`
- `app/api/users/[id]/archive/route.ts`
- `app/api/users/[id]/depot/route.ts`
- `app/api/users/[id]/reset-password/route.ts`
- `app/api/users/[id]/absences/route.ts`
- `app/api/users/[id]/absences/[absenceId]/route.ts`
- `app/api/imports/route.ts`
- `app/api/planning/exports/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/api/planning/shifts/[id]/route.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/shifts/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/day/route.ts`
- `app/api/planning/autoschedule/week/route.ts`
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/planning/autoschedule/runs/[id]/route.ts`
- `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`
- `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`
- `app/api/health/prisma/route.ts`
- `lib/validators/company-profile.ts`
- `lib/validators/company-rules.ts`
- `lib/validators/depot.ts`
- `lib/validators/user.ts`
- `lib/validators/user-absence.ts`
- `lib/validators/vehicle.ts`
- `lib/validators/planning-assign.ts`
- `lib/services/company/update-company-profile.ts`
- `lib/company-rules/runtime.ts`
- `lib/company-rules/api.ts`
- `lib/company-rules/governance.ts`
- `lib/company-rules/catalog.ts`
- `lib/services/depots/create-depot.ts`
- `lib/services/depots/update-depot.ts`
- `lib/services/depots/archive-depot.ts`
- `lib/services/vehicles/archive-vehicle.ts`
- `lib/services/vehicles/assign-vehicle-depot.ts`
- `lib/services/templates/archive-template.ts`
- `lib/services/users/archive-user.ts`
- `lib/services/users/assign-user-depot.ts`
- `lib/services/users/user-absence.ts`
- `lib/services/planning/planning-audit.ts`
- `lib/services/planning/user-absence.ts`
- `lib/services/planning/assign-draftshift.ts`
- `lib/services/planning/assign-shift.ts`
- `lib/services/planning/matching.service.ts`
- `lib/planning/export.ts`
- `lib/imports/import-engine.ts`
- `lib/services/audit/audit-context.ts`
- `lib/services/audit/login-audit.ts`
- `lib/services/audit/personal-data-audit.ts`
- `lib/services/audit/support-action-trace.ts`
- `lib/permissions.ts`
- `lib/rbac.ts`
- `lib/permission-catalog.ts`
- `PATCH/NO_PATCH.md`

## 2. Fichiers utilises comme reference

- Session amont `DX_T5_CADRAGE-BLOC-SESSIONS`
- Session amont `DX_T5_AUDIT-MAPPING-ENTITES`
- `prisma/schema.prisma`
- `app/api/*` et `lib/services/*` concernes par `companyId`
- `lib/validators/*` concernes par les bodies et queries des surfaces auditees
- `lib/permissions.ts`, `lib/rbac.ts`, `lib/permission-catalog.ts` pour les surfaces qui croisent T4 / RBAC

## 3. Fichiers crees

- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/PATCH/NO_PATCH.md`

## 4. Fichiers modifies

- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/3-FIN_DE_SESSION.md`

## 5. Fichiers supprimes

- Aucun

## 6. Fichiers deplaces ou renommes

- Aucun

## 7. Dossiers explicitement non modifies

- `app/`
- `prisma/`
- `docs/1-MASTER/`
- `lib/` hors lecture
- `package.json`
- `package-lock.json`
- `next.config.ts`
- scripts de qualite
- `create_session.ps1`

## 8. Commandes executees

- `git status --short`
- `rg --files docs/2-SESSIONS docs/1-MASTER app/api lib/services lib/validators prisma`
- `rg -l "companyId" app/api lib/services lib/validators`
- `rg -l "companyId" prisma/schema.prisma`
- `rg -n "companyId|tenant|Company|session\\.user\\.companyId" app/api lib/services lib/validators prisma/schema.prisma`
- `rg -n "where:.*companyId|companyId:|connect:|include:.*company|select:.*companyId" app/api lib/services lib/validators prisma/schema.prisma`
- `Select-String -LiteralPath` sur les routes, services et helpers cibles
- `Get-Content -Raw` sur les fichiers de session et les fichiers de preuve
- `./create_session.ps1 -Stage 1-ALPHA -Block T5 -SessionCode AUDIT-COMPANYID-SURFACES -Type AUDIT -Title 'Cartographie des surfaces companyId avant correction multi-tenant'`

## 9. Resultats des commandes

- `git status --short` avant: vide
- `git status --short` apres creation de session: un seul dossier non suivi sous `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/`
- `rg -l "companyId"` a retourne uniquement les routes et services qui portent une vraie logique tenant; aucun fichier de `lib/validators` ne porte `companyId`
- `rg -n` a confirme que `companyId` est filtre en route, service ou schema, selon la surface
- les surfaces support / admin apparaissent seulement dans `app/api/audit/route.ts` et `app/api/planning/autoschedule/runs/[id]/route.ts`
- aucun fichier applicatif, Prisma, MASTER, script ou package n a ete modifie

## 10. Controles Git

- Avant toute action: repo propre
- Apres creation de session: un seul dossier de session non suivi
- Apres redaction des preuves: pas de nouveau fichier hors session

## 11. Controles techniques

- `prisma/schema.prisma` a ete lu
- les routes, services et helpers concernes par `companyId` ont ete lus
- les validateurs ont ete lus
- T4 / RBAC a ete lu seulement pour les surfaces qui croisent une permission ou une action sensible
- aucune commande Prisma n a ete executee
- aucune commande npm n a ete executee
- aucun navigateur, Playwright, capture ou dev server n a ete utilise

## 12. Controles de perimetre

- aucune correction de code
- aucune modification applicative
- aucune modification Prisma
- aucune modification MASTER
- aucun patch applicatif `.diff`
- aucune migration
- aucune installation de dependance

## 13. Extraits utiles

- `app/api/audit/route.ts`: `resolveAuditCompanyId(...)` puis `where: { companyId }`
- `lib/services/audit/audit-context.ts`: `if (!isSupportActor(...)) return null`
- `app/api/planning/autoschedule/runs/[id]/route.ts`: `if (!sessionCompanyId && !isSupportActor(platformRole)) return 401`
- `app/api/users/route.ts`: `companyId: true` et creation `data: { ..., companyId }`
- `app/api/users/route.ts`: duplicate check `where: { email }` sans scope tenant
- `app/api/planning/shifts/[id]/assign/route.ts`: `assertUserInCompany`, `assertVehicleInCompany`, `assertActiveDepotInCompany`
- `app/api/planning/autoschedule/runs/[id]/publish/route.ts`: `loadMinRestCompanyRule(tx, companyId)`
- `lib/imports/import-engine.ts`: `prisma.user.findFirst({ where: { email: parsed.data.email } })`
- `prisma/schema.prisma`: `User.companyId String?` et `User.email String @unique`

## 14. Limites / commandes non executees

- aucune commande Prisma
- aucune commande npm
- aucun navigateur
- aucune capture
- aucun dev server
- aucun patch applicatif

## 15. Informations non fournies

- intention produit sur `User.companyId` nullable
- intention produit sur `User.email` globalement unique
- politique de support cross-company pour audit et autoschedule read
- statut fonctionnel attendu pour `MaintenanceType`
- choix de sortie pour `health/prisma` dans l audit tenant

Règles obligatoires :

- Une commande non montree = non prouvee.
- Un fichier non liste = non prouve.
- Une information absente = INFORMATION NON FOURNIE - A CONFIRMER.
