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
- `lib/api/response.ts`
- `lib/api/prisma-error.ts`
- `lib/auth.ts`
- `lib/permissions.ts`
- `lib/permission-catalog.ts`
- `lib/rbac.ts`
- `lib/serializers.ts`
- `app/api/templates/route.ts`
- `app/api/users/route.ts`
- `app/api/vehicles/route.ts`
- `app/api/depots/route.ts`
- `app/api/company/rules/route.ts`

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

### 2. La route `app/api/templates/route.ts` existe déjà pour la liste
Le dépôt portait déjà un `GET /api/templates` gouverné par `canManageTemplates(...)`.

### 3. Le helper runtime templates existe déjà
`lib/permissions.ts` contient déjà `canManageTemplates(userId, role, platformRole)` avec :
- accès natif `ADMIN` / `GERANT` ;
- sinon permission `TEMPLATES_MANAGE` ;
- pas d’ouverture globale support.

### 4. Aucun `POST /api/templates` n’était encore livré
Le chaînon manquant de `TPL-05` était bien la création template.

## Preuve de correction minimale produite
### Fichier modifié
- `app/api/templates/route.ts`

### Comportement ajouté
- route `POST /api/templates` ;
- session obligatoire ;
- refus `401` si session / `companyId` / `userId` absents ;
- refus `403` si gouvernance insuffisante ;
- refus `400 INVALID_JSON` si body JSON invalide ;
- refus `400 VALIDATION_ERROR` si payload hors schéma ;
- création Prisma bornée au `companyId` de session ;
- conflit `409 CONFLICT` si un template du même nom existe déjà dans la société ;
- réponse succès `201` au format `{ ok:true, data }` ;
- sérialisation des dates via `serializeDates`.

### Champs d’entrée réellement acceptés
- `name`
- `category`
- `requiredRole`
- `isActive`
- `startTime`
- `endTime`
- `crossesMidnight`

### Champs volontairement refusés
- `companyId`
- tout autre champ hors modèle actuel, via schéma `.strict()`.

## Validations réellement exécutées
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK
