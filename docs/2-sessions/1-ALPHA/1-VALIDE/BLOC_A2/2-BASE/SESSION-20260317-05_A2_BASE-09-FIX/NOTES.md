# NOTES

## Méthode de travail retenue

- relecture des documents de référence `docs/1-master/*` et `docs/4-templates/*` ;
- contrôle du schéma Prisma réel ;
- contrôle des routes et services planning réellement présents ;
- contrôle de l’UI `/planning` réellement présente ;
- contrôle de l’historique `prisma/migrations` ;
- production d’un correctif strictement minimal sur le seul manque réel constaté.

## Arbitrages retenus

### 1. Pas de modification du schéma Prisma
Le schéma couvre déjà le besoin :
- `Shift.depotId` existe ;
- `Shift.depot` existe ;
- `Depot.shifts` existe.

Le manque réel n’est pas dans `prisma/schema.prisma`, mais dans l’historique SQL.

### 2. Pas de modification API
La route `PATCH /api/planning/shifts/[id]/assign` gère déjà :
- `depotId` dans le body ;
- le tenant check via `companyId` de session ;
- la vérification du dépôt dans la même société ;
- le refus explicite `DEPOT_ASSIGNMENT_NOT_SUPPORTED_ON_DRAFT`.

Aucun ajustement API supplémentaire n’était justifié.

### 3. Pas de modification UI
Le planning charge déjà les dépôts actifs de la société courante et expose déjà le champ `Base` sur les shifts publiés.
Aucun ajustement UI supplémentaire n’était justifié.

### 4. DraftShift maintenu hors périmètre
Le modèle `DraftShift` ne contient toujours pas `depotId`.
Le refus explicite côté route est conservé.

## Observation centrale

Le seul correctif code réellement nécessaire pour `BASE-09-FIX` était la migration SQL manquante permettant de matérialiser `Shift -> Depot` en base, sans aucune ouverture fonctionnelle sur `DraftShift`.

## Correctif retenu

Ajout de la seule migration nécessaire :
- `20260317213000_base09_fix_attach_shift_to_depot`

Contenu SQL :
- `ALTER TABLE "Shift" ADD COLUMN "depotId" UUID;`
- `CREATE INDEX "Shift_depotId_idx" ON "Shift"("depotId");`
- `ALTER TABLE "Shift" ADD CONSTRAINT "Shift_depotId_fkey" ... ON DELETE SET NULL ON UPDATE CASCADE;`
