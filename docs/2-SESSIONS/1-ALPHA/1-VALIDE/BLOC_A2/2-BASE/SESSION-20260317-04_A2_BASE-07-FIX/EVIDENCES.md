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
- `docs/SOURCES_AUTORISEES.md`
- `docs/PROTOCOLE_SESSION.md`

### Code inspecté
- `prisma/schema.prisma`
- `app/vehicles/page.tsx`
- `app/vehicles/vehicles-client.tsx`
- `app/api/vehicles/route.ts`
- `lib/validators/vehicle.ts`
- `app/api/users/[id]/depot/route.ts`
- `lib/services/users/assign-user-depot.ts`
- `app/api/vehicles/[id]/depot/route.ts`
- `lib/services/vehicles/assign-vehicle-depot.ts`
- `prisma/migrations/20260317201000_base07_fix_attach_vehicle_to_depot/migration.sql`

## Évidences de l’état initial réel

### Schéma Prisma déjà prêt
Dans `prisma/schema.prisma` :
- `Vehicle.depotId` est déjà présent ;
- `Vehicle.depot` est déjà présent ;
- `Depot.vehicles` est déjà présent ;
- `@@index([depotId])` existe déjà sur `Vehicle`.

### UI déjà branchée sur une route dédiée
Dans `app/vehicles/vehicles-client.tsx` :
- l’enregistrement appelle `PATCH /api/vehicles/[id]/depot` ;
- le body envoyé est `{ depotId }`.

### Validator déjà présent
Dans `lib/validators/vehicle.ts` :
- `assignVehicleDepotBodySchema` existe déjà ;
- le body accepté est bien `depotId: uuid | null`.

### Route dédiée absente avant correction
Avant correction, aucun fichier `app/api/vehicles/[id]/depot/route.ts` n’existait dans le dépôt.

### Service dédié absent avant correction
Avant correction, aucun fichier `lib/services/vehicles/assign-vehicle-depot.ts` n’existait dans le dépôt.

### Migration absente avant correction
La recherche dans `prisma/migrations/` ne montrait aucune migration ajoutant `Vehicle.depotId`, alors que le schéma Prisma l’exposait déjà.

## Évidences de correction produite

### Route créée
`app/api/vehicles/[id]/depot/route.ts` :
- session requise ;
- contrôle RBAC via `canManageVehicles` ;
- validation params via `z.string().uuid()` ;
- validation body via `assignVehicleDepotBodySchema` ;
- mapping `VEHICLE_NOT_FOUND` / `DEPOT_NOT_FOUND` vers `404` ;
- contrat projet conservé via `{ ok:true, data } / { ok:false, error, details? }`.

### Service créé
`lib/services/vehicles/assign-vehicle-depot.ts` :
- recherche du véhicule avec `id + companyId` ;
- recherche du dépôt avec `id + companyId + isActive:true` ;
- mise à jour ciblée `data: { depotId: input.depotId }` ;
- retour de l’objet véhicule enrichi avec `depot`.

### Migration créée
`prisma/migrations/20260317201000_base07_fix_attach_vehicle_to_depot/migration.sql` :
- ajout de la colonne `depotId` ;
- création de l’index `Vehicle_depotId_idx` ;
- création de la clé étrangère vers `Depot(id)` avec `ON DELETE SET NULL`.

### Dossier patch final régularisé
Dans `docs/3-patches/1-ALPHA/BLOC_A2/2-BASE/SESSION-20260317-04_A2_BASE-07-FIX/` :
- `BASE-07-FIX.diff` est présent ;
- `README_PATCH.md` est présent ;
- aucun `NO_PATCH.md` n’est conservé dans l’état final de la session.

## Évidences de validation terminale réelle

Les validations terminales réelles à retenir pour la clôture sont :
- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Conclusion d’évidence

Les éléments requis par `BASE-07-FIX` existent réellement dans le dépôt et la session est clôturable en `conforme`.
