# EVIDENCES

## Sources utilisées

### Documentation
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`
- `docs/4-templates/TEMPLATE_RECAP_SESSION.md`
- `docs/4-templates/TEMPLATE_DOD_4_4.md`

### Code inspecté
- `lib/validators/depot.ts`
- `app/api/depots/[id]/route.ts`
- `lib/services/depots/update-depot.ts`
- `app/api/company/rules/route.ts` (uniquement pour expliquer l’échec build hors périmètre)
- `prisma/schema.prisma` (uniquement pour vérifier l’existence de `RuleMode`)

## Constats factuels

### 1. Validator
Avant correction, `updateDepotBodySchema` acceptait encore `isActive`.

### 2. Route PATCH
Avant correction, la route transmettait encore `isActive` au service `updateDepot`.

### 3. Service
Avant correction, `UpdateDepotInput` et le `data` Prisma autorisaient encore une mise à jour de `isActive`.

### 4. Applicabilité du patch principal régénéré
Validation effectuée sur une copie propre du dépôt :
- `git apply --check` : OK
- `git apply` : OK

### 5. Résultats terminaux observés
- `npx prisma validate` : échec réseau Prisma
- `npx prisma generate` : échec réseau Prisma
- `npm run lint` : OK
- `npm run build` : échec TypeScript sur `RuleMode` depuis `@prisma/client`
