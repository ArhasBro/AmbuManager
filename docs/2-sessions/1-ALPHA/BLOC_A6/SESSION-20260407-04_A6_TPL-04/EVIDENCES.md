# EVIDENCES

## Sources utilisées
### Documentation autorisée
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Code contrôlé
- `prisma/schema.prisma`
- `lib/permissions.ts`
- `lib/rbac.ts`
- `lib/api/response.ts`
- `lib/serializers.ts`
- `lib/auth.ts`
- `lib/permission-catalog.ts`
- `app/api/vehicles/route.ts`
- `app/api/users/route.ts`
- `app/api/planning/autoschedule/runs/route.ts`
- `app/api/templates/route.ts`

## Constats factuels
### 1. `ShiftTemplate` existe déjà dans le schéma Prisma
Le modèle contient réellement :
- `id`
- `companyId`
- `name`
- `category`
- `requiredRole`
- `isActive`
- `startTime`
- `endTime`
- `crossesMidnight`
- `createdAt`
- `updatedAt`

### 2. Aucune route `app/api/templates/*` n’existait dans le dépôt contrôlé
Le dépôt ne portait pas encore d’API dédiée de liste templates.

### 3. `TEMPLATES_MANAGE` existe déjà dans le catalogue
`lib/permission-catalog.ts` contient bien la permission `TEMPLATES_MANAGE`.

### 4. `lib/permissions.ts` ne portait pas encore de helper runtime templates
Le dépôt disposait déjà d’helpers comparables (`canManageUsers`, `canManageVehicles`, `canManageCompanyRules`, etc.), mais pas encore de branchement runtime dédié aux templates.

### 5. Le projet impose un multi-tenant strict via `companyId`
Les documents maîtres et les routes API contrôlées appliquent ce cloisonnement via la session enrichie.

## Preuve de correction minimale produite
### Fichier ajouté
- `app/api/templates/route.ts`

### Fichier modifié
- `lib/permissions.ts`

### Comportement ajouté
- route `GET /api/templates` uniquement ;
- session obligatoire ;
- refus `401` si session / `companyId` / `userId` absents ;
- refus `403` si l’utilisateur n’est ni `ADMIN` / `GERANT`, ni porteur effectif de `TEMPLATES_MANAGE` ;
- lecture Prisma bornée à `companyId` ;
- réponse au format projet via `ok(...)`, `badRequest(...)`, `unauthorized()`, `forbidden()`, `serverError(...)` ;
- sérialisation des dates via `serializeDates` ;
- exposition limitée aux champs demandés ;
- absence d’exposition de `companyId`.

## Validations réellement prouvées localement
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK
- `/api/templates` apparaît bien dans le build
