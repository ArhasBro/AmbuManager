# EVIDENCES

## Sources utilisées

### Documentation
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`

### Code réellement concerné par BASE-09
- `prisma/schema.prisma`
- `prisma/migrations/20260316213000_base09_attach_shift_to_depot/migration.sql`
- `lib/services/planning/assign-shift.ts`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `app/api/planning/shifts/route.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`

## Constats factuels avant patch

### 1. Le modèle `Shift` existait déjà sans dépôt
Constat initial retenu :
- `Shift` existait déjà ;
- aucun `depotId` n’était porté par `Shift` ;
- `DraftShift` existait déjà ;
- le planning existant utilisait `GET /api/planning/shifts` et `PATCH /api/planning/shifts/[id]/assign`.

### 2. Le module dépôt existait déjà
Constat initial retenu :
- `Depot` existait déjà ;
- les rattachements `Vehicle -> Depot` et `User -> Depot` existaient déjà ;
- ils ont servi uniquement de référence de bornage.

## Éléments factuels ajoutés par BASE-09

### Prisma
- `Depot.shifts` ajouté ;
- `Shift.depotId` ajouté en nullable ;
- `Shift.depot` ajouté ;
- migration SQL dédiée `20260316213000_base09_attach_shift_to_depot` ajoutée ;
- index `Shift_depotId_idx` ajouté.

### API / service
- `PATCH /api/planning/shifts/[id]/assign` accepte désormais `depotId` ;
- vérification explicite du dépôt actif dans la société courante avant mise à jour ;
- refus explicite du rattachement dépôt sur `DraftShift` ;
- `assignShift` persiste et trace `depotId` dans l’audit ;
- `GET /api/planning/shifts` inclut désormais `depot`.

### UI
- `/planning` charge les dépôts actifs de la société courante ;
- chaque carte de shift affiche la base courante ;
- chaque carte de shift propose un sélecteur `Base` avec désaffectation possible.

## Vérifications terminales réellement obtenues

### `git apply --check BASE-09.diff`
Résultat : **OK**

### `git apply BASE-09.diff`
Résultat : **OK**

### `npx prisma validate`
Résultat : **OK**

### `npx prisma generate`
Résultat : **OK**

### `npm run lint`
Résultat : **OK**

### `npm run build`
Résultat : **OK**

## Conclusion factuelle

Le patch `BASE-09.diff` est validé fonctionnellement et techniquement.
La session devient conforme après livraison du patch documentaire final et des fichiers de clôture associés.
