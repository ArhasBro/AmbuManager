# EVIDENCES

Éléments factuels retenus pour la clôture documentaire finale de `VEH-03`.

---

## Sources utilisées

### Cadrage / plan
- `docs/1-master/DOCUMENT_CADRAGE_FONCTIONNEL.md:436-443`
  - `07.1 Registre de flotte` = `lister les véhicules de la société`
  - cible : `gérant, admin, régulateur selon permissions`
- `docs/1-master/PLAN_DE_DEVELOPPEMENT.md:433-436`
  - `VEH-03` correspond bien à la correction / stabilisation du listing véhicules si nécessaire

### Résiduel prouvé par VEH-02
- `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-02_A4_VEH-02/RESULTATS.md:17-23`
  - le listing n’était pas encore totalement stabilisé entre API et UI
  - tri non homogène entre API et UI
  - champs exposés non strictement alignés entre API et UI
- `docs/2-sessions/1-ALPHA/BLOC_A4/1-VEH/SESSION-20260322-02_A4_VEH-02/RESULTATS.md:38-42`
  - résiduel exact à traiter : aligner le contrat, harmoniser tri et shape, ne corriger que le strict nécessaire

### Contrat réel API conservé comme référence
- `app/api/vehicles/route.ts:13-26`
  - contrat de sélection réel du listing API : `id`, `immatriculation`, `type`, `status`, `depotId`, `createdAt`, `updatedAt`, `depot{id,name,isActive}`
- `app/api/vehicles/route.ts:46-70`
  - garde d’accès via `canManageVehicles(userId, session.user.role, platformRole)`
  - tri listing API : `immatriculation asc`
  - sérialisation de dates via `serializeDates`

### Correction page `/vehicles`
- `app/vehicles/page.tsx:17-18`
  - la page passe désormais `platformRole` à `canManageVehicles(...)`, comme l’API
- `app/vehicles/page.tsx:22-42`
  - tri SSR aligné sur `immatriculation asc`
  - `updatedAt` ajouté à la sélection du listing initial
- `app/vehicles/page.tsx:60`
  - sérialisation du listing initial via `serializeDates(vehicles)`

### Stabilisation du rendu client
- `app/vehicles/vehicles-client.tsx:12-20`
  - type `Vehicle` aligné avec la shape utile du listing incluant `updatedAt`
- `app/vehicles/vehicles-client.tsx:39-40`
  - comparateur dédié par immatriculation
- `app/vehicles/vehicles-client.tsx:59-60`
  - liste affichée réellement triée via `displayVehicles`
- `app/vehicles/vehicles-client.tsx:82-86`
  - après création, le véhicule est ajouté à l’état sans imposer un ordre divergent ; l’ordre visible reste piloté par le tri commun de rendu
- `app/vehicles/vehicles-client.tsx:164-168`
  - rendu réel basé sur `displayVehicles`

### Permissions bornées
- `lib/permissions.ts:36-45`
  - `hasPermissionAccess(...)` tient compte de `platformRole`
- `lib/permissions.ts:89-90`
  - `canManageVehicles(...)` attend bien `userId`, `role`, `platformRole`

### Validations finales réellement consignées
Commandes retenues :

```bash
git apply --check ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-03_A4_VEH-03\\PATCH__SESSION-20260322-03_A4_VEH-03.diff"
git apply ".\\docs\\3-patches\\1-ALPHA\\BLOC_A4\\1-VEH\\SESSION-20260322-03_A4_VEH-03\\PATCH__SESSION-20260322-03_A4_VEH-03.diff"
npm run lint
npm run build
```

Résultats réels consignés :
- `git apply --check` : OK
- `git apply` : OK
- `npm run lint` : OK
- `npm run build` : OK
