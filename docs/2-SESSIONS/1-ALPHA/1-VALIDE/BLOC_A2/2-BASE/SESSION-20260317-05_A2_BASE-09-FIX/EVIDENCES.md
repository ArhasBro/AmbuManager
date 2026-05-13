# EVIDENCES

## Sources utilisées

### Documentation
- `docs/1-master/DOCUMENT_MAITRE.md`
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md`
- `docs/1-master/ETAT_GLOBAL_PROJET.md`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md`
- `docs/1-master/REGISTRE_DECISIONS.md`
- `docs/1-master/RECAP_DISCUSSIONS.md`
- `docs/1-master/STRUCTURE_PROJET.md`
- `docs/4-templates/TEMPLATE_DEBUT_SESSION.md`
- `docs/4-templates/TEMPLATE_FIN_SESSION.md`
- `docs/PROTOCOLE_SESSION.md`
- `docs/SOURCES_AUTORISEES.md`
- `docs/STRUCTURE_DOCS.md`

### Code inspecté
- `prisma/schema.prisma`
- `app/api/planning/shifts/[id]/assign/route.ts`
- `lib/services/planning/assign-shift.ts`
- `app/api/planning/shifts/route.ts`
- `app/planning/page.tsx`
- `app/planning/planning-client.tsx`
- `prisma/migrations/*`

## Constats factuels avant correctif

### 1. `Shift.depotId` est déjà présent dans le schéma Prisma
Constat relevé dans `prisma/schema.prisma` :
- `Shift.depotId String? @db.Uuid`
- `Shift.depot Depot?`
- `@@index([depotId])`
- `Depot.shifts Shift[]`

### 2. `DraftShift` reste hors périmètre dépôt
Constat relevé dans `prisma/schema.prisma` :
- aucun champ `depotId` dans `DraftShift`.

### 3. L’API d’assignation gère déjà `depotId` sur shift publié
Constat relevé dans `app/api/planning/shifts/[id]/assign/route.ts` :
- `depotId` est accepté dans le body ;
- le dépôt est vérifié avec `id + companyId + isActive:true` ;
- la route renvoie `400 DEPOT_ASSIGNMENT_NOT_SUPPORTED_ON_DRAFT` si un brouillon est ciblé avec `depotId`.

### 4. Le service métier persiste déjà `depotId`
Constat relevé dans `lib/services/planning/assign-shift.ts` :
- `AssignShiftInput` contient `depotId` ;
- `tx.shift.update({ data: { userId, user2Id, vehicleId, depotId } })` est déjà présent ;
- l’audit planning trace déjà `depotId`.

### 5. L’UI planning expose déjà la base
Constat relevé dans :
- `app/planning/page.tsx` : lecture des dépôts actifs de la société courante ;
- `app/planning/planning-client.tsx` : affichage de la base actuelle et sélecteur `Base`.

### 6. L’historique Prisma ne contient aucune migration pour `Shift.depotId`
Constat relevé par inspection de `prisma/migrations` :
- présence des migrations `Depot`, `User -> Depot`, `Vehicle -> Depot` ;
- absence totale de migration ajoutant `Shift.depotId`.

## Correctif produit

### Fichier ajouté
- `prisma/migrations/20260317213000_base09_fix_attach_shift_to_depot/migration.sql`

### Contenu exact
```sql
-- BASE-09-FIX — matérialisation SQL manquante du rattachement Shift -> Depot
ALTER TABLE "Shift"
ADD COLUMN "depotId" UUID;

CREATE INDEX "Shift_depotId_idx" ON "Shift"("depotId");

ALTER TABLE "Shift"
ADD CONSTRAINT "Shift_depotId_fkey"
FOREIGN KEY ("depotId") REFERENCES "Depot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
```

## Validations terminales réelles

- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Conclusion factuelle

Le seul manque réel corrigé par `BASE-09-FIX` est la migration SQL absente.
Le bornage fonctionnel demandé est respecté.
La session est validée en `conforme`, strictement limitée à `Shift -> Depot`.
