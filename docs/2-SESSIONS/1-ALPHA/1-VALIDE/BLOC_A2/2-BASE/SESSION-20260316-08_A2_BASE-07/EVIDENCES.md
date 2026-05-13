# EVIDENCES

## Sources utilisées

### Sources documentaires
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

### Sources code du dépôt réel
- `prisma/schema.prisma`
- `prisma/migrations/20260316193000_base07_attach_vehicle_to_depot/migration.sql`
- `lib/validators/vehicle.ts`
- `lib/services/vehicles/assign-vehicle-depot.ts`
- `app/api/vehicles/route.ts`
- `app/api/vehicles/[id]/depot/route.ts`
- `app/vehicles/page.tsx`
- `app/vehicles/vehicles-client.tsx`

## Évidences de périmètre BASE-07

### Prisma
Le dépôt réel porte bien la modélisation minimale suivante :
- `Vehicle.depotId` nullable ;
- `Vehicle.depot` ;
- `Depot.vehicles`.

### Validation
Le body d’affectation dépôt véhicule est porté par une validation dédiée dans `lib/validators/vehicle.ts`.

### Service
Le service dédié d’affectation vérifie explicitement :
- la présence du véhicule dans le tenant courant ;
- la présence du dépôt dans le tenant courant ;
- l’état actif du dépôt ;
- la mise à jour ciblée de `depotId` uniquement.

### API
La route dédiée `PATCH /api/vehicles/[id]/depot` existe dans le dépôt réel et conserve le contrat projet :
- succès : `{ ok:true, data }`
- erreur : `{ ok:false, error, details? }`

### UI
Le module `/vehicles` affiche et permet d’enregistrer la base d’un véhicule avec une option de désaffectation.

## Évidence du correctif minimal postérieur

### Incident de build constaté
Après patch principal, le build TypeScript a bloqué sur `app/vehicles/vehicles-client.tsx` à cause d’un nullable guard insuffisant sur `v.depot`.

### Fix réellement appliqué
Le correctif séparé `PATCH__SESSION-20260316-08_A2_BASE-07_FIX-01.diff` a été ajouté pour résoudre **uniquement** ce point.

Le fix est borné à :
- expliciter le guard nullable ;
- conserver le comportement fonctionnel ;
- ne pas toucher au contrat API ;
- ne pas toucher à Prisma ;
- ne pas toucher aux documents de session dans le patch de fix.

## Vérifications terminales confirmées sur le vrai dépôt

Après application du patch principal puis du fix minimal :
- `npx prisma validate` : **OK**
- `npx prisma generate` : **OK**
- `npm run lint` : **OK**
- `npm run build` : **OK**

## Évidence de clôture documentaire

La présente étape documentaire :
- ne modifie aucun fichier code ;
- ne régénère ni `BASE-07.diff` ni `PATCH__SESSION-20260316-08_A2_BASE-07_FIX-01.diff` ;
- produit uniquement la documentation finale de session ;
- produit un patch documentaire séparé ne contenant que des fichiers `.md`.
