# 3 - Fin de session

## 1. Resume court

Audit cible des surfaces `companyId` dans Ambulance Manager, sans correction, sans modification Prisma et sans modification applicative. La cartographie distingue les surfaces tenant couvertes, les surfaces support / admin, les surfaces a confirmer et les surfaces hors perimetre.

## 2. Objectif traite

Oui. L objectif unique de la session etait de lire les surfaces `companyId` avant correction multi-tenant et de produire une cartographie exploitable des routes, services, validators, helpers et relations Prisma concernees.

## 3. Livrable produit

- Matrice des surfaces `companyId`
- Synthese des risques multi-tenant
- Surfaces prioritaires pour futures CX de correction
- Informations non fournies
- Questions d arbitrage
- Confirmation explicite d absence de correction

## 4. Methode utilisee

- Lecture des documents de gouvernance et de methode
- Lecture des sessions T5 amont
- Lecture de `prisma/schema.prisma`
- Recherche ciblee des usages `companyId`, `tenant`, `Company`, `session.user.companyId`
- Lecture ciblee des routes, services, validators et helpers tenant
- Lecture ciblee des helpers RBAC / permissions seulement quand une surface auditee croise une action sensible
- Aucun navigateur, aucun dev server, aucune commande npm, aucune commande Prisma

## 5. Commandes PowerShell executees

- `git status --short`
- `rg --files docs/2-SESSIONS docs/1-MASTER app/api lib/services lib/validators prisma`
- `rg -l "companyId" app/api lib/services lib/validators`
- `rg -l "companyId" prisma/schema.prisma`
- `rg -n "companyId|tenant|Company|session\\.user\\.companyId" app/api lib/services lib/validators prisma/schema.prisma`
- `rg -n "where:.*companyId|companyId:|connect:|include:.*company|select:.*companyId" app/api lib/services lib/validators prisma/schema.prisma`
- `Select-String -LiteralPath` sur les surfaces auditees
- `Get-Content -Raw` sur les fichiers de session et de preuve
- `./create_session.ps1 -Stage 1-ALPHA -Block T5 -SessionCode AUDIT-COMPANYID-SURFACES -Type AUDIT -Title 'Cartographie des surfaces companyId avant correction multi-tenant'`

## 6. Resultats obtenus

- La session a ete creee dans `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/`
- Le champ `Session` est bien `AUDIT-COMPANYID-SURFACES`
- Le type de session est `DX`
- Le type metier est `AUDIT`
- Aucun doublon `DX_T5_DX_T5` n a ete cree
- `prisma/schema.prisma` a ete lu
- Les routes, services et validators concernes ont ete lus
- Les surfaces T4 / RBAC ont ete lues uniquement quand elles etaient directement concernees
- Aucun fichier applicatif n a ete modifie
- Aucun fichier Prisma n a ete modifie
- Aucune migration n a ete creee
- Aucune commande Prisma n a ete executee
- Aucune commande npm n a ete executee
- Aucun navigateur, aucune capture, aucun Playwright et aucun dev server n ont ete utilises

## 7. Fichiers reellement impactes

- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/1-SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/2-PREUVES.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/3-FIN_DE_SESSION.md`
- `docs/2-SESSIONS/1-ALPHA/BLOC_T5_DONNEES_MULTI_TENANT/SESSION-20260619-16_DX_T5_AUDIT-COMPANYID-SURFACES/PATCH/NO_PATCH.md` a ete cree par l outillage et reste sans patch applicatif

## 8. Matrice des surfaces companyId

### 8.1 Prisma et relations

| Domaine / module | Fichier | Type surface | Operation | Source companyId | Controle serveur | Validator tenant | Relation Prisma tenant | Risque tenant | Statut | Preuve / extrait court | Recommandation future |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Tenant root | `prisma/schema.prisma` | Prisma | autre | absent | n/a | n/a | `Company` est la racine tenant | `companyId` absent car racine | HORS PERIMETRE | `model Company { ... }` | Aucun changement dans ce bloc |
| User global | `prisma/schema.prisma` | Prisma | autre | relation / Prisma | partiel | n/a | `User.companyId` | nullable `companyId` + `email @unique` global | RISQUE | `companyId String?` et `email String @unique` | Confirmer la politique sur les comptes support et la portee de l email |
| Modeles tenant | `prisma/schema.prisma` | Prisma | autre | Prisma | oui | n/a | `Depot`, `CompanyRule`, `ShiftTemplate`, `Vehicle`, `UserAbsence`, `AutoScheduleRun`, `DraftShift`, `Shift` | contraintes et index tenant-scope en schema | COUVERT | `companyId` requis + `@@unique([companyId, ...])` | Conserver la meme logique en futures CX |
| Logs audit | `prisma/schema.prisma` | Prisma | autre | Prisma | oui | n/a | `PlanningAuditLog`, `LoginAuditLog` | audit tenant-scoped | COUVERT | `@@index([companyId, createdAt])` | Aucun changement |
| Surface dormante | `prisma/schema.prisma` | Prisma | autre | Prisma | a confirmer | n/a | `MaintenanceType.companyId` | modele present sans surface applicative trouvee | HORS PERIMETRE | `model MaintenanceType { ... }` | Decider si la surface entre en T5 plus tard |

### 8.2 Socle applicatif

| Domaine / module | Fichier | Type surface | Operation | Source companyId | Controle serveur | Validator tenant | Relation Prisma tenant | Risque tenant | Statut | Preuve / extrait court | Recommandation future |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Profil societe | `app/api/company/profile/route.ts`; `lib/services/company/update-company-profile.ts`; `lib/validators/company-profile.ts` | route + service + validator | update | session | oui | non | `Company.id` | garde admin / gerant, tenant scope explicite | COUVERT | `if (!userId || !companyId) return unauthorized()` | Conserver le scope session sur les futures evolutions |
| Regles societe | `app/api/company/rules/route.ts`; `lib/company-rules/runtime.ts`; `lib/company-rules/api.ts`; `lib/validators/company-rules.ts`; `lib/permissions.ts` | route + helper + validator + RBAC | read / update | session | oui | non | `CompanyRule.companyId`, `companyId_key` | RBAC T4 implique | COUVERT | `where: { companyId_key: { companyId, key } }` et `canManageCompanyRules(...)` | Garder la garde RBAC cote serveur |
| Depots | `app/api/depots/route.ts`; `app/api/depots/[id]/route.ts`; `app/api/depots/[id]/archive/route.ts`; `lib/services/depots/create-depot.ts`; `lib/services/depots/update-depot.ts`; `lib/services/depots/archive-depot.ts`; `lib/validators/depot.ts` | route + services + validator | read / create / update / archive | session | oui | non | `Depot.companyId` | scope tenant applique au find/create/update | COUVERT | `create({ companyId })`, `findFirst({ id, companyId })` | Conserver le filtrage serveur |
| Vehicules | `app/api/vehicles/route.ts`; `app/api/vehicles/[id]/route.ts`; `app/api/vehicles/[id]/archive/route.ts`; `app/api/vehicles/[id]/depot/route.ts`; `lib/services/vehicles/archive-vehicle.ts`; `lib/services/vehicles/assign-vehicle-depot.ts`; `lib/validators/vehicle.ts` | route + services + validator | read / create / update / archive / assign | session | oui | non | `Vehicle.companyId` | controle tenant present sur lecture et mutation | COUVERT | `findMany({ where: { companyId } })`, `findFirst({ id, companyId })` | Conserver le meme garde-fou |
| Users collection | `app/api/users/route.ts`; `lib/company-rules/governance.ts`; `lib/permissions.ts`; `lib/permission-catalog.ts`; `lib/validators/user.ts` | route + RBAC + validator | read / create | session + body | oui | non | `User.companyId` | `email` global unique + gouvernance T4 sur roles / permissions | RISQUE | `companyId: true`, `where: { email }`, `companyId` sur create | Confirmer le scope de l email et la politique des comptes sans company |
| Users member ops et absences | `app/api/users/[id]/route.ts`; `app/api/users/[id]/archive/route.ts`; `app/api/users/[id]/depot/route.ts`; `app/api/users/[id]/reset-password/route.ts`; `app/api/users/[id]/absences/route.ts`; `app/api/users/[id]/absences/[absenceId]/route.ts`; `lib/services/users/archive-user.ts`; `lib/services/users/assign-user-depot.ts`; `lib/services/users/user-absence.ts`; `lib/validators/user.ts`; `lib/validators/user-absence.ts` | route + services + validators + RBAC | read / update / delete / archive / reset-password / assign | session | oui | non | `User.companyId`, `UserAbsence.companyId`, `Depot.companyId` | garde serveur presente sur toutes les mutations sensibles | COUVERT | `findFirst({ id, companyId })`, `findManagedUser(..., companyId)`, `writePersonalDataAudit(...)` | Conserver les scopes tenant dans les services |
| Templates | `app/api/templates/route.ts`; `app/api/templates/[id]/route.ts`; `app/api/templates/[id]/archive/route.ts`; `lib/services/templates/archive-template.ts`; `lib/templates/template-rules.ts` | route + service + helper | read / create / update / archive | session | oui | non applicable | `ShiftTemplate.companyId` | filtre tenant present au route level et au service level | COUVERT | `where: { companyId }`, `create({ companyId })`, `findFirst({ id, companyId })` | Aucun changement requis dans cette session |
| Imports | `app/api/imports/route.ts`; `lib/imports/import-engine.ts` | route + import engine | preview / create | session | oui | non applicable | `Depot`, `Vehicle`, `ShiftTemplate`, `User`, `UserAbsence` | detection globale des emails utilisateurs | RISQUE | `prisma.user.findFirst({ where: { email: parsed.data.email } })` puis `create({ companyId, ... })` | Confirmer si l email doit rester global ou devenir tenant-scoped |
| Export planning | `app/api/planning/exports/route.ts`; `lib/planning/export.ts` | route + helper | read / export | session | oui | non applicable | `Shift.companyId` | export scoping tenant present | COUVERT | `let where: Prisma.ShiftWhereInput = { companyId: filters.companyId }` | Conserver le filtre tenant |

### 8.3 Planning et autoschedule

| Domaine / module | Fichier | Type surface | Operation | Source companyId | Controle serveur | Validator tenant | Relation Prisma tenant | Risque tenant | Statut | Preuve / extrait court | Recommandation future |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Planning shifts | `app/api/planning/shifts/route.ts`; `app/api/planning/shifts/[id]/route.ts`; `app/api/planning/shifts/[id]/assign/route.ts`; `app/api/planning/shifts/[id]/cancel/route.ts`; `lib/services/planning/assign-draftshift.ts`; `lib/services/planning/assign-shift.ts`; `lib/services/planning/user-absence.ts`; `lib/services/planning/planning-audit.ts`; `lib/validators/planning-assign.ts`; `lib/company-rules/runtime.ts`; `lib/templates/template-rules.ts` | route + services + helper + validator | read / create / update / assign / cancel | session | oui | non | `Shift`, `DraftShift`, `UserAbsence`, `Vehicle`, `Depot`, `CompanyRule` | guards tenant presents a chaque etape sensible | COUVERT | `where: { id, companyId }`, `assertUserInCompany`, `loadMinRestCompanyRule` | Garder les assertions cote serveur |
| Autoschedule create / list / cancel / publish | `app/api/planning/autoschedule/day/route.ts`; `app/api/planning/autoschedule/week/route.ts`; `app/api/planning/autoschedule/runs/route.ts`; `app/api/planning/autoschedule/runs/[id]/cancel/route.ts`; `app/api/planning/autoschedule/runs/[id]/publish/route.ts`; `lib/services/planning/matching.service.ts`; `lib/services/planning/planning-audit.ts`; `lib/company-rules/runtime.ts`; `lib/templates/template-rules.ts` | route + service + helper | create / read / update / cancel / publish | session | oui | non applicable | `AutoScheduleRun`, `DraftShift`, `Shift`, `User`, `Vehicle`, `CompanyRule` | workflow tenant scoping present | COUVERT | `findMany({ where })`, `writePlanningAudit(...)`, `loadMinRestCompanyRule(...)` | Conserver le meme isolement par company |
| Autoschedule support read | `app/api/planning/autoschedule/runs/[id]/route.ts`; `lib/services/audit/audit-context.ts` | route + helper | read | session + relation / Prisma | partiel | non applicable | `AutoScheduleRun.companyId` | support cross-company read possible par design | RISQUE | `if (!sessionCompanyId && !isSupportActor(platformRole)) return 401`, puis `const companyId = runHead.companyId` | Confirmer si ce flux support reste autorise |
| Autoschedule preview / apply | `app/api/planning/autoschedule/runs/[id]/match/preview/route.ts`; `app/api/planning/autoschedule/runs/[id]/match/apply/route.ts`; `lib/services/planning/matching.service.ts` | route + service | preview / apply | session | oui | non applicable | `AutoScheduleRun`, `DraftShift` | garde `PLANNING_AUTOSCHEDULE` et companyId present | COUVERT | `companyId` obligatoire, puis `computeDraftShiftMatchingByRole(...)` | Conserver les checks RBAC et tenant |
| Deprecated match route | `app/api/planning/autoschedule/runs/[id]/match/route.ts` | route | autre | session | oui | non applicable | aucune active | endpoint retire, retourne `GONE` | HORS PERIMETRE | `Route depreciee`, `410 GONE` | Aucun changement |

### 8.4 Audit et diagnostic

| Domaine / module | Fichier | Type surface | Operation | Source companyId | Controle serveur | Validator tenant | Relation Prisma tenant | Risque tenant | Statut | Preuve / extrait court | Recommandation future |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Audit tenant | `app/api/audit/route.ts`; `lib/services/audit/audit-context.ts`; `lib/services/audit/login-audit.ts`; `lib/services/audit/personal-data-audit.ts`; `lib/services/audit/support-action-trace.ts`; `lib/services/planning/planning-audit.ts` | route + helper + services | read / auth / log | session + parametre | partiel | non applicable | `PlanningAuditLog.companyId`, `LoginAuditLog.companyId` | support query param companyId autorise pour acteurs support | RISQUE | `resolveAuditCompanyId(... requestedCompanyId ...)` puis `where: { companyId }` | Garder la trace support explicite et documentee |
| Health Prisma | `app/api/health/prisma/route.ts` | route | auth / read | session | oui | non applicable | `Company`, `User` | route admin-only diagnostique, hors flux tenant metier | HORS PERIMETRE | `role === Role.ADMIN`, `prisma.user.count({ where: { companyId } })` | Ne pas l inclure dans les futures corrections tenant |

## 9. Risques multi-tenant

- `User.companyId` est nullable dans le schema, alors que la plupart des surfaces exigent un companyId de session
- `User.email` est globalement unique, et `import-engine.ts` applique la meme logique de duplication globale
- `app/api/audit/route.ts` accepte un `companyId` de requete pour les acteurs support via `resolveAuditCompanyId`
- `app/api/planning/autoschedule/runs/[id]/route.ts` peut derivier le `companyId` depuis la ligne Prisma si la session ne le porte pas, pour les acteurs support
- Les validators de `lib/validators/` sont de la validation de forme; ils ne portent pas la contrainte tenant
- Les surfaces sensibles croisent T4 / RBAC dans `app/api/users/*` et `app/api/company/rules/route.ts`
- Aucun update / delete cross-company non scope n a ete prouve sur les surfaces auditees actives

## 10. Informations non fournies

- Intention produit sur `User.companyId` nullable pour comptes platform ou support
- Intention produit sur la portee de `User.email` : globale ou tenant-scoped
- Politique de support cross-company pour audit et autoschedule read
- Statut fonctionnel attendu de `MaintenanceType`
- Statut attendu de `health/prisma` dans un audit tenant metier
- Besoin ou non de validators tenant plus stricts pour les bodies sensibles

## 11. Questions d arbitrage

- Faut-il conserver `User.email` globalement unique ou le scoper par company ?
- Faut-il autoriser `User.companyId` nullable pour des comptes platform / support ?
- Faut-il maintenir le support cross-company dans `app/api/audit/route.ts` et `app/api/planning/autoschedule/runs/[id]/route.ts` ?
- Faut-il exposer `MaintenanceType` dans un futur bloc T5 ou le laisser dormant ?
- Faut-il garder `health/prisma` en dehors du perimetre multi-tenant ?

## 12. Points de vigilance

- Les validators ne remplacent pas les guards serveur tenant
- `users` et `company rules` croisent directement T4 / RBAC
- `import-engine.ts` reste sensible sur la duplication des emails
- Les surfaces support doivent rester explicites et tracees
- Le seul read support de companyId derive d une relation Prisma est `app/api/planning/autoschedule/runs/[id]/route.ts`
- Aucun ecart bloquant technique n a ete prouve pour les routes tenant standard

## 13. Verdict final

SESSION DX_T5_AUDIT-COMPANYID-SURFACES TERMINEE - EN ATTENTE CONTROLE GPT
