# EVIDENCES

Éléments factuels retenus pour la clôture documentaire finale de `VEH-09`.

---

## Sources utilisées

### Cadrage produit et plan
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:463-470`
  - `07.4 Désactivation / archivage d’un véhicule` exige de désactiver un véhicule sans perdre son historique.
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:472-479`
  - `07.5 Suppression définitive d’un véhicule non utilisé` reste un sujet séparé et encadré.
- `docs/1-master/PLAN_DEVELOPPEMENT.md:439-442`
  - `VEH-08` correspond à l’API d’archivage et `VEH-09` à l’UI d’archivage.

### Socle réel déjà présent avant correction UI
- `app/api/vehicles/[id]/archive/route.ts:27-51`
  - un endpoint réel `POST /api/vehicles/[id]/archive` existe déjà et retourne le véhicule archivé sérialisé.
- `lib/services/vehicles/archive-vehicle.ts:47-64`
  - l’archivage logique utilise `isActive: false`.
- `app/api/vehicles/route.ts:63-68`
  - le flux standard liste uniquement les véhicules `isActive: true`.
- `lib/permissions.ts:89-90`
  - le module véhicules reste borné par `canManageVehicles(...)`.
- `lib/permission-catalog.ts:57-60`
  - le module est bien rattaché à `VEHICLES_MANAGE`.

### UI réellement ajoutée dans `vehicles-client.tsx`
- `app/vehicles/vehicles-client.tsx:73-80`
  - ajout d’un état local `archivingVehicleId` pour piloter le chargement par véhicule.
- `app/vehicles/vehicles-client.tsx:240-272`
  - ajout du flux `handleArchiveVehicle(vehicle)` avec confirmation utilisateur, appel `POST`, gestion succès / erreur et nettoyage local.
- `app/vehicles/vehicles-client.tsx:258-267`
  - après succès, le véhicule est retiré de la liste active, son état local de base est supprimé, et l’édition locale est fermée si nécessaire.
- `app/vehicles/vehicles-client.tsx:299-305`
  - ajout d’un état `isBusy` local pour éviter les actions concurrentes sur la même ligne.
- `app/vehicles/vehicles-client.tsx:316-385`
  - ajout du bouton `Archiver` dans la liste existante et désactivation cohérente des contrôles pendant l’archivage.
- `app/vehicles/vehicles-client.tsx:388-455`
  - les champs d’édition sont temporairement désactivés pendant l’archivage du véhicule concerné.

### Validations terminales réelles consignées

```bash
git apply --check ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-09_A4_VEH-09\\PATCH__SESSION-20260322-09_A4_VEH-09.diff"
git apply ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-09_A4_VEH-09\\PATCH__SESSION-20260322-09_A4_VEH-09.diff"
npm run lint
npm run build
```

Résultats réels finaux à reporter :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK
